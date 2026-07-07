const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  '<h3 className="text-sm font-bold italic tracking-tight group-hover:text-purple-500 transition-colors truncate">',
  '<h3 className="text-sm font-bold italic tracking-tight text-white group-hover:text-purple-400 transition-colors truncate">'
);

// We might have multiple of these if they were generated in a loop, but it's a loop so it's a single JSX element.
code = code.replace(
  '<p className="text-[10px] text-slate-500 truncate mt-0.5">',
  '<p className="text-[10px] text-slate-400 truncate mt-0.5">'
);

code = code.replace(
  '<span className="font-semibold text-slate-900">{budget}</span>',
  '<span className="font-semibold text-white">{budget}</span>'
);

code = code.replace(
  'hover:bg-slate-50',
  'hover:bg-white/5'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Pipeline text patched.');
