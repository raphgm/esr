const fs = require('fs');
let code = fs.readFileSync('src/components/PlatformTools.tsx', 'utf8');

code = code.replace(
  /import \{   Zap,   Terminal,   Layers,   Cpu,   Workflow,   ShieldCheck,   Code,   Sparkles,  ArrowRight,  MousePointer2\} from "lucide-react";/,
  `import { Zap, Terminal, Layers, Cpu, Workflow, ShieldCheck, Code, Sparkles, ArrowRight, MousePointer2, Network, LineChart } from "lucide-react";`
);

const newTools = `,  {    id: "connect",    title: "Deal Flow Network",    desc: "Direct integration with top-tier startup deal flows and venture studio opportunities.",    icon: Network,    color: "text-cyan-500",    bg: "bg-cyan-50",    badge: "Exclusive"  },  {    id: "portfolio",    title: "Talent Analytics",    desc: "Deep insights into your market value, skill demand, and interview conversion rates.",    icon: LineChart,    color: "text-orange-500",    bg: "bg-orange-50",    badge: "Data-Driven"  }];`;

code = code.replace(
  /badge: "Scalable"  \}\];/,
  `badge: "Scalable"  }${newTools}`
);

fs.writeFileSync('src/components/PlatformTools.tsx', code);
