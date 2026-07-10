import React, { useState, useEffect } from "react";
import { Survey, UserProfile } from "../types";
import { FileText, Users, ChevronRight, Zap, BarChart3, Plus, Copy, Check } from "lucide-react";
import { getCollectionData, saveCollectionItem } from "../lib/firebase";

interface SurveysAndPollsProps {
  userProfile: UserProfile;
}

const initialMockSurveys: Survey[] = [
  {
    id: "survey-1",
    title: "Developer AI Tool Usage Survey 2026",
    description: "Collecting data on how developers integrate LLMs into daily workflows.",
    type: "survey",
    questions: [
      { id: "q1", question: "What is your primary AI coding assistant?", type: "single", options: ["GitHub Copilot", "Cursor", "Supermaven", "Google AI Studio"] },
    ],
    responsesCount: 1420,
    createdAt: new Date().toISOString(),
    creatorId: "estarr-core",
  },
  {
    id: "poll-1",
    title: "Favorite Open Source Model?",
    description: "Quick community poll on preferred base models for fine-tuning.",
    type: "poll",
    questions: [
      { id: "q1", question: "Which open source model family do you prefer?", type: "single", options: ["Llama", "Mistral", "Gemma", "Qwen"] },
    ],
    responsesCount: 845,
    createdAt: new Date().toISOString(),
    creatorId: "estarr-core",
  }
];

export const SurveysAndPolls: React.FC<SurveysAndPollsProps> = ({ userProfile }) => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newSurvey, setNewSurvey] = useState<Partial<Survey>>({ type: "survey", questions: [{ id: "q1", question: "", type: "single", options: ["", ""] }] });
  const [viewingSurvey, setViewingSurvey] = useState<Survey | null>(null);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const loadSurveys = async () => {
      const data = await getCollectionData<Survey>("surveys", initialMockSurveys);
      setSurveys(data);

      const params = new URLSearchParams(window.location.search);
      const surveyId = params.get("survey");
      if (surveyId) {
        const found = data.find(s => s.id === surveyId);
        if (found) {
          setViewingSurvey(found);
        }
      }
    };
    loadSurveys();
  }, []);

  const handleShare = (e: React.MouseEvent, surveyId: string) => {
    e.stopPropagation();
    const shareLink = `${window.location.origin}?survey=${surveyId}`;
    navigator.clipboard.writeText(shareLink);
    setCopied(surveyId);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleCreate = async () => {
    if (!newSurvey.title || !newSurvey.questions?.[0].question) return;
    
    const surveyToSave: Survey = {
      id: `survey-${Date.now()}`,
      title: newSurvey.title,
      description: newSurvey.description || "",
      type: newSurvey.type as "survey" | "poll" | "code_task",
      questions: newSurvey.questions as Survey["questions"],
      responsesCount: 0,
      createdAt: new Date().toISOString(),
      creatorId: "me", // Could use userProfile auth ID
    };

    await saveCollectionItem("surveys", surveyToSave);
    setSurveys([surveyToSave, ...surveys]);
    setIsCreating(false);
    setNewSurvey({ type: "survey", questions: [{ id: "q1", question: "", type: "single", options: ["", ""] }] });
  };

  if (viewingSurvey) {
    return (
      <div className="flex flex-col gap-6">
        <button onClick={() => setViewingSurvey(null)} className="text-purple-600 font-bold text-sm w-fit">&larr; Back to Surveys</button>
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">{viewingSurvey.title}</h2>
              <p className="text-slate-500 mt-2">{viewingSurvey.description}</p>
            </div>
            <button 
              onClick={(e) => handleShare(e, viewingSurvey.id)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copied === viewingSurvey.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />} 
              Share Link
            </button>
          </div>
          <div className="space-y-6 border-t border-slate-100 pt-6">
            {viewingSurvey.questions.map((q, i) => (
              <div key={q.id} className="space-y-3">
                <p className="font-bold text-slate-900">{i + 1}. {q.question}</p>
                {q.type === "text" ? (
                  <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3" rows={3} placeholder="Your answer..." />
                ) : (
                  <div className="space-y-2">
                    {q.options?.map((opt, oIdx) => (
                      <label key={oIdx} className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-xl cursor-pointer hover:border-purple-300">
                        <input type={q.type === "single" ? "radio" : "checkbox"} name={`q-${q.id}`} className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-slate-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => { alert("Response submitted successfully!"); setViewingSurvey(null); }} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-colors mt-4">
              Submit Response
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="flex flex-col gap-6">
        <button onClick={() => setIsCreating(false)} className="text-purple-600 font-bold text-sm w-fit">&larr; Cancel</button>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col gap-4">
           <h2 className="text-xl font-black text-slate-900">Create New {newSurvey.type === "poll" ? "Poll" : newSurvey.type === "code_task" ? "Code Task" : "Survey"}</h2>
           <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
                <input type="radio" checked={newSurvey.type === "code_task"} onChange={() => setNewSurvey({...newSurvey, type: "code_task"})} /> Code Task
              </label>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
                <input type="radio" checked={newSurvey.type === "survey"} onChange={() => setNewSurvey({...newSurvey, type: "survey"})} /> Survey
              </label>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
                <input type="radio" checked={newSurvey.type === "poll"} onChange={() => setNewSurvey({...newSurvey, type: "poll"})} /> Quick Poll
              </label>
           </div>

           <input 
             type="text" 
             placeholder="Title" 
             className="bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-lg"
             value={newSurvey.title || ""}
             onChange={e => setNewSurvey({...newSurvey, title: e.target.value})}
           />
           <textarea 
             placeholder="Description (optional)" 
             className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm"
             value={newSurvey.description || ""}
             onChange={e => setNewSurvey({...newSurvey, description: e.target.value})}
           />

           <div className="border-t border-slate-100 pt-4 mt-2">
             <h3 className="font-bold text-slate-900 mb-4">Questions</h3>
             {newSurvey.questions?.map((q, idx) => (
                <div key={q.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-4 space-y-3">
                   <div className="flex justify-between items-center">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Question {idx + 1}</span>
                     <select 
                        value={q.type} 
                        onChange={e => {
                          const updated = [...newSurvey.questions!];
                          updated[idx].type = e.target.value as any;
                          setNewSurvey({...newSurvey, questions: updated});
                        }}
                        className="text-sm bg-white border border-slate-200 rounded-lg p-1"
                     >
                       <option value="single">Single Choice</option>
                       <option value="multiple">Multiple Choice</option>
                       <option value="text">Text Answer</option>
                       <option value="code">Code Review / Snippet</option>
                     </select>
                   </div>
                   <input 
                      type="text" 
                      placeholder="Enter question" 
                      className="w-full border border-slate-200 rounded-lg p-2 text-sm font-bold"
                      value={q.question}
                      onChange={e => {
                        const updated = [...newSurvey.questions!];
                        updated[idx].question = e.target.value;
                        setNewSurvey({...newSurvey, questions: updated});
                      }}
                   />
                   {q.type === "code" && (
                     <div className="space-y-2 mt-2">
                       <input 
                         type="text" 
                         placeholder="Language (e.g., python, typescript)"
                         className="w-full border border-slate-200 rounded-lg p-2 text-sm"
                         value={q.language || ""}
                         onChange={e => {
                           const updated = [...newSurvey.questions!];
                           updated[idx].language = e.target.value;
                           setNewSurvey({...newSurvey, questions: updated});
                         }}
                       />
                       <textarea
                         placeholder="Enter code snippet here..."
                         className="w-full h-32 font-mono text-xs border border-slate-200 rounded-lg p-2 bg-slate-900 text-slate-300"
                         value={q.codeSnippet || ""}
                         onChange={e => {
                           const updated = [...newSurvey.questions!];
                           updated[idx].codeSnippet = e.target.value;
                           setNewSurvey({...newSurvey, questions: updated});
                         }}
                       ></textarea>
                     </div>
                   )}
                   {q.type !== "text" && q.type !== "code" && (
                     <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                       {q.options?.map((opt, oIdx) => (
                         <div key={oIdx} className="flex gap-2">
                           <input 
                             type="text" 
                             placeholder={`Option ${oIdx + 1}`} 
                             className="flex-1 border border-slate-200 rounded-lg p-1.5 text-sm"
                             value={opt}
                             onChange={e => {
                               const updated = [...newSurvey.questions!];
                               updated[idx].options![oIdx] = e.target.value;
                               setNewSurvey({...newSurvey, questions: updated});
                             }}
                           />
                         </div>
                       ))}
                       <button 
                         onClick={() => {
                           const updated = [...newSurvey.questions!];
                           updated[idx].options!.push("");
                           setNewSurvey({...newSurvey, questions: updated});
                         }}
                         className="text-xs font-bold text-purple-600"
                       >
                         + Add Option
                       </button>
                     </div>
                   )}
                </div>
             ))}
             <button 
                onClick={() => {
                  setNewSurvey({
                    ...newSurvey, 
                    questions: [...(newSurvey.questions || []), { id: `q${Date.now()}`, question: "", type: "single", options: ["", ""] }]
                  })
                }}
                className="w-full border-2 border-dashed border-slate-200 py-3 rounded-xl text-slate-500 font-bold text-sm hover:border-purple-400 hover:text-purple-600 transition-colors"
             >
                + Add Another Question
             </button>
           </div>
           
           <button 
             onClick={handleCreate}
             className="bg-slate-900 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition-colors mt-4"
           >
             Publish {newSurvey.type === "poll" ? "Poll" : newSurvey.type === "code_task" ? "Code Task" : "Survey"}
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-slate-900">Surveys & Polls</h2>
        <button onClick={() => setIsCreating(true)} className="bg-slate-900 hover:bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer">
          <Plus className="w-4 h-4" /> Create New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {surveys.map(item => (
          <div key={item.id} onClick={() => setViewingSurvey(item)} className={`bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col transition-colors cursor-pointer group ${item.type === 'poll' ? 'hover:border-blue-300' : 'hover:border-purple-300'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${item.type === 'poll' ? 'bg-blue-100 text-blue-600' : item.type === 'code_task' ? 'bg-emerald-100 text-emerald-600' : 'bg-purple-100 text-purple-600'}`}>
                {item.type === 'poll' ? <BarChart3 className="w-6 h-6" /> : item.type === 'code_task' ? <Zap className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
              </div>
              <button 
                onClick={(e) => handleShare(e, item.id)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors"
                title="Share link"
              >
                {copied === item.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            
            <h3 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h3>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">{item.description}</p>
            
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                {item.type === 'poll' ? <Zap className="w-4 h-4 text-emerald-500" /> : <Users className="w-4 h-4" />} 
                {item.responsesCount} {item.type === 'poll' ? 'Votes' : 'Responses'}
              </div>
              <span className={`${item.type === 'poll' ? 'text-blue-600' : item.type === 'code_task' ? 'text-emerald-600' : 'text-purple-600'} text-sm font-bold flex items-center gap-1`}>
                {item.type === 'poll' ? 'Vote Now' : item.type === 'code_task' ? 'Review Code' : 'Take Survey'} <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
         
         <div onClick={() => setIsCreating(true)} className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-purple-400 hover:bg-purple-50 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 mb-4">
               <Plus className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900">Create Form</h3>
            <p className="text-xs text-slate-500 mt-2 max-w-[200px]">Build surveys, polls, and annotation forms to collect high-quality data.</p>
         </div>
      </div>
    </div>
  );
};
