const fs = require('fs');
let code = fs.readFileSync('src/components/ProjectsSection.tsx', 'utf-8');

const categoryColorsCode = `
                      const categoryColors: Record<string, string> = {
                        marketing: "bg-pink-50 text-pink-600 border-pink-200",
                        dev: "bg-cyan-50 text-cyan-600 border-cyan-200",
                        design: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200",
                      };
                      const defaultCatColor = "bg-slate-50 text-slate-600 border-slate-200";
                      const categoryClass = task.category ? categoryColors[task.category] || defaultCatColor : "";
`;

code = code.replace(
  'const isDueSoon = task.dueDate && task.status !== "done" ? (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60) <= 48 : false;',
  `const isDueSoon = task.dueDate && task.status !== "done" ? (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60) <= 48 : false;${categoryColorsCode}`
);

const renderCatCode = `
                              {task.category && (
                                <span className={\`text-[9px] font-mono font-bold uppercase px-2 py-1 rounded-lg border \${categoryClass}\`}>
                                  {task.category}
                                </span>
                              )}
`;

code = code.replace(
  '{isDueSoon && (',
  `${renderCatCode}\n                              {isDueSoon && (`
);

fs.writeFileSync('src/components/ProjectsSection.tsx', code);
console.log('SUCCESS');
