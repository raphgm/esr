import React, { useState } from "react";
import {
  Zap,
  Coins,
  Clock,
  Wallet,
  Send,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  BookOpen,
  Award,
  Sparkles,
  Check,
  Loader2,
  RefreshCw,
  Code,
  Shield,
  Star,
  Users,
} from "lucide-react";
import confetti from "canvas-confetti";

export function HomeMarketing({
  onStartEarning,
  onStartCollabing,
}: {
  onStartEarning?: () => void;
  onStartCollabing?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // User persona toggle
  const [activePersona, setActivePersona] = useState<"it" | "creator">("creator");

  // Bento Card 1: Skills selection
  const [selectedSkill, setSelectedSkill] = useState<string>("Software Engineering");
  const skillsData: Record<string, { desc: string; difficulty: string; salary: string }> = {
    "Software Engineering": { desc: "Build modular web applications and full-stack platforms.", difficulty: "Advanced", salary: "$120k/yr avg" },
    "Cloud Architecture": { desc: "Deploy production pipelines, Docker stacks, and cloud servers.", difficulty: "Expert", salary: "$145k/yr avg" },
    "Video Production": { desc: "Produce modern vertical video assets and high-impact UGC content.", difficulty: "Medium", salary: "$85k/yr avg" },
    "Digital Marketing": { desc: "Manage growth hacking outreach campaigns and audience metrics.", difficulty: "Easy", salary: "$70k/yr avg" },
  };

  // Bento Card 2: Interactive Escrow Simulator
  const [escrowMilestone, setEscrowMilestone] = useState<number>(1);
  const milestoneTexts = [
    { title: "Contract Initialized", desc: "Client deposit of $1,500 secured in escrow contract.", status: "Secured" },
    { title: "Work Deposited", desc: "Deliverable uploaded to verified proof sandbox.", status: "Under Review" },
    { title: "Payout Released", desc: "Client approved work. Funds transferred instantly.", status: "Disbursed" }
  ];

  // Bento Card 3: Live AI Proposal & Pitch Grader
  const [pitchText, setPitchText] = useState(
    "Hey sponsor! I have 10k followers. Can you sponsor me for my next video? I will do a shoutout."
  );
  const [pitchState, setPitchState] = useState<"idle" | "grading" | "result">("idle");
  const [pitchScore, setPitchScore] = useState<number>(55);
  const [pitchFeedback, setPitchFeedback] = useState<string>("");

  const handleGradePitch = () => {
    if (pitchState !== "idle") return;
    setPitchState("grading");
    setTimeout(() => {
      setPitchState("result");
      setPitchScore(94);
      setPitchFeedback(
        "Strong brand alignment! Added quantitative stats and clear target audience metrics to double response rates."
      );
      confetti({
        particleCount: 40,
        spread: 40,
        origin: { y: 0.8 }
      });
    }, 1500);
  };

  const handleResetPitch = () => {
    setPitchText("Hey sponsor! I have 10k followers. Can you sponsor me for my next video? I will do a shoutout.");
    setPitchState("idle");
    setPitchScore(55);
    setPitchFeedback("");
  };

  // Bento Card 4: Dynamic Credentials Badge
  const [badgeHolder, setBadgeHolder] = useState("Creator Pro");
  const [badgeRole, setBadgeRole] = useState("Full-Stack Creator");
  const [badgeColor, setBadgeColor] = useState("purple");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.85 }
      });
      try {
        await fetch("/api/send-welcome", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            type: "newsletter"
          })
        });
      } catch (error) {
        console.error("Failed to send newsletter welcome email:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 mt-8 animate-fade-in">
      {/* Creator Priority Section - REDESIGNED & DEEPLY INTERACTIVE */}
      <div className="relative bg-slate-950 text-white border-2 border-slate-800 shadow-2xl rounded-2xl p-6 md:p-10 overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] opacity-30 group-hover:opacity-50 transition-all duration-1000"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-orange-600/5 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col xl:flex-row gap-10 items-stretch">
          
          {/* Left Hero Content Area */}
          <div className="flex-1 flex flex-col justify-between py-2">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-950/60 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide mb-6">
                <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> IT Pro & Creator Priority
              </div>

              {/* Persona Selector Tabs */}
              <div className="flex gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl w-fit mb-6">
                <button
                  type="button"
                  onClick={() => setActivePersona("creator")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activePersona === "creator"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" /> For Creators
                </button>
                <button
                  type="button"
                  onClick={() => setActivePersona("it")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activePersona === "it"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Code className="w-3.5 h-3.5" /> For IT Professionals
                </button>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.0] mb-5 font-display text-slate-100">
                IT Pro & <br />{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400">
                  {activePersona === "creator" ? "Creator Priority" : "Tech Talent First"}
                </span>
              </h2>

              <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-lg mb-8 font-medium">
                {activePersona === "creator"
                  ? "ESTARR is built to ensure digital creators can monetize their talent, land verified brand deals, optimize sponsor outreach with AI, and trade under secure escrow."
                  : "We empower IT professionals to showcase verified digital credentials, match automatically with high-paying tech contracts, and experience seamless, automated milestone payouts."}
              </p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={onStartEarning} 
                className="w-full sm:w-auto bg-white text-slate-950 font-bold hover:bg-slate-100 transition-all px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 group cursor-pointer shadow-md shadow-white/5 active:scale-98 hover:-translate-y-0.5"
              >
                Start Earning Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-6 text-[11px] font-mono font-bold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>1,240 active escrow contracts</span>
                </div>
                <div>•</div>
                <div>SEC-compliant payouts</div>
              </div>
            </div>
          </div>

          {/* Right Column: Deeply Interactive Bento Playground Grid */}
          <div className="flex-1.5 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            
            {/* Bento Card 1: Practical Tech & Creative Skills */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-5 hover:border-purple-500/40 transition-all flex flex-col justify-between shadow-sm hover:shadow-purple-500/5 relative overflow-hidden group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 shadow-xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] font-bold uppercase text-slate-500 tracking-wider">SKILLS LESSONS</span>
                </div>
                <h4 className="font-bold text-sm text-slate-200 mb-1 uppercase tracking-wide">
                  Practical Tech & Creative Skills
                </h4>
                <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                  Interactive courses built to help you master digital talent trade-craft.
                </p>

                {/* Micro skill tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {Object.keys(skillsData).map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => setSelectedSkill(skill)}
                      className={`px-2 py-1 rounded-lg text-[9px] font-bold tracking-wide transition-all cursor-pointer border ${
                        selectedSkill === skill
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Skill lesson snippet preview */}
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-[10px] font-mono">
                <div className="flex justify-between items-center mb-1 pb-1 border-b border-slate-850">
                  <span className="text-slate-400">Class Preview:</span>
                  <span className="text-indigo-400 font-bold uppercase text-[9px]">{skillsData[selectedSkill].difficulty}</span>
                </div>
                <p className="text-slate-300 mb-2 font-sans font-medium">{skillsData[selectedSkill].desc}</p>
                <div className="flex justify-between text-slate-500 text-[9px]">
                  <span>Avg Contract Salary:</span>
                  <span className="text-emerald-400 font-bold">{skillsData[selectedSkill].salary}</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Secure Escrow Gigs */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-5 hover:border-purple-500/40 transition-all flex flex-col justify-between shadow-sm hover:shadow-purple-500/5 relative overflow-hidden group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] font-bold uppercase text-slate-500 tracking-wider">LIVE ESCROW PREVIEW</span>
                </div>
                <h4 className="font-bold text-sm text-slate-200 mb-1 uppercase tracking-wide">
                  Secure Escrow Gigs
                </h4>
                <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                  Every contract operates under safe multichain escrow. Walk through the active ledger pipeline below:
                </p>

                {/* Clickable pipeline checkpoints */}
                <div className="grid grid-cols-3 gap-1.5 mb-4 text-center">
                  {[1, 2, 3].map((step) => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setEscrowMilestone(step)}
                      className={`py-1.5 px-1 rounded-lg border text-[9px] font-bold tracking-wide transition-all cursor-pointer ${
                        escrowMilestone === step
                          ? "bg-emerald-600/20 border-emerald-500 text-emerald-400 shadow-xs"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      Step {step}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step info block */}
              <div className="bg-slate-950/80 border border-slate-850 rounded-xl p-3 text-[10px] flex flex-col justify-between min-h-[72px]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-200">{milestoneTexts[escrowMilestone - 1].title}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-mono text-[8px] font-bold uppercase tracking-wider">
                    {milestoneTexts[escrowMilestone - 1].status}
                  </span>
                </div>
                <p className="text-slate-400 text-[10px] leading-snug">{milestoneTexts[escrowMilestone - 1].desc}</p>
              </div>
            </div>

            {/* Bento Card 3: AI Proposal & Pitch Grader */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-5 hover:border-purple-500/40 transition-all flex flex-col justify-between shadow-sm hover:shadow-purple-500/5 relative overflow-hidden group md:col-span-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 shadow-xs">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] font-bold uppercase text-slate-500 tracking-wider">PITCH LAB</span>
                </div>
                <h4 className="font-bold text-sm text-slate-200 mb-1 uppercase tracking-wide">
                  AI Proposal & Pitch Grader
                </h4>
                <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                  Test your sponsor pitch or proposal letter. Try out the grading simulation below:
                </p>

                {pitchState === "idle" && (
                  <textarea
                    value={pitchText}
                    onChange={(e) => setPitchText(e.target.value)}
                    className="w-full h-16 bg-slate-950 border border-slate-850 rounded-lg p-2 text-[10px] text-slate-350 font-sans focus:outline-none focus:border-purple-500 resize-none font-medium mb-3"
                  />
                )}

                {pitchState === "grading" && (
                  <div className="w-full h-16 bg-slate-950 border border-slate-850 rounded-lg p-2 text-[10px] text-slate-350 font-mono flex flex-col items-center justify-center gap-1.5 mb-3">
                    <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                    <span>Analyzing grammar, metrics, CTA...</span>
                  </div>
                )}

                {pitchState === "result" && (
                  <div className="w-full h-16 bg-slate-950 border border-slate-850 rounded-lg p-2 text-[10px] overflow-y-auto font-sans text-slate-300 mb-3 leading-normal">
                    <div className="flex justify-between items-center mb-1 pb-1 border-b border-slate-850">
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Grade Score: {pitchScore}/100
                      </span>
                      <button onClick={handleResetPitch} className="text-slate-500 hover:text-slate-300 text-[9px] font-bold uppercase font-mono">Reset</button>
                    </div>
                    <p className="text-slate-400 text-[9px] leading-tight font-medium">{pitchFeedback}</p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleGradePitch}
                disabled={pitchState !== "idle"}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-1.5 px-3 rounded-lg text-[10px] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {pitchState === "grading" ? (
                  <>Processing Optimizations...</>
                ) : pitchState === "result" ? (
                  <>Pitch Successfully Optimized!</>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" /> Grade & Optimize Pitch
                  </>
                )}
              </button>
            </div>

            {/* Bento Card 4: Certified Credentials */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-5 hover:border-purple-500/40 transition-all flex flex-col justify-between shadow-sm hover:shadow-purple-500/5 relative overflow-hidden group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center border border-yellow-500/20 shadow-xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] font-bold uppercase text-slate-500 tracking-wider">BADGE ENGINE</span>
                </div>
                <h4 className="font-bold text-sm text-slate-200 mb-1 uppercase tracking-wide">
                  Certified Credentials
                </h4>
                <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                  Generate and verify your secure technical creator passport badge:
                </p>

                {/* Micro Input fields */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <label className="block text-[8px] font-mono text-slate-500 uppercase font-black mb-0.5">HOLDER NAME</label>
                    <input
                      type="text"
                      value={badgeHolder}
                      onChange={(e) => setBadgeHolder(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-950 border border-slate-850 rounded-md py-1 px-2 text-[9px] text-slate-300 focus:outline-none focus:border-purple-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-mono text-slate-500 uppercase font-black mb-0.5">ROLE PATHWAY</label>
                    <select
                      value={badgeRole}
                      onChange={(e) => setBadgeRole(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-md py-1 px-1.5 text-[9px] text-slate-300 focus:outline-none focus:border-purple-500 font-medium"
                    >
                      <option value="Lead Developer">Lead Developer</option>
                      <option value="Full-Stack Creator">Full-Stack Creator</option>
                      <option value="Digital Architect">Digital Architect</option>
                      <option value="UGC Video Specialist">Video Specialist</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Generated Badge Preview */}
              <div className="bg-slate-950 border border-slate-850 rounded-xl p-2.5 flex items-center gap-3 relative group/badge overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none" />
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center border-2 border-slate-800 relative z-10 shadow-lg shadow-purple-500/10">
                    <Star className="w-5 h-5 text-white animate-spin" style={{ animationDuration: "12s" }} />
                  </div>
                  <div className="absolute inset-0 w-10 h-10 bg-purple-500/20 rounded-full blur-md animate-pulse" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <p className="font-display font-black text-xs text-slate-100 truncate tracking-wide leading-tight uppercase">
                    {badgeHolder || "NAME PREVIEW"}
                  </p>
                  <p className="text-[9px] font-mono font-bold text-slate-450 truncate uppercase leading-tight mt-0.5">
                    {badgeRole}
                  </p>
                  <p className="text-[8px] font-mono text-emerald-500 font-bold tracking-wider uppercase mt-1">
                    ✓ VERIFIED ID • STRR_0x
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Creator Economy & Newsletter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Creator Marketing - Left Side */}
        <div className="lg:col-span-7 bg-[#FAF5E6] border border-amber-200 shadow-lg rounded-xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-5">
            <TrendingUp className="w-64 h-64" />
          </div>
          {/* Decorative Doodles */}
          <div className="absolute right-1/4 bottom-1/4 text-purple-500/5 rotate-12 pointer-events-none z-0">
            <svg width="160" height="160" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <circle cx="50" cy="50" r="40" strokeDasharray="6 6" />
              <circle cx="50" cy="50" r="25" />
              <circle cx="50" cy="50" r="12" strokeDasharray="3 3" />
            </svg>
          </div>
          <div className="absolute left-10 bottom-20 text-indigo-500/5 rotate-45 pointer-events-none z-0">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M 10 35 Q 30 5 50 35 T 90 35" />
              <path d="M 10 55 Q 30 25 50 55 T 90 55" />
            </svg>
          </div>
          <div className="absolute left-1/3 top-1/4 text-fuchsia-500/5 -rotate-12 pointer-events-none z-0">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <line x1="20" y1="20" x2="80" y2="20" />
              <line x1="20" y1="50" x2="80" y2="50" strokeDasharray="5 5" />
              <line x1="20" y1="80" x2="80" y2="80" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="logo-blocky !bg-white !text-slate-900 px-3 py-1 text-[10px] font-bold tracking-wide inline-block">
                Creators & IT Pros
              </span>
              <span className="text-xs font-semibold tracking-wide text-purple-500">
                Turn Talent & Code into Cash
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-none text-slate-900 mb-4">
              Unlock Your Potential <br className="hidden md:block" />{" "}
              <span className="text-purple-500">Creator Hub & Tech Gigs</span>
            </h3>

            <div className="space-y-3 mb-6 max-w-2xl">
              <p className="text-sm md:text-base font-medium leading-relaxed font-sans text-slate-700">
                The global creator and tech-talent economy is worth billions, with over{" "}
                <span className="font-bold text-slate-900 bg-yellow-200 px-1">
                  75% of Gen Z users
                </span>{" "}
                looking to monetize their digital style, IT skills, and video creations. Yet, most struggle to draft client proposals or brand outreach pitches.
              </p>
              <p className="text-sm md:text-base font-medium leading-relaxed font-sans text-slate-700">
                With ESTARR, you get direct brand deals, freelancing IT contracts, joint creator partnerships, and our custom AI sponsor & project pitch helper to monetize in record time!
              </p>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-slate-200/50">
            <button
              onClick={onStartCollabing}
              className="btn-primary text-xs flex items-center justify-center gap-2 group w-fit cursor-pointer"
            >
              Start Collabing{" "}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-xl border border-slate-200/50 bg-white">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-[10px] font-semibold tracking-wide text-slate-500">
                Verified Creator Deals
              </span>
            </div>
          </div>
        </div>

        {/* Newsletter - Right Side (Sleek Redesign Direction) */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-8 md:p-10 flex flex-col relative overflow-hidden group/newsletter">
          {/* Ambient Lighting FX */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-purple-600/25 blur-3xl pointer-events-none group-hover/newsletter:scale-110 transition-transform duration-700" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/5 via-transparent to-transparent pointer-events-none" />

          {subscribed ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8 animate-fade-in relative z-10">
              <div className="w-14 h-14 bg-emerald-950/60 text-emerald-400 rounded-2xl flex items-center justify-center mb-5 border border-emerald-800/80 shadow-lg shadow-emerald-900/10">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight text-white mb-2 font-display uppercase">
                Welcome Aboard!
              </h3>
              <p className="text-xs font-semibold tracking-wide text-purple-400 uppercase mb-4">
                Access Granted • {email}
              </p>
              <p className="text-xs text-slate-400 max-w-xs font-medium leading-relaxed mb-6">
                You have joined over 45,000+ top-tier IT talent and content creators getting exclusive sponsorship leads.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubscribed(false);
                  setEmail("");
                }}
                className="text-[10px] font-mono font-black uppercase text-slate-500 hover:text-white transition-colors tracking-widest cursor-pointer hover:underline"
              >
                ← Back to Sandbox
              </button>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-4 mb-5 group">
                  <div className="w-12 h-12 shrink-0 bg-slate-900 rounded-xl text-purple-400 flex items-center justify-center border border-slate-800 shadow-sm relative overflow-hidden group-hover/newsletter:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-purple-500/5" />
                    <Send className="w-5 h-5 relative z-10" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-white font-display uppercase">
                    Stay Updated
                  </h3>
                </div>
                <p className="text-xs md:text-sm font-medium leading-relaxed text-slate-400 mb-6">
                  Subscribe to our off-chain dispatch to receive verified brand contracts, developer sponsorships, and critical ecosystem updates.
                </p>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col gap-4 mt-auto"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono font-black tracking-wider text-slate-450 uppercase flex items-center justify-between">
                    <span>GET DISPATCHES</span>
                    <span className="text-purple-400 font-bold">JOIN 45K+ MEMBERS</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your system email..."
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 text-white placeholder-slate-500 font-bold px-4 py-3 text-sm transition-all duration-300 rounded-xl focus:outline-none w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[11px] font-black tracking-wider py-3.5 rounded-xl shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  SUBSCRIBE DISPATCH
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

