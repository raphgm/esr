import React, { useState } from "react";
import { UserProfile, ConsultancyTask } from "../types";
import { PageBanner } from "./PageBanner";
import { AnnotationManagement } from "./AnnotationManagement";
import { Briefcase, Plus, Search, Filter, Clock, Users, ChevronRight, CheckCircle, Clock3 } from "lucide-react";
import { motion } from "motion/react";

interface ConsultancyClientSectionProps {
  userProfile: UserProfile;
  tasks: ConsultancyTask[];
  onNavigate?: (tab: string) => void;
}

export function ConsultancyClientSection({ userProfile, tasks, onNavigate }: ConsultancyClientSectionProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "post">("projects");
  const [searchQuery, setSearchQuery] = useState("");
  
  const clientTasks = tasks.filter(t => t.status !== "done");

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12">
      <PageBanner
        icon={Briefcase}
        title="IT Consultancy Projects"
        subtitle="Hire & Manage"
        description="Post requirements, manage ongoing projects, and hire top-tier technical consultants."
        
      />
      

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors whitespace-nowrap ${activeTab === "projects" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              My Projects
            </button>
            <button 
              onClick={() => setActiveTab("post")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors whitespace-nowrap ${activeTab === "post" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              Post New Project
            </button>
          </div>
          
          {activeTab === "projects" && (
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search projects..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>
        
        {activeTab === "projects" ? (
          <div className="space-y-4">
            {clientTasks.length > 0 ? (
              clientTasks.map(task => (
                <div key={task.id} className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 transition-colors bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
                        {task.status === "todo" ? "Reviewing Proposals" : "In Progress"}
                      </span>
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Updated recently
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{task.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-1">{task.desc}</p>
                  </div>
                  
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-slate-900">3</span>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Proposals</span>
                    </div>
                    <button className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No Active Projects</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-6">You haven't posted any IT consultancy projects yet. Create your first project to start receiving proposals from verified experts.</p>
                <button onClick={() => setActiveTab("post")} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-2 transition-colors">
                  <Plus className="w-5 h-5" /> Post IT Project
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto py-4">
            <AnnotationManagement />
            <h2 className="text-xl font-bold text-slate-900 mb-6">Create New Project Listing</h2>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900">Project Title</label>
                <input type="text" placeholder="e.g. Cloud Infrastructure Migration to AWS" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 font-medium" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900">Project Description</label>
                <textarea rows={5} placeholder="Describe the problem you're trying to solve, required tech stack, and expected deliverables..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 font-medium resize-none"></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">Estimated Budget ($)</label>
                  <input type="number" placeholder="e.g. 5000" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">Skill Required</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 font-medium bg-white">
                    <option value="dev">Software Development</option>
                    <option value="design">UI/UX Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="security">Security</option>
                    <option value="ai_ml">AI/ML</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900">Expected Duration</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 font-medium bg-white">
                  <option>Less than 1 week</option>
                  <option>1 to 4 weeks</option>
                  <option>1 to 3 months</option>
                  <option>More than 3 months</option>
                </select>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setActiveTab("projects")} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={() => setActiveTab("projects")} className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Post Project
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
