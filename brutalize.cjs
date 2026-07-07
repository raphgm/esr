const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    
    // Replace rounded corners with rounded-none
    content = content.replace(/rounded-xl/g, 'rounded-none');
    content = content.replace(/rounded-2xl/g, 'rounded-none');
    content = content.replace(/rounded-lg/g, 'rounded-none');
    content = content.replace(/rounded-md/g, 'rounded-none');
    
    // Replace some shadow-sm with hard neo-brutalist shadows
    content = content.replace(/shadow-sm/g, 'shadow-[2px_2px_0_#3f3f46]');
    content = content.replace(/shadow-md/g, 'shadow-[4px_4px_0_#3f3f46]');
    
    // Replace some bg-white border-slate... with neo-brutalist styles
    content = content.replace(/bg-zinc-900 border border-zinc-800/g, 'bg-zinc-900 border-2 border-zinc-700');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  }
});
console.log('Brutalizing complete.');
