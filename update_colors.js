const fs = require('fs');

let content = fs.readFileSync('src/components/MarketplaceSection.tsx', 'utf8');

const replacements = [
  ['bg-white', 'bg-slate-900'],
  ['bg-slate-50', 'bg-slate-950'],
  ['bg-slate-100', 'bg-slate-800'],
  ['border-slate-100', 'border-slate-800'],
  ['border-slate-200', 'border-slate-700'],
  ['text-slate-800', 'text-white'],
  ['text-slate-9000', 'text-slate-400'],
  ['text-slate-900', 'text-white'],
  ['text-slate-700', 'text-slate-300'],
  ['text-slate-500', 'text-slate-400'],
  ['bg-emerald-50', 'bg-emerald-500/10'],
  ['border-emerald-100', 'border-emerald-500/20'],
  ['text-emerald-800', 'text-emerald-400'],
  ['text-emerald-700', 'text-emerald-300']
];

replacements.forEach(([from, to]) => {
  content = content.split(from).join(to);
});

fs.writeFileSync('src/components/MarketplaceSection.tsx', content);
