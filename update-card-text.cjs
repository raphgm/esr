const fs = require('fs');
let code = fs.readFileSync('src/components/PlatformTools.tsx', 'utf8');

code = code.replace(
  /className="text-base font-black text-slate-900 tracking-tight font-display mb-1\.5"/g,
  'className="text-[15px] font-black text-slate-900 tracking-tight font-display mb-1"'
);

code = code.replace(
  /className="text-slate-500 text-\[11px\] leading-relaxed"/g,
  'className="text-slate-500 text-[11px] leading-relaxed font-medium"'
);

fs.writeFileSync('src/components/PlatformTools.tsx', code);
