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
  [/bg-white/g, 'bg-zinc-900'],
  [/bg-slate-50\b/g, 'bg-zinc-950'],
  [/bg-slate-100/g, 'bg-zinc-800'],
  [/bg-slate-200/g, 'bg-zinc-800'],
  [/border-slate-50\b/g, 'border-zinc-800'],
  [/border-slate-100/g, 'border-zinc-800'],
  [/border-slate-200/g, 'border-zinc-700'],
  [/border-slate-300/g, 'border-zinc-600'],
  [/text-slate-950/g, 'text-zinc-50'],
  [/text-slate-900/g, 'text-zinc-50'],
  [/text-slate-800/g, 'text-zinc-200'],
  [/text-slate-700/g, 'text-zinc-300'],
  [/text-slate-600/g, 'text-zinc-400'],
  [/text-slate-500/g, 'text-zinc-400'],
  [/text-slate-400/g, 'text-zinc-500'],
  [/text-slate-300/g, 'text-zinc-600'],
  [/bg-purple-50\b/g, 'bg-amber-950'],
  [/bg-purple-100/g, 'bg-amber-900/50'],
  [/bg-purple-500/g, 'bg-amber-500'],
  [/bg-purple-600/g, 'bg-amber-600'],
  [/bg-purple-700/g, 'bg-amber-700'],
  [/text-purple-200/g, 'text-amber-200'],
  [/text-purple-500/g, 'text-amber-500'],
  [/text-purple-600/g, 'text-amber-500'],
  [/text-purple-700/g, 'text-amber-600'],
  [/text-fuchsia-500/g, 'text-orange-500'],
  [/text-fuchsia-600/g, 'text-orange-500'],
  [/text-emerald-500/g, 'text-teal-400'],
  [/bg-emerald-50\b/g, 'bg-teal-950'],
  [/bg-emerald-100/g, 'bg-teal-900/50'],
  [/bg-emerald-500/g, 'bg-teal-500'],
  [/bg-emerald-600/g, 'bg-teal-600'],
  [/from-purple-600/g, 'from-amber-600'],
  [/via-fuchsia-500/g, 'via-orange-500'],
  [/to-violet-600/g, 'to-red-600'],
  [/from-purple-500/g, 'from-amber-500'],
  [/to-purple-600/g, 'to-amber-600'],
  [/shadow-\[0_0_15px_rgba\(168,85,247,0\.4\)\]/g, 'shadow-[0_0_15px_rgba(245,158,11,0.4)]'],
  [/shadow-\[0_0_25px_rgba\(217,70,239,0\.7\)\]/g, 'shadow-[0_0_25px_rgba(249,115,22,0.7)]']
];

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    
    // 1. Re-apply color mapping
    colorMap.forEach(([regex, replacement]) => {
      content = content.replace(regex, replacement);
    });
    
    // 2. Re-apply brutalism (hard edges and shadows)
    content = content.replace(/rounded-xl/g, 'rounded-none');
    content = content.replace(/rounded-2xl/g, 'rounded-none');
    content = content.replace(/rounded-lg/g, 'rounded-none');
    content = content.replace(/rounded-md/g, 'rounded-none');
    
    content = content.replace(/shadow-sm/g, 'shadow-[2px_2px_0_#3f3f46]');
    content = content.replace(/shadow-md/g, 'shadow-[4px_4px_0_#3f3f46]');
    
    content = content.replace(/bg-zinc-900 border border-zinc-800/g, 'bg-zinc-900 border-2 border-zinc-700');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  }
});
console.log('Dark mode and brutalism re-applied successfully.');
