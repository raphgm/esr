const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/let borderColor = "via-amber-200";/g, 'let borderColor = "via-amber-400";');
code = code.replace(/borderColor = "via-purple-200";/g, 'borderColor = "via-purple-400";');
code = code.replace(/borderColor = "via-emerald-200";/g, 'borderColor = "via-emerald-400";');
code = code.replace(/borderColor = "via-blue-200";/g, 'borderColor = "via-blue-400";');

code = code.replace(/<div className=\{\`h-\[1px\] w-full bg-gradient-to-r from-transparent \$\{borderColor\} to-transparent opacity-50\`\} \/>/g, 
  '<div className={`h-[2px] w-full bg-gradient-to-r from-transparent ${borderColor} to-transparent opacity-80`} />');

fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
