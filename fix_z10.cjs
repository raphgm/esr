const fs = require('fs');
let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

code = code.replace(
  `<div className="mt-6 pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">`,
  `<div className="relative z-10 mt-6 pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">`
);

fs.writeFileSync('src/components/AILabSection.tsx', code);
