import re

with open('src/mockData.ts', 'r') as f:
    content = f.read()

new_courses = """export const initialCourses: Course[] = [
  {
    id: "course-1",
    title: "Google AI Masterclass: Gemini API & Agents",
    category: "AI & ML",
    description: "The official Google playbook for building scalable AI Agents and integrating the Gemini API. Pass this AI-graded certification to unlock $15k+ enterprise AI application contracts.",
    rating: 4.9,
    students: 3140,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300",
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
    description: "Master Solidity security vulnerabilities. Certified auditors get direct access to premium Layer-2 protocol bounties and token presale escrow audits.",
    rating: 4.8,
    students: 1842,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=300",
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
    title: "AWS CloudNative Architect Certification",
    category: "Cloud DevOps",
    description: "The definitive practical exam for deploying Kubernetes clusters and managing CI/CD pipelines at scale. Mandatory certification for executing AWS DevOps retainers on ESTARR.",
    rating: 5.0,
    students: 4100,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300",
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
    price: 150,
    instructorName: "AWS Training Partners",
    instructorAvatar: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&q=80&w=150"
  }
];"""

content = re.sub(r'export const initialCourses: Course\[\] = \[.*?\];', new_courses, content, flags=re.DOTALL)

with open('src/mockData.ts', 'w') as f:
    f.write(content)
