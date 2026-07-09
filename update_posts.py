import re

with open('src/components/AcademySection.tsx', 'r') as f:
    content = f.read()

new_posts = """const [socialPosts, setSocialPosts] = useState<SocialPost[]>([
    {
      id: "sp-1",
      authorName: "Sarah Chen",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      authorRole: "AI Engineer",
      courseTitle: "Google AI Masterclass: Gemini API & Agents",
      content: "Just deployed my first autonomous math agent using the Antigravity framework! Managed to integrate it with the Gemini tool-calling API to handle complex differential equations. The system prompt optimization made a huge difference.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300",
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
      courseTitle: "AWS CloudNative Architect Certification",
      content: "Successfully provisioned a highly available EKS cluster using Terraform. Configured the HorizontalPodAutoscaler to handle traffic spikes. Next step: setting up ArgoCD for GitOps deployments!",
      likes: 34,
      hasLiked: false,
      comments: [],
      time: "6h ago",
      verifiedWork: false
    }
  ]);"""

content = re.sub(r'const \[socialPosts, setSocialPosts\] = useState<SocialPost\[\]>\(\[.*?\]\);', new_posts, content, flags=re.DOTALL)

with open('src/components/AcademySection.tsx', 'w') as f:
    f.write(content)
