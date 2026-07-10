const fs = require('fs');
let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

// Add Info icon to import
code = code.replace(
  /Image as ImageIcon\n\} from "lucide-react";/,
  'Image as ImageIcon,\n  Info\n} from "lucide-react";'
);

// Add base and bonus info to tasks
code = code.replace(
  /reward: 1\.50,/,
  'reward: 1.50,\n      baseRate: 1.00,\n      bonus: 0.50,'
);
code = code.replace(
  /reward: 3\.00,/,
  'reward: 3.00,\n      baseRate: 2.00,\n      bonus: 1.00,'
);
code = code.replace(
  /reward: 0\.75,/,
  'reward: 0.75,\n      baseRate: 0.50,\n      bonus: 0.25,'
);
code = code.replace(
  /reward: 0\.50,/,
  'reward: 0.50,\n      baseRate: 0.40,\n      bonus: 0.10,'
);
code = code.replace(
  /reward: 2\.00,/,
  'reward: 2.00,\n      baseRate: 1.50,\n      bonus: 0.50,'
);

// Replace reward display in activeTask view
const activeTaskRewardRegex = /<span className="text-emerald-600 font-bold">\\\$\{\activeTask\.reward\.toFixed\(2\)\}<\/span>/g;
code = code.replace(
  activeTaskRewardRegex,
  `<span className="text-emerald-600 font-bold">\${activeTask.reward.toFixed(2)}</span>
                <div className="relative inline-block ml-2 group align-middle">
                  <Info className="w-4 h-4 text-slate-400 cursor-help" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">Base Rate:</span>
                      <span className="font-bold">\${activeTask.baseRate.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Perf. Bonus:</span>
                      <span className="font-bold text-emerald-400">+\${activeTask.bonus.toFixed(2)}</span>
                    </div>
                    <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                </div>`
);

// Replace reward display in task list
const taskListRewardRegex = /<p className="text-xl font-black text-emerald-600">\\\$\{task\.reward\.toFixed\(2\)\}<\/p>/g;
code = code.replace(
  taskListRewardRegex,
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
const historyRewardRegex = /<p className="text-xl font-black text-slate-600">\\\$\{task\.reward\.toFixed\(2\)\}<\/p>/g;
code = code.replace(
  historyRewardRegex,
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
