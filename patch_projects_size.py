with open("src/components/ProjectsSection.tsx", "r") as f:
    content = f.read()

# Make the column header text larger
content = content.replace('<h4 className="font-display font-bold text-xs text-slate-800">', '<h4 className="font-display font-bold text-sm text-slate-800">')
content = content.replace('<span className="font-mono text-[10px] text-slate-400 font-bold">', '<span className="font-mono text-xs text-slate-400 font-bold">')

# Make priority tags larger
content = content.replace('text-[9px] font-bold px-2 py-0.5 rounded-md', 'text-[10px] font-bold px-2 py-0.5 rounded-md')

# Make task title larger
content = content.replace('<h5 className="font-bold text-xs text-slate-800 leading-tight">', '<h5 className="font-bold text-sm text-slate-800 leading-tight">')

# Make task description larger
content = content.replace('<p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">', '<p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">')

# Make bottom date/user larger
content = content.replace('className="flex items-center justify-between text-[9px] text-slate-400 font-mono mt-1 pt-2 border-t border-slate-50"', 'className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1 pt-2 border-t border-slate-50"')

# Make buttons larger
content = content.replace('className="bg-slate-50 hover:bg-slate-100 text-slate-500 text-[9px] font-bold py-1 rounded cursor-pointer transition-colors"', 'className="bg-slate-50 hover:bg-slate-100 text-slate-500 text-[10px] font-bold py-1.5 rounded cursor-pointer transition-colors"')
content = content.replace('className="col-start-2 bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-bold py-1 rounded cursor-pointer transition-colors"', 'className="col-start-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold py-1.5 rounded cursor-pointer transition-colors"')

with open("src/components/ProjectsSection.tsx", "w") as f:
    f.write(content)
