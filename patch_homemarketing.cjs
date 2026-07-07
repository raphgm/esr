const fs = require('fs');
let code = fs.readFileSync('src/components/HomeMarketing.tsx', 'utf-8');

code = code.replace(/className="relative bg-slate-950 text-white border border-slate-200 shadow-lg p-8 md:p-14 overflow-hidden group"/, 'className="relative bg-slate-950 text-white border border-slate-200 shadow-lg rounded-2xl p-8 md:p-14 overflow-hidden group"');

code = code.replace(/className="bg-white\/5 border border-white\/10 p-6 hover:bg-white\/10 transition-colors backdrop-blur-sm"/g, 'className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors backdrop-blur-sm"');

code = code.replace(/className="lg:col-span-7 bg-slate-50 border border-slate-200 shadow-lg p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"/, 'className="lg:col-span-7 bg-slate-50 border border-slate-200 shadow-lg rounded-2xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"');

code = code.replace(/className="lg:col-span-5 bg-gradient-to-br from-purple-500 to-violet-600 text-white border border-purple-500\/50 shadow-lg p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group"/, 'className="lg:col-span-5 bg-gradient-to-br from-purple-500 to-violet-600 text-white border border-purple-500/50 shadow-lg rounded-2xl p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group"');

code = code.replace(/className="px-3 py-1 bg-purple-600 text-white text-\[10px\] font-bold tracking-wide mb-6 inline-block uppercase"/, 'className="px-3 py-1 bg-purple-600 rounded-full text-white text-[10px] font-bold tracking-wide mb-6 inline-block uppercase"');

fs.writeFileSync('src/components/HomeMarketing.tsx', code);
console.log('SUCCESS');
