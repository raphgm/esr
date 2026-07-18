import React, { useState, useRef } from "react";
import { VettingProtocolModal } from './components/VettingProtocolModal';

import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { UserProfile, Course, Product, BrandCampaign, ConsultancyTask, Job, 
ActivityPost, CommunityChannel } from "./types";
import {
  initialProfile,
  initialPosts,
  initialCourses,
  initialProducts,
  initialCampaigns,
  initialJobs,
  initialChannels
} from "./mockData";
import { auth, getUserProfile, saveUserProfile, getCollectionData, saveCollectionItem, deleteCollectionItem, subscribeToGlobalConfig, saveGlobalConfig } from "./lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";

// Components
import ConnectSection from "./components/ConnectSection";
import { AILabSection } from "./components/AILabSection";
import PortfolioSection from "./components/PortfolioSection";
import MarketplaceSection from "./components/MarketplaceSection";
import ConsultancySection, { parseTaskDetails } from "./components/ConsultancySection";
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
import { 
  DecentralizedEscrowsSection, 
  ProgramGuidelinesSection, 
  EscrowFaqsSection, 
  ContractorDirectorySection, 
  PlatformStatusSection, 
  TermsConditionsSection, 
  PrivacyCookiesSection, 
  DataCollectionPolicySection, 
  ComplianceAuditsSection 
} from "./components/LegalAndResourceSections";
import { RewardsSection } from "./components/RewardsSection";
import { IntegrationsSection } from "./components/IntegrationsSection";
import { HelpGuideSection } from "./components/HelpGuideSection";
import { NotificationsDrawer } from "./components/NotificationsDrawer";
import { BackgroundDoodles } from "./components/BackgroundDoodles";
import { AdminSection } from "./components/AdminSection";
import { UserDashboard } from "./components/UserDashboard";
import { AnnotationWorkspace } from "./components/AnnotationWorkspace";
import MvpLandingPage from "./components/MvpLandingPage";
import { AIVettingCenter } from "./components/AIVettingCenter";

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
  Globe,
  Cpu,
  
  Target, Activity, BrainCircuit, Square, Check, Sun, Moon, Monitor
} from "lucide-react";

const initialTasks: ConsultancyTask[] = [];

const homeDemoTasks: ConsultancyTask[] = [];

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
    heroSubtitle: "Top 3% African Remote Gigs & Talent Pool",
    allInOne: "Elite Remote Gigs & AI Talent Ecosystem",
    askAi: "ASK AI CO-PILOT",
    intelligence: "ESTARR Intelligence",
    configureProfile: "Configure Profile",
    noActiveConsultancy: "No active consultancy",
    seedDemo: "Seed Demo Infrastructure",
    createFirst: "Start First Consultancy"
  },
  ES: {
    heroTitle: "ESTARR",
    heroSubtitle: "Hub de Comercio para Creadores y Pros de TI",
    activeEscrow: "Canal de Escrow Activo",
    secure: "Seguro",
    allInOne: "Protección de Escrow y Ecosistema de Talento IA",
    askAi: "PREGUNTAR AL CO-PILOTO IA",
    intelligence: "Inteligencia ESTARR",
    configureProfile: "Configurar Perfil",
    noActiveConsultancy: "Sin consultoría activa",
    seedDemo: "Sembrar Contratos de Demostración",
    createFirst: "Iniciar Primera Consultoría"
  },
  FR: {
    heroTitle: "ESTARR",
    heroSubtitle: "Hub de Commerce pour Créateurs & Pros de l'IT",
    activeEscrow: "Pipeline d'Escrow Actif",
    secure: "Sécurisé",
    allInOne: "Protection d'Escrow & Écosystème de Talent IA",
    askAi: "DEMANDER AU CO-PILOTE IA",
    intelligence: "Intelligence ESTARR",
    configureProfile: "Configurer le Profil",
    noActiveConsultancy: "Aucune consultation active",
    seedDemo: "Générer les Contrats Démo",
    createFirst: "Lancer la Première Consultation"
  },
  SW: {
    heroTitle: "ESTARR",
    heroSubtitle: "Kitovu cha Biashara cha IT Pro na Muumba",
    activeEscrow: "Mfumo Amilifu wa Escrow",
    secure: "Salama",
    allInOne: "Ulinzi wa Escrow na Ekolojia ya Talent ya AI",
    askAi: "ULIZA MSAIDIZI WA AI",
    intelligence: "Akili ya ESTARR",
    configureProfile: "Sanidi Wasifu",
    noActiveConsultancy: "Hakuna ushauri amilifu",
    seedDemo: "Weka Mikataba ya Demo",
    createFirst: "Anza Ushauri wa Kwanza"
  },
  HI: {
    heroTitle: "ESTARR",
    heroSubtitle: "आईटी प्रो और क्रिएटर ट्रेड हब",
    activeEscrow: "सक्रिय एस्क्रो पाइपलाइन",
    secure: "सुरक्षित",
    allInOne: "एस्क्रो सुरक्षा और एआई टैलेंट इकोसिस्टम",
    askAi: "एआई को-पायलट से पूछें",
    intelligence: "ESTARR इंटेलिजेंस",
    configureProfile: "प्रोफ़ाइल कॉन्फ़िगर करें",
    noActiveConsultancy: "कोई सक्रिय परियोजना नहीं",
    seedDemo: "डेमो अनुबंध लोड करें",
    createFirst: "पहली परामर्श सेवा शुरू करें"
  }
};

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showVettingModal, setShowVettingModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authEmail, setAuthEmail] = useState("chinedu@estarrapp.com");
  const [authPassword, setAuthPassword] = useState("password123");
  const [authName, setAuthName] = useState("Chinedu Okafor");
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [authBirthdate, setAuthBirthdate] = useState("");
  const [authAccountType, setAuthAccountType] = useState<"independent" | "jobOwner">("independent");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [applyingAs, setApplyingAs] = useState("Developer");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [staySignedIn24h, setStaySignedIn24h] = useState(true);
  const [fastTrackVetting, setFastTrackVetting] = useState(true);

  // Global Settings States
  const [globalCurrency, setGlobalCurrency] = useState<"USD" | "EUR" | "GBP" | "NGN" | "KES" | "INR">("USD");
  const [globalLanguage, setGlobalLanguage] = useState<"EN" | "ES" | "FR" | "SW" | "HI">("EN");
  const [isGlobalDropdownOpen, setIsGlobalDropdownOpen] = useState(false);

  const [isConsultancyDropdownOpen, setIsConsultancyDropdownOpen] = useState(false);

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
    "home" | "connect" | "ai-lab" | "ai-vetting" | "marketplace" | "consultancy" | "gigs" | "ai-jobs" | "community" | "mobile" | "teams" | "careers" | "about" | "how-it-works" | "payments" | "events" | "admin" | "portfolio" | "rewards" | "integrations" | "annotation-workspace" | "help-docs" |
    "decentralized-escrows" | "program-guidelines" | "escrow-faqs" | "contractor-directory" | "platform-status" | "terms-conditions" | "privacy-cookies" | "data-collection" | "compliance-audits"
  >(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("survey")) return "ai-lab";
    return "home";
  });

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
  const [connectSubTab, setConnectSubTab] = useState<"feed" | "directory" | "mentorship">("feed");

  const [collapsedNavSections, setCollapsedNavSections] = useState<Record<string, boolean>>({
    "Core Hub & Insights": false,
    "Escrow & Professional Talent": false,
    "Network & Social": false,
    "Fintech & App Utilities": false,
    "Admin Controls": false,
  });

  const [sidebarTheme, setSidebarTheme] = useState<"white" | "ivory" | "slate" | "indigo" | "emerald" | "amber">("ivory");

  React.useEffect(() => {
    const unsubscribe = subscribeToGlobalConfig("theme", (data: any) => {
      if (data && data.sidebarTheme) {
        setSidebarTheme(data.sidebarTheme);
      }
    });
    return () => unsubscribe();
  }, []);

  const updateSidebarTheme = (theme: "white" | "ivory" | "slate" | "indigo" | "emerald" | "amber") => {
    saveGlobalConfig("theme", { sidebarTheme: theme });
    if (userProfile) {
      handleUpdateProfile({ ...userProfile, sidebarTheme: theme });
    }
  };

  const sidebarStyles = {
    white: {
      navClass: "bg-white border border-slate-200 text-slate-800",
      borderClass: "border-slate-150",
      sectionHeaderClass: "text-slate-400 font-bold tracking-[0.2em] uppercase text-[9px]",
      inactiveItemClass: "text-slate-600 hover:bg-slate-50 border-transparent hover:text-slate-900",
      activeItemClass: "bg-slate-50 border-slate-200 text-slate-900 font-bold shadow-sm",
      descClass: "text-slate-400",
      activeDescClass: "text-slate-500",
      inactiveIconClass: "text-slate-400",
      activeIconClass: "text-slate-900"
    },
    ivory: {
      navClass: "bg-[#FAF9F5] border border-[#EFECE6] text-slate-900 shadow-md",
      borderClass: "border-[#EFECE6]/80",
      sectionHeaderClass: "text-[#475569] font-bold tracking-[0.15em] uppercase text-[10px]",
      inactiveItemClass: "text-[#334155] hover:bg-black/5 border-transparent hover:text-slate-900",
      activeItemClass: "bg-[#7E22CE] text-white font-bold shadow-md",
      descClass: "text-slate-500",
      activeDescClass: "text-white/80",
      inactiveIconClass: "text-slate-600",
      activeIconClass: "text-white"
    },
    slate: {
      navClass: "bg-slate-950 border border-slate-800 text-slate-300",
      borderClass: "border-slate-800/60",
      sectionHeaderClass: "text-slate-500 font-bold tracking-[0.2em] uppercase text-[9px]",
      inactiveItemClass: "text-slate-400 hover:bg-slate-900/50 border-transparent hover:text-slate-200",
      activeItemClass: "bg-slate-900 border-slate-800 text-slate-100 font-bold",
      descClass: "text-slate-500",
      activeDescClass: "text-slate-400",
      inactiveIconClass: "text-slate-500",
      activeIconClass: "text-slate-200"
    },
    indigo: {
      navClass: "bg-[#0B0F19] border border-[#1E293B] text-slate-300",
      borderClass: "border-[#1E293B]/60",
      sectionHeaderClass: "text-indigo-400/60 font-bold tracking-[0.2em] uppercase text-[9px]",
      inactiveItemClass: "text-slate-400 hover:bg-[#111827] border-transparent hover:text-indigo-100",
      activeItemClass: "bg-[#1E293B] border-[#334155] text-indigo-100 font-bold",
      descClass: "text-slate-500",
      activeDescClass: "text-indigo-300",
      inactiveIconClass: "text-slate-500",
      activeIconClass: "text-indigo-400"
    },
    emerald: {
      navClass: "bg-emerald-950 border border-emerald-900 text-emerald-200",
      borderClass: "border-emerald-800/60",
      sectionHeaderClass: "text-emerald-500 font-bold tracking-[0.2em] uppercase text-[9px]",
      inactiveItemClass: "text-emerald-400 hover:bg-emerald-900/50 border-transparent hover:text-emerald-100",
      activeItemClass: "bg-emerald-900 border-emerald-800 text-emerald-100 font-bold",
      descClass: "text-emerald-600",
      activeDescClass: "text-emerald-400",
      inactiveIconClass: "text-emerald-600",
      activeIconClass: "text-emerald-300"
    },
    amber: {
      navClass: "bg-[#18181B] border border-[#27272A] text-slate-300",
      borderClass: "border-[#27272A]/60",
      sectionHeaderClass: "text-amber-600 font-bold tracking-[0.2em] uppercase text-[9px]",
      inactiveItemClass: "text-slate-400 hover:bg-[#27272A]/50 border-transparent hover:text-amber-100",
      activeItemClass: "bg-[#27272A] border-[#3F3F46] text-amber-400 font-bold",
      descClass: "text-slate-500",
      activeDescClass: "text-amber-500",
      inactiveIconClass: "text-slate-500",
      activeIconClass: "text-amber-400"
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

  // Apply theme class to document element on theme change
  React.useEffect(() => {
    const applyTheme = () => {
      const selectedTheme = userProfile.theme || "light";
      const root = document.documentElement;
      
      if (selectedTheme === "dark") {
        root.classList.add("dark");
      } else if (selectedTheme === "light") {
        root.classList.remove("dark");
      } else if (selectedTheme === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isDark) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };

    applyTheme();

    if (userProfile.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleMediaChange = () => applyTheme();
      mediaQuery.addEventListener("change", handleMediaChange);
      return () => mediaQuery.removeEventListener("change", handleMediaChange);
    }
  }, [userProfile.theme]);
  const [posts, setPosts] = useState<
ActivityPost[]>(initialPosts);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [campaigns, setCampaigns] = useState<BrandCampaign[]>(initialCampaigns);
  const [tasks, setTasks] = useState<ConsultancyTask[]>(initialTasks);
  const tasksRef = useRef<ConsultancyTask[]>(initialTasks);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const jobsRef = useRef<Job[]>(initialJobs);
  const [channels, setChannels] = useState<CommunityChannel[]>(initialChannels);

  const totalEscrowLocked = tasks.filter(t => t.status === "inprogress" || t.status === "review").reduce((sum, t) => sum + parseTaskDetails(t).budget, 0);

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
      // Validate origin if possible, but '*' is used in server res.send
      if (event.data?.type === "OAUTH_AUTH_SUCCESS") {
        const { provider, user: oauthUser } = event.data;
        
        if (provider === "linkedin" || provider === "github") {
          // For this environment, we simulate authentication by updating local state
          // and optionally saving a placeholder profile if needed.
          const email = oauthUser?.email || `${provider}_user@estarrapp.com`;
          const name = oauthUser?.name || oauthUser?.login || "OAuth User";
          
          const updatedProfile = {
            ...userProfile,
            name: name,
            email: email,
            avatar: oauthUser?.picture || oauthUser?.avatar_url || userProfile.avatar,
            profession: `${provider === "linkedin" ? "LinkedIn" : "GitHub"} Verified Professional`,
            accountType: "independent" as const
          };
          
                    setUserProfile(updatedProfile);
          setIsAuthenticated(true);
          setShowAuthModal(false);
          if (authAccountType === "independent" && authMode === "signup") {
            setShowVettingModal(true);
          }
          setIsAuthLoading(false);
          
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [userProfile]);

  // Firestore Syncing Wrappers
  const handleUpdateProfile = async (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    if (auth.currentUser) {
      await saveUserProfile(auth.currentUser.uid, updatedProfile);
    }
  };

  const safeStringify = (obj: any) => {
    const cache = new Set();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          return;
        }
        cache.add(value);
      }
      return value;
    });
  };

  const handleUpdatePosts = async (updatedPosts: 
ActivityPost[]) => {
    setPosts(updatedPosts);
    // Sync added/updated items
    const currentMap = new Map(posts.map(item => [item.id, item]));
    for (const newItem of updatedPosts) {
      const existing = currentMap.get(newItem.id);
      if (!existing || safeStringify(existing) !== safeStringify(newItem)) {
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
      if (!existing || safeStringify(existing) !== safeStringify(newItem)) {
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
      if (!existing || safeStringify(existing) !== safeStringify(newItem)) {
        await saveCollectionItem("products", newItem);
      }
    }
    for (const oldItem of products) {
      if (!updatedProducts.some(item => item.id === oldItem.id)) {
        await deleteCollectionItem("products", oldItem.id);
      }
    }
  };

  const handleUpdateTasks = async (updatedTasks: ConsultancyTask[]) => {
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
    const oldTasks = tasksRef.current;
    tasksRef.current = tasksToSave;

    const currentMap = new Map(oldTasks.map(item => [item.id, item]));
    for (const newItem of tasksToSave) {
      const existing = currentMap.get(newItem.id);
      if (!existing || safeStringify(existing) !== safeStringify(newItem)) {
        await saveCollectionItem("tasks", newItem);
      }
    }
    for (const oldItem of oldTasks) {
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
      if (!existing || safeStringify(existing) !== safeStringify(newItem)) {
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
    const oldJobs = jobsRef.current;
    jobsRef.current = updatedJobs;

    const currentMap = new Map(oldJobs.map(item => [item.id, item]));
    for (const newItem of updatedJobs) {
      const existing = currentMap.get(newItem.id);
      if (!existing || safeStringify(existing) !== safeStringify(newItem)) {
        await saveCollectionItem("jobs", newItem);
      }
    }
    for (const oldItem of oldJobs) {
      if (!updatedJobs.some(item => item.id === oldItem.id)) {
        await deleteCollectionItem("jobs", oldItem.id);
      }
    }
  };

  const cycleTaskStatus = (e: React.MouseEvent, taskId: string, currentStatus: string) => {
    e.stopPropagation();
    const statusFlow: Record<string, ConsultancyTask["status"]> = {
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
  const [editCerts, setEditCerts] = useState(userProfile.certifications?.join(", ") || "");
  const [editAvatar, setEditAvatar] = useState(userProfile.avatar || "");
  const [editTheme, setEditTheme] = useState<"light" | "dark" | "system">(userProfile.theme || "light");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync edit state with user profile whenever drawer opens or profile changes
  React.useEffect(() => {
    if (isProfileOpen) {
      setEditBio(userProfile.bio || "");
      setEditProfession(userProfile.profession || "");
      setEditSkills(userProfile.skills?.join(", ") || "");
      setEditBirthdate(userProfile.birthdate || "1998-07-06");
      setEditCerts(userProfile.certifications?.join(", ") || "");
      setEditAvatar(userProfile.avatar || "");
      setEditTheme(userProfile.theme || "light");
    }
  }, [isProfileOpen, userProfile]);

  // 24-hour Session Expiry Check
  React.useEffect(() => {
    const checkSessionExpiry = () => {
      const expiry = localStorage.getItem("estarr_session_expiry");
      if (expiry && isAuthenticated) {
        if (Date.now() > Number(expiry)) {
          console.log("24-hour session expired. Logging out...");
          firebaseSignOut(auth).then(() => {
            localStorage.removeItem("estarr_session_expiry");
            localStorage.removeItem("estarr_session_user");
            setActiveTab("home");
            alert("🔒 Your secure 24-hour session has expired. You have been automatically logged out for security.");
          }).catch(err => console.error("Error signing out after expiry:", err));
        }
      }
    };

    checkSessionExpiry();
    const interval = setInterval(checkSessionExpiry, 15000); // Check every 15 seconds
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Listen for Firebase auth state changes
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch custom user profile from Firestore or load fallback profile
        let profile = await getUserProfile(user.uid, user.email || undefined, user.displayName || undefined);
        
        // Fix: Reset wallet balance to 0 for accounts that got the old default balance or have the temporary $10 balance
        if (profile.walletBalance === 842500 || profile.walletBalance === 10) {
          profile = { ...profile, walletBalance: 0, history: [] };
          await saveUserProfile(user.uid, profile);
        }
        
        setUserProfile(profile);
        setSidebarTheme(profile.sidebarTheme || "ivory");
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
          const fetchedPosts = await getCollectionData<
ActivityPost>("posts", initialPosts);
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

          const fetchedTasks = await getCollectionData<ConsultancyTask>("tasks", []);
          tasksRef.current = fetchedTasks;
          
          // Cleanup mock tasks
          const mockTaskTitles = ["Distributed System Migration", "AI Agent Orchestration Pipeline", "Cloud Native Security Audit", "TikTok Meme Ad", "Instagram Reels", "UGC Styling"];
          const validTasks = fetchedTasks.filter(t => !mockTaskTitles.includes(t.title) && !t.id.startsWith("t"));
          fetchedTasks.forEach(async (t) => {
            if (mockTaskTitles.includes(t.title) || t.id.startsWith("t")) {
              try { await deleteCollectionItem("tasks", t.id); } catch(e) {}
            }
          });
          setTasks(validTasks);
          tasksRef.current = validTasks;

          const fetchedJobs = await getCollectionData<Job>("jobs", initialJobs);
          setJobs(fetchedJobs);
          jobsRef.current = fetchedJobs;

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
        tasksRef.current = initialTasks;
        setJobs(initialJobs);
        jobsRef.current = initialJobs;
        setChannels(initialChannels);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // ESTARR AI Drawer State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [showAiFloat, setShowAiFloat] = useState(true);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiContext, setAiContext] = useState("general");

  const handleOpenAi = (prompt: string, context: string) => {
    setAiPrompt(prompt);
    setAiContext(context);
    setIsAiOpen(true);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    const updatedProfile = {
      ...userProfile,
      bio: editBio,
      profession: editProfession,
      skills: editSkills.split(",").map(s => s.trim()).filter(Boolean),
      birthdate: editBirthdate,
      certifications: editCerts.split(",").map(c => c.trim()).filter(Boolean),
      avatar: editAvatar,
      theme: editTheme
    };
    setUserProfile(updatedProfile);
    
    // If authenticated, also save it in Firestore!
    if (auth.currentUser) {
      await saveUserProfile(auth.currentUser.uid, updatedProfile);
    }
    
    setSaveStatus('success');
    setTimeout(() => {
      setIsProfileOpen(false);
      setSaveStatus('idle');
    }, 1500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) return;

    if (authMode === "signup" && authAccountType === "independent" && authPassword !== authConfirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }

    setIsAuthLoading(true);
    setAuthError(null);
    try {
      if (authMode === "signin") {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, authEmail, authPassword);
          const email = userCredential.user.email?.toLowerCase();
          if (email === "rdgabmomoh@gmail.com" || email === "raphdafemomoh@gmail.com") {
             const profile = await getUserProfile(userCredential.user.uid);
             if (profile.accountType !== authAccountType) {
                 await saveUserProfile(userCredential.user.uid, { ...profile, accountType: authAccountType });
                 setUserProfile({ ...profile, accountType: authAccountType });
             }
          }
        } catch (signInErr: any) {
          // If the user doesn't exist (invalid-credential or user-not-found), automatically attempt registration as a seamless fallback
          if (signInErr.code === "auth/invalid-credential" || signInErr.code === "auth/user-not-found") {
            console.log("Account not found or invalid credentials on first sign in. Attempting seamless auto-registration fallback...");
            try {
              const userCredential = await createUserWithEmailAndPassword(auth, authEmail, authPassword);
              const user = userCredential.user;
              const isVettedNow = authAccountType === "independent" && fastTrackVetting;
              const vettedUntilDate = isVettedNow ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : "";

              await saveUserProfile(user.uid, {
                name: authName || authEmail.split("@")[0],
                email: authEmail,
                birthdate: authBirthdate || "1998-07-06",
                accountType: authAccountType,
                profession: authAccountType === "independent" ? (applyingAs ? `${applyingAs} Specialist` : "Professional Independent") : (selectedRoleType ? `Hiring: ${selectedRoleType}` : "Job Provider / Client"),
                walletBalance: 0,
                history: [],
                isVetted24h: isVettedNow,
                vettedUntil: vettedUntilDate,
                staySignedIn24h: staySignedIn24h
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
          const isVettedNow = authAccountType === "independent" && fastTrackVetting;
          const vettedUntilDate = isVettedNow ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : "";

          await saveUserProfile(user.uid, {
            name: authName,
            email: authEmail,
            birthdate: authBirthdate || "1998-07-06",
            accountType: authAccountType,
            profession: authAccountType === "independent" ? (applyingAs ? `${applyingAs} Specialist` : "Professional Independent") : (selectedRoleType ? `Hiring: ${selectedRoleType}` : "Job Provider / Client"),
            walletBalance: 0,
            history: [],
            isVetted24h: isVettedNow,
            vettedUntil: vettedUntilDate,
            staySignedIn24h: staySignedIn24h
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
          
          if (authAccountType === "independent") {
            if (fastTrackVetting) {
              alert("🎉 Instant 24-Hour Express Access Granted! Your account is fully unblocked and verified.");
            } else {
              setShowVettingModal(true);
            }
          }
        } catch (signUpErr: any) {
          if (signUpErr.code === "auth/email-already-in-use") {
            console.log("Email already in use on signup. Attempting seamless auto-login fallback...");
            try {
              const userCredential = await signInWithEmailAndPassword(auth, authEmail, authPassword);
              const email = userCredential.user.email?.toLowerCase();
              if (email === "rdgabmomoh@gmail.com" || email === "raphdafemomoh@gmail.com") {
                 const profile = await getUserProfile(userCredential.user.uid);
                 if (profile.accountType !== authAccountType) {
                     await saveUserProfile(userCredential.user.uid, { ...profile, accountType: authAccountType });
                     setUserProfile({ ...profile, accountType: authAccountType });
                 }
              }
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
      if (staySignedIn24h) {
        const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem("estarr_session_expiry", expiryTime.toString());
      } else {
        localStorage.removeItem("estarr_session_expiry");
      }
      setShowAuthModal(false);
    } catch (error: any) {
      console.error("Auth error details:", error);
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

  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const independentSections = [
    {
      title: "Intelligence & Insights Hub",
      items: [
        { id: "home", label: "Home", desc: "Digital ecosystem overview", icon: Home },
        { id: "ai-lab", label: "ESTARR AI Lab", desc: "Train, Validate & Evaluate Models", icon: BrainCircuit },
        { id: "ai-vetting", label: "AI Vetting Center", desc: "Interactive proctored assessments", icon: ShieldCheck },
        { id: "portfolio", label: "Talent Portfolios", desc: "Showcase skills & consultancy", icon: Briefcase },
      ]
    },
    {
      title: "Consultancy & Services",
      items: [
        { id: "consultancy", label: "Consultancy Dashboard", desc: "Manage projects", icon: Briefcase },
      ]
    },
    {
      title: "Gig Market & Escrow Services",
      items: [
        { id: "gigs", label: "AI Gig Builder", desc: "Draft & list your services", icon: Sparkles },
        { id: "careers", label: "Jobs Board", desc: "Full-time & remote roles", icon: Compass },
        { id: "marketplace", label: "Brand Campaigns", desc: "Exclusive high-ticket sponsorships", icon: ShoppingCart },
      ]
    },
    {
      title: "Network & Social Ecosystem",
      items: [
        { id: "connect", label: "Peer Connect", desc: "Professional network & peers", icon: Users },
        { id: "community", label: "Estarr Community", desc: "Cohorts & discussion boards", icon: Heart },
        { id: "events", label: "Live Events", desc: "Masterclasses & ticketing", icon: Calendar },
      ]
    },
    {
      title: "Wallet & Rewards Utility",
      items: [
        { id: "payments", label: "Digital Wallet", desc: "Transfers & distributions", icon: CreditCard },
        { id: "rewards", label: "Ambassadors", desc: "Earn Points & Rewards", icon: Gift }
      ]
    },
    {
      title: "Help & Resources",
      items: [
        { id: "help-docs", label: "Help & Docs", desc: "Guides and documentation", icon: HelpCircle },
        { id: "decentralized-escrows", label: "Escrow Pipeline", desc: "Decentralized Escrows and Multi-sig", icon: Lock },
        { id: "program-guidelines", label: "Program Guidelines", desc: "Vetting standards and SLAs", icon: ShieldCheck },
        { id: "escrow-faqs", label: "Escrow FAQs", desc: "Frequently Asked Questions", icon: HelpCircle },
        { id: "contractor-directory", label: "Contractor Directory", desc: "Pre-vetted expert roster", icon: Users },
        { id: "platform-status", label: "Platform Status", desc: "Real-time system health status", icon: Activity },
      ]
    },
    {
      title: "Legal & Audits",
      items: [
        { id: "terms-conditions", label: "Terms & Conditions", desc: "Facilitation and Escrow rules", icon: FileText },
        { id: "privacy-cookies", label: "Privacy & Cookies", desc: "GDPR and cookie policy", icon: FileText },
        { id: "data-collection", label: "Data Policy", desc: "Anonymized evaluation criteria", icon: FileText },
        { id: "compliance-audits", label: "Compliance Audits", desc: "SOC2 and Smart Contract audits", icon: ShieldCheck },
      ]
    }
  ];

  const clientSections = [
    {
      title: "Client Portal",
      items: [
        { id: "home", label: "Dashboard", desc: "Manage projects & spend", icon: Home },
        { id: "ai-lab", label: "Post AI Task", desc: "Hire for AI training", icon: BrainCircuit },
      ]
    },
    {
      title: "Consultancy & Services",
      items: [
        { id: "consultancy", label: "Consultancy Dashboard", desc: "Manage projects & milestones", icon: Briefcase },
        { id: "careers", label: "Jobs Board", desc: "Full-time & remote roles", icon: Compass },
      ]
    },
    {
      title: "Talent Discovery",
      items: [
        { id: "connect", label: "Talent Network", desc: "Search & connect with pros", icon: Users },
        { id: "portfolio", label: "View Portfolios", desc: "Review previous work", icon: Sparkles },
        { id: "ai-vetting", label: "AI Vetting Center", desc: "Browse pre-vetted scorecards", icon: ShieldCheck },
      ]
    },
    {
      title: "Billing & Escrow",
      items: [
        { id: "payments", label: "Funding & Escrow", desc: "Manage deposits & payments", icon: CreditCard },
      ]
    },
    {
      title: "Developer & Sync",
      items: [
        { id: "integrations", label: "Integrations Hub", desc: "REST APIs & Webhooks", icon: Cpu }
      ]
    },
    {
      title: "Help & Resources",
      items: [
        { id: "help-docs", label: "Help & Docs", desc: "Guides and documentation", icon: HelpCircle },
        { id: "decentralized-escrows", label: "Escrow Pipeline", desc: "Decentralized Escrows and Multi-sig", icon: Lock },
        { id: "program-guidelines", label: "Program Guidelines", desc: "Vetting standards and SLAs", icon: ShieldCheck },
        { id: "escrow-faqs", label: "Escrow FAQs", desc: "Frequently Asked Questions", icon: HelpCircle },
        { id: "contractor-directory", label: "Contractor Directory", desc: "Pre-vetted expert roster", icon: Users },
        { id: "platform-status", label: "Platform Status", desc: "Real-time system health status", icon: Activity },
      ]
    },
    {
      title: "Legal & Audits",
      items: [
        { id: "terms-conditions", label: "Terms & Conditions", desc: "Facilitation and Escrow rules", icon: FileText },
        { id: "privacy-cookies", label: "Privacy & Cookies", desc: "GDPR and cookie policy", icon: FileText },
        { id: "data-collection", label: "Data Policy", desc: "Anonymized evaluation criteria", icon: FileText },
        { id: "compliance-audits", label: "Compliance Audits", desc: "SOC2 and Smart Contract audits", icon: ShieldCheck },
      ]
    }
  ];

  const navSections = [
    ...(userProfile?.accountType === "jobOwner" ? clientSections : independentSections),
    ...(isAdmin ? [{
      title: "Admin Controls",
      items: [
        { id: "admin", label: "Admin Dashboard", desc: "System settings & metrics", icon: ShieldCheck }
      ]
    }] : [])
  ];

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
          onApply={async () => {
            if (auth.currentUser) {
              const updatedProfile = {
                ...userProfile,
                isVetted24h: true,
                vettedUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
              };
              try {
                await saveUserProfile(auth.currentUser.uid, updatedProfile);
                setUserProfile(updatedProfile);
              } catch (err) {
                console.error("Failed to update profile for vetting bypass:", err);
              }
            }
            setShowVettingModal(false);
            alert("🎉 Fast-Track Vetting Activated! Your account is fully unblocked and verified with a 24-Hour Express Pass.");
          }}
        />
      )}

      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-50/90 backdrop-blur-xs flex flex-col justify-center items-center p-4 selection:bg-purple-600 selection:text-white border-4 border-slate-200">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-5 pointer-events-none" />
          
          <div className={`w-full ${
            (authAccountType === "jobOwner" && authMode === "signup" && hireWizardStep === 1) 
              ? "max-w-xl md:max-w-2xl" 
              : (authAccountType === "independent" && authMode === "signup") 
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
                      onClick={() => setAuthAccountType("independent")}
                      className={`flex-1 py-1.5 px-3 rounded-full border text-xs font-bold tracking-tight transition-all cursor-pointer ${
                        (authAccountType as string) === "independent"
                          ? "bg-purple-50 border-purple-500 text-purple-600 shadow-xs"
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      Independent
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthAccountType("jobOwner")}
                      className={`flex-1 py-1.5 px-3 rounded-full border text-xs font-bold tracking-tight transition-all cursor-pointer ${
                        (authAccountType as string) === "jobOwner"
                          ? "bg-purple-50 border-purple-500 text-purple-600 shadow-xs"
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                            Client
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
                      id: "Consultancy Manager",
                      title: "Consultancy Manager",
                      desc: "Digital Consultancy Manager, IT Consultancy Manager, Scrum Master, Agile Coach...",
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
            ) : authAccountType === "independent" && authMode === "signup" ? (
              // Toptal-style Independent Sign-up Layout
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
                      <p className="text-[10px] text-purple-600 font-bold tracking-wide mt-0.5">Talent Networks</p>
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
                    {/* Account Type (Independent vs Owner) - so they can toggle back if they want */}
                    <div className="grid grid-cols-2 gap-3 mb-1">
                      <div className="flex flex-col gap-1">
                        <span className="font-display font-extrabold text-[9px] uppercase tracking-wider text-slate-900">
                          Account Type *
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => setAuthAccountType("independent")}
                            className="flex-1 py-1.5 px-2 rounded-full border text-[10px] font-bold tracking-tight transition-all bg-purple-50 border-purple-500 text-purple-600 cursor-pointer"
                          >
                            Independent
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setAuthAccountType("jobOwner");
                              setHireWizardStep(1);
                            }}
                            className="flex-1 py-1.5 px-2 rounded-full border text-[10px] font-bold tracking-tight transition-all bg-white border-slate-200 text-slate-500 hover:border-slate-300 cursor-pointer"
                          >
                            Client
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
                          <option value="Consultancy Manager">Consultancy Manager</option>
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

                    {/* Stay Signed In & Fast Track Options */}
                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex flex-col gap-2 mt-1">
                      <label className="flex items-start gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={staySignedIn24h}
                          onChange={(e) => setStaySignedIn24h(e.target.checked)}
                          className="mt-0.5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 w-3.5 h-3.5 cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-800 leading-none">Stay signed in for 24 hours</span>
                          <span className="text-[8px] text-slate-400 mt-0.5 font-sans">Maintain an active secure session for 24 hours.</span>
                        </div>
                      </label>
                      <label className="flex items-start gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={fastTrackVetting}
                          onChange={(e) => setFastTrackVetting(e.target.checked)}
                          className="mt-0.5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 w-3.5 h-3.5 cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-800 leading-none flex items-center gap-1">
                            Fast-Track 24h Express Pass
                            <span className="text-[7px] font-mono font-bold bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded-sm uppercase tracking-wider">Unblocked</span>
                          </span>
                          <span className="text-[8px] text-slate-400 mt-0.5 font-sans">Instantly unblock and auto-vet account.</span>
                        </div>
                      </label>
                    </div>

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
                  
                  <div className="flex flex-col gap-8 items-center md:items-start">
                    {/* Microsoft Logo */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-5 object-contain mix-blend-multiply" referrerPolicy="no-referrer" />

                    {/* Salesforce Logo */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" alt="Salesforce" className="h-9 object-contain -ml-1 mix-blend-multiply" referrerPolicy="no-referrer" />

                    {/* Airbnb Logo */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" alt="Airbnb" className="h-6 object-contain mix-blend-multiply" referrerPolicy="no-referrer" />

                    {/* Shopify Logo */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" alt="Shopify" className="h-7 object-contain mix-blend-multiply" referrerPolicy="no-referrer" />

                    {/* Netflix Logo */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-5 object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
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
                  <p className="text-[11px] text-purple-600 font-bold tracking-wide mt-0.5">
                    {authAccountType === "jobOwner" ? "Hiring Portal" : "Talent Networks"}
                  </p>
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
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="font-display font-extrabold text-[9px] uppercase tracking-wider text-slate-900">
                        Sign In As *
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          disabled={isAuthLoading}
                          onClick={() => setAuthAccountType("independent")}
                          className={`flex-1 py-1.5 px-2 rounded-full border text-[10px] font-bold tracking-tight transition-all disabled:opacity-60 cursor-pointer ${
                            authAccountType === "independent"
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
                            if (authMode === "signup") {
                              setHireWizardStep(1); // Return to wizard step 1
                            }
                          }}
                          className={`flex-1 py-1.5 px-2 rounded-full border text-[10px] font-bold tracking-tight transition-all disabled:opacity-60 cursor-pointer ${
                            authAccountType === "jobOwner"
                              ? "bg-purple-50 border-purple-500 text-purple-600"
                              : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          Client
                        </button>
                      </div>
                    </div>
                  </div>

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

                  {/* Stay Signed In / Fast Track Options */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col gap-2">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={staySignedIn24h}
                        onChange={(e) => setStaySignedIn24h(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 w-3.5 h-3.5 cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-800 leading-none">Stay signed in for 24 hours</span>
                        <span className="text-[8px] text-slate-400 mt-0.5 font-sans">Maintain an active secure session for 24 hours.</span>
                      </div>
                    </label>
                    {authMode === "signup" && authAccountType === "independent" && (
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={fastTrackVetting}
                          onChange={(e) => setFastTrackVetting(e.target.checked)}
                          className="mt-0.5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 w-3.5 h-3.5 cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-800 leading-none flex items-center gap-1">
                            Fast-Track 24h Express Pass
                            <span className="text-[7px] font-mono font-bold bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded-sm uppercase tracking-wider">Unblocked</span>
                          </span>
                          <span className="text-[8px] text-slate-400 mt-0.5 font-sans">Instantly unblock and auto-vet account.</span>
                        </div>
                      </label>
                    )}
                  </div>

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

                <div className="mt-6 pt-5 border-t border-slate-100 flex gap-3 items-start text-[10px] text-slate-500 bg-slate-50/50 -mx-6 px-6 -mb-6 rounded-b-xl pb-6">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-tight">ESTARR 100% Escrow Protection Guard</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">
                      Your money stays securely locked in escrow until the supplier
                      delivers your items or completes the service. Upon verification, the
                      escrow automatically pays out. Absolutely risk-free!
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Header */}
      <header className="sticky top-0 bg-black border-b border-slate-800 z-40 px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-1.5 sm:gap-3">
          {isAuthenticated && (
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:text-purple-400 p-1.5 sm:p-2 cursor-pointer transition-colors"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
          <button onClick={() => setActiveTab("home")} className="flex items-center gap-2 sm:gap-3 text-left cursor-pointer hover:opacity-90">
            <div className="group relative w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center transition-all duration-500 hover:-translate-y-0.5">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-11 sm:h-11 drop-shadow-md">
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
            <h1 className="font-display font-bold text-xs sm:text-sm md:text-base uppercase tracking-tight text-white leading-tight">ESTARR</h1>
            <p className="hidden sm:block text-[10px] text-slate-400 font-medium tracking-wide font-bold">{translations[globalLanguage].heroSubtitle}</p>
          </div>
        </button>

        </div>
        {/* Global Navigation Buttons in the Middle of Header */}
        {isAuthenticated && (
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
                  setActiveTab("ai-lab");
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-wider cursor-pointer ${
                activeTab === "ai-lab"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/40"
              }`}
            >
              <BrainCircuit className="w-3 h-3" />
              <span className="flex items-center gap-1">
                ESTARR AI Lab
              </span>
            </button>

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  setAuthMode("signup");
                  setShowAuthModal(true);
                } else {
                  setActiveTab("annotation-workspace");
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-wider cursor-pointer ${
                activeTab === "annotation-workspace"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/40"
              }`}
            >
              <Square className="w-3 h-3" />
              <span className="flex items-center gap-1">
                Annotation Workspace
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
        )}

        {/* Global User Profile Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Globalizer Widget */}
          <div className="relative">
            <button
              onClick={() => setIsGlobalDropdownOpen(!isGlobalDropdownOpen)}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 p-2 sm:px-3 sm:py-1.5 rounded-xl cursor-pointer transition-colors shadow-sm flex items-center gap-1.5 text-[10px] font-bold shrink-0"
              title="Global Settings (Currency & Language)"
            >
              <Globe className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-purple-400 animate-pulse shrink-0" />
              <span className="hidden sm:inline font-mono text-[10px] tracking-wider uppercase">{globalLanguage} | {globalCurrency}</span>
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
                className="relative bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 p-1.5 sm:p-2 rounded-xl cursor-pointer transition-colors shadow-sm shrink-0"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black"></span>
              </button>
              <button
                id="btn-edit-profile-main"
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 text-left bg-slate-900 hover:bg-slate-800 p-1 border border-slate-800 cursor-pointer transition-all pr-1 sm:pr-3 rounded-xl shrink-0"
              >
                <img src={userProfile.avatar} alt="avatar" className="w-7 h-7 object-cover border border-slate-700 rounded-lg" />
                <div className="hidden sm:block text-[10px]">
                  <span className="font-bold text-white block leading-tight uppercase tracking-tight">{userProfile.name}</span>
                  {userProfile.isVetted24h ? (
                    <span className="text-emerald-400 font-bold block leading-tight text-[8px] uppercase tracking-wider flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      24h Express Pass
                    </span>
                  ) : (
                    <span className="text-purple-400 font-bold block leading-tight text-[8px] uppercase tracking-wider">Configure Profile</span>
                  )}
                </div>
              </button>
              <button
                onClick={async () => {
                  try {
                    await firebaseSignOut(auth);
                    setActiveTab("home");
                  } catch (error: any) {
                    console.error("Logout error:", error);
                  }
                }}
                className="hidden sm:flex items-center justify-center w-9 h-9 bg-slate-900 hover:bg-rose-950/30 text-slate-400 hover:text-rose-500 border border-slate-800 rounded-xl transition-colors shadow-sm shrink-0"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => { setAuthMode("signin"); setShowAuthModal(true); }}
                className="text-slate-400 hover:text-white text-[11px] sm:text-xs font-semibold cursor-pointer transition-colors shrink-0"
              >
                Sign In
              </button>
              <button 
                onClick={() => { setAuthMode("signup"); setShowAuthModal(true); }}
                className="hidden md:block text-white hover:text-[#00D285] font-display font-bold text-xs md:text-sm tracking-tight transition-all cursor-pointer hover:underline underline-offset-4 shrink-0"
              >
                Apply as a Talent
              </button>
              <div className="relative flex items-center gap-1.5">
                <button 
                  onClick={() => { setAuthMode("signup"); setShowAuthModal(true); }}
                  className="bg-gradient-to-r from-[#9d50bb] to-[#6e48aa] hover:from-[#a85ec5] hover:to-[#7b55be] text-white font-display font-bold text-[10px] sm:text-xs md:text-sm px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg transition-all cursor-pointer shadow-sm active:scale-95 flex items-center justify-center min-h-[36px] sm:min-h-[40px] shrink-0"
                >
                  <span className="sm:hidden">Hire</span>
                  <span className="hidden sm:inline">Hire Top Talent</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHireTooltip(!showHireTooltip);
                  }}
                  className="hidden sm:flex group relative w-11 h-11 items-center justify-center transition-all duration-500 hover:-translate-y-0.5 cursor-pointer bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white min-w-[44px] min-h-[44px]"
                  title="Learn more"
                >
                  <HelpCircle className="w-4 h-4" />
                  
                  {/* Hover-only desktop tooltip */}
                  <div className="hidden sm:block absolute right-0 top-full mt-2.5 w-60 p-3 rounded-lg shadow-xl border border-slate-800 bg-slate-950 text-white text-[11px] text-left transition-all duration-200 z-50 scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto">
                    <div className="absolute top-0 right-3.5 -mt-1.5 w-3 h-3 bg-slate-950 rotate-45 border-l border-t border-slate-800" />
                    <p className="font-bold text-purple-400 mb-1">For Clients</p>
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
                          <p className="font-display font-extrabold text-[10px] text-purple-400 uppercase tracking-wider mb-2">For Clients</p>
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
                          <p className="font-bold text-purple-400">For Clients</p>
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
      <div className={`flex-1 w-full mx-auto relative z-10 ${isAuthenticated ? "max-w-7xl p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8" : "max-w-none p-0 grid grid-cols-1"}`}>
        {/* Navigation Rail Sidebar */}
        {!isSidebarHidden && isAuthenticated && (<nav className={`hidden lg:flex lg:col-span-3 flex-col gap-4 p-4 h-fit shadow-xs rounded-xl transition-all duration-300 ${sidebarStyles[sidebarTheme].navClass}`}>
          <div className={`flex flex-col gap-2 border-b pb-3 mb-1 ${sidebarStyles[sidebarTheme].borderClass}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                ESTARR ECOSYSTEM
              </span>
              <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#E9D5FF] text-[#7E22CE]`}>
                13 MODULES
              </span>
            </div>
            
            {/* TVL Widget */}
            {isAuthenticated && (
              <div className="mt-2 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-mono uppercase text-emerald-700 font-bold">Total Escrow Locked</span>
                  <span className="font-mono text-sm font-black text-emerald-600">${totalEscrowLocked.toLocaleString()}</span>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
            )}

            {/* Theme Swatches Picker removed since it can be controlled from the admin panel */}
          </div>
          {navSections.map((section) => {
            const isCollapsed = collapsedNavSections[section.title];
            const hasActiveItem = section.items.some(item => item.id === activeTab);
            
            return (
              <div key={section.title} className="flex flex-col gap-1.5">
                {/* Section Header Toggle */}
                <div 
                  onClick={() => toggleNavSection(section.title)}
                  className={`flex items-center justify-between hover:opacity-80 cursor-pointer py-1 select-none transition-colors group ${sidebarStyles[sidebarTheme].sectionHeaderClass}`}
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
                            <Icon className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${isActive ? sidebarStyles[sidebarTheme].activeIconClass : sidebarStyles[sidebarTheme].inactiveIconClass}`} />
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
        <main className={`${(isSidebarHidden || !isAuthenticated) ? "lg:col-span-12" : "lg:col-span-9"} flex flex-col ${isAuthenticated ? "gap-6" : "gap-0"} min-h-[500px]`}>
          {activeTab === "home" && (
            <div className={`flex flex-col ${isAuthenticated ? "gap-6" : "gap-0"} animate-fade-in`}>
              {isAuthenticated ? (
                <UserDashboard 
                  userProfile={userProfile} 
                  tasks={tasks}
                  posts={posts}
                  jobs={jobs}
                  onNavigate={(tab) => setActiveTab(tab as any)} 
                  onOpenAiChat={handleOpenAi}
                  onUpdateProfile={handleUpdateProfile}
                  onUpdateJobs={handleUpdateJobs}
                />
              ) : (
                <MvpLandingPage 
                  onSignIn={() => { setAuthMode("signin"); setShowAuthModal(true); }} 
                  onSignUp={() => { setAuthMode("signup"); setShowAuthModal(true); }} 
                  onNavigateToTab={(tab) => {
                    setActiveTab(tab as any);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              )}
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
          {activeTab === "ai-lab" && (
            <AILabSection userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />
          )}

          {activeTab === "ai-vetting" && (
            <AIVettingCenter userProfile={userProfile} />
          )}

          {activeTab === "marketplace" && (
            <MarketplaceSection
              userProfile={userProfile}
              products={products}
              tasks={tasks}
              onUpdateProducts={handleUpdateProducts}
              onUpdateTasks={handleUpdateTasks}
              onOpenAiChat={handleOpenAi}
            />
          )}

          {activeTab === "consultancy" && userProfile?.accountType === "jobOwner" ? (
            <ConsultancySection
              userProfile={userProfile}
              tasks={tasks}
              jobs={jobs}
              onUpdateTasks={handleUpdateTasks}
              onUpdateJobs={handleUpdateJobs}
              onOpenAiChat={handleOpenAi}
              onNavigate={(tab) => setActiveTab(tab as any)}
              campaigns={campaigns}
            />
          ) : activeTab === "consultancy" ? (
            <div className="flex-1 flex items-center justify-center p-8 text-slate-500">
                Access to Consultancy Dashboard is restricted to Clients.
            </div>
          ) : null}

          {activeTab === "gigs" && (
            <GigsSection
              userProfile={userProfile}
              onOpenAiChat={handleOpenAi}
            />
          )}

          {activeTab === "ai-jobs" && (
            <GigsSection
              userProfile={userProfile}
              onOpenAiChat={handleOpenAi}
              initialCategory="Build AI"
            />
          )}

          {activeTab === "payments" && (
            <PaymentsSection 
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
              isNewAccount={isAuthenticated && userProfile.email?.toLowerCase().trim() !== "chinedu@estarrapp.com"} 
            />
          )}

          {activeTab === "events" && (
            <EventsSection />
          )}

          {activeTab === "portfolio" && (
            <PortfolioSection userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />
          )}

          {activeTab === "community" && (
            <CommunitySection
              userProfile={userProfile}
              channels={channels}
              onUpdateChannels={handleUpdateChannels}
            />
          )}

          {activeTab === "help-docs" && (
            <HelpGuideSection />
          )}

          {activeTab === "annotation-workspace" && (
            <AnnotationWorkspace />
          )}

          {activeTab === "rewards" && (
            <RewardsSection userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />
          )}

          {activeTab === "integrations" && (
            <IntegrationsSection userProfile={userProfile} />
          )}

          {activeTab === "admin" && isAdmin && (
            <AdminSection
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              sidebarTheme={sidebarTheme}
              setSidebarTheme={updateSidebarTheme}
              userProfile={userProfile}
            />
          )}

          {activeTab === "about" && <AboutSection />}
          {activeTab === "teams" && <TeamsSection />}
          {activeTab === "careers" && <JobsSection userProfile={userProfile} jobs={jobs} onUpdateJobs={handleUpdateJobs} onUpdateProfile={handleUpdateProfile} token={token} />}
          {activeTab === "how-it-works" && <HowItWorksSection />}

          {/* New High-Fidelity Ecosystem & Legal Pages */}
          {activeTab === "decentralized-escrows" && <DecentralizedEscrowsSection />}
          {activeTab === "program-guidelines" && <ProgramGuidelinesSection />}
          {activeTab === "escrow-faqs" && <EscrowFaqsSection />}
          {activeTab === "contractor-directory" && <ContractorDirectorySection />}
          {activeTab === "platform-status" && <PlatformStatusSection />}
          {activeTab === "terms-conditions" && <TermsConditionsSection />}
          {activeTab === "privacy-cookies" && <PrivacyCookiesSection />}
          {activeTab === "data-collection" && <DataCollectionPolicySection />}
          {activeTab === "compliance-audits" && <ComplianceAuditsSection />}
        </main>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav className={`relative w-80 max-w-[80vw] h-full overflow-y-auto flex flex-col gap-4 p-4 shadow-2xl transition-all duration-300 ${sidebarStyles[sidebarTheme].navClass}`}>
            <div className={`flex flex-col gap-2 border-b pb-3 mb-1 ${sidebarStyles[sidebarTheme].borderClass}`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                  ESTARR ECOSYSTEM
                </span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-md hover:bg-slate-200/50 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {isAuthenticated && (
                <div className="mt-2 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-mono uppercase text-emerald-700 font-bold">Total Escrow Locked</span>
                    <span className="font-mono text-sm font-black text-emerald-600">${totalEscrowLocked.toLocaleString()}</span>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
              )}
            </div>
            
            {navSections.map((section) => {
              const isCollapsed = collapsedNavSections[section.title];
              const hasActiveItem = section.items.some(item => item.id === activeTab);
              
              return (
                <div key={section.title} className="flex flex-col gap-1.5">
                  <div 
                    onClick={() => toggleNavSection(section.title)}
                    className={`flex items-center justify-between hover:opacity-80 cursor-pointer py-1 select-none transition-colors group ${sidebarStyles[sidebarTheme].sectionHeaderClass}`}
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
                                setIsMobileMenuOpen(false);
                                setAuthMode("signup");
                                setShowAuthModal(true);
                              } else {
                                setActiveTab(item.id as any);
                                setIsMobileMenuOpen(false);
                              }
                            }}
                            className={`w-full text-left p-2 transition-all duration-200 cursor-pointer rounded-xl border relative ${
                              isActive
                                ? sidebarStyles[sidebarTheme].activeItemClass
                                : sidebarStyles[sidebarTheme].inactiveItemClass
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <Icon className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${isActive ? sidebarStyles[sidebarTheme].activeIconClass : sidebarStyles[sidebarTheme].inactiveIconClass}`} />
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
            {isAuthenticated && (
              <div className="mt-auto pt-4 border-t border-slate-800/60 shrink-0">
                <button
                  onClick={async () => {
                    try {
                      await firebaseSignOut(auth);
                      setActiveTab("home");
                      setIsMobileMenuOpen(false);
                    } catch (error: any) {
                      console.error("Logout error:", error);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-rose-950/20 hover:bg-rose-900/40 text-rose-400 hover:text-rose-300 border border-rose-900/30 hover:border-rose-800/50 rounded-xl transition-colors font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      )}

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

                {userProfile.isVetted24h && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-2.5 shadow-sm">
                    <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider leading-none">24h Express Vetting Active</span>
                      <span className="text-[8px] text-emerald-600 font-semibold mt-0.5 font-sans">Your account is fully unblocked and authenticated.</span>
                    </div>
                  </div>
                )}

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

                <div className="flex flex-col gap-1">
                  <label className="font-bold uppercase tracking-wider text-slate-900 text-[10px]">My Certifications (Comma separated)</label>
                  <input
                    type="text"
                    value={editCerts}
                    onChange={(e) => setEditCerts(e.target.value)}
                    className="bg-white border border-slate-200 px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-slate-100 rounded-xl font-medium"
                    placeholder="e.g. Google Cloud Professional Cloud Architect, Solidity Smart Contract Auditor"
                  />
                  <span className="text-[9px] text-slate-500">Celebrate your credentials on the Certification Board!</span>
                </div>

                <div className="flex flex-col gap-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <label className="font-bold uppercase tracking-wider text-slate-900 text-[10px]">Global Application Theme</label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setEditTheme("light")}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border transition-all text-center cursor-pointer ${
                        editTheme === "light"
                          ? "border-purple-600 bg-purple-50/50 text-purple-700 font-semibold shadow-sm"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100/70 text-slate-600 font-medium"
                      }`}
                    >
                      <Sun className={`w-4 h-4 ${editTheme === "light" ? "text-purple-600" : "text-slate-400"}`} />
                      <span className="text-[10px]">Light</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditTheme("dark")}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border transition-all text-center cursor-pointer ${
                        editTheme === "dark"
                          ? "border-purple-600 bg-purple-50/50 text-purple-700 font-semibold shadow-sm"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100/70 text-slate-600 font-medium"
                      }`}
                    >
                      <Moon className={`w-4 h-4 ${editTheme === "dark" ? "text-purple-600" : "text-slate-400"}`} />
                      <span className="text-[10px]">Dark</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditTheme("system")}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border transition-all text-center cursor-pointer ${
                        editTheme === "system"
                          ? "border-purple-600 bg-purple-50/50 text-purple-700 font-semibold shadow-sm"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100/70 text-slate-600 font-medium"
                      }`}
                    >
                      <Monitor className={`w-4 h-4 ${editTheme === "system" ? "text-purple-600" : "text-slate-400"}`} />
                      <span className="text-[10px]">System</span>
                    </button>
                  </div>
                  <span className="text-[9px] text-slate-500 mt-0.5 leading-normal">
                    Choose your viewing preference. System theme automatically synchronizes with your device's light or dark mode.
                  </span>
                </div>
              </div>
            </div>

            <button
              id="btn-profile-save-submit"
              type="submit"
              disabled={saveStatus !== 'idle'}
              className={`w-full text-white py-3.5 rounded-xl font-semibold tracking-wide cursor-pointer transition-all shadow-sm flex items-center justify-center ${
                saveStatus === 'success' 
                  ? 'bg-emerald-500 hover:bg-emerald-600' 
                  : 'bg-slate-950 hover:bg-gradient-to-r hover:from-violet-600 hover:via-indigo-500 hover:to-emerald-500'
              }`}
            >
              <AnimatePresence mode="wait">
                {saveStatus === 'saving' && (
                  <motion.span
                    key="saving"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >Saving...</motion.span>
                )}
                {saveStatus === 'success' && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Check className="w-5 h-5" />
                  </motion.span>
                )}
                {saveStatus === 'idle' && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >Save Configurations</motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>
        </div>
      )}

      {/* Floating Persistant AI trigger button (mobile layout helper) */}
      {showAiFloat && (
        <div className="fixed bottom-12 right-12 z-40 animate-bounce">
          <button
            id="btn-ai-float"
            onClick={() => handleOpenAi("", "general")}
            className="bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-500 text-white p-4 rounded-full shadow-sm hover:shadow-md transition-shadow border border-slate-200 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowAiFloat(false);
            }}
            className="absolute -top-1 -right-1 bg-slate-900/80 backdrop-blur-sm text-white p-1 rounded-full border border-slate-700 shadow-xl hover:bg-slate-800 transition-colors cursor-pointer"
            title="Dismiss Assistant"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

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
            <button onClick={() => setActiveTab("consultancy")} className="hover:text-indigo-400 transition-colors uppercase cursor-pointer">Consultancy & Services</button>
            <button onClick={() => setActiveTab("careers")} className="hover:text-indigo-400 transition-colors uppercase cursor-pointer">Jobs</button>
            <button onClick={() => setActiveTab("help-docs")} className="hover:text-indigo-400 transition-colors uppercase cursor-pointer">Help & Documentation</button>
          </div>
          <div className="text-[10px] text-center md:text-right font-mono tracking-widest uppercase opacity-50">
            ESTARR • SSLABS 2026 ALL RIGHTS RESERVED • 100% OFF-CHAIN SECURED ECOSYSTEM
          </div>
        </div>
      </footer>
    </div>
  );
}
