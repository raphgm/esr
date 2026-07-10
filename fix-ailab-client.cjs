const fs = require('fs');
let code = fs.readFileSync('src/components/AILabClientSection.tsx', 'utf8');

code = code.replace(/id: \\\`hit-\\\$\\{Date\\.now\\(\\)\\}\\\`,/g, 'id: `hit-${Date.now()}`,');
// Actually, let's just do a simpler replace:
code = code.replace(/id: \\\`hit-\\\$\\{Date\.now\(\)\}\\\`,/, 'id: `hit-${Date.now()}`,');

// Also, need to fix the src template literal: src={\`https://i.pravatar.cc/150?u=\${activeTask.id}-\${i}\`}
code = code.replace(/src=\{\\\`https:\/\/i\.pravatar\.cc\/150\?u=\\\$\\{activeTask\.id\\}-\\\$\\{i\\}\\\`\}/g, 'src={`https://i.pravatar.cc/150?u=${activeTask.id}-${i}`}');

// Also the activeTab classNames: className={\`px-4 py-2 ...
code = code.replace(/className=\{\\\`px-4 py-2/g, 'className={`px-4 py-2');
code = code.replace(/\}\\\`\}/g, '}`}');

// Also the icon color classNames
code = code.replace(/className=\{\\\`p-4/g, 'className={`p-4');

fs.writeFileSync('src/components/AILabClientSection.tsx', code);
