import React from "react";
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Activity
} from "lucide-react";
import { UserProfile, ConsultancyTask } from "../types";
import { ClientDashboard } from "./ClientDashboard";

export function UserDashboard({ 
  userProfile, 
  tasks,
  onNavigate 
}: { 
  userProfile: UserProfile;
  tasks: ConsultancyTask[];
  onNavigate: (id: string) => void;
}) {
  if (userProfile?.accountType === "jobOwner") {
    return <ClientDashboard userProfile={userProfile} tasks={tasks} onNavigate={onNavigate} />;
  }

  const activeTasks = tasks.filter(t => t.status !== 'done');
  const pendingEscrow = activeTasks.reduce((acc, t) => acc + (t.amount || 0), 0);
  
  const stats = [
    { 
      label: "Active Contracts", 
      value: activeTasks.length.toString(), 
      icon: Briefcase, 
      color: "text-blue-600", 
      bg: "bg-blue-50" 
    },
    { 
      label: "Pending Escrow", 
      value: `$${pendingEscrow.toLocaleString()}`, 
      icon: ShieldCheck, 
      color: "text-purple-600", 
      bg: "bg-purple-50" 
    },
    { 
      label: "Verification Score", 
      value: `${userProfile.points ? Math.min(100, Math.floor(userProfile.points / 10)) : 94}%`, 
      icon: TrendingUp, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50" 
    },
    { 
      label: "Network Connections", 
      value: (userProfile.recommends || 124).toString(), 
      icon: Users, 
      color: "text-orange-600", 
      bg: "bg-orange-50" 
    },
  ];

  const recentMilestones = activeTasks.slice(0, 5);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase font-display">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">{userProfile.name.split(' ')[0]}</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Your infrastructure is operational. {activeTasks.length} active milestone{activeTasks.length !== 1 ? 's' : ''} require attention.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            System Online
          </div>
          <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-200">
            Authenticated
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} transition-colors`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <TrendingUp className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Milestones */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-purple-600" />
              Active Escrow Milestones
            </h2>
            <button 
              onClick={() => onNavigate("consultancy")}
              className="text-[10px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 uppercase tracking-wider"
            >
              View Consultancy Hub <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            {recentMilestones.length > 0 ? (
              recentMilestones.map((m, i) => (
                <div key={m.id} className={`p-5 flex items-center justify-between hover:bg-slate-50 transition-colors ${i !== recentMilestones.length - 1 ? "border-b border-slate-100" : ""}`}>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-900">{m.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{m.assignee || 'Unassigned'}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-[10px] font-bold text-purple-600 uppercase tracking-tight flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Due {m.dueDate}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <span className="text-sm font-black text-slate-900">${(m.amount || 0).toLocaleString()}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${
                      m.status === "review" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {m.status === 'inprogress' ? 'In Progress' : m.status === 'review' ? 'In Review' : m.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center">
                <p className="text-slate-400 text-sm font-medium">No active milestones found.</p>
                <button 
                  onClick={() => onNavigate("consultancy")}
                  className="mt-4 text-xs font-black uppercase tracking-widest text-purple-600 hover:text-purple-700"
                >
                  Create New Contract
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <button 
              onClick={() => onNavigate("gigs")}
              className="flex items-center gap-4 p-5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all text-left group"
            >
              <div className="p-3 bg-white/10 rounded-xl group-hover:bg-purple-600 transition-colors">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-purple-300">Talent Market</p>
                <p className="text-sm font-medium text-slate-300 mt-0.5">Apply for a role or create a gig for your service</p>
              </div>
            </button>
            <button 
              onClick={() => onNavigate("connect")}
              className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:border-purple-300 transition-all text-left group"
            >
              <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-purple-50 transition-colors">
                <Users className="w-5 h-5 text-slate-600 group-hover:text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-900">Network Sync</p>
                <p className="text-sm font-medium text-slate-500 mt-0.5">Sync with peer nodes & collaborators</p>
              </div>
            </button>
          </div>
        </div>

        {/* Wallet & Activity / Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-slate-950 text-white p-6 rounded-2xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity className="w-24 h-24" />
            </div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-6">Financial Overview</h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Available Balance</p>
                <p className="text-3xl font-black text-white tracking-tighter">
                  ${(userProfile.walletBalance ?? 0).toLocaleString()}
                </p>
              </div>
              
              <div className="pt-4 border-t border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Recent Activity</p>
                <div className="space-y-3">
                  {(userProfile.history && userProfile.history.length > 0 ? userProfile.history : []).slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-200">{item.desc}</span>
                        <span className="text-[9px] text-slate-500">{item.date}</span>
                      </div>
                      <span className={`text-[10px] font-black ${item.type === 'payout' ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {item.type === 'payout' ? '+' : ''}${Math.abs(item.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Escrow Protection Guard Info */}
              <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Escrow Protection Guard</span>
                </div>
                <p className="text-[9px] text-slate-400 leading-relaxed">
                  Your money stays securely locked in escrow until the supplier
                  delivers your items or completes the service. Upon verification, the
                  escrow automatically pays out. Absolutely risk-free!
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button 
                  onClick={() => onNavigate("payments")}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/10 transition-colors"
                >
                  Manage Wallet
                </button>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-100 p-6 rounded-2xl">
            <h2 className="text-xs font-black uppercase tracking-widest text-purple-900 mb-3">AI Intelligence</h2>
            <p className="text-sm font-medium text-purple-800 leading-relaxed mb-4">
              {activeTasks.length > 0 
                ? `"I've analyzed your ${activeTasks.length} active contracts. Focus on '${activeTasks[0].title}' to hit your delivery target."`
                : `"Your profile is operational. I recommend adding more skills to your portfolio to match with premium $95/hr contracts."`
              }
            </p>
            <button 
              onClick={() => onNavigate("home")} // Or just open AI drawer if we had the state here
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
            >
              Ask AI Co-Pilot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
