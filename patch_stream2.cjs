const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  /hover:bg-white\/5 transition-all duration-300 hover:scale-\[1.02\] hover:shadow-\[0_0_15px_rgba\(168,85,247,0.08\)\] flex justify-between items-center gap-3/g,
  'hover:bg-purple-50/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(168,85,247,0.08)] flex justify-between items-center gap-3'
);

code = code.replace(
  /text-sm font-bold italic tracking-tight text-white group-hover:text-purple-400 transition-colors truncate/g,
  'text-sm font-bold italic tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors truncate'
);

code = code.replace(
  /text-\[10px\] text-slate-400 truncate mt-0.5/g,
  'text-[10px] text-slate-500 truncate mt-0.5'
);

code = code.replace(
  /<span className="font-semibold text-white">{budget}<\/span>/g,
  '<span className="font-semibold text-slate-900">{budget}</span>'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Stream section updated again');
