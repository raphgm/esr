const fs = require('fs');
let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

// For hit-002, change to a Code Task style
code = code.replace(
  /id: "hit-002",\n      title: "Categorize Code Snippet Vulnerabilities",/g,
  `id: "hit-002",
      title: "Categorize Code Snippet Vulnerabilities",
      codeSnippet: "function authenticateUser(req, res) {\\n  const query = 'SELECT * FROM users WHERE username = ' + req.body.username + ' AND password = ' + req.body.password;\\n  db.execute(query);\\n}",
      language: "javascript",`
);

// Under activeTask, handle the code snippet
const snippetUI = `
          <div className="prose prose-slate max-w-none text-sm mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Instructions</h3>
            <p className="text-slate-600">{activeTask.description}</p>
          </div>

          {activeTask.codeSnippet && (
            <div className="mb-8">
              <div className="flex justify-between items-center bg-slate-800 text-slate-400 px-4 py-2 rounded-t-xl text-xs font-mono">
                <span>{activeTask.language || 'code'}</span>
              </div>
              <pre className="bg-slate-900 text-slate-300 p-4 rounded-b-xl overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                {activeTask.codeSnippet}
              </pre>
            </div>
          )}
`;

code = code.replace(
  /<div className="prose prose-slate max-w-none text-sm mb-8">\s*<h3 className="text-lg font-bold text-slate-900 mb-2">Instructions<\/h3>\s*<p className="text-slate-600">\{activeTask\.description\}<\/p>\s*<\/div>/,
  snippetUI
);

// For Annotation tasks, also give specific answers
const annotationTask = `
            {activeTask.type === "Annotation" && (
               <div className="space-y-4">
                 <p className="font-bold text-slate-900">Select Vulnerability Type</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={() => setTaskResponses({...taskResponses, [activeTask.id]: 'SQLi'})}
                      className={\`p-4 text-left rounded-xl border-2 transition-all \${taskResponses[activeTask.id] === 'SQLi' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}\`}
                    >
                      <span className="font-bold block text-slate-900">SQL Injection</span>
                    </button>
                    <button 
                      onClick={() => setTaskResponses({...taskResponses, [activeTask.id]: 'XSS'})}
                      className={\`p-4 text-left rounded-xl border-2 transition-all \${taskResponses[activeTask.id] === 'XSS' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}\`}
                    >
                      <span className="font-bold block text-slate-900">Cross-Site Scripting (XSS)</span>
                    </button>
                    <button 
                      onClick={() => setTaskResponses({...taskResponses, [activeTask.id]: 'CSRF'})}
                      className={\`p-4 text-left rounded-xl border-2 transition-all \${taskResponses[activeTask.id] === 'CSRF' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}\`}
                    >
                      <span className="font-bold block text-slate-900">CSRF</span>
                    </button>
                    <button 
                      onClick={() => setTaskResponses({...taskResponses, [activeTask.id]: 'None'})}
                      className={\`p-4 text-left rounded-xl border-2 transition-all \${taskResponses[activeTask.id] === 'None' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}\`}
                    >
                      <span className="font-bold block text-slate-900">No Vulnerability</span>
                    </button>
                 </div>
               </div>
            )}
`;

code = code.replace(
  /\{activeTask\.type !== "RLHF" && \(/,
  `${annotationTask}\n            {activeTask.type !== "RLHF" && activeTask.type !== "Annotation" && (`
);

fs.writeFileSync('src/components/AILabSection.tsx', code);
