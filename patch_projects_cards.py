import re

with open("src/components/ProjectsSection.tsx", "r") as f:
    content = f.read()

# Make card background, padding and shadow better
content = content.replace('className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm flex flex-col gap-2"', 'className="bg-white border-2 border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"')

# Increase priority tag size
content = content.replace('text-[10px] font-bold px-2 py-0.5 rounded-md', 'text-xs font-bold px-2.5 py-1 rounded-md')

# Urgent tag size
content = content.replace('text-[10px] font-bold px-2 py-0.5 rounded-md"', 'text-xs font-bold px-2.5 py-1 rounded-md"')

# Title text size
content = content.replace('className="font-bold text-sm text-slate-800 leading-tight"', 'className="font-bold text-base text-slate-900 leading-tight"')

# Description size
content = content.replace('className="text-xs text-slate-500 line-clamp-3 leading-relaxed"', 'className="text-sm text-slate-600 line-clamp-3 leading-relaxed"')

# Footer text size
content = content.replace('className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1 pt-2 border-t border-slate-50"', 'className="flex items-center justify-between text-xs text-slate-500 font-medium mt-2 pt-3 border-t border-slate-100"')

# Button size
content = content.replace('className="bg-slate-50 hover:bg-slate-100 text-slate-500 text-[10px] font-bold py-1.5 rounded cursor-pointer transition-colors"', 'className="bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold py-2 rounded-lg cursor-pointer transition-colors"')
content = content.replace('className="col-start-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold py-1.5 rounded cursor-pointer transition-colors"', 'className="col-start-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-lg cursor-pointer transition-colors"')

# Top padding for column headers
content = content.replace('className="font-display font-bold text-sm text-slate-800"', 'className="font-display font-bold text-base text-slate-800"')

with open("src/components/ProjectsSection.tsx", "w") as f:
    f.write(content)
