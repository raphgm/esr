import re

with open('src/mockData.ts', 'r') as f:
    content = f.read()

new_courses = """export const initialCourses: Course[] = [
  {
    id: "course-1",
    title: "Coca-Cola Creator Certification",
    category: "FMCG Brand",
    description: "Official Coca-Cola playbook for aesthetic UGC and brand safety. Pass this AI-graded certification to unlock $10k+ Coke Studio & Zero Sugar campaigns in the Escrow Pipeline.",
    rating: 4.9,
    students: 1240,
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&q=80&w=300",
    lessons: [
      { id: "c1-l1", title: "Brand Safety & Coca-Cola Tone of Voice", duration: "10 mins", completed: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: "c1-l2", title: "Aesthetic Product Placement", duration: "15 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: "c1-l3", title: "Lighting & Color Grading (Red & Black)", duration: "25 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
    ],
    missions: [
      { id: "c1-m1", title: "Submit a 15s UGC Pitch", reward: "Coca-Cola UGC Badge", task: "Submit a short script incorporating Coke Zero in a morning routine without sounding like an ad.", completed: true },
    ],
    quizzes: [
      {
        question: "Which of these violates Coca-Cola's brand safety guidelines?",
        options: ["Showing the logo partially obscured", "Featuring alcohol in the same frame", "Using natural sunlight", "Not speaking in the video"],
        answer: 1
      }
    ],
    zeroToIncome: true,
    price: 0,
    instructorName: "Coca-Cola Brands",
    instructorAvatar: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "course-2",
    title: "PiggyVest Financial Content License",
    category: "Fintech",
    description: "Learn how to explain complex financial products simply. Certified creators get direct access to PiggyVest's high-ticket meme ad and tutorial campaigns.",
    rating: 4.8,
    students: 342,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=300",
    lessons: [
      { id: "c2-l1", title: "Understanding Automated Savings", duration: "12 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
      { id: "c2-l2", title: "Compliance: What NOT to say about APY", duration: "20 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
    ],
    missions: [
      { id: "c2-m1", title: "Draft a Hook", reward: "PiggyVest Creator Badge", task: "Write a 3-second hook for a TikTok meme about saving money.", completed: false }
    ],
    quizzes: [
      {
        question: "Why must you add a disclaimer when mentioning APY?",
        options: ["It looks professional", "Financial regulatory compliance", "PiggyVest preference", "To fill video time"],
        answer: 1
      }
    ],
    zeroToIncome: false,
    price: 0,
    instructorName: "PiggyVest Growth",
    instructorAvatar: "https://images.unsplash.com/photo-1616056586036-7c9135a94042?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "course-3",
    title: "Meta Certified Digital Marketer",
    category: "Tech & SaaS",
    description: "The official Meta playbook for ad buying and ROAS optimization. Mandatory certification for executing any Meta-sponsored agency retainers on ESTARR.",
    rating: 5.0,
    students: 2100,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=300",
    lessons: [
      { id: "c3-l1", title: "Advanced Pixel Tracking", duration: "35 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoy.mp4" },
      { id: "c3-l2", title: "Lookalike Audiences in 2026", duration: "40 mins", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" }
    ],
    missions: [],
    quizzes: [
      {
        question: "What is the primary use of the Meta Conversions API?",
        options: ["Making ads look better", "Bypassing browser pixel blockers for accurate tracking", "Writing ad copy", "Managing comments"],
        answer: 1
      }
    ],
    zeroToIncome: false,
    price: 150,
    instructorName: "Meta for Business",
    instructorAvatar: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?auto=format&fit=crop&q=80&w=150"
  }
];"""

# Replace everything from `export const initialCourses` to the end of the array.
content = re.sub(r'export const initialCourses: Course\[\] = \[.*?\];(.*?export const)', lambda m: new_courses + "\n" + m.group(1), content, flags=re.DOTALL)

with open('src/mockData.ts', 'w') as f:
    f.write(content)
