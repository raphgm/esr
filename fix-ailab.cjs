const fs = require('fs');
let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

// I will add an `activeTask` state and an `completedTasks` state.
code = code.replace(
  /const \[searchQuery, setSearchQuery\] = useState\(""\);/,
  `const [searchQuery, setSearchQuery] = useState("");
  const [activeTask, setActiveTask] = useState<any>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [taskResponses, setTaskResponses] = useState<any>({});`
);

const renderTaskRunner = `
  if (activeTask) {
    return (
      <div className="flex flex-col gap-6 animate-fade-in pb-16 max-w-3xl mx-auto w-full">
        <button onClick={() => setActiveTask(null)} className="text-slate-500 hover:text-slate-900 text-sm font-bold flex items-center gap-2 mr-auto">
           &larr; Back to Dashboard
        </button>
        
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
             <div className={\`p-4 rounded-2xl shrink-0 \${activeTask.bg} \${activeTask.color}\`}>
                <activeTask.icon className="w-8 h-8" />
             </div>
             <div>
               <h2 className="text-2xl font-black text-slate-900">{activeTask.title}</h2>
               <p className="text-sm text-slate-500">{activeTask.requester} &bull; Reward: <span className="text-emerald-600 font-bold">\${activeTask.reward.toFixed(2)}</span></p>
             </div>
          </div>
          
          <div className="prose prose-slate max-w-none text-sm mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Instructions</h3>
            <p className="text-slate-600">{activeTask.description}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
            {activeTask.type === "RLHF" && (
               <div className="space-y-4">
                 <p className="font-bold text-slate-900">Which response is better?</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={() => setTaskResponses({...taskResponses, [activeTask.id]: 'A'})}
                      className={\`p-4 text-left rounded-xl border-2 transition-all \${taskResponses[activeTask.id] === 'A' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}\`}
                    >
                      <span className="font-bold block mb-2 text-slate-900">Response A</span>
                      <p className="text-xs text-slate-600">The sky is blue because of a phenomenon called Rayleigh scattering, which scatters sunlight in all directions.</p>
                    </button>
                    <button 
                      onClick={() => setTaskResponses({...taskResponses, [activeTask.id]: 'B'})}
                      className={\`p-4 text-left rounded-xl border-2 transition-all \${taskResponses[activeTask.id] === 'B' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}\`}
                    >
                      <span className="font-bold block mb-2 text-slate-900">Response B</span>
                      <p className="text-xs text-slate-600">It's blue because water from the ocean reflects into the sky.</p>
                    </button>
                 </div>
               </div>
            )}
            
            {activeTask.type !== "RLHF" && (
               <div className="space-y-4">
                 <p className="font-bold text-slate-900">Your Answer / Findings</p>
                 <textarea 
                   className="w-full h-32 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-purple-500" 
                   placeholder="Enter your detailed feedback here..."
                   value={taskResponses[activeTask.id] || ''}
                   onChange={e => setTaskResponses({...taskResponses, [activeTask.id]: e.target.value})}
                 ></textarea>
               </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button 
              onClick={() => setActiveTask(null)}
              className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                setCompletedTasks([...completedTasks, activeTask.id]);
                setActiveTask(null);
                alert("Task submitted successfully! Reward will be credited to your account after review.");
              }}
              disabled={!taskResponses[activeTask.id]}
              className="px-6 py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Task
            </button>
          </div>
        </div>
      </div>
    );
  }
`;

code = code.replace(
  /return \(\s*<div className="flex flex-col gap-8 animate-fade-in pb-16">/,
  renderTaskRunner + '\n  return (\n    <div className="flex flex-col gap-8 animate-fade-in pb-16">'
);

// handle Accept & Work button click
code = code.replace(
  /<button className="flex-1 md:flex-none bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-purple-600 transition-colors ml-auto md:ml-0">/g,
  `<button onClick={() => setActiveTask(task)} className="flex-1 md:flex-none bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-purple-600 transition-colors ml-auto md:ml-0">`
);

// modify tasks to exclude completed ones from 'available' and show them in 'history'
code = code.replace(
  /tasks\.filter\(t => t\.title\.toLowerCase\(\)\.includes\(searchQuery\.toLowerCase\(\)\)\)\.map\(task =>/g,
  `tasks.filter(t => !completedTasks.includes(t.id) && t.title.toLowerCase().includes(searchQuery.toLowerCase())).map(task =>`
);

code = code.replace(
  /<div className="p-12 text-center text-slate-500">\s*<CheckCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" \/>\s*<p className="font-bold text-slate-900 mb-1">No recent work history<\/p>\s*<p className="text-sm">Complete some available HITs to see them here\.<\/p>\s*<\/div>/g,
  `
            completedTasks.length > 0 ? (
              tasks.filter(t => completedTasks.includes(t.id)).map(task => (
                <div key={task.id} className="p-6 bg-slate-50 flex flex-col md:flex-row gap-6 items-start md:items-center opacity-70">
                  <div className={\`p-4 rounded-2xl shrink-0 \${task.bg} \${task.color}\`}>
                    <task.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-200 text-slate-600 rounded uppercase">
                        COMPLETED
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        Req: {task.requester}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-1">{task.title}</h3>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-xl font-black text-slate-600">\${task.reward.toFixed(2)}</p>
                    <p className="text-xs font-bold text-slate-400 mt-1">Pending Review</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-500">
                <CheckCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="font-bold text-slate-900 mb-1">No recent work history</p>
                <p className="text-sm">Complete some available HITs to see them here.</p>
              </div>
            )
  `
);

fs.writeFileSync('src/components/AILabSection.tsx', code);
