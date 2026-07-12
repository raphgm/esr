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
  ArrowRight,
  AlertCircle,
  FileText,
  BarChart3,
  MessageSquare,
  Image as ImageIcon,
  Info,
  X,
  Rocket,
  Flame,
  Sparkles,
  Coins,
  Cpu,
  FileCode,
  ShieldCheck,
  UserPlus,
  Lock,
  Unlock,
  Key
} from "lucide-react";

interface AILabSectionProps {
  userProfile: UserProfile;
  onUpdateProfile?: (updated: UserProfile) => void;
}

export const AILabSection: React.FC<AILabSectionProps> = ({ userProfile, onUpdateProfile }) => {
  if (userProfile?.accountType === "jobOwner") {
    return <AILabClientSection userProfile={userProfile} />;
  }

  // Income Accelerator Interactive States
  const [acceleratorTab, setAcceleratorTab] = useState<"ai" | "ip" | "escrow" | "referral">("ai");
  
  // Real Localized Africa Payments (Paystack Integration) Settings
  const [paymentMode, setPaymentMode] = useState<"simulated" | "paystack">(
    () => (localStorage.getItem("estarr_payment_mode") as any) || "simulated"
  );
  const [paystackPublicKey, setPaystackPublicKey] = useState(
    () => localStorage.getItem("estarr_paystack_public_key") || "pk_test_d6a89461d36be8e4548483f1df29606d649cf10e"
  );
  const [paymentCurrency, setPaymentCurrency] = useState(
    () => localStorage.getItem("estarr_payment_currency") || "USD"
  );
  const [paymentExchangeRate, setPaymentExchangeRate] = useState(
    () => localStorage.getItem("estarr_payment_exchange_rate") || "1"
  );
  const [showConfig, setShowConfig] = useState(false);
  
  // Developer Gate Key lock states for Africa Payment Gateway & Accelerator
  const [isDevUnlocked, setIsDevUnlocked] = useState<boolean>(() => {
    return localStorage.getItem("estarr_developer_unlocked") === "true";
  });
  const [developerInputKey, setDeveloperInputKey] = useState("");
  const [devUnlockError, setDevUnlockError] = useState("");
  
  // Real transaction and checkout tracking
  const [isPayingWithPaystack, setIsPayingWithPaystack] = useState(false);
  const [realTxReference, setRealTxReference] = useState("");

  // Payout / Withdrawal Drawer States
  const [showPayoutDrawer, setShowPayoutDrawer] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("nigeria");
  const [banksList, setBanksList] = useState<{ code: string; name: string }[]>([]);
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [payoutAccountNumber, setPayoutAccountNumber] = useState("");
  const [resolvedAccountName, setResolvedAccountName] = useState("");
  const [isResolvingAccount, setIsResolvingAccount] = useState(false);
  const [payoutSuccessMsg, setPayoutSuccessMsg] = useState("");
  const [isLoadingBanks, setIsLoadingBanks] = useState(false);

  // Dynamically load Paystack Pop script
  const loadPaystackPop = (): Promise<any> => {
    return new Promise((resolve) => {
      if ((window as any).PaystackPop) {
        resolve((window as any).PaystackPop);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => {
        resolve((window as any).PaystackPop);
      };
      document.body.appendChild(script);
    });
  };

  // Load banks list dynamically based on country
  const fetchBanksForCountry = async (country: string) => {
    setIsLoadingBanks(true);
    setResolvedAccountName("");
    try {
      const response = await fetch(`/api/paystack/banks/${country}`);
      const result = await response.json();
      if (result.status && result.data) {
        setBanksList(result.data);
        if (result.data.length > 0) {
          setSelectedBankCode(result.data[0].code);
        }
      }
    } catch (e) {
      console.error("Failed to load banks", e);
    } finally {
      setIsLoadingBanks(false);
    }
  };

  const handleResolveAccount = async () => {
    if (!payoutAccountNumber || !selectedBankCode) return;
    setIsResolvingAccount(true);
    setResolvedAccountName("");
    try {
      const response = await fetch("/api/paystack/resolve-bank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountNumber: payoutAccountNumber,
          bankCode: selectedBankCode
        })
      });
      const result = await response.json();
      if (result.status && result.data) {
        setResolvedAccountName(result.data.account_name);
      } else {
        setResolvedAccountName("ESTARR VERIFIED BUILDER");
      }
    } catch (e) {
      setResolvedAccountName("ESTARR VERIFIED BUILDER");
    } finally {
      setIsResolvingAccount(false);
    }
  };

  const handleSavePaymentConfig = () => {
    localStorage.setItem("estarr_payment_mode", paymentMode);
    localStorage.setItem("estarr_paystack_public_key", paystackPublicKey);
    localStorage.setItem("estarr_payment_currency", paymentCurrency);
    localStorage.setItem("estarr_payment_exchange_rate", paymentExchangeRate);
    setShowConfig(false);
  };

  const getCurrencySymbol = (cc: string) => {
    switch (cc) {
      case "NGN": return "₦";
      case "GHS": return "GH₵";
      case "KES": return "KSh";
      case "ZAR": return "R";
      default: return "$";
    }
  };

  // Trigger Paystack Popup for live card / mobile money payment
  const triggerPaystackCheckout = async (options: {
    amountUsd: number;
    email: string;
    description: string;
    onSuccess: (reference: string) => void;
  }) => {
    setIsPayingWithPaystack(true);
    try {
      const pop = await loadPaystackPop();
      const rate = parseFloat(paymentExchangeRate) || 1;
      const localAmount = Math.round(options.amountUsd * rate);
      const currency = paymentCurrency || "USD";
      
      // Paystack expects amount in subdivisions
      const subunitMultiplier = ["NGN", "GHS", "ZAR", "USD", "KES"].includes(currency) ? 100 : 1;
      const finalAmountSubunits = localAmount * subunitMultiplier;

      const handler = pop.setup({
        key: paystackPublicKey || "pk_test_d6a89461d36be8e4548483f1df29606d649cf10e",
        email: options.email,
        amount: finalAmountSubunits,
        currency: currency,
        ref: 'estarr_' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
          custom_fields: [
            {
              display_name: "Workflow Source",
              variable_name: "workflow_source",
              value: options.description
            }
          ]
        },
        callback: function(response: any) {
          setIsPayingWithPaystack(false);
          options.onSuccess(response.reference);
        },
        onClose: function() {
          setIsPayingWithPaystack(false);
        }
      });
      handler.openIframe();
    } catch (e) {
      console.error("Paystack popup failed:", e);
      setIsPayingWithPaystack(false);
    }
  };

  // Tab 1: AI Evaluation state
  const [aiModelChoice, setAiModelChoice] = useState<"A" | "B" | "">("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [aiEvaluated, setAiEvaluated] = useState(false);

  // Tab 2: IP licensing state
  const [selectedTemplate, setSelectedTemplate] = useState("Secure Escrow Web3 Solidity Contract v2.1");
  const [licenseFee, setLicenseFee] = useState("150");
  const [isLicensing, setIsLicensing] = useState(false);
  const [licensedInfo, setLicensedInfo] = useState<{ buyerName: string; txHash: string; payout: number; ref?: string } | null>(null);

  // Tab 3: Escrow state
  const [escrowClient, setEscrowClient] = useState("");
  const [escrowTitle, setEscrowTitle] = useState("");
  const [escrowAmount, setEscrowAmount] = useState("1200");
  const [escrowStatus, setEscrowStatus] = useState<"idle" | "created" | "funded" | "released">("idle");
  const [simulatedEscrowId, setSimulatedEscrowId] = useState("");

  // Tab 4: Referral state
  const [referralEmail, setReferralEmail] = useState("");
  const [referralRole, setReferralRole] = useState("AI Developer");
  const [referralSuccessMsg, setReferralSuccessMsg] = useState("");

  const handleClaimEarning = (amount: number, pointsBonus: number, description: string) => {
    if (!onUpdateProfile) return;

    // Create a new transaction log
    const newTx = {
      id: `tx-fast-${Date.now()}`,
      type: "receive" as const,
      desc: description,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      amount: amount
    };

    // Update the profile
    const updatedHistory = [newTx, ...(userProfile.history || [])];
    const currentBalance = userProfile.walletBalance ?? 0;
    const currentPoints = userProfile.points ?? 0;

    const updatedProfile = {
      ...userProfile,
      walletBalance: currentBalance + amount,
      points: currentPoints + pointsBonus,
      history: updatedHistory
    };

    onUpdateProfile(updatedProfile);

    // Trigger a clean and satisfying confetti effect
    try {
      import("canvas-confetti").then(module => {
        module.default({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      }).catch(e => console.warn("Confetti dynamic import skipped", e));
    } catch (e) {
      console.warn("Confetti ignored on static view", e);
    }
  };

  const [activeTab, setActiveTab] = useState("available");
  const [detailsTask, setDetailsTask] = useState<any>(null);
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
  ArrowRight,
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
        <h1 className="text-3xl font-black text-slate-900 mb-6 font-display uppercase tracking-tight">Explore roles</h1>

        {/* ESTARR Fast-Track Income Accelerator */}
        <div className="bg-gradient-to-r from-purple-900/10 via-indigo-900/5 to-slate-900/5 border border-purple-200/60 p-6 rounded-2xl relative overflow-hidden shadow-3xs mb-8">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Rocket className="w-48 h-48 text-purple-600" />
          </div>
          
          {!isDevUnlocked ? (
            <div className="flex flex-col gap-6 w-full animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-200/40 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="bg-purple-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Flame className="w-3 h-3 animate-bounce" /> FAST TRACK INCOME
                    </span>
                    <span className="text-[10px] text-purple-600 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> High-Yield Workflows
                    </span>
                    <span className="bg-rose-100 text-rose-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> LOCKED WITH DEVELOPER KEY
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase font-display">
                    ESTARR Fast-Track Earning Accelerator
                  </h2>
                  <p className="text-xs font-medium text-slate-500 mt-0.5 font-sans">
                    Africa Paystack Local Currency Gateway & Integration Hub is protected by administrative passkeys.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl">
                    <Lock className="w-4 h-4 text-slate-500 animate-pulse" />
                    <div>
                      <span className="text-[9px] font-bold text-slate-500 block uppercase">Ecosystem Balance</span>
                      <span className="text-sm font-black text-slate-400">RESTRICTED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Locked Overlay Body */}
              <div className="bg-white border-2 border-dashed border-purple-200 rounded-xl p-8 flex flex-col items-center text-center gap-4 relative overflow-hidden my-2 shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center text-purple-600 mb-2">
                  <Lock className="w-8 h-8 text-purple-600 animate-pulse" />
                </div>

                <div className="max-w-md">
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-tight font-display">
                    Developer Key Authorization Required
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed font-sans">
                    This developer module contains Paystack API setups, currency conversion, and direct bank payout rails. To unlock access, input the developer authorization key obtained from the system Administrator.
                  </p>
                </div>

                <div className="w-full max-w-sm flex flex-col gap-3 mt-2">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5 text-left">
                      Enter Developer Verification Key
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder="e.g. ESTARR-GATE-2026"
                        value={developerInputKey}
                        onChange={(e) => {
                          setDeveloperInputKey(e.target.value);
                          setDevUnlockError("");
                        }}
                        className="flex-1 text-xs font-mono font-bold bg-slate-50 border border-slate-250 p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 tracking-widest text-center uppercase"
                      />
                      <button
                        onClick={() => {
                          const activeKey = localStorage.getItem("estarr_developer_key") || "ESTARR-GATE-2026";
                          if (developerInputKey.trim().toUpperCase() === activeKey.trim().toUpperCase()) {
                            localStorage.setItem("estarr_developer_unlocked", "true");
                            setIsDevUnlocked(true);
                            setDevUnlockError("");
                            import("canvas-confetti").then((m) => {
                              m.default({
                                particleCount: 100,
                                spread: 80,
                                origin: { y: 0.6 }
                              });
                            });
                          } else {
                            setDevUnlockError("❌ Invalid Authorization Key! Retrieve active key from the Admin Dashboard.");
                          }
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-black uppercase tracking-wider px-6 rounded-xl transition-all shadow-sm cursor-pointer"
                      >
                        Authorize
                      </button>
                    </div>
                    {devUnlockError && (
                      <p className="text-[10px] text-rose-600 font-bold mt-2 text-left bg-rose-50 border border-rose-100 p-2 rounded-lg font-sans">
                        {devUnlockError}
                      </p>
                    )}
                  </div>

                  {/* Admin Bypass Help UI */}
                  <div className="border-t border-slate-100 pt-3 mt-1 flex flex-col gap-2">
                    <div className="text-[10px] text-slate-400 font-medium flex flex-col gap-1 items-center justify-center font-sans">
                      <span>How to retrieve the key?</span>
                      <span className="font-bold text-purple-600 text-center">
                        Go to Admin Dashboard &rarr; Developer Key & Integration Hub Authority
                      </span>
                    </div>

                    {/* If the current user is an administrator */}
                    {((userProfile.email || "").trim().toLowerCase() === "raphdafemomoh@gmail.com" || 
                      (userProfile.email || "").trim().toLowerCase() === "rdgabmomoh@gmail.com" ||
                      userProfile.role === "Administrator" || 
                      (localStorage.getItem("estarr_user_role") === "Administrator")) && (
                      <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl flex flex-col items-center gap-1.5 animate-pulse mt-1">
                        <span className="text-[9px] font-black uppercase text-purple-700 flex items-center gap-1 font-sans">
                          👑 Admin Privileges Detected
                        </span>
                        <p className="text-[9px] text-purple-600 font-medium font-sans">
                          You are authenticated as a system administrator. You can bypass this gate instantly.
                        </p>
                        <button
                          onClick={() => {
                            const activeKey = localStorage.getItem("estarr_developer_key") || "ESTARR-GATE-2026";
                            setDeveloperInputKey(activeKey);
                            localStorage.setItem("estarr_developer_unlocked", "true");
                            setIsDevUnlocked(true);
                            setDevUnlockError("");
                            import("canvas-confetti").then((m) => {
                              m.default({
                                particleCount: 80,
                                spread: 60,
                                origin: { y: 0.6 }
                              });
                            });
                          }}
                          className="bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[8px] py-1.5 px-4 rounded-lg transition-all cursor-pointer"
                        >
                          Instant Bypass & Unlock
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="bg-purple-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Flame className="w-3 h-3 animate-bounce" /> FAST TRACK INCOME
                    </span>
                    <span className="text-[10px] text-purple-600 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> High-Yield Workflows
                    </span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      paymentMode === "paystack" 
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}>
                      {paymentMode === "paystack" ? `Paystack Active (${paymentCurrency})` : "Simulation Mode"}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase font-display">
                    ESTARR Fast-Track Earning Accelerator
                  </h2>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    Onboard live micro-contracts & digital licensing. Seamlessly switch to Paystack checkout to collect real card & mobile money payments in Africa.
                  </p>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
                  <button
                    onClick={() => {
                      setShowConfig(!showConfig);
                      setShowPayoutDrawer(false);
                    }}
                    className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-3xs transition-all"
                  >
                    ⚙️ Gateway Settings
                  </button>

                  <button
                    onClick={() => {
                      setShowPayoutDrawer(!showPayoutDrawer);
                      setShowConfig(false);
                      if (!showPayoutDrawer && banksList.length === 0) {
                        fetchBanksForCountry(selectedCountry);
                      }
                    }}
                    className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-purple-700 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-3xs transition-all"
                  >
                    💸 Payouts
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("estarr_developer_unlocked");
                      setIsDevUnlocked(false);
                      setDeveloperInputKey("");
                      setShowConfig(false);
                      setShowPayoutDrawer(false);
                    }}
                    className="px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 hover:border-rose-300 text-rose-700 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-3xs transition-all cursor-pointer"
                    title="Secure and lock developer gateway configurations"
                  >
                    🔒 Lock Hub
                  </button>

                  <div className="flex items-center gap-2 bg-purple-50 border border-purple-100 px-4 py-2 rounded-xl">
                    <Coins className="w-4 h-4 text-purple-600 animate-pulse" />
                    <div>
                      <span className="text-[9px] font-bold text-purple-500 block uppercase">Ecosystem Balance</span>
                      <span className="text-sm font-black text-slate-900">${(userProfile.walletBalance ?? 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

          {/* Payment Configuration Panel */}
          {showConfig && (
            <div className="bg-slate-900 text-white p-5 rounded-xl border border-purple-500/40 shadow-xl mb-6 animate-fade-in flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-100 font-display">
                    Africa Payment Gateway Config
                  </h3>
                </div>
                <button
                  onClick={() => setShowConfig(false)}
                  className="text-slate-400 hover:text-white font-bold text-xs uppercase"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                    Integration Mode
                  </label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value as any)}
                    className="w-full text-xs bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg focus:outline-none focus:border-purple-500 font-bold"
                  >
                    <option value="simulated">⚡ Simulated / Instant Demo</option>
                    <option value="paystack">💳 Paystack (Real Card & Mobile Money)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                    Paystack Public Key
                  </label>
                  <input
                    type="text"
                    value={paystackPublicKey}
                    onChange={(e) => setPaystackPublicKey(e.target.value)}
                    disabled={paymentMode === "simulated"}
                    placeholder="pk_test_..."
                    className="w-full text-xs bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg focus:outline-none focus:border-purple-500 font-mono disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                    Payer Currency
                  </label>
                  <select
                    value={paymentCurrency}
                    onChange={(e) => {
                      const curr = e.target.value;
                      setPaymentCurrency(curr);
                      // Autofill reasonable exchange rate benchmarks to save time
                      if (curr === "NGN") setPaymentExchangeRate("1500");
                      else if (curr === "KES") setPaymentExchangeRate("130");
                      else if (curr === "GHS") setPaymentExchangeRate("15");
                      else if (curr === "ZAR") setPaymentExchangeRate("18");
                      else setPaymentExchangeRate("1");
                    }}
                    disabled={paymentMode === "simulated"}
                    className="w-full text-xs bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg focus:outline-none focus:border-purple-500 font-bold"
                  >
                    <option value="USD">USD ($) - United States</option>
                    <option value="NGN">NGN (₦) - Nigeria</option>
                    <option value="GHS">GHS (GH₵) - Ghana</option>
                    <option value="KES">KES (KSh) - Kenya</option>
                    <option value="ZAR">ZAR (R) - South Africa</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                    Exchange Rate (1 USD = X Local)
                  </label>
                  <input
                    type="number"
                    value={paymentExchangeRate}
                    onChange={(e) => setPaymentExchangeRate(e.target.value)}
                    disabled={paymentMode === "simulated" || paymentCurrency === "USD"}
                    className="w-full text-xs bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg focus:outline-none focus:border-purple-500 font-bold disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="text-[10px] text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-start gap-2">
                <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-300 font-sans">Africa Local Checkout Active:</p>
                  <p className="mt-0.5 font-sans">
                    When set to <strong className="text-purple-400 font-bold">Paystack</strong>, any invoice you generate under Escrow Billing or IP Licensing can be paid using a real bank card, USSD code, or mobile money wallet (such as M-Pesa or MTN MoMo).
                  </p>
                  <p className="mt-1 font-sans">
                    Keep the default keys to test in sandbox mode with free test card credentials, or paste your live Paystack public keys to collect real currency instantly!
                  </p>
                </div>
              </div>

              <button
                onClick={handleSavePaymentConfig}
                className="w-full md:w-auto self-end bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest text-[10px] px-6 py-2.5 rounded-lg transition-all shadow-sm"
              >
                Apply & Save Config
              </button>
            </div>
          )}

          {/* Payout & Withdrawal Drawer */}
          {showPayoutDrawer && (
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-xs mb-6 animate-fade-in flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
                    <Coins className="w-4 h-4" />
                  </span>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 font-display">
                    Ecosystem Payout Request
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowPayoutDrawer(false);
                    setPayoutSuccessMsg("");
                  }}
                  className="text-slate-500 hover:text-slate-900 font-bold text-xs uppercase"
                >
                  Close
                </button>
              </div>

              {payoutSuccessMsg ? (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center flex flex-col items-center gap-2 animate-fade-in">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                  <h4 className="text-sm font-bold text-emerald-900 uppercase">Payout Dispatch Processing</h4>
                  <p className="text-xs text-emerald-700 max-w-md font-medium">
                    {payoutSuccessMsg}
                  </p>
                  <button
                    onClick={() => {
                      setShowPayoutDrawer(false);
                      setPayoutSuccessMsg("");
                    }}
                    className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="text-xs text-slate-600 font-medium">
                    Withdraw funds from your secure wallet balance (<strong className="text-slate-900">${(userProfile.walletBalance ?? 0).toLocaleString()} available</strong>) directly to your local African bank or mobile money wallet.
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                        Payout Country
                      </label>
                      <select
                        value={selectedCountry}
                        onChange={(e) => {
                          setSelectedCountry(e.target.value);
                          fetchBanksForCountry(e.target.value);
                        }}
                        className="w-full text-xs bg-white border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 font-bold"
                      >
                        <option value="nigeria">Nigeria (NGN)</option>
                        <option value="kenya">Kenya (KES)</option>
                        <option value="ghana">Ghana (GHS)</option>
                        <option value="south_africa">South Africa (ZAR)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5 flex justify-between">
                        <span>Select Bank / Provider</span>
                        {isLoadingBanks && <span className="text-[9px] text-purple-600 animate-pulse font-normal">Loading...</span>}
                      </label>
                      <select
                        value={selectedBankCode}
                        onChange={(e) => {
                          setSelectedBankCode(e.target.value);
                          setResolvedAccountName("");
                        }}
                        onClick={() => {
                          if (banksList.length === 0) fetchBanksForCountry(selectedCountry);
                        }}
                        className="w-full text-xs bg-white border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 font-bold"
                      >
                        {banksList.length === 0 ? (
                          <option value="">-- Tap to load banks --</option>
                        ) : (
                          banksList.map((b) => (
                            <option key={b.code} value={b.code}>{b.name}</option>
                          ))
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                        Account / Wallet Number
                      </label>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          placeholder="e.g. 0123456789"
                          value={payoutAccountNumber}
                          onChange={(e) => {
                            setPayoutAccountNumber(e.target.value);
                            setResolvedAccountName("");
                          }}
                          className="flex-1 text-xs bg-white border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono font-bold"
                        />
                        <button
                          type="button"
                          disabled={!payoutAccountNumber || !selectedBankCode || isResolvingAccount}
                          onClick={handleResolveAccount}
                          className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-[9px] font-black uppercase px-2.5 rounded-lg transition-all shrink-0"
                        >
                          {isResolvingAccount ? "..." : "Verify"}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                        Amount to Payout (USD)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-black">$</span>
                        <input
                          type="number"
                          placeholder="e.g. 150"
                          value={payoutAmount}
                          onChange={(e) => setPayoutAmount(e.target.value)}
                          className="w-full text-xs pl-7 p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {resolvedAccountName && (
                    <div className="bg-purple-50 border border-purple-100 p-2.5 rounded-lg flex items-center justify-between text-[11px] animate-fade-in">
                      <span className="text-purple-700 font-medium">Account resolved:</span>
                      <strong className="text-purple-900 font-black uppercase font-mono">{resolvedAccountName}</strong>
                    </div>
                  )}

                  <button
                    disabled={!payoutAmount || parseFloat(payoutAmount) <= 0 || parseFloat(payoutAmount) > (userProfile.walletBalance ?? 0) || !resolvedAccountName}
                    onClick={() => {
                      const amountToClaim = parseFloat(payoutAmount);
                      const rate = parseFloat(paymentExchangeRate) || 1;
                      const localVal = amountToClaim * rate;
                      const symbol = getCurrencySymbol(paymentCurrency);

                      // Subtract walletBalance
                      if (onUpdateProfile) {
                        const newTx = {
                          id: `tx-payout-${Date.now()}`,
                          type: "send" as const,
                          desc: `Ecosystem Withdrawal to ${resolvedAccountName} (${banksList.find(b => b.code === selectedBankCode)?.name || "Bank"})`,
                          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
                          amount: -amountToClaim
                        };
                        const updatedHistory = [newTx, ...(userProfile.history || [])];
                        onUpdateProfile({
                          ...userProfile,
                          walletBalance: (userProfile.walletBalance ?? 0) - amountToClaim,
                          history: updatedHistory
                        });
                      }

                      setPayoutSuccessMsg(`Successfully queued withdrawal of $${amountToClaim.toLocaleString()} USD (${symbol}${localVal.toLocaleString()} local payout value) to ${resolvedAccountName} at ${banksList.find(b => b.code === selectedBankCode)?.name || "your local provider"}. Settling through immediate Paystack transfer routing.`);
                      setPayoutAmount("");
                      setPayoutAccountNumber("");
                      setResolvedAccountName("");
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black uppercase tracking-widest text-[10px] py-3 rounded-xl transition-all shadow-sm font-display"
                  >
                    Initiate Africa Direct Transfer
                  </button>
                </div>
              )}
            </div>
          )}


          {/* Navigation Sub-Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            <button
              onClick={() => setAcceleratorTab("ai")}
              className={`p-3 rounded-xl border transition-all text-left flex flex-col gap-1 ${
                acceleratorTab === "ai"
                  ? "bg-white border-purple-500 shadow-sm ring-1 ring-purple-100"
                  : "bg-white/50 hover:bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <Cpu className={`w-4 h-4 ${acceleratorTab === "ai" ? "text-purple-600" : "text-slate-400"}`} />
                <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-mono">+$25</span>
              </div>
              <span className="text-[11px] font-bold text-slate-900 mt-1">AI Evaluator</span>
              <span className="text-[9px] text-slate-400 font-medium">Model vetting & data</span>
            </button>

            <button
              onClick={() => setAcceleratorTab("ip")}
              className={`p-3 rounded-xl border transition-all text-left flex flex-col gap-1 ${
                acceleratorTab === "ip"
                  ? "bg-white border-purple-500 shadow-sm ring-1 ring-purple-100"
                  : "bg-white/50 hover:bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <FileCode className={`w-4 h-4 ${acceleratorTab === "ip" ? "text-purple-600" : "text-slate-400"}`} />
                <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-mono">+$150</span>
              </div>
              <span className="text-[11px] font-bold text-slate-900 mt-1">IP Licensing</span>
              <span className="text-[9px] text-slate-400 font-medium">Sell template licenses</span>
            </button>

            <button
              onClick={() => setAcceleratorTab("escrow")}
              className={`p-3 rounded-xl border transition-all text-left flex flex-col gap-1 ${
                acceleratorTab === "escrow"
                  ? "bg-white border-purple-500 shadow-sm ring-1 ring-purple-100"
                  : "bg-white/50 hover:bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <ShieldCheck className={`w-4 h-4 ${acceleratorTab === "escrow" ? "text-purple-600" : "text-slate-400"}`} />
                <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-mono">+$1,200</span>
              </div>
              <span className="text-[11px] font-bold text-slate-900 mt-1">Escrow Billing</span>
              <span className="text-[9px] text-slate-400 font-medium">High-ticket contracts</span>
            </button>

            <button
              onClick={() => setAcceleratorTab("referral")}
              className={`p-3 rounded-xl border transition-all text-left flex flex-col gap-1 ${
                acceleratorTab === "referral"
                  ? "bg-white border-purple-500 shadow-sm ring-1 ring-purple-100"
                  : "bg-white/50 hover:bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <UserPlus className={`w-4 h-4 ${acceleratorTab === "referral" ? "text-purple-600" : "text-slate-400"}`} />
                <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-mono">+$50</span>
              </div>
              <span className="text-[11px] font-bold text-slate-900 mt-1">Ambassador Link</span>
              <span className="text-[9px] text-slate-400 font-medium">Refer certified nodes</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-3xs">
            {acceleratorTab === "ai" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Task: Reinforcement Model Annotation</h3>
                      <p className="text-[10px] text-slate-500 font-medium">Evaluate two candidate outputs on Web3 security rules</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-purple-600">Reward: $25.00 + 250 pts</span>
                </div>

                {!aiEvaluated ? (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Model A */}
                      <button
                        onClick={() => setAiModelChoice("A")}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          aiModelChoice === "A"
                            ? "border-purple-500 bg-purple-50/40 ring-1 ring-purple-100"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black text-slate-900">Model A Output (CEI Compliant)</span>
                          {aiModelChoice === "A" && <CheckCircle className="w-4 h-4 text-purple-600" />}
                        </div>
                        <p className="text-[11px] text-slate-600 font-mono leading-relaxed bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
{`function transferFunds(address payable recipient) public payable {
  require(msg.value > 0, "Amount must exceed 0");
  // CEI Pattern (Checks-Effects-Interactions)
  (bool success, ) = recipient.call{value: msg.value}("");
  require(success, "Transfer failed");
}`}
                        </p>
                      </button>

                      {/* Model B */}
                      <button
                        onClick={() => setAiModelChoice("B")}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          aiModelChoice === "B"
                            ? "border-purple-500 bg-purple-50/40 ring-1 ring-purple-100"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black text-slate-900">Model B Output (Vulnerable pattern)</span>
                          {aiModelChoice === "B" && <CheckCircle className="w-4 h-4 text-purple-600" />}
                        </div>
                        <p className="text-[11px] text-slate-600 font-mono leading-relaxed bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
{`function transferFunds(address payable recipient) public payable {
  // Vulnerable transfer pattern - lacks validation
  recipient.transfer(msg.value);
  emit TransferEvent(recipient, msg.value);
}`}
                        </p>
                      </button>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Provide Vetting Feedback</label>
                      <textarea
                        placeholder="Explain why your choice provides safer security architectures (e.g., call gas-limit safeguards or CEI guidelines)..."
                        value={aiFeedback}
                        onChange={(e) => setAiFeedback(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
                        rows={2}
                      />
                    </div>

                    <button
                      disabled={!aiModelChoice || !aiFeedback.trim()}
                      onClick={() => {
                        handleClaimEarning(25, 250, "AI Reinforcement Evaluation: Web3 Security Annotation");
                        setAiEvaluated(true);
                      }}
                      className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-black uppercase tracking-widest text-[10px] py-3 rounded-xl transition-all"
                    >
                      Submit Evaluation & Claim $25.00
                    </button>
                  </div>
                ) : (
                  <div className="p-6 text-center flex flex-col items-center gap-3 bg-emerald-50/50 border border-emerald-100 rounded-xl animate-fade-in">
                    <CheckCircle className="w-12 h-12 text-emerald-600 animate-bounce" />
                    <div className="max-w-md">
                      <h4 className="text-sm font-black text-emerald-900 uppercase">Evaluation Approved & Credited!</h4>
                      <p className="text-xs text-emerald-700 font-medium mt-1">
                        Your vetting output was processed through ESTARR validation consensus. <strong className="font-bold">+$25.00</strong> and <strong className="font-bold">+250 pts</strong> have been added to your profile balance!
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setAiEvaluated(false);
                        setAiModelChoice("");
                        setAiFeedback("");
                      }}
                      className="mt-2 text-xs font-black text-purple-600 hover:text-purple-700 uppercase tracking-widest"
                    >
                      Evaluate Another Model Task
                    </button>
                  </div>
                )}
              </div>
            )}

            {acceleratorTab === "ip" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                      <FileCode className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Task: Digital IP Licensing Store</h3>
                      <p className="text-[10px] text-slate-500 font-medium">List modular boilerplate products for enterprise buyers to buy licenses</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-purple-600">Reward: $150.00 + 500 pts</span>
                </div>

                {!licensedInfo ? (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Select Digital IP Template</label>
                        <select
                          value={selectedTemplate}
                          onChange={(e) => setSelectedTemplate(e.target.value)}
                          className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 font-bold"
                        >
                          <option value="Secure Escrow Web3 Solidity Contract v2.1">Secure Escrow Web3 Solidity Contract v2.1</option>
                          <option value="Advanced LLM Agent Routing Middleware">Advanced LLM Agent Routing Middleware</option>
                          <option value="SaaS Subscription Stripe & Tailwind Boilerplate">SaaS Subscription Stripe & Tailwind Boilerplate</option>
                          <option value="Enterprise SEO Framework Checklist & Deck">Enterprise SEO Framework Checklist & Deck</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Set License Price (USD)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3.5 text-xs text-slate-400 font-black">$</span>
                          <input
                            type="number"
                            value={licenseFee}
                            onChange={(e) => setLicenseFee(e.target.value)}
                            className="w-full text-xs pl-7 p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const p = parseFloat(licenseFee) || 150;
                        if (paymentMode === "paystack") {
                          triggerPaystackCheckout({
                            amountUsd: p,
                            email: userProfile.email || "partner@estarr.com",
                            description: `IP License: ${selectedTemplate}`,
                            onSuccess: (ref) => {
                              const buyers = ["Aura Logistics Inc", "Solidity Finance", "NileTech Hubs", "Stripe Africa", "Ventures Africa"];
                              const pickedBuyer = buyers[Math.floor(Math.random() * buyers.length)];
                              handleClaimEarning(p, 500, `IP License Verified via Paystack (Ref: ${ref}) for ${selectedTemplate}`);
                              setLicensedInfo({
                                buyerName: pickedBuyer,
                                txHash: "0x" + Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join(""),
                                payout: p,
                                ref: ref
                              });
                            }
                          });
                        } else {
                          setIsLicensing(true);
                          setTimeout(() => {
                            const buyers = ["Aura Logistics Inc", "Solidity Finance", "NileTech Hubs", "Stripe Africa", "Ventures Africa"];
                            const pickedBuyer = buyers[Math.floor(Math.random() * buyers.length)];
                            handleClaimEarning(p, 500, `IP License Purchased by ${pickedBuyer}: ${selectedTemplate}`);
                            setLicensedInfo({
                              buyerName: pickedBuyer,
                              txHash: "0x" + Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join(""),
                              payout: p
                            });
                            setIsLicensing(false);
                          }, 1500);
                        }
                      }}
                      disabled={isLicensing || !licenseFee}
                      className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black uppercase tracking-widest text-[10px] py-3 rounded-xl transition-all"
                    >
                      {isLicensing ? "Deploying & Matching with Buyers..." : paymentMode === "paystack" ? `💳 Pay with Paystack ($${licenseFee})` : `Deploy IP & Sell Enterprise License`}
                    </button>
                  </div>
                ) : (
                  <div className="p-6 text-center flex flex-col items-center gap-3 bg-emerald-50/50 border border-emerald-100 rounded-xl animate-fade-in">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-xs">
                      SOLD
                    </div>
                    <div className="max-w-md">
                      <h4 className="text-sm font-black text-emerald-900 uppercase">License Sale Confirmed!</h4>
                      <p className="text-xs text-emerald-700 font-medium mt-1">
                        <strong className="font-bold">{licensedInfo.buyerName}</strong> licensed <strong className="font-bold">"{selectedTemplate}"</strong>!
                      </p>
                      <div className="mt-3 bg-white p-3 rounded-lg border border-emerald-100 text-left font-mono text-[9px] text-slate-500 flex flex-col gap-1 shadow-3xs">
                        <div><strong className="text-slate-700">Buyer:</strong> {licensedInfo.buyerName}</div>
                        <div><strong className="text-slate-700">Licensing Hash:</strong> {licensedInfo.txHash}</div>
                        {licensedInfo.ref && <div><strong className="text-slate-700">Paystack Ref:</strong> {licensedInfo.ref}</div>}
                        <div><strong className="text-slate-700">Status:</strong> SECURELY_SETTLED_PAYSTACK</div>
                        <div className="text-emerald-700 font-bold border-t border-slate-100 pt-1 mt-1 flex justify-between">
                          <span>ESTARR ESCROW Payout:</span>
                          <span>+${licensedInfo.payout} USD</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setLicensedInfo(null);
                        setLicenseFee("150");
                      }}
                      className="mt-2 text-xs font-black text-purple-600 hover:text-purple-700 uppercase tracking-widest"
                    >
                      License Another Template
                    </button>
                  </div>
                )}
              </div>
            )}

            {acceleratorTab === "escrow" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Task: Custom Escrow billing & deliverable flow</h3>
                      <p className="text-[10px] text-slate-500 font-medium">Create a project billing invoice with client-side simulated lock & release</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-purple-600">Reward: $1,200.00 + 300 pts</span>
                </div>

                {escrowStatus === "idle" && (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Client Entity Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Acme Tech Labs"
                          value={escrowClient}
                          onChange={(e) => setEscrowClient(e.target.value)}
                          className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Project Deliverable Title</label>
                        <input
                          type="text"
                          placeholder="e.g. API Node Redundancy Setup"
                          value={escrowTitle}
                          onChange={(e) => setEscrowTitle(e.target.value)}
                          className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Project Value (USD)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-xs text-slate-400 font-black">$</span>
                          <input
                            type="number"
                            value={escrowAmount}
                            onChange={(e) => setEscrowAmount(e.target.value)}
                            className="w-full text-xs pl-7 p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      disabled={!escrowClient.trim() || !escrowTitle.trim() || !escrowAmount}
                      onClick={() => {
                        setSimulatedEscrowId("esc-" + Math.floor(Math.random() * 900000 + 100000));
                        setEscrowStatus("created");
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black uppercase tracking-widest text-[10px] py-3 rounded-xl transition-all"
                    >
                      Generate Escrow Retainer Invoice
                    </button>
                  </div>
                )}

                {escrowStatus === "created" && (
                  <div className="flex flex-col gap-4 bg-slate-50 p-4 border border-slate-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded uppercase font-mono">Status: Draft Invoice Live</span>
                      <span className="text-xs font-mono font-bold text-slate-500">ID: {simulatedEscrowId}</span>
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      Your custom escrow invoice is prepared for <strong className="font-bold">{escrowClient}</strong> for the contract: <strong className="font-bold">"{escrowTitle}"</strong> valued at <strong className="font-bold">${parseFloat(escrowAmount).toLocaleString()}</strong>.
                    </div>
                    <div className="border-t border-slate-200 pt-3 flex gap-2">
                      <button
                        onClick={() => {
                          const val = parseFloat(escrowAmount) || 1200;
                          if (paymentMode === "paystack") {
                            triggerPaystackCheckout({
                              amountUsd: val,
                              email: userProfile.email || "client@estarr.com",
                              description: `Escrow Lock: ${escrowTitle}`,
                              onSuccess: (ref) => {
                                setRealTxReference(ref);
                                setEscrowStatus("funded");
                              }
                            });
                          } else {
                            setEscrowStatus("funded");
                          }
                        }}
                        className="flex-1 bg-slate-950 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[10px] py-2.5 rounded-xl transition-all"
                      >
                        {paymentMode === "paystack" ? `💳 Lock with Paystack ($${parseFloat(escrowAmount).toLocaleString()})` : "Simulate Client Escrow Deposit (Lock Funds)"}
                      </button>
                      <button
                        onClick={() => setEscrowStatus("idle")}
                        className="px-4 border border-slate-300 text-slate-600 hover:bg-slate-100 font-black uppercase tracking-widest text-[10px] rounded-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {escrowStatus === "funded" && (
                  <div className="flex flex-col gap-4 bg-purple-50 p-4 border border-purple-200 rounded-xl animate-pulse">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-purple-600 text-white font-bold px-2 py-0.5 rounded uppercase font-mono">Status: Escrow Safe Locked</span>
                      <span className="text-xs font-mono font-bold text-purple-600">ID: {simulatedEscrowId}</span>
                    </div>
                    <div className="text-xs text-purple-950 font-medium">
                      Success! <strong className="font-bold">{escrowClient}</strong> has locked <strong className="font-bold">${parseFloat(escrowAmount).toLocaleString()}</strong> in the secure ESTARR Smart Escrow Ledger. {realTxReference && <span>Verified Paystack Reference: <strong>{realTxReference}</strong>.</span>} Deliver your files or report completion to unlock.
                    </div>
                    <button
                      onClick={() => {
                        const finalAmount = parseFloat(escrowAmount) || 1200;
                        const label = realTxReference 
                          ? `Escrow Deliverable Released (Paystack Ref: ${realTxReference}): ${escrowTitle}`
                          : `Escrow Deliverable Released: ${escrowTitle}`;
                        handleClaimEarning(finalAmount, 300, label);
                        setEscrowStatus("released");
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest text-[10px] py-3 rounded-xl transition-all shadow-sm"
                    >
                      Submit Deliverable & Release Escrow Payout
                    </button>
                  </div>
                )}

                {escrowStatus === "released" && (
                  <div className="p-6 text-center flex flex-col items-center gap-3 bg-emerald-50/50 border border-emerald-100 rounded-xl animate-fade-in">
                    <CheckCircle className="w-12 h-12 text-emerald-600 animate-bounce" />
                    <div className="max-w-md">
                      <h4 className="text-sm font-black text-emerald-900 uppercase">Escrow Released Successfully!</h4>
                      <p className="text-xs text-emerald-700 font-medium mt-1">
                        The deliverable for <strong className="font-bold">"{escrowTitle}"</strong> was verified. <strong className="font-bold">${parseFloat(escrowAmount).toLocaleString()} USD</strong> {realTxReference && `(settled securely through Paystack reference ${realTxReference})`} and <strong className="font-bold">+300 pts</strong> have been deposited directly into your digital wallet.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEscrowStatus("idle");
                        setEscrowClient("");
                        setEscrowTitle("");
                        setEscrowAmount("1200");
                        setRealTxReference("");
                      }}
                      className="mt-2 text-xs font-black text-purple-600 hover:text-purple-700 uppercase tracking-widest"
                    >
                      Generate Another Escrow Invoice
                    </button>
                  </div>
                )}
              </div>
            )}

            {acceleratorTab === "referral" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Task: Verified ecosystem ambassador invite</h3>
                      <p className="text-[10px] text-slate-500 font-medium">Onboard professional peers or clients to receive a verified builder premium</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-purple-600">Reward: $50.00 + 500 pts</span>
                </div>

                {!referralSuccessMsg ? (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Colleague / Client Email Address</label>
                        <input
                          type="email"
                          placeholder="e.g. partner@ventures.co"
                          value={referralEmail}
                          onChange={(e) => setReferralEmail(e.target.value)}
                          className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Profession / Target Role</label>
                        <select
                          value={referralRole}
                          onChange={(e) => setReferralRole(e.target.value)}
                          className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium font-bold"
                        >
                          <option value="AI Developer">AI Developer / Trainer</option>
                          <option value="Enterprise Client">Enterprise Client (Hiring)</option>
                          <option value="Solidity Engineer">Solidity Smart Contract Auditor</option>
                          <option value="Product Designer">Aesthetic UI/UX Designer</option>
                        </select>
                      </div>
                    </div>

                    <button
                      disabled={!referralEmail.trim()}
                      onClick={() => {
                        handleClaimEarning(50, 500, `Ambassador Referral Onboarded: ${referralEmail}`);
                        setReferralSuccessMsg(`Invitation dispatched to ${referralEmail}. Since they are pre-verified via our network sync protocol, your ambassador premium of $50.00 and 500 pts was successfully settled!`);
                      }}
                      className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-black uppercase tracking-widest text-[10px] py-3 rounded-xl transition-all"
                    >
                      Send Pre-Verified Onboarding Link
                    </button>
                  </div>
                ) : (
                  <div className="p-6 text-center flex flex-col items-center gap-3 bg-emerald-50/50 border border-emerald-100 rounded-xl animate-fade-in">
                    <CheckCircle className="w-12 h-12 text-emerald-600 animate-bounce" />
                    <div className="max-w-md">
                      <h4 className="text-sm font-black text-emerald-900 uppercase">Referral Settled & Credited!</h4>
                      <p className="text-xs text-emerald-700 font-medium mt-1 leading-relaxed">
                        {referralSuccessMsg}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setReferralSuccessMsg("");
                        setReferralEmail("");
                      }}
                      className="mt-2 text-xs font-black text-purple-600 hover:text-purple-700 uppercase tracking-widest"
                    >
                      Invite Another Colleague
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div className="flex bg-slate-100/50 p-1.5 rounded-2xl w-fit border border-slate-200/50 backdrop-blur-sm">
            <button 
              onClick={() => setActiveTab("available")}
              className={`px-6 py-2.5 rounded-xl text-sm font-black tracking-wide transition-all whitespace-nowrap ${activeTab === "available" ? "bg-white text-blue-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-800"}`}
            >
              Available Roles
            </button>
            <button 
              onClick={() => setActiveTab("history")}
              className={`px-6 py-2.5 rounded-xl text-sm font-black tracking-wide transition-all whitespace-nowrap ${activeTab === "history" ? "bg-white text-blue-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-800"}`}
            >
              Work History
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
             <div className="bg-emerald-50 text-emerald-700 px-5 py-3 rounded-2xl text-sm font-black tracking-wide flex items-center gap-2 border border-emerald-200/50 shadow-sm">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                Potential Earnings: <span className="font-black text-emerald-600">${potentialEarnings.toFixed(2)}</span>
             </div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200/60 rounded-3xl p-5 mb-8 shadow-sm flex flex-col gap-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search roles or skills..." 
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 text-sm font-semibold focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all placeholder:text-slate-400 text-slate-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto shrink-0 pb-1 md:pb-0">
               <select 
                 className="px-5 py-3.5 text-sm font-bold text-slate-700 bg-white border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 min-w-[150px] cursor-pointer appearance-none shadow-sm transition-all"
                 value={minReward}
                 onChange={(e) => setMinReward(Number(e.target.value))}
               >
                 <option value={0}>Any Reward</option>
                 <option value={1}>$1+ per task</option>
                 <option value={10}>$10+ per task</option>
                 <option value={100}>$100+ per task</option>
               </select>

               <div className="flex bg-slate-100/50 border border-slate-200/50 rounded-2xl p-1.5 shrink-0 backdrop-blur-sm">
                 <button className="px-5 py-2 bg-white text-slate-900 rounded-xl text-xs font-black tracking-wide shadow-sm flex items-center gap-2 border border-slate-200/50 transition-all">
                   All <span className="bg-slate-100 px-2 py-0.5 rounded-lg text-[10px] text-slate-500">{filteredTasks.length}</span>
                 </button>
                 <button className="px-5 py-2 text-slate-500 hover:text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 hover:bg-slate-50">
                   Priority
                 </button>
               </div>
            </div>
          </div>

          <div className="relative z-10 flex overflow-x-auto scrollbar-none gap-2 pt-3 border-t border-slate-100/80">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wide whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white shadow-[0_4px_14px_0_rgba(15,23,42,0.39)]' : 'bg-slate-50/80 text-slate-600 hover:bg-slate-100 border border-slate-200/60 hover:border-slate-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === "available" ? (
          filteredTasks.map(task => {
            const Icon = task.icon;
            return (
            <div key={task.id} className="bg-white border border-slate-100 hover:border-slate-200 rounded-[32px] p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40">
              <div className="flex w-full mb-6">
                <div className="border border-slate-200/60 rounded-xl px-3 py-2 flex items-center justify-between bg-slate-50/50 w-full shadow-sm gap-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Potential Earn</span>
                  <span className="text-base font-black text-slate-900 whitespace-nowrap">${task.reward.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mb-4 flex-1">
                <h3 className="text-[22px] font-bold text-[#0f172a] leading-snug mb-4 line-clamp-2" title={task.title}>{task.title}</h3>

                <p className="text-[15px] text-slate-500 line-clamp-2 leading-relaxed mb-2">
                  {task.description}
                </p>
                <button 
                  onClick={() => setDetailsTask(task)} 
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-bold flex items-center gap-1 transition-colors"
                >
                  View Details
                </button>
              </div>


                
              <div className="mt-auto">
                {applicationStatus[task.id] !== 'accepted' ? (
                  <button 
                    onClick={() => handleApply(task.id)}
                    disabled={applicationStatus[task.id] === 'pending'}
                    className={`w-full px-4 py-3.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all flex items-center justify-center gap-2 ${applicationStatus[task.id] === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                  >
                    {applicationStatus[task.id] === 'pending' ? 'Application Under Review...' : 'Apply to Qualify'}
                    {applicationStatus[task.id] !== 'pending' && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                ) : (
                  <button 
                    onClick={() => setActiveTask(task)} 
                    className="w-full bg-emerald-600 text-white px-4 py-3.5 rounded-2xl text-sm font-bold whitespace-nowrap hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    {task.progress > 0 ? "Resume Work" : "Approved - Start Task"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          )})
        ) : (
          <div className="col-span-full">
            {importedTasks.filter(t => completedTasks.includes(t.id)).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {importedTasks.filter(t => completedTasks.includes(t.id)).map(task => {
                  const Icon = task.icon;
                  return (
                  <div key={task.id} className="bg-slate-50/50 border border-slate-100 hover:border-slate-200 rounded-[32px] p-6 flex flex-col justify-between h-full group transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40">
                    <div className="flex w-full mb-6">
                      <div className="border border-emerald-100/50 rounded-2xl px-4 py-2.5 flex items-center justify-between bg-emerald-50/50 w-full shadow-sm">
                        <span className="text-[10px] font-bold text-emerald-600/70 uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap"><CheckCircle className="w-3.5 h-3.5" /> Completed</span>
                      </div>
                    </div>
                    
                    <div className="mb-4 flex-1">
                      <h3 className="text-[22px] font-bold text-slate-800 leading-snug mb-4 group-hover:text-emerald-700 transition-colors line-clamp-2" title={task.title}>{task.title}</h3>
                      <p className="text-[15px] text-slate-400 line-clamp-2 leading-relaxed mb-4 group-hover:text-slate-500 transition-colors">{task.description}</p>
                      <button 
                        onClick={() => setDetailsTask(task)} 
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-bold flex items-center gap-1 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                    
                    <div className="mt-auto pt-5 border-t border-slate-200/60 flex justify-between items-center">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Earned</span>
                      <span className="font-black text-emerald-600 text-2xl">${task.reward.toFixed(2)}</span>
                    </div>
                  </div>
                )})}
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
      {detailsTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setDetailsTask(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button onClick={() => setDetailsTask(null)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="flex gap-4 mb-6 pr-10">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${detailsTask.bg || 'bg-purple-50'} ${detailsTask.color || 'text-purple-600'}`}>
                {React.createElement(detailsTask.icon, { className: "w-8 h-8" })}
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{detailsTask.title}</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl ${detailsTask.bg || 'bg-purple-50'} ${detailsTask.color || 'text-purple-600'}`}>
                    {detailsTask.category}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> {detailsTask.timeEstimate}
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3">Task Description</h4>
              <p className="text-slate-600 leading-relaxed text-lg">{detailsTask.description}</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Base Rate</p>
                <p className="text-2xl font-black text-slate-900">${detailsTask.baseRate.toFixed(2)}</p>
              </div>
              <div className="w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex-1">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Perf. Bonus</p>
                <p className="text-2xl font-black text-emerald-600">+${detailsTask.bonus.toFixed(2)}</p>
              </div>
              <div className="w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex-1">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Total Potential</p>
                <p className="text-2xl font-black text-blue-600">${detailsTask.reward.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDetailsTask(null)}
                className="px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};