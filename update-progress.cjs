const fs = require('fs');
let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

// Add progress field to tasks
code = code.replace(/description: "Read a prompt and two AI responses. Rate which response is more helpful, harmless, and honest."/g, 'description: "Read a prompt and two AI responses. Rate which response is more helpful, harmless, and honest.",\n      progress: 40');
code = code.replace(/description: "Review Python and JavaScript code snippets and classify potential security vulnerabilities."/g, 'description: "Review Python and JavaScript code snippets and classify potential security vulnerabilities.",\n      progress: 15');
code = code.replace(/description: "Listen to a 10-second audio clip and correct any errors in the AI-generated transcription."/g, 'description: "Listen to a 10-second audio clip and correct any errors in the AI-generated transcription.",\n      progress: 80');
code = code.replace(/description: "Look at AI-generated images and rate them on a scale of 1-5 for photorealism and prompt alignment."/g, 'description: "Look at AI-generated images and rate them on a scale of 1-5 for photorealism and prompt alignment.",\n      progress: 5');
code = code.replace(/description: "Answer a 10-question multiple choice survey regarding your preferred tech stacks and deployment tools."/g, 'description: "Answer a 10-question multiple choice survey regarding your preferred tech stacks and deployment tools.",\n      progress: 70');

// Add the progress bar beneath the button
const buttonRegex = /<button onClick=\{\(\) => setActiveTask\(task\)\} className="flex-1 md:flex-none bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-purple-600 transition-colors ml-auto md:ml-0">\s*Accept & Work\s*<\/button>/g;

const buttonWithProgress = `
<div className="flex-1 md:flex-none w-full md:w-auto">
                  <button onClick={() => setActiveTask(task)} className="w-full bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-purple-600 transition-colors">
                    {task.progress > 0 ? "Resume Work" : "Accept & Work"}
                  </button>
                  {task.progress !== undefined && task.progress > 0 && (
                    <div className="mt-3 w-full">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mb-1.5 uppercase">
                        <span>{task.progress}% Done</span>
                        <span className="text-emerald-500">\${((task.reward * task.progress) / 100).toFixed(2)} Earned</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: \`\${task.progress}%\` }}></div>
                      </div>
                    </div>
                  )}
                  </div>
`;

code = code.replace(buttonRegex, buttonWithProgress);

fs.writeFileSync('src/components/AILabSection.tsx', code);
