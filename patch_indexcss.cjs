const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf-8');

code = code.replace('rounded-lg', 'rounded-full');

fs.writeFileSync('src/index.css', code);
console.log('SUCCESS');
