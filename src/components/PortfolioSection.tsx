import React from "react";
import { UserProfile, PortfolioItem } from "../types";
import { PageBanner } from "./PageBanner";
import { 
  Briefcase, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Globe, 
  Layers,
  Plus,
  Heart,
  Eye,
  Share2,
  Download,
  Mail,
  Linkedin,
  Github
} from "lucide-react";
import { motion } from "motion/react";

interface PortfolioSectionProps {
  userProfile: UserProfile;
  isPublicView?: boolean;
}

export default function PortfolioSection({ userProfile, isPublicView = false }: PortfolioSectionProps) {
  const portfolioItems = userProfile.portfolio || [];

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    alert("Portfolio link copied to clipboard!");
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12">
      {!isPublicView && (
        <PageBanner
          title="My Professional Showcase"
          subtitle="PORTFOLIO & SKILLS"
          description="This is your public-facing professional profile. It showcases your verified skills, consultancy portfolio, and AI credentials to potential employers and brand partners."
          icon={Briefcase}
          actions={
            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:bg-slate-800 border border-slate-800"
              >
                <Share2 className="w-4 h-4 text-purple-400" />
                Share Portfolio
              </button>
            </div>
          }
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Profile Card & Skills */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-6">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <h2 className="font-display font-bold text-2xl text-slate-900 mb-1">
              {userProfile.name}
            </h2>
            <p className="text-sm font-medium text-purple-600 mb-4 px-4 py-1 bg-purple-50 rounded-full inline-block">
              {userProfile.profession}
            </p>
            
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
              <MapPin className="w-4 h-4" />
              <span>{userProfile.location}</span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              {userProfile.bio}
            </p>

            <div className="w-full flex flex-col gap-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Endorsements</span>
                <span className="font-mono font-black text-slate-900">{userProfile.recommends}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Credentials</span>
                <span className="font-mono font-black text-slate-900">{userProfile.certifications.length}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button className="p-3 bg-slate-50 rounded-full text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-all">
                <Mail className="w-5 h-5" />
              </button>
              <button className="p-3 bg-slate-50 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="p-3 bg-slate-50 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all">
                <Github className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              Skills & Expertise
            </h3>

            <div className="flex flex-col gap-6">
              {userProfile.skills && userProfile.skills.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest block mb-3">Verified Skills & Expertise</span>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills?.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-xl text-xs font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Consultancy & Achievements */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Consultancy Portfolio */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Globe className="w-6 h-6 text-emerald-500" />
                Consultancy Portfolio
              </h3>
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-wider">
                {portfolioItems.length} Items
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioItems.map((item) => (
                <div key={item.id} className="group bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:bg-white hover:border-purple-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded uppercase">
                      {item.category}
                    </span>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{item.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold">
                      <Heart className="w-3.5 h-3.5" />
                      <span>{item.likes.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
              {portfolioItems.length === 0 && (
                <div className="col-span-2 text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl">
                  <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-slate-400 text-sm">No consultancy engagements added to portfolio yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* AI Credentials & Badges */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2 mb-8">
              <Award className="w-6 h-6 text-amber-500" />
              AI Credentials & Badges
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {userProfile.certifications?.map((cert, idx) => (
                <div key={idx} className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all">
                  <div className="bg-white p-3 rounded-full shadow-sm mb-4">
                    <Award className="w-8 h-8 text-amber-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    {cert}
                  </h4>
                  <div className="mt-4 flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-white px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </div>
                </div>
              ))}
              
              {/* Default Badge if none */}
              <div className="bg-slate-50 border border-slate-100 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center opacity-60">
                <div className="bg-white p-3 rounded-full mb-3">
                  <Plus className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New Milestone</p>
              </div>
            </div>
          </div>

          {/* Activity Timeline / History */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2 mb-8">
              <Download className="w-6 h-6 text-blue-500" />
              Verified Activity Logs
            </h3>

            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {userProfile.history?.slice(0, 5).map((activity, idx) => (
                <div key={idx} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-white border-2 border-purple-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{typeof activity === 'string' ? activity : activity.desc || 'Activity Log'}</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-wider">
                      {typeof activity === 'object' && activity.date ? `${activity.date} • ` : ''}Completed Milestone • Verified Off-chain
                    </p>
                  </div>
                </div>
              )) || (
                <p className="text-slate-400 text-sm italic ml-10">No recent activity logs recorded.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
