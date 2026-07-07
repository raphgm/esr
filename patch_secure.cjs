const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/className="text-\[8px\] font-mono bg-purple-50 text-purple-600 px-2 py-0.5 rounded font-bold border border-purple-100"/g, 'className="text-[8px] font-mono bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-bold border border-purple-100"');

fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
