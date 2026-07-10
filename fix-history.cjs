const fs = require('fs');
let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

const newHistory = `
        ) : (
          <div className="col-span-full">
            {tasks.filter(t => completedTasks.includes(t.id)).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tasks.filter(t => completedTasks.includes(t.id)).map(task => (
                  <div key={task.id} className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between h-full min-h-[220px]">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 mb-3 line-clamp-2 leading-tight">{task.title}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-bold text-slate-600">Completed</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-500">Reward Earned:</span>
                      <span className="font-black text-emerald-600">\${task.reward.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center text-slate-500">
                <CheckCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="font-bold text-slate-900 text-lg mb-1">No recent work history</p>
                <p className="text-sm">Complete some available roles to see them here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};`;

code = code.replace(/\) : null\}\s*<\/div>\s*<\/div>\s*\);\s*\};\s*$/, newHistory);

// Add the tab buttons
const topControls = `<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab("available")}
              className={\`px-4 py-2 rounded-xl text-sm font-bold transition-colors \${activeTab === "available" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}\`}
            >
              Available Roles
            </button>
            <button 
              onClick={() => setActiveTab("history")}
              className={\`px-4 py-2 rounded-xl text-sm font-bold transition-colors \${activeTab === "history" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}\`}
            >
              Work History
            </button>
          </div>
          <div className="relative w-full max-w-md">`;

code = code.replace(/<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">\s*<div className="relative w-full max-w-md">/, topControls);


fs.writeFileSync('src/components/AILabSection.tsx', code);
