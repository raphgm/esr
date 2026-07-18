import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  FileText, 
  ChevronRight, 
  Briefcase, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  Clock, 
  Lock, 
  User, 
  TrendingUp, 
  AlertTriangle, 
  Globe, 
  Sparkles,
  Search,
  BookMarked,
  Info
} from 'lucide-react';

interface GuideItem {
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
}

export function HelpGuideSection() {
  const [selectedGuide, setSelectedGuide] = useState<GuideItem | null>(null);

  const guides: GuideItem[] = [
    {
      title: "How to Post Jobs",
      desc: "Step-by-step guide on creating and publishing job listings.",
      icon: Briefcase,
      content: (
        <div className="flex flex-col gap-6">
          <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl flex gap-3 items-start">
            <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5 animate-pulse" />
            <p className="text-xs text-purple-950 leading-relaxed">
              <span className="font-extrabold block text-[13px] mb-0.5 text-purple-900">💡 Platform Posting Policy</span>
              ESTARR matches elite African technical talent to secure projects. Each posted job requires a designated escrow tier to ensure high response rates from vetted contractors.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-display font-black text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1.5">
              📌 The 4-Step Job Posting Workflow
            </h4>
            
            <div className="flex gap-4">
              <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-mono font-black text-xs shrink-0">1</div>
              <div className="flex-1">
                <h5 className="font-bold text-slate-800 text-xs">Navigate to the Gigs & Jobs Workspace</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Head over to your **Client Dashboard** or click **Gigs** on the main navigation panel. Select the "Post a New Gigs / Contract" button to open the secure draft portal.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-mono font-black text-xs shrink-0">2</div>
              <div className="flex-1">
                <h5 className="font-bold text-slate-800 text-xs">Define Technical Scope & Stack requirements</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Specify whether you need full-stack engineers, AI fine-tuning specialists, or custom agents. Explicitly list the tech stack (e.g., *React, Tailwind, @google/genai, Cloud Run, Firebase*). This feeds into our sandbox auto-vetting filters.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-mono font-black text-xs shrink-0">3</div>
              <div className="flex-1">
                <h5 className="font-bold text-slate-800 text-xs">Establish Funded Escrow Milestones</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Break the total contract budget into discrete phases (e.g., Phase 1: Prototype Kickoff - 30%; Phase 2: Core Integration - 50%; Phase 3: Deployment - 20%). Pre-funding these milestones guarantees instant engagement from the top 1% of talent.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-mono font-black text-xs shrink-0">4</div>
              <div className="flex-1">
                <h5 className="font-bold text-indigo-950 text-xs flex items-center gap-1.5">Launch & Filter Matching Specialists <span className="text-[9px] bg-indigo-500 text-white px-1.5 py-0.5 rounded-full uppercase">Automatic</span></h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Submit your listing. ESTARR's automated match protocol analyzes candidate sandbox results, quality scores, and milestone history, notifying matching elite engineers instantly.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-[10px] font-bold text-slate-600 font-mono">ESTARR VETTING GAURANTEE</span>
            </div>
            <span className="text-[10px] text-slate-400">All matched contractors hold standard C2 Elite fluency.</span>
          </div>
        </div>
      )
    },
    {
      title: "Manage Consultancy Contracts",
      desc: "Learn how to manage your consultancy tasks and milestones.",
      icon: FileText,
      content: (
        <div className="flex flex-col gap-6">
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex gap-3 items-start">
            <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <p className="text-xs text-indigo-950 leading-relaxed">
              <span className="font-extrabold block text-[13px] mb-0.5 text-indigo-900">🤝 Real-Time Progress Oversight</span>
              The **Consultancy Dashboard** serves as your unified command center, keeping milestones, verification requests, and escrow allocations synchronized perfectly between clients and contractors.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-display font-black text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1.5">
              📋 Core Management Pillars
            </h4>

            <div className="bg-white border border-slate-100 rounded-xl p-3.5 flex items-start gap-3 shadow-xs">
              <Clock className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-slate-800 text-xs">Interactive Milestone Tracker</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Monitor live completion percentages (e.g., 30%, 65%, 100%) dynamically compiled from contract milestones. Track active steps like **Drafting Phase**, **Under Verification**, and **Approved & Released**.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-xl p-3.5 flex items-start gap-3 shadow-xs">
              <Lock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-slate-800 text-xs">Escrow Funding States</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Contracts utilize pre-funded escrow vaults. Funds are locked securely in the smart vault. You have complete visibility into which milestones are fully backed by secure USD reserves.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-xl p-3.5 flex items-start gap-3 shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-slate-800 text-xs">One-Click Releases & Approvals</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  When a contractor completes work and submits proof, the milestone status upgrades to **In Review**. Click to review their hosted code compilation, check quality scores, and release funds instantly.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-amber-50/70 border border-amber-100 rounded-xl flex gap-2.5 items-start">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-800 leading-relaxed">
              <span className="font-bold">Did you know?</span> If milestone deliverables deviate from specs, either party can initiate dispute resolution, automatically freezing the milestone until audit review finishes.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Escrow Workflow",
      desc: "Navigate the secure payment and escrow process.",
      icon: ShieldCheck,
      content: (
        <div className="flex flex-col gap-6">
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-3 items-start">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 animate-pulse" />
            <p className="text-xs text-emerald-950 leading-relaxed">
              <span className="font-extrabold block text-[13px] mb-0.5 text-emerald-900">🛡️ Multi-Sig Milestone Escrow</span>
              ESTARR employs a secure holding vault model to align client security with contractor guarantee. No work is started without pre-funding, and no funds are transferred without proof-of-work.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-3.5 border border-slate-100 bg-slate-50 rounded-xl flex flex-col gap-2">
              <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase">Step 1</span>
              <h5 className="font-bold text-slate-800 text-[11px]">Milestone Vault Funding</h5>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Client deposits milestone budget into the secure vault. Platform guarantees lock.
              </p>
            </div>
            <div className="p-3.5 border border-slate-100 bg-slate-50 rounded-xl flex flex-col gap-2">
              <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase">Step 2</span>
              <h5 className="font-bold text-slate-800 text-[11px]">Milestone Verification</h5>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Contractor builds deliverables. On completion, they submit to the live pipeline.
              </p>
            </div>
            <div className="p-3.5 border border-slate-100 bg-indigo-50/50 border-indigo-100 rounded-xl flex flex-col gap-2">
              <span className="text-[10px] font-mono font-extrabold text-indigo-500 uppercase">Step 3</span>
              <h5 className="font-bold text-indigo-950 text-[11px]">Instant Payout release</h5>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Client verifies and clicks "Release Fund". Platform immediately transfers funds to developer.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-display font-black text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1.5">
              ⚖️ Dispute Resolution & Code Audits
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              ESTARR ensures transactional peace of mind through a dedicated technical arbitration model:
            </p>
            <ul className="list-disc pl-5 text-[11px] text-slate-500 flex flex-col gap-1.5">
              <li>**Arbitration Trigger:** If the client or contractor claims work mismatch, the vault freezes.</li>
              <li>**Vetting Audits:** A neutral ESTARR Technical Director performs a manual sandbox compile test and quality audit within 48 business hours.</li>
              <li>**Equitable Allocation:** Based on the audit, frozen funds are distributed proportionally to represent the real proof-of-work delivered.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Getting Started",
      desc: "Learn how to set up your profile and start your first project.",
      icon: BookOpen,
      content: (
        <div className="flex flex-col gap-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                <h4 className="font-display font-black text-xs text-purple-950 uppercase tracking-wider">For Clients & Enterprises</h4>
              </div>
              <ul className="list-decimal pl-4 text-[11px] text-slate-600 flex flex-col gap-1.5">
                <li>Create and configure your secure workspace.</li>
                <li>Link an approved fiat or digital payment provider.</li>
                <li>Draft your contract, specifying required expertise verticals.</li>
                <li>Fund the initial milestone to match with African elite developers.</li>
              </ul>
            </div>

            <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <h4 className="font-display font-black text-xs text-indigo-950 uppercase tracking-wider">For Elite Contractors</h4>
              </div>
              <ul className="list-decimal pl-4 text-[11px] text-slate-600 flex flex-col gap-1.5">
                <li>Submit your portfolio for automated vetting compilation.</li>
                <li>Participate in the live sandbox code architecture evaluation.</li>
                <li>Gain C2 Elite communication clearance.</li>
                <li>Receive direct contract matching with secure pre-funded milestone payouts.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-950 text-white rounded-2xl relative overflow-hidden flex flex-col gap-2">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
            <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" /> Connecting Global Tech Ecosystems
            </span>
            <h5 className="font-display font-bold text-xs text-slate-100">Our Vetting Mission</h5>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Africa hosts some of the world's most brilliant code craftsman. ESTARR bypasses traditional operational challenges, offering frictionless legally-compliant workspaces, robust milestone systems, and instant global payment processing.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "FAQ",
      desc: "Frequently asked questions about payments, vetting, and more.",
      icon: HelpCircle,
      content: (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3.5">
            <div className="p-3.5 border border-slate-100 bg-slate-50/50 rounded-xl">
              <h5 className="font-extrabold text-slate-900 text-xs">How do contractors become ESTARR Certified?</h5>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Candidates undergo a rigorous 3-tiered auditing protocol: a secure container sandbox compilation check to test architectural consistency, an live code-review board, and a comprehensive communication screen verifying C2 Elite proficiency.
              </p>
            </div>

            <div className="p-3.5 border border-slate-100 bg-slate-50/50 rounded-xl">
              <h5 className="font-extrabold text-slate-900 text-xs">What is the platform's standard fee model?</h5>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                ESTARR maintains a highly competitive model. Standard job postings are completely free. We charge a nominal **0.5% cryptographic escrow fee** only upon successful milestone release to fund the security arbitration committee.
              </p>
            </div>

            <div className="p-3.5 border border-slate-100 bg-slate-50/50 rounded-xl">
              <h5 className="font-extrabold text-slate-900 text-xs">What happens if a developer misses a deadline?</h5>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Your pre-funded budget remains locked safely in the escrow vault. You can use the dashboard to negotiate timelines directly with the builder, or escalate to ESTARR arbitration to cancel and claim a 100% refund of uncompleted milestones.
              </p>
            </div>

            <div className="p-3.5 border border-slate-100 bg-slate-50/50 rounded-xl">
              <h5 className="font-extrabold text-slate-900 text-xs">Can we draft custom Milestone specs after project start?</h5>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Yes. Active milestones can be adjusted by submitting a modified contract addendum. Both parties must sign off inside their respective dashboards for the new terms to take effect.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in p-6">
      <div className="flex flex-col gap-1 w-full border-b border-slate-100 pb-4">
        <h2 className="text-xl font-display font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
          📖 Documentation & Help Guide
        </h2>
        <p className="text-slate-500 text-xs">Find answers, detailed tutorials, and premium workflow guides to master the ESTARR ecosystem.</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {guides.map((guide, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedGuide(guide)}
            className="p-5 border border-slate-200 bg-white hover:border-indigo-400 shadow-xs hover:shadow-md transition-all rounded-2xl flex flex-col gap-4 text-left w-full cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center transition-transform group-hover:scale-105">
              <guide.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{guide.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1.5">{guide.desc}</p>
            </div>
            <div className="text-xs font-bold text-indigo-600 flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
              Read Guide <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>
        ))}
      </div>

      {/* Premium Documentation Modal Window */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col relative animate-scale-up">
            
            {/* Modal Header */}
            <div className="bg-[#090E1A] text-white p-6 relative flex items-center justify-between border-b border-slate-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3.5 relative z-10">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                  <selectedGuide.icon className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                    <BookMarked className="w-3 h-3 text-purple-400" /> Platform Knowledge Base
                  </span>
                  <h3 className="font-display font-black text-lg text-white tracking-tight mt-1 uppercase">
                    {selectedGuide.title}
                  </h3>
                </div>
              </div>

              <button 
                onClick={() => setSelectedGuide(null)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-lg font-bold w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center relative z-10 hover:scale-105"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto max-h-[65vh] bg-slate-50/40">
              {selectedGuide.content}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">
                Last updated: July 2026
              </span>
              <button
                onClick={() => setSelectedGuide(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white text-[11px] font-extrabold rounded-xl transition-all uppercase cursor-pointer tracking-wider"
              >
                Got It, Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

