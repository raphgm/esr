const fs = require('fs');
let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

// The main view starts at line 463
const oldMainViewRegex = /return \(\s*<div className="flex flex-col gap-8 animate-fade-in pb-16">[\s\S]*$/;

const newMainView = `return (
    <div className="flex flex-col gap-8 animate-fade-in pb-16 max-w-7xl mx-auto w-full px-4">
      <div className="mb-2 mt-4">
        <h1 className="text-3xl font-black text-slate-900 mb-6">Explore roles</h1>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search roles or skills..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:border-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
             <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full">
               All <span className="bg-slate-700 px-1.5 py-0.5 rounded text-xs">130</span>
             </button>
             <button className="flex items-center gap-2 hover:text-slate-900 transition-colors">
               Priority <span className="bg-slate-100 px-1.5 py-0.5 rounded text-xs text-slate-400">3</span>
             </button>
             <button className="flex items-center gap-2 hover:text-slate-900 transition-colors">
               Newest <span className="bg-slate-100 px-1.5 py-0.5 rounded text-xs text-slate-400">6</span>
             </button>
          </div>
        </div>

        <div className="flex overflow-x-auto scrollbar-none gap-2 pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={\`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors \${selectedCategory === cat ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}\`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {activeTab === "available" ? (
          tasks.filter(t => !completedTasks.includes(t.id) && t.title.toLowerCase().includes(searchQuery.toLowerCase()) && (selectedCategory === "All" || t.category === selectedCategory)).map(task => (
            <div key={task.id} className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col justify-between group h-full min-h-[220px]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold">
                    <Award className="w-3.5 h-3.5" /> Priority
                  </div>
                  <div className="relative group/tooltip">
                    <div className="flex items-center gap-1.5 text-white bg-blue-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      <DollarSign className="w-3.5 h-3.5" /> {task.reward.toFixed(0)}
                    </div>
                    <div className="absolute right-0 bottom-full mb-2 w-40 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 text-left">
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">Base Rate:</span>
                        <span className="font-bold">\${task.baseRate.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Perf. Bonus:</span>
                        <span className="font-bold text-emerald-400">+\${task.bonus.toFixed(2)}</span>
                      </div>
                      <div className="absolute right-4 -bottom-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-3 line-clamp-2 leading-tight">{task.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">{task.description}</p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                {task.reward >= 100 && applicationStatus[task.id] !== 'accepted' ? (
                  <button 
                    onClick={() => handleApply(task.id)}
                    disabled={applicationStatus[task.id] === 'pending'}
                    className={\`w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-colors \${applicationStatus[task.id] === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-600 text-white hover:bg-blue-700'}\`}
                  >
                    {applicationStatus[task.id] === 'pending' ? 'Application Under Review...' : 'Apply to Qualify'}
                  </button>
                ) : (
                  <button 
                    onClick={() => setActiveTask(task)} 
                    className="w-full bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
                  >
                    {task.progress > 0 ? "Resume Work" : "Accept & Go to AI Lab"}
                  </button>
                )}
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};
`;

code = code.replace(oldMainViewRegex, newMainView);
fs.writeFileSync('src/components/AILabSection.tsx', code);
