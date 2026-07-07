const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Hero Left Card (Connect & Showcase)
code = code.replace(
  '<div className="lg:col-span-7 p-6 md:p-10 flex flex-col border-b lg:border-b-0 lg:border-r-2 border-slate-200 bg-white rounded-xl relative overflow-hidden min-h-[420px]">',
  '<div className="lg:col-span-7 p-6 md:p-10 flex flex-col border-b lg:border-b-0 lg:border-r-2 border-slate-800 bg-slate-900 rounded-xl relative overflow-hidden min-h-[420px]">'
);

// Fix text colors inside Hero Left
code = code.replace(
  '<span className="px-3 py-1 bg-purple-500 text-slate-900 border border-slate-900 rounded-full text-[10px] font-bold tracking-wide mb-8 inline-block uppercase shadow-sm hover:shadow-md transition-all">',
  '<span className="px-3 py-1 bg-purple-500 text-white border border-slate-800 rounded-full text-[10px] font-bold tracking-wide mb-8 inline-block uppercase shadow-sm hover:shadow-md transition-all">'
);

code = code.replace(
  '<h1 className="text-5xl md:text-6xl lg:text-7xl leading-none font-bold tracking-tight mb-4 text-slate-900">',
  '<h1 className="text-5xl md:text-6xl lg:text-7xl leading-none font-bold tracking-tight mb-4 text-white">'
);

code = code.replace(
  '<p className="text-lg md:text-xl leading-relaxed text-slate-600 font-medium">',
  '<p className="text-lg md:text-xl leading-relaxed text-slate-300 font-medium">'
);

code = code.replace(
  '<div className="font-bold text-2xl text-slate-900">13+</div>',
  '<div className="font-bold text-2xl text-white">13+</div>'
);

code = code.replace(
  '<div className="text-[9px] font-bold tracking-wider text-slate-500 uppercase mt-1">Ecosystem Modules</div>',
  '<div className="text-[9px] font-bold tracking-wider text-slate-400 uppercase mt-1">Ecosystem Modules</div>'
);

code = code.replace(
  '<div className="font-bold text-2xl text-slate-900">100%</div>',
  '<div className="font-bold text-2xl text-white">100%</div>'
);

code = code.replace(
  '<div className="text-[9px] font-bold tracking-wider text-slate-500 uppercase mt-1">On-chain Secured</div>',
  '<div className="text-[9px] font-bold tracking-wider text-slate-400 uppercase mt-1">On-chain Secured</div>'
);

code = code.replace(
  '<div className="font-bold text-2xl text-slate-900">24/7</div>',
  '<div className="font-bold text-2xl text-white">24/7</div>'
);

code = code.replace(
  '<div className="text-[9px] font-bold tracking-wider text-slate-500 uppercase mt-1">Escrow Pipeline</div>',
  '<div className="text-[9px] font-bold tracking-wider text-slate-400 uppercase mt-1">Escrow Pipeline</div>'
);

// 2. Active Escrow Pipeline Card
code = code.replace(
  '<div className="flex-1 p-6 md:p-8 bg-white border border-slate-200 text-slate-900 shadow-sm flex flex-col justify-between min-h-[220px] rounded-xl">',
  '<div className="flex-1 p-6 md:p-8 bg-slate-900 border border-slate-800 text-white shadow-sm flex flex-col justify-between min-h-[220px] rounded-xl">'
);

code = code.replace(
  '<span className="text-[8px] font-mono bg-purple-50 text-purple-500 px-2 py-0.5 rounded-full font-bold border border-purple-100">',
  '<span className="text-[8px] font-mono bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full font-bold border border-purple-500/20">'
);

// In the Active Escrow Pipeline tasks, there are text colors for clients and budgets
code = code.replace(
  /className="font-bold text-sm text-slate-900"/g,
  'className="font-bold text-sm text-white"'
);

code = code.replace(
  /className="text-[10px] text-slate-500"/g,
  'className="text-[10px] text-slate-400"'
);

code = code.replace(
  /className="font-mono text-[10px] font-bold text-slate-900"/g,
  'className="font-mono text-[10px] font-bold text-white"'
);

// 3. AI Quick Copilot Card (EstrR Intelligence)
// Wait, the user said: "card use purple for this EstrR Intelligence" and the screenshot had it as orange.
// When we reverted, it's already purple.
// Let's make sure it is purple and looks good.
code = code.replace(
  '<div className="bg-purple-500 p-6 text-slate-900 border-t-2 border-slate-200 relative flex flex-col justify-between rounded-xl">',
  '<div className="bg-purple-600 p-6 text-white border-t border-slate-800 relative flex flex-col justify-between rounded-xl">'
);

code = code.replace(
  '<div className="text-[9px] font-semibold tracking-wide text-slate-900 mb-1">EstrR Intelligence</div>',
  '<div className="text-[9px] font-semibold tracking-wide text-purple-200 mb-1">EstrR Intelligence</div>'
);

// Fix double text-slate-500 text-slate-900 if it exists
code = code.replace(
  '<p className="font-bold text-xs leading-tight mb-4 text-slate-500 text-slate-900">',
  '<p className="font-bold text-xs leading-tight mb-4 text-white">'
);
code = code.replace(
  '<p className="font-bold text-xs leading-tight mb-4 text-slate-900">',
  '<p className="font-bold text-xs leading-tight mb-4 text-white">'
);

// The Ask AI button
code = code.replace(
  'className="flex justify-between items-center w-full bg-slate-950 hover:bg-white text-white hover:text-slate-900 p-2.5 border border-slate-200 transition-all cursor-pointer font-bold text-[10px] uppercase tracking-wider rounded-xl"',
  'className="flex justify-between items-center w-full bg-slate-950 hover:bg-slate-800 text-white p-2.5 border border-slate-800 transition-all cursor-pointer font-bold text-[10px] uppercase tracking-wider rounded-xl"'
);

code = code.replace(
  '<span className="w-5 h-5 rounded-full bg-purple-500 text-slate-900 flex items-center justify-center font-bold">?</span>',
  '<span className="w-5 h-5 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold">?</span>'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Cards patched.');
