const fs = require('fs');
let code = fs.readFileSync('src/components/PlatformTools.tsx', 'utf8');

code = code.replace(
  /<div \s*key=\{idx\}\s*className="group p-8 bg-white border border-slate-200 rounded-3xl hover:border-purple-500 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl"\s*>\s*<div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">\s*<tool\.icon className="w-24 h-24" \/>\s*<\/div>\s*<div className=\{`w-12 h-12 \$\{tool\.bg\} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`\}>\s*<tool\.icon className=\{`w-6 h-6 \$\{tool\.color\}`\} \/>\s*<\/div>\s*<div className="flex justify-between items-start mb-2">\s*<h3 className="text-lg font-black text-slate-900 uppercase tracking-tight font-display">\s*\{tool\.title\}\s*<\/h3>\s*<span className="text-\[9px\] font-mono font-bold uppercase px-2 py-0\.5 bg-slate-100 text-slate-500 rounded-md">\s*\{tool\.badge\}\s*<\/span>\s*<\/div>\s*<p className="text-slate-500 text-sm leading-relaxed mb-6">\s*\{tool\.desc\}\s*<\/p>\s*<button \s*onClick=\{\(\) => onNavigate\?\.(\(tool\.id\))\}\s*className="flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-purple-600 transition-colors group\/btn"\s*>\s*<span>Access Tool<\/span>\s*<ArrowRight className="w-4 h-4 group-hover\/btn:translate-x-1 transition-transform" \/>\s*<\/button>\s*<\/div>/g,
  `<div 
              key={idx} 
              className={\`group p-8 bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-[2rem] transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1\`}
              style={{ borderColor: \`var(--hover-border)\` }}
            >
              {/* Dynamic hover border via tailwind class manipulation would be tricky, but we can just use group-hover:border-slate-300 */}
              <div className={\`absolute inset-0 bg-gradient-to-br \${tool.bg} to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none\`} />
              
              <div className="absolute -top-10 -right-10 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 group-hover:scale-110 group-hover:-rotate-12 transform-gpu pointer-events-none">
                <tool.icon className={\`w-64 h-64 \${tool.color}\`} />
              </div>
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className={\`w-14 h-14 \${tool.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm border border-white/50\`}>
                  <tool.icon className={\`w-6 h-6 \${tool.color}\`} />
                </div>
                <span className={\`text-[10px] font-mono font-bold uppercase px-3 py-1 bg-white border border-slate-100 shadow-xs \${tool.color} rounded-full\`}>
                  {tool.badge}
                </span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight font-display mb-3 group-hover:text-slate-900 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 group-hover:text-slate-600 transition-colors">
                  {tool.desc}
                </p>
                <button 
                  onClick={() => onNavigate?.(tool.id)}
                  className={\`flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:\${tool.color} transition-colors group/btn\`}
                >
                  <span className="border-b border-transparent group-hover/btn:border-current pb-0.5 transition-all uppercase tracking-widest font-mono">Access Tool</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>`
);

fs.writeFileSync('src/components/PlatformTools.tsx', code);
