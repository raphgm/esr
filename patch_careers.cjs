const fs = require('fs');
let code = fs.readFileSync('src/components/CareersSection.tsx', 'utf-8');

code = code.replace(/className="bg-white border border-slate-200 p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:-translate-y-1 hover:shadow-sm hover:shadow-md transition-shadow transition-all cursor-pointer"/g, 'className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:-translate-y-1 hover:shadow-sm hover:shadow-md transition-shadow transition-all cursor-pointer"');

fs.writeFileSync('src/components/CareersSection.tsx', code);
console.log('SUCCESS');
