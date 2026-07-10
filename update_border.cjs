const fs = require('fs');

let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

code = code.replace(
  `border border-slate-200/60 rounded-3xl p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]`,
  `border border-indigo-100/50 shadow-sm rounded-3xl p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1`
);

code = code.replace(
  `text-sm text-slate-500 line-clamp-2 font-medium`,
  `text-[13px] text-slate-600 line-clamp-2 font-medium leading-relaxed`
);

fs.writeFileSync('src/components/AILabSection.tsx', code);
