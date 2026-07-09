import React, { useState, useEffect } from "react";
import { UserProfile, Job, DjinniCandidate, DjinniPitch } from "../types";
import { 
  Lock, 
  Unlock, 
  Send, 
  Inbox, 
  Briefcase, 
  DollarSign, 
  User, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  X, 
  MessageSquare, 
  ShieldCheck, 
  ThumbsUp, 
  ThumbsDown, 
  Plus, 
  Code, 
  MapPin, 
  Check, 
  Users,
  Eye,
  RefreshCw,
  Mail,
  ExternalLink
} from "lucide-react";
import { db, saveCollectionItem, subscribeToCollection, auth } from "../lib/firebase";
import { collection, getDocs, setDoc, doc, updateDoc, addDoc } from "firebase/firestore";

interface DjinniAnonymousSectionProps {
  userProfile: UserProfile;
  jobs: Job[];
  onUpdateProfile?: (profile: UserProfile) => void;
}

const initialCandidates: DjinniCandidate[] = [
  {
    id: "candidate-seed-1",
    userId: "seed-user-1",
    anonymousTitle: "Anonymous Senior Full-Stack Architect (React & Node.js)",
    skills: ["React Architecture", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS"],
    desiredSalary: 110,
    experienceYears: 7,
    remotePreference: "Fully Remote",
    anonymousSummary: "Architected modern SaaS architectures for Series A startups. Reduced API load times by 55% using edge caching and unified state synchronization. Highly skilled in TypeScript, real-time sync networks, and AWS deployment.",
    isActive: true,
    unlockedUserIds: []
  },
  {
    id: "candidate-seed-2",
    userId: "seed-user-2",
    anonymousTitle: "Anonymous Lead DevSecOps & Cloud Engineer",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD Pipelines", "Cybersecurity"],
    desiredSalary: 125,
    experienceYears: 9,
    remotePreference: "Fully Remote",
    anonymousSummary: "Ex-DevOps Lead. Designed and maintained multi-region Kubernetes clusters for banking software. Cut AWS cloud spending by 38% while hardening intrusion prevention protocols. Absolute champion of zero-trust networks.",
    isActive: true,
    unlockedUserIds: []
  },
  {
    id: "candidate-seed-3",
    userId: "seed-user-3",
    anonymousTitle: "Anonymous Content Strategist & Video Producer",
    skills: ["UGC Storyboarding", "TikTok Algorithms", "CapCut Editing", "Canva Styling"],
    desiredSalary: 75,
    experienceYears: 5,
    remotePreference: "Fully Remote",
    anonymousSummary: "Dynamic UGC content creator. Produced viral video campaigns averaging 4.2M organic views. Master of hook optimization, pacing analysis, and targeted digital brand narratives.",
    isActive: true,
    unlockedUserIds: []
  }
];

export function DjinniAnonymousSection({ userProfile, jobs, onUpdateProfile }: DjinniAnonymousSectionProps) {
  const currentUserId = auth.currentUser?.uid || "guest";
  const isEmployer = userProfile.accountType === "jobOwner";

  // Navigation states: "database" | "my-card" | "pitches"
  const [subTab, setSubTab] = useState<"database" | "my-card" | "pitches">("database");

  // Data lists
  const [candidates, setCandidates] = useState<DjinniCandidate[]>([]);
  const [pitches, setPitches] = useState<DjinniPitch[]>([]);

  // Form states for creating/editing candidate card
  const [myCandidateProfile, setMyCandidateProfile] = useState<DjinniCandidate | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formSalary, setFormSalary] = useState<number>(85);
  const [formExp, setFormExp] = useState<number>(3);
  const [formRemote, setFormRemote] = useState("Fully Remote");
  const [formSummary, setFormSummary] = useState("");
  const [formSkillsText, setFormSkillsText] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Pitch Modal state
  const [pitchTargetCandidate, setPitchTargetCandidate] = useState<DjinniCandidate | null>(null);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [customProposedSalary, setCustomProposedSalary] = useState("");
  const [pitchMessage, setPitchMessage] = useState("");
  const [isSendingPitch, setIsSendingPitch] = useState(false);

  // Load and subscribe to collections
  useEffect(() => {
    // 1. Subscribe to candidates
    const unsubCandidates = subscribeToCollection<DjinniCandidate>("djinni_candidates", (items) => {
      if (items.length === 0) {
        // Seed initial mock candidates in Firestore
        initialCandidates.forEach(async (c) => {
          await saveCollectionItem("djinni_candidates", c);
        });
      } else {
        setCandidates(items);
        // Find current user's candidate profile
        const myProfile = items.find(c => c.userId === currentUserId);
        if (myProfile) {
          setMyCandidateProfile(myProfile);
          // Only prefill if form is empty/initial
          if (!formTitle) {
            setFormTitle(myProfile.anonymousTitle);
            setFormSalary(myProfile.desiredSalary);
            setFormExp(myProfile.experienceYears);
            setFormRemote(myProfile.remotePreference);
            setFormSummary(myProfile.anonymousSummary);
            setFormSkillsText(myProfile.skills.join(", "));
            setFormIsActive(myProfile.isActive);
          }
        }
      }
    });

    // 2. Subscribe to pitches
    const unsubPitches = subscribeToCollection<DjinniPitch>("djinni_pitches", (items) => {
      setPitches(items);
    });

    return () => {
      unsubCandidates();
      unsubPitches();
    };
  }, [currentUserId, formTitle]);

  // Handle Save Anonymous Candidate Profile
  const handleSaveCandidateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSummary.trim()) {
      alert("Please fill in the title and anonymous summary.");
      return;
    }

    setIsSavingProfile(true);
    try {
      const skillsArray = formSkillsText
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const candidateData: DjinniCandidate = {
        id: myCandidateProfile?.id || `cand-${currentUserId}`,
        userId: currentUserId,
        anonymousTitle: formTitle,
        skills: skillsArray.length > 0 ? skillsArray : ["React", "TypeScript"],
        desiredSalary: Number(formSalary) || 80,
        experienceYears: Number(formExp) || 3,
        remotePreference: formRemote,
        anonymousSummary: formSummary,
        isActive: formIsActive,
        unlockedUserIds: myCandidateProfile?.unlockedUserIds || []
      };

      await saveCollectionItem("djinni_candidates", candidateData);
      setMyCandidateProfile(candidateData);
      alert("Your anonymous profile card was saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving profile card.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Handle Send Pitch
  const handleSendPitch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchTargetCandidate) return;

    if (!selectedJobId && !customProposedSalary) {
      alert("Please enter details of the offer.");
      return;
    }

    setIsSendingPitch(true);
    try {
      let jobTitle = "Custom Tech Consultant";
      let proposedSalaryStr = customProposedSalary;

      if (selectedJobId) {
        const selectedJob = jobs.find(j => j.id === selectedJobId);
        if (selectedJob) {
          jobTitle = selectedJob.title;
          if (!proposedSalaryStr) proposedSalaryStr = selectedJob.salary;
        }
      }

      const pitchData: DjinniPitch = {
        id: `pitch-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        candidateId: pitchTargetCandidate.id,
        candidateUserId: pitchTargetCandidate.userId,
        employerUserId: currentUserId,
        employerName: userProfile.name || "ESTARR Partner",
        employerEmail: userProfile.email || "partner@estarr.co",
        jobTitle,
        proposedSalary: proposedSalaryStr || "$95/hr",
        message: pitchMessage || `Hi, we reviewed your anonymous profile on our Anonymous Board and would love to connect about the ${jobTitle} role!`,
        status: "pending",
        createdAt: new Date().toISOString()
      };

      await saveCollectionItem("djinni_pitches", pitchData);
      setPitchTargetCandidate(null);
      setPitchMessage("");
      setSelectedJobId("");
      setCustomProposedSalary("");
      alert(`Pitch sent successfully to the anonymous candidate!`);
    } catch (err) {
      console.error(err);
      alert("Error sending pitch.");
    } finally {
      setIsSendingPitch(false);
    }
  };

  // Handle Accept & Unlock Contact
  const handleAcceptPitch = async (pitch: DjinniPitch) => {
    try {
      // 1. Update pitch status to accepted
      await saveCollectionItem("djinni_pitches", {
        ...pitch,
        status: "accepted"
      });

      // 2. Add employer's userId to candidate's unlocked list
      if (myCandidateProfile) {
        const updatedUnlocked = Array.from(new Set([...(myCandidateProfile.unlockedUserIds || []), pitch.employerUserId]));
        await saveCollectionItem("djinni_candidates", {
          ...myCandidateProfile,
          unlockedUserIds: updatedUnlocked
        });
      }
      alert("Contact unlocked! The employer can now see your real name, email, and avatar to arrange interviews.");
    } catch (err) {
      console.error(err);
      alert("Error accepting pitch.");
    }
  };

  // Handle Decline Pitch
  const handleDeclinePitch = async (pitch: DjinniPitch) => {
    try {
      await saveCollectionItem("djinni_pitches", {
        ...pitch,
        status: "declined"
      });
      alert("Pitch declined.");
    } catch (err) {
      console.error(err);
    }
  };

  // Filter candidates shown in DB
  const activeSearchCandidates = candidates.filter(c => c.isActive && c.userId !== currentUserId);

  // Filter pitches for candidate
  const myIncomingPitches = pitches.filter(p => p.candidateUserId === currentUserId);

  // Filter pitches sent by employer
  const mySentPitches = pitches.filter(p => p.employerUserId === currentUserId);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col gap-6 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-blue-500 text-white font-mono font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
              Anonymous Profile Integration
            </span>
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" /> Anonymous Recruitment Pipeline
            </span>
          </div>
          <h2 className="text-2xl font-black font-display tracking-tight text-white uppercase flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-blue-500" /> Anonymous Tech Market
          </h2>
          <p className="text-slate-400 text-xs mt-1 max-w-xl">
            Freelancers publish anonymous professional summaries & desired salaries. Employers initiate pitches first, protecting candidates from unsolicited outreach until they explicitly unlock contacts.
          </p>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 shrink-0 self-start md:self-center">
          <button
            onClick={() => setSubTab("database")}
            className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-wide uppercase transition-all flex items-center gap-1.5 ${
              subTab === "database"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Candidates
          </button>
          
          {!isEmployer && (
            <button
              onClick={() => setSubTab("my-card")}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-wide uppercase transition-all flex items-center gap-1.5 ${
                subTab === "my-card"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <User className="w-3.5 h-3.5" /> My Anonymous Card
            </button>
          )}

          <button
            onClick={() => setSubTab("pitches")}
            className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-wide uppercase transition-all flex items-center gap-1.5 relative ${
              subTab === "pitches"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            {isEmployer ? "Pitches Sent" : "Incoming Pitches"}
            {(!isEmployer && myIncomingPitches.filter(p => p.status === "pending").length > 0) && (
              <span className="absolute -top-1.5 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            )}
          </button>
        </div>
      </div>

      {/* Database Mode */}
      {subTab === "database" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-bold font-mono">
              ACTIVE CANDIDATES: {activeSearchCandidates.length}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 font-mono">
              ★ SALARY TRANSPARENCY ENFORCED
            </span>
          </div>

          {activeSearchCandidates.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-slate-950/20 border border-slate-800 border-dashed rounded-3xl text-center min-h-[300px]">
              <Lock className="w-12 h-12 text-slate-700 mb-4" />
              <h3 className="text-base font-bold text-white mb-1">No other anonymous candidates listed yet</h3>
              <p className="text-slate-500 text-xs max-w-sm">
                Active candidates will appear here as soon as they set up their anonymous profiles.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {activeSearchCandidates.map((candidate) => {
                const isUnlocked = candidate.unlockedUserIds?.includes(currentUserId);
                
                return (
                  <div 
                    key={candidate.id}
                    className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all flex flex-col justify-between gap-5 relative overflow-hidden group hover:shadow-lg hover:shadow-blue-500/5"
                  >
                    <div className="absolute top-0 right-0 p-3">
                      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                        {isUnlocked ? (
                          <>
                            <Unlock className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 uppercase tracking-tight">Unlocked</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3 text-blue-400 animate-pulse" />
                            <span className="text-slate-400 uppercase tracking-tight">Anonymous</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-bold text-base text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                          {candidate.anonymousTitle}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-400 mt-2">
                          <span className="flex items-center gap-1 bg-slate-900 text-blue-400 px-2 py-0.5 rounded-md border border-slate-800">
                            <DollarSign className="w-3 h-3" /> {candidate.desiredSalary}/hr min
                          </span>
                          <span className="bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                            {candidate.experienceYears} Years Exp
                          </span>
                          <span className="bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                            {candidate.remotePreference}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                        {candidate.anonymousSummary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {candidate.skills.map((skill, idx) => (
                          <span key={idx} className="bg-slate-900 text-slate-400 border border-slate-800/85 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex justify-between items-center gap-4">
                      {isEmployer ? (
                        <button
                          onClick={() => setPitchTargetCandidate(candidate)}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" /> Pitch Anonymous Candidate
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono italic">
                          Only employers can pitch candidate
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Candidate Registration Card */}
      {subTab === "my-card" && !isEmployer && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Form Settings */}
          <form onSubmit={handleSaveCandidateProfile} className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="font-bold text-lg text-white flex items-center gap-2 border-b border-slate-800 pb-3 uppercase tracking-tight">
              <User className="w-5 h-5 text-blue-500" /> Edit My Anonymous Profile
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Anonymous Title (Hides your name)
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Anonymous Senior UX Strategist"
                  className="bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Minimum Desired Salary ($/hr)
                </label>
                <input
                  type="number"
                  required
                  value={formSalary}
                  onChange={(e) => setFormSalary(Number(e.target.value))}
                  placeholder="e.g. 85"
                  className="bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Years of Experience
                </label>
                <input
                  type="number"
                  required
                  value={formExp}
                  onChange={(e) => setFormExp(Number(e.target.value))}
                  placeholder="e.g. 5"
                  className="bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Remote Preference
                </label>
                <select
                  value={formRemote}
                  onChange={(e) => setFormRemote(e.target.value)}
                  className="bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="Fully Remote">Fully Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Onsite">Onsite</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Key Skills (Comma separated)
              </label>
              <input
                type="text"
                required
                value={formSkillsText}
                onChange={(e) => setFormSkillsText(e.target.value)}
                placeholder="React, TypeScript, GraphQL, AWS, Docker"
                className="bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Anonymous summary & Achievements (Do not include your name or current employer)
              </label>
              <textarea
                required
                rows={5}
                value={formSummary}
                onChange={(e) => setFormSummary(e.target.value)}
                placeholder="Outline what you do, specific accomplishments, architectures you have designed, and metrics of your previous work..."
                className="bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-3 bg-slate-900 p-4 rounded-xl border border-slate-850">
              <input
                type="checkbox"
                id="formIsActive"
                checked={formIsActive}
                onChange={(e) => setFormIsActive(e.target.checked)}
                className="accent-blue-500 w-4 h-4 rounded cursor-pointer"
              />
              <label htmlFor="formIsActive" className="text-xs font-bold text-white cursor-pointer select-none">
                Active & Visible to Employers on Anonymous Board
              </label>
            </div>

            <button
              type="submit"
              disabled={isSavingProfile}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              {isSavingProfile ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              Save Anonymous Card
            </button>
          </form>

          {/* Right Column: Card Preview */}
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Live Card Preview
            </span>
            <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between gap-5 min-h-[350px]">
              <div className="absolute top-0 right-0 p-3">
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg text-slate-400">
                  <Lock className="w-3 h-3 text-blue-400" /> Anonymous
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-base text-blue-400 leading-tight">
                    {formTitle || "Anonymous Professional Role"}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2.5 text-[9px] font-mono text-slate-400 mt-2.5">
                    <span className="bg-slate-900 text-blue-400 px-2 py-0.5 border border-slate-850 rounded">
                      ${formSalary || 85}/hr min
                    </span>
                    <span className="bg-slate-900 px-2 py-0.5 border border-slate-850 rounded">
                      {formExp || 3} Years Exp
                    </span>
                    <span className="bg-slate-900 px-2 py-0.5 border border-slate-850 rounded">
                      {formRemote}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-5">
                  {formSummary || "Type an anonymized professional summary of your technical, logistical, or design accomplishments. Remember, employers see this first and initiate the conversation."}
                </p>

                <div className="flex flex-wrap gap-1">
                  {formSkillsText ? (
                    formSkillsText.split(",").map((s, i) => s.trim() && (
                      <span key={i} className="bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded text-[8px] font-mono">
                        {s.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-[9px] text-slate-600 italic">No skills added</span>
                  )}
                </div>
              </div>

              <div className="text-[10px] text-slate-500 italic font-mono pt-3 border-t border-slate-800/80">
                Contact details will only be visible once you accept a pitch.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Incoming / Sent Pitches list */}
      {subTab === "pitches" && (
        <div className="space-y-5">
          <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-400 font-black font-mono uppercase">
              {isEmployer ? "Pitches Sent Feed" : "My Received Pitches"}
            </span>
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
              {isEmployer ? "Track your outreach offers" : "Accept to reveal identity"}
            </span>
          </div>

          {((isEmployer ? mySentPitches : myIncomingPitches).length === 0) ? (
            <div className="flex flex-col items-center justify-center p-12 bg-slate-950/20 border border-slate-800 border-dashed rounded-3xl text-center min-h-[300px]">
              <Inbox className="w-12 h-12 text-slate-700 mb-4 animate-pulse" />
              <h3 className="text-base font-bold text-white mb-1">
                {isEmployer ? "No pitches sent yet" : "No incoming pitches yet"}
              </h3>
              <p className="text-slate-500 text-xs max-w-sm">
                {isEmployer 
                  ? "Browse anonymous candidates and send them specific salary pitches."
                  : "Complete your anonymous profile card and make it active so employers can pitch you."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {(isEmployer ? mySentPitches : myIncomingPitches).map((pitch) => {
                const isAccepted = pitch.status === "accepted";
                const isDeclined = pitch.status === "declined";
                
                // Fetch candidate info for employer if unlocked
                let matchedCandidate: DjinniCandidate | undefined;
                if (isEmployer) {
                  matchedCandidate = candidates.find(c => c.id === pitch.candidateId);
                }

                return (
                  <div 
                    key={pitch.id}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden"
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      {pitch.status === "pending" && (
                        <span className="bg-amber-500/15 border border-amber-500/30 text-amber-500 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                          Pending Review
                        </span>
                      )}
                      {isAccepted && (
                        <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                          Accepted & Unlocked
                        </span>
                      )}
                      {isDeclined && (
                        <span className="bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                          Declined
                        </span>
                      )}
                    </div>

                    <div className="flex-1 space-y-4">
                      {/* Employer Pitch Info */}
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase">
                          {isEmployer ? `OFFER SENT TO ANONYMOUS CANDIDATE` : `OFFER FROM ${pitch.employerName}`}
                        </div>
                        <h4 className="font-bold text-lg text-white mt-1 leading-tight flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-blue-500" /> {pitch.jobTitle}
                        </h4>
                        <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-2">
                          <span className="flex items-center gap-1 text-emerald-400 bg-slate-900 border border-slate-850 px-2 py-0.5 rounded">
                            <DollarSign className="w-3 h-3" /> Proposed: {pitch.proposedSalary}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Sent {new Date(pitch.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-900/60 p-4 border border-slate-850 rounded-xl">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">Pitch Message</span>
                        <p className="text-xs text-slate-300 leading-relaxed italic">
                          "{pitch.message}"
                        </p>
                      </div>

                      {/* If ACCEPTED and UNLOCKED: Show real user details! */}
                      {isAccepted && (
                        <div className="bg-blue-950/20 border border-blue-900/30 p-4 rounded-xl space-y-3">
                          <span className="text-[10px] font-mono text-blue-400 uppercase font-black tracking-wider flex items-center gap-1.5">
                            <Unlock className="w-3.5 h-3.5 text-emerald-400" /> Unlocked Candidate Contact Card
                          </span>
                          
                          {isEmployer ? (
                            // Employer views candidate's contact details (unlocked)
                            <div className="flex items-center gap-3 text-xs">
                              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-sm border border-slate-700">
                                {pitch.employerName?.charAt(0) || "C"}
                              </div>
                              <div className="space-y-0.5 text-slate-300">
                                <p className="font-bold text-white text-sm">Unlocked Candidate Profile</p>
                                <p className="text-slate-400 text-xs">Since the candidate accepted, you can schedule an interview directly.</p>
                                <div className="flex items-center gap-1.5 text-[11px] text-blue-400 mt-1">
                                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                                  <span>{pitch.employerEmail || "unlocked@contact.estarr.app"}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            // Candidate views their own unlock state
                            <div className="text-xs text-slate-400">
                              ✓ Your contact details have been successfully shared with <strong>{pitch.employerName}</strong>. They will contact you at your email: <span className="text-white font-mono">{userProfile.email}</span>.
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row md:flex-col gap-2 shrink-0 self-center md:self-start w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-800 md:pl-6 min-w-[150px]">
                      {pitch.status === "pending" && !isEmployer && (
                        <>
                          <button
                            onClick={() => handleAcceptPitch(pitch)}
                            className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" /> Accept & Unlock
                          </button>
                          <button
                            onClick={() => handleDeclinePitch(pitch)}
                            className="flex-1 md:flex-none bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-400 hover:text-white font-bold py-2 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" /> Decline
                          </button>
                        </>
                      )}

                      {pitch.status === "pending" && isEmployer && (
                        <div className="flex items-center gap-1.5 text-amber-500 text-xs font-mono justify-center h-full">
                          <Clock className="w-4 h-4 text-amber-500 shrink-0" /> Awaiting Candidate
                        </div>
                      )}

                      {isDeclined && (
                        <div className="text-rose-500 text-xs font-mono text-center">
                          Offer declined
                        </div>
                      )}
                      
                      {isAccepted && (
                        <div className="flex flex-col gap-1.5 w-full">
                          <a 
                            href={`mailto:${isEmployer ? "candidate@estarr.app" : pitch.employerEmail}`}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-3 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" /> Start Thread
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Send Pitch Modal */}
      {pitchTargetCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <form 
            onSubmit={handleSendPitch}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-4 shadow-2xl text-white animate-fade-in"
          >
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 font-mono">
                  Pitch Proposal
                </span>
                <h3 className="font-bold text-lg text-white mt-1 leading-tight">
                  Pitch to: {pitchTargetCandidate.anonymousTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPitchTargetCandidate(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Select Job */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Select Active Job Posting
                </label>
                <select
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="">-- Choose one of your posted jobs --</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title} ({job.company})
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Salary Offer */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Proposed Salary or Rate (Optional, defaults to Job Salary)
                </label>
                <input
                  type="text"
                  value={customProposedSalary}
                  onChange={(e) => setCustomProposedSalary(e.target.value)}
                  placeholder="e.g. $100/hr or ₦600,000/month"
                  className="bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Pitch Message & Intro proposal
                </label>
                <textarea
                  required
                  rows={4}
                  value={pitchMessage}
                  onChange={(e) => setPitchMessage(e.target.value)}
                  placeholder="Write a custom proposal introducing the role, why you think they're an anonymous fit, and outline what the team does..."
                  className="bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none resize-none"
                />
              </div>

              <div className="bg-slate-950/50 border border-slate-850 p-3.5 rounded-xl text-slate-400 flex items-start gap-2 text-[11px] leading-relaxed">
                <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  By sending this pitch, you make a formal request. The candidate's identity remains completely anonymous until they explicitly press "Accept & Unlock Contact".
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex gap-3">
              <button
                type="button"
                onClick={() => setPitchTargetCandidate(null)}
                className="flex-1 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSendingPitch}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {isSendingPitch ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                Send Pitch
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

// Minimal placeholder clock icon that might be missing
function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
