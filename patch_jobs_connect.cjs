const fs = require('fs');

let code = fs.readFileSync('src/components/JobsSection.tsx', 'utf-8');

// Add MessageSquare icon import if missing
if (!code.includes('MessageSquare')) {
  code = code.replace(/import \{ ([^}]+) \} from "lucide-react";/, 'import { $1, MessageSquare } from "lucide-react";');
}

// Modify talentPool rendering to include an invite/message button
const target = `<div className="mt-4 flex items-center gap-1 text-xs text-purple-600 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" /> {talent.status}
                </div>
              </div>`;
              
const replacement = `<div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-purple-600 font-bold">
                    <CheckCircle className="w-3.5 h-3.5" /> {talent.status}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(\`Invite sent to \${talent.name} for an interview based on their capstone project.\`);
                    }}
                    className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Invite
                  </button>
                </div>
              </div>`;

code = code.replace(target, replacement);

fs.writeFileSync('src/components/JobsSection.tsx', code);
console.log('JobsSection updated');
