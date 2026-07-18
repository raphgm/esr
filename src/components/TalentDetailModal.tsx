import React from "react";
import { X, Star } from "lucide-react";

export function TalentDetailModal({ talent, onClose }: { 
    talent: { 
        name: string, 
        role: string, 
        rating: string, 
        bio: string, 
        projectsCount: number, 
        isVerified: boolean 
    }, 
    onClose: () => void 
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-sm relative max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white text-[10px] font-bold tracking-widest uppercase px-6 py-3 w-full">
            REMOGIGS VERIFIED PARTNER PROGRAM
        </div>
        <button onClick={onClose} className="absolute top-12 right-6 text-slate-400 hover:text-white transition-colors"><X className="w-6 h-6"/></button>
        <div className="p-8 flex flex-col items-center overflow-y-auto">
            <img src={`https://i.pravatar.cc/150?u=talent-${talent.name}`} alt="Avatar" className="w-24 h-24 rounded-full mb-4 mt-6" />
            <h3 className="text-xl font-black text-slate-900">{talent.name}</h3>
            <p className="text-slate-500 mb-4">{talent.role}</p>
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-lg font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md">
                    <Star className="w-5 h-5 fill-current" /> {talent.rating}
                </div>
                <div className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-md">
                    {talent.projectsCount} Projects
                </div>
            </div>
            
            <div className="w-full text-left">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Professional Biography</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{talent.bio}</p>
                
                {talent.isVerified && (
                    <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                        <p className="text-xs font-bold text-purple-900">Verified Partner</p>
                        <p className="text-[10px] text-purple-700">This partner has completed all verification steps and is cleared for high-stakes projects.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
