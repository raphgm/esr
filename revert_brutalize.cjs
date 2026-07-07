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
    
    // Replace neo-brutalist shadows back to shadow-sm
    content = content.replace(/shadow-\[2px_2px_0_#3f3f46\]/g, 'shadow-sm');
    content = content.replace(/shadow-\[4px_4px_0_#3f3f46\]/g, 'shadow-md');
    
    // Replace some neo-brutalist styles back
    content = content.replace(/bg-white border-2 border-slate-200/g, 'bg-white border border-slate-200');
    
    // the rounded-none is harder because we don't know what it was before.
    // So we'll try to guess rounded-xl for most things, or rounded-2xl.
    content = content.replace(/rounded-none/g, 'rounded-xl');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  }
});
console.log('Brutalizing revert complete.');
