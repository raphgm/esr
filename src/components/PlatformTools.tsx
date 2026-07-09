import React from "react";
import { 
  Zap, 
  Terminal, 
  Layers, 
  Cpu, 
  Workflow, 
  ShieldCheck, 
  Code, 
  Sparkles,
  ArrowRight,
  MousePointer2
} from "lucide-react";

const tools = [
  {
    id: "consultancy",
    title: "Self-Service Escrow",
    desc: "Deploy smart-contract backed escrow milestones in 2 clicks. No legal overhead.",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    badge: "Automated"
  },
  {
    id: "gigs",
    title: "Golden Path Templates",
    desc: "Pre-configured consultancy structures for high-retention video or cloud architecture.",
    icon: Workflow,
    color: "text-blue-500",
    bg: "bg-blue-50",
    badge: "Standardized"
  },
  {
    id: "gigs",
    title: "AI Cognitive Assistant",
    desc: "Reducing overhead by drafting pitches, specs, and status reports automatically.",
    icon: Sparkles,
    color: "text-purple-500",
    bg: "bg-purple-50",
    badge: "Smart"
  },
  {
    id: "portfolio",
    title: "Universal Portfolio API",
    desc: "Sync your verified skills from skill-sch.com and GitHub to all job boards instantly.",
    icon: Code,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    badge: "Integrated"
  },
  {
    id: "home",
    title: "Platform Observability",
    desc: "Real-time tracking of your contract health, payout velocity, and skill growth.",
    icon: Cpu,
    color: "text-rose-500",
    bg: "bg-rose-50",
    badge: "Live"
  },
  {
    id: "connect",
    title: "Resource Orchestrator",
    desc: "Spin up cohesive delivery squads and assembly lines for complex MVPs.",
    icon: Layers,
    color: "text-amber-500",
    bg: "bg-amber-50",
    badge: "Scalable"
  }
];

export const PlatformTools = ({ onNavigate }: { onNavigate?: (id: string) => void }) => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold uppercase tracking-widest mb-4">
            <Terminal className="w-3 h-3 text-purple-400" />
            <span>Platform Engineering Principles</span>
          </div>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tight uppercase font-display mb-4 md:whitespace-nowrap">
            The AI-First <span className="text-purple-600">Talent</span> Experience
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            We've applied internal developer platform (IDP) principles to AI engineering and data science. 
            <strong> Reduce cognitive load</strong>, follow <strong>AI-optimized golden paths</strong>, and 
            leverage <strong>self-service infrastructure</strong> to scale your intelligence output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => (
            <div 
              key={idx} 
              className="group p-8 bg-white border border-slate-200 rounded-3xl hover:border-purple-500 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <tool.icon className="w-24 h-24" />
              </div>
              
              <div className={`w-12 h-12 ${tool.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <tool.icon className={`w-6 h-6 ${tool.color}`} />
              </div>

              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight font-display">
                  {tool.title}
                </h3>
                <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">
                  {tool.badge}
                </span>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {tool.desc}
              </p>

              <button 
                onClick={() => onNavigate?.(tool.id)}
                className="flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-purple-600 transition-colors group/btn"
              >
                <span>Access Tool</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* CTA / Setup Section - Minimalist & Thin Direction */}
        <div className="mt-20 py-8 px-6 md:px-10 bg-white border border-slate-200 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="text-xl font-black uppercase tracking-tight text-slate-900">
                Ready to optimize your talent infrastructure?
              </h4>
              <p className="text-slate-500 text-sm font-medium">
                Our platform handles the orchestration so you can focus on pure creation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <div className="flex flex-col">
                <span className="text-emerald-500 font-mono">14ms AVG</span>
                <span>Latency</span>
              </div>
              <div className="w-px h-6 bg-slate-100" />
              <div className="flex flex-col">
                <span className="text-emerald-500 font-mono">99.99%</span>
                <span>Uptime</span>
              </div>
            </div>

            <button 
              onClick={() => onNavigate?.("gigs")}
              className="bg-slate-950 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-sm hover:shadow-lg hover:bg-purple-600 cursor-pointer flex items-center gap-3 group"
            >
              Initialize Workspace
              <MousePointer2 className="w-3 h-3 group-hover:scale-125 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
