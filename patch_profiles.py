import re

def update_file(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # Profession
    content = content.replace("Professional UGC Creator & Brand Consultant", "Principal AI Engineer & Cloud Architect")
    content = content.replace("Digital Creator & E-commerce Merchant", "Principal AI Engineer & Cloud Architect")
    
    # Bio
    content = content.replace("Helping African startups tell captivating visual stories. Specializes in short-form funny TikTok skits, highly structured PiggyVest unboxing tutorials, and aesthetic fashion styling walkthroughs.", "Helping African startups build scalable infrastructure. Specializes in distributed systems, AI agent development, and enterprise cloud migrations.")
    content = content.replace("Passionate about building small businesses, content creation, and helping local artisans scale their products online.", "Helping African startups build scalable infrastructure. Specializes in distributed systems, AI agent development, and enterprise cloud migrations.")
    
    # Skills - formalSkills
    content = content.replace('"UGC Storyboarding", "Video Editing", "Content Strategy", "Brand Copywriting"', '"System Architecture", "Cloud Computing", "API Development", "CI/CD Pipelines"')
    content = content.replace('"Cloud Engineering", "FinOps", "AWS Certified"', '"System Architecture", "Cloud Computing", "API Development", "CI/CD Pipelines"')
    
    # Skills - creatorSkills
    content = content.replace('"CapCut Editing", "TikTok Trends Analysis", "Aesthetic Lighting Design", "Voiceover Direction"', '"Kubernetes", "Docker", "AWS", "Terraform"')
    content = content.replace('"Canva", "Video Editing", "WhatsApp Selling", "Local Sourcing", "Poultry Farming"', '"Kubernetes", "Docker", "AWS", "Terraform"')

    # Skills - general skills
    content = content.replace('"UGC Video", "Creative Writing", "Brand Consulting", "Video Editing"', '"System Architecture", "Cloud Computing", "API Development", "CI/CD Pipelines"')
    content = content.replace('"Canva", "Video Editing", "WhatsApp Selling", "Local Sourcing", "Poultry Farming"', '"System Architecture", "Cloud Computing", "API Development", "CI/CD Pipelines"')

    # Certifications
    content = content.replace('"TikTok Creative Partner Academy (2025)", "Digital Marketing Pro - Lagos Business School"', '"AWS Certified Solutions Architect (2025)", "Google Cloud Professional Data Engineer (2025)", "skill-sch.com: Certified Software Architect (2026)"')
    content = content.replace('"Academy: Canva Masterclass (2026)",\n    "Academy: Small Business Finance (2026)"', '"AWS Certified Solutions Architect (2025)",\n    "Google Cloud Professional Data Engineer (2025)",\n    "skill-sch.com: Certified Software Architect (2026)"')
    
    with open(filename, 'w') as f:
        f.write(content)

update_file('src/lib/firebase.ts')
update_file('src/mockData.ts')
