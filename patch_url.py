import re

def update_file(filename):
    with open(filename, 'r') as f:
        content = f.read()

    content = content.replace('url: "https://tiktok.com/@chinedu/video/1"', 'url: "https://github.com/chinedu/ai-agent-deployment"')
    content = content.replace('url: "https://youtube.com/watch?v=l3v_vlg"', 'url: "https://github.com/chinedu/k8s-cluster-migration"')
    
    with open(filename, 'w') as f:
        f.write(content)

update_file('src/mockData.ts')
update_file('src/components/AnalyticsSection.tsx')
