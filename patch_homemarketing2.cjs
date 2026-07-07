const fs = require('fs');
let code = fs.readFileSync('src/components/HomeMarketing.tsx', 'utf-8');

code = code.replace(/<div className="w-10 h-10 bg-slate-950 text-white flex items-center justify-center mb-4 border border-slate-200 shadow-sm">/, '<div className="w-10 h-10 bg-slate-950 rounded-xl text-white flex items-center justify-center mb-4 border border-slate-200 shadow-sm">');

code = code.replace(/<div className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 border border-slate-200\/50 bg-white">/, '<div className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-xl border border-slate-200/50 bg-white">');

code = code.replace(/className="lg:col-span-5 bg-purple-500 border border-slate-200 shadow-lg p-8 md:p-10 flex flex-col"/, 'className="lg:col-span-5 rounded-2xl bg-purple-500 border border-slate-200 shadow-lg p-8 md:p-10 flex flex-col"');

fs.writeFileSync('src/components/HomeMarketing.tsx', code);
console.log('SUCCESS');
