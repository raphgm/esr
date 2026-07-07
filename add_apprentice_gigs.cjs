const fs = require('fs');

let code = fs.readFileSync('src/mockData.ts', 'utf-8');

const additionalJobs = `,
  {
    id: "job-4",
    title: "Junior Virtual Assistant (Apprentice)",
    company: "Lagos Tech Hub",
    type: "Apprenticeship",
    location: "Remote",
    salary: "₦100k - ₦150k/mo",
    description: "Perfect for recently trained VAs. Help our community manager organize Google Calendars, reply to standard customer emails, and schedule tweets. Mentorship provided.",
    skillsRequired: ["Google Workspace", "Email Management", "Canva"]
  },
  {
    id: "job-5",
    title: "Trainee Video Editor for TikTok Shorts",
    company: "ChopLife Restaurants",
    type: "Apprenticeship",
    location: "Remote",
    salary: "₦80k/mo + Meals",
    description: "Looking for a beginner video editor who has completed the 'Zero to YouTuber' academy course. You will edit 3 short CapCut videos a week for our restaurant's TikTok.",
    skillsRequired: ["CapCut", "Smartphone Videography", "Trending Audio"]
  }
`;

code = code.replace(
  /  \}\n\];\n\nexport const initialProducts:/g,
  `  }${additionalJobs}\n];\n\nexport const initialProducts:`
);

fs.writeFileSync('src/mockData.ts', code);
console.log('Apprentice Jobs Added');
