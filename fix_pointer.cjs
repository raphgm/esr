const fs = require('fs');
let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

code = code.replace(
  `from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl`,
  `from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none`
);
code = code.replace(
  `from-blue-500/10 to-indigo-500/10 rounded-full blur-xl`,
  `from-blue-500/10 to-indigo-500/10 rounded-full blur-xl pointer-events-none`
);

fs.writeFileSync('src/components/AILabSection.tsx', code);
