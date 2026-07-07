const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/className="px-3 py-1 bg-purple-500 text-slate-900 border-2 border-slate-900 text-\[10px\] font-bold tracking-wide mb-8 inline-block uppercase shadow-sm hover:shadow-md transition-all"/g, 'className="px-3 py-1 bg-purple-500 text-slate-900 border border-slate-900 rounded-full text-[10px] font-bold tracking-wide mb-8 inline-block uppercase shadow-sm hover:shadow-md transition-all"');

fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
