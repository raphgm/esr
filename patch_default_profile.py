import re

with open('src/lib/firebase.ts', 'r') as f:
    content = f.read()

replacement = """  history: [
    { type: "payout", amount: 250000, date: "2026-07-01", desc: "Coca-Cola Reels Milestone Payment" },
    { type: "payout", amount: 180000, date: "2026-06-28", desc: "PiggyVest Integration Commission" },
    { type: "academy", amount: -45000, date: "2026-06-15", desc: "Unlocked Premium Trade Skills Academy Module" }
  ],
  portfolio: [
    { id: "p-1", title: "Distributed Kubernetes Cluster Migration", url: "https://github.com/chinedu/k8s-cluster-migration", category: "Cloud Architecture", views: 45000, likes: 3200 },
    { id: "p-2", title: "Enterprise AI Agent Deployment", url: "https://github.com/chinedu/ai-agent-deployment", category: "AI Engineering", views: 125000, likes: 9800 },
  ]
};"""

content = re.sub(r'  history: \[\n    \{ type: "payout".*?\]\n\};', replacement, content, flags=re.DOTALL)

with open('src/lib/firebase.ts', 'w') as f:
    f.write(content)
