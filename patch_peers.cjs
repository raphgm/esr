const fs = require('fs');
let code = fs.readFileSync('src/components/ConnectSection.tsx', 'utf-8');

// Fatima
code = code.replace(
  '    skills: [\n      "Baking",\n      "Menu Design",\n      "Food Safety",\n      "WhatsApp Selling",\n      "Event Planning",\n    ],',
  '    formalSkills: ["Culinary Arts", "Food Safety Certification"],\n    creatorSkills: ["Baking", "Menu Design", "WhatsApp Selling", "Event Planning"],\n    skills: [\n      "Baking",\n      "Menu Design",\n      "Food Safety",\n      "WhatsApp Selling",\n      "Event Planning",\n    ],'
);

// Kofi
code = code.replace(
  '    skills: [\n      "Poultry Management",\n      "Broiler Feeds",\n      "Farm Biosecurity",\n      "Vegetable Farming",\n    ],',
  '    formalSkills: ["Agric Science", "Farm Biosecurity"],\n    creatorSkills: ["Poultry Management", "Broiler Feeds", "Vegetable Farming", "Farm Vlogging"],\n    skills: [\n      "Poultry Management",\n      "Broiler Feeds",\n      "Farm Biosecurity",\n      "Vegetable Farming",\n    ],'
);

// Aisha
code = code.replace(
  '    skills: [\n      "Taking Body Measurements",\n      "Pattern Drafting Basics",\n      "Tailoring",\n      "Fabric Sourcing",\n    ],',
  '    formalSkills: ["Fashion Design Certification", "Textile Science"],\n    creatorSkills: ["Tailoring", "Pattern Drafting Basics", "Fabric Sourcing", "Instagram Styling"],\n    skills: [\n      "Taking Body Measurements",\n      "Pattern Drafting Basics",\n      "Tailoring",\n      "Fabric Sourcing",\n    ],'
);

// Also update the Connect Profile card for the logged in user
code = code.replace(
  '{userProfile.skills.length}',
  '{(userProfile.formalSkills?.length || 0) + (userProfile.creatorSkills?.length || 0)}'
);

// Now update the directory skills rendering
// Instead of peer.skills.map, we map formalSkills and creatorSkills
const newSkillRender = `                      <div className="flex flex-col gap-2">
                        {peer.formalSkills && peer.formalSkills.length > 0 && (
                          <div>
                            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest block mb-1">Formal Skills (skill-sch.com)</span>
                            <div className="flex flex-wrap gap-1">
                              {peer.formalSkills.map((skill, sIdx) => (
                                <span key={sIdx} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {peer.creatorSkills && peer.creatorSkills.length > 0 && (
                          <div>
                            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest block mb-1">Creator Skills (EstrR)</span>
                            <div className="flex flex-wrap gap-1">
                              {peer.creatorSkills.map((skill, sIdx) => (
                                <span key={sIdx} className="text-[10px] bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>`;

code = code.replace(
  '                      <div className="flex flex-wrap gap-1">\n                        {peer.skills.map((skill, sIdx) => (\n                          <span\n                            key={sIdx}\n                            className="text-[10px] bg-emerald-50/50 text-emerald-700 border border-emerald-100/30 px-2 py-0.5 rounded-full"\n                          >\n                            {skill}\n                          </span>\n                        ))}\n                      </div>',
  newSkillRender
);

fs.writeFileSync('src/components/ConnectSection.tsx', code);
console.log('ConnectSection updated');
