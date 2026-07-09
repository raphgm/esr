import re
import glob

files_to_patch = ["src/mockData.ts", "src/components/AnalyticsSection.tsx"]

for filename in files_to_patch:
    with open(filename, 'r') as f:
        content = f.read()

    content = content.replace("Lagos Tech Hub Startup Vlog Showcase", "Distributed Kubernetes Cluster Migration")
    content = content.replace("UGC Brand Deal", "Cloud Architecture")
    
    content = content.replace("Cozy Morning Aesthetic Routine in Lekki", "Enterprise AI Agent Deployment")
    content = content.replace("Lifestyle", "AI Engineering")
    
    with open(filename, 'w') as f:
        f.write(content)

