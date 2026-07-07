import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# 1. Replace Global Background Doodles
old_global_bg = """      {/* Global Background Doodles for empty spaces on wide screens */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Left Side Doodles */}
        <div className="absolute left-[8%] top-[45%] text-emerald-600/20 -rotate-12">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg>
        </div>
        <div className="absolute left-[3%] bottom-[20%] text-blue-500/15 rotate-45">
          <svg width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        </div>
        <div className="absolute left-[10%] bottom-[5%] text-slate-400/20 -rotate-6">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>
        </div>

        {/* Right Side Doodles */}
        <div className="absolute right-[8%] top-[50%] text-orange-500/20 rotate-12">
          <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
        </div>
        <div className="absolute right-[4%] bottom-[15%] text-emerald-600/15 -rotate-45">
          <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
      </div>"""

new_global_bg = """      {/* Global Background Abstract Patterns */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-60">
        <div className="absolute left-[5%] top-[15%] text-orange-500/30">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="30" />
          </svg>
        </div>
        <div className="absolute left-[8%] top-[55%] text-emerald-500/30 -rotate-12">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
            <rect x="20" y="20" width="60" height="60" rx="10" />
          </svg>
        </div>
        <div className="absolute left-[2%] bottom-[15%] text-blue-500/30 rotate-45">
          <svg width="90" height="90" viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50,15 85,85 15,85" />
          </svg>
        </div>

        <div className="absolute right-[6%] top-[25%] text-blue-500/30 rotate-12">
           <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
              <circle cx="50" cy="50" r="40" strokeDasharray="10 10" />
           </svg>
        </div>
        <div className="absolute right-[4%] top-[70%] text-rose-500/30 rotate-[30deg]">
           <svg width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
             <path d="M 20 20 L 80 80 M 80 20 L 20 80" />
           </svg>
        </div>
      </div>"""

content = content.replace(old_global_bg, new_global_bg)

# 2. Replace Hero Left Doodles
old_hero_doodles = """                  {/* Decorative Doodles */}
                  <div className="absolute left-1/2 bottom-8 text-slate-100/80 pointer-events-none rotate-45">
                    <svg width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div className="absolute right-1/4 bottom-1/4 text-orange-500/5 pointer-events-none -rotate-6">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>
                  </div>"""

new_hero_doodles = """                  {/* Decorative Abstract Shapes */}
                  <div className="absolute -right-8 -top-8 text-orange-500/20 pointer-events-none rotate-12 z-0">
                    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                      <circle cx="50" cy="50" r="40" strokeDasharray="8 8" />
                    </svg>
                  </div>
                  <div className="absolute left-1/2 bottom-4 text-emerald-500/20 pointer-events-none -rotate-12 z-0">
                    <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                       <path d="M 20 50 Q 35 20 50 50 T 80 50" />
                       <path d="M 20 70 Q 35 40 50 70 T 80 70" />
                    </svg>
                  </div>
                  <div className="absolute right-1/4 bottom-1/4 text-blue-500/20 pointer-events-none rotate-[15deg] z-0">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
                      <path d="M 50 10 V 90 M 10 50 H 90" />
                    </svg>
                  </div>
                  <div className="absolute left-6 top-1/4 text-rose-500/20 pointer-events-none -rotate-45 z-0">
                    <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor">
                      <polygon points="50,10 90,90 10,90" />
                    </svg>
                  </div>"""

content = content.replace(old_hero_doodles, new_hero_doodles)

with open("src/App.tsx", "w") as f:
    f.write(content)
