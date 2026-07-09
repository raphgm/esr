import re

with open('src/lib/firebase.ts', 'r') as f:
    content = f.read()

replacement = """        role: isAdminEmail(email) ? "Administrator" : (data?.role || defaultProfile.role),
        history: data.history || defaultProfile.history,
        portfolio: defaultProfile.portfolio
      };"""

content = re.sub(r'        role: isAdminEmail\(email\) \? "Administrator" : \(data\?\.role \|\| defaultProfile\.role\),\n        history: data\.history \|\| defaultProfile\.history\n      \};', replacement, content, flags=re.DOTALL)

with open('src/lib/firebase.ts', 'w') as f:
    f.write(content)
