const fs = require('fs');
let code = fs.readFileSync('src/components/ProjectsSection.tsx', 'utf-8');

code = code.replace(
  '                      );\n                    })}\n          </div>',
  '                      );\n                    })}'
);

code = code.replace(
  '              );\n            })}',
  '              );\n            })}\n          </div>'
);

fs.writeFileSync('src/components/ProjectsSection.tsx', code);
console.log('SUCCESS');
