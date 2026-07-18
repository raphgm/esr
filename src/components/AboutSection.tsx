import React from "react";

export function AboutSection() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="p-8 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl">
        <h2 className="text-3xl font-bold uppercase tracking-tight text-slate-900 mb-6">
          About REMOGIGS
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-sm font-medium leading-relaxed text-slate-700 mb-6">
              REMOGIGS is dedicated to empowering professional growth through practical digital ecosystems. We build bridges between learning and earning, transforming theoretical knowledge into sustainable professional success.
            </p>
            <p className="text-sm font-medium leading-relaxed text-slate-700">
              Our vision is to cultivate a trusted network of verified professionals, merchants, and learners, facilitating secure commerce and enterprise-level consultancy coordination globally.
            </p>
          </div>
          <div className="bg-slate-50 p-6 border border-slate-200 flex flex-col justify-center">
            <h3 className="text-lg font-bold uppercase mb-4 text-purple-500">
              Our Core Pillars
            </h3>
            <ul className="space-y-3 font-mono text-[11px] font-bold tracking-widest uppercase">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-950"></span> Trusted Commerce
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-950"></span> Practical Learning
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-950"></span> Enterprise Tools
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-950"></span> Community Guilds
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}