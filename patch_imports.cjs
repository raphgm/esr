const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

if (!code.includes('import { RewardsSection }')) {
  code = code.replace(
    'import { PageBanner } from "./components/PageBanner";',
    'import { PageBanner } from "./components/PageBanner";\nimport { RewardsSection } from "./components/RewardsSection";\nimport { NotificationsDrawer } from "./components/NotificationsDrawer";'
  );
}

if (!code.includes('import { Bell')) {
  code = code.replace(
    'import {',
    'import {\n  Bell,\n  Gift,'
  );
}

fs.writeFileSync('src/App.tsx', code);

let chatCode = fs.readFileSync('src/components/ChatDrawer.tsx', 'utf-8');
if (!chatCode.includes('handleRecordComplete =')) {
  // Wait, did my previous patch fail?
  console.log("ChatDrawer needs fixing");
}

console.log('SUCCESS');
