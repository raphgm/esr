import re

with open('src/components/AcademySection.tsx', 'r') as f:
    content = f.read()

replacement = """            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/30">
                  Reference Material
                </span>
              </div>
                                          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mb-3 whitespace-nowrap">
                Reference <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Material</span>
              </h1>
              <p className="text-sm lg:text-base text-slate-400 leading-relaxed max-w-xl">
                Prove your skills and earn professional-worthy certifications on your ESTARR profile for free.
              </p>
            </div>"""

content = re.sub(r'<div className="relative z-10 max-w-2xl">.*?</div>', replacement, content, count=1, flags=re.DOTALL)

with open('src/components/AcademySection.tsx', 'w') as f:
    f.write(content)
