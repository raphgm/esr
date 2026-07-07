const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  '                  {/* Stream */}\n                  <div className="flex-1 p-6 md:p-8 bg-slate-900 border border-slate-800 text-white shadow-sm flex flex-col justify-between min-h-[220px] rounded-xl">',
  '                  {/* Stream */}\n                  <div className="flex-1 p-6 md:p-8 bg-[#FAF9F6] border border-[#EBE8E0] text-slate-900 shadow-sm flex flex-col justify-between min-h-[220px] rounded-xl">'
);

code = code.replace(
  'const defaultCatColor = "bg-white/10 text-slate-300 border-white/20";',
  'const defaultCatColor = "bg-slate-100 text-slate-500 border-slate-200";'
);

code = code.replace(
  '                                 className={`group cursor-pointer p-4 -mx-4 rounded-xl hover:bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(168,85,247,0.08)] flex justify-between items-center gap-3`}\n                              >\n                                <div className="flex-1 min-w-0">\n                                  <h3 className="text-sm font-bold italic tracking-tight text-white group-hover:text-purple-400 transition-colors truncate">\n                                    {task.title}\n                                  </h3>\n                                  <p className="text-[10px] text-slate-400 truncate mt-0.5">\n                                    {client} • <span className="font-semibold text-white">{budget}</span>',
  '                                 className={`group cursor-pointer p-4 -mx-4 rounded-xl hover:bg-purple-50/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(168,85,247,0.08)] flex justify-between items-center gap-3`}\n                              >\n                                <div className="flex-1 min-w-0">\n                                  <h3 className="text-sm font-bold italic tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors truncate">\n                                    {task.title}\n                                  </h3>\n                                  <p className="text-[10px] text-slate-500 truncate mt-0.5">\n                                    {client} • <span className="font-semibold text-slate-900">{budget}</span>'
);

code = code.replace(
  '                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors border border-transparent hover:border-slate-700"\n                                    title="Cycle Status"\n                                  >\n                                    <FastForward className="w-3.5 h-3.5" />\n                                  </button>',
  '                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-purple-100 text-slate-400 hover:text-purple-600 transition-colors border border-transparent hover:border-purple-200"\n                                    title="Cycle Status"\n                                  >\n                                    <FastForward className="w-3.5 h-3.5" />\n                                  </button>'
);

code = code.replace(
  '                                      <circle\n                                        cx={center}\n                                        cy={center}\n                                        r={radius}\n                                        className="stroke-slate-800 fill-none"\n                                        strokeWidth={strokeWidth}\n                                      />',
  '                                      <circle\n                                        cx={center}\n                                        cy={center}\n                                        r={radius}\n                                        className="stroke-[#EBE8E0] fill-none"\n                                        strokeWidth={strokeWidth}\n                                      />'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Stream section updated');
