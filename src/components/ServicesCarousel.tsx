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
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServicesCarouselProps {
  onSelect: (tab: any) => void;
}

export function ServicesCarousel({ onSelect }: ServicesCarouselProps) {
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    {
      id: "projects",
      label: "Escrow Hub",
      desc: "Secure milestones, fund verification, and bulletproof project contracts.",
      icon: CheckSquare,
      badge: "100% ESCROW-PROTECTED",
      color: "bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-600 group-hover:text-white",
      stats: "$1.2M+ Secured"
    },
    {
      id: "gigs",
      label: "Gigs Market",
      desc: "Micro-service marketplace with structured escrow protection.",
      icon: Laptop,
      badge: "STARTING AT $15",
      color: "bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white",
      stats: "1,240 Gigs Live"
    },
    {
      id: "payments",
      label: "Payments",
      desc: "Secure off-chain digital wallet transactions & point transfers.",
      icon: CreditCard,
      badge: "INSTANT TRANSFERS",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white",
      stats: "0% Deposit Fees"
    },
    {
      id: "academy",
      label: "Academy",
      desc: "Practical professional courses, expert classes, and skill quizzes.",
      icon: Award,
      badge: "42 CLASSES LIVE",
      color: "bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white",
      stats: "2.4K+ Students"
    },
    {
      id: "analytics",
      label: "IT & Creator Analytics",
      desc: "Analyze GitHub commits, TikTok, & Instagram metrics to generate verified professional media kits.",
      icon: LineChart,
      badge: "VERIFIED METRICS",
      color: "bg-violet-50 text-violet-600 border-violet-100 group-hover:bg-violet-600 group-hover:text-white",
      stats: "Audited Insights"
    },
    {
      id: "marketplace",
      label: "Marketplace",
      desc: "Decentralized trade, verified storefronts, and product sales.",
      icon: ShoppingCart,
      badge: "SECURED STOREFRONTS",
      color: "bg-sky-50 text-sky-600 border-sky-100 group-hover:bg-sky-600 group-hover:text-white",
      stats: "380+ Trusted Sellers"
    },
    {
      id: "careers",
      label: "Jobs Board",
      desc: "Explore high-paying full-time and freelance digital opportunities.",
      icon: Compass,
      badge: "18 NEW JOBS TODAY",
      color: "bg-teal-50 text-teal-600 border-teal-100 group-hover:bg-teal-600 group-hover:text-white",
      stats: "Remote & Hybrid"
    },
    {
      id: "connect",
      label: "Connect Network",
      desc: "Build your professional network and peer connections securely.",
      icon: Users,
      badge: "1.2K ONLINE NOW",
      color: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100 group-hover:bg-fuchsia-600 group-hover:text-white",
      stats: "Verified Network"
    },
    {
      id: "community",
      label: "Community",
      desc: "Collaborative learning cohorts, group chats, and discussion boards.",
      icon: Heart,
      badge: "COHORTS IN SESSION",
      color: "bg-pink-50 text-pink-600 border-pink-100 group-hover:bg-pink-600 group-hover:text-white",
      stats: "24 Active Circles"
    },
    {
      id: "events",
      label: "Events Hub",
      desc: "Host live streams, virtual ticketing, and professional masterclasses.",
      icon: Calendar,
      badge: "TICKETS IN-APP",
      color: "bg-cyan-50 text-cyan-600 border-cyan-100 group-hover:bg-cyan-600 group-hover:text-white",
      stats: "Next: July 12th"
    },
    {
      id: "mobile",
      label: "Companion App",
      desc: "Download our native mobile application for on-the-go notifications.",
      icon: Smartphone,
      badge: "COMPANION APP v2.4",
      color: "bg-slate-50 text-slate-600 border-slate-100 group-hover:bg-slate-800 group-hover:text-white",
      stats: "iOS & Android"
    },
    {
      id: "rewards",
      label: "Ambassadors",
      desc: "Refer partners, promote the platform, and earn points and rewards.",
      icon: Gift,
      badge: "500 ESTARR BONUS",
      color: "bg-yellow-50 text-yellow-600 border-yellow-100 group-hover:bg-yellow-600 group-hover:text-white",
      stats: "Level up your Rank"
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isEnd = scrollLeft + clientWidth >= scrollWidth - 10;

        if (isEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const cardWidth = scrollRef.current.children[0]?.clientWidth || 300;
          scrollRef.current.scrollBy({ left: cardWidth + 16, behavior: "smooth" });
        }
      }
    }, 4500); // slightly slower interval for a smoother experience
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden mt-8 border-t-2 border-slate-200 pt-8">
      <div className="flex justify-between items-end mb-6 px-2">
        <div>
          <span className="text-[10px] font-mono font-bold text-purple-600 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full uppercase tracking-widest inline-block mb-2">
            ✨ Interactive Workspace modules
          </span>
          <h3 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
            Explore Ecosystem
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" })
            }
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-200 active:scale-95 shadow-sm cursor-pointer text-slate-600"
          >
            &larr;
          </button>
          <button
            onClick={() =>
              scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" })
            }
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-200 active:scale-95 shadow-sm cursor-pointer text-slate-600"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-8 pt-2 px-2 hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="w-full sm:w-[280px] flex-shrink-0 snap-start"
            >
              <div
                onClick={() => setSelectedService(service)}
                className="p-5 h-full min-h-[220px] bg-[#FAF6EE] border border-slate-200 hover:border-purple-300 transition-all cursor-pointer group shadow-xs hover:shadow-lg hover:-translate-y-1.5 rounded-2xl flex flex-col justify-between duration-300 relative overflow-hidden"
              >
                {/* Subtle light glow hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-xs ${service.color}`}>
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[8px] font-mono font-bold tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full flex items-center gap-1 group-hover:text-purple-600 group-hover:bg-purple-50 group-hover:border-purple-100 transition-colors duration-300">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      {service.badge}
                    </span>
                  </div>

                  <h4 className="text-sm font-black uppercase tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors duration-200 mb-2">
                    {service.label}
                  </h4>
                  <p className="text-[11px] font-medium leading-relaxed text-slate-500 min-h-[48px] line-clamp-3">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-[9px] font-mono font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                    {service.stats}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-purple-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    EXPLORE <span className="text-[12px]">&rarr;</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 flex flex-col relative border border-slate-100"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-500 transition-colors border border-slate-200 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex gap-4 items-center mb-6">
                <div className="w-14 h-14 bg-purple-50 text-purple-600 border border-purple-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <selectedService.icon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-purple-600 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full inline-block mb-1">
                    {selectedService.badge}
                  </span>
                  <h3 className="font-sans font-black uppercase text-xl text-slate-900">
                    {selectedService.label}
                  </h3>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <p className="text-slate-600 text-xs leading-relaxed">
                  Welcome to the <strong>{selectedService.label}</strong> workspace. 
                  {selectedService.desc} Establish high-yield digital transactions, configure protected smart micro-agreements, and trace milestones securely under the peer ecosystem.
                </p>
                <div className="bg-slate-50 p-3.5 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
                  <span className="font-mono text-slate-400">Current Ecosystem Metric</span>
                  <span className="font-mono font-black text-purple-600">{selectedService.stats}</span>
                </div>
              </div>
              
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-xl font-bold text-xs transition-colors shadow-sm border border-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onSelect(selectedService.id);
                    setSelectedService(null);
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-bold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Enter Module
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
