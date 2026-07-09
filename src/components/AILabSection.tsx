import React, { useState } from "react";
import { UserProfile } from "../types";
import { PageBanner } from "./PageBanner";
import { SurveysAndPolls } from "./SurveysAndPolls";
import { ModelsWorkspace } from "./ModelsWorkspace";
import { ValidationCenter } from "./ValidationCenter";
import { CollaborativeDatasets } from "./CollaborativeDatasets";
import { BrainCircuit, CheckSquare, Target, Activity, Users, Send, Database, BarChart3, Settings, Play, CheckCircle, Clock, Server, FileText, Zap, ChevronRight, ShieldAlert, Plus } from "lucide-react";

interface AILabSectionProps {
  userProfile: UserProfile;
}

export const AILabSection: React.FC<AILabSectionProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("survey")) return "surveys";
    return "dashboard";
  });
  
  const tabs = [
    { id: "dashboard", label: "Overview" },
    { id: "models", label: "Models & Training" },
    { id: "validation", label: "Validation & RLHF" },
    { id: "datasets", label: "Datasets" },
    { id: "surveys", label: "Surveys & Polls" }
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-16">
      <PageBanner
        title="ESTARR AI Lab"
        subtitle="ESTARR PLATFORM"
        description="Collaborative workspace to build, train, evaluate, and validate AI models using structured human feedback, surveys, and collaborative data."
        icon={BrainCircuit}
        
      />
      
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none mb-2 mt-4 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 border-b-2 text-sm font-bold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === tab.id
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {activeTab === "dashboard" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Models", value: "14", icon: BrainCircuit, color: "text-purple-600", bg: "bg-purple-100" },
              { label: "Active Training Jobs", value: "3", icon: Activity, color: "text-blue-600", bg: "bg-blue-100" },
              { label: "Dataset Size", value: "4.2 TB", icon: Database, color: "text-cyan-600", bg: "bg-cyan-100" },
              { label: "Avg Model Accuracy", value: "94.2%", icon: Target, color: "text-rose-600", bg: "bg-rose-100" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-64 flex flex-col justify-center items-center">
             <BarChart3 className="w-12 h-12 text-slate-200 mb-3" />
             <h3 className="font-bold text-slate-400">Activity Trends (Training vs Validation)</h3>
             <p className="text-xs text-slate-400 mt-1">D3.js / Recharts visualization goes here</p>
          </div>
        </div>
      )}

      {activeTab === "models" && <ModelsWorkspace userProfile={userProfile} />}

      {activeTab === "validation" && <ValidationCenter userProfile={userProfile} />}

      {activeTab === "datasets" && <CollaborativeDatasets userProfile={userProfile} />}

      {activeTab === "surveys" && <SurveysAndPolls userProfile={userProfile} />}
    </div>
  );
};
