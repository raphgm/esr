import React, { useState } from "react";
import { UserProfile } from "../types";
import { PageBanner } from "./PageBanner";
import { Search, MapPin, Briefcase, Star, Filter, ShieldCheck, Mail } from "lucide-react";
import { motion } from "motion/react";

interface PortfolioClientSectionProps {
  userProfile: UserProfile;
}

export function PortfolioClientSection({ userProfile }: PortfolioClientSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const mockTalent = [
    { id: 1, name: "Sarah Chen", role: "Senior Full Stack Engineer", location: "San Francisco, CA", rate: "$120/hr", rating: 4.9, skills: ["React", "Node.js", "AWS", "TypeScript"], verified: true },
    { id: 2, name: "Marcus Johnson", role: "AI Integration Specialist", location: "London, UK", rate: "$150/hr", rating: 4.8, skills: ["Python", "PyTorch", "OpenAI API", "MLOps"], verified: true },
    { id: 3, name: "Elena Rodriguez", role: "UX/UI Designer", location: "Madrid, ES", rate: "$95/hr", rating: 5.0, skills: ["Figma", "Design Systems", "User Research"], verified: true },
    { id: 4, name: "David Kim", role: "DevOps Architect", location: "Austin, TX", rate: "$130/hr", rating: 4.7, skills: ["Kubernetes", "Docker", "CI/CD", "Terraform"], verified: false },
    { id: 5, name: "Priya Patel", role: "Mobile App Developer", location: "Toronto, CA", rate: "$110/hr", rating: 4.9, skills: ["Swift", "Kotlin", "React Native"], verified: true },
  ];

  const filteredTalent = mockTalent.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12">
      <PageBanner
        icon={Briefcase}
        title="Talent Portfolios"
        subtitle="Verified Experts"
        description="Discover and hire top-tier verified professionals for your next project."
        
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
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
            <Filter className="w-5 h-5" /> Filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTalent.map((talent) => (
            <motion.div 
              key={talent.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all group bg-white relative overflow-hidden flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl uppercase tracking-wider shrink-0">
                  {talent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {talent.rating}
                  </div>
                  {talent.verified && (
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-slate-900 mb-1">{talent.name}</h3>
              <p className="text-sm font-medium text-indigo-600 mb-3">{talent.role}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 font-medium">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {talent.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {talent.rate}</span>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                {talent.skills.map(skill => (
                  <span key={skill} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold tracking-wide">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
                  View Profile
                </button>
                <button className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
