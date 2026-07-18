import React, { useState, useEffect } from "react";
import { 
  Smartphone, 
  QrCode, 
  WifiOff, 
  ShieldCheck, 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  Trash2,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { subscribeToCollection, saveCollectionItem, deleteCollectionItem, db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface SyncItem {
  id: string;
  title: string;
  type: "milestone" | "course" | "meta";
  status: "pending" | "synced";
  timestamp: any;
  size: string;
  timeAgo: string;
}

interface ConflictItem {
  id: string;
  title: string;
  status: "pending" | "resolved";
  mobileValue: string;
  cloudValue: string;
}

export const SyncConsole: React.FC = () => {
  const [syncQueue, setSyncQueue] = useState<SyncItem[]>([]);
  const [conflicts, setConflicts] = useState<ConflictItem[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scannerStatus, setScannerStatus] = useState("READY FOR SCANS");

  useEffect(() => {
    const unsubQueue = subscribeToCollection<SyncItem>("sync_queue", (items) => {
      setSyncQueue(items.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds));
    });

    const unsubConflicts = subscribeToCollection<ConflictItem>("sync_conflicts", (items) => {
      setConflicts(items);
    });

    return () => {
      unsubQueue();
      unsubConflicts();
    };
  }, []);

  const triggerTestScan = async () => {
    setIsScanning(true);
    setScannerStatus("INITIALIZING HANDSHAKE...");
    
    setTimeout(async () => {
      setScannerStatus("ENCRYPTING PAYLOAD...");
      
      setTimeout(async () => {
        // Add a random item to the queue
        const types: ("milestone" | "course" | "meta")[] = ["milestone", "course", "meta"];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const titles = {
          milestone: "Upload Escrow Milestone Contract",
          course: "Save Digital Marketing Course Note",
          meta: "Sync Wallet Birthdate Meta-Data"
        };

        try {
          await addDoc(collection(db, "sync_queue"), {
            title: titles[randomType],
            type: randomType,
            status: "pending",
            timestamp: serverTimestamp(),
            size: `${Math.floor(Math.random() * 15) + 1} KB`,
            timeAgo: "Just now"
          });

          // Occasionally trigger a conflict for demo
          if (Math.random() > 0.7) {
            await addDoc(collection(db, "sync_conflicts"), {
              title: "Coca-Cola Escrow Milestone #3",
              status: "pending",
              mobileValue: `V1.${Math.floor(Math.random() * 5) + 1} Approved`,
              cloudValue: "V1.5 Approved"
            });
          }

          setScannerStatus("SCAN SUCCESSFUL");
          setIsScanning(false);
          setTimeout(() => setScannerStatus("READY FOR SCANS"), 2000);
        } catch (err) {
          console.error("Sync error:", err);
          setScannerStatus("SCAN ERROR");
          setIsScanning(false);
        }
      }, 1000);
    }, 1000);
  };

  const resolveConflict = async (id: string, winner: "mobile" | "cloud") => {
    await deleteCollectionItem("sync_conflicts", id);
    alert(`Conflict resolved using ${winner === "mobile" ? "Offline" : "Cloud"} data.`);
  };

  const resetQueue = async () => {
    const promises = syncQueue.map(item => deleteCollectionItem("sync_queue", item.id));
    await Promise.all(promises);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Left Column: Integration Panel */}
      <div className="flex flex-col gap-6">
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">ESTARR Companion Sync</h2>
              <p className="text-slate-500 font-medium">Connect Your Device To Earn Everywhere.</p>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mb-8">
            Sync your mobile device using our secure QR handshake. Monitor active off-chain escrow gigs, track direct consultancy milestones, and learn offline with zero data consumption.
          </p>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">INTEGRATION PANEL</span>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${isScanning ? "bg-amber-500 animate-ping" : "bg-emerald-500"}`} />
                <span className="text-[10px] font-bold text-slate-600">{scannerStatus}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-tight text-slate-900">End-to-End Cryptography</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-2">
                <WifiOff className="w-5 h-5 text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-tight text-slate-900">100% Offline Capability</span>
              </div>
            </div>

            <button 
              onClick={triggerTestScan}
              disabled={isScanning}
              className="w-full bg-slate-950 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
            >
              {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}
              {isScanning ? "Syncing..." : "Test & Trigger Live Scanner"}
            </button>
          </div>
        </div>

        {/* Local DB Sync Console */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-black text-slate-900">Local DB Sync Console</h3>
            </div>
            {syncQueue.length > 0 && (
              <button 
                onClick={resetQueue}
                className="text-[10px] font-black uppercase text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl hover:bg-rose-100 transition-colors"
              >
                Reset Queue
              </button>
            )}
          </div>

          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            While offline, ESTARR records micro-payments, escrow checkpoints, and course progress in your secure device sandbox. Sync with our server when connected.
          </p>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {syncQueue.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center opacity-40"
                >
                  <RefreshCw className="w-12 h-12 mb-4" />
                  <p className="text-xs font-bold uppercase tracking-widest">Queue is empty</p>
                </motion.div>
              ) : (
                syncQueue.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-slate-300 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      item.status === "synced" ? "bg-emerald-100" : "bg-amber-100"
                    }`}>
                      {item.status === "synced" ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Zap className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-black text-slate-900 truncate">{item.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{item.timeAgo || "Just now"}</span>
                        <span className="text-[10px] font-bold text-slate-400">•</span>
                        <span className="text-[10px] font-bold text-slate-400">{item.size}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${
                        item.status === "synced" ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"
                      }`}>
                        {item.status === "synced" ? "Synced" : "Pending"}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw className={`w-4 h-4 text-slate-400 ${syncQueue.some(i => i.status === "pending") ? "animate-spin" : ""}`} />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Sync Queue ({syncQueue.filter(i => i.status === "pending").length})
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300" />
          </div>
        </div>
      </div>

      {/* Right Column: Conflict Resolver */}
      <div className="flex flex-col gap-6">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm h-full">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl font-black text-slate-900">Conflict Resolver</h3>
          </div>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">
            State Merges: Resolve edits made concurrently on both devices. Choose which records to preserve.
          </p>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {conflicts.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 flex flex-col items-center justify-center text-center opacity-40"
                >
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">No conflicts detected</p>
                </motion.div>
              ) : (
                conflicts.map((conflict) => (
                  <motion.div
                    key={conflict.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="border-2 border-amber-100 rounded-3xl overflow-hidden"
                  >
                    <div className="bg-amber-50 p-4 border-b-2 border-amber-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block">CONFLICT ID #{conflict.id.slice(0, 4).toUpperCase()}</span>
                        <h5 className="text-sm font-black text-slate-900">{conflict.title}</h5>
                      </div>
                      <span className="text-[10px] font-black bg-amber-200 text-amber-800 px-2 py-1 rounded-lg">PENDING RESOLUTION</span>
                    </div>

                    <div className="p-6 grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile (Offline):</span>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm font-bold text-slate-700 italic">
                          "{conflict.mobileValue}"
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 text-right">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cloud (Server):</span>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm font-bold text-emerald-600 italic">
                          "{conflict.cloudValue}"
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex gap-3">
                      <button 
                        onClick={() => resolveConflict(conflict.id, "cloud")}
                        className="flex-1 bg-emerald-600 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-emerald-700 transition-colors"
                      >
                        Keep Cloud (v1.5)
                        <span className="block text-[8px] opacity-70">Recommended</span>
                      </button>
                      <button 
                        onClick={() => resolveConflict(conflict.id, "mobile")}
                        className="flex-1 border-2 border-slate-200 text-slate-400 py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:border-slate-900 hover:text-slate-900 transition-all"
                      >
                        Keep Offline (v1.4)
                        <span className="block text-[8px] opacity-70">Overwrite</span>
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
