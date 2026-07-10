const fs = require('fs');

let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

const targetStr1 = `className="relative bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group h-full min-h-[220px] overflow-hidden"`;
const newStr1 = `className="relative bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/50 border border-slate-200/60 rounded-3xl p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group h-full min-h-[220px] overflow-hidden"`;

const targetStr2 = `className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between h-full min-h-[220px]"`;
const newStr2 = `className="relative bg-gradient-to-br from-slate-50 to-slate-100/80 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between h-full min-h-[220px] overflow-hidden opacity-80"`;

code = code.replace(targetStr1, newStr1);
code = code.replace(targetStr2, newStr2);

fs.writeFileSync('src/components/AILabSection.tsx', code);
console.log("updated");
