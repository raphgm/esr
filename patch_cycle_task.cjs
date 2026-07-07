const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

const targetCycle = `<button
                                    onClick={(e) => cycleTaskStatus(e, task.id, task.status)}`;
const replacementCycle = `<button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (!isAuthenticated) {
                                        setAuthMode("signup");
                                        setShowAuthModal(true);
                                      } else {
                                        cycleTaskStatus(e, task.id, task.status);
                                      }
                                    }}`;

code = code.replace(targetCycle, replacementCycle);

fs.writeFileSync('src/App.tsx', code);
console.log('Cycle task patched');
