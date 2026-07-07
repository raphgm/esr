const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Hero Left Card background
code = code.replace(
  '<div className="lg:col-span-7 p-6 md:p-10 flex flex-col border-b lg:border-b-0 lg:border-r-2 border-slate-800 bg-slate-900 rounded-xl relative overflow-hidden min-h-[420px]">',
  '<div className="lg:col-span-7 p-6 md:p-10 flex flex-col border-b lg:border-b-0 lg:border-r-2 border-slate-200 bg-white rounded-xl relative overflow-hidden min-h-[420px]">'
);

// 2. Connect Platform pill
code = code.replace(
  '<span className="px-3 py-1 bg-purple-500 text-white border border-slate-800 rounded-full text-[10px] font-bold tracking-wide mb-8 inline-block uppercase shadow-sm hover:shadow-md transition-all">',
  '<span className="px-3 py-1 bg-purple-500 text-white border border-slate-900 rounded-full text-[10px] font-bold tracking-wide mb-8 inline-block uppercase shadow-sm hover:shadow-md transition-all">'
);

// 3. Connect & Showcase Title
code = code.replace(
  '<h1 className="text-5xl md:text-6xl lg:text-7xl leading-none font-bold tracking-tight mb-4 text-white">',
  '<h1 className="text-5xl md:text-6xl lg:text-7xl leading-none font-bold tracking-tight mb-4 text-slate-900">'
);

// 4. Description text
code = code.replace(
  '<p className="text-lg md:text-xl leading-relaxed text-slate-700 font-medium">',
  '<p className="text-lg md:text-xl leading-relaxed text-slate-600 font-medium">'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Left card made white.');
