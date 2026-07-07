const fs = require('fs');
let code = fs.readFileSync('src/components/AcademySection.tsx', 'utf-8');

code = code.replace(
  '            subtitle="Learn Practical Skills & Earn Income"',
  '            subtitle="Learn Practical Skills & Earn Income"'
);

code = code.replace(
  '            description="Move seamlessly from knowledge acquisition to practical monetization. Complete courses, fulfill hands-on projects, score high on quizzes, and unlock certified digital or physical trade skills."',
  '            description="Move seamlessly from knowledge acquisition to practical monetization. Learn Formal Skills powered by skill-sch.com or explore Non-Formal Creator Skills from the EstrR community."'
);

fs.writeFileSync('src/components/AcademySection.tsx', code);
console.log('Academy section updated');
