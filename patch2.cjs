const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/via-\$\{borderColor\.replace\('border-', ''\)\}/g, '${borderColor.replace("border-", "via-")}');
fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
