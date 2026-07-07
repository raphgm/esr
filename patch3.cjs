const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/let borderColor = "border-amber-200";/g, 'let borderColor = "via-amber-200";');
code = code.replace(/borderColor = "border-purple-200";/g, 'borderColor = "via-purple-200";');
code = code.replace(/borderColor = "border-emerald-200";/g, 'borderColor = "via-emerald-200";');
code = code.replace(/borderColor = "border-blue-200";/g, 'borderColor = "via-blue-200";');
code = code.replace(/\$\{borderColor\.replace\("border-", "via-"\)\}/g, '${borderColor}');

fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
