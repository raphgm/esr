import React from 'react';
import { BookOpen, HelpCircle, FileText, ChevronRight, Briefcase, ShieldCheck } from 'lucide-react';

export function HelpGuideSection() {
  const guides = [
    {
      title: "How to Post Jobs",
      desc: "Step-by-step guide on creating and publishing job listings.",
      icon: Briefcase,
    },
    {
      title: "Manage Consultancy Contracts",
      desc: "Learn how to manage your consultancy tasks and milestones.",
      icon: FileText,
    },
    {
      title: "Escrow Workflow",
      desc: "Navigate the secure payment and escrow process.",
      icon: ShieldCheck,
    },
    {
      title: "Getting Started",
      desc: "Learn how to set up your profile and start your first project.",
      icon: BookOpen,
    },
    {
      title: "FAQ",
      desc: "Frequently asked questions about payments, vetting, and more.",
      icon: HelpCircle,
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in p-6">
      <button type="button" className="flex flex-col gap-2 cursor-pointer hover:opacity-80 transition-opacity text-left w-full" onClick={() => alert("Opening full documentation...")}>
        <h2 className="text-2xl font-bold text-slate-900">Documentation & Help Guide</h2>
        <p className="text-slate-500 text-sm">Find answers, tutorials, and guides to master the ESTARR ecosystem.</p>
      </button>

      <div className="grid md:grid-cols-3 gap-6">
        {guides.map((guide, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              console.log(`Read Guide clicked: ${guide.title}`);
              alert(`Opening guide for: ${guide.title}`);
            }}
            className="p-6 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl flex flex-col gap-4 text-left w-full cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
              <guide.icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">{guide.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{guide.desc}</p>
            <div className="text-xs font-bold text-purple-600 flex items-center gap-1 mt-auto hover:text-purple-800 transition-colors">
              Read Guide <ChevronRight className="w-3 h-3" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
