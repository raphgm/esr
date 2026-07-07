const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf-8');

code = code.replace(
  '  skills: string[];',
  '  formalSkills: string[];\n  creatorSkills: string[];\n  skills: string[];'
);

fs.writeFileSync('src/types.ts', code);
console.log('types updated');
