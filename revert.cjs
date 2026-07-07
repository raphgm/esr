const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const colorMap = [
  [/bg-zinc-900/g, 'bg-white'],
  [/bg-zinc-950/g, 'bg-slate-50'],
  [/bg-zinc-800/g, 'bg-slate-100'], // this merges 100/200, which is fine
  [/border-zinc-800/g, 'border-slate-100'], // this merges 50/100, which is fine
  [/border-zinc-700/g, 'border-slate-200'],
  [/border-zinc-600/g, 'border-slate-300'],
  [/text-zinc-50/g, 'text-slate-900'], // merges 950/900
  [/text-zinc-200/g, 'text-slate-800'],
  [/text-zinc-300/g, 'text-slate-700'],
  [/text-zinc-400/g, 'text-slate-500'], // merges 600/500
  [/text-zinc-500/g, 'text-slate-400'],
  [/text-zinc-600/g, 'text-slate-300'],
  [/bg-amber-950/g, 'bg-purple-50'],
  [/bg-amber-900\/50/g, 'bg-purple-100'],
  [/bg-amber-500/g, 'bg-purple-500'],
  [/bg-amber-600/g, 'bg-purple-600'],
  [/bg-amber-700/g, 'bg-purple-700'],
  [/text-amber-200/g, 'text-purple-200'],
  [/text-amber-500/g, 'text-purple-500'],
  [/text-amber-600/g, 'text-purple-700'], // 600->700 approx
  [/text-orange-500/g, 'text-fuchsia-500'],
  [/text-teal-400/g, 'text-emerald-500'],
  [/bg-teal-950/g, 'bg-emerald-50'],
  [/bg-teal-900\/50/g, 'bg-emerald-100'],
  [/bg-teal-500/g, 'bg-emerald-500'],
  [/bg-teal-600/g, 'bg-emerald-600'],
  [/from-amber-600/g, 'from-purple-600'],
  [/via-orange-500/g, 'via-fuchsia-500'],
  [/to-red-600/g, 'to-violet-600'],
  [/from-amber-500/g, 'from-purple-500'],
  [/to-amber-600/g, 'to-purple-600'],
  [/shadow-\[0_0_15px_rgba\(245,158,11,0\.4\)\]/g, 'shadow-[0_0_15px_rgba(168,85,247,0.4)]'],
  [/shadow-\[0_0_25px_rgba\(249,115,22,0\.7\)\]/g, 'shadow-[0_0_25px_rgba(217,70,239,0.7)]']
];

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    colorMap.forEach(([regex, replacement]) => {
      content = content.replace(regex, replacement);
    });
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  }
});
console.log('Revert complete.');
