const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `<div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r-2 border-slate-200 bg-white rounded-xl relative overflow-hidden min-h-[420px]">`;

let matchIdx = -1;
const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('lg:col-span-7 p-6 md:p-10')) {
     matchIdx = i;
     break;
  }
}

if (matchIdx !== -1) {
  let endIdx = -1;
  for (let i = matchIdx; i < lines.length; i++) {
     if (lines[i].includes('{/* Hero Right: Featured & AI */}')) {
       endIdx = i;
       break;
     }
  }
  
  if (endIdx !== -1) {
    const replacement = `<div className="lg:col-span-7 p-6 md:p-10 flex flex-col border-b lg:border-b-0 lg:border-r-2 border-slate-200 bg-white rounded-xl relative overflow-hidden min-h-[420px]">
                  {/* Decorative Abstract Shapes */}
                  <div className="absolute right-8 top-8 text-purple-400/60 pointer-events-none rotate-12 z-0">
                    <svg width="160" height="160" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                      <circle cx="50" cy="50" r="40" strokeDasharray="8 8" />
                    </svg>
                  </div>
                  <div className="absolute right-12 bottom-12 text-blue-400/60 pointer-events-none rotate-[25deg] z-0">
                    <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                      <path d="M 50 10 V 90 M 10 50 H 90" />
                    </svg>
                  </div>
                  <div className="absolute left-8 bottom-8 text-rose-400/50 pointer-events-none -rotate-[20deg] z-0">
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
                      <polygon points="50,10 90,90 10,90" />
                    </svg>
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div>
                      <span className="px-3 py-1 bg-purple-500 text-slate-900 border-2 border-slate-900 text-[10px] font-bold tracking-wide mb-8 inline-block uppercase shadow-sm hover:shadow-md transition-all">
                        EstrR Connect Platform
                      </span>
                      <h1 className="text-5xl md:text-6xl lg:text-7xl leading-none font-bold tracking-tight mb-4 text-slate-900">
                        Connect &<br />
                        <span className="text-purple-600 relative inline-block">
                          Showcase
                          <div className="absolute -left-4 -bottom-2 text-rose-300/40 pointer-events-none -rotate-[15deg] -z-10 mix-blend-multiply hidden md:block">
                            <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
                              <polygon points="50,10 90,90 10,90" />
                            </svg>
                          </div>
                        </span>.
                      </h1>
                    </div>
                    
                    <div className="mt-4 max-w-md">
                      <p className="text-lg md:text-xl leading-relaxed text-slate-700 font-medium">
                        Build your professional portfolio, connect with peers, and verify your credentials on-chain.
                      </p>
                    </div>

                    <div className="mt-auto pt-8">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                        <div>
                          <p className="text-2xl font-black text-slate-900 tracking-tighter">12+</p>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1">Ecosystem Apps</p>
                        </div>
                        <div>
                          <p className="text-2xl font-black text-slate-900 tracking-tighter">100%</p>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1">On-Chain Secured</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-2xl font-black text-purple-600 tracking-tighter">24/7</p>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1">Escrow Pipeline</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                `;
    code = [...lines.slice(0, matchIdx), replacement, ...lines.slice(endIdx)].join('\n');
    fs.writeFileSync('src/App.tsx', code);
    console.log('SUCCESS');
  } else {
    console.log('END NOT FOUND');
  }
} else {
  console.log('START NOT FOUND');
}
