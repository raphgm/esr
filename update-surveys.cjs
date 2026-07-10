const fs = require('fs');
let code = fs.readFileSync('src/components/SurveysAndPolls.tsx', 'utf8');

// Update creation radio buttons to include Code Task
code = code.replace(
  /<div className="flex gap-4 mb-2">/,
  `<div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
                <input type="radio" checked={newSurvey.type === "code_task"} onChange={() => setNewSurvey({...newSurvey, type: "code_task"})} /> Code Task
              </label>`
);

// Add Code Snippet option to the question type select
code = code.replace(
  /<option value="text">Text Answer<\/option>/,
  `<option value="text">Text Answer</option>
                       <option value="code">Code Review / Snippet</option>`
);

// If q.type === "code", show a text area for the code snippet
const qTypeTextArea = `{q.type === "code" && (
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
                   {q.type !== "text" && q.type !== "code" && (`;

code = code.replace(/{q\.type !== "text" && \(/, qTypeTextArea);

code = code.replace(
  /Publish \{newSurvey\.type === "poll" \? "Poll" : "Survey"\}/,
  'Publish {newSurvey.type === "poll" ? "Poll" : newSurvey.type === "code_task" ? "Code Task" : "Survey"}'
);

code = code.replace(
  /type: newSurvey\.type as "survey" \| "poll",/,
  'type: newSurvey.type as "survey" | "poll" | "code_task",'
);

code = code.replace(
  /<h2 className="text-xl font-black text-slate-900">Create New \{newSurvey\.type === "poll" \? "Poll" : "Survey"\}<\/h2>/,
  '<h2 className="text-xl font-black text-slate-900">Create New {newSurvey.type === "poll" ? "Poll" : newSurvey.type === "code_task" ? "Code Task" : "Survey"}</h2>'
);

code = code.replace(
  /<div className=\{\`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform \$\{item\.type === 'poll' \? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'\}\`\}>\s*\{item\.type === 'poll' \? <BarChart3 className="w-6 h-6" \/> : <FileText className="w-6 h-6" \/>\}\s*<\/div>/g,
  `<div className={\`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform \${item.type === 'poll' ? 'bg-blue-100 text-blue-600' : item.type === 'code_task' ? 'bg-emerald-100 text-emerald-600' : 'bg-purple-100 text-purple-600'}\`}>
                {item.type === 'poll' ? <BarChart3 className="w-6 h-6" /> : item.type === 'code_task' ? <Zap className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
              </div>`
);

code = code.replace(
  /<span className=\{\`\$\{item\.type === 'poll' \? 'text-blue-600' : 'text-purple-600'\} text-sm font-bold flex items-center gap-1\`\}>\s*\{item\.type === 'poll' \? 'Vote Now' : 'Take Survey'\} <ChevronRight className="w-4 h-4" \/>\s*<\/span>/g,
  `<span className={\`\${item.type === 'poll' ? 'text-blue-600' : item.type === 'code_task' ? 'text-emerald-600' : 'text-purple-600'} text-sm font-bold flex items-center gap-1\`}>
                {item.type === 'poll' ? 'Vote Now' : item.type === 'code_task' ? 'Review Code' : 'Take Survey'} <ChevronRight className="w-4 h-4" />
              </span>`
);


fs.writeFileSync('src/components/SurveysAndPolls.tsx', code);
