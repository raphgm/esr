import React, { useState } from "react";
import { CommunityChannel, UserProfile } from "../types";
import { PageBanner } from "./PageBanner";
import { 
  MessageSquare, 
  Heart, 
  Send, 
  Calendar, 
  Star, 
  Users, 
  MapPin, 
  Megaphone, 
  BookOpen, 
  Feather, 
  Lightbulb, 
  HelpCircle, 
  Search, 
  Plus, 
  Lock, 
  FileText, 
  ChevronRight, 
  X,
  Sparkles,
  ArrowLeft,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CommunitySectionProps {
  userProfile: UserProfile;
  channels: CommunityChannel[];
  onUpdateChannels: (channels: CommunityChannel[]) => void;
}

// Structuring mock data for Estarr Spaces & Channels to match second screenshot
interface SpaceCard {
  id: string;
  title: string;
  icon: any;
  dotColor?: string;
  isPrivate?: boolean;
  desc: string;
}

const ESTARR_SPACES: SpaceCard[] = [
  { id: "sp-start", title: "Start Here", icon: MapPin, dotColor: "bg-green-400", desc: "Welcome to Estarr Community! Review values, standards, and onboarding tutorials." },
  { id: "sp-announcements", title: "Announcements", icon: Megaphone, isPrivate: true, desc: "Official announcements, updates, global campaign rolls, and program changes." },
  { id: "sp-events", title: "Events", icon: Calendar, isPrivate: true, desc: "Bootcamps, workshops, local meetups, and developer sourcing webcasts." },
  { id: "sp-learning", title: "Estarr Learning", icon: BookOpen, dotColor: "bg-cyan-400", desc: "Collaborate on syllabus tracks, share resources, and help cohort peers." },
  { id: "sp-writers", title: "Writer's Room Blog Submissions", icon: Feather, isPrivate: true, desc: "Submit tutorials, case studies, and engineering guidelines for blog reviews." },
  { id: "sp-feedback", title: "Product Feedback", icon: Lightbulb, isPrivate: true, desc: "Submit complaints, feature ideas, and beta testing feedback for the Core Engineering team." },
  { id: "sp-faqs", title: "Resources and FAQs", icon: HelpCircle, isPrivate: true, desc: "Common questions answered, onboarding files, links, and guidelines." },
  { id: "sp-channels", title: "Channels", icon: MessageSquare, desc: "Browse through our general topic conversation lines." },
  { id: "sp-groups", title: "Groups", icon: Users, desc: "Interest-based guild groups for focused developer subsets." }
];

interface SpaceChannel {
  id: string;
  name: string;
  emoji: string;
  statusDot?: "blue" | "green" | "none";
  desc: string;
  posts: {
    id: string;
    author: string;
    avatarInitials: string;
    content: string;
    time: string;
    likes: number;
    hasLiked?: boolean;
    comments: { id: string; author: string; content: string; time: string }[];
  }[];
}

const INITIAL_ESTARR_CHANNELS: SpaceChannel[] = [
  {
    id: "ch-intro",
    name: "Introductions",
    emoji: "👋",
    statusDot: "blue",
    desc: "Greet the cohort! State your stack, career goals, and location.",
    posts: [
      {
        id: "post-1",
        author: "Chinedu Okafor",
        avatarInitials: "CO",
        content: "Hello everyone! 👋 I am a Senior Frontend Engineer based in Lagos. Excited to collaborate with you all on the AI annotation rails!",
        time: "12m ago",
        likes: 14,
        comments: [
          { id: "c-1", author: "Joy Alao", content: "Welcome Chinedu! Glad to have you here.", time: "10m ago" }
        ]
      },
      {
        id: "post-2",
        author: "Joy Alao",
        avatarInitials: "JA",
        content: "Hi team, Joy here. I focus on Product Management and Mobile UX systems. Looking forward to our next capstone bootcamp!",
        time: "1h ago",
        likes: 9,
        comments: []
      }
    ]
  },
  {
    id: "ch-chatter",
    name: "Chatter",
    emoji: "🥤",
    statusDot: "blue",
    desc: "General casual watercooler talks, sports, music, and banter.",
    posts: [
      {
        id: "post-3",
        author: "Daniel King",
        avatarInitials: "DK",
        content: "Who is watching the developer sourcing conference live tonight? The new LLM fine-tuning speeds look insane.",
        time: "4h ago",
        likes: 6,
        comments: [
          { id: "c-2", author: "Chinedu Okafor", content: "Count me in, definitely streaming it!", time: "3h ago" }
        ]
      }
    ]
  },
  {
    id: "ch-celebrate",
    name: "Celebrations",
    emoji: "🎉",
    statusDot: "blue",
    desc: "Share your achievements! Cleared assessments, new contracts, and certificates.",
    posts: [
      {
        id: "post-4",
        author: "Sarah Smith",
        avatarInitials: "SS",
        content: "Just passed my TypeScript & React Expert Assessment on the first try! 🎓 Confetti is real!",
        time: "30m ago",
        likes: 22,
        comments: [
          { id: "c-3", author: "Daniel King", content: "Superb work Sarah! That assessment was quite tricky.", time: "25m ago" }
        ]
      }
    ]
  },
  {
    id: "ch-sell",
    name: "Sell it",
    emoji: "🛒",
    statusDot: "blue",
    desc: "Showcase your freelance services, active consulting packages, or items for sale.",
    posts: [
      {
        id: "post-5",
        author: "Emeka Obi",
        avatarInitials: "EO",
        content: "Hey folks, I have open slots for custom Shopify setups or full NextJS layouts this month. DM for pricing!",
        time: "2d ago",
        likes: 8,
        comments: []
      }
    ]
  },
  {
    id: "ch-ask",
    name: "Ask-Estarrians",
    emoji: "💬",
    statusDot: "blue",
    desc: "Technical troubleshooting questions, stack recommendations, and debugging help.",
    posts: [
      {
        id: "post-6",
        author: "Tunde Adebayo",
        avatarInitials: "TA",
        content: "Is anyone experiencing local bundle deployment sizing issues with Vite 6? My chunk limits are triggering warns.",
        time: "5h ago",
        likes: 4,
        comments: [
          { id: "c-4", author: "Chinedu Okafor", content: "Check your splitChunks configuration. Vite 6 changed some rollup defaults.", time: "4h ago" }
        ]
      }
    ]
  },
  {
    id: "ch-wellness",
    name: "Wellness",
    emoji: "🧘",
    statusDot: "blue",
    desc: "Mindfulness, stress management, remote-work health tips, and fitness.",
    posts: [
      {
        id: "post-7",
        author: "Nurse Grace",
        avatarInitials: "NG",
        content: "Friendly reminder to stretch your hamstrings and drink at least 1L of water during your active coding blocks today!",
        time: "6h ago",
        likes: 18,
        comments: []
      }
    ]
  },
  {
    id: "ch-beta",
    name: "Beta Testing for Open...",
    emoji: "🧪",
    statusDot: "none",
    desc: "Be the first to test our internal tools, new annotation dashboards, and provide feedback.",
    posts: []
  },
  {
    id: "ch-nigeria",
    name: "Geo-Nigeria",
    emoji: "🇳🇬",
    statusDot: "green",
    desc: "Local discussions, hub meetups, tax setups, and sourcing events inside Nigeria.",
    posts: [
      {
        id: "post-8",
        author: "Chinedu Okafor",
        avatarInitials: "CO",
        content: "Lagos physical hub meetup planned for next Saturday at Surulere! Who is attending?",
        time: "1d ago",
        likes: 11,
        comments: [
          { id: "c-5", author: "Joy Alao", content: "100% attending. See you there!", time: "18h ago" }
        ]
      }
    ]
  }
];

export default function CommunitySection({
  userProfile,
  channels: baseChannels,
  onUpdateChannels
}: CommunitySectionProps) {
  // Navigation: "spaces" or "docs"
  const [activeNavTab, setActiveNavTab] = useState<"spaces" | "docs">("spaces");

  // Rich channels state local tracking
  const [communityChannels, setCommunityChannels] = useState<SpaceChannel[]>(INITIAL_ESTARR_CHANNELS);

  // Active view target: can be "grid" or specific channel ID/space ID
  const [activeView, setActiveView] = useState<string>("grid");
  
  // Searching & Chat filtering
  const [searchQuery, setSearchQuery] = useState("");

  // Post & comment creation
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTarget, setNewPostTarget] = useState("ch-intro");

  const [activeCommentText, setActiveCommentText] = useState<Record<string, string>>({});

  const [selectedDoc, setSelectedDoc] = useState<{ title: string, desc: string, category: string, duration: string } | null>(null);

  // Docs list mock data
  const docsList = [
    {
      category: "Platform Onboarding",
      articles: [
        { title: "Estarr Community Guideline Standards 2026", duration: "5 mins read", desc: "Core code of conduct, communication norms, and professional standards." },
        { title: "How to Link Your Verified GitHub & Portfolio Repository", duration: "8 mins read", desc: "Link repositories via secure webhooks for automated skill points awards." }
      ]
    },
    {
      category: "Learning & Bootcamps",
      articles: [
        { title: "Syllabus Overview: LLM Fine-Tuning & Prompt Engineering", duration: "12 mins read", desc: "Comprehensive step-by-step track outline of the AI-First training suite." },
        { title: "CBT Assessment Preparatory Handbook", duration: "10 mins read", desc: "Tips, sample questions, and procedures for taking professional competency tests." }
      ]
    },
    {
      category: "Payouts & Escrow Contracts",
      articles: [
        { title: "Understanding Escrow Milestones and Payment Verification", duration: "6 mins read", desc: "How escrow locks work for independent developers on active gigs." },
        { title: "Standard Local Currency Conversion Guide", duration: "4 mins read", desc: "Withdrawing consulting earnings into NGN, KES, INR, or USD banks." }
      ]
    }
  ];

  // Helper: Find active channel or space details
  const currentChannel = communityChannels.find(ch => ch.id === activeView);
  const currentSpace = ESTARR_SPACES.find(sp => sp.id === activeView);

  // Filter channels based on search query
  const filteredChannels = communityChannels.filter(ch => 
    ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Post Submission
  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPostItem = {
      id: `p-${Date.now()}`,
      author: userProfile.name || "Chinedu Okafor",
      avatarInitials: (userProfile.name || "Chinedu").split(" ").map(n => n[0]).join(""),
      content: newPostContent.trim(),
      time: "Just now",
      likes: 0,
      comments: []
    };

    setCommunityChannels(prev => prev.map(ch => {
      if (ch.id === newPostTarget) {
        return {
          ...ch,
          posts: [newPostItem, ...ch.posts]
        };
      }
      return ch;
    }));

    setShowPostModal(false);
    setNewPostContent("");
    setNewPostTitle("");
    setActiveView(newPostTarget); // navigate to that feed
    alert("Post published successfully!");
  };

  // Like a post
  const handleLikePost = (channelId: string, postId: string) => {
    setCommunityChannels(prev => prev.map(ch => {
      if (ch.id === channelId) {
        return {
          ...ch,
          posts: ch.posts.map(p => {
            if (p.id === postId) {
              const hasLiked = p.hasLiked;
              return {
                ...p,
                likes: hasLiked ? p.likes - 1 : p.likes + 1,
                hasLiked: !hasLiked
              };
            }
            return p;
          })
        };
      }
      return ch;
    }));
  };

  // Comment on a post
  const handleAddComment = (channelId: string, postId: string) => {
    const text = activeCommentText[postId];
    if (!text || !text.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: userProfile.name || "Chinedu Okafor",
      content: text.trim(),
      time: "Just now"
    };

    setCommunityChannels(prev => prev.map(ch => {
      if (ch.id === channelId) {
        return {
          ...ch,
          posts: ch.posts.map(p => {
            if (p.id === postId) {
              return {
                ...p,
                comments: [...p.comments, newComment]
              };
            }
            return p;
          })
        };
      }
      return ch;
    }));

    setActiveCommentText(prev => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in relative min-h-screen">
      {/* Decorative ambient background circles matching ClientDashboard */}
      <div className="absolute -top-16 -left-16 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-300/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Banner header */}
      <PageBanner
        title="Estarr Community"
        subtitle="COHORTS & DISCUSSIONS"
        description="Interact with professional peers, collaborate on fine-tuning bootcamps, share certifications, and track off-chain developer meetups."
        icon={Users}
      />

      {/* Top Navigation & Controls bar (matches screenshot layout) */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 bg-white/60 backdrop-blur-md sticky top-0 z-30 px-2 rounded-2xl">
        <div className="flex gap-6 text-sm font-semibold text-slate-500">
          <button
            onClick={() => {
              setActiveNavTab("spaces");
              setActiveView("grid");
            }}
            className={`pb-3 border-b-2 px-1 transition-all cursor-pointer ${
              activeNavTab === "spaces" && activeView === "grid"
                ? "border-slate-900 text-slate-900 font-bold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            Spaces
          </button>
          
          <button
            onClick={() => {
              setActiveNavTab("docs");
              setActiveView("docs");
            }}
            className={`pb-3 border-b-2 px-1 transition-all cursor-pointer ${
              activeNavTab === "docs"
                ? "border-slate-900 text-slate-900 font-bold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            Docs
          </button>
        </div>

        <div>
          <button
            onClick={() => setShowPostModal(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>
      </div>

      {/* Interactive Main Body layout matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar Menu Column (matches screenshot) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col gap-6">
          
          {/* SPACES list block */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest px-2 mb-2 block">
              Spaces
            </span>

            {[
              { id: "sp-learning", label: "Estarr Learning", status: "none" },
              { id: "sp-feedback", label: "Product Feedback", status: "dot" },
              { id: "sp-faqs", label: "Resources and FAQs", status: "none" },
              { id: "grid", label: "All spaces", status: "none" }
            ].map((space) => (
              <button
                key={space.id}
                onClick={() => {
                  setActiveNavTab("spaces");
                  setActiveView(space.id);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                  activeView === space.id
                    ? "bg-slate-100 text-slate-900 font-bold shadow-xs"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span>{space.label}</span>
                </div>
                {space.status === "dot" && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search chat or channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-250 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white"
            />
          </div>

          {/* CHANNELS list block */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest px-2 mb-2 block">
              Channels
            </span>

            <div className="flex flex-col gap-0.5 max-h-[300px] overflow-y-auto pr-1">
              {filteredChannels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => {
                    setActiveNavTab("spaces");
                    setActiveView(channel.id);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                    activeView === channel.id
                      ? "bg-slate-100 text-slate-900 font-bold shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm shrink-0">{channel.emoji}</span>
                    <span className="truncate">{channel.name}</span>
                  </div>
                  
                  {channel.statusDot === "blue" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  )}
                  {channel.statusDot === "green" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  )}
                </button>
              ))}

              {filteredChannels.length === 0 && (
                <span className="text-[10px] text-slate-400 italic px-2 py-4 text-center">
                  No matching channels found
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Right Main Content Panel */}
        <div className="lg:col-span-9">
          
          <AnimatePresence mode="wait">

            {/* 1. 3x3 SPACES GRID VIEW (Default dashboard look matching screenshot) */}
            {activeNavTab === "spaces" && activeView === "grid" && (
              <motion.div
                key="spaces-grid"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {ESTARR_SPACES.map((space) => {
                  const IconComponent = space.icon;
                  return (
                    <div
                      key={space.id}
                      onClick={() => {
                        // find corresponding channel or display space alert
                        const matchingCh = communityChannels.find(ch => ch.name.toLowerCase().replace("-", "") === space.title.toLowerCase().replace(" ", ""));
                        if (matchingCh) {
                          setActiveView(matchingCh.id);
                        } else {
                          setActiveView(space.id);
                        }
                      }}
                      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-slate-350 transition-all cursor-pointer flex flex-col items-center justify-center text-center group min-h-[180px] relative overflow-hidden"
                    >
                      {/* Ambient micro-glow circles inside card */}
                      <div className="absolute -top-10 -right-10 w-20 h-20 bg-slate-50 rounded-full group-hover:scale-125 transition-all duration-500" />
                      
                      <div className="bg-slate-50 p-4 rounded-full text-slate-700 mb-4 group-hover:scale-110 transition-transform relative">
                        <IconComponent className="w-8 h-8 stroke-[1.5]" />
                      </div>

                      <div className="flex items-center gap-1.5 relative z-10">
                        {space.dotColor && <span className={`w-2 h-2 rounded-full ${space.dotColor}`} />}
                        <h4 className="font-bold text-slate-900 text-xs tracking-tight">{space.title}</h4>
                        {space.isPrivate && <Lock className="w-3 h-3 text-slate-400" />}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* 2. CHAT / FORUM THREAD VIEW */}
            {activeNavTab === "spaces" && activeView !== "grid" && (
              <motion.div
                key="chat-thread"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-6"
              >
                {/* Header detail */}
                <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveView("grid")}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors font-bold mb-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back to Spaces
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {currentChannel?.emoji || "⭐"}
                      </span>
                      <h3 className="font-display font-black text-slate-900 text-lg">
                        {currentChannel?.name || currentSpace?.title}
                      </h3>
                      {(currentChannel?.statusDot || currentSpace?.isPrivate) && (
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      {currentChannel?.desc || currentSpace?.desc}
                    </p>
                  </div>
                </div>

                {/* Posts discussion Feed */}
                <div className="space-y-6">
                  {(currentChannel?.posts || []).map((post) => (
                    <div
                      key={post.id}
                      className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-white transition-colors flex flex-col gap-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex gap-2.5 items-center">
                          <div className="w-8 h-8 bg-purple-100 text-purple-700 border border-purple-200 rounded-full flex items-center justify-center text-xs font-black font-mono shadow-xs shrink-0">
                            {post.avatarInitials}
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-900 text-xs">{post.author}</h5>
                            <span className="text-[9px] font-mono text-slate-400">{post.time}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleLikePost(currentChannel!.id, post.id)}
                          className={`flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                            post.hasLiked
                              ? "bg-red-50 border-red-100 text-red-600 font-extrabold"
                              : "bg-white border-slate-100 hover:bg-slate-50 text-slate-500"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${post.hasLiked ? "fill-current" : ""}`} />
                          <span>{post.likes} Likes</span>
                        </button>
                      </div>

                      <p className="text-slate-600 text-xs leading-relaxed">
                        {post.content}
                      </p>

                      {/* Comments display */}
                      {post.comments.length > 0 && (
                        <div className="bg-slate-50/70 rounded-xl p-3 space-y-2 border border-slate-100">
                          {post.comments.map((comm) => (
                            <div key={comm.id} className="text-[11px] leading-relaxed">
                              <span className="font-bold text-slate-900">{comm.author}: </span>
                              <span className="text-slate-600">{comm.content}</span>
                              <span className="text-[9px] font-mono text-slate-400 block mt-0.5">{comm.time}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Comment Input */}
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={activeCommentText[post.id] || ""}
                          onChange={(e) => setActiveCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddComment(currentChannel!.id, post.id);
                            }
                          }}
                          className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs text-slate-700 focus:outline-none"
                        />
                        <button
                          onClick={() => handleAddComment(currentChannel!.id, post.id)}
                          className="bg-slate-900 text-white p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer shrink-0"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {(!currentChannel?.posts || currentChannel.posts.length === 0) && (
                    <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center">
                      <MessageSquare className="w-8 h-8 text-slate-300 mb-2" />
                      <h4 className="font-bold text-slate-800 text-xs">No posts inside this space yet</h4>
                      <p className="text-slate-500 text-[10px] mt-1">Be the first to start the discussion! Click the 'New Post' button at the top.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 3. DOCS KNOWLEDGE HUB VIEW */}
            {activeNavTab === "docs" && (
              <motion.div
                key="docs-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-6"
              >
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="font-display font-bold text-base text-slate-950 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    Community Resource Docs & Handbooks
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Access standard files, operational guidelines, learning syllabi, and administrative handbooks for off-chain cohorts.
                  </p>
                </div>

                <div className="space-y-6">
                  {docsList.map((category, catIdx) => (
                    <div key={catIdx} className="space-y-3">
                      <h4 className="text-[10px] font-mono uppercase font-black text-slate-400 tracking-wider">
                        {category.category}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.articles.map((article, artIdx) => (
                          <div
                            key={artIdx}
                            onClick={() => setSelectedDoc({ ...article, category: category.category })}
                            className="p-4 border border-slate-150 rounded-2xl bg-slate-50/50 hover:bg-white hover:border-slate-350 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                          >
                            <div className="space-y-1.5">
                              <h5 className="font-bold text-slate-900 text-xs leading-snug">{article.title}</h5>
                              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{article.desc}</p>
                            </div>
                            <span className="text-[9px] font-mono text-indigo-600 font-bold uppercase tracking-wider mt-3 block">
                              {article.duration} • Read doc &rarr;
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

      {/* Full screen New Post publishing Modal Overlay */}
      <AnimatePresence>
        {showPostModal && (
          <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
                <h4 className="font-display font-bold text-slate-950 text-sm">Publish New Post</h4>
                <button
                  onClick={() => setShowPostModal(false)}
                  className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handlePublishPost} className="p-6 flex flex-col gap-4 overflow-y-auto text-xs">
                
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] font-black uppercase text-slate-400">Select Space / Channel Destination</label>
                  <select
                    value={newPostTarget}
                    onChange={(e) => setNewPostTarget(e.target.value)}
                    className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold text-slate-800 cursor-pointer focus:outline-none focus:bg-white"
                  >
                    {communityChannels.map(ch => (
                      <option key={ch.id} value={ch.id}>
                        {ch.emoji} #{ch.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] font-black uppercase text-slate-400">Topic / Summary (Optional)</label>
                  <input
                    type="text"
                    placeholder="Brief headline..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold text-slate-800 focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] font-black uppercase text-slate-400">Post Content Body</label>
                  <textarea
                    required
                    placeholder="Write your cohort update or query..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={4}
                    className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-700 leading-relaxed focus:outline-none focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold p-3 rounded-xl uppercase tracking-wider text-xs shadow-md mt-2 cursor-pointer"
                >
                  Publish Post &rarr;
                </button>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Document View Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              <div className="flex flex-col gap-2 p-6 border-b border-slate-100">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-mono font-black text-indigo-600 uppercase tracking-wider">
                      {selectedDoc.category}
                    </span>
                    <h3 className="font-display font-black text-xl text-slate-900 leading-tight">
                      {selectedDoc.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-full transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mt-2">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {selectedDoc.duration}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-200" />
                  <span>Verified Off-Chain</span>
                </div>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <div className="prose prose-slate prose-sm max-w-none">
                  <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                    {selectedDoc.desc}
                  </p>
                  
                  <div className="space-y-6 text-slate-700 leading-relaxed">
                    <p>
                      This document serves as an official handbook within the ESTARR ecosystem. By accessing this material, you agree to adhere to the strict confidentiality and operational guidelines established for verified community members.
                    </p>
                    <h4 className="font-bold text-slate-900 text-base mt-8 mb-4">1. Core Objectives</h4>
                    <p>
                      The primary goal of this framework is to establish clear, actionable standards that empower our talent pool while maintaining the highest levels of professional integrity.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-indigo-500">
                      <li>Streamline communication across distributed teams</li>
                      <li>Standardize the dispute resolution and arbitration process</li>
                      <li>Establish baseline expectations for milestone delivery</li>
                      <li>Foster a culture of continuous peer-to-peer learning</li>
                    </ul>
                    <h4 className="font-bold text-slate-900 text-base mt-8 mb-4">2. Implementation Strategy</h4>
                    <p>
                      All verified participants are required to familiarize themselves with the protocols outlined in this section. Failure to comply may result in temporary suspension of platform privileges or a reduction in your ESTARR trust score.
                    </p>
                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 mt-6">
                      <p className="text-sm text-indigo-900 font-medium m-0">
                        <strong>Note:</strong> Regular audits are conducted to ensure adherence to these guidelines. If you have any questions, please reach out to your assigned Community Administrator.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl flex justify-end">
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
