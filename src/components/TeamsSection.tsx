import React from "react";
import { Users, Briefcase } from "lucide-react";

export function TeamsSection() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "The Founder & CEO",
      focus: "Platform Strategy & Growth",
    },
    {
      name: "Sarah Williams",
      role: "Legal Director",
      focus: "Legal & Compliance",
    },
    {
      name: "Michael Brown",
      role: "Chief Technology Officer (CTO)",
      focus: "Technology Architecture",
    },
    {
      name: "David Lee",
      role: "Head of Cybersecurity",
      focus: "Platform Security",
    },
    {
      name: "Chris Taylor",
      role: "Cloud Architect",
      focus: "Cloud Infrastructure",
    },
    {
      name: "Emma Davis",
      role: "Advisory Board Chairman",
      focus: "Strategic Advisory",
    },
    {
      name: "James Wilson",
      role: "Advisory Board Member",
      focus: "Ecosystem Growth",
    },
    {
      name: "Olivia Martinez",
      role: "Strategic CFO",
      focus: "Financial Strategy",
    },
    {
      name: "Daniel Miller",
      role: "Brand Management and Leadership",
      focus: "",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 relative pb-24">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-12 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full text-[10px] font-mono font-bold tracking-widest uppercase mb-4 border border-white/20">
              <Users className="w-3.5 h-3.5" /> Leadership
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-2">
              Our Team
            </h2>
            <p className="text-slate-9000 max-w-xl text-sm md:text-base">
              The visionaries driving ESTARR forward.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-slate-900 mb-1">{member.name}</h3>
              <p className="text-purple-500 font-semibold text-sm mb-4">{member.role}</p>
              {member.focus && (
                <div className="flex items-start gap-2 text-sm text-slate-500">
                  <Briefcase className="w-4 h-4 text-slate-9000 mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-slate-700">Focus:</span> {member.focus}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
