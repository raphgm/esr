import re

with open('src/components/ProjectsSection.tsx', 'r') as f:
    content = f.read()

# Replace hardcoded financial feed and tasks in ProjectsSection.tsx

content = content.replace("Coca-Cola Nigeria deposited $250,000 into Escrow for 'Instagram Reels Campaign Video'", "Enterprise Corp deposited $250,000 into Escrow for 'Distributed System Migration'")
content = content.replace("Coca-Cola Nigeria", "Enterprise Corp")
content = content.replace("PiggyVest Fintech", "FinTech Next")
content = content.replace("Kala Bespoke Fashion", "SecureCloud Tech")

content = content.replace("Instagram Reels Campaign Video", "Distributed System Migration")
content = content.replace("TikTok Meme Ad Integration", "AI Agent Orchestration Pipeline")
content = content.replace("UGC Styling Video Reel", "Cloud Native Security Audit")

# We should also replace the description if hardcoded
content = content.replace("Shoot 1x aesthetic morning routine Reel featuring Coke Zero Sugar and tag @cocacolanigeria.", "Architect and deploy a scalable microservices infrastructure with high availability.")
content = content.replace("Produce 1x high-retention funny meme TikTok video showcasing the automated savings features of PiggyVest.", "Develop and integrate a fleet of autonomous agents for predictive financial modeling.")
content = content.replace("Deliver 1x aesthetic unboxing and styling walkthrough of the latest summer linen jackets.", "Perform comprehensive security audit and implement zero-trust architecture for enterprise cloud.")

with open('src/components/ProjectsSection.tsx', 'w') as f:
    f.write(content)
