const fs = require('fs');
let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

// Replace reward display in task list
code = code.replace(
  /<p className="text-xl font-black text-emerald-600">\\\$[^<]+<\/p>/g,
  `<div className="relative group/tooltip flex items-center justify-center md:justify-end gap-1.5">
                      <p className="text-xl font-black text-emerald-600">\${task.reward.toFixed(2)}</p>
                      <Info className="w-3.5 h-3.5 text-slate-300 hover:text-slate-500 cursor-help" />
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
                    </div>`
);

// Replace reward display in completed tasks history
code = code.replace(
  /<p className="text-xl font-black text-slate-600">\\\$[^<]+<\/p>/g,
  `<div className="relative group/tooltip flex items-center justify-center md:justify-end gap-1.5">
                      <p className="text-xl font-black text-slate-600">\${task.reward.toFixed(2)}</p>
                      <Info className="w-3.5 h-3.5 text-slate-300 hover:text-slate-500 cursor-help" />
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
                    </div>`
);


fs.writeFileSync('src/components/AILabSection.tsx', code);
