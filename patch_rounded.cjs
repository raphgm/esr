const fs = require('fs');

const files = [
  'src/App.tsx',
  'src/components/ProjectsSection.tsx',
  'src/components/AcademySection.tsx',
  'src/components/ConnectSection.tsx'
];

files.forEach(file => {
  let code = fs.readFileSync(file, 'utf-8');
  code = code.replace(/ rounded /g, ' rounded-full ');
  code = code.replace(/ rounded"/g, ' rounded-full"');
  fs.writeFileSync(file, code);
});

console.log('SUCCESS');
