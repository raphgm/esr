import React, { useState } from "react";
import { UserProfile } from "../types";
import {
  Building,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Plus,
  Search,
  ArrowRight,
  Home,
  HardHat,
  Lock,
  Wallet,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RealEstateSectionProps {
  userProfile: UserProfile;
  onOpenAiChat: (prompt: string, context: string) => void;
}

export default function RealEstateSection({
  userProfile,
  onOpenAiChat,
}: RealEstateSectionProps) {
  const [activeTab, setActiveTab] = useState<"market" | "projects" | "ledger">("market");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const properties = [
    {
      id: "p1",
      title: "Lekki Luxury Penthouse - Phase 1",
      location: "Lekki, Lagos",
      price: 185000000,
      status: "Available",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      type: "Residential",
      escrowStatus: "100% Secured",
      roi: "15% Annually"
    },
    {
      id: "p2",
      title: "Premium Serviced Land (500sqm)",
      location: "Epe, Lagos",
      price: 12000000,
      status: "Verified",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
      type: "Land",
      escrowStatus: "Title Guaranteed",
      roi: "25% Annually"
    }
  ];

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header Section for Integrated View */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
        <div>
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Property & Construction</h3>
          <p className="text-xs text-slate-500 font-medium">Secure diaspora property investments and land procurement.</p>
        </div>
        <button 
          onClick={() => setIsCreatingProject(true)}
          className="bg-slate-950 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:shadow-purple-500/20 transition-all shrink-0"
        >
          <Plus className="w-3.5 h-3.5 inline mr-2" /> Start Project
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-mono font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">Active</span>
          </div>
          <h4 className="text-xl font-black text-slate-900">₦2.4B+</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Escrowed Assets</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <HardHat className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase">Global</span>
          </div>
          <h4 className="text-xl font-black text-slate-900">128</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Active Constructions</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-mono font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full uppercase">Growth</span>
          </div>
          <h4 className="text-xl font-black text-slate-900">18.4%</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Avg. Property ROI</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100/80 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("market")}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === "market"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Property Market
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === "projects"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          My Construction
        </button>
        <button
          onClick={() => setActiveTab("ledger")}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === "ledger"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Escrow Ledger
        </button>
      </div>

      {/* Content Area */}
      <div className="mt-2">
        {activeTab === "market" && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative group max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="text"
                placeholder="Search location, property type, or developer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-purple-500 transition-all shadow-sm"
              />
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredProperties.map(prop => (
                <motion.div
                  key={prop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={prop.image} 
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-tighter text-slate-900 flex items-center gap-2 shadow-xl border border-white/20">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        {prop.escrowStatus}
                      </span>
                    </div>
                    <div className="absolute top-6 right-6">
                      <span className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-tighter text-white border border-white/10 shadow-xl">
                        {prop.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.15em]">{prop.location}</span>
                    </div>
                    <h5 className="text-2xl font-black text-slate-900 leading-tight mb-4 group-hover:text-purple-600 transition-colors">
                      {prop.title}
                    </h5>
                    <div className="flex flex-wrap justify-between items-end gap-4 pt-6 border-t border-slate-100">
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secured Price</p>
                        <p className="text-2xl font-black text-slate-900 tracking-tighter">₦{prop.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right flex flex-col gap-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. ROI</p>
                        <p className="text-lg font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl inline-block whitespace-nowrap">{prop.roi}</p>
                      </div>
                    </div>
                    <div className="mt-8 flex gap-3">
                      <button 
                        onClick={() => onOpenAiChat(`I'm interested in the ${prop.title} property in ${prop.location}. Can you help me understand the escrow steps and ROI potential?`, "realestate")}
                        className="flex-1 bg-slate-950 text-white py-4 rounded-[1.25rem] text-[11px] font-black uppercase tracking-widest transition-all shadow-xl hover:shadow-purple-500/20 active:scale-95 flex items-center justify-center gap-2"
                      >
                        View Full Details <ArrowRight className="w-4 h-4" />
                      </button>
                      <button className="w-14 h-14 border-2 border-slate-100 rounded-[1.25rem] flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all">
                        <TrendingUp className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 border border-slate-100">
              <HardHat className="w-10 h-10 text-slate-200" />
            </div>
            <h4 className="text-xl font-black text-slate-900 mb-2">No Active Construction Projects</h4>
            <p className="text-slate-500 text-sm max-w-sm mb-8 font-medium">
              You haven't started any construction or renovation projects yet. Hire verified developers and contractors under 100% escrow protection.
            </p>
            <button 
              onClick={() => setIsCreatingProject(true)}
              className="bg-slate-950 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.15em] shadow-[4px_4px_0px_#6366f1] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Start New Project
            </button>
          </div>
        )}

        {activeTab === "ledger" && (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Escrow Transaction Ledger</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Property & Construction Payouts</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400">STATUS:</span>
                <span className="text-[9px] font-mono font-black text-emerald-500 bg-white border border-emerald-100 px-2 py-0.5 rounded-full">ALL SECURED</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Property / Project</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Milestone</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                          <Home className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-xs font-bold text-slate-800">Lekki Penthouse A2</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">Acquisition</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">Initial Deposit</td>
                    <td className="px-6 py-4 text-xs font-black text-slate-900">₦25,000,000</td>
                    <td className="px-6 py-4">
                      <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Released</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                          <Building className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-xs font-bold text-slate-800">Epe Land Parcel 14</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">Procurement</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">Title Verification</td>
                    <td className="px-6 py-4 text-xs font-black text-slate-900">₦5,000,000</td>
                    <td className="px-6 py-4">
                      <span className="text-[9px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">In Verification</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Construction Project Modal */}
      <AnimatePresence>
        {isCreatingProject && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl border-4 border-white"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
                <div>
                  <h3 className="font-sans font-black text-2xl text-slate-900 uppercase tracking-tighter">Start New Project</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Escrow-Protected Construction</p>
                </div>
                <button 
                  onClick={() => setIsCreatingProject(false)} 
                  className="w-10 h-10 bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all rounded-2xl flex items-center justify-center shadow-sm border border-slate-200 active:scale-95"
                >
                  <Search className="w-5 h-5 rotate-45" />
                </button>
              </div>
              <div className="p-8 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Project Category</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select className="w-full border-2 border-slate-100 bg-slate-50/50 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-500 transition-all appearance-none cursor-pointer">
                        <option>Residential Build</option>
                        <option>Commercial Space</option>
                        <option>Land Fencing</option>
                        <option>Renovation</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Project Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" placeholder="e.g. Lekki, Lagos" className="w-full border-2 border-slate-100 bg-slate-50/50 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-300" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Escrow Budget</label>
                    <div className="relative">
                      <Wallet className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" placeholder="e.g. ₦15,000,000" className="w-full border-2 border-slate-100 bg-slate-50/50 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-300" />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Preferred Timeline</label>
                    <div className="relative">
                      <TrendingUp className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select className="w-full border-2 border-slate-100 bg-slate-50/50 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-500 transition-all appearance-none cursor-pointer">
                        <option>3 - 6 Months</option>
                        <option>6 - 12 Months</option>
                        <option>1 - 2 Years</option>
                        <option>Indefinite</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Project Brief / Specs</label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-4 w-4 h-4 text-slate-400" />
                    <textarea rows={3} placeholder="Tell us about your property vision..." className="w-full border-2 border-slate-100 bg-slate-50/50 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-300"></textarea>
                  </div>
                </div>
                
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex gap-3 items-start">
                  <Lock className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-[10px] font-bold text-emerald-800 leading-normal">
                    By submitting, you agree to place project funds in the ESTARR Secure Escrow Vault. Funds will only be released to contractors upon your milestone verification.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0 flex gap-4">
                <button 
                  onClick={() => setIsCreatingProject(false)} 
                  className="flex-1 px-5 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] border-2 border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={() => { 
                    setIsCreatingProject(false); 
                    onOpenAiChat("I just submitted a new real estate construction project request. Can you help me find the best contractors for residential builds in Lekki?", "realestate");
                  }} 
                  className="flex-1 px-5 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] bg-slate-950 hover:bg-purple-600 text-white shadow-xl hover:shadow-purple-500/20 active:scale-95 transition-all"
                >
                  Create Escrow Lock
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
