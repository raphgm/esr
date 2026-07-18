import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Cpu, 
  Globe, 
  ChevronRight, 
  CheckCircle2, 
  Search, 
  BrainCircuit, 
  Square, 
  ShieldCheck, 
  Activity, 
  Layout, 
  Lock, 
  Zap,
  ArrowUpRight,
  Sparkles,
  Layers,
  Code2,
  DollarSign,
  Clock,
  Star,
  Shield,
  Brain,
  Briefcase,
  FileText
} from "lucide-react";

const SKILL_COMPETENCIES: Record<string, {
  topics: string[];
  duration: string;
  benchmark: string;
  score: string;
  method: string;
}> = {
  // IT & Tech Pros
  "Cloud & DevOps": {
    topics: ["Terraform & IaC automation", "AWS/GCP multi-region architecture", "Docker containerization & registry design", "GitHub Actions & CI/CD deployment optimization"],
    duration: "4.5 Hours Practical Exam",
    benchmark: "SOC2 Compliance & Idempotency verification",
    score: "Passed (99.4%)",
    method: "Live Architecture & Pipeline Defense"
  },
  "WhatsApp Stores": {
    topics: ["WhatsApp Cloud API integration", "High-velocity webhooks processing", "Twilio & Meta webhook security verification", "Distributed state & shopping cart databases"],
    duration: "3.5 Hours Coding Task",
    benchmark: "Rate limit handling & <200ms latency standard",
    score: "Passed (97.8%)",
    method: "Asynchronous Message Queue Load Test"
  },
  "GitHub Workflows": {
    topics: ["Advanced YAML workflows", "Custom GitHub actions development", "Secure secret management & environment gating", "Automated code analysis & linter integrations"],
    duration: "2 Hours Test Scenario",
    benchmark: "Zero-leak secret policies & dynamic matrix setup",
    score: "Passed (98.5%)",
    method: "PR Auditing & Security Rigor Review"
  },
  "React/TypeScript": {
    topics: ["Advanced React hooks & memory leak diagnostics", "Strong TypeScript type-safety & strict mode validation", "State management optimization (Zustand, Redux)", "Component modularity & bundle size optimization"],
    duration: "4 Hours Interactive Session",
    benchmark: "Zero 'any' rule compliance & clean rendering loops",
    score: "Passed (99.1%)",
    method: "Double Peer Senior UI Panel Defense"
  },
  "Python & Automation": {
    topics: ["FastAPI/Flask API development", "BeautifulSoup & Selenium scrapers", "Data processing with Pandas & NumPy", "OAuth integration & third-party service synclinks"],
    duration: "3 Hours Automated Challenge",
    benchmark: "Thread-safe task execution & error boundary design",
    score: "Passed (98.2%)",
    method: "Stress & Memory Leak Profile Script Audit"
  },

  // Train AI (RLHF & Tuning)
  "RLHF Annotation": {
    topics: ["Preference alignment formatting", "Sycophancy & bias reduction tagging", "Multi-turn conversation grading metrics", "Fine-grained response comparison auditing"],
    duration: "3 Hours Cognitive Check",
    benchmark: "Inter-annotator agreement consensus (Cohen's Kappa > 0.85)",
    score: "Passed (99.5%)",
    method: "Independent Double-Blind Alignment Review"
  },
  "DPO Optimization": {
    topics: ["Direct Preference Optimization training", "Reward modeling alignment", "Loss function configuration", "Log-probability difference tuning"],
    duration: "4 Hours Theory & Project",
    benchmark: "Kullback-Leibler (KL) divergence constraint balancing",
    score: "Passed (96.7%)",
    method: "Fine-Tuning Hyperparameter Lab Defense"
  },
  "Red Teaming": {
    topics: ["Prompt injection vulnerability discovery", "Safety guardrail bypass patterns", "Harmful output vector stress-testing", "System instructions bypass analysis"],
    duration: "5 Hours Adversarial Task",
    benchmark: "Zero unauthorized execution paths found",
    score: "Passed (100% Critical)",
    method: "Adversarial Stress Sandbox Execution"
  },
  "Gemini Tuning": {
    topics: ["Supervised Fine-Tuning (SFT)", "Dataset generation & cleaning parameters", "Low-Rank Adaptation (LoRA) setup", "API-driven custom tuning loops"],
    duration: "4.5 Hours Specialized Exam",
    benchmark: "Accurate schema adherence & temperature stability",
    score: "Passed (98.0%)",
    method: "Active Gemini API SDK Evaluation"
  },
  "JSON Schema Enforcement": {
    topics: ["Strict JSON output specifications", "Response schema definition frameworks", "Validation retry loops", "Type-safe parsers (Zod, Pydantic)"],
    duration: "2.5 Hours Interactive Coding",
    benchmark: "100% validation rate over 10,000 requests",
    score: "Passed (99.8%)",
    method: "Strict Automated JSON Integrity Test"
  },

  // Build AI (Integration)
  "Pinecone & Qdrant": {
    topics: ["Vector database indexing strategy", "Cosine similarity vs Dot product optimization", "Dynamic metadata filtering", "Real-time index updates & namespacing"],
    duration: "3 Hours Scenario Challenge",
    benchmark: "Query response time <50ms over 1M records",
    score: "Passed (97.4%)",
    method: "High-Volume Query Latency Stress Test"
  },
  "LangChain/LlamaIndex": {
    topics: ["Autonomous chain-of-thought routing", "Document loaders & chunking pipelines", "Memory persistence & chat history state", "Advanced query engine optimization"],
    duration: "4 Hours Architecture Task",
    benchmark: "Sub-second RAG latency with high context retrieval relevance",
    score: "Passed (98.6%)",
    method: "Multi-Document Agent Practical Execution"
  },
  "Function Calling": {
    topics: ["Dynamic tool specification", "Strict type arguments validation", "Asynchronous function execution hooks", "Error recovery & conversational fallback"],
    duration: "3.5 Hours Real-Time Task",
    benchmark: "Zero invalid argument invocation over 5,000 iterations",
    score: "Passed (99.0%)",
    method: "SDK Multi-Tool Execution Audit"
  },
  "Semantic Caching": {
    topics: ["Redis/GPTCache setup", "Threshold tuning for embedding distance", "Cached response invalidation policies", "Local embed lookup latency optimization"],
    duration: "2.5 Hours Performance Lab",
    benchmark: "Average latency reduction of 75% or higher",
    score: "Passed (96.5%)",
    method: "Cache Hit/Miss Speed Benchmarks"
  },
  "Graph Databases": {
    topics: ["Neo4j Cypher query optimization", "Knowledge graph entity extraction", "Relational mapping to graph schemas", "Hierarchical data modeling"],
    duration: "4 Hours Complex Challenge",
    benchmark: "Optimal node traversal & relationship density scaling",
    score: "Passed (97.1%)",
    method: "Graph Knowledge Base Schema Defense"
  },

  // Consultancy (Strategy)
  "Agile Scaling": {
    topics: ["Scrum & Kanban at scale", "Cross-functional pipeline coordination", "Escrow-linked agile sprint design", "Predictable team velocity metrics"],
    duration: "3 Hours Case Study Panel",
    benchmark: "Sprint delivery variance under 10%",
    score: "Passed (99.0%)",
    method: "Double Peer Executive Board Defense"
  },
  "Compliance & GDPR": {
    topics: ["ISO 27001 security standards", "GDPR privacy policy engineering", "SOC2 Type II pipeline design", "Data encryption & custody rules"],
    duration: "3 Hours Technical Audit",
    benchmark: "100% adherence to core regulatory standards",
    score: "Passed (99.6%)",
    method: "Formal Audit Scenario Interactive Board"
  },
  "Technical Auditing": {
    topics: ["Legacy codebase review strategies", "Technical debt cost estimation", "Security vulnerability triage", "Scalability roadblock detection"],
    duration: "4 Hours Audit Sandbox",
    benchmark: "Accurate capture of 95%+ injected system faults",
    score: "Passed (98.3%)",
    method: "Injected Bug & Performance Fault Hunt"
  },
  "Risk Management": {
    topics: ["Contingency planning models", "Escrow dispute resolution architecture", "Service Level Agreement (SLA) verification", "Scope creep mitigation framework"],
    duration: "3 Hours Advisory Panel",
    benchmark: "Objective hazard assessment & risk matrix logic",
    score: "Passed (97.5%)",
    method: "Interactive Escalation Case Simulation"
  },
  "Architecture Mapping": {
    topics: ["Microservice decomposition charts", "Data flow & boundary diagrams", "Database partitioning strategy", "High-availability clustering models"],
    duration: "4 Hours Visual & Tech Exam",
    benchmark: "Clear system separation and no single point of failure",
    score: "Passed (98.9%)",
    method: "Complex Distributed Architecture Design Board"
  },

  // Talent Systems (Vetting)
  "Algorithmic Auditing": {
    topics: ["Time/space complexity grading", "Dynamic programming optimizations", "Advanced data structure evaluations", "Thread safety verification"],
    duration: "4 Hours Practical Screening",
    benchmark: "Standardized evaluation score reproducibility > 95%",
    score: "Passed (99.2%)",
    method: "Double Evaluator Consensus Alignment Review"
  },
  "System Design Panels": {
    topics: ["Distributed load balancing", "Database replication & consistency models", "Caching layers & CDN optimizations", "Event-driven system designs"],
    duration: "4.5 Hours Design Sandbox",
    benchmark: "Accurate assessment of state synchronization bottlenecks",
    score: "Passed (98.7%)",
    method: "Senior Technical Board Peer Audit"
  },
  "Security Screening": {
    topics: ["OWASP Top 10 mitigation review", "Identity & access control policies", "SQL injection & XSS prevention checks", "Cryptographic signature verifications"],
    duration: "3.5 Hours Defense Task",
    benchmark: "Accurate threat capture & remediation reporting",
    score: "Passed (99.4%)",
    method: "Vulnerability Scanning & Practical Patch Review"
  },
  "Core Skill Certification": {
    topics: ["Standardized competency frameworks", "Direct knowledge evaluation methodology", "Automated score integrity checks", "Custom assessment development"],
    duration: "3 Hours Method Audit",
    benchmark: "Accurate psychometric validation of test questions",
    score: "Passed (98.0%)",
    method: "Vetting Methodology Evaluation Board"
  },
  "Linguistic Testing": {
    topics: ["Professional English communication scoring", "Remote sync video assessment", "Written technical documentation review", "Clarity & articulation grading"],
    duration: "2 Hours Live Interview",
    benchmark: "CEFR C1/C2 level speaking & writing standard",
    score: "Passed (99.5%)",
    method: "Structured CEFR Verbal & Text Analysis"
  }
};

const PROFILE_METRICS: Record<string, {
  label1: string; value1: string; pct1: string;
  label2: string; value2: string; pct2: string;
  label3: string; value3: string; pct3: string;
  badges: string[];
}> = {
  "it-tech": {
    label1: "System Architecture & Scalability", value1: "98.4%", pct1: "98.4%",
    label2: "Asynchronous Webhook Throughput", value2: "96.8%", pct2: "96.8%",
    label3: "GitHub Workflow & DevOps Rigor", value3: "100%", pct3: "100%",
    badges: ["🛡️ SOC2 Compliant Code", "⚡ Matched < 24h", "🗣️ CEFR C2 English"]
  },
  "train-ai": {
    label1: "Alignment Calibration Accuracy", value1: "99.5%", pct1: "99.5%",
    label2: "Adversarial Attack Immunity (Red Team)", value2: "100%", pct2: "100%",
    label3: "Strict JSON Schema Enforcement", value3: "98.0%", pct3: "98.0%",
    badges: ["🧠 RLHF Alignment", "🛡️ Jailbreak Resistant", "📊 Data Provenance"]
  },
  "build-ai": {
    label1: "Vector Retrieval & Context Scoring", value1: "97.4%", pct1: "97.4%",
    label2: "Multi-Agent Autonomy & Tool Integrity", value2: "99.0%", pct2: "99.0%",
    label3: "Semantic Cache Hit Latency Optimization", value3: "96.5%", pct3: "96.5%",
    badges: ["⚡ RAG Optimization", "🛠️ Tool Integration", "🤖 Autonomous Agents"]
  },
  "consultancy": {
    label1: "Escrow Milestone Risk Mitigation", value1: "99.0%", pct1: "99.0%",
    label2: "ISO 27001 & Regulatory Compliance", value2: "99.6%", pct2: "99.6%",
    label3: "Decomposition Architecture Mapping", value3: "98.9%", pct3: "98.9%",
    badges: ["💼 Fractional CTO", "🛡️ SOC2/GDPR Compliance", "📈 Agile Scaling"]
  },
  "talent-systems": {
    label1: "Algorithmic Assessment Rigor", value1: "99.2%", pct1: "99.2%",
    label2: "Security Vetting Sandbox Isolation", value2: "99.4%", pct2: "99.4%",
    label3: "Structured Linguistic Testing Standards", value3: "99.5%", pct3: "99.5%",
    badges: ["📋 Evaluator Panel Certified", "🔍 Rigorous Screener", "🧠 Psychometric Guard"]
  }
};

interface MvpLandingPageProps {
  onSignIn: () => void;
  onSignUp: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export default function MvpLandingPage({ onSignIn, onSignUp, onNavigateToTab }: MvpLandingPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEcosystemTab, setActiveEcosystemTab] = useState("it-tech");
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  // High-fidelity interactive features for Universal Service Catalog
  const [selectedDemoSkill, setSelectedDemoSkill] = useState<string | null>(null);
  const [showHireModal, setShowHireModal] = useState(false);
  const [showVettingDetail, setShowVettingDetail] = useState(false);
  
  const [hireBudgetValue, setHireBudgetValue] = useState(12000);
  const [hireMessage, setHireMessage] = useState("");
  const [hireSubmitted, setHireSubmitted] = useState(false);

  const handleSelectSkill = (skill: string) => {
    setSelectedDemoSkill(skill);
  };

  const ecosystemTabs = [
    { id: "it-tech", label: "IT & Tech Pros", icon: Cpu },
    { id: "train-ai", label: "Train AI", icon: Brain },
    { id: "build-ai", label: "Build AI", icon: BrainCircuit },
    { id: "consultancy", label: "Consultancy Leads", icon: Briefcase },
    { id: "talent-systems", label: "Talent Systems", icon: Layers },
  ];

  const ecosystemData: Record<string, {
    tag: string;
    title: string;
    desc: string;
    icon: any;
    verticals: string[];
    scope: string;
    speed: string;
    rating: string;
    buttonLabel: string;
    profile: {
      id: string;
      name: string;
      role: string;
      meta: string;
      quote: string;
      avatar: string;
      vetting: string;
    }
  }> = {
    "it-tech": {
      tag: "Expert Vertical",
      title: "Elite Software Engineers & IT Architects",
      desc: "Top 3% specialists in full-stack web, cloud infrastructure, WhatsApp business automation, and secure technical deployments.",
      icon: Cpu,
      verticals: ["Cloud & DevOps", "WhatsApp Stores", "GitHub Workflows", "React/TypeScript", "Python & Automation"],
      scope: "Scale high-performance cloud infrastructure & WhatsApp commerce automation",
      speed: "Matched in < 24 Hours",
      rating: "4.95/5 Client Rating",
      buttonLabel: "Recruit IT & Tech Pros",
      profile: {
        id: "4802",
        name: "Emeka Okafor",
        role: "Senior Cloud & Node Architect",
        meta: "Ex-Stripe • 8+ Years Exp • Lagos, Nigeria",
        quote: "Specializes in building distributed systems, high-throughput microservices, and setting up bulletproof AWS infrastructures.",
        avatar: "/images/profile_emeka.jpg",
        vetting: "Passed Tech & Soft Skills (100%)",
      }
    },
    "train-ai": {
      tag: "RLHF & Tuning Vertical",
      title: "Supervised Fine-Tuning & Prompt Engineers",
      desc: "Domain experts trained in optimizing generative models, creating high-quality reinforcement learning human feedback, and red-teaming safety filters.",
      icon: Brain,
      verticals: ["RLHF Annotation", "DPO Optimization", "Red Teaming", "Gemini Tuning", "JSON Schema Enforcement"],
      scope: "Optimize multi-modal response latency and remove toxic output vectors",
      speed: "Matched in < 48 Hours",
      rating: "4.98/5 Annotation Accuracy",
      buttonLabel: "Recruit AI Trainers",
      profile: {
        id: "9214",
        name: "Amara Dialla",
        role: "Lead RLHF Expert & Prompt Architect",
        meta: "Ex-Google Contractor • 5+ Years Exp • Abuja, Nigeria",
        quote: "Passionate about training LLMs to output reliable structured data and crafting rigorous safety validation datasets.",
        avatar: "/images/profile_amara.jpg",
        vetting: "Passed Cognition & Reasoning Audits (100%)",
      }
    },
    "build-ai": {
      tag: "Integration Vertical",
      title: "Custom Agent & RAG Pipeline Builders",
      desc: "Architects capable of engineering low-latency vector databases, semantic search architectures, and multi-agent autonomous coordination frameworks.",
      icon: BrainCircuit,
      verticals: ["Pinecone & Qdrant", "LangChain/LlamaIndex", "Function Calling", "Semantic Caching", "Graph Databases"],
      scope: "Architect a semantic search system with real-time Enterprise CRM synchronizations",
      speed: "Matched in < 12 Hours",
      rating: "4.92/5 System Reliability",
      buttonLabel: "Recruit Agent Engineers",
      profile: {
        id: "1094",
        name: "Tariq Yusuf",
        role: "Autonomous Agents & Vector Architect",
        meta: "Ex-Andela • 6+ Years Exp • Nairobi, Kenya",
        quote: "I build autonomous workflows that turn unstructured document lakes into deterministic, action-ready database systems.",
        avatar: "/images/profile_tariq.jpg",
        vetting: "Passed Agent Sandbox Deployments (100%)",
      }
    },
    "consultancy": {
      tag: "Strategy Vertical",
      title: "Technical Project Managers & Directors",
      desc: "Senior technology leaders specializing in bridging the gap between business objectives and rapid developer milestone delivery, maintaining full compliance.",
      icon: Briefcase,
      verticals: ["Agile Scaling", "Compliance & GDPR", "Technical Auditing", "Risk Management", "Architecture Mapping"],
      scope: "Draft clear micro-milestone blueprints and establish secure on-chain escrow deliverables",
      speed: "Matched in < 36 Hours",
      rating: "4.99/5 On-Time Delivery",
      buttonLabel: "Engage Advisory Leads",
      profile: {
        id: "5512",
        name: "Nia Mensah",
        role: "Fractional CTO & Delivery Director",
        meta: "Ex-Microsoft • 12+ Years Exp • Accra, Ghana",
        quote: "Translating complex scaling issues into step-by-step deliverable tracks backed by transparent verification escrow contracts.",
        avatar: "/images/profile_nia.jpg",
        vetting: "Passed Enterprise Leadership Audits (100%)",
      }
    },
    "talent-systems": {
      tag: "Vetting Vertical",
      title: "Technical Screeners & Vetting Evaluators",
      desc: "Evaluators who conduct high-fidelity algorithmic, system design, and communication audits to verify the actual output quality of engineering pools.",
      icon: Layers,
      verticals: ["Algorithmic Auditing", "System Design Panels", "Security Screening", "Core Skill Certification", "Linguistic Testing"],
      scope: "Conduct complete deep-tech reviews and compile multi-stage technical verification files",
      speed: "Matched in < 24 Hours",
      rating: "4.97/5 Evaluation Rigor",
      buttonLabel: "Engage Screeners",
      profile: {
        id: "3319",
        name: "Kofi Boateng",
        role: "Head of Algorithmic & Design Auditing",
        meta: "Ex-Toptal Evaluator • 10+ Years Exp • Kumasi, Ghana",
        quote: "Ensuring we only certify builders who demonstrate clean architectural separation, flawless testing habits, and robust problem solving.",
        avatar: "/images/profile_kofi.jpg",
        vetting: "Passed Evaluation Standard Board Checks (100%)",
      }
    }
  };

  const stats = [
    { value: "Top 3%", label: "Vetted Talent Pool", desc: "Elite technical specialists and verified annotators." },
    { value: "$4.2M+", label: "Escrow Protected", desc: "Cryptographically secured milestone contract values." },
    { value: "0.04ms", label: "Contract Velocity", desc: "Ultra-fast automated verification and validation." },
  ];

  const corePillars = [
    {
      icon: Users,
      title: "Verified Professional Network",
      desc: "ESTARR connects top-tier engineering talent with high-impact initiatives. Every contractor undergoes strict background verification and manual portfolio audits to ensure supreme output quality.",
      color: "text-purple-600",
      bg: "bg-purple-50 border-purple-100",
      gradient: "bg-gradient-to-br from-purple-100/50 via-white to-purple-100/60 border border-purple-200 shadow-md hover:border-purple-500 hover:shadow-xl hover:shadow-purple-200/40",
    },
    {
      icon: Cpu,
      title: "Resilient AI & Machine Learning Labs",
      desc: "Scale high-fidelity RLHF datasets, construct precise model-tuning tasks, and validate multi-modal annotations using the latest custom Gemini model pipelines.",
      color: "text-blue-600",
      bg: "bg-blue-50 border-blue-100",
      gradient: "bg-gradient-to-br from-blue-100/50 via-white to-blue-100/60 border border-blue-200 shadow-md hover:border-blue-500 hover:shadow-xl hover:shadow-blue-200/40",
    },
    {
       icon: ShieldCheck,
       title: "On-Chain Escrow Frameworks",
       desc: "Minimize transaction risk with secure milestone-driven escrows. Payments are automatically held in immutable cryptographic contracts and released instantly upon proof of verification.",
       color: "text-emerald-600",
       bg: "bg-emerald-50 border-emerald-100",
       gradient: "bg-gradient-to-br from-emerald-100/50 via-white to-emerald-100/60 border border-emerald-200 shadow-md hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-200/40",
    },
  ];

  const categories = [
    {
      id: "ai-learning",
      title: "AI Development & RLHF",
      desc: "Expert fine-tuning, dynamic prompt engineering, and premium reinforcement learning with human feedback.",
      icon: BrainCircuit,
      tags: ["LLMs", "RAG Systems", "RLHF Fine-Tuning"],
      img: "/images/ai-dev.jpg"
    },
    {
      id: "annotation",
      title: "Data Annotation Pipelines",
      desc: "Designing secure high-velocity data labeling tasks with rigorous, multi-agent validation criteria.",
      icon: Square,
      tags: ["Dataset Quality", "Labeling Nodes", "Model Vetting"],
      img: "/images/data-pipeline.jpg"
    },
    {
      id: "decentralized",
      title: "Milestone Escrows & Web3",
      desc: "Engineering secure cryptographic escrows, multisig protection, and decentralized contractor rails.",
      icon: ShieldCheck,
      tags: ["Smart Contracts", "Cryptography", "Secure Payments"],
      img: "/images/web3-escrow.jpg"
    },
    {
      id: "consultancy",
      title: "Technical Advisory",
      desc: "Architecting cloud orchestration, SOC2 compliance systems, and high-fidelity product consulting.",
      icon: Cpu,
      tags: ["DevOps", "SOC2 Compliance", "Cloud Networks"],
      img: "/images/tech-advisory.jpg"
    }
  ];

  const benefits = [
    {
      title: "Verified Professional Profiles",
      desc: "Display authenticated portfolios, code contributions, and verified on-chain history to attract premium global clients."
    },
    {
      title: "Risk-Free Milestone Tracking",
      desc: "Every contract is backed by cryptographically bound escrows, guaranteeing automated, zero-risk payouts upon milestone completion."
    },
    {
      title: "Advanced AI Lab Access",
      desc: "Utilize built-in annotation environments, custom datasets, and generative assistant models directly inside your workspace."
    },
    {
      title: "Premium Global Gigs",
      desc: "Gain immediate access to verified high-paying contracts, technical advisory posts, and full-time engineering placements."
    },
    {
      title: "Collaborative Creator Hubs",
      desc: "Co-own datasets, review open-source repositories, and collaborate with other elite contractors in secure team pipelines."
    },
    {
      title: "Fast-Track 24h Vetting",
      desc: "Instantly unblock application permissions and bypass prolonged queues using the premium ESTARR Express vetting pass."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Verify Identity & Portfolio",
      desc: "Register a secure developer account and upload your technical credentials, GitHub profile, or proof of project experience."
    },
    {
      step: "02",
      title: "Bespoke Technical Vetting",
      desc: "Undergo standardized data annotation or code reviews, or bypass the queue instantly using our 24h fast-track pass."
    },
    {
      step: "03",
      title: "Lock Secure Escrow",
      desc: "Match with certified clients. All project funding is locked securely in a cryptographic milestone escrow prior to starting."
    },
    {
      step: "04",
      title: "Verify Output & Collect Payout",
      desc: "Deliver high-fidelity outputs. Our automated validation engine approves your work and triggers instant, guaranteed payout."
    }
  ];

  const mockTalent = [
    { name: "Elena Rostova", role: "AI & RLHF Specialist", location: "Munich, Germany", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" },
    { name: "Arjun Mehta", role: "Smart Contract Engineer", location: "Mumbai, India", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
    { name: "Sarah Jenkins", role: "Data Pipeline Architect", location: "London, UK", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" },
    { name: "Kofi Mensah", role: "Cloud Security Lead", location: "Accra, Ghana", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" }
  ];

  return (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-col font-sans relative">
      


      {/* Hero Section */}
      <section id="overview" className="relative w-full bg-slate-900 overflow-hidden text-white pt-16 pb-20 md:py-28 px-4 md:px-12 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.22),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370d_1px,transparent_1px),linear-gradient(to_bottom,#1f29370d_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-25" />
        
        {/* Background Video Loop with Tech Grid & Glow Fallbacks */}
        <video
          ref={heroVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onPause={(e) => {
            e.currentTarget.play().catch(() => {});
          }}
          onEnded={(e) => {
            e.currentTarget.play().catch(() => {});
          }}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-20 transition-opacity duration-1000"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-nodes-connecting-in-space-32599-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://vjs.zencdn.net/v/oceans.mp4"
            type="video/mp4"
          />
        </video>

        {/* Blur Blobs */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center gap-8">
          <div className="flex-1 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/40 border border-purple-800/60 rounded-full text-[10px] font-black tracking-wider uppercase text-white mb-6"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Cryptographically Secured Talent & AI Infrastructure</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] font-display uppercase"
            >
              The top 3% <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 font-extrabold">Engineering & RLHF Talent</span> <br />
              escrow protected.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl font-medium font-sans mx-auto"
            >
              Build your verified remote portfolio, scale precise dataset annotations, and consult on high-performance projects under fully auditable milestone contract protection.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto"
            >
              <button 
                onClick={onSignUp}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Join as Contractor <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={onSignUp}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Hire Elite Specialists
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-200 py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((s, idx) => (
            <div key={idx} className="flex flex-col border-l-4 border-purple-600 pl-4">
              <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">{s.value}</span>
              <span className="text-[11px] font-black uppercase text-purple-600 mt-2 tracking-wide font-mono">{s.label}</span>
              <span className="text-[11px] text-slate-400 mt-0.5 font-medium">{s.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Core DNA / About Section */}
      <section id="overview-details" className="py-16 md:py-24 px-4 bg-slate-50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[9px] font-black tracking-widest text-purple-600 uppercase font-mono block">Decentralized Remote Gigs</span>
            <h2 className="text-2xl md:text-3.5xl font-black tracking-tight text-slate-900 mt-2 font-display uppercase">
              The ESTARR Remote Work Network
            </h2>
            <p className="text-slate-500 mt-3 font-medium text-xs leading-relaxed">
              ESTARR is the leading professional platform engineered to unite vetted remote contractors and freelancers with high-caliber, high-paying machine learning, system advisory, and software development gigs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {corePillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className={`${p.gradient} p-6 rounded-2xl transition-all duration-300 flex flex-col`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-6 shadow-xs ${p.bg}`}>
                    <Icon className={`w-5 h-5 ${p.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-sm tracking-tight text-slate-900 mb-3">{p.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Section - Dynamic bento grid with real photos */}
      <section id="capabilities" className="py-16 md:py-24 px-4 bg-white border-t border-b border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[9px] font-black tracking-widest text-purple-600 uppercase font-mono block">Platform Capabilities</span>
            <h2 className="text-2xl md:text-3.5xl font-black tracking-tight text-slate-900 mt-2 font-display uppercase">
              What you can achieve on ESTARR
            </h2>
            <p className="text-slate-500 mt-3 font-medium text-xs leading-relaxed">
              Explore our core pipelines configured for top-tier freelancers, enterprise scale annotators, and smart milestone protection services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <div 
                  key={c.id}
                  className="bg-gradient-to-br from-purple-100/40 via-white to-indigo-100/40 border border-purple-200 rounded-3xl overflow-hidden hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-200/40 transition-all duration-300 group flex flex-col md:flex-row shadow-md cursor-pointer h-full items-stretch"
                  onClick={onSignUp}
                >
                  {/* Real Photo Section */}
                  <div className="md:w-1/2 h-48 md:h-full min-h-[200px] md:min-h-0 relative overflow-hidden shrink-0 self-stretch">
                    <img 
                      src={c.img} 
                      alt={c.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent md:hidden" />
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-1 self-stretch">
                    <div>
                      <div className="inline-flex p-2 rounded-lg bg-purple-50 border border-purple-100 text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <h3 className="font-display font-bold text-sm tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors leading-tight mb-2">
                        {c.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-sans mb-4">
                        {c.desc}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-4">
                      {c.tags.map((t, idx) => (
                        <span key={idx} className="bg-white text-slate-600 text-[8px] font-bold font-mono px-1.5 py-0.5 rounded-md uppercase tracking-wider border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section id="benefits" className="py-16 md:py-24 px-4 bg-slate-50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[9px] font-black tracking-widest text-purple-600 uppercase font-mono block">Ecosystem Value</span>
            <h2 className="text-2xl md:text-3.5xl font-black tracking-tight text-slate-900 mt-2 font-display uppercase">
              Exclusive Platform Benefits
            </h2>
            <p className="text-slate-500 mt-3 font-medium text-xs leading-relaxed">
              Join an elite professional infrastructure protected by verifiable milestone systems and powered by dynamic AI tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-gradient-to-br from-indigo-100/40 via-white to-purple-100/50 border border-purple-200/80 p-6 rounded-2xl shadow-md flex gap-4 items-start hover:shadow-xl hover:border-purple-500 hover:shadow-purple-200/40 transition-all duration-300">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center shrink-0 mt-0.5 border border-purple-200/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-display font-bold text-xs tracking-tight text-slate-900 mb-1.5 leading-snug">{b.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works / Escrow Pipeline */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 bg-white border-t border-b border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[9px] font-black tracking-widest text-purple-600 uppercase font-mono block">Secure Pipeline</span>
            <h2 className="text-2xl md:text-3.5xl font-black tracking-tight text-slate-900 mt-2 font-display uppercase">
              The Milestone & Escrow Pipeline
            </h2>
            <p className="text-slate-500 mt-3 font-medium text-xs leading-relaxed">
              We eliminate traditional remote payment risks. Learn how project work is activated, verified, and safely settled.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-[24px] left-[10%] right-[10%] h-0.5 bg-slate-200 z-0" />
            
            {steps.map((s, idx) => (
              <div key={idx} className="flex flex-col items-start relative z-10 bg-gradient-to-br from-white via-purple-50/35 to-indigo-100/45 border border-purple-200 p-6 rounded-2xl shadow-md hover:shadow-xl hover:border-purple-400 hover:shadow-purple-200/30 transition-all duration-300">
                <span className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-mono font-black text-sm rounded-xl flex items-center justify-center shadow-md shadow-purple-500/20 border border-purple-500">
                  {s.step}
                </span>
                <h3 className="font-display font-bold text-xs tracking-tight text-slate-900 mt-5 mb-2 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Universal Service Catalog */}
      <section id="directory" className="py-16 md:py-24 px-4 bg-[#FAF9F5] relative z-10 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="flex justify-center mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-full font-mono text-[9px] font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-indigo-500" /> Universal Service Catalog
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-display uppercase leading-tight">
              The Integrated Talent Ecosystem
            </h2>
            <p className="text-slate-500 mt-3 font-medium text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
              Direct access to Africa's top 3% of IT Pros and AI specialists. Leverage our <span className="font-bold text-slate-700">Standardized Golden Paths</span> to access elite talent in under 24 hours.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
            {ecosystemTabs.map((t) => {
              const IconComponent = t.icon;
              const isActive = activeEcosystemTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveEcosystemTab(t.id)}
                  className={`flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-[11px] font-extrabold tracking-wide transition-all duration-300 border cursor-pointer ${
                    isActive 
                      ? "bg-[#090E1A] border-[#090E1A] text-white shadow-xl shadow-slate-900/10 scale-105" 
                      : "bg-white border-slate-200/80 hover:border-indigo-300 hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? "text-purple-400" : "text-slate-400"}`} />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Double-Card Feature Layout */}
          {(() => {
            const currentTab = ecosystemData[activeEcosystemTab] || ecosystemData["it-tech"];
            const p = currentTab.profile;
            const TabIcon = currentTab.icon;

            const activeSkill = (selectedDemoSkill && currentTab.verticals.includes(selectedDemoSkill))
              ? selectedDemoSkill
              : currentTab.verticals[0];
            const competencyInfo = SKILL_COMPETENCIES[activeSkill];
            const metricsInfo = PROFILE_METRICS[activeEcosystemTab] || PROFILE_METRICS["it-tech"];

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
                
                {/* Left Card: Vertical & Scope Details (7 cols) */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs relative transition-all duration-300 hover:shadow-md">
                  <div>
                    {/* Header Row */}
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/15">
                        <TabIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[9px] font-black tracking-wider text-indigo-600 uppercase font-mono block mb-1">
                          {currentTab.tag}
                        </span>
                        <h3 className="text-lg md:text-xl font-extrabold tracking-tight text-slate-900 leading-snug font-display">
                          {currentTab.title}
                        </h3>
                      </div>
                    </div>

                    {/* Desc */}
                    <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed mt-5">
                      {currentTab.desc}
                    </p>

                    {/* Verticals */}
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase font-mono block">
                          Expertise Verticals & Technologies
                        </span>
                        <span className="text-[9px] font-mono font-bold text-indigo-500 hidden sm:inline-block">
                          ⚡ Click a skill to view official vetting criteria & competencies
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {currentTab.verticals.map((v, i) => {
                          const isSelected = activeSkill === v;
                          return (
                            <button
                              key={i}
                              onClick={() => handleSelectSkill(v)}
                              className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold flex items-center gap-1.5 shadow-2xs transition-all duration-200 cursor-pointer border ${
                                isSelected
                                  ? "bg-indigo-600 border-indigo-600 text-white scale-105"
                                  : "bg-slate-50 border-slate-200/60 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/40"
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white animate-ping" : "bg-indigo-500"}`} />
                              {v}
                            </button>
                          );
                        })}
                      </div>

                      {/* Vetted Core Competency & Assessment Metrics Dashboard */}
                      {competencyInfo && (
                        <div className="mt-5 p-5 bg-gradient-to-br from-slate-50/90 to-indigo-50/20 border border-slate-200/80 rounded-2xl shadow-xs font-sans animate-fade-in flex flex-col gap-4">
                          {/* Header section with clean certification label */}
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-md bg-indigo-100 flex items-center justify-center">
                                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                              </div>
                              <span className="text-xs font-extrabold text-slate-900 font-display uppercase tracking-wide">
                                {activeSkill} Vetting Profile
                              </span>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full font-mono text-[9px] font-black border border-emerald-200 uppercase tracking-wider">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Vetting Certified
                            </span>
                          </div>

                          {/* Benchmarks grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] leading-relaxed">
                            <div className="flex flex-col bg-white border border-slate-100 rounded-xl p-3 shadow-2xs">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Assessment Strategy</span>
                              <span className="font-bold text-slate-800 mt-1">{competencyInfo.method}</span>
                              <span className="text-slate-400 font-mono text-[9px] mt-0.5 text-indigo-600 font-semibold">{competencyInfo.duration}</span>
                            </div>
                            <div className="flex flex-col bg-white border border-slate-100 rounded-xl p-3 shadow-2xs">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Evaluation Standard</span>
                              <span className="font-bold text-slate-800 mt-1">{competencyInfo.benchmark}</span>
                              <span className="text-emerald-600 font-mono text-[9px] mt-0.5 font-bold">Vetting Score: {competencyInfo.score}</span>
                            </div>
                          </div>

                          {/* Tested Concept List */}
                          <div className="flex flex-col gap-2">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
                              Verified Core Competencies
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {competencyInfo.topics.map((topic, idx) => (
                                <div key={idx} className="flex gap-2.5 items-start">
                                  <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                                  </div>
                                  <span className="text-slate-600 text-[11px] font-medium leading-relaxed">
                                    {topic}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Scope Banner */}
                    <div className="mt-8 p-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                      </div>
                      <div>
                        <span className="text-[9px] font-black tracking-wider text-indigo-600 uppercase font-mono block mb-1">
                          Consultancy Scope
                        </span>
                        <p className="text-slate-700 font-bold text-xs leading-relaxed">
                          {currentTab.scope}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Stats & Button */}
                  <div>
                    <div className="h-px bg-slate-200/80 my-8" />
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex gap-6">
                        <div className="flex flex-col">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono">Matching Speed</span>
                          <span className="text-[11px] font-black text-slate-800 mt-1 flex items-center gap-1.5 leading-none">
                            <Clock className="w-3.5 h-3.5 text-emerald-600" /> {currentTab.speed}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono">Feedback Score</span>
                          <span className="text-[11px] font-black text-slate-800 mt-1 flex items-center gap-1.5 leading-none">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {currentTab.rating}
                          </span>
                        </div>
                      </div>

                      <button 
                        onClick={onSignUp}
                        className="px-4.5 py-3 bg-slate-950 hover:bg-indigo-600 text-white font-extrabold text-[10px] tracking-wide rounded-xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm shadow-slate-900/10 group uppercase"
                      >
                        {currentTab.buttonLabel}
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Card: Dark Blue Space / Pre-vetted Talent Profile (5 cols) */}
                <div className="lg:col-span-5 bg-[#090E1A] text-white border border-slate-800/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-slate-700/80">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div>
                    {/* Availability Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[9px] font-bold tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available Now
                      </div>
                      <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                        Pre-vetted ID #{p.id}
                      </span>
                    </div>

                    {/* Profile Information Row */}
                    <div className="flex gap-4 items-center">
                      <div className="relative shrink-0">
                        <img 
                          src={p.avatar} 
                          alt={p.name} 
                          className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500/30 ring-4 ring-indigo-500/10"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#090e1a] shadow-md">
                          <Shield className="w-2.5 h-2.5 text-white fill-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-sm text-white flex items-center gap-1">
                          {p.name}
                          <span className="text-indigo-400 text-xs">✓</span>
                        </h4>
                        <span className="text-[11px] font-bold text-indigo-300 tracking-tight block mt-0.5">{p.role}</span>
                        <span className="text-[9px] text-slate-400 mt-1 block font-medium">{p.meta}</span>
                      </div>
                    </div>

                    {/* Quote Section */}
                    <div className="mt-6 pl-4 border-l-2 border-indigo-500/50">
                      <p className="text-slate-300 italic text-[11px] md:text-xs leading-relaxed font-serif">
                        "{p.quote}"
                      </p>
                    </div>

                    {/* Dynamic Skill Metrics Widget to fill empty space */}
                    {metricsInfo && (
                      <div className="mt-8 pt-6 border-t border-slate-800/80 animate-fade-in flex flex-col gap-4">
                        <div>
                          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-3">
                            🛡️ {p.name}'s Verified Competency Ratings ({activeSkill})
                          </span>
                          <div className="flex flex-col gap-3.5">
                            {/* Metric 1 */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-bold">
                                <span className="text-slate-300">{metricsInfo.label1}</span>
                                <span className="text-indigo-400 font-mono">{metricsInfo.value1}</span>
                              </div>
                              <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
                                <div 
                                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700" 
                                  style={{ width: metricsInfo.pct1 }} 
                                />
                              </div>
                            </div>

                            {/* Metric 2 */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-bold">
                                <span className="text-slate-300">{metricsInfo.label2}</span>
                                <span className="text-indigo-400 font-mono">{metricsInfo.value2}</span>
                              </div>
                              <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
                                <div 
                                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700" 
                                  style={{ width: metricsInfo.pct2 }} 
                                />
                              </div>
                            </div>

                            {/* Metric 3 */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-bold">
                                <span className="text-slate-300">{metricsInfo.label3}</span>
                                <span className="text-indigo-400 font-mono">{metricsInfo.value3}</span>
                              </div>
                              <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
                                <div 
                                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700" 
                                  style={{ width: metricsInfo.pct3 }} 
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {metricsInfo.badges.map((badge, idx) => (
                            <span 
                              key={idx} 
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-900 border border-slate-800/60 rounded-lg text-[9px] font-mono text-slate-300 hover:text-white transition-colors"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Profile Vetting Score & Call To Action Row */}
                  <div className="mt-8">
                    <div className="pt-6 border-t border-slate-800/80 mb-5">
                      <button
                        onClick={() => setShowVettingDetail(!showVettingDetail)}
                        className="w-full flex items-center justify-between text-[11px] text-slate-400 font-bold hover:text-white transition-colors cursor-pointer group"
                      >
                        <span className="flex items-center gap-1.5">
                          🛡️ Vetting Status: <span className="text-fuchsia-400 font-extrabold">{p.vetting}</span>
                        </span>
                        <span className="text-indigo-400 font-mono text-[10px] bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-all">
                          {showVettingDetail ? "Hide Audit Scores ▲" : "Verify Audit Scores ▼"}
                        </span>
                      </button>

                      {showVettingDetail && (
                        <div className="mt-3 p-3 bg-slate-950/90 border border-slate-800 rounded-xl flex flex-col gap-2.5 animate-fade-in text-[10px]">
                          <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                            <span className="text-[9px] font-mono text-slate-500 uppercase font-black">Audit Category</span>
                            <span className="text-[9px] font-mono text-slate-500 uppercase font-black">Score verified</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300">Algorithmic Audits</span>
                            <span className="font-mono font-bold text-emerald-400">98% (Passed)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300">System Architecture Panel</span>
                            <span className="font-mono font-bold text-emerald-400">96% (Passed)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300">Milestone Reliability</span>
                            <span className="font-mono font-bold text-emerald-400">100% (Zero-Fault)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300">English Fluency & Communication</span>
                            <span className="font-mono font-bold text-indigo-400">C2 Elite</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setShowHireModal(true)}
                        className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] rounded-xl transition-all flex items-center justify-center gap-1.5 border border-[#1e293b] cursor-pointer uppercase tracking-wider"
                      >
                        <Globe className="w-3.5 h-3.5 text-slate-400" /> Interview
                      </button>
                      <button 
                        onClick={() => setShowHireModal(true)}
                        className="px-4 py-3 bg-indigo-600 hover:bg-[#7e22ce] text-white font-bold text-[10px] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-md shadow-indigo-600/20 border border-transparent"
                      >
                        <FileText className="w-3.5 h-3.5" /> Request Quote
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })()}
        </div>
      </section>

      {/* Final Call To Action Card */}
      <section className="py-12 md:py-16 px-4 bg-white relative z-10 border-t border-slate-200">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#060913] to-[#0d1527] text-white rounded-2xl py-6 px-6 md:py-6 md:px-10 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-6 justify-between">
          <div className="absolute top-0 right-0 text-indigo-500/5 pointer-events-none rotate-45">
            <svg width="240" height="240" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="20" y="20" width="60" height="60" rx="10" />
            </svg>
          </div>
          
          <div className="flex-1 text-left">
            <span className="text-[9px] font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" /> APPLICATIONS NOW OPEN
            </span>
            <h3 className="text-lg md:text-xl lg:text-2xl font-black tracking-tight leading-tight uppercase font-display mt-2 mb-2 lg:whitespace-nowrap">
              Access the Next Tier of Global Talent
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-2xl">
              Whether you are an elite individual builder looking for risk-free milestone work, or an enterprise scaling deep AI workflows, ESTARR provides the secure ecosystem you need.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <button 
              onClick={onSignUp}
              className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-950 font-extrabold text-[11px] tracking-wide rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer uppercase"
            >
              Sign Up as Contractor <ChevronRight className="w-3.5 h-3.5 text-purple-600" />
            </button>
            <button 
              onClick={onSignUp}
              className="w-full sm:w-auto px-5 py-3.5 bg-indigo-600 hover:bg-[#7e22ce] text-white border border-indigo-500/20 font-extrabold text-[11px] tracking-wide rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase shadow-lg shadow-indigo-600/15"
            >
              Hire Specialists <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <span className="text-white font-bold tracking-tight text-xs block mb-4 uppercase">Ecosystem Tracks</span>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => onNavigateToTab?.("ai-lab")} className="hover:text-white transition-colors cursor-pointer text-left">AI Labs & Fine-Tuning</button></li>
              <li><button onClick={() => onNavigateToTab?.("annotation-workspace")} className="hover:text-white transition-colors cursor-pointer text-left">Human RLHF Annotation</button></li>
              <li><button onClick={() => onNavigateToTab?.("decentralized-escrows")} className="hover:text-white transition-colors cursor-pointer text-left">Decentralized Escrows</button></li>
              <li><button onClick={() => onNavigateToTab?.("consultancy")} className="hover:text-white transition-colors cursor-pointer text-left">Expert Consultancies</button></li>
            </ul>
          </div>
          <div>
            <span className="text-white font-bold tracking-tight text-xs block mb-4 uppercase">Resources</span>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => onNavigateToTab?.("program-guidelines")} className="hover:text-white text-left transition-colors cursor-pointer">Program Guidelines</button></li>
              <li><button onClick={() => onNavigateToTab?.("escrow-faqs")} className="hover:text-white text-left transition-colors cursor-pointer">Escrow pipeline FAQs</button></li>
              <li><button onClick={() => onNavigateToTab?.("contractor-directory")} className="hover:text-white transition-colors cursor-pointer text-left">Contractor Directory</button></li>
              <li><button onClick={() => onNavigateToTab?.("platform-status")} className="hover:text-white text-left transition-colors cursor-pointer">Platform Status</button></li>
            </ul>
          </div>
          <div>
            <span className="text-white font-bold tracking-tight text-xs block mb-4 uppercase">Legal</span>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => onNavigateToTab?.("terms-conditions")} className="hover:text-white text-left transition-colors cursor-pointer">Terms & Conditions</button></li>
              <li><button onClick={() => onNavigateToTab?.("privacy-cookies")} className="hover:text-white text-left transition-colors cursor-pointer">Privacy & Cookies</button></li>
              <li><button onClick={() => onNavigateToTab?.("data-collection")} className="hover:text-white text-left transition-colors cursor-pointer">Data Collection Policy</button></li>
              <li><button onClick={() => onNavigateToTab?.("compliance-audits")} className="hover:text-white text-left transition-colors cursor-pointer">Compliance Audits</button></li>
            </ul>
          </div>
          <div>
            <span className="text-white font-bold tracking-tight text-xs block mb-4 uppercase">About ESTARR</span>
            <p className="text-[10px] text-slate-500 leading-relaxed mb-3">
              ESTARR is the leading decentralized technical validation, annotation, and professional ecosystem protecting global contractors with cryptographically secured milestone escrows.
            </p>
            <div className="flex gap-2">
              <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white">ES</span>
              <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-[9px] font-bold text-purple-400">PRO</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px]">
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-60">
              <defs>
                <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
              <rect x="20" y="20" width="160" height="160" rx="40" fill="url(#brand-grad)" />
              <path d="M100 45L112.5 83.5H153L120.25 107.5L132.75 146L100 122L67.25 146L79.75 107.5L47 83.5H87.5L100 45Z" fill="white" />
            </svg>
            © {new Date().getFullYear()} ESTARR Platform Inc. All rights reserved.
          </span>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Contact Support</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy & Cookies</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Trademarks</span>
          </div>
        </div>
      </footer>

      {/* High-Fidelity Interactive Direct-Hire & Quote Scheduler Modal */}
      {showHireModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col relative animate-scale-up">
            {/* Modal Header */}
            <div className="bg-[#090E1A] text-white p-6 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
              <button 
                onClick={() => {
                  setShowHireModal(false);
                  setHireSubmitted(false);
                  setHireMessage("");
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer text-lg font-bold w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center"
              >
                ✕
              </button>
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Secure Direct Match Portal
              </span>
              <h3 className="font-display font-black text-xl text-white tracking-tight mt-1.5 uppercase">
                Connect with Africa's Elite
              </h3>
              <p className="text-slate-400 text-xs mt-1.5">
                Draft a secure escrow-backed request in under 60 seconds.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {hireSubmitted ? (
                <div className="text-center py-8 px-4 flex flex-col items-center gap-4 animate-scale-up">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm animate-pulse">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-base">
                      Secure Match Request Drafted!
                    </h4>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                      Your premium project scope has been compiled with a pre-set escrow allocation of <span className="font-bold text-slate-800">${hireBudgetValue.toLocaleString()}</span>. An ESTARR technical matching director will contact you via email shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowHireModal(false);
                      setHireSubmitted(false);
                      setHireMessage("");
                    }}
                    className="mt-2 w-full py-3 bg-slate-950 hover:bg-indigo-600 text-white text-[11px] font-extrabold rounded-xl transition-all uppercase cursor-pointer tracking-wider"
                  >
                    Return to Ecosystem Catalog
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 font-mono">
                      Selected Service Category
                    </label>
                    <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                      <option value="it-tech">Full-Stack Cloud Engineers & Architects</option>
                      <option value="train-ai">Supervised Fine-Tuning & RLHF Specialists</option>
                      <option value="build-ai">Custom Agents & Semantic Search Builders</option>
                      <option value="consultancy">Fractional CTOs & Technical Directors</option>
                      <option value="talent-systems">Linguistic Screeners & Technical Evaluators</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                        Cryptographic Escrow Allocation
                      </label>
                      <span className="text-xs font-mono font-extrabold text-indigo-600">
                        ${hireBudgetValue.toLocaleString()} USD
                      </span>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col gap-3">
                      <input 
                        type="range" 
                        min="2500" 
                        max="80000" 
                        step="2500"
                        value={hireBudgetValue}
                        onChange={(e) => setHireBudgetValue(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <span>Min: $2.5K</span>
                        <span>Estimated Escrow Security Fee: ${(hireBudgetValue * 0.005).toFixed(0)} USD (0.5%)</span>
                        <span>Max: $80K</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 font-mono">
                      Brief Project Objectives & Requirements
                    </label>
                    <textarea 
                      placeholder="E.g., We need to integrate a custom Gemini 2.5 Flash pipeline with our WhatsApp eCommerce portal, backed by automated milestone verification."
                      rows={3}
                      value={hireMessage}
                      onChange={(e) => setHireMessage(e.target.value)}
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div className="p-3 bg-indigo-50 border border-indigo-100/50 rounded-xl flex gap-2.5 items-start">
                    <Shield className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-indigo-800 leading-relaxed">
                      <span className="font-bold">ESTARR Guarantee:</span> All contract deliverables are locked in secure milestones. Contractors are only compensated after manual or automated proof-of-work validation.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setHireSubmitted(true);
                    }}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-[#7e22ce] text-white text-[11px] font-extrabold rounded-xl transition-all uppercase cursor-pointer tracking-wider shadow-lg shadow-indigo-600/15"
                  >
                    Submit Match Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
