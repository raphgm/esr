import { Course, Product, BrandCampaign, Job, ActivityPost, CommunityChannel } from "./types";

export const initialProfile = {
  name: "Chinedu Okafor",
  email: "chinedu@estarrapp.com",
  profession: "Principal AI Engineer & Cloud Architect",
  bio: "Helping African startups build scalable infrastructure. Specializes in distributed systems, AI agent development, and enterprise cloud migrations.",
  location: "Lagos, Nigeria",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  skills: ["System Architecture", "Cloud Computing", "API Development", "CI/CD Pipelines", "Kubernetes", "Docker", "AWS", "Terraform"],
  interests: ["Agriculture", "Digital Marketing", "E-commerce", "Logistics"],
  goals: ["Start a YouTube Channel", "Scale WhatsApp Store", "Learn Web Development"],
  certifications: [
    "Advanced Prompt Engineering (2025)",
    "Google Cloud Professional Data Engineer (2025)",
    "estarr.ai: Autonomous Agents Engineer (2026)"
  ],
  recommends: 42,
  birthdate: "1998-07-06",
  walletBalance: 0,
  instructorEarnings: 154000,
  unlockedCourseIds: ["course-1"],
  history: [],
  portfolio: [
    { id: "p-1", title: "Distributed Kubernetes Cluster Migration", url: "https://github.com/chinedu/k8s-cluster-migration", category: "Cloud Architecture", views: 45000, likes: 3200 },
    { id: "p-2", title: "Enterprise AI Agent Deployment", url: "https://github.com/chinedu/ai-agent-deployment", category: "AI Engineering", views: 125000, likes: 9800 },
  ],
  handle: "chinedu_creates"
};

export const initialPosts: ActivityPost[] = [
  {
    id: "post-video-0",
    author: "Aisha Yusuf",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    role: "AI Researcher",
    content: "🎥 SHOWCASE: Check out my new LLM tuning tutorial! I recorded this video directly on the ESTARR app. Let me know what you think of this optimization technique! ✨🤖",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    videoFilter: "none",
    audioTrack: "Cyberpunk Ambience - Aisha Yusuf Original",
    playbackSpeed: "1x",
    textOverlay: "LLM Fine-Tuning Tutorial ✨🤖",
    likes: 56,
    comments: [
      { author: "Fatima Bello", content: "Wow, this looks absolutely beautiful! The detail is amazing! 💖", time: "1h ago" }
    ],
    time: "1h ago"
  },
  {
    id: "post-video-carpentry",
    author: "Chinedu Okafor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    role: "Cloud DevOps Engineer",
    content: "🔨 Infrastructure as Code is in the details! Crafting this scalable Kubernetes cluster using Terraform. Fast, durable, and premium look. Let's build! #DevOps #Cloud",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600",
    videoFilter: "none",
    audioTrack: "Acoustic Folk Beats - Chinedu Okafor",
    playbackSpeed: "1x",
    textOverlay: "Scalable Kubernetes Cluster 🔨",
    likes: 84,
    comments: [
      { author: "Kofi Mensah", content: "Super clean joins! Terraform is hard to work with but you made it look easy.", time: "2h ago" },
      { author: "Aisha Yusuf", content: "This is beautiful! I need a custom cluster for my AI models.", time: "1h ago" }
    ],
    time: "2h ago"
  },
  {
    id: "post-video-culinary",
    author: "Fatima Bello",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    role: "Software Architect",
    content: "🔥 Watch how we deploy our signature high-volume microservices! Fresh code, high scalability, and that perfect seamless pipeline. Book us for your enterprise architecture! 💻🚀",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600",
    videoFilter: "none",
    audioTrack: "Sizzle & Chill Lounge - Fatima Beats",
    playbackSpeed: "1x",
    textOverlay: "High-Volume Microservices 🔥🚀",
    likes: 142,
    comments: [
      { author: "Tunde Rex", content: "Oh my goodness, I can feel the speed through my screen! Delicious!", time: "3h ago" },
      { author: "Amadi Silva", content: "Please deploy 5 nodes to my workspace tomorrow!", time: "2h ago" }
    ],
    time: "3h ago"
  },
  {
    id: "post-video-spinning",
    author: "Eleni Wolde",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    role: "Smart Contract Developer",
    content: "🧶 Auditing pure Solidity code into secure escrow contracts. This slow, careful art forms the foundation of our Web3 platforms. Slow dev, secure earnings. 🌍✨",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=600",
    videoFilter: "none",
    audioTrack: "Meditation & Loom Sounds - Ambient Yarn",
    playbackSpeed: "1x",
    textOverlay: "Secure Escrow Contracts 🧶",
    likes: 93,
    comments: [
      { author: "Aisha Yusuf", content: "Absolutely spellbinding to watch. This craftsmanship is rare!", time: "4h ago" }
    ],
    time: "5h ago"
  },
  {
    id: "post-video-tech",
    author: "Amadi Silva",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    role: "Full-Stack Creator",
    content: "🚀 Building the future of commerce in Africa! Just deployed a new automated payment gateway integration. Tech is the engine! #VibeCoding #TechTalent",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackAds.mp4",
    poster: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600",
    videoFilter: "brightness(110%) contrast(110%)",
    audioTrack: "startup",
    playbackSpeed: "1x",
    textOverlay: "Full-Stack Payment Integration 🚀",
    likes: 215,
    comments: [
      { author: "Chinedu Okafor", content: "This is huge for the ecosystem! Great work Amadi.", time: "30m ago" }
    ],
    time: "6h ago"
  },
  {
    id: "post-video-lifestyle",
    author: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    role: "Digital Nomad",
    content: "Morning routine in Lagos! ☕✨ Grateful for the remote opportunities ESTARR has opened up. Freedom to work, create, and grow. #RemoteWork #LagosLife",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    poster: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=600",
    videoFilter: "sepia(30%) contrast(110%)",
    audioTrack: "lofi",
    playbackSpeed: "1x",
    textOverlay: "Lagos Remote Tech Life 🌴💻",
    likes: 342,
    comments: [
      { author: "Fatima Bello", content: "Love the setup! Keep inspiring us.", time: "1h ago" }
    ],
    time: "8h ago"
  },
  {
    id: "post-text-1",
    author: "Fatima Bello",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    role: "Culinary Artist",
    content: "Just graduated from the 'Zero to Cook' signature program on the Academy! 🍳 Today I secured my first small catering gig for an office launch in Ikeja. Moving from learning to earning is real!\n\nall because the platform is not focused on only IT skills",
    likes: 120,
    comments: [
      { author: "Platform Admin", content: "Congratulations Fatima! We love seeing our talent thrive. Next stop: Global Enterprise catering contracts!", time: "4h ago" }
    ],
    time: "5h ago"
  },
  {
    id: "post-image-1",
    author: "Kofi Mensah",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
    role: "Cloud DevOps Engineer",
    content: "My new CI/CD deployment pipeline setup is finally complete! 🚀 Built this 99.999% uptime architecture specifically for startup scale. Efficiency is key.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
    likes: 89,
    comments: [],
    time: "1d ago"
  },
  {
    id: "post-text-2",
    author: "Amadi Silva",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    role: "Full-Stack Creator",
    content: "Freelancers: What's your biggest challenge right now? For me, it's managing multiple client microservices effectively while trying to launch my own SaaS product.",
    likes: 45,
    comments: [
      { author: "Kofi Mensah", content: "Time management for sure! Have you tried using our ESTARR escrow? It eliminates the chasing-payments phase completely.", time: "2d ago" },
      { author: "Aisha Yusuf", content: "Balancing client architectural needs with my own research. It never ends! 😅", time: "2d ago" }
    ],
    time: "2d ago"
  }
];

export const initialCourses: Course[] = [
  {
    id: "course-1",
    title: "Google AI Masterclass: Gemini API & Agents",
    category: "AI & ML",
    description: "The official Google playbook for building scalable AI Agents and integrating the Gemini API. Pass this AI-graded training to unlock $15k+ enterprise AI application contracts.",
    rating: 4.9,
    students: 3140,
    image: "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 500\" width=\"100%\" height=\"100%\"%3E%3Cdefs%3E%3ClinearGradient id=\"bg1\" x1=\"0%25\" y1=\"0%25\" x2=\"100%25\" y2=\"100%25\"%3E%3Cstop offset=\"0%25\" stop-color=\"%23a855f7\"% /%3E%3Cstop offset=\"100%25\" stop-color=\"%23312e81\"% /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\"800\" height=\"500\" fill=\"url(%23bg1)\"/%3E%3C/svg%3E",
    lessons: [
      { id: "c1-l1", title: "Introduction to Generative AI & Gemini API", duration: "15 mins", completed: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: "c1-l2", title: "Building Autonomous Agents with Antigravity", duration: "35 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: "c1-l3", title: "Function Calling & System Instructions", duration: "25 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
    ],
    missions: [
      { id: "c1-m1", title: "Build an Autonomous Math Agent", reward: "Google AI Specialist Badge", task: "Submit a TypeScript implementation of a Gemini-powered agent that can reliably solve complex algebraic word problems.", completed: true },
    ],
    quizzes: [
      {
        question: "When should you use the Gemini Interactions API over the standard generateContent method?",
        options: ["For simple text generation", "When you require access to Omni models or Agents", "When generating images only", "To save API credits"],
        answer: 1
      }
    ],
    zeroToIncome: true,
    price: 0,
    instructorName: "Google Developer Experts",
    instructorAvatar: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "course-2",
    title: "Web3 Smart Contract Security Audit",
    category: "Web3",
    description: "Master Solidity security vulnerabilities. Verified AI auditors get direct access to premium Layer-2 protocol bounties and token presale escrow audits.",
    rating: 4.8,
    students: 1842,
    image: "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 500\" width=\"100%\" height=\"100%\"%3E%3Cdefs%3E%3ClinearGradient id=\"bg2\" x1=\"0%25\" y1=\"0%25\" x2=\"100%25\" y2=\"100%25\"%3E%3Cstop offset=\"0%25\" stop-color=\"%2314b8a6\"% /%3E%3Cstop offset=\"100%25\" stop-color=\"%23064e3b\"% /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\"800\" height=\"500\" fill=\"url(%23bg2)\"/%3E%3C/svg%3E",
    lessons: [
      { id: "c2-l1", title: "Reentrancy Attacks & Mitigation", duration: "25 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
      { id: "c2-l2", title: "Flash Loan Exploits Analysis", duration: "40 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
    ],
    missions: [
      { id: "c2-m1", title: "Audit the Provided ERC20 Contract", reward: "L2 Security Auditor Badge", task: "Identify and patch the overflow and reentrancy vulnerabilities in the provided smart contract.", completed: false }
    ],
    quizzes: [
      {
        question: "What is the primary method to prevent a Reentrancy attack in Solidity?",
        options: ["Using tx.origin", "The Checks-Effects-Interactions pattern", "Increasing the gas limit", "Using a fallback function"],
        answer: 1
      }
    ],
    zeroToIncome: false,
    price: 0,
    instructorName: "OpenZeppelin Core",
    instructorAvatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "course-3",
    title: "Autonomous AI Agents Credential",
    category: "Cloud DevOps",
    description: "The definitive practical exam for deploying Kubernetes clusters and managing CI/CD pipelines at scale. Mandatory credential for building enterprise AI pipelines on ESTARR.",
    rating: 5.0,
    students: 4100,
    image: "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 500\" width=\"100%\" height=\"100%\"%3E%3Cdefs%3E%3ClinearGradient id=\"bg3\" x1=\"0%25\" y1=\"0%25\" x2=\"100%25\" y2=\"100%25\"%3E%3Cstop offset=\"0%25\" stop-color=\"%233b82f6\"% /%3E%3Cstop offset=\"100%25\" stop-color=\"%231e3a8a\"% /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\"800\" height=\"500\" fill=\"url(%23bg3)\"/%3E%3C/svg%3E",
    lessons: [
      { id: "c3-l1", title: "Terraform & Infrastructure as Code", duration: "45 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoy.mp4" },
      { id: "c3-l2", title: "EKS Cluster Optimization & Autoscaling", duration: "50 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" }
    ],
    missions: [],
    quizzes: [
      {
        question: "In Kubernetes, what is the role of a HorizontalPodAutoscaler (HPA)?",
        options: ["To restart failed pods", "To scale the number of pods in a deployment based on CPU utilization", "To provision new worker nodes", "To encrypt secrets in etcd"],
        answer: 1
      }
    ],
    zeroToIncome: false,
    price: 0,
    instructorName: "AWS Training Partners",
    instructorAvatar: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&q=80&w=150"
  }
];



export const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: "Turnkey FinTech Dashboard Template",
    category: "Digital IP",
    price: 4500,
    seller: "BlockForge Studios",
    sellerRating: 4.9,
    verified: true,
    image: "", // Use color instead
    description: "Fully responsive React & Tailwind dashboard template with integrated charting and data visualization for FinTech applications. Includes dark mode and trading data components.",
    reviews: [
      { author: "FinTech Next", rating: 5, comment: "Saved us months of frontend development. Highly recommended." },
      { author: "DeFi Startup", rating: 4.8, comment: "Clean code and great design." }
    ]
  },
  {
    id: "prod-2",
    name: "3-Month Enterprise SEO Retainer",
    category: "Agency Retainers",
    price: 12000,
    seller: "Apex Growth Marketing",
    sellerRating: 4.7,
    verified: true,
    image: "", // Use color instead
    description: "Comprehensive 90-day technical SEO audit, backlink acquisition campaign, and content strategy for enterprise SaaS companies.",
    reviews: [
      { author: "CloudCorp", rating: 5, comment: "Traffic increased by 150% in the first two months." }
    ]
  },
  {
    id: "prod-3",
    name: "Audited Escrow Smart Contract Template",
    category: "Smart Contracts",
    price: 850,
    seller: "ChainAudit Labs",
    sellerRating: 4.8,
    verified: true,
    image: "", // Use color instead
    description: "Production-ready Solidity smart contract for milestone-based multi-sig escrow. Fully audited by independent security researchers.",
    reviews: []
  }
];

export const initialCampaigns: BrandCampaign[] = [
  {
    id: "camp-1",
    title: "Eco-Friendly Packaging Launch",
    brand: "Flutterwave",
    budget: 500000,
    status: "Open",
    platform: "Instagram",
    deliverables: ["3x Reels", "5x Stories"],
    color: "from-blue-600 to-indigo-700",
    applicationsCount: 12,
    createdDate: "2026-07-01"
  },
  {
    id: "camp-2",
    title: "Youth Tech Literacy Drive",
    brand: "MTN Nigeria",
    budget: 750000,
    status: "Open",
    platform: "TikTok",
    deliverables: ["5x TikTok Videos", "1x Live Stream"],
    color: "from-yellow-400 to-amber-500",
    applicationsCount: 45,
    createdDate: "2026-07-05"
  },
  {
    id: "camp-3",
    title: "Sustainable Farming Initiative",
    brand: "Amo Feed Mills",
    budget: 300000,
    status: "Open",
    platform: "UGC",
    deliverables: ["10x Product Photos", "2x Review Videos"],
    color: "from-emerald-500 to-teal-600",
    applicationsCount: 8,
    createdDate: "2026-07-08"
  }
];

export const initialJobs: Job[] = [
  {
    id: "job-1",
    title: "Social Media Video Editor",
    company: "Zikoko Media Group",
    type: "Independent",
    location: "Remote (Lagos)",
    salary: "₦150,000 / Month",
    description: "We are looking for a fast-paced, highly creative video editor to craft short form content for TikTok and Instagram Reels. Must be skilled in CapCut or Premiere Pro.",
    skillsRequired: ["Video Editing", "Content Creation", "Canva"],
    matchScore: 92
  },
  {
    id: "job-2",
    title: "Assistant Logistics Dispatch Coordinator",
    company: "GIG Logistics",
    type: "Full-time",
    location: "Ikeja, Lagos",
    salary: "₦180,000 - ₦220,000 / Month",
    description: "Manage incoming dispatch requests, route optimization, driver schedules, and coordinate warehouse drops. Great entry-level opportunity for logistics management.",
    skillsRequired: ["Logistics Management", "Customer Service"],
    matchScore: 60
  },
  {
    id: "job-3",
    title: "Independent Fashion Designer / Stitcher",
    company: "Kala Bespoke Fashion",
    type: "Independent",
    location: "Surulere, Lagos",
    salary: "₦45,000 / Garment",
    description: "We need expert tailors to assist in stitching custom bridesmaids dresses for an upcoming wedding. Accurate measurements and perfect finishes are required.",
    skillsRequired: ["Taking Body Measurements", "Pattern Drafting Basics"],
    matchScore: 40
  },
  {
    id: "job-4",
    title: "Junior Virtual Assistant (Apprentice)",
    company: "Lagos Tech Hub",
    type: "Apprenticeship",
    location: "Remote",
    salary: "₦100k - ₦150k/mo",
    description: "Perfect for recently trained VAs. Help our community manager organize Google Calendars, reply to standard customer emails, and schedule tweets. Mentorship provided.",
    skillsRequired: ["Google Workspace", "Email Management", "Canva"],
    matchScore: 85
  },
  {
    id: "job-5",
    title: "Trainee Video Editor for TikTok Shorts",
    company: "ChopLife Restaurants",
    type: "Apprenticeship",
    location: "Remote",
    salary: "₦80k/mo + Meals",
    description: "Looking for a beginner video editor who has completed the 'Zero to YouTuber' academy course. You will edit 3 short CapCut videos a week for our restaurant's TikTok.",
    skillsRequired: ["CapCut", "Smartphone Videography", "Trending Audio"],
    matchScore: 78
  }
];

export const initialChannels: CommunityChannel[] = [
  {
    id: "ch-1",
    name: "video-editors",
    desc: "Share your reels, edits, ask for feedback, and discover sound templates.",
    posts: [
      { id: "cp-1", author: "Daniel King", content: "What is your go-to source for royalty free afrobeat loops? The YouTube library is so generic.", time: "10m ago", likes: 5 },
      { id: "cp-2", author: "Chinedu Okafor", content: "Try Mixkit or Tunetank! They have some great modern afro rhythms that don't trigger copyright.", time: "5m ago", likes: 8 }
    ]
  },
  {
    id: "ch-2",
    name: "poultry-farmers-group",
    desc: "A cooperative channel for poultry farmers discussing vaccines, feeds, and pricing.",
    posts: [
      { id: "cp-3", author: "Joy Alao", content: "Is anyone experiencing feed price increases this week? Amo feed just went up by 500 Naira.", time: "1h ago", likes: 12 }
    ]
  }
];
