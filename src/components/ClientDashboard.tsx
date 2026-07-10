import React from "react";
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Plus
} from "lucide-react";
import { UserProfile, ConsultancyTask } from "../types";

export function ClientDashboard({ 
  userProfile, 
  tasks,
  onNavigate 
}: { 
  userProfile: UserProfile;
  tasks: ConsultancyTask[];
  onNavigate: (id: string) => void;
}) {
  const activeTasks = tasks.filter(t => t.status !== 'done');
  const totalSpend = 2450.00; // Mock data for client
  
  const stats = [
    { 
      label: "Active Projects", 
      value: activeTasks.length.toString(), 
      icon: Briefcase, 
      color: "text-indigo-600", 
      bg: "bg-indigo-50" 
    },
    { 
      label: "Total Spend", 
      value: `$${totalSpend.toLocaleString()}`, 
      icon: CreditCard, 
      color: "text-purple-600", 
      bg: "bg-purple-50" 
    },
    { 
      label: "Talent Network", 
      value: (userProfile.recommends || 24).toString(), 
      icon: Users, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50" 
    },
    { 
      label: "Pending Approvals", 
      value: "3", 
      icon: ShieldCheck, 
      color: "text-orange-600", 
      bg: "bg-orange-50" 
    },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase font-display">
            Client Portal, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{userProfile.name.split(' ')[0]}</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Manage your projects, review talent, and track your spending.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('ai-lab')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" /> Post AI Task
          </button>
          <button 
            onClick={() => onNavigate('consultancy')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" /> Post IT Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-sm font-bold text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
            </div>
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${stat.bg} opacity-50 group-hover:scale-150 transition-transform duration-500`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Your Projects</h2>
            <button 
              onClick={() => onNavigate('consultancy')}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-bold flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            {activeTasks.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {activeTasks.slice(0, 4).map(task => (
                  <div key={task.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => onNavigate('consultancy')}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-100 text-slate-600 rounded-xl group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Due {task.dueDate}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="text-emerald-600 font-bold">${task.amount?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold capitalize">
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">No active projects</h3>
                <p className="text-sm text-slate-500 max-w-sm">You haven't posted any projects yet. Start by posting an AI task or IT project.</p>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => onNavigate('ai-lab')} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold">Post AI Task</button>
                  <button onClick={() => onNavigate('consultancy')} className="px-4 py-2 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-50">Post IT Project</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-bl-full opacity-20" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500 rounded-tr-full opacity-20" />
            
            <div className="relative z-10 space-y-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Account Balance</p>
                <p className="text-3xl font-black text-white tracking-tighter">
                  ${(userProfile.walletBalance ?? 0).toLocaleString()}
                </p>
              </div>
              
              <div className="pt-4 border-t border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Recent Transactions</p>
                <div className="space-y-3">
                  {(userProfile.history && userProfile.history.length > 0 ? userProfile.history : []).slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-200">{item.desc}</span>
                        <span className="text-[9px] text-slate-500">{item.date}</span>
                      </div>
                      <span className={`text-[10px] font-black ${item.type === 'payout' ? 'text-red-400' : 'text-slate-300'}`}>
                        {item.type === 'payout' ? '-' : ''}${Math.abs(item.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  {(!userProfile.history || userProfile.history.length === 0) && (
                    <p className="text-xs text-slate-500 italic">No recent transactions.</p>
                  )}
                </div>
              </div>
              
              <button 
                onClick={() => onNavigate('payments')}
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-colors"
              >
                Add Funds
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Top Talent Suggestions</h3>
            <div className="space-y-4">
              {[
                { name: "Sarah J.", role: "Senior AI Engineer", rating: "4.9" },
                { name: "Michael T.", role: "Data Scientist", rating: "5.0" },
                { name: "Elena R.", role: "Full Stack Dev", rating: "4.8" }
              ].map((talent, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=talent-${i}`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900">{talent.name}</p>
                      <p className="text-xs text-slate-500">{talent.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                    ★ {talent.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
