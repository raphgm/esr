const fs = require('fs');
let code = fs.readFileSync('src/components/HomeMarketing.tsx', 'utf8');

code = code.replace(/\{\/\* Icon Container \*\/\}.*?<\/motion\.div>/s, `{/* Icon Container */}
                    <motion.div 
                      animate={activeAnim}
                      className={\`w-14 h-14 rounded-2xl bg-gradient-to-tr \${vert.accentColor} text-white flex items-center justify-center shadow-lg border border-white/20 shrink-0\`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </motion.div>`);

fs.writeFileSync('src/components/HomeMarketing.tsx', code);
