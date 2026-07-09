import re

with open('src/components/AcademySection.tsx', 'r') as f:
    content = f.read()

new_header = """              <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mb-3 whitespace-nowrap">
                Master Deep Tech & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Engineer AI Systems</span>
              </h1>
              <p className="text-sm lg:text-base text-slate-400 leading-relaxed max-w-xl">
                Move seamlessly from theoretical architectures to production-grade deployment. Build formal engineering credentials and learn real-world distributed systems from the top principal engineers in the ESTARR community.
              </p>"""

content = re.sub(r'<h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mb-3 whitespace-nowrap">.*?top artisans in the ESTARR community\.\s*</p>', new_header, content, flags=re.DOTALL)

with open('src/components/AcademySection.tsx', 'w') as f:
    f.write(content)
