import re

def update_file(filename):
    with open(filename, 'r') as f:
        content = f.read()

    content = content.replace(
        '"Partner with 10 international FMCG brands", "Mentor 100 apprentice UGC creators in Nigeria", "Launch a digital creators academy"',
        '"Architect 5 high-scale cloud-native platforms", "Mentor 100 aspiring African AI engineers", "Contribute to core open-source MLOps tools"'
    )
    
    with open(filename, 'w') as f:
        f.write(content)

update_file('src/lib/firebase.ts')
