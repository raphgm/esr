import React from "react";

export function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Join the Ecosystem",
      desc: "Create your profile, set your professional goals, and join regional guilds to connect with peers and mentors.",
    },
    {
      num: "02",
      title: "Learn & Verify Skills",
      desc: "Access practical courses in the Academy. Complete modules to earn verified credentials that display on your profile.",
    },
    {
      num: "03",
      title: "Trade & Execute",
      desc: "Use the Marketplace for secure escrow transactions or leverage Projects for agile enterprise contracts and task management.",
    },
    {
      num: "04",
      title: "Grow & Scale",
      desc: "Build reputation through successful deliveries and peer reviews. Let the ecosystem data match you with higher-tier opportunities.",
    },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="p-8 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-slate-950 text-white text-[10px] font-semibold tracking-wide mb-4">
            The ESTARR Protocol
          </span>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-sm font-medium leading-relaxed text-slate-500 text-slate-500">
            A continuous loop of learning, earning, and building reputation. Our
            unified ecosystem ensures that your growth is tracked, verified, and
            rewarded.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 bg-slate-950/20 -z-10"></div>

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col relative">
              <div className="w-12 h-12 bg-purple-500 border border-slate-200 text-white flex items-center justify-center font-mono font-bold text-lg mb-6 shadow-sm z-10">
                {step.num}
              </div>
              <h3 className="font-bold uppercase text-sm mb-3 text-slate-900 pr-4">
                {step.title}
              </h3>
              <p className="text-[11px] font-medium leading-relaxed text-slate-500 text-slate-500">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
