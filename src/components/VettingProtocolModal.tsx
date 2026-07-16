import React from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle2, ChevronRight, Activity, BrainCircuit, ShieldAlert, Cpu } from 'lucide-react';

interface VettingProtocolModalProps {
  onClose: () => void;
  onApply: () => void;
}

export function VettingProtocolModal({ onClose, onApply }: VettingProtocolModalProps) {
  return (
    <div className="fixed inset-0 z-[60] bg-slate-50/90 backdrop-blur-md flex flex-col justify-center items-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-5 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col"
      >
        <div className="bg-slate-950 p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-rose-500/10 text-rose-400 px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-widest border border-rose-500/20 mb-4">
              <ShieldAlert className="w-3.5 h-3.5" /> Only the Top 1% Pass
            </div>
            <h2 className="text-3xl font-black tracking-tight mb-3">Our Vetting Protocol</h2>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
              We don't do resume screening or keyword matching. Candidates enter our high-cognitive evaluation pipeline where every skill is mathematically benchmarked.
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-8 bg-slate-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-2 shadow-sm relative overflow-hidden group hover:border-purple-300 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-purple-500 transition-colors" />
              <span className="text-3xl font-black text-slate-200 font-mono">01</span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-0.5">Cognitive Aptitude Test (CCAT)</h4>
                <span className="text-[10px] text-slate-500 font-medium">Top 12% Pass</span>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-2 shadow-sm relative overflow-hidden group hover:border-purple-300 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-purple-500 transition-colors" />
              <span className="text-3xl font-black text-slate-200 font-mono">02</span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-0.5">Subject Matter Real-World Trial</h4>
                <span className="text-[10px] text-slate-500 font-medium">Top 4% Pass</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-2 shadow-sm relative overflow-hidden group hover:border-purple-300 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-purple-500 transition-colors" />
              <span className="text-3xl font-black text-slate-200 font-mono">03</span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-0.5">Direct Peer Architecture Audit</h4>
                <span className="text-[10px] text-slate-500 font-medium">Top 1.5% Pass</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-2 shadow-sm relative overflow-hidden group hover:border-purple-300 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-emerald-500 transition-colors" />
              <span className="text-3xl font-black text-slate-200 font-mono">04</span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-0.5">Escrow & Security Clearance</h4>
                <span className="text-[10px] text-emerald-600 font-bold">Top 1% Admitted</span>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-100 text-purple-700 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
                Active Milestone
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">Cognitive Aptitude Test (CCAT)</h3>
            <p className="text-sm font-medium text-slate-500 italic mb-4">"Evaluation of logic, abstract reasoning, and fast-paced numerical resolution."</p>
            
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Candidates face a customized 50-question cognitive capability assessment. This test benchmarks raw processing speed, critical decision accuracy, and logical adaptability under high-pressure parameters.
            </p>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Strict Admittance Benchmarks</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Numerical & verbal aptitude
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Spatial & logical sequencing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Under-pressure accuracy
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Activity className="w-4 h-4 text-purple-500" />
                Vetting Engine Active • Verified on-chain
              </div>
              <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full sm:w-auto">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl font-bold text-sm transition-all text-center cursor-pointer"
                >
                  Skip for Now
                </button>
                <button 
                  onClick={onApply}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  Instant 24h Express Pass (Unblock) <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
