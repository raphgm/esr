import re

with open("src/components/HomeMarketing.tsx", "r") as f:
    content = f.read()

# Left Side
content = content.replace('className="lg:col-span-7 bg-slate-50 border border-slate-200 shadow-lg p-8 md:p-12 flex flex-col justify-between relative overflow-hidden"', 'className="lg:col-span-7 bg-slate-50 border border-slate-200 shadow-lg p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"')
content = content.replace('<h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-none text-slate-900 mb-6">', '<h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-none text-slate-900 mb-4">')
content = content.replace('<div className="space-y-4 mb-8 max-w-2xl">', '<div className="space-y-3 mb-6 max-w-2xl">')
content = content.replace('<p className="text-base md:text-lg font-medium leading-relaxed font-sans text-slate-700">', '<p className="text-sm md:text-base font-medium leading-relaxed font-sans text-slate-700">')
content = content.replace('className="relative z-10 flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t-2 border-slate-200/10"', 'className="relative z-10 flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-slate-200/50"')
content = content.replace('className="flex items-center justify-center gap-3 px-4 py-4 sm:py-2 border border-slate-200/10 bg-white"', 'className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 border border-slate-200/50 bg-white"')
content = content.replace('<div className="flex flex-wrap items-center gap-3 mb-6">', '<div className="flex flex-wrap items-center gap-3 mb-4">')

# Right side
content = content.replace('className="lg:col-span-5 bg-orange-500 border border-slate-200 shadow-lg p-8 md:p-12 flex flex-col"', 'className="lg:col-span-5 bg-orange-500 border border-slate-200 shadow-lg p-8 md:p-10 flex flex-col"')
content = content.replace('<div className="mb-10">', '<div className="mb-6">')
content = content.replace('<div className="w-12 h-12 bg-slate-950 text-white flex items-center justify-center mb-6 border border-slate-200 shadow-[4px_4px_0px_white]">', '<div className="w-10 h-10 bg-slate-950 text-white flex items-center justify-center mb-4 border border-slate-200 shadow-[3px_3px_0px_white]">')
content = content.replace('<h3 className="text-4xl font-bold tracking-tight leading-none text-slate-900 mb-4">', '<h3 className="text-3xl font-bold tracking-tight leading-none text-slate-900 mb-3">')
content = content.replace('<p className="text-base font-medium leading-relaxed font-sans text-slate-900/90">', '<p className="text-sm font-medium leading-relaxed font-sans text-slate-900/90">')
content = content.replace('className="bg-white border border-slate-200 p-4 text-base font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-950/20 transition-all rounded-xl shadow-[inset_2px_2px_0px_rgba(0,0,0,0.05)]"', 'className="bg-white border border-slate-200 px-4 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/20 transition-all rounded-xl"')


with open("src/components/HomeMarketing.tsx", "w") as f:
    f.write(content)
