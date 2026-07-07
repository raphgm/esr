import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# I will add fixed background doodles to the main min-h-screen div
main_div = '<div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-orange-500 selection:text-white border-4 md:border-8 border-slate-200 relative overflow-hidden">'
if main_div not in content:
    main_div_fallback = '<div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-orange-500 selection:text-white border-4 md:border-8 border-slate-200">'
    content = content.replace(main_div_fallback, main_div)

doodles = """      {/* Global Background Doodles for empty spaces on wide screens */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left Side Doodles */}
        <div className="absolute left-[5%] top-[15%] text-orange-500/20 rotate-12">
          <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
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
        <div className="absolute right-[5%] top-[20%] text-blue-500/15 -rotate-12">
          <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <div className="absolute right-[8%] top-[50%] text-orange-500/20 rotate-12">
          <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
        </div>
        <div className="absolute right-[4%] bottom-[15%] text-emerald-600/15 -rotate-45">
          <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
      </div>
"""

# Insert doodles after the auth modal
if "{showAuthModal && (" in content:
    content = content.replace("{showAuthModal && (", doodles + "\n      {showAuthModal && (")
else:
    # Just insert after the main div
    content = content.replace(main_div, main_div + "\n" + doodles)

with open("src/App.tsx", "w") as f:
    f.write(content)
