const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  'const [authBirthdate, setAuthBirthdate] = useState("");',
  'const [authBirthdate, setAuthBirthdate] = useState("");\n  const [authAccountType, setAuthAccountType] = useState<"freelancer" | "jobOwner">("freelancer");'
);

const accountTypeSelector = `
                  <div className="flex flex-col gap-1.5 mt-2">
                    <label className="font-mono text-[10px] font-bold text-slate-900 font-medium tracking-wide">Account Type *</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setAuthAccountType("freelancer")}
                        className={\`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all \${authAccountType === "freelancer" ? "bg-purple-100 border-purple-500 text-purple-700" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"}\`}
                      >
                        Freelancer
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthAccountType("jobOwner")}
                        className={\`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all \${authAccountType === "jobOwner" ? "bg-purple-100 border-purple-500 text-purple-700" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"}\`}
                      >
                        Job Owner
                      </button>
                    </div>
                  </div>
`;

code = code.replace(
  '<label className="font-mono text-[10px] font-bold text-slate-900 font-medium tracking-wide">Birthdate * (For EstrR Birthdays!)</label>',
  accountTypeSelector + '\n                  <div className="mt-2" />\n                  <label className="font-mono text-[10px] font-bold text-slate-900 font-medium tracking-wide">Birthdate * (For EstrR Birthdays!)</label>'
);

fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
