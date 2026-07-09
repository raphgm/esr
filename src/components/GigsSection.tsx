import React, { useState } from "react";
import { PageBanner } from "./PageBanner";
import {
  Briefcase,
  Sparkles,
  Award,
  CheckCircle2,
  Send,
  Plus,
  Search,
  Star,
  Clock,
  ShieldCheck,
  DollarSign,
  UserCheck,
  X,
  MessageSquare,
  Check,
  ChevronRight,
  User,
  AlertCircle,
  BookOpen,
  Tv,
  ShoppingBag,
  Workflow,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile } from "../types";

// Explicit interface for Gig Listings
export interface Gig {
  id: string;
  title: string;
  sellerName: string;
  sellerAvatar: string;
  sellerRating: number;
  deliveryDays: number;
  price: number; // in NGN
  category: string;
  description: string;
  features: string[];
  reviewsCount: number;
  image: string;
  verified: boolean;
}

interface GigsSectionProps {
  userProfile: UserProfile;
  onOpenAiChat: (prompt: string, context: string) => void;
}

export default function GigsSection({ userProfile, onOpenAiChat }: GigsSectionProps) {
  // Mock Gigs - optimized with realistic Gen-Z gig titles and visuals
  const [gigs, setGigs] = useState<Gig[]>([
    {
      id: "gig-priority-pro",
      title: "IT Pro & Creator Priority: Hire Top-Tier Skilled Pros for Tech & Content Setup",
      sellerName: "ESTARR IT & Creator Hub",
      sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      sellerRating: 5.0,
      reviewsCount: 128,
      deliveryDays: 3,
      price: 45000,
      category: "Writing & Content",
      description: "ESTARR is built to ensure IT pros and creators can monetize their talents efficiently and reliably across the continent. By selecting IT Pro & Creator Priority, you get matched instantly with top-tier skilled pros who handle your media kits, technical deployment, escrow configuration, and direct partner pitching.",
      features: [
        "IT Pro & Creator Priority Fast-Track onboarding",
        "Strategic sponsor pitch & tech contract template setup",
        "Priceless networking hub direct introduction",
        "Verified Escrow contract integration"
      ],
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
      verified: true
    },
    {
      id: "gig-1",
      title: "I will edit high-retention viral CapCut reels & TikTok clips",
      sellerName: "Adebayo Salami",
      sellerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      sellerRating: 4.9,
      reviewsCount: 38,
      deliveryDays: 2,
      price: 15000,
      category: "Creative Operations",
      description: "Get attention-grabbing hooks, retention-first text overlays, dynamic sound design, and custom timing optimized for short-form algorithms. I have edited videos pulling over 1M+ views in Nigeria and Ghana.",
      features: [
        "1x Up to 60-second edited video",
        "Subtitles & visual sound effects",
        "Color grading & trend-optimized pacing",
        "2 Revision iterations"
      ],
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=600",
      verified: true
    },
    {
      id: "gig-2",
      title: "I will design aesthetic pitch decks and Canva presentations",
      sellerName: "Chinedu Okafor",
      sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      sellerRating: 5.0,
      reviewsCount: 14,
      deliveryDays: 3,
      price: 25000,
      category: "Creative Operations",
      description: "Pitching your startup or looking for brand sponsorships? I'll design a customized, highly modern Canva deck. No dull templates. Bold Swiss-style layouts, clean data charts, and beautiful typography.",
      features: [
        "Up to 10 professionally formatted slides",
        "Source link + PDF export",
        "Custom vector icons and brand-aligned colors",
        "Commercial usage rights"
      ],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300",
      verified: true
    },
    {
      id: "gig-3",
      title: "I will set up your automated WhatsApp Business Store Catalog",
      sellerName: "Fatima Bello",
      sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      sellerRating: 4.8,
      reviewsCount: 29,
      deliveryDays: 1,
      price: 12000,
      category: "Tech & Setup",
      description: "Stop spending hours explaining prices in DM. I will configure your WhatsApp Business profile, load up to 10 products into your catalog, construct structured auto-replies, and link digital payments.",
      features: [
        "Complete WhatsApp Business setup",
        "Up to 10 products with images & descriptions",
        "Custom greeting & away message flow",
        "1-Hour training tutorial session"
      ],
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=300",
      verified: true
    },
    {
      id: "gig-4",
      title: "I will draft high-yielding brand sponsorship pitches & media bios",
      sellerName: "Joy Alao",
      sellerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      sellerRating: 4.7,
      reviewsCount: 22,
      deliveryDays: 2,
      price: 18000,
      category: "Writing & Content",
      description: "Struggling with what to write when sliding into brand DMs or cold emailing sponsors? I will write 3 custom outreach templates, a professional creator bio, and a media kit value statement.",
      features: [
        "3x Target outreach pitch drafts",
        "1x Short professional bio statement",
        "Hook outline for your media kit",
        "1 Revision"
      ],
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=300",
      verified: false
    },
    {
      id: "gig-5",
      title: "I will build a custom automated Poultry Vaccination & Feeding Calendar",
      sellerName: "Kofi Mensah",
      sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
      sellerRating: 4.9,
      reviewsCount: 19,
      deliveryDays: 2,
      price: 20000,
      category: "Agric & Business",
      description: "Maximize your flock survivability. I'll build a tailored broiler or layer calendar template tracking feed consumption weights, water treatments, vaccination days, and sanitization schedules.",
      features: [
        "Custom interactive calendar sheet",
        "Exact vaccine dose instruction cards",
        "Feed conversion multiplier calculators",
        "WhatsApp support chat access for 15 days"
      ],
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600",
      verified: true
    },
    {
      id: "gig-train-1",
      title: "I will provide high-precision RLHF & SFT data for LLM training",
      sellerName: "ESTARR AI Labs",
      sellerAvatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=150",
      sellerRating: 5.0,
      reviewsCount: 412,
      deliveryDays: 7,
      price: 250000,
      category: "Train AI",
      description: "Get high-quality human-annotated data for supervised fine-tuning and reinforcement learning from human feedback. We specialize in code, logic, and multi-dialect African languages.",
      features: [
        "1000+ Human-verified prompt-response pairs",
        "RLHF / SFT specialized pipelines",
        "Multi-dialect support (Yoruba, Igbo, Swahili, etc.)",
        "Detailed quality assurance reports"
      ],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
      verified: true
    },
    {
      id: "gig-build-1",
      title: "I will build a custom RAG-based AI Agent for your enterprise",
      sellerName: "Kwame Appiah",
      sellerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      sellerRating: 4.9,
      reviewsCount: 86,
      deliveryDays: 14,
      price: 1200000,
      category: "Build AI",
      description: "Complete end-to-end development of custom AI agents using Retrieval-Augmented Generation (RAG). Includes vector database setup, LLM integration, and API deployment.",
      features: [
        "Custom RAG Pipeline Architecture",
        "Vector database integration (Pinecone/Weaviate)",
        "LangChain or LlamaIndex implementation",
        "REST API & Frontend integration"
      ],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
      verified: true
    }
  ]);

  // Golden Path Templates - Platform Engineering inspired
  const gigTemplates = [
    {
      title: "Viral Short-Form Video Blueprint",
      category: "Creative Operations",
      price: 25000,
      delivery: "2",
      desc: "Standardized high-retention viral video editing. Optimized for TikTok, Reels, and YouTube Shorts. Includes hooks, captions, and sound design.",
      features: "Hook development\nRetention-first captions\nSFX & Color Grading\n1x 60-second deliverable"
    },
    {
      title: "Technical Cloud Infrastructure Setup",
      category: "Technical & Platform Engineering",
      price: 150000,
      delivery: "5",
      desc: "Production-ready AWS/GCP infrastructure deployment. Includes VPC setup, S3 buckets, and CI/CD pipeline automation.",
      features: "Infrastructure as Code (Terraform)\nSecure VPC & IAM config\nGitHub Actions CI/CD\nPerformance monitoring"
    },
    {
      title: "Corporate Brand Identity System",
      category: "Creative Operations",
      price: 75000,
      delivery: "4",
      desc: "Comprehensive visual identity design. Logo system, typography, color palette, and usage guidelines.",
      features: "Logo Suite (SVG, PNG)\nColor System & Typography\nBrand Guidelines PDF\nSocial Media Kit"
    }
  ];

  // Applet state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeGig, setActiveGig] = useState<Gig | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Escrow Hiring Flow states
  const [hiringStep, setHiringStep] = useState<"details" | "requirements" | "payment" | "success">("details");
  const [clientRequirements, setClientRequirements] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ESTARR Wallet");

  // Create Gig states
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<string>("Creative Operations");
  const [newPrice, setNewPrice] = useState("");
  const [newDelivery, setNewDelivery] = useState("2");
  const [newDesc, setNewDesc] = useState("");
  const [newFeatures, setNewFeatures] = useState("");

  const applyTemplate = (template: typeof gigTemplates[0]) => {
    setNewTitle(template.title);
    setNewCategory(template.category as Gig["category"]);
    setNewPrice(template.price.toString());
    setNewDelivery(template.delivery);
    setNewDesc(template.desc);
    setNewFeatures(template.features);
  };

  // AI Assistant inside Gigs Marketplace
  const [aiSkillInput, setAiSkillInput] = useState("");
  const [aiGeneratedTitle, setAiGeneratedTitle] = useState("");
  const [aiGeneratedDesc, setAiGeneratedDesc] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Categories list
  const categories = ["All", "Train AI", "Build AI", "Creative Operations", "Writing & Content", "Technical & Platform Engineering", "Agric & Business"];

  // Filter Gigs
  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch =
      gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || gig.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle Order submit & funding Escrow
  const handleInitiateOrder = (gig: Gig) => {
    setActiveGig(gig);
    setHiringStep("requirements");
  };

  const handleFundEscrow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientRequirements.trim()) {
      alert("Please enter brief instructions for the freelancer to get started!");
      return;
    }
    setHiringStep("payment");
  };

  const handleConfirmPayment = () => {
    setHiringStep("success");
  };

  // Create new Gig
  const handleCreateGig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newDesc) {
      alert("Please fill in the title, price, and description of your gig.");
      return;
    }

    const featureArray = newFeatures
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const created: Gig = {
      id: `gig-${Date.now()}`,
      title: newTitle,
      sellerName: userProfile.name,
      sellerAvatar: userProfile.avatar,
      sellerRating: 5.0,
      reviewsCount: 0,
      deliveryDays: parseInt(newDelivery) || 2,
      price: parseFloat(newPrice),
      category: newCategory,
      description: newDesc,
      features: featureArray.length > 0 ? featureArray : ["On-time delivery", "Professional standard output"],
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=300",
      verified: true
    };

    setGigs([created, ...gigs]);
    setIsCreateOpen(false);
    // Reset inputs
    setNewTitle("");
    setNewPrice("");
    setNewDelivery("2");
    setNewDesc("");
    setNewFeatures("");
    alert("Congratulations! Your service gig is now published and live in the marketplace.");
  };

  // AI helper: generate details for a gig
  const handleAiOptimizeGig = () => {
    if (!aiSkillInput.trim()) return;
    setIsAiLoading(true);
    // Simulate smart algorithmic writing context
    setTimeout(() => {
      setAiGeneratedTitle(`I will build professional custom ${aiSkillInput} services for your brand`);
      setAiGeneratedDesc(`A premier, professionally engineered service gig centering standard ${aiSkillInput} strategies. Built from scratch to optimize daily client outreach, convert followers into brand sponsors, or maximize business operational yields with local African ecosystem relevance.`);
      setIsAiLoading(false);
    }, 1000);
  };

  const handleUseAiOptimized = () => {
    setNewTitle(aiGeneratedTitle);
    setNewDesc(aiGeneratedDesc);
    setNewFeatures("100% bespoke deliverable\nOptimized files for rapid launch\nExpert review & Q&A session");
    setAiGeneratedTitle("");
    setAiGeneratedDesc("");
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-800">
      <PageBanner
        title="ESTARR AI & Creative Ops Marketplace"
        subtitle="ELITE TALENT NODES"
        description="Hire skilled Gen Z creators and vocational experts, or sell your own skills as structured gigs. All orders are backed by ESTARR 100% Escrow Protection—payment stays safe until delivery is confirmed."
        icon={Briefcase}
        actions={
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsCreateOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Publish My Gig
            </button>
            <button
              onClick={() => {
                onOpenAiChat(
                  "Explain how the ESTARR Gig Escrow Protection workflow ensures that freelancers get paid on time and clients get their files safely.",
                  "general"
                );
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" /> Gig Escrow Guarantee
            </button>
          </div>
        }
      />

      {/* Main Grid: Filters, Search, and Gigs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Hand: Category Filtering & AI Assistant */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Categories */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm flex flex-col gap-3">
            <h3 className="font-display font-bold text-xs text-slate-900 uppercase tracking-wider font-mono">
              Service Niches
            </h3>
            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-slate-950 text-white"
                      : "text-slate-500 hover:bg-slate-100 bg-slate-50 border border-slate-100"
                  }`}
                >
                  {cat === "All" ? "🌍 All Services" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* AI Gig Title Optimizer */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-3xl p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-purple-700 uppercase tracking-wider">
                ESTARR AI Gig Builder
              </span>
            </div>
            <h4 className="font-display font-bold text-xs text-slate-800 leading-tight">
              Draft a Gig Instantly
            </h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Struggling to describe what you offer? Type your core skill and let the AI draft your listing structure.
            </p>

            <div className="flex flex-col gap-2 mt-1">
              <input
                type="text"
                placeholder="e.g. Canva logo design"
                value={aiSkillInput}
                onChange={(e) => setAiSkillInput(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleAiOptimizeGig}
                disabled={isAiLoading || !aiSkillInput.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-100 text-white py-2 rounded-xl text-[11px] font-bold uppercase cursor-pointer"
              >
                {isAiLoading ? "Writing Blueprint..." : "Generate Description"}
              </button>
            </div>

            {aiGeneratedTitle && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-purple-100 p-3 rounded-xl flex flex-col gap-2 text-[10px] text-slate-700 mt-2"
              >
                <div className="font-mono font-bold text-purple-700">AI PROPOSAL:</div>
                <p className="font-bold font-sans text-slate-800 text-[11px] leading-tight">
                  {aiGeneratedTitle}
                </p>
                <p className="leading-relaxed text-slate-500">{aiGeneratedDesc}</p>
                <button
                  onClick={handleUseAiOptimized}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-1.5 rounded-xl uppercase tracking-tight"
                >
                  Apply to Draft Form
                </button>
              </motion.div>
            )}
          </div>

          {/* Secure Escrow Notice */}
          <div className="bg-slate-950 text-slate-300 border border-slate-800 rounded-3xl p-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                Escrow Protection System
              </span>
            </div>
            <p className="text-[10px] leading-relaxed text-slate-400">
              Every job created is linked to an independent escrow contract. Funds are debited from the buyer but held securely until final files are uploaded and validated.
            </p>
            <div className="border-t border-slate-900 pt-3 flex flex-col gap-1 text-[9px] font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Active Escrows:</span>
                <span className="text-emerald-400 font-bold">148 contracts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Funded Value:</span>
                <span className="text-white font-bold">$4.2M USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Hand: Search and Gigs Grid */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          
          {/* Search bar */}
          <div className="relative bg-white border border-slate-200/80 rounded-xl shadow-xs overflow-hidden flex items-center pr-3">
            <span className="pl-4 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search for video editors, pitch designers, WhatsApp specialists, or agricultural consultants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-none focus:outline-none text-xs font-medium px-3 py-3.5 text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Gigs List */}
          {filteredGigs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center gap-4">
              <AlertCircle className="w-12 h-12 text-slate-300" />
              <div>
                <h4 className="font-display font-bold text-base text-slate-800">No Services Found</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Try clearing your search query or choosing a different niche filter.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredGigs.map((gig) => (
                <div
                  key={gig.id}
                  className={`${
                    gig.id === "gig-priority-pro"
                      ? "bg-[#FAF5E6] border-amber-300/80 hover:border-amber-500/80"
                      : "bg-white border-slate-200/80 hover:border-purple-500/80"
                  } border rounded-3xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group`}
                >
                  {/* Gig Header Cover */}
                  <div className="h-40 relative overflow-hidden">
                    <div className={`w-full h-full bg-gradient-to-br ${
                      gig.category === "Creative Operations" ? "from-indigo-600 to-purple-700" :
                      gig.category === "Writing & Content" ? "from-amber-500 to-orange-600" :
                      gig.category === "Technical & Platform Engineering" ? "from-cyan-600 to-blue-700" :
                      gig.category === "Agric & Business" ? "from-emerald-600 to-teal-700" :
                      "from-slate-700 to-slate-800"
                    } group-hover:scale-105 transition-transform duration-500 flex items-center justify-center`}>
                      <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                        {gig.category === "Creative Operations" && <Sparkles className="w-6 h-6 text-white/80" />}
                        {gig.category === "Writing & Content" && <BookOpen className="w-6 h-6 text-white/80" />}
                        {gig.category === "Technical & Platform Engineering" && <Tv className="w-6 h-6 text-white/80" />}
                        {gig.category === "Agric & Business" && <Briefcase className="w-6 h-6 text-white/80" />}
                        {gig.category === "Train AI" && <Cpu className="w-6 h-6 text-white/80" />}
                        {gig.category === "Build AI" && <Workflow className="w-6 h-6 text-white/80" />}
                        {!["Creative Operations", "Writing & Content", "Technical & Platform Engineering", "Agric & Business", "Train AI", "Build AI"].includes(gig.category) && <Plus className="w-6 h-6 text-white/80" />}
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-mono font-bold text-purple-300 border border-slate-800">
                      {gig.category}
                    </div>
                  </div>

                  {/* Seller Bio Row */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={gig.sellerAvatar}
                            alt={gig.sellerName}
                            className="w-6 h-6 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <span className="text-[11px] font-bold text-slate-800 block leading-tight">
                              {gig.sellerName}
                            </span>
                            {gig.verified && (
                              <span className="text-[8px] font-mono font-extrabold text-emerald-600 flex items-center gap-0.5 uppercase tracking-wider">
                                <Award className="w-2.5 h-2.5" /> ESTARR Certified
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs font-bold font-mono text-slate-800">
                            {gig.sellerRating}
                          </span>
                          <span className="text-[10px] text-slate-9000">
                            ({gig.reviewsCount})
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="font-display font-bold text-sm text-slate-900 mt-3 group-hover:text-purple-500 transition-colors leading-snug">
                        {gig.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {gig.description}
                      </p>
                    </div>

                    {/* Meta stats & Price footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-9000" />
                        <span>{gig.deliveryDays} Days delivery</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-slate-9000 uppercase block">Starting at</span>
                        <span className="text-base font-black font-mono text-slate-900">
                          ${gig.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleInitiateOrder(gig)}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold uppercase cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                    >
                      Hire & Fund Escrow <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: Create Gig Workspace Form */}
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-2 border-slate-100 rounded-3xl max-w-xl w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsCreateOpen(false)}
                className="absolute top-5 right-5 text-slate-9000 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-mono font-bold text-purple-500 bg-purple-50 px-2.5 py-1 rounded-full uppercase">
                  ⚙️ Service Publish Workspace
                </span>
                <h3 className="font-display font-bold text-xl text-slate-900 mt-2">
                  List Your Gig on ESTARR
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Put your vocational talents or digital skills to work. Fill out the blueprint to begin receiving direct Escrow orders.
                </p>
              </div>

              {/* Golden Path Templates */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Workflow className="w-4 h-4 text-indigo-500" />
                  <label className="font-mono text-[9px] font-bold text-slate-9000 uppercase tracking-widest">
                    Quick Launch: Golden Path Templates
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {gigTemplates.map((template, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyTemplate(template)}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left hover:border-purple-500 hover:bg-purple-50 transition-all group"
                    >
                      <h4 className="text-[10px] font-black text-slate-900 uppercase leading-tight mb-1 group-hover:text-purple-600">
                        {template.title}
                      </h4>
                      <p className="text-[9px] text-slate-500 line-clamp-1">
                        {template.category}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleCreateGig} className="flex flex-col gap-4 text-xs">
                {/* Title */}
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] font-bold text-slate-9000 uppercase">
                    Your Gig Service Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. I will design aesthetic Instagram templates for small fashion brands"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 font-medium focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] font-bold text-slate-9000 uppercase">
                      Niche Category
                    </label>
                    <input
                      list="niche-categories"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Select or type..."
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 font-bold focus:outline-none focus:border-purple-500 w-full"
                    />
                    <datalist id="niche-categories">
                      <option value="Creative Operations" />
                      <option value="Writing & Content" />
                      <option value="Tech & Platform" />
                      <option value="Agric & Business" />
                      <option value="Train AI" />
                      <option value="Build AI" />
                    </datalist>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] font-bold text-slate-9000 uppercase">
                      Gig Price ($ USD)
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 15000"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 font-mono font-bold focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Delivery Days */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] font-bold text-slate-9000 uppercase">
                      Expected Delivery (Days)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="2"
                      value={newDelivery}
                      onChange={(e) => setNewDelivery(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 font-mono font-bold focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] font-bold text-slate-9000 uppercase">
                    Detailed Gig Description
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe exactly what value you bring, who this is for, and why they should choose you..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 font-medium focus:outline-none focus:border-purple-500 resize-none leading-relaxed"
                  />
                </div>

                {/* Features list */}
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] font-bold text-slate-9000 uppercase flex justify-between">
                    <span>What's Included (1 Per line)</span>
                    <span className="text-slate-300">Optional</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g.&#10;High-res raw source files&#10;3 Video cuts&#10;Commercial license included"
                    value={newFeatures}
                    onChange={(e) => setNewFeatures(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 font-medium focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase py-3 rounded-xl mt-3 transition-colors shadow-sm"
                >
                  🚀 Publish Service Listing
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Interactive Escrow Ordering & Requirements Form */}
      <AnimatePresence>
        {activeGig && hiringStep !== "details" && (
          <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-2 border-slate-100 rounded-3xl max-w-lg w-full p-6 md:p-8 relative"
            >
              <button
                onClick={() => {
                  setActiveGig(null);
                  setHiringStep("details");
                  setClientRequirements("");
                }}
                className="absolute top-5 right-5 text-slate-9000 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Requirements Input Step */}
              {hiringStep === "requirements" && (
                <div>
                  <div className="mb-5">
                    <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                      🔒 Step 1 of 2: Contract Details
                    </span>
                    <h3 className="font-display font-bold text-lg text-slate-900 mt-2">
                      Brief the Freelancer
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Provide clear requirements so <strong>{activeGig.sellerName}</strong> can deliver the exact files you need.
                    </p>
                  </div>

                  <form onSubmit={handleFundEscrow} className="flex flex-col gap-4 text-xs">
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-slate-9000 uppercase">Gig Selected</span>
                      <h4 className="font-bold text-xs text-slate-800">{activeGig.title}</h4>
                      <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1 border-t border-slate-200/50 pt-2 font-mono">
                        <span>Price: ${activeGig.price.toLocaleString()}</span>
                        <span>Delivery: {activeGig.deliveryDays} days</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[9px] font-bold text-slate-9000 uppercase">
                        Work Instructions or Target URLs
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="e.g. I need a Canva slide deck for my poultry farm startup. Here is our logo link, and the 5 key slides to include..."
                        value={clientRequirements}
                        onChange={(e) => setClientRequirements(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-purple-500 resize-none leading-relaxed font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase py-3 rounded-xl cursor-pointer"
                    >
                      Proceed to Secure Escrow Funding
                    </button>
                  </form>
                </div>
              )}

              {/* Payment / Funding Step */}
              {hiringStep === "payment" && (
                <div>
                  <div className="mb-5">
                    <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                      🛡️ Step 2 of 2: Escrow Lock
                    </span>
                    <h3 className="font-display font-bold text-lg text-slate-900 mt-2">
                      Fund Escrow Contract
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Your funds will be stored safely in an ESTARR Escrow vault. Only released once the work is delivered and you click verify.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 text-xs">
                    <div className="bg-slate-950 text-white border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
                      <div className="flex justify-between font-mono text-[9px] text-slate-9000 uppercase">
                        <span>Contract Type</span>
                        <span className="text-emerald-400">Guaranteed Escrow</span>
                      </div>
                      <h4 className="font-display font-bold text-xs">{activeGig.title}</h4>
                      <div className="border-t border-slate-900 pt-2.5 mt-1 flex justify-between items-baseline font-mono">
                        <span className="text-slate-9000">Escrow Total:</span>
                        <span className="text-base font-black text-emerald-400">
                          ${activeGig.price.toLocaleString()} USD
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] font-bold text-slate-9000 uppercase">
                        Choose Funding Source
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("ESTARR Wallet")}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                            paymentMethod === "ESTARR Wallet"
                              ? "border-purple-600 bg-purple-50/50"
                              : "border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <span className="font-bold text-slate-800 block">ESTARR Wallet</span>
                          <span className="text-[10px] font-mono font-bold text-purple-500 mt-1 block">
                            Bal: $180,000
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod("Bank Transfer")}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                            paymentMethod === "Bank Transfer"
                              ? "border-purple-600 bg-purple-50/50"
                              : "border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <span className="font-bold text-slate-800 block">Instant Transfer</span>
                          <span className="text-[10px] text-slate-500 mt-1 block">
                            Direct bank transfer
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-slate-500 leading-normal">
                        Backed by ESTARR Corporate Guarantee. In case of dispute, our customer assistance team is available 24/7 to review delivery file iterations.
                      </p>
                    </div>

                    <button
                      onClick={handleConfirmPayment}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase py-3 rounded-xl transition-colors shadow-sm"
                    >
                      🔒 Lock ${activeGig.price.toLocaleString()} in Escrow
                    </button>
                  </div>
                </div>
              )}

              {/* Success Screen */}
              {hiringStep === "success" && (
                <div className="text-center py-6 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full border border-emerald-500 text-emerald-600 flex items-center justify-center font-bold">
                    <Check className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">
                      Escrow Contract Funded!
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-xs mx-auto">
                      ${activeGig.price.toLocaleString()} USD has been secured under contract <strong>#ESG-{Math.floor(Math.random() * 90000) + 10000}</strong>.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-left text-xs w-full">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800 block">Instructions Transmitted</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          <strong>{activeGig.sellerName}</strong> has been notified and expects to deliver your files within {activeGig.deliveryDays} days.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveGig(null);
                      setHiringStep("details");
                      setClientRequirements("");
                    }}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold uppercase transition-all mt-2"
                  >
                    Return to Marketplace
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
