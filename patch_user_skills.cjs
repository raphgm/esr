const fs = require('fs');
let code = fs.readFileSync('src/components/ConnectSection.tsx', 'utf-8');

const skillsUI = `            <div className="w-full pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-center">
              <div>
                <span className="block font-mono font-bold text-lg text-slate-700">
                  {userProfile.recommends}
                </span>
                <span className="text-[10px] text-slate-9000 uppercase tracking-wider">
                  Endorsements
                </span>
              </div>
              <div>
                <span className="block font-mono font-bold text-lg text-slate-700">
                  {(userProfile.formalSkills?.length || 0) + (userProfile.creatorSkills?.length || 0)}
                </span>
                <span className="text-[10px] text-slate-9000 uppercase tracking-wider">
                  Skills
                </span>
              </div>
            </div>
            <div className="w-full pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3 text-left">
              {userProfile.formalSkills && userProfile.formalSkills.length > 0 && (
                <div>
                  <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest block mb-1">Formal Skills (skill-sch.com)</span>
                  <div className="flex flex-wrap gap-1">
                    {userProfile.formalSkills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {userProfile.creatorSkills && userProfile.creatorSkills.length > 0 && (
                <div>
                  <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest block mb-1">Creator Skills (EstrR)</span>
                  <div className="flex flex-wrap gap-1">
                    {userProfile.creatorSkills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>`;

code = code.replace(
  '            <div className="w-full pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-center">\n              <div>\n                <span className="block font-mono font-bold text-lg text-slate-700">\n                  {userProfile.recommends}\n                </span>\n                <span className="text-[10px] text-slate-9000 uppercase tracking-wider">\n                  Endorsements\n                </span>\n              </div>\n              <div>\n                <span className="block font-mono font-bold text-lg text-slate-700">\n                  {(userProfile.formalSkills?.length || 0) + (userProfile.creatorSkills?.length || 0)}\n                </span>\n                <span className="text-[10px] text-slate-9000 uppercase tracking-wider">\n                  Skills Showcase\n                </span>\n              </div>\n            </div>',
  skillsUI
);

fs.writeFileSync('src/components/ConnectSection.tsx', code);
console.log('User skills added to side panel');
