import React, { useRef, useEffect, useState } from "react";
import {
  Users,
  Award,
  ShoppingCart,
  CheckSquare,
  CreditCard,
  Calendar,
  LineChart,
  Heart,
  Smartphone,
  Sparkles,
  X,
  Gift,
  Laptop,
  Compass,
  Briefcase,
  Cpu,
  Building2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Check,
  Zap,
  ChevronRight,
  Globe,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServicesCarouselProps {
  onSelect: (tab: any) => void;
}

export function ServicesCarousel({ onSelect }: ServicesCarouselProps) {
  const [activeTab, setActiveTab] = useState<"modules" | "brands">("modules");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  
  // Custom interactive demo states for partner pitches
  const [pitchSent, setPitchSent] = useState(false);
  const [pitchText, setPitchText] = useState("");

  const services = [
    {
      id: "consultancy",
      label: "Escrow Hub",
      desc: "Every job created is linked to an independent escrow contract. Funds are held securely until validation.",
      icon: CheckSquare,
      badge: "SECURE ESCROW PIPELINE",
      color: "bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-600 group-hover:text-white",
      stats: "148 Active Contracts",
      accent: "#8B5CF6"
    },
    {
      id: "gigs",
      label: "AI Gig Builder",
      desc: "Draft your gig instantly. Type your core skill and let the AI draft your listing structure and description.",
      icon: Sparkles,
      badge: "DRAFT GIG INSTANTLY",
      color: "bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white",
      stats: "AI-Powered Drafting",
      accent: "#6366F1"
    },
    {
      id: "gigs",
      label: "Train AI",
      desc: "Source elite experts for RLHF, high-precision data labeling, and model fine-tuning across 100+ dialects.",
      icon: Cpu,
      badge: "ELITE AI TRAINING",
      color: "bg-teal-50 text-teal-600 border-teal-100 group-hover:bg-teal-600 group-hover:text-white",
      stats: "40k+ Data Experts",
      accent: "#14B8A6"
    },
    {
      id: "gigs",
      label: "Build AI",
      desc: "Hire specialized engineers to build custom LLM applications, RAG pipelines, and autonomous AI agents for your enterprise.",
      icon: Sparkles,
      badge: "CUSTOM AI SOLUTIONS",
      color: "bg-violet-50 text-violet-600 border-violet-100 group-hover:bg-violet-600 group-hover:text-white",
      stats: "Verified AI Architects",
      accent: "#8B5CF6"
    },
    {
      id: "gigs",
      label: "Creative Operations",
      desc: "Connect with elite enterprise creative squads for high-retention cinematic assets, brand narratives, and viral production pipelines.",
      icon: Laptop,
      badge: "ENTERPRISE NODES",
      color: "bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white",
      stats: "Global Deployment Network",
      accent: "#F43F5E"
    },
    {
      id: "gigs",
      label: "Infrastructure & DevOps",
      desc: "Deploy certified IT pros for high-throughput WhatsApp commerce, cloud architecture, and automated talent infrastructure.",
      icon: Cpu,
      badge: "CLOUD ARCHITECTURE NODES",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white",
      stats: "Enterprise Node Network",
      accent: "#10B981"
    },
    {
      id: "gigs",
      label: "Talent Systems",
      desc: "Deploy autonomous talent modules, intelligent commerce pipelines, and standardized escrow infrastructure.",
      icon: Briefcase,
      badge: "TALENT INFRASTRUCTURE",
      color: "bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white",
      stats: "Autonomous Nodes",
      accent: "#F59E0B"
    },
    {
      id: "academy",
      label: "AI Training Space",
      desc: "Professional playbooks, expert classes, and skill licenses for IT pros and creative talent.",
      icon: Award,
      badge: "42 CLASSES LIVE",
      color: "bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white",
      stats: "ESTARR Certified",
      accent: "#3B82F6"
    },
    {
      id: "marketplace",
      label: "Brand Campaigns",
      desc: "Exclusive high-ticket sponsorships, direct partner pitching, and exclusive digital IP marketplace.",
      icon: ShoppingCart,
      badge: "EXCLUSIVE SPONSORS",
      color: "bg-sky-50 text-sky-600 border-sky-100 group-hover:bg-sky-600 group-hover:text-white",
      stats: "Brand Partner Hub",
      accent: "#0EA5E9"
    },
    {
      id: "payments",
      label: "Wallet & Transfers",
      desc: "Secure off-chain digital wallet transactions, peer-to-peer transfers, and escrow disbursements.",
      icon: CreditCard,
      badge: "INSTANT TRANSFERS",
      color: "bg-cyan-50 text-cyan-600 border-cyan-100 group-hover:bg-cyan-600 group-hover:text-white",
      stats: "$4.2M Funded Value",
      accent: "#06B6D4"
    },
    {
      id: "connect",
      label: "Connect Network",
      desc: "Professional networking and instant matches with top-tier skilled pros for tech and content setup.",
      icon: Users,
      badge: "1.2K ONLINE NOW",
      color: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100 group-hover:bg-fuchsia-600 group-hover:text-white",
      stats: "Verified Network",
      accent: "#D946EF"
    },
    {
      id: "community",
      label: "Creator Community",
      desc: "Collaborative learning cohorts, group boards, and peer discussion hubs for scaling talent.",
      icon: Heart,
      badge: "COHORTS IN SESSION",
      color: "bg-pink-50 text-pink-600 border-pink-100 group-hover:bg-pink-600 group-hover:text-white",
      stats: "24 Active Circles",
      accent: "#EC4899"
    }
  ];

  const partnerBrands = [
    {
      id: "stripe",
      name: "Stripe",
      category: "Escrow & Global Payments",
      desc: "Powering real-time automated escrow disbursement, multi-currency contractor payouts, and smart contract settlement.",
      metric: "$4.2M Routed Monthly",
      badge: "Escrow Gateway",
      status: "Operational",
      latency: "14ms",
      themeColor: "indigo",
      color: "bg-indigo-50/50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white",
      logoSvg: (
        <svg className="w-16 h-6 text-slate-500 group-hover:text-[#635BFF] transition-colors duration-300" viewBox="0 0 100 32" fill="currentColor">
          <path d="M5.1 14.5c0-2.8 2.2-4.4 5.3-4.4 2.1 0 3.7.6 4.6 1.1l-1.1 2.5c-.7-.3-1.8-.8-3.3-.8-1.5 0-2.3.6-2.3 1.5 0 2.2 6.6 1.6 6.6 6.2 0 3.1-2.4 4.5-5.6 4.5-2.2 0-4.2-.7-5.1-1.3l1.1-2.5c1 .5 2.5 1.1 3.9 1.1 1.6 0 2.5-.6 2.5-1.5-.1-2.4-6.7-1.7-6.7-6.3zm13.1-1.5V9.4h3.1V6.2l3.2-.8v4h3.1v3.6h-3.1v6.9c0 1 .5 1.4 1.3 1.4.6 0 1.1-.1 1.4-.3l.5 3c-.6.3-1.6.5-2.8.5-2.7 0-3.6-1.5-3.6-4V13h-3.1zm11.2-3.6h3.1V12c.5-1.2 1.6-2.6 3.6-2.6.4 0 .9.1 1.1.2v3.4c-.4-.1-.9-.2-1.4-.2-2.1 0-3.2 1.5-3.2 3.6V24h-3.2V9.4zm9.3 0h3.2V24H42V9.4zm-.2-4c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM47 9.4h3.1v1.6c.7-1.1 2.1-2 4.1-2 3.6 0 5.4 2.6 5.4 6s-1.8 6-5.4 6c-1.5 0-2.7-.6-3.4-1.3V29H47V9.4zm3.1 5.9c0 2 .9 3.2 2.5 3.2 1.7 0 2.5-1.2 2.5-3.2s-.8-3.2-2.5-3.2c-1.6 0-2.5 1.2-2.5 3.2zm13.2 1.4c.1-3.6 2.6-5.5 5.5-5.5 3.1 0 5 2.1 5 5.2v1H69c0 1.8 1 2.8 2.6 2.8 1.2 0 2.2-.5 2.9-1l1.1 2.3c-1.1 1-3 1.6-4.9 1.6-4-.1-6.1-2.5-6.1-6.4zm6.6-1.9c0-1.2-.5-2.1-1.6-2.1-1.1 0-1.7.9-1.8 2.1h3.4z" />
        </svg>
      )
    },
    {
      id: "googlecloud",
      name: "Google Cloud",
      category: "AI Node Architecture",
      desc: "Providing enterprise container deployment backend, robust server-side security rules, and instant cloud-hosted datastores.",
      metric: "99.99% Node Up-time",
      badge: "SaaS Infrastructure",
      status: "Operational",
      latency: "8ms",
      themeColor: "blue",
      color: "bg-blue-50/50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white",
      logoSvg: (
        <div className="flex items-center justify-center shrink-0 px-1">
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="#4285F4">
            <path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z"/>
          </svg>
        </div>
      )
    },
    {
      id: "flutterwave",
      name: "Flutterwave",
      category: "Regional Money Gateway",
      desc: "African commercial backbone handling instantaneous mobile wallet settlements, localized card collections, and bulk payouts.",
      metric: "Local Naira/Cedi Engine",
      badge: "African Escrow",
      status: "Operational",
      latency: "21ms",
      themeColor: "teal",
      color: "bg-teal-50/50 text-teal-600 border-teal-100 group-hover:bg-teal-600 group-hover:text-white",
      logoSvg: (
        <div className="flex items-center justify-center shrink-0 px-1">
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#3AC7F5"/>
            <path d="M12 6h4v12h-4V6zM8 12h8v4H8v-4z" fill="white"/>
          </svg>
        </div>
      )
    },
    {
      id: "anthropic",
      name: "Anthropic",
      category: "Strategic AI Copilot",
      desc: "Powering deep language agents (Claude) to dynamically draft agreements, audit service codes, and match talents instantly.",
      metric: "Claude 3.5 Native LLM",
      badge: "LLM Orchestration",
      status: "Active Link",
      latency: "28ms",
      themeColor: "orange",
      color: "bg-orange-50/50 text-orange-600 border-orange-100 group-hover:bg-orange-600 group-hover:text-white",
      logoSvg: (
        <div className="flex items-center justify-center shrink-0 px-1">
          <svg className="w-6 h-6 shrink-0" role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/>
          </svg>
        </div>
      )
    },
    {
      id: "vercel",
      name: "Vercel",
      category: "Serverless Deployment Node",
      desc: "Delivering instantaneous edge responses, lightning-fast rendering of interactive widgets, and modern modular client previews.",
      metric: "Edge Delivery Network",
      badge: "Global Edge Router",
      status: "Active",
      latency: "6ms",
      themeColor: "zinc",
      color: "bg-zinc-50/50 text-zinc-650 border-zinc-250 group-hover:bg-black group-hover:text-white",
      logoSvg: (
        <div className="flex items-center justify-center shrink-0 px-1">
          <svg className="w-6 h-6 shrink-0" role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="m12 1.608 12 20.784H0Z"/>
          </svg>
        </div>
      )
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  // Automated scroll timer for a fluid, motion-rich experience
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isEnd = scrollLeft + clientWidth >= scrollWidth - 15;

        if (isEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const cardWidth = scrollRef.current.children[0]?.clientWidth || 300;
          scrollRef.current.scrollBy({ left: cardWidth + 16, behavior: "smooth" });
        }
      }
    }, activeTab === "modules" ? 4500 : 6000);
    return () => clearInterval(timer);
  }, [activeTab]);

  const handleSendPitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchText.trim()) return;
    setPitchSent(true);
    setTimeout(() => {
      setPitchSent(false);
      setPitchText("");
      setSelectedPartner(null);
    }, 2500);
  };

  const activeCollection = activeTab === "modules" ? services : partnerBrands;

  return (
    <div id="services-carousel-root" className="relative w-[100vw] overflow-hidden pt-16 pb-20 left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        
        {/* Core Header Section */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-mono font-black text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
            <span>ESTARR Platform Ecosystem</span>
          </span>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 uppercase">
            Explore Ecosystem
          </h3>
          <p className="text-xs md:text-sm text-slate-500 mt-2 leading-relaxed">
            Configure automated escrow workflows, execute custom agreements, and verify talent milestones securely across local African tech nodes and global backers.
          </p>
        </div>

        {/* Elegant Design Switcher: Tabbed Controller */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-200/60 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200 shadow-xs max-w-md w-full">
            <button
              id="tab-btn-modules"
              type="button"
              onClick={() => {
                setActiveTab("modules");
                if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: "auto" });
              }}
              className={`flex-1 py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "modules"
                  ? "bg-white text-slate-950 shadow-sm border border-slate-200/80 font-black"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${activeTab === "modules" ? "text-violet-500" : ""}`} />
              <span>Workspace Modules</span>
            </button>
            
            <button
              id="tab-btn-brands"
              type="button"
              onClick={() => {
                setActiveTab("brands");
                if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: "auto" });
              }}
              className={`flex-1 py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "brands"
                  ? "bg-white text-slate-950 shadow-sm border border-slate-200/80 font-black"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Building2 className={`w-3.5 h-3.5 ${activeTab === "brands" ? "text-violet-500" : ""}`} />
              <span>Corporate Partners</span>
            </button>
          </div>
        </div>

        {/* Dynamic Controls Line */}
        <div className="flex justify-between items-center mb-6 px-2">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Showing {activeCollection.length} verified {activeTab === "modules" ? "functional nodes" : "backed integrations"}</span>
          </span>
          
          <div className="flex gap-2">
            <button
              id="carousel-prev"
              type="button"
              onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-50 hover:text-violet-600 transition-all active:scale-95 shadow-xs cursor-pointer text-slate-600 text-sm font-bold"
            >
              &larr;
            </button>
            <button
              id="carousel-next"
              type="button"
              onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-50 hover:text-violet-600 transition-all active:scale-95 shadow-xs cursor-pointer text-slate-600 text-sm font-bold"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* Sliding Viewport */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-5 snap-x snap-mandatory pb-8 pt-2 hide-scrollbar px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
            {activeTab === "modules" ? (
            // Tab 1: Redesigned Workspace Modules Card Deck
            services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={`service-item-${service.id}-${idx}`}
                  className="w-full sm:w-[290px] flex-shrink-0 snap-start"
                >
                  <div
                    onClick={() => setSelectedService(service)}
                    className="p-5 h-full min-h-[240px] bg-white border border-slate-200/80 hover:border-violet-300 transition-all duration-300 cursor-pointer group shadow-xs hover:shadow-lg hover:-translate-y-1.5 rounded-2xl flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Subtle aesthetic dotted background inside cards */}
                    <div className="absolute inset-0 bg-radial-[circle_800px_at_50%_-100%] from-slate-50 to-transparent opacity-100 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-100/10 to-transparent rounded-full blur-xl pointer-events-none" />

                    <div>
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-xs ${service.color}`}>
                          <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                        </div>
                        <span className="text-[8px] font-mono font-bold tracking-wider text-slate-500 bg-slate-100/80 border border-slate-200 px-2 py-0.5 rounded-full flex items-center gap-1 group-hover:text-violet-600 group-hover:bg-violet-50 group-hover:border-violet-100 transition-all duration-300">
                          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                          {service.badge}
                        </span>
                      </div>

                      <h4 className="text-sm font-black uppercase tracking-tight text-slate-900 group-hover:text-violet-600 transition-colors duration-200 mb-2 relative z-10">
                        {service.label}
                      </h4>
                      <p className="text-[11px] leading-relaxed text-slate-500 min-h-[50px] line-clamp-3 relative z-10">
                        {service.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex justify-between items-center relative z-10">
                      <span className="text-[9px] font-mono font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                        📊 {service.stats}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-violet-500 group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                        ENTER HUB <span className="text-[12px]">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // Tab 2: Categorized Partner Ecosystem
            (() => {
              const groupedPartners = partnerBrands.reduce((acc, partner) => {
                if (!acc[partner.category]) acc[partner.category] = [];
                acc[partner.category].push(partner);
                return acc;
              }, {} as Record<string, typeof partnerBrands>);

              return Object.entries(groupedPartners).map(([category, partners]) => (
                <div key={category} className="w-full md:w-[350px] flex-shrink-0 snap-start bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">
                    {category}
                  </h4>
                  <div className="space-y-4">
                    {partners.map((partner, idx) => (
                      <div
                        key={`partner-item-${partner.id}-${idx}`}
                        onClick={() => setSelectedPartner(partner)}
                        className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-all border border-transparent hover:border-slate-100"
                      >
                        <div className="bg-slate-50 border border-slate-150 p-2 rounded-xl h-10 w-10 flex items-center justify-center shadow-2xs group-hover:bg-white transition-colors duration-300">
                          {partner.logoSvg}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {partner.name}
                          </p>
                          <p className="text-[10px] text-slate-400">{partner.metric}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 ml-auto group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()
          )}
        </div>

        {/* Floating Brand Trust Ribbon removed */}

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* MODAL DIALOGS FOR DETAILED DEMOS */}
      <AnimatePresence>
        {/* Workspace Module Modal */}
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 flex flex-col relative border border-slate-100"
            >
              <button
                id="close-module-modal"
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-500 transition-colors border border-slate-200 active:scale-95 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex gap-4 items-center mb-6">
                <div className="w-14 h-14 bg-violet-50 text-violet-600 border border-violet-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <selectedService.icon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full inline-block mb-1">
                    {selectedService.badge}
                  </span>
                  <h3 className="font-sans font-black uppercase text-xl text-slate-900">
                    {selectedService.label}
                  </h3>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <p className="text-slate-600 text-xs leading-relaxed">
                  Access the <strong>{selectedService.label}</strong> enterprise environment. 
                  {selectedService.desc} Orchestrate high-yield digital workflows, configure protected smart micro-agreements, and trace global milestones securely within the node ecosystem.
                </p>
                <div className="bg-slate-50 p-4 border border-slate-150 rounded-xl flex justify-between items-center text-xs">
                  <span className="font-mono text-slate-400">Node Ecosystem Metric</span>
                  <span className="font-mono font-black text-violet-600">{selectedService.stats}</span>
                </div>
              </div>
              
              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-xl font-bold text-xs transition-colors shadow-sm border border-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(selectedService.id);
                    setSelectedService(null);
                  }}
                  className="flex-1 bg-violet-600 hover:bg-violet-750 text-white px-5 py-3 rounded-xl font-bold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Enter Module
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Corporate Partner pitch and status Modal */}
        {selectedPartner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 flex flex-col relative border border-slate-100"
            >
              <button
                id="close-partner-modal"
                type="button"
                onClick={() => {
                  setSelectedPartner(null);
                  setPitchSent(false);
                }}
                className="absolute top-4 right-4 w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-500 transition-colors border border-slate-200 active:scale-95 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex gap-4 items-center mb-6">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center shadow-xs">
                  {selectedPartner.logoSvg}
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 mb-1">
                    <CheckSquare className="w-2.5 h-2.5" />
                    <span>Verified Integration ({selectedPartner.latency} Ping)</span>
                  </span>
                  <h3 className="font-sans font-black uppercase text-xl text-slate-900">
                    {selectedPartner.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 mb-6 text-xs text-slate-600 leading-relaxed">
                <p>
                  Our official API integration with <strong>{selectedPartner.name}</strong> handles continuous escrow flows, automated code verification, or decentralized node computing. 
                </p>
                
                {/* Integration Health Matrix */}
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="block text-slate-400 font-mono">INTEGRATION ROLE</span>
                    <span className="font-bold text-slate-800">{selectedPartner.category}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-mono">FLOW METRIC</span>
                    <span className="font-bold text-emerald-600 font-mono">{selectedPartner.metric}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-mono">NETWORK SPEED</span>
                    <span className="font-bold text-slate-800 font-mono">{selectedPartner.latency} latency</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-mono">ESCROW SLA</span>
                    <span className="font-bold text-slate-800">100% Guaranteed</span>
                  </div>
                </div>
              </div>

              {/* Interactive Demo Form: Send a pitch / campaign request directly to this partner */}
              <div className="border-t border-slate-100 pt-4 mt-2">
                <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                  🚀 Pitch a Campaign / Node Project
                </h4>
                
                {pitchSent ? (
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center text-xs text-emerald-800 font-bold flex flex-col items-center justify-center gap-1.5 animate-scale-in">
                    <CheckSquare className="w-6 h-6 text-emerald-600 animate-bounce" />
                    <span>Proposal transmitted directly to {selectedPartner.name}!</span>
                    <p className="text-[10px] text-emerald-600 font-normal">Our escrow router generated transaction hash: <span className="font-mono">tx_estarr_{Math.random().toString(36).substring(3, 10)}</span></p>
                  </div>
                ) : (
                  <form onSubmit={handleSendPitch} className="space-y-3">
                    <textarea
                      value={pitchText}
                      onChange={(e) => setPitchText(e.target.value)}
                      placeholder={`Describe your service gig or target client integration details for ${selectedPartner.name}...`}
                      className="w-full h-20 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                      required
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPartner(null)}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-emerald-900/10 flex items-center justify-center gap-1.5"
                      >
                        <Zap className="w-3 h-3" />
                        <span>Submit Pitch</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
