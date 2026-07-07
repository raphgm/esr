const fs = require('fs');
let code = fs.readFileSync('src/components/ProjectsSection.tsx', 'utf-8');

const target = `{/* Kanban Pipeline Columns */}
          <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">`;

const replacement = `{/* Kanban Pipeline Columns */}
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white border border-slate-200 border-dashed rounded-3xl text-center min-h-[400px] shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100 text-purple-400 relative">
                <div className="absolute inset-0 bg-purple-400/10 rounded-full blur-xl animate-pulse"></div>
                <CheckSquare className="w-10 h-10 relative z-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">No active projects</h3>
              <p className="text-slate-500 mb-6 max-w-sm text-sm">
                Your escrow pipeline is currently empty. Start a new project or create a contract to begin collaborating securely.
              </p>
              <button 
                onClick={() => setShowNewTaskForm(true)}
                className="btn-primary text-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Create First Project
              </button>
            </div>
          ) : (
          <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">`;

code = code.replace(target, replacement);

const targetEnd = `            })}
          </div>
        </div>
      </div>
    </div>
  );
}`;

const replacementEnd = `            })}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}`;

code = code.replace(targetEnd, replacementEnd);

fs.writeFileSync('src/components/ProjectsSection.tsx', code);
console.log('SUCCESS');
