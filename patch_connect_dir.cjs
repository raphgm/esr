const fs = require('fs');

let code = fs.readFileSync('src/components/ConnectSection.tsx', 'utf-8');

const target = `<div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                        <span className="font-mono text-slate-9000 font-bold">
                          {currentRecCount} Endorsements
                        </span>
                        <button
                          id={\`btn-endorse-\${i}\`}
                          onClick={() => handleRecommendPeer(peer)}
                          className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Award className="w-4 h-4 text-emerald-500" /> Endorse
                          Skill
                        </button>
                      </div>`;
                      
const replacement = `<div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                        <span className="font-mono text-slate-9000 font-bold">
                          {currentRecCount} Endorsements
                        </span>
                        <div className="flex gap-3">
                          <button
                            onClick={() => alert(\`Direct message initiated with \${peer.name}.\`)}
                            className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <MessageSquare className="w-4 h-4" /> Message
                          </button>
                          <button
                            id={\`btn-endorse-\${i}\`}
                            onClick={() => handleRecommendPeer(peer)}
                            className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Award className="w-4 h-4 text-emerald-500" /> Endorse
                          </button>
                        </div>
                      </div>`;
                      
code = code.replace(target, replacement);

fs.writeFileSync('src/components/ConnectSection.tsx', code);
console.log('ConnectSection updated');
