import re

with open('src/components/PortfolioSection.tsx', 'r') as f:
    content = f.read()

content = content.replace('userProfile.formalSkills.map', 'userProfile.formalSkills?.map')
content = content.replace('userProfile.creatorSkills.map', 'userProfile.creatorSkills?.map')
content = content.replace('userProfile.certifications.map', 'userProfile.certifications?.map')
content = content.replace('userProfile.portfolio || []', 'userProfile.portfolio || []')

with open('src/components/PortfolioSection.tsx', 'w') as f:
    f.write(content)
