import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Code2, 
  Terminal, 
  Check, 
  Search, 
  Filter, 
  Database, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  CheckCircle2, 
  TrendingUp, 
  Info, 
  ExternalLink, 
  RefreshCw, 
  FileText, 
  Sliders, 
  EyeOff, 
  Eye, 
  DollarSign, 
  Cpu, 
  Users, 
  AlertTriangle,
  Award
} from "lucide-react";

/* --- DECENTRALIZED ESCROWS SECTION --- */
export function DecentralizedEscrowsSection() {
  const [escrowAmount, setEscrowAmount] = useState<number>(5000);
  const [contractorAddress, setContractorAddress] = useState<string>("remogigs-contractor-0x3a2b...f91a");
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([
    "Ready to initialize cryptographic milestone agreement..."
  ]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const stats = [
    { label: "Total Secured Value", value: "$12,482,900", change: "+14.2% MoM", icon: Lock },
    { label: "Active Locked Milestones", value: "312 Escrows", change: "100% On-time", icon: Cpu },
    { label: "Disbursed Funds (24h)", value: "$392,500 USD", change: "Avg 4.2 min", icon: DollarSign },
    { label: "Successful Arbitrations", value: "0.02%", change: "Industry Lowest", icon: ShieldCheck },
  ];

  const handleNextSimStep = () => {
    setIsSimulating(true);
    const logs = [
      [
        "Creating milestone smart-contract template...",
        `Locking exactly $${escrowAmount.toLocaleString()} USD in cryptographic custody.`,
        "Generated multi-sig approval parameters.",
        "Status: [PENDING FUNDING]"
      ],
      [
        "Funding request submitted via connected secure wallet.",
        `Received transaction confirmation for $${escrowAmount.toLocaleString()} USD.`,
        "Milestone state updated on-chain.",
        "Status: [ACTIVE / LOCKED]"
      ],
      [
        "Contractor submitted proof of work payload.",
        "Running automated AI lint, vetting, and performance unit diagnostics...",
        "Milestone criteria check: 100% Passed.",
        "Status: [AWAITING APPROVAL]"
      ],
      [
        "Client authorized code/payload verification.",
        `Triggering multi-sig release of $${escrowAmount.toLocaleString()} USD.`,
        "Funds successfully dispatched directly to Contractor wallet.",
        "Status: [DISBURSED / COMPLETED]"
      ]
    ];

    let stepLogs = logs[simulationStep] || [];
    let currentLogIndex = 0;

    const interval = setInterval(() => {
      if (currentLogIndex < stepLogs.length) {
        setSimulationLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${stepLogs[currentLogIndex]}`]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulationStep(prev => (prev + 1) % 4);
      }
    }, 400);
  };

  const resetSimulation = () => {
    setSimulationStep(0);
    setSimulationLogs(["Ready to initialize cryptographic milestone agreement..."]);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-900 dark:text-slate-100">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-950/10 via-indigo-950/10 to-slate-950/10 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        <span className="text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" /> ESCROW PROTOCOLS
        </span>
        <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight uppercase mt-2 mb-2">
          Decentralized Escrow Pipeline
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          REMOGIGS safeguards both global clients and elite independent developers with cryptographically secure, multi-sig escrow wallets. Funds are deposited prior to contract execution, locked securely in custom milestone pipelines, and released instantly upon proof-of-work validation.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200/60 dark:border-slate-800 flex flex-col gap-2 shadow-xs">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
              <stat.icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-xl font-black font-display tracking-tight text-slate-900 dark:text-white">{stat.value}</span>
            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">{stat.change}</span>
          </div>
        ))}
      </div>

      {/* Interactive Escrow Pipeline Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Simulator Panel */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-display font-extrabold text-sm uppercase tracking-tight flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-600" /> Interactive Escrow Simulator
            </h3>
            <button 
              onClick={resetSimulation} 
              className="text-[10px] text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Input Config */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Agreement Escrow Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">$</span>
                  <input 
                    type="number" 
                    value={escrowAmount} 
                    onChange={(e) => setEscrowAmount(Math.max(1, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-800 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>
              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Recipient Contractor Address
                </label>
                <input 
                  type="text" 
                  value={contractorAddress}
                  onChange={(e) => setContractorAddress(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            {/* Interactive Progress Steps */}
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Escrow Lifecycle Steps</span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "1. Create", desc: "Initiate Agreement" },
                  { label: "2. Lock", desc: "Fund Custody" },
                  { label: "3. Verify", desc: "Diagnostic Vetting" },
                  { label: "4. Disburse", desc: "Direct Release" }
                ].map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-xl border text-center transition-all ${
                      simulationStep === idx 
                        ? "border-purple-600 bg-purple-50/40 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 font-bold shadow-sm" 
                        : idx < simulationStep 
                        ? "border-emerald-200 bg-emerald-50/30 text-emerald-700 dark:text-emerald-400" 
                        : "border-slate-200 dark:border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="text-[9px] uppercase tracking-wide font-extrabold leading-none">{step.label}</div>
                    <div className="text-[7px] mt-1 font-medium leading-none opacity-80">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Action trigger button */}
            <button
              onClick={handleNextSimStep}
              disabled={isSimulating}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold rounded-xl transition-all uppercase tracking-wider cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Executing Smart Transaction...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {simulationStep === 0 && "Step 1: Deploy Cryptographic Agreement"}
                    {simulationStep === 1 && `Step 2: Lock $${escrowAmount.toLocaleString()} USD`}
                    {simulationStep === 2 && "Step 3: Trigger Proof-of-Work Verification"}
                    {simulationStep === 3 && "Step 4: Dispatch Locked Funds"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Real-Time Escrow Shell / Log Output */}
        <div className="lg:col-span-5 bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-[10px] border border-slate-800 shadow-lg flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-slate-400">
            <span className="flex items-center gap-1.5 font-bold">
              <Terminal className="w-3.5 h-3.5 text-purple-400" /> ESCROW_SHELL_DAEMON
            </span>
            <span className="text-[8px] uppercase tracking-widest bg-slate-800 px-1.5 py-0.5 rounded-sm">V2.46-Onchain</span>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[220px] flex flex-col gap-1.5 leading-relaxed text-slate-300">
            {simulationLogs.map((log, index) => (
              <div key={index} className="flex gap-2 items-start border-l-2 border-purple-500/30 pl-2">
                <span className="text-purple-400 shrink-0 select-none">$&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex gap-2 items-center text-slate-400 text-[9px] leading-relaxed">
            <Info className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Cryptographic audits verify that once funds enter the escrow pipeline, they are immutable and cannot be claimed by any party except via proof-of-work completion or mutual cancellation.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- PROGRAM GUIDELINES SECTION --- */
export function ProgramGuidelinesSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      title: "1. Professional Application",
      desc: "Submit your comprehensive professional profile, GitHub contributions, and track records. Only applications with valid, verifiable experience pass the initial semantic screening.",
      sla: "SLA: 24-48 Hours",
      tip: "Ensure your primary public repositories are set to public view."
    },
    {
      title: "2. Proctor AI Vetting Interview",
      desc: "Connect with our real-time interactive technical interviewer (Maya or Marcus). Answer adaptive questions specifically testing architectural depth, edge security, and performance optimizations.",
      sla: "SLA: Live Interactive",
      tip: "Be descriptive and technical. The AI analyzes lexical density and technical accuracy."
    },
    {
      title: "3. Diagnostic Sandbox Auditing",
      desc: "Submit sample code snippets or repositories for real-time automated diagnostic audits. The REMOGIGS audit engine calculates Big-O complexity, evaluates memory footprint, and scans for critical vulnerability vectors.",
      sla: "SLA: Instantaneous",
      tip: "Avoid unhandled exceptions and redundant loops. Write modular code."
    },
    {
      title: "4. Badge Issuance & Directory Dispatch",
      desc: "Receive your 'Alpha-Cohort Elite' or 'Vetted Expert' verified badge. Your credentials are permanently written to your profile and you are instantly dispatched into active premium corporate match filters.",
      sla: "SLA: Immediate",
      tip: "Vetted badges increase job and gig matching algorithms by over 340%."
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-900 dark:text-slate-100">
      <div className="bg-gradient-to-r from-purple-950/10 via-indigo-950/10 to-slate-950/10 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        <span className="text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5" /> VERIFICATION CORE
        </span>
        <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight uppercase mt-2 mb-2">
          REMOGIGS Program Guidelines
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          The REMOGIGS program represents the elite benchmark for global software contractors, designers, and AI engineers. By satisfying rigorous automated assessments and secure peer vetting, members unlock risk-free contracts, higher gig rates, and immediate payouts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Step list selector */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Vetting Funnel Steps</span>
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                activeStep === idx 
                  ? "border-purple-600 bg-purple-50/40 dark:bg-purple-950/20 shadow-xs" 
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40"
              }`}
            >
              <div className={`text-[9px] font-bold uppercase tracking-wider mb-1 ${activeStep === idx ? "text-purple-600" : "text-slate-400"}`}>
                Phase {idx + 1}
              </div>
              <div className="font-display font-bold text-xs text-slate-900 dark:text-white">{step.title}</div>
            </button>
          ))}
        </div>

        {/* Guideline Detail Panel */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-950/20 p-4 rounded-xl border border-purple-100 dark:border-purple-900/30">
            <span className="w-8 h-8 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center">
              0{activeStep + 1}
            </span>
            <div>
              <h3 className="font-display font-extrabold text-sm text-purple-950 dark:text-purple-300">{steps[activeStep].title}</h3>
              <span className="text-[9px] font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mt-0.5">
                {steps[activeStep].sla}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-xs">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
              {steps[activeStep].desc}
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Pro-Tip for Fast Vetting
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed italic">
                "{steps[activeStep].tip}"
              </p>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Disbursement Speed Guarantee</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                Within 1 Hour of Approval
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- ESCROW PIPELINE FAQS --- */
export function EscrowFaqsSection() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the multi-sig proof-of-work mechanism protect contractors?",
      a: "When a milestone agreement is initialized, the client funds a locked cryptographic wallet. These funds are mathematically bound. Once the work is delivered and validates against the agreed requirements, the multi-sig is verified automatically by the platform or authorized directly by the client. The client cannot unilaterally withdraw funds once a contract begins, guaranteeing full contractor payment safety."
    },
    {
      q: "Are there any gas or transaction fees for escrows?",
      a: "REMOGIGS operates on zero gas-fee optimization. We subsidize ledger transaction costs behind the scenes. Clients pay a negligible 0.5% escrow security fee upon deposit, and contractors receive 100% of their earnings with zero platform deductions."
    },
    {
      q: "What digital assets are supported in the escrow wallet?",
      a: "Our escrows support fully backed stablecoins (USDT, USDC) as well as fiat-to-token conversions. Funds are pegged 1-to-1 to stable values to safeguard contractors against cryptocurrency market volatility."
    },
    {
      q: "How are disputes resolved in the escrow pipeline?",
      a: "In the ultra-rare event of a dispute, our Decentralized Arbitration Council steps in. Three independent, verified, high-reputation experts are randomly dispatched to audit the submitted work against the contractual scope. Majority verdict releases the escrow funds securely, typically completing within 24 hours."
    },
    {
      q: "Can clients fast-track vetting for their contractors?",
      a: "Yes. Premium enterprise accounts can request express contractor vetting. This unlocks a temporary 24-Hour Express Pass, immediately unblocking the contractor pipeline while automated audits run asynchronously."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-900 dark:text-slate-100">
      <div className="bg-gradient-to-r from-purple-950/10 via-indigo-950/10 to-slate-950/10 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        <span className="text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5" /> INTEL SERVICES
        </span>
        <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight uppercase mt-2 mb-2">
          Escrow Pipeline FAQs
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          Everything you need to know about secure contracting, multi-sig locks, milestone audits, and instant developer payout infrastructure.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md w-full">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search escrow queries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 bg-white dark:bg-slate-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        />
      </div>

      {/* FAQ Accordion List */}
      <div className="flex flex-col gap-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 flex justify-between items-center text-left font-display font-extrabold text-xs text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-purple-600" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-slate-400 text-xs font-medium">
            No FAQ entries match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}

/* --- CONTRACTOR DIRECTORY --- */
export function ContractorDirectorySection() {
  const [filterSkill, setFilterSkill] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProfileCard, setSelectedProfileCard] = useState<any>(null);

  const contractors = [
    { name: "Chinedu Okafor", role: "Principal Cloud Engineer", skills: ["Python", "Solidity", "Kubernetes", "React"], rating: 4.95, badges: ["Alpha-Cohort Elite"], projects: 28, rep: 98, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=chinedu" },
    { name: "Maya Sterling", role: "AI Systems Architect", skills: ["PyTorch", "LLMs", "TensorFlow", "React"], rating: 4.98, badges: ["Alpha-Cohort Elite"], projects: 42, rep: 99, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=maya" },
    { name: "Marcus Thorne", role: "DevOps & Audit Director", skills: ["Rust", "Security", "Solidity", "Docker"], rating: 4.91, badges: ["Vetted Expert"], projects: 19, rep: 94, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=marcus" },
    { name: "Amara Diop", role: "Senior UX / Web3 Designer", skills: ["Figma", "Branding", "React", "Tailwind"], rating: 4.89, badges: ["Vetted Expert"], projects: 31, rep: 92, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=amara" },
    { name: "Farooq Alao", role: "Full-Stack AI Integrator", skills: ["Next.js", "LangChain", "Node.js", "Solidity"], rating: 4.85, badges: ["Certified Practitioner"], projects: 12, rep: 88, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=farooq" }
  ];

  const allSkills = ["All", "Solidity", "PyTorch", "Rust", "React", "Security", "Figma"];

  const filteredContractors = contractors.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = filterSkill === "All" || c.skills.includes(filterSkill);
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-900 dark:text-slate-100">
      <div className="bg-gradient-to-r from-purple-950/10 via-indigo-950/10 to-slate-950/10 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        <span className="text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" /> RESOURCE DIRECTORY
        </span>
        <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight uppercase mt-2 mb-2">
          Contractor Directory
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          Review fully pre-vetted, expert independent developers, design professionals, and fractional consultants of the REMOGIGS elite ecosystem. Directly pitch roles securely.
        </p>
      </div>

      {/* Directory Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search contractors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        {/* Skill Swatches */}
        <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {allSkills.map(skill => (
            <button
              key={skill}
              onClick={() => setFilterSkill(skill)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-tight border cursor-pointer transition-all shrink-0 ${
                filterSkill === skill 
                  ? "bg-purple-600 border-purple-600 text-white shadow-xs" 
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Contractor Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContractors.map((c, idx) => (
          <div 
            key={idx} 
            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-2xs hover:shadow-xs hover:border-purple-300/60 dark:hover:border-purple-900/40 transition-all group"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <img 
                  src={c.avatar} 
                  alt={c.name} 
                  className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform" 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-display font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {c.name}
                  </h4>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] leading-tight block mt-0.5">{c.role}</span>
                </div>
              </div>

              {/* Badge */}
              <span className={`text-[7px] font-mono font-black uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${
                c.badges[0].includes("Alpha") 
                  ? "bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-400" 
                  : "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/30 dark:text-indigo-400"
              }`}>
                {c.badges[0]}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-center text-[10px]">
              <div>
                <span className="text-slate-400 block text-[8px] uppercase font-bold tracking-wider">Vetting Score</span>
                <span className="font-display font-bold text-slate-800 dark:text-white">{(c.rating * 20).toFixed(0)}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[8px] uppercase font-bold tracking-wider">Reputation</span>
                <span className="font-display font-bold text-slate-800 dark:text-white">{c.rep}/100</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[8px] uppercase font-bold tracking-wider">Contracts</span>
                <span className="font-display font-bold text-slate-800 dark:text-white">{c.projects}</span>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1">
              {c.skills.map(s => (
                <span key={s} className="bg-slate-50 dark:bg-slate-800 border border-slate-200/40 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-md">
                  {s}
                </span>
              ))}
            </div>

            <button 
              onClick={() => setSelectedProfileCard(c)}
              className="w-full mt-1 py-2 border border-slate-200 hover:border-purple-500 dark:border-slate-800 dark:hover:border-purple-800 text-slate-700 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400 text-[10px] font-extrabold rounded-xl transition-all cursor-pointer uppercase tracking-wider bg-slate-50 hover:bg-white dark:bg-slate-800"
            >
              Secure Direct Pitch
            </button>
          </div>
        ))}
      </div>

      {/* Pitch Modal */}
      {selectedProfileCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-xl max-w-sm w-full p-6 flex flex-col gap-4 relative animate-scale-up text-xs">
            <button 
              onClick={() => setSelectedProfileCard(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm"
            >
              ✕
            </button>
            <div className="flex gap-3 items-center">
              <img src={selectedProfileCard.avatar} alt={selectedProfileCard.name} className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100" referrerPolicy="no-referrer" />
              <div>
                <h4 className="font-display font-bold text-slate-900 dark:text-white">{selectedProfileCard.name}</h4>
                <p className="text-[10px] text-slate-400">{selectedProfileCard.role}</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Submit a fast project pitch proposal to <span className="font-bold">{selectedProfileCard.name}</span>. This dispatch immediately locks a secure validation channel.
            </p>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Proposed Milestone Escrow Allocation ($)</label>
              <input type="number" defaultValue="5000" className="w-full border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 bg-slate-50 dark:bg-slate-800" />
            </div>
            <button 
              onClick={() => {
                alert(`🎉 Secure Match Pitch dispatched successfully to ${selectedProfileCard.name}!`);
                setSelectedProfileCard(null);
              }}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all uppercase tracking-wider cursor-pointer"
            >
              Send Secure Pitch Proposal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- PLATFORM STATUS --- */
export function PlatformStatusSection() {
  const [latency, setLatency] = useState<number>(31);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 9) - 4;
        return Math.max(12, Math.min(68, prev + delta));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleManualScan = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  const systems = [
    { name: "API Gateway (Europe / West)", status: "Operational", uptime: "99.98%", load: "Low Load" },
    { name: "Vetting Proctor Engine Nodes", status: "Operational", uptime: "100.0%", load: "Balanced" },
    { name: "Escrow Pipeline Smart Contracts", status: "Operational", uptime: "99.99%", load: "Secure" },
    { name: "Global CDN (Edge)", status: "Operational", uptime: "99.99%", load: "Optimal" },
    { name: "Automated Sandbox Compiler Nodes", status: "Operational", uptime: "99.96%", load: "Hydrated" },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-900 dark:text-slate-100">
      <div className="bg-gradient-to-r from-purple-950/10 via-indigo-950/10 to-slate-950/10 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        <span className="text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5" /> DIAGNOSTICS & STATUS
        </span>
        <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight uppercase mt-2 mb-2">
          REMOGIGS System Health Status
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          Real-time diagnostics and platform status feed for our globally distributed technical validation nodes, compilers, and cryptographic escrow structures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Side: General status card & graph */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl flex items-center gap-4">
            <span className="relative flex h-3.5 w-3.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
            </span>
            <div>
              <h3 className="font-display font-black text-xs uppercase tracking-tight text-emerald-800 dark:text-emerald-400">All Systems Operational</h3>
              <p className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80 mt-0.5 leading-normal">Operational uptime over 99.991% global average.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-2xs flex flex-col gap-3">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Current Vetting Network Latency</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-display text-slate-900 dark:text-white transition-all">{latency}ms</span>
              <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wide">Excellent</span>
            </div>
            {/* Simple Latency visual bars */}
            <div className="flex gap-1 h-8 items-end bg-slate-50 dark:bg-slate-800/40 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800/60">
              {Array.from({ length: 24 }).map((_, i) => {
                const height = Math.max(15, Math.min(100, (latency + (Math.sin(i * 0.8) * 12) + (i % 3 === 0 ? 8 : -4))));
                return (
                  <div 
                    key={i} 
                    style={{ height: `${height}%` }}
                    className="flex-1 bg-purple-500/20 dark:bg-purple-500/30 group-hover:bg-purple-500 rounded-sm hover:bg-purple-600 transition-all cursor-pointer"
                  />
                );
              })}
            </div>
            <button 
              onClick={handleManualScan}
              disabled={refreshing}
              className="w-full mt-1.5 py-2 text-[9px] font-extrabold uppercase tracking-widest border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} /> 
              {refreshing ? "Re-scanning Systems..." : "Refresh Systems Status"}
            </button>
          </div>
        </div>

        {/* Right Side: System Node Status lists */}
        <div className="md:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Operational Node Grid</span>
          <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
            {systems.map((sys, idx) => (
              <div key={idx} className="py-3.5 flex justify-between items-center text-xs">
                <div className="flex flex-col pr-4">
                  <span className="font-display font-extrabold text-slate-900 dark:text-white">{sys.name}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{sys.load} • Avg Uptime: {sys.uptime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">{sys.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- TERMS & CONDITIONS --- */
export function TermsConditionsSection() {
  const clauses = [
    { title: "1. Scope of Ecosystem Agreement", content: "By registering an account with REMOGIGS, clients and contractors enter a professional relationship facilitated by decentralized milestone tracking. Platform guidelines mandate absolute cryptographic escrow funding of all active contract milestones prior to assignment commencement. No party shall request work-product dispatch prior to securing equivalent value in the REMOGIGS contract lock." },
    { title: "2. Cryptographic Escrow & Funding", content: "Clients agree that once a milestone is funded, the locked deposit cannot be unilaterally withdrawn except through mutual contract cancellation or verified non-delivery of work-product. Contractors agree that locked payments are fully released ONLY upon compiling with proof-of-work guidelines, automated diagnostics passing, or Client manual release triggers." },
    { title: "3. Disbursed Funds and Fees", content: "REMOGIGS facilitates direct wallet-to-wallet disbursements without financial custody. Transactions are facilitated automatically using secure pegged stablecoins or automated credit clearing. A 0.5% escrow security fee is paid by Clients upon funding. Freelance contractors are subject to 0% base commission, retaining 100% of their earned milestone distributions." },
    { title: "4. Intellectual Property & Code Deliverables", content: "Upon cryptographic disbursement approval, intellectual property rights, licenses, and ownership parameters of vetted code snippets, models, and repositories transfer immediately and exclusively to the Client. The contractor guarantees all payloads are free of plagiarism, critical malware, or unannotated copyrighted snippets." },
    { title: "5. Peer Arbitration", content: "Disputes regarding criteria satisfaction are directed exclusively to the REMOGIGS Decentralized Arbitration Council. Three random, high-reputation members arbitrate the payload deliverables against original milestone specifications. Their majority on-chain vote releases or refunds the escrow deposit. Both parties acknowledge the decision of the Council is legally binding and non-appealable." }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-900 dark:text-slate-100">
      <div className="bg-gradient-to-r from-purple-950/10 via-indigo-950/10 to-slate-950/10 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        <span className="text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" /> LEGAL PROTOCOLS
        </span>
        <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight uppercase mt-2 mb-2">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          Please read these standard terms of service carefully. They govern your rights, secure contract rules, multi-sig escrow deposits, and legally binding decentralization arbitrations on the REMOGIGS platform.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 p-6 shadow-sm flex flex-col gap-5 text-xs">
        <div className="flex flex-col gap-4">
          {clauses.map((clause, index) => (
            <div key={index} className="flex flex-col gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
              <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-tight">{clause.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-justify">{clause.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- PRIVACY & COOKIES --- */
export function PrivacyCookiesSection() {
  const [cookieConsent, setCookieConsent] = useState<{ functional: boolean; analytics: boolean; marketing: boolean }>({
    functional: true,
    analytics: true,
    marketing: false
  });

  const toggleCookie = (type: "functional" | "analytics" | "marketing") => {
    if (type === "functional") return; // functional is always on
    setCookieConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-900 dark:text-slate-100">
      <div className="bg-gradient-to-r from-purple-950/10 via-indigo-950/10 to-slate-950/10 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        <span className="text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" /> PRIVACY & GDPR
        </span>
        <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight uppercase mt-2 mb-2">
          Privacy & Cookies Policy
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          REMOGIGS values your absolute privacy. We anonymize and scrub code repositories, preserve contractor wallet privacy, and comply strictly with GDPR and CCPA benchmarks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: General Privacy clauses */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-5 text-xs">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-tight">1. General Data Practices</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-justify mt-1">We collect your e-mail address, professional profile metadata, and billing credentials to securely establish and protect your professional workspace. Since our payment disbursements bypass custody via secure stablecoins or direct bank clearings, we do not store sensitive payment account credentials on our database.</p>
            </div>
            <div>
              <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-tight">2. Anonymized Sandbox Code Submissions</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-justify mt-1">When engineers submit code to the AI Vetting Center or use our interactive compiler nodes, all proprietary files are scrubbed of Personally Identifiable Information (PII) and keys prior to analysis. Logs are retained for a maximum of 30 days to facilitate debug audits, after which they are permanently purged.</p>
            </div>
            <div>
              <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-tight">3. Global Security and CCPA/GDPR Compliance</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-justify mt-1">You retain absolute authority over your professional datasets. You may permanently delete your profile, repository records, active directory visibility, and verification history instantly through your user account dashboard at any time.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Cookie preferences box */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Cookie Preferences</span>
          <p className="text-[11px] text-slate-500 leading-normal">
            Configure how REMOGIGS handles localized cookie scripts. Necessary items are permanently locked to ensure workspace stability.
          </p>

          <div className="flex flex-col gap-3 pt-2">
            {[
              { type: "functional", title: "Functional Necessary", desc: "Required to hold active authentication and stable layout theme state.", disabled: true },
              { type: "analytics", title: "Performance Diagnostics", desc: "Allows anonymous telemetry logging to monitor Vetting latency.", disabled: false },
              { type: "marketing", title: "Ecosystem Partner Campaigns", desc: "Enables partner sponsorship matching logs in the Gig Market.", disabled: false }
            ].map((cookie, idx) => {
              const key = cookie.type as "functional" | "analytics" | "marketing";
              return (
                <div key={idx} className="flex justify-between items-start text-xs border-b border-slate-100 dark:border-slate-800 pb-2.5 last:border-0 last:pb-0">
                  <div className="flex flex-col pr-4">
                    <span className="font-display font-extrabold text-slate-900 dark:text-white">{cookie.title}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{cookie.desc}</span>
                  </div>
                  <button
                    disabled={cookie.disabled}
                    onClick={() => toggleCookie(key)}
                    className={`w-9 h-5 rounded-full p-0.5 transition-all cursor-pointer ${
                      cookieConsent[key] ? "bg-purple-600" : "bg-slate-200"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-all shadow-sm ${cookieConsent[key] ? "translate-x-4" : ""}`} />
                  </button>
                </div>
              );
            })}
          </div>

          <button 
            onClick={() => alert("🎉 Cookie preferences updated and saved permanently.")}
            className="w-full mt-2 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl cursor-pointer transition-all"
          >
            Save Cookie Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

/* --- DATA COLLECTION POLICY --- */
export function DataCollectionPolicySection() {
  const [scrubLevel, setScrubLevel] = useState<number>(100);

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-900 dark:text-slate-100">
      <div className="bg-gradient-to-r from-purple-950/10 via-indigo-950/10 to-slate-950/10 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        <span className="text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" /> ETHICAL SCANS
        </span>
        <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight uppercase mt-2 mb-2">
          Data Collection Policy
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          REMOGIGS strictly limits technical data collection. Discover how our smart pipelines analyze technical payloads without compromising commercial proprietary source structures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Policy breakdown text */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-5 text-xs">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-tight">Code Evaluation Metrics Collected</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-1 text-justify">The platform calculates algorithmic Big-O space/time complexity, cyclomatic dependency paths, file lint compliance, vulnerability signatures, and memory leak patterns. We do NOT store or compile code logic into generative training models without affirmative developer consent.</p>
            </div>
            <div>
              <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-tight">Workspace Sandbox Isolation</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-1 text-justify">All automated vetting operations execute inside single-use isolated containers. Once diagnostic metrics are generated, the container is destroyed instantly. The physical storage of code payloads terminates with container demolition.</p>
            </div>
            <div>
              <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-tight">Telemetry and Logging Limits</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-1 text-justify">Client dashboard analytics and spend telemetry logs are protected by localized cryptographic keys. They are accessible solely by authorized developers and enterprise managers connected directly to the escrow contracts.</p>
            </div>
          </div>
        </div>

        {/* Scrub level interactive slider panel */}
        <div className="lg:col-span-5 bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-[10px] border border-slate-800 shadow-lg flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-slate-400">
            <span className="flex items-center gap-1.5 font-bold">
              <Sliders className="w-3.5 h-3.5 text-purple-400" /> ANONYMIZER_DEMO
            </span>
            <span className="text-[8px] uppercase tracking-widest bg-slate-800 px-1.5 py-0.5 rounded-sm">PII Filter</span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Dynamic PII & Variable Scrub Level</span>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col gap-3">
              <input 
                type="range" 
                min="50" 
                max="100" 
                step="10"
                value={scrubLevel}
                onChange={(e) => setScrubLevel(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between items-center text-[9px] text-slate-400">
                <span>Medium: 50%</span>
                <span className="text-purple-400 font-bold">Level: {scrubLevel}%</span>
                <span>Absolute: 100%</span>
              </div>
            </div>

            {/* Simulated file output code block */}
            <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Simulated Scrubbed Output Payload</span>
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-[9px] leading-relaxed text-slate-300">
              <div className="flex gap-2">
                <span className="text-slate-500">01:</span>
                <span>const <span className="text-purple-400">{scrubLevel === 100 ? "scrubbed_module" : "evaluateSalaryCompensation"}</span> = () =&gt; &#123;</span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-500">02:</span>
                <span>  const <span className="text-purple-400">{scrubLevel >= 80 ? "private_key_var" : "apiKeySecret"}</span> = <span className="text-emerald-400">"***SCRUBBED***"</span>;</span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-500">03:</span>
                <span>  return <span className="text-purple-400">{scrubLevel === 100 ? "data_payload" : "developerEarnings"}</span>;</span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-500">04:</span>
                <span>&#125;</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl text-slate-400 leading-relaxed text-[9px] flex gap-2 items-start">
              <CheckCircle2 className="text-purple-400 w-4 h-4 shrink-0 mt-0.5" />
              <span>
                {scrubLevel === 100 
                  ? "Absolute anonymization active: All function names, variable scopes, secrets, and comments are fully randomized and scrubbed prior to vetting." 
                  : "Moderate privacy active: Standard API credentials and secrets are fully scrubbed, while maintaining semantic variable names to review logic flow."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- COMPLIANCE AUDITS --- */
export function ComplianceAuditsSection() {
  const [activeReport, setActiveReport] = useState<number | null>(null);

  const audits = [
    {
      title: "Milestone Smart Contract Audit",
      auditor: "ConsenSys Diligence / CertiK Verified",
      date: "May 2026",
      hash: "0xfa91...d2c3",
      score: "100/100 Perfect Security",
      details: "Audit completed with zero critical, zero high, and zero medium level vulnerabilities discovered. Full checks-effects-interactions compliance satisfied on all milestone dispatch methods.",
      checks: [
        "Reentrancy vulnerabilities: Secure",
        "Integer Overflow/Underflow protection: Active",
        "Multi-sig signature validation: Verified",
        "Escrow asset Pegasus collateralization: Safe"
      ]
    },
    {
      title: "Privacy Diagnostics Auditing",
      auditor: "SOC2 Type II Regulatory Commission",
      date: "March 2026",
      hash: "SOC2-REMOGIGS-2026",
      score: "SOC2 Compliant Certified",
      details: "Comprehensive operational and platform audit verifying strict workspace isolation, absolute sandbox container termination, and secure encrypted telemetry configurations.",
      checks: [
        "PiI Scrubbing mechanisms: 100% Compliant",
        "Sandbox server destruction latency: < 50ms",
        "Encrypted database access: Active",
        "Data leakage telemetry scans: Perfect"
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-900 dark:text-slate-100">
      <div className="bg-gradient-to-r from-purple-950/10 via-indigo-950/10 to-slate-950/10 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        <span className="text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" /> SECURITY COMPLIANCE
        </span>
        <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight uppercase mt-2 mb-2">
          Compliance Audits & Reports
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          REMOGIGS holds itself to the absolute zenith of technical security. Review our physical, operational, smart contract, and cryptographic compliance audits here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {audits.map((audit, idx) => (
          <div 
            key={idx} 
            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Stamp stamp overlay */}
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-emerald-500/10 rounded-full border border-emerald-500/20 rotate-12 flex items-center justify-center font-display font-black text-[8px] text-emerald-600 dark:text-emerald-400 uppercase tracking-widest leading-none text-center">
              SECURE<br/>PASS
            </div>

            <div>
              <span className="text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest block">{audit.auditor}</span>
              <h3 className="font-display font-black text-sm text-slate-900 dark:text-white mt-1 uppercase tracking-tight">{audit.title}</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Audited: {audit.date} • Cryptographic Hash: <span className="font-mono text-purple-600 dark:text-purple-400">{audit.hash}</span></p>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-emerald-800 dark:text-emerald-400 text-[10px] font-bold font-display uppercase tracking-wider w-fit">
              {audit.score}
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed text-justify">
              {audit.details}
            </p>

            <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Detailed Checks Log</span>
              <div className="flex flex-col gap-1.5 text-[10px]">
                {audit.checks.map((chk, i) => (
                  <div key={i} className="flex gap-2 items-center text-slate-600 dark:text-slate-400">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{chk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
