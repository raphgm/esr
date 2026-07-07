const fs = require('fs');
let code = fs.readFileSync('src/components/ProjectsSection.tsx', 'utf-8');

code = code.replace(/setShowNewTaskForm\(true\)/g, 'setActiveTab("deal-builder")');

fs.writeFileSync('src/components/ProjectsSection.tsx', code);
console.log('SUCCESS');
