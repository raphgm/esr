const fs = require('fs');

let code = fs.readFileSync('src/mockData.ts', 'utf-8');

const additionalCourses = `,
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
      { id: "c5-m1", title: "Draft a Cold Pitch Template", reward: "150 EstrR Points", task: "Write a short cold email pitching your VA services to a hypothetical e-commerce founder.", completed: false }
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
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=300",
    lessons: [
      { id: "c6-l1", title: "What is Vibe Coding?", duration: "15 mins", completed: false },
      { id: "c6-l2", title: "Prompt Engineering vs Vibe Coding", duration: "20 mins", completed: false },
      { id: "c6-l3", title: "Setting up your AI Agent Environment", duration: "30 mins", completed: false },
      { id: "c6-l4", title: "Debugging AI Generated Code", duration: "25 mins", completed: false }
    ],
    missions: [
      { id: "c6-m1", title: "Vibe Code a Todo App", reward: "250 EstrR Points", task: "Use an AI coding assistant to generate a functional Todo list without writing the code manually. Submit the GitHub repo link.", completed: false }
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
  }
];`;

code = code.replace(
  /instructorAvatar: "https:\/\/images\.unsplash\.com\/photo-1494790108377-be9c29b29330\?auto=format&fit=crop&q=80&w=150"\n  }\n\];/g,
  `instructorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"\n  }${additionalCourses}`
);

fs.writeFileSync('src/mockData.ts', code);
console.log('Courses added');
