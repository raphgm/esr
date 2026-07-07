const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add isSidebarHidden logic before return
const targetReturn = `  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-purple-600 selection:text-white relative overflow-hidden">`;
    
const replacementReturn = `  const isSidebarHidden = !isAuthenticated && activeTab === "home";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-purple-600 selection:text-white relative overflow-hidden">`;
    
code = code.replace(targetReturn, replacementReturn);

// 2. Hide sidebar conditionally
const targetSidebar = `<nav className="lg:col-span-3 flex flex-col gap-4 bg-white border border-slate-200 p-4 h-fit shadow-xs rounded-xl">`;
const replacementSidebar = `{!isSidebarHidden && (<nav className="lg:col-span-3 flex flex-col gap-4 bg-white border border-slate-200 p-4 h-fit shadow-xs rounded-xl">`;
code = code.replace(targetSidebar, replacementSidebar);

const targetSidebarEnd = `          })}
        </nav>`;
const replacementSidebarEnd = `          })}
        </nav>)}`;
code = code.replace(targetSidebarEnd, replacementSidebarEnd);

// 3. Adjust main width
const targetMain = `<main className="lg:col-span-9 flex flex-col gap-6 min-h-[500px]">`;
const replacementMain = `<main className={\`\${isSidebarHidden ? "lg:col-span-12" : "lg:col-span-9"} flex flex-col gap-6 min-h-[500px]\`}>`;
code = code.replace(targetMain, replacementMain);

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx layout patched');
