const fs = require('fs');
let code = fs.readFileSync('src/components/PlatformTools.tsx', 'utf8');

code = code.replace(
  /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">/,
  '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">'
);

code = code.replace(
  /className="group p-8 bg-white border border-slate-200 rounded-\[2rem\] transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 flex flex-col min-h-\[300px\] cursor-pointer"/,
  'className="group p-5 md:p-6 bg-white border border-slate-200 rounded-3xl transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 hover:-translate-y-1.5 flex flex-col min-h-[220px] cursor-pointer"'
);
// note: using replace global
code = code.replace(
  /className="group p-8 bg-white border border-slate-200 rounded-\[2rem\] transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 flex flex-col min-h-\[300px\] cursor-pointer"/g,
  'className="group p-5 md:p-6 bg-white border border-slate-200 rounded-3xl transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 hover:-translate-y-1.5 flex flex-col min-h-[220px] cursor-pointer"'
);

// update icon size
code = code.replace(
  /className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm relative overflow-hidden"/g,
  'className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm relative overflow-hidden"'
);

code = code.replace(
  /className=\{`w-6 h-6 text-slate-400 group-hover:scale-110 transition-all duration-500 \$\{tool\.color\.replace\('text-', 'group-hover:text-'\)\} relative z-10`\}/g,
  'className={`w-5 h-5 text-slate-400 group-hover:scale-110 transition-all duration-300 ${tool.color.replace(\'text-\', \'group-hover:text-\')} relative z-10`}'
);

// update badge
code = code.replace(
  /text-\[9px\] font-mono font-bold uppercase px-3 py-1/g,
  'text-[8px] font-mono font-bold uppercase px-2.5 py-0.5'
);

// update titles and descriptions
code = code.replace(
  /className="text-xl font-black text-slate-900 tracking-tight font-display mb-3"/g,
  'className="text-base font-black text-slate-900 tracking-tight font-display mb-1.5"'
);

code = code.replace(
  /className="text-slate-500 text-sm leading-relaxed"/g,
  'className="text-slate-500 text-[11px] leading-relaxed"'
);

// update bottom section
code = code.replace(
  /className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between relative z-10"/g,
  'className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10"'
);

code = code.replace(
  /className="text-\[11px\] font-bold text-slate-400 group-hover:text-slate-800 transition-colors uppercase tracking-wider"/g,
  'className="text-[9px] font-bold text-slate-400 group-hover:text-slate-800 transition-colors uppercase tracking-wider"'
);

code = code.replace(
  /className=\{`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 transition-all duration-300 group-hover:-rotate-45 group-hover:scale-110 \$\{tool\.bg\.replace\('bg-', 'group-hover:bg-'\)\} \$\{tool\.color\.replace\('text-', 'group-hover:border-'\)`\}\}/g,
  'className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 transition-all duration-300 group-hover:-rotate-45 group-hover:scale-110 ${tool.bg.replace(\'bg-\', \'group-hover:bg-\')} ${tool.color.replace(\'text-\', \'group-hover:border-\')}`}'
);

code = code.replace(
  /className=\{`w-4 h-4 text-slate-400 transition-colors \$\{tool\.color\.replace\('text-', 'group-hover:text-'\)\}`\}/g,
  'className={`w-3.5 h-3.5 text-slate-400 transition-colors ${tool.color.replace(\'text-\', \'group-hover:text-\')}`}'
);


fs.writeFileSync('src/components/PlatformTools.tsx', code);
