const fs = require('fs');
let code = fs.readFileSync('src/components/ConnectSection.tsx', 'utf-8');

const target = `<div className="flex gap-3 items-start">
                        <img
                          src={peer.avatar}
                          alt={peer.name}
                          className="w-12 h-12 rounded-full object-cover border border-emerald-500/20"
                        />
                        <div>
                          <h4 className="font-display font-bold text-sm text-slate-800">
                            {peer.name}
                          </h4>
                          <p className="text-xs text-emerald-600 font-medium">
                            {peer.profession}
                          </p>
                          <div className="flex items-center gap-1.5 text-slate-9000 text-[10px] mt-1 font-mono">
                            <MapPin className="w-3 h-3 text-slate-300" />
                            <span>{peer.location}</span>
                          </div>
                        </div>
                      </div>`;
                      
const replacement = `<div className="flex gap-3 items-start justify-between w-full">
                        <div className="flex gap-3 items-start">
                          <img
                            src={peer.avatar}
                            alt={peer.name}
                            className="w-12 h-12 rounded-full object-cover border border-emerald-500/20"
                          />
                          <div>
                            <h4 className="font-display font-bold text-sm text-slate-800">
                              {peer.name}
                            </h4>
                            <p className="text-xs text-emerald-600 font-medium">
                              {peer.profession}
                            </p>
                            <div className="flex items-center gap-1.5 text-slate-9000 text-[10px] mt-1 font-mono">
                              <MapPin className="w-3 h-3 text-slate-300" />
                              <span>{peer.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          <span className="text-[9px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold uppercase tracking-widest border border-amber-200">
                            Available for Hire
                          </span>
                          <button
                            onClick={() => alert(\`Direct connection request sent to \${peer.name} for a potential gig.\`)}
                            className="text-[10px] bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg font-bold transition-colors shadow-sm"
                          >
                            Quick Connect
                          </button>
                        </div>
                      </div>`;
                      
code = code.replace(target, replacement);

fs.writeFileSync('src/components/ConnectSection.tsx', code);
console.log('ConnectSection updated');
