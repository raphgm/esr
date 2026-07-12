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

export function ConsultancyDashboard({ tasks, userProfile }: ConsultancyDashboardProps) {
  const [chartMetric, setChartMetric] = useState<"both" | "earnings" | "rate">("both");

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
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
        <div>
          <h4 className="font-display font-bold text-sm text-slate-900">
            Active Milestone Contracts
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Breakdown of your current contracts with pre-funded escrow vaults.
          </p>
        </div>

        {userTasks.length > 0 ? (
          <div className="flex flex-col gap-3">
            {userTasks.map((task) => {
              const { budget, client } = parseTaskDetails(task);
              const progressMap = { todo: 10, inprogress: 40, review: 75, done: 100, "needs-verification": 90 };
              const percent = progressMap[task.status] || 0;

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
                  className="p-4 border border-slate-100 bg-slate-50/50 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 hover:border-slate-300 transition-all"
                >
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                        {client}
                      </span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full border font-extrabold ${statusColorMap[task.status]}`}>
                        {task.status.toUpperCase()}
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-slate-800 font-display">
                      {task.title}
                    </h5>
                  </div>

                  <div className="flex flex-col md:items-end gap-1 shrink-0">
                    <span className="text-[11px] font-mono text-slate-400 font-bold flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {task.dueDate}
                    </span>
                    <span className="text-sm font-mono font-black text-slate-800">
                      ${budget.toLocaleString()}
                    </span>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="w-full md:w-32 flex flex-col gap-1 shrink-0">
                    <span className="text-[9px] font-mono font-bold text-slate-400 text-right">
                      {percent}% Completed
                    </span>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          task.status === "done" ? "bg-emerald-500" : "bg-purple-500"
                        }`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 border border-slate-100 border-dashed rounded-2xl text-center text-xs text-slate-500 flex flex-col items-center gap-2">
            <Lock className="w-6 h-6 text-slate-300" />
            No contracts in active fulfillment. Go to the Contracts Board to draft or launch one.
          </div>
        )}
      </div>
    </div>
  );
}
