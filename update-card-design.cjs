const fs = require('fs');
let code = fs.readFileSync('src/components/PlatformTools.tsx', 'utf8');

// I will make the cards even "cutier" by adjusting the box shadows and giving them a soft scale hover without any translate-y, keeping it grounded but squishy.
code = code.replace(
  /hover:-translate-y-1\.5/g,
  'hover:-translate-y-1'
);

code = code.replace(
  /className="group p-5 md:p-6 bg-white border border-slate-200 rounded-3xl transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 hover:-translate-y-1 flex flex-col min-h-\[220px\] cursor-pointer"/g,
  'className="group p-5 md:p-6 bg-white border-2 border-slate-100 rounded-3xl transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md hover:border-purple-200 hover:-translate-y-1 flex flex-col min-h-[200px] cursor-pointer"'
);

// We'll also soften the icon containers
code = code.replace(
  /className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm relative overflow-hidden"/g,
  'className="w-12 h-12 rounded-[1rem] bg-white border-2 border-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm relative overflow-hidden group-hover:border-transparent"'
);

fs.writeFileSync('src/components/PlatformTools.tsx', code);
