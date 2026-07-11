import React, { useState } from "react";
import { UserProfile } from "../types";
import { AILabClientSection } from "./AILabClientSection";
import { PageBanner } from "./PageBanner";
import { tasks as importedTasks } from "../data";
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
  Info
} from "lucide-react";

interface AILabSectionProps {
  userProfile: UserProfile;
}

export const AILabSection: React.FC<AILabSectionProps> = ({ userProfile }) => {
  if (userProfile?.accountType === "jobOwner") {
    return <AILabClientSection userProfile={userProfile} />;
  }

  const [activeTab, setActiveTab] = useState("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minReward, setMinReward] = useState(0);
  const categories = ["All", "Software", "ML, Data & AI", "Business", "Finance", "Audio Transcription", "Image Labeling", "Text Analysis", "Survey"];
  const [activeTask, setActiveTask] = useState<any>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [applicationStatus, setApplicationStatus] = useState<Record<string, 'pending' | 'accepted'>>({});

  const filteredTasks = importedTasks.filter(t => 
    !completedTasks.includes(t.id) && 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
    (selectedCategory === "All" || t.category === selectedCategory) &&
    t.reward >= minReward
  );

  const potentialEarnings = filteredTasks.reduce((acc, t) => acc + t.reward, 0);

  const handleApply = (taskId: string) => {
    const task = importedTasks.find(t => t.id === taskId);
    setApplicationStatus(prev => ({ ...prev, [taskId]: 'pending' }));
    
    if (task?.autoApprove) {
      setTimeout(() => {
        setApplicationStatus(prev => ({ ...prev, [taskId]: 'accepted' }));
      }, 2000);
    }
  };
  const [taskResponses, setTaskResponses] = useState<any>({});

  const oldTasks = [
    {
      id: "hit-001",
      title: "Evaluate LLM Response Helpfulness (RLHF)",
      requester: "ESTARR Labs",
      reward: 1.50,
      baseRate: 1.00,
      bonus: 0.50,
      timeEstimate: "5 mins",
      type: "RLHF",
      category: "Text Analysis",
      icon: MessageSquare,
      color: "text-purple-600",
      bg: "bg-purple-100",
      description: "Read a prompt and two AI responses. Rate which response is more helpful, harmless, and honest.",
      progress: 40,
      autoApprove: true
    },
    {
      id: "hit-002",
      title: "Categorize Code Snippet Vulnerabilities",
      codeSnippet: "function authenticateUser(req, res) {\n  const query = 'SELECT * FROM users WHERE username = ' + req.body.username + ' AND password = ' + req.body.password;\n  db.execute(query);\n}",
      language: "javascript",
      requester: "SecurityAI Inc",
      reward: 3.00,
      baseRate: 2.00,
      bonus: 1.00,
      timeEstimate: "10 mins",
      type: "Annotation",
      category: "Text Analysis",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-100",
      description: "Review Python and JavaScript code snippets and classify potential security vulnerabilities.",
      progress: 15,
      autoApprove: true
    },
    {
      id: "hit-003",
      title: "AI Audio Transcription Verification",
      requester: "VoiceTech Data",
      reward: 0.75,
      baseRate: 0.50,
      bonus: 0.25,
      timeEstimate: "2 mins",
      type: "Validation",
      category: "Audio Transcription",
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-100",
      description: "Listen to a 10-second audio clip and correct any errors in the AI-generated transcription.",
      progress: 80,
      autoApprove: true,
      audioUrl: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
    },
    {
      id: "hit-004",
      title: "Rate Generated Image Quality",
      requester: "Visionary ML",
      reward: 0.50,
      baseRate: 0.40,
      bonus: 0.10,
      timeEstimate: "1 min",
      type: "RLHF",
      category: "Image Labeling",
      icon: ImageIcon,
      color: "text-rose-600",
      bg: "bg-rose-100",
      description: "Look at AI-generated images and rate them on a scale of 1-5 for photorealism and prompt alignment.",
      progress: 5,
      autoApprove: true
    },
    {
      id: "hit-005",
      title: "Developer Experience Tech Stack Poll",
      requester: "ESTARR Research",
      reward: 2.00,
      baseRate: 1.50,
      bonus: 0.50,
      timeEstimate: "4 mins",
      type: "Survey",
      category: "Survey",
      icon: BarChart3,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      description: "Answer a 10-question multiple choice survey regarding your preferred tech stacks and deployment tools.",
      progress: 70,
      autoApprove: true
    },
    {
      id: "hit-006",
      title: "AI Quality Analyst (Personalization) - Japanese",
      requester: "Global AI Insights",
      reward: 150.00,
      baseRate: 120.00,
      bonus: 30.00,
      timeEstimate: "4 hours",
      type: "Validation",
      category: "ML, Data & AI",
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
      description: "Evaluate AI personalization quality using your personal experiences and insights.",
      progress: 0,
      autoApprove: false
    },
    {
      id: "hit-007",
      title: "Video Content Creator (US based)",
      requester: "Visuals Inc",
      reward: 150.00,
      baseRate: 100.00,
      bonus: 50.00,
      timeEstimate: "2 days",
      type: "Content Creation",
      category: "ML, Data & AI",
      icon: ImageIcon,
      color: "text-blue-600",
      bg: "bg-blue-100",
      description: "Create engaging walk-and-talk videos showcasing local public spaces.",
      progress: 0,
      autoApprove: false
    },
    {
      id: "hit-008",
      title: "LLM Trainer - Agent Function call",
      requester: "ESTARR Labs",
      reward: 150.00,
      baseRate: 150.00,
      bonus: 0.00,
      timeEstimate: "1 day",
      type: "RLHF",
      category: "ML, Data & AI",
      icon: MessageSquare,
      color: "text-purple-600",
      bg: "bg-purple-100",
      description: "Craft multi-turn dialogues to enhance AI assistant interactions.",
      progress: 0,
      autoApprove: true
    },
    {
      id: "hit-009",
      title: "Azure DevOps Engineer(LangGraph)",
      requester: "CloudScale",
      reward: 150.00,
      baseRate: 150.00,
      bonus: 0.00,
      timeEstimate: "1 day",
      type: "Engineering",
      category: "Software",
      icon: AlertCircle,
      color: "text-cyan-600",
      bg: "bg-cyan-100",
      description: "Build and optimize CI/CD pipelines for AI applications on Azure.",
      progress: 0,
      autoApprove: false
    },
    {
      id: "hit-010",
      title: "Dockerfile Data Validation Engineer",
      requester: "DataFlow Systems",
      reward: 150.00,
      baseRate: 125.00,
      bonus: 25.00,
      timeEstimate: "1 day",
      type: "Engineering",
      category: "Software",
      icon: CheckCircle,
      color: "text-teal-600",
      bg: "bg-teal-100",
      description: "Create and manage data-validation workflows in Docker-based build pipelines.",
      progress: 0
    },
    {
      id: "hit-011",
      title: "Software Engineer - AI Code Evaluation & Benchmarking (US candidates only)",
      requester: "ESTARR Labs",
      reward: 250.00,
      baseRate: 200.00,
      bonus: 50.00,
      timeEstimate: "2 days",
      type: "Evaluation",
      category: "Software",
      icon: Award,
      color: "text-rose-600",
      bg: "bg-rose-100",
      description: "Evaluate and improve AI-generated code for accuracy and quality.",
      progress: 0
    },
    {
      id: "hit-012",
      title: "Business Analyst (Finance)",
      requester: "FinTech Solutions",
      reward: 150.00,
      baseRate: 150.00,
      bonus: 0.00,
      timeEstimate: "1 day",
      type: "Analysis",
      category: "Finance",
      icon: BarChart3,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      description: "Evaluate finance model outputs and identify performance gaps.",
      progress: 0
    },
    {
      id: "hit-013",
      title: "JavaScript / TypeScript Full-Stack Developer",
      requester: "WebAI",
      reward: 150.00,
      baseRate: 120.00,
      bonus: 30.00,
      timeEstimate: "1 day",
      type: "Engineering",
      category: "Software",
      icon: FileText,
      color: "text-amber-600",
      bg: "bg-amber-100",
      description: "Develop and maintain high-quality JavaScript/TypeScript code for AI solutions.",
      progress: 0
    },
    {
      id: "hit-014",
      title: "Python + Full-Stack (JS) Developer",
      requester: "AI Innovators",
      reward: 150.00,
      baseRate: 130.00,
      bonus: 20.00,
      timeEstimate: "1 day",
      type: "Engineering",
      category: "Software",
      icon: FileText,
      color: "text-fuchsia-600",
      bg: "bg-fuchsia-100",
      description: "Develop and maintain high-quality code for AI model training and optimization.",
      progress: 0
    },
    {
      id: "hit-015",
      title: "Python Machine Learning Engineer",
      requester: "DeepMindful",
      reward: 150.00,
      baseRate: 150.00,
      bonus: 0.00,
      timeEstimate: "1 day",
      type: "Engineering",
      category: "ML, Data & AI",
      icon: BrainCircuit,
      color: "text-violet-600",
      bg: "bg-violet-100",
      description: "Own end-to-end development of machine learning solutions for business needs.",
      progress: 0
    },
    {
      id: "hit-016",
      title: "AI Quality Analyst - English",
      requester: "Global AI Insights",
      reward: 150.00,
      baseRate: 120.00,
      bonus: 30.00,
      timeEstimate: "4 hours",
      type: "Validation",
      category: "ML, Data & AI",
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
      description: "Evaluate AI personalization quality using your personal experiences and insights.",
      progress: 0
    },
    {
      id: "hit-017",
      title: "Spanish Voice Actors (Studio-Grade Recording Experience)",
      requester: "LinguaTech",
      reward: 100.00,
      baseRate: 80.00,
      bonus: 20.00,
      timeEstimate: "3 hours",
      type: "Content Creation",
      category: "Audio Transcription",
      icon: AlertCircle,
      color: "text-orange-600",
      bg: "bg-orange-100",
      description: "Record engaging Spanish voice-overs for diverse projects from your studio.",
      progress: 0
    }
  ];

  
  if (activeTask) {
    return (
      <div className="flex flex-col gap-6 animate-fade-in pb-16 max-w-3xl mx-auto w-full">
        <button onClick={() => setActiveTask(null)} className="text-slate-500 hover:text-slate-900 text-sm font-bold flex items-center gap-2 mr-auto">
           &larr; Back to Dashboard
        </button>
        
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
             <div className={`p-4 rounded-2xl shrink-0 ${activeTask.bg} ${activeTask.color}`}>
                <activeTask.icon className="w-8 h-8" />
             </div>
             <div>
               <h2 className="text-2xl font-black text-slate-900">{activeTask.title}</h2>
               <div className="text-sm text-slate-500">{activeTask.requester} &bull; Reward: <span className="text-emerald-600 font-bold">${activeTask.reward.toFixed(2)}</span>
                <div className="relative inline-block ml-2 group align-middle">
                  <Info className="w-4 h-4 text-slate-400 cursor-help" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">Base Rate:</span>
                      <span className="font-bold">${activeTask.baseRate.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Perf. Bonus:</span>
                      <span className="font-bold text-emerald-400">+${activeTask.bonus.toFixed(2)}</span>
                    </div>
                    <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                </div></div>
             </div>
          </div>
          
          
          <div className="prose prose-slate max-w-none text-sm mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Instructions</h3>
            <p className="text-slate-600">{activeTask.description}</p>
          </div>

          {(activeTask.audioUrl || activeTask.category === "Audio Transcription") && (
            <div className="mb-8 bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                 <AlertCircle className="w-4 h-4 text-amber-500" /> Source Audio
              </div>
              <audio 
                controls 
                className="w-full" 
                src={activeTask.audioUrl || "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"} 
              />
            </div>
          )}

          {activeTask.codeSnippet && (
            <div className="mb-8">
              <div className="flex justify-between items-center bg-slate-800 text-slate-400 px-4 py-2 rounded-t-xl text-xs font-mono">
                <span>{activeTask.language || 'code'}</span>
              </div>
              <pre className="bg-slate-900 text-slate-300 p-4 rounded-b-xl overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                {activeTask.codeSnippet}
              </pre>
            </div>
          )}


          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
            {activeTask.type === "RLHF" && (
               <div className="space-y-4">
                 <p className="font-bold text-slate-900">Which response is better?</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={() => setTaskResponses({...taskResponses, [activeTask.id]: 'A'})}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${taskResponses[activeTask.id] === 'A' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}`}
                    >
                      <span className="font-bold block mb-2 text-slate-900">Response A</span>
                      <p className="text-xs text-slate-600">The sky is blue because of a phenomenon called Rayleigh scattering, which scatters sunlight in all directions.</p>
                    </button>
                    <button 
                      onClick={() => setTaskResponses({...taskResponses, [activeTask.id]: 'B'})}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${taskResponses[activeTask.id] === 'B' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}`}
                    >
                      <span className="font-bold block mb-2 text-slate-900">Response B</span>
                      <p className="text-xs text-slate-600">It's blue because water from the ocean reflects into the sky.</p>
                    </button>
                 </div>
               </div>
            )}
            
            
            {activeTask.type === "Annotation" && (
               <div className="space-y-4">
                 <p className="font-bold text-slate-900">Select Vulnerability Type</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={() => setTaskResponses({...taskResponses, [activeTask.id]: 'SQLi'})}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${taskResponses[activeTask.id] === 'SQLi' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}`}
                    >
                      <span className="font-bold block text-slate-900">SQL Injection</span>
                    </button>
                    <button 
                      onClick={() => setTaskResponses({...taskResponses, [activeTask.id]: 'XSS'})}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${taskResponses[activeTask.id] === 'XSS' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}`}
                    >
                      <span className="font-bold block text-slate-900">Cross-Site Scripting (XSS)</span>
                    </button>
                    <button 
                      onClick={() => setTaskResponses({...taskResponses, [activeTask.id]: 'CSRF'})}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${taskResponses[activeTask.id] === 'CSRF' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}`}
                    >
                      <span className="font-bold block text-slate-900">CSRF</span>
                    </button>
                    <button 
                      onClick={() => setTaskResponses({...taskResponses, [activeTask.id]: 'None'})}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${taskResponses[activeTask.id] === 'None' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}`}
                    >
                      <span className="font-bold block text-slate-900">No Vulnerability</span>
                    </button>
                 </div>
               </div>
            )}

            {activeTask.type !== "RLHF" && activeTask.type !== "Annotation" && (
               <div className="space-y-4">
                 <p className="font-bold text-slate-900">Your Answer / Findings</p>
                 <textarea 
                   className="w-full h-32 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-purple-500" 
                   placeholder="Enter your detailed feedback here..."
                   value={taskResponses[activeTask.id] || ''}
                   onChange={e => setTaskResponses({...taskResponses, [activeTask.id]: e.target.value})}
                 ></textarea>
               </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button 
              onClick={() => setActiveTask(null)}
              className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                setCompletedTasks([...completedTasks, activeTask.id]);
                setActiveTask(null);
                alert("Task submitted successfully! Reward will be credited to your account after review.");
              }}
              disabled={!taskResponses[activeTask.id]}
              className="px-6 py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Task
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-16 max-w-7xl mx-auto w-full px-4">
      <div className="mb-2 mt-4">
        <h1 className="text-3xl font-black text-slate-900 mb-6">Explore roles</h1>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab("available")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors whitespace-nowrap ${activeTab === "available" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
            >
              Available Roles
            </button>
            <button 
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors whitespace-nowrap ${activeTab === "history" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
            >
              Work History
            </button>
          </div>
          
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1">
             <div className="px-4 py-2 text-xs font-bold text-slate-500 border-r border-slate-100">Potential Earnings: <span className="text-emerald-600">${potentialEarnings.toFixed(2)}</span></div>
             <select 
               className="px-4 py-2 text-xs font-bold text-slate-700 bg-transparent focus:outline-none"
               value={minReward}
               onChange={(e) => setMinReward(Number(e.target.value))}
             >
               <option value={0}>Any Reward</option>
               <option value={1}>$1+</option>
               <option value={10}>$10+</option>
               <option value={100}>$100+</option>
             </select>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search roles or skills..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:border-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
             <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full">
               All <span className="bg-slate-700 px-1.5 py-0.5 rounded text-xs">{filteredTasks.length}</span>
             </button>
             <button className="flex items-center gap-2 hover:text-slate-900 transition-colors">
               Priority <span className="bg-slate-100 px-1.5 py-0.5 rounded text-xs text-slate-400">3</span>
             </button>
             <button className="flex items-center gap-2 hover:text-slate-900 transition-colors">
               Newest <span className="bg-slate-100 px-1.5 py-0.5 rounded text-xs text-slate-400">6</span>
             </button>
          </div>
        </div>

        <div className="flex overflow-x-auto scrollbar-none gap-2 pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {activeTab === "available" ? (
          filteredTasks.map(task => (
            <div key={task.id} className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col justify-between group h-full min-h-[220px]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold">
                    <Award className="w-3.5 h-3.5" /> Priority
                  </div>
                  <div className="relative group/tooltip">
                    <div className="flex items-center gap-1.5 text-white bg-blue-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      <DollarSign className="w-3.5 h-3.5" /> {task.reward.toFixed(0)}
                    </div>
                    <div className="absolute right-0 bottom-full mb-2 w-40 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 text-left">
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">Base Rate:</span>
                        <span className="font-bold">${task.baseRate.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Perf. Bonus:</span>
                        <span className="font-bold text-emerald-400">+${task.bonus.toFixed(2)}</span>
                      </div>
                      <div className="absolute right-4 -bottom-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-3 line-clamp-2 leading-tight">{task.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">{task.description}</p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                {applicationStatus[task.id] !== 'accepted' ? (
                  <button 
                    onClick={() => handleApply(task.id)}
                    disabled={applicationStatus[task.id] === 'pending'}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${applicationStatus[task.id] === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    {applicationStatus[task.id] === 'pending' ? 'Application Under Review...' : 'Apply to Qualify'}
                  </button>
                ) : (
                  <button 
                    onClick={() => setActiveTask(task)} 
                    className="w-full bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
                  >
                    {applicationStatus[task.id] === 'accepted' ? 'Approved - Start Task' : (task.progress > 0 ? "Resume Work" : "Accept & Go to AI Lab")}
                  </button>
                )}
              </div>
            </div>
          ))
        
        ) : (
          <div className="col-span-full">
            {importedTasks.filter(t => completedTasks.includes(t.id)).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {importedTasks.filter(t => completedTasks.includes(t.id)).map(task => (
                  <div key={task.id} className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between h-full min-h-[220px]">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 mb-3 line-clamp-2 leading-tight">{task.title}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-bold text-slate-600">Completed</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-500">Reward Earned:</span>
                      <span className="font-black text-emerald-600">${task.reward.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center text-slate-500">
                <CheckCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="font-bold text-slate-900 text-lg mb-1">No recent work history</p>
                <p className="text-sm">Complete some available roles to see them here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};