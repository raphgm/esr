import re

with open('src/components/HomeMarketing.tsx', 'r') as f:
    content = f.read()

new_steps = """const vettingSteps = [
    {
      step: "01",
      title: "Cognitive Aptitude Test (CCAT)",
      subtitle: "Evaluation of logic, abstract reasoning, and fast-paced numerical resolution.",
      successRate: "Top 12% Pass",
      description: "Candidates face a customized 50-question cognitive capability assessment. This test benchmarks raw processing speed, critical decision accuracy, and logical adaptability under high-pressure parameters.",
      criteria: ["Numerical & verbal aptitude", "Spatial & logical sequencing", "Under-pressure accuracy"]
    },
    {
      step: "02",
      title: "Subject Matter Real-World Trial",
      subtitle: "Practical execution of high-difficulty production tasks in virtual sandbox environments.",
      successRate: "Top 4% Pass",
      description: "Instead of generic puzzle algorithms, applicants are given 72 hours to build, document, and deploy a high-fidelity campaign or architecture matching strict production specs.",
      criteria: ["Clean, scalable architecture", "Rigorous error handling", "Strict adherence to constraints"]
    },
    {
      step: "03",
      title: "Direct Peer Architecture Audit",
      subtitle: "Live cross-examination, live refactoring, and code review defense with active Principals.",
      successRate: "Top 1.5% Pass",
      description: "The finalist candidates walk through their submission with senior domain experts, refactoring real-time Edge cases and defending their system layout choices to prove authentic expertise.",
      criteria: ["System scaling explanations", "Real-time live refactoring speed", "Soft skills & design communication"]
    },
    {
      step: "04",
      title: "Escrow & Security Clearance",
      subtitle: "Platform compliance, multi-factor biometric check, and professional alignment validation.",
      successRate: "Top 1% Admitted",
      description: "Passed experts undergo comprehensive secure onboarding, linking their decentralized payout details, and verifying biometric security parameters to ensure complete client data protection.",
      criteria: ["Biometric identity alignment", "Security compliance training", "Immediate deployment availability"]
    }
  ];"""

content = re.sub(r'const vettingSteps = \[.*?\];', new_steps, content, flags=re.DOTALL)

with open('src/components/HomeMarketing.tsx', 'w') as f:
    f.write(content)
