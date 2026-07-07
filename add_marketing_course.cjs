const fs = require('fs');

let code = fs.readFileSync('src/mockData.ts', 'utf-8');

const marketingCourse = `,
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
      { id: "c7-m1", title: "Publish Your Media Kit", reward: "200 EstrR Points", task: "Generate your Activity Report from the Analytics tab and share it on your EstrR profile feed.", completed: false }
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
];`;

code = code.replace(
  /instructorAvatar: "https:\/\/images\.unsplash\.com\/photo-1507003211169-0a1dd7228f2d\?auto=format&fit=crop&q=80&w=150"\n  }\n\];/g,
  `instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"\n  }${marketingCourse}`
);

fs.writeFileSync('src/mockData.ts', code);
console.log('Marketing Course Added');
