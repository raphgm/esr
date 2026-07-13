
import React from 'react';
import { BookOpen, HelpCircle, FileText, ChevronRight } from 'lucide-react';

export function HelpDocsSection() {
  return (
    <div className="flex-1 p-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          Help & Documentation
        </h1>
        
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              Frequently Asked Questions
            </h2>
            <ul className="space-y-3">
              {[
                "How do I set up my profile?",
                "How does the consultancy escrow work?",
                "How can I integrate Paystack for payments?",
                "What is the vetting protocol?"
              ].map((faq, idx) => (
                <li key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer">
                  {faq}
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              Guides
            </h2>
            <div className="space-y-4">
              <div className="p-4 border border-slate-100 rounded-lg hover:border-indigo-200 transition-colors">
                <h3 className="font-medium text-slate-900">Developer Quickstart</h3>
                <p className="text-sm text-slate-500">Learn how to configure your integration keys and set up your environment.</p>
              </div>
              <div className="p-4 border border-slate-100 rounded-lg hover:border-indigo-200 transition-colors">
                <h3 className="font-medium text-slate-900">Client Escrow Workflow</h3>
                <p className="text-sm text-slate-500">Understand the secure escrow process for your consultancies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
