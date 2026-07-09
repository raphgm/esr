import React, { useState, useEffect } from "react";
import { Course, UserProfile } from "../types";
import { PageBanner } from "./PageBanner";
import { CategoryTabs } from "./CategoryTabs";
import {
  Award,
  CheckCircle,
  BookOpen,
  Clock,
  ChevronRight,
  HelpCircle,
  MessageSquare,
  Play,
  Heart,
  Share2,
  Send,
  Sparkles,
  UserCheck,
  Plus,
  Image as ImageIcon,
  FileText,
  Check,
  ExternalLink,
  Lock,
  ShieldCheck,
  ShieldAlert,
  ThumbsUp,
  Briefcase,
  TrendingUp,
  Tv,
  Wallet,
  Coins,
  Video,
  Coffee
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { EnhancedVideoPlayer } from "./EnhancedVideoPlayer";
import { CreatorStudio } from "./CreatorStudio";
import { subscribeToCollection, where } from "../lib/firebase";

interface CreatorContent {
  id: string;
  creatorId: string;
  title: string;
  type: "video" | "slide" | "photo";
  url: string;
  thumbnail?: string;
  views: number;
  earnings: number;
  status: "draft" | "published";
  createdAt: any;
}

interface AcademySectionProps {
  userProfile: UserProfile;
  courses: Course[];
  onUpdateCourses: (courses: Course[]) => void;
  onUpdateProfile: (profile: UserProfile) => void;
  onOpenAiChat: (prompt: string, context: string) => void;
}

// Pre-defined gig mapping to show immediate earnings pathways
const courseGigMapping: Record<string, { title: string; budget: string; description: string; type: string }> = {
  "Google AI Masterclass": {
    title: "Enterprise AI Agent Development",
    budget: "$15,000 - $45,000",
    description: "Build custom autonomous AI agents for Fortune 500 workflows.",
    type: "AI Architecture"
  },
  "Web3 Smart Contract Security": {
    title: "L2 Protocol Audit Retainer",
    budget: "$20,000 - $60,000",
    description: "Execute rigorous vulnerability testing on pre-launch smart contracts.",
    type: "Security Audit"
  },
  "AWS CloudNative Architect": {
    title: "Kubernetes Migration Pipeline",
    budget: "$10,000 - $35,000",
    description: "Design and implement highly available EKS environments.",
    type: "Cloud Infrastructure"
  }
};

interface SocialPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  courseTitle: string;
  content: string;
  image?: string;
  likes: number;
  hasLiked?: boolean;
  comments: { author: string; content: string; time: string }[];
  time: string;
  verifiedWork?: boolean;
}

export default function AcademySection({
  userProfile,
  courses,
  onUpdateCourses,
  onUpdateProfile,
  onOpenAiChat,
}: AcademySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"catalog" | "community-feed" | "credentials" | "instructor-studio">("catalog");

  // Monetization & Wallet States
  const [purchasingCourse, setPurchasingCourse] = useState<Course | null>(null);

  // Course Creator Form States
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCoursePrice, setNewCoursePrice] = useState("0");
  const [newCourseCategory, setNewCourseCategory] = useState<"AI & ML" | "Web3" | "Cloud DevOps" | "Data Science" | "Software Eng." | "Cybersecurity" | "Product Design" | "Vocational">("Vocational");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [newCourseLessons, setNewCourseLessons] = useState<{ id: string; title: string; duration: string; completed?: boolean }[]>([
    { id: "mod1", title: "Introduction & Tool Setup", duration: "10 mins", completed: false }
  ]);
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDuration, setNewLessonDuration] = useState("15 mins");

  // Quiz States
  const [quizAnswers, setQuizAnswers] = useState<{ [qIdx: number]: number }>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [creatorAssets, setCreatorAssets] = useState<CreatorContent[]>([]);

  useEffect(() => {
    const unsub = subscribeToCollection<CreatorContent>("creator_content", (items) => {
      setCreatorAssets(items);
    }, where("status", "==", "published"));
    return () => unsub();
  }, []);

  // Lesson & Simulated Video Player States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);

  // Mission submissions
  const [missionSubmissions, setMissionSubmissions] = useState<{ [missionId: string]: string }>({});
  const [aiGraderScore, setAiGraderScore] = useState<number | null>(null);
  const [aiFeedbackText, setAiFeedbackText] = useState<string>("");
  const [isGrading, setIsGrading] = useState<boolean>(false);

  // Social Community Feed States
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([
    {
      id: "sp-1",
      authorName: "Sarah Chen",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      authorRole: "AI Engineer",
      courseTitle: "Google AI Masterclass: Gemini API & Agents",
      content: "Just deployed my first autonomous math agent using the Antigravity framework! Managed to integrate it with the Gemini tool-calling API to handle complex differential equations. The system prompt optimization made a huge difference.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=300",
      likes: 24,
      hasLiked: false,
      comments: [
        { author: "Alex K.", content: "Did you use the React SDK or Node.js directly?", time: "2h ago" },
        { author: "Marcus Dev", content: "That's awesome! System instructions are definitely the key to preventing agent loops.", time: "1h ago" }
      ],
      time: "2h ago",
      verifiedWork: true
    },
    {
      id: "sp-2",
      authorName: "Marcus Dev",
      authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      authorRole: "Smart Contract Auditor",
      courseTitle: "Web3 Smart Contract Security Audit",
      content: "Completed my vulnerability audit of the mock Layer-2 AMM contract. Found three critical reentrancy vectors and patched them using OpenZeppelin's ReentrancyGuard. Highly recommend running Slither alongside manual reviews!",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=300",
      likes: 19,
      hasLiked: false,
      comments: [
        { author: "Sarah Chen", content: "Great catch on the reentrancy! Slither is a lifesaver.", time: "3h ago" }
      ],
      time: "4h ago",
      verifiedWork: true
    },
    {
      id: "sp-3",
      authorName: "Alex K.",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      authorRole: "DevOps Specialist",
      courseTitle: "Advanced AI Agent Deployment Architecture",
      content: "Successfully provisioned a highly available EKS cluster using Terraform. Configured the HorizontalPodAutoscaler to handle traffic spikes. Next step: setting up ArgoCD for GitOps deployments!",
      likes: 34,
      hasLiked: false,
      comments: [],
      time: "6h ago",
      verifiedWork: false
    }
  ]);

  const [newPostContent, setNewPostContent] = useState<string>("");
  const [newPostCourse, setNewPostCourse] = useState<string>("Zero to YouTuber");
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  const categories = [
    "All",
    "AI & ML",
    "Web3",
    "Cloud DevOps",
    "Data Science",
    "Software Eng.",
    "Cybersecurity",
    "Product Design",
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  // Toggle completed lesson state
  const toggleLessonComplete = (courseId: string, lessonId: string) => {
    const updated = courses.map((c) => {
      if (c.id === courseId) {
        const updatedLessons = c.lessons.map((l) => {
          if (l.id === lessonId) {
            return { ...l, completed: !l.completed };
          }
          return l;
        });
        return { ...c, lessons: updatedLessons };
      }
      return c;
    });
    onUpdateCourses(updated);

    if (selectedCourse && selectedCourse.id === courseId) {
      const match = updated.find((c) => c.id === courseId);
      if (match) setSelectedCourse(match);
    }
  };

  // Video Progress Tick Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && videoProgress < 100) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 98) {
            setIsPlaying(false);
            // Auto complete active lesson
            if (selectedCourse && activeLesson) {
              toggleLessonComplete(selectedCourse.id, activeLesson);
            }
            return 100;
          }
          return prev + 2;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, videoProgress, selectedCourse, activeLesson]);

  // Handle Video Player Reset on Lesson Switch
  useEffect(() => {
    setIsPlaying(false);
    setVideoProgress(0);
    setAiGraderScore(null);
    setAiFeedbackText("");
  }, [activeLesson]);

  // Hands-on Consultancy Submission and Simulated AI Grading
  const handleConsultancySubmit = (courseId: string, missionId: string, e: React.FormEvent) => {
    e.preventDefault();
    const submissionText = missionSubmissions[missionId];
    if (!submissionText || !submissionText.trim()) return;

    setIsGrading(true);
    setAiFeedbackText("");
    setAiGraderScore(null);

    // Simulated real-time LLM critique grading loop
    setTimeout(() => {
      const isYouTuber = selectedCourse?.title.includes("YouTuber");
      const isWhatsApp = selectedCourse?.title.includes("WhatsApp");
      const isTailor = selectedCourse?.title.includes("Tailoring");
      
      let randomScore = Math.floor(Math.random() * 15) + 85; // 85 to 99
      let feedback = "";
      
      if (isYouTuber) {
        feedback = `ESTARR AI Feedback: Outstanding YouTube script draft! Your initial 3-second hook effectively sparks curiosity. The focus on local Lagos entrepreneurship is highly engaging. Recommendation: Inject 1x clear call-to-action mid-video instead of piling everything at the end.`;
      } else if (isWhatsApp) {
        feedback = `ESTARR AI Feedback: Beautiful storefront setup plan! The inclusion of direct payment links and categorized product catalogues makes navigation frictionless for buyers. Recommendation: Ensure your automated greeting includes standard business opening hours.`;
      } else if (isTailor) {
        feedback = `ESTARR AI Feedback: Highly precise body measurement record table! Storing critical hip-to-hemline balances will prevent sewing misfits. Recommendation: Double-check the chest tape-measure tightness on dynamic fabric structures.`;
      } else {
        feedback = `ESTARR AI Feedback: Tremendous work! Your practical submission aligns perfectly with our module parameters. Your layout is clean, and the milestone objectives are clearly stated.`;
      }

      setAiGraderScore(randomScore);
      setAiFeedbackText(feedback);
      setIsGrading(false);

      // Update actual course progress data
      const updated = courses.map((c) => {
        if (c.id === courseId) {
          const updatedMissions = c.missions.map((m) => {
            if (m.id === missionId) {
              return { ...m, completed: true };
            }
            return m;
          });
          return { ...c, missions: updatedMissions };
        }
        return c;
      });
      onUpdateCourses(updated);

      if (selectedCourse && selectedCourse.id === courseId) {
        const match = updated.find((c) => c.id === courseId);
        if (match) setSelectedCourse(match);
      }

      // Add to Student Community Social Feed automatically!
      const userPost: SocialPost = {
        id: `user-post-${Date.now()}`,
        authorName: userProfile.name,
        authorAvatar: userProfile.avatar,
        authorRole: "ESTARR Developer",
        courseTitle: selectedCourse?.title || "Tech Practice",
        content: `Just completed my hands-on mission task: "${submissionText}" for ${selectedCourse?.title}! Earned ${selectedCourse?.missions.find(m => m.id === missionId)?.reward || "100"} points!`,
        likes: 1,
        hasLiked: true,
        comments: [
          { author: "ESTARR AI Grader", content: `Approved with ${randomScore}% score! Excellent job.`, time: "Just now" }
        ],
        time: "Just now",
        verifiedWork: true
      };

      setSocialPosts([userPost, ...socialPosts]);

      // Award profile points/certificates
      const pointsGain = 10;
      onUpdateProfile({
        ...userProfile,
        recommends: userProfile.recommends + pointsGain,
        certifications: [
          ...userProfile.certifications.filter((cert) => !cert.includes(selectedCourse!.title)),
          `AI Training: Completed ${selectedCourse!.title} Practical Mission (${new Date().getFullYear()})`,
        ]
      });
    }, 2200);
  };

  // Computer-Based Testing (CBT) Quiz Submission
  const handleQuizSubmit = (course: Course) => {
    let score = 0;
    course.quizzes.forEach((quiz, idx) => {
      if (quizAnswers[idx] === quiz.answer) {
        score++;
      }
    });

    setQuizScore(score);
    setQuizSubmitted(true);

    if (score === course.quizzes.length) {
      // Full marks: Completed AI Credential unlocked!
      const currentCerts = userProfile.certifications.filter((cert) => !cert.includes(course.title));
      
      onUpdateProfile({
        ...userProfile,
        certifications: [
          ...currentCerts,
          `Certified: ${course.title} Professional (${new Date().getFullYear()})`,
        ],
      });
    }
  };

  const claimAICredential = async (course: Course) => {
    try {
      if (!userProfile.certifications.includes(course.title)) {
        const updatedCerts = [...userProfile.certifications, course.title];
        onUpdateProfile({
          ...userProfile,
          certifications: updatedCerts,
          recommends: (userProfile.recommends || 0) + 1
        });
        alert(`Congratulations! You've earned your professional license for ${course.title}. Check your Credentials tab!`);
      }
    } catch (err) {
      console.error("Credential error:", err);
    }
  };

  const [isTipping, setIsTipping] = useState(false);
  const handleTipCreator = (instructorName: string) => {
    setIsTipping(true);
    setTimeout(() => {
      alert(`Sent a $500 tip to ${instructorName}! Thank you for supporting artisans.`);
      setIsTipping(false);
    }, 1500);
  };

  // Calculate course progress percentage (Lessons + Missions)
  const calculateProgress = (course: Course) => {
    const completedLessons = course.lessons.filter((l) => l.completed).length;
    const completedMissions = course.missions.filter((m) => m.completed).length;
    const totalItems = course.lessons.length + course.missions.length;
    return Math.round(((completedLessons + completedMissions) / totalItems) * 100);
  };

  // Social feed operations
  const handleLikePost = (postId: string) => {
    setSocialPosts(
      socialPosts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likes: p.hasLiked ? p.likes - 1 : p.likes + 1,
            hasLiked: !p.hasLiked,
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setSocialPosts(
      socialPosts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                author: userProfile.name,
                content: text,
                time: "Just now",
              },
            ],
          };
        }
        return p;
      })
    );

    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const handleCreateSocialPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: SocialPost = {
      id: `custom-post-${Date.now()}`,
      authorName: userProfile.name,
      authorAvatar: userProfile.avatar,
      authorRole: userProfile.profession || "Developer",
      courseTitle: newPostCourse,
      content: newPostContent,
      likes: 0,
      hasLiked: false,
      comments: [],
      time: "Just now",
      verifiedWork: false
    };

    setSocialPosts([newPost, ...socialPosts]);
    setNewPostContent("");
    
    // Tiny toast confirmation simulated in UI
  };

  const handleTopUpWallet = () => {
    const currentBalance = userProfile.walletBalance ?? 0;
    const newBalance = currentBalance + 5000;
    onUpdateProfile({
      ...userProfile,
      walletBalance: newBalance
    });
    alert(`💳 Wallet Refilled!\n$5,000 has been added to your Learner Wallet.\nNew Balance: $${newBalance.toLocaleString()}`);
  };

  const handlePurchaseCourse = (course: Course) => {
    const cost = course.price ?? 0;
    const currentBalance = userProfile.walletBalance ?? 0;
    
    if (currentBalance < cost) {
      alert(`⚠️ Insufficient Funds in your Learner Wallet!\n\nCourse Fee: $${cost.toLocaleString()}\nAvailable Wallet: $${currentBalance.toLocaleString()}\n\nPlease click "Top Up Wallet" above to add $5,000 to your spendable balance.`);
      return;
    }

    const updatedBalance = currentBalance - cost;
    const currentUnlocked = userProfile.unlockedCourseIds ?? [];
    
    onUpdateProfile({
      ...userProfile,
      walletBalance: updatedBalance,
      unlockedCourseIds: [...currentUnlocked, course.id]
    });

    if (course.instructorName !== userProfile.name) {
      alert(`🎉 Course Unlocked!\n\nSuccessfully unlocked "${course.title}".\n$${cost.toLocaleString()} has been securely transferred to the Artisan Instructor: ${course.instructorName}.`);
    } else {
      alert(`🎉 Successfully unlocked your own course!`);
    }

    setPurchasingCourse(null);
  };

  const handlePublishCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim() || !newCourseDescription.trim()) {
      alert("Please fill in the title and description for your course.");
      return;
    }

    const priceNum = Number(newCoursePrice) || 0;
    const newCourseObj: Course = {
      id: `course-${Date.now()}`,
      title: newCourseTitle,
      category: newCourseCategory,
      description: newCourseDescription,
      rating: 5.0,
      students: 0,
      image: newCourseCategory === "Cloud DevOps" 
        ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=300"
        : newCourseCategory === "AI & ML"
        ? "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=300"
        : "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=300",
      lessons: newCourseLessons.map((l, i) => ({ ...l, id: `new-c-${Date.now()}-l-${i}` })),
      missions: [
        { id: `new-c-${Date.now()}-m-1`, title: "Practical Portfolio Submission", reward: "100 Points", task: "Submit a video clip, photograph, or design deck of your draft plan matching this module.", completed: false }
      ],
      quizzes: [
        { question: `What is the most important standard guideline for professional ${newCourseTitle}?`, options: ["Using premium templates", "Consistent daily high-quality hands-on practice", "Hiring expensive camera crews", "Waiting for automated contracts"], answer: 1 }
      ],
      zeroToIncome: true,
      price: priceNum,
      instructorName: userProfile.name,
      instructorAvatar: userProfile.avatar
    };

    onUpdateCourses([newCourseObj, ...courses]);
    
    // Clear Form
    setNewCourseTitle("");
    setNewCoursePrice("0");
    setNewCourseDescription("");
    setNewCourseLessons([{ id: "mod1", title: "Introduction & Tool Setup", duration: "10 mins", completed: false }]);

    // Award immediate creator points/incentive
    onUpdateProfile({
      ...userProfile,
      instructorEarnings: (userProfile.instructorEarnings ?? 0) + 5000 // Bonus for launching a course!
    });

    alert(`🎉 Course Created successfully!\n\nYour course "${newCourseTitle}" has been added to the public catalog for free.`);
    setActiveTab("catalog");
  };

  const handleAddFormLesson = () => {
    if (!newLessonTitle.trim()) return;
    setNewCourseLessons([
      ...newCourseLessons,
      { id: `custom-l-${Date.now()}`, title: newLessonTitle, duration: newLessonDuration, completed: false }
    ]);
    setNewLessonTitle("");
  };

  return (
    <div id="academy-section" className="flex flex-col gap-6">
      {!selectedCourse ? (
        <>
          {/* Custom Modern Header */}
          <div className="bg-slate-950 rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 mb-2 shadow-2xl">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
                                    <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/30">
                  AI Training Space
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mb-3 whitespace-nowrap">
                AI Training <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Space</span>
              </h1>
              <p className="text-sm lg:text-base text-slate-400 leading-relaxed max-w-xl">
                Master the latest artificial intelligence models, tools, and deployment strategies. Train your skills and earn verified AI capabilities for your ESTARR profile.
              </p>
            </div>

                        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto shrink-0">
              {/* Stats Block 1 */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-emerald-500/20 p-2.5 rounded-xl">
                    <Award className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block mb-1">Estarr AI Verified</span>
                  <span className="text-lg font-black text-white leading-tight">Advanced AI Training</span>
                </div>
              </div>

              {/* Stats Block 2 */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-500/20 p-2.5 rounded-xl">
                    <Check className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Free forever</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block mb-1">Active Students</span>
                  <span className="text-2xl font-black text-white">45,000+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Academy Navigation Tabs */}
          <div className="flex border-b border-slate-100 pb-px">
            <button
              id="tab-catalog"
              onClick={() => setActiveTab("catalog")}
              className={`pb-4 px-6 text-sm font-semibold border-b-2 cursor-pointer transition-all ${
                activeTab === "catalog"
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              🎓 Course Catalog ({courses.length})
            </button>
            <button
              id="tab-community-feed"
              onClick={() => setActiveTab("community-feed")}
              className={`pb-4 px-6 text-sm font-semibold border-b-2 cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === "community-feed"
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-500 animate-pulse" />
              🌐 Consultancy Submissions Feed
            </button>
            <button
              id="tab-credentials"
              onClick={() => setActiveTab("credentials")}
              className={`pb-4 px-6 text-sm font-semibold border-b-2 cursor-pointer transition-all ${
                activeTab === "credentials"
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              🎖️ Unlocked Credentials ({userProfile.certifications.length})
            </button>
            <button
              id="tab-instructor-studio"
              onClick={() => setActiveTab("instructor-studio")}
              className={`pb-4 px-6 text-sm font-semibold border-b-2 cursor-pointer transition-all ${
                activeTab === "instructor-studio"
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              💼 Instructor Studio
            </button>
          </div>

          {/* CATALOG VIEW */}
          {activeTab === "catalog" && (
            <div className="flex flex-col gap-6">
              {/* Category Filter Pills */}
              <CategoryTabs
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />

              {/* Zero to Income Highlight */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
                <div className="flex gap-4 items-center">
                  <div className="bg-emerald-600 text-white p-3 rounded-xl shadow-md shadow-emerald-600/10">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-emerald-950 tracking-tight">
                      Zero to Engineer Pathway
                    </h4>
                    <p className="text-xs text-emerald-800/80 mt-0.5 leading-relaxed">
                      Look for the <span className="bg-emerald-100 px-1.5 py-0.5 rounded-full text-emerald-900 font-bold font-mono text-[10px]">⭐ SIGNATURE</span> badge indicating programs designed for immediate marketplace earnings and direct escrow payouts.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-white/80 border border-emerald-100 px-4 py-2 rounded-xl">
                  <span>Guaranteed Gig Match Enabled</span>
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                </div>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCourses.map((course) => {
                  const progress = calculateProgress(course);
                  const isFree = !course.price || course.price === 0;
                  const isUnlocked = isFree || (userProfile.unlockedCourseIds?.includes(course.id) ?? false);

                  return (
                    <div
                      key={course.id}
                      id={`course-card-${course.id}`}
                      className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <div className={`w-full h-full bg-gradient-to-br ${
                          course.category === "AI & ML" ? "from-indigo-600 to-purple-700" :
                          course.category === "Web3" ? "from-emerald-600 to-teal-700" :
                          course.category === "Cloud DevOps" ? "from-blue-600 to-indigo-700" :
                          course.category === "Cybersecurity" ? "from-rose-600 to-red-700" :
                          course.category === "Software Eng." ? "from-slate-700 to-slate-900" :
                          "from-emerald-700 to-emerald-900"
                        } group-hover:scale-105 transition-transform duration-500 flex items-center justify-center`}>
                          <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-lg">
                              {course.category === "AI & ML" && <Sparkles className="w-8 h-8 text-white/80" />}
                              {course.category === "Web3" && <ShieldCheck className="w-8 h-8 text-white/80" />}
                              {course.category === "Cloud DevOps" && <Tv className="w-8 h-8 text-white/80" />}
                              {course.category === "Cybersecurity" && <Lock className="w-8 h-8 text-white/80" />}
                              {course.category === "Software Eng." && <Briefcase className="w-8 h-8 text-white/80" />}
                              {!["AI & ML", "Web3", "Cloud DevOps", "Cybersecurity", "Software Eng."].includes(course.category) && <BookOpen className="w-8 h-8 text-white/80" />}
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-80" />
                        {course.zeroToIncome && (
                          <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide">
                            ⭐ SIGNATURE
                          </span>
                        )}
                        
                        {/* Interactive Price Tag / Unlock status badge */}
                        {isFree ? (
                          <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                            FREE
                          </span>
                        ) : isUnlocked ? (
                          <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" /> UNLOCKED
                          </span>
                        ) : (
                          <span className="absolute top-3 right-3 bg-purple-500 text-slate-900 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                            <Lock className="w-2.5 h-2.5" /> ${course.price?.toLocaleString()}
                          </span>
                        )}

                        <span className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded-xl">
                          {course.category}
                        </span>
                      </div>

                      <div className="p-5 flex-1 flex flex-col gap-3 justify-between">
                        <div>
                          <div className="flex justify-between items-center text-xs text-slate-9000 mb-1.5 font-mono">
                            <span className="flex items-center gap-1 font-medium">
                              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />{" "}
                              {course.lessons.length} Lessons
                            </span>
                            <span className="font-bold text-slate-500">⭐ {course.rating}</span>
                          </div>
                          
                          <h4 className="font-display font-bold text-sm text-slate-800 tracking-tight leading-snug group-hover:text-emerald-600 transition-colors">
                            {course.title}
                          </h4>
                          
                          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                            {course.description}
                          </p>

                          {/* Instructor profile display */}
                          <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-100">
                            <img
                              src={course.instructorAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"}
                              alt={course.instructorName || "Artisan Instructor"}
                              referrerPolicy="no-referrer"
                              className="w-5 h-5 rounded-full object-cover border border-slate-100"
                            />
                            <span className="text-[10px] font-bold text-slate-500 truncate">
                              Teach: {course.instructorName || "Artisan Instructor"}
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100">
                          <div className="flex justify-between text-[10px] text-slate-9000 mb-1 font-mono">
                            <span>Progress</span>
                            <span className="font-bold text-emerald-600">{progress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full transition-all duration-500"
                              style={{ width: `${progress}%` }}
                            />
                          </div>

                          {isUnlocked ? (
                            <button
                              id={`btn-course-enter-${course.id}`}
                              onClick={() => {
                                setSelectedCourse(course);
                                setActiveLesson(course.lessons[0]?.id || null);
                                setQuizAnswers({});
                                setQuizScore(null);
                                setQuizSubmitted(false);
                              }}
                              className="w-full mt-4 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-1"
                            >
                              Enter Classroom &rarr;
                            </button>
                          ) : (
                            <button
                              id={`btn-course-unlock-${course.id}`}
                              onClick={() => setPurchasingCourse(course)}
                              className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-slate-900 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-sm"
                            >
                              <Lock className="w-3.5 h-3.5" /> Unlock for ${course.price?.toLocaleString()}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Creator Reels Section */}
              {creatorAssets.length > 0 && (
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-xl font-black text-slate-900">Creator Reels</h4>
                      <p className="text-xs text-slate-500">Quick lessons and blueprints shared by our community artisans.</p>
                    </div>
                    <div className="flex gap-2">
                       <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">LIVE FEED</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {creatorAssets.map((asset) => (
                      <motion.div 
                        key={asset.id}
                        whileHover={{ y: -5 }}
                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm group cursor-pointer"
                      >
                        <div className="relative aspect-[9/16] bg-slate-900">
                          <img src={asset.thumbnail || asset.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={asset.title} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute top-2 left-2">
                            {asset.type === "video" ? <Video className="w-3 h-3 text-white" /> : asset.type === "slide" ? <FileText className="w-3 h-3 text-white" /> : <ImageIcon className="w-3 h-3 text-white" />}
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <h5 className="text-[10px] font-bold text-white leading-tight line-clamp-2">{asset.title}</h5>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SOCIAL SUBMISSIONS FEED VIEW */}
          {activeTab === "community-feed" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Create Post & Live Submissions Feed */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Submit Tech Update Block */}
                <form
                  onSubmit={handleCreateSocialPost}
                  className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col gap-4"
                >
                  <div className="flex gap-3">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-slate-100"
                    />
                    <div className="flex-1 flex flex-col gap-2">
                      <textarea
                        required
                        rows={2}
                        placeholder="Share a draft, photo, script, or snippet, architecture diagram, or deployment log from your current AI training module..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-emerald-500 transition-colors w-full resize-none"
                      />
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="flex gap-2 items-center">
                          <span className="text-[10px] font-mono text-slate-9000">Tag Class:</span>
                          <select
                            value={newPostCourse}
                            onChange={(e) => setNewPostCourse(e.target.value)}
                            className="bg-white border border-slate-200 text-[10px] font-semibold px-2 py-1 rounded-xl text-slate-500 focus:outline-none cursor-pointer"
                          >
                            {courses.map((c) => (
                              <option key={c.id} value={c.title}>
                                {c.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          type="submit"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Publish Consultancy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Feed Posts */}
                <div className="flex flex-col gap-5">
                  {socialPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4"
                    >
                      {/* Post Header */}
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <img
                            src={post.authorAvatar}
                            alt={post.authorName}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border border-slate-100"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-xs text-slate-800">
                                {post.authorName}
                              </h4>
                              {post.verifiedWork && (
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                  <UserCheck className="w-2.5 h-2.5" /> Consultancy Approved
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-9000 font-mono mt-0.5">
                              {post.authorRole} • {post.time}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-500 px-3 py-1 rounded-xl">
                          🎓 {post.courseTitle}
                        </span>
                      </div>

                      {/* Post Body */}
                      <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line">
                        {post.content}
                      </p>

                      {post.image && (
                        <div className="rounded-xl overflow-hidden max-h-60 bg-slate-900 border border-slate-100">
                          <img
                            src={post.image}
                            alt="Consultancy snapshot"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Post Interactions */}
                      <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-slate-9000 text-xs">
                        <button
                          onClick={() => handleLikePost(post.id)}
                          className={`flex items-center gap-1 cursor-pointer transition-colors ${
                            post.hasLiked ? "text-red-500 font-bold" : "hover:text-slate-700"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${post.hasLiked ? "fill-red-500" : ""}`} />
                          <span>{post.likes} Hearts</span>
                        </button>
                        <span className="font-mono text-[11px] text-slate-9000 flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" /> {post.comments.length} Comments
                        </span>
                      </div>

                      {/* Post Comments Section */}
                      {post.comments.length > 0 && (
                        <div className="bg-slate-50/50 rounded-xl p-4 flex flex-col gap-3">
                          {post.comments.map((comm, cidx) => (
                            <div key={cidx} className="text-xs flex gap-2">
                              <span className="font-bold text-slate-800 shrink-0">{comm.author}:</span>
                              <div className="flex-1">
                                <span className="text-slate-500">{comm.content}</span>
                                <span className="block text-[9px] text-slate-9000 mt-0.5 font-mono">
                                  {comm.time}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Comment Input */}
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Write a helpful peer critique..."
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleAddComment(post.id);
                          }}
                          className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:bg-white focus:border-emerald-500 transition-colors flex-1"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white p-2 rounded-xl cursor-pointer transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Leaderboard / Statistics */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Developer Standing Card */}
                <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white rounded-3xl p-6 shadow-md shadow-emerald-950/10 flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold font-mono tracking-wide text-emerald-300 uppercase">
                      My Developer Rank
                    </span>
                    <span className="bg-emerald-800 text-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      #14 Lagos District
                    </span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-emerald-800"
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm tracking-tight">
                        {userProfile.name}
                      </h4>
                      <p className="text-xs text-emerald-200 font-mono mt-0.5">
                        {userProfile.profession}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-emerald-900/40 p-4 rounded-xl border border-emerald-800/30">
                    <div>
                      <span className="block text-[10px] text-emerald-300 font-mono uppercase">
                        Escrow Recommends
                      </span>
                      <span className="text-lg font-bold font-mono">
                        {userProfile.recommends} Verified
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-emerald-300 font-mono uppercase">
                        Active Courses
                      </span>
                      <span className="text-lg font-bold font-mono">4 Enrolled</span>
                    </div>
                  </div>
                </div>

                {/* Dynamic Income Mapping Guide */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
                  <h4 className="font-bold text-xs text-slate-800 tracking-tight flex items-center gap-1 font-mono uppercase">
                    <Briefcase className="w-4 h-4 text-emerald-600" /> Active Gig Multipliers
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Complete these classes to unlock direct application slots to the high-paying gigs locked in ESTARR escrow.
                  </p>

                  <div className="flex flex-col gap-3">
                    {Object.entries(courseGigMapping).map(([course, gig]) => (
                      <div key={course} className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-700 leading-tight">{course}</span>
                          <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold font-mono shrink-0">
                            {gig.budget}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-9000 italic">Unlocks: {gig.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CREDENTIALS VIEW */}
          {activeTab === "credentials" && (
            <div className="flex flex-col gap-6">
              <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-white flex items-center gap-2">
                      <Award className="w-6 h-6 text-emerald-400" /> AI & Engineering Credentials Wallet
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 max-w-lg">
                      Your immutable proof of technical competency. Share these verified AI credentials on your profile to unlock premium enterprise tech roles instantly.
                    </p>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shrink-0 flex items-center gap-4">
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">Total Earned</span>
                      <span className="text-xl font-black text-white">{userProfile.certifications.length}</span>
                    </div>
                    <div className="h-8 w-px bg-slate-800" />
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">Est. Market Value</span>
                      <span className="text-xl font-black text-emerald-400">${(userProfile.certifications.length * 1500).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProfile.certifications.length > 0 ? (
                  userProfile.certifications?.map((cert, idx) => (
                    <div
                      key={idx}
                      className="group bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between h-64 transition-all"
                    >
                      {/* Watermark badge design */}
                      <div className="absolute -top-10 -right-10 text-emerald-500/5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                        <Award className="w-48 h-48" />
                      </div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-mono font-bold tracking-widest uppercase">
                            Verified AI Credential
                          </span>
                          <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner">
                            <Award className="w-4 h-4 text-emerald-400" />
                          </div>
                        </div>

                        <h4 className="font-black text-lg text-white tracking-tight leading-snug line-clamp-2">
                          {cert}
                        </h4>
                        <div className="mt-4 flex flex-col gap-1">
                          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Verification Hash</span>
                          <p className="text-[10px] text-slate-400 font-mono bg-slate-900 p-2 rounded-lg border border-slate-800">
                            EST-{Math.random().toString(36).substring(2, 10).toUpperCase()}-{(7000 + idx * 123).toString(16).toUpperCase()}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800 flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                          <UserCheck className="w-4 h-4" />
                          <span>Verified Node</span>
                        </div>
                        <button
                          onClick={() => alert(`Sharing credential serial with your ESTARR network!`)}
                          className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-800"
                        >
                          <Share2 className="w-3 h-3" /> Share
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full bg-slate-950 rounded-3xl p-12 text-center border border-dashed border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
                    <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                      <Award className="w-10 h-10 text-slate-700" />
                    </div>
                    <h4 className="font-black text-lg text-white mb-2">No Professional Licenses Unlocked Yet</h4>
                    <p className="text-sm text-slate-400 max-w-md mx-auto">
                      Enter any course classroom, perfect the Competency Evaluation, and pass the hands-on consultancy to earn your license!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ARTISAN INSTRUCTOR STUDIO VIEW */}
          {activeTab === "instructor-studio" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              {/* Instructor Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col justify-between border border-slate-800 shadow-sm">
                  <span className="text-[10px] text-slate-9000 font-mono block uppercase">Total Cash Earned</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-amber-400">${(userProfile.instructorEarnings ?? 0).toLocaleString()}</span>
                  </div>
                  <span className="text-[9px] text-emerald-400 mt-2 block font-medium">✓ Settled & withdrawable</span>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
                  <span className="text-[10px] text-slate-9000 font-mono block uppercase">Active Students</span>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-slate-800">412</span>
                    <span className="text-xs text-slate-500 font-medium ml-1">enrolled</span>
                  </div>
                  <span className="text-[9px] text-slate-9000 mt-2 block font-medium">+14% this week</span>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
                  <span className="text-[10px] text-slate-9000 font-mono block uppercase">Video Views</span>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-slate-800">1,840</span>
                    <span className="text-xs text-slate-500 font-medium ml-1">minutes</span>
                  </div>
                  <span className="text-[9px] text-emerald-600 mt-2 block font-medium">$1.50 earned per view-min</span>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
                  <span className="text-[10px] text-slate-9000 font-mono block uppercase">Tip Payouts</span>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-slate-800">$18,400</span>
                    <span className="text-xs text-slate-500 font-medium ml-1">received</span>
                  </div>
                  <span className="text-[9px] text-purple-700 mt-2 block font-medium">28 peer recommendations</span>
                </div>
              </div>

              {/* Enhanced Instructor Studio Component */}
              <CreatorStudio 
                userProfile={userProfile}
                courses={courses}
                onUpdateCourses={onUpdateCourses}
              />
            </div>
          )}
        </>
      ) : (
        /* CLASSROOM WORKSPACE ACTIVE VIEW */
        <div id="classroom-view" className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-950 p-4 rounded-3xl border border-slate-900 shadow-2xl">
          {/* Classroom Side Navigation Panel */}
          <div className="lg:col-span-4 lg:order-last bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col gap-6 text-white">
            <button
              id="btn-classroom-back"
              onClick={() => setSelectedCourse(null)}
              className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              &larr; Back to AI Training Catalog
            </button>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                {selectedCourse.category} Class
              </span>
              <h3 className="font-display font-bold text-base text-slate-800 mt-2.5 leading-snug">
                {selectedCourse.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {selectedCourse.description}
              </p>
            </div>

            {/* Course Progress Dashboard */}
            <div>
              <div className="flex justify-between text-[11px] font-mono text-slate-9000 mb-1">
                <span>Class Syllabus Complete</span>
                <span className="font-bold text-emerald-600">{calculateProgress(selectedCourse)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${calculateProgress(selectedCourse)}%` }}
                />
              </div>
            </div>

            {/* Modules Navigation list */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-slate-9000">
                Syllabus Modules
              </span>
              <div className="flex flex-col gap-1.5">
                {selectedCourse.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    id={`btn-syllabus-lesson-${lesson.id}`}
                    onClick={() => setActiveLesson(lesson.id)}
                    className={`flex items-center justify-between p-3 rounded-xl text-left text-xs transition-all cursor-pointer ${
                      activeLesson === lesson.id
                        ? "bg-slate-900 text-white"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="flex gap-2 items-center">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonComplete(selectedCourse.id, lesson.id);
                        }}
                        className="cursor-pointer shrink-0"
                      >
                        <CheckCircle
                          className={`w-4 h-4 ${lesson.completed ? "text-emerald-500 fill-emerald-500" : "text-slate-300"}`}
                        />
                      </span>
                      <span className="font-medium line-clamp-1">
                        {lesson.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono opacity-65 shrink-0 ml-1">
                      {lesson.duration}
                    </span>
                  </button>
                ))}
              </div>

              {/* Assessments Trigger buttons */}
              <div className="border-t border-slate-100 pt-4 mt-2 flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-slate-9000">
                  Assessments
                </span>

                <button
                  id="btn-syllabus-quiz"
                  onClick={() => setActiveLesson("quiz")}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    activeLesson === "quiz"
                      ? "bg-slate-900 text-white animate-none"
                      : "hover:bg-slate-50 text-slate-700 border border-dashed border-slate-200"
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>CBT Competency Quiz</span>
                  </div>
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-mono uppercase font-bold shrink-0">
                    {quizSubmitted && quizScore === selectedCourse.quizzes.length ? "Passed ✓" : "Unlock Credential"}
                  </span>
                </button>

                {calculateProgress(selectedCourse) === 100 && quizSubmitted && quizScore === selectedCourse.quizzes.length && !userProfile.certifications.includes(selectedCourse.title) && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => claimAICredential(selectedCourse)}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
                  >
                    <Award className="w-4 h-4" />
                    Claim AI Credential
                  </motion.button>
                )}
              </div>

              {/* Instructor Tip Box */}
              <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                    <img src={selectedCourse.instructorAvatar} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-[10px] font-black text-slate-900">{selectedCourse.instructorName}</p>
                      <p className="text-[9px] text-slate-400">Course Creator</p>
                    </div>
                </div>
                <button 
                  onClick={() => handleTipCreator(selectedCourse.instructorName || "")}
                  disabled={isTipping}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-300 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-700 transition-all disabled:opacity-50"
                >
                  {isTipping ? (
                    <div className="w-3 h-3 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
                  ) : (
                    <Coffee className="w-3 h-3 text-amber-600" />
                  )}
                  {isTipping ? "Sending..." : "Tip Artisan $500"}
                </button>
              </div>
            </div>
          </div>

          {/* Classroom Right Panel: Video / Quiz / Studio submissions */}
          <div className="lg:col-span-8 lg:order-first flex flex-col gap-6">
            {activeLesson === "quiz" ? (
              /* COMPREHENSIVE QUIZ SECTION */
              <div
                id="classroom-quiz-pane"
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col gap-6"
              >
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    CBT Classroom Competency Quiz
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Score a flawless 100% on the theoretical evaluation to instantly earn and showcase your official AI credential on ESTARR!
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  {selectedCourse.quizzes.map((quiz, qIdx) => (
                    <div
                      key={qIdx}
                      className="border border-slate-700 rounded-xl p-5 bg-slate-800 flex flex-col gap-3"
                    >
                      <h4 className="font-bold text-xs text-white leading-snug">
                        {qIdx + 1}. {quiz.question}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {quiz.options.map((option, oIdx) => (
                          <button
                            key={oIdx}
                            disabled={quizSubmitted && quizScore === selectedCourse.quizzes.length}
                            onClick={() =>
                              setQuizAnswers({ ...quizAnswers, [qIdx]: oIdx })
                            }
                            className={`p-3 rounded-xl text-xs text-left border font-medium transition-all cursor-pointer ${
                              quizAnswers[qIdx] === oIdx
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                                : "bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quiz feedback */}
                {quizSubmitted && (
                  <div className={`p-4 rounded-xl text-xs leading-relaxed font-semibold ${
                    quizScore === selectedCourse.quizzes.length
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                      : "bg-red-50 text-red-800 border border-red-100"
                  }`}>
                    {quizScore === selectedCourse.quizzes.length ? (
                      <div className="flex gap-2 items-center">
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Flawless 100% Score! Your technical competency license has been added to the "Unlocked Credentials" dashboard. Awesome work!</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <span>You scored {quizScore}/{selectedCourse.quizzes.length} correct answers.</span>
                        <span className="font-normal text-slate-500">Please review the syllabus video modules and try again! All answers must be correct to satisfy AI training requirements.</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono">
                    Passing score: 100% correct answers required.
                  </span>
                  <div className="flex gap-2">
                    {quizSubmitted && quizScore !== selectedCourse.quizzes.length && (
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setQuizAnswers({});
                          setQuizScore(null);
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                      >
                        Retake Test
                      </button>
                    )}
                    <button
                      id="btn-quiz-submit"
                      disabled={quizSubmitted && quizScore === selectedCourse.quizzes.length}
                      onClick={() => handleQuizSubmit(selectedCourse)}
                      className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                    >
                      Submit Quiz answers
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* REGULAR LESSONS WORKSPACE */
              (() => {
                const lessonObj = selectedCourse.lessons.find((l) => l.id === activeLesson);
                if (!lessonObj) {
                  return (
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center text-slate-400 text-xs">
                      Please select a module in the syllabus to begin learning.
                    </div>
                  );
                }

                return (
                  <div className="flex flex-col gap-6">
                    {/* Real Video Player integration for Classroom */}
                    <div
                      id="classroom-video-player"
                      className="bg-slate-950 rounded-3xl overflow-hidden aspect-video relative flex flex-col items-center justify-center text-white border border-slate-900 shadow-md group"
                    >
                      <EnhancedVideoPlayer
                        videoUrl={lessonObj.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                        poster={selectedCourse.image}
                        className="w-full h-full"
                        autoPlay={true}
                        isMutedDefault={false}
                      />
                    </div>

                    {/* Lesson Study Companion notes */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                          <Tv className="w-4 h-4 text-emerald-500" /> Lesson Takeaways & Outline
                        </h3>
                        <button
                          id="btn-lesson-complete-toggle"
                          onClick={() => toggleLessonComplete(selectedCourse.id, lessonObj.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                            lessonObj.completed
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                          }`}
                        >
                          {lessonObj.completed ? "✓ Complete" : "Mark Complete"}
                        </button>
                      </div>

                      <div className="text-xs text-slate-400 leading-relaxed space-y-3 pt-1">
                        <p>
                          This lecture module covers the essential strategic concepts of <strong className="text-slate-200">{selectedCourse.title}</strong>, detailing practical approaches that can be deployed right inside your business or digital channels in Africa.
                        </p>
                        <p className="bg-slate-800 border-l-2 border-emerald-500 p-3 rounded-r-xl italic font-medium text-slate-300">
                          "Hands-on execution is our core learning philosophy. Watch the short tutorial video, draft your plan, submit your challenge below to let the AI Grader evaluate, and get matching tech gigs immediately!"
                        </p>
                      </div>
                    </div>

                    {/* Interactive Practical Challenge Submission Workspace */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          HANDS-ON LAB CHALLENGE
                        </span>
                        <h3 className="font-display font-bold text-lg text-white mt-3">
                          Course Practical Missions
                        </h3>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                          Do the actual task described below, submit your written draft or consultancy url, and get instant verified grading with bonus point payouts.
                        </p>
                      </div>

                      <div className="flex flex-col gap-4 mt-2">
                        {selectedCourse.missions.map((mission) => (
                          <div
                            key={mission.id}
                            className="border border-slate-800 rounded-xl p-5 bg-slate-950/50 flex flex-col gap-4"
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                              <div className="flex-1">
                                <h4 className="font-bold text-sm text-white">
                                  Challenge: {mission.title}
                                </h4>
                                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                                  Task: <span className="font-medium text-slate-300">{mission.task}</span>
                                </p>
                              </div>
                              <span className="text-[10px] bg-slate-800 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-xl font-mono shrink-0 uppercase">
                                Reward: {mission.reward}
                              </span>
                            </div>

                            {/* SUBMISSION FORM */}
                            <div className="pt-4 border-t border-slate-800 mt-2">
                              {mission.completed ? (
                                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                                  <div className="flex gap-2 items-center text-xs text-emerald-400 font-bold">
                                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Mission Submitted & Passed Verified Peer Review!</span>
                                  </div>
                                  <button
                                    onClick={() => alert("Consultancy is locked for edit once reviewed and approved!")}
                                    className="text-[10px] text-slate-400 font-mono hover:text-white uppercase tracking-wider underline underline-offset-4"
                                  >
                                    View Submission
                                  </button>
                                </div>
                              ) : (
                                <form
                                  onSubmit={(e) => handleConsultancySubmit(selectedCourse.id, mission.id, e)}
                                  className="flex flex-col gap-4"
                                >
                                  <textarea
                                    required
                                    rows={3}
                                    placeholder="Type your outline notes, write your video script draft, or paste a Google Drive/Canva design link..."
                                    value={missionSubmissions[mission.id] || ""}
                                    onChange={(e) =>
                                      setMissionSubmissions({
                                        ...missionSubmissions,
                                        [mission.id]: e.target.value,
                                      })
                                    }
                                    className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 focus:outline-none focus:bg-slate-800 focus:border-emerald-500 transition-colors w-full resize-none placeholder:text-slate-600"
                                  />
                                  
                                  {isGrading && (
                                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                                      <span>ESTARR AI Grader is evaluating your consultancy layout...</span>
                                    </div>
                                  )}

                                  {aiGraderScore !== null && (
                                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex flex-col gap-3 mt-2">
                                      <div className="flex justify-between items-center text-xs font-bold text-emerald-400">
                                        <span className="uppercase tracking-widest">AI Peer Evaluation Complete</span>
                                        <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono px-2 py-0.5 rounded-full text-[10px]">
                                          {aiGraderScore}/100 Grade
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-emerald-300/80 leading-relaxed italic">
                                        {aiFeedbackText}
                                      </p>
                                    </div>
                                  )}

                                  <div className="flex justify-end">
                                    <button
                                      type="submit"
                                      disabled={isGrading}
                                      className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs px-6 py-3 rounded-xl cursor-pointer transition-colors uppercase tracking-widest"
                                    >
                                      Submit Work & Get AI Review
                                    </button>
                                  </div>
                                </form>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Integrated AI Mentor Box */}
                    <div
                      id="classroom-ai-mentor"
                      className="bg-slate-900 border border-emerald-500/20 rounded-3xl p-6 lg:p-8 flex flex-col sm:flex-row items-start gap-6 shadow-sm"
                    >
                      <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-2xl shrink-0">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                        <h4 className="font-bold text-lg text-white">
                          ESTARR AI Tutor
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                          Stuck on draft writing or need visual design inspiration? Ask your AI Tutor to explain this lesson in plain English, write templates, or answer questions.
                        </p>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <button
                            id="btn-ai-explain"
                            onClick={() =>
                              onOpenAiChat(
                                `Explain the practical concepts behind the tech module "${lessonObj.title}" in simple words. Provide 3 actionable tips for starting out.`,
                                "academy"
                              )
                            }
                            className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2"
                          >
                            <span>💡</span> Explain this Lesson
                          </button>
                          <button
                            id="btn-ai-mission"
                            onClick={() =>
                              onOpenAiChat(
                                `Help me draft a robust layout plan for the ESTARR tech mission. Give me a clear structure, checklist of details, and high-converting model example.`,
                                "academy"
                              )
                            }
                            className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2"
                          >
                            <span>🛠️</span> Draft Outline Guide
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>
      )}

      {/* Premium Skill Unlock Dialog Overlay Modal */}
      {purchasingCourse && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl flex flex-col gap-6 animate-scale-in">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-purple-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full font-bold uppercase">
                  Premium Skill Unlock
                </span>
                <h3 className="font-display font-bold text-base text-slate-900 mt-3 leading-tight">
                  Unlock Artisan Class
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPurchasingCourse(null)}
                className="text-slate-9000 hover:text-slate-500 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Course Summary */}
            <div className="flex gap-4 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <div className={`w-16 h-16 rounded-xl shrink-0 border border-slate-200 flex items-center justify-center bg-gradient-to-br ${
                purchasingCourse.category === "AI & ML" ? "from-indigo-600 to-purple-700" :
                purchasingCourse.category === "Web3" ? "from-amber-500 to-orange-600" :
                purchasingCourse.category === "Cloud DevOps" ? "from-cyan-600 to-blue-700" :
                purchasingCourse.category === "Cybersecurity" ? "from-rose-600 to-red-700" :
                "from-slate-700 to-slate-800"
              }`}>
                {purchasingCourse.category === "AI & ML" && <Sparkles className="w-6 h-6 text-white/80" />}
                {purchasingCourse.category === "Web3" && <ShieldCheck className="w-6 h-6 text-white/80" />}
                {purchasingCourse.category === "Cloud DevOps" && <Tv className="w-6 h-6 text-white/80" />}
                {purchasingCourse.category === "Cybersecurity" && <Lock className="w-6 h-6 text-white/80" />}
                {!["AI & ML", "Web3", "Cloud DevOps", "Cybersecurity"].includes(purchasingCourse.category) && <BookOpen className="w-6 h-6 text-white/80" />}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-mono font-bold text-emerald-600 uppercase block">{purchasingCourse.category}</span>
                <span className="font-bold text-xs text-slate-800 block truncate mt-0.5">{purchasingCourse.title}</span>
                <div className="flex items-center gap-1.5 mt-2">
                  <img
                    src={purchasingCourse.instructorAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"}
                    alt={purchasingCourse.instructorName}
                    className="w-4 h-4 rounded-full object-cover border"
                  />
                  <span className="text-[9px] font-bold text-slate-500 truncate">Instructor: {purchasingCourse.instructorName}</span>
                </div>
              </div>
            </div>

            {/* Price detail */}
            <div className="flex justify-between items-baseline border-b border-dashed border-slate-100 pb-4">
              <span className="text-xs text-slate-500 font-medium">Class Unlock Cost:</span>
              <span className="text-xl font-black text-slate-900 font-mono">${purchasingCourse.price?.toLocaleString()}</span>
            </div>

            {/* Wallet summary */}
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Your Wallet Balance:</span>
              <span className={`font-mono font-bold ${(userProfile.walletBalance ?? 0) >= (purchasingCourse.price ?? 0) ? "text-emerald-600" : "text-rose-600"}`}>
                ${(userProfile.walletBalance ?? 0).toLocaleString()}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 mt-2">
              <button
                type="button"
                onClick={() => handlePurchaseCourse(purchasingCourse)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Confirm Secure Purchase
              </button>
              
              <button
                type="button"
                onClick={() => setPurchasingCourse(null)}
                className="w-full bg-slate-100 hover:bg-slate-100 text-slate-500 font-bold py-2.5 rounded-xl text-xs uppercase cursor-pointer transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
