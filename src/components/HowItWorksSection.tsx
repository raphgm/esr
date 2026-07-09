import React from "react";

export function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Certify",
      desc: "Prove your skills via AI-graded challenges and interactive playbooks.",
    },
    {
      num: "02",
      title: "Match",
      desc: "Apply to exclusive, high-ticket brand campaigns and sponsorships.",
    },
    {
      num: "03",
      title: "Execute & Earn",
      desc: "Manage the deliverables and get paid securely via the Escrow Pipeline.",
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="p-8 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-slate-950 text-white text-[10px] font-semibold tracking-wide mb-4">
            THE CREATOR PIPELINE
          </span>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-sm font-medium leading-relaxed text-slate-500">
            A continuous loop of verifying skills, matching with brands, and earning securely. Our unified ecosystem ensures that your growth is tracked and rewarded.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-6 left-12 right-12 h-0.5 bg-slate-200 -z-10"></div>
          
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col relative items-center text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full text-white flex items-center justify-center font-mono font-bold text-lg mb-6 shadow-sm z-10">
                {step.num}
              </div>
              <h3 className="font-bold uppercase text-sm mb-3 text-slate-900 px-4">
                {step.title}
              </h3>
              <p className="text-[12px] font-medium leading-relaxed text-slate-500">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
