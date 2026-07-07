const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const targetNav = `{ id: "projects", label: "EstrR Escrow Hub", desc: "Paid milestones & escrow", icon: CheckSquare },`;
const replacementNav = `{ id: "projects", label: "EstrR Escrow Hub", desc: "Paid milestones & escrow", icon: CheckSquare },
                { id: "careers", label: "EstrR Jobs Board", desc: "Full-time & freelance opportunities", icon: Briefcase },`;

code = code.replace(targetNav, replacementNav);
fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
