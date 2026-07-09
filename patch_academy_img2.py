import re

with open('src/components/AcademySection.tsx', 'r') as f:
    content = f.read()

replacement = """<div className={`w-16 h-16 rounded-xl shrink-0 border border-slate-200 bg-gradient-to-br ${
                purchasingCourse.category === "AI & ML" ? "from-indigo-600 via-purple-600 to-indigo-900" :
                purchasingCourse.category === "Web3" ? "from-emerald-600 via-teal-600 to-slate-900" :
                purchasingCourse.category === "Cloud DevOps" ? "from-cyan-600 via-blue-600 to-slate-900" :
                "from-slate-800 to-slate-900"
              }`} />"""

content = re.sub(r'<img\s+src=\{purchasingCourse\.image\}\s+alt=\{purchasingCourse\.title\}\s+className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"\s+/>', replacement, content, flags=re.DOTALL)

with open('src/components/AcademySection.tsx', 'w') as f:
    f.write(content)
