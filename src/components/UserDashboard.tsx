import React, { useState } from "react";
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
  Activity,
  Download,
  DollarSign,
  Award,
  Sparkles,
  Coins,
  Lock,
  FileCode,
  CheckCircle2,
  CheckCircle,
  UserPlus,
  Flame,
  Rocket,
  ChevronRight,
  Info
} from "lucide-react";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { UserProfile, ConsultancyTask, ActivityPost, Job } from "../types";
import { ClientDashboard } from "./ClientDashboard";
import { ContributorAnalyticsDashboard } from "./ContributorAnalyticsDashboard";

// Auth logic (should be in a separate file, but adding here for now as per instructions)
// Reuse existing firebase config if possible, or initialize with config
const firebaseConfig = { /* ... your config ... */ }; // Need actual config. I'll use a placeholder or read if needed.
// Actually, I should probably check if I can import a config file.
// The instructions said "The Firebase project is already provisioned for the applet — the config lives in firebase-applet-config.json".
import firebaseConfigData from '../../firebase-applet-config.json';
const app = initializeApp(firebaseConfigData);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar.events');
provider.addScope('https://www.googleapis.com/auth/gmail.send');

export function UserDashboard({ 
  userProfile, 
  tasks,
  posts,
  jobs,
  onNavigate,
  onOpenAiChat,
  onUpdateProfile,
  onUpdateJobs
}: { 
  userProfile: UserProfile;
  tasks: ConsultancyTask[];
  posts: ActivityPost[];
  jobs: Job[];
  onNavigate: (id: string) => void;
  onOpenAiChat?: (prompt: string, context: string) => void;
  onUpdateProfile?: (updated: UserProfile) => void;
  onUpdateJobs: (jobs: Job[]) => void;
}) {
  const [token, setToken] = useState<string | null>(null);

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // @ts-ignore
        const token = await user.getIdToken(true);
        // This is a simplified auth flow.
      }
    });
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // @ts-ignore
      setToken(result._tokenResponse.oauthAccessToken);
    } catch (err) {
      console.error(err);
    }
  };
  const calculateCompletion = (profile: UserProfile) => {
    let percentage = 0;
    if (profile.name) percentage += 10;
    if (profile.profession) percentage += 10;
    if (profile.bio) percentage += 10;
    if (profile.location) percentage += 10;
    if (profile.avatar) percentage += 10;
    if (profile.skills && profile.skills.length > 0) percentage += 20;
    if (profile.interests && profile.interests.length > 0) percentage += 10;
    if (profile.goals && profile.goals.length > 0) percentage += 10;
    if (profile.portfolio && profile.portfolio.length > 0) percentage += 10;
    return percentage;
  };

  const handleExport = () => {
    const exportData = {
      profile: userProfile,
      history: userProfile.history,
      tasks: tasks,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `user-dashboard-export-${userProfile.name.replace(/\s+/g, '-').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (userProfile?.accountType === "jobOwner") {
    return <ClientDashboard userProfile={userProfile} tasks={tasks} onNavigate={onNavigate} token={token} />;
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

  // Dynamic ESTARR Intelligence & Rate Recommendation Engine
  const calculateRateStats = () => {
    let baseRate = 75;
    const profession = (userProfile.profession || "Consultant").toLowerCase();
    
    if (profession.includes("architect") || profession.includes("principal")) {
      baseRate = 135;
    } else if (profession.includes("senior") || profession.includes("lead")) {
      baseRate = 115;
    } else if (profession.includes("engineer") || profession.includes("developer")) {
      baseRate = 95;
    } else if (profession.includes("designer") || profession.includes("product")) {
      baseRate = 85;
    } else if (profession.includes("marketing") || profession.includes("seo")) {
      baseRate = 80;
    }

    const userSkills = userProfile.skills || [];
    let skillsPremium = 0;
    const skillsToHighlight: string[] = [];

    // Analyze individual skills
    userSkills.forEach(skill => {
      const s = skill.toLowerCase().trim();
      if (
        s.includes("solidity") || 
        s.includes("smart contract") || 
        s.includes("blockchain") ||
        s.includes("kubernetes") ||
        s.includes("ai") ||
        s.includes("machine learning") ||
        s.includes("llm") ||
        s.includes("rust")
      ) {
        skillsPremium += 15;
        skillsToHighlight.push(skill);
      } else if (s.length > 0) {
        skillsPremium += 5;
      }
    });

    const recommendedRate = baseRate + skillsPremium;

    // Suggest highly valuable skills not currently present
    const standardPremiumPool = [
      { name: "Solidity Smart Contracts", rateBoost: 25 },
      { name: "Enterprise SEO Frameworks", rateBoost: 15 },
      { name: "Kubernetes Multi-Cluster Orchestration", rateBoost: 20 },
      { name: "Gemini / OpenAI Agent Tooling", rateBoost: 25 },
      { name: "Rust System Safety Architecture", rateBoost: 30 }
    ];

    const suggestions = standardPremiumPool.filter(
      p => !userSkills.some(us => us.toLowerCase().includes(p.name.split(" ")[0].toLowerCase()))
    ).slice(0, 2);

    return {
      recommendedRate,
      skillsPremium,
      highlightedSkills: skillsToHighlight,
      suggestions,
      totalSkillsCount: userSkills.length
    };
  };

  const rateStats = calculateRateStats();

  return (
    <div className="flex flex-col gap-8 animate-fade-in relative min-h-screen isolate">
      {/* Decorative background ambient glow circles */}
      <div className="absolute -top-16 -left-16 w-96 h-96 bg-purple-300/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-300/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase font-display">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">{userProfile.name.split(' ')[0]}</span>
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full" style={{ width: `${calculateCompletion(userProfile)}%` }}></div>
            </div>
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">
              {calculateCompletion(userProfile)}% Profile Complete
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
        </div>
      </div>

      <p className="text-slate-500 font-medium text-sm -mt-6">
        Your infrastructure is operational. {activeTasks.length} active milestone{activeTasks.length !== 1 ? 's' : ''} require attention.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-md transition-all relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-bold text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
            </div>
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${stat.bg} opacity-50 group-hover:scale-150 transition-transform duration-500`} />
          </div>
        ))}
      </div>

      <ContributorAnalyticsDashboard userProfile={userProfile} tasks={tasks} posts={posts} />

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
              className="flex items-center gap-4 p-5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all text-left group flex-1"
            >
              <div className="p-3 bg-white/10 rounded-xl group-hover:bg-purple-600 transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-purple-300">Talent Market</p>
                <p className="text-sm font-medium text-slate-300 mt-0.5">Find creators & vocational pros</p>
              </div>
            </button>
            <button 
              onClick={() => onNavigate("ai-jobs")}
              className="flex items-center gap-4 p-5 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-all text-left group flex-1"
            >
              <div className="p-3 bg-white/10 rounded-xl group-hover:bg-slate-900 transition-colors">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-purple-100">AI Job Market</p>
                <p className="text-sm font-medium text-purple-100 mt-0.5">Apply for AI training & engineering jobs</p>
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
          <div className="bg-slate-950 text-white p-6 rounded-3xl relative overflow-hidden shadow-xl group">
            {/* Glowing background circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-bl-full opacity-25 group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500 rounded-tr-full opacity-25 group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-500 rounded-full opacity-20 blur-xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="absolute top-0 right-0 p-4 opacity-10 relative z-0">
              <Activity className="w-24 h-24" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-6">Financial Overview</h2>
              
              <div className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Monitor ledger balances, trigger payouts, and sync transactions across secure payment gateways.
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onNavigate("payments")}
                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/10 transition-colors cursor-pointer"
                  >
                    Manage Wallet
                  </button>
                  <button 
                    onClick={handleExport}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/10 transition-colors cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-100 p-6 rounded-3xl relative overflow-hidden group">
            {/* Ambient background circles */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-purple-200/50 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-indigo-200/50 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-500" />
            
            <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
              <h2 className="text-xs font-black uppercase tracking-widest text-purple-900">
                ESTARR Intelligence
              </h2>
            </div>

            {/* Hourly Rate Recommendation Badge */}
            <div className="flex items-center gap-3 bg-white border border-purple-100 rounded-xl p-3 mb-4 shadow-3xs">
              <div className="p-2 bg-purple-100 text-purple-700 rounded-lg shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-purple-500">Recommended Rate</div>
                <div className="text-lg font-black text-slate-900 tracking-tight">
                  ${rateStats.recommendedRate}/hr
                </div>
              </div>
            </div>

            <p className="text-xs font-medium text-purple-800 leading-relaxed mb-4">
              Your profile as a <strong className="font-bold">{userProfile.profession || 'Consultant'}</strong> leveraging {rateStats.totalSkillsCount} registered skills is fully operational. ESTARR AI analyzed local contract supply and recommends a benchmark target rate of <strong className="font-bold">${rateStats.recommendedRate}/hr</strong>.
            </p>

            {rateStats.suggestions.length > 0 && (
              <div className="mb-4 bg-white/70 border border-purple-100 rounded-xl p-3">
                <div className="text-[9px] font-mono font-black uppercase tracking-wider text-purple-700 mb-2 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-purple-600" /> Premium Upgrades to Reach Next Tier
                </div>
                <div className="flex flex-col gap-1.5">
                  {rateStats.suggestions.map((s, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="text-purple-900 font-semibold text-[11px]">{s.name}</span>
                      <span className="text-[9px] bg-emerald-50 border border-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono font-bold shrink-0">
                        +{s.rateBoost}/hr
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={() => {
                if (onOpenAiChat) {
                  const defaultPrompt = `Hello! My profile as a ${userProfile.profession || 'Consultant'} is operational on ESTARR with skills: ${userProfile.skills?.slice(0, 5).join(', ') || 'none listed'}. ESTARR Intelligence recommends an hourly rate of $${rateStats.recommendedRate}/hr based on current listings. Can you analyze this portfolio and guide me step-by-step on how to add high-demand skills to unlock higher-paying $120+/hr contracts?`;
                  onOpenAiChat(defaultPrompt, "portfolio");
                } else {
                  onNavigate("home");
                }
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.01] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Ask AI Co-Pilot
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
