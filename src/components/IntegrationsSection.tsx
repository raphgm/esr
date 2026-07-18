import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { auth, saveUserProfile } from "../lib/firebase";
import { 
  Blocks, 
  Webhook, 
  Terminal, 
  Code2, 
  Award, 
  Check, 
  Copy, 
  Plus, 
  X, 
  ChevronRight, 
  Play, 
  Settings2, 
  Loader2, 
  RefreshCw, 
  AlertCircle, 
  ExternalLink, 
  FileCode, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Eye, 
  EyeOff, 
  Server,
  Slack,
  Github,
  Compass,
  Briefcase,
  Layers,
  Send,
  Database,
  Cpu
} from "lucide-react";
import { PageBanner } from "./PageBanner";
import { UserProfile } from "../types";

interface IntegrationsSectionProps {
  userProfile: UserProfile;
}

interface WebhookLog {
  id: string;
  timestamp: string;
  event: string;
  url: string;
  status: number;
  payload: string;
  response: string;
}

export const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({ userProfile }) => {
  const [activeSubTab, setActiveSubTab] = useState<"directory" | "credentials" | "badge" | "sandbox" | "guides">("directory");

  // Webhook and API Credentials state
  const [apiKey, setApiKey] = useState("est_live_4a9f9c8b7d6e5c4b3a2a1f0e");
  const [clientSecret, setClientSecret] = useState("est_sec_f9e8d7c6b5a493827160ffff");
  const [showSecret, setShowSecret] = useState(false);
  const [isRegeneratingKeys, setIsRegeneratingKeys] = useState(false);

  const [webhooks, setWebhooks] = useState([
    {
      id: "wh-1",
      url: "https://api.mycompany.com/v1/estarr-webhooks",
      events: ["applicant.vetted", "escrow.funded"],
      status: "active",
      secret: "whsec_99a88b77c66d"
    },
    {
      id: "wh-2",
      url: "https://discord.com/api/webhooks/9823749823749283",
      events: ["milestone.completed"],
      status: "active",
      secret: "whsec_22b33c44d55e"
    }
  ]);

  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [newWebhookEvents, setNewWebhookEvents] = useState<string[]>(["applicant.vetted"]);
  const [isAddingWebhook, setIsAddingWebhook] = useState(false);

  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([
    {
      id: "log-102",
      timestamp: "Just Now",
      event: "applicant.vetted",
      url: "https://api.mycompany.com/v1/estarr-webhooks",
      status: 200,
      payload: JSON.stringify({
        event: "applicant.vetted",
        timestamp: "2026-07-10T13:15:12Z",
        data: {
          applicantId: "app-849",
          name: "Sanya Olayemi",
          email: "sanya@expertdev.io",
          role: "Senior React & Node Engineer",
          cognitiveScore: "97%",
          reliabilityScore: "99.4%",
          status: "VERIFIED_TOP_3_PERCENT"
        }
      }, null, 2),
      response: '{"status":"received","processed":true}'
    },
    {
      id: "log-101",
      timestamp: "5 mins ago",
      event: "escrow.funded",
      url: "https://api.mycompany.com/v1/estarr-webhooks",
      status: 200,
      payload: JSON.stringify({
        event: "escrow.funded",
        timestamp: "2026-07-10T13:10:05Z",
        data: {
          escrowId: "esc-4402",
          amountUsd: 14500,
          milestoneTitle: "Phase 1: ML Model Orchestration Setup",
          clientEmail: userProfile?.email || "client@enterprise.com",
          contractorId: "dev-8123"
        }
      }, null, 2),
      response: '{"status":"ok"}'
    }
  ]);

  // Apps integration state
  const [appIntegrations, setAppIntegrations] = useState([
    {
      id: "slack",
      name: "Slack Notify",
      desc: "Receive real-time vetting updates, milestone escrow events, and contract approvals directly inside your designated workspace channel.",
      icon: Slack,
      accent: "from-pink-500 to-amber-500",
      connected: true,
      config: { channel: "#estarr-talent-feed", events: ["Applicant Verified", "Contract Funded"] }
    },
    {
      id: "github",
      name: "GitHub Sync",
      desc: "Automatically sync developer workspace histories, parse public repository skill matrices, and verify tech-stack expertise using custom AI models.",
      icon: Github,
      accent: "from-slate-800 to-slate-900",
      connected: false,
      config: { org: "", repoSync: true }
    },
    {
      id: "jira",
      name: "Jira Taskmaster",
      desc: "Synchronize approved ESTARR IT consultancy tasks as issues in your Jira boards, tracking milestones and automating status syncing upon escrow disbursements.",
      icon: Blocks,
      accent: "from-blue-600 to-indigo-500",
      connected: false,
      config: { projectKey: "EST", autoCreate: true }
    },
    {
      id: "greenhouse",
      name: "Greenhouse ATS",
      desc: "Push successfully vetted candidates with their associated Cognitive Profile Audits and Technical Skill Matrices directly into your recruitment pipeline.",
      icon: Server,
      accent: "from-emerald-500 to-teal-600",
      connected: false,
      config: { apiKey: "", departmentId: "Tech" }
    }
  ]);

  const [selectedAppConfig, setSelectedAppConfig] = useState<string | null>(null);

  // Badge Generator state
  const [badgeTheme, setBadgeTheme] = useState<"cosmic" | "emerald" | "amber" | "dark">("cosmic");
  const [badgeSize, setBadgeSize] = useState<"small" | "medium" | "large">("medium");
  const [badgeType, setBadgeType] = useState<"client" | "talent">("client");
  const [copiedBadgeCode, setCopiedBadgeCode] = useState(false);

  // API Playground / Sandbox state
  const [sandboxEndpoint, setSandboxEndpoint] = useState<string>("GET /api/v1/talent/list");
  const [sandboxResponse, setSandboxResponse] = useState<string>("// Select an endpoint and click 'Send Request' to query the ESTARR REST API.");
  const [isSandboxLoading, setIsSandboxLoading] = useState(false);
  const [sandboxVariables, setSandboxVariables] = useState({
    limit: "5",
    role: "AI Orchestration",
    vettedOnly: "true"
  });

  // Guides state
  const [guideLanguage, setGuideLanguage] = useState<"node" | "python" | "curl" | "go">("node");
  const [copiedCode, setCopiedCode] = useState(false);

  // Firestore Persistence helper
  const persist = async (updatedFields: Partial<UserProfile>) => {
    if (auth.currentUser) {
      try {
        await saveUserProfile(auth.currentUser.uid, updatedFields);
      } catch (err) {
        console.error("Failed to save integrations to Firestore:", err);
      }
    }
  };

  // Sync user profile data from Firestore on mount and profile update
  useEffect(() => {
    if (userProfile) {
      if (userProfile.apiKey) setApiKey(userProfile.apiKey);
      if (userProfile.clientSecret) setClientSecret(userProfile.clientSecret);
      if (userProfile.webhooks) setWebhooks(userProfile.webhooks);
      if (userProfile.webhookLogs) setWebhookLogs(userProfile.webhookLogs);
      if (userProfile.badgeTheme) setBadgeTheme(userProfile.badgeTheme);
      if (userProfile.badgeSize) setBadgeSize(userProfile.badgeSize);
      if (userProfile.badgeType) setBadgeType(userProfile.badgeType);
      
      if (userProfile.appIntegrations) {
        setAppIntegrations(prev => prev.map(staticApp => {
          const dbApp = userProfile.appIntegrations?.find((a: any) => a.id === staticApp.id);
          if (dbApp) {
            return {
              ...staticApp,
              connected: dbApp.connected,
              config: dbApp.config || staticApp.config
            };
          }
          return staticApp;
        }));
      }
    }
  }, [userProfile]);

  // Webhook action helpers
  const handleAddWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWebhookUrl) return;
    const newWh = {
      id: "wh-" + Date.now(),
      url: newWebhookUrl,
      events: [...newWebhookEvents],
      status: "active",
      secret: "whsec_" + Math.random().toString(36).substring(2, 14)
    };
    
    const updatedWebhooks = [...webhooks, newWh];
    setWebhooks(updatedWebhooks);
    setNewWebhookUrl("");
    setIsAddingWebhook(false);

    const initialLog: WebhookLog = {
      id: "log-" + Math.floor(Math.random() * 1000),
      timestamp: "Just Now",
      event: "webhook.created",
      url: newWebhookUrl,
      status: 200,
      payload: JSON.stringify({
        event: "webhook.created",
        endpoint: newWebhookUrl,
        subscribedEvents: newWebhookEvents,
        secret: newWh.secret
      }, null, 2),
      response: '{"status":"ready","registered":true}'
    };
    const updatedLogs = [initialLog, ...webhookLogs];
    setWebhookLogs(updatedLogs);

    await persist({
      webhooks: updatedWebhooks,
      webhookLogs: updatedLogs
    });
  };

  const handleDeleteWebhook = async (id: string) => {
    const updatedWebhooks = webhooks.filter(w => w.id !== id);
    setWebhooks(updatedWebhooks);
    await persist({
      webhooks: updatedWebhooks
    });
  };

  // Dispatches actual live POST requests with SHA256 HMAC Signatures using our proxy route
  const handleSimulateWebhook = async (endpointUrl: string, eventName: string) => {
    const payloadData: Record<string, any> = {
      "applicant.vetted": {
        applicantId: "app-302",
        name: "Chinonso Eze",
        email: "chinonso.eze@stackmaster.co",
        role: "Distributed Database Specialist",
        cognitiveScore: "98.5%",
        reliabilityScore: "99.1%",
        status: "VERIFIED_TOP_3_PERCENT"
      },
      "escrow.funded": {
        escrowId: "esc-908",
        amountUsd: 8500,
        milestoneTitle: "Database Performance Optimizations",
        clientEmail: userProfile?.email || "enterprise@co.uk",
        contractorId: "dev-034"
      },
      "milestone.completed": {
        milestoneId: "ms-8801",
        title: "API Gateway Integration & Stress Testing",
        escrowAmount: 6200,
        disbursed: true,
        completionDate: "2026-07-10T13:15:12Z"
      }
    };

    const simPayload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      livemode: false,
      data: payloadData[eventName] || { info: "Simulated ESTARR webhook packet" }
    };

    const wh = webhooks.find(w => w.url === endpointUrl);
    const secret = wh ? wh.secret : "";

    const dispatchingLog: WebhookLog = {
      id: "log-temp-" + Date.now(),
      timestamp: "Just Now",
      event: eventName,
      url: endpointUrl,
      status: 0,
      payload: JSON.stringify(simPayload, null, 2),
      response: "Dispatching payload through ESTARR Webhook Gateway..."
    };
    
    setWebhookLogs(prev => [dispatchingLog, ...prev]);

    try {
      const response = await fetch("/api/v1/webhooks/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: endpointUrl,
          event: eventName,
          payload: simPayload,
          secret: secret
        })
      });

      const resData = await response.json();
      
      const realLog: WebhookLog = {
        id: "log-" + Math.floor(Math.random() * 100000),
        timestamp: "Just Now",
        event: eventName,
        url: endpointUrl,
        status: resData.status,
        payload: JSON.stringify(simPayload, null, 2),
        response: resData.responseBody || `HTTP ${resData.status}: ${resData.statusText}`
      };

      setWebhookLogs(prev => {
        const filtered = prev.filter(l => l.id !== dispatchingLog.id);
        const nextLogs = [realLog, ...filtered];
        persist({ webhookLogs: nextLogs });
        return nextLogs;
      });

    } catch (err: any) {
      const errorLog: WebhookLog = {
        id: "log-" + Math.floor(Math.random() * 100000),
        timestamp: "Just Now",
        event: eventName,
        url: endpointUrl,
        status: 500,
        payload: JSON.stringify(simPayload, null, 2),
        response: `Gateway Dispatch Error: ${err.message}`
      };

      setWebhookLogs(prev => {
        const filtered = prev.filter(l => l.id !== dispatchingLog.id);
        const nextLogs = [errorLog, ...filtered];
        persist({ webhookLogs: nextLogs });
        return nextLogs;
      });
    }
  };

  const handleRegenerateKeys = () => {
    setIsRegeneratingKeys(true);
    setTimeout(async () => {
      const newKey = "est_live_" + Math.random().toString(36).substring(2, 14) + Math.random().toString(36).substring(2, 14);
      const newSec = "est_sec_" + Math.random().toString(36).substring(2, 14) + Math.random().toString(36).substring(2, 14);
      setApiKey(newKey);
      setClientSecret(newSec);
      setIsRegeneratingKeys(false);
      await persist({
        apiKey: newKey,
        clientSecret: newSec
      });
    }, 1200);
  };

  // App toggle helpers
  const handleToggleApp = async (id: string) => {
    const updatedApps = appIntegrations.map(app => {
      if (app.id === id) {
        if (!app.connected) {
          setSelectedAppConfig(id);
        }
        return { ...app, connected: !app.connected };
      }
      return app;
    });
    setAppIntegrations(updatedApps);
    
    const dbApps = updatedApps.map(a => ({
      id: a.id,
      name: a.name,
      desc: a.desc,
      accent: a.accent,
      connected: a.connected,
      config: a.config
    }));
    await persist({
      appIntegrations: dbApps
    });
  };

  // Real API Gateway Sandbox runner
  const handleRunSandbox = async () => {
    setIsSandboxLoading(true);
    setSandboxResponse("// Routing secure pipeline...\n// Dispatched. Querying ESTARR Gateway Router...");

    try {
      let url = "";
      let options: RequestInit = { method: "GET" };

      if (sandboxEndpoint === "GET /api/v1/talent/list") {
        url = `/api/v1/talent/list?role=${encodeURIComponent(sandboxVariables.role)}&limit=${encodeURIComponent(sandboxVariables.limit)}&vettedOnly=${encodeURIComponent(sandboxVariables.vettedOnly)}`;
      } else if (sandboxEndpoint === "POST /api/v1/escrow/create") {
        url = "/api/v1/escrow/create";
        options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Production System Migration - Node/Postgres",
            amount: 12500,
            clientName: userProfile?.name || "Enterprise Sponsor",
            clientEmail: userProfile?.email || "sponsor@enterprise.com"
          })
        };
      } else {
        url = "/api/v1/vetting/report/sanya";
      }

      const response = await fetch(url, options);
      const data = await response.json();

      setSandboxResponse(JSON.stringify({
        headers: {
          "Content-Type": "application/json",
          "X-Estarr-Server-Time": new Date().toISOString(),
          "Server": "ESTARR-Gateway/4.11.0",
          "X-RateLimit-Limit": 1000,
          "X-RateLimit-Remaining": 998
        },
        statusCode: response.status,
        statusText: response.statusText,
        responseTime: "14ms",
        body: data
      }, null, 2));

    } catch (err: any) {
      setSandboxResponse(JSON.stringify({
        error: "Sandbox request failed",
        message: err.message
      }, null, 2));
    } finally {
      setIsSandboxLoading(false);
    }
  };

  // Badge state handlers that sync with Firestore
  const handleSetBadgeTheme = (theme: "cosmic" | "emerald" | "amber" | "dark") => {
    setBadgeTheme(theme);
    persist({ badgeTheme: theme });
  };

  const handleSetBadgeSize = (size: "small" | "medium" | "large") => {
    setBadgeSize(size);
    persist({ badgeSize: size });
  };

  const handleSetBadgeType = (type: "client" | "talent") => {
    setBadgeType(type);
    persist({ badgeType: type });
  };

  // Badge Customizer Code Getter
  const getBadgeCode = () => {
    const themeStr = badgeTheme;
    const sizeStr = badgeSize === "small" ? "90px" : badgeSize === "medium" ? "120px" : "150px";
    const typeStr = badgeType;

    return `<!-- ESTARR Verified Expert Badge -->
<div id="estarr-badge" data-theme="${themeStr}" data-type="${typeStr}" style="width: ${sizeStr}; display: inline-block;">
  <a href="https://estarrapp.com/verify/${userProfile?.email ? encodeURIComponent(userProfile.email) : "expert"}" target="_blank" rel="noopener noreferrer">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto;">
      <defs>
        <linearGradient id="badgeGrad-${themeStr}" x1="0%" y1="0%" x2="100%" y2="100%">
          ${themeStr === "cosmic" ? '<stop offset="0%" stop-color="#9D50BB" /><stop offset="100%" stop-color="#6E48AA" />' : ""}
          ${themeStr === "emerald" ? '<stop offset="0%" stop-color="#10B981" /><stop offset="100%" stop-color="#059669" />' : ""}
          ${themeStr === "amber" ? '<stop offset="0%" stop-color="#F59E0B" /><stop offset="100%" stop-color="#D97706" />' : ""}
          ${themeStr === "dark" ? '<stop offset="0%" stop-color="#1E293B" /><stop offset="100%" stop-color="#0F172A" />' : ""}
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#badgeGrad-${themeStr})" />
      <path d="M100 40 L112.5 78.5 H153 L120.25 102.5 L132.75 141 L100 117 L67.25 141 L79.75 102.5 L47 78.5 H87.5 L100 40 Z" fill="white" />
      <text x="100" y="172" fill="white" font-family="system-ui, sans-serif" font-size="14" font-weight="900" letter-spacing="1.5" text-anchor="middle">
        ${typeStr === "client" ? "ESTARR CLIENT" : "VERIFIED EXPERT"}
      </text>
      <circle cx="100" cy="100" r="85" fill="none" stroke="white" stroke-width="1.5" stroke-dasharray="8 8" opacity="0.35" />
    </svg>
  </a>
</div>`;
  };

  // Code snippets by language
  const codeSnippets = {
    node: `const axios = require('axios');

// Initialize the ESTARR Client
const estarr = axios.create({
  baseURL: 'https://api.estarrapp.com/v1',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  }
});

// Fetch Top Verified Vetted Developers
async function getVerifiedTalent() {
  try {
    const response = await estarr.get('/talent/list', {
      params: {
        role: '${sandboxVariables.role}',
        limit: ${sandboxVariables.limit},
        vettedOnly: true
      }
    });
    console.log('Verified Experts:', response.data.data);
  } catch (error) {
    console.error('Integration Error:', error.response ? error.response.data : error.message);
  }
}

getVerifiedTalent();`,

    python: `import requests

# Set headers and parameters
headers = {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
}

params = {
    "role": "${sandboxVariables.role}",
    "limit": ${sandboxVariables.limit},
    "vettedOnly": "true"
}

# Request verified talent list
url = "https://api.estarrapp.com/v1/talent/list"
response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    talent_data = response.json()
    print(f"Verified Experts: {talent_data['data']}")
else:
    print(f"Error {response.status_code}: {response.text}")`,

    curl: `curl -X GET "https://api.estarrapp.com/v1/talent/list?role=${encodeURIComponent(sandboxVariables.role)}&limit=${sandboxVariables.limit}&vettedOnly=true" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json"`,

    go: `package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
)

func main() {
	baseURL := "https://api.estarrapp.com/v1/talent/list"
	params := url.Values{}
	params.Add("role", "${sandboxVariables.role}")
	params.Add("limit", "${sandboxVariables.limit}")
	params.Add("vettedOnly", "true")

	fullURL := fmt.Sprintf("%s?%s", baseURL, params.Encode())
	req, _ := http.NewRequest("GET", fullURL, nil)
	req.Header.Add("Authorization", "Bearer ${apiKey}")
	req.Header.Add("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("HTTP Request Failed:", err)
		return
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	fmt.Println("ESTARR API Response status:", resp.Status)
	fmt.Println("Payload JSON:", string(body))
}`
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <PageBanner
        title="ESTARR Integrations"
        subtitle="Ecosystem Gateway"
        description="Bridge your local systems with ESTARR's vetting pipelines. Synchronize developers into ATS profiles, dispatch Slack alerts for escrow achievements, and trigger real-time webhooks on candidate qualifications."
        icon={Blocks}
      />

      {/* Mini Overview Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Active Triggers</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{webhooks.length} Endpoints</h3>
            <p className="text-[10px] text-emerald-600 font-bold mt-1">● SSL Secured Handshakes</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <Webhook className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">REST API Rate Limit</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">1,000 req/min</h3>
            <p className="text-[10px] text-slate-500 font-medium mt-1">0% consumed in last 24h</p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <Server className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">System Handshakes</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">0.04ms Velocity</h3>
            <p className="text-[10px] text-purple-600 font-bold mt-1">AI Automated Event Sync</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <Cpu className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Ecosystem Status</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">Vetted & Encrypted</h3>
            <p className="text-[10px] text-emerald-600 font-bold mt-1">Off-chain Vault Security</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 max-w-fit">
        <button
          onClick={() => setActiveSubTab("directory")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSubTab === "directory"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Blocks className="w-4 h-4 text-purple-600" />
          <span>App Directory</span>
        </button>

        <button
          onClick={() => setActiveSubTab("credentials")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSubTab === "credentials"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Webhook className="w-4 h-4 text-purple-600" />
          <span>API & Webhooks</span>
        </button>

        <button
          onClick={() => setActiveSubTab("badge")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSubTab === "badge"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Award className="w-4 h-4 text-purple-600" />
          <span>Embeddable Badges</span>
        </button>

        <button
          onClick={() => setActiveSubTab("sandbox")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSubTab === "sandbox"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Terminal className="w-4 h-4 text-purple-600" />
          <span>API Sandbox</span>
        </button>

        <button
          onClick={() => setActiveSubTab("guides")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSubTab === "guides"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Code2 className="w-4 h-4 text-purple-600" />
          <span>Guides & SDKs</span>
        </button>
      </div>

      {/* Main Subtab Workspace View */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-xs min-h-[400px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: App Directories */}
          {activeSubTab === "directory" && (
            <motion.div
              key="directory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900">Pre-built Application Hub</h2>
                <p className="text-xs text-slate-500 mt-1">Activate instant integrations with your preferred team messaging, task boards, and talent applicant tracking databases in just one click.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {appIntegrations.map((app) => {
                  const Icon = app.icon;
                  return (
                    <div 
                      key={app.id} 
                      className={`border rounded-xl p-5 flex flex-col justify-between transition-all relative overflow-hidden ${
                        app.connected 
                          ? "bg-slate-50/50 border-purple-200 shadow-xs" 
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div>
                        {/* Gradient corner accent */}
                        <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${app.accent}`} />
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                              <Icon className="w-5 h-5 text-slate-800" />
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900 text-sm">{app.name}</h3>
                              <span className="text-[10px] font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-bold">ESTARR SDK</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {app.connected ? (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                Active
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                                Disconnected
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-slate-600 text-xs leading-relaxed mb-4">{app.desc}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                        {app.connected ? (
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                            <Settings2 className="w-3.5 h-3.5" />
                            {app.id === "slack" && `Target: ${app.config.channel}`}
                            {app.id === "github" && "Portfolios synced"}
                            {app.id === "jira" && `Key: ${app.config.projectKey}`}
                            {app.id === "greenhouse" && `ATS: ${app.config.departmentId}`}
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">No credentials configured</span>
                        )}

                        <div className="flex gap-2">
                          {app.connected && (
                            <button
                              onClick={() => setSelectedAppConfig(selectedAppConfig === app.id ? null : app.id)}
                              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg cursor-pointer flex items-center gap-1.5"
                            >
                              <Settings2 className="w-3 h-3" />
                              Configure
                            </button>
                          )}
                          <button
                            onClick={() => handleToggleApp(app.id)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer transition-colors ${
                              app.connected
                                ? "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                                : "bg-purple-600 text-white hover:bg-purple-700"
                            }`}
                          >
                            {app.connected ? "Disconnect" : "Connect"}
                          </button>
                        </div>
                      </div>

                      {/* Expandable app configuration panel */}
                      <AnimatePresence>
                        {selectedAppConfig === app.id && app.connected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden border-t border-slate-100 mt-4 pt-4 flex flex-col gap-3 text-xs"
                          >
                            <h4 className="font-bold text-slate-800 flex items-center gap-1">
                              <Settings2 className="w-3.5 h-3.5 text-purple-600" />
                              <span>{app.name} Configuration</span>
                            </h4>
                            {app.id === "slack" && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[9px]">Notification Channel</label>
                                  <input
                                    type="text"
                                    value={app.config.channel}
                                    onChange={(e) => {
                                      const updated = [...appIntegrations];
                                      updated[0].config.channel = e.target.value;
                                      setAppIntegrations(updated);
                                    }}
                                    className="bg-white border border-slate-200 px-2 py-1.5 text-slate-800 rounded-lg focus:outline-none focus:border-purple-500 font-mono text-[11px]"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[9px]">Subscribed Actions</label>
                                  <div className="flex flex-wrap gap-1.5 mt-1">
                                    {["Applicant Verified", "Contract Funded", "Escrow Released"].map((ev) => (
                                      <span key={ev} className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full font-bold text-[9px]">
                                        {ev}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {app.id === "github" && (
                              <div className="flex flex-col gap-2">
                                <p className="text-[10px] text-slate-500 leading-relaxed">Connect your organization to automatically verify public repositories, sync developers' contribution metrics, and issue ESTARR verified badges to candidate profiles.</p>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="your-github-org"
                                    className="bg-white border border-slate-200 px-2 py-1.5 text-slate-800 rounded-lg focus:outline-none focus:border-purple-500 flex-1 font-mono text-[11px]"
                                  />
                                  <button className="bg-slate-900 text-white font-bold px-3 py-1 text-[10px] rounded-lg cursor-pointer hover:bg-slate-800">
                                    Authenticate Org
                                  </button>
                                </div>
                              </div>
                            )}

                            {app.id === "jira" && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[9px]">Jira Project Key</label>
                                  <input
                                    type="text"
                                    value={app.config.projectKey}
                                    onChange={(e) => {
                                      const updated = [...appIntegrations];
                                      updated[2].config.projectKey = e.target.value;
                                      setAppIntegrations(updated);
                                    }}
                                    className="bg-white border border-slate-200 px-2 py-1.5 text-slate-800 rounded-lg focus:outline-none focus:border-purple-500 font-mono text-[11px]"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[9px]">Auto Sync Status</label>
                                  <div className="flex items-center gap-1.5 mt-2">
                                    <input type="checkbox" id="jiraAuto" defaultChecked className="rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
                                    <label htmlFor="jiraAuto" className="text-[10px] font-medium text-slate-600">Close task in Jira when Escrow is released</label>
                                  </div>
                                </div>
                              </div>
                            )}

                            {app.id === "greenhouse" && (
                              <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[9px]">Greenhouse Harvest API Key</label>
                                  <div className="relative">
                                    <Lock className="absolute left-2.5 top-2.5 w-3 h-3 text-slate-400" />
                                    <input
                                      type="password"
                                      placeholder="••••••••••••••••••••••••"
                                      className="bg-white border border-slate-200 pl-8 pr-2 py-1.5 text-slate-800 rounded-lg focus:outline-none focus:border-purple-500 w-full font-mono text-[11px]"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="flex justify-end gap-1.5 mt-2">
                              <button
                                onClick={async () => {
                                  // Save to Firestore (stripping non-serializable Lucide icons)
                                  const dbApps = appIntegrations.map(a => ({
                                    id: a.id,
                                    name: a.name,
                                    desc: a.desc,
                                    accent: a.accent,
                                    connected: a.connected,
                                    config: a.config
                                  }));
                                  await persist({ appIntegrations: dbApps });
                                  setSelectedAppConfig(null);
                                }}
                                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold rounded-md cursor-pointer"
                              >
                                Save Changes
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 2: API Keys & Webhooks */}
          {activeSubTab === "credentials" && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900">Developer API Keys & Webhook Listeners</h2>
                <p className="text-xs text-slate-500 mt-1">Acquire secure platform authentication credentials or configure webhook subscriptions to trigger off custom actions across your production backends.</p>
              </div>

              {/* Developer Keys Module */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-600" />
                    <h3 className="font-bold text-slate-900 text-sm">REST API Authentication</h3>
                  </div>
                  <button
                    disabled={isRegeneratingKeys}
                    onClick={handleRegenerateKeys}
                    className="text-[10px] font-bold uppercase tracking-wider text-purple-600 hover:text-purple-700 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                  >
                    {isRegeneratingKeys ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Regenerating...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Regenerate Credentials</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Client Public ID (API Key)</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={apiKey}
                        className="bg-white border border-slate-200 px-3 py-2 text-slate-800 rounded-lg text-xs font-mono select-all focus:outline-none flex-1"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(apiKey);
                          alert("Client Public ID copied to clipboard.");
                        }}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 cursor-pointer flex items-center justify-center shrink-0"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Client Secret</span>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type={showSecret ? "text" : "password"}
                          readOnly
                          value={clientSecret}
                          className="bg-white border border-slate-200 pl-3 pr-9 py-2 text-slate-800 rounded-lg text-xs font-mono select-all focus:outline-none w-full"
                        />
                        <button
                          onClick={() => setShowSecret(!showSecret)}
                          className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(clientSecret);
                          alert("Client Secret copied to clipboard.");
                        }}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 cursor-pointer flex items-center justify-center shrink-0"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50/50 border border-purple-100 text-purple-950 p-3 rounded-lg text-[11px] leading-relaxed flex items-start gap-2.5 mt-1">
                  <AlertCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Security Protocol Notice:</strong> Never hardcode API keys or secrets directly in client-side bundles. Always store these values in environment variables on your private servers and proxy calls to preserve your security architecture.
                  </p>
                </div>
              </div>

              {/* Webhook Settings Module */}
              <div className="border border-slate-200 rounded-xl p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Webhook className="w-4 h-4 text-purple-600" />
                    <h3 className="font-bold text-slate-900 text-sm">Active Webhook Listeners</h3>
                  </div>
                  <button
                    onClick={() => setIsAddingWebhook(!isAddingWebhook)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Webhook Endpoint</span>
                  </button>
                </div>

                {isAddingWebhook && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleAddWebhook}
                    className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col gap-3 text-xs"
                  >
                    <h4 className="font-bold text-slate-800">Configure Webhook Endpoint</h4>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                      <div className="md:col-span-8 flex flex-col gap-1">
                        <label className="font-bold text-slate-600 text-[10px]">Endpoint URL</label>
                        <input
                          type="url"
                          required
                          placeholder="https://yourserver.com/webhooks/estarr"
                          value={newWebhookUrl}
                          onChange={(e) => setNewWebhookUrl(e.target.value)}
                          className="bg-white border border-slate-200 px-3 py-2 text-slate-800 rounded-lg focus:outline-none focus:border-purple-500 font-mono text-[11px]"
                        />
                      </div>

                      <div className="md:col-span-4 flex flex-col gap-1">
                        <label className="font-bold text-slate-600 text-[10px]">Event Subscription</label>
                        <div className="flex flex-col gap-1.5 mt-1.5">
                          {[
                            { code: "applicant.vetted", label: "Applicant Vetted" },
                            { code: "escrow.funded", label: "Escrow Funded" },
                            { code: "milestone.completed", label: "Milestone Completed" }
                          ].map((ev) => (
                            <label key={ev.code} className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                              <input
                                type="checkbox"
                                checked={newWebhookEvents.includes(ev.code)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewWebhookEvents([...newWebhookEvents, ev.code]);
                                  } else {
                                    setNewWebhookEvents(newWebhookEvents.filter(x => x !== ev.code));
                                  }
                                }}
                                className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                              />
                              <span>{ev.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 border-t border-slate-200 pt-3 mt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingWebhook(false)}
                        className="px-3 py-1.5 bg-slate-150 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg cursor-pointer"
                      >
                        Add Endpoint
                      </button>
                    </div>
                  </motion.form>
                )}

                <div className="flex flex-col gap-3">
                  {webhooks.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs italic">
                      No webhook endpoints configured. Click the button above to register one!
                    </div>
                  ) : (
                    webhooks.map((wh) => (
                      <div key={wh.id} className="border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white hover:bg-slate-50/40 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <p className="font-mono text-xs font-bold text-slate-800 break-all">{wh.url}</p>
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase rounded-full border border-emerald-100 shrink-0">
                              {wh.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {wh.events.map((ev) => (
                              <span key={ev} className="px-2 py-0.5 bg-purple-50 text-purple-600 font-mono font-bold text-[9px] rounded-md">
                                {ev}
                              </span>
                            ))}
                            <span className="text-[10px] font-mono text-slate-400 mt-0.5 ml-1">
                              Secret: <code className="bg-slate-100 px-1 py-0.5 rounded text-[9px]">{wh.secret}</code>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                          {/* Simulated webhook button */}
                          <div className="relative group">
                            <button
                              onClick={() => handleSimulateWebhook(wh.url, wh.events[0] || "applicant.vetted")}
                              className="px-2.5 py-1 text-[10px] font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg cursor-pointer flex items-center gap-1.5"
                              title="Send simulated test request"
                            >
                              <Play className="w-3 h-3" />
                              Test Hook
                            </button>
                          </div>

                          <button
                            onClick={() => handleDeleteWebhook(wh.id)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg cursor-pointer"
                            title="Delete Endpoint"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Webhook Live Logger Console */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Live Webhook Request Streams</span>
                  <button 
                    onClick={() => setWebhookLogs([])}
                    className="text-[10px] font-bold text-slate-400 hover:text-slate-600 cursor-pointer uppercase font-mono"
                  >
                    Clear Terminal logs
                  </button>
                </div>

                <div className="bg-slate-950 text-slate-300 rounded-xl p-4 border border-slate-900 font-mono text-[11px] leading-relaxed shadow-inner">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2.5">
                    <span className="text-purple-400 font-bold">📡 ESTARR EVENT_BUS TERMINAL</span>
                    <span className="text-[9px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded">STATUS: LISTENING</span>
                  </div>

                  <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
                    {webhookLogs.length === 0 ? (
                      <div className="text-slate-600 italic py-4 text-center">
                        Waiting for hook triggers. Click "Test Hook" on an active listener to fire a mock transaction...
                      </div>
                    ) : (
                      webhookLogs.map((log) => (
                        <div key={log.id} className="border-b border-slate-900/60 pb-3 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 flex-wrap gap-1">
                            <span className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <strong className="text-white">{log.event}</strong>
                              <span>→ {log.url}</span>
                            </span>
                            <span>{log.timestamp}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1.5 bg-slate-900/40 p-2.5 rounded border border-slate-900">
                            <div>
                              <div className="text-[9px] font-bold uppercase text-slate-500 mb-1">Payload Sent</div>
                              <pre className="text-[10px] text-slate-300 overflow-x-auto whitespace-pre">{log.payload}</pre>
                            </div>
                            <div>
                              <div className="text-[9px] font-bold uppercase text-slate-500 mb-1 flex items-center justify-between">
                                <span>Response Status</span>
                                <span className="text-emerald-400 font-bold font-mono">HTTP {log.status}</span>
                              </div>
                              <pre className="text-[10px] text-slate-300 overflow-x-auto whitespace-pre">{log.response}</pre>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Embeddable Badges */}
          {activeSubTab === "badge" && (
            <motion.div
              key="badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900">Verifiable ESTARR Trust Badge</h2>
                <p className="text-xs text-slate-500 mt-1">Configure and embed a secure verification badge on your corporate website, greenhouse dashboard, or IT portfolio page to display real-time ESTARR authentication status.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Customizer Panel */}
                <div className="lg:col-span-5 flex flex-col gap-4 border border-slate-200 p-5 rounded-xl bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 text-sm">Badge Parameters</h3>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Verification Class</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleSetBadgeType("client")}
                        className={`py-2 px-3 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          badgeType === "client"
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        Client Member
                      </button>
                      <button
                        onClick={() => handleSetBadgeType("talent")}
                        className={`py-2 px-3 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          badgeType === "talent"
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        Verified Expert
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Visual Theme</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: "cosmic", name: "Violet", bg: "bg-gradient-to-tr from-purple-600 to-indigo-600" },
                        { id: "emerald", name: "Emerald", bg: "bg-gradient-to-tr from-emerald-500 to-teal-600" },
                        { id: "amber", name: "Amber", bg: "bg-gradient-to-tr from-amber-500 to-orange-500" },
                        { id: "dark", name: "Charcoal", bg: "bg-slate-900" }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => handleSetBadgeTheme(t.id as any)}
                          className={`p-2 rounded-lg border flex flex-col items-center gap-1.5 transition-all text-[10px] font-bold cursor-pointer ${
                            badgeTheme === t.id
                              ? "border-purple-600 bg-white"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full ${t.bg}`} />
                          <span>{t.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Widget Dimension</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["small", "medium", "large"] as const).map((sz) => (
                        <button
                          key={sz}
                          onClick={() => handleSetBadgeSize(sz)}
                          className={`py-1.5 px-3 border rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                            badgeSize === sz
                              ? "bg-purple-50 border-purple-400 text-purple-700 font-bold"
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preview and Embed Codes */}
                <div className="lg:col-span-7 flex flex-col gap-5 border border-slate-200 rounded-xl p-5">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Rendering Sandbox & Embed Code</span>
                  
                  {/* Actual visual preview */}
                  <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl flex flex-col items-center justify-center relative min-h-[180px]">
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-mono text-slate-400 font-bold uppercase">
                      Live Preview
                    </div>

                    <div 
                      className="transition-all duration-300 transform hover:scale-105 hover:rotate-1"
                      style={{ 
                        width: badgeSize === "small" ? "100px" : badgeSize === "medium" ? "140px" : "180px",
                        display: "inline-block" 
                      }}
                    >
                      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-md">
                        <defs>
                          <linearGradient id="badgeGrad-preview" x1="0%" y1="0%" x2="100%" y2="100%">
                            {badgeTheme === "cosmic" && <><stop offset="0%" stopColor="#9D50BB" /><stop offset="100%" stopColor="#6E48AA" /></>}
                            {badgeTheme === "emerald" && <><stop offset="0%" stopColor="#10B981" /><stop offset="100%" stopColor="#059669" /></>}
                            {badgeTheme === "amber" && <><stop offset="0%" stopColor="#F59E0B" /><stop offset="100%" stopColor="#D97706" /></>}
                            {badgeTheme === "dark" && <><stop offset="0%" stopColor="#1E293B" /><stop offset="100%" stopColor="#0F172A" /></>}
                          </linearGradient>
                        </defs>
                        <rect width="200" height="200" rx="40" fill="url(#badgeGrad-preview)" />
                        <path d="M100 40 L112.5 78.5 H153 L120.25 102.5 L132.75 141 L100 117 L67.25 141 L79.75 102.5 L47 78.5 H87.5 L100 40 Z" fill="white" />
                        <text x="100" y="172" fill="white" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.5" textAnchor="middle">
                          {badgeType === "client" ? "ESTARR CLIENT" : "VERIFIED EXPERT"}
                        </text>
                        <circle cx="100" cy="100" r="85" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.35" />
                      </svg>
                    </div>
                  </div>

                  {/* HTML Embed code box */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Verifiable HTML Embed Snippet</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(getBadgeCode());
                          setCopiedBadgeCode(true);
                          setTimeout(() => setCopiedBadgeCode(false), 2000);
                        }}
                        className="text-[10px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedBadgeCode ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Embed Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <textarea
                      readOnly
                      value={getBadgeCode()}
                      className="bg-slate-950 text-slate-300 font-mono text-[10px] leading-relaxed p-3 rounded-lg border border-slate-900 min-h-[120px] select-all focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: API Sandbox */}
          {activeSubTab === "sandbox" && (
            <motion.div
              key="sandbox"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900">Interactive API Sandbox Playground</h2>
                <p className="text-xs text-slate-500 mt-1">Interrogate the ESTARR platform directly inside our secure sandbox environment. Configure variables, submit requests, and watch our test system deliver live response payloads.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Configuration Panel */}
                <div className="lg:col-span-4 flex flex-col gap-4 border border-slate-200 p-5 rounded-xl bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 text-sm">HTTP Request Panel</h3>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600">REST Endpoint</label>
                    <select
                      value={sandboxEndpoint}
                      onChange={(e) => setSandboxEndpoint(e.target.value)}
                      className="w-full bg-white border border-slate-200 px-3 py-2 text-slate-800 rounded-lg focus:outline-none focus:border-purple-500 text-xs font-mono font-bold"
                    >
                      <option value="GET /api/v1/talent/list">GET /v1/talent/list</option>
                      <option value="POST /api/v1/escrow/create">POST /v1/escrow/create</option>
                      <option value="GET /api/v1/vetting/report/sanya">GET /v1/vetting/report/sanya</option>
                    </select>
                  </div>

                  <div className="border-t border-slate-200 pt-3 flex flex-col gap-3">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Query Parameters</span>
                    
                    {sandboxEndpoint === "GET /api/v1/talent/list" ? (
                      <>
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">Role Sub-category</label>
                          <input
                            type="text"
                            value={sandboxVariables.role}
                            onChange={(e) => setSandboxVariables({ ...sandboxVariables, role: e.target.value })}
                            className="bg-white border border-slate-200 px-3 py-1.5 text-slate-800 rounded-lg text-xs font-mono"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">Records Limit</label>
                          <input
                            type="number"
                            value={sandboxVariables.limit}
                            onChange={(e) => setSandboxVariables({ ...sandboxVariables, limit: e.target.value })}
                            className="bg-white border border-slate-200 px-3 py-1.5 text-slate-800 rounded-lg text-xs font-mono"
                          />
                        </div>
                      </>
                    ) : sandboxEndpoint === "POST /api/v1/escrow/create" ? (
                      <>
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">Contract Title</label>
                          <input
                            type="text"
                            defaultValue="Production System Migration"
                            className="bg-white border border-slate-200 px-3 py-1.5 text-slate-800 rounded-lg text-xs font-mono"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">Escrow Sum (USD)</label>
                          <input
                            type="text"
                            defaultValue="12500"
                            className="bg-white border border-slate-200 px-3 py-1.5 text-slate-800 rounded-lg text-xs font-mono"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="text-[10px] text-slate-500 italic py-2">
                        No query variables required for verification report GET requests.
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleRunSandbox}
                    disabled={isSandboxLoading}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1.5 mt-2 transition-colors disabled:opacity-50"
                  >
                    {isSandboxLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Dispatched...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Run API Request</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Terminal View */}
                <div className="lg:col-span-8 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Terminal Output Sandbox</span>
                    <span className="text-purple-400 font-bold">sandbox_mode: true</span>
                  </div>

                  <div className="bg-slate-950 text-slate-300 rounded-xl p-4 border border-slate-900 font-mono text-[11px] leading-relaxed flex-1 min-h-[300px] flex flex-col">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3 shrink-0">
                      <span className="text-slate-500 font-bold">⚡ ESTARR REST GATEWAY CONSOLE</span>
                      {isSandboxLoading && <span className="text-amber-500 animate-pulse">● EXECUTING QUERY</span>}
                    </div>

                    <div className="flex-1 overflow-auto pr-1">
                      <pre className="text-emerald-400 font-medium whitespace-pre-wrap">{sandboxResponse}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: Guides & SDKs */}
          {activeSubTab === "guides" && (
            <motion.div
              key="guides"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900">Developer Quickstart & SDK Guides</h2>
                <p className="text-xs text-slate-500 mt-1">Copy and paste full integration templates written for Node.js, Python, Go, and pure cURL commands to connect the ESTARR API inside your company's server environments.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Side: Index & Steps */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/30">
                    <h3 className="font-bold text-slate-900 text-sm mb-3">Install Instructions</h3>
                    
                    <div className="flex flex-col gap-3 text-xs text-slate-600 leading-relaxed">
                      <div className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center shrink-0">1</span>
                        <p>Retrieve your public client authentication keys in the <strong>API & Webhooks</strong> tab of this console.</p>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center shrink-0">2</span>
                        <p>Write your secure private API wrapper using the language SDK examples on the right.</p>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center shrink-0">3</span>
                        <p>Configure a private HTTPS webhook URL to capture candidate evaluation outcomes or milestone completions instantly.</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-2 bg-slate-50/30">
                    <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">Core Resource Targets</h3>
                    <a href="https://docs.estarrapp.com" target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 hover:bg-slate-50 text-slate-800 font-medium text-xs rounded border border-slate-200 cursor-pointer">
                      <span>Full REST API Docs</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                    <a href="https://github.com/estarr/estarr-node-sdk" target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 hover:bg-slate-50 text-slate-800 font-medium text-xs rounded border border-slate-200 cursor-pointer">
                      <span>ESTARR Node Github</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Right Side: Code snippets & Language selection */}
                <div className="lg:col-span-8 flex flex-col gap-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    {/* Language Switcher */}
                    <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                      {[
                        { id: "node", label: "Node.js" },
                        { id: "python", label: "Python" },
                        { id: "curl", label: "cURL" },
                        { id: "go", label: "Golang" }
                      ].map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => setGuideLanguage(lang.id as any)}
                          className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                            guideLanguage === lang.id
                              ? "bg-white text-slate-900 shadow-xs"
                              : "text-slate-500 hover:text-slate-900"
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>

                    {/* Copy button */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(codeSnippets[guideLanguage]);
                        setCopiedCode(true);
                        setTimeout(() => setCopiedCode(false), 2000);
                      }}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer border border-slate-200 flex items-center gap-1.5"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied Code!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Highlighted code box */}
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-900 font-mono text-[11px] leading-relaxed relative overflow-x-auto min-h-[300px]">
                    <div className="absolute top-2 right-2 text-[9px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded uppercase font-bold font-mono">
                      {guideLanguage} code
                    </div>
                    <pre className="text-slate-300 whitespace-pre">{codeSnippets[guideLanguage]}</pre>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
