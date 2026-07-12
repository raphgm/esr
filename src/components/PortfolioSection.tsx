import React, { useState, useEffect } from "react";
import { UserProfile, PortfolioItem } from "../types";
import { PageBanner } from "./PageBanner";
import { 
  Briefcase, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Globe, 
  Layers,
  Plus,
  Heart,
  Eye,
  Share2,
  Download,
  Mail,
  Linkedin,
  Github,
  User,
  Sparkles,
  ClipboardCheck,
  Code,
  GraduationCap,
  BookOpen,
  Clock,
  ChevronRight,
  ChevronLeft,
  CheckCircle, Check,
  XCircle,
  Play,
  RotateCcw,
  Trash2,
  Save,
  CheckSquare,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { PortfolioClientSection } from "./PortfolioClientSection";

interface PortfolioSectionProps {
  userProfile: UserProfile;
  onUpdateProfile?: (updated: UserProfile) => void;
  isPublicView?: boolean;
}

// CBT Quiz definitions
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface AssessmentQuiz {
  id: string;
  title: string;
  category: string;
  durationMins: number;
  questions: QuizQuestion[];
  badgeName: string;
}

const ASSESSMENT_QUIZZES: AssessmentQuiz[] = [
  {
    id: "quiz-react-ts",
    title: "TypeScript & React Expert Evaluation",
    category: "Frontend Development",
    durationMins: 10,
    badgeName: "Verified React & TypeScript Expert",
    questions: [
      {
        id: 1,
        question: "What is the main benefit of using TypeScript with React?",
        options: [
          "It guarantees faster runtime execution in all browser engines.",
          "It provides compile-time static type checking to catch layout and state errors early.",
          "It replaces the need for CSS modules or Tailwind utility classes.",
          "It automatically bundles and compresses the application for deployment."
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "In React, what is the key difference between 'useEffect' and 'useMemo'?",
        options: [
          "useEffect is for performing asynchronous or external side effects, while useMemo is for caching the result of expensive calculations.",
          "useEffect runs only on the server side, while useMemo is client-exclusive.",
          "There is no difference; they are syntactic sugar aliases of each other.",
          "useMemo is a legacy Hook reserved solely for older React class-based architectures."
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "Which utility type in TypeScript makes all properties of an interface optional?",
        options: [
          "Required<T>",
          "Record<K, T>",
          "Partial<T>",
          "Omit<T, K>"
        ],
        correctAnswer: 2
      },
      {
        id: 4,
        question: "How can you trigger an infinite re-render loop inside a standard React component?",
        options: [
          "By declaring state variables inside a button's onClick callback handler.",
          "By updating a state variable directly in the render body of the component outside any Hook.",
          "By memoizing a complex prop using the useCallback hook.",
          "By providing an empty dependency array ([]) to a standard useEffect hook."
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "What is the correct way to declare type definitions for component props in React with TypeScript?",
        options: [
          "Using standard TypeScript 'interface' or 'type' alias definitions.",
          "Declaring them inside a global configuration CSS file.",
          "Props are automatically typed as 'any' and their types cannot be redefined.",
          "Using traditional JavaScript 'var' keywords inside comments."
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    id: "quiz-ai-rlhf",
    title: "Generative AI & LLM RLHF Annotation",
    category: "Artificial Intelligence",
    durationMins: 8,
    badgeName: "Verified AI Training & RLHF Expert",
    questions: [
      {
        id: 1,
        question: "What does RLHF stand for in contemporary LLM training workflows?",
        options: [
          "Reinforcement Learning from Human Feedback",
          "Rapid Logic Handling Framework",
          "Recursive Language Heuristics Finder",
          "Real-time Lexical Heuristics Formatting"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "What is the primary purpose of constructing a 'System Prompt' in LLM agents?",
        options: [
          "To intentionally increase model latency and optimize cloud resources.",
          "To establish the overall persona, constraints, safety guardrails, and behavioral rules for the model.",
          "To transpile server-side TypeScript code into raw executable machine layers.",
          "To clear cache buffers of conversational histories permanently."
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "In RLHF annotations, what does the 'Helpfulness vs. Harmlessness' trade-off represent?",
        options: [
          "Instructing the model to always output the longest answer possible.",
          "Ensuring the model assists the user effectively while firmly declining to generate toxic, unsafe, or illegal content.",
          "Disabling safety filters entirely to boost real-time response speeds.",
          "Restricting model execution to secure offline-only database nodes."
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What does the 'temperature' parameter adjust in an LLM generation call?",
        options: [
          "The physical heat levels of the server GPUs hosting the weights.",
          "The degree of randomness, diversity, and creativity of the generated tokens.",
          "The absolute limit of the model's physical input token context window.",
          "The number of generation streams compiled simultaneously."
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "quiz-python-ds",
    title: "Python & AI Models Benchmarking",
    category: "Data Science & Backend",
    durationMins: 12,
    badgeName: "Verified Python & AI Benchmark Analyst",
    questions: [
      {
        id: 1,
        question: "In Python, which list-comprehension correctly filters out odd numbers from a list 'nums'?",
        options: [
          "[x for x in nums if x % 2 == 0]",
          "[x if x % 2 == 0 for x in nums]",
          "[x for x in nums where x % 2 == 0]",
          "filter(lambda x: x % 2 == 0, nums) as list"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "What is the primary goal of computing cosine similarity in vector embeddings?",
        options: [
          "To measure the physical file size differences of two embedded databases.",
          "To evaluate the semantic similarity between two text pieces based on the angle of their vector representations.",
          "To speed up database indexing by converting floating points to binary integers.",
          "To hash API keys securely before client-side transmissions."
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "What is the purpose of PyTorch's 'DataLoader'?",
        options: [
          "To automatically translate Python models into TypeScript React apps.",
          "To handle batching, shuffling, and multi-process loading of dataset tensors into the neural network.",
          "To compile SQL schemas dynamically on Cloud platforms.",
          "To host a web server displaying real-time training analytics."
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "In Python, what is the critical difference between a 'generator' (using yield) and a 'list'?",
        options: [
          "Generators are only supported on specialized GPU instances.",
          "Generators produce values lazily one-at-a-time, consuming minimal memory, while lists load all elements into RAM instantly.",
          "Lists can only contain integers, while generators handle all types.",
          "There is no difference; yield is deprecated in Python 3."
        ],
        correctAnswer: 1
      }
    ]
  }
];

export default function PortfolioSection({ userProfile, onUpdateProfile, isPublicView = false }: PortfolioSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    "about" | "skills" | "assessments" | "experience" | "projects" | "certifications" | "education" | "languages"
  >("about");

  // Profile Edit states
  const [editName, setEditName] = useState(userProfile?.name || "");
  const [editProfession, setEditProfession] = useState(userProfile?.profession || "");
  const [editLocation, setEditLocation] = useState(userProfile?.location || "");
  const [editBio, setEditBio] = useState(userProfile?.bio || "");
  const [editLinkedin, setEditLinkedin] = useState("");
  const [editGithub, setEditGithub] = useState("");

  // Quiz states
  const [currentQuiz, setCurrentQuiz] = useState<AssessmentQuiz | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizTimer, setQuizTimer] = useState(0);
  const [quizActive, setQuizActive] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizPassed, setQuizPassed] = useState(false);
  const [showAssessmentsModal, setShowAssessmentsModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [newMilestoneName, setNewMilestoneName] = useState("");
  const [milestoneToast, setMilestoneToast] = useState(false);

  // Forms state
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillProficiency, setNewSkillProficiency] = useState("Intermediate");
  const [skillVerifying, setSkillVerifying] = useState(false);
  const [skillVerifyQuestion, setSkillVerifyQuestion] = useState("");
  const [skillVerifyOptions, setSkillVerifyOptions] = useState<string[]>([]);
  const [skillVerifyAnswer, setSkillVerifyAnswer] = useState<number>(0);
  const [selectedSkillOption, setSelectedSkillOption] = useState<number | null>(null);

  const [expRole, setExpRole] = useState("");
  const [expCompany, setExpCompany] = useState("");
  const [expDuration, setExpDuration] = useState("");
  const [expDesc, setExpDesc] = useState("");

  const [projTitle, setProjTitle] = useState("");
  const [projCategory, setProjCategory] = useState("Development");
  const [projUrl, setProjUrl] = useState("");

  const [eduDegree, setEduDegree] = useState("");
  const [eduSchool, setEduSchool] = useState("");
  const [eduYear, setEduYear] = useState("");

  const [langName, setLangName] = useState("");
  const [langLevel, setLangLevel] = useState("Fluent");

  useEffect(() => {
    if (userProfile) {
      setEditName(userProfile.name);
      setEditProfession(userProfile.profession);
      setEditLocation(userProfile.location);
      setEditBio(userProfile.bio);
    }
  }, [userProfile]);

  // Quiz timer count down
  useEffect(() => {
    let interval: any;
    if (quizActive && quizTimer > 0) {
      interval = setInterval(() => {
        setQuizTimer((prev) => {
          if (prev <= 1) {
            handleQuizSubmit(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizActive, quizTimer]);

  if (userProfile?.accountType === "jobOwner" && !isPublicView) {
    return <PortfolioClientSection userProfile={userProfile} onUpdateProfile={onUpdateProfile} />;
  }

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    alert("Portfolio link copied to clipboard!");
  };

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newMilestoneName.trim();
    if (!trimmedName || !onUpdateProfile) return;
    
    onUpdateProfile({
      ...userProfile,
      certifications: [...(userProfile.certifications || []), trimmedName]
    });
    
    setNewMilestoneName("");
    setShowMilestoneModal(false);
    setMilestoneToast(true);
    setTimeout(() => setMilestoneToast(false), 3000);
  };

  // Profile save
  const handleSaveProfile = () => {
    if (!onUpdateProfile) return;
    const updated = {
      ...userProfile,
      name: editName,
      profession: editProfession,
      location: editLocation,
      bio: editBio
    };
    onUpdateProfile(updated);
    alert("Profile saved successfully!");
  };

  // Skill auto-verification widget trigger
  const handleStartSkillVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    setSkillVerifying(true);
    setSelectedSkillOption(null);
    // Generate simple question
    const skill = newSkillName.trim();
    setSkillVerifyQuestion(`To verify ${skill}, answer this core concept riddle: Which pattern is best practice in modern asynchronous ${skill} applications?`);
    setSkillVerifyOptions([
      "Relying on global state synchronization timers",
      "Using non-blocking async/await or structured promise architectures",
      "Duplicating code parameters across all client endpoints",
      "Forcing synchronous thread blocks inside active components"
    ]);
    setSkillVerifyAnswer(1); // Option B is correct
  };

  const handleCompleteSkillVerify = () => {
    if (selectedSkillOption === null) return;
    if (selectedSkillOption === skillVerifyAnswer) {
      confetti({ particleCount: 50, spread: 60 });
      if (onUpdateProfile) {
        const skills = userProfile.skills || [];
        if (!skills.includes(newSkillName.trim())) {
          const updatedSkills = [...skills, newSkillName.trim()];
          const history = userProfile.history || [];
          const updatedHistory = [
            {
              desc: `Successfully verified and appended skill: ${newSkillName.trim()} (${newSkillProficiency})`,
              date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            },
            ...history
          ];
          onUpdateProfile({
            ...userProfile,
            skills: updatedSkills,
            history: updatedHistory
          });
        }
      }
      alert(`Verification passed! '${newSkillName}' added to your verified skills list.`);
      setNewSkillName("");
      setSkillVerifying(false);
    } else {
      alert("Verification riddle incorrect. Please review standard concepts and try again!");
      setSkillVerifying(false);
    }
  };

  // Quiz lifecycle
  const handleStartQuiz = (quiz: AssessmentQuiz) => {
    setCurrentQuiz(quiz);
    setQuizAnswers({});
    setQuizTimer(quiz.durationMins * 60);
    setQuizActive(true);
    setQuizSubmitted(false);
    setQuizPassed(false);
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleQuizSubmit = (isTimeOut = false) => {
    if (!currentQuiz) return;
    setQuizActive(false);
    setQuizSubmitted(true);

    let correctCount = 0;
    currentQuiz.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / currentQuiz.questions.length) * 100);
    setQuizScore(percent);

    if (percent >= 80) {
      setQuizPassed(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Award badge & certifications & update history
      if (onUpdateProfile) {
        const certifications = userProfile.certifications || [];
        const history = userProfile.history || [];
        
        let updatedCerts = [...certifications];
        if (!updatedCerts.includes(currentQuiz.badgeName)) {
          updatedCerts.push(currentQuiz.badgeName);
        }

        const updatedHistory = [
          {
            desc: `Passed CBT Professional Assessment for ${currentQuiz.title} with a score of ${percent}%`,
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
          },
          ...history
        ];

        onUpdateProfile({
          ...userProfile,
          certifications: updatedCerts,
          history: updatedHistory
        });
      }
    } else {
      setQuizPassed(false);
    }
  };

  // Add work experience
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expRole || !expCompany) return;
    
    if (onUpdateProfile) {
      const history = userProfile.history || [];
      const updatedHistory = [
        {
          desc: `Joined ${expCompany} as ${expRole} (${expDuration}). ${expDesc}`,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        },
        ...history
      ];
      onUpdateProfile({
        ...userProfile,
        history: updatedHistory
      });
    }

    setExpRole("");
    setExpCompany("");
    setExpDuration("");
    setExpDesc("");
    alert("Experience added to verified logs successfully!");
  };

  // Add Project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projUrl) return;

    if (onUpdateProfile) {
      const portfolio = userProfile.portfolio || [];
      const newItem: PortfolioItem = {
        id: `port-${Date.now()}`,
        title: projTitle,
        category: projCategory,
        url: projUrl,
        views: 0,
        likes: 0
      };
      onUpdateProfile({
        ...userProfile,
        portfolio: [newItem, ...portfolio]
      });
    }

    setProjTitle("");
    setProjUrl("");
    alert("Project added to Consultancy Portfolio successfully!");
  };

  // Add Education
  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduDegree || !eduSchool) return;

    if (onUpdateProfile) {
      const history = userProfile.history || [];
      const updatedHistory = [
        {
          desc: `Graduated from ${eduSchool} with a ${eduDegree} in ${eduYear}`,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        },
        ...history
      ];
      onUpdateProfile({
        ...userProfile,
        history: updatedHistory
      });
    }

    setEduDegree("");
    setEduSchool("");
    setEduYear("");
    alert("Academic history saved successfully!");
  };

  // Add Language
  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!langName) return;

    if (onUpdateProfile) {
      const history = userProfile.history || [];
      const updatedHistory = [
        {
          desc: `Registered new workspace language capability: ${langName} (${langLevel})`,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        },
        ...history
      ];
      onUpdateProfile({
        ...userProfile,
        history: updatedHistory
      });
    }

    setLangName("");
    alert("Language qualification added successfully!");
  };

  // Helper formats
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12 relative min-h-screen isolate">
      {/* Decorative background ambient glow circles */}
      <div className="absolute -top-16 -left-16 w-96 h-96 bg-purple-300/25 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse duration-10000" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-300/25 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse duration-7000" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {!isPublicView && (
        <PageBanner
          title="My Professional Showcase"
          subtitle="PORTFOLIO & SKILLS"
          description="This is your public-facing professional profile. It showcases your verified skills, consultancy portfolio, and AI credentials to potential employers and brand partners."
          icon={Briefcase}
          actions={
            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:bg-slate-800 border border-slate-800 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-purple-400" />
                Share Portfolio
              </button>
            </div>
          }
        />
      )}

      {/* Main interactive grid structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Left Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Profile Card */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-5">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-32 h-32 rounded-full object-cover border-[6px] border-slate-50 shadow-md"
              />
              <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            
            <h2 className="font-display font-black text-2xl text-slate-900 mb-2">{userProfile.name}</h2>
            
            <span className="text-xs text-purple-700 font-bold px-4 py-1.5 bg-purple-50 rounded-full mb-4">
              {userProfile.profession}
            </span>
            
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-6">
              <MapPin className="w-3.5 h-3.5" />
              <span>{userProfile.location || "Remote"}</span>
            </div>
            
            <p className="text-sm text-slate-600 leading-relaxed mb-8 px-2">
              {userProfile.bio || "No professional overview bio set yet."}
            </p>
            
            {/* Stats */}
            <div className="w-full flex flex-col gap-3 mb-8">
              <div className="flex items-center justify-between px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Endorsements</span>
                <span className="font-black text-slate-900">{userProfile.recommends || 48}</span>
              </div>
              <div className="flex items-center justify-between px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">AI Credentials</span>
                <span className="font-black text-slate-900">{userProfile.certifications?.length || 0}</span>
              </div>
            </div>
            
            {/* Socials */}
            <div className="flex items-center justify-center gap-3 w-full">
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-colors cursor-pointer">
                <Mail className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-colors cursor-pointer">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-colors cursor-pointer">
                <Github className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2 mb-6">
              <Layers className="w-5 h-5 text-indigo-600" />
              Skills & Expertise
            </h3>
            
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-4">
              Verified Skills & Expertise
            </p>
            
            <div className="flex flex-wrap gap-2.5">
              {userProfile.skills?.map((skill, sIdx) => (
                <span 
                  key={sIdx} 
                  className="px-3 py-1.5 bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Assessments Launcher */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2 mb-4">
              <ClipboardCheck className="w-5 h-5 text-purple-600" />
              Technical Assessments
            </h3>
            <p className="text-sm text-slate-600 mb-6">Take skill evaluations to earn verified badges on your profile.</p>
            <button
              onClick={() => setShowAssessmentsModal(true)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold p-3 rounded-xl transition-colors text-xs uppercase tracking-wider cursor-pointer shadow-md"
            >
              Open Assessments
            </button>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Portfolio Box */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Globe className="w-6 h-6 text-emerald-500" />
                Consultancy Portfolio
              </h3>
              <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest">
                {userProfile.portfolio?.length || 0} Items
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProfile.portfolio?.map((item, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 group hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-mono font-black text-fuchsia-600 uppercase tracking-widest">{item.category}</span>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-6 leading-snug group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h4>
                  <div className="mt-auto flex items-center gap-4 text-xs font-bold text-slate-500">
                    <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {item.views.toLocaleString()}</span>
                    <span className="flex items-center gap-1.5"><Heart className="w-4 h-4" /> {item.likes.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Credentials & Badges Box */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                AI Credentials & Badges
              </h3>
              {!isPublicView && (
                <button 
                  onClick={() => setShowMilestoneModal(true)}
                  className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer"
                  title="Add New Milestone"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {userProfile.certifications?.map((cert, idx) => (
                <div key={idx} className="bg-amber-50/30 border border-amber-100 rounded-2xl p-6 flex flex-col items-center text-center gap-4 group hover:shadow-md transition-all cursor-pointer">
                  <div className="w-14 h-14 bg-white border border-amber-100 rounded-full flex items-center justify-center shadow-sm">
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs leading-snug">{cert}</h4>
                  <div className="mt-auto bg-white border border-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </div>
                </div>
              ))}
              
            </div>
          </div>
          
          {/* Activity Logs Box */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2 mb-8">
              <Download className="w-6 h-6 text-blue-500" />
              Verified Activity Logs
            </h3>
            
            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {userProfile.history?.map((activity, idx) => (
                <div key={idx} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-white border-2 border-purple-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{activity.desc}</h4>
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mt-1.5 flex items-center gap-2">
                      {activity.date} • COMPLETED MILESTONE • VERIFIED OFF-CHAIN
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>

      {/* Assessments Modal */}
      <AnimatePresence>
        {showAssessmentsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAssessmentsModal(false)} />
            
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-slate-50 border border-slate-200 rounded-[2rem] p-8 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setShowAssessmentsModal(false)}
                className="absolute top-6 right-6 p-2 bg-white text-slate-400 hover:text-slate-900 rounded-full border border-slate-200 shadow-sm transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

          {/* Assessments Box */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2 mb-8">
              <ClipboardCheck className="w-6 h-6 text-purple-600" />
              Technical Assessments
            </h3>

            {!currentQuiz && !quizSubmitted && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ASSESSMENT_QUIZZES.map((quiz) => (
                  <div key={quiz.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col items-start gap-4 hover:shadow-sm transition-all">
                    <h4 className="font-bold text-slate-900 leading-tight">{quiz.title}</h4>
                    <span className="text-[10px] font-mono font-bold text-purple-600 uppercase tracking-widest bg-purple-100 px-2 py-0.5 rounded">
                      {quiz.category}
                    </span>
                    <p className="text-xs text-slate-500 font-semibold mb-4 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {quiz.durationMins} Mins
                    </p>
                    <button
                      onClick={() => handleStartQuiz(quiz)}
                      className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors w-full cursor-pointer shadow-sm shadow-purple-500/20"
                    >
                      Start Assessment
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Display active quiz here */}
            {currentQuiz && quizActive && (
              <div className="border border-indigo-100 bg-indigo-50/30 rounded-3xl p-8">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-indigo-100">
                  <h4 className="font-display font-black text-xl text-slate-900">{currentQuiz.title}</h4>
                  <span className="font-mono font-black text-rose-500 flex items-center gap-1.5 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                    <Clock className="w-4 h-4" /> {formatTime(quizTimer)}
                  </span>
                </div>
                
                <div className="space-y-8">
                  {currentQuiz.questions.map((q, idx) => (
                    <div key={q.id}>
                      <h5 className="font-bold text-sm text-slate-900 mb-4 leading-relaxed">
                        {idx + 1}. {q.question}
                      </h5>
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => (
                          <label key={optIdx} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${quizAnswers[q.id] === optIdx ? 'bg-white border-indigo-500 shadow-sm ring-1 ring-indigo-500' : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}`}>
                            <input
                              type="radio"
                              name={`question-${q.id}`}
                              checked={quizAnswers[q.id] === optIdx}
                              onChange={() => handleSelectOption(q.id, optIdx)}
                              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 mt-0.5 cursor-pointer"
                            />
                            <span className="text-sm text-slate-700 font-medium leading-snug">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => handleQuizSubmit()}
                  className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-4 rounded-xl w-full text-sm transition-all shadow-md shadow-indigo-500/20 uppercase tracking-widest cursor-pointer"
                >
                  Submit Assessment
                </button>
              </div>
            )}

            {/* Quiz Results */}
            {quizSubmitted && currentQuiz && (
              <div className="text-center p-10 bg-slate-50 border border-slate-200 rounded-[2rem] flex flex-col items-center">
                {quizScore !== null && quizScore >= 80 ? (
                  <>
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-200">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h4 className="font-display font-black text-2xl text-slate-900 mb-3">Assessment Passed!</h4>
                    <p className="text-slate-600 mb-8 max-w-md leading-relaxed text-sm">You scored <strong>{quizScore}%</strong> on the {currentQuiz.title}. Your verified badge has been added to your profile.</p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-rose-200">
                      <XCircle className="w-10 h-10" />
                    </div>
                    <h4 className="font-display font-black text-2xl text-slate-900 mb-3">Assessment Failed</h4>
                    <p className="text-slate-600 mb-8 max-w-md leading-relaxed text-sm">You scored <strong>{quizScore}%</strong> on the {currentQuiz.title}. You need at least 80% to pass and earn the badge.</p>
                  </>
                )}
                
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setCurrentQuiz(null);
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-4 h-4" /> Return to Assessments
                </button>
              </div>
            )}
          </div>
          

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Toast Notification */}
      <AnimatePresence>
        {milestoneToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3"
          >
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium">Milestone added successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestone Modal */}
      <AnimatePresence>
        {showMilestoneModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowMilestoneModal(false)} />
            
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-md bg-white border border-slate-200 rounded-[2rem] p-8 shadow-2xl"
            >
              <button 
                onClick={() => setShowMilestoneModal(false)}
                className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full border border-slate-200 shadow-sm transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Add Milestone</h3>
              <p className="text-slate-500 text-sm mb-6">Enter the name of your new certification, badge, or credential.</p>

              <form onSubmit={handleSaveMilestone} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Credential Name</label>
                  <input
                    type="text"
                    value={newMilestoneName}
                    onChange={(e) => setNewMilestoneName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g. AWS Certified Solutions Architect"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={!newMilestoneName}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold p-3.5 rounded-xl transition-colors text-xs uppercase tracking-wider cursor-pointer shadow-md mt-4"
                >
                  Save Milestone
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
