const fs = require('fs');

let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

const targetStr = `              <div>
                <div className="flex justify-between items-start mb-4">`;

const newStr = `              {/* Decorative Background Elements */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:from-indigo-500/20 group-hover:to-purple-500/20 group-hover:scale-150 transition-all duration-500"></div>
              <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-full blur-xl group-hover:from-blue-500/20 group-hover:to-indigo-500/20 group-hover:scale-150 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">`;

code = code.replace(targetStr, newStr);

const targetEndStr = `                <p className="text-sm text-slate-500 line-clamp-2">{task.description}</p>
              </div>`;
const newEndStr = `                <p className="text-sm text-slate-500 line-clamp-2 font-medium">{task.description}</p>
              </div>`;

code = code.replace(targetEndStr, newEndStr);

const targetTitle = `                <h3 className="text-lg font-black text-slate-900 mb-3 line-clamp-2 leading-tight">{task.title}</h3>`;
const newTitle = `                <h3 className="text-[19px] font-black text-slate-900 mb-3 line-clamp-2 leading-tight tracking-tight group-hover:text-indigo-900 transition-colors">{task.title}</h3>`;

code = code.replace(targetTitle, newTitle);

fs.writeFileSync('src/components/AILabSection.tsx', code);
console.log("added glow");
