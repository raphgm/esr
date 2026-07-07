import React from "react";
import { Gift, Award, Share2, Target, CheckCircle2, TrendingUp, Users } from "lucide-react";

export function RewardsSection() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="p-8 border border-slate-200 bg-white shadow-sm rounded-xl">
        <h2 className="text-3xl font-bold uppercase tracking-tight text-slate-900 mb-2">
          ESTARR Ambassadors & Rewards
        </h2>
        <p className="text-sm font-medium text-slate-500 mb-8 max-w-2xl">
          Earn ESTARR Points by referring new professionals, completing academy courses, and successfully closing escrow deals. Redeem points for premium features, lower escrow fees, or exclusive networking events.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl text-white shadow-md relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <Award className="w-8 h-8 mb-4 text-purple-200" />
            <div className="text-sm font-bold uppercase tracking-wider mb-1 opacity-90">Current Balance</div>
            <div className="text-4xl font-black tracking-tighter">4,250 <span className="text-lg font-medium tracking-normal opacity-80">pts</span></div>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <Users className="w-8 h-8 mb-4 text-emerald-500" />
            <div className="text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500">Total Referrals</div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter">12</div>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col justify-center items-start">
            <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-slate-500">Your Invite Link</div>
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center mb-3">
              <span className="text-xs font-mono text-slate-700 truncate mr-2">estrr.com/join/r/alex2026</span>
              <button className="p-1.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
            <p className="text-[9px] font-semibold text-slate-9000">Earn 500 pts per verified signup.</p>
          </div>
        </div>

        <h3 className="text-lg font-bold uppercase tracking-tight text-slate-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" /> Active Missions
        </h3>
        
        <div className="flex flex-col gap-3">
          {[
            { title: "Close 3 Escrow Deals this month", reward: "1,000 pts", progress: 66, status: "2/3 completed" },
            { title: "Complete 'Zero to YouTuber' Course", reward: "500 pts", progress: 100, status: "Completed" },
            { title: "Refer a Verified Merchant", reward: "800 pts", progress: 0, status: "0/1 completed" },
          ].map((mission, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <h4 className="text-sm font-bold text-slate-900">{mission.title}</h4>
                  <span className="text-xs font-bold text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full">{mission.reward}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1">
                  <div className={`h-1.5 rounded-full ${mission.progress === 100 ? 'bg-emerald-500' : 'bg-purple-500'}`} style={{ width: `${mission.progress}%` }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500">{mission.status}</span>
                  {mission.progress === 100 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
