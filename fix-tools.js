const fs = require('fs');
let code = fs.readFileSync('src/components/PlatformTools.tsx', 'utf8');

// Replace imports
code = code.replace(
  'import React from "react";import {   Zap,   Terminal,   Layers,   Cpu,   Workflow,   ShieldCheck,   Code,   Sparkles,  ArrowRight,  MousePointer2} from "lucide-react";',
  'import React from "react";\nimport { Zap, Terminal, Layers, Cpu, Workflow, ShieldCheck, Code, Sparkles, ArrowRight, MousePointer2, Network, LineChart } from "lucide-react";'
);

// We need to find `badge: "Scalable"\n  }\n];` or whatever whitespace it is.
code = code.replace(
  /badge:\s*"Scalable"\s*\}\s*\];/,
  `badge: "Scalable"
  },
  {
    id: "network",
    title: "Deal Flow Network",
    desc: "Direct integration with top-tier startup deal flows and venture studio opportunities.",
    icon: Network,
    color: "text-cyan-500",
    bg: "bg-cyan-50",
    badge: "Exclusive"
  },
  {
    id: "analytics",
    title: "Talent Analytics",
    desc: "Deep insights into your market value, skill demand, and interview conversion rates.",
    icon: LineChart,
    color: "text-orange-500",
    bg: "bg-orange-50",
    badge: "Data-Driven"
  }
];`
);

fs.writeFileSync('src/components/PlatformTools.tsx', code);
