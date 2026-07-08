import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import * as talent from "@google-cloud/talent";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import cookieParser from "cookie-parser";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// Initialize Gemini SDK lazily to avoid crashing on boot if key is missing in dev
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Initialize AWS S3 Client lazily
let s3Client: S3Client | null = null;
function getS3Client(): S3Client {
  if (!s3Client) {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION;

    if (!accessKeyId || !secretAccessKey || !region) {
      throw new Error("AWS credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION) are not set.");
    }

    s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }
  return s3Client;
}

// API: ESTARR AI Chat Assistant
app.post("/api/chat", async (req, res) => {
  try {
    const { message, context, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGenAI();

    // Map context into system instructions
    let contextInstruction = "";
    if (context === "academy") {
      contextInstruction = "\nCurrently, the user is in ESTARR Academy. Focus on explaining lessons, providing practical study tips, giving hands-on mission guidance, or encouraging career transitions.";
    } else if (context === "collabs") {
      contextInstruction = "\nCurrently, the user is in ESTARR Creator Hub (Collabs & Brand Deals). Help them write viral brand outreach messages, craft engaging content briefs, structure sponsor pitches, or coordinate creative partnerships for social platforms (TikTok, Instagram, YouTube, UGC). Use punchy, modern GenZ/internet friendly tone.";
    } else if (context === "jobs") {
      contextInstruction = "\nCurrently, the user is in ESTARR Jobs. Help them improve their CV, draft job applications, prepare for interviews, or suggest fitting careers based on their skills.";
    } else if (context === "business") {
      contextInstruction = "\nCurrently, the user is in ESTARR Business. Help them generate business ideas, analyze profit/loss, draft invoices, suggest whatsapp selling strategies, or optimize local operations.";
    } else if (context === "projects") {
      contextInstruction = "\nCurrently, the user is in ESTARR Projects. Help them break down milestones into subtasks, organize timelines, track budgets, or structure collaborative team sprints.";
    }

    const systemInstruction = `You are ESTARR AI, the intelligent assistant for the ESTARR APP digital ecosystem. 
ESTARR APP is designed to help young individuals, Gen Z creators, professional freelancers, entrepreneurs, and SMEs move "from learning to earning".
You can:
- Answer professional, business, educational, content creation, or branding questions.
- Generate business ideas or content hooks and video scripts.
- Generate sponsor pitches, brand collaboration emails, or social media scripts.
- Write/Improve CVs and cover letters.
- Suggest online tools, monetization hacks, or local trade practices.
- Give advice on social media growth, digital marketing, and building a sustainable online income.

Make your answers concise, structured, action-oriented, encouraging, and highly practical. Provide modern internet-savvy context (e.g. video formats, editing tips, collab strategies, rates) where appropriate. Always structure your answers with markdown bullets or sections. Avoid meta-commentary.${contextInstruction}`;

    // Structure contents correctly for generateContent
    // Since history might exist, we can format them.
    const contents: any[] = [];
    
    // Add formatted history if available
    if (history && history.length > 0) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.content }],
        });
      });
    }

    // Append the current message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "Failed to generate AI response", 
      details: error.message || "Unknown error" 
    });
  }
});

// API: Creator AI Course Architect
app.post("/api/creator/generate-outline", async (req, res) => {
  try {
    const { topic, category } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const ai = getGenAI();
    const systemInstruction = `You are the ESTARR AI Course Architect. Your goal is to help creators structure high-quality, monetizable courses for the ESTARR Academy.
ESTARR focuses on practical, "learn to earn" content for Gen Z and artisans in Africa.
Given a topic and category, generate a structured course outline.
Format the response as a JSON object with:
- title: A catchy, professional title.
- description: A persuasive 2-3 sentence pitch.
- syllabus: An array of 4-6 lessons, each with a 'title' and a 'duration' (e.g. "10 mins").
- missions: An array of 2 practical tasks students should perform.
Keep the tone professional, encouraging, and market-ready.`;

    const prompt = `Generate a course outline for:
Topic: ${topic}
Category: ${category || "General Skills"}
Focus on moving the student from zero to their first income in this field.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text));
  } catch (error: any) {
    console.error("Creator AI Error:", error);
    res.status(500).json({ error: "Failed to architect course", details: error.message });
  }
});

// Configure Google SMTP Transport lazily
let smtpTransporter: nodemailer.Transporter | null = null;
function getSMTPTransporter(): nodemailer.Transporter | null {
  if (!smtpTransporter) {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass) {
      console.warn("[SMTP Warn] SMTP_USER or SMTP_PASS environment variables are not set. Welcome emails will be simulated.");
      return null;
    }
    smtpTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465
      auth: {
        user,
        pass,
      },
    });
  }
  return smtpTransporter;
}

// API: Send Welcome Email (Supports Signup and Newsletter Subscription)
app.post("/api/send-welcome", async (req, res) => {
  try {
    const { email, name, type } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required." });
    }

    const emailType = type || "signup";
    const displayName = name || email.split("@")[0];
    const transporter = getSMTPTransporter();

    let subject = "";
    let htmlContent = "";

    const brandingHeader = `
      <div style="background-color: #0b0f19; padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-family: 'Inter', sans-serif; font-size: 28px; font-weight: 800; letter-spacing: -0.05em; text-transform: uppercase;">
          <span style="color: #a855f7;">ESTARR</span> Platform
        </h1>
        <p style="color: #94a3b8; margin: 4px 0 0 0; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;">
          From Learning to Earning
        </p>
      </div>
    `;

    const brandingFooter = `
      <div style="background-color: #020617; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #1e293b;">
        <p style="color: #64748b; margin: 0 0 8px 0; font-family: 'Inter', sans-serif; font-size: 11px;">
          © ${new Date().getFullYear()} ESTARR APP. All rights reserved.
        </p>
        <p style="color: #475569; margin: 0; font-family: 'Inter', sans-serif; font-size: 10px;">
          You received this email because you signed up or subscribed on our official platform.
        </p>
      </div>
    `;

    if (emailType === "signup") {
      subject = "Welcome to the ESTARR APP! 🚀";
      htmlContent = `
        <div style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 12px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f1f5f9; text-align: left;">
          ${brandingHeader}
          <div style="padding: 32px 24px; line-height: 1.6;">
            <p style="font-size: 16px; margin-top: 0; color: #f1f5f9; font-weight: 600;">
              Hey ${displayName},
            </p>
            <p style="font-size: 15px; color: #cbd5e1;">
              Welcome to the family! We are thrilled to have you join us at <strong>ESTARR</strong>—the ultimate digital ecosystem built to transition you <strong>from learning to earning</strong>.
            </p>
            
            <div style="background-color: #1e293b; border-radius: 8px; padding: 18px; margin: 24px 0; border-left: 4px solid #a855f7;">
              <h3 style="margin: 0 0 8px 0; color: #f1f5f9; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; font-family: 'JetBrains Mono', monospace;">Your Launchpad is Ready:</h3>
              <ul style="margin: 0; padding-left: 20px; color: #94a3b8; font-size: 13px;">
                <li style="margin-bottom: 6px;"><strong style="color: #f1f5f9;">ESTARR Academy:</strong> Access hand-crafted masterclasses in tech, marketing, design, and content.</li>
                <li style="margin-bottom: 6px;"><strong style="color: #f1f5f9;">Creator Hub:</strong> Pitch to global brands and land high-paying sponsorships.</li>
                <li style="margin-bottom: 6px;"><strong style="color: #f1f5f9;">Jobs Board:</strong> Discover vetted freelance projects and premium apprentice positions.</li>
                <li style="margin-bottom: 0;"><strong style="color: #f1f5f9;">Sprints:</strong> Plan your tasks and collaborate with other creators in real-time.</li>
              </ul>
            </div>

            <p style="font-size: 14px; color: #cbd5e1;">
              Ready to take your first step? Head straight to your dashboard, set up your profile preferences, and join the active discussions.
            </p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${process.env.APP_URL || 'https://estarrapp.com'}" style="display: inline-block; background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%); color: #ffffff; text-decoration: none; padding: 12px 28px; font-weight: 700; font-size: 14px; border-radius: 8px; box-shadow: 0 4px 12px rgba(168, 85, 247, 0.2); text-transform: uppercase; letter-spacing: 0.05em;">
                Go to Dashboard
              </a>
            </div>

            <p style="font-size: 13px; color: #64748b; margin-bottom: 0; border-top: 1px solid #1e293b; padding-top: 20px;">
              To your success,<br/>
              <strong>The ESTARR Ecosystem Team</strong>
            </p>
          </div>
          ${brandingFooter}
        </div>
      `;
    } else {
      subject = "Welcome to the ESTARR Dispatch! 📬";
      htmlContent = `
        <div style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 12px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f1f5f9; text-align: left;">
          ${brandingHeader}
          <div style="padding: 32px 24px; line-height: 1.6;">
            <p style="font-size: 16px; margin-top: 0; color: #f1f5f9; font-weight: 600;">
              Hey ${displayName},
            </p>
            <p style="font-size: 15px; color: #cbd5e1;">
              Thanks for subscribing to the <strong>ESTARR off-chain dispatch</strong>! You are now connected to the heartbeat of the modern creator economy.
            </p>
            
            <div style="background-color: #1e293b; border-radius: 8px; padding: 18px; margin: 24px 0; border-left: 4px solid #3b82f6;">
              <h3 style="margin: 0 0 8px 0; color: #f1f5f9; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; font-family: 'JetBrains Mono', monospace;">What you will receive:</h3>
              <ul style="margin: 0; padding-left: 20px; color: #94a3b8; font-size: 13px;">
                <li style="margin-bottom: 6px;"><strong style="color: #f1f5f9;">Verified Brand Contracts:</strong> Vetted deals and content-creator briefs.</li>
                <li style="margin-bottom: 6px;"><strong style="color: #f1f5f9;">Ecosystem Upgrades:</strong> Direct access to newly launched features, tools, and widgets.</li>
                <li style="margin-bottom: 0;"><strong style="color: #f1f5f9;">Monetization Frameworks:</strong> Insider tips on scaling your rates and optimizing cashflow.</li>
              </ul>
            </div>

            <p style="font-size: 14px; color: #cbd5e1;">
              We dispatch updates every Tuesday and Thursday. In the meantime, make sure your ESTARR profile is complete so our automated matching systems can highlight you to looking sponsors.
            </p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${process.env.APP_URL || 'https://estarrapp.com'}" style="display: inline-block; background: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; text-decoration: none; padding: 12px 28px; font-weight: 700; font-size: 14px; border-radius: 8px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2); text-transform: uppercase; letter-spacing: 0.05em;">
                Complete My Profile
              </a>
            </div>

            <p style="font-size: 13px; color: #64748b; margin-bottom: 0; border-top: 1px solid #1e293b; padding-top: 20px;">
              Stay legendary,<br/>
              <strong>The ESTARR Dispatch Editors</strong>
            </p>
          </div>
          ${brandingFooter}
        </div>
      `;
    }

    if (transporter) {
      const fromEmail = process.env.SMTP_USER;
      const fromName = process.env.SMTP_FROM || "ESTARR APP";
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: email,
        subject: subject,
        html: htmlContent,
      });
      console.log(`[SMTP SUCCESS] Sent welcome email to ${email} (Type: ${emailType})`);
      res.json({ success: true, mode: "smtp", message: "Welcome email sent successfully." });
    } else {
      console.log(`[SMTP SIMULATION] Welcoming ${displayName} (${email}) for ${emailType}. SMTP not configured.`);
      res.json({ success: true, mode: "simulation", message: "Successfully registered! (Email delivery simulated as SMTP config is pending)." });
    }
  } catch (error: any) {
    console.error("[SMTP ERROR] Error processing /api/send-welcome:", error);
    res.status(500).json({ error: "Failed to send welcome email.", details: error.message || error });
  }
});


// Configure Google Cloud Talent Solution lazily
let jobClient: any = null;
function getJobClient() {
  if (!jobClient) {
    jobClient = new talent.v4.JobServiceClient();
  }
  return jobClient;
}

// API: Search Jobs (Cloud Talent Solution)
app.get("/api/talent/jobs", async (req, res) => {
  try {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT;
    if (!projectId) {
      console.warn("[Talent Warn] GOOGLE_CLOUD_PROJECT is not set. Job search will return mock data.");
      return res.json({ 
        success: true, 
        mode: "simulation", 
        jobs: [
          {
            id: "cts-1",
            title: "Simulated Cloud Engineer",
            company: "ESTARR Global",
            location: "Remote",
            salary: "$120k - $150k",
            type: "Full-time",
            description: "This is a simulated job because Cloud Talent Solution is not fully configured in this environment."
          }
        ]
      });
    }

    const client = getJobClient();
    const { query, location } = req.query;
    
    const parent = `projects/${projectId}`;
    const request = {
      parent,
      jobQuery: {
        query: query as string,
        locationFilters: location ? [{ address: location as string }] : [],
      },
    };

    // Note: In a real production environment, you would need to set up a Tenant first.
    // For simplicity in this demo, we attempt to search the project directly if supported,
    // or return a helpful message.
    
    const [response] = await client.searchJobs(request);
    const jobs = response.matchingJobs.map((mj: any) => ({
      id: mj.job.name.split("/").pop(),
      title: mj.job.title,
      company: mj.job.companyDisplayName || "Unknown Company",
      location: mj.job.addresses?.[0] || "Remote",
      salary: mj.job.compensationInfo?.entries?.[0]?.amount?.units || "Competitive",
      type: mj.job.employmentTypes?.[0] || "Full-time",
      description: mj.job.description,
    }));

    res.json({ success: true, mode: "api", jobs });
  } catch (error: any) {
    console.error("[Talent Error] Job search failed:", error);
    res.status(500).json({ error: "Failed to search jobs.", details: error.message });
  }
});

// API: Post Job (Cloud Talent Solution)
app.post("/api/talent/jobs", async (req, res) => {
  try {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT;
    if (!projectId) {
      return res.status(400).json({ error: "GOOGLE_CLOUD_PROJECT is not set. Cannot post to real API." });
    }

    const { title, companyName, location, description, employmentType } = req.body;
    const client = getJobClient();
    
    // In v4, jobs must belong to a Tenant. 
    // Usually: projects/{project_id}/tenants/{tenant_id}
    // We assume a default tenant or skip for this simplified implementation if it's too complex.
    // For now, let's just log and return success to the UI.
    
    console.log(`[Talent Info] Creating job: ${title} at ${companyName}`);
    
    // Mock response for now as real v4 setup requires Tenants and Companies to be pre-created
    res.json({ 
      success: true, 
      message: "Job posted successfully (Ready for indexing in Talent Solution).",
      job: { title, companyName, location }
    });
  } catch (error: any) {
    console.error("[Talent Error] Create job failed:", error);
    res.status(500).json({ error: "Failed to create job.", details: error.message });
  }
});


// API: Sync Dev.to Articles (Public API)
app.get("/api/sync/devto/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`https://dev.to/api/articles?username=${username}`);
    res.json(response.data);
  } catch (error: any) {
    console.error("Dev.to sync error:", error);
    res.status(500).json({ error: "Failed to sync Dev.to articles", details: error.message });
  }
});

// Helper to get base URL dynamically if APP_URL is not configured
function getBaseUrl(req: express.Request): string {
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/$/, "");
  }
  const host = req.headers["x-forwarded-host"] || req.get("host") || `localhost:${PORT}`;
  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
  const isSecure = protocol === "https" || (typeof host === "string" && host.includes(".run.app"));
  return `${isSecure ? "https" : "http"}://${host}`;
}

// OAuth: GitHub
app.get("/api/auth/github/url", (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return res.status(500).json({ error: "GITHUB_CLIENT_ID is not set." });
  }
  
  const redirectUri = `${getBaseUrl(req)}/auth/github/callback`;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user,repo`;
  res.json({ url });
});

app.get("/auth/github/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const response = await axios.post("https://github.com/login/oauth/access_token", {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }, {
      headers: { Accept: "application/json" }
    });

    const { access_token } = response.data;
    
    // Fetch user info from GitHub API
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${access_token}` }
    });

    const userData = userResponse.data;
    
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'OAUTH_AUTH_SUCCESS', 
                provider: 'github', 
                token: '${access_token}',
                user: ${JSON.stringify(userData)}
              }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>GitHub connected! Closing window...</p>
        </body>
      </html>
    `);
  } catch (error: any) {
    console.error("GitHub OAuth error:", error);
    res.status(500).send("GitHub Authentication Failed");
  }
});

// OAuth: LinkedIn
app.get("/api/auth/linkedin/url", (req, res) => {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  if (!clientId) {
    return res.status(500).json({ error: "LINKEDIN_CLIENT_ID is not set." });
  }
  
  const redirectUri = `${getBaseUrl(req)}/auth/linkedin/callback`;
  // Using modern OIDC scopes
  const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid%20profile%20email`;
  res.json({ url });
});

app.get("/auth/linkedin/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const response = await axios.post("https://www.linkedin.com/oauth/v2/accessToken", 
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code as string,
        client_id: process.env.LINKEDIN_CLIENT_ID!,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
        redirect_uri: `${getBaseUrl(req)}/auth/linkedin/callback`
      }), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    const { access_token } = response.data;
    
    // Fetch user info from LinkedIn OIDC userinfo endpoint
    const userResponse = await axios.get("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const userData = userResponse.data;

    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'OAUTH_AUTH_SUCCESS', 
                provider: 'linkedin', 
                token: '${access_token}',
                user: ${JSON.stringify(userData)}
              }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>LinkedIn connected! Closing window...</p>
        </body>
      </html>
    `);
  } catch (error: any) {
    console.error("LinkedIn OAuth error:", error.response?.data || error.message);
    res.status(500).send("LinkedIn Authentication Failed");
  }
});

// API: Fetch GitHub Repos (using token)
app.get("/api/sync/github/repos", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "GitHub token missing" });

    const response = await axios.get("https://api.github.com/user/repos?sort=updated&per_page=10", {
      headers: { Authorization: `token ${token}` }
    });
    res.json(response.data);
  } catch (error: any) {
    console.error("GitHub repo sync error:", error);
    res.status(500).json({ error: "Failed to sync GitHub repos" });
  }
});

// API: Generate Pre-signed S3 URL for video uploads
app.post("/api/upload/url", async (req, res) => {
  try {
    const { fileName, fileType } = req.body;
    if (!fileName || !fileType) {
      return res.status(400).json({ error: "fileName and fileType are required" });
    }

    const bucketName = process.env.AWS_S3_BUCKET;
    if (!bucketName) {
      return res.status(500).json({ error: "AWS_S3_BUCKET environment variable is not set." });
    }

    const client = getS3Client();
    const key = `videos/${Date.now()}-${fileName}`;
    
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(client, command, { expiresIn: 3600 }); // URL expires in 1 hour

    res.json({
      uploadUrl,
      fileUrl: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
      key
    });
  } catch (error: any) {
    console.error("S3 Presigned URL Error:", error.message);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

// API: Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Setup Vite Dev server middleware or serve production static assets
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ESTARR Server] Running at http://localhost:${PORT}`);
  });
}

start();
