const fs = require('fs');
let code = fs.readFileSync('src/components/HomeMarketing.tsx', 'utf8');
code = code.replace('<BrainCircuit,\n  Cuboid className="w-5 h-5" />', '<BrainCircuit className="w-5 h-5" />');
fs.writeFileSync('src/components/HomeMarketing.tsx', code);
