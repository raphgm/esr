import re

with open('src/mockData.ts', 'r') as f:
    content = f.read()

replacement = r'''    content: "Just graduated from the 'Zero to Cook' signature program on the Academy! 🍳 Today I secured my first small catering gig for an office launch in Ikeja. Moving from learning to earning is real!\\n\\nall because the platform is not focused on only IT skills",'''

content = re.sub(r'    content: "Just graduated from the \'Zero to Cook\'.*?IT skills",', replacement, content, flags=re.DOTALL)

with open('src/mockData.ts', 'w') as f:
    f.write(content)
