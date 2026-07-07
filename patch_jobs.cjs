const fs = require('fs');

const code = `import React, { useState } from "react";
import { PageBanner } from "./PageBanner";
import { UserProfile, Job } from "../types";
import { Briefcase, MapPin, Plus, DollarSign, X, Sparkles, CheckCircle, Code, ShieldCheck, PenTool, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface JobsSectionProps {
  userProfile: UserProfile;
  jobs: Job[];
  onUpdateJobs: (jobs: Job[]) => void;
}

export function JobsSection({ userProfile, jobs, onUpdateJobs }: JobsSectionProps) {
  const [showPostJob, setShowPostJob] = useState(false);
  const [viewMode, setViewMode] = useState<"listings" | "proof-of-skills">("listings");
  const [activeCategory, setActiveCategory] = useState<"All" | "Apprenticeship" | "Freelance" | "Full-time">("All");
  
  const [newTitle, setNewTitle] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newType, setNewType] = useState<Job["type"]>("Full-time");
  const [newLocation, setNewLocation] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const [pitchJob, setPitchJob] = useState<Job | null>(null);
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState("");
  const [pitchCopied, setPitchCopied] = useState(false);

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle && newCompany) {
      const newJob: Job = {
        id: "job-" + Date.now(),
        title: newTitle,
        company: newCompany,
        type: newType,
        location: newLocation || "Remote",
        salary: newSalary || "Negotiable",
        description: newDesc || "No description provided",
        skillsRequired: []
      };
      onUpdateJobs([newJob, ...jobs]);
      setShowPostJob(false);
      setNewTitle("");
      setNewCompany("");
      setNewLocation("");
      setNewSalary("");
      setNewDesc("");
    }
  };

  const generatePitch = (job: Job) => {
    setPitchJob(job);
    setIsGeneratingPitch(true);
    setGeneratedPitch("");
    setPitchCopied(false);
    
    // Simulate AI Generation
    setTimeout(() => {
      setIsGeneratingPitch(false);
      setGeneratedPitch(
        \`Hi \${job.company} Team,\\n\\nI'm very interested in the \${job.title} role. Although I'm relatively new to this field, I have recently completed rigorous practical training in the EstrR Academy, including hands-on projects directly related to \${job.skillsRequired?.[0] || 'the required skills'}.\\n\\nI am highly motivated, eager to learn, and ready to deliver value immediately through my strong work ethic and foundational knowledge. Please find my EstrR 'Proof of Work' portfolio attached for a sample of my capabilities.\\n\\nLooking forward to the opportunity to grow with your team!\\n\\nBest regards,\\n\${userProfile.name}\`
      );
    }, 1500);
  };

  const copyPitch = () => {
    navigator.clipboard.writeText(generatedPitch);
    setPitchCopied(true);
    setTimeout(() => setPitchCopied(false), 2000);
  };

  const talentPool = [
    { name: "Chinedu Okafor", role: "Senior DevOps Engineer", matchScore: 98, capstone: "Automated CI/CD Pipeline for Microservices", status: "Verified on-chain" },
    { name: "Aisha Mohammed", role: "Full-Stack Developer", matchScore: 92, capstone: "Real-time E-commerce Marketplace", status: "Verified on-chain" },
    { name: "Samuel Tunde", role: "Data Scientist", matchScore: 85, capstone: "Predictive AI Model for Logistics", status: "Verified on-chain" },
  ];

  const filteredJobs = viewMode === "listings" 
    ? jobs.filter(job => activeCategory === "All" || job.type === activeCategory)
    : [];

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-800">
      <PageBanner
        title="Job Board"
        subtitle="CAREER OPPORTUNITIES & TALENT MATCHING"
        description="Find your next role or hire verified talent based on real-world capstone projects, not just resumes."
        icon={Briefcase}
        actions={
          userProfile.accountType === "jobOwner" && (
            <button
              onClick={() => setShowPostJob(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Post a Job
            </button>
          )
        }
      />

      {/* View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex p-1 bg-slate-100 rounded-xl w-fit">
          <button
            onClick={() => setViewMode("listings")}
            className={\`px-4 py-2 rounded-lg text-xs font-bold transition-all \${viewMode === "listings" ? "bg-white shadow-sm text-purple-600" : "text-slate-500 hover:text-slate-700"}\`}
          >
            Job Listings
          </button>
          <button
            onClick={() => setViewMode("proof-of-skills")}
            className={\`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 \${viewMode === "proof-of-skills" ? "bg-white shadow-sm text-purple-600" : "text-slate-500 hover:text-slate-700"}\`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {userProfile.accountType === "jobOwner" ? "Hire by Proof-of-Skill" : "My Skill Match Score"}
          </button>
        </div>

        {viewMode === "listings" && (
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {(["All", "Apprenticeship", "Freelance", "Full-time"] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={\`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all \${activeCategory === cat ? "bg-slate-900 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}\`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {viewMode === "proof-of-skills" && userProfile.accountType === "jobOwner" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-slate-900">AI-Powered Proof-of-Skills Matcher</h3>
              <p className="text-sm text-slate-500">Evaluate and hire talent based on real projects, not resumes. Features formal skills from skill-sch.com and creator skills from EstrR.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {talentPool.map((talent, i) => (
              <div key={i} className="border border-slate-200 p-5 rounded-2xl flex flex-col hover:border-purple-300 hover:shadow-md transition-all cursor-pointer bg-slate-50 hover:bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900">{talent.name}</h4>
                    <p className="text-xs text-slate-500">{talent.role}</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {talent.matchScore}% Match
                  </div>
                </div>
                <div className="mt-2 pt-3 border-t border-slate-200">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Verified Capstone</p>
                  <p className="text-sm font-medium text-slate-700 leading-tight">{talent.capstone}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs text-purple-600 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" /> {talent.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === "proof-of-skills" && userProfile.accountType === "learner" && (
        <div className="bg-slate-950 rounded-3xl p-8 shadow-sm text-white overflow-hidden relative">
          <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none">
            <Sparkles className="w-[300px] h-[300px]" />
          </div>
          <div className="relative z-10 max-w-xl">
            <h3 className="text-2xl font-bold font-display mb-2">Your Profile Competitiveness</h3>
            <p className="text-slate-400 mb-6">Based on your completed Academy missions and overall activity.</p>
            
            <div className="bg-white/10 border border-white/20 p-5 rounded-2xl backdrop-blur-md mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Match Readiness Score</span>
                <span className="text-emerald-400 font-bold text-xl">65%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-slate-900">
              <p className="text-[10px] uppercase font-bold tracking-widest text-purple-500 mb-2">EstrR Intelligence Insights</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2 items-start"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Your "DeFi Staking App" capstone perfectly matches 14 open blockchain roles.</li>
                <li className="flex gap-2 items-start"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Code quality and commit history evaluated at Top 10% of peers.</li>
                <li className="flex gap-2 items-start"><Code className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> <strong>Gap:</strong> Complete the "Cloud DevOps Simulator" in Academy to reach Senior level.</li>
              </ul>
            </div>
          </div>
          <button className="bg-white text-purple-700 px-6 py-2.5 mt-6 rounded-xl text-sm font-bold shadow-sm hover:bg-purple-50 transition-colors relative z-10">
            Start Missing Capstone Project
          </button>
        </div>
      )}

      {viewMode === "listings" && showPostJob && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-6 relative">
          <button 
            onClick={() => setShowPostJob(false)}
            className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
          <h3 className="text-xl font-bold font-display text-slate-900 mb-6">Post a New Job</h3>
          <form onSubmit={handlePostJob} className="flex flex-col gap-4 max-w-2xl">
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wide">Job Title</label>
                <input required type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Senior Frontend Developer" className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-purple-500" />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wide">Company Name</label>
                <input required type="text" value={newCompany} onChange={e => setNewCompany(e.target.value)} placeholder="e.g. EstrR Tech" className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-purple-500" />
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wide">Job Type</label>
                <select value={newType} onChange={e => setNewType(e.target.value as Job["type"])} className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-purple-500">
                  <option value="Full-time">Full-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Apprenticeship">Apprenticeship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wide">Location</label>
                <input type="text" value={newLocation} onChange={e => setNewLocation(e.target.value)} placeholder="e.g. Lagos, Nigeria or Remote" className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-purple-500" />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wide">Salary / Budget</label>
                <input type="text" value={newSalary} onChange={e => setNewSalary(e.target.value)} placeholder="e.g. ₦300k - ₦500k/mo" className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-purple-500" />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wide">Description</label>
                <textarea rows={4} value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Describe the responsibilities and requirements..." className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-purple-500 resize-none" />
            </div>
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold w-fit mt-2 cursor-pointer transition-colors shadow-sm">
              Publish Job
            </button>
          </form>
        </div>
      )}

      {viewMode === "listings" && filteredJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white border border-slate-200 border-dashed rounded-3xl text-center min-h-[400px] shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100 text-purple-400">
            <Briefcase className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">No jobs found in this category</h3>
          <p className="text-slate-500 mb-6 max-w-sm text-sm">
            {userProfile.accountType === "jobOwner" 
              ? "You haven't posted any jobs here. Create a job listing to find talented professionals."
              : "There are currently no job listings available. Check back later!"}
          </p>
        </div>
      ) : viewMode === "listings" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row justify-between md:items-start gap-6 hover:-translate-y-1 hover:shadow-sm hover:shadow-md transition-shadow transition-all group"
            >
              <div className="flex-1">
                <h3 className="font-bold uppercase text-lg mb-1">{job.title}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium font-mono">
                  <span className="text-purple-600 font-bold">{job.company}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600">
                    <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                  </span>
                </div>
                <p className="text-sm mt-3 text-slate-600 leading-relaxed max-w-3xl">{job.description}</p>
                
                {job.skillsRequired && job.skillsRequired.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.skillsRequired.map(skill => (
                      <span key={skill} className="bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto md:items-end">
                <span className={\`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide w-fit md:mb-2 \${job.type === 'Apprenticeship' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}\`}>
                  {job.type}
                </span>
                
                {userProfile.accountType !== 'jobOwner' && (
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <button 
                      onClick={() => generatePitch(job)}
                      className="bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4" />
                      AI Pitch Writer
                    </button>
                    <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center">
                      Apply Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* AI Pitch Generator Modal */}
      <AnimatePresence>
        {pitchJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-8 flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-500" />
                    AI Pitch Assistant
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Generating a custom proposal for <span className="font-bold text-slate-700">{pitchJob.title}</span>
                  </p>
                </div>
                <button
                  onClick={() => setPitchJob(null)}
                  className="w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6 overflow-y-auto">
                {isGeneratingPitch ? (
                  <div className="flex flex-col items-center justify-center h-48 gap-4">
                    <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-slate-500 animate-pulse">Analyzing your Academy skills & drafting pitch...</p>
                  </div>
                ) : (
                  <div className="relative">
                    <textarea 
                      className="w-full min-h-[250px] bg-transparent resize-none text-sm leading-relaxed text-slate-700 focus:outline-none"
                      value={generatedPitch}
                      onChange={(e) => setGeneratedPitch(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-500 font-medium">
                  💡 Edit the AI generated text to add your personal flair before sending.
                </p>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={copyPitch}
                    disabled={isGeneratingPitch}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors disabled:opacity-50"
                  >
                    {pitchCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    {pitchCopied ? "Copied!" : "Copy Pitch"}
                  </button>
                  <button
                    onClick={() => {
                      setPitchJob(null);
                      // In real app, might launch email or internal messaging
                      alert("Pitch ready! You can paste this in your application form.");
                    }}
                    disabled={isGeneratingPitch}
                    className="flex-1 sm:flex-none bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <PenTool className="w-4 h-4" />
                    Apply with Pitch
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
`;

fs.writeFileSync('src/components/JobsSection.tsx', code);
console.log('Jobs Section Updated');
