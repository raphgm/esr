const fs = require('fs');
let code = fs.readFileSync('src/components/JobsSection.tsx', 'utf-8');

code = code.replace(
  '            <div>\n              <h3 className="text-xl font-bold font-display text-slate-900">AI-Powered Proof-of-Skills Matcher</h3>\n              <p className="text-sm text-slate-500">Evaluate and hire emerging tech talent based on real projects, not resumes.</p>\n            </div>',
  '            <div>\n              <h3 className="text-xl font-bold font-display text-slate-900">AI-Powered Proof-of-Skills Matcher</h3>\n              <p className="text-sm text-slate-500">Evaluate and hire talent based on real projects, not resumes. Features formal skills from skill-sch.com and creator skills from EstrR.</p>\n            </div>'
);

code = code.replace(
  '                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Capstone Project Evaluated</p>',
  '                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Skill-sch.com Formal Capstone</p>'
);

fs.writeFileSync('src/components/JobsSection.tsx', code);
console.log('JobsSection updated');
