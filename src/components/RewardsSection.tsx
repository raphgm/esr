import React, { useState } from "react";
import { 
  Gift, Award, Share2, Target, CheckCircle2, TrendingUp, Users, 
  Copy, Check, Sparkles, Send, Flame, Lock, ArrowRight, ShieldCheck, RefreshCw,
  Clock, ArrowUpRight, Trophy, AlertCircle, Sparkle
} from "lucide-react";
import { UserProfile } from "../types";

export function RewardsSection({ 
  userProfile, 
  onUpdateProfile 
}: { 
  userProfile: UserProfile; 
  onUpdateProfile: (updated: UserProfile) => void; 
}) {
  // Use real values from userProfile, falling back to original static specs if undefined
  const points = userProfile.points !== undefined ? userProfile.points : 4250;
  const referrals = userProfile.referrals !== undefined ? userProfile.referrals : 12;

  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"missions" | "redeem" | "history">("missions");

  // Local state for interactive missions
  const [missions, setMissions] = useState([
    { id: "m-1", title: "Close 3 Escrow Deals this month", reward: 1000, maxProgress: 3, currentProgress: 2, completed: false },
    { id: "m-2", title: "Complete 'Zero to YouTuber' Course", reward: 500, maxProgress: 1, currentProgress: 1, completed: true },
    { id: "m-3", title: "Refer a Verified Merchant", reward: 800, maxProgress: 1, currentProgress: 0, completed: false },
  ]);

  // Rewards catalog for redemption
  const rewardCatalog = [
    { id: "rw-1", name: "1% Off Escrow Fees", cost: 1000, category: "Fee Discount", desc: "Reduces your next transaction commission to keep more of your hard-earned profits.", icon: ShieldCheck },
    { id: "rw-2", name: "Premium Portfolio Badge", cost: 1500, category: "Profile Flair", desc: "Adds an elite glowing verification crest to your consultant profile.", icon: Award },
    { id: "rw-3", name: "Exclusive Networking Ticket", cost: 2500, category: "Events", desc: "Pass to the upcoming REMOGIGS digital high-table VIP roundtable event.", icon: Users },
    { id: "rw-4", name: "1-Hour Strategic Consultation", cost: 3000, category: "Consultancy", desc: "One-on-one strategy session with senior REMOGIGS partners to audit your model.", icon: Gift },
  ];

  // Filtering user profile history to find active rewards redemptions
  const historyEntries = userProfile.history || [];
  const redemptions = historyEntries.filter(h => h.type === "redemption");

  const handleCopyLink = () => {
    const userNameClean = userProfile.name?.toLowerCase().replace(/\s+/g, "") || "alex2026";
    const inviteLink = `remogigs.com/join/r/${userNameClean}`;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateProfileData = (newPoints: number, newReferrals: number, historyItem?: any) => {
    const updatedHistory = userProfile.history ? [...userProfile.history] : [];
    if (historyItem) {
      updatedHistory.unshift({
        id: `reward-tx-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        date: new Date().toISOString(),
        ...historyItem
      });
    }
    onUpdateProfile({
      ...userProfile,
      points: newPoints,
      referrals: newReferrals,
      history: updatedHistory
    });
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !inviteEmail.includes("@")) return;

    // Award 500 points for inviting a friend!
    const newPoints = points + 500;
    const newReferrals = referrals + 1;

    updateProfileData(newPoints, newReferrals, {
      type: "referral_invite",
      description: `Referred ${inviteEmail}`,
      change: "+500 pts"
    });

    setInviteEmail("");
    setInviteSuccess(true);
    setTimeout(() => setInviteSuccess(false), 4000);
  };

  // Complete a mission step dynamically
  const handleProgressMission = (missionId: string) => {
    setMissions(prevMissions => 
      prevMissions.map(m => {
        if (m.id === missionId && !m.completed) {
          const nextProgress = m.currentProgress + 1;
          const isNowCompleted = nextProgress >= m.maxProgress;
          
          if (isNowCompleted) {
            const newPoints = points + m.reward;
            updateProfileData(newPoints, referrals, {
              type: "mission_completion",
              description: `Completed Mission: ${m.title}`,
              change: `+${m.reward} pts`
            });
          }
          
          return {
            ...m,
            currentProgress: Math.min(nextProgress, m.maxProgress),
            completed: isNowCompleted
          };
        }
        return m;
      })
    );
  };

  // Redeem point reward
  const handleRedeem = (rewardId: string, cost: number, rewardName: string) => {
    if (points < cost) return;

    const newPoints = points - cost;
    updateProfileData(newPoints, referrals, {
      type: "redemption",
      description: `Redeemed Reward: ${rewardName}`,
      change: `-${cost} pts`
    });
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in" id="rewards-viewport">
      <div className="p-8 border border-slate-200 bg-white shadow-xs rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-mono font-black tracking-widest text-purple-600 uppercase bg-purple-50 px-3 py-1 rounded-full inline-block mb-2">
              REMOGIGS AMBASSADORS
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-2">
              Ambassadors & Rewards
            </h2>
            <p className="text-sm font-medium text-slate-500 max-w-2xl leading-relaxed">
              Earn REMOGIGS Points by referring new professionals, completing academy courses, and successfully closing escrow deals. Redeem points for premium features, lower escrow fees, or exclusive networking events.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-3 rounded-xl max-w-sm">
            <Trophy className="w-5 h-5 text-yellow-600 shrink-0" />
            <div className="text-xs text-yellow-800 font-medium">
              You are in the <strong className="font-bold">Top 5%</strong> of active global builders. Keep going!
            </div>
          </div>
        </div>

        {/* Dynamic Point Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Points Balance Card */}
          <div className="p-6 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl text-white shadow-md relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <Award className="w-8 h-8 mb-4 text-purple-200" />
            <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-90">Current Balance</div>
            <div className="text-4xl font-black tracking-tighter flex items-baseline gap-1.5">
              {points.toLocaleString()} <span className="text-lg font-medium tracking-normal opacity-80">pts</span>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[10px] bg-white/15 px-2.5 py-1 rounded-lg w-max font-mono">
              <Sparkle className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" />
              <span>Earn 500 pts per verified signup</span>
            </div>
          </div>

          {/* Referral Stats & Quick Form */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-400">Total Referrals</div>
                <div className="text-3xl font-black text-slate-900 tracking-tighter">{referrals}</div>
              </div>
              <Users className="w-8 h-8 text-emerald-500 bg-emerald-50 p-1.5 rounded-lg" />
            </div>

            <form onSubmit={handleInvite} className="mt-4">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Refer a Professional Colleague
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email..."
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-purple-500 focus:bg-white"
                />
                <button
                  type="submit"
                  className="bg-slate-950 hover:bg-purple-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
              {inviteSuccess && (
                <div className="text-[9px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1 animate-fade-in">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Invitation sent! +500 PTS credited!
                </div>
              )}
            </form>
          </div>

          {/* Personalized Invite Link Card */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-slate-400">Your Invite Link</div>
              <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-slate-700 truncate mr-2">
                  remogigs.com/join/r/{userProfile.name?.toLowerCase().replace(/\s+/g, "") || "alex2026"}
                </span>
                <button 
                  onClick={handleCopyLink}
                  type="button"
                  className="p-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-500 leading-tight">
                Copy and share this link across networks. Anyone who registers gains instantly lower trial fees, and you receive <strong className="text-purple-600">500 pts</strong> upon verification.
              </p>
            </div>
          </div>
        </div>

        {/* Sub-tab Selection */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab("missions")}
            className={`px-4 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "missions"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Target className="w-4 h-4" /> Active Missions
          </button>
          <button
            onClick={() => setActiveTab("redeem")}
            className={`px-4 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "redeem"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Gift className="w-4 h-4" /> Redeem Center
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "history"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Clock className="w-4 h-4" /> Points Ledger
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === "missions" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700">Complete any active mission below to automatically credit your points balance.</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {missions.map((mission) => {
                const progressPercentage = (mission.currentProgress / mission.maxProgress) * 100;
                return (
                  <div 
                    key={mission.id} 
                    className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-all shadow-2xs"
                  >
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            {mission.title}
                            {mission.completed && (
                              <span className="text-[9px] bg-emerald-50 border border-emerald-200 text-emerald-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                Completed
                              </span>
                            )}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-500">
                            Status: {mission.currentProgress}/{mission.maxProgress} steps
                          </span>
                        </div>
                        <span className="text-xs font-black text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full shrink-0 font-mono">
                          +{mission.reward.toLocaleString()} pts
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 mb-2 relative overflow-hidden">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${mission.completed ? 'bg-emerald-500' : 'bg-purple-600'}`} 
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2 justify-end">
                      {mission.completed ? (
                        <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold border border-emerald-100">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          Earned
                        </div>
                      ) : (
                        <button
                          onClick={() => handleProgressMission(mission.id)}
                          className="bg-slate-900 hover:bg-purple-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-102 flex items-center gap-1.5"
                        >
                          <TrendingUp className="w-4 h-4" />
                          {mission.id === "m-1" ? "Simulate Escrow Deal" : "Complete Mission"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "redeem" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rewardCatalog.map((reward) => {
                const canAfford = points >= reward.cost;
                const IconComponent = reward.icon;
                const isClaimed = redemptions.some(r => r.description.includes(reward.name));

                return (
                  <div 
                    key={reward.id} 
                    className="border border-slate-200 bg-slate-50/50 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-300 transition-all relative overflow-hidden"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                          {reward.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg">
                          <Flame className="w-3.5 h-3.5" />
                          {reward.cost.toLocaleString()} pts
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        <IconComponent className="w-4 h-4 text-purple-600" />
                        {reward.name}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        {reward.desc}
                      </p>
                    </div>

                    <div>
                      {isClaimed ? (
                        <div className="w-full bg-purple-50 border border-purple-200 text-purple-700 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                          <Check className="w-4 h-4" /> Active Reward Activated
                        </div>
                      ) : canAfford ? (
                        <button
                          onClick={() => handleRedeem(reward.id, reward.cost, reward.name)}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-xs font-bold transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Redeem Perk Now
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full bg-slate-200 text-slate-400 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-not-allowed"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          Need {(reward.cost - points).toLocaleString()} more pts
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Points Ledger history</h3>
            {historyEntries.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-mono text-slate-400">No transactions recorded in your points ledger yet.</p>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <div className="divide-y divide-slate-100">
                  {historyEntries.map((item: any, idx: number) => {
                    const isAddition = item.change?.startsWith("+");
                    return (
                      <div key={item.id || idx} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${isAddition ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50/70 text-red-600'}`}>
                            {isAddition ? <ArrowUpRight className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{item.description}</p>
                            <p className="text-[10px] font-mono text-slate-400">
                              {new Date(item.date).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <span className={`font-mono font-bold ${isAddition ? 'text-emerald-600' : 'text-red-500'}`}>
                          {item.change}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
