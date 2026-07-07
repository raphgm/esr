const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Add components
code = code.replace(
  'import { HowItWorksSection } from "./components/HowItWorksSection";',
  'import { HowItWorksSection } from "./components/HowItWorksSection";\nimport { RewardsSection } from "./components/RewardsSection";\nimport { NotificationsDrawer } from "./components/NotificationsDrawer";'
);

// Add icons
code = code.replace(
  'import {\n  Home,\n  Sparkles,',
  'import {\n  Home,\n  Sparkles,\n  Bell,\n  Gift,'
);

fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
