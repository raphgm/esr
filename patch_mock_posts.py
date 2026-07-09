import re

with open('src/mockData.ts', 'r') as f:
    content = f.read()

posts_replacement = """export const initialPosts: ActivityPost[] = [
  {
    id: "post-video-0",
    author: "Aisha Yusuf",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    role: "AI Researcher",
    content: "🎥 SHOWCASE: Check out my new LLM tuning tutorial! I recorded this video directly on the ESTARR app. Let me know what you think of this optimization technique! ✨🤖",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
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
    role: "Software Architect",
    content: "Just graduated from the 'Enterprise System Design' signature program on the Academy! 💻 Today I secured my first scalable architecture gig for an office launch in Ikeja. Moving from learning to earning is real!",
    likes: 120,
    comments: [
      { author: "Platform Admin", content: "Congratulations Fatima! We love seeing our talent thrive. Next stop: Global Enterprise contracts!", time: "4h ago" }
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
];"""

content = re.sub(r'export const initialPosts: ActivityPost\[\] = \[.*?\];', posts_replacement, content, flags=re.DOTALL)

with open('src/mockData.ts', 'w') as f:
    f.write(content)
