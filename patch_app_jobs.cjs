const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  'import { CareersSection } from "./components/CareersSection";',
  'import { JobsSection } from "./components/JobsSection";'
);

code = code.replace(
  '{activeTab === "careers" && <CareersSection />}',
  '{activeTab === "careers" && <JobsSection userProfile={userProfile} jobs={jobs} onUpdateJobs={setJobs} />}'
);

code = code.replace(
  '<button onClick={() => setActiveTab("careers")} className="hover:text-purple-600 transition-colors uppercase cursor-pointer">Careers</button>',
  '<button onClick={() => setActiveTab("careers")} className="hover:text-purple-600 transition-colors uppercase cursor-pointer">Jobs</button>'
);

code = code.replace(
  '<button onClick={() => setActiveTab("careers")} className={`hover:text-purple-600 transition-colors ${activeTab === "careers" ? "text-purple-600" : ""} uppercase tracking-widest cursor-pointer`}>Careers</button>',
  '<button onClick={() => setActiveTab("careers")} className={`hover:text-purple-600 transition-colors ${activeTab === "careers" ? "text-purple-600" : ""} uppercase tracking-widest cursor-pointer`}>Jobs</button>'
);

fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
