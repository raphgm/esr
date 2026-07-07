const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  '<circle\n                                        cx={center}\n                                        cy={center}\n                                        r={radius}\n                                        className="stroke-slate-100 fill-none"',
  '<circle\n                                        cx={center}\n                                        cy={center}\n                                        r={radius}\n                                        className="stroke-slate-800 fill-none"'
);

code = code.replace(
  '<span className="absolute text-[8px] font-mono font-bold text-slate-900 tracking-tighter">',
  '<span className="absolute text-[8px] font-mono font-bold text-white tracking-tighter">'
);

code = code.replace(
  'hover:bg-slate-100 text-slate-9000 hover:text-slate-900 transition-colors border border-transparent hover:border-slate-200',
  'hover:bg-white/10 text-white/50 hover:text-white transition-colors border border-transparent hover:border-slate-700'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Pipeline SVG patched.');
