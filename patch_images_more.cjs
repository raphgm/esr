const fs = require('fs');
let code = fs.readFileSync('src/mockData.ts', 'utf-8');

code = code.replace(
  '"https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=300"',
  '"https://images.unsplash.com/photo-1533568853683-1463a5df6371?auto=format&fit=crop&q=80&w=300"'
);

code = code.replace(
  '"https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=300"',
  '"https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=300"'
);

code = code.replace(
  '"https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=300"',
  '"https://images.unsplash.com/photo-1582298538104-03e07d390bb9?auto=format&fit=crop&q=80&w=300"'
);

code = code.replace(
  '"https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=300"',
  '"https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=300"'
);

code = code.replace(
  '"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600"',
  '"https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600"'
);

code = code.replace(
  '"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"',
  '"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"'
);

code = code.replace(
  '"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"',
  '"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"'
);

fs.writeFileSync('src/mockData.ts', code);
console.log('SUCCESS');
