import re

with open('src/components/ConnectSection.tsx', 'r') as f:
    content = f.read()

state_insert = """  const [isSettingUpProfile, setIsSettingUpProfile] = useState(!userProfile.hasSetupConnectProfile);
  const [setupBio, setSetupBio] = useState(userProfile.bio || "");
  const [setupProfession, setSetupProfession] = useState(userProfile.profession || "");
"""

content = re.sub(r'  const \[activeTab, setActiveTab\] = useState<.*?\(initialSubTab \|\| "feed"\);', state_insert + r'\g<0>', content, flags=re.DOTALL)

render_insert = """  if (isSettingUpProfile) {
    return (
      <div id="connect-section" className="flex flex-col gap-6">
        <PageBanner
          title="ESTARR Professional Hub Setup"
          subtitle="CONNECT & COLLABORATE"
          description="Grow your professional presence by completing your profile."
          icon={Users}
        />
        <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-xl mx-auto w-full shadow-sm">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
              <UserCheck className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-900 leading-tight">Welcome to the Hub</h2>
              <p className="text-sm text-slate-500 mt-1">Let's set up your connect profile first.</p>
            </div>
          </div>
          <form onSubmit={async (e) => {
             e.preventDefault();
             await onUpdateProfile({ ...userProfile, bio: setupBio, profession: setupProfession, hasSetupConnectProfile: true });
             setIsSettingUpProfile(false);
          }} className="flex flex-col gap-5">
             <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Professional Title</label>
                <input 
                  type="text"
                  className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-500 text-sm bg-slate-50 focus:bg-white transition-colors"
                  placeholder="e.g. Content Creator & Strategist"
                  value={setupProfession}
                  onChange={(e) => setSetupProfession(e.target.value)}
                  required
                />
             </div>
             <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Short Bio</label>
                <textarea 
                  className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-500 text-sm bg-slate-50 focus:bg-white transition-colors"
                  rows={4} 
                  placeholder="Tell us about your professional background and what you are looking to achieve..."
                  value={setupBio}
                  onChange={(e) => setSetupBio(e.target.value)}
                  required
                />
             </div>
             <button type="submit" className="bg-purple-600 text-white font-bold py-3.5 rounded-xl hover:bg-purple-700 transition-colors mt-4 flex items-center justify-center gap-2">
               Complete Setup <Check className="w-4 h-4" />
             </button>
          </form>
        </div>
      </div>
    );
  }

"""

content = re.sub(r'  return \(\n    <div id="connect-section"', render_insert + r'  return (\n    <div id="connect-section"', content, flags=re.DOTALL)

with open('src/components/ConnectSection.tsx', 'w') as f:
    f.write(content)
