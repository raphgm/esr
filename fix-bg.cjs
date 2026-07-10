const fs = require('fs');
let code = fs.readFileSync('src/components/PlatformTools.tsx', 'utf8');

// remove the bg-linear-gradient boxes pattern
code = code.replace(
  /<div className="absolute inset-0 bg-\[linear-gradient[^\n]*\/>/g,
  `<div className="absolute -right-8 -bottom-8 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-500 transform-gpu pointer-events-none group-hover:scale-110">
                <tool.icon className={\`w-48 h-48 \${tool.color}\`} />
              </div>`
);

// wait, the button had `w-10 h-10`, let's make it `w-8 h-8` as intended
code = code.replace(
  /w-10 h-10 rounded-full bg-slate-50/g,
  'w-8 h-8 rounded-full bg-slate-50'
);

fs.writeFileSync('src/components/PlatformTools.tsx', code);
