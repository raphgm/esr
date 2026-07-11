import React, { useState } from "react";
import { UserProfile } from "../types";
import { PageBanner } from "./PageBanner";
import { 
  BrainCircuit, 
  Search, 
  Filter, 
  Clock, 
  DollarSign, 
  Award, 
  CheckCircle,
  AlertCircle,
  FileText,
  BarChart3,
  MessageSquare,
  Image as ImageIcon,
  Info,
  Plus,
  Users,
  Briefcase,
  Check,
  X,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  Sparkles,
  MapPin,
  ChevronRight,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import confetti from "canvas-confetti";

interface AILabClientSectionProps {
  userProfile: UserProfile;
}

export const AILabClientSection: React.FC<AILabClientSectionProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newTask, setNewTask] = useState<any>({
    title: "",
    description: "",
    reward: 150,
    baseRate: 120,
    bonus: 30,
    timeEstimate: "1 day",
    type: "Engineering",
    category: "Software",
    autoApprove: false
  });

  const [clientTasks, setClientTasks] = useState<any[]>([
    {
      id: "hit-006",
      title: "AI Quality Analyst (Personalization) - Japanese",
      reward: 150.00,
      baseRate: 120.00,
      bonus: 30.00,
      timeEstimate: "4 hours",
      type: "Validation",
      category: "ML, Data & AI",
      status: "Active",
      applications: 12,
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
      description: "Evaluate AI personalization quality using your personal experiences and insights."
    },
    {
      id: "hit-011",
      title: "Software Engineer - AI Code Evaluation & Benchmarking (US candidates only)",
      reward: 250.00,
      baseRate: 200.00,
      bonus: 50.00,
      timeEstimate: "2 days",
      type: "Evaluation",
      category: "Software",
      status: "Active",
      applications: 45,
      icon: Award,
      color: "text-rose-600",
      bg: "bg-rose-100",
      description: "Evaluate and improve AI-generated code for accuracy and quality."
    }
  ]);

  const [activeTask, setActiveTask] = useState<any>(null);

  const [applicantsState, setApplicantsState] = useState<Record<string, any[]>>({
    "hit-006": [
      {
        id: "app-001",
        name: "Haruto Sato",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        location: "Tokyo, Japan",
        appliedTime: "2 hours ago",
        matchScore: 98,
        bio: "Native Japanese content specialist with 4+ years of experience training and tuning LLMs for local nuances and safety protocols.",
        skills: ["Native Japanese", "RLHF Evaluation", "Translation QA", "Prompt Engineering"],
        qualifications: [
          { label: "Language Proficiency", status: "pass", detail: "Native speaker based in Tokyo, Japan." },
          { label: "AI Annotation Experience", status: "pass", detail: "Completed 1,200+ RLHF evaluations with 99.4% precision." },
          { label: "Technical Comprehension", status: "pass", detail: "Scored high on Japanese reasoning & idiom test." }
        ],
        verdict: "qualified",
        verdictReason: "Perfect fit. Haruto has extensive direct experience with LLM alignment and meets all language/geographic requirements.",
        status: "pending"
      },
      {
        id: "app-002",
        name: "Yuki Tanaka",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        location: "Osaka, Japan",
        appliedTime: "3 hours ago",
        matchScore: 91,
        bio: "Bilingual copywriter and language tutor passionate about AI voice agents and conversational UI validation.",
        skills: ["Bilingual (EN/JA)", "Creative Writing", "Quality Assurance"],
        qualifications: [
          { label: "Language Proficiency", status: "pass", detail: "Native speaker based in Osaka." },
          { label: "AI Annotation Experience", status: "warning", detail: "Familiar with QA but new to RLHF framework." },
          { label: "Technical Comprehension", status: "pass", detail: "Passed communication and instructions check." }
        ],
        verdict: "partially",
        verdictReason: "Highly qualified in linguistics and translation, but will require brief onboarding for RLHF evaluation specifics.",
        status: "pending"
      },
      {
        id: "app-003",
        name: "Alex Mercer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        location: "Seattle, WA, US",
        appliedTime: "5 hours ago",
        matchScore: 45,
        bio: "Full-stack developer focused on React and Python. Looking for side-gigs in AI benchmarking.",
        skills: ["Python", "TypeScript", "Docker"],
        qualifications: [
          { label: "Language Proficiency", status: "fail", detail: "Limited Japanese understanding (N5 equivalent)." },
          { label: "AI Annotation Experience", status: "pass", detail: "Experienced software evaluation builder." },
          { label: "Technical Comprehension", status: "pass", detail: "Excellent logical skills." }
        ],
        verdict: "unqualified",
        verdictReason: "Not qualified. Does not meet the strict native Japanese speaker requirement needed for this localization task.",
        status: "pending"
      }
    ],
    "hit-011": [
      {
        id: "app-011",
        name: "Alex Mercer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        location: "Seattle, WA, US",
        appliedTime: "1 hour ago",
        matchScore: 97,
        bio: "Full-stack engineer with 5 years of software development experience. High proficiency in writing test suites, evaluating edge cases, and benchmarking code generation tools.",
        skills: ["Python", "TypeScript", "React", "Jest/PyTest", "CI/CD"],
        qualifications: [
          { label: "US Residency", status: "pass", detail: "Verified resident in Seattle, WA." },
          { label: "Coding Benchmark Test", status: "pass", detail: "Scored 100/100 on code reasoning evaluation test." },
          { label: "Security & Confidentiality", status: "pass", detail: "Completed ESTARR identity check and NDA." }
        ],
        verdict: "qualified",
        verdictReason: "Highly recommended. Perfect match for the US residency requirement and has advanced system benchmarking skills.",
        status: "pending"
      },
      {
        id: "app-012",
        name: "Jordan Vance",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        location: "Austin, TX, US",
        appliedTime: "2 hours ago",
        matchScore: 95,
        bio: "ML engineer focused on code generation pipelines and model evaluations. Experienced in constructing benchmarking sets.",
        skills: ["Python", "PyTorch", "LLM Fine-tuning", "GitHub Actions"],
        qualifications: [
          { label: "US Residency", status: "pass", detail: "Verified resident in Austin, TX." },
          { label: "Coding Benchmark Test", status: "pass", detail: "Scored 94/100 on code reasoning test." },
          { label: "Security & Confidentiality", status: "pass", detail: "Completed NDA verification." }
        ],
        verdict: "qualified",
        verdictReason: "Highly qualified. Strong background in ML and LLM evaluations with proven benchmarking experience.",
        status: "pending"
      },
      {
        id: "app-013",
        name: "Mei-Ling Chen",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        location: "Singapore",
        appliedTime: "4 hours ago",
        matchScore: 68,
        bio: "Data Analyst specializing in software QA and translation testing.",
        skills: ["Python", "SQL", "Manual QA"],
        qualifications: [
          { label: "US Residency", status: "fail", detail: "Based in Singapore (does not meet US candidate only requirement)." },
          { label: "Coding Benchmark Test", status: "pass", detail: "Scored 85/100 on coding test." },
          { label: "Security & Confidentiality", status: "pass", detail: "Completed verification." }
        ],
        verdict: "unqualified",
        verdictReason: "Not qualified. Fails the geographic constraint (US candidates only).",
        status: "pending"
      }
    ]
  });

  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);
  const [evalStep, setEvalStep] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const getApplicantsForTask = (taskId: string, taskTitle: string, taskCategory: string) => {
    if (applicantsState[taskId]) {
      return applicantsState[taskId];
    }
    const isUSOnly = taskTitle.toLowerCase().includes("us only") || taskTitle.toLowerCase().includes("united states");
    const isJapanese = taskTitle.toLowerCase().includes("japanese") || taskTitle.toLowerCase().includes("japan");
    
    return [
      {
        id: `app-dyn-1-${taskId}`,
        name: "Aidan Gallagher",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
        location: isUSOnly ? "Boston, MA, US" : "London, UK",
        appliedTime: "1 hour ago",
        matchScore: 96,
        bio: `Professional specialist with over 3 years in ${taskCategory || "AI evaluation"}. Highly dedicated to delivering accurate, clean work.`,
        skills: [taskCategory || "AI Training", "Quality Control", "Problem Solving"],
        qualifications: [
          { label: "Core Skills Match", status: "pass", detail: "Demonstrated advanced proficiency in required domain." },
          { label: "Past Task Rating", status: "pass", detail: "Maintained 4.9/5 stars over past 45 assignments." },
          { label: "Target Region Match", status: isUSOnly ? "pass" : "warning", detail: isUSOnly ? "Verified US candidate" : "Based in London, UK" }
        ],
        verdict: "qualified",
        verdictReason: `Exceptional match for ${taskTitle}. High technical test scores and strong record.`,
        status: "pending"
      },
      {
        id: `app-dyn-2-${taskId}`,
        name: "Siddharth Nair",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
        location: "Bangalore, India",
        appliedTime: "3 hours ago",
        matchScore: 82,
        bio: `Data analyst and software engineer with experience annotating datasets and reviewing custom workflows.`,
        skills: ["Data Analysis", "Python", "Technical Writing"],
        qualifications: [
          { label: "Core Skills Match", status: "pass", detail: "Possesses necessary skills and quick learning capabilities." },
          { label: "Past Task Rating", status: "pass", detail: "Consistent solid reviews on previous crowd tasks." },
          { label: "Target Region Match", status: isUSOnly ? "fail" : "pass", detail: isUSOnly ? "Located in Bangalore (failed US restriction)" : "Passed regional check" }
        ],
        verdict: isUSOnly ? "unqualified" : "partially",
        verdictReason: isUSOnly 
          ? "Fails geographic constraint (US candidates only)." 
          : "Partially matches. Siddharth has strong technical skills but has moderate specific domain experience.",
        status: "pending"
      },
      {
        id: `app-dyn-3-${taskId}`,
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
        location: "San Francisco, CA, US",
        appliedTime: "4 hours ago",
        matchScore: 92,
        bio: `Linguistic annotator and validation researcher with background in semantic analysis and translation.`,
        skills: ["Validation", "Linguistics", "Data Quality"],
        qualifications: [
          { label: "Core Skills Match", status: "pass", detail: "Demonstrated capability in linguistic processing." },
          { label: "Past Task Rating", status: "pass", detail: "Maintained 4.8/5 stars over past 20 assignments." },
          { label: "Target Region Match", status: "pass", detail: "Verified US resident in San Francisco." }
        ],
        verdict: "qualified",
        verdictReason: `Highly qualified specialist with clean background record and proven quality score.`,
        status: "pending"
      }
    ];
  };

  const updateApplicantStatus = (taskId: string, applicantId: string, newStatus: "accepted" | "rejected") => {
    const list = applicantsState[taskId] || getApplicantsForTask(taskId, activeTask.title, activeTask.category);
    const updatedList = list.map(app => {
      if (app.id === applicantId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    setApplicantsState(prev => ({
      ...prev,
      [taskId]: updatedList
    }));

    if (newStatus === "accepted") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleViewProfile = (applicant: any) => {
    setSelectedApplicant(applicant);
    setIsEvaluating(true);
    setEvalStep(0);
    
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setEvalStep(step);
      if (step >= 4) {
        clearInterval(interval);
        setIsEvaluating(false);
      }
    }, 600);
  };

  const handleCreate = () => {
    if (!newTask.title) return;
    const taskToAdd = {
      ...newTask,
      id: `hit-${Date.now()}`,
      status: "Active",
      applications: 0,
      icon: BrainCircuit,
      color: "text-blue-600",
      bg: "bg-blue-100",
    };
    setClientTasks([taskToAdd, ...clientTasks]);
    setIsCreating(false);
    setNewTask({
      title: "",
      description: "",
      reward: 150,
      baseRate: 120,
      bonus: 30,
      timeEstimate: "1 day",
      type: "Engineering",
      category: "Software",
      autoApprove: false
    });
  };

  const categories = ["Software", "ML, Data & AI", "Business", "Finance", "Audio Transcription", "Image Labeling", "Text Analysis", "Survey"];
  const taskTypes = ["RLHF", "Annotation", "Validation", "Content Creation", "Engineering", "Evaluation", "Analysis", "Survey"];

  if (activeTask) {
    return (
      <div className="flex flex-col gap-6 animate-fade-in pb-16 max-w-5xl mx-auto w-full">
        <button onClick={() => setActiveTask(null)} className="text-slate-500 hover:text-slate-900 text-sm font-bold flex items-center gap-2 mr-auto">
           &larr; Back to Tasks
        </button>
        
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
             <div className={`p-4 rounded-2xl shrink-0 ${activeTask.bg} ${activeTask.color}`}>
                <activeTask.icon className="w-8 h-8" />
             </div>
             <div>
               <h2 className="text-2xl font-black text-slate-900">{activeTask.title}</h2>
               <div className="text-sm text-slate-500 mt-1 flex items-center gap-4">
                 <span><DollarSign className="inline w-4 h-4 text-emerald-500" /> Reward: ${activeTask.reward.toFixed(2)}</span>
                 <span><Users className="inline w-4 h-4 text-blue-500" /> {activeTask.applications} Applicants</span>
                 <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">{activeTask.status}</span>
               </div>
             </div>
          </div>
          
          <h3 className="text-lg font-bold text-slate-900 mb-4">Review Applications</h3>
          
          {activeTask.applications > 0 ? (
            <div className="space-y-4">
              {(applicantsState[activeTask.id] || getApplicantsForTask(activeTask.id, activeTask.title, activeTask.category)).map((applicant) => (
                <div key={applicant.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-100 shrink-0">
                      <img src={applicant.avatar} alt={applicant.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-slate-900">{applicant.name}</h4>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{applicant.location}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Applied {applicant.appliedTime} &bull; <span className="font-bold text-indigo-600">{applicant.matchScore}% Match Score</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    {applicant.status === "pending" ? (
                      <>
                        <button 
                          onClick={() => handleViewProfile(applicant)}
                          className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          View Profile
                        </button>
                        <button 
                          onClick={() => updateApplicantStatus(activeTask.id, applicant.id, "accepted")}
                          className="px-4 py-2 bg-indigo-600 rounded-xl text-xs font-bold text-white hover:bg-indigo-700 cursor-pointer transition-colors"
                        >
                          Accept
                        </button>
                      </>
                    ) : applicant.status === "accepted" ? (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Hired
                      </span>
                    ) : (
                      <span className="bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1">
                        <X className="w-3.5 h-3.5" /> Declined
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="font-bold text-slate-900">No applications yet</p>
              <p className="text-sm text-slate-500">Applications will appear here once professionals apply.</p>
            </div>
          )}
        </div>

        {/* Interactive Evaluation Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 relative">
              <button 
                onClick={() => setSelectedApplicant(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <BrainCircuit className="w-5 h-5 text-indigo-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-400 font-bold">ESTARR Vetting Protocol</span>
              </div>
              <h3 className="text-xl font-black font-display text-white">AI Qualification Report</h3>
              <p className="text-xs text-slate-400 mt-1">
                Real-time validation protocol for crowd task suitability.
              </p>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto flex-1 flex flex-col gap-6">
              
              {/* VETTING IN PROGRESS VIEW */}
              {isEvaluating ? (
                <div className="flex flex-col items-center justify-center py-8 gap-6 animate-pulse">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* Ring spinning */}
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
                    <BrainCircuit className="w-10 h-10 text-indigo-600 animate-bounce" />
                  </div>
                  
                  <div className="text-center">
                    <h4 className="font-bold text-slate-900 text-base">Running AI Suitability Scan...</h4>
                    <p className="text-xs text-slate-500 mt-1">Analyzing credentials, skills, and background compliance parameters.</p>
                  </div>

                  <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200/60 pb-2">
                      <span className="text-slate-600 font-mono">SCAN PARAMETER</span>
                      <span className="text-indigo-600 font-mono">STATUS</span>
                    </div>

                    {/* Step 1 */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-slate-400" /> Cognitive Profile Audit
                      </span>
                      {evalStep > 0 ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1 font-mono">
                          <Check className="w-3.5 h-3.5" /> OK
                        </span>
                      ) : (
                        <span className="text-indigo-600 font-bold flex items-center gap-1 animate-pulse font-mono">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> RUNNING
                        </span>
                      )}
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 flex items-center gap-2">
                        <Award className="w-4 h-4 text-slate-400" /> Skill Matrix Verification
                      </span>
                      {evalStep > 1 ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1 font-mono">
                          <Check className="w-3.5 h-3.5" /> VERIFIED
                        </span>
                      ) : evalStep === 1 ? (
                        <span className="text-indigo-600 font-bold flex items-center gap-1 animate-pulse font-mono">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> COMPILING
                        </span>
                      ) : (
                        <span className="text-slate-400 font-bold font-mono">PENDING</span>
                      )}
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" /> Regional Boundary Compliance
                      </span>
                      {evalStep > 2 ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1 font-mono">
                          <Check className="w-3.5 h-3.5" /> PASS
                        </span>
                      ) : evalStep === 2 ? (
                        <span className="text-indigo-600 font-bold flex items-center gap-1 animate-pulse font-mono">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> VALIDATING
                        </span>
                      ) : (
                        <span className="text-slate-400 font-bold font-mono">PENDING</span>
                      )}
                    </div>

                    {/* Step 4 */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-slate-400" /> AI Reliability Score
                      </span>
                      {evalStep > 3 ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1 font-mono">
                          <Check className="w-3.5 h-3.5" /> CALCULATED
                        </span>
                      ) : evalStep === 3 ? (
                        <span className="text-indigo-600 font-bold flex items-center gap-1 animate-pulse font-mono">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> MODELING
                        </span>
                      ) : (
                        <span className="text-slate-400 font-bold font-mono">PENDING</span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* COMPLETED EVALUATION REPORT */
                <div className="flex flex-col gap-6 animate-fade-in">
                  
                  {/* Candidate Identity */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500 shadow-sm">
                        <img src={selectedApplicant.avatar} alt={selectedApplicant.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900">{selectedApplicant.name}</h4>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {selectedApplicant.location}
                          </span>
                          <span className="text-xs text-slate-300">&bull;</span>
                          <span className="text-xs text-slate-500">Applied {selectedApplicant.appliedTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center sm:items-end justify-center">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">MATCH SCORE</div>
                      <div className="text-3xl font-black text-indigo-600 mt-1 font-display">{selectedApplicant.matchScore}%</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Candidate Bio</h5>
                    <p className="text-sm text-slate-600 leading-relaxed bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                      {selectedApplicant.bio}
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Key Skillset</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedApplicant.skills.map((skill: string) => (
                        <span key={skill} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Vetting compliance status table */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-mono">Detailed Requirements Evaluation</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {selectedApplicant.qualifications.map((qual: any) => {
                        const statusColors = {
                          pass: "bg-emerald-50 border-emerald-200 text-emerald-800",
                          warning: "bg-amber-50 border-amber-200 text-amber-800",
                          fail: "bg-rose-50 border-rose-200 text-rose-800"
                        };
                        const statusBadge = {
                          pass: <Check className="w-3.5 h-3.5 text-emerald-600" />,
                          warning: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
                          fail: <X className="w-3.5 h-3.5 text-rose-600" />
                        };
                        const classStyle = statusColors[qual.status as 'pass' | 'warning' | 'fail'] || "bg-slate-50 border-slate-200 text-slate-800";
                        const icon = statusBadge[qual.status as 'pass' | 'warning' | 'fail'] || null;

                        return (
                          <div key={qual.label} className={`border p-4 rounded-xl flex flex-col gap-1.5 ${classStyle}`}>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-extrabold uppercase tracking-tight">{qual.label}</span>
                              {icon}
                            </div>
                            <p className="text-[11px] leading-tight opacity-90 mt-1">{qual.detail}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI RECOMMENDATION VERDICT CARD */}
                  <div className={`border p-5 rounded-2xl flex flex-col sm:flex-row gap-4 items-center ${
                    selectedApplicant.verdict === "qualified" ? "bg-emerald-50/50 border-emerald-200" :
                    selectedApplicant.verdict === "partially" ? "bg-amber-50/50 border-amber-200" :
                    "bg-rose-50/50 border-rose-200"
                  }`}>
                    <div className={`p-3 rounded-xl shrink-0 ${
                      selectedApplicant.verdict === "qualified" ? "bg-emerald-100 text-emerald-700" :
                      selectedApplicant.verdict === "partially" ? "bg-amber-100 text-amber-700" :
                      "bg-rose-100 text-rose-700"
                    }`}>
                      {selectedApplicant.verdict === "qualified" ? <ShieldCheck className="w-6 h-6" /> :
                       selectedApplicant.verdict === "partially" ? <AlertTriangle className="w-6 h-6" /> :
                       <ThumbsDown className="w-6 h-6" />}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="text-xs font-black uppercase tracking-widest font-mono text-slate-400">AI Suitability Verdict:</span>
                        <span className={`text-xs font-black uppercase tracking-wider font-mono ${
                          selectedApplicant.verdict === "qualified" ? "text-emerald-700" :
                          selectedApplicant.verdict === "partially" ? "text-amber-700" :
                          "text-rose-700"
                        }`}>
                          {selectedApplicant.verdict === "qualified" ? "RECOMMENDED (PASSED)" :
                           selectedApplicant.verdict === "partially" ? "PROVISIONAL MATCH" :
                           "NOT RECOMMENDED (FAILED)"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                        {selectedApplicant.verdictReason}
                      </p>
                    </div>
                  </div>

                  {/* Actions inside Modal */}
                  <div className="flex justify-end items-center gap-3 border-t border-slate-100 pt-6">
                    <button 
                      onClick={() => setSelectedApplicant(null)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                    >
                      Close Report
                    </button>
                    {selectedApplicant.status === "pending" ? (
                      <>
                        <button 
                          onClick={() => {
                            updateApplicantStatus(activeTask.id, selectedApplicant.id, "rejected");
                            setSelectedApplicant(null);
                          }}
                          className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-100 transition-colors cursor-pointer"
                        >
                          Decline Applicant
                        </button>
                        <button 
                          onClick={() => {
                            updateApplicantStatus(activeTask.id, selectedApplicant.id, "accepted");
                            setSelectedApplicant(prev => ({ ...prev, status: "accepted" }));
                          }}
                          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-100 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" /> Approve & Hire
                        </button>
                      </>
                    ) : selectedApplicant.status === "accepted" ? (
                      <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
                        <Check className="w-4 h-4" /> Hired
                      </span>
                    ) : (
                      <span className="bg-rose-100 text-rose-800 border border-rose-200 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
                        <X className="w-4 h-4" /> Application Declined
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

  if (isCreating) {
    return (
      <div className="flex flex-col gap-6 animate-fade-in pb-16 max-w-3xl mx-auto w-full">
        <button onClick={() => setIsCreating(false)} className="text-slate-500 hover:text-slate-900 text-sm font-bold flex items-center gap-2 mr-auto">
           &larr; Back to Dashboard
        </button>
        
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6 md:p-8">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Post New AI Task</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Task Title</label>
              <input 
                type="text" 
                value={newTask.title}
                onChange={e => setNewTask({...newTask, title: e.target.value})}
                placeholder="e.g. LLM Trainer - Agent Function call"
                className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
              <textarea 
                value={newTask.description}
                onChange={e => setNewTask({...newTask, description: e.target.value})}
                placeholder="Describe the task instructions..."
                className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-500 text-sm h-32"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                <select 
                  value={newTask.category}
                  onChange={e => setNewTask({...newTask, category: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-500 text-sm"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Task Type</label>
                <select 
                  value={newTask.type}
                  onChange={e => setNewTask({...newTask, type: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-500 text-sm"
                >
                  {taskTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {newTask.category === "Audio Transcription" && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Source Audio URL</label>
                <input 
                  type="url" 
                  value={newTask.audioUrl || ""}
                  onChange={e => setNewTask({...newTask, audioUrl: e.target.value})}
                  placeholder="https://example.com/audio.mp3"
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-500 text-sm"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Total Reward ($)</label>
                <input 
                  type="number" 
                  value={newTask.reward}
                  onChange={e => setNewTask({...newTask, reward: parseFloat(e.target.value)})}
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Base Rate ($)</label>
                <input 
                  type="number" 
                  value={newTask.baseRate}
                  onChange={e => setNewTask({...newTask, baseRate: parseFloat(e.target.value)})}
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Perf. Bonus ($)</label>
                <input 
                  type="number" 
                  value={newTask.bonus}
                  onChange={e => setNewTask({...newTask, bonus: parseFloat(e.target.value)})}
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-500 text-sm"
                />
              </div>
            </div>
            
            <div className="flex items-center mt-4">
              <input 
                type="checkbox" 
                id="autoApprove" 
                checked={newTask.autoApprove}
                onChange={e => setNewTask({...newTask, autoApprove: e.target.checked})}
                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="autoApprove" className="ml-2 block text-sm text-slate-700 font-bold cursor-pointer">
                Auto-approve applications
                <span className="block text-xs font-normal text-slate-500">Allow workers to start immediately without manual review.</span>
              </label>
            </div>
            
            <button 
              onClick={handleCreate}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Post AI Task
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-16 max-w-7xl mx-auto w-full px-4">
      <PageBanner
        title="AI Lab Client Dashboard"
        subtitle="ESTARR CROWDWORK"
        description="Create and manage your AI tasks, review applications, and find the perfect crowd workers."
        icon={BrainCircuit}
      />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-500 text-sm">Active Tasks</h3>
          </div>
          <p className="text-3xl font-black text-slate-900">{clientTasks.length}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-500 text-sm">Total Applicants</h3>
          </div>
          <p className="text-3xl font-black text-slate-900">{clientTasks.reduce((acc, t) => acc + t.applications, 0)}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-500 text-sm">Completed</h3>
          </div>
          <p className="text-3xl font-black text-slate-900">0</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-500 text-sm">Total Spend</h3>
          </div>
          <p className="text-3xl font-black text-slate-900">$0.00</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab("active")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === "active" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
            >
              Active Tasks
            </button>
            <button 
              onClick={() => setActiveTab("drafts")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === "drafts" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
            >
              Drafts
            </button>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-colors w-full md:w-auto justify-center"
            >
              <Plus className="w-4 h-4" /> Post AI Task
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {activeTab === "active" ? (
            clientTasks.length > 0 ? (
              clientTasks.map(task => (
                <div key={task.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className={`p-4 rounded-2xl shrink-0 ${task.bg} ${task.color}`}>
                    <task.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-bold">
                        {task.category}
                      </span>
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-bold">
                        {task.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-1 truncate">{task.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-1">{task.description}</p>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2 w-full md:w-auto shrink-0">
                    <div className="text-center md:text-right">
                      <p className="text-xl font-black text-slate-900">${task.reward.toFixed(2)}</p>
                      <p className="text-xs font-bold text-blue-600 flex items-center justify-center md:justify-end gap-1 mt-1">
                        <Users className="w-3 h-3" /> {task.applications} Applicants
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTask(task)} 
                      className="w-full md:w-auto bg-white border border-slate-200 text-slate-900 px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-500">
                <Briefcase className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="font-bold text-slate-900 mb-1">No active tasks</p>
                <p className="text-sm">Create a new task to start finding talent.</p>
              </div>
            )
          ) : (
            <div className="p-12 text-center text-slate-500">
              <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="font-bold text-slate-900 mb-1">No drafts</p>
              <p className="text-sm">You don't have any saved drafts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
