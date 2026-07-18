import { PageBanner } from "./PageBanner";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableTaskItem } from "./SortableTaskItem";
import { ConsultancyTask, UserProfile, BrandCampaign, Job } from "../types";
import {
  Plus,
  Search,
  Trash2,
  Calendar,
  User,
  Sparkles,
  Send,
  AlertCircle,
  TrendingUp,
  Lock,
  ShieldCheck,
  FileText,
  ChevronRight,
  Wallet,
  CheckSquare,
  ArrowRight,
  Clock,
  Building,
  LineChart,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { VoiceRecorder, AudioPlayer } from "./VoiceRecorder";
import { MessageSquare } from "lucide-react";

interface ConsultancySectionProps {
  userProfile: UserProfile;
  tasks: ConsultancyTask[];
  jobs: Job[];
  onUpdateTasks: (tasks: ConsultancyTask[]) => void;
  onUpdateJobs: (jobs: Job[]) => void;
  onOpenAiChat: (prompt: string, context: string) => void;
  onNavigate?: (tab: string) => void;
  campaigns?: BrandCampaign[];
}

// Transaction Feed to show realistic escrow updates
const initialEscrowFeed: any[] = [];

// Helper to extract rich contract details from a task object
export function parseTaskDetails(task: ConsultancyTask) {
  let budget = 0; // default 0 Dollars
  let client = task.assignee || "External Client";
  let cleanDesc = task.desc;

  if (task.desc.includes("||")) {
    const parts = task.desc.split("||");
    if (parts.length >= 3) {
      budget = parseFloat(parts[0].replace(/[^0-9.]/g, "")) || 0;
      client = parts[1].trim();
      cleanDesc = parts[2].trim();
    }
  } else {
    // Hardcoded fallbacks for the initial tasks
    if (task.id === "t1") {
      budget = 250000;
      client = "Enterprise Corp";
    } else if (task.id === "t2") {
      budget = 180000;
      client = "FinTech Next";
    } else if (task.id === "t3") {
      budget = 120000;
      client = "SecureCloud Tech";
    }
  }

  return { budget, client, cleanDesc };
}

import { ConsultancyClientSection } from "./ConsultancyClientSection";
import { ConsultancyDashboard } from "./ConsultancyDashboard";

// Helper function
function getTaskProgress(desc: string) {
  const lines = desc.split('\n');
  const subtasks = lines.filter(line => line.trim().startsWith('- ['));
  if (subtasks.length === 0) return 0;
  
  const completed = subtasks.filter(line => line.includes('- [x]')).length;
  return Math.round((completed / subtasks.length) * 100);
}

function getMilestonesForTask(task: ConsultancyTask) {
  const { cleanDesc } = parseTaskDetails(task);
  const lines = cleanDesc.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  
  // Find lines starting with "Milestone" or "- " or "- [" or containing numeric milestone indicators
  let milestoneLines = lines.filter(line => {
    const lower = line.toLowerCase();
    return lower.startsWith("milestone") || line.startsWith("- ") || line.startsWith("- [");
  });

  if (milestoneLines.length === 0) {
    if (lines.length > 0 && cleanDesc.length > 20) {
      milestoneLines = lines.slice(0, 4); // Use first few lines
    } else {
      // Default fallback milestones
      milestoneLines = [
        "Milestone 1: Contract Kickoff & Strategy Sign-off (30% Escrow)",
        "Milestone 2: Core Execution & Implementation (50% Escrow)",
        "Milestone 3: Final Production Handoff & Release (20% Escrow)"
      ];
    }
  }

  const total = milestoneLines.length;
  const milestones = milestoneLines.map((text, idx) => {
    let cleanText = text.replace(/^-\s*\[[ xX]\]\s*/, "").replace(/^-\s*/, "");
    
    // Determine milestone status dynamically based on task status and its index
    let mStatus: "todo" | "inprogress" | "review" | "done" = "todo";
    
    if (task.status === "done") {
      mStatus = "done";
    } else if (task.status === "review" || task.status === "needs-verification") {
      if (idx < total - 1) {
        mStatus = "done";
      } else {
        mStatus = "review"; // Last milestone is in review
      }
    } else if (task.status === "inprogress") {
      if (idx === 0) {
        mStatus = "done"; // First milestone done
      } else if (idx === 1) {
        mStatus = "inprogress"; // Second one active
      } else {
        mStatus = "todo";
      }
    } else {
      mStatus = "todo";
    }

    return {
      title: cleanText,
      status: mStatus
    };
  });

  // Calculate overall percentage of total milestone completion
  const completedCount = milestones.filter(m => m.status === "done").length;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return { milestones, percent, completedCount, total };
}

function getCountdown(dueDate?: string) {
  if (!dueDate) return null;
  const diff = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? `${diff}d left` : diff === 0 ? "Due today" : "Overdue";
}

export default function ConsultancySection({
  userProfile,
  tasks,
  jobs,
  onUpdateTasks,
  onUpdateJobs,
  onOpenAiChat,
  onNavigate,
  campaigns,
}: ConsultancySectionProps) {
  if (userProfile?.accountType === "jobOwner") {
    return <ConsultancyClientSection userProfile={userProfile} tasks={tasks} jobs={jobs} onUpdateTasks={onUpdateTasks} onUpdateJobs={onUpdateJobs} onNavigate={onNavigate} />;
  }

  const [activeTab, setActiveTab] = useState<"board" | "deal-builder" | "escrow-feed" | "dashboard">("board");
  
  // States for contract creation
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [newDueDate, setNewDueDate] = useState("");
  const [newBlockingTaskIds, setNewBlockingTaskIds] = useState<string[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"createdAt" | "status" | "priority">("createdAt");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [openCommentsId, setOpenCommentsId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOrder === "createdAt") return b.id.localeCompare(a.id);
    if (sortOrder === "priority") {
      const p = { High: 3, Medium: 2, Low: 1 };
      return p[b.priority] - p[a.priority];
    }
    if (sortOrder === "status") {
      const s = { todo: 1, inprogress: 2, review: 3, done: 4 };
      return s[a.status] - s[b.status];
    }
    return 0;
  });

  // AI Deal Estimator states
  const [serviceType, setServiceType] = useState("");
  const [estimating, setEstimating] = useState(false);
  const [estimatedDeal, setEstimatedDeal] = useState<{
    pricing: string;
    milestones: string[];
    pitch: string;
    suggestedClient: string;
    title: string;
  } | null>(null);

  // Success payout celebration banner
  const [payoutNotification, setPayoutNotification] = useState<{
    show: boolean;
    amount: number;
    title: string;
  }>({ show: false, amount: 0, title: "" });

  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newBudget || !newClient) return;

    const formattedBudget = parseFloat(newBudget) || 100000;
    // Serialize budget and client into description to maintain type safety with Parent
    const serializedDesc = `$${formattedBudget.toLocaleString()} || ${newClient} || ${newDesc || "Milestone deliverable details."}`;

    const newTask: ConsultancyTask = {
      id: `task-${Date.now()}`,
      title: newTitle,
      desc: serializedDesc,
      status: "todo", // Starts as proposal
      priority: newPriority,
      assignee: userProfile.name,
      dueDate: newDueDate || undefined,
      blockingTaskIds: newBlockingTaskIds,
    };

    onUpdateTasks([...tasks, newTask]);
    setNewTitle("");
    setNewDesc("");
    setNewBudget("");
    setNewClient("");
    setNewBlockingTaskIds([]);
    setIsAddingTask(false);
  };

  const moveTask = (taskId: string, newStatus: ConsultancyTask["status"], feedback?: string, qualityScore?: number) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, status: newStatus, feedback, qualityScore };
      }
      return t;
    });
    onUpdateTasks(updated);
  };

  // Simulate client approving milestones and disbursing actual funds to the wallet
  const handleApproveAndRelease = (e: React.MouseEvent, task: ConsultancyTask, budget: number) => {
    // 1. Play celebration
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ['#a855f7', '#10b981', '#3b82f6'],
      disableForReducedMotion: true,
    });
    
    setPayoutNotification({
      show: true,
      amount: budget,
      title: task.title,
    });

    // 2. Move task to 'done' (disbursed)
    moveTask(task.id, "done");

    // Auto close after 5 seconds
    setTimeout(() => {
      setPayoutNotification((prev) => ({ ...prev, show: false }));
    }, 5500);
  };

  const handleAddComment = (taskId: string, text: string, audioUrl?: string, audioDuration?: number) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          comments: [
            ...(t.comments || []),
            {
              id: `comment-${Date.now()}`,
              author: userProfile.name,
              text,
              audioUrl,
              audioDuration,
              time: "Just now"
            }
          ]
        };
      }
      return t;
    });
    onUpdateTasks(updated);
  };

  const deleteTask = (taskId: string) => {
    const updated = tasks.filter((t) => t.id !== taskId);
    onUpdateTasks(updated);
  };

  const deleteSelectedTasks = () => {
    const updated = tasks.filter((t) => !selectedTasks.includes(t.id));
    onUpdateTasks(updated);
    setSelectedTasks([]);
  };

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  // AI Pricing and milestone estimator logic
  const handleEstimateDeal = () => {
    if (!serviceType.trim()) return;
    setEstimating(true);

    setTimeout(() => {
      // Default fallback is standard Instagram / TikTok UGC Campaign
      let recommendedPrice = "$180,000 - $350,000";
      let suggestedMilestones = [
        "Milestone 1: Script outline, campaign brief, and concept sign-off (30% Escrow)",
        "Milestone 2: High-resolution video draft submission with subtitling (50% Escrow)",
        "Milestone 3: Live campaign posting and dynamic analytics dashboard handover (20% Escrow)"
      ];
      let pitch = `Hey brand team! I am a Lagos-based lifestyle creator with high local engagement. I'll craft a high-retention 45s integration that naturally integrates your product. Let's create an Escrow contract to guarantee structured deliverables and swift payouts!`;
      let title = "High-Converting UGC Video Partnership";
      let suggestedClient = "FinTech Next";

      const query = serviceType.toLowerCase();
      if (query.includes("youtube") || query.includes("long") || query.includes("podcast") || query.includes("vlog")) {
        recommendedPrice = "$350,000 - $650,000";
        suggestedMilestones = [
          "Milestone 1: Video talking points and sponsor script approval (25% Escrow)",
          "Milestone 2: Complete vlog rough-cut with organic 90s mid-roll placement (50% Escrow)",
          "Milestone 3: Final SEO-optimized 4K render, custom thumbnail upload, and publish (25% Escrow)"
        ];
        pitch = `Hello there! I run a leading tech & lifestyle YouTube channel. I can place an organic, highly persuasive 90-second integration in my next travel episode. Let's secure our mutual milestones via Escrow!`;
        title = "Dedicated YouTube Vlog Integration";
        suggestedClient = "Chipper Cash Ltd";
      } else if (query.includes("agric") || query.includes("poultry") || query.includes("farm") || query.includes("vocational")) {
        recommendedPrice = "$200,000 - $400,000";
        suggestedMilestones = [
          "Milestone 1: Educational talking points outlining modern poultry benefits (20% Escrow)",
          "Milestone 2: Deliver 2x interactive feed unboxing and chick growth vlogs (50% Escrow)",
          "Milestone 3: Host a live follower Q&A session with final conversion metrics report (30% Escrow)"
        ];
        pitch = `Hello team! I document my real-life poultry farm growth daily on TikTok. I would love to showcase your starter crumbles to my 80k active young farmers. Let's lock this campaign in Escrow!`;
        title = "Agricultural Creator Influence Series";
        suggestedClient = "Amo Feed Mills";
      } else if (query.includes("instagram") || query.includes("carousel") || query.includes("photo") || query.includes("styling")) {
        recommendedPrice = "$120,000 - $220,000";
        suggestedMilestones = [
          "Milestone 1: Moodboard & brand-aligned aesthetic styling layout approval (30% Escrow)",
          "Milestone 2: Captions, visual photo assets draft, and swipe-up link review (50% Escrow)",
          "Milestone 3: Static grid publish with analytics tracking confirmation (20% Escrow)"
        ];
        pitch = `Hi! I specialize in high-converting fashion styling guides on Instagram. I will showcase your premium linen garments in high-traffic areas of Lagos. Let's establish our milestones safely in Escrow!`;
        title = "Instagram Aesthetic Styling Campaign";
        suggestedClient = "SecureCloud Tech";
      }

      setEstimatedDeal({
        pricing: recommendedPrice,
        milestones: suggestedMilestones,
        pitch,
        suggestedClient,
        title,
      });
      setEstimating(false);
    }, 1200);
  };

  const importAiDealAsContract = () => {
    if (!estimatedDeal) return;
    setNewTitle(estimatedDeal.title);
    setNewClient(estimatedDeal.suggestedClient);
    
    // Extract numeric estimation from string e.g. "$450,000 - $800,000" -> 450000
    const numbersOnly = estimatedDeal.pricing.split("-")[0].replace(/[^0-9]/g, "");
    setNewBudget(numbersOnly);
    setNewDesc(estimatedDeal.milestones.join("\n"));
    setIsAddingTask(true);
    setActiveTab("board");
    
    // Smooth scroll to top of form
    setTimeout(() => {
      document.getElementById("contract-creation-form-box")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Financial statistics calculation
  const stats = tasks.reduce(
    (acc, task) => {
      const { budget } = parseTaskDetails(task);
      acc.total += budget;
      if (task.status === "todo") acc.proposed += budget;
      if (task.status === "inprogress") acc.escrowed += budget;
      if (task.status === "review") acc.pendingRelease += budget;
      if (task.status === "done") acc.disbursed += budget;
      return acc;
    },
    { total: 0, proposed: 0, escrowed: 0, pendingRelease: 0, disbursed: 0 }
  );

  const chartData = [
    { name: "Proposed", value: tasks.filter(t => t.status === "todo").length, color: "#f59e0b" },
    { name: "Funded", value: tasks.filter(t => t.status === "inprogress").length, color: "#10b981" },
    { name: "Review", value: tasks.filter(t => t.status === "review").length, color: "#a855f7" },
    { name: "Disbursed", value: tasks.filter(t => t.status === "done").length, color: "#64748b" },
  ].filter(d => d.value > 0);

  return (
    <div id="consultancy-section" className="flex flex-col gap-6">
      
      {/* Payout Celebratory Animation Banner */}
      <AnimatePresence>
        {payoutNotification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed inset-x-4 top-20 md:top-24 md:left-1/3 md:right-12 z-50 bg-slate-900 border-4 border-emerald-500 text-white rounded-3xl p-6 shadow-xl shadow-emerald-100 border border-emerald-50 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="bg-emerald-500 text-slate-900 rounded-full p-4 flex items-center justify-center animate-bounce shrink-0 shadow-lg">
              <Wallet className="w-8 h-8" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] tracking-widest font-mono text-emerald-400 font-bold uppercase block mb-1">
                🎉 Escrow Funds Released!
              </span>
              <h4 className="font-display font-black text-2xl tracking-tight text-white mb-1">
                ${payoutNotification.amount.toLocaleString()} Cleared
              </h4>
              <p className="text-xs text-slate-300">
                Milestone approved for <span className="font-bold text-white">"{payoutNotification.title}"</span>. Funds are instantly withdrawn to your linked Bank Account!
              </p>
            </div>
            <button
              onClick={() => setPayoutNotification((p) => ({ ...p, show: false }))}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <PageBanner
        title="Consultancy & Milestone Management"
        subtitle="ENTERPRISE CONSULTANCY"
        description={
          <div className="flex flex-col gap-3">
            <p>
              Draft secure consultancy contracts, view live funds locked in REMOGIGS escrow, submit deliverables, and trigger secure bank disbursements upon milestone approval.
            </p>
          </div>
        }
        icon={TrendingUp}
        actions={
          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setIsAddingTask(true)}
              className="bg-purple-500 hover:bg-purple-600 text-slate-900 px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer transition-colors shadow-md shadow-purple-100 border-2 border-slate-950 w-full justify-center sm:w-auto"
            >
              <Plus className="w-4 h-4" /> Create Milestone Contract
            </button>
          </div>
        }
      />

      {/* Escrow Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3 items-start text-xs text-emerald-900">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-emerald-950">REMOGIGS 100% Escrow Protection Guard</h4>
          <p className="text-emerald-800 mt-0.5">
            Your money stays securely locked in escrow until the supplier delivers your items or completes the service. Upon verification, the escrow automatically pays out. Absolutely risk-free!
          </p>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Value</span>
          <span className="text-2xl font-black text-slate-900">${stats.total.toLocaleString()}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Locked In Escrow</span>
          <span className="text-2xl font-black text-emerald-600">${stats.escrowed.toLocaleString()}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Under Review</span>
          <span className="text-2xl font-black text-amber-600">${stats.pendingRelease.toLocaleString()}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Disbursed</span>
          <span className="text-2xl font-black text-sky-600">${stats.disbursed.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Navigation, Live Feeds, and AI Deal Estimator */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Section Navigation Tabs */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Contracts
            </h2>
          </div>

          {/* Tab 1: AI Deal Estimator & Pitch Writer */}
          {activeTab === "deal-builder" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <div>
                <h4 className="font-display font-bold text-base text-slate-900">
                  REMOGIGS AI Deal Builder
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Struggling to set profitable prices or structure contract milestones? Type your service below and let the AI build a high-yielding offer suitable for the local African ecosystem.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-700">What service are you providing?</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    placeholder="e.g. Tailor wedding Ankara gowns, Develop website"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                  <button
                    onClick={handleEstimateDeal}
                    disabled={estimating}
                    className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer shrink-0"
                  >
                    {estimating ? "..." : "Build"}
                  </button>
                </div>
              </div>

              {estimatedDeal && (
                <div className="bg-purple-50/50 border border-orange-200/50 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-purple-700 font-bold block uppercase">Recommended Pricing</span>
                      <h5 className="font-display font-black text-sm text-slate-900 mt-0.5">{estimatedDeal.pricing}</h5>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                      Highly Profitable
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 border-t border-orange-200/20 pt-3">
                    <span className="text-[10px] font-mono font-bold text-slate-700">Structured Milestones:</span>
                    <ul className="flex flex-col gap-1 text-[11px] text-slate-500 font-medium">
                      {estimatedDeal.milestones.map((m, idx) => (
                        <li key={idx} className="flex gap-1.5 items-start">
                          <span className="text-purple-500 font-bold shrink-0">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-1 border-t border-orange-200/20 pt-3">
                    <span className="text-[10px] font-mono font-bold text-slate-700">AI Client Proposal Pitch:</span>
                    <p className="text-[11px] text-slate-500 italic bg-white/70 p-2.5 rounded-xl border border-orange-100">
                      "{estimatedDeal.pitch}"
                    </p>
                  </div>

                  <button
                    onClick={importAiDealAsContract}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Import as Milestone Contract
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Escrow Activities Log */}
          {activeTab === "escrow-feed" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <div>
                <h4 className="font-display font-bold text-base text-slate-900">
                  Escrow Smart Contract Logs
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Immutable transaction trail of REMOGIGS Peer-to-Peer payment security.
                </p>
              </div>

              <div className="flex flex-col gap-3.5">
                <div className="text-center p-6 text-slate-500 text-xs">
                  No active escrow activities.
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Performance Insights sidebar */}
          {activeTab === "dashboard" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4 animate-fade-in">
              <div>
                <h4 className="font-display font-bold text-base text-slate-900 flex items-center gap-1.5">
                  🛡️ Escrow Health & Insights
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  How to maximize your platform ratings and guarantee swift escrow disbursements.
                </p>
              </div>

              <div className="flex flex-col gap-3 text-xs text-slate-600 font-medium">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-1">
                  <span className="font-bold text-purple-600 text-[10px] uppercase tracking-wider">
                    💡 Payout Optimization
                  </span>
                  <p className="leading-relaxed text-slate-500 text-[11px] mt-0.5">
                    To unlock payments, submit deliverables and request review. Once the client approves, funds are instantly released to your wallet.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-1">
                  <span className="font-bold text-emerald-600 text-[10px] uppercase tracking-wider">
                    📋 Checklist
                  </span>
                  <ul className="list-disc pl-4 text-slate-500 text-[11px] flex flex-col gap-1 mt-1">
                    <li>Submit active milestones on time</li>
                    <li>Keep review comments clear to avoid delays</li>
                    <li>Add audio descriptions to deliverables</li>
                    <li>Verify bank routing details in your wallet</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Standard Left Component: Live Creator Deal Matching */}
          {activeTab === "board" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <div>
                <h4 className="font-display font-bold text-base text-slate-900">
                  Live Funded Brand Deals
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  These verified corporate organizations have active, pre-funded campaign contracts. Send them pitches to secure deals!
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {campaigns && campaigns.length > 0 ? campaigns.slice(0, 3).map((camp, i) => (
                  <div
                    key={camp.id || i}
                    className="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex flex-col hover:border-purple-600 transition-colors"
                  >
                    <div className={`w-full h-32 overflow-hidden bg-gradient-to-br ${camp.color || "from-purple-500 to-indigo-600"} flex items-center justify-center`}>
                      <Sparkles className="w-8 h-8 text-white/30" />
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-purple-500 uppercase">{camp.brand}</span>
                        <span className="text-xs font-mono font-black text-slate-900">${camp.budget.toLocaleString()}</span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-800">{camp.title}</h5>
                      <button
                        onClick={() => {
                          setServiceType(`Shoot organic ${camp.platform} content for ${camp.brand} showing: ${(camp.deliverables || []).join(", ")}`);
                          setActiveTab("deal-builder");
                          handleEstimateDeal();
                        }}
                        className="w-full bg-white border border-slate-200 text-slate-700 hover:border-slate-400 py-1.5 rounded-xl text-[10px] font-bold cursor-pointer transition-colors mt-1"
                      >
                        Estimate Campaign Pricing & Milestones
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center p-6 text-slate-500 text-xs">
                    No active campaigns currently available.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Secure Partner Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 flex items-center gap-3.5">
            <div className="bg-purple-500 text-slate-900 p-2.5 rounded-xl font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-tight">100% Secure Escrow</h5>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                Contracts are back-secured by Partner Banks. Disbursed instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Escrow Contract Board & Workspaces */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {activeTab === "dashboard" ? (
            <ConsultancyDashboard tasks={tasks} userProfile={userProfile} />
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">
                  Contract & Milestone Pipeline
                </h3>
                <div className="flex items-center gap-3">
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 cursor-pointer focus:outline-none"
                  >
                    <option value="createdAt">Created Date</option>
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
                  </select>
                  <button
                    onClick={() => setIsAddingTask(!isAddingTask)}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                  >
                    {isAddingTask ? "Hide Form" : "Create Contract"}
                  </button>
                </div>
              </div>

          {isAddingTask && (
            <div
              id="contract-creation-form-box"
              className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-lg shadow-purple-100 border border-slate-100 flex flex-col gap-4 animate-fade-in"
            >
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <FileText className="w-4 h-4 text-purple-500" />
                <h4 className="font-display font-bold text-sm text-slate-900">
                  Formulate New Escrow Contract Proposal
                </h4>
              </div>

              <form onSubmit={handleCreateContract} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-500">
                      Consultancy Contract Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Enterprise AI Implementation"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-500">
                      Contracting Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flutterwave Nigeria"
                      value={newClient}
                      onChange={(e) => setNewClient(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-500">
                      Contract Budget Value ($ USD) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 450000"
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-500">
                      Consultancy Delivery Deadline *
                    </label>
                    <input
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <label className="font-bold text-slate-500">
                    Blocking Tasks (Tasks that must be completed first)
                  </label>
                  <div className="max-h-32 overflow-y-auto bg-slate-50 border border-slate-200 rounded-xl p-2 flex flex-col gap-1">
                    {tasks.map(task => (
                      <label key={task.id} className="flex items-center gap-2 text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newBlockingTaskIds.includes(task.id)}
                          onChange={(e) => {
                            if (e.target.checked) setNewBlockingTaskIds([...newBlockingTaskIds, task.id]);
                            else setNewBlockingTaskIds(newBlockingTaskIds.filter(id => id !== task.id));
                          }}
                        />
                        {task.title}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <label className="font-bold text-slate-500">
                    Milestone Breakdowns & Description
                  </label>
                  <textarea
                    required
                    placeholder="Describe specific milestones. e.g. Milestone 1: Sourcing, Milestone 2: Delivery..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    rows={3}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:bg-white transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3 justify-end items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingTask(false)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 px-4 py-2 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-700 text-slate-900 px-5 py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer transition-all"
                  >
                    Initiate Escrow Offer
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Kanban Pipeline Columns */}
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white border border-slate-200 border-dashed rounded-3xl text-center min-h-[400px] shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100 text-purple-400 relative">
                <div className="absolute inset-0 bg-purple-400/10 rounded-full blur-xl animate-pulse"></div>
                <CheckSquare className="w-10 h-10 relative z-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">No active consultancy engagements</h3>
              <p className="text-slate-500 mb-6 max-w-sm text-sm">
                Your consultancy pipeline is currently empty. Create a new milestone contract to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setActiveTab("deal-builder")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 justify-center"
                >
                  <Plus className="w-4 h-4" /> Start New Consultancy Engagement
                </button>
              </div>
            </div>
          ) : (
          <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-3 justify-between">
            <div className="flex items-center gap-3 w-full">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search consultancy engagements by title or assignee..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full text-xs bg-transparent border-none focus:outline-none text-slate-700" />
            </div>
            {selectedTasks.length > 0 && (
              <button
                onClick={deleteSelectedTasks}
                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 justify-center whitespace-nowrap"
              >
                <Trash2 className="w-4 h-4" /> Delete Selected ({selectedTasks.length})
              </button>
            )}
          </div>
          {chartData.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h4 className="font-display font-bold text-sm text-slate-900 mb-1">Task Distribution</h4>
                <p className="text-xs text-slate-500 mb-4">Overview of all consultancy engagements by their current status.</p>
              </div>
              <div className="h-48 w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={chartData} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={65}
                      innerRadius={45}
                      paddingAngle={5}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {(["todo", "inprogress", "review", "done"] as const).map((status) => {
              const statusTasks = sortedTasks.filter((t) => t.status === status && (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || (t.assignee && t.assignee.toLowerCase().includes(searchQuery.toLowerCase()))));
              const colors = {
                todo: {
                  bg: "bg-amber-50/20",
                  border: "border-amber-200/50",
                  title: "1. Proposed",
                  dot: "bg-purple-500",
                  badge: "bg-amber-100/70 text-amber-800",
                  hint: "Awaiting Bids or Client sign-off"
                },
                inprogress: {
                  bg: "bg-emerald-50/20",
                  border: "border-emerald-200/50",
                  title: "2. Funded",
                  dot: "bg-emerald-500",
                  badge: "bg-emerald-100/70 text-emerald-800",
                  hint: "Money Secured in Escrow"
                },
                review: {
                  bg: "bg-purple-50/20",
                  border: "border-orange-200/50",
                  title: "3. Review",
                  dot: "bg-purple-500",
                  badge: "bg-purple-100/70 text-purple-800",
                  hint: "Work submitted for Release"
                },
                done: {
                  bg: "bg-slate-50/60",
                  border: "border-slate-200/50",
                  title: "4. Disbursed",
                  dot: "bg-slate-400",
                  badge: "bg-slate-100 text-slate-500",
                  hint: "Funds disbursed to bank"
                },
              };

              const totalColumnValue = statusTasks.reduce((sum, t) => {
                const { budget } = parseTaskDetails(t);
                return sum + budget;
              }, 0);

              return (
                <div
                  key={status}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const taskId = e.dataTransfer.getData("taskId");
                    if (taskId) {
                      moveTask(taskId, status);
                    }
                  }}
                  className={`rounded-xl p-4 border ${colors[status].border} ${colors[status].bg} min-h-[500px] flex flex-col gap-4 relative overflow-hidden w-full md:w-[290px] lg:w-[320px] shrink-0`}
                >
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${colors[status].dot}`} />
                        <h4 className="font-display font-black text-sm text-slate-800 tracking-tight">
                          {colors[status].title}
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] text-slate-9000 font-bold">
                        {statusTasks.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[9px] text-slate-9000 leading-none">{colors[status].hint}</span>
                      <span className="text-[10px] font-mono font-black text-slate-700">
                        ${totalColumnValue.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {statusTasks.map((task) => {
                      const { budget, client, cleanDesc } = parseTaskDetails(task);
                      const progress = getTaskProgress(cleanDesc);
                      const { percent: milestonePercent, completedCount, total: totalMilestones } = getMilestonesForTask(task);
                      
                      const isDueSoon = task.dueDate && task.status !== "done" ? (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60) <= 48 : false;
                                            const categoryColors: Record<string, string> = {
                        infrastructure: "bg-pink-50 text-pink-600 border-pink-200",
                        security: "bg-cyan-50 text-cyan-600 border-cyan-200",
                        ai_ml: "bg-fuchsia-50 text-fuchsia-500 border-fuchsia-200",
                      };
                      const defaultCatColor = "bg-slate-50 text-slate-500 border-slate-200";
                      const categoryClass = task.category ? categoryColors[task.category] || defaultCatColor : "";


                      return (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData("taskId", task.id);
                          }}
                          className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5 relative cursor-grab active:cursor-grabbing"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex flex-wrap gap-2 items-center">
                              <input
                                type="checkbox"
                                checked={selectedTasks.includes(task.id)}
                                onChange={() => toggleTaskSelection(task.id)}
                                className="w-3.5 h-3.5 text-purple-600 rounded border-slate-300 focus:ring-purple-500 cursor-pointer"
                              />
                              <span className="text-[10px] font-mono font-black text-slate-900 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-100">
                                ${budget.toLocaleString()}
                              </span>
                              
                              {task.category && (
                                <span className={`text-[9px] font-mono font-bold uppercase px-2 py-1 rounded-xl border ${categoryClass}`}>
                                  {task.category}
                                </span>
                              )}

                              {isDueSoon && (
                                <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-rose-500 bg-rose-500/10 px-2 py-1 rounded-xl">
                                  <Clock className="w-3 h-3" /> Due Soon
                                </span>
                              )}
                              
                              {(status === 'review' || status === 'done') && (
                                <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-1 rounded-xl shadow-sm">
                                  <ShieldCheck className="w-3 h-3 text-indigo-500" /> Verified
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-slate-300 hover:text-rose-500 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex flex-col gap-1">
                            <h5 className="font-bold text-xs text-slate-900 leading-tight">
                              {task.title}
                            </h5>
                            <span className="text-[9px] font-mono font-bold text-slate-9000">
                              Client: {client}
                            </span>
                            
                            {/* Milestone Progress Bar & Percentage Indicator */}
                            <div className="flex flex-col gap-1 mt-1 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                              <div className="flex justify-between items-center text-[10px] font-bold">
                                <span className="text-slate-500 font-mono uppercase tracking-wider">Milestones Completed</span>
                                <span className="text-purple-600 font-black">{completedCount}/{totalMilestones} ({milestonePercent}%)</span>
                              </div>
                              <div className="w-full bg-slate-200/60 rounded-full h-1.5 mt-0.5 overflow-hidden border border-slate-100/50 shadow-inner">
                                <div 
                                  className="bg-purple-500 h-full rounded-full transition-all duration-500 ease-out" 
                                  style={{ width: `${milestonePercent}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed border-t border-slate-100 pt-2">
                            {cleanDesc}
                          </p>

                          <div className="flex justify-between items-center text-[10px] text-slate-9000 mt-1 pt-2 border-t border-slate-100">
                            <span className="flex items-center gap-1 text-[10px] text-purple-600 font-bold">
                              <Calendar className="w-3 h-3" /> {task.dueDate || "No deadline"} {task.dueDate && <span className="font-mono">({getCountdown(task.dueDate)})</span>}
                            </span>
                            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${colors[status].badge}`}>
                              {status === "todo" ? "Bid Sent" : status === "inprogress" ? "Active" : status === "review" ? "Pending Approval" : "Disbursed"}
                            </span>
                          </div>

                          {/* Escrow Status Indicator & Progress Bar */}
                          <div className="flex flex-col gap-1.5 mt-2 mb-1">
                            <div className="flex justify-between items-center">
                              <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${
                                status === 'todo' ? 'text-amber-500' :
                                status === 'inprogress' ? 'text-emerald-500' :
                                status === 'review' ? 'text-indigo-500' :
                                'text-sky-500'
                              }`}>
                                {status === 'todo' ? '10% Complete' : status === 'inprogress' ? '50% Complete' : status === 'review' ? '85% Complete' : '100% Complete'}
                              </span>
                              <span className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest ${
                                status === 'todo' ? 'text-amber-500' :
                                status === 'inprogress' ? 'text-emerald-500' :
                                status === 'review' ? 'text-indigo-500' :
                                'text-sky-500'
                              }`}>
                                <ShieldCheck className="w-3 h-3" />
                                {status === 'todo' ? 'Pending Escrow' : status === 'inprogress' ? 'Locked' : status === 'review' ? 'Verified' : 'Released'}
                              </span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-500 ease-in-out ${
                                  status === 'todo' ? 'bg-amber-400 w-[10%]' :
                                  status === 'inprogress' ? 'bg-emerald-500 w-[50%]' :
                                  status === 'review' ? 'bg-indigo-500 w-[85%]' :
                                  'bg-sky-500 w-full'
                                }`}
                              />
                            </div>
                          </div>

                          {/* Interactive pipeline triggers */}
                          <div className="flex gap-2 mt-2 pt-1 border-t border-slate-100">
                            <button
                              onClick={() => setOpenCommentsId(openCommentsId === task.id ? null : task.id)}
                              className={`p-1.5 rounded-xl border ${openCommentsId === task.id ? 'bg-purple-100 border-purple-200' : 'bg-slate-50 border-slate-200 hover:border-purple-300'}`}
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
                            </button>
                            {status === "todo" && (
                              <button
                                onClick={() => moveTask(task.id, "inprogress")}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 text-[10px] font-bold py-1.5 rounded-xl text-center cursor-pointer transition-all flex items-center justify-center gap-1 shadow-sm"
                              >
                                Client Funds Escrow &rarr;
                              </button>
                            )}


                            {status === "inprogress" && (
                              <div className="flex flex-col gap-2 w-full">
                                <button
                                  onClick={() => moveTask(task.id, "review")}
                                  className="w-full bg-purple-500 hover:bg-purple-700 text-slate-900 text-[10px] font-bold py-1.5 rounded-xl text-center cursor-pointer transition-all flex items-center justify-center gap-1 shadow-sm"
                                >
                                  Submit Deliverable &rarr;
                                </button>
                                <div className="flex gap-2 w-full">
                                  <button
                                    onClick={() => alert(`Amending contract for ${client}...`)}
                                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-[9px] font-bold py-1 rounded-xl text-center cursor-pointer transition-all"
                                  >
                                    Amend Scope
                                  </button>
                                  <button
                                    onClick={() => alert(`Initiating arbitration dispute against ${client}...`)}
                                    className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 text-[9px] font-bold py-1 rounded-xl text-center cursor-pointer transition-all"
                                  >
                                    Dispute Escrow
                                  </button>
                                </div>
                              </div>
                            )}

                            {status === "review" && (
                              <div className="flex flex-col gap-2 w-full">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => moveTask(task.id, "inprogress", "Needs further refinement.")}
                                    className="w-full bg-rose-100 hover:bg-rose-200 text-rose-700 text-[10px] font-bold py-1.5 rounded-xl text-center cursor-pointer transition-all"
                                  >
                                    Reject
                                  </button>
                                  <button
                                    onClick={(e) => handleApproveAndRelease(e, task, budget)}
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black py-1.5 rounded-xl text-center cursor-pointer transition-all border border-slate-800"
                                  >
                                    Approve
                                  </button>
                                </div>
                                <button
                                  onClick={() => alert(`Escalating to Escrow Arbitration for ${client}...`)}
                                  className="w-full bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 text-[9px] font-bold py-1 rounded-xl text-center cursor-pointer transition-all"
                                >
                                  Escalate to Arbitration
                                </button>
                              </div>
                            )}

                            {status === "done" && (
                              <button
                                onClick={() =>
                                  onOpenAiChat(
                                    `Draft a professional completion certificate and positive review for my contract with ${client} regarding the work: ${task.title}.`,
                                    "consultancy"
                                  )
                                }
                                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-500 text-[9px] font-bold py-1.5 rounded-xl text-center cursor-pointer transition-all"
                              >
                                Generate AI Completion Review
                              </button>
                            )}
                          </div>
                          
                          {/* Comments Section */}
                          <div className="mt-3 border-t border-slate-200/50 pt-3">
                            <button 
                              onClick={() => setOpenCommentsId(openCommentsId === task.id ? null : task.id)}
                              className="text-[10px] text-slate-500 hover:text-purple-500 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              {task.comments?.length || 0} Updates & Feedback
                            </button>
                            
                            <AnimatePresence>
                              {openCommentsId === task.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-2 flex flex-col gap-2 overflow-hidden"
                                >
                                  <div className="max-h-[150px] overflow-y-auto pr-1 flex flex-col gap-2 custom-scrollbar">
                                    {task.comments?.map(c => (
                                      <div key={c.id} className="bg-white border border-slate-200 p-2 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="text-[9px] font-bold text-slate-700">{c.author}</span>
                                          <span className="text-[8px] text-slate-9000">{c.time}</span>
                                        </div>
                                        {c.text && <p className="text-[10px] text-slate-500 leading-relaxed">{c.text}</p>}
                                        {c.audioUrl && (
                                          <div className="mt-1.5">
                                            <AudioPlayer src={c.audioUrl} duration={c.audioDuration} compact={true} />
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                    {(!task.comments || task.comments.length === 0) && (
                                      <p className="text-[9px] text-slate-9000 italic text-center py-2">No feedback yet.</p>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1 mt-1 bg-white border border-slate-200 rounded-xl p-1 pr-1 focus-within:border-purple-400 transition-colors shadow-inner">
                                    <input 
                                      type="text" 
                                      placeholder="Add voice or text feedback..."
                                      value={commentText}
                                      onChange={(e) => setCommentText(e.target.value)}
                                      className="flex-1 bg-transparent text-[10px] px-2 py-1.5 outline-none text-slate-700 font-medium placeholder-slate-400"
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' && commentText.trim()) {
                                          handleAddComment(task.id, commentText, undefined, undefined);
                                          setCommentText("");
                                        }
                                      }}
                                    />
                                    {!commentText && (
                                      <VoiceRecorder compact={true} onRecordComplete={(url, duration) => handleAddComment(task.id, "🎤 Voice note attached", url, duration)} />
                                    )}
                                    {commentText && (
                                      <button 
                                        onClick={() => {
                                          if (commentText.trim()) {
                                            handleAddComment(task.id, commentText, undefined, undefined);
                                            setCommentText("");
                                          }
                                        }}
                                        className="p-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded cursor-pointer transition-colors shadow-sm"
                                      >
                                        <Send className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      );
                    })}

                    {statusTasks.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-200/50 rounded-xl text-center">
                        <div className="p-2 bg-slate-50/50 rounded-xl border border-slate-100">
                          <Lock className="w-4 h-4 text-slate-300" />
                        </div>
                        <span className="text-[10px] text-slate-9000 font-bold mt-2">No Contracts</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          </div>
          )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
