const fs = require('fs');
let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

// 1. Add state for applications
code = code.replace(
  /const \[completedTasks, setCompletedTasks\] = useState<string\[\]>\(\[\]\);/,
  `const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [applicationStatus, setApplicationStatus] = useState<Record<string, 'pending' | 'accepted'>>({});

  const handleApply = (taskId: string) => {
    setApplicationStatus(prev => ({ ...prev, [taskId]: 'pending' }));
    // Simulate auto-approval after 2 seconds for demo purposes
    setTimeout(() => {
      setApplicationStatus(prev => ({ ...prev, [taskId]: 'accepted' }));
    }, 2000);
  };`
);

// 2. Replace the button logic
const oldButtonLogic = /<button onClick=\{\(\) => setActiveTask\(task\)\} className="w-full bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-purple-600 transition-colors">\s*\{task\.progress > 0 \? "Resume Work" : "Accept & Work"\}\s*<\/button>/g;

const newButtonLogic = `{task.reward >= 100 && applicationStatus[task.id] !== 'accepted' ? (
                    <button 
                      onClick={() => handleApply(task.id)}
                      disabled={applicationStatus[task.id] === 'pending'}
                      className={\`w-full px-6 py-2 rounded-xl text-sm font-bold transition-colors \${applicationStatus[task.id] === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}\`}
                    >
                      {applicationStatus[task.id] === 'pending' ? 'Reviewing...' : 'Apply to Qualify'}
                    </button>
                  ) : (
                    <button onClick={() => setActiveTask(task)} className="w-full bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-purple-600 transition-colors">
                      {task.progress > 0 ? "Resume Work" : "Accept & Work"}
                    </button>
                  )}`;

code = code.replace(oldButtonLogic, newButtonLogic);

fs.writeFileSync('src/components/AILabSection.tsx', code);
