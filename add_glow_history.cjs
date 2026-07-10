const fs = require('fs');

let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

const targetStr = `                  <div key={task.id} className="relative bg-gradient-to-br from-slate-50 to-slate-100/80 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between h-full min-h-[220px] overflow-hidden opacity-80">
                    <div>
                      <div className="flex justify-between items-start mb-4">`;

const newStr = `                  <div key={task.id} className="relative bg-gradient-to-br from-slate-50 to-slate-100/80 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between h-full min-h-[220px] overflow-hidden opacity-80">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-200/20 pointer-events-none"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">`;

code = code.replace(targetStr, newStr);

fs.writeFileSync('src/components/AILabSection.tsx', code);
console.log("added history glow");
