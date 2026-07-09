import re

with open('src/components/AcademySection.tsx', 'r') as f:
    content = f.read()

replacement_grid = """            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto shrink-0">
              {/* Stats Block 1 */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-emerald-500/20 p-2.5 rounded-xl">
                    <Award className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block mb-1">Globally Recognized</span>
                  <span className="text-xl font-black text-white">Certifications</span>
                </div>
              </div>

              {/* Stats Block 2 */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-500/20 p-2.5 rounded-xl">
                    <Check className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Free forever</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block mb-1">Active Students</span>
                  <span className="text-2xl font-black text-white">45,000+</span>
                </div>
              </div>
            </div>"""

content = re.sub(r'<div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto shrink-0">.*?</div>\s*</div>\s*</div>', replacement_grid + '\n          </div>', content, flags=re.DOTALL)

with open('src/components/AcademySection.tsx', 'w') as f:
    f.write(content)
