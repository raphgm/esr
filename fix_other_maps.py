import glob
import re

for filename in glob.glob('src/components/*.tsx'):
    with open(filename, 'r') as f:
        content = f.read()
        
    original = content
    content = content.replace('userProfile.formalSkills.map', 'userProfile.formalSkills?.map')
    content = content.replace('userProfile.creatorSkills.map', 'userProfile.creatorSkills?.map')
    content = content.replace('userProfile.certifications.map', 'userProfile.certifications?.map')
    
    if content != original:
        with open(filename, 'w') as f:
            f.write(content)
