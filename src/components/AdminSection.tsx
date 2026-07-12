import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Settings,
  Lock,
  Unlock,
  Users,
  Activity,
  Check,
  X,
  Sparkles,
  RefreshCw,
  Palette,
  Layers,
  FileText,
  Database,
  UserCheck,
  AlertTriangle,
  Key,
  Globe,
  Cpu,
  Coins,
  Server,
  TrendingUp,
  ArrowUpRight,
  Wifi
} from "lucide-react";
import confetti from "canvas-confetti";
import { UserProfile } from "../types";

interface AdminSectionProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  sidebarTheme: "white" | "ivory" | "slate" | "indigo";
  setSidebarTheme: (theme: "white" | "ivory" | "slate" | "indigo") => void;
  userProfile: UserProfile;
}

export function AdminSection({
  isAdmin,
  setIsAdmin,
  sidebarTheme,
  setSidebarTheme,
  userProfile
}: AdminSectionProps) {
  // Mock users in database
  const [dbUsers, setDbUsers] = useState([
    { id: "u1", name: "Chinedu Okafor", email: "chinedu@estarrapp.com", role: "User", accountType: "Freelancer", status: "Active" },
    { id: "u2", name: "Aisha Yusuf", email: "aisha.y@estarrapp.com", role: "User", accountType: "Freelancer", status: "Active" },
    { id: "u3", name: "Emeka Obi", email: "emeka.obi@estarrapp.com", role: "User", accountType: "Client", status: "Active" },
    { id: "u4", name: "Fatima Bello", email: "fatima@estarrapp.com", role: "User", accountType: "Freelancer", status: "Pending Verification" }
  ]);

  // Mock pending verifications
  const [verifications, setVerifications] = useState([
    { id: "v1", name: "Fatima Bello", pathway: "UGC Video Specialist", file: "portfolio_review_ugc.mp4", date: "2026-07-06" },
    { id: "v2", name: "Tunde Bakare", pathway: "Lead Developer", file: "github_proof_nodes.json", date: "2026-07-07" }
  ]);

  // Custom system log messages
  const [logs, setLogs] = useState([
    { id: "l1", time: "08:51:12", type: "info", text: "Database auto-replicated to server node lagos-01" },
    { id: "l2", time: "08:49:05", type: "success", text: "Secure Escrow payment of $250,000 released successfully" },
    { id: "l3", time: "08:44:18", type: "warning", text: "Verification challenge sent to user Tunde Bakare" },
    { id: "l4", time: "08:30:00", type: "info", text: "Platform nodes synchronized with SEC-compliant ledger" }
  ]);

  // System Statistics
  const [stats, setStats] = useState({
    activeEscrows: 1240,
    escrowVolume: "$34,150,000",
    systemNodeStatus: "Healthy (Lagos-01)",
    apiLatency: "14ms"
  });

  // Interactive metrics states
  const [activeCurrency, setActiveCurrency] = useState<"USD" | "NGN" | "GHS" | "KES">("USD");
  const [activeNode, setActiveNode] = useState<"Lagos-01" | "Nairobi-02" | "Accra-03" | "CapeTown-04">("Lagos-01");
  const [liveLatency, setLiveLatency] = useState(14);
  const [isDiagnosticsRunning, setIsDiagnosticsRunning] = useState(false);
  const [diagnosticsOutput, setDiagnosticsOutput] = useState<string[] | null>(null);
  const [showEscrowBreakdown, setShowEscrowBreakdown] = useState(false);

  // Live Ping Latency Heartbeat Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveLatency(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next >= 11 && next <= 17 ? next : prev;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Developer Integration Gate Key Management (Afrika Payment Gateway & Accelerator Gate)
  const [devKey, setDevKey] = useState<string>(
    () => localStorage.getItem("estarr_developer_key") || "ESTARR-GATE-2026"
  );
  const [isDevKeyCopied, setIsDevKeyCopied] = useState(false);

  const handleRoleToggle = (userId: string) => {
    // Only authorized system admins can promote others in a real app
    // For this simulation, we disable promoting others via the UI to respect strict admin rules
    addLog("warning", "Manual role modification is locked for security. Admin privileges are email-bound.");
  };

  const handleApproveVerification = (id: string, name: string) => {
    setVerifications(prev => prev.filter(v => v.id !== id));
    setDbUsers(prev => prev.map(u => u.name === name ? { ...u, status: "Active" } : u));
    addLog("success", `Digital skill credential badge approved for ${name}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const handleRejectVerification = (id: string, name: string) => {
    setVerifications(prev => prev.filter(v => v.id !== id));
    addLog("warning", `Digital credential verification rejected for ${name}`);
  };

  const addLog = (type: "info" | "success" | "warning", text: string) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    setLogs(prev => [
      { id: "log-" + Date.now(), time: timeStr, type, text },
      ...prev.slice(0, 7)
    ]);
  };

  const handleThemeChange = (newTheme: "white" | "ivory" | "slate" | "indigo") => {
    if (!isAdmin) return;
    setSidebarTheme(newTheme);
    addLog("success", `Ecosystem Sidebar Theme updated to '${newTheme.toUpperCase()}'`);
    
    confetti({
      particleCount: 40,
      spread: 50,
      colors: ["#a855f7", "#6366f1"],
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in pb-12">
      {/* Dynamic Heading */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 font-display uppercase mb-2">
            System Administration
          </h1>
          <h3 className="text-lg font-bold text-purple-600 uppercase tracking-widest mb-3">
            Ecosystem Admin Portal
          </h3>
          <p className="text-sm text-slate-500 font-medium max-w-2xl leading-relaxed">
            Configure global variables, manage secure talent verifications, and audit ledger pipelines.
          </p>
        </div>

        {/* Global Access Status Card */}
        <div className="flex flex-col gap-3">
          <div className={`p-5 rounded-2xl border-2 flex items-center gap-4 transition-all duration-350 min-w-[280px] ${
            isAdmin 
              ? "bg-slate-950 border-slate-900 shadow-xl" 
              : "bg-rose-50 border-rose-200 shadow-sm"
          }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-colors ${
              isAdmin 
                ? "bg-purple-600/10 border-purple-500/30 text-purple-400 animate-pulse" 
                : "bg-rose-100 border-rose-300 text-rose-600"
            }`}>
              {isAdmin ? <ShieldCheck className="w-7 h-7" /> : <ShieldAlert className="w-7 h-7" />}
            </div>
            <div>
              <p className={`text-[10px] font-mono font-black uppercase tracking-[0.2em] mb-1 ${
                isAdmin ? "text-purple-400" : "text-rose-400"
              }`}>SECURE SESSION</p>
              <h4 className={`text-sm font-black uppercase tracking-widest ${isAdmin ? "text-white" : "text-rose-800"}`}>
                {isAdmin ? "Admin Authorized" : "Access Restricted"}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Escrows */}
        <div 
          onClick={() => {
            setShowEscrowBreakdown(!showEscrowBreakdown);
            addLog("info", `Inspected Multichain Escrow Ledger contract distribution`);
          }}
          className="bg-white border-2 border-slate-200 hover:border-purple-300 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group cursor-pointer relative overflow-hidden"
        >
          {/* Absolute glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-bl-full opacity-30 group-hover:scale-125 transition-transform duration-500" />
          
          <div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0 group-hover:scale-110 transition-transform duration-350">
                <Layers className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5 bg-purple-100/60 text-purple-700 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border border-purple-200">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                Multichain
              </div>
            </div>
            
            <div className="relative z-10">
              <p className="text-xs font-black uppercase text-slate-400 tracking-wider mb-1">Active Escrows</p>
              <div className="flex items-baseline gap-1.5">
                <h3 className="text-3xl font-black tracking-tighter text-slate-900 font-display">1,240</h3>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                  +4.2%
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium mt-1">
                Contracts locked in cryptographic consensus.
              </p>
            </div>
          </div>

          {/* Interactive sub-detail drawer inline */}
          <div className={`mt-4 pt-3 border-t border-slate-150 relative z-10 transition-all duration-300 ${showEscrowBreakdown ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"}`}>
            <div className="flex flex-col gap-1.5 text-[9px] font-mono font-bold text-slate-650">
              <div className="flex justify-between items-center bg-slate-50 p-1 px-2 rounded border border-slate-100">
                <span>Solana Gasless Escrows:</span>
                <span className="text-purple-600">430 contracts</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-1 px-2 rounded border border-slate-100">
                <span>Stellar Instant Assets:</span>
                <span className="text-indigo-600">500 contracts</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-1 px-2 rounded border border-slate-100">
                <span>Ethereum Secure (L1):</span>
                <span className="text-pink-600">310 contracts</span>
              </div>
            </div>
          </div>

          {/* Hint text */}
          <div className="mt-3 text-[9px] text-purple-600 font-black uppercase tracking-wider flex items-center gap-1 hover:underline">
            <span>{showEscrowBreakdown ? "Hide distribution" : "View distribution"}</span>
            <ArrowUpRight className={`w-3 h-3 transition-transform ${showEscrowBreakdown ? "rotate-90" : ""}`} />
          </div>
        </div>

        {/* Card 2: Ledger Volume */}
        <div 
          onClick={() => {
            const currencies: ("USD" | "NGN" | "GHS" | "KES")[] = ["USD", "NGN", "GHS", "KES"];
            const currentIdx = currencies.indexOf(activeCurrency);
            const nextIdx = (currentIdx + 1) % currencies.length;
            const nextCurrency = currencies[nextIdx];
            setActiveCurrency(nextCurrency);
            addLog("success", `Ledger volume settlement converted to ${nextCurrency}`);
          }}
          className="bg-white border-2 border-slate-200 hover:border-indigo-300 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group cursor-pointer relative overflow-hidden"
        >
          {/* Absolute glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-bl-full opacity-30 group-hover:scale-125 transition-transform duration-500" />
          
          <div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform duration-350">
                <Database className="w-6 h-6" />
              </div>
              <div className="bg-indigo-100/60 text-indigo-700 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border border-indigo-200">
                🌍 {activeCurrency} Localized
              </div>
            </div>
            
            <div className="relative z-10">
              <p className="text-xs font-black uppercase text-slate-400 tracking-wider mb-1">Ledger Volume</p>
              <h3 className="text-2xl font-black tracking-tighter text-slate-900 font-display transition-all duration-350">
                {activeCurrency === "USD" && "$34,150,000"}
                {activeCurrency === "NGN" && "₦51,225,000,000"}
                {activeCurrency === "GHS" && "₵546,400,000"}
                {activeCurrency === "KES" && "Sh5,293,250,000"}
              </h3>
              <p className="text-[10px] text-slate-500 font-medium mt-1">
                {activeCurrency === "USD" ? "USD equivalent secured across all regional banks." : `Converted at modern automated central bank indexes.`}
              </p>
            </div>
          </div>

          {/* Rate conversion helper */}
          <div className="mt-4 flex items-center gap-1.5 bg-indigo-50/50 border border-indigo-100 p-2 rounded-xl text-[9px] font-mono text-indigo-700 font-bold relative z-10">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-600 animate-pulse shrink-0" />
            <span className="uppercase tracking-tight">Tap to cycle (USD &rarr; NGN &rarr; GHS &rarr; KES)</span>
          </div>
        </div>

        {/* Card 3: Sys Node Status */}
        <div 
          onClick={() => {
            if (isDiagnosticsRunning) return;
            setIsDiagnosticsRunning(true);
            setDiagnosticsOutput(null);
            addLog("info", `Initiated live system diagnostics check across regional nodes`);
            
            setTimeout(() => {
              setIsDiagnosticsRunning(false);
              setDiagnosticsOutput([
                "🟢 Lagos-01 (Active) - Latency: 14ms (Primary)",
                "🟢 Nairobi-02 (Standby) - Latency: 21ms (Replica)",
                "🟢 Accra-03 (Active) - Latency: 18ms (Co-host)",
                "🟡 CapeTown-04 (Syncing) - Latency: 32ms (Edge)"
              ]);
              addLog("success", `System diagnostic check completed successfully! 4/4 nodes synced`);
              confetti({
                particleCount: 20,
                spread: 30,
                origin: { y: 0.8 }
              });
            }, 1200);
          }}
          className="bg-white border-2 border-slate-200 hover:border-emerald-300 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group cursor-pointer relative overflow-hidden"
        >
          {/* Absolute glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-bl-full opacity-30 group-hover:scale-125 transition-transform duration-500" />
          
          <div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform duration-350">
                <Activity className={`w-6 h-6 ${isDiagnosticsRunning ? "animate-spin" : "animate-pulse"}`} />
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-100/60 text-emerald-700 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                Healthy
              </div>
            </div>
            
            <div className="relative z-10">
              <p className="text-xs font-black uppercase text-slate-400 tracking-wider mb-1">Sys Node Status</p>
              <h3 className="text-xl font-black text-slate-900 tracking-tight font-display">
                {isDiagnosticsRunning ? "Testing edge nodes..." : `Healthy (Lagos-01)`}
              </h3>
              <p className="text-[10px] text-slate-500 font-medium mt-1">
                Decentralized database & webhook server state.
              </p>
            </div>
          </div>

          {/* Inline diagnostic result */}
          {diagnosticsOutput && (
            <div className="mt-3 p-2 bg-slate-900 text-slate-300 rounded-xl font-mono text-[8px] flex flex-col gap-1 relative z-10 border border-slate-800 animate-fade-in">
              {diagnosticsOutput.map((node, index) => (
                <span key={index}>{node}</span>
              ))}
            </div>
          )}

          <div className="mt-3 text-[9px] text-emerald-700 font-black uppercase tracking-wider flex items-center gap-1 hover:underline">
            <span>{isDiagnosticsRunning ? "Syncing metrics..." : "Run Diagnostics Ping"}</span>
            <RefreshCw className={`w-3 h-3 ${isDiagnosticsRunning ? "animate-spin" : ""}`} />
          </div>
        </div>

        {/* Card 4: API Ping Latency */}
        <div 
          onClick={() => {
            // Cycles ping test regions
            const regions: ("Lagos" | "Nairobi" | "Accra" | "CapeTown")[] = ["Lagos", "Nairobi", "Accra", "CapeTown"];
            const currentIdx = regions.indexOf(activeNode.replace("-01","").replace("-02","").replace("-03","").replace("-04","") as any);
            const nextIdx = (currentIdx + 1) % regions.length;
            const nextRegion = regions[nextIdx];
            
            let baseLatency = 14;
            let nodeSuffix = "-01";
            if (nextRegion === "Nairobi") { baseLatency = 21; nodeSuffix = "-02"; }
            else if (nextRegion === "Accra") { baseLatency = 18; nodeSuffix = "-03"; }
            else if (nextRegion === "CapeTown") { baseLatency = 28; nodeSuffix = "-04"; }
            
            setActiveNode((nextRegion + nodeSuffix) as any);
            setLiveLatency(baseLatency);
            addLog("info", `API network telemetry region switched to ${nextRegion} hub`);
          }}
          className="bg-white border-2 border-slate-200 hover:border-amber-300 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group cursor-pointer relative overflow-hidden"
        >
          {/* Absolute glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-bl-full opacity-30 group-hover:scale-125 transition-transform duration-500" />
          
          <div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-110 transition-transform duration-350">
                <Wifi className="w-6 h-6" />
              </div>
              <div className="bg-amber-100/60 text-amber-700 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border border-amber-200">
                📡 {activeNode.split("-")[0]} HUB
              </div>
            </div>
            
            <div className="relative z-10">
              <p className="text-xs font-black uppercase text-slate-400 tracking-wider mb-1">API Ping Latency</p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-3xl font-black tracking-tighter text-slate-900 font-display">
                  {liveLatency}ms
                </h3>
                <span className="text-[10px] text-amber-650 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                  SECURE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium mt-1">
                Antigravity core routing system response.
              </p>
            </div>
          </div>

          {/* Heartbeat pulse preview */}
          <div className="mt-4 flex items-center justify-between bg-amber-50/50 border border-amber-100 p-2 rounded-xl relative z-10">
            <div className="flex items-center gap-1.5 text-[8px] font-mono text-amber-800 font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-duration-1000"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>Tap to test routing hubs</span>
            </div>
            <span className="text-[8px] font-mono bg-amber-105 text-amber-900 px-1.5 rounded font-black uppercase border border-amber-200/50">
              {activeNode}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Layout Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Theme Settings & Credential Approvals (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Bento Block: DEVELOPER KEY & GATEWAY AUTHORITY */}
          <div className="bg-slate-900 border-2 border-purple-500/30 rounded-xl shadow-xl relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Key className="w-24 h-24 text-purple-400" />
            </div>
            {/* Header */}
            <div className="border-b border-slate-800 px-5 py-4 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-purple-400 animate-pulse" />
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-100 font-display">
                  Developer Key & Integration Gateway Authority
                </h3>
              </div>
              <span className="bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full font-mono text-[9px] font-black uppercase tracking-wider border border-purple-500/30">
                🔒 Access Enforced
              </span>
            </div>

            <div className="p-5 flex flex-col gap-4">
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                The high-yield <strong className="text-white">Africa Paystack Integration Hub</strong> & <strong className="text-white">Fast-Track Earning Accelerator</strong> is locked to protect platform integrity. Only developers possessing the correct, active authorization key below can view metrics, configure bank integrations, or request direct payouts.
              </p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row gap-3 items-end sm:items-center justify-between">
                <div className="flex-1 w-full">
                  <label className="text-[10px] font-black uppercase tracking-wider text-purple-400 block mb-1.5">
                    Active Developer Authorization Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={devKey}
                      className="flex-1 text-xs font-mono font-black tracking-widest text-emerald-400 bg-slate-900 border border-slate-800 p-2.5 rounded-lg focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(devKey);
                        setIsDevKeyCopied(true);
                        setTimeout(() => setIsDevKeyCopied(false), 2000);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black uppercase tracking-wider px-4 rounded-lg transition-all"
                    >
                      {isDevKeyCopied ? "✓ Copied!" : "Copy Key"}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto self-stretch sm:self-auto pt-2 sm:pt-0">
                  <button
                    onClick={() => {
                      const keys = [
                        "ESTARR-AFRICA-PAYSTACK-DEV",
                        "ESTARR-SECURE-KEY-2026",
                        "ESTARR-LOCAL-PAYMENTS-AFRICA",
                        "ESTARR-DEV-9B2F4E7A",
                        "ESTARR-GATEWAY-AUTH-CODE"
                      ];
                      const newKey = keys[Math.floor(Math.random() * keys.length)];
                      setDevKey(newKey);
                      localStorage.setItem("estarr_developer_key", newKey);
                      
                      // Push to security logs
                      addLog("success", `Developer gate authorization key rotated to '${newKey}'`);
                      
                      confetti({
                        particleCount: 30,
                        spread: 50,
                        colors: ["#a855f7", "#34d399"]
                      });
                    }}
                    className="flex-1 sm:flex-initial bg-slate-800 hover:bg-slate-700 border border-slate-750 text-slate-200 text-[10px] font-black uppercase tracking-wider px-3.5 py-2.5 rounded-lg transition-all"
                  >
                    Regenerate Key
                  </button>
                </div>
              </div>

              {/* Custom Key Editor */}
              <div className="flex flex-col gap-1.5 bg-slate-950/40 p-3 rounded-lg border border-slate-850">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Custom Key Overrides
                </span>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Want a custom passcode? Define your own secret authorization key below and hit apply:
                </p>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    placeholder="e.g. MY-SUPER-SECRET-DEV-PASS"
                    id="custom-dev-key-input"
                    className="flex-1 text-xs font-mono font-bold bg-slate-900 border border-slate-800 p-2 rounded focus:outline-none focus:border-purple-500 text-white"
                  />
                  <button
                    onClick={() => {
                      const val = (document.getElementById("custom-dev-key-input") as HTMLInputElement)?.value?.trim();
                      if (val) {
                        setDevKey(val);
                        localStorage.setItem("estarr_developer_key", val);
                        addLog("success", `Developer gate custom authorization key configured: '${val}'`);
                        (document.getElementById("custom-dev-key-input") as HTMLInputElement).value = "";
                        confetti({ particleCount: 20, spread: 40 });
                      }
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-black uppercase tracking-wider px-3 rounded transition-all"
                  >
                    Apply Overrides
                  </button>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-850 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-300 font-sans">Active Cryptographic Enforcement:</p>
                  <p className="mt-0.5 leading-relaxed font-sans">
                    Any developer navigating to the <strong className="text-purple-400 font-bold">Income Accelerator & Integration Hub</strong> on this browser will be locked out until they input the exact authorization key displayed above. Hand this key to vetted team members to grant them gateway credentials.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bento Block 1: THEME CONFIGURATION (ONLY FOR ADMIN) */}
          <div className="bg-white border-2 border-slate-200 rounded-xl shadow-xs relative overflow-hidden">
            {/* Header */}
            <div className="border-b border-slate-150 px-5 py-4 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-black uppercase tracking-wide text-slate-800">
                  Ecosystem Theme Configuration
                </h3>
              </div>
              <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider ${
                isAdmin ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
              }`}>
                {isAdmin ? "✓ Access Unlocked" : "🔒 Administrative Lock"}
              </span>
            </div>

            {/* Content & Lock Layer Overlay */}
            <div className="p-5 relative">
              <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
                Select the target cosmetic scheme for the navigation sidebar rail. The chosen setting updates state globally in real-time.
              </p>

              {/* Theme Selector Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: "ivory" as const,
                    name: "Warm Ivory",
                    desc: "ESTARR Default aesthetic - warm beige tones",
                    bgClass: "bg-[#FAF9F5]",
                    borderClass: "border-[#D9D3C5]",
                    textClass: "text-slate-900",
                    accentBg: "bg-purple-700",
                    badgeColor: "text-purple-700 bg-purple-50"
                  },
                  {
                    id: "slate" as const,
                    name: "Midnight Slate",
                    desc: "Deep ambient slate darkmode variant",
                    bgClass: "bg-slate-950",
                    borderClass: "border-slate-850",
                    textClass: "text-slate-100",
                    accentBg: "bg-purple-600",
                    badgeColor: "text-purple-400 bg-purple-950/50"
                  },
                  {
                    id: "indigo" as const,
                    name: "Royal Indigo",
                    desc: "High contrast luxury navy and cyan glow",
                    bgClass: "bg-indigo-950",
                    borderClass: "border-indigo-900",
                    textClass: "text-indigo-50",
                    accentBg: "bg-indigo-600",
                    badgeColor: "text-indigo-300 bg-indigo-950"
                  },
                  {
                    id: "white" as const,
                    name: "Crisp White",
                    desc: "Standard modern tech minimal layout",
                    bgClass: "bg-white",
                    borderClass: "border-slate-200",
                    textClass: "text-slate-850",
                    accentBg: "bg-purple-600",
                    badgeColor: "text-purple-600 bg-purple-50"
                  }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleThemeChange(t.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer relative group/theme select-none active:scale-98 ${
                      sidebarTheme === t.id
                        ? "border-purple-600 bg-purple-50/10 shadow-md"
                        : "border-slate-200 hover:border-slate-350 bg-white"
                    }`}
                  >
                    {sidebarTheme === t.id && (
                      <span className="absolute top-3 right-3 w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center border border-purple-500 shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}

                    <h4 className="font-bold text-sm text-slate-900 font-display flex items-center gap-1.5 uppercase tracking-wide">
                      {t.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{t.desc}</p>

                    {/* Micro Sidebar Preview block */}
                    <div className="mt-3 p-2 bg-slate-50 border border-slate-150 rounded-lg flex gap-2">
                      <div className={`w-14 h-12 rounded-md border shrink-0 flex flex-col gap-1 p-1 ${t.bgClass} ${t.borderClass}`}>
                        <div className="w-full h-1.5 rounded-full bg-slate-300/40" />
                        <div className={`w-11 h-2 rounded-md ${t.accentBg}`} />
                        <div className="w-8 h-1 rounded-full bg-slate-300/20" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <span className="text-[8px] font-mono font-bold text-slate-400">SIDEBAR RAIL PREVIEW</span>
                        <span className="text-[9px] font-mono font-black text-slate-600 uppercase">
                          {t.id.toUpperCase()} MODULE
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bento Block 2: USER DIRECTORY ROLE MODIFICATIONS */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="border-b border-slate-150 px-5 py-4 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-black uppercase tracking-wide text-slate-800">
                  User Directory & Privilege Management
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500 font-bold">Total: {dbUsers.length} Users</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 font-mono text-[9px] font-bold text-slate-450 uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Member Details</th>
                    <th className="px-4 py-3">Account Type</th>
                    <th className="px-4 py-3">System Role</th>
                    <th className="px-4 py-3">Verification Status</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 font-medium">
                  {dbUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm uppercase">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 leading-none">{user.name}</p>
                            <p className="text-[10px] text-slate-450 font-mono mt-1">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-650">
                          {user.accountType}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-0.5 rounded-full font-mono text-[8px] font-black uppercase tracking-wide border ${
                          user.role === "Administrator"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : "bg-slate-50 border-slate-200 text-slate-500"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`flex items-center gap-1 text-[10px] font-bold ${
                          user.status === "Active" ? "text-emerald-600" : "text-amber-500"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-amber-400 animate-ping"}`} />
                          {user.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          className={`text-[9px] font-mono font-black uppercase tracking-wider px-2 py-1 border rounded-lg opacity-50 cursor-not-allowed ${
                            user.role === "Administrator"
                              ? "bg-slate-100 border-slate-300 text-slate-600"
                              : "bg-purple-600 border-purple-600 text-white"
                          }`}
                        >
                          {user.role === "Administrator" ? "Demoted" : "Role Locked"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Pending Skill Badges & Security Log Feed (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Bento Block 3: CREDENTIAL VERIFICATIONS */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="border-b border-slate-150 px-5 py-4 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-black uppercase tracking-wide text-slate-800">
                  Pending Badge Claims
                </h3>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-3">
              {verifications.length === 0 ? (
                <div className="text-center py-6 flex flex-col items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                  <Check className="w-8 h-8 text-emerald-500 bg-emerald-50 border border-emerald-200 p-1.5 rounded-full mb-2" />
                  <p className="text-xs font-bold text-slate-700 uppercase">All clear</p>
                  <p className="text-[10px] text-slate-450 mt-0.5">No pending credential verifications.</p>
                </div>
              ) : (
                verifications.map(item => (
                  <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-2.5 transition-all hover:bg-slate-100/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{item.name}</h4>
                        <p className="text-[9px] font-mono text-purple-600 font-bold uppercase tracking-wider mt-0.5">
                          {item.pathway}
                        </p>
                      </div>
                      <span className="text-[8px] font-mono text-slate-400">{item.date}</span>
                    </div>

                    <div className="bg-white border border-slate-150 rounded-lg py-1 px-2.5 text-[9px] font-mono text-slate-500 flex items-center justify-between">
                      <span className="truncate">📎 {item.file}</span>
                      <span className="text-purple-500 font-bold uppercase shrink-0 text-[8px]">PROOFS SECURED</span>
                    </div>

                    {/* Verification Actions */}
                    <div className="grid grid-cols-2 gap-2 mt-0.5">
                      <button
                        type="button"
                        onClick={() => handleRejectVerification(item.id, item.name)}
                        className="bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 hover:border-rose-300 font-mono font-black uppercase text-[8px] tracking-wider py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <X className="w-3 h-3" /> Deny Claim
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApproveVerification(item.id, item.name)}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-mono font-black uppercase text-[8px] tracking-wider py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Verify & Badge
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Bento Block 4: SECURITY AUDIT LOGS */}
          <div className="bg-slate-950 border border-slate-850 rounded-xl shadow-md overflow-hidden text-slate-100">
            <div className="border-b border-slate-850 px-5 py-4 bg-slate-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-mono font-black uppercase tracking-wider text-slate-200">
                  System Security Ledger
                </h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <div className="p-4 flex flex-col gap-2.5 font-mono text-[9px] leading-relaxed">
              {logs.map(log => {
                let badgeClass = "text-slate-400 bg-slate-900 border-slate-800";
                if (log.type === "success") badgeClass = "text-emerald-400 bg-emerald-950/50 border-emerald-900/40";
                if (log.type === "warning") badgeClass = "text-amber-400 bg-amber-950/50 border-amber-900/40";

                return (
                  <div key={log.id} className="border-b border-slate-900 pb-2.5 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-bold shrink-0">[{log.time}]</span>
                      <span className={`px-1 rounded border text-[8px] shrink-0 font-black uppercase ${badgeClass}`}>
                        {log.type}
                      </span>
                    </div>
                    <p className="text-slate-350 mt-1 pl-1 border-l-2 border-purple-900/60">{log.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
