import re

with open('src/components/AcademySection.tsx', 'r') as f:
    content = f.read()

new_mapping = """const courseGigMapping: Record<string, { title: string; budget: string; description: string; type: string }> = {
  "Google AI Masterclass": {
    title: "Enterprise AI Agent Development",
    budget: "$15,000 - $45,000",
    description: "Build custom autonomous AI agents for Fortune 500 workflows.",
    type: "AI Architecture"
  },
  "Web3 Smart Contract Security": {
    title: "L2 Protocol Audit Retainer",
    budget: "$20,000 - $60,000",
    description: "Execute rigorous vulnerability testing on pre-launch smart contracts.",
    type: "Security Audit"
  },
  "AWS CloudNative Architect": {
    title: "Kubernetes Migration Pipeline",
    budget: "$10,000 - $35,000",
    description: "Design and implement highly available EKS environments.",
    type: "Cloud Infrastructure"
  }
};"""

content = re.sub(r'const courseGigMapping:.*?};', new_mapping, content, flags=re.DOTALL)

with open('src/components/AcademySection.tsx', 'w') as f:
    f.write(content)
