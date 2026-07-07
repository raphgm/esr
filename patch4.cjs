const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace('<div className="relative z-10 flex flex-col h-full justify-between">', '<div className="relative z-10 flex flex-col h-full justify-center">');
code = code.replace('<div className="mt-auto pt-16">', '<div className="mt-8">');

fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
