const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `<div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r-2 border-slate-200 bg-white rounded-xl relative overflow-hidden">
                  {/* Decorative Abstract Shapes */}
                  <div className="absolute -right-8 -top-8 text-purple-500/50 pointer-events-none rotate-12 z-0">
                    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                      <circle cx="50" cy="50" r="40" strokeDasharray="8 8" />
                    </svg>
                  </div>
                  <div className="absolute right-1/4 bottom-1/4 text-blue-500/45 pointer-events-none rotate-[15deg] z-0">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
                      <path d="M 50 10 V 90 M 10 50 H 90" />
                    </svg>
                  </div>
                  <div className="absolute left-6 top-1/4 text-rose-500/45 pointer-events-none -rotate-45 z-0">
                    <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor">
                      <polygon points="50,10 90,90 10,90" />
                    </svg>
                  </div>
                  <div className="mt-2 relative z-10">
                    <span className="px-3 py-1 bg-purple-500 text-slate-900 border-2 border-slate-900 text-[10px] font-bold tracking-wide mb-6 inline-block uppercase shadow-sm hover:shadow-md transition-all">
                      EstrR Connect Platform
                    </span>
                    <div className="flex flex-col gap-10">
                      <div className="animate-fade-in">
                        <h1 className="text-5xl md:text-6xl leading-none font-bold tracking-tight mb-4 text-slate-900">
                          Connect &<br />
                          <span className="text-purple-600">Showcase</span>.
                        </h1>
                        <p className="max-w-md text-base md:text-lg leading-snug text-slate-700">
                          Build your professional portfolio, connect with peers, and verify your credentials on-chain.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>`;

const replacement = `<div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r-2 border-slate-200 bg-white rounded-xl relative overflow-hidden min-h-[420px]">
                  {/* Decorative Abstract Shapes */}
                  <div className="absolute right-2 top-2 text-purple-400/60 pointer-events-none rotate-12 z-0">
                    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                      <circle cx="50" cy="50" r="40" strokeDasharray="8 8" />
                    </svg>
                  </div>
                  <div className="absolute right-12 bottom-8 text-blue-400/60 pointer-events-none rotate-[25deg] z-0">
                    <svg width="180" height="180" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                      <path d="M 50 10 V 90 M 10 50 H 90" />
                    </svg>
                  </div>
                  <div className="absolute left-8 bottom-12 text-rose-400/50 pointer-events-none -rotate-[20deg] z-0">
                    <svg width="150" height="150" viewBox="0 0 100 100" fill="currentColor">
                      <polygon points="50,10 90,90 10,90" />
                    </svg>
                  </div>

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <span className="px-3 py-1 bg-purple-500 text-slate-900 border-2 border-slate-900 text-[10px] font-bold tracking-wide mb-8 inline-block uppercase shadow-sm hover:shadow-md transition-all">
                        EstrR Connect Platform
                      </span>
                      <h1 className="text-6xl md:text-7xl leading-none font-bold tracking-tight mb-4 text-slate-900">
                        Connect &<br />
                        <span className="text-purple-600 relative inline-block">
                          Showcase
                          <div className="absolute -left-4 -bottom-2 text-rose-300/40 pointer-events-none -rotate-[15deg] -z-10 mix-blend-multiply hidden md:block">
                            <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor">
                              <polygon points="50,10 90,90 10,90" />
                            </svg>
                          </div>
                        </span>.
                      </h1>
                    </div>
                    
                    <div className="mt-auto pt-16">
                      <p className="max-w-md text-lg md:text-xl leading-relaxed text-slate-700 font-medium">
                        Build your professional portfolio, connect with peers, and verify your credentials on-chain.
                      </p>
                    </div>
                  </div>
                </div>`;

const clean = (str) => str.replace(/\s+/g, ' ').trim();

if (clean(code).includes(clean(target))) {
  // Let's do a more robust string replacement
  let matchIdx = -1;
  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r-2 border-slate-200 bg-white rounded-xl relative overflow-hidden">')) {
       matchIdx = i;
       break;
    }
  }
  
  if (matchIdx !== -1) {
    let endIdx = -1;
    for (let i = matchIdx; i < lines.length; i++) {
       if (lines[i].includes('              {/* Hero Right: Featured & AI */}')) {
         endIdx = i;
         break;
       }
    }
    
    if (endIdx !== -1) {
      code = [...lines.slice(0, matchIdx), replacement, ...lines.slice(endIdx)].join('\n');
      fs.writeFileSync('src/App.tsx', code);
      console.log('SUCCESS');
    } else {
      console.log('END NOT FOUND');
    }
  } else {
     console.log('START NOT FOUND');
  }
} else {
  console.log('TARGET NOT MATCHED');
}
