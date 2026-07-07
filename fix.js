const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/        <\/div>\n      <\/div>\n      \)\}/g, '          )}');
fs.writeFileSync('src/App.tsx', code);
