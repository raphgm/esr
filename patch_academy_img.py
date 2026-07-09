import re

with open('src/components/AcademySection.tsx', 'r') as f:
    content = f.read()

replacement = """<div className={`w-full h-full bg-gradient-to-br ${
                          course.category === "AI & ML" ? "from-indigo-600 via-purple-600 to-indigo-900" :
                          course.category === "Web3" ? "from-emerald-600 via-teal-600 to-slate-900" :
                          course.category === "Cloud DevOps" ? "from-cyan-600 via-blue-600 to-slate-900" :
                          "from-slate-800 to-slate-900"
                        } group-hover:scale-105 transition-transform duration-500`} />"""

content = re.sub(r'<img\s+src=\{course\.image\}\s+alt=\{course\.title\}\s+referrerPolicy="no-referrer"\s+className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"\s+/>', replacement, content, flags=re.DOTALL)

with open('src/components/AcademySection.tsx', 'w') as f:
    f.write(content)
