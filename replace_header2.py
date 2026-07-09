import re

with open('src/components/AcademySection.tsx', 'r') as f:
    content = f.read()

new_header = """              <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mb-3 whitespace-nowrap">
                Prove Your Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Earn Certifications</span>
              </h1>
              <p className="text-sm lg:text-base text-slate-400 leading-relaxed max-w-xl">
                Prove your skills and have professional-worthy certifications on your ESTARR profile.
              </p>"""

content = re.sub(r'<h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mb-3 whitespace-nowrap">\s*Master Deep Tech.*?ESTARR community\.\s*</p>', new_header, content, flags=re.DOTALL)

with open('src/components/AcademySection.tsx', 'w') as f:
    f.write(content)
