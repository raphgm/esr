const fs = require('fs');
let code = fs.readFileSync('src/mockData.ts', 'utf-8');

code = code.replace(
  '"https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=300"',
  '"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=300"'
);

code = code.replace(
  '"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300"',
  '"https://images.unsplash.com/photo-1605280263929-1c42c62ef169?auto=format&fit=crop&q=80&w=300"'
);

code = code.replace(
  '"https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=300"',
  '"https://images.unsplash.com/photo-1548550023-2bf3c49b5064?auto=format&fit=crop&q=80&w=300"'
);

fs.writeFileSync('src/mockData.ts', code);
console.log('SUCCESS');
