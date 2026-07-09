import re

with open('src/components/PortfolioSection.tsx', 'r') as f:
    content = f.read()

replacement = r'''                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{typeof activity === 'string' ? activity : activity.desc || 'Activity Log'}</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-wider">
                      {typeof activity === 'object' && activity.date ? `${activity.date} • ` : ''}Completed Milestone • Verified Off-chain
                    </p>
                  </div>'''

content = re.sub(r'                  <div>\n                    <h4 className="text-sm font-bold text-slate-800">\{activity\}</h4>\n                    <p className="text-\[10px\] text-slate-400 font-mono mt-1 uppercase tracking-wider">Completed Milestone • Verified Off-chain</p>\n                  </div>', replacement, content, flags=re.DOTALL)

with open('src/components/PortfolioSection.tsx', 'w') as f:
    f.write(content)
