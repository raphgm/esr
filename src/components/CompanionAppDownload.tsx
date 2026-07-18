import React, { useState } from "react";
import {
  Smartphone,
  QrCode,
  ShieldCheck,
  Zap,
  Download,
  WifiOff,
  Check,
  Loader2,
  RefreshCw,
  Sparkles,
  SmartphoneNfc
} from "lucide-react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";

export default function CompanionAppDownload() {
  const [scanState, setScanState] = useState<"idle" | "scanning" | "success">("idle");
  const [loadingText, setLoadingText] = useState("VERIFYING HANDSHAKE...");

  // Off-chain offline synchronization states
  const [syncItems, setSyncItems] = useState([
    { id: 1, action: "Upload Escrow Milestone Contract", time: "Just now", size: "12 KB", status: "Pending" },
    { id: 2, action: "Save Digital Marketing Course Note", time: "5 mins ago", size: "4 KB", status: "Pending" },
    { id: 3, action: "Sync Wallet Birthdate Meta-Data", time: "1 hour ago", size: "1 KB", status: "Synced" }
  ]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [conflictResolved, setConflictResolved] = useState<"cloud" | "mobile" | null>(null);

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setSyncItems(prev => prev.map(item => ({ ...item, status: "Synced" })));
      setIsSyncing(false);
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.9 }
      });
    }, 1500);
  };

  const handleClearQueue = () => {
    setSyncItems([
      { id: 1, action: "Upload Escrow Milestone Contract", time: "Just now", size: "12 KB", status: "Pending" },
      { id: 2, action: "Save Digital Marketing Course Note", time: "5 mins ago", size: "4 KB", status: "Pending" },
      { id: 3, action: "Sync Wallet Birthdate Meta-Data", time: "1 hour ago", size: "1 KB", status: "Synced" }
    ]);
    setConflictResolved(null);
  };

  const handleResolveConflict = (strategy: "cloud" | "mobile") => {
    setConflictResolved(strategy);
    confetti({
      particleCount: 20,
      angle: strategy === "cloud" ? 60 : 120,
      spread: 35
    });
  };

  const triggerScanSimulation = () => {
    if (scanState !== "idle") return;
    
    setScanState("scanning");
    setLoadingText("VERIFYING HANDSHAKE...");

    // Stage 1
    setTimeout(() => {
      setLoadingText("ESTABLISHING SECURE OFF-CHAIN LINK...");
    }, 800);
    
    // Stage 2
    setTimeout(() => {
      setLoadingText("GENERATING CRYPTO SYNC KEYS...");
    }, 1500);

    // Complete
    setTimeout(() => {
      setScanState("success");
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    }, 2200);
  };

  const handleReset = () => {
    setScanState("idle");
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="relative bg-gradient-to-br from-violet-50/70 via-indigo-50/40 to-emerald-50/70 rounded-[2rem] p-8 md:p-16 border border-slate-100 overflow-hidden shadow-sm">
        
        {/* Abstract Background Shapes mimicking the custom 3-stop gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-200/30 via-indigo-200/20 to-emerald-200/25 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tr from-violet-200/20 via-indigo-100/10 to-emerald-200/20 rounded-full blur-3xl translate-y-1/3 pointer-events-none"></div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col items-start text-left">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">REMOGIGS Companion Sync</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Connect Your Device <br /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-500">
                To Earn Everywhere.
              </span>
            </h2>
            
            <p className="text-base text-slate-600 font-medium max-w-md mb-8 leading-relaxed">
              Sync your mobile device using our secure QR handshake. Monitor active off-chain escrow gigs, track direct consultancy milestones, and learn offline with zero data consumption.
            </p>

            {/* Simulated Scanner State Status Board */}
            <div className="w-full max-w-md bg-white/80 backdrop-blur-xs border border-slate-200/60 p-5 rounded-2xl shadow-xs mb-8 flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                INTEGRATION PANEL
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800">Scanner Engine Status:</span>
                {scanState === "idle" && (
                  <span className="text-xs bg-gradient-to-r from-violet-50/80 via-indigo-50/80 to-emerald-50/80 border border-indigo-100/50 text-indigo-700 px-3 py-1 rounded-full font-bold font-mono">
                    READY FOR SCANS
                  </span>
                )}
                {scanState === "scanning" && (
                  <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-bold font-mono flex items-center gap-1.5 animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> SCANNING...
                  </span>
                )}
                {scanState === "success" && (
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold font-mono flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> SECURELY LINKED
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                {scanState === "idle" && (
                  <button
                    onClick={triggerScanSimulation}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-500 hover:opacity-95 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer text-sm"
                  >
                    <SmartphoneNfc className="w-4 h-4" />
                    Test & Trigger Live Scanner
                  </button>
                )}
                {scanState === "scanning" && (
                  <div className="w-full bg-slate-50 text-slate-500 py-3 px-5 rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider animate-pulse">
                    {loadingText}
                  </div>
                )}
                {scanState === "success" && (
                  <div className="w-full flex gap-2">
                    <div className="flex-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs py-3 px-4 rounded-xl font-bold flex items-center gap-1.5 justify-center">
                      <Sparkles className="w-4 h-4 text-emerald-500 animate-bounce" />
                      100 REMOGIGS points bonus awarded!
                    </div>
                    <button
                      onClick={handleReset}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-3 rounded-xl transition-all cursor-pointer"
                      title="Reset Connection"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>End-to-End Cryptography</span>
              </div>
              <div className="flex items-center gap-2">
                <WifiOff className="w-5 h-5 text-indigo-500" />
                <span>100% Offline Capability</span>
              </div>
            </div>
          </div>

          {/* Right Content - Abstract Phone/QR Mockup */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-sm">
              
              {/* Phone Frame */}
              <div className="bg-white rounded-[3rem] p-3 border-[10px] border-slate-900 shadow-2xl relative aspect-[1/2] flex flex-col overflow-hidden">
                {/* Top Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 rounded-b-2xl w-1/3 mx-auto z-20"></div>
                
                {/* App Screen Content */}
                <div className="flex-1 bg-slate-950 rounded-[2rem] border border-slate-800 p-5 flex flex-col relative z-10 pt-8 text-white select-none">
                  
                  {/* Internal Status bar */}
                  <div className="flex justify-between items-center mb-4 text-[9px] font-mono tracking-wider text-slate-400">
                    <span>REMOGIGS MOBILE</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>SECURE</span>
                    </div>
                  </div>

                  {/* Header */}
                  <div className="text-center mb-5">
                    <span className="text-[10px] font-mono tracking-widest bg-gradient-to-r from-violet-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent uppercase font-bold">
                      REMOGIGS APP
                    </span>
                    <h4 className="text-lg font-display font-black tracking-tight mt-0.5 text-white">
                      COMPANION APP
                    </h4>
                  </div>
                  
                  {/* QR Code Scan Area */}
                  <div 
                    onClick={scanState === "idle" ? triggerScanSimulation : undefined}
                    className={`flex-1 flex flex-col items-center justify-center rounded-2xl p-4 my-2 relative overflow-hidden transition-all duration-300 border ${
                      scanState === "idle" 
                        ? "bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-indigo-500/50 cursor-pointer group" 
                        : scanState === "scanning"
                        ? "bg-indigo-950/40 border-indigo-500/50"
                        : "bg-emerald-950/30 border-emerald-800/80"
                    }`}
                  >
                    {/* Corner decorative scanner lines */}
                    <div className={`absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 transition-colors duration-300 ${
                      scanState === "idle" ? "border-violet-500 group-hover:border-emerald-400" : scanState === "scanning" ? "border-amber-400 animate-pulse" : "border-emerald-400"
                    }`}></div>
                    <div className={`absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 transition-colors duration-300 ${
                      scanState === "idle" ? "border-violet-500 group-hover:border-emerald-400" : scanState === "scanning" ? "border-amber-400 animate-pulse" : "border-emerald-400"
                    }`}></div>
                    <div className={`absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 transition-colors duration-300 ${
                      scanState === "idle" ? "border-violet-500 group-hover:border-emerald-400" : scanState === "scanning" ? "border-amber-400 animate-pulse" : "border-emerald-400"
                    }`}></div>
                    <div className={`absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 transition-colors duration-300 ${
                      scanState === "idle" ? "border-violet-500 group-hover:border-emerald-400" : scanState === "scanning" ? "border-amber-400 animate-pulse" : "border-emerald-400"
                    }`}></div>
                    
                    {/* Glowing scanning laser simulation line using our brand gradient */}
                    {scanState !== "success" && (
                      <motion.div
                        initial={{ top: "5%" }}
                        animate={{ top: "95%" }}
                        transition={{
                          duration: scanState === "scanning" ? 1.0 : 2.2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                        className={`absolute left-0 right-0 h-0.5 pointer-events-none z-15 ${
                          scanState === "scanning" 
                            ? "bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#fbbf24]" 
                            : "bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_8px_#6366f1]"
                        }`}
                      />
                    )}

                    {/* QR Code Box & Screen States */}
                    {scanState === "idle" && (
                      <>
                        <div className="bg-white p-3 rounded-xl shadow-inner relative z-10 transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_0_15px_rgba(99,102,241,0.35)]">
                          <QrCode className="w-28 h-28 text-slate-950" />
                        </div>

                        <div className="mt-4 text-center">
                          <span className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase group-hover:text-indigo-300 transition-colors">
                            Click to Link Device
                          </span>
                          <span className="text-[9px] text-indigo-300/80 group-hover:text-indigo-200 font-medium block mt-1 leading-normal max-w-[150px] mx-auto transition-colors">
                            Tap to start secure off-chain synchronization
                          </span>
                        </div>
                      </>
                    )}

                    {scanState === "scanning" && (
                      <>
                        <div className="bg-white/90 p-3 rounded-xl shadow-inner relative z-10 filter blur-[0.5px] scale-[0.98]">
                          <QrCode className="w-28 h-28 text-slate-950 opacity-60" />
                        </div>

                        <div className="mt-4 text-center">
                          <div className="flex items-center justify-center gap-2 mb-1.5">
                            <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                            <span className="text-[10px] font-mono tracking-widest text-amber-400 block uppercase font-bold">
                              Scanning...
                            </span>
                          </div>
                          <span className="text-[9px] text-slate-300 font-medium block leading-normal max-w-[150px] mx-auto font-mono">
                            {loadingText}
                          </span>
                        </div>
                      </>
                    )}

                    {scanState === "success" && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center p-2 text-center"
                      >
                        <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-950/50 mb-3 border-2 border-emerald-400">
                          <Check className="w-7 h-7 text-white stroke-[3px]" />
                        </div>
                        
                        <span className="text-[10px] font-mono tracking-widest text-emerald-400 block uppercase font-bold mb-1">
                          ✓ Device Linked
                        </span>
                        
                        <h5 className="text-sm font-bold text-white mb-2">
                          REMOGIGS APP Active
                        </h5>

                        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-2.5 text-left text-[9px] font-mono text-slate-300 space-y-1.5 w-full min-w-[160px] shadow-inner">
                          <div className="flex justify-between">
                            <span className="text-slate-500">CLIENT:</span>
                            <span className="text-indigo-300 font-bold">CHINEDU_OKA</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">WALLET:</span>
                            <span className="text-emerald-400">CONNECTED</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">OFFLINE SYNC:</span>
                            <span className="text-slate-100">100% COMPLETE</span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReset();
                          }}
                          className="mt-4 text-[9px] font-mono text-slate-400 hover:text-white underline cursor-pointer"
                        >
                          Reset Connection
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {/* Bottom App Footer within Phone */}
                  <div className="mt-auto pt-2 border-t border-slate-900 text-center">
                    <div className="text-[8px] font-mono tracking-widest text-slate-500 uppercase">
                      REMOGIGS APP © 2026
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offline Sync Console Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Sync Status Console */}
        <div className="md:col-span-2 bg-[#FAF6EE] border border-slate-200/80 rounded-2xl p-6 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
            <WifiOff className="w-24 h-24 text-slate-900" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <h3 className="text-xs font-mono font-black uppercase tracking-wider text-slate-500">Local DB Sync Console</h3>
          </div>
          <h4 className="text-xl font-display font-black text-slate-900 mb-2">Off-chain Ledger Queue</h4>
          <p className="text-xs text-slate-600 mb-4 font-medium leading-relaxed">
            While offline, REMOGIGS records micro-payments, escrow checkpoints, and course progress in your secure device sandbox. Sync with our server when connected.
          </p>

          <div className="space-y-3">
            {syncItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:border-indigo-100 transition-all text-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-bold text-[10px] ${
                    item.status === "Synced" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"
                  }`}>
                    {item.status === "Synced" ? "✓" : "▲"}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{item.action}</p>
                    <p className="text-[10px] font-mono text-slate-400">{item.time} • {item.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                    item.status === "Synced" ? "bg-emerald-100 text-emerald-850" : "bg-amber-100 text-amber-850"
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleSyncAll}
              disabled={isSyncing || syncItems.every(i => i.status === "Synced")}
              className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSyncing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Syncing Handshake...
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  Sync Queue ({syncItems.filter(i => i.status === "Pending").length})
                </>
              )}
            </button>
            <button
              onClick={handleClearQueue}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Reset Queue
            </button>
          </div>
        </div>

        {/* Sync Sandbox Stats & Conflict resolver */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <h3 className="text-xs font-mono font-black uppercase tracking-wider text-slate-500">Conflict Resolver</h3>
            </div>
            <h4 className="text-lg font-display font-black text-slate-900 mb-1">State Merges</h4>
            <p className="text-[11px] text-slate-500 font-medium mb-4 leading-normal">
              Resolve edits made concurrently on both devices. Choose which records to preserve.
            </p>

            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl mb-4 text-xs">
              <div className="flex justify-between items-center mb-2 pb-1 border-b border-slate-200/60 font-mono text-[9px] font-black text-slate-400">
                <span>CONFLICT ID #028A</span>
                <span className="text-amber-600">PENDING RESOLUTION</span>
              </div>
              <p className="font-bold text-slate-800 text-[11px] mb-1">Coca-Cola Escrow Milestone #3</p>
              <div className="space-y-1.5 font-mono text-[10px] text-slate-600">
                <div className="flex justify-between bg-white p-1.5 rounded border border-slate-100">
                  <span className="text-slate-400">Mobile (Offline):</span>
                  <span className="font-bold text-indigo-600">"V1.4 Approved"</span>
                </div>
                <div className="flex justify-between bg-white p-1.5 rounded border border-slate-100">
                  <span className="text-slate-400">Cloud (Server):</span>
                  <span className="font-bold text-emerald-600">"V1.5 Approved"</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleResolveConflict("cloud")}
              disabled={conflictResolved !== null}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer flex justify-between items-center ${
                conflictResolved === "cloud"
                  ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              <span>Keep Cloud (v1.5)</span>
              <span className="text-[9px] font-mono text-slate-400">Recommends</span>
            </button>
            <button
              onClick={() => handleResolveConflict("mobile")}
              disabled={conflictResolved !== null}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer flex justify-between items-center ${
                conflictResolved === "mobile"
                  ? "bg-indigo-50 border-indigo-500 text-indigo-800"
                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              <span>Keep Offline (v1.4)</span>
              <span className="text-[9px] font-mono text-slate-400">Overwrite</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
