const fs = require('fs');
let code = fs.readFileSync('src/components/AcademySection.tsx', 'utf-8');

const additionalMappings = `,
  "Virtual Assistant Mastery": {
    title: "Remote Executive Assistant / Calendar Management",
    budget: "₦250,000 - ₦500,000",
    description: "Manage schedules, draft correspondence, and handle customer support tickets for global startups.",
    type: "Remote Work"
  },
  "Vibe Coding: The Future of Software": {
    title: "AI-Assisted Web App Prototyping",
    budget: "₦400,000 - ₦850,000",
    description: "Build functional prototypes and MVPs for local businesses using natural language AI tools.",
    type: "Tech / AI"
  }
};`;

code = code.replace(
  /  "Modern Tailoring & Fashion Design": \{\n    title: "Bespoke Apparel Pattern Drafting",\n    budget: "₦150,000 - ₦350,000",\n    description: "Draft traditional and contemporary African patterns and coordinate corporate tailoring deals.",\n    type: "Trades"\n  \}\n\};/g,
  `  "Modern Tailoring & Fashion Design": {\n    title: "Bespoke Apparel Pattern Drafting",\n    budget: "₦150,000 - ₦350,000",\n    description: "Draft traditional and contemporary African patterns and coordinate corporate tailoring deals.",\n    type: "Trades"\n  }${additionalMappings}`
);

fs.writeFileSync('src/components/AcademySection.tsx', code);
console.log('Mapping updated');
