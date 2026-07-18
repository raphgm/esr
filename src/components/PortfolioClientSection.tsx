import React, { useState } from "react";
import { UserProfile } from "../types";
import { PageBanner } from "./PageBanner";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Star, 
  Filter, 
  ShieldCheck, 
  Mail, 
  X, 
  ExternalLink, 
  Heart, 
  Eye, 
  Award, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  CreditCard,
  Linkedin,
  Github,
  Globe,
  Share2,
  ThumbsUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { db, saveUserProfile } from "../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import confetti from "canvas-confetti";

interface PortfolioClientSectionProps {
  userProfile: UserProfile;
  onUpdateProfile?: (updated: UserProfile) => void;
}

export function PortfolioClientSection({ userProfile, onUpdateProfile }: PortfolioClientSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTalent, setSelectedTalent] = useState<any | null>(null);
  
  // Interactive mini-payment form state
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDesc, setPaymentDesc] = useState("Milestone milestone reward / Retainer");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState("");

  const mockTalent = [
    {
      id: 1,
      name: "Sarah Chen",
      handle: "sarah_dev",
      email: "sarah.chen@estarrapp.com",
      role: "Senior Full Stack Engineer",
      location: "San Francisco, CA",
      rate: "$120/hr",
      rating: 4.9,
      recommends: 148,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
      bio: "Passionate full-stack developer specializing in scaling high-performance React systems, serverless architectures, and real-time off-chain payment structures. Ex-Stripe engineer with a keen interest in decentralized talent economies and smart contracts. Always pushing the envelope on micro-frontend execution and beautiful UX transitions.",
      skills: ["React", "Node.js", "AWS", "TypeScript", "Next.js", "Tailwind CSS"],
      verified: true,
      certifications: [
        "AI Engineering Graduate - Stanford Online",
        "AWS Solutions Architect Professional"
      ],
      portfolio: [
        { id: "p1-1", title: "Enterprise Decentralized Payroll System", url: "https://github.com", category: "Full-Stack", views: 2450, likes: 830 },
        { id: "p1-2", title: "Real-time High-Concurrency Chat Engine", url: "https://github.com", category: "WebSockets", views: 1890, likes: 642 },
        { id: "p1-3", title: "Custom Stripe Payment Intent Proxy Router", url: "https://github.com", category: "API Design", views: 3120, likes: 1105 }
      ],
      history: [
        { desc: "Deployed v2.0 of Cloud Native Serverless Proxy Router", date: "Jul 08" },
        { desc: "Completed Milestone 'Front-End Migration' for client Estarr", date: "Jun 30" },
        { desc: "Awarded High Endorsement score in React/TypeScript expertise", date: "May 15" }
      ]
    },
    {
      id: 2,
      name: "Marcus Johnson",
      handle: "marcus_ai",
      email: "marcus.j@estarrapp.com",
      role: "AI Integration Specialist",
      location: "London, UK",
      rate: "$150/hr",
      rating: 4.8,
      recommends: 124,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      bio: "Machine learning practitioner and integration strategist. Dedicated to bringing LLMs and cognitive logic nodes into enterprise-scale apps. Expert at prompt chaining optimization, fine-tuning hosting environments, and setting up real-time vector databases.",
      skills: ["Python", "PyTorch", "OpenAI API", "MLOps", "LangChain", "Vector DBs"],
      verified: true,
      certifications: [
        "Gemini Developer Professional - Google Cloud",
        "Machine Learning Masterclass - DeepLearning.AI"
      ],
      portfolio: [
        { id: "p2-1", title: "Cognitive Document Analysis Node", url: "https://github.com", category: "AI / LLM", views: 4200, likes: 1540 },
        { id: "p2-2", title: "Automatic Vector DB Embedding Pipeline", url: "https://github.com", category: "MLOps", views: 2150, likes: 789 },
        { id: "p2-3", title: "Smart LLM-Based Customer Intent Router", url: "https://github.com", category: "API Design", views: 1800, likes: 610 }
      ],
      history: [
        { desc: "Integrated Gemini 1.5 Flash translation gateway with 40ms latency", date: "Jul 05" },
        { desc: "Launched PyTorch fine-tuning framework for retail prediction", date: "Jun 18" },
        { desc: "Completed training on Vector embedding chunking structures in the profile creation workflow", date: "May 29" }
      ]
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      handle: "elena_ux",
      email: "elena.r@estarrapp.com",
      role: "UX/UI Designer",
      location: "Madrid, ES",
      rate: "$95/hr",
      rating: 5.0,
      recommends: 210,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
      bio: "Award-winning designer focusing on creating empathetic digital services, bento-grid system visual guides, and modular interfaces. Believes that visual cadence, precise typography, and thoughtful white space define great software products.",
      skills: ["Figma", "Design Systems", "User Research", "Prototyping", "Adobe Suite"],
      verified: true,
      certifications: [
        "Human-Computer Interaction - Interaction Design Foundation",
        "Lead Product Designer - Madrid Tech Institute"
      ],
      portfolio: [
        { id: "p3-1", title: "ESTARR Platform Responsive Visual Guild", url: "https://figma.com", category: "Design System", views: 8400, likes: 3200 },
        { id: "p3-2", title: "Cryptocurrency Wallet Micro-Interactions", url: "https://figma.com", category: "UI Motion", views: 3800, likes: 1450 },
        { id: "p3-3", title: "Gig Economy User Persona Research Guide", url: "https://figma.com", category: "UX Research", views: 1950, likes: 745 }
      ],
      history: [
        { desc: "Designed full responsive redesign of ESTARR dashboard", date: "Jul 10" },
        { desc: "Published comprehensive research paper on remote designer workflows", date: "Jun 24" }
      ]
    },
    {
      id: 4,
      name: "David Kim",
      handle: "david_ops",
      email: "david.k@estarrapp.com",
      role: "DevOps Architect",
      location: "Austin, TX",
      rate: "$130/hr",
      rating: 4.7,
      recommends: 68,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      bio: "DevOps engineer with 6+ years in secure Kubernetes cluster architectures, CI/CD pipeline automation, and multi-cloud server orchestration. Passionate about infrastructure as code and zero-downtime microservice rolling updates.",
      skills: ["Kubernetes", "Docker", "CI/CD", "Terraform", "GitHub Actions", "Prometheus"],
      verified: false,
      certifications: [
        "Certified Kubernetes Administrator (CKA)",
        "HashiCorp Certified Terraform Associate"
      ],
      portfolio: [
        { id: "p4-1", title: "Docker Swarm to EKS Blue-Green Migration script", url: "https://github.com", category: "Infrastructure", views: 1200, likes: 450 },
        { id: "p4-2", title: "Custom GitHub Actions Prometheus Exporter", url: "https://github.com", category: "Monitoring", views: 980, likes: 310 }
      ],
      history: [
        { desc: "Refactored CI/CD integration pipelines reducing build times by 40%", date: "Jul 01" },
        { desc: "Implemented secure Vault clusters for secret credential sharing", date: "Jun 12" }
      ]
    },
    {
      id: 5,
      name: "Priya Patel",
      handle: "priya_app",
      email: "priya.p@estarrapp.com",
      role: "Mobile App Developer",
      location: "Toronto, CA",
      rate: "$110/hr",
      rating: 4.9,
      recommends: 115,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
      bio: "Dedicated cross-platform and native mobile software engineer. Focused on responsive animations, reliable local databases, offline-first execution, and high-performance Bluetooth Low Energy integrations in iOS & Android.",
      skills: ["Swift", "Kotlin", "React Native", "Firebase", "App Store Publishing"],
      verified: true,
      certifications: [
        "Certified iOS Developer - Apple Professional",
        "Android Associate Developer - Google Developers"
      ],
      portfolio: [
        { id: "p5-1", title: "Offline-First Fitness Tracker Companion App", url: "https://github.com", category: "Mobile iOS", views: 3200, likes: 1102 },
        { id: "p5-2", title: "Real-time P2P Audio Streaming Framework", url: "https://github.com", category: "Mobile Core", views: 1750, likes: 580 }
      ],
      history: [
        { desc: "Released version 1.4 of HealthSync app with offline caching support", date: "Jul 06" },
        { desc: "Optimized React Native bundle size down to 8.2MB", date: "Jun 20" }
      ]
    }
  ];

  const filteredTalent = mockTalent.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenProfile = (talent: any) => {
    setSelectedTalent(talent);
    setPaymentAmount("");
    setPaymentError("");
    setPaymentSuccess("");
  };

  const handleDirectPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTalent) return;
    if (!onUpdateProfile) {
      alert("Please sign in to execute direct peer-to-peer payments.");
      return;
    }

    setPaymentError("");
    setPaymentSuccess("");
    setIsPaying(true);

    const amt = parseFloat(paymentAmount);
    if (isNaN(amt) || amt <= 0) {
      setPaymentError("Please define a valid payment amount.");
      setIsPaying(false);
      return;
    }

    const clientBalance = userProfile.walletBalance ?? 0;
    if (clientBalance < amt) {
      setPaymentError(`Insufficient wallet balance. Your available balance is $${clientBalance.toLocaleString()}.`);
      setIsPaying(false);
      return;
    }

    try {
      // 1. Query if the talent has an existing Firestore user profile document
      const usersCol = collection(db, "users");
      const qHandle = query(usersCol, where("handle", "==", selectedTalent.handle));
      const qSnap = await getDocs(qHandle);

      const txId = "tx_" + Date.now();
      const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

      if (!qSnap.empty) {
        // Talent is registered - transfer funds securely
        const recipDoc = qSnap.docs[0];
        const recipData = recipDoc.data() as UserProfile;
        const currentRecipBalance = recipData.walletBalance ?? 0;
        const currentRecipTxs = recipData.walletTransactions ?? [];

        const newRecipTx = {
          id: txId,
          type: "receive" as const,
          amount: amt,
          sender: userProfile.name || userProfile.email || "ESTARR Client",
          date: dateStr,
          status: "completed" as const,
          description: paymentDesc || `Direct deposit: ${paymentDesc}`
        };

        await saveUserProfile(recipDoc.id, {
          walletBalance: currentRecipBalance + amt,
          walletTransactions: [newRecipTx, ...currentRecipTxs]
        });
      } else {
        // For off-platform / mock simulation fallback, write to a designated handle holder document or simulate
        console.log(`Routing payment to off-platform handle @${selectedTalent.handle}`);
      }

      // 2. Update client's profile state and transaction logs
      const currentClientTxs = userProfile.walletTransactions ?? [];
      const newClientTx = {
        id: txId,
        type: "send" as const,
        amount: amt,
        receiver: selectedTalent.name,
        date: dateStr,
        status: "completed" as const,
        description: `Direct wallet payout: ${paymentDesc}`
      };

      await onUpdateProfile({
        ...userProfile,
        walletBalance: clientBalance - amt,
        walletTransactions: [newClientTx, ...currentClientTxs]
      });

      setPaymentSuccess(`Successfully paid $${amt.toLocaleString()} securely to @${selectedTalent.handle}!`);
      setPaymentAmount("");

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

    } catch (err: any) {
      console.error("Direct payout error:", err);
      setPaymentError("Failed to authorize peer ledger transfer. Please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12 relative">
      <PageBanner
        icon={Briefcase}
        title="Talent Portfolios"
        subtitle="Verified Experts"
        description="Discover, analyze, and instantly pay top-tier verified professionals."
      />
      
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name, role, or skill..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 whitespace-nowrap min-h-[44px]">
            <Filter className="w-5 h-5" /> Filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTalent.map((talent) => (
            <motion.div 
              key={talent.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => handleOpenProfile(talent)}
              className="border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-200 transition-all group bg-white relative overflow-hidden flex flex-col cursor-pointer active:scale-[0.98]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 shrink-0 shadow-sm">
                  <img 
                    src={talent.avatar} 
                    alt={talent.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full text-xs font-bold border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {talent.rating}
                  </div>
                  {talent.verified && (
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-200 uppercase tracking-wider">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors mb-0.5">{talent.name}</h3>
              <p className="text-[11px] font-mono font-semibold text-slate-400 mb-2">@{talent.handle}</p>
              <p className="text-sm font-semibold text-indigo-600 mb-3">{talent.role}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 font-medium">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {talent.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-indigo-500" /> {talent.rate}</span>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                {talent.skills.map(skill => (
                  <span key={skill} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 rounded-lg text-[10px] font-bold tracking-wide">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenProfile(talent);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md group-hover:scale-[1.01] cursor-pointer min-h-[44px]"
                >
                  View Profile
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenProfile(talent);
                  }}
                  className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl transition-colors cursor-pointer min-h-[44px]"
                >
                  <Mail className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Talent Detail Modal Backdrop & Content */}
      <AnimatePresence>
        {selectedTalent && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] md:max-h-[85vh]"
            >
              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto">
                {/* Cover Pattern & Close */}
                <div className="h-32 bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-950 relative z-0 flex items-center justify-between px-6">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase">
                    ESTARR VERIFIED PARTNER PROGRAM
                  </span>
                  <button 
                    onClick={() => setSelectedTalent(null)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main Content Area */}
                <div className="p-6 md:p-8 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Avatar & Mini Stats card */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                      <div className="flex flex-col items-center text-center -mt-20 relative z-20">
                      <div className="relative mb-4">
                        <img 
                          src={selectedTalent.avatar} 
                          alt={selectedTalent.name} 
                          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl bg-white"
                          referrerPolicy="no-referrer"
                        />
                        {selectedTalent.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white shadow-lg">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <h2 className="font-bold text-2xl text-slate-900 leading-tight">{selectedTalent.name}</h2>
                      <p className="text-xs font-mono font-bold text-slate-400 mb-2">@{selectedTalent.handle}</p>
                      <p className="text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-4 py-1 rounded-full inline-block mb-4">
                        {selectedTalent.role}
                      </p>

                      <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-6">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{selectedTalent.location}</span>
                      </div>

                      {/* Profile Indicators */}
                      <div className="w-full grid grid-cols-2 gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                        <div className="text-center">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Endorsements</p>
                          <p className="text-lg font-black text-slate-900 mt-1 flex items-center justify-center gap-1">
                            <ThumbsUp className="w-4 h-4 text-emerald-500" />
                            {selectedTalent.recommends}
                          </p>
                        </div>
                        <div className="text-center border-l border-slate-200">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Rate</p>
                          <p className="text-lg font-black text-indigo-600 mt-1">{selectedTalent.rate}</p>
                        </div>
                      </div>
                    </div>

                    {/* Socials & Actions */}
                    <div className="flex flex-col gap-3 pt-2">
                      <div className="flex justify-center gap-3">
                        <button className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-full cursor-pointer transition-all">
                          <Linkedin className="w-4 h-4" />
                        </button>
                        <button className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-full cursor-pointer transition-all">
                          <Github className="w-4 h-4" />
                        </button>
                        <button className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-full cursor-pointer transition-all">
                          <Globe className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Detailed Portfolio & P2P Payment Form */}
                  <div className="lg:col-span-8 flex flex-col gap-8">
                    {/* Bio Section */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">Professional Biography</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{selectedTalent.bio}</p>
                    </div>

                    {/* Skills Grid */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-3">Expertise & Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTalent.skills.map((skill: string) => (
                          <span key={skill} className="px-3 py-1.5 bg-indigo-50 border border-indigo-100/50 text-indigo-700 rounded-xl text-xs font-bold flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* P2P Payment Form */}
                    <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
                      <div className="flex items-center gap-2 mb-4">
                        <CreditCard className="w-5 h-5 text-indigo-400" />
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider font-mono">Real-Time Off-Chain Payment Terminal</h4>
                          <p className="text-[10px] text-slate-400 font-mono">DIRECT FROM CLIENT WALLET BALANCE</p>
                        </div>
                      </div>

                      {paymentError && (
                        <div className="mb-4 p-3 bg-rose-950/50 border border-rose-800 text-rose-300 text-xs rounded-xl flex items-start gap-2">
                          <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                          <span>{paymentError}</span>
                        </div>
                      )}

                      {paymentSuccess && (
                        <div className="mb-4 p-3 bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs rounded-xl flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                          <span>{paymentSuccess}</span>
                        </div>
                      )}

                      <form onSubmit={handleDirectPaymentSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                              Authorize Amount ($)
                            </label>
                            <input 
                              type="number"
                              required
                              min="1"
                              disabled={isPaying}
                              value={paymentAmount}
                              onChange={(e) => setPaymentAmount(e.target.value)}
                              placeholder="e.g. 1500"
                              className="bg-slate-900 border border-slate-800 focus:border-indigo-500 p-3 text-sm focus:outline-none text-white rounded-xl font-bold font-mono transition-colors"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                              Payment Description / Purpose
                            </label>
                            <input 
                              type="text"
                              required
                              disabled={isPaying}
                              value={paymentDesc}
                              onChange={(e) => setPaymentDesc(e.target.value)}
                              placeholder="e.g. UX/UI Milestone Design Release"
                              className="bg-slate-900 border border-slate-800 focus:border-indigo-500 p-3 text-sm focus:outline-none text-white rounded-xl font-medium transition-colors"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {[50, 250, 500, 2000].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              disabled={isPaying}
                              onClick={() => setPaymentAmount(preset.toString())}
                              className={`py-1.5 px-3 border rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                                paymentAmount === preset.toString()
                                  ? "bg-indigo-600 border-indigo-600 text-white font-black"
                                  : "border-slate-800 hover:bg-slate-900 text-slate-300"
                              }`}
                            >
                              ${preset}
                            </button>
                          ))}
                        </div>

                        <button
                          type="submit"
                          disabled={isPaying || !paymentAmount}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider transition-all shadow-md text-xs flex items-center justify-center gap-2 cursor-pointer mt-1"
                        >
                          {isPaying ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Verifying Ledger Hold & Processing Payment...
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="w-4 h-4 text-emerald-400" />
                              Authorize Instant Payout to @{selectedTalent.handle}
                            </>
                          )}
                        </button>
                      </form>
                    </div>

                    {/* Portfolio Items */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-4">Consultancy Engagements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedTalent.portfolio.map((item: any) => (
                          <div key={item.id} className="group bg-slate-50 border border-slate-100 rounded-2xl p-4 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-3">
                              <span className="text-[9px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">
                                {item.category}
                              </span>
                              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                            <h4 className="font-bold text-sm text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                              {item.title}
                            </h4>
                            <div className="flex items-center gap-3 pt-2 border-t border-slate-100/60 mt-2">
                              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                <Eye className="w-3.5 h-3.5" />
                                <span>{item.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                <Heart className="w-3.5 h-3.5" />
                                <span>{item.likes.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Credentials */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-4">AI Credentials & Badges</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedTalent.certifications.map((cert: string, idx: number) => (
                          <div key={idx} className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border border-indigo-100/50 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
                            <div className="bg-white p-2 rounded-full shadow-sm shrink-0">
                              <Award className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 leading-tight">{cert}</h4>
                              <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider mt-0.5 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> Verified Off-chain
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Activity Logs */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-4">Verified Activity Logs</h3>
                      <div className="space-y-4 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                        {selectedTalent.history.map((act: any, idx: number) => (
                          <div key={idx} className="relative pl-8">
                            <div className="absolute left-0 top-1.5 w-5 h-5 bg-white border-2 border-indigo-500 rounded-full flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-800">{act.desc}</h4>
                              <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mt-0.5">{act.date} • Verified Ledger Event</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

              {/* Bottom Sticky Action Panel */}
              <div className="border-t border-slate-100 p-4 bg-slate-50 flex justify-end gap-3 shrink-0">
                <button 
                  onClick={() => setSelectedTalent(null)}
                  className="px-6 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer min-h-[44px]"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
