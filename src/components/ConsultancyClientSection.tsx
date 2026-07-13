import React, { useState } from "react";
import { UserProfile, ConsultancyTask, Job } from "../types";
import { PageBanner } from "./PageBanner";
import { AnnotationManagement } from "./AnnotationManagement";
import { Briefcase, Plus, Search, Filter, Clock, Users, ChevronRight, CheckCircle, Clock3, Trash2 } from "lucide-react";
import { motion } from "motion/react";

interface ConsultancyClientSectionProps {
  userProfile: UserProfile;
  tasks: ConsultancyTask[];
  jobs: Job[];
  onUpdateTasks: (tasks: ConsultancyTask[]) => void;
  onUpdateJobs: (jobs: Job[]) => void;
  onNavigate?: (tab: string) => void;
}

export function ConsultancyClientSection({ userProfile, tasks, jobs, onUpdateTasks, onUpdateJobs, onNavigate }: ConsultancyClientSectionProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "post">("projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newBudget, setNewBudget] = useState("");

  const clientTasks = tasks.filter(t => t.status !== "done");

  const handlePost = () => {
    if (!newTitle || !newDesc) return;

    const newTask: ConsultancyTask = {
      id: `task-${Date.now()}`,
      title: newTitle,
      desc: `$${newBudget || 0} || ${userProfile.name} || ${newDesc}`,
      status: "todo",
      priority: "Medium",
      assignee: userProfile.name,
      dueDate: new Date().toISOString().split("T")[0],
    };

    onUpdateTasks([...tasks, newTask]);

    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: newTitle,
      company: userProfile.name,
      type: "Freelance",
      location: "Remote",
      salary: `$${newBudget || 0}`,
      description: newDesc,
      skillsRequired: [],
      requirements: ["Technical expertise required"],
    };
    onUpdateJobs([...jobs, newJob]);

    setActiveTab("projects");
    setNewTitle("");
    setNewDesc("");
    setNewBudget("");
  };

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
                <button type="button" key={task.id} onClick={() => alert(`Project: ${task.title}`)} className="w-full text-left cursor-pointer border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 transition-colors bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
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
                  
                  <div className="flex items-center gap-2 shrink-0">
                    {task.status === 'todo' && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); onUpdateTasks(tasks.map(t => t.id === task.id ? {...t, status: 'inprogress'} : t)); }}
                        className="p-2 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                        title="Approve"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); onUpdateTasks(tasks.filter(t => t.id !== task.id)); onUpdateJobs(jobs.filter(j => j.title !== task.title)); }}
                      className="p-2 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-slate-900">3</span>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Proposals</span>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </button>
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
                <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Cloud Infrastructure Migration to AWS" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 font-medium" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-900">Project Description</label>
                  <button 
                    type="button" 
                    onClick={() => {
                      const textarea = document.getElementById("desc-textarea") as HTMLTextAreaElement;
                      if (!textarea) return;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const text = newDesc;
                      const before = text.substring(0, start);
                      const selected = text.substring(start, end);
                      const after = text.substring(end);
                      setNewDesc(`${before}**${selected}**${after}`);
                      
                      setTimeout(() => {
                        textarea.focus();
                        textarea.setSelectionRange(start + 2, end + 2);
                      }, 0);
                    }}
                    className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
                  >
                    Bold
                  </button>
                </div>
                <textarea id="desc-textarea" rows={5} value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Describe the problem you're trying to solve, required tech stack, and expected deliverables..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 font-medium resize-none"></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">Estimated Budget ($)</label>
                  <input type="number" value={newBudget} onChange={e => setNewBudget(e.target.value)} placeholder="e.g. 5000" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 font-medium" />
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
                <button type="button" onClick={handlePost} className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2">
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
