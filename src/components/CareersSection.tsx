import React from "react";

export function CareersSection() {
  const jobs = [
    {
      title: "Senior React Developer",
      type: "Full-Time",
      location: "Remote / Lagos",
    },
    {
      title: "Product Marketing Manager",
      type: "Full-Time",
      location: "Lagos, NG",
    },
    {
      title: "Community Operations Lead",
      type: "Contract",
      location: "Remote",
    },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="p-8 border border-slate-200 bg-purple-500 shadow-sm hover:shadow-md transition-shadow rounded-xl text-slate-900">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-tight mb-2">
              Build With Us
            </h2>
            <p className="text-sm font-medium leading-relaxed text-slate-500 max-w-lg opacity-90 text-slate-900">
              Join the core team at ESTARR. We are looking for
              ambitious individuals ready to scale the premier digital
              learning and commerce ecosystem.
            </p>
          </div>
          <button className="bg-slate-950 text-white px-6 py-3 font-semibold tracking-wide text-[10px] hover:bg-white hover:text-slate-900 transition-colors border border-slate-200">
            View All Openings
          </button>
        </div>

        <div className="space-y-4">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:-translate-y-1 hover:shadow-sm hover:shadow-md transition-shadow transition-all cursor-pointer"
            >
              <div>
                <h3 className="font-bold uppercase text-lg mb-1">
                  {job.title}
                </h3>
                <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                  <span>{job.type}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                </div>
              </div>
              <button className="text-[10px] font-semibold tracking-wide text-purple-500 hover:text-slate-900 transition-colors flex items-center gap-2">
                Apply Now <span className="text-lg leading-none">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
