import re

with open('src/components/HomeMarketing.tsx', 'r') as f:
    content = f.read()

new_steps = """const vettingSteps = [
    {
      step: "01",
      title: "Portfolio & Reach Verification",
      subtitle: "Automated analysis of audience engagement, content aesthetic, and demographic alignment.",
      successRate: "Top 15% Pass",
      description: "We don't rely on self-reported metrics. Our API engines analyze your linked social accounts to verify authentic follower engagement, video retention rates, and content quality.",
      criteria: ["Authentic engagement rates", "No fake followers/botting", "High aesthetic quality"]
    },
    {
      step: "02",
      title: "AI-Graded Campaign Trials",
      subtitle: "Practical execution of mock campaigns via ESTARR Certifications.",
      successRate: "Top 5% Pass",
      description: "Instead of resume screening, applicants complete specific brand 'Certifications'. You will script, shoot, and edit a mock UGC video which is graded on brand-safety and creativity.",
      criteria: ["Adherence to Brand Guidelines", "Script Hook effectiveness", "Lighting & production value"]
    },
    {
      step: "03",
      title: "Direct Peer Quality Audit",
      subtitle: "Manual review by senior creative directors and brand strategists.",
      successRate: "Top 2% Pass",
      description: "The finalist creators have their mock submissions reviewed by real human campaign managers who evaluate cultural resonance, conversion potential, and overall storytelling ability.",
      criteria: ["Creative storytelling", "Cultural resonance", "Audience conversion potential"]
    },
    {
      step: "04",
      title: "Escrow & KYC Clearance",
      subtitle: "Platform compliance, identity verification, and professional alignment.",
      successRate: "Top 1% Admitted",
      description: "Passed creators undergo secure onboarding, linking their decentralized payout details, and verifying KYC/identity parameters to ensure complete brand safety and tax compliance.",
      criteria: ["Government ID verification", "Brand safety clearance", "Immediate campaign availability"]
    }
  ];"""

content = re.sub(r'const vettingSteps = \[.*?\];', new_steps, content, flags=re.DOTALL)

with open('src/components/HomeMarketing.tsx', 'w') as f:
    f.write(content)
