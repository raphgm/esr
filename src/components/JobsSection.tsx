import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PageBanner } from "./PageBanner";
import { UserProfile, Job, InterviewSlot, EmailTemplate } from "../types";
import { Briefcase, MapPin, X, Sparkles, DollarSign, Check, Copy, MessageSquare, RefreshCw, ShieldCheck, PenTool, Plus, CheckCircle, Code, ShieldAlert, Bold, Italic, List, Share2, Twitter, Linkedin, Facebook, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DjinniAnonymousSection } from "./DjinniAnonymousSection";
import ReactMarkdown from 'react-markdown';
import { EmailTemplatesManager } from "./EmailTemplatesManager";
import { InterviewScheduler } from "./InterviewScheduler";

interface JobsSectionProps {
  userProfile: UserProfile;
  jobs: Job[];
  onUpdateJobs: (jobs: Job[]) => void;
  onUpdateProfile?: (profile: UserProfile) => void;
  token: string | null;
}

export function JobsSection({ userProfile, jobs, onUpdateJobs, onUpdateProfile, token }: JobsSectionProps) {
  const [showPostJob, setShowPostJob] = useState(false);
  const [viewMode, setViewMode] = useState<"listings" | "proof-of-skills" | "anonymous-market" | "pipeline" | "greenhouse">("listings");
  const [activeCategory, setActiveCategory] = useState<"All" | "Apprenticeship" | "Freelance" | "Full-time">("All");
  const [selectedShareJob, setSelectedShareJob] = useState<Job | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  
  useEffect(() => {
    if (viewMode === "pipeline" && userProfile.accountType !== "jobOwner") {
      setViewMode("listings");
    }
  }, [viewMode, userProfile.accountType]);

  // Pipeline state
  const [pipeline, setPipeline] = useState([
    { id: 1, name: "Chinedu Okafor", stage: "Screening", role: "DevOps Engineer", email: "chinedu@example.com" },
    { id: 2, name: "Aisha Mohammed", stage: "Interview", role: "Full-Stack Dev", email: "aisha@example.com" },
    { id: 3, name: "Samuel Tunde", stage: "Offer", role: "Data Scientist", email: "samuel@example.com" },
  ]);
  const stages = ["Screening", "Interview", "Offer", "Hired"];

  // Scheduling and Email Templates State
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([
    { id: "1", name: "Interview Invite", subject: "Interview Invitation", body: "Hi {{name}}, would you like to schedule an interview?" },
  ]);

  // Dynamic Matcher Skill selector tags
  const [selectedMatcherSkills, setSelectedMatcherSkills] = useState<string[]>(["React Architecture", "TypeScript", "Vite & Build Tooling"]);

  // local skill-sch.com sync states
  const [isLocalSyncOpen, setIsLocalSyncOpen] = useState(false);
  const [syncUsername, setSyncUsername] = useState("");
  const [syncStatus, setSyncStatus] = useState<"idle" | "connecting" | "syncing" | "success" | "error">("idle");
  const [syncMessage, setSyncMessage] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<string>("software-architect");

  const skillSchProfiles = {
    "software-architect": {
      name: "Software Architect",
      skills: ["Advanced React Architecture", "Distributed Systems", "Off-chain State Channels", "Vite & Build Tooling"],
      certification: "skill-sch.com: Certified AI Architect (2026)"
    },
    "smart-contract-developer": {
      name: "Smart Contract Developer",
      skills: ["Solidity Smart Contracts", "ERC-20 & ERC-721 Standards", "Cryptographic Signatures", "Ecosystem Security"],
      certification: "skill-sch.com: Accredited Smart Contract Developer (2026)"
    },
    "agri-business-logistics": {
      name: "Agri-Business Logistics",
      skills: ["Supply Chain Logistics", "Agri-Business Finance", "Poultry Incubation Scales", "Cooperative Commerce"],
      certification: "skill-sch.com: Professional Logistics Analyst (2026)"
    },
    "digital-marketing": {
      name: "Digital Marketing Specialist",
      skills: ["TikTok Ads & Campaigns", "Instagram Outreach Metrics", "Canva Styling", "UGC Asset Production"],
      certification: "skill-sch.com: Certified AI Marketer (2026)"
    }
  };

  const handleSyncSkills = () => {
    if (!syncUsername.trim()) {
      setSyncStatus("error");
      setSyncMessage("Please provide a valid skill-sch.com username or record ID!");
      return;
    }
    setSyncStatus("connecting");
    setSyncMessage("Connecting to skill-sch.com secure off-chain validator...");

    setTimeout(() => {
      setSyncStatus("syncing");
      setSyncMessage("Downloading verified cryptographic skill card signatures...");

      setTimeout(() => {
        setSyncMessage("Verifying student record credentials...");

        setTimeout(() => {
          const profileData = skillSchProfiles[selectedProfile as keyof typeof skillSchProfiles];
          
          // Merge unique skills
          const currentSkills = userProfile.skills || [];
          const updatedSkills = Array.from(new Set([...currentSkills, ...profileData.skills]));
          
          // Merge unique certifications
          const currentCerts = userProfile.certifications || [];
          const updatedCerts = Array.from(new Set([...currentCerts, profileData.certification]));

          if (onUpdateProfile) {
            onUpdateProfile({
              ...userProfile,
              skills: updatedSkills,
              certifications: updatedCerts
            });
          }

          setSyncStatus("success");
          setSyncMessage(`Successfully synchronized skill card of ${syncUsername}! Imported: ${profileData.skills.join(", ")}`);
        }, 1200);
      }, 1200);
    }, 1200);
  };
  
  const [newTitle, setNewTitle] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newType, setNewType] = useState<Job["type"]>("Full-time");
  const [newLocation, setNewLocation] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormat = (type: 'bold' | 'italic' | 'list') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    let formattedText = text;

    if (type === 'bold') {
      formattedText = text.substring(0, start) + '**' + text.substring(start, end) + '**' + text.substring(end);
    } else if (type === 'italic') {
      formattedText = text.substring(0, start) + '*' + text.substring(start, end) + '*' + text.substring(end);
    } else if (type === 'list') {
      const selectedText = text.substring(start, end);
      const lines = selectedText.split('\n');
      const formattedLines = lines.map(line => line.trim().startsWith('- ') ? line : `- ${line}`);
      formattedText = text.substring(0, start) + formattedLines.join('\n') + text.substring(end);
    }

    setNewDesc(formattedText);
    textarea.focus();
  };

  // Cloud Talent Solution Search States
  const [ctsSearchQuery, setCtsSearchQuery] = useState("");
  const [ctsLocation, setCtsLocation] = useState("");
  const [isSearchingCts, setIsSearchingCts] = useState(false);
  const [ctsJobs, setCtsJobs] = useState<Job[]>([]);

  const handleCtsSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearchingCts(true);
    try {
      const response = await fetch(`/api/talent/jobs?query=${encodeURIComponent(ctsSearchQuery)}&location=${encodeURIComponent(ctsLocation)}`);
      const data = await response.json();
      if (data.success) {
        setCtsJobs(data.jobs);
      }
    } catch (err) {
      console.error("Talent Solution Search Error:", err);
    } finally {
      setIsSearchingCts(false);
    }
  };

  useEffect(() => {
    handleCtsSearch();
  }, []);

  const [pitchJob, setPitchJob] = useState<Job | null>(null);
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState("");
  const [pitchCopied, setPitchCopied] = useState(false);

  const handlePostJob = async (e: React.FormEvent) => {
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
        skillsRequired: [],
        shareUrl: `${window.location.origin}/jobs?id=job-${Date.now()}`,
        status: 'pending'
      };

      // Call Talent Solution API
      try {
        await fetch("/api/talent/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newTitle,
            companyName: newCompany,
            location: newLocation,
            description: newDesc,
            employmentType: newType
          })
        });
      } catch (err) {
        console.error("Talent Solution Post Error:", err);
      }

      onUpdateJobs([newJob, ...jobs]);
      alert(`Job Posted Successfully! Share this link: ${newJob.shareUrl}`);
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
        `Hi ${job.company} Team,\n\nI'm very interested in the ${job.title} role. Although I'm relatively new to this field, I have recently completed rigorous practical training in the ESTARR Academy, including hands-on consultancy directly related to ${job.skillsRequired?.[0] || 'the required skills'}.\n\nI am highly motivated, eager to learn, and ready to deliver value immediately through my strong work ethic and foundational knowledge. Please find my ESTARR 'Proof of Work' portfolio attached for a sample of my capabilities.\n\nLooking forward to the opportunity to grow with your team!\n\nBest regards,\n${userProfile.name}`
      );
    }, 1500);
  };

  const copyPitch = () => {
    navigator.clipboard.writeText(generatedPitch);
    setPitchCopied(true);
    setTimeout(() => setPitchCopied(false), 2000);
  };

  const [talentPoolState, setTalentPoolState] = useState([
    { id: 1, name: "Chinedu Okafor", role: "Senior DevOps Engineer", matchScore: 98, capstone: "Automated CI/CD Pipeline for Microservices", status: "pending", email: "chinedu@example.com", verified: false, isExpanded: false, githubUrl: "https://github.com/chinedu/pipeline" },
    { id: 2, name: "Aisha Mohammed", role: "Full-Stack Developer", matchScore: 92, capstone: "Real-time E-commerce Marketplace", status: "pending", email: "aisha@example.com", verified: false, isExpanded: false, githubUrl: "https://github.com/aisha/ecommerce" },
    { id: 3, name: "Samuel Tunde", role: "Data Scientist", matchScore: 85, capstone: "Predictive AI Model for Logistics", status: "pending", email: "samuel@example.com", verified: false, isExpanded: false, githubUrl: "https://github.com/samuel/ai-model" },
  ]);

  const filteredJobs = viewMode === "listings" 
    ? jobs 
    : [];

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-800">
      <PageBanner
        title="Job Board"
        subtitle="CAREER OPPORTUNITIES & TALENT MATCHING"
        description="Find your next role or hire verified talent based on real-world capstone consultancy, not just resumes."
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
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === "listings" ? "bg-white shadow-sm text-purple-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            Job Listings
          </button>
          {userProfile.accountType === "jobOwner" && (
            <button
              onClick={() => setViewMode("pipeline")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === "pipeline" ? "bg-white shadow-sm text-purple-600" : "text-slate-500 hover:text-slate-700"}`}
            >
              Pipeline
            </button>
          )}
          <button
            onClick={() => setViewMode("proof-of-skills")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${viewMode === "proof-of-skills" ? "bg-white shadow-sm text-purple-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {userProfile.accountType === "jobOwner" ? "Hire by Proof-of-Skill" : "My Skill Match Score"}
          </button>
          <button
            onClick={() => setViewMode("anonymous-market")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${viewMode === "anonymous-market" ? "bg-white shadow-sm text-purple-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            Anonymous Market
          </button>
        </div>

        {viewMode === "listings" && (
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {(["All", "Apprenticeship", "Freelance", "Full-time"] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${activeCategory === cat ? "bg-slate-900 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {viewMode === "listings" && (
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-3xl shadow-xl border border-white/10 mb-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold font-display">Cloud Talent Search</h3>
              <p className="text-slate-400 text-[10px] uppercase tracking-wider font-mono">Powered by Google Cloud AI</p>
            </div>
          </div>
          <form onSubmit={handleCtsSearch} className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search by job title, skills, or role..." 
                value={ctsSearchQuery}
                onChange={e => setCtsSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>
            <div className="md:w-64 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Location..." 
                value={ctsLocation}
                onChange={e => setCtsLocation(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>
            <button 
              type="submit"
              disabled={isSearchingCts}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSearchingCts ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Search
            </button>
          </form>
        </div>
      )}

      {viewMode === "proof-of-skills" && userProfile.accountType === "jobOwner" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-slate-900">AI-Powered Proof-of-Skills Matcher</h3>
              <p className="text-sm text-slate-500">Evaluate and hire talent based on real consultancy, not resumes. Features formal skills from skill-sch.com and creator skills from ESTARR.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {talentPoolState.map((talent, i) => (
              <div key={talent.id} 
                onClick={() => setTalentPoolState(talentPoolState.map(t => t.id === talent.id ? {...t, isExpanded: !t.isExpanded} : t))}
                className="border border-slate-200 p-5 rounded-2xl flex flex-col hover:border-purple-300 hover:shadow-md transition-all cursor-pointer bg-slate-50 hover:bg-white"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900">{talent.name}</h4>
                    <p className="text-xs text-slate-500">{talent.role}</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {talent.matchScore}% Match
                  </div>
                </div>
                <div className="mt-2 pt-3 border-t border-slate-200">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Verified Project</p>
                  <a 
                    href={talent.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm font-medium text-purple-600 hover:text-purple-800 leading-tight block hover:underline"
                  >
                    {talent.capstone}
                  </a>
                  {talent.verified ? (
                    <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                        <CheckCircle className="w-3 h-3" /> Verified on-chain
                    </div>
                  ) : (
                    <button
                        onClick={(e) => { e.stopPropagation(); setTalentPoolState(talentPoolState.map(t => t.id === talent.id ? {...t, verified: true} : t))}}
                        className="mt-2 text-[10px] font-bold text-indigo-600 hover:text-indigo-800"
                    >
                        Verify on-chain
                    </button>
                  )}
                </div>
                {talent.isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${talent.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {talent.status || 'pending'}
                      </span>
                      
                      <div className="flex items-center gap-1">
                        {talent.status !== 'approved' && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); setTalentPoolState(talentPoolState.map(t => t.id === talent.id ? {...t, status: 'approved'} : t))}}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition-colors"
                          >
                            <CheckCircle className="w-3 h-3" /> Approve
                          </button>
                        )}
                        <button 
                          onClick={async (e) => {
                            e.stopPropagation();
                            setTalentPoolState(talentPoolState.filter(t => t.id !== talent.id));
                          }}
                          className="text-rose-400 hover:text-rose-600 p-1 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={async (e) => {
                            e.stopPropagation();
                            try {
                              await axios.post('/api/send-email', {
                                to: talent.email,
                                subject: 'Interview Invitation',
                                body: `Hi ${talent.name}, we would like to invite you to an interview based on your capstone consultancy.`
                              });
                              alert(`Invite sent to ${talent.name} for an interview based on their capstone consultancy.`);
                            } catch (error) {
                              console.error('Failed to send email:', error);
                              alert('Failed to send email.');
                            }
                          }}
                          className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-md text-[10px] font-bold flex items-center gap-1 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" /> Invite
                        </button>
                      </div>
                    </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === "proof-of-skills" && userProfile.accountType !== "jobOwner" && (() => {
        const hasSyncedSkills = userProfile.skills && userProfile.skills.length > 3;
        const matchScore = hasSyncedSkills ? 95 : 65;

        // live matcher compatibility calculator
        const calculateCompatibility = (jobSkills: string[]) => {
          if (!jobSkills || jobSkills.length === 0) return 60;
          const matches = jobSkills.filter(js => 
            selectedMatcherSkills.some(ms => ms.toLowerCase().includes(js.toLowerCase()) || js.toLowerCase().includes(ms.toLowerCase()))
          );
          const ratio = matches.length / jobSkills.length;
          return Math.round(55 + (ratio * 45)); // scale 55% to 100%
        };

        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Your Profile Competitiveness */}
            <div className="bg-slate-950 rounded-3xl p-8 shadow-sm text-white overflow-hidden relative flex flex-col justify-between">
              <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none">
                <Sparkles className="w-[300px] h-[300px]" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold font-display mb-2">Profile Competitiveness</h3>
                <p className="text-slate-400 mb-6 text-xs">Based on your completed Academy missions and overall activity.</p>
                
                <div className="bg-white/10 border border-white/20 p-5 rounded-2xl backdrop-blur-md mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-100">Match Readiness Score</span>
                    <span className={`${hasSyncedSkills ? "text-purple-400" : "text-emerald-400"} font-bold text-xl`}>{matchScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1005 ${hasSyncedSkills ? "bg-gradient-to-r from-purple-400 to-indigo-400" : "bg-emerald-400"}`} 
                      style={{ width: `${matchScore}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">
                    {hasSyncedSkills 
                      ? "✓ Verified credentials from skill-sch.com are active. You are primed for elite matching." 
                      : "⚡ Sync your external skill card to boost your profile score to 95% immediately."}
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 text-slate-900 mb-6">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-purple-500 mb-2 font-mono">ESTARR Intelligence Insights</p>
                  <ul className="space-y-2 text-sm">
                    {hasSyncedSkills ? (
                      <>
                        <li className="flex gap-2 items-start text-slate-800 text-xs"><CheckCircle className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /> <strong>Credentials Active:</strong> Linked academic record of <strong>{userProfile.name}</strong>.</li>
                        <li className="flex gap-2 items-start text-slate-800 text-xs"><CheckCircle className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /> Your verified skills match 42 open digital-creator roles & apprenticeships.</li>
                        <li className="flex gap-2 items-start text-slate-800 text-xs"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Code quality and commit history evaluated at Top 10% of peers.</li>
                      </>
                    ) : (
                      <>
                        <li className="flex gap-2 items-start text-slate-800 text-xs"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Your "DeFi Staking App" capstone perfectly matches 14 open blockchain roles.</li>
                        <li className="flex gap-2 items-start text-slate-800 text-xs"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Code quality and commit history evaluated at Top 10% of peers.</li>
                        <li className="flex gap-2 items-start text-slate-800 text-xs"><Code className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> <strong>Gap:</strong> Sync your skill-sch.com credential card to bridge your verified training records.</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Sync CTA Panel */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                  <div>
                    <span className="font-bold text-white flex items-center gap-1.5 font-display tracking-tight">
                      <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" /> skill-sch.com Connection
                    </span>
                    <p className="text-slate-400 mt-1 max-w-sm text-[11px]">
                      {hasSyncedSkills 
                        ? "Your accredited academic credentials are synchronized."
                        : "Sync your digital learner identity card to connect verified technical skills."}
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      setSyncStatus("idle");
                      setSyncMessage("");
                      setIsLocalSyncOpen(true);
                    }}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      hasSyncedSkills 
                        ? "bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:bg-purple-900/30" 
                        : "bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:scale-[1.02] active:scale-95"
                    }`}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {hasSyncedSkills ? "Re-Sync Card" : "Sync Skill Card"}
                  </button>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 relative z-10">
                <button className="bg-white text-purple-700 px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-purple-50 transition-colors">
                  Start Missing Capstone Consultancy
                </button>
                {hasSyncedSkills && (
                  <div className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs px-4 py-2.5 rounded-xl flex items-center gap-1 font-mono font-bold">
                    <ShieldCheck className="w-4 h-4 text-purple-400" /> skill-sch.com Linked
                  </div>
                )}
              </div>
            </div>

            {/* Right: Live Skill Match Optimizer */}
            <div className="bg-[#FAF6EE] border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between text-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
                  <h3 className="font-display font-black text-lg text-slate-900">Live Skill Match Optimizer</h3>
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-normal">
                  Toggle skills you possess to live-calculate compatibility scores against available jobs and see where to upskill.
                </p>

                {/* Preset selectable tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {[
                    "React Architecture", "TypeScript", "Vite & Build Tooling", "Solidity Smart Contracts", "ERC-20 & ERC-721 Standards", "TikTok Ads & Campaigns", "Instagram Outreach Metrics", "Canva Styling", "UGC Asset Production"
                  ].map(skill => {
                    const isSelected = selectedMatcherSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedMatcherSkills(selectedMatcherSkills.filter(s => s !== skill));
                          } else {
                            setSelectedMatcherSkills([...selectedMatcherSkills, skill]);
                          }
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide transition-all cursor-pointer border ${
                          isSelected 
                            ? "bg-purple-600 border-purple-600 text-white shadow-xs" 
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>

                {/* Matches Feed list */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">COMPATIBLE JOBS</span>
                  {jobs.slice(0, 3).map(job => {
                    const score = calculateCompatibility(job.skillsRequired || []);
                    return (
                      <div key={job.id} className="p-3 bg-white border border-slate-100 rounded-xl hover:border-purple-200 transition-colors text-xs flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-bold text-slate-900 text-xs">{job.title}</p>
                            <p className="text-[10px] font-mono text-slate-400">{job.company} • {job.location}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full font-mono font-black text-[9px] ${
                            score >= 80 ? "bg-emerald-100 text-emerald-800" : "bg-purple-100 text-purple-800"
                          }`}>
                            {score}% MATCH
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              score >= 80 ? "bg-emerald-500" : "bg-purple-500"
                            }`} 
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        );
      })()}

      {viewMode === "pipeline" && userProfile.accountType === "jobOwner" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {["Screening", "Interview", "Offer"].map(stage => (
              <div key={stage} className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                <h4 className="text-base font-bold text-slate-900 mb-6 flex items-center justify-between">
                  {stage}
                  <span className="bg-white text-slate-500 px-3 py-1 rounded-xl border border-slate-200 text-xs font-mono">{pipeline.filter(p => p.stage === stage).length}</span>
                </h4>
                <div className="space-y-4">
                  {pipeline.filter(p => p.stage === stage).map(candidate => (
                    <div key={candidate.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{candidate.name}</p>
                          <p className="text-xs text-slate-500">{candidate.role}</p>
                        </div>
                      </div>
                      {stage === "Interview" && (
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <InterviewScheduler token={token} candidateName={candidate.name} candidateEmail={candidate.email} />
                        </div>
                      )}
                      <div className="flex gap-2 justify-end flex-wrap pt-3 border-t border-slate-100">
                        {["Screening", "Interview", "Offer"].map(s => s !== stage && (
                          <button
                            key={s}
                            onClick={() => setPipeline(prev => prev.map(c => c.id === candidate.id ? {...c, stage: s} : c))}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                          >
                            → {s}
                          </button>
                        ))}
                        {stage === "Offer" && (
                          <button
                            onClick={() => setPipeline(prev => prev.map(c => c.id === candidate.id ? {...c, stage: "Hired"} : c))}
                            className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-xs font-bold text-white transition-colors"
                          >
                            Hire
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <EmailTemplatesManager templates={emailTemplates} onUpdate={setEmailTemplates} token={token} />
          </div>
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
                <input required type="text" value={newCompany} onChange={e => setNewCompany(e.target.value)} placeholder="e.g. ESTARR Tech" className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-purple-500" />
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
                <input required type="text" value={newLocation} onChange={e => setNewLocation(e.target.value)} placeholder="e.g. Lagos, Nigeria or Remote" className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-purple-500" />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wide">Salary / Budget</label>
                <input required type="text" value={newSalary} onChange={e => setNewSalary(e.target.value)} placeholder="e.g. $3k - $5k/mo" className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-purple-500" />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wide">Description</label>
                <div className="flex gap-2 mb-1">
                  <button type="button" onClick={() => handleFormat('bold')} className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700"><Bold className="w-3 h-3" /></button>
                  <button type="button" onClick={() => handleFormat('italic')} className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700"><Italic className="w-3 h-3" /></button>
                  <button type="button" onClick={() => handleFormat('list')} className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700"><List className="w-3 h-3" /></button>
                </div>
                <textarea ref={textareaRef} required rows={4} value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Describe the responsibilities and requirements..." className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-purple-500 resize-none" />
            </div>
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold w-fit mt-2 cursor-pointer transition-colors shadow-sm">
              Publish Job
            </button>
          </form>
        </div>
      )}

      {viewMode === "listings" && ctsJobs.length > 0 && (
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-2 px-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Talent Solution Matches</h4>
          </div>
          {ctsJobs.map((job) => (
            <div
              key={job.id}
              className="bg-indigo-50/30 border border-indigo-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between md:items-start gap-6 hover:shadow-lg hover:shadow-indigo-500/5 transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-2">
                <div className="bg-indigo-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Verified AI Match</div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold uppercase text-lg mb-1 text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium font-mono">
                  <span className="text-indigo-600 font-bold">{job.company}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600">
                    <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                  </span>
                </div>
                <div className="text-sm mt-3 text-slate-600 leading-relaxed max-w-3xl space-y-2 markdown-body">
                  <ReactMarkdown>{job.description}</ReactMarkdown>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto md:items-end self-center md:self-start">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wide w-fit md:mb-2 bg-indigo-100 text-indigo-700">
                  {job.type}
                </span>
                <div className="flex gap-2 w-full md:w-auto">
                  <button 
                    type="button"
                    onClick={() => setSelectedShareJob(job)}
                    className="p-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-slate-500 hover:text-indigo-600 rounded-xl transition-all flex items-center justify-center shrink-0"
                    title="Share Job Listing"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => generatePitch(job)}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/10 flex items-center justify-center gap-1.5 flex-1 md:flex-none"
                  >
                    Apply via ESTARR
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="h-px bg-slate-200 my-4 mx-2" />
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
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${job.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {job.status || 'pending'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600">
                    <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                  </span>
                </div>
                <div className="text-sm mt-3 text-slate-600 leading-relaxed max-w-3xl space-y-2 markdown-body">
                  <ReactMarkdown>{job.description}</ReactMarkdown>
                </div>
                
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
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide w-fit md:mb-2 ${job.type === 'Apprenticeship' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                  {job.type}
                </span>
                
                {userProfile.accountType === 'jobOwner' && (
                  <div className="flex gap-2 items-center">
                    <button
                      type="button"
                      onClick={() => setSelectedShareJob(job)}
                      className="p-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-slate-500 hover:text-indigo-600 rounded-xl transition-all flex items-center justify-center shrink-0"
                      title="Share Job Listing"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    {job.status !== 'approved' && (
                      <button
                        onClick={() => onUpdateJobs(jobs.map(j => j.id === job.id ? {...j, status: 'approved'} : j))}
                        className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-100"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => onUpdateJobs(jobs.filter(j => j.id !== job.id))}
                      className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-rose-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
                
                {userProfile.accountType !== 'jobOwner' && (
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <button
                      type="button"
                      onClick={() => setSelectedShareJob(job)}
                      className="p-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-slate-500 hover:text-indigo-600 rounded-xl transition-all flex items-center justify-center shrink-0"
                      title="Share Job Listing"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => generatePitch(job)}
                      className="bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 flex-1"
                    >
                      <Sparkles className="w-4 h-4" />
                      AI Pitch Writer
                    </button>
                    <button 
                      onClick={() => alert("Application submitted for this role.")}
                      className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center flex-1">
                      Apply Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : viewMode === "anonymous-market" ? (
        <DjinniAnonymousSection 
          userProfile={userProfile}
          jobs={jobs}
          onUpdateProfile={onUpdateProfile}
        />
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

      {/* skill-sch.com Synchronization Modal */}
      {isLocalSyncOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 flex flex-col text-slate-800 animate-fade-in">
            
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white flex justify-between items-center relative">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display font-black tracking-tight text-base uppercase">
                    skill-sch.com Sync
                  </h3>
                  <p className="text-[10px] text-blue-100 font-mono">
                    OFF-CHAIN VERIFICATION ENGINE
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLocalSyncOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-5">
              
              {syncStatus === "idle" && (
                <>
                  <div className="bg-blue-50 border border-blue-200/60 p-4 rounded-xl flex gap-3 text-xs text-blue-800">
                    <ShieldCheck className="w-5 h-5 shrink-0 text-blue-650 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-1">Secure Academic Linkage</span>
                      Synchronizing your skill card from <strong>skill-sch.com</strong> imports accredited qualifications directly into your ESTARR verified profile to boost job & gig matching score.
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* User Identifier */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wide">
                        skill-sch.com Username or Learner ID
                      </label>
                      <input
                        type="text"
                        required
                        value={syncUsername}
                        onChange={(e) => setSyncUsername(e.target.value)}
                        placeholder="e.g. SCH-chinedu-77 or chinedu"
                        className="w-full bg-slate-50 border border-slate-200 text-xs px-3.5 py-2.5 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                      />
                    </div>

                    {/* Skill profile selection list */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wide">
                        Select Verified Credential Profile to Sync
                      </label>
                      <div className="grid grid-cols-1 gap-2.5 max-h-[180px] overflow-y-auto pr-1">
                        {Object.entries(skillSchProfiles).map(([id, p]) => (
                          <label
                            key={id}
                            className={`p-3 border rounded-xl flex items-start gap-3 cursor-pointer transition-all ${
                              selectedProfile === id
                                ? "border-blue-500 bg-blue-50/50 shadow-xs"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="local_sync_profile_select"
                              checked={selectedProfile === id}
                              onChange={() => setSelectedProfile(id)}
                              className="mt-1 accent-blue-600 shrink-0"
                            />
                            <div className="text-xs">
                              <span className="font-black text-slate-800 block mb-0.5">
                                {p.name}
                              </span>
                              <span className="text-[10px] text-slate-500 block">
                                {p.skills.join(" • ")}
                              </span>
                              <span className="text-[9px] text-blue-600 font-mono mt-1 block">
                                {p.certification}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSyncSkills}
                    className="w-full bg-slate-950 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer text-center shadow-md hover:shadow-lg"
                  >
                    Verify & Synchronize Card
                  </button>
                </>
              )}

              {(syncStatus === "connecting" || syncStatus === "syncing") && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-blue-600 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Synchronizing Secure Record...</h4>
                    <p className="text-slate-500 text-xs mt-1 animate-pulse font-mono max-w-sm mx-auto">
                      {syncMessage}
                    </p>
                  </div>
                  <div className="w-48 bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div 
                      className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ${
                        syncStatus === "connecting" ? "w-1/3" : "w-3/4"
                      }`} 
                    />
                  </div>
                </div>
              )}

              {syncStatus === "success" && (
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm animate-bounce">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base">Synchronization Complete!</h4>
                    <p className="text-slate-600 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
                      Your skill card for <strong>{syncUsername}</strong> has been verified. <strong>{skillSchProfiles[selectedProfile as keyof typeof skillSchProfiles].name}</strong> qualification is linked to your account.
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 w-full text-left space-y-2">
                    <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block">Linked Formal Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      {skillSchProfiles[selectedProfile as keyof typeof skillSchProfiles].skills.map((s, idx) => (
                        <span key={idx} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                          <Check className="w-3 h-3 text-emerald-600" /> {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsLocalSyncOpen(false)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs uppercase cursor-pointer"
                  >
                    Return to Profile
                  </button>
                </div>
              )}

              {syncStatus === "error" && (
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shadow-sm">
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Synchronization Failed</h4>
                    <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
                      {syncMessage}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSyncStatus("idle")}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs uppercase cursor-pointer border border-slate-200"
                  >
                    Try Again
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Social Media Sharing Modal */}
      <AnimatePresence>
        {selectedShareJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 md:p-8 flex flex-col max-h-[90vh] border border-slate-100 overflow-y-auto text-slate-800"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-display font-black tracking-tight text-xl text-slate-900 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-indigo-600" />
                    Share Job Listing
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Spread the word across your social channels to find elite talent.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedShareJob(null);
                    setShareCopied(false);
                  }}
                  className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Preview Card Mockup */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 mb-6 relative overflow-hidden shadow-lg shadow-indigo-950/10 border border-indigo-950">
                <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
                
                <div className="flex justify-between items-start gap-4 relative z-10">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800">
                      🌐 ESTARR EXCELLENCE
                    </span>
                    <h4 className="font-display font-black text-lg mt-2 uppercase tracking-tight text-white leading-tight">
                      {selectedShareJob.title}
                    </h4>
                    <p className="text-xs text-indigo-200 font-medium font-mono mt-1">
                      {selectedShareJob.company} • {selectedShareJob.location}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 bg-white/10 text-white text-[9px] font-bold tracking-wide rounded-md uppercase shrink-0 border border-white/5">
                    {selectedShareJob.type}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-indigo-800/60 flex justify-between items-center relative z-10">
                  <span className="text-[10px] text-indigo-300 font-mono flex items-center gap-1">
                    Verified Escrow Contract Salary: <strong className="text-emerald-400 font-sans text-xs">{selectedShareJob.salary}</strong>
                  </span>
                  <span className="text-[8px] text-slate-400 font-mono tracking-tighter">
                    ESTARR.WORKSPACE
                  </span>
                </div>
              </div>

              {/* Share Channels */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Select Share Destination
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      selectedShareJob.shareUrl || `${window.location.origin}/jobs?id=${selectedShareJob.id}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-slate-200 hover:border-blue-200 hover:bg-blue-50/20 rounded-2xl text-xs font-bold text-slate-700 transition-all hover:translate-y-[-1px]"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
                      <Linkedin className="w-4 h-4 fill-white text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-slate-900">LinkedIn</span>
                      <span className="text-[10px] text-slate-400 font-normal block mt-0.5">Share to professional feed</span>
                    </div>
                  </a>

                  {/* Twitter / X */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `Check out this incredible job opening on ESTARR: ${selectedShareJob.title} at ${selectedShareJob.company}! 🚀 #ESTARR #Web3Jobs`
                    )}&url=${encodeURIComponent(
                      selectedShareJob.shareUrl || `${window.location.origin}/jobs?id=${selectedShareJob.id}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-slate-200 hover:border-slate-800 hover:bg-slate-50 rounded-2xl text-xs font-bold text-slate-700 transition-all hover:translate-y-[-1px]"
                  >
                    <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white shrink-0">
                      <Twitter className="w-4 h-4 fill-white text-black" />
                    </div>
                    <div>
                      <span className="block text-slate-900">Twitter / X</span>
                      <span className="text-[10px] text-slate-400 font-normal block mt-0.5">Tweet to followers</span>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `Check out this exciting job opening: ${selectedShareJob.title} at ${selectedShareJob.company} - ${
                        selectedShareJob.shareUrl || `${window.location.origin}/jobs?id=${selectedShareJob.id}`
                      }`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/20 rounded-2xl text-xs font-bold text-slate-700 transition-all hover:translate-y-[-1px]"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0">
                      <Send className="w-4 h-4 text-white rotate-[-30deg]" />
                    </div>
                    <div>
                      <span className="block text-slate-900">WhatsApp</span>
                      <span className="text-[10px] text-slate-400 font-normal block mt-0.5">Send to contact / group</span>
                    </div>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      selectedShareJob.shareUrl || `${window.location.origin}/jobs?id=${selectedShareJob.id}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-slate-200 hover:border-blue-100 hover:bg-blue-50/10 rounded-2xl text-xs font-bold text-slate-700 transition-all hover:translate-y-[-1px]"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-800 flex items-center justify-center text-white shrink-0">
                      <Facebook className="w-4 h-4 fill-white text-blue-800" />
                    </div>
                    <div>
                      <span className="block text-slate-900">Facebook</span>
                      <span className="text-[10px] text-slate-400 font-normal block mt-0.5">Post on Timeline</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Copyable Link Input */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Listing Web Link
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={selectedShareJob.shareUrl || `${window.location.origin}/jobs?id=${selectedShareJob.id}`}
                    className="flex-1 bg-slate-50 border border-slate-200/85 px-4 py-2.5 rounded-xl text-xs text-slate-500 font-mono focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const url = selectedShareJob.shareUrl || `${window.location.origin}/jobs?id=${selectedShareJob.id}`;
                      navigator.clipboard.writeText(url);
                      setShareCopied(true);
                      setTimeout(() => setShareCopied(false), 2000);
                    }}
                    className={`px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                      shareCopied 
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" 
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    {shareCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
                
                {/* Mobile Web Share API Fallback */}
                {typeof navigator !== "undefined" && navigator.share && (
                  <button
                    type="button"
                    onClick={() => {
                      const url = selectedShareJob.shareUrl || `${window.location.origin}/jobs?id=${selectedShareJob.id}`;
                      navigator.share({
                        title: selectedShareJob.title,
                        text: `Apply for ${selectedShareJob.title} at ${selectedShareJob.company} on ESTARR Workspace!`,
                        url: url,
                      }).catch(() => {});
                    }}
                    className="w-full mt-3 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4" />
                    Use Mobile System Share
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
