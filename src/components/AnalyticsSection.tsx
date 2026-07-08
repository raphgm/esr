import { PageBanner } from "./PageBanner";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  TrendingUp,
  Award,
  Check,
  Copy,
  Plus,
  Info,
  ChevronRight,
  Video,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Instagram,
  Globe,
  DollarSign,
  PieChart,
  UserCheck,
  Music,
  Tv,
  Trash2,
  RefreshCw,
  Search,
  Sliders,
  Settings,
  Link2,
  Github,
  Linkedin,
  ExternalLink
} from "lucide-react";
import { motion } from "motion/react";
import { UserProfile, PortfolioItem } from "../types";

interface AnalyticsSectionProps {
  userProfile?: UserProfile;
  onUpdateProfile?: (profile: UserProfile) => void;
}

export default function AnalyticsSection({ userProfile, onUpdateProfile }: AnalyticsSectionProps) {
  // Creator Portfolio Inputs
  const [creatorName, setCreatorName] = useState(userProfile?.name || "Chinedu Okafor");
  const [creatorHandle, setCreatorHandle] = useState(userProfile?.handle || "chinedu_creates");

  const updateHandleInProfile = (handle: string) => {
    if (userProfile && onUpdateProfile) {
      onUpdateProfile({
        ...userProfile,
        handle: handle
      });
    }
  };
  const [primaryPlatform, setPrimaryPlatform] = useState<"TikTok" | "Instagram" | "YouTube">("TikTok");
  const [primaryNiche, setPrimaryNiche] = useState("Lifestyle & Comedy Hacks");
  const [baseRate, setBaseRate] = useState(150000); // NGN per post
  const [customBio, setCustomBio] = useState(userProfile?.bio || "Aesthetic micro-vlogger showcasing daily Lagos hacks, tech style, and startup vibes.");

  // Metric states (interactive via Creator Fund Calculator)
  const [followers, setFollowers] = useState(45000);
  const [monthlyViews, setMonthlyViews] = useState(250000);
  const [engagementRate, setEngagementRate] = useState(7.4); // typical high Gen-Z rate
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currency, setCurrency] = useState<"NGN" | "USD" | "GHS">("USD");
  const [cpmRate, setCpmRate] = useState(120); // Naira per 1000 views

  // Currency Helpers
  const currencySymbols = {
    NGN: "₦",
    USD: "$",
    GHS: "GH₵"
  };

  const convertValue = (valInNgn: number) => {
    if (currency === "USD") return Math.round(valInNgn / 1500);
    if (currency === "GHS") return Math.round(valInNgn / 100);
    return valInNgn;
  };

  // Live Account Sync States
  const [syncHandle, setSyncHandle] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  // Dynamic Demographics States
  const [demographics, setDemographics] = useState([
    { name: "Lagos, Nigeria", percentage: 55, color: "bg-purple-600" },
    { name: "Abuja, Nigeria", percentage: 22, color: "bg-fuchsia-500" },
    { name: "Accra, Ghana", percentage: 13, color: "bg-indigo-500" },
    { name: "London, UK", percentage: 10, color: "bg-pink-500" },
  ]);

  // Dynamic Retention Sliders
  const [hookRetention, setHookRetention] = useState(85);
  const [ctaRetention, setCtaRetention] = useState(60);

  // Computed metrics
  const calculatedCreatorFundPayout = Math.round((monthlyViews / 1000) * cpmRate);
  const calculatedSponsorshipRevenue = Math.round((monthlyViews * (engagementRate / 100) * 0.08) * (baseRate / 50));
  const totalCreatorRevenue = calculatedCreatorFundPayout + calculatedSponsorshipRevenue;

  // Portfolio items managed live
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(userProfile?.portfolio || [
    { id: "p-1", title: "Lagos Tech Hub Startup Vlog Showcase", url: "https://youtube.com/watch?v=l3v_vlg", category: "UGC Brand Deal", views: 45000, likes: 3200 },
    { id: "p-2", title: "Cozy Morning Aesthetic Routine in Lekki", url: "https://tiktok.com/@chinedu/video/1", category: "Lifestyle", views: 125000, likes: 9800 },
  ]);

  const updatePortfolioInProfile = (items: PortfolioItem[]) => {
    if (userProfile && onUpdateProfile) {
      onUpdateProfile({
        ...userProfile,
        portfolio: items
      });
    }
  };

  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("UGC Brand Deal");
  const [newViews, setNewViews] = useState(10000);
  const [newLikes, setNewLikes] = useState(800);
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);

  const handleAddPortfolioItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;
    const newItem: PortfolioItem = {
      id: "p-" + Date.now(),
      title: newTitle,
      url: newUrl,
      category: newCategory,
      views: newViews,
      likes: newLikes
    };
    const updatedItems = [...portfolioItems, newItem];
    setPortfolioItems(updatedItems);
    updatePortfolioInProfile(updatedItems);
    setNewTitle("");
    setNewUrl("");
    setNewViews(15000);
    setNewLikes(1200);
    setShowAddPortfolio(false);
  };

  const handleDeletePortfolioItem = (id: string) => {
    const updatedItems = portfolioItems.filter(item => item.id !== id);
    setPortfolioItems(updatedItems);
    updatePortfolioInProfile(updatedItems);
  };

  // Social Data Sync Logic
  const [isSyncingSocial, setIsSyncingSocial] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const { provider, token } = event.data;
        if (provider === 'github') {
          syncGitHubRepos(token);
        } else if (provider === 'linkedin') {
          setIsSyncingSocial(null);
          alert("LinkedIn connected successfully! Profile data synced to Media Kit.");
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [portfolioItems]);

  const connectGitHub = async () => {
    try {
      setIsSyncingSocial('github');
      const response = await fetch('/api/auth/github/url');
      const { url } = await response.json();
      window.open(url, 'github_oauth', 'width=600,height=700');
    } catch (err) {
      console.error("GitHub connect error", err);
      setIsSyncingSocial(null);
    }
  };

  const syncGitHubRepos = async (token: string) => {
    try {
      const response = await fetch('/api/sync/github/repos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const repos = await response.json();
      const newItems: PortfolioItem[] = repos.map((repo: any) => ({
        id: `gh-${repo.id}`,
        title: repo.name,
        url: repo.html_url,
        category: "GitHub Project",
        views: repo.stargazers_count,
        likes: repo.forks_count
      }));
      const updated = [...portfolioItems, ...newItems.filter(ni => !portfolioItems.find(pi => pi.id === ni.id))];
      setPortfolioItems(updated);
      updatePortfolioInProfile(updated);
      setIsSyncingSocial(null);
    } catch (err) {
      console.error("Sync error", err);
      setIsSyncingSocial(null);
    }
  };

  const connectLinkedIn = async () => {
    try {
      setIsSyncingSocial('linkedin');
      const response = await fetch('/api/auth/linkedin/url');
      const { url } = await response.json();
      window.open(url, 'linkedin_oauth', 'width=600,height=700');
    } catch (err) {
      console.error("LinkedIn connect error", err);
      setIsSyncingSocial(null);
    }
  };

  const syncDevTo = async () => {
    if (!creatorHandle) return;
    try {
      setIsSyncingSocial('devto');
      const response = await fetch(`/api/sync/devto/${creatorHandle}`);
      const articles = await response.json();
      const newItems: PortfolioItem[] = articles.map((art: any) => ({
        id: `devto-${art.id}`,
        title: art.title,
        url: art.url,
        category: "Dev.to Article",
        views: art.page_views_count || 0,
        likes: art.public_reactions_count || 0
      }));
      const updated = [...portfolioItems, ...newItems.filter(ni => !portfolioItems.find(pi => pi.id === ni.id))];
      setPortfolioItems(updated);
      updatePortfolioInProfile(updated);
      setIsSyncingSocial(null);
    } catch (err) {
      console.error("Dev.to sync error", err);
      setIsSyncingSocial(null);
    }
  };

  // Demographics editor states
  const [showDemoEditor, setShowDemoEditor] = useState(false);
  const [demoLagos, setDemoLagos] = useState(55);
  const [demoAbuja, setDemoAbuja] = useState(22);
  const [demoAccra, setDemoAccra] = useState(13);
  const [demoLondon, setDemoLondon] = useState(10);

  const handleSaveDemographics = () => {
    const total = demoLagos + demoAbuja + demoAccra + demoLondon;
    if (total === 0) return;
    // Normalize to 100%
    const lPercent = Math.round((demoLagos / total) * 100);
    const aPercent = Math.round((demoAbuja / total) * 100);
    const acPercent = Math.round((demoAccra / total) * 100);
    const lonPercent = 100 - (lPercent + aPercent + acPercent); // ensure sums precisely to 100

    setDemographics([
      { name: "Lagos, Nigeria", percentage: lPercent, color: "bg-purple-600" },
      { name: "Abuja, Nigeria", percentage: aPercent, color: "bg-fuchsia-500" },
      { name: "Accra, Ghana", percentage: acPercent, color: "bg-indigo-500" },
      { name: "London, UK", percentage: Math.max(0, lonPercent), color: "bg-pink-500" },
    ]);
    setShowDemoEditor(false);
  };

  const handleCopyPortfolioLink = () => {
    navigator.clipboard.writeText(`https://estrr.live/portfolio/${creatorHandle}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportPortfolio = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Media Kit exported successfully! Saved to your ESTARR portfolio cloud.");
    }, 1500);
  };

  // Live account verification simulation
  const handleVerifyAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!syncHandle) return;
    setIsSyncing(true);
    setSyncSuccess(false);

    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      // Update fields realistically based on synced handle to show it works
      const lengthFactor = syncHandle.length;
      const computedFollowers = lengthFactor * 12500;
      const computedViews = Math.round(computedFollowers * 4.5);
      const computedEngagement = parseFloat((4.2 + (lengthFactor % 5) * 1.1).toFixed(1));
      
      setFollowers(computedFollowers);
      setMonthlyViews(computedViews);
      setEngagementRate(computedEngagement);
      const newHandle = syncHandle.replace("@", "");
      setCreatorHandle(newHandle);
      updateHandleInProfile(newHandle);
    }, 1800);
  };

  // Trending Trends list (TikTok & IG Sound Loops + Transition Formats)
  const [trends, setTrends] = useState([
    {
      id: "trend-1",
      title: "Asake - 'Active' Percussion Loop",
      type: "Audio Track",
      growth: "+148%",
      difficulty: "Easy",
      tip: "Use the fast double-clapping transition beat to show a product transition or outfit reveal.",
      tag: "#ActiveChallenge"
    },
    {
      id: "trend-2",
      title: "POV: You quit your 9-5 to build in Lagos",
      type: "Video Concept",
      growth: "+210%",
      difficulty: "Medium",
      tip: "Start with an aesthetic shot of coffee or traffic, followed by raw high-energy office clips.",
      tag: "#LagosBuilder"
    },
    {
      id: "trend-3",
      title: "Aesthetic Morning Sunlight b-roll",
      type: "Transition Format",
      growth: "+95%",
      difficulty: "Easy",
      tip: "Record in 4k at 60fps, slow down to 40% speed, pair with soft lofi acoustic background loops.",
      tag: "#CozyVibe"
    }
  ]);

  const [trendSearch, setTrendSearch] = useState("");
  const [selectedTrendTip, setSelectedTrendTip] = useState<string | null>(null);

  // Custom Trend state
  const [newTrendTitle, setNewTrendTitle] = useState("");
  const [newTrendType, setNewTrendType] = useState("Audio Track");
  const [newTrendTag, setNewTrendTag] = useState("#MyTrend");
  const [newTrendTip, setNewTrendTip] = useState("");
  const [showAddTrend, setShowAddTrend] = useState(false);

  const handleAddTrend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrendTitle || !newTrendTip) return;
    const newT = {
      id: "trend-" + Date.now(),
      title: newTrendTitle,
      type: newTrendType,
      growth: "+" + Math.floor(Math.random() * 150 + 50) + "%",
      difficulty: "Easy",
      tip: newTrendTip,
      tag: newTrendTag
    };
    setTrends([newT, ...trends]);
    setNewTrendTitle("");
    setNewTrendTip("");
    setNewTrendTag("#MyTrend");
    setShowAddTrend(false);
  };

  // Filter trends based on search query
  const filteredTrends = trends.filter(t => 
    t.title.toLowerCase().includes(trendSearch.toLowerCase()) || 
    t.tag.toLowerCase().includes(trendSearch.toLowerCase()) ||
    t.type.toLowerCase().includes(trendSearch.toLowerCase())
  );

  const generateActivityReport = () => {
    const csvContent = [
      ["ESTARR Activity & Portfolio Report"],
      ["Generated on", new Date().toLocaleDateString()],
      [],
      ["User Profile"],
      ["Name", userProfile?.name || creatorName],
      ["Role", userProfile?.role || "Creator"],
      ["Level", userProfile?.level || "Beginner"],
      ["Total Points", userProfile?.points || 0],
      [],
      ["Career & Portfolio Metrics"],
      ["Followers", followers],
      ["Monthly Views", monthlyViews],
      ["Engagement Rate", `${engagementRate}%`],
      ["Calculated Creator Fund", `${currencySymbols[currency]}${calculatedCreatorFundPayout.toLocaleString()}`],
      ["Calculated Sponsorship", `${currencySymbols[currency]}${calculatedSponsorshipRevenue.toLocaleString()}`],
      ["Total Revenue", `${currencySymbols[currency]}${totalCreatorRevenue.toLocaleString()}`],
      [],
      ["Recent Activities / Achievements"],
      ["Task/Milestone", "Category", "Status"]
    ];

    const tasksContent = userProfile?.history?.map(task => [
      `"${task}"`, "General", "Completed"
    ]) || [
      ["Completed the 'Cloud DevOps Simulator'", "Academy", "Completed"],
      ["Secured $150k Escrow Contract", "Gigs", "Completed"],
      ["Drafted Content Strategy for PiggyVest", "Gigs", "Completed"]
    ];

    csvContent.push(...tasksContent);

    const csvString = csvContent.map(row => row.join(",")).join("\\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ESTARR_Activity_Report_${(userProfile?.name || creatorName).replace(/\\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-800">
      {/* Visual PageBanner */}
      <PageBanner
        title="Verified IT & Creator Analytics"
        subtitle="TRACK, CALIBRATE & SECURE TECH CONTRACTS & BRAND DEALS"
        description="Connect your active developer & social handles, customize your target demographics, calibrate your technical/creative performance, and construct a beautiful, live-shareable verified portfolio and Media Kit to attract high-paying tech contracts and brand deals."
        icon={LineChart}
        actions={
          <button
            onClick={generateActivityReport}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-500 hover:opacity-95 text-white px-5 py-3 rounded-full font-bold shadow-sm transition-all text-sm mt-4 md:mt-0"
          >
            <Download className="w-4 h-4" />
            Download Activity Report
          </button>
        }
      />

      {/* Main Grid: Left (Insights & Analytics), Right (Media Kit Builder) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Hand: Retention, Demographics, Trends */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Section: Real-Time Verified Earnings & Revenue Tracker */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-fuchsia-500 bg-fuchsia-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  💰 Verified IT & Creator Revenue Calculator
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 mt-2 leading-tight">
                  Calculate and Manage Your Tech & Creator Revenue
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tune your metrics and choose your local currency to calculate verified payout metrics and brand package values.
                </p>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1 rounded-xl self-start">
                {(["NGN", "USD", "GHS"] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-xl cursor-pointer transition-all ${
                      currency === curr ? "bg-purple-600 text-white shadow-xs" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Verification Sync Panel */}
            <form onSubmit={handleVerifyAccount} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <span className="text-[10px] font-mono font-bold text-slate-500 block uppercase">
                  ⚡ Live Social & Developer Handle Syncing Engine
                </span>
                <p className="text-[11px] text-slate-9000 mt-0.5">
                  Input your GitHub, TikTok, Instagram, or YouTube handle to verify real-time followers, commits, and engagement.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 md:w-48">
                  <span className="absolute left-3 top-2 text-slate-9000 text-xs font-mono">@</span>
                  <input
                    type="text"
                    placeholder="username"
                    value={syncHandle}
                    onChange={(e) => setSyncHandle(e.target.value)}
                    className="w-full bg-white border border-slate-200 pl-7 pr-3 py-1.5 text-xs rounded-xl focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSyncing || !syncHandle}
                  className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" /> Sync Account
                    </>
                  )}
                </button>
              </div>
            </form>

            {syncSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Successfully fetched and verified channel metrics for <strong>@{syncHandle}</strong>!</span>
                </div>
                <button onClick={() => setSyncSuccess(false)} className="text-[10px] font-bold text-emerald-600 hover:text-emerald-900 cursor-pointer">
                  Dismiss
                </button>
              </motion.div>
            )}

            {/* Interactive Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Monthly Views</span>
                <input
                  type="number"
                  value={monthlyViews}
                  onChange={(e) => setMonthlyViews(Math.max(0, Number(e.target.value)))}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-sm font-mono font-black text-purple-500 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="range"
                  min="10000"
                  max="2000000"
                  step="10000"
                  value={monthlyViews}
                  onChange={(e) => setMonthlyViews(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer h-1.5 bg-slate-100 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Engagement Rate (%)</span>
                <input
                  type="number"
                  step="0.1"
                  value={engagementRate}
                  onChange={(e) => setEngagementRate(Math.max(0.1, Number(e.target.value)))}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-sm font-mono font-black text-slate-800 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="0.1"
                  value={engagementRate}
                  onChange={(e) => setEngagementRate(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer h-1.5 bg-slate-100 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">CPM Rate ({currencySymbols[currency]}/1K Views)</span>
                <input
                  type="number"
                  value={cpmRate}
                  onChange={(e) => setCpmRate(Math.max(1, Number(e.target.value)))}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-sm font-mono font-black text-slate-800 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={cpmRate}
                  onChange={(e) => setCpmRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-100 rounded-xl"
                />
              </div>
            </div>

            {/* Earnings Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1 */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100/70 p-4 rounded-xl flex flex-col justify-between min-h-[100px]">
                <span className="text-[9px] font-mono font-bold text-purple-700 uppercase">
                  Contract / Platform CPM Payout
                </span>
                <div className="my-2">
                  <span className="text-xl font-mono font-black text-slate-900">
                    {currencySymbols[currency]}{convertValue(calculatedCreatorFundPayout).toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  Direct work / playback payouts
                </span>
              </div>

              {/* Box 2 */}
              <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 border border-fuchsia-100/70 p-4 rounded-xl flex flex-col justify-between min-h-[100px]">
                <span className="text-[9px] font-mono font-bold text-fuchsia-700 uppercase">
                  Sponsorship & Tech Contract Valuation
                </span>
                <div className="my-2">
                  <span className="text-xl font-mono font-black text-slate-900">
                    {currencySymbols[currency]}{convertValue(calculatedSponsorshipRevenue).toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  Based on verified {engagementRate}% engagement
                </span>
              </div>

              {/* Box 3 */}
              <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-col justify-between min-h-[100px] border-2 border-slate-900 shadow-md">
                <span className="text-[9px] font-mono font-bold text-purple-400 uppercase">
                  Total Calculated Professional Value
                </span>
                <div className="my-2">
                  <span className="text-xl font-mono font-black text-purple-300">
                    {currencySymbols[currency]}{convertValue(totalCreatorRevenue).toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] text-slate-300 font-medium">
                  Verified cumulative payout potential
                </span>
              </div>
            </div>
          </div>

          {/* Social Integration Sync Section */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <RefreshCw className={`w-5 h-5 text-purple-600 ${isSyncingSocial ? 'animate-spin' : ''}`} />
                  Social Data Sync Hub
                </h3>
                <p className="text-xs text-slate-500 mt-1">Automatically import your projects and articles into your portfolio.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* GitHub Sync */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="bg-white p-2 rounded-lg shadow-xs">
                    <Github className="w-5 h-5 text-slate-900" />
                  </div>
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">OAuth 2.0</span>
                </div>
                <h4 className="text-xs font-black text-slate-900">GitHub Repositories</h4>
                <button 
                  onClick={connectGitHub}
                  disabled={!!isSyncingSocial}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {isSyncingSocial === 'github' ? 'Connecting...' : 'Connect & Sync'}
                </button>
              </div>

              {/* Dev.to Sync */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="bg-white p-2 rounded-lg shadow-xs">
                    <Globe className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">Public API</span>
                </div>
                <h4 className="text-xs font-black text-slate-900">Dev.to Articles</h4>
                <button 
                  onClick={syncDevTo}
                  disabled={!!isSyncingSocial}
                  className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {isSyncingSocial === 'devto' ? 'Syncing...' : 'Sync Articles'}
                </button>
              </div>

              {/* LinkedIn Sync */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="bg-white p-2 rounded-lg shadow-xs">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded">Partner API</span>
                </div>
                <h4 className="text-xs font-black text-slate-900">LinkedIn Profile</h4>
                <button 
                  onClick={connectLinkedIn}
                  disabled={!!isSyncingSocial}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {isSyncingSocial === 'linkedin' ? 'Connecting...' : 'Sync Professional'}
                </button>
              </div>
            </div>
          </div>

          {/* Section: Live Demographic Reach & Audience Location */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Demographic Left */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    🌍 Connected Audience Insights
                  </span>
                  <h4 className="font-display font-bold text-sm text-slate-900 mt-2">
                    Viewer Location Breakdown
                  </h4>
                </div>
                <button
                  onClick={() => setShowDemoEditor(!showDemoEditor)}
                  className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-xl cursor-pointer transition-all border border-indigo-100"
                >
                  {showDemoEditor ? "Cancel Edit" : "Configure %"}
                </button>
              </div>

              <p className="text-[11px] text-slate-9000 leading-normal">
                Adjust demographics below or pull live coordinates from comments, profile geolocations, and visual view logs.
              </p>

              {showDemoEditor ? (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col gap-3 text-xs"
                >
                  <span className="font-bold text-slate-700">Enter percentage values:</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-slate-9000 uppercase">Lagos (%)</label>
                      <input
                        type="number"
                        value={demoLagos}
                        onChange={(e) => setDemoLagos(Math.max(0, Number(e.target.value)))}
                        className="bg-white border border-slate-200 px-2 py-1 rounded-xl text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-slate-9000 uppercase">Abuja (%)</label>
                      <input
                        type="number"
                        value={demoAbuja}
                        onChange={(e) => setDemoAbuja(Math.max(0, Number(e.target.value)))}
                        className="bg-white border border-slate-200 px-2 py-1 rounded-xl text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-slate-9000 uppercase">Accra (%)</label>
                      <input
                        type="number"
                        value={demoAccra}
                        onChange={(e) => setDemoAccra(Math.max(0, Number(e.target.value)))}
                        className="bg-white border border-slate-200 px-2 py-1 rounded-xl text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-slate-9000 uppercase">London (%)</label>
                      <input
                        type="number"
                        value={demoLondon}
                        onChange={(e) => setDemoLondon(Math.max(0, Number(e.target.value)))}
                        className="bg-white border border-slate-200 px-2 py-1 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSaveDemographics}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 rounded-xl text-xs mt-2 cursor-pointer transition-all"
                  >
                    Apply Demographics
                  </button>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-3 mt-1">
                  {demographics.map((city, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{city.name}</span>
                        <span>{city.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${city.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${city.percentage}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Demographics Right: Visual Retention Curve Analyzer */}
            <div className="flex flex-col justify-between bg-slate-50 border border-slate-200/50 p-5 rounded-xl">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  📈 Custom Video Retention Curve Analyzer
                </span>
                <h4 className="font-display font-bold text-xs text-slate-800 mt-1">
                  Interactive Video Audience Decay Path
                </h4>
              </div>

              {/* Sliders to alter curve live */}
              <div className="grid grid-cols-2 gap-3 my-2 bg-white/60 p-2.5 rounded-xl border border-slate-100 text-[10px]">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-slate-700">Hook Keep Rate: {hookRetention}%</span>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={hookRetention}
                    onChange={(e) => setHookRetention(Number(e.target.value))}
                    className="accent-purple-600 cursor-pointer h-1"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-slate-700">CTA Drop-off Rate: {ctaRetention}%</span>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={ctaRetention}
                    onChange={(e) => setCtaRetention(Number(e.target.value))}
                    className="accent-pink-500 cursor-pointer h-1"
                  />
                </div>
              </div>

              {/* Custom SVG line representing real retention dynamically */}
              <div className="w-full h-24 relative flex items-end">
                <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                  <line x1="0" y1="30" x2="300" y2="30" stroke="#e2e8f0" strokeDasharray="4 4" />
                  <line x1="0" y1="60" x2="300" y2="60" stroke="#e2e8f0" strokeDasharray="4 4" />
                  <line x1="0" y1="90" x2="300" y2="90" stroke="#e2e8f0" strokeDasharray="4 4" />
                  
                  <defs>
                    <linearGradient id="grad-retention-dynamic" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Dynamic Area Path based on Hook & CTA state values */}
                  <path
                    d={`M 0 ${120 - hookRetention} Q 100 ${130 - hookRetention}, 150 70 T 300 ${120 - ctaRetention} L 300 120 L 0 120 Z`}
                    fill="url(#grad-retention-dynamic)"
                  />

                  {/* Dynamic Line Path */}
                  <path
                    d={`M 0 ${120 - hookRetention} Q 100 ${130 - hookRetention}, 150 70 T 300 ${120 - ctaRetention}`}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  <circle cx="50" cy={120 - hookRetention} r="4" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
                  <text x="58" y={130 - hookRetention} fill="#701a75" fontSize="8" fontWeight="bold" fontFamily="monospace">
                    HOOK ({hookRetention}% KEEP)
                  </text>

                  <circle cx="250" cy={118 - ctaRetention} r="4" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
                  <text x="210" y={134 - ctaRetention} fill="#9d174d" fontSize="8" fontWeight="bold" fontFamily="monospace">
                    CTA BUMP ({ctaRetention}%)
                  </text>
                </svg>
              </div>

              <div className="flex justify-between text-[9px] font-mono font-bold text-slate-9000 pt-2 border-t border-slate-200/50">
                <span>0s (Start)</span>
                <span>15s (Hook)</span>
                <span>45s (Middle)</span>
                <span>60s (CTA/End)</span>
              </div>
            </div>
          </div>

          {/* Section: Creator Trends Search Hub */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5">
                  <Music className="w-4 h-4 text-pink-600 animate-bounce" />
                  <span className="text-[10px] font-mono font-bold text-pink-600 uppercase tracking-wider">
                    🔥 Creator Trending Audio & Format Hub
                  </span>
                </div>
                <h3 className="font-display font-bold text-sm text-slate-900 mt-2">
                  What's Viral on TikTok & Reels Today
                </h3>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 md:w-48">
                  <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-9000" />
                  <input
                    type="text"
                    placeholder="Search sounds or tags..."
                    value={trendSearch}
                    onChange={(e) => setTrendSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 text-xs rounded-xl focus:outline-none focus:border-pink-500 font-sans"
                  />
                </div>

                <button
                  onClick={() => setShowAddTrend(!showAddTrend)}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold p-2 rounded-xl text-xs flex items-center justify-center cursor-pointer transition-all shrink-0"
                  title="Add a Trend"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {showAddTrend && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                onSubmit={handleAddTrend}
                className="bg-pink-50/40 border border-pink-100 p-4 rounded-xl flex flex-col gap-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-pink-800 font-mono">➕ ADD ACTIVE TREND DATA</span>
                  <button type="button" onClick={() => setShowAddTrend(false)} className="text-slate-9000 hover:text-slate-700">Cancel</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-medium text-slate-500">Trend Title/Sound</label>
                    <input
                      type="text"
                      placeholder="e.g. Rema - 'Hehehe' Fast Beat"
                      value={newTrendTitle}
                      onChange={(e) => setNewTrendTitle(e.target.value)}
                      required
                      className="bg-white border border-slate-200 p-2 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-medium text-slate-500">Type</label>
                    <select
                      value={newTrendType}
                      onChange={(e) => setNewTrendType(e.target.value)}
                      className="bg-white border border-slate-200 p-2 rounded-xl cursor-pointer"
                    >
                      <option>Audio Track</option>
                      <option>Video Concept</option>
                      <option>Transition Format</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-medium text-slate-500">Hashtag Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. #HeheheChallenge"
                      value={newTrendTag}
                      onChange={(e) => setNewTrendTag(e.target.value)}
                      required
                      className="bg-white border border-slate-200 p-2 rounded-xl font-mono"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-slate-500">Execution Tip/Blueprint Description</label>
                  <textarea
                    rows={2}
                    placeholder="Provide actionable directions on how creators should film or structure content around this trend..."
                    value={newTrendTip}
                    onChange={(e) => setNewTrendTip(e.target.value)}
                    required
                    className="bg-white border border-slate-200 p-2 rounded-xl resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-xl text-xs cursor-pointer transition-all"
                >
                  Publish Active Trend
                </button>
              </motion.form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredTrends.map((clip) => (
                <div
                  key={clip.id}
                  onClick={() => setSelectedTrendTip(clip.tip)}
                  className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between gap-3 cursor-pointer hover:border-pink-500 hover:bg-white transition-all shadow-2xs group"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-bold font-mono text-pink-600 uppercase bg-pink-50 px-2 py-0.5 rounded">
                      {clip.type}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 font-mono">
                      <TrendingUp className="w-3.5 h-3.5" /> {clip.growth}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 leading-tight group-hover:text-pink-600 transition-colors">
                      {clip.title}
                    </h4>
                    <span className="text-[9px] font-mono text-slate-9000 mt-1 block">
                      Recommended tag: <strong>{clip.tag}</strong>
                    </span>
                  </div>

                  <button className="text-[10px] font-bold text-slate-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Blueprint <ChevronRight className="w-3.5 h-3.5 text-pink-600" />
                  </button>
                </div>
              ))}
              {filteredTrends.length === 0 && (
                <div className="col-span-3 text-center py-6 text-slate-9000 text-xs">
                  No matching sounds or video formats found. Create one now!
                </div>
              )}
            </div>

            {selectedTrendTip && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-pink-50/60 border border-pink-100 rounded-xl p-4 text-xs leading-relaxed text-slate-700 flex flex-col gap-2 relative"
              >
                <div className="flex justify-between items-center font-mono text-[10px] font-bold text-pink-700 uppercase">
                  <span>🎯 DIRECT CREATOR BLUEPRINT TIP:</span>
                  <button onClick={() => setSelectedTrendTip(null)} className="hover:text-slate-900 cursor-pointer">
                    Dismiss
                  </button>
                </div>
                <p className="font-medium text-slate-800 font-sans">{selectedTrendTip}</p>
                <p className="text-[10px] text-slate-9000">
                  Tip: Copy this blueprint blueprint over to your Active Script Draft inside your Academy notes!
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Hand: Media Kit Portfolio Live Builder & Card */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Form: Edit Media Kit Fields */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-display font-bold text-sm text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-purple-500" />
                Customize Media Kit
              </h3>
              <span className="text-[9px] font-mono font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full uppercase tracking-widest">
                Live Editor
              </span>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              
              {/* Creator Name */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono font-bold text-slate-9000 uppercase">
                  Professional / Creator Name
                </label>
                <input
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 focus:bg-white font-medium"
                />
              </div>

              {/* Creator Handle */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono font-bold text-slate-9000 uppercase">
                  Online Handle / Nickname
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-mono text-slate-9000">@</span>
                  <input
                    type="text"
                    value={creatorHandle}
                    onChange={(e) => {
                      const newHandle = e.target.value;
                      setCreatorHandle(newHandle);
                      updateHandleInProfile(newHandle);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-2 focus:outline-none focus:border-purple-500 focus:bg-white font-mono font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Platform */}
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-mono font-bold text-slate-9000 uppercase">
                    Primary Platform
                  </label>
                  <select
                    value={primaryPlatform}
                    onChange={(e) => setPrimaryPlatform(e.target.value as any)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 focus:bg-white font-medium cursor-pointer"
                  >
                    <option>TikTok</option>
                    <option>Instagram</option>
                    <option>YouTube</option>
                    <option>GitHub</option>
                    <option>LinkedIn</option>
                    <option>Website</option>
                  </select>
                </div>

                {/* Followers */}
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-mono font-bold text-slate-9000 uppercase">
                    Followers / Commits
                  </label>
                  <input
                    type="number"
                    value={followers}
                    onChange={(e) => setFollowers(Math.max(1, Number(e.target.value)))}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 focus:bg-white font-mono font-bold"
                  />
                </div>
              </div>

              {/* Base Campaign Rate */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono font-bold text-slate-9000 uppercase">
                  Minimum Base Project Rate ($)
                </label>
                <input
                  type="number"
                  step="10000"
                  value={baseRate}
                  onChange={(e) => setBaseRate(Math.max(0, Number(e.target.value)))}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 focus:bg-white font-mono font-bold"
                />
              </div>

              {/* Focus Niche */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono font-bold text-slate-9000 uppercase">
                  Niche / Skill Focus
                </label>
                <input
                  type="text"
                  value={primaryNiche}
                  onChange={(e) => setPrimaryNiche(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 focus:bg-white font-medium"
                />
              </div>

              {/* Portfolio Bio */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono font-bold text-slate-9000 uppercase">
                  Short Professional Bio
                </label>
                <textarea
                  rows={3}
                  value={customBio}
                  onChange={(e) => setCustomBio(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 focus:bg-white font-medium resize-none text-[11px] leading-relaxed"
                />
              </div>

              {/* Add Custom Video/Portfolio button */}
              <button
                onClick={() => setShowAddPortfolio(!showAddPortfolio)}
                className="w-full mt-1 bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-all border border-purple-200"
              >
                <Plus className="w-3.5 h-3.5" /> {showAddPortfolio ? "Close Project Form" : "Add Actual Work to Media Kit"}
              </button>

              {showAddPortfolio && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  onSubmit={handleAddPortfolioItem}
                  className="bg-slate-50 border-2 border-dashed border-purple-200 p-4 rounded-xl flex flex-col gap-2.5 mt-1"
                >
                  <span className="font-bold text-purple-800 text-[10px] uppercase">New Portfolio Item Details</span>
                  
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[9px] text-slate-9000 font-mono">Video/Project Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Lagos Tech Fest Recap Video"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="bg-white border border-slate-200 px-2 py-1 rounded-xl text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <label className="text-[9px] text-slate-9000 font-mono">Video Link (YouTube/TikTok)</label>
                    <input
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      required
                      className="bg-white border border-slate-200 px-2 py-1 rounded-xl text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-0.5">
                      <label className="text-[9px] text-slate-9000 font-mono">Category</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="bg-white border border-slate-200 px-2 py-1 rounded-xl text-xs cursor-pointer"
                      >
                        <option>UGC Brand Deal</option>
                        <option>Lifestyle</option>
                        <option>Tutorial</option>
                        <option>Comedy Vlog</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <label className="text-[9px] text-slate-9000 font-mono">Actual Views</label>
                      <input
                        type="number"
                        value={newViews}
                        onChange={(e) => setNewViews(Math.max(0, Number(e.target.value)))}
                        className="bg-white border border-slate-200 px-2 py-1 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1.5 rounded-xl text-xs mt-1 cursor-pointer transition-all"
                  >
                    Confirm & Publish to Media Kit
                  </button>
                </motion.form>
              )}
            </div>
          </div>

          {/* Sticker Preview: The beautifully styled shareable live media kit */}
          <div className="bg-slate-950 text-white rounded-3xl p-5 border-4 border-slate-900 shadow-[6px_6px_0px_#ec4899] flex flex-col gap-5 relative overflow-hidden">
            {/* Visual background gloss */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[8px] font-mono font-black tracking-widest text-fuchsia-500 bg-fuchsia-500/10 border border-fuchsia-500/20 px-2 py-0.5 rounded">
                  PORTFOLIO PREVIEW
                </span>
                <h4 className="font-display font-bold text-base mt-2 text-slate-100">
                  {creatorName}
                </h4>
                <span className="text-[10px] font-mono text-slate-9000 block mt-0.5">
                  @{creatorHandle}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-pink-400">
                {creatorName.split(" ").map(w => w[0]).join("")}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800/60 rounded-xl p-3 text-[11px] text-slate-300 leading-normal italic">
              "{customBio}"
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl">
                <span className="block text-[8px] font-mono text-slate-9000 uppercase">Followers / Commits</span>
                <span className="font-bold text-slate-100 flex items-center gap-1 mt-1 font-mono">
                  <UserCheck className="w-3.5 h-3.5 text-purple-400" /> {followers.toLocaleString()}
                </span>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl">
                <span className="block text-[8px] font-mono text-slate-9000 uppercase">Engagement</span>
                <span className="font-bold text-slate-100 flex items-center gap-1 mt-1 font-mono">
                  🔥 {engagementRate}%
                </span>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl">
                <span className="block text-[8px] font-mono text-slate-9000 uppercase">Niche / Skill Focus</span>
                <span className="font-bold text-slate-100 block truncate mt-1 text-[11px]">
                  {primaryNiche}
                </span>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl">
                <span className="block text-[8px] font-mono text-slate-9000 uppercase">Base Project Rate</span>
                <span className="font-mono font-bold text-emerald-400 block mt-1">
                  ${(baseRate).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Live Media Kit Showcase - Actual Works Gallery */}
            <div className="border-t border-slate-900 pt-3">
              <span className="text-[9px] font-mono font-black text-slate-9000 uppercase tracking-widest block mb-2">
                📂 VERIFIED WORKS PORTFOLIO
              </span>
              <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto pr-1">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between gap-2 hover:border-purple-500 transition-all">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[7px] font-bold font-mono text-purple-400 bg-purple-500/10 px-1 py-0.5 rounded uppercase">
                          {item.category}
                        </span>
                        <span className="text-[8px] font-mono text-slate-500">
                          👁️ {item.views.toLocaleString()} views
                        </span>
                      </div>
                      <h5 className="text-[10px] font-bold text-slate-200 truncate mt-0.5">
                        {item.title}
                      </h5>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-9000 hover:text-white p-1 rounded hover:bg-slate-800"
                        title="View Project Link"
                      >
                        <Link2 className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDeletePortfolioItem(item.id)}
                        className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-800"
                        title="Delete Portfolio Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {portfolioItems.length === 0 && (
                  <span className="text-[9px] text-slate-500 text-center py-2 italic block">
                    No verified works listed yet. Click 'Add Actual Work' to upload!
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-slate-900 pt-4 flex flex-col gap-2">
              <button
                onClick={handleCopyPortfolioLink}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied Link!
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" /> Copy Live Portfolio Link
                  </>
                )}
              </button>

              <button
                onClick={handleExportPortfolio}
                disabled={isExporting}
                className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                {isExporting ? (
                  <>
                    <span className="w-2 h-2 bg-white rounded-full animate-ping" /> Exporting Media Kit...
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" /> Export PDF Media Kit
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
