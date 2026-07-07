const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  'marketing: "bg-pink-50 text-pink-600 border-pink-200"',
  'marketing: "bg-pink-500/10 text-pink-400 border-pink-500/20"'
);

code = code.replace(
  'dev: "bg-cyan-50 text-cyan-600 border-cyan-200"',
  'dev: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"'
);

code = code.replace(
  'design: "bg-fuchsia-50 text-fuchsia-500 border-fuchsia-200"',
  'design: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20"'
);

code = code.replace(
  'const defaultCatColor = "bg-slate-50 text-slate-500 border-slate-200";',
  'const defaultCatColor = "bg-white/10 text-slate-300 border-white/20";'
);

code = code.replace(
  'hover:bg-slate-50 transition-all',
  'hover:bg-white/5 transition-all'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Pipeline categories patched.');
