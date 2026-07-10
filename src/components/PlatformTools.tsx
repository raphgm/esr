import React from "react";
import { Zap, Terminal, Layers, Cpu, Workflow, ShieldCheck, Code, Sparkles, ArrowRight, MousePointer2, Network, LineChart } from "lucide-react";

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
  },
  {
    id: "network",
    title: "Deal Flow Network",
    desc: "Direct integration with top-tier startup deal flows and venture studio opportunities.",
    icon: Network,
    color: "text-cyan-500",
    bg: "bg-cyan-50",
    badge: "Exclusive"
  },
  {
    id: "analytics",
    title: "Talent Analytics",
    desc: "Deep insights into your market value, skill demand, and interview conversion rates.",
    icon: LineChart,
    color: "text-orange-500",
    bg: "bg-orange-50",
    badge: "Data-Driven"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
          {tools.map((tool, idx) => (
            <div 
              key={idx} 
              className="group p-5 md:p-6 bg-white border-2 border-slate-100 rounded-3xl transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md hover:border-purple-200 hover:-translate-y-1 flex flex-col min-h-[200px] cursor-pointer"
              onClick={() => onNavigate?.(tool.id)}
            >
              <div className="absolute -right-8 -bottom-8 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-500 transform-gpu pointer-events-none group-hover:scale-110">
                <tool.icon className={`w-48 h-48 ${tool.color}`} />
              </div>

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-12 h-12 rounded-[1rem] bg-white border-2 border-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm relative overflow-hidden group-hover:border-transparent">
                  <div className={`absolute inset-0 ${tool.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <tool.icon className={`w-5 h-5 text-slate-400 group-hover:scale-110 transition-all duration-300 ${tool.color.replace('text-', 'group-hover:text-')} relative z-10`} />
                </div>
                <span className={`text-[8px] font-mono font-bold uppercase px-2.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-500 rounded-full group-hover:bg-white group-hover:border-slate-300 ${tool.color.replace('text-', 'group-hover:text-')} transition-colors duration-300 shadow-xs flex items-center gap-1.5`}>
                  {/* Subtle pulsing dot */}
                  <span className={`w-1.5 h-1.5 rounded-full ${tool.color.replace('text-', 'bg-')} opacity-50 group-hover:opacity-100 animate-pulse`} />
                  {tool.badge}
                </span>
              </div>
              
              <div className="relative z-10 flex-1">
                <h3 className="text-[15px] font-black text-slate-900 tracking-tight font-display mb-1">
                  {tool.title}
                </h3>
                <p className="text-slate-500 text-[11px] leading-relaxed font-medium">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                <span className="text-[9px] font-bold text-slate-400 group-hover:text-slate-800 transition-colors uppercase tracking-wider">
                  Explore Tool
                </span>
                <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 transition-all duration-300  group-hover:scale-110 ${tool.bg.replace('bg-', 'group-hover:bg-')} ${tool.color.replace('text-', 'group-hover:border-')}`}>
                  <ArrowRight className={`w-3.5 h-3.5 text-slate-400 transition-colors ${tool.color.replace('text-', 'group-hover:text-')}`} />
                </div>
              </div>
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
