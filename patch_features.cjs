const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Imports
code = code.replace(
  'import { PageBanner } from "./components/PageBanner";',
  'import { PageBanner } from "./components/PageBanner";\nimport { RewardsSection } from "./components/RewardsSection";\nimport { NotificationsDrawer } from "./components/NotificationsDrawer";'
);
code = code.replace(
  'X,\n  Search,',
  'X,\n  Search,\n  Bell,\n  Gift,'
);

// State
code = code.replace(
  'const [isProfileOpen, setIsProfileOpen] = useState(false);',
  'const [isProfileOpen, setIsProfileOpen] = useState(false);\n  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);'
);

// Header Bell icon
const headerReplacement = `              <button
                id="btn-trigger-ai-main"`;
const headerNew = `              <button
                onClick={() => setIsNotificationsOpen(true)}
                className="relative bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 p-2 rounded-xl cursor-pointer transition-colors shadow-sm"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button
                id="btn-trigger-ai-main"`;
code = code.replace(headerReplacement, headerNew);

// Nav menu addition
const navReplacement = `{ id: "mobile", label: "Companion App", desc: "Download the EstrR App", icon: Smartphone }`;
const navNew = `{ id: "mobile", label: "Companion App", desc: "Download the EstrR App", icon: Smartphone },
                { id: "rewards", label: "Ambassadors", desc: "Earn Points & Rewards", icon: Gift }`;
code = code.replace(navReplacement, navNew);

// Active Tab logic
const tabReplacement = `{activeTab === "mobile" && (
            <CompanionAppDownload />
          )}`;
const tabNew = `{activeTab === "mobile" && (
            <CompanionAppDownload />
          )}
          {activeTab === "rewards" && (
            <RewardsSection />
          )}`;
code = code.replace(tabReplacement, tabNew);

// Drawer logic
const drawerReplacement = `{/* Profile Config Settings Drawer */}`;
const drawerNew = `{/* Notifications Drawer */}
      <NotificationsDrawer isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      
      {/* Profile Config Settings Drawer */}`;
code = code.replace(drawerReplacement, drawerNew);

// 12 to 13 modules
code = code.replace('12 MODULES', '13 MODULES');
code = code.replace('<p className="text-2xl font-black text-slate-900 tracking-tighter">12+</p>', '<p className="text-2xl font-black text-slate-900 tracking-tighter">13+</p>');

fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
