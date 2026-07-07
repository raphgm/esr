const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

const targetProjectClick = `                              <div 
                                onClick={() => setActiveTab("projects")} 
                                className={\`group cursor-pointer p-4 -mx-4 rounded-xl hover:bg-purple-50/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(168,85,247,0.08)] flex justify-between items-center gap-3\`}`;
const replacementProjectClick = `                              <div 
                                onClick={() => {
                                  if (!isAuthenticated) {
                                    setAuthMode("signup");
                                    setShowAuthModal(true);
                                  } else {
                                    setActiveTab("projects");
                                  }
                                }} 
                                className={\`group cursor-pointer p-4 -mx-4 rounded-xl hover:bg-purple-50/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(168,85,247,0.08)] flex justify-between items-center gap-3\`}`;

code = code.replace(targetProjectClick, replacementProjectClick);

const targetFooter = `<button onClick={() => setActiveTab("about")} className="hover:text-purple-500 transition-colors uppercase cursor-pointer">About Us</button>
            <button onClick={() => setActiveTab("how-it-works")} className="hover:text-purple-500 transition-colors uppercase cursor-pointer">How It Works</button>
            <button onClick={() => setActiveTab("teams")} className="hover:text-purple-500 transition-colors uppercase cursor-pointer">Teams</button>
            <button onClick={() => setActiveTab("careers")} className="hover:text-purple-500 transition-colors uppercase cursor-pointer">Jobs</button>`;
const replacementFooter = `<button onClick={() => { if(!isAuthenticated) { setAuthMode("signup"); setShowAuthModal(true); } else { setActiveTab("about"); } }} className="hover:text-purple-500 transition-colors uppercase cursor-pointer">About Us</button>
            <button onClick={() => { if(!isAuthenticated) { setAuthMode("signup"); setShowAuthModal(true); } else { setActiveTab("how-it-works"); } }} className="hover:text-purple-500 transition-colors uppercase cursor-pointer">How It Works</button>
            <button onClick={() => { if(!isAuthenticated) { setAuthMode("signup"); setShowAuthModal(true); } else { setActiveTab("teams"); } }} className="hover:text-purple-500 transition-colors uppercase cursor-pointer">Teams</button>
            <button onClick={() => { if(!isAuthenticated) { setAuthMode("signup"); setShowAuthModal(true); } else { setActiveTab("careers"); } }} className="hover:text-purple-500 transition-colors uppercase cursor-pointer">Jobs</button>`;
            
code = code.replace(targetFooter, replacementFooter);

fs.writeFileSync('src/App.tsx', code);
console.log('More buttons patched');
