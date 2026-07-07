const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add LogOut to lucide-react imports if not there
if (!code.includes('LogOut')) {
  code = code.replace(/import \{([^}]+)\} from "lucide-react";/, 'import {$1, LogOut} from "lucide-react";');
}

// 2. Add Sign Out button
const target = `<button
                id="btn-edit-profile-main"
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 text-left bg-white hover:bg-slate-100 p-1 border border-slate-200 cursor-pointer transition-all pr-3"
              >
                <img src={userProfile.avatar} alt="avatar" className="w-7 h-7 object-cover border border-slate-200" />
                <div className="hidden sm:block text-[10px]">
                  <span className="font-bold text-slate-900 block leading-tight uppercase tracking-tight">{userProfile.name}</span>
                  <span className="text-purple-500 font-bold block leading-tight text-[8px] uppercase tracking-wider">Configure Profile</span>
                </div>
              </button>
            </>`;
            
const replacement = `<button
                id="btn-edit-profile-main"
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 text-left bg-white hover:bg-slate-100 p-1 border border-slate-200 cursor-pointer transition-all pr-3 rounded-xl"
              >
                <img src={userProfile.avatar} alt="avatar" className="w-7 h-7 object-cover border border-slate-200 rounded-lg" />
                <div className="hidden sm:block text-[10px]">
                  <span className="font-bold text-slate-900 block leading-tight uppercase tracking-tight">{userProfile.name}</span>
                  <span className="text-purple-500 font-bold block leading-tight text-[8px] uppercase tracking-wider">Configure Profile</span>
                </div>
              </button>
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setActiveTab("home");
                }}
                className="flex items-center justify-center w-9 h-9 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-500 border border-slate-200 rounded-xl transition-colors shadow-sm"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>`;
            
code = code.replace(target, replacement);
fs.writeFileSync('src/App.tsx', code);
console.log('Sign Out button patched');
