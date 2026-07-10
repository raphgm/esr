const fs = require('fs');
let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

code = code.replace(
  /const \[searchQuery, setSearchQuery\] = useState\(""\);/,
  `const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Image Labeling", "Text Analysis", "Audio Transcription", "Survey"];`
);

// Add categories to tasks
code = code.replace(/type: "RLHF",\n      icon: MessageSquare,/g, 'type: "RLHF",\n      category: "Text Analysis",\n      icon: MessageSquare,');
code = code.replace(/type: "Annotation",\n      icon: FileText,/g, 'type: "Annotation",\n      category: "Text Analysis",\n      icon: FileText,');
code = code.replace(/type: "Validation",\n      icon: AlertCircle,/g, 'type: "Validation",\n      category: "Audio Transcription",\n      icon: AlertCircle,');
code = code.replace(/type: "RLHF",\n      icon: ImageIcon,/g, 'type: "RLHF",\n      category: "Image Labeling",\n      icon: ImageIcon,');
code = code.replace(/type: "Survey",\n      icon: BarChart3,/g, 'type: "Survey",\n      category: "Survey",\n      icon: BarChart3,');

// Insert the category filter bar
const controlsRegex = /\{\/\* Controls \*\/\}\s*<div className="p-6 border-b border-slate-100 bg-slate-50\/50 flex flex-col md:flex-row justify-between items-center gap-4">/g;

const withCategoryBar = `{/* Controls */}
        <div className="p-4 border-b border-slate-100 bg-white flex overflow-x-auto scrollbar-none gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={\`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors \${selectedCategory === cat ? 'bg-purple-100 text-purple-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}\`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">`;

code = code.replace(controlsRegex, withCategoryBar);

// Update the filter logic
code = code.replace(
  /tasks\.filter\(t => !completedTasks\.includes\(t\.id\) && t\.title\.toLowerCase\(\)\.includes\(searchQuery\.toLowerCase\(\)\)\)/g,
  `tasks.filter(t => !completedTasks.includes(t.id) && t.title.toLowerCase().includes(searchQuery.toLowerCase()) && (selectedCategory === "All" || t.category === selectedCategory))`
);

fs.writeFileSync('src/components/AILabSection.tsx', code);
