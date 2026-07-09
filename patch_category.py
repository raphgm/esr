import re

with open('src/types.ts', 'r') as f:
    content = f.read()

content = content.replace(
    'category: "Digital" | "Business" | "Trades" | "Logistics" | "Agriculture" | "Tech" | "Career";',
    'category: "AI & ML" | "Web3" | "Cloud DevOps" | "Data Science" | "Software Eng." | "Cybersecurity" | "Product Design" | string;'
)

with open('src/types.ts', 'w') as f:
    f.write(content)
