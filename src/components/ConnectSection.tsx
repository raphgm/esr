import { PageBanner } from "./PageBanner";
import { CategoryTabs } from "./CategoryTabs";
import React, { useState, useRef, useEffect } from "react";
import { UserProfile, ActivityPost } from "../types";
import { getCollectionData, saveCollectionItem } from "../lib/firebase";
import {
  Users,
  ThumbsUp,
  MessageSquare,
  Plus,
  Award,
  UserCheck,
  Briefcase,
  MapPin,
  Send,
  Gift,
  Heart,
  X,
  Image,
  Camera,
  Video,
  Trash2,
  Radio,
  Music,
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Volume2,
  VolumeX,
  Sliders,
  Share2,
  Coins,
  RefreshCw,
  Check,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Linkedin,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { EnhancedVideoPlayer, MOCK_AUDIO_TRACKS, OVERLAY_TEXT_STYLES } from "./EnhancedVideoPlayer";
import { SyncConsole } from "./SyncConsole";

interface ConnectSectionProps {
  userProfile: UserProfile;
  posts: ActivityPost[];
  onUpdatePosts: (posts: ActivityPost[]) => void;
  onUpdateProfile: (profile: UserProfile) => void;
}

const mockPeers: (UserProfile & { id: string })[] = [
  {
    id: "peer-fatima",
    name: "Fatima Bello",
    email: "fatima.b@example.com",
    profession: "Commercial Catering Specialist",
    bio: "Passionate about traditional African gourmet delicacies and high-volume corporate event catering.",
    location: "Ikeja, Lagos",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    formalSkills: ["Culinary Arts", "Food Safety Certification"],
    creatorSkills: ["Baking", "Menu Design", "WhatsApp Selling", "Event Planning"],
    skills: [
      "Baking",
      "Menu Design",
      "Food Safety",
      "WhatsApp Selling",
      "Event Planning",
    ],
    interests: ["Catering", "Small Business"],
    goals: ["Open a physical restaurant in Lagos", "Learn pastry techniques"],
    certifications: ["Academy: Professional Catering 101"],
    recommends: 15,
    birthdate: "1995-07-06",
  },
  {
    id: "peer-kofi",
    name: "Kofi Mensah",
    email: "kofi.m@example.com",
    profession: "Poultry Farming Consultant",
    bio: "Agropreneur helping youths start and run profitable high-yield broiler systems across West Africa.",
    location: "Accra, Ghana",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
    formalSkills: ["Agric Science", "Farm Biosecurity"],
    creatorSkills: ["Poultry Management", "Broiler Feeds", "Vegetable Farming", "Farm Vlogging"],
    skills: [
      "Poultry Management",
      "Broiler Feeds",
      "Farm Biosecurity",
      "Vegetable Farming",
    ],
    interests: ["Agriculture", "Logistics"],
    goals: ["Expand organic feed sales", "Establish solar coops"],
    certifications: ["W.A. Agricultural Union Fellow"],
    recommends: 29,
    birthdate: "1993-07-08",
  },
  {
    id: "peer-aisha",
    name: "Aisha Yusuf",
    email: "aisha.y@example.com",
    profession: "Ankara Fashion Stylist",
    bio: "Creative lead blending traditional patterns with modern silhouettes. Custom apparel and training academy.",
    location: "Surulere, Lagos",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    formalSkills: ["Fashion Design Certification", "Textile Science"],
    creatorSkills: ["Tailoring", "Pattern Drafting Basics", "Fabric Sourcing", "Instagram Styling"],
    skills: [
      "Taking Body Measurements",
      "Pattern Drafting Basics",
      "Tailoring",
      "Fabric Sourcing",
    ],
    interests: ["Fashion Design", "Business Registration"],
    goals: [
      "Launch international wholesale catalog",
      "Hire 5 apprentice tailors",
    ],
    certifications: ["Fashion Guild Masterclass Level 2"],
    recommends: 18,
    birthdate: "1997-07-15",
  },
];

const VIDEO_FILTERS = [
  { id: "none", name: "Normal", value: "none" },
  { id: "grayscale", name: "Grayscale", value: "grayscale(100%)" },
  { id: "sepia", name: "Sepia", value: "sepia(100%)" },
  { id: "vintage", name: "Vintage", value: "sepia(50%) saturate(140%) hue-rotate(-10deg)" },
  { id: "cool", name: "Cool Blue", value: "saturate(80%) hue-rotate(15deg) contrast(110%)" },
  { id: "high-contrast", name: "Dramatic", value: "contrast(140%) saturate(120%) brightness(90%)" },
  { id: "warm", name: "Warm Glow", value: "sepia(20%) saturate(130%) contrast(105%)" },
  { id: "noir", name: "Noir", value: "grayscale(100%) contrast(150%) brightness(90%)" },
];

export default function ConnectSection({
  userProfile,
  posts,
  onUpdatePosts,
  onUpdateProfile,
}: ConnectSectionProps) {
  const [activeTab, setActiveTab] = useState<
    "feed" | "directory" | "mentorship" | "companion"
  >("feed");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [newPostVideo, setNewPostVideo] = useState<string | null>(null);
  const [newPostVideoFilter, setNewPostVideoFilter] = useState("none");

  // Real Connect & Collaborate Firestore synced states
  const [peersList, setPeersList] = useState<(UserProfile & { id: string })[]>(mockPeers);
  const [connectionsList, setConnectionsList] = useState<{ id: string; peerId: string; status: "pending" | "connected" }[]>([]);
  const [peerMessages, setPeerMessages] = useState<{ id: string; sender: string; recipient: string; text: string; timestamp: string }[]>([]);
  const [chatPeer, setChatPeer] = useState<(UserProfile & { id: string }) | null>(null);
  const [chatMessageInput, setChatMessageInput] = useState("");
  const [registeredMentors, setRegisteredMentors] = useState<{ id: string; name: string; email: string; profession: string }[]>([]);
  const [mentorshipRequests, setMentorshipRequests] = useState<{ id: string; mentorId: string; status: string }[]>([]);

  useEffect(() => {
    let active = true;
    const loadAllConnectData = async () => {
      try {
        const fetchedPeers = await getCollectionData<UserProfile & { id: string }>("peers", mockPeers);
        const fetchedConnections = await getCollectionData<{ id: string; peerId: string; status: "pending" | "connected" }>("connections", []);
        const fetchedMessages = await getCollectionData<{ id: string; sender: string; recipient: string; text: string; timestamp: string }>("peer_messages", []);
        const fetchedMentors = await getCollectionData<{ id: string; name: string; email: string; profession: string }>("mentorship_registry", []);
        const fetchedMReqs = await getCollectionData<{ id: string; mentorId: string; status: string }>("mentorship_requests", []);

        if (active) {
          if (fetchedPeers && fetchedPeers.length > 0) setPeersList(fetchedPeers);
          if (fetchedConnections) setConnectionsList(fetchedConnections);
          if (fetchedMessages) setPeerMessages(fetchedMessages);
          if (fetchedMentors) setRegisteredMentors(fetchedMentors);
          if (fetchedMReqs) setMentorshipRequests(fetchedMReqs);
        }
      } catch (err) {
        console.error("Error loading connect section data from Firestore:", err);
      }
    };
    loadAllConnectData();
    return () => { active = false; };
  }, []);

  // TikTok / Reels feed mode & player states
  const [feedMode, setFeedMode] = useState<"classic" | "reels">("classic");
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isReelPlaying, setIsReelPlaying] = useState(true);
  const [isReelMuted, setIsReelMuted] = useState(true);
  const [isReelCommentOpen, setIsReelCommentOpen] = useState(false);
  const [reelCommentsInput, setReelCommentsInput] = useState("");
  const [likeHeartPop, setLikeHeartPop] = useState<string | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);

  // skill-sch.com sync states
  const [isSyncOpen, setIsSyncOpen] = useState(false);
  const [syncUsername, setSyncUsername] = useState("");
  const [syncStatus, setSyncStatus] = useState<"idle" | "connecting" | "syncing" | "success" | "error">("idle");
  const [syncMessage, setSyncMessage] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<string>("software-architect");

  const skillSchProfiles = {
    "software-architect": {
      name: "Software Architect",
      skills: ["Advanced React Architecture", "Distributed Systems", "Off-chain State Channels", "Vite & Build Tooling"],
      certification: "skill-sch.com: Certified Software Architect (2026)"
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
      certification: "skill-sch.com: Certified E-commerce Marketer (2026)"
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
          const currentFormal = userProfile.formalSkills || [];
          const updatedFormal = Array.from(new Set([...currentFormal, ...profileData.skills]));
          
          // Merge unique certifications
          const currentCerts = userProfile.certifications || [];
          const updatedCerts = Array.from(new Set([...currentCerts, profileData.certification]));

          onUpdateProfile({
            ...userProfile,
            formalSkills: updatedFormal,
            certifications: updatedCerts
          });

          setSyncStatus("success");
          setSyncMessage(`Successfully synchronized skill card of ${syncUsername}! Imported: ${profileData.skills.join(", ")}`);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  // LinkedIn Sync Logic
  const handleLinkedInSync = async () => {
    try {
      setSyncStatus("connecting");
      setSyncMessage("Requesting LinkedIn Authorization...");
      
      const response = await fetch("/api/auth/linkedin/url");
      const { url } = await response.json();
      
      const width = 600;
      const height = 700;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      const authWindow = window.open(
        url,
        "linkedin_sync",
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!authWindow) {
        alert("Please allow popups for LinkedIn sync.");
        setSyncStatus("error");
        setSyncMessage("Popup blocked. Please enable popups.");
      }
    } catch (err) {
      console.error("LinkedIn sync fetch error:", err);
      setSyncStatus("error");
      setSyncMessage("Failed to connect to LinkedIn.");
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "OAUTH_AUTH_SUCCESS" && event.data.provider === "linkedin") {
        const { user: linkedinUser } = event.data;
        
        setSyncStatus("syncing");
        setSyncMessage("Extracting professional insights from LinkedIn...");

        setTimeout(() => {
          const importedName = linkedinUser.name || "LinkedIn User";
          const importedAvatar = linkedinUser.picture;

          const currentFormal = userProfile.formalSkills || [];
          const updatedFormal = Array.from(new Set([...currentFormal, "LinkedIn Certified Professional"]));
          
          const currentCerts = userProfile.certifications || [];
          const updatedCerts = Array.from(new Set([...currentCerts, `LinkedIn Verified: ${importedName}`]));

          onUpdateProfile({
            ...userProfile,
            formalSkills: updatedFormal,
            certifications: updatedCerts,
            avatar: importedAvatar || userProfile.avatar
          });

          setSyncStatus("success");
          setSyncMessage(`Successfully synchronized with LinkedIn! Imported professional credentials for ${importedName}.`);
        }, 1500);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [userProfile, onUpdateProfile]);

  const reelsVideoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-play/pause sync when reel index, active tab, feed mode, or play/pause state changes
  useEffect(() => {
    const video = reelsVideoRef.current;
    if (!video) return;

    if (activeTab === "feed" && feedMode === "reels" && isReelPlaying) {
      video.muted = isReelMuted;
      video.play().catch((err) => {
        console.log("Reels play error (likely browser autoplay rules):", err);
        if (!isReelMuted) {
          setIsReelMuted(true);
        }
      });
    } else {
      video.pause();
    }
  }, [isReelPlaying, currentReelIndex, feedMode, activeTab, isReelMuted]);

  // Video Creation enhancement states
  const [creatorAudio, setCreatorAudio] = useState("none");
  const [creatorSpeed, setCreatorSpeed] = useState("1x");
  const [creatorTextOverlay, setCreatorTextOverlay] = useState("");
  const [creatorTextStyle, setCreatorTextStyle] = useState("classic-white");
  const [duetSourcePost, setDuetSourcePost] = useState<ActivityPost | null>(null);

  // Monetized tipping states
  const [tippingPost, setTippingPost] = useState<ActivityPost | null>(null);
  const [tipAmount, setTipAmount] = useState<string>("500");

  const handleSendTip = (post: ActivityPost) => {
    const amountNum = Number(tipAmount) || 0;
    if (amountNum <= 0) {
      alert("Please enter a valid amount to tip.");
      return;
    }

    const currentBalance = userProfile.walletBalance ?? 0;
    if (currentBalance < amountNum) {
      alert(`⚠️ Insufficient Funds in your Learner Wallet!\n\nTip Amount: ₦${amountNum.toLocaleString()}\nAvailable Wallet: ₦${currentBalance.toLocaleString()}\n\nPlease visit the Academy Section to top up your wallet.`);
      return;
    }

    // Deduct from user wallet
    const updatedBalance = currentBalance - amountNum;
    onUpdateProfile({
      ...userProfile,
      walletBalance: updatedBalance
    });

    alert(`💝 Tip Sent Successfully!\n\nYou tipped ₦${amountNum.toLocaleString()} to ${post.author} (${post.role}) to support their educational content.\n\nThey received this directly into their secured escrow ledger!`);
    setTippingPost(null);
  };

  // Camera/Webcam recording state
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const localVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);
  const recordingIntervalRef = React.useRef<number | null>(null);
  const duetVideoRef = React.useRef<HTMLVideoElement | null>(null);

  // Start Camera Stream for preview
  const startCamera = async () => {
    try {
      setRecordedVideoUrl(null);
      setRecordingSeconds(0);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
        audio: true
      });
      streamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play().catch(err => console.log("video play error:", err));
      }
    } catch (err) {
      console.error("Error accessing camera/microphone:", err);
      alert("Failed to access camera/microphone. Please make sure you have granted permissions.");
      setIsRecordingModalOpen(false);
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
  };

  // Start recording video
  const startRecording = () => {
    if (!streamRef.current) return;
    
    chunksRef.current = [];
    let options = { mimeType: "video/webm;codecs=vp9,opus" };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: "video/webm;codecs=vp8,opus" };
    }
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: "video/webm" };
    }
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: "" }; // let browser fallback
    }

    try {
      const recorder = new MediaRecorder(streamRef.current, options);
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      recordingIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds(prev => {
          if (prev >= 30) { // Limit to 30 seconds
            stopRecording();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error("Failed to start MediaRecorder:", err);
    }
  };

  // Stop recording video
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
  };

  const handleSaveRecordedVideo = () => {
    if (recordedVideoUrl) {
      setNewPostVideo(recordedVideoUrl);
      setNewPostImage(null); // Clear image if video is chosen
      setIsRecordingModalOpen(false);
      stopCamera();
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        alert("Video size is too large. Please select a video smaller than 100MB.");
        return;
      }
      const url = URL.createObjectURL(file);
      setNewPostVideo(url);
      setNewPostImage(null); // Clear image if video is chosen
    }
  };
  const [commentInputs, setCommentInputs] = useState<{
    [postId: string]: string;
  }>({});
  const [peerRecommends, setPeerRecommends] = useState<{
    [peerName: string]: number;
  }>({});
  const [mentorshipStatus, setMentorshipStatus] =
    useState<string>("Find a Mentor");
  const [selectedMentor, setSelectedMentor] = useState<UserProfile | null>(
    null,
  );
  const [birthdayWishInput, setBirthdayWishInput] = useState("");
  const birthdayStar = peersList.find((p) => p.name === "Fatima Bello") || peersList[0] || mockPeers[0];
  const upcomingStars = peersList.filter((p) => p.name !== "Fatima Bello");

  const handleQuickReaction = (reactionEmoji: string) => {
    const message = `${reactionEmoji} Celebrated with a reaction!`;
    const birthdayPost = posts.find((p) => p.id === "birthday-fatima");
    if (birthdayPost) {
      const updated = posts.map((post) => {
        if (post.id === "birthday-fatima") {
          return {
            ...post,
            likes: post.likes + 1,
            comments: [
              ...post.comments,
              {
                author: userProfile.name,
                content: message,
                time: "Just now",
              },
            ],
          };
        }
        return post;
      });
      onUpdatePosts(updated);
    }
  };

  const submitBirthdayWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdayWishInput.trim()) return;

    const birthdayPost = posts.find((p) => p.id === "birthday-fatima");
    if (birthdayPost) {
      const updated = posts.map((post) => {
        if (post.id === "birthday-fatima") {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                author: userProfile.name,
                content: birthdayWishInput.trim(),
                time: "Just now",
              },
            ],
          };
        }
        return post;
      });
      onUpdatePosts(updated);
      setBirthdayWishInput("");
    }
  };

  // Post handling
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() && !newPostImage && !newPostVideo) return;

    const selectedTrack = MOCK_AUDIO_TRACKS.find((t) => t.id === creatorAudio);
    const audioTrackName = selectedTrack && creatorAudio !== "none" 
      ? `${selectedTrack.name} (${selectedTrack.artist})` 
      : undefined;

    const newPost: ActivityPost = {
      id: `post-${Date.now()}`,
      author: userProfile.name,
      avatar: userProfile.avatar,
      role: userProfile.profession,
      content: newPostContent,
      image: newPostImage || undefined,
      video: newPostVideo || undefined,
      videoFilter: newPostVideo ? newPostVideoFilter : undefined,
      audioTrack: newPostVideo ? audioTrackName : undefined,
      playbackSpeed: newPostVideo ? creatorSpeed : undefined,
      textOverlay: newPostVideo && creatorTextOverlay.trim() ? creatorTextOverlay.trim() : undefined,
      textStyleId: newPostVideo && creatorTextOverlay.trim() ? creatorTextStyle : undefined,
      duetWithId: newPostVideo && duetSourcePost ? duetSourcePost.id : undefined,
      duetWithAuthor: newPostVideo && duetSourcePost ? duetSourcePost.author : undefined,
      duetWithVideo: newPostVideo && duetSourcePost ? duetSourcePost.video : undefined,
      likes: 0,
      comments: [],
      time: "Just now",
    };

    onUpdatePosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostImage(null);
    setNewPostVideo(null);
    setNewPostVideoFilter("none");
    setCreatorAudio("none");
    setCreatorSpeed("1x");
    setCreatorTextOverlay("");
    setCreatorTextStyle("classic-white");
    setDuetSourcePost(null);
  };

  const handleLikePost = (postId: string) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        const hasLiked = post.hasLiked;
        return {
          ...post,
          likes: hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !hasLiked,
        };
      }
      return post;
    });
    onUpdatePosts(updated);
  };

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim()) return;

    const updated = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              author: userProfile.name,
              content: commentText.trim(),
              time: "Just now",
            },
          ],
        };
      }
      return post;
    });

    onUpdatePosts(updated);
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  // Profile recommendation
  const handleRecommendPeer = async (peer: UserProfile & { id: string }) => {
    try {
      const updatedPeer = {
        ...peer,
        recommends: (peer.recommends || 0) + 1,
      };
      await saveCollectionItem("peers", updatedPeer);
      setPeersList(prev => prev.map(p => p.id === peer.id ? updatedPeer : p));
      setPeerRecommends(prev => ({
        ...prev,
        [peer.name]: updatedPeer.recommends
      }));
    } catch (err) {
      console.error("Failed to save recommendation to Firestore:", err);
    }
  };

  return (
    <div id="connect-section" className="flex flex-col gap-6">
      <PageBanner
        title="ESTARR Professional Hub"
        subtitle="CONNECT & COLLABORATE"
        description="Grow your professional presence, forge meaningful collaborations, discover mentors, and validate your skills across the ESTARR network."
        icon={Users}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Brief Profile Stats */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div
            id="connect-profile-card"
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-center text-center"
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-20 h-20 rounded-full object-cover border border-emerald-500 mb-4"
            />
            <h3 className="font-display font-bold text-lg text-slate-800">
              {userProfile.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium mb-3">
              {userProfile.profession}
            </p>
            <div className="flex gap-2 items-center text-xs text-slate-9000 mb-4">
              <MapPin className="w-3 h-3 text-emerald-500" />
              <span>{userProfile.location}</span>
            </div>

            <div className="w-full pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-center">
              <div>
                <span className="block font-mono font-bold text-lg text-slate-700">
                  {userProfile.recommends}
                </span>
                <span className="text-[10px] text-slate-9000 uppercase tracking-wider">
                  Endorsements
                </span>
              </div>
              <div>
                <span className="block font-mono font-bold text-lg text-slate-700">
                  {(userProfile.formalSkills?.length || 0) + (userProfile.creatorSkills?.length || 0)}
                </span>
                <span className="text-[10px] text-slate-9000 uppercase tracking-wider">
                  Skills
                </span>
              </div>
            </div>
            <div className="w-full pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3 text-left">
              {userProfile.formalSkills && userProfile.formalSkills.length > 0 && (
                <div>
                  <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest block mb-1">Formal Skills (skill-sch.com)</span>
                  <div className="flex flex-wrap gap-1">
                    {userProfile.formalSkills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {userProfile.creatorSkills && userProfile.creatorSkills.length > 0 && (
                <div>
                  <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest block mb-1">Creator Skills (ESTARR)</span>
                  <div className="flex flex-wrap gap-1">
                    {userProfile.creatorSkills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setSyncStatus("idle");
                  setSyncMessage("");
                  setIsSyncOpen(true);
                }}
                className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-[10px] font-bold tracking-widest uppercase py-2.5 px-3 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-300 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Sync Skill Card
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-2">
            <button
              id="tab-connect-feed"
              onClick={() => setActiveTab("feed")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "feed"
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              📢 Community Feed
            </button>
            <button
              id="tab-connect-dir"
              onClick={() => setActiveTab("directory")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "directory"
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              👥 Peer Directory
            </button>
            <button
              id="tab-connect-mentor"
              onClick={() => setActiveTab("mentorship")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "mentorship"
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              🤝 Mentorship Hub
            </button>
            <button
              id="tab-connect-companion"
              onClick={() => setActiveTab("companion")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "companion"
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              📱 Companion Sync
            </button>
          </div>

          {/* Trending Now Sidebar */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <h4 className="font-display font-bold text-sm text-slate-800 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" />
              Trending Now
            </h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="text-[10px] font-bold text-slate-9000 uppercase tracking-wider mb-2">Popular Hashtags</h5>
                <div className="flex flex-wrap gap-2">
                  {["#ESTARR", "#TechTips", "#CreativePreneur", "#BuildInPublic", "#RemoteWork"].map((tag) => (
                    <span key={tag} className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full cursor-pointer hover:bg-emerald-100 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-[10px] font-bold text-slate-9000 uppercase tracking-wider mb-2">Video Categories</h5>
                <ul className="space-y-2">
                  {[
                    { icon: Briefcase, name: "Business Tips", count: "2.4k" },
                    { icon: Radio, name: "Live Workshops", count: "1.2k" },
                    { icon: Sparkles, name: "Design Showcase", count: "850" },
                    { icon: Music, name: "Audio Stories", count: "640" }
                  ].map((category, idx) => (
                    <li key={idx} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="bg-slate-50 p-1.5 rounded-xl group-hover:bg-emerald-50 transition-colors text-slate-500 group-hover:text-emerald-600">
                          <category.icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-medium text-slate-500 group-hover:text-slate-900 transition-colors">{category.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-9000 bg-slate-50 px-1.5 py-0.5 rounded-xl">{category.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Main Content */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          {activeTab === "feed" && (
            <div className="flex flex-col gap-6">
              {/* Instagram & TikTok Feed Mode Selection Tabs */}
              <div className="flex bg-slate-100 p-1.5 rounded-xl w-full sm:w-fit self-start gap-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setFeedMode("classic")}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    feedMode === "classic"
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  📋 Classic Social Feed
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFeedMode("reels");
                    // Reset to first video if we enter Reels
                    setCurrentReelIndex(0);
                    setIsReelPlaying(true);
                  }}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 relative cursor-pointer ${
                    feedMode === "reels"
                      ? "bg-slate-900 text-white shadow-sm border border-slate-950"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping shrink-0" />
                  🎥 ESTARR TV Shorts / Reels
                </button>
              </div>

              {feedMode === "reels" ? (
                /* TikTok/Instagram Immersive Shorts Player */
                <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 flex flex-col lg:flex-row gap-6 relative overflow-hidden text-white shadow-2xl">
                  {/* Glowing background circles for modern look */}
                  <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Left Column: Vertical Smartphone frame video player */}
                  <div className="flex-1 max-w-sm mx-auto relative bg-black aspect-[9/16] rounded-[2.5rem] border-[6px] border-slate-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col group select-none h-[560px]">
                    
                    {/* Top camera punch-hole styling */}
                    <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-800" />
                    </div>

                    {/* Filtered Loop Video Stream */}
                    {posts.filter(p => p.video).length > 0 ? (
                      (() => {
                        const reelPosts = posts.filter(p => p.video);
                        const activeReel = reelPosts[currentReelIndex % reelPosts.length];
                        
                        return (
                          <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-950">
                            {activeReel.duetWithVideo ? (
                              <div className="grid grid-cols-2 gap-0.5 w-full h-full bg-black">
                                <div className="relative border-r border-slate-900 overflow-hidden bg-slate-950">
                                  <EnhancedVideoPlayer
                                    videoUrl={activeReel.duetWithVideo}
                                    poster={activeReel.poster}
                                    isMutedDefault={true}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute bottom-2 left-2 bg-black/60 text-white font-mono text-[8px] px-1.5 py-0.5 rounded-full backdrop-blur-xs z-10 pointer-events-none">
                                    @{activeReel.duetWithAuthor}'s source
                                  </div>
                                </div>
                                <div className="relative overflow-hidden bg-slate-950">
                                  <EnhancedVideoPlayer
                                    videoUrl={activeReel.video}
                                    poster={activeReel.poster}
                                    filter={activeReel.videoFilter || "none"}
                                    playbackSpeed={activeReel.playbackSpeed || "1x"}
                                    audioTrackName={activeReel.audioTrack}
                                    textOverlay={activeReel.textOverlay}
                                    textStyleId={activeReel.textStyleId || "classic-white"}
                                    isMutedDefault={isReelMuted}
                                    onLike={() => handleLikePost(activeReel.id)}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute bottom-2 left-2 bg-black/60 text-white font-mono text-[8px] px-1.5 py-0.5 rounded-full backdrop-blur-xs z-10 pointer-events-none">
                                    @{activeReel.author}'s duet
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <EnhancedVideoPlayer
                                videoUrl={activeReel.video}
                                poster={activeReel.poster}
                                filter={activeReel.videoFilter || "none"}
                                playbackSpeed={activeReel.playbackSpeed || "1x"}
                                audioTrackName={activeReel.audioTrack}
                                textOverlay={activeReel.textOverlay}
                                textStyleId={activeReel.textStyleId || "classic-white"}
                                isMutedDefault={isReelMuted}
                                onLike={() => handleLikePost(activeReel.id)}
                                className="w-full h-full"
                              />
                            )}

                            {/* Floating "Tap to unmute" banner if muted */}
                            {isReelMuted && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsReelMuted(false);
                                }}
                                className="absolute top-16 right-4 bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-lg border border-white/10 transition-all z-20 cursor-pointer hover:scale-105"
                              >
                                <VolumeX className="w-3 h-3 text-rose-400 shrink-0" />
                                <span>Tap for Sound</span>
                              </button>
                            )}

                            {/* Double tap pop floating heart animation */}
                            {likeHeartPop === activeReel.id && (
                              <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                                <Heart className="w-24 h-24 text-rose-500 fill-rose-500 animate-bounce drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]" />
                              </div>
                            )}

                            {/* Text overlay custom stamp if present */}
                            {activeReel.textOverlay && (
                              <div className="absolute inset-x-4 top-16 pointer-events-none flex items-center justify-center text-center z-10">
                                <span className={`text-xs p-2 rounded-xl text-center font-bold tracking-tight shadow-md select-none ${
                                  activeReel.textOverlay.includes("🔨") || activeReel.textOverlay.includes("🧶") || activeReel.textOverlay.includes("🔥")
                                    ? OVERLAY_TEXT_STYLES[1].classes
                                    : OVERLAY_TEXT_STYLES[0].classes
                                }`}>
                                  {activeReel.textOverlay}
                                </span>
                              </div>
                            )}

                            {/* Playback Speed badge overlay */}
                            {activeReel.playbackSpeed && activeReel.playbackSpeed !== "1x" && (
                              <div className="absolute top-12 left-4 bg-purple-500/90 text-slate-900 text-[9px] font-bold px-1.5 py-0.5 rounded-xl font-mono z-10 shadow uppercase tracking-wider flex items-center gap-1">
                                ⚡ Speed: {activeReel.playbackSpeed}
                              </div>
                            )}

                            {/* Play/Pause state overlay indicators on click */}
                            {!isReelPlaying && (
                              <div className="absolute inset-0 bg-black/30 pointer-events-none flex items-center justify-center z-20">
                                <Play className="w-16 h-16 text-white/80 drop-shadow-md" />
                              </div>
                            )}

                            {/* Bottom information and caption overlay (TikTok style) */}
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 pt-12 flex flex-col gap-2 z-10 text-white">
                              <div className="flex items-center gap-2">
                                <span className="font-display font-bold text-sm text-emerald-400">
                                  @{activeReel.author.toLowerCase().replace(/\s/g, '')}
                                </span>
                                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-emerald-500/20">
                                  {activeReel.role}
                                </span>
                              </div>
                              <p className="text-xs text-slate-200 line-clamp-2 leading-snug font-medium">
                                {activeReel.content}
                              </p>

                              {/* Rolling Soundtrack Track Ticker */}
                              <div className="flex items-center gap-2 mt-1 bg-white/5 backdrop-blur-md rounded-full px-2.5 py-1 w-fit max-w-[80%] overflow-hidden">
                                <Music className="w-3.5 h-3.5 text-emerald-400 animate-spin shrink-0" style={{ animationDuration: '4s' }} />
                                <span className="text-[10px] font-mono font-medium truncate tracking-wide text-slate-200 animate-marquee">
                                  {activeReel.audioTrack || `Original Audio - ${activeReel.author}`}
                                </span>
                              </div>
                            </div>

                            {/* Floating Right Actions bar (TikTok Core Virality features) */}
                            <div className="absolute right-3 bottom-20 flex flex-col items-center gap-4 z-20">
                              {/* Follow / Connection Badge */}
                              <div className="relative flex flex-col items-center">
                                <img
                                  src={activeReel.avatar}
                                  alt={activeReel.author}
                                  className="w-10 h-10 rounded-full border-2 border-emerald-400 object-cover shadow-lg"
                                />
                                {!connectedUsers.includes(activeReel.author) && activeReel.author !== userProfile.name ? (
                                  <button
                                    type="button"
                                    onClick={() => setConnectedUsers([...connectedUsers, activeReel.author])}
                                    className="absolute -bottom-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-0.5 hover:scale-110 transition-transform shadow cursor-pointer"
                                    title="Connect with peer"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                ) : (
                                  <div className="absolute -bottom-1.5 bg-emerald-100 text-emerald-800 rounded-full p-0.5 shadow border border-emerald-400">
                                    <UserCheck className="w-2.5 h-2.5" />
                                  </div>
                                )}
                              </div>

                              {/* Double Click Like Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  setLikeHeartPop(activeReel.id);
                                  setTimeout(() => setLikeHeartPop(null), 800);
                                  handleLikePost(activeReel.id);
                                }}
                                className="flex flex-col items-center gap-0.5 text-white/90 hover:text-white transition-colors cursor-pointer"
                              >
                                <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-full hover:scale-110 transition-transform shadow-md">
                                  <Heart className={`w-5 h-5 transition-colors ${activeReel.hasLiked ? "fill-rose-500 text-rose-500" : "text-white"}`} />
                                </div>
                                <span className="text-[10px] font-bold font-mono text-shadow">{activeReel.likes}</span>
                              </button>

                              {/* Comments trigger button */}
                              <button
                                type="button"
                                onClick={() => setIsReelCommentOpen(true)}
                                className="flex flex-col items-center gap-0.5 text-white/90 hover:text-white transition-colors cursor-pointer"
                              >
                                <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-full hover:scale-110 transition-transform shadow-md">
                                  <MessageSquare className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-[10px] font-bold font-mono text-shadow">{activeReel.comments.length}</span>
                              </button>

                              {/* Speed setting controls */}
                              <div className="flex flex-col items-center gap-0.5">
                                <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-full hover:scale-110 transition-transform shadow-md flex items-center justify-center relative group">
                                  <Sliders className="w-5 h-5 text-amber-400 cursor-pointer" />
                                  <div className="absolute right-12 bottom-0 bg-slate-900 border border-slate-700 rounded-xl p-1.5 hidden group-hover:flex flex-col gap-1 shadow-2xl z-40 shrink-0">
                                    <span className="text-[8px] font-bold text-slate-9000 uppercase tracking-wider px-1 text-center whitespace-nowrap">Play Speed</span>
                                    {["0.5x", "1x", "1.5x", "2x"].map(speedVal => (
                                      <button
                                        key={speedVal}
                                        type="button"
                                        onClick={() => {
                                          const videoEl = document.querySelector(`video[src="${activeReel.video}"]`) as HTMLVideoElement;
                                          if (videoEl) {
                                            videoEl.playbackRate = parseFloat(speedVal);
                                            const updated = posts.map(p => p.id === activeReel.id ? { ...p, playbackSpeed: speedVal } : p);
                                            onUpdatePosts(updated);
                                          }
                                        }}
                                        className={`px-2 py-0.5 text-[9px] font-bold rounded-full hover:bg-slate-700 text-center transition-colors ${
                                          activeReel.playbackSpeed === speedVal || (!activeReel.playbackSpeed && speedVal === "1x")
                                            ? "bg-purple-500 text-slate-900 font-black"
                                            : "text-slate-300"
                                        }`}
                                      >
                                        {speedVal}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <span className="text-[8px] font-bold text-shadow text-amber-400">SPEED</span>
                              </div>

                              {/* Duet feature button */}
                              {!activeReel.duetWithVideo && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDuetSourcePost(activeReel);
                                    setIsRecordingModalOpen(true);
                                    startCamera();
                                  }}
                                  className="flex flex-col items-center gap-0.5 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                                  title="Duet with this video"
                                >
                                  <div className="bg-rose-500/20 backdrop-blur-md p-2.5 rounded-full hover:scale-110 transition-transform shadow-md border border-rose-500/30 animate-pulse">
                                    <Radio className="w-5 h-5 text-rose-500" />
                                  </div>
                                  <span className="text-[8px] font-bold font-mono text-shadow text-rose-400">DUET</span>
                                </button>
                              )}

                              {/* Monetized Tip Creator Button */}
                              <button
                                type="button"
                                onClick={() => setTippingPost(activeReel)}
                                className="flex flex-col items-center gap-0.5 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                                title="Tip this artisan creator"
                              >
                                <div className="bg-purple-500/20 backdrop-blur-md p-2.5 rounded-full hover:scale-110 transition-transform shadow-md border border-amber-500/30">
                                  <Coins className="w-5 h-5 text-amber-400" />
                                </div>
                                <span className="text-[8px] font-bold font-mono text-shadow text-amber-400">TIP</span>
                              </button>

                              {/* Simulated Vinyl record rotate */}
                              <div className={`relative flex items-center justify-center ${isReelPlaying ? "animate-spin" : ""}`} style={{ animationDuration: '5s' }}>
                                <div className="w-9 h-9 bg-slate-900 rounded-full border-2 border-slate-700 shadow-md flex items-center justify-center">
                                  <div className="w-3 h-3 bg-emerald-400 rounded-full border border-black" />
                                </div>
                              </div>
                            </div>

                            {/* Mute controls */}
                            <div className="absolute top-12 right-4 flex items-center gap-2 z-20">
                              <button
                                type="button"
                                onClick={() => setIsReelMuted(!isReelMuted)}
                                className="bg-black/40 backdrop-blur-md p-1.5 rounded-full hover:scale-105 transition-transform text-white shadow cursor-pointer"
                              >
                                {isReelMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                              </button>
                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900">
                        <Video className="w-12 h-12 text-slate-700 mb-4 animate-pulse" />
                        <h4 className="font-bold text-sm text-slate-300 mb-1">No Trade Videos Yet</h4>
                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">Be the first to record a tutorial or upload a trade video to the ESTARR community!</p>
                        <button
                          type="button"
                          onClick={() => {
                            setIsRecordingModalOpen(true);
                            startCamera();
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
                        >
                          <Camera className="w-3.5 h-3.5" /> Record Video
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Interaction details and next/previous controls */}
                  <div className="flex-1 flex flex-col justify-between gap-5 bg-slate-900 border border-slate-800 rounded-xl p-5 relative z-10 max-h-[560px]">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="font-display font-bold text-base text-white flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                          <span>ESTARR Video Discovery Studio</span>
                        </h4>
                        <p className="text-[10px] text-slate-9000 font-mono uppercase tracking-wider">
                          TikTok / Instagram Mechanics in Action
                        </p>
                      </div>

                      {posts.filter(p => p.video).length > 0 && (
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-900">
                          Video {currentReelIndex + 1} of {posts.filter(p => p.video).length}
                        </span>
                      )}
                    </div>

                    {posts.filter(p => p.video).length > 0 ? (
                      (() => {
                        const reelPosts = posts.filter(p => p.video);
                        const activeReel = reelPosts[currentReelIndex % reelPosts.length];

                        return (
                          <div className="flex-1 flex flex-col justify-between gap-4 overflow-hidden">
                            {/* Scrollable comments and description block */}
                            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 scrollbar-thin">
                              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col gap-2.5">
                                <span className="text-[10px] font-bold text-slate-9000 uppercase tracking-widest block font-mono">
                                  📌 Post Caption & Vocational Value
                                </span>
                                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                  {activeReel.content}
                                </p>
                                {activeReel.audioTrack && (
                                  <div className="text-[10px] text-purple-400 font-bold font-mono flex items-center gap-1 bg-purple-950/40 p-1.5 rounded-xl border border-purple-900/30 w-fit">
                                    <Music className="w-3 h-3 text-purple-400 shrink-0" />
                                    <span>Soundtrack: {activeReel.audioTrack}</span>
                                  </div>
                                )}
                              </div>

                              {/* Mini-Comments view for active video */}
                              <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-slate-9000 uppercase tracking-widest block font-mono">
                                  💬 Comments on this Reel ({activeReel.comments.length})
                                </span>
                                
                                {activeReel.comments.length > 0 ? (
                                  <div className="flex flex-col gap-2">
                                    {activeReel.comments.map((comm, cIdx) => (
                                      <div key={cIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex gap-2 items-start text-[11px] hover:border-slate-700 transition-colors">
                                        <div className="bg-emerald-950 text-emerald-400 w-6 h-6 rounded-full font-bold flex items-center justify-center text-[9px] shrink-0 border border-emerald-900">
                                          {comm.author.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex justify-between items-center mb-0.5">
                                            <span className="font-bold text-slate-200">{comm.author}</span>
                                            <span className="text-[9px] text-slate-500 font-mono">{comm.time}</span>
                                          </div>
                                          <p className="text-slate-9000 leading-snug">{comm.content}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-[11px] text-slate-500 italic px-2">No comments yet. Write a supportive comment below!</p>
                                )}
                              </div>
                            </div>

                            {/* Comment post input inside the player */}
                            <form 
                              onSubmit={(e) => {
                                e.preventDefault();
                                if (!reelCommentsInput.trim()) return;
                                
                                const updated = posts.map(p => {
                                  if (p.id === activeReel.id) {
                                    return {
                                      ...p,
                                      comments: [
                                        ...p.comments,
                                        {
                                          author: userProfile.name,
                                          content: reelCommentsInput.trim(),
                                          time: "Just now"
                                        }
                                      ]
                                    };
                                  }
                                  return p;
                                });
                                onUpdatePosts(updated);
                                setReelCommentsInput("");
                              }}
                              className="flex gap-2 bg-slate-950 border border-slate-800 p-2 rounded-xl"
                            >
                              <input
                                type="text"
                                placeholder="Add support comment..."
                                value={reelCommentsInput}
                                onChange={(e) => setReelCommentsInput(e.target.value)}
                                className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder-slate-500 font-medium px-2"
                              />
                              <button
                                type="submit"
                                disabled={!reelCommentsInput.trim()}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                              >
                                Send
                              </button>
                            </form>

                            {/* Quick Swiping Navigation Controls for TikTok Simulator */}
                            <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                              <button
                                type="button"
                                onClick={() => {
                                  setCurrentReelIndex(prev => (prev === 0 ? reelPosts.length - 1 : prev - 1));
                                  setIsReelPlaying(true);
                                }}
                                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border border-slate-700 cursor-pointer"
                              >
                                <ChevronUp className="w-4 h-4 text-emerald-400" />
                                <span>Previous Video</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setCurrentReelIndex(prev => (prev + 1) % reelPosts.length);
                                  setIsReelPlaying(true);
                                }}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-lg cursor-pointer"
                              >
                                <span>Next Video</span>
                                <ChevronDown className="w-4 h-4 text-white" />
                              </button>
                            </div>

                            {/* Informative educational message detailing the viral hooks */}
                            <div className="bg-slate-950 border border-purple-900/40 rounded-xl p-3 flex flex-col gap-1 text-[10px] text-slate-300">
                              <span className="font-bold text-purple-400 flex items-center gap-1">🧪 Why is this interface viral?</span>
                              <p className="text-slate-9000 leading-snug">
                                **TikTok's full-bleed video** creates total immersion, removing navigation friction. **Background audio tracks** foster collective memes, while **speed manipulation** empowers rapid-paced tutorials. ESTARR leverages this structure to maximize vocational matchmaking and skill discovery.
                              </p>
                            </div>
                          </div>
                        );
                      })()
                    ) : null}
                  </div>

                  {/* Comments Modal Overlay Slide-Up (For Mobile screens) */}
                  {isReelCommentOpen && posts.filter(p => p.video).length > 0 && (
                    <div className="absolute inset-x-0 bottom-0 bg-slate-950/95 border-t border-slate-800 p-6 z-50 rounded-t-3xl flex flex-col max-h-[75%] shadow-2xl animate-slide-up text-white">
                      <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
                        <span className="text-sm font-bold flex items-center gap-1">
                          <span>💬 Comments Feed</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsReelCommentOpen(false)}
                          className="bg-slate-850 text-slate-9000 hover:text-white rounded-xl p-1 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 mb-4 scrollbar-thin">
                        {posts.filter(p => p.video)[currentReelIndex % posts.filter(p => p.video).length].comments.map((c, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start bg-slate-900 rounded-xl p-3 border border-slate-850">
                            <div className="bg-emerald-950 text-emerald-400 w-6 h-6 rounded-full font-bold flex items-center justify-center text-[9px] border border-emerald-900 shrink-0">
                              {c.author.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-0.5">
                                <span className="font-bold text-xs text-slate-200">{c.author}</span>
                                <span className="text-[9px] text-slate-500 font-mono">{c.time}</span>
                              </div>
                              <p className="text-slate-300 text-xs leading-snug">{c.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!reelCommentsInput.trim()) return;
                          const reelPosts = posts.filter(p => p.video);
                          const activeReel = reelPosts[currentReelIndex % reelPosts.length];

                          const updated = posts.map(p => {
                            if (p.id === activeReel.id) {
                              return {
                                ...p,
                                comments: [
                                  ...p.comments,
                                  {
                                    author: userProfile.name,
                                    content: reelCommentsInput.trim(),
                                    time: "Just now"
                                  }
                                ]
                              };
                            }
                            return p;
                          });
                          onUpdatePosts(updated);
                          setReelCommentsInput("");
                        }}
                        className="flex gap-2 bg-slate-900 border border-slate-800 p-2 rounded-xl"
                      >
                        <input
                          type="text"
                          placeholder="Type your comment..."
                          value={reelCommentsInput}
                          onChange={(e) => setReelCommentsInput(e.target.value)}
                          className="flex-1 bg-transparent text-xs text-white focus:outline-none px-2"
                        />
                        <button
                          type="submit"
                          disabled={!reelCommentsInput.trim()}
                          className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                        >
                          Post
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ) : (
                /* Classic Social Feed */
                <div className="flex flex-col gap-6">
                  {/* ESTARR Birthday Celebration Hub */}
              <div className="bg-gradient-to-r from-rose-50 to-amber-50 border border-amber-200 rounded-3xl p-6 shadow-sm flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Gift className="w-32 h-32 text-purple-500 animate-pulse" />
                </div>

                <div className="flex flex-col gap-1.5 relative z-10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-700 bg-amber-100/50 px-2.5 py-1 rounded-full w-fit">
                    🍰 ESTARR CONNECT CELEBRATIONS
                  </span>
                  <h3 className="font-display font-bold text-lg text-slate-800">
                    ESTARR Birthday Board & Support Network
                  </h3>
                  <p className="text-xs text-slate-500">
                    Support your peers as they grow their trades. Each reaction and comment builds stronger vocational community ties!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
                  {/* Active Today Column */}
                  <div className="md:col-span-7 bg-white rounded-xl p-5 border border-slate-100 shadow-xs flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                        Celebrating Today (July 6th)
                      </span>
                      <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Birthday Star 🍰
                      </span>
                    </div>

                    {birthdayStar && (
                      <div className="flex gap-4 items-start">
                        <img
                          src={birthdayStar.avatar}
                          alt={birthdayStar.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-amber-300 shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-bold text-sm text-slate-800 leading-tight">
                            {birthdayStar.name}
                          </h4>
                          <p className="text-xs text-emerald-600 font-medium">
                            {birthdayStar.profession}
                          </p>
                          <p className="text-[10px] text-slate-9000 font-mono mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-emerald-500" /> {birthdayStar.location}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Quick Reactions */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-mono font-bold text-slate-9000 uppercase tracking-wider">
                        Send Quick Support Reaction
                      </span>
                      <div className="flex gap-2">
                        {[
                          { emoji: "🎉", label: "Celebrate" },
                          { emoji: "🎂", label: "Cake" },
                          { emoji: "🎈", label: "Balloon" },
                          { emoji: "🍰", label: "Slice" },
                          { emoji: "❤️", label: "Support" },
                        ].map((rx) => (
                          <button
                            key={rx.emoji}
                            onClick={() => handleQuickReaction(rx.emoji)}
                            className="bg-slate-50 hover:bg-amber-50 hover:scale-105 border border-slate-100 rounded-xl px-2.5 py-1.5 flex items-center gap-1 text-xs cursor-pointer transition-all animate-none"
                            title={rx.label}
                            type="button"
                          >
                            <span>{rx.emoji}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Message Wish */}
                    <form onSubmit={submitBirthdayWish} className="flex gap-2 pt-2 border-t border-slate-100">
                      <input
                        type="text"
                        placeholder="Write a custom supportive wish..."
                        value={birthdayWishInput}
                        onChange={(e) => setBirthdayWishInput(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400 focus:bg-white text-slate-700 font-medium"
                      />
                      <button
                        type="submit"
                        disabled={!birthdayWishInput.trim()}
                        className="bg-purple-500 hover:bg-purple-600 text-slate-900 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                      >
                        Send Wish
                      </button>
                    </form>
                  </div>

                  {/* Upcoming Birthdays & Live Feed Column */}
                  <div className="md:col-span-5 flex flex-col gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2.5">
                      <span className="text-xs font-bold text-slate-700 block">
                        📅 Upcoming Birthdays
                      </span>
                      <div className="flex flex-col gap-3">
                        {upcomingStars.map((peer, pIdx) => (
                          <div key={pIdx} className="flex justify-between items-center text-xs">
                            <div className="flex gap-2 items-center">
                              <img
                                src={peer.avatar}
                                alt={peer.name}
                                className="w-7 h-7 rounded-full object-cover"
                              />
                              <div>
                                <span className="font-bold text-slate-800 block leading-tight">
                                  {peer.name}
                                </span>
                                <span className="text-[9px] text-slate-9000 block font-mono">
                                  {peer.profession}
                                </span>
                              </div>
                            </div>
                            <span className="text-[10px] text-purple-700 font-semibold font-mono bg-amber-50 px-2 py-0.5 rounded-full">
                              July {peer.name === "Kofi Mensah" ? "8th" : "15th"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-xs flex-1 flex flex-col gap-2">
                      <span className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>💬 Birthday Wall Wishes</span>
                        <span className="text-[9px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full animate-pulse">
                          Live
                        </span>
                      </span>
                      <div className="max-h-[140px] overflow-y-auto flex flex-col gap-2 pr-1 scrollbar-thin">
                        {posts.find((p) => p.id === "birthday-fatima")?.comments.map((comment, cIdx) => (
                          <div key={cIdx} className="bg-slate-50 rounded-xl p-2 text-[11px] border border-slate-100/50">
                            <div className="flex justify-between mb-0.5">
                              <span className="font-bold text-slate-700">{comment.author}</span>
                              <span className="text-[8px] text-slate-9000 font-mono">{comment.time}</span>
                            </div>
                            <p className="text-slate-500 leading-tight">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Create Post Form */}
              <form
                id="create-post-form"
                onSubmit={handleCreatePost}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
              >
                <div className="flex gap-4 items-start mb-4">
                  <img
                    src={userProfile.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder={`Share a video, post a milestone, ask a question, or talk trades, ${userProfile.name.split(" ")[0]}...`}
                    className="w-full resize-none border-none text-slate-700 placeholder-slate-400 text-sm focus:outline-none min-h-[80px]"
                  />
                </div>

                {/* Optional Post Image Preview */}
                {newPostImage && (
                  <div className="relative mb-4 rounded-xl overflow-hidden border border-slate-100 max-h-64 bg-slate-50">
                    <img src={newPostImage} alt="Post Attachment Preview" className="w-full object-contain max-h-64 mx-auto" />
                    <button
                      type="button"
                      onClick={() => setNewPostImage(null)}
                      className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full p-1.5 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Optional Post Video Preview */}
                {newPostVideo && (
                  <div className="relative mb-4 rounded-xl overflow-hidden border border-slate-150 bg-slate-950 shadow-md">
                    <div className="relative">
                      <video
                        src={newPostVideo}
                        controls
                        style={{ filter: newPostVideoFilter }}
                        className="w-full object-contain max-h-80 mx-auto transition-all duration-300"
                      />
                      
                      {/* Real-time Text Overlay Preview */}
                      {creatorTextOverlay.trim() && (
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-4">
                          <span className={`text-center max-w-[85%] break-words p-2 transition-all duration-300 ${
                            OVERLAY_TEXT_STYLES.find(s => s.id === creatorTextStyle)?.classes || ""
                          }`}>
                            {creatorTextOverlay}
                          </span>
                        </div>
                      )}

                      {/* Speed badge on preview */}
                      {creatorSpeed !== "1x" && (
                        <div className="absolute top-2 left-2 bg-emerald-600/90 text-white text-[9px] font-bold px-2 py-1 rounded-xl flex items-center gap-1 z-10 shadow">
                          ⚡ {creatorSpeed} Speed
                        </div>
                      )}

                      {/* Background Music soundtrack badge on preview */}
                      {creatorAudio !== "none" && (
                        <div className="absolute bottom-12 left-2 bg-purple-600/95 text-white text-[9px] font-bold px-2 py-1 rounded-xl flex items-center gap-1 z-10 shadow animate-pulse">
                          🎵 {MOCK_AUDIO_TRACKS.find(t => t.id === creatorAudio)?.name}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          if (newPostVideo.startsWith("blob:")) {
                            URL.revokeObjectURL(newPostVideo);
                          }
                          setNewPostVideo(null);
                          setNewPostVideoFilter("none");
                          setCreatorAudio("none");
                          setCreatorSpeed("1x");
                          setCreatorTextOverlay("");
                        }}
                        className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full p-1.5 transition-colors cursor-pointer z-10"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Filter Selector Bar */}
                    <div className="bg-slate-900 p-3 border-t border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-slate-9000 font-bold uppercase tracking-wider">
                          ✨ Tap to apply a Video Filter
                        </span>
                        {newPostVideoFilter !== "none" && (
                          <button
                            type="button"
                            onClick={() => setNewPostVideoFilter("none")}
                            className="text-[9px] text-emerald-400 hover:underline"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
                        {VIDEO_FILTERS.map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setNewPostVideoFilter(f.value)}
                            className={`px-2.5 py-1 text-[10px] font-semibold rounded-xl border shrink-0 transition-all ${
                              newPostVideoFilter === f.value
                                ? "bg-emerald-600 border-emerald-500 text-white shadow"
                                : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                            }`}
                          >
                            {f.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Audio Soundtrack Selection */}
                    <div className="bg-slate-900 p-3 border-t border-slate-800">
                      <span className="text-[10px] text-slate-9000 font-bold uppercase tracking-wider block mb-2">
                        🎵 TikTok Background Soundtrack
                      </span>
                      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
                        {MOCK_AUDIO_TRACKS.map((track) => (
                          <button
                            key={track.id}
                            type="button"
                            onClick={() => setCreatorAudio(track.id)}
                            className={`px-2.5 py-1 text-[10px] font-semibold rounded-xl border shrink-0 transition-all ${
                              creatorAudio === track.id
                                ? "bg-purple-600 border-purple-500 text-white shadow"
                                : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                            }`}
                          >
                            {track.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Playback Speed Selection */}
                    <div className="bg-slate-900 p-3 border-t border-slate-800">
                      <span className="text-[10px] text-slate-9000 font-bold uppercase tracking-wider block mb-2">
                        ⚡ Recording / Playback Speed
                      </span>
                      <div className="flex gap-1.5">
                        {["0.5x", "1x", "1.5x", "2x"].map((speed) => (
                          <button
                            key={speed}
                            type="button"
                            onClick={() => setCreatorSpeed(speed)}
                            className={`px-3 py-1 text-[10px] font-semibold rounded-xl border transition-all ${
                              creatorSpeed === speed
                                ? "bg-purple-500 border-amber-400 text-slate-900 shadow"
                                : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                            }`}
                          >
                            {speed}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Instagram-style Text Overlay Input */}
                    <div className="bg-slate-900 p-3 border-t border-slate-800">
                      <span className="text-[10px] text-slate-9000 font-bold uppercase tracking-wider block mb-2">
                        ✍️ Instagram Text Overlay
                      </span>
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          placeholder="Type viral hook text here (e.g. 'Watch me craft this! 🔥')"
                          value={creatorTextOverlay}
                          onChange={(e) => setCreatorTextOverlay(e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                        />
                        {creatorTextOverlay.trim() && (
                          <div className="flex flex-wrap gap-1.5 items-center">
                            <span className="text-[9px] text-slate-500 font-mono">Style:</span>
                            {OVERLAY_TEXT_STYLES.map((style) => (
                              <button
                                key={style.id}
                                type="button"
                                onClick={() => setCreatorTextStyle(style.id)}
                                className={`px-2 py-0.5 text-[9px] font-medium rounded-full transition-all ${
                                  creatorTextStyle === style.id
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500"
                                    : "bg-slate-800 text-slate-9000 border border-transparent hover:bg-slate-700 hover:text-white"
                                }`}
                              >
                                {style.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-emerald-600 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl cursor-pointer transition-colors border border-slate-200">
                      <Camera className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Add Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewPostImage(reader.result as string);
                              setNewPostVideo(null); // Clear video if image is chosen
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>

                    <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-emerald-600 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl cursor-pointer transition-colors border border-slate-200">
                      <Video className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Upload Video</span>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => {
                          handleVideoUpload(e);
                          setNewPostImage(null); // Clear image if video is uploaded
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setIsRecordingModalOpen(true);
                        startCamera();
                      }}
                      className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-emerald-600 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl cursor-pointer transition-colors border border-slate-200"
                    >
                      <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                      <span>Record Video</span>
                    </button>
                  </div>
                  <button
                    id="btn-post-submit"
                    type="submit"
                    disabled={!newPostContent.trim() && !newPostImage && !newPostVideo}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" /> Share Post
                  </button>
                </div>
              </form>

              {/* Posts List */}
              <div id="activity-feed" className="flex flex-col gap-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    id={`feed-post-${post.id}`}
                    className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4"
                  >
                    {/* Post Header */}
                    <div className="flex gap-4 items-start justify-between">
                      <div className="flex gap-3 items-center">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="w-11 h-11 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-display font-bold text-sm text-slate-800">
                              {post.author}
                            </h4>
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                              {post.role}
                            </span>
                          </div>
                          <p className="text-xs font-mono text-slate-9000">
                            {post.time}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-wrap">
                      {post.content}
                    </p>

                    {/* Post Image (optional) */}
                    {post.image && (
                      <img
                        src={post.image}
                        alt="post visual"
                        className="rounded-xl w-full max-h-80 object-cover mt-2"
                      />
                    )}

                      {/* Post Video (optional) */}
                    {post.video && (
                      <div className="mt-2">
                        {post.duetWithVideo ? (
                          <div className="grid grid-cols-2 gap-1 bg-black rounded-xl overflow-hidden border border-slate-150 shadow-inner relative h-[450px] md:h-[550px]">
                            <div className="relative border-r border-slate-900 overflow-hidden bg-slate-950">
                              <EnhancedVideoPlayer
                                videoUrl={post.duetWithVideo}
                                poster={post.poster}
                                autoPlay={true}
                                isMutedDefault={true}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-2 left-2 bg-black/60 text-white font-mono text-[9px] px-2 py-0.5 rounded-full backdrop-blur-xs z-10 pointer-events-none">
                                @{post.duetWithAuthor}'s source
                              </div>
                            </div>
                            <div className="relative overflow-hidden bg-slate-950">
                              <EnhancedVideoPlayer
                                videoUrl={post.video}
                                poster={post.poster}
                                autoPlay={true}
                                filter={post.videoFilter || "none"}
                                playbackSpeed={post.playbackSpeed || "1x"}
                                audioTrackName={post.audioTrack}
                                textOverlay={post.textOverlay}
                                textStyleId={post.textStyleId || "classic-white"}
                                isMutedDefault={true}
                                onLike={() => handleLikePost(post.id)}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-2 left-2 bg-black/60 text-white font-mono text-[9px] px-2 py-0.5 rounded-full backdrop-blur-xs z-10 pointer-events-none">
                                @{post.author}'s duet
                              </div>
                            </div>
                          </div>
                        ) : (
                          <EnhancedVideoPlayer
                            videoUrl={post.video}
                            poster={post.poster}
                            autoPlay={true}
                            filter={post.videoFilter || "none"}
                            playbackSpeed={post.playbackSpeed || "1x"}
                            audioTrackName={post.audioTrack}
                            textOverlay={post.textOverlay}
                            textStyleId={post.textStyleId || "classic-white"}
                            isMutedDefault={true}
                            onLike={() => handleLikePost(post.id)}
                            className="w-full h-[450px] sm:h-[550px]"
                          />
                        )}
                      </div>
                    )}

                    {/* Post Interactions */}
                    <div className="flex items-center gap-6 pt-3 border-t border-slate-100 text-xs text-slate-500">
                      <button
                        id={`btn-like-${post.id}`}
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center gap-1.5 font-medium hover:text-emerald-600 transition-colors cursor-pointer ${
                          post.hasLiked ? "text-emerald-600 font-bold" : ""
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" /> {post.likes} Likes
                      </button>
                      <div className="flex items-center gap-1.5 font-medium">
                        <MessageSquare className="w-4 h-4" />{" "}
                        {post.comments.length} Comments
                      </div>
                      {post.video && !post.duetWithVideo && (
                        <button
                          type="button"
                          onClick={() => {
                            setDuetSourcePost(post);
                            setIsRecordingModalOpen(true);
                            startCamera();
                          }}
                          className="flex items-center gap-1 font-semibold hover:text-rose-500 hover:bg-rose-50 text-rose-600 bg-rose-50/50 border border-rose-200/50 px-2.5 py-1 rounded-xl transition-all cursor-pointer shadow-xs ml-auto text-[11px]"
                        >
                          <Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" /> Duet
                        </button>
                      )}
                    </div>

                    {/* Comments list */}
                    {post.comments.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-4 flex flex-col gap-3 text-xs mt-1">
                        {post.comments.map((comment, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start">
                            <div className="bg-emerald-100 text-emerald-800 w-6 h-6 rounded-full font-bold flex items-center justify-center text-[10px]">
                              {comment.author.charAt(0)}
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex-1 shadow-sm">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-slate-700">
                                  {comment.author}
                                </span>
                                <span className="text-[10px] text-slate-9000 font-mono">
                                  {comment.time}
                                </span>
                              </div>
                              <p className="text-slate-500">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment Input */}
                    <form
                      onSubmit={(e) => handleCommentSubmit(post.id, e)}
                      className="flex gap-2 items-center mt-2"
                    >
                      <input
                        type="text"
                        placeholder="Write a supportive comment..."
                        value={commentInputs[post.id] || ""}
                        onChange={(e) =>
                          setCommentInputs({
                            ...commentInputs,
                            [post.id]: e.target.value,
                          })
                        }
                        className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-700"
                      />
                      <button
                        type="submit"
                        className="bg-slate-100 text-slate-500 hover:bg-slate-100 p-2 rounded-xl transition-colors cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          )}
            </div>
          )}

          {activeTab === "directory" && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-bold text-lg text-slate-800">
                  Professional Directory
                </h3>
                <p className="text-xs text-slate-9000 font-mono">
                  Endorse skills to build local professional credibility
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockPeers.map((peer, i) => {
                  const currentRecCount =
                    peerRecommends[peer.name] !== undefined
                      ? peerRecommends[peer.name]
                      : peer.recommends;
                  return (
                    <div
                      key={i}
                      id={`peer-card-${i}`}
                      className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4"
                    >
                      <div className="flex gap-3 items-start justify-between w-full">
                        <div className="flex gap-3 items-start">
                          <img
                            src={peer.avatar}
                            alt={peer.name}
                            className="w-12 h-12 rounded-full object-cover border border-emerald-500/20"
                          />
                          <div>
                            <h4 className="font-display font-bold text-sm text-slate-800">
                              {peer.name}
                            </h4>
                            <p className="text-xs text-emerald-600 font-medium">
                              {peer.profession}
                            </p>
                            <div className="flex items-center gap-1.5 text-slate-9000 text-[10px] mt-1 font-mono">
                              <MapPin className="w-3 h-3 text-slate-300" />
                              <span>{peer.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          <span className="text-[9px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold uppercase tracking-widest border border-amber-200">
                            Available for Hire
                          </span>
                          <button
                            onClick={() => alert(`Direct connection request sent to ${peer.name} for a potential gig.`)}
                            className="text-[10px] bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg font-bold transition-colors shadow-sm"
                          >
                            Quick Connect
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed italic">
                        "{peer.bio}"
                      </p>

                      <div className="flex flex-col gap-2">
                        {peer.formalSkills && peer.formalSkills.length > 0 && (
                          <div>
                            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest block mb-1">Formal Skills (skill-sch.com)</span>
                            <div className="flex flex-wrap gap-1">
                              {peer.formalSkills.map((skill, sIdx) => (
                                <span key={sIdx} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {peer.creatorSkills && peer.creatorSkills.length > 0 && (
                          <div>
                            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest block mb-1">Creator Skills (ESTARR)</span>
                            <div className="flex flex-wrap gap-1">
                              {peer.creatorSkills.map((skill, sIdx) => (
                                <span key={sIdx} className="text-[10px] bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                        <span className="font-mono text-slate-9000 font-bold">
                          {currentRecCount} Endorsements
                        </span>
                        <div className="flex gap-3">
                          <button
                            onClick={() => alert(`Direct message initiated with ${peer.name}.`)}
                            className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <MessageSquare className="w-4 h-4" /> Message
                          </button>
                          <button
                            id={`btn-endorse-${i}`}
                            onClick={() => handleRecommendPeer(peer)}
                            className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Award className="w-4 h-4 text-emerald-500" /> Endorse
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "mentorship" && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-800">
                    Mentorship Matchmaker
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Connect with veterans who have made the successful leap from
                    learning to earning.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    id="btn-find-mentor"
                    onClick={() => {
                      setMentorshipStatus("Find a Mentor");
                      setSelectedMentor(null);
                    }}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      mentorshipStatus === "Find a Mentor"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-50 text-slate-500"
                    }`}
                  >
                    Find a Mentor
                  </button>
                  <button
                    id="btn-be-mentor"
                    onClick={() => {
                      setMentorshipStatus("Be a Mentor");
                      setSelectedMentor(null);
                    }}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      mentorshipStatus === "Be a Mentor"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-50 text-slate-500"
                    }`}
                  >
                    Offer Mentorship
                  </button>
                </div>
              </div>

              {mentorshipStatus === "Find a Mentor" ? (
                <div className="flex flex-col gap-6">
                  {selectedMentor ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start"
                    >
                      <img
                        src={selectedMentor.avatar}
                        alt="mentor"
                        className="w-16 h-16 rounded-full object-cover border border-emerald-500"
                      />
                      <div className="flex-1">
                        <span className="text-[10px] uppercase font-mono font-bold text-emerald-600 tracking-wider">
                          Matched Partner
                        </span>
                        <h4 className="font-display font-bold text-base text-slate-800 mt-0.5">
                          {selectedMentor.name}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {selectedMentor.profession}
                        </p>

                        <div className="mt-4 bg-white border border-emerald-100/50 rounded-xl p-4 text-xs text-slate-500">
                          <p className="font-bold mb-1 text-slate-700">
                            How this mentor can guide you:
                          </p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Review your practical project submissions.</li>
                            <li>
                              Suggest local business structures and licenses.
                            </li>
                            <li>
                              Provide client negotiation and WhatsApp selling
                              guidelines.
                            </li>
                          </ul>
                        </div>

                        <div className="flex gap-3 mt-4">
                          <button
                            id="btn-mentor-accept"
                            onClick={() =>
                              alert(
                                `Connection requested! ESTARR AI will notify ${selectedMentor.name}.`,
                              )
                            }
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                          >
                            Request Connection
                          </button>
                          <button
                            id="btn-mentor-back"
                            onClick={() => setSelectedMentor(null)}
                            className="bg-white border border-slate-200 text-slate-500 px-4 py-1.5 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors"
                          >
                            Show Others
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockPeers.map((peer, i) => (
                        <div
                          key={i}
                          className="border border-slate-100 rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-emerald-300 transition-all"
                        >
                          <div className="flex gap-3 items-start">
                            <img
                              src={peer.avatar}
                              alt="peer"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="font-display font-bold text-sm text-slate-800">
                                {peer.name}
                              </h4>
                              <p className="text-xs text-slate-9000">
                                {peer.profession}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-2">
                            Goals: {peer.goals.join(", ")}
                          </p>
                          <button
                            id={`btn-match-mentor-${i}`}
                            onClick={() => setSelectedMentor(peer)}
                            className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                          >
                            View Pairing Matches
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-6 text-center flex flex-col items-center gap-3">
                  <div className="bg-emerald-100 p-3 rounded-full text-emerald-700">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-base text-slate-800">
                    Become a ESTARR Pioneer Mentor
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Have you successfully built a small business or trade? Join
                    our volunteer group to mentor peers. Your contributions will
                    reward you with exclusive badges and high ranking on our
                    peer directory.
                  </p>
                  <button
                    id="btn-register-mentor"
                    onClick={() =>
                      alert(
                        "Successfully added to the ESTARR Mentor registry! Peers can now discover you.",
                      )
                    }
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all mt-2"
                  >
                    Register as Mentor
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "companion" && (
            <SyncConsole />
          )}
        </div>
      </div>

      {/* Real-time Video Studio / Recording Modal */}
      {isRecordingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-slate-900 text-white w-full max-w-2xl rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-rose-500 rounded-full animate-ping" />
                <h3 className="font-display font-bold text-lg text-white">ESTARR Video Creation Studio</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setIsRecordingModalOpen(false);
                }}
                className="text-slate-9000 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-4">
              <p className="text-xs text-slate-9000">
                Showcase your trade, craft, products, or practical tips in real-time! Record a video up to <span className="text-emerald-400 font-bold">30 seconds</span> and share it directly onto the community feed.
              </p>

              {/* Video Player Display Container */}
              <div className="relative bg-black rounded-xl overflow-hidden h-80 border border-slate-800 shadow-inner flex items-center justify-center">
                {/* Live Camera Stream (Visible if camera active and no recording URL generated) */}
                <video
                  ref={localVideoRef}
                  muted
                  playsInline
                  style={{ 
                    display: recordedVideoUrl ? "none" : "block", 
                    filter: newPostVideoFilter, 
                    transform: "scaleX(-1)" 
                  }}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Saved/Recorded Playback Stream (Visible once recorded) */}
                {recordedVideoUrl && (
                  <video
                    src={recordedVideoUrl}
                    controls
                    playsInline
                    style={{ filter: newPostVideoFilter }}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                )}

                {/* Pulse Record Indicator Overlay */}
                {isRecording && (
                  <div className="absolute top-4 left-4 bg-rose-600/90 text-white font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md z-10">
                    <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                    <span>REC • 0:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds} / 0:30</span>
                  </div>
                )}
              </div>

              {/* Live Video Filter Options */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-9000 font-bold uppercase tracking-wider flex items-center gap-1">
                    <span>✨ Real-time Video Studio Filter:</span>
                  </span>
                  {newPostVideoFilter !== "none" && (
                    <button
                      type="button"
                      onClick={() => setNewPostVideoFilter("none")}
                      className="text-[9px] text-emerald-400 hover:underline font-bold"
                    >
                      Reset Filter
                    </button>
                  )}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
                  {VIDEO_FILTERS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setNewPostVideoFilter(f.value)}
                      className={`px-3 py-1.5 text-[11px] font-semibold rounded-xl border shrink-0 transition-all cursor-pointer ${
                        newPostVideoFilter === f.value
                          ? "bg-emerald-600 border-emerald-500 text-white shadow"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white"
                      }`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guidance Tips */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-1.5 text-xs text-slate-300">
                <span className="font-bold text-emerald-400 flex items-center gap-1">💡 Tips for a Great Trade Video:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-9000 text-[11px]">
                  <li>Position yourself in a well-lit, quiet area.</li>
                  <li>Speak clearly and demonstrate your tools, materials, or products in action!</li>
                  <li>Mention your name, trade, and location to connect with local buyers or partners.</li>
                </ul>
              </div>
            </div>

            {/* Footer Control Panel */}
            <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex justify-between items-center gap-4">
              <div>
                {!recordedVideoUrl ? (
                  <span className="text-xs text-slate-9000 font-medium">
                    {isRecording ? "Recording in progress..." : "Camera initialized & ready"}
                  </span>
                ) : (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    ✓ Video Recorded Successfully
                  </span>
                )}
              </div>

              <div className="flex gap-2.5">
                {!recordedVideoUrl ? (
                  isRecording ? (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-900/30"
                    >
                      <span className="w-2.5 h-2.5 bg-white rounded-sm animate-pulse" />
                      Stop Recording
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-900/30"
                    >
                      <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
                      Start Recording
                    </button>
                  )
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={startCamera}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border border-slate-700"
                    >
                      Retake Video
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveRecordedVideo}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg"
                    >
                      Attach to Post
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monetized Tip Creator Modal Overlay */}
      {tippingPost && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl flex flex-col gap-5 animate-scale-in">
            {/* Modal Header */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-purple-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full font-bold uppercase">
                  Artisan Micro-Donation
                </span>
                <h3 className="font-display font-bold text-base text-slate-900 mt-3 leading-tight">
                  Tip Artisan Instructor
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTippingPost(null)}
                className="text-slate-9000 hover:text-slate-500 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Content Creator Card */}
            <div className="flex gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl items-center">
              <div className="w-10 h-10 bg-emerald-600 text-white font-mono font-bold rounded-xl flex items-center justify-center shadow-inner text-sm">
                {tippingPost.author.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-bold text-xs text-slate-800 block truncate">{tippingPost.author}</span>
                <span className="text-[10px] text-slate-500 block truncate font-medium">{tippingPost.role}</span>
              </div>
            </div>

            {/* Fast-select Tip Presets */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-9000 uppercase tracking-wider font-mono">Select Preset Tip Amount</span>
              <div className="grid grid-cols-4 gap-2">
                {["200", "500", "1000", "2000"].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTipAmount(preset)}
                    className={`py-2 rounded-xl text-xs font-bold font-mono border transition-all cursor-pointer text-center ${
                      tipAmount === preset
                        ? "bg-purple-500 border-amber-500 text-slate-900 font-black shadow-sm"
                        : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    ₦{preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-9000 uppercase tracking-wider font-mono">Custom Amount (₦)</label>
              <input
                type="number"
                min="50"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                placeholder="Enter custom tip amount"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono font-bold focus:outline-none focus:border-amber-500 transition-colors w-full"
              />
            </div>

            {/* Account Standings */}
            <div className="flex justify-between items-center text-xs border-t border-dashed border-slate-100 pt-3">
              <span className="text-slate-500">Your Learner Balance:</span>
              <span className="font-mono font-bold text-emerald-600">
                ₦{(userProfile.walletBalance ?? 0).toLocaleString()}
              </span>
            </div>

            {/* Send Action */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleSendTip(tippingPost)}
                className="w-full bg-purple-500 hover:bg-purple-600 text-slate-900 font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Coins className="w-4 h-4 text-slate-900" /> Send ₦{Number(tipAmount || 0).toLocaleString()} Tip
              </button>
              
              <button
                type="button"
                onClick={() => setTippingPost(null)}
                className="w-full bg-slate-100 hover:bg-slate-100 text-slate-500 font-bold py-2.5 rounded-xl text-xs uppercase cursor-pointer transition-all text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* skill-sch.com Synchronization Modal */}
      {isSyncOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 flex flex-col animate-fade-in text-slate-800">
            
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
                onClick={() => setIsSyncOpen(false)}
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
                              name="sync_profile_select"
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

                  <div className="relative flex items-center gap-3 my-2">
                    <div className="flex-1 h-px bg-slate-100" />
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Or</span>
                    <div className="flex-1 h-px bg-slate-100" />
                  </div>

                  <button
                    type="button"
                    onClick={handleLinkedInSync}
                    className="w-full bg-white hover:bg-slate-50 text-[#0A66C2] border-2 border-[#0A66C2]/20 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    Sync with LinkedIn Profile
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
                    onClick={() => setIsSyncOpen(false)}
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
    </div>
  );
}
