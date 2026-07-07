const fs = require('fs');
let code = fs.readFileSync('src/components/AboutSection.tsx', 'utf-8');

code = `import React from "react";

export function AboutSection() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="p-8 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl">
        <h2 className="text-3xl font-bold uppercase tracking-tight text-slate-900 mb-6">
          About EstrR
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-sm font-medium leading-relaxed text-slate-700 mb-6">
              EstrR Products Limited is an expansive digital ecosystem dedicated to empowering African growth. We build seamless bridges between learning, networking, and earning by transforming theoretical knowledge into sustainable professional success through our integrated platforms.
            </p>
            <p className="text-sm font-medium leading-relaxed text-slate-700">
              Our vision is to cultivate a trusted, 100% escrow-secured network of verified professionals, merchants, and learners. From full-time jobs and gig marketplaces to enterprise project coordination, real estate, and academy courses, we facilitate secure commerce and career advancement across the continent.
            </p>
          </div>
          <div className="bg-slate-50 p-6 border border-slate-200 flex flex-col justify-center">
            <h3 className="text-lg font-bold uppercase mb-4 text-purple-600">
              Our Core Pillars
            </h3>
            <ul className="space-y-3 font-mono text-[11px] font-bold tracking-widest uppercase">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-950"></span> Escrow-Secured Commerce & Trade
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-950"></span> Career Growth & Gig Opportunities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-950"></span> Practical Learning & Academy
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-950"></span> Professional Networking & Guilds
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}`;

fs.writeFileSync('src/components/AboutSection.tsx', code);
console.log('SUCCESS');
