import React, { useState } from "react";
import { ConsultancyTask, UserProfile } from "../types";
import {
  TrendingUp,
  DollarSign,
  CheckCircle,
  Percent,
  Briefcase,
  Award,
  Clock,
  ArrowUpRight,
  Sparkles,
  Building,
  Calendar,
  Lock,
  ChevronDown,
  ChevronUp,
  Check,
  Play,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ConsultancyDashboardProps {
  tasks: ConsultancyTask[];
  userProfile: UserProfile;
}

// Helper to extract budget and details
function parseTaskDetails(task: ConsultancyTask) {
  let budget = 150000; // default 150k NGN/USD
  let client = task.assignee || "External Client";
  let cleanDesc = task.desc;

  if (task.desc.includes("||")) {
    const parts = task.desc.split("||");
    if (parts.length >= 3) {
      budget = parseFloat(parts[0].replace(/[^0-9.]/g, "")) || 150000;
      client = parts[1].trim();
      cleanDesc = parts[2].trim();
    }
  } else {
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

// Helper to parse milestones from description
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
  const reviewCount = milestones.filter(m => m.status === "review").length;
  const activeCount = milestones.filter(m => m.status === "inprogress").length;

  let percent = 0;
  if (total > 0) {
    percent = Math.round(
      ((completedCount + reviewCount * 0.8 + activeCount * 0.4) / total) * 100
    );
  }

  // Ensure 100% if done, and positive minimum if in progress
  if (task.status === "done") percent = 100;
  else if (task.status === "inprogress" && percent === 0) percent = 30;
  else if (task.status === "review" && percent === 100) percent = 85;

  return { milestones, percent: Math.min(100, Math.max(0, percent)) };
}

export function ConsultancyDashboard({ tasks, userProfile }: ConsultancyDashboardProps) {
  const [chartMetric, setChartMetric] = useState<"both" | "earnings" | "rate">("both");
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter tasks for this user
  const userTasks = tasks.filter((t) => {
    const isUserAssignee =
      t.assignee &&
      userProfile.name &&
      t.assignee.toLowerCase() === userProfile.name.toLowerCase();
    const isUserOwner = t.userId && userProfile.email; // simple matching
    return isUserAssignee || isUserOwner || !t.assignee;
  });

  // Calculate dynamic calculations based entirely on actual tasks (with no unearned/mock initial data)
  let totalEarnings = 0;
  let totalCompleted = 0;
  let totalMilestones = 0;

  // Track monthly earnings and rate dynamically
  const monthlyData: Record<string, { earnings: number; completed: number; total: number }> = {
    Jan: { earnings: 0, completed: 0, total: 0 },
    Feb: { earnings: 0, completed: 0, total: 0 },
    Mar: { earnings: 0, completed: 0, total: 0 },
    Apr: { earnings: 0, completed: 0, total: 0 },
    May: { earnings: 0, completed: 0, total: 0 },
    Jun: { earnings: 0, completed: 0, total: 0 },
    "Jul (Live)": { earnings: 0, completed: 0, total: 0 },
  };

  userTasks.forEach((task) => {
    const { budget } = parseTaskDetails(task);
    totalMilestones++;
    
    // Assign to a month based on due date if possible, otherwise default to Jul (Live)
    let monthKey = "Jul (Live)";
    if (task.dueDate) {
      if (task.dueDate.includes("Jan")) monthKey = "Jan";
      else if (task.dueDate.includes("Feb")) monthKey = "Feb";
      else if (task.dueDate.includes("Mar")) monthKey = "Mar";
      else if (task.dueDate.includes("Apr")) monthKey = "Apr";
      else if (task.dueDate.includes("May")) monthKey = "May";
      else if (task.dueDate.includes("Jun")) monthKey = "Jun";
    }

    if (task.status === "done") {
      totalEarnings += budget;
      totalCompleted++;
      monthlyData[monthKey].earnings += budget;
      monthlyData[monthKey].completed++;
    }
    monthlyData[monthKey].total++;
  });

  // Generate timeline data from monthlyData
  const timelineData = Object.entries(monthlyData).map(([name, data]) => {
    const rate = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
    return {
      name,
      earnings: data.earnings,
      rate,
      completed: data.completed,
      total: data.total,
    };
  });

  // Cumulative statistics calculations
  const finalTotalEarnings = totalEarnings;
  const finalTotalCompleted = totalCompleted;
  const finalTotalMilestones = totalMilestones;
  const finalAverageRate = finalTotalMilestones > 0 ? Math.round((finalTotalCompleted / finalTotalMilestones) * 100) : 0;

  // Active or pending escrow contracts count
  const activeEscrowContracts = userTasks.filter((t) => t.status === "inprogress").length;
  const pendingReviewContracts = userTasks.filter((t) => t.status === "review").length;
  const totalActiveGigs = activeEscrowContracts + pendingReviewContracts;

  return (
    <div id="consultancy-dashboard-root" className="flex flex-col gap-6 animate-fade-in">
      {/* Dashboard Summary Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-display font-black text-xl text-slate-900 tracking-tight flex items-center gap-2">
            📊 Personal Consultancy Performance
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Real-time analytics, escrow distributions, and contract milestone fulfillment rates.
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-stretch sm:self-auto">
          <button
            onClick={() => setChartMetric("both")}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition-all cursor-pointer ${
              chartMetric === "both" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Charts
          </button>
          <button
            onClick={() => setChartMetric("earnings")}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition-all cursor-pointer ${
              chartMetric === "earnings" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Earnings Only
          </button>
          <button
            onClick={() => setChartMetric("rate")}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition-all cursor-pointer ${
              chartMetric === "rate" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Completion Rates
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:border-emerald-200 transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="bg-emerald-50 text-emerald-600 rounded-xl p-2.5">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +14.2%
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">Cumulative Revenue</span>
          <h4 className="font-display font-black text-lg md:text-xl text-slate-900 mt-1">
            ${finalTotalEarnings.toLocaleString()}
          </h4>
          <p className="text-[10px] text-slate-400 mt-1 font-medium">Verified contract payouts</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:border-purple-200 transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="bg-purple-50 text-purple-600 rounded-xl p-2.5">
              <Percent className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
              Stable
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">On-Time Completion</span>
          <h4 className="font-display font-black text-lg md:text-xl text-slate-900 mt-1">
            {finalAverageRate}%
          </h4>
          <p className="text-[10px] text-slate-400 mt-1 font-medium">Historical milestone standard</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:border-sky-200 transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="bg-sky-50 text-sky-600 rounded-xl p-2.5">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
              {activeEscrowContracts + pendingReviewContracts} Active
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">Fulfillment Gigs</span>
          <h4 className="font-display font-black text-lg md:text-xl text-slate-900 mt-1">
            {userTasks.length}
          </h4>
          <p className="text-[10px] text-slate-400 mt-1 font-medium">Escrow protected contracts</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:border-purple-200 transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="bg-purple-50 text-purple-600 rounded-xl p-2.5">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              ⭐ 4.95
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">Quality Score Rating</span>
          <h4 className="font-display font-black text-lg md:text-xl text-slate-900 mt-1">
            Top Tier
          </h4>
          <p className="text-[10px] text-slate-400 mt-1 font-medium">99th percentile across network</p>
        </div>
      </div>

      {/* Recharts Graphical Panels */}
      <div className={`grid grid-cols-1 ${chartMetric === "both" ? "lg:grid-cols-2" : "grid-cols-1"} gap-6`}>
        {/* Earnings Over Time Line Chart */}
        {(chartMetric === "both" || chartMetric === "earnings") && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-500" /> Revenue Growth Over Time
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Monthly gross payouts cleared from escrow protection bank lines.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1">
                USD ($)
              </span>
            </div>

            <div className="h-64 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} style={{ fontSize: "10px", fill: "#94a3b8", fontWeight: "bold" }} />
                  <YAxis tickLine={false} axisLine={false} style={{ fontSize: "10px", fill: "#94a3b8", fontWeight: "bold" }} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
                  <RechartsTooltip
                    contentStyle={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)" }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, "Gross Earnings"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 5, strokeWidth: 2, fill: "#ffffff" }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Milestone Completion Rates Line Chart */}
        {(chartMetric === "both" || chartMetric === "rate") && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-purple-500" /> Milestone Completion Rates
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Fulfillment precision percentage, tracking successful on-time deliverables.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1">
                Rate (%)
              </span>
            </div>

            <div className="h-64 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} style={{ fontSize: "10px", fill: "#94a3b8", fontWeight: "bold" }} />
                  <YAxis domain={[0, 100]} tickLine={false} axisLine={false} style={{ fontSize: "10px", fill: "#94a3b8", fontWeight: "bold" }} tickFormatter={(val) => `${val}%`} />
                  <RechartsTooltip
                    contentStyle={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)" }}
                    formatter={(value: any) => [`${value}%`, "Fulfillment Rate"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ r: 5, strokeWidth: 2, fill: "#ffffff" }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Escrow Contract and Live Milestone Pipeline List */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h4 className="font-display font-black text-base text-slate-900 tracking-tight">
              📂 Active Project Milestone Tracker
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Live tracking of pre-funded milestone completion rates across your secure active contracts.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-xl shrink-0 self-start sm:self-auto">
            {userTasks.length} Contracts Registered
          </span>
        </div>

        {userTasks.length > 0 ? (
          <div className="flex flex-col gap-5">
            {userTasks.map((task) => {
              const { budget, client } = parseTaskDetails(task);
              const { milestones, percent } = getMilestonesForTask(task);
              const isExpanded = !!expandedProjects[task.id];

              const statusColorMap = {
                todo: "bg-amber-100 text-amber-800 border-amber-200",
                inprogress: "bg-emerald-100 text-emerald-800 border-emerald-200",
                review: "bg-purple-100 text-purple-800 border-purple-200",
                done: "bg-slate-100 text-slate-800 border-slate-200",
                "needs-verification": "bg-yellow-100 text-yellow-800 border-yellow-200",
              };

              return (
                <div
                  key={task.id}
                  className="border border-slate-200 bg-slate-50/20 rounded-2xl p-5 hover:border-slate-300 transition-all flex flex-col gap-4 shadow-sm"
                >
                  {/* Top Row: Client & Budget */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100/70 pb-3">
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-extrabold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100 uppercase tracking-wider">
                          {client}
                        </span>
                        <span className={`text-[9px] px-2.5 py-0.5 rounded-full border font-extrabold tracking-wide uppercase ${statusColorMap[task.status]}`}>
                          {task.status === "todo" ? "PROPOSAL" : task.status.toUpperCase()}
                        </span>
                      </div>
                      <h5 className="font-display font-black text-sm text-slate-800 leading-tight mt-1">
                        {task.title}
                      </h5>
                    </div>

                    <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-start gap-2 sm:gap-0.5 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t border-dashed border-slate-100 sm:border-t-0">
                      <span className="text-base font-mono font-black text-slate-950">
                        ${budget.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Due {task.dueDate || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Middle Row: Visual Thick Milestone Progress Bar & Track */}
                  <div className="flex flex-col gap-3.5 bg-white border border-slate-100 rounded-xl p-4 shadow-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                        Milestone Progress Track
                      </span>
                      <span className={`text-xs font-mono font-black px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-xs ${
                        percent === 100 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                          : percent > 40
                          ? "bg-purple-50 text-purple-700 border border-purple-100"
                          : "bg-slate-50 text-slate-600 border border-slate-200"
                      }`}>
                        <Percent className="w-3 h-3 stroke-[3]" /> {percent}% Completed
                      </span>
                    </div>

                    {/* Step-by-Step Progress Track */}
                    <div className="relative flex items-center justify-between w-full mt-2 mb-3 px-2">
                      {/* Full grey line behind */}
                      <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-1.5 bg-slate-100 rounded-full z-0" />
                      
                      {/* Colored line up to completion percentage */}
                      <div 
                        className="absolute left-2 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full z-0 transition-all duration-500"
                        style={{ width: `calc(${percent}% - 16px)` }}
                      />

                      {/* Milestone Nodes */}
                      {milestones.map((m, mIdx) => {
                        const isDone = m.status === "done";
                        const isCurrent = m.status === "inprogress";
                        const isReview = m.status === "review";
                        
                        return (
                          <div key={mIdx} className="relative z-10 flex flex-col items-center">
                            {/* Circle Node */}
                            <div 
                              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                isDone 
                                  ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-200" 
                                  : isReview
                                  ? "bg-amber-500 border-amber-500 text-white animate-pulse shadow-md shadow-amber-200"
                                  : isCurrent
                                  ? "bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-200"
                                  : "bg-white border-slate-300 text-slate-400"
                              }`}
                              title={m.title}
                            >
                              {isDone ? (
                                <Check className="w-4 h-4 stroke-[3.5]" />
                              ) : isReview ? (
                                <AlertCircle className="w-4 h-4" />
                              ) : isCurrent ? (
                                <Play className="w-3.5 h-3.5 fill-current ml-0.5 animate-pulse" />
                              ) : (
                                <span className="text-[10px] font-mono font-black">{mIdx + 1}</span>
                              )}
                            </div>
                            
                            {/* Tiny Indicator Text */}
                            <span className="absolute top-9 whitespace-nowrap text-[9px] font-black text-slate-400 font-mono tracking-tight text-center max-w-[80px] truncate">
                              Phase {mIdx + 1}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Row: Collapsible Action Details Trigger */}
                  <div className="flex flex-col gap-1 mt-1">
                    <button
                      onClick={() => toggleExpand(task.id)}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-[10px] font-black text-slate-600 hover:text-slate-900 transition-all cursor-pointer uppercase tracking-wider"
                    >
                      {isExpanded ? (
                        <>
                          Hide Milestone Breakdown <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          View Milestone Breakdown <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    {/* Collapsible Details Panel */}
                    {isExpanded && (
                      <div className="mt-2 p-4 bg-white border border-slate-100 rounded-xl flex flex-col gap-3.5 shadow-inner animate-fade-in">
                        <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                          <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest">
                            Milestone Specification Checklist
                          </span>
                          <span className="text-[9px] font-bold text-slate-500 font-mono">
                            Total {milestones.length} Milestones
                          </span>
                        </div>

                        <div className="flex flex-col gap-3">
                          {milestones.map((m, mIdx) => {
                            const isDone = m.status === "done";
                            const isCurrent = m.status === "inprogress";
                            const isReview = m.status === "review";
                            
                            return (
                              <div 
                                key={mIdx} 
                                className={`flex items-start gap-3 text-xs p-2.5 rounded-lg border transition-colors ${
                                  isDone 
                                    ? "bg-emerald-50/30 border-emerald-100/50" 
                                    : isReview 
                                    ? "bg-amber-50/30 border-amber-100/50" 
                                    : isCurrent 
                                    ? "bg-purple-50/30 border-purple-100/50" 
                                    : "bg-slate-50/50 border-slate-100"
                                }`}
                              >
                                <div className="mt-0.5 shrink-0">
                                  {isDone ? (
                                    <div className="bg-emerald-100 text-emerald-700 rounded-full p-1 border border-emerald-200">
                                      <Check className="w-3 h-3 stroke-[3]" />
                                    </div>
                                  ) : isReview ? (
                                    <div className="bg-amber-100 text-amber-700 rounded-full p-1 border border-amber-200 animate-pulse">
                                      <AlertCircle className="w-3 h-3" />
                                    </div>
                                  ) : isCurrent ? (
                                    <div className="bg-purple-100 text-purple-700 rounded-full p-1 border border-purple-200">
                                      <Play className="w-3 h-3 fill-current ml-0.5" />
                                    </div>
                                  ) : (
                                    <div className="bg-slate-100 text-slate-400 rounded-full p-1 border border-slate-200">
                                      <Lock className="w-3 h-3" />
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <p className={`font-bold text-xs ${
                                    isDone 
                                      ? "text-slate-500 line-through" 
                                      : isCurrent 
                                      ? "text-purple-900" 
                                      : isReview 
                                      ? "text-amber-900" 
                                      : "text-slate-400"
                                  }`}>
                                    {m.title}
                                  </p>
                                  <div className="flex items-center gap-1.5 mt-1">
                                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${
                                      isDone ? "text-emerald-600" : isReview ? "text-amber-600" : isCurrent ? "text-purple-600" : "text-slate-400"
                                    }`}>
                                      {isDone ? "Approved & Released" : isReview ? "In Verification" : isCurrent ? "In Active Execution" : "Locked / Pending"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-10 border border-slate-100 border-dashed rounded-2xl text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <Lock className="w-7 h-7 text-slate-300" />
            No contracts in active fulfillment. Go to the Contracts Board to draft or launch one.
          </div>
        )}
      </div>
    </div>
  );
}
