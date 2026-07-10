const fs = require('fs');

let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

const targetStr = `className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col justify-between group h-full min-h-[220px]"`;
const newStr = `className="relative bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group h-full min-h-[220px] overflow-hidden"`;

code = code.replace(targetStr, newStr);

fs.writeFileSync('src/components/AILabSection.tsx', code);
console.log("updated");
