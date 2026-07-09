import re

with open('src/components/HomeMarketing.tsx', 'r') as f:
    content = f.read()

new_roles = """const calcRoles = [
    { name: "Brand Marketing Strategist", hourlyRate: 95, averageLocalSal: 1200 },
    { name: "UGC Content Creator", hourlyRate: 85, averageLocalSal: 1100 },
    { name: "Creative Video Producer", hourlyRate: 75, averageLocalSal: 950 },
    { name: "Tech / Software Engineer", hourlyRate: 110, averageLocalSal: 1400 },
    { name: "Social Media Director", hourlyRate: 190, averageLocalSal: 2500 }
  ];"""

content = re.sub(r'const calcRoles = \[.*?\];', new_roles, content, flags=re.DOTALL)

with open('src/components/HomeMarketing.tsx', 'w') as f:
    f.write(content)
