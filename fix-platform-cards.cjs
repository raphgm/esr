const fs = require('fs');
let code = fs.readFileSync('src/components/PlatformTools.tsx', 'utf8');

code = code.replace(
  /<div \s*key=\{idx\}\s*className=\{`group p-8 bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-\[2rem\] transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1`\}\s*style=\{\{ borderColor: `var\(--hover-border\)` \}\}\s*>\s*\{\/\* Dynamic hover border via tailwind class manipulation would be tricky, but we can just use group-hover:border-slate-300 \*\/\}\s*<div className=\{`absolute inset-0 bg-gradient-to-br \$\{tool\.bg\} to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none`\} \/>\s*<div className="absolute -top-10 -right-10 p-6 opacity-\[0\.03\] group-hover:opacity-\[0\.08\] transition-opacity duration-500 group-hover:scale-110 group-hover:-rotate-12 transform-gpu pointer-events-none">\s*<tool\.icon className=\{`w-64 h-64 \$\{tool\.color\}`\} \/>\s*<\/div>\s*<div className="flex justify-between items-start mb-8 relative z-10">\s*<div className=\{`w-14 h-14 \$\{tool\.bg\} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm border border-white\/50`\}>\s*<tool\.icon className=\{`w-6 h-6 \$\{tool\.color\}`\} \/>\s*<\/div>\s*<span className=\{`text-\[10px\] font-mono font-bold uppercase px-3 py-1 bg-white border border-slate-100 shadow-xs \$\{tool\.color\} rounded-full`\}>\s*\{tool\.badge\}\s*<\/span>\s*<\/div>\s*<div className="relative z-10">\s*<h3 className="text-xl font-black text-slate-900 uppercase tracking-tight font-display mb-3 group-hover:text-slate-900 transition-colors">\s*\{tool\.title\}\s*<\/h3>\s*<p className="text-slate-500 text-sm leading-relaxed mb-8 group-hover:text-slate-600 transition-colors">\s*\{tool\.desc\}\s*<\/p>\s*<button \s*onClick=\{\(\) => onNavigate\?\.(\(tool\.id\))\}\s*className=\{`flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:\$\{tool\.color\} transition-colors group\/btn`\}\s*>\s*<span className="border-b border-transparent group-hover\/btn:border-current pb-0\.5 transition-all uppercase tracking-widest font-mono">Access Tool<\/span>\s*<ArrowRight className="w-4 h-4 group-hover\/btn:translate-x-1\.5 transition-transform" \/>\s*<\/button>\s*<\/div>\s*<\/div>/g,
  `<div 
              key={idx} 
              className="group p-8 bg-white border border-slate-200 rounded-[2rem] transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 flex flex-col min-h-[300px] cursor-pointer"
              onClick={() => onNavigate?.(tool.id)}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm relative overflow-hidden">
                  <div className={\`absolute inset-0 \${tool.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500\`} />
                  <tool.icon className={\`w-6 h-6 text-slate-400 group-hover:scale-110 transition-all duration-500 \${tool.color.replace('text-', 'group-hover:text-')} relative z-10\`} />
                </div>
                <span className={\`text-[9px] font-mono font-bold uppercase px-3 py-1 bg-slate-50 border border-slate-200 text-slate-500 rounded-full group-hover:bg-white group-hover:border-slate-300 \${tool.color.replace('text-', 'group-hover:text-')} transition-colors duration-300 shadow-xs flex items-center gap-1.5\`}>
                  {/* Subtle pulsing dot */}
                  <span className={\`w-1.5 h-1.5 rounded-full \${tool.color.replace('text-', 'bg-')} opacity-50 group-hover:opacity-100 animate-pulse\`} />
                  {tool.badge}
                </span>
              </div>
              
              <div className="relative z-10 flex-1">
                <h3 className="text-xl font-black text-slate-900 tracking-tight font-display mb-3">
                  {tool.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-800 transition-colors uppercase tracking-wider">
                  Explore Tool
                </span>
                <div className={\`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 transition-all duration-300 group-hover:-rotate-45 group-hover:scale-110 \${tool.bg.replace('bg-', 'group-hover:bg-')} \${tool.color.replace('text-', 'group-hover:border-')}\`}>
                  <ArrowRight className={\`w-4 h-4 text-slate-400 transition-colors \${tool.color.replace('text-', 'group-hover:text-')}\`} />
                </div>
              </div>
            </div>`
);

fs.writeFileSync('src/components/PlatformTools.tsx', code);
