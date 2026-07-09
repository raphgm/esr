import React, { useState, useRef } from "react";
import { VettingProtocolModal } from './components/VettingProtocolModal';

import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { UserProfile, Course, Product, BrandCampaign, ProjectTask, Job, ActivityPost, CommunityChannel } from "./types";
import {
  initialProfile,
  initialPosts,
  initialCourses,
  initialProducts,
  initialCampaigns,
  initialJobs,
  initialChannels
} from "./mockData";
import { auth, getUserProfile, saveUserProfile, getCollectionData, saveCollectionItem, deleteCollectionItem } from "./lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, GithubAuthProvider, signInWithCredential, signInWithCustomToken } from "firebase/auth";

// Components
import ConnectSection from "./components/ConnectSection";
import AcademySection from "./components/AcademySection";
import PortfolioSection from "./components/PortfolioSection";
import MarketplaceSection from "./components/MarketplaceSection";
import ProjectsSection from "./components/ProjectsSection";
import GigsSection from "./components/GigsSection";
import PaymentsSection from "./components/PaymentsSection";
import EventsSection from "./components/EventsSection";
import CommunitySection from "./components/CommunitySection";
import CompanionAppDownload from "./components/CompanionAppDownload";
import ChatDrawer from "./components/ChatDrawer";
import { ServicesCarousel } from "./components/ServicesCarousel";
import { HomeMarketing } from "./components/HomeMarketing";
import { AboutSection } from "./components/AboutSection";
import { TeamsSection } from "./components/TeamsSection";
import { JobsSection } from "./components/JobsSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { RewardsSection } from "./components/RewardsSection";
import { NotificationsDrawer } from "./components/NotificationsDrawer";
import { BackgroundDoodles } from "./components/BackgroundDoodles";
import { AdminSection } from "./components/AdminSection";

// Icons
import {
  Home,
  Sparkles,
  Bell,
  Gift,
  Users,
  Award,
  ShoppingCart,
  Laptop,
  Compass,
  Layers,
  Heart,
  Smartphone,
  ShieldCheck,
  ShieldAlert,
  User,
  Settings,
  Lock,
  Mail,
  Menu,
  X,
  FileText,
  CheckSquare,
  CreditCard,
  Calendar,
  LineChart,
  Building,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Star,
  Clock,
  FastForward, Share2, CheckCircle2,
  Briefcase,
  Plus,
  Linkedin,
  Github,
  HelpCircle,
  LogOut,
  Globe} from "lucide-react";

const initialTasks: ProjectTask[] = [];

const homeDemoTasks: ProjectTask[] = [
  { id: "t1", title: "Distributed System Migration", desc: "$250,000 || Enterprise Corp || Architect and deploy a scalable microservices infrastructure with high availability.", status: "inprogress", priority: "High", assignee: "Enterprise Corp", dueDate: "2026-07-12", category: "infrastructure" },
  { id: "t2", title: "AI Agent Orchestration Pipeline", desc: "$180,000 || FinTech Next || Develop and integrate a fleet of autonomous agents for predictive financial modeling.", status: "todo", priority: "Medium", assignee: "FinTech Next", dueDate: "2026-07-15", category: "ai_ml" },
  { id: "t3", title: "Cloud Native Security Audit", desc: "$120,000 || SecureCloud Tech || Perform comprehensive security audit and implement zero-trust architecture for enterprise cloud.", status: "review", priority: "High", assignee: "SecureCloud Tech", dueDate: "2026-07-09", category: "security" }
];

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  NGN: "₦",
  KES: "KSh ",
  INR: "₹",
};

const currencyRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  NGN: 1500,
  KES: 130,
  INR: 83,
};

const translations = {
  EN: {
    heroTitle: "ESTARR",
    heroSubtitle: "Empowering Creators & Pros",
    activeEscrow: "Enterprise Smart Contracts",
    secure: "Secure",
    allInOne: "All-in-one digital ecosystem",
    askAi: "ASK AI CO-PILOT",
    intelligence: "ESTARR Intelligence",
    configureProfile: "Configure Profile",
    noActiveProjects: "No active projects",
    seedDemo: "Seed Demo Contracts",
    createFirst: "Create First Project"
  },
  ES: {
    heroTitle: "ESTARR",
    heroSubtitle: "Empoderando a Creadores y Pros",
    activeEscrow: "Canal de Escrow Activo",
    secure: "Seguro",
    allInOne: "Ecosistema digital todo en uno",
    askAi: "PREGUNTAR AL CO-PILOTO IA",
    intelligence: "Inteligencia ESTARR",
    configureProfile: "Configurar Perfil",
    noActiveProjects: "Sin proyectos activos",
    seedDemo: "Sembrar Contratos de Demostración",
    createFirst: "Crear Primer Proyecto"
  },
  FR: {
    heroTitle: "ESTARR",
    heroSubtitle: "Autonomiser les Créateurs & Pros",
    activeEscrow: "Pipeline d'Escrow Actif",
    secure: "Sécurisé",
    allInOne: "Écosystème numérique tout-en-un",
    askAi: "DEMANDER AU CO-PILOTE IA",
    intelligence: "Intelligence ESTARR",
    configureProfile: "Configurer le Profil",
    noActiveProjects: "Aucun projet actif",
    seedDemo: "Générer les Contrats Démo",
    createFirst: "Créer le Premier Projet"
  },
  SW: {
    heroTitle: "ESTARR",
    heroSubtitle: "Kuwezesha Wabunifu na Wataalamu",
    activeEscrow: "Mfumo Amilifu wa Escrow",
    secure: "Salama",
    allInOne: "Ekolojia ya kidijitali ya yote kwa moja",
    askAi: "ULIZA MSAIDIZI WA AI",
    intelligence: "Akili ya ESTARR",
    configureProfile: "Sanidi Wasifu",
    noActiveProjects: "Hakuna miradi amilifu",
    seedDemo: "Weka Mikataba ya Demo",
    createFirst: "Unda Mradi wa Kwanza"
  },
  HI: {
    heroTitle: "ESTARR",
    heroSubtitle: "क्रिएटर्स और प्रोफेशनल्स को सशक्त बनाना",
    activeEscrow: "सक्रिय एस्क्रो पाइपलाइन",
    secure: "सुरक्षित",
    allInOne: "ऑल-इन-वन डिजिटल इकोसिस्टम",
    askAi: "एआई को-पायलट से पूछें",
    intelligence: "ESTARR इंटेलिजेंस",
    configureProfile: "प्रोफ़ाइल कॉन्फ़िगर करें",
    noActiveProjects: "कोई सक्रिय परियोजना नहीं",
    seedDemo: "डेमो अनुबंध लोड करें",
    createFirst: "पहली परियोजना बनाएं"
  }
};

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showVettingModal, setShowVettingModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authEmail, setAuthEmail] = useState("chinedu@estarrapp.com");
  const [authPassword, setAuthPassword] = useState("password123");
  const [authName, setAuthName] = useState("Chinedu Okafor");
  const [authBirthdate, setAuthBirthdate] = useState("");
  const [authAccountType, setAuthAccountType] = useState<"freelancer" | "jobOwner" | "creator" | "academyLearner">("freelancer");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [applyingAs, setApplyingAs] = useState("Developer");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  // Global Settings States
  const [globalCurrency, setGlobalCurrency] = useState<"USD" | "EUR" | "GBP" | "NGN" | "KES" | "INR">("USD");
  const [globalLanguage, setGlobalLanguage] = useState<"EN" | "ES" | "FR" | "SW" | "HI">("EN");
  const [isGlobalDropdownOpen, setIsGlobalDropdownOpen] = useState(false);

  const formatCurrency = (val: string | number) => {
    let num = 150000;
    if (typeof val === "number") {
      num = val;
    } else {
      const clean = val.replace(/[^0-9]/g, "");
      num = parseInt(clean, 10) || 150000;
    }
    const converted = Math.round(num * currencyRates[globalCurrency]);
    return currencySymbols[globalCurrency] + converted.toLocaleString();
  };

  // Hiring Wizard State (Toptal style onboarding for Owners/jobOwners)
  const [hireWizardStep, setHireWizardStep] = useState<number>(1);
  const [selectedRoleType, setSelectedRoleType] = useState<string>("");
  const [showHireTooltip, setShowHireTooltip] = useState(false);

  React.useEffect(() => {
    setAuthError(null);
    // Reset wizard on modal open or auth mode change
    if (showAuthModal) {
      setHireWizardStep(1);
      setSelectedRoleType("");
    }
  }, [showAuthModal, authMode]);

  // Router State
  const [activeTab, setActiveTab] = useState<
    "home" | "connect" | "academy" | "marketplace" | "projects" | "gigs" | "community" | "mobile" | "teams" | "careers" | "about" | "how-it-works" | "payments" | "events" | "admin" | "portfolio"
  >("home");

  const heroVideoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (activeTab === "home" && heroVideoRef.current) {
      const video = heroVideoRef.current;
      video.muted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Autoplay was prevented or video failed to load, retrying on interaction...", error);
        });
      }
    }
  }, [activeTab]);
  const [connectSubTab, setConnectSubTab] = useState<"feed" | "directory" | "mentorship" | "companion">("feed");

  const [collapsedNavSections, setCollapsedNavSections] = useState<Record<string, boolean>>({
    "Core Hub & Insights": false,
    "Escrow & Professional Trade": false,
    "Network & Social": false,
    "Fintech & App Utilities": false,
    "Admin Controls": false,
  });

  const [sidebarTheme, setSidebarTheme] = useState<"white" | "ivory" | "slate" | "indigo">("ivory");

  const sidebarStyles = {
    white: {
      navClass: "bg-white border border-slate-200 text-slate-800",
      borderClass: "border-slate-150",
      sectionHeaderClass: "text-slate-500",
      inactiveItemClass: "text-slate-700 hover:bg-slate-50 border-transparent hover:text-slate-900",
      activeItemClass: "bg-purple-600 border-purple-600 text-white font-bold shadow-xs shadow-purple-500/20 translate-x-0.5",
      descClass: "text-slate-500",
      activeDescClass: "text-purple-100"
    },
    ivory: {
      navClass: "bg-[#FAF9F5] border-2 border-[#E9E3D5] text-slate-900",
      borderClass: "border-[#EFECE6]",
      sectionHeaderClass: "text-slate-600",
      inactiveItemClass: "text-slate-700 hover:bg-[#F2ECE0]/60 border-transparent hover:text-slate-950",
      activeItemClass: "bg-purple-700 border-purple-700 text-white font-bold shadow-md shadow-purple-750/20 translate-x-0.5",
      descClass: "text-slate-500",
      activeDescClass: "text-purple-100"
    },
    slate: {
      navClass: "bg-slate-950 border-2 border-slate-850 text-slate-100",
      borderClass: "border-slate-850/80",
      sectionHeaderClass: "text-slate-400",
      inactiveItemClass: "text-slate-300 hover:bg-slate-900 border-transparent hover:text-white",
      activeItemClass: "bg-purple-600 border-purple-600 text-white font-bold shadow-xs shadow-purple-500/30 translate-x-0.5",
      descClass: "text-slate-500",
      activeDescClass: "text-purple-100"
    },
    indigo: {
      navClass: "bg-indigo-950 border-2 border-indigo-900 text-indigo-50",
      borderClass: "border-indigo-900/80",
      sectionHeaderClass: "text-indigo-300",
      inactiveItemClass: "text-indigo-200 hover:bg-indigo-900 border-transparent hover:text-white",
      activeItemClass: "bg-indigo-600 border-indigo-600 text-white font-bold shadow-xs shadow-indigo-500/30 translate-x-0.5",
      descClass: "text-indigo-400",
      activeDescClass: "text-indigo-200"
    }
  };

  const toggleNavSection = (sectionName: string) => {
    setCollapsedNavSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Core App states
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
  const [posts, setPosts] = useState<ActivityPost[]>(initialPosts);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [campaigns, setCampaigns] = useState<BrandCampaign[]>(initialCampaigns);
  const [tasks, setTasks] = useState<ProjectTask[]>(initialTasks);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [channels, setChannels] = useState<CommunityChannel[]>(initialChannels);

  // LinkedIn OAuth
  const handleLinkedInLogin = async () => {
    try {
      setIsAuthLoading(true);
      const response = await fetch("/api/auth/linkedin/url");
      const { url } = await response.json();
      
      const width = 600;
      const height = 700;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      const authWindow = window.open(
        url,
        "linkedin_auth",
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!authWindow) {
        alert("Please allow popups for LinkedIn login.");
        setIsAuthLoading(false);
      }
    } catch (err) {
      console.error("LinkedIn login fetch error:", err);
      setIsAuthLoading(false);
    }
  };

  // GitHub OAuth
  const handleGithubLogin = async () => {
    try {
      setIsAuthLoading(true);
      const response = await fetch("/api/auth/github/url");
      const { url } = await response.json();
      
      const width = 600;
      const height = 700;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      const authWindow = window.open(
        url,
        "github_auth",
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!authWindow) {
        alert("Please allow popups for GitHub login.");
        setIsAuthLoading(false);
      }
    } catch (err) {
      console.error("GitHub login fetch error:", err);
      setIsAuthLoading(false);
    }
  };

  React.useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data?.type === "OAUTH_AUTH_SUCCESS") {
        const { provider, token, customToken } = event.data;

        try {
          if (provider === "github" && token) {
            // Establishes a real Firebase Auth session from the GitHub access token.
            // Requires GitHub to be enabled as a Sign-in provider in the Firebase console.
            const credential = GithubAuthProvider.credential(token);
            await signInWithCredential(auth, credential);
          } else if (provider === "linkedin" && customToken) {
            // Firebase has no native LinkedIn provider, so the server mints a custom token.
            await signInWithCustomToken(auth, customToken);
          } else {
            throw new Error(`Missing credentials for ${provider} sign-in.`);
          }

          // onAuthStateChanged (below) picks up the new session, loads the Firestore
          // profile, and sets isAuthenticated/isAdmin — nothing more to do here.
          setShowAuthModal(false);
          if (authAccountType === "freelancer" && authMode === "signup") {
            setShowVettingModal(true);
          }
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (err) {
          console.error(`${provider} sign-in failed:`, err);
          setAuthError(`${provider === "github" ? "GitHub" : "LinkedIn"} sign-in failed. Please try again.`);
        } finally {
          setIsAuthLoading(false);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [authAccountType, authMode]);

  // Firestore Syncing Wrappers
  const handleUpdateProfile = async (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    if (auth.currentUser) {
      await saveUserProfile(auth.currentUser.uid, updatedProfile);
    }
  };

  const handleUpdatePosts = async (updatedPosts: ActivityPost[]) => {
    setPosts(updatedPosts);
    // Sync added/updated items
    const currentMap = new Map(posts.map(item => [item.id, item]));
    for (const newItem of updatedPosts) {
      const existing = currentMap.get(newItem.id);
      if (!existing || JSON.stringify(existing) !== JSON.stringify(newItem)) {
        await saveCollectionItem("posts", newItem);
      }
    }
    // Delete items removed from list
    for (const oldItem of posts) {
      if (!updatedPosts.some(item => item.id === oldItem.id)) {
        await deleteCollectionItem("posts", oldItem.id);
      }
    }
  };

  const handleUpdateCourses = async (updatedCourses: Course[]) => {
    setCourses(updatedCourses);
    const currentMap = new Map(courses.map(item => [item.id, item]));
    for (const newItem of updatedCourses) {
      const existing = currentMap.get(newItem.id);
      if (!existing || JSON.stringify(existing) !== JSON.stringify(newItem)) {
        await saveCollectionItem("courses", newItem);
      }
    }
    for (const oldItem of courses) {
      if (!updatedCourses.some(item => item.id === oldItem.id)) {
        await deleteCollectionItem("courses", oldItem.id);
      }
    }
  };

  const handleUpdateProducts = async (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    const currentMap = new Map(products.map(item => [item.id, item]));
    for (const newItem of updatedProducts) {
      const existing = currentMap.get(newItem.id);
      if (!existing || JSON.stringify(existing) !== JSON.stringify(newItem)) {
        await saveCollectionItem("products", newItem);
      }
    }
    for (const oldItem of products) {
      if (!updatedProducts.some(item => item.id === oldItem.id)) {
        await deleteCollectionItem("products", oldItem.id);
      }
    }
  };

  const handleUpdateTasks = async (updatedTasks: ProjectTask[]) => {
    const currentUser = auth.currentUser;
    const userEmail = currentUser?.email?.toLowerCase().trim();
    const isNewUser = currentUser && userEmail !== "chinedu@estarrapp.com";
    
    const tasksToSave = updatedTasks.map(t => {
      if (isNewUser && !t.userId) {
        return { ...t, userId: currentUser.uid };
      }
      return t;
    });

    setTasks(tasksToSave);
    const currentMap = new Map(tasks.map(item => [item.id, item]));
    for (const newItem of tasksToSave) {
      const existing = currentMap.get(newItem.id);
      if (!existing || JSON.stringify(existing) !== JSON.stringify(newItem)) {
        await saveCollectionItem("tasks", newItem);
      }
    }
    for (const oldItem of tasks) {
      if (!tasksToSave.some(item => item.id === oldItem.id)) {
        await deleteCollectionItem("tasks", oldItem.id);
      }
    }
  };

  const handleUpdateChannels = async (updatedChannels: CommunityChannel[]) => {
    setChannels(updatedChannels);
    const currentMap = new Map(channels.map(item => [item.id, item]));
    for (const newItem of updatedChannels) {
      const existing = currentMap.get(newItem.id);
      if (!existing || JSON.stringify(existing) !== JSON.stringify(newItem)) {
        await saveCollectionItem("channels", newItem);
      }
    }
    for (const oldItem of channels) {
      if (!updatedChannels.some(item => item.id === oldItem.id)) {
        await deleteCollectionItem("channels", oldItem.id);
      }
    }
  };

  const handleUpdateJobs = async (updatedJobs: Job[]) => {
    setJobs(updatedJobs);
    const currentMap = new Map(jobs.map(item => [item.id, item]));
    for (const newItem of updatedJobs) {
      const existing = currentMap.get(newItem.id);
      if (!existing || JSON.stringify(existing) !== JSON.stringify(newItem)) {
        await saveCollectionItem("jobs", newItem);
      }
    }
    for (const oldItem of jobs) {
      if (!updatedJobs.some(item => item.id === oldItem.id)) {
        await deleteCollectionItem("jobs", oldItem.id);
      }
    }
  };

  const cycleTaskStatus = (e: React.MouseEvent, taskId: string, currentStatus: string) => {
    e.stopPropagation();
    const statusFlow: Record<string, ProjectTask["status"]> = {
      todo: "inprogress",
      inprogress: "review",
      review: "done",
      done: "todo"
    };
    const newStatus = statusFlow[currentStatus] || "todo";
    
    if (newStatus === "done") {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ['#a855f7', '#10b981', '#3b82f6'],
        disableForReducedMotion: true,
      });
    }

    const updatedTasks = tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));
    handleUpdateTasks(updatedTasks);
  };

  // Profile Settings Sidebar Drawer state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [editBio, setEditBio] = useState(userProfile.bio || "");
  const [editProfession, setEditProfession] = useState(userProfile.profession || "");
  const [editSkills, setEditSkills] = useState(userProfile.skills?.join(", ") || "");
  const [editBirthdate, setEditBirthdate] = useState(userProfile.birthdate || "1998-07-06");
  const [editAvatar, setEditAvatar] = useState(userProfile.avatar || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync edit state with user profile whenever drawer opens or profile changes
  React.useEffect(() => {
    if (isProfileOpen) {
      setEditBio(userProfile.bio || "");
      setEditProfession(userProfile.profession || "");
      setEditSkills(userProfile.skills?.join(", ") || "");
      setEditBirthdate(userProfile.birthdate || "1998-07-06");
      setEditAvatar(userProfile.avatar || "");
    }
  }, [isProfileOpen, userProfile]);

  // Listen for Firebase auth state changes
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch custom user profile from Firestore or load fallback profile
        const profile = await getUserProfile(user.uid, user.email || undefined, user.displayName || undefined);
        setUserProfile(profile);
        setIsAuthenticated(true);
        
        // Auto-set admin privileges if email matches admin accounts
        const userEmail = (user.email || profile.email || "").trim().toLowerCase();
        if (userEmail === "rdgabmomoh@gmail.com" || userEmail === "raphdafemomoh@gmail.com") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        // Load collaborative lists from Firestore
        try {
          const fetchedPosts = await getCollectionData<ActivityPost>("posts", initialPosts);
          setPosts(fetchedPosts);

                    const fetchedCourses = await getCollectionData<Course>("courses", initialCourses);
          setCourses(fetchedCourses);

          const fetchedProducts = await getCollectionData<Product>("products", initialProducts);
          setProducts(initialProducts);
          // Re-seed updated initial products to Firebase
          initialProducts.forEach(p => saveCollectionItem("products", p));

          const fetchedCampaigns = await getCollectionData<BrandCampaign>("campaigns", []);
          
          // Cleanup mock campaigns
          const validCampaigns = fetchedCampaigns.filter(c => !c.id.startsWith("camp-") && !c.id.startsWith("c"));
          fetchedCampaigns.forEach(async (c) => {
            if (c.id.startsWith("camp-") || c.id.startsWith("c")) {
              try { await deleteCollectionItem("campaigns", c.id); } catch(e) {}
            }
          });
          setCampaigns(validCampaigns);

          const fetchedTasks = await getCollectionData<ProjectTask>("tasks", []);
          
          // Cleanup mock tasks
          const mockTaskTitles = ["Distributed System Migration", "AI Agent Orchestration Pipeline", "Cloud Native Security Audit", "TikTok Meme Ad", "Instagram Reels", "UGC Styling"];
          const validTasks = fetchedTasks.filter(t => !mockTaskTitles.includes(t.title) && !t.id.startsWith("t"));
          fetchedTasks.forEach(async (t) => {
            if (mockTaskTitles.includes(t.title) || t.id.startsWith("t")) {
              try { await deleteCollectionItem("tasks", t.id); } catch(e) {}
            }
          });
          setTasks(validTasks);

          const fetchedJobs = await getCollectionData<Job>("jobs", initialJobs);
          setJobs(fetchedJobs);

          const fetchedChannels = await getCollectionData<CommunityChannel>("channels", initialChannels);
          setChannels(fetchedChannels);
        } catch (err) {
          console.error("Error loading collaborative collections:", err);
        }
      } else {
        setIsAuthenticated(false);
        setUserProfile(initialProfile);
        setPosts(initialPosts);
        setCourses(initialCourses);
        setProducts(initialProducts);
        setCampaigns(initialCampaigns);
        setTasks(initialTasks);
        setJobs(initialJobs);
        setChannels(initialChannels);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // ESTARR AI Drawer State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiContext, setAiContext] = useState("general");

  const handleOpenAi = (prompt: string, context: string) => {
    setAiPrompt(prompt);
    setAiContext(context);
    setIsAiOpen(true);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile = {
      ...userProfile,
      bio: editBio,
      profession: editProfession,
      skills: editSkills.split(",").map(s => s.trim()).filter(Boolean),
      birthdate: editBirthdate,
      avatar: editAvatar
    };
    setUserProfile(updatedProfile);
    
    // If authenticated, also save it in Firestore!
    if (auth.currentUser) {
      await saveUserProfile(auth.currentUser.uid, updatedProfile);
    }
    
    setIsProfileOpen(false);
    alert("Profile configurations updated successfully!");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) return;

    if (authMode === "signup" && authAccountType === "freelancer" && authPassword !== authConfirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }

    setIsAuthLoading(true);
    setAuthError(null);
    try {
      if (authMode === "signin") {
        try {
          await signInWithEmailAndPassword(auth, authEmail, authPassword);
        } catch (signInErr: any) {
          // If the user doesn't exist (invalid-credential or user-not-found), automatically attempt registration as a seamless fallback
          if (signInErr.code === "auth/invalid-credential" || signInErr.code === "auth/user-not-found") {
            console.log("Account not found or invalid credentials on first sign in. Attempting seamless auto-registration fallback...");
            try {
              const userCredential = await createUserWithEmailAndPassword(auth, authEmail, authPassword);
              const user = userCredential.user;
              await saveUserProfile(user.uid, {
                name: authName || authEmail.split("@")[0],
                email: authEmail,
                birthdate: authBirthdate || "1998-07-06",
                accountType: authAccountType,
                profession: authAccountType === "creator" ? "Creator" : authAccountType === "academyLearner" ? "Certified Creator" : authAccountType === "freelancer" ? (applyingAs ? `${applyingAs} Specialist` : "Professional Freelancer") : (selectedRoleType ? `Hiring: ${selectedRoleType}` : "Job Provider / Owner"),
              });
              // Send signup welcome email
              try {
                fetch("/api/send-welcome", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: authEmail,
                    name: authName || authEmail.split("@")[0],
                    type: "signup"
                  })
                }).catch(err => console.error("Async welcome email dispatch failed:", err));
              } catch (e) {}
            } catch (signUpErr: any) {
              // If registration fails because the email is already in use, it means the password they entered was wrong
              if (signUpErr.code === "auth/email-already-in-use") {
                throw signInErr;
              } else {
                throw signUpErr;
              }
            }
          } else {
            throw signInErr;
          }
        }
      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, authEmail, authPassword);
          const user = userCredential.user;
          await saveUserProfile(user.uid, {
            name: authName,
            email: authEmail,
            birthdate: authBirthdate || "1998-07-06",
            accountType: authAccountType,
            profession: authAccountType === "creator" ? "Creator" : authAccountType === "academyLearner" ? "Certified Creator" : authAccountType === "freelancer" ? (applyingAs ? `${applyingAs} Specialist` : "Professional Freelancer") : (selectedRoleType ? `Hiring: ${selectedRoleType}` : "Job Provider / Owner"),
          });
          // Send signup welcome email
          try {
            fetch("/api/send-welcome", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: authEmail,
                name: authName,
                type: "signup"
              })
            }).catch(err => console.error("Async welcome email dispatch failed:", err));
          } catch (e) {}
          
          if (authAccountType === "freelancer") {
            setShowVettingModal(true);
          }
        } catch (signUpErr: any) {
          if (signUpErr.code === "auth/email-already-in-use") {
            console.log("Email already in use on signup. Attempting seamless auto-login fallback...");
            try {
              await signInWithEmailAndPassword(auth, authEmail, authPassword);
              // Successfully logged in as existing user. Let's prevent the vetting modal since they aren't new.
              setAuthMode("signin"); // Will prevent the vetting modal condition
            } catch (signInErr: any) {
              if (signInErr.code === "auth/wrong-password" || signInErr.code === "auth/invalid-credential") {
                const customError = new Error("An account with this email exists, but the password provided is incorrect. Please sign in instead.");
                (customError as any).code = "auth/email-already-in-use-wrong-password";
                throw customError;
              }
              throw signInErr;
            }
          } else {
            throw signUpErr;
          }
        }
      }
      setShowAuthModal(false);
    } catch (error: any) {
      console.error("Auth error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      let friendlyMessage = error.message;
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        friendlyMessage = "Incorrect email or password. If you don't have an account, please click SIGN UP below to register first!";
      } else if (error.code === "auth/email-already-in-use") {
        friendlyMessage = "An account with this email already exists. Try signing in instead.";
      } else if (error.code === "auth/email-already-in-use-wrong-password") {
        friendlyMessage = error.message;
      } else if (error.code === "auth/weak-password") {
        friendlyMessage = "Password is too weak. Please use at least 6 characters.";
      } else if (error.code === "auth/invalid-email") {
        friendlyMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/network-request-failed") {
        friendlyMessage = "Network error: Unable to reach the authentication server. This often happens due to domain restrictions on the Firebase API key. Please ensure your domain is whitelisted in the Firebase Console.";
      }
      setAuthError(friendlyMessage);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const isSidebarHidden = false;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-purple-600 selection:text-white relative overflow-hidden">
      
      {/* Scrollable Background Doodles */}
      <BackgroundDoodles />
      
      {/* Global Background Abstract Patterns */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left Side Corners */}
        <div className="absolute left-[3%] top-[12%] text-purple-500/5 rotate-12">
          <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <circle cx="50" cy="50" r="40" strokeDasharray="8 8" />
            <circle cx="50" cy="50" r="25" />
            <circle cx="50" cy="50" r="12" strokeDasharray="4 4" />
          </svg>
        </div>
        <div className="absolute left-[5%] top-[50%] text-emerald-500/5 -rotate-12">
          <svg width="130" height="130" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
            <rect x="20" y="20" width="60" height="60" rx="10" />
            <rect x="35" y="35" width="30" height="30" rx="5" strokeDasharray="4 4" />
          </svg>
        </div>
        <div className="absolute left-[2%] bottom-[10%] text-blue-500/5 rotate-45">
          <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M 10 35 Q 30 5 50 35 T 90 35" />
            <path d="M 10 55 Q 30 25 50 55 T 90 55" />
            <path d="M 10 75 Q 30 45 50 75 T 90 75" />
          </svg>
        </div>

        {/* Right Side Corners */}
        <div className="absolute right-[3%] top-[20%] text-blue-500/5 -rotate-12">
          <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M 20 20 L 80 80 M 80 20 L 20 80" />
            <circle cx="50" cy="50" r="30" strokeDasharray="6 6" />
          </svg>
        </div>
        <div className="absolute right-[5%] top-[55%] text-purple-500/5 rotate-12">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <line x1="20" y1="20" x2="80" y2="20" />
            <line x1="20" y1="40" x2="80" y2="40" strokeDasharray="6 6" />
            <line x1="20" y1="60" x2="80" y2="60" />
            <line x1="20" y1="80" x2="80" y2="80" strokeDasharray="6 6" />
          </svg>
        </div>
        <div className="absolute right-[2%] bottom-[12%] text-rose-500/5 -rotate-45">
          <svg width="160" height="160" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <polygon points="50,15 85,85 15,85" />
            <polygon points="50,30 72,80 28,80" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>

            {showVettingModal && (
        <VettingProtocolModal 
          onClose={() => setShowVettingModal(false)}
          onApply={() => {
            setShowVettingModal(false);
            alert("Application submitted! Check your email for the CCAT link.");
          }}
        />
      )}

      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-50/90 backdrop-blur-xs flex flex-col justify-center items-center p-4 selection:bg-purple-600 selection:text-white border-4 border-slate-200">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-5 pointer-events-none" />
          
          <div className={`w-full ${
            (authAccountType === "jobOwner" && authMode === "signup" && hireWizardStep === 1) 
              ? "max-w-xl md:max-w-2xl" 
              : (authAccountType === "freelancer" && authMode === "signup") 
              ? "max-w-xl md:max-w-4xl" 
              : "max-w-sm"
          } bg-white border-2 border-slate-200 p-5 md:p-6 shadow-lg shadow-slate-200/50 relative z-10 rounded-xl transition-all duration-300`}>
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-slate-950 hover:text-purple-600 transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
            
            {/* Conditional Render: Step 1 of the Hiring Wizard for Job Owners */}
            {authAccountType === "jobOwner" && authMode === "signup" && hireWizardStep === 1 ? (
              <div className="flex flex-col">
                {/* Modal Logo / Header Area */}
                <div className="flex items-center gap-3 mb-4">
                  <svg width="32" height="32" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 drop-shadow-sm">
                    <defs>
                      <linearGradient id="brand-grad-modal-wizard" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9d50bb" />
                        <stop offset="100%" stopColor="#6e48aa" />
                      </linearGradient>
                    </defs>
                    <rect x="20" y="20" width="160" height="160" rx="40" fill="url(#brand-grad-modal-wizard)" />
                    <path d="M100 45L112.5 83.5H153L120.25 107.5L132.75 146L100 122L67.25 146L79.75 107.5L47 83.5H87.5L100 45Z" fill="white" />
                  </svg>
                  <div>
                    <h1 className="font-display font-black text-lg tracking-tight text-slate-900 leading-none">ESTARR</h1>
                    <p className="text-[10px] text-purple-600 font-bold tracking-wide mt-0.5">Hiring Portal</p>
                  </div>
                </div>

                {/* Account Type Selector - Screenshot 1 Style */}
                <div className="mb-6 w-full">
                  <span className="font-display font-extrabold text-[11px] uppercase tracking-wider text-slate-900 block mb-1.5">
                    Account Type *
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setAuthAccountType("freelancer")}
                      className={`flex-1 py-1.5 px-3 rounded-full border text-xs font-bold tracking-tight transition-all cursor-pointer ${
                        authAccountType === "freelancer"
                          ? "bg-purple-50 border-purple-500 text-purple-600 shadow-xs"
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      Freelancer
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthAccountType("jobOwner")}
                      className={`flex-1 py-1.5 px-3 rounded-full border text-xs font-bold tracking-tight transition-all cursor-pointer ${
                        authAccountType === "jobOwner"
                          ? "bg-purple-50 border-purple-500 text-purple-600 shadow-xs"
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      Owner
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthAccountType("creator")}
                      className={`flex-1 py-1.5 px-3 rounded-full border text-xs font-bold tracking-tight transition-all cursor-pointer ${
                        authAccountType === "creator"
                          ? "bg-purple-50 border-purple-500 text-purple-600 shadow-xs"
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      Creator
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthAccountType("academyLearner")}
                      className={`flex-1 py-1.5 px-3 rounded-full border text-xs font-bold tracking-tight transition-all cursor-pointer ${
                        authAccountType === "academyLearner"
                          ? "bg-purple-50 border-purple-500 text-purple-600 shadow-xs"
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      Learner
                    </button>
                  </div>
                </div>

                {/* Blue Banner Notice - Screenshot 2 Style */}
                <div className="bg-[#EBF3FC] border-l-4 border-[#0066FF] text-[#001A4E] p-4 rounded-r-xl text-[11px] md:text-xs leading-relaxed mb-6 font-medium">
                  Thanks for your interest in hiring through ESTARR! Before we get started, we'd like to ask a few questions to better understand your business needs.
                </div>

                {/* Wizard Title */}
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  STEP 1
                </span>
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight mb-5">
                  Who would you like to hire?
                </h2>

                {/* Option Cards Row */}
                <div className="flex flex-col gap-3">
                  {[
                    {
                      id: "Developer",
                      title: "Developer",
                      desc: "Software Developer, Data Scientist, DevOps, QA...",
                      icon: <Laptop className="w-5 h-5 text-blue-500" />
                    },
                    {
                      id: "Designer",
                      title: "Designer",
                      desc: "Web, Mobile, UI/UX, Branding, and Visual Designer...",
                      icon: <Layers className="w-5 h-5 text-purple-500" />
                    },
                    {
                      id: "Marketing Expert",
                      title: "Marketing Expert",
                      desc: "Growth Marketing Expert, Content Marketing Strategist, Digital Marketer, SEO Specialist...",
                      icon: <LineChart className="w-5 h-5 text-emerald-500" />
                    },
                    {
                      id: "Project Manager",
                      title: "Project Manager",
                      desc: "Digital Project Manager, IT Project Manager, Scrum Master, Agile Coach...",
                      icon: <Briefcase className="w-5 h-5 text-amber-500" />
                    }
                  ].map((option) => (
                    <div
                      key={option.id}
                      onClick={() => {
                        setSelectedRoleType(option.id);
                        setHireWizardStep(2);
                      }}
                      className="border border-slate-200 hover:border-blue-400 hover:bg-slate-50/50 p-3.5 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer group shadow-2xs hover:shadow-xs"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-white group-hover:border-blue-200 transition-colors">
                          {option.icon}
                        </div>
                        <div className="flex flex-col pr-4">
                          <span className="font-display font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                            {option.title}
                          </span>
                          <span className="text-slate-500 text-[11px] leading-snug mt-0.5">
                            {option.desc}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6 pt-4 border-t border-slate-100 text-[11px]">
                  <p className="text-slate-500">
                    Already registered?{" "}
                    <button
                      onClick={() => setAuthMode("signin")}
                      className="text-purple-600 font-bold hover:underline uppercase tracking-tight cursor-pointer"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </div>
            ) : authAccountType === "freelancer" && authMode === "signup" ? (
              // Toptal-style Freelancer Sign-up Layout
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left Side: Form */}
                <div className="flex-1">
                  {/* Header/Logo */}
                  <div className="flex items-center gap-3 mb-4">
                    <svg width="32" height="32" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 drop-shadow-sm">
                      <defs>
                        <linearGradient id="brand-grad-modal-wizard" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#9d50bb" />
                          <stop offset="100%" stopColor="#6e48aa" />
                        </linearGradient>
                      </defs>
                      <rect x="20" y="20" width="160" height="160" rx="40" fill="url(#brand-grad-modal-wizard)" />
                      <path d="M100 45L112.5 83.5H153L120.25 107.5L132.75 146L100 122L67.25 146L79.75 107.5L47 83.5H87.5L100 45Z" fill="white" />
                    </svg>
                    <div>
                      <h1 className="font-display font-black text-lg tracking-tight text-slate-900 leading-none">ESTARR</h1>
                      <p className="text-[10px] text-purple-600 font-bold tracking-wide mt-0.5">Talent Network</p>
                    </div>
                  </div>

                  {/* Toptal Style Onboarding Header */}
                  <h2 className="font-display font-black text-xl md:text-2xl text-[#1E293B] tracking-tight leading-tight mb-2">
                    Apply to Join the World's Top Talent Network
                  </h2>
                  <p className="text-slate-500 text-[11px] leading-relaxed mb-6">
                    ESTARR is an exclusive network of the world's top talent in business, design, marketing, and technology. We provide access to top companies, a community of experts, and resources that can help accelerate your career.
                  </p>

                  {/* Sign Up with LinkedIn */}
                  <button
                    type="button"
                    onClick={handleLinkedInLogin}
                    className="w-full bg-[#0A66C2] hover:bg-[#08529c] text-white py-2.5 px-4 rounded-md flex items-center justify-center gap-2 text-xs font-bold font-display cursor-pointer transition-colors shadow-sm"
                  >
                    <Linkedin className="w-4 h-4 text-white" />
                    Sign Up with LinkedIn
                  </button>

                  <div className="text-[10px] text-slate-400 text-center mt-2 mb-4 italic">
                    By clicking <span className="font-semibold">Sign up with LinkedIn</span>, you agree to let ESTARR store your LinkedIn profile
                  </div>

                  {/* Divider */}
                  <div className="relative flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-white px-2">OR</span>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>

                  {/* The Form */}
                  <form onSubmit={handleLogin} className="flex flex-col gap-3 text-xs">
                    {/* Account Type (Freelancer vs Owner) - so they can toggle back if they want */}
                    <div className="grid grid-cols-2 gap-3 mb-1">
                      <div className="flex flex-col gap-1">
                        <span className="font-display font-extrabold text-[9px] uppercase tracking-wider text-slate-900">
                          Account Type *
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => setAuthAccountType("freelancer")}
                            className="flex-1 py-1.5 px-2 rounded-full border text-[10px] font-bold tracking-tight transition-all bg-purple-50 border-purple-500 text-purple-600 cursor-pointer"
                          >
                            Freelancer
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setAuthAccountType("jobOwner");
                              setHireWizardStep(1);
                            }}
                            className="flex-1 py-1.5 px-2 rounded-full border text-[10px] font-bold tracking-tight transition-all bg-white border-slate-200 text-slate-500 hover:border-slate-300 cursor-pointer"
                          >
                            Owner
                          </button>
                        </div>
                      </div>

                      {/* Dropdown: I'm applying as... */}
                      <div className="flex flex-col gap-1">
                        <span className="font-display font-extrabold text-[9px] uppercase tracking-wider text-slate-900">
                          I'm applying as...
                        </span>
                        <select
                          value={applyingAs}
                          onChange={(e) => setApplyingAs(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:border-purple-500 text-slate-900 font-medium text-xs h-[34px]"
                        >
                          <option value="Developer">Developer</option>
                          <option value="Designer">Designer</option>
                          <option value="Marketing Expert">Marketing Expert</option>
                          <option value="Project Manager">Project Manager</option>
                          <option value="Product Manager">Product Manager</option>
                        </select>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-display font-extrabold text-[9px] uppercase tracking-wider text-slate-900">Full Name</label>
                        <input
                          type="text"
                          required
                          disabled={isAuthLoading}
                          placeholder="Your full name"
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-purple-500 text-slate-900 font-medium disabled:opacity-60"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="font-display font-extrabold text-[9px] uppercase tracking-wider text-slate-900">E-mail</label>
                        <input
                          type="email"
                          required
                          disabled={isAuthLoading}
                          placeholder="your.email@domain.com"
                          value={authEmail}
                          onChange={(e) => setAuthEmail(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-purple-500 text-slate-900 font-medium disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-display font-extrabold text-[9px] uppercase tracking-wider text-slate-900">Password</label>
                        <input
                          type="password"
                          required
                          disabled={isAuthLoading}
                          placeholder="Create password"
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-purple-500 text-slate-900 font-medium disabled:opacity-60"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="font-display font-extrabold text-[9px] uppercase tracking-wider text-slate-900">Confirm password</label>
                        <input
                          type="password"
                          required
                          disabled={isAuthLoading}
                          placeholder="Confirm password"
                          value={authConfirmPassword}
                          onChange={(e) => setAuthConfirmPassword(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-purple-500 text-slate-900 font-medium disabled:opacity-60"
                        />
                      </div>
                    </div>

                    {authError && (
                      <div className="p-2.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-md text-[10px] font-mono leading-relaxed mt-1">
                        ⚠️ {authError}
                      </div>
                    )}

                    <div className="text-[10px] text-slate-500 leading-relaxed mt-2">
                      By submitting, you acknowledge and agree to ESTARR's <span className="text-purple-600 hover:underline cursor-pointer">Terms and Conditions</span> and <span className="text-purple-600 hover:underline cursor-pointer">Privacy Policy</span>.
                    </div>

                    <button
                      id="btn-auth-submit-talent"
                      type="submit"
                      disabled={isAuthLoading}
                      className="w-full bg-[#00D285] hover:bg-[#00be76] text-white py-3 px-4 rounded-md flex items-center justify-center gap-1.5 text-xs font-bold font-display uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-75"
                    >
                      {isAuthLoading ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Applying...</span>
                        </>
                      ) : (
                        "Apply to Join ESTARR"
                      )}
                    </button>
                  </form>

                  <div className="text-center mt-4 pt-3 border-t border-slate-100 text-[11px]">
                    <p className="text-slate-500">
                      Already registered?{" "}
                      <button
                        onClick={() => setAuthMode("signin")}
                        className="text-purple-600 font-bold hover:underline uppercase tracking-tight cursor-pointer"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </div>

                {/* Right Side: Logos / Social Proof */}
                <div className="hidden md:flex md:w-[240px] bg-slate-50 border-l border-slate-200 p-6 flex-col justify-center rounded-r-xl">
                  <h4 className="font-display font-extrabold text-[10px] uppercase tracking-widest text-slate-400 mb-6 text-center md:text-left">
                    Work with top companies
                  </h4>
                  
                  <div className="flex flex-col gap-6 items-center md:items-start opacity-65">
                    {/* Microsoft Logo */}
                    <div className="flex items-center gap-2 text-slate-800">
                      <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                        <div className="bg-[#F25022] w-1.5 h-1.5"></div>
                        <div className="bg-[#7FBA00] w-1.5 h-1.5"></div>
                        <div className="bg-[#00A4EF] w-1.5 h-1.5"></div>
                        <div className="bg-[#FFB900] w-1.5 h-1.5"></div>
                      </div>
                      <span className="font-sans font-semibold tracking-tight text-sm text-slate-700">Microsoft</span>
                    </div>

                    {/* Salesforce Logo */}
                    <div className="text-[#00A1E0] font-sans font-black tracking-tighter text-sm">
                      salesforce
                    </div>

                    {/* Airbnb Logo */}
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <span className="font-display font-extrabold text-sm text-[#FF5A5F] tracking-tight">airbnb</span>
                    </div>

                    {/* Shopify Logo */}
                    <div className="flex items-center gap-1 text-[#96BF48] font-sans font-bold text-sm">
                      <span>shopify</span>
                    </div>

                    {/* Netflix Logo */}
                    <div className="font-display font-black tracking-widest text-[#E50914] text-sm italic">
                      NETFLIX
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Standard Auth form (SignIn, or step 2 of Owner signup)
              <>
                <div className="text-center flex flex-col items-center gap-1 mb-4 mt-1">
                  <div className="group relative w-10 h-10 flex items-center justify-center transition-all duration-500 hover:-translate-y-0.5 cursor-pointer">
                    <svg width="40" height="40" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 drop-shadow-md">
                      <defs>
                        <linearGradient id="brand-grad-modal" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#9d50bb" />
                          <stop offset="100%" stopColor="#6e48aa" />
                        </linearGradient>
                      </defs>
                      <rect x="20" y="20" width="160" height="160" rx="40" fill="url(#brand-grad-modal)" />
                      <path d="M100 45L112.5 83.5H153L120.25 107.5L132.75 146L100 122L67.25 146L79.75 107.5L47 83.5H87.5L100 45Z" fill="white" className="transition-transform duration-700 origin-center group-hover:scale-110 group-hover:rotate-[144deg]" />
                    </svg>
                  </div>
                  <h1 className="font-display font-bold text-xl tracking-tight mt-2 text-slate-900">ESTARR</h1>
                  <p className="text-[11px] text-purple-600 font-bold tracking-wide mt-0.5">Empowering Creators & Pros</p>
                  <p className="text-[10px] text-slate-400">Connect • Learn • Build • Work • Grow</p>
                </div>

                {authAccountType === "jobOwner" && authMode === "signup" && hireWizardStep === 2 && (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => setHireWizardStep(1)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-[10px] font-bold uppercase tracking-tight mb-2 transition-all cursor-pointer"
                    >
                      ← Back to Hire Selection
                    </button>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-[11px] font-semibold text-blue-900 flex justify-between items-center">
                      <span>Role selected: <strong className="text-blue-600">{selectedRoleType}</strong></span>
                      <span className="text-[9px] font-mono uppercase tracking-widest bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-sm">Step 2 of 2</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-3 text-xs">
                  {authMode === "signup" && (
                    <>
                      <div className="flex flex-col gap-1">
                        <label className="font-mono text-[9px] font-bold text-slate-900 tracking-wide">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-800" />
                          <input
                            type="text"
                            required
                            disabled={isAuthLoading}
                            placeholder="Chinedu Okafor"
                            value={authName}
                            onChange={(e) => setAuthName(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:bg-slate-50 text-slate-900 font-medium disabled:opacity-60"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <span className="font-display font-extrabold text-[9px] uppercase tracking-wider text-slate-900">
                            Account Type *
                          </span>
                          <div className="flex gap-1.5">
                            <button
                              type="button"
                              disabled={isAuthLoading}
                              onClick={() => setAuthAccountType("freelancer")}
                              className={`flex-1 py-1.5 px-2 rounded-full border text-[10px] font-bold tracking-tight transition-all disabled:opacity-60 cursor-pointer ${
                                authAccountType === "freelancer"
                                  ? "bg-purple-50 border-purple-500 text-purple-600"
                                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                              }`}
                            >
                              Freelancer
                            </button>
                            <button
                              type="button"
                              disabled={isAuthLoading}
                              onClick={() => {
                                setAuthAccountType("jobOwner");
                                setHireWizardStep(1); // Return to wizard step 1
                              }}
                              className={`flex-1 py-1.5 px-2 rounded-full border text-[10px] font-bold tracking-tight transition-all disabled:opacity-60 cursor-pointer ${
                                authAccountType === "jobOwner"
                                  ? "bg-purple-50 border-purple-500 text-purple-600"
                                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                              }`}
                            >
                              Owner
                            </button>
                            <button
                              type="button"
                              disabled={isAuthLoading}
                              onClick={() => setAuthAccountType("creator")}
                              className={`flex-1 py-1.5 px-2 rounded-full border text-[10px] font-bold tracking-tight transition-all disabled:opacity-60 cursor-pointer ${
                                authAccountType === "creator"
                                  ? "bg-purple-50 border-purple-500 text-purple-600"
                                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                              }`}
                            >
                              Creator
                            </button>
                            <button
                              type="button"
                              disabled={isAuthLoading}
                              onClick={() => setAuthAccountType("academyLearner")}
                              className={`flex-1 py-1.5 px-2 rounded-full border text-[10px] font-bold tracking-tight transition-all disabled:opacity-60 cursor-pointer ${
                                authAccountType === "academyLearner"
                                  ? "bg-purple-50 border-purple-500 text-purple-600"
                                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                              }`}
                            >
                              Learner
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-mono text-[9px] font-bold text-slate-900 tracking-wide">Birthdate *</label>
                          <div className="relative">
                            <Calendar className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-800" />
                            <input
                              type="date"
                              required
                              disabled={isAuthLoading}
                              value={authBirthdate}
                              onChange={(e) => setAuthBirthdate(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-2 py-2 focus:outline-none focus:bg-slate-50 text-slate-900 font-medium text-[10px] disabled:opacity-60"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] font-bold text-slate-900 tracking-wide">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-800" />
                      <input
                        type="email"
                        required
                        disabled={isAuthLoading}
                        placeholder="chinedu@estarrapp.com"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:bg-slate-50 text-slate-900 font-medium disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] font-bold text-slate-900 tracking-wide">Security Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-800" />
                      <input
                        type="password"
                        required
                        disabled={isAuthLoading}
                        placeholder="••••••••"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:bg-slate-50 text-slate-900 font-medium disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {authMode === "signin" && (
                    <p className="text-[10px] text-slate-500 font-mono italic leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                      💡 <strong>Tip:</strong> If you don't have an account in the database yet, click <strong>SIGN UP</strong> below to register one!
                    </p>
                  )}

                  {authError && (
                    <div className="p-2.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-[10px] font-mono leading-relaxed">
                      ⚠️ {authError}
                    </div>
                  )}

                  <button
                    id="btn-auth-submit"
                    type="submit"
                    disabled={isAuthLoading}
                    className={`w-full btn-primary text-[10px] uppercase mt-2 py-2.5 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {isAuthLoading ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      authMode === "signin" 
                        ? "Sign In to ESTARR" 
                        : (authAccountType === "jobOwner" ? "Complete & Match Talent" : "Create Account")
                    )}
                  </button>
                </form>

                <div className="relative flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or Continue With</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-2">
                  <button
                    type="button"
                    onClick={handleLinkedInLogin}
                    className="flex items-center justify-center gap-2 py-2 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    LinkedIn
                  </button>
                  <button
                    type="button"
                    onClick={handleGithubLogin}
                    className="flex items-center justify-center gap-2 py-2 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-slate-900" />
                    GitHub
                  </button>
                </div>

                <div className="text-center mt-4 pt-3 border-t border-slate-200/25 text-[11px]">
                  {authMode === "signin" ? (
                    <p className="text-slate-500">
                      Don't have an account yet?{" "}
                      <button
                        onClick={() => {
                          setAuthMode("signup");
                          if (authAccountType === "jobOwner") {
                            setHireWizardStep(1);
                          }
                        }}
                        className="text-purple-500 font-bold hover:underline uppercase tracking-tight cursor-pointer"
                      >
                        Sign Up
                      </button>
                    </p>
                  ) : (
                    <p className="text-slate-500">
                      Already registered?{" "}
                      <button
                        onClick={() => setAuthMode("signin")}
                        className="text-purple-500 font-bold hover:underline uppercase tracking-tight cursor-pointer"
                      >
                        Sign In
                      </button>
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Header */}
      <header className="sticky top-0 bg-black border-b border-slate-800 z-40 px-6 py-4 flex justify-between items-center shadow-lg">
        <button onClick={() => setActiveTab("home")} className="flex items-center gap-3 text-left cursor-pointer hover:opacity-90">
          <div className="group relative w-11 h-11 flex items-center justify-center transition-all duration-500 hover:-translate-y-0.5">
            <svg width="44" height="44" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11 drop-shadow-md">
              <defs>
                <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9d50bb" />
                  <stop offset="100%" stopColor="#6e48aa" />
                </linearGradient>
              </defs>
              <rect x="20" y="20" width="160" height="160" rx="40" fill="url(#brand-grad)" />
              <path d="M100 45L112.5 83.5H153L120.25 107.5L132.75 146L100 122L67.25 146L79.75 107.5L47 83.5H87.5L100 45Z" fill="white" className="transition-transform duration-700 origin-center group-hover:scale-110 group-hover:rotate-[144deg]" />
            </svg>
          </div>
          <div>
            <h1 className="font-display font-bold text-sm md:text-base uppercase tracking-tight text-white">ESTARR</h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide font-bold">{translations[globalLanguage].heroSubtitle}</p>
          </div>
        </button>

        {/* Global Navigation Buttons in the Middle of Header */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950 border border-slate-800/80 px-2.5 py-1.5 rounded-full shadow-inner">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-wider cursor-pointer ${
              activeTab === "home"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }`}
          >
            <Home className="w-3 h-3" />
            <span>Home</span>
          </button>
          
          <button
            onClick={() => {
              if (!isAuthenticated) {
                setAuthMode("signup");
                setShowAuthModal(true);
              } else {
                setActiveTab("projects");
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-wider cursor-pointer ${
              activeTab === "projects"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }`}
          >
            <Layers className="w-3 h-3" />
            <span className="flex items-center gap-1">
              Projects
            </span>
          </button>

          <button
            onClick={() => {
              if (!isAuthenticated) {
                setAuthMode("signup");
                setShowAuthModal(true);
              } else {
                setActiveTab("connect");
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-wider cursor-pointer ${
              activeTab === "connect"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }`}
          >
            <Users className="w-3 h-3" />
            <span className="flex items-center gap-1">
              Connect
            </span>
          </button>

          <button
            onClick={() => {
              if (!isAuthenticated) {
                setAuthMode("signup");
                setShowAuthModal(true);
              } else {
                setActiveTab("academy");
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-wider cursor-pointer ${
              activeTab === "academy"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }`}
          >
            <Award className="w-3 h-3" />
            <span className="flex items-center gap-1">
              Work Certification
            </span>
          </button>

          <button
            onClick={() => {
              if (!isAuthenticated) {
                setAuthMode("signup");
                setShowAuthModal(true);
              } else {
                setActiveTab("marketplace");
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-wider cursor-pointer ${
              activeTab === "marketplace"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }`}
          >
            <ShoppingCart className="w-3 h-3" />
            <span className="flex items-center gap-1">
              Storefront
            </span>
          </button>
        </nav>

        {/* Global User Profile Indicator */}
        <div className="flex items-center gap-3">
          {/* Globalizer Widget */}
          <div className="relative">
            <button
              onClick={() => setIsGlobalDropdownOpen(!isGlobalDropdownOpen)}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 px-3 py-1.5 rounded-xl cursor-pointer transition-colors shadow-sm flex items-center gap-1.5 text-[10px] font-bold"
              title="Global Settings (Currency & Language)"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400 animate-pulse shrink-0" />
              <span className="font-mono text-[10px] tracking-wider uppercase">{globalLanguage} | {globalCurrency}</span>
            </button>

            {isGlobalDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40 cursor-default" 
                  onClick={() => setIsGlobalDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-slate-950 border border-slate-800 rounded-xl p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-white">
                  <div className="mb-2.5 pb-2 border-b border-slate-900">
                    <span className="text-[9px] font-bold text-purple-400 uppercase tracking-wider block mb-1">Global Currency</span>
                    <div className="grid grid-cols-3 gap-1">
                      {(["USD", "EUR", "GBP", "NGN", "KES", "INR"] as const).map((curr) => (
                        <button
                          key={curr}
                          onClick={() => {
                            setGlobalCurrency(curr);
                            setIsGlobalDropdownOpen(false);
                            confetti({ particleCount: 30, spread: 40, colors: ["#9d50bb", "#6e48aa"] });
                          }}
                          className={`px-1.5 py-1 text-[10px] font-mono font-bold rounded-lg transition-colors border cursor-pointer ${
                            globalCurrency === curr
                              ? "bg-purple-900/30 border-purple-500 text-purple-300"
                              : "bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-900 hover:text-white"
                          }`}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold text-purple-400 uppercase tracking-wider block mb-1">Display Language</span>
                    <div className="flex flex-col gap-1">
                      {[
                        { code: "EN", name: "English (Global)" },
                        { code: "ES", name: "Español (LatAm)" },
                        { code: "FR", name: "Français (Europe/Africa)" },
                        { code: "SW", name: "Kiswahili (East Africa)" },
                        { code: "HI", name: "हिन्दी (India)" },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setGlobalLanguage(lang.code as any);
                            setIsGlobalDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-[10px] font-semibold rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                            globalLanguage === lang.code
                              ? "bg-purple-900/30 text-purple-300 font-bold"
                              : "text-slate-400 hover:bg-slate-900/80 hover:text-white"
                          }`}
                        >
                          <span>{lang.name}</span>
                          <span className="text-[9px] font-mono text-slate-500">{lang.code}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {isAuthenticated ? (
            <>
              <button
                onClick={() => setIsNotificationsOpen(true)}
                className="relative bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 p-2 rounded-xl cursor-pointer transition-colors shadow-sm"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black"></span>
              </button>
              <button
                id="btn-edit-profile-main"
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 text-left bg-slate-900 hover:bg-slate-800 p-1 border border-slate-800 cursor-pointer transition-all pr-3 rounded-xl"
              >
                <img src={userProfile.avatar} alt="avatar" className="w-7 h-7 object-cover border border-slate-700 rounded-lg" />
                <div className="hidden sm:block text-[10px]">
                  <span className="font-bold text-white block leading-tight uppercase tracking-tight">{userProfile.name}</span>
                  <span className="text-purple-400 font-bold block leading-tight text-[8px] uppercase tracking-wider">Configure Profile</span>
                </div>
              </button>
              <button
                onClick={async () => {
                  try {
                    await firebaseSignOut(auth);
                    setActiveTab("home");
                    alert("Successfully logged out from Firebase Auth.");
                  } catch (error: any) {
                    console.error("Logout error:", error);
                  }
                }}
                className="flex items-center justify-center w-9 h-9 bg-slate-900 hover:bg-rose-950/30 text-slate-400 hover:text-rose-500 border border-slate-800 rounded-xl transition-colors shadow-sm"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => { setAuthMode("signin"); setShowAuthModal(true); }}
                className="text-slate-400 hover:text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => { setAuthMode("signup"); setShowAuthModal(true); }}
                className="text-white hover:text-[#00D285] font-display font-bold text-xs md:text-sm tracking-tight transition-all cursor-pointer hover:underline underline-offset-4"
              >
                Apply as a Talent
              </button>
              <div className="relative flex items-center gap-1.5">
                <button 
                  onClick={() => { setAuthMode("signup"); setShowAuthModal(true); }}
                  className="bg-gradient-to-r from-[#9d50bb] to-[#6e48aa] hover:from-[#a85ec5] hover:to-[#7b55be] text-white font-display font-bold text-xs md:text-sm px-5 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm active:scale-95 flex items-center justify-center min-h-[44px]"
                >
                  Hire Top Talent
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHireTooltip(!showHireTooltip);
                  }}
                  className="group relative w-11 h-11 flex items-center justify-center transition-all duration-500 hover:-translate-y-0.5 cursor-pointer bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white min-w-[44px] min-h-[44px]"
                  title="Learn more"
                >
                  <HelpCircle className="w-4 h-4" />
                  
                  {/* Hover-only desktop tooltip */}
                  <div className="hidden sm:block absolute right-0 top-full mt-2.5 w-60 p-3 rounded-lg shadow-xl border border-slate-800 bg-slate-950 text-white text-[11px] text-left transition-all duration-200 z-50 scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto">
                    <div className="absolute top-0 right-3.5 -mt-1.5 w-3 h-3 bg-slate-950 rotate-45 border-l border-t border-slate-800" />
                    <p className="font-bold text-purple-400 mb-1">For Job Owners</p>
                    <p className="text-slate-300 leading-relaxed">
                      This feature allows clients and creators to browse, filter, and recruit top professionals from our verified expert network.
                    </p>
                  </div>

                  {/* Click/Active tooltip state (adaptive: centered modal on mobile, dropdown on desktop) */}
                  {showHireTooltip && (
                    <>
                      {/* Mobile Centered Modal Overlay */}
                      <div 
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 sm:hidden cursor-default"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowHireTooltip(false);
                        }}
                      >
                        <div 
                          className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-xl p-5 text-left text-white shadow-2xl relative"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button 
                            type="button"
                            onClick={() => setShowHireTooltip(false)}
                            className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <p className="font-display font-extrabold text-[10px] text-purple-400 uppercase tracking-wider mb-2">For Job Owners</p>
                          <h3 className="font-display font-black text-sm text-white mb-2">Browse & Hire Experts</h3>
                          <p className="text-slate-300 text-xs leading-relaxed mb-4">
                            This feature is designed for clients, brands, and creators to browse, filter, and recruit top professionals from our verified expert network.
                          </p>
                          <button 
                            type="button"
                            onClick={() => {
                              setShowHireTooltip(false);
                              setAuthMode("signup");
                              setShowAuthModal(true);
                            }}
                            className="w-full py-2.5 bg-gradient-to-r from-[#9d50bb] to-[#6e48aa] hover:from-[#a85ec5] hover:to-[#7b55be] text-white font-display font-bold text-xs rounded-lg transition-all cursor-pointer shadow-md active:scale-95"
                          >
                            Sign Up to Browse
                          </button>
                        </div>
                      </div>

                      {/* Desktop Click Dropdown */}
                      <div 
                        className="hidden sm:block absolute right-0 top-full mt-2.5 w-60 p-3 rounded-lg shadow-xl border border-slate-800 bg-slate-950 text-white text-[11px] text-left z-50 scale-100 opacity-100 pointer-events-auto cursor-default"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="absolute top-0 right-3.5 -mt-1.5 w-3 h-3 bg-slate-950 rotate-45 border-l border-t border-slate-800" />
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="font-bold text-purple-400">For Job Owners</p>
                          <button 
                            type="button"
                            onClick={() => setShowHireTooltip(false)}
                            className="text-slate-400 hover:text-white cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          This feature allows clients and creators to browse, filter, and recruit top professionals from our verified expert network.
                        </p>
                      </div>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 relative z-10">
        {/* Navigation Rail Sidebar */}
        {!isSidebarHidden && (<nav className={`lg:col-span-3 flex flex-col gap-4 p-4 h-fit shadow-xs rounded-xl transition-all duration-300 ${sidebarStyles[sidebarTheme].navClass}`}>
          <div className={`flex flex-col gap-2 border-b pb-3 mb-1 ${sidebarStyles[sidebarTheme].borderClass}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                ESTARR ECOSYSTEM
              </span>
              <span className="text-[9px] font-mono text-purple-600 bg-purple-50/80 border border-purple-100/30 px-2 py-0.5 rounded-full font-black">
                13 MODULES
              </span>
            </div>
            
            {/* Theme Swatches Picker removed since it can be controlled from the admin panel */}
          </div>

          {[
            {
              title: "Core Hub & Insights",
              items: [
                { id: "home", label: "Home", desc: "Editorial ecosystem overview", icon: Home },
                { id: "academy", label: "Work Certification", desc: "Professional playbooks & licenses", icon: Award },
                { id: "portfolio", label: "Professional Portfolio", desc: "Showcase skills & projects", icon: Briefcase },
              ]
            },
            {
              title: "Escrow & Professional Trade",
              items: [
                { id: "projects", label: "Escrow Hub", desc: "Paid milestones & escrow", icon: CheckSquare },
                { id: "careers", label: "Jobs Board", desc: "Full-time & freelance opportunities", icon: Compass },
                { id: "gigs", label: "Gigs", desc: "Escrow gig market", icon: Laptop },
                { id: "marketplace", label: "Brand Campaigns", desc: "Exclusive high-ticket sponsorships", icon: ShoppingCart },
              ]
            },
            {
              title: "Network & Social",
              items: [
                { id: "connect", label: "Connect", desc: "Professional network & peers", icon: Users },
                { id: "community", label: "Community", desc: "Cohorts & discussion boards", icon: Heart },
                { id: "events", label: "Events", desc: "Live streams & ticketing", icon: Calendar },
              ]
            },
            {
              title: "Fintech & App Utilities",
              items: [
                { id: "payments", label: "Payments", desc: "Digital wallets & transfers", icon: CreditCard },
                { id: "rewards", label: "Ambassadors", desc: "Earn Points & Rewards", icon: Gift }
              ]
            },
            ...(isAdmin ? [{
              title: "Admin Controls",
              items: [
                { id: "admin", label: "Admin Dashboard", desc: "System settings & metrics", icon: ShieldCheck }
              ]
            }] : [])
          ].map((section) => {
            const isCollapsed = collapsedNavSections[section.title];
            const hasActiveItem = section.items.some(item => item.id === activeTab);
            
            return (
              <div key={section.title} className="flex flex-col gap-1.5">
                {/* Section Header Toggle */}
                <div 
                  onClick={() => toggleNavSection(section.title)}
                  className={`flex items-center justify-between text-[10px] font-mono font-bold hover:opacity-80 tracking-wider cursor-pointer uppercase py-1 select-none transition-colors group ${sidebarStyles[sidebarTheme].sectionHeaderClass}`}
                >
                  <span className="flex items-center gap-1.5">
                    {hasActiveItem && (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    )}
                    {section.title}
                  </span>
                  <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="text-[8px] font-normal">({section.items.length})</span>
                    {isCollapsed ? (
                      <ChevronRight className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </div>

                {/* Section Items container */}
                {!isCollapsed && (
                  <div className={`flex flex-col gap-1 pl-1 border-l ${sidebarStyles[sidebarTheme].borderClass}`}>
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      const isPublic = ["home", "about", "how-it-works", "teams"].includes(item.id);
                      const isLocked = !isAuthenticated && !isPublic;
                      return (
                        <button
                          key={item.id}
                          id={`btn-nav-tab-${item.id}`}
                          onClick={() => {
                            if (isLocked) {
                              setAuthMode("signup");
                              setShowAuthModal(true);
                            } else {
                              setActiveTab(item.id as any);
                            }
                          }}
                          className={`w-full text-left p-2 transition-all duration-200 cursor-pointer rounded-xl border relative ${
                            isActive
                              ? sidebarStyles[sidebarTheme].activeItemClass
                              : sidebarStyles[sidebarTheme].inactiveItemClass
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Icon className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${isActive ? "text-white" : "text-slate-500"}`} />
                            <div className="flex-1 min-w-0 pr-4">
                              <span className="text-xs font-bold uppercase tracking-tight flex items-center gap-1.5 leading-tight">
                                {item.label}
                              </span>
                              <span className={`text-[9px] block leading-tight mt-0.5 font-medium transition-colors truncate ${isActive ? sidebarStyles[sidebarTheme].activeDescClass : sidebarStyles[sidebarTheme].descClass}`}>
                                {item.desc}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>)}

        {/* Dynamic Workspace Panel */}
        <main className={`${isSidebarHidden ? "lg:col-span-12" : "lg:col-span-9"} flex flex-col gap-6 min-h-[500px]`}>
          {activeTab === "home" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              {/* Main Hero Area */}
              <div className="grid grid-cols-1 lg:grid-cols-12 border border-slate-200 bg-slate-50 shadow-sm hover:shadow-md transition-shadow rounded-xl">
                {/* Hero Left: Typography Focus */}
<div className="lg:col-span-7 p-6 md:p-10 flex flex-col border-b lg:border-b-0 lg:border-r-2 border-slate-200 bg-white rounded-xl relative overflow-hidden min-h-[420px]">
                  {/* Background Video Loop with Tech Grid & Glow Fallbacks */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />
                  <video
                    ref={heroVideoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onPause={(e) => {
                      e.currentTarget.play().catch(() => {});
                    }}
                    onEnded={(e) => {
                      e.currentTarget.play().catch(() => {});
                    }}
                    className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-25 transition-opacity duration-1000"
                  >
                    <source
                      src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-nodes-connecting-in-space-32599-large.mp4"
                      type="video/mp4"
                    />
                    <source
                      src="https://vjs.zencdn.net/v/oceans.mp4"
                      type="video/mp4"
                    />
                  </video>
                  {/* Gradient Overlay for Premium Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-white/50 to-transparent z-0 pointer-events-none" />

                  {/* Decorative Abstract Shapes */}
                  <div className="absolute right-8 top-8 text-purple-400/60 pointer-events-none rotate-12 z-0">
                    <svg width="160" height="160" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                      <circle cx="50" cy="50" r="40" strokeDasharray="8 8" />
                    </svg>
                  </div>
                  <div className="absolute right-12 bottom-12 text-blue-400/10 pointer-events-none rotate-[25deg] z-0">
                    <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                      <path d="M 50 10 V 90 M 10 50 H 90" />
                    </svg>
                  </div>
                  <div className="absolute left-8 bottom-8 text-rose-400/10 pointer-events-none -rotate-[20deg] z-0">
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
                      <polygon points="50,10 90,90 10,90" />
                    </svg>
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div>
                      <span className="px-3 py-1 bg-purple-600 text-white border border-transparent rounded-full text-[10px] font-bold tracking-wide mb-8 inline-block uppercase shadow-sm hover:shadow-md transition-all">
                        Elite Talent Network
                      </span>
                      <h1 className="text-5xl md:text-6xl lg:text-7xl leading-none font-bold tracking-tight mb-4 text-slate-900">
                        Top 3%<br />
                        <span className="text-purple-500 relative inline-block">
                          Talent Pool
                          <div className="absolute -left-4 -bottom-2 text-rose-300/10 pointer-events-none -rotate-[15deg] -z-10 mix-blend-multiply hidden md:block">
                            <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
                              <polygon points="50,10 90,90 10,90" />
                            </svg>
                          </div>
                        </span>.
                      </h1>
                    </div>
                    
                    <div className="mt-4 max-w-md font-sans">
                      <p className="text-lg md:text-xl leading-relaxed text-slate-600 font-medium">
                        Build your verified remote portfolio, match with premium global contracts, and coordinate under strict milestone escrows.
                      </p>
                    </div>

                    <div className="mt-auto pt-8">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                        <div>
                          <p className="text-2xl font-black text-slate-900 tracking-tighter">Elite 3%</p>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1 font-mono">Global Vetting</p>
                        </div>
                        <div>
                          <p className="text-2xl font-black text-slate-900 tracking-tighter">100%</p>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1 font-mono">Escrow Secured</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-2xl font-black text-purple-500 tracking-tighter">Zero-Risk</p>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1 font-mono">Contracting</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hero Right: Featured & AI */}
                <div className="lg:col-span-5 flex flex-col rounded-xl">
                  {/* Stream */}
                  <div className="flex-1 p-6 md:p-8 bg-[#FDFDF9] border border-[#EFEBE3] text-slate-900 shadow-sm flex flex-col justify-between min-h-[220px] rounded-xl">
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-[13px] uppercase tracking-wide font-bold text-[#b441f7]">{translations[globalLanguage].activeEscrow}</h2>
                        <span className="text-[11px] bg-[#f4e6ff] text-[#911fdf] px-3.5 py-1.5 rounded-full font-bold">
                          {translations[globalLanguage].secure}
                        </span>
                      </div>
                      <div className="space-y-0">
                        {(tasks && tasks.length > 0 ? tasks : homeDemoTasks).slice(0, 3).map((task, index) => {
                          // Parse budget and client
                          let budget = formatCurrency(150000);
                          let client = task.assignee || "Client";
                          if (task.desc.includes("||")) {
                            const parts = task.desc.split("||");
                            if (parts.length >= 2) {
                              budget = formatCurrency(parts[0].trim());
                              client = parts[1].trim();
                            }
                          } else {
                            if (task.id === "t1") budget = formatCurrency(250000);
                            else if (task.id === "t2") budget = formatCurrency(180000);
                            else if (task.id === "t3") budget = formatCurrency(120000);
                          }
                          let percentage = 8;
                          let statusText = "LOCKED";
                          let statusColor = "text-[#b441f7]";
                          let borderColor = "via-amber-400";
                          let strokeColor = "stroke-amber-500";

                          if (task.status === "inprogress") {
                            percentage = 67;
                            statusText = "IN PROGRESS";
                            statusColor = "text-[#b441f7]";
                            borderColor = "via-[#b441f7]";
                            strokeColor = "stroke-[#b441f7]";
                          } else if (task.status === "review") {
                            percentage = 92;
                            statusText = "IN REVIEW";
                            statusColor = "text-[#03a96b]";
                            borderColor = "via-amber-300"; // Based on screenshot
                            strokeColor = "stroke-[#03a96b]";
                          } else if (task.status === "done") {
                            percentage = 100;
                            statusText = "RELEASED";
                            statusColor = "text-blue-600";
                            borderColor = "via-blue-400";
                            strokeColor = "stroke-blue-500";
                          }
                          
                          if (index === 0) {
                             borderColor = "via-[#b441f7]";
                             strokeColor = "stroke-[#b441f7]";
                          } else if (index === 1) {
                             borderColor = "via-amber-300";
                             strokeColor = "stroke-amber-500";
                             statusColor = "text-[#b441f7]";
                          } else {
                             borderColor = "via-amber-300";
                             strokeColor = "stroke-[#03a96b]";
                             statusColor = "text-[#03a96b]";
                          }

                          // SVG parameters for 40px circular indicator
                          const size = 44;
                          const strokeWidth = 4;
                          const center = size / 2;
                          const radius = center - strokeWidth;
                          const circumference = 2 * Math.PI * radius;
                          const strokeDashoffset = circumference - (percentage / 100) * circumference;

                          const isDueSoon = task.dueDate && task.status !== "done" ? (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60) <= 48 : false;
                          const categoryColors: Record<string, string> = {
                            marketing: "bg-pink-100 text-[#d61c77]",
                            dev: "bg-cyan-100 text-[#099abf]",
                            design: "bg-[#f4e6ff] text-[#911fdf]",
                          };
                          const defaultCatColor = "bg-slate-100 text-slate-500";
                          const categoryClass = task.category ? categoryColors[task.category] || defaultCatColor : "";


                          return (
                            <React.Fragment key={task.id}>
                              <div 
                                onClick={() => {
                                  if (!isAuthenticated) {
                                    setAuthMode("signup");
                                    setShowAuthModal(true);
                                  } else {
                                    setActiveTab("projects");
                                  }
                                }} 
                                className={`group cursor-pointer p-5 -mx-5 rounded-2xl hover:bg-white/50 transition-all duration-300 flex justify-between items-center gap-4`}
                              >
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-[17px] font-bold italic tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                                    {task.title}
                                  </h3>
                                  <div className="mt-3 flex items-center gap-3">
                                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest shrink-0 ${statusColor}`}>
                                      {statusText}
                                    </span>
                                    
                                    {task.category && (
                                      <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full ${categoryClass}`}>
                                        {task.category}
                                      </span>
                                    )}

                                    {isDueSoon && (
                                      <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#f93e6c] bg-[#ffe4ec] px-2.5 py-1 rounded-full">
                                        <Clock className="w-3 h-3" /> Due Soon
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                  {/* Quick Cycle Button */}
                                  <button 
                                    onClick={(e) => cycleTaskStatus(e, task.id, task.status)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-[#9ca3af] hover:text-[#6b7280] transition-colors border border-transparent"
                                    title="Cycle Status"
                                  >
                                    <FastForward className="w-4 h-4" />
                                  </button>
                                  
                                  {/* Circular Progress Indicator */}
                                  <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
                                    <svg width={size} height={size} className="transform -rotate-90">
                                      {/* Background Track */}
                                      <circle
                                        cx={center}
                                        cy={center}
                                        r={radius}
                                        className="stroke-[#EFEBE3] fill-none"
                                        strokeWidth={strokeWidth}
                                      />
                                      {/* Animated Progress Circle */}
                                      <circle
                                        cx={center}
                                        cy={center}
                                        r={radius}
                                        className={`fill-none transition-all duration-500 ${strokeColor}`}
                                        strokeWidth={strokeWidth}
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                      />
                                    </svg>
                                    <span className="absolute text-[10px] font-bold text-slate-900 tracking-tighter">
                                      {percentage}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {index < 2 && (
                                <div className={`h-[2px] w-full bg-gradient-to-r from-transparent ${borderColor} to-transparent opacity-40`} />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* AI Quick Copilot card */}
                  <div className="bg-purple-600 p-6 text-white border-t border-slate-800 relative flex flex-col justify-between rounded-xl">
                    <div>
                      <div className="text-[9px] font-semibold tracking-wide text-purple-200 mb-1">{translations[globalLanguage].intelligence}</div>
                      <p className="font-bold text-xs leading-tight mb-4 text-white">
                        "I've analyzed your portfolio. You are 12% away from qualifying for 'Senior Content Creator' roles in the Jobs Board."
                      </p>
                    </div>
                    <button 
                      onClick={() => handleOpenAi("Help me close the 12% gap to qualify as a Senior Content Creator in the Jobs Board.", "general")}
                      className="flex justify-between items-center w-full bg-slate-950 hover:bg-slate-800 text-white p-2.5 border border-slate-800 transition-all cursor-pointer font-bold text-[10px] uppercase tracking-wider rounded-xl"
                    >
                      <span>{translations[globalLanguage].askAi}</span>
                      <span className="w-5 h-5 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold">?</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Grid */}
              <ServicesCarousel
                onSelect={(tabId) => {
                  if (!isAuthenticated) {
                    setAuthMode("signup");
                    setShowAuthModal(true);
                  } else {
                    setActiveTab(tabId);
                  }
                }}
              />
              
                            <HomeMarketing 
                onStartEarning={() => {
                  setActiveTab("home");
                  if (!isAuthenticated) {
                    setAuthMode("signup");
                    setShowAuthModal(true);
                  }
                }} 
                onStartCollabing={() => {
                  setActiveTab("projects");
                  if (!isAuthenticated) {
                    setAuthMode("signup");
                    setShowAuthModal(true);
                  }
                }}
              />
            </div>
          )}

          {activeTab === "connect" && (
            <ConnectSection
              userProfile={userProfile}
              posts={posts}
              onUpdatePosts={handleUpdatePosts}
              onUpdateProfile={handleUpdateProfile}
              initialSubTab={connectSubTab}
            />
          )}

          {activeTab === "academy" && (
            <AcademySection
              userProfile={userProfile}
              courses={courses}
              onUpdateCourses={handleUpdateCourses}
              onUpdateProfile={handleUpdateProfile}
              onOpenAiChat={handleOpenAi}
            />
          )}

          {activeTab === "marketplace" && (
            <MarketplaceSection
              userProfile={userProfile}
              products={products}
              onUpdateProducts={handleUpdateProducts}
              onOpenAiChat={handleOpenAi}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsSection
              userProfile={userProfile}
              tasks={tasks}
              onUpdateTasks={handleUpdateTasks}
              onOpenAiChat={handleOpenAi}
              onNavigate={setActiveTab}
              campaigns={campaigns}
            />
          )}

          {activeTab === "gigs" && (
            <GigsSection
              userProfile={userProfile}
              onOpenAiChat={handleOpenAi}
            />
          )}

          {activeTab === "payments" && (
            <PaymentsSection isNewAccount={isAuthenticated && userProfile.email?.toLowerCase().trim() !== "chinedu@estarrapp.com"} />
          )}

          {activeTab === "events" && (
            <EventsSection />
          )}

          {activeTab === "portfolio" && (
            <PortfolioSection userProfile={userProfile} />
          )}

          {activeTab === "community" && (
            <CommunitySection
              userProfile={userProfile}
              channels={channels}
              onUpdateChannels={handleUpdateChannels}
            />
          )}


          {activeTab === "rewards" && (
            <RewardsSection />
          )}

          {activeTab === "admin" && isAdmin && (
            <AdminSection
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              sidebarTheme={sidebarTheme}
              setSidebarTheme={setSidebarTheme}
              userProfile={userProfile}
            />
          )}

          {activeTab === "about" && <AboutSection />}
          {activeTab === "teams" && <TeamsSection />}
          {activeTab === "careers" && <JobsSection userProfile={userProfile} jobs={jobs} onUpdateJobs={handleUpdateJobs} onUpdateProfile={handleUpdateProfile} />}
          {activeTab === "how-it-works" && <HowItWorksSection />}
        </main>
      </div>

      {/* Notifications Drawer */}
      <NotificationsDrawer isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      
      {/* Profile Config Settings Drawer */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-end z-50">
          <form
            onSubmit={handleSaveProfile}
            className="bg-slate-50 max-w-md w-full h-full p-6 md:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto border-l-4 border-slate-200 rounded-xl"
          >
            <div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-slate-200">
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                  <Settings className="w-5 h-5 text-purple-500" /> Configure ESTARR Profile
                </h3>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(false)}
                  className="bg-white hover:bg-slate-100 text-slate-900 p-2 border border-slate-200 cursor-pointer rounded-xl"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-4 text-xs">
                {/* Photo Uploader */}
                <div className="flex flex-col gap-2.5 items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <label className="font-bold uppercase tracking-wider text-slate-900 text-[10px] w-full text-left">Profile Photo</label>
                  
                  {/* Clickable Avatar Preview Frame */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative group cursor-pointer transition-all hover:scale-105 active:scale-95"
                    title="Click to upload profile photo"
                  >
                    <img 
                      src={editAvatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"} 
                      alt="avatar preview" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-md group-hover:border-purple-300 transition-colors"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <span className="text-[10px] text-white font-bold uppercase tracking-wider">Change</span>
                      <span className="text-[8px] text-purple-200 font-medium">Click to select</span>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditAvatar(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="text-[10px] text-slate-500 file:mr-3 file:py-1 file:px-2.5 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer w-full mt-1"
                  />
                  <span className="text-[9px] text-slate-400 text-center leading-normal">
                    Supported formats: JPG, PNG, WEBP. Your new photo will be instantly visible across all sections, including Connect.
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold uppercase tracking-wider text-slate-900 text-[10px]">Profession / Title</label>
                  <input
                    type="text"
                    required
                    value={editProfession}
                    onChange={(e) => setEditProfession(e.target.value)}
                    className="bg-white border border-slate-200 px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-slate-100 rounded-xl font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold uppercase tracking-wider text-slate-900 text-[10px]">Bio Summary</label>
                  <textarea
                    required
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    className="bg-white border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:bg-slate-100 rounded-xl font-medium min-h-[80px]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold uppercase tracking-wider text-slate-900 text-[10px]">My Skills Showcase (Comma separated)</label>
                  <input
                    type="text"
                    value={editSkills}
                    onChange={(e) => setEditSkills(e.target.value)}
                    className="bg-white border border-slate-200 px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-slate-100 rounded-xl font-medium"
                  />
                  <span className="text-[9px] text-slate-500">Add skills like: Canva, Video Editing, Poultry Farming to optimize gig matching results.</span>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold uppercase tracking-wider text-slate-900 text-[10px]">My Birthdate *</label>
                  <input
                    type="date"
                    required
                    value={editBirthdate}
                    onChange={(e) => setEditBirthdate(e.target.value)}
                    className="bg-white border border-slate-200 px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-slate-100 rounded-xl font-medium"
                  />
                  <span className="text-[9px] text-slate-500">Important for birthday celebrations on Connect!</span>
                </div>
              </div>
            </div>

            <button
              id="btn-profile-save-submit"
              type="submit"
              className="w-full bg-slate-950 hover:bg-gradient-to-r hover:from-violet-600 hover:via-indigo-500 hover:to-emerald-500 text-white py-3.5 rounded-xl font-semibold tracking-wide cursor-pointer transition-all shadow-sm"
            >
              Save Configurations
            </button>
          </form>
        </div>
      )}

      {/* Floating Persistant AI trigger button (mobile layout helper) */}
      <button
        id="btn-ai-float"
        onClick={() => handleOpenAi("", "general")}
        className="fixed bottom-12 right-12 bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-500 text-white p-4 rounded-full shadow-sm hover:shadow-md transition-shadow border border-slate-200 hover:opacity-95 transition-all cursor-pointer z-40 flex items-center justify-center animate-bounce"
      >
        <Sparkles className="w-5 h-5" />
      </button>

      {/* AI Drawer assistant */}
      <ChatDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        initialPrompt={aiPrompt}
        initialContext={aiContext}
      />

      {/* Tiny clean footer */}
      <footer className="bg-slate-950 text-white py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 text-[10px] font-mono tracking-widest uppercase">
            <button onClick={() => setActiveTab("about")} className="hover:text-indigo-400 transition-colors uppercase cursor-pointer">About Us</button>
            <button onClick={() => setActiveTab("how-it-works")} className="hover:text-indigo-400 transition-colors uppercase cursor-pointer">How It Works</button>
            <button onClick={() => setActiveTab("teams")} className="hover:text-indigo-400 transition-colors uppercase cursor-pointer">Teams</button>
            <button onClick={() => setActiveTab("careers")} className="hover:text-indigo-400 transition-colors uppercase cursor-pointer">Jobs</button>
          </div>
          <div className="text-[10px] text-center md:text-right font-mono tracking-widest uppercase opacity-50">
            ESTARR • SSLABS 2026 ALL RIGHTS RESERVED • 100% OFF-CHAIN SECURED ECOSYSTEM
          </div>
        </div>
      </footer>
    </div>
  );
}
