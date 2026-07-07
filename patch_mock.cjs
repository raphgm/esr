const fs = require('fs');
let code = fs.readFileSync('src/mockData.ts', 'utf-8');

code = code.replace(
  '  skills: ["Canva", "Video Editing", "WhatsApp Selling", "Local Sourcing", "Poultry Farming"],',
  '  formalSkills: ["Cloud Engineering", "FinOps", "AWS Certified"],\n  creatorSkills: ["Canva", "Video Editing", "WhatsApp Selling", "Local Sourcing", "Poultry Farming"],\n  skills: ["Canva", "Video Editing", "WhatsApp Selling", "Local Sourcing", "Poultry Farming"],'
);

fs.writeFileSync('src/mockData.ts', code);
console.log('mock updated');
