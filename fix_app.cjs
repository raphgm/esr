const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Find the start index of className={`flex-1 py-1.5 px-2 rounded-full border text-[10px] font-bold tracking-tight transition-all disabled:opacity-60 cursor-pointer ${
let searchStart = `className={\`flex-1 py-1.5 px-2 rounded-full border text-[10px] font-bold tracking-tight transition-all disabled:opacity-60 cursor-pointer \${                                       {authMode === "signup" && (`;
let searchEnd = `<label className="font-mono text-[9px] font-bold text-slate-900 tracking-wide">Email Address</label>`;

let startIdx = code.indexOf(`onClick={() => {
                            setAuthAccountType("jobOwner");
                            if (authMode === "signup") {
                              setHireWizardStep(1); // Return to wizard step 1
                            }
                          }}`);

let endIdx = code.indexOf(`                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] font-bold text-slate-900 tracking-wide">Email Address</label>`, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  let replacement = `onClick={() => {
                            setAuthAccountType("jobOwner");
                            if (authMode === "signup") {
                              setHireWizardStep(1); // Return to wizard step 1
                            }
                          }}
                          className={\`flex-1 py-1.5 px-2 rounded-full border text-[10px] font-bold tracking-tight transition-all disabled:opacity-60 cursor-pointer \${
                            authAccountType === "jobOwner"
                              ? "bg-purple-50 border-purple-500 text-purple-600"
                              : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                          }\`}
                        >
                          Client
                        </button>
                      </div>
                    </div>
                  </div>

                  {authMode === "signup" && (
                    <>
                      <div className="flex flex-col gap-1">
                        <label className="font-mono text-[9px] font-bold text-slate-900 tracking-wide">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-800" />
                          <input
                            type="text"
                            required
                            disabled={isAuthLoading}
                            placeholder="Chinedu Okafor"
                            value={authName}
                            onChange={(e) => setAuthName(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:bg-slate-50 text-slate-900 font-medium disabled:opacity-60"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="font-mono text-[9px] font-bold text-slate-900 tracking-wide">Birthdate *</label>
                          <div className="relative">
                            <Calendar className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-800" />
                            <input
                              type="date"
                              required
                              disabled={isAuthLoading}
                              value={authBirthdate}
                              onChange={(e) => setAuthBirthdate(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-2 py-2 focus:outline-none focus:bg-slate-50 text-slate-900 font-medium text-[10px] disabled:opacity-60"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
`;
  code = code.substring(0, startIdx) + replacement + code.substring(endIdx);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Fixed!");
} else {
  console.log("Indices not found");
}
