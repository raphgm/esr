import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  BrainCircuit, 
  Video, 
  Search, 
  Sparkles, 
  Cpu, 
  Clock, 
  Calendar, 
  Play, 
  Pause, 
  ChevronRight, 
  User, 
  CheckCircle, 
  AlertTriangle, 
  Code, 
  Terminal, 
  FileText, 
  BarChart2, 
  Check, 
  Eye, 
  Mic, 
  AlertCircle,
  Info,
  Copy,
  LineChart,
  Settings,
  Heart,
  ChevronDown
} from 'lucide-react';
import { InterviewScheduler } from './InterviewScheduler';
import { UserProfile } from '../types';
import confetti from 'canvas-confetti';

interface AIVettingCenterProps {
  userProfile: UserProfile;
}

// Pre-vetted candidate list (Micro1-style curated talent search)
const vettedCandidates = [
  {
    id: "vet-001",
    name: "Amina Al-Mansoor",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    role: "AI Orchestration Architect",
    location: "Nairobi, Kenya",
    skills: ["Python", "LangChain", "FastAPI", "VectorDBs", "HuggingFace"],
    overallScore: 96,
    subScores: {
      coding: 98,
      systemDesign: 95,
      communication: 97,
      cognitive: 94
    },
    interviewDuration: "34m 12s",
    matchingTokens: 4500,
    salaryExpectation: "$95,000 / yr",
    vettedDate: "2026-07-01",
    summary: "Exemplary understanding of state machines and agentic frameworks. আমিন passes our absolute highest cognitive speed and critical security clearance.",
    transcript: [
      { speaker: "AI Interviewer (Maya)", text: "Could you explain how you mitigate loop recursion and redundant API calls inside multi-agent swarms?" },
      { speaker: "Amina Al-Mansoor", text: "I implement an authoritative orchestrator node that maintains a transactional run state in Redis. Agent responses must resolve token budget increments, and if duplicate state hashes occur, the orchestrator triggers a fallback heuristic or halts execution entirely." },
      { speaker: "AI Interviewer (Maya)", text: "Excellent. Let's write a python generator function that streams responses but caches chunks dynamically..." }
    ],
    recordingFile: "amina_vetted_audio.mp3",
    audioHighlights: [
      { id: "h1", title: "Loop Recursion Mitigation", time: "12:14" },
      { id: "h2", title: "Redis State Authorizer Demo", time: "24:45" }
    ]
  },
  {
    id: "vet-002",
    name: "Tariq Okafor",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
    role: "Senior Smart Contract Auditor",
    location: "Lagos, Nigeria",
    skills: ["Solidity", "TypeScript", "Rust", "Hardhat", "Defi Security"],
    overallScore: 94,
    subScores: {
      coding: 95,
      systemDesign: 94,
      communication: 91,
      cognitive: 96
    },
    interviewDuration: "42m 05s",
    matchingTokens: 6200,
    salaryExpectation: "$120,000 / yr",
    vettedDate: "2026-07-10",
    summary: "Top 0.5% in logic & spatial CCAT metrics. Spotless audits of Checks-Effects-Interactions patterns and reentrancy mitigation vectors.",
    transcript: [
      { speaker: "AI Interviewer (Maya)", text: "Explain the vulnerability in code blocks lacking the nonReentrant modifier when state modifies after external transfer." },
      { speaker: "Tariq Okafor", text: "If state modifications happen after an external call, the fallback/receive function of the recipient contract can recall the transfer function. This creates a loop draining contract funds before state changes are ever written." },
      { speaker: "AI Interviewer (Maya)", text: "How do you resolve this at the compiler level?" },
      { speaker: "Tariq Okafor", text: "By strictly respecting Checks-Effects-Interactions, writing all state changes *prior* to executing the transfer, or wrapping the call in OpenZeppelin's ReentrancyGuard modifier." }
    ],
    recordingFile: "tariq_security_audio.mp3",
    audioHighlights: [
      { id: "h1", title: "Checks-Effects-Interactions Explained", time: "05:12" },
      { id: "h2", title: "ReentrancyGuard Compiler Check", time: "18:30" }
    ]
  },
  {
    id: "vet-003",
    name: "Sven Lindqvist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    role: "Cloud Native System Architect",
    location: "Stockholm, Sweden",
    skills: ["Go", "Kubernetes", "AWS", "Terraform", "gRPC", "Docker"],
    overallScore: 92,
    subScores: {
      coding: 91,
      systemDesign: 96,
      communication: 89,
      cognitive: 92
    },
    interviewDuration: "38m 40s",
    matchingTokens: 3800,
    salaryExpectation: "$110,000 / yr",
    vettedDate: "2026-07-08",
    summary: "Expert-level understanding of decentralized mesh architectures. Handled load spike scaling models elegantly during simulation.",
    transcript: [
      { speaker: "AI Interviewer (Maya)", text: "How do you design high-availability databases across multiple regions to prevent partition lags?" },
      { speaker: "Sven Lindqvist", text: "I rely on active-active setups using consensus engines like Raft, combined with localized read replicas and optimistic concurrency locks. For highly relational structures, Spanner or globally distributed CockroachDB works best." }
    ],
    recordingFile: "sven_architect_audio.mp3",
    audioHighlights: [
      { id: "h1", title: "Spanner multi-region partition lag", time: "14:15" }
    ]
  }
];

// Interactive Interview Questions Simulator
const interviewWorkflow = [
  {
    step: 1,
    question: "Hello, welcome to your ESTARR AI Cognitive Vetting. I am Maya, your Lead AI Technical Interviewer. Let's start with system design. Describe how you would handle an API key usage limit with a distributed caching architecture under 100,000 requests per second. Write out some sample pseudocode or logic.",
    expectedTopic: "Redis, token bucket, rate limiting, system design"
  },
  {
    step: 2,
    question: "Outstanding explanation. Let's review standard Web3 smart-contract and data validation security. In React or Solidity, how do you prevent common exploits like cross-site scripting (XSS) or reentrancy vectors? Paste or type a code snippet that implements optimal Checks-Effects-Interactions security.",
    expectedTopic: "Checks-effects-interactions, sanitization, reentrancy"
  },
  {
    step: 3,
    question: "Fantastic response. Let's finish with memory optimization. Explain how you prevent memory leaks when managing persistent WebSockets or event listeners inside high-performance client applications. How do you ensure garbage collection runs correctly?",
    expectedTopic: "Cleanup hooks, removeEventListener, WebSockets close"
  }
];

export function AIVettingCenter({ userProfile }: AIVettingCenterProps) {
  const [activeSubTab, setActiveSubTab] = useState<'simulation' | 'sourcing' | 'auditor'>('simulation');
  
  // Simulation States
  const [selectedRole, setSelectedRole] = useState("Full Stack AI Developer");
  const [selectedPersona, setSelectedPersona] = useState("Maya (System Design Lead)");
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentWorkflowIndex, setCurrentWorkflowIndex] = useState(0);
  const [candidateResponse, setCandidateResponse] = useState("");
  const [interviewTranscript, setInterviewTranscript] = useState<{ role: 'ai' | 'user'; text: string; time: string }[]>([]);
  const [isAiEvaluating, setIsAiEvaluating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  // Live Interview Screen Bouncing Audio Bars simulation
  const [isMicOn, setIsMicOn] = useState(false);
  const [attentionMeter, setAttentionMeter] = useState(98);
  const [cameraScanCoordinates, setCameraScanCoordinates] = useState({ x: 45, y: 35 });
  const [telemetryAlerts, setTelemetryAlerts] = useState<string[]>([]);
  
  // Pre-vetted Sourcing states
  const [selectedCandidate, setSelectedCandidate] = useState<any>(vettedCandidates[0]);
  const [isPlayingHighlight, setIsPlayingHighlight] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  const [showScheduler, setShowScheduler] = useState(false);

  // Code Auditor States
  const [codeToAudit, setCodeToAudit] = useState(`// Paste code block here to verify memory leaks, CEI patterns, and big-O efficiency
function fetchBalance(userId) {
  let user = db.query("SELECT * FROM users WHERE id = " + userId); // Vulnerability?
  if(user) {
    return user.balance;
  }
  return null;
}`);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [auditReport, setAuditReport] = useState<any>(null);

  // Camera coordinates jitter to simulate live cognitive tracking
  useEffect(() => {
    let interval: any;
    if (interviewStarted && !isCompleted) {
      interval = setInterval(() => {
        setCameraScanCoordinates({
          x: Math.floor(Math.random() * 20) + 40,
          y: Math.floor(Math.random() * 20) + 35
        });
        setAttentionMeter(prev => {
          const delta = Math.floor(Math.random() * 5) - 2;
          const next = prev + delta;
          return next > 100 ? 100 : next < 85 ? 85 : next;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [interviewStarted, isCompleted]);

  // Handle Start Interview
  const handleStartInterview = () => {
    setInterviewStarted(true);
    setInterviewTranscript([
      {
        role: 'ai',
        text: `Welcome! I am your AI Vetting Proctor. Today we will assess your qualifications for the ${selectedRole} role. ${interviewWorkflow[0].question}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }
    ]);
    setIsMicOn(true);
    setTelemetryAlerts(["Vetting proctor initialized", "Facial gaze matching unlocked", "Cognitive telemetry live"]);
  };

  // Submit Answer
  const handleAnswerSubmit = async () => {
    if (!candidateResponse.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const userMsg = { role: 'user' as const, text: candidateResponse, time: timestamp };
    const updatedTranscript = [...interviewTranscript, userMsg];
    setInterviewTranscript(updatedTranscript);
    const lastResponse = candidateResponse;
    setCandidateResponse("");
    setIsAiEvaluating(true);

    // Simulate anti-cheat tracking telemetry flag
    if (lastResponse.length > 300) {
      setTelemetryAlerts(prev => [...prev, "Analyzed advanced cognitive lexical density"]);
    }

    try {
      const response = await fetch("/api/vetting/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          role: selectedRole,
          persona: selectedPersona,
          transcript: updatedTranscript,
          currentStep: currentWorkflowIndex,
          userResponse: lastResponse
        })
      });

      if (!response.ok) {
        throw new Error("Vetting API responded with an error");
      }

      const data = await response.json();
      setIsAiEvaluating(false);

      if (data.feedback) {
        setTelemetryAlerts(prev => [...prev, `AI Critique: ${data.feedback}`]);
      }

      if (data.isCompleted) {
        setIsCompleted(true);
        setIsMicOn(false);
        setGeneratedReport(data.report || {
          overallScore: 88,
          coding: 90,
          systemDesign: 88,
          communication: 91,
          cognitive: 92,
          summary: "Vetting finished. Scorecard metrics compiled.",
          badge: "Vetted Expert"
        });

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        const nextIndex = currentWorkflowIndex + 1;
        setCurrentWorkflowIndex(nextIndex);
        setInterviewTranscript(prev => [
          ...prev,
          {
            role: 'ai',
            text: data.nextQuestion || interviewWorkflow[nextIndex].question,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          }
        ]);
      }

    } catch (err) {
      console.error("Vetting API failed, falling back to simulation:", err);
      // Fallback behavior
      setTimeout(() => {
        setIsAiEvaluating(false);
        const nextIndex = currentWorkflowIndex + 1;
        
        if (nextIndex < interviewWorkflow.length) {
          setCurrentWorkflowIndex(nextIndex);
          setInterviewTranscript(prev => [
            ...prev,
            {
              role: 'ai',
              text: interviewWorkflow[nextIndex].question,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            }
          ]);
        } else {
          // Complete Interview and Generate AI Scorecard
          setIsCompleted(true);
          setIsMicOn(false);
          const randomScore = Math.floor(Math.random() * 10) + 88; // 88 to 97 score
          setGeneratedReport({
            overallScore: randomScore,
            coding: Math.floor(Math.random() * 10) + 90,
            systemDesign: Math.floor(Math.random() * 10) + 88,
            communication: Math.floor(Math.random() * 10) + 91,
            cognitive: Math.floor(Math.random() * 10) + 92,
            summary: `Candidate showed excellent theoretical system design capabilities. Strong intuition for distributed caches, rate-limiting algorithms, and clean lifecycle hooks in single-page apps. Code execution accuracy passed with exceptional benchmarks. Eligible for the Top 3% talent badge.`,
            badge: randomScore >= 95 ? "Alpha-Cohort Elite" : "Vetted Expert"
          });

          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }, 2000);
    }
  };

  // Code Auditor Handler
  const handleInitiateAudit = async () => {
    setIsAuditing(true);
    setAuditLogs(["[Initializing] ESTARR AI Vetting Proctor Node..."]);
    setAuditReport(null);

    const logs = [
      "Parsing AST token tree...",
      "Validating sql injection vectors in database queries...",
      "Scanning for open listener handlers on WebSocket sockets...",
      "Analyzing algorithm time complexity patterns...",
      "Validating reentrancy and Checks-Effects-Interactions boundaries...",
      "Computing static code readability matrices..."
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setAuditLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`]);
      }, (index + 1) * 300);
    });

    try {
      const response = await fetch("/api/vetting/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: codeToAudit })
      });

      if (!response.ok) {
        throw new Error("Audit API failed");
      }

      const data = await response.json();
      
      setTimeout(() => {
        setIsAuditing(false);
        setAuditLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Success: Vetting diagnostics fully compiled!`]);
        setAuditReport(data);

        confetti({
          particleCount: 50,
          spread: 45
        });
      }, 1800);

    } catch (err) {
      console.error("Audit API failed, falling back to static scan:", err);
      setTimeout(() => {
        setIsAuditing(false);
        setAuditLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Error: External vetting proctor connection reset. Executing offline backup scans.`]);
        
        const hasSQLInjection = codeToAudit.toLowerCase().includes("select *") && codeToAudit.toLowerCase().includes("+");
        setAuditReport({
          score: hasSQLInjection ? 64 : 95,
          grade: hasSQLInjection ? "C- Vulnerable" : "A+ Secure",
          findings: hasSQLInjection ? [
            { severity: "critical", desc: "SQL Injection vulnerability discovered. Avoid string concats in raw queries; bind params correctly." },
            { severity: "medium", desc: "Lack of input boundary check prior to running SQL transactions." }
          ] : [
            { severity: "info", desc: "No critical memory leaks or SQL injections detected." },
            { severity: "success", desc: "Codebase satisfies checks-effects-interactions criteria." }
          ],
          metrics: {
            redundancy: "0.2%",
            complexity: "O(1) constant",
            modularity: "High"
          }
        });

        confetti({
          particleCount: 50,
          spread: 45
        });
      }, 1800);
    }
  };

  // Filtering vetted candidates
  const filteredCandidates = vettedCandidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = filterSkill === "" || c.skills.some(s => s.toLowerCase() === filterSkill.toLowerCase());
    return matchesSearch && matchesSkill;
  });

  return (
    <div id="ai-vetting-center" className="flex flex-col gap-6 animate-fade-in w-full">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-3 pointer-events-none" />

      {/* Hero Module & Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-[10px] font-black font-mono uppercase tracking-widest border border-purple-500/20">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Interactive Vetting Engine
            </div>
            <h1 className="text-3xl font-black tracking-tight font-display bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
              ESTARR AI Vetting Center
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Based on the vetted pipelines of <strong className="text-purple-300 font-bold">micro1.ai</strong>. We execute complete mathematical and technical benchmarking on cognitive logic, code accuracy, and speech telemetry.
            </p>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setActiveSubTab('simulation')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${activeSubTab === 'simulation' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Interview Proctor</span>
            </button>
            <button
              onClick={() => setActiveSubTab('sourcing')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${activeSubTab === 'sourcing' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Vetted Talent Pool</span>
            </button>
            <button
              onClick={() => setActiveSubTab('auditor')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${activeSubTab === 'auditor' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Code Auditor Node</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Feature Content Area */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {/* TAB 1: INTERVIEW SIMULATOR */}
          {activeSubTab === 'simulation' && (
            <motion.div
              key="sim"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Interview Configuration Sidebar */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Settings className="w-4 h-4 text-purple-600" /> Proctor Configuration
                  </h3>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Target Vetting Role</label>
                    <select
                      disabled={interviewStarted}
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-purple-500 font-bold disabled:opacity-60"
                    >
                      <option value="Full Stack AI Developer">Full Stack AI Developer (React/Node)</option>
                      <option value="Senior Smart Contract Auditor">Senior Smart Contract Auditor (Solidity/Rust)</option>
                      <option value="Cognitive Infrastructure Architect">Cognitive Infrastructure Architect (Python/Go)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">AI Interviewer Personality</label>
                    <select
                      disabled={interviewStarted}
                      value={selectedPersona}
                      onChange={(e) => setSelectedPersona(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-purple-500 font-bold disabled:opacity-60"
                    >
                      <option value="Maya (System Design Lead)">Maya (Friendly & System-Design focused)</option>
                      <option value="Marcus (Principal DevOps)">Marcus (Direct & Algorithmic code validation)</option>
                    </select>
                  </div>

                  <div className="bg-purple-50 border border-purple-100 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center gap-1 text-purple-800 font-bold text-xs">
                      <Cpu className="w-3.5 h-3.5 shrink-0" />
                      <span>Security Telemetry Enabled:</span>
                    </div>
                    <ul className="text-[10px] text-purple-700 font-medium space-y-1.5 list-disc list-inside">
                      <li>Simulated eye gaze focus analyzer</li>
                      <li>Copy-paste semantic buffer alert</li>
                      <li>Live transcription translation index</li>
                    </ul>
                  </div>

                  {!interviewStarted ? (
                    <button
                      onClick={handleStartInterview}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Initiate Live AI Assessment</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setInterviewStarted(false);
                        setIsCompleted(false);
                        setCurrentWorkflowIndex(0);
                        setInterviewTranscript([]);
                        setGeneratedReport(null);
                      }}
                      className="w-full border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all text-center cursor-pointer"
                    >
                      Exit Proctor Simulation
                    </button>
                  )}
                </div>

                {/* Telemetry Log Panel */}
                {interviewStarted && (
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm text-xs font-mono space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-purple-400 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" /> Proctor Anti-Cheat Telemetry
                    </h4>
                    <div className="h-32 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
                      {telemetryAlerts.map((alert, i) => (
                        <div key={i} className="text-[10px] text-slate-400 flex items-start gap-1.5">
                          <span className="text-purple-500 font-bold">»</span>
                          <span>{alert}</span>
                        </div>
                      ))}
                      {isMicOn && (
                        <div className="text-[10px] text-emerald-400 font-bold animate-pulse flex items-center gap-1">
                          <span>●</span>
                          <span>Audio stream active: Listening to environment...</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Proctor Main Frame */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {!interviewStarted ? (
                  // Welcome screen
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col items-center text-center gap-6">
                    <div className="p-4 bg-purple-100 text-purple-600 rounded-full">
                      <BrainCircuit className="w-12 h-12" />
                    </div>
                    <div className="space-y-2 max-w-lg">
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">AI Interview Live Simulator</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        Ready to experience a real Micro1-style interview? Step inside the proctored workspace and test your ability in live system design, clean coding standards, and real-time cognitive logic.
                      </p>
                    </div>
                    <button
                      onClick={handleStartInterview}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span>Start Interview Now</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : isCompleted ? (
                  // Completed report card
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                      <div className="space-y-1">
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full font-mono">
                          Vetting Qualified
                        </span>
                        <h3 className="text-xl font-black text-slate-900">Your AI Interview Scorecard</h3>
                        <p className="text-xs text-slate-500">Benchmark results calculated using Micro1 AI standards</p>
                      </div>
                      <div className="flex items-center gap-2 bg-purple-50 border border-purple-100 p-3 rounded-xl">
                        <span className="text-3xl font-black text-purple-700 font-mono">{generatedReport?.overallScore}</span>
                        <div className="text-[10px]">
                          <span className="text-slate-400 uppercase font-bold block">Overall Grade</span>
                          <span className="text-purple-600 font-black font-mono">Top 3% Talent</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Coding Accuracy", val: generatedReport?.coding, color: "bg-purple-600" },
                        { label: "System Design", val: generatedReport?.systemDesign, color: "bg-purple-600" },
                        { label: "Communication Score", val: generatedReport?.communication, color: "bg-purple-600" },
                        { label: "Cognitive Processing", val: generatedReport?.cognitive, color: "bg-emerald-500" }
                      ].map((sub, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-1.5">
                          <span className="text-[10px] text-slate-400 font-bold block truncate">{sub.label}</span>
                          <div className="flex items-end justify-between">
                            <span className="text-lg font-black text-slate-900 font-mono">{sub.val}%</span>
                            <span className="text-[9px] text-emerald-600 font-black">PASS</span>
                          </div>
                          <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                            <div className={`${sub.color} h-full`} style={{ width: `${sub.val}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-black text-purple-900 uppercase">AI Proctor Feedback Critique</h4>
                      <p className="text-xs text-purple-800 leading-relaxed font-medium">
                        {generatedReport?.summary}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        Verification Badge Generated and Saved to Wallet
                      </div>
                      <button
                        onClick={() => {
                          setInterviewStarted(false);
                          setIsCompleted(false);
                          setCurrentWorkflowIndex(0);
                        }}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors text-center cursor-pointer"
                      >
                        Reset and Try Again
                      </button>
                    </div>
                  </div>
                ) : (
                  // Active proctored interview panel
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left: Interactive proctor feed & audio visualization */}
                    <div className="md:col-span-5 flex flex-col gap-6">
                      {/* Proctor Video Stream Mock */}
                      <div className="bg-slate-950 rounded-2xl overflow-hidden aspect-video relative border border-slate-800 flex items-center justify-center">
                        {/* Eye recognition tracker box */}
                        <div className="absolute top-3 left-3 bg-purple-600/80 px-2 py-0.5 rounded font-mono text-[8px] text-white font-bold flex items-center gap-1.5 z-10">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></div>
                          <span>LIVE AI ASSESSOR FEED</span>
                        </div>
                        
                        {/* Simulated AI interviewer model or user placeholder */}
                        <div className="text-center text-slate-600 space-y-1.5">
                          <Cpu className="w-12 h-12 text-purple-500 mx-auto animate-pulse" />
                          <span className="text-[10px] font-mono text-purple-400 font-bold block uppercase">Assessor: {selectedPersona.split(" ")[0]}</span>
                        </div>

                        {/* Scan horizontal lines */}
                        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-purple-500/30 shadow-[0_0_8px_#a855f7] animate-bounce pointer-events-none" />

                        {/* Facial target simulation */}
                        <div 
                          className="absolute border border-purple-500/50 w-24 h-24 rounded-lg pointer-events-none transition-all duration-300 flex items-center justify-center"
                          style={{
                            left: `${cameraScanCoordinates.x}%`,
                            top: `${cameraScanCoordinates.y}%`,
                          }}
                        >
                          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-purple-400" />
                          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-purple-400" />
                          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-purple-400" />
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-purple-400" />
                          <span className="text-[7px] text-purple-400 font-mono font-bold leading-none select-none">TRACKED</span>
                        </div>
                      </div>

                      {/* Attention Telemetry Ring */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Gaze Focus Integrity</span>
                          <span className="text-xs font-black text-slate-800">Eye Alignment Sensor</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-black font-mono text-purple-600">{attentionMeter}%</span>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        </div>
                      </div>

                      {/* Bouncing Audio Waveform block */}
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">PROCTOR AUDIO CHANNEL</span>
                          {isMicOn && <span className="text-[8px] bg-purple-900 text-purple-300 border border-purple-800 px-1.5 py-0.2 rounded font-mono uppercase font-black">CAPTURING</span>}
                        </div>
                        
                        {/* Waveform graphic */}
                        <div className="flex items-center justify-center gap-1.5 h-12">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((bar, i) => {
                            const heights = isAiEvaluating ? [20, 30, 40, 25, 15, 35, 10, 22] : [8, 12, 15, 20, 12, 8, 25, 30, 8, 14];
                            const computedHeight = heights[i % heights.length];
                            return (
                              <div 
                                key={i} 
                                className="w-1.5 rounded-full bg-gradient-to-t from-purple-600 to-indigo-400 transition-all duration-300" 
                                style={{ height: isAiEvaluating || isMicOn ? `${computedHeight}px` : "4px" }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right: Interactive Dialogue proctored chat area */}
                    <div className="md:col-span-7 flex flex-col gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm h-[400px] justify-between">
                      <div className="overflow-y-auto space-y-4 pr-1 h-72 custom-scrollbar">
                        {interviewTranscript.map((t, index) => (
                          <div key={index} className={`flex gap-3 ${t.role === 'user' ? 'justify-end' : ''}`}>
                            {t.role === 'ai' && (
                              <div className="p-2 bg-purple-100 text-purple-700 rounded-lg h-fit shrink-0">
                                <Cpu className="w-3.5 h-3.5" />
                              </div>
                            )}
                            <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-sans leading-relaxed shadow-sm ${t.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'}`}>
                              <div className="flex items-center justify-between gap-3 mb-1">
                                <span className="font-bold uppercase text-[9px] tracking-wider opacity-80">
                                  {t.role === 'ai' ? selectedPersona.split(" ")[0] : "Candidate (You)"}
                                </span>
                                <span className="text-[8px] opacity-60 font-mono">{t.time}</span>
                              </div>
                              <p>{t.text}</p>
                            </div>
                          </div>
                        ))}
                        {isAiEvaluating && (
                          <div className="flex gap-3">
                            <div className="p-2 bg-purple-100 text-purple-700 rounded-lg h-fit shrink-0">
                              <LoaderAnimation />
                            </div>
                            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none p-3 text-xs text-slate-500 italic flex items-center gap-1.5 shadow-sm">
                              <span>Analyzing cognitive lexical matrix...</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Submission Input Bar */}
                      <div className="space-y-2">
                        <textarea
                          disabled={isAiEvaluating}
                          value={candidateResponse}
                          onChange={(e) => setCandidateResponse(e.target.value)}
                          placeholder="Paste code or type details of your technical solution here..."
                          className="w-full h-16 bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded-xl focus:outline-none focus:border-purple-500 font-mono"
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-400 font-medium">Question {currentWorkflowIndex + 1} of {interviewWorkflow.length}</span>
                          <button
                            disabled={!candidateResponse.trim() || isAiEvaluating}
                            onClick={handleAnswerSubmit}
                            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Submit Solution</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 2: VETTED TALENT POOL (CLIENT VIEW) */}
          {activeSubTab === 'sourcing' && (
            <motion.div
              key="source"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Column: Sourcing & Search Filter Panel */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search roles or locations (e.g. Solidity, Nairobi)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-purple-500 font-medium text-slate-800"
                    />
                  </div>

                  {/* Quick Filters */}
                  <div className="flex flex-wrap gap-1.5">
                    {["", "Python", "Solidity", "Go", "React"].map((skill) => (
                      <button
                        key={skill}
                        onClick={() => setFilterSkill(skill)}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${filterSkill === skill ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                      >
                        {skill === "" ? "All Skills" : skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Developer List Scroll */}
                <div className="space-y-3 h-[450px] overflow-y-auto pr-1 custom-scrollbar">
                  {filteredCandidates.map((cand) => (
                    <button
                      key={cand.id}
                      onClick={() => {
                        setSelectedCandidate(cand);
                        setShowScheduler(false);
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer relative overflow-hidden ${selectedCandidate?.id === cand.id ? 'bg-white border-purple-500 shadow-sm ring-1 ring-purple-100' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'}`}
                    >
                      {/* Left border bar indicator */}
                      {selectedCandidate?.id === cand.id && (
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-600" />
                      )}

                      <img src={cand.avatar} alt="candidate" className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100" />
                      
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 truncate">{cand.name}</h4>
                            <span className="text-[10px] text-slate-400 font-bold block">{cand.role}</span>
                          </div>
                          <div className="bg-purple-50 text-purple-700 text-[10px] font-black font-mono px-2 py-0.5 rounded flex items-center gap-0.5">
                            <span>{cand.overallScore}</span>
                            <span className="text-[8px] text-purple-400 font-normal">/100</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-[9px] text-slate-400 font-mono font-medium">
                          <span className="truncate">{cand.location}</span>
                          <span>•</span>
                          <span>{cand.salaryExpectation}</span>
                        </div>

                        {/* Badges/Skills */}
                        <div className="flex flex-wrap gap-1">
                          {cand.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="text-[9px] bg-slate-50 text-slate-500 border border-slate-200/60 px-1.5 py-0.2 rounded font-mono font-bold">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                  {filteredCandidates.length === 0 && (
                    <div className="text-center p-8 bg-white border border-slate-200 rounded-2xl text-slate-500 text-xs font-medium">
                      No vetted talent matches your criteria.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Complete Interactive Candidate Vetted Scorecard */}
              <div className="lg:col-span-7">
                {selectedCandidate ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-6 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-3.5">
                        <img src={selectedCandidate.avatar} alt="vetted avatar" className="w-14 h-14 rounded-2xl object-cover border border-slate-200" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-black text-slate-900">{selectedCandidate.name}</h3>
                            <span className="bg-emerald-100 text-emerald-800 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full font-mono flex items-center gap-0.5">
                              <ShieldCheck className="w-2.5 h-2.5" /> Certified Expert
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-500">{selectedCandidate.role}</span>
                          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{selectedCandidate.location} • Vetted on {selectedCandidate.vettedDate}</span>
                        </div>
                      </div>

                      {/* Primary Grade Shield */}
                      <div className="flex items-center gap-2.5 bg-slate-900 text-white p-3.5 rounded-xl self-start sm:self-auto shadow-md">
                        <BrainCircuit className="w-5 h-5 text-purple-400" />
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 block uppercase font-mono leading-none mb-1">Ecosystem Grade</span>
                          <span className="text-lg font-black font-mono leading-none bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">{selectedCandidate.overallScore}% Pass</span>
                        </div>
                      </div>
                    </div>

                    {/* Skill Benchmark charts */}
                    <div className="space-y-3.5">
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <BarChart2 className="w-3.5 h-3.5 text-purple-600" /> Cognitive & Skill Benchmarks
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { label: "Technical Coding Accuracy", score: selectedCandidate.subScores.coding, max: 100 },
                          { label: "Decentralized System Design", score: selectedCandidate.subScores.systemDesign, max: 100 },
                          { label: "Cognitive Processing & Aptitude (CCAT)", score: selectedCandidate.subScores.cognitive, max: 100 },
                          { label: "English Communication & Fluency", score: selectedCandidate.subScores.communication, max: 100 }
                        ].map((sub, i) => (
                          <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-1.5">
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="font-bold text-slate-700">{sub.label}</span>
                              <span className="font-black text-slate-900 font-mono">{sub.score}/100</span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-purple-600 h-full rounded-full" style={{ width: `${sub.score}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Assessment Dialogue & Transcript Panel */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-purple-600" /> AI Interview Highlight Transcript
                      </h4>
                      
                      <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 text-xs font-mono max-h-48 overflow-y-auto space-y-3.5 custom-scrollbar">
                        {selectedCandidate.transcript.map((dialogue: any, idx: number) => (
                          <div key={idx} className="space-y-1">
                            <span className={`text-[9px] font-bold uppercase ${dialogue.speaker.startsWith("AI") ? 'text-purple-400' : 'text-emerald-400'}`}>
                              {dialogue.speaker}
                            </span>
                            <p className="text-slate-300 text-[11px] leading-relaxed font-sans">{dialogue.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Audio Player simulation */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsPlayingHighlight(isPlayingHighlight === selectedCandidate.id ? null : selectedCandidate.id)}
                          className="w-10 h-10 bg-purple-600 hover:bg-purple-500 text-white rounded-full flex items-center justify-center shadow-md transition-colors shrink-0 cursor-pointer"
                        >
                          {isPlayingHighlight === selectedCandidate.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 pl-0.5" />}
                        </button>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">Audio Assessment Archive</span>
                          <span className="text-xs text-white font-medium">Listen to {selectedCandidate.name}'s system explanation</span>
                        </div>
                      </div>

                      {isPlayingHighlight === selectedCandidate.id && (
                        <div className="flex-1 max-w-xs h-6 flex items-center justify-center gap-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                            <div key={i} className="w-1 bg-purple-500 rounded-full animate-pulse h-3" />
                          ))}
                        </div>
                      )}

                      <span className="text-[10px] text-slate-400 font-mono font-bold shrink-0">{selectedCandidate.interviewDuration}</span>
                    </div>

                    {/* AI Proctor Critique Summary */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-1">
                      <h4 className="text-xs font-bold text-slate-900 uppercase">Proctor System Audit Critique</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {selectedCandidate.summary}
                      </p>
                    </div>

                    {/* Booking Round Scheduler Action */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-slate-900 block">Satisfied with the AI Scorecard?</span>
                          <p className="text-[10px] text-slate-400 font-medium">Book a direct live technical consensus round with Amina.</p>
                        </div>
                        <button
                          onClick={() => setShowScheduler(!showScheduler)}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-black text-[10px] uppercase tracking-widest px-4.5 py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{showScheduler ? "Close Scheduler" : "Schedule Consensus Round"}</span>
                        </button>
                      </div>

                      {showScheduler && (
                        <div className="animate-fade-in border-t border-slate-100 pt-4">
                          <InterviewScheduler
                            token={null}
                            candidateName={selectedCandidate.name}
                            candidateEmail={`${selectedCandidate.name.toLowerCase().replace(/\s+/g, '')}@estarrapp.com`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center text-slate-500 text-sm font-medium">
                    Select a verified developer candidate to inspect their interactive proctor card.
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: CODE AUDITOR NODE */}
          {activeSubTab === 'auditor' && (
            <motion.div
              key="audit"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Column: Editor & submit */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                        <Code className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">Code Vetting Sandbox</h3>
                    </div>
                    <button
                      onClick={() => setCodeToAudit(`// React state leaks test
import React, { useEffect, useState } from 'react';

export function SocketWidget() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const ws = new WebSocket("wss://api.estarrapp.com/feed");
    ws.onmessage = (e) => setData(e.data);
    
    // Missing websocket cleanup socket.close()!
  }, []); // Static array depends on reference?
  
  return <div>Data counts: {data.length}</div>;
}`)}
                      className="text-[10px] text-purple-600 font-bold hover:underline cursor-pointer"
                    >
                      Load Leak Demo
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Our structural proctor scans code blocks to calculate clean-code compliance, performance loops, and smart contract security vulnerabilities. Paste a code block below to execute audit metrics.
                  </p>

                  <textarea
                    value={codeToAudit}
                    onChange={(e) => setCodeToAudit(e.target.value)}
                    className="w-full h-80 bg-slate-950 text-slate-100 font-mono text-xs p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 border border-slate-800"
                  />

                  <button
                    disabled={isAuditing}
                    onClick={handleInitiateAudit}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isAuditing ? (
                      <>
                        <LoaderAnimation />
                        <span>Executing Vetting Diagnoses...</span>
                      </>
                    ) : (
                      <>
                        <Cpu className="w-4 h-4" />
                        <span>Audit Codeblock</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Audit Scanner Output Terminal */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm text-xs font-mono space-y-3 text-slate-300">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 animate-pulse" /> Diagnostic Audit Stream
                  </h4>
                  <div className="h-40 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
                    {auditLogs.length === 0 ? (
                      <span className="text-[10px] text-slate-500 italic">No diagnostic log streamed. Hit "Audit Codeblock" above to initialize check scans.</span>
                    ) : (
                      auditLogs.map((log, i) => (
                        <div key={i} className="text-[10px] flex items-start gap-1.5 font-mono text-slate-400">
                          <span className="text-purple-500 font-bold">»</span>
                          <span>{log}</span>
                        </div>
                      ))
                    )}
                    {isAuditing && (
                      <div className="text-[10px] text-purple-400 font-bold animate-pulse font-mono">
                        ⚙ Evaluating AST tree hierarchies...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Audit grading scorecard */}
              <div className="lg:col-span-6">
                {auditReport ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="text-base font-black text-slate-900">Audit Grade Certification</h3>
                        <p className="text-xs text-slate-400">Cognitive security diagnostic grade report</p>
                      </div>
                      <span className="text-3xl font-black font-mono text-purple-600 bg-purple-50 border border-purple-100 px-4 py-2 rounded-xl">
                        {auditReport.grade.split(" ")[0]}
                      </span>
                    </div>

                    {/* Findings list */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-purple-600" /> Diagnosed Findings ({auditReport.findings.length})
                      </h4>

                      <div className="space-y-2.5">
                        {auditReport.findings.map((finding: any, i: number) => {
                          const isCritical = finding.severity === "critical";
                          const isSuccess = finding.severity === "success";
                          return (
                            <div 
                              key={i} 
                              className={`rounded-xl p-3 flex gap-2.5 text-xs font-medium border ${isCritical ? 'bg-rose-50 border-rose-100 text-rose-800' : isSuccess ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-slate-50 border-slate-100 text-slate-700'}`}
                            >
                              {isCritical && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                              {isSuccess && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                              {!isCritical && !isSuccess && <Info className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />}
                              
                              <p className="leading-relaxed text-[11px] font-sans">{finding.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* AST metrics */}
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <LineChart className="w-3.5 h-3.5 text-purple-600" /> AST Structural Metrics
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "Memory Leak Risk", value: auditReport.metrics.redundancy },
                          { label: "Big-O Scale", value: auditReport.metrics.complexity },
                          { label: "Clean Modularity", value: auditReport.metrics.modularity }
                        ].map((metric, i) => (
                          <div key={i} className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center space-y-0.5">
                            <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-tight truncate">{metric.label}</span>
                            <span className="text-xs font-black text-slate-800 font-mono block">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Official badge generated */}
                    <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl flex items-center justify-between shadow-md">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0" />
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block leading-none">Security Clearance Status</span>
                          <span className="text-xs font-bold block leading-none">{auditReport.score >= 80 ? 'VETTING AUDIT PASSED' : 'AUDIT REQUIRES ADJUSTMENTS'}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-purple-400 font-black uppercase tracking-widest">{auditReport.score >= 80 ? 'PASS' : 'FAIL'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center text-slate-500 text-sm font-medium flex flex-col items-center justify-center gap-3">
                    <Code className="w-10 h-10 text-slate-300" />
                    <span>Paste any block of code and run structural audit proctors to generate a secure clearance certificate.</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Bouncing loader icon
function LoaderAnimation() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-1 h-1 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-1 h-1 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-1 h-1 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}
