import re

with open('src/components/AcademySection.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block mb-1">Globally Recognized</span>\n                  <span className="text-xl font-black text-white">Certifications</span>',
    '<span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block mb-1">Estarr Recognised</span>\n                  <span className="text-lg font-black text-white leading-tight">Interview Ready Certifications</span>'
)

with open('src/components/AcademySection.tsx', 'w') as f:
    f.write(content)
