const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  'birthdate: authBirthdate || "1998-07-06"',
  'birthdate: authBirthdate || "1998-07-06",\n      accountType: authAccountType'
);

fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
