import { Course, Product, BrandCampaign, Job, ActivityPost, CommunityChannel } from "./types";

export const initialProfile = {
  name: "Chinedu Okafor",
  email: "chinedu@estarrapp.com",
  profession: "Digital Creator & E-commerce Merchant",
  bio: "Passionate about building small businesses, content creation, and helping local artisans scale their products online.",
  location: "Lagos, Nigeria",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  formalSkills: ["Cloud Engineering", "FinOps", "AWS Certified"],
  creatorSkills: ["Canva", "Video Editing", "WhatsApp Selling", "Local Sourcing", "Poultry Farming"],
  skills: ["Canva", "Video Editing", "WhatsApp Selling", "Local Sourcing", "Poultry Farming"],
  interests: ["Agriculture", "Digital Marketing", "E-commerce", "Logistics"],
  goals: ["Start a YouTube Channel", "Scale WhatsApp Store", "Learn Web Development"],
  certifications: [
    "Academy: Canva Masterclass (2026)",
    "Academy: Small Business Finance (2026)"
  ],
  recommends: 42,
  birthdate: "1998-07-06",
  walletBalance: 12500,
  instructorEarnings: 154000,
  unlockedCourseIds: ["course-1"],
  portfolio: [
    { id: "p-1", title: "Lagos Tech Hub Startup Vlog Showcase", url: "https://youtube.com/watch?v=l3v_vlg", category: "UGC Brand Deal", views: 45000, likes: 3200 },
    { id: "p-2", title: "Cozy Morning Aesthetic Routine in Lekki", url: "https://tiktok.com/@chinedu/video/1", category: "Lifestyle", views: 125000, likes: 9800 },
  ],
  handle: "chinedu_creates"
};

export const initialPosts: ActivityPost[] = [
  {
    id: "post-video-0",
    author: "Aisha Yusuf",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    role: "Ankara Stylist",
    content: "🎥 SHOWCASE: Check out my new Ankara design tutorial! I recorded this video directly on the ESTARR app. Let me know what you think of this shoulder design! ✨🧵",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
    videoFilter: "none",
    audioTrack: "Sunny Afrobeat - Aisha Yusuf Original",
    playbackSpeed: "1x",
    textOverlay: "Ankara Sleeve Tutorial ✨🧵",
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
    role: "Master Carpenter",
    content: "🔨 Woodworking is in the details! Crafting this floating shelf unit using local mahogany wood. Fast, durable, and premium look. Let's build! #Trades #Carpentry",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600",
    videoFilter: "none",
    audioTrack: "Acoustic Folk Beats - Chinedu Okafor",
    playbackSpeed: "1x",
    textOverlay: "Mahogany Floating Shelf 🔨",
    likes: 84,
    comments: [
      { author: "Kofi Mensah", content: "Super clean joins! Mahogany is hard to work but you made it look easy.", time: "2h ago" },
      { author: "Aisha Yusuf", content: "This is beautiful! I need a custom shelf for my Ankara showroom.", time: "1h ago" }
    ],
    time: "2h ago"
  },
  {
    id: "post-video-culinary",
    author: "Fatima Bello",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    role: "Catering Specialist",
    content: "🔥 Watch how we sizzle up our signature peppered chicken wings! Fresh spices, high heat, and that perfect smoky glaze. Book us for your office catering! 🌶️🍗",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600",
    videoFilter: "none",
    audioTrack: "Sizzle & Chill Lounge - Fatima Beats",
    playbackSpeed: "1x",
    textOverlay: "Smoky Glazed Peppered Wings 🔥🌶️",
    likes: 142,
    comments: [
      { author: "Tunde Rex", content: "Oh my goodness, I can smell this through my screen! Delicious! 😋", time: "3h ago" },
      { author: "Amadi Silva", content: "Please deliver 5 packs to my workspace tomorrow!", time: "2h ago" }
    ],
    time: "3h ago"
  },
  {
    id: "post-video-spinning",
    author: "Eleni Wolde",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    role: "Textile Artisan",
    content: "🧶 Spinning pure local cotton into thread. This slow, traditional art forms the foundation of our handwoven fabrics. Slow fashion, sustainable earnings. 🌍✨",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=600",
    videoFilter: "none",
    audioTrack: "Meditation & Loom Sounds - Ambient Yarn",
    playbackSpeed: "1x",
    textOverlay: "Handmade Loom Threading 🧶",
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
    videoFilter: "saturate(120%) contrast(105%)",
    audioTrack: "acoustic",
    playbackSpeed: "1x",
    textOverlay: "Lagos Morning Vibes ☕✨",
    likes: 189,
    comments: [
      { author: "Aisha Yusuf", content: "Beautiful morning! Love the energy.", time: "1h ago" }
    ],
    time: "8h ago"
  },
  {
    id: "birthday-fatima",
    author: "Fatima Bello",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    role: "ESTARR Birthday Star 🍰",
    content: "🎈 HEY ESTARR FAMILY! It's my birthday today! 🎂 Grateful for the amazing growth, skills, and peers I've connected with here. Feel free to leave a reaction or comment below! Let's celebrate! 🎉🍔",
    likes: 48,
    comments: [
      { author: "Chinedu Okafor", content: "Happy Birthday Fatima! Sending you positive vibes and cake! 🍰🎉", time: "1h ago" },
      { author: "Kofi Mensah", content: "Have a magnificent day Fatima! Keep cooking up success! 🍳🎂", time: "45m ago" }
    ],
    time: "2h ago"
  },
  {
    id: "post-1",
    author: "Fatima Bello",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    role: "Catering Specialist",
    content: "Just graduated from the 'Zero to Cook' signature program on the Academy! 🍳 Today I secured my first small catering gig for an office launch in Ikeja. Moving from learning to earning is real!",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
    likes: 124,
    comments: [
      { author: "Chinedu Okafor", content: "Huge congratulations Fatima! Proud of you!", time: "2h ago" },
      { author: "Amadi Silva", content: "Awesome work! Let us collaborate on the next event.", time: "1h ago" }
    ],
    time: "4h ago"
  },
  {
    id: "post-2",
    author: "Kofi Mensah",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    role: "Agric Consultant",
    content: "If you're starting a poultry farm this rainy season, watch out for high moisture levels in the bedding. Keeps the birds susceptible to diseases. Check out the 'Poultry Farming' module on the Academy for the full guide!",
    likes: 89,
    comments: [
      { author: "Tunde Rex", content: "Solid tip Kofi, just checked the lesson. Very clear.", time: "3h ago" }
    ],
    time: "6h ago"
  }
];

export const initialCourses: Course[] = [
  {
    id: "course-1",
    title: "Zero to YouTuber",
    category: "Digital",
    description: "Start your content creation journey from scratch. Learn how to record, edit, write scripts, and grow an audience in Africa.",
    rating: 4.8,
    students: 1540,
    image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=300",
    lessons: [
      { id: "c1-l1", title: "Introduction: The YouTube Opportunity in Africa", duration: "10 mins", completed: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: "c1-l2", title: "Niche Selection & Target Audience", duration: "15 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: "c1-l3", title: "Recording with your Smartphone", duration: "25 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
      { id: "c1-l4", title: "CapCut: Editing Basics", duration: "30 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
      { id: "c1-l5", title: "Monetization and Sponsorships", duration: "20 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" }
    ],
    missions: [
      { id: "c1-m1", title: "Write a 30-Second Channel Intro Script", reward: "50 ESTARR Points", task: "Submit your written script detailing who your channel is for and why they should subscribe.", completed: true },
      { id: "c1-m2", title: "Upload a Test smartphone video clip", reward: "100 ESTARR Points", task: "Record a 1-minute test clip highlighting good lighting, and submit it.", completed: false }
    ],
    quizzes: [
      {
        question: "Which of the following is crucial for mobile recording?",
        options: ["Expensive DSLRs", "Good lighting and clean audio", "Professional studio crew", "Paid scripts"],
        answer: 1
      },
      {
        question: "What is the primary factor in YouTube click-through-rate (CTR)?",
        options: ["Video description", "Video resolution", "Thumbnail and title", "Video duration"],
        answer: 2
      }
    ],
    zeroToIncome: true,
    price: 0,
    instructorName: "Chinedu Okafor",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "course-2",
    title: "Selling on WhatsApp & Instagram",
    category: "Business",
    description: "Master WhatsApp Business, catalog setup, payment links, and closing sales right inside chat channels.",
    rating: 4.9,
    students: 2350,
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=300",
    lessons: [
      { id: "c2-l1", title: "Why Social Commerce is King", duration: "8 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
      { id: "c2-l2", title: "Optimizing your WhatsApp Business Profile", duration: "12 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
      { id: "c2-l3", title: "Creating an Engaging Instagram Storefront", duration: "18 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
      { id: "c2-l4", title: "The Art of the Closing Pitch", duration: "15 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackAds.mp4" }
    ],
    missions: [
      { id: "c2-m1", title: "Set up your WhatsApp Catalog", reward: "75 ESTARR Points", task: "Take screenshot of your WhatsApp Business catalog containing at least 3 items with prices.", completed: false }
    ],
    quizzes: [
      {
        question: "What is the primary benefit of WhatsApp Business over standard WhatsApp?",
        options: ["Ad-free experience", "Automated greetings and product catalogs", "Higher video call limit", "Group calls with 100 people"],
        answer: 1
      }
    ],
    zeroToIncome: true,
    price: 1500,
    instructorName: "Amadi Silva",
    instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "course-3",
    title: "Poultry Farming Masterclass",
    category: "Agriculture",
    description: "Practical guide to raising broilers and layers. Covers feeding, medication, housing, and marketing your flock.",
    rating: 4.7,
    students: 980,
    image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&q=80&w=300",
    lessons: [
      { id: "c3-l1", title: "Choosing Broilers vs Layers", duration: "12 mins", completed: false },
      { id: "c3-l2", title: "Coop Construction & Temperature Control", duration: "20 mins", completed: false },
      { id: "c3-l3", title: "Feeding Schedules and Growth Boosters", duration: "18 mins", completed: false },
      { id: "c3-l4", title: "Vaccination and Disease Prevention", duration: "25 mins", completed: false }
    ],
    missions: [
      { id: "c3-m1", title: "Brooder Design Layout Plan", reward: "80 ESTARR Points", task: "Draw a simple layout indicating heat source, feeder, and water locations in a brooder coop.", completed: false }
    ],
    quizzes: [
      {
        question: "At what age do standard commercial broilers reach marketing weight?",
        options: ["2-3 weeks", "6-8 weeks", "12-14 weeks", "6 months"],
        answer: 1
      }
    ],
    zeroToIncome: false,
    price: 2500,
    instructorName: "Kofi Mensah",
    instructorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "course-4",
    title: "Modern Tailoring & Fashion Design",
    category: "Trades",
    description: "Learn precise measurement, patterns, cutting, and stitching of traditional and contemporary African styles.",
    rating: 4.9,
    students: 1120,
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=300",
    lessons: [
      { id: "c4-l1", title: "Introduction to Sewing Machines and Maintenance", duration: "15 mins", completed: false },
      { id: "c4-l2", title: "Taking Perfect Body Measurements", duration: "20 mins", completed: false },
      { id: "c4-l3", title: "Pattern Drafting Basics", duration: "25 mins", completed: false },
      { id: "c4-l4", title: "Neckline Finishes and Zippers", duration: "18 mins", completed: false }
    ],
    missions: [
      { id: "c4-m1", title: "Take Body Measurements Record", reward: "100 ESTARR Points", task: "Submit a record table of 5 critical body measurements taken from a volunteer client.", completed: false }
    ],
    quizzes: [
      {
        question: "Which pattern line runs vertical on standard garments?",
        options: ["Grainline", "Bias line", "Hemline", "Dart line"],
        answer: 0
      }
    ],
    zeroToIncome: true,
    price: 3500,
    instructorName: "Aisha Yusuf",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "course-5",
    title: "Virtual Assistant Mastery",
    category: "Digital",
    description: "Learn how to manage schedules, handle emails, provide customer support, and run administrative tasks remotely for global clients.",
    rating: 4.8,
    students: 3100,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=300",
    lessons: [
      { id: "c5-l1", title: "Introduction to Virtual Assistance", duration: "10 mins", completed: false },
      { id: "c5-l2", title: "Email & Calendar Management", duration: "25 mins", completed: false },
      { id: "c5-l3", title: "Tools of the Trade (Notion, Slack, Zoom)", duration: "30 mins", completed: false },
      { id: "c5-l4", title: "Landing Your First International Client", duration: "20 mins", completed: false }
    ],
    missions: [
      { id: "c5-m1", title: "Draft a Cold Pitch Template", reward: "150 ESTARR Points", task: "Write a short cold email pitching your VA services to a hypothetical e-commerce founder.", completed: false }
    ],
    quizzes: [
      {
        question: "Which tool is standard for asynchronous team communication?",
        options: ["Zoom", "Slack", "Microsoft Word", "Photoshop"],
        answer: 1
      }
    ],
    zeroToIncome: true,
    price: 2000,
    instructorName: "Sarah Johnson",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "course-6",
    title: "Vibe Coding: The Future of Software",
    category: "Digital",
    description: "Learn to build applications entirely through natural language interaction with AI. Master prompting, context window management, and logic structuring.",
    rating: 5.0,
    students: 12000,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600",
    lessons: [
      { id: "c6-l1", title: "What is Vibe Coding?", duration: "15 mins", completed: false },
      { id: "c6-l2", title: "Prompt Engineering vs Vibe Coding", duration: "20 mins", completed: false },
      { id: "c6-l3", title: "Setting up your AI Agent Environment", duration: "30 mins", completed: false },
      { id: "c6-l4", title: "Debugging AI Generated Code", duration: "25 mins", completed: false }
    ],
    missions: [
      { id: "c6-m1", title: "Vibe Code a Todo App", reward: "250 ESTARR Points", task: "Use an AI coding assistant to generate a functional Todo list without writing the code manually. Submit the GitHub repo link.", completed: false }
    ],
    quizzes: [
      {
        question: "In Vibe Coding, what is the most important skill?",
        options: ["Memorizing syntax", "Clear articulation of intent (Prompting)", "Typing speed", "Manual CSS styling"],
        answer: 1
      }
    ],
    zeroToIncome: true,
    price: 4500,
    instructorName: "Alex Mercer",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "course-7",
    title: "Zero to Client: Marketing Your New Skills",
    category: "Business",
    description: "A survival guide for the recently skilled. Learn how to package your Academy projects into a micro-portfolio, write irresistible cold pitches, and land your first 3 paying clients without any prior job experience.",
    rating: 4.9,
    students: 5400,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=300",
    lessons: [
      { id: "c7-l1", title: "The 'Proof of Work' Mindset", duration: "12 mins", completed: false },
      { id: "c7-l2", title: "Building a 1-Page Micro Portfolio", duration: "25 mins", completed: false },
      { id: "c7-l3", title: "Pricing Your First Gig (Without Undervaluing Yourself)", duration: "18 mins", completed: false },
      { id: "c7-l4", title: "Where to Find Clients (Local & Global)", duration: "30 mins", completed: false }
    ],
    missions: [
      { id: "c7-m1", title: "Publish Your Media Kit", reward: "200 ESTARR Points", task: "Generate your Activity Report from the Analytics tab and share it on your ESTARR profile feed.", completed: false }
    ],
    quizzes: [
      {
        question: "When approaching your very first client with no experience, what is your strongest asset?",
        options: ["A 5-page text resume", "Proof of Work (a completed sample project)", "Offering to work for 10 years", "A generic cover letter"],
        answer: 1
      }
    ],
    zeroToIncome: true,
    price: 1500,
    instructorName: "Mercy Adebayo",
    instructorAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1bfa82?auto=format&fit=crop&q=80&w=150"
  }
];

export const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: "Standard Cement (50kg Bag) - Grade 42.5R",
    category: "Building Materials",
    price: 8500,
    seller: "Aliko Materials Ltd",
    sellerRating: 4.9,
    verified: true,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=300",
    description: "High-strength premium cement suitable for all block making, plastering, and structural concrete requirements. Fast setting with guaranteed durability.",
    reviews: [
      { author: "Innocent Block Industry", rating: 5, comment: "Exceptional setting strength. Highly recommended for block molders!" },
      { author: "Kelechi Builders", rating: 4.8, comment: "On-time delivery and top quality bags." }
    ]
  },
  {
    id: "prod-2",
    name: "Industrial Manual Sewing Machine - Heavy Duty",
    category: "Equipment",
    price: 135000,
    seller: "Gbagada Stitch Emporium",
    sellerRating: 4.7,
    verified: true,
    image: "https://images.unsplash.com/photo-1605280263929-1c42c62ef169?auto=format&fit=crop&q=80&w=300",
    description: "Durable manual and electric hybrid sewing machine ideal for heavy-duty tailoring, leather stitching, and embroidery. Comes with full stand and table.",
    reviews: [
      { author: "Amina Fashion", rating: 5, comment: "Runs smoothly on all types of Ankara and Lace fabrics. Very sturdy!" }
    ]
  },
  {
    id: "prod-3",
    name: "Premium Broiler Chick Feed - Starter Crumble",
    category: "Agriculture",
    price: 24000,
    seller: "Amo Feed Mills",
    sellerRating: 4.8,
    verified: false,
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=300",
    description: "High protein starter feed optimized for day-old broilers up to 4 weeks. Promotes accelerated muscle development and exceptional immunity.",
    reviews: []
  }
];

export const initialCampaigns: BrandCampaign[] = [
  {
    id: "camp-1",
    title: "Meme Marketing & TikTok Shorts Series",
    brand: "PiggyVest (Fintech)",
    budget: 150000,
    status: "Open",
    platform: "TikTok",
    deliverables: [
      "1x TikTok Video (60s) explaining savings challenges in a funny way",
      "Cross-post to Instagram Reels with brand tag",
      "Link in bio with referral code for 7 days"
    ],
    applicationsCount: 14,
    createdDate: "2026-07-02"
  },
  {
    id: "camp-2",
    title: "UGC Product Review & Creative Aesthetic Unboxing",
    brand: "Coca-Cola (Beverages)",
    budget: 250000,
    status: "Open",
    platform: "UGC",
    deliverables: [
      "2x Raw UGC videos showcasing refreshing outdoor experiences",
      "3x High-res lifestyle product photographs"
    ],
    applicationsCount: 9,
    createdDate: "2026-07-04"
  },
  {
    id: "camp-3",
    title: "No-Code Platform Mini-Vlog Integration",
    brand: "Paystack (Payments)",
    budget: 450000,
    status: "Reviewing",
    platform: "YouTube",
    deliverables: [
      "1x Integrated sponsor segment (90s) in a tech/freelancing tutorial",
      "Description box promo link with custom tracking tag"
    ],
    applicationsCount: 5,
    createdDate: "2026-07-03"
  },
  {
    id: "camp-4",
    title: "Viral Meme Sweep & Engagement Campaign",
    brand: "Duolingo (EdTech)",
    budget: 80000,
    status: "Open",
    platform: "Twitter",
    deliverables: [
      "3x Witty custom memes mentioning Duo the Owl learning streak pressure",
      "Retweet and comment engagement on main brand thread"
    ],
    applicationsCount: 22,
    createdDate: "2026-07-05"
  }
];

export const initialJobs: Job[] = [
  {
    id: "job-1",
    title: "Social Media Video Editor",
    company: "Zikoko Media Group",
    type: "Freelance",
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
    title: "Freelance Fashion Designer / Stitcher",
    company: "Kala Bespoke Fashion",
    type: "Freelance",
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
