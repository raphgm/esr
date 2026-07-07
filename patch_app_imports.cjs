const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Fix Bell and Gift
code = code.replace(
  'import {\n  Bell,\n  Gift, motion } from "motion/react";',
  'import { motion } from "motion/react";'
);

code = code.replace(
  'import {  Plus,  Search,  Trash2,',
  'import {  Bell,  Gift,  Plus,  Search,  Trash2,'
);

// Add missing components
if (!code.includes('import { RewardsSection }')) {
  code = code.replace(
    'import { PageBanner } from "./components/PageBanner";',
    'import { PageBanner } from "./components/PageBanner";\nimport { RewardsSection } from "./components/RewardsSection";\nimport { NotificationsDrawer } from "./components/NotificationsDrawer";'
  );
}

fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
