import React, { useState } from "react";
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
  AlertTriangle
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
        {[
          { label: "Active Escrows", value: "1240", desc: "Multichain talent contracts", icon: Layers, color: "text-purple-600 bg-purple-100/50 border-purple-200" },
          { label: "Ledger Volume", value: "$34,150,000", desc: "Total secured funds", icon: Database, color: "text-indigo-600 bg-indigo-100/50 border-indigo-200" },
          { label: "Sys Node Status", value: "Healthy (Lagos-01)", desc: "Off-chain latency", icon: Activity, color: "text-emerald-600 bg-emerald-100/50 border-emerald-200" },
          { label: "API Ping Latency", value: "14ms", desc: "Antigravity core engine", icon: Sparkles, color: "text-amber-600 bg-amber-100/50 border-amber-200" }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white border-2 border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">{item.label}</p>
                <h3 className="text-2xl font-black tracking-tighter text-slate-900">{item.value}</h3>
                <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tight">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Layout Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Theme Settings & Credential Approvals (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
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
