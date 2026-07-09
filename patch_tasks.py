import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacement = """const homeDemoTasks: ProjectTask[] = [
  { id: "t1", title: "Distributed System Migration", desc: "$250,000 || Enterprise Corp || Architect and deploy a scalable microservices infrastructure with high availability.", status: "inprogress", priority: "High", assignee: "Enterprise Corp", dueDate: "2026-07-12", category: "marketing" },
  { id: "t2", title: "AI Agent Orchestration Pipeline", desc: "$180,000 || FinTech Next || Develop and integrate a fleet of autonomous agents for predictive financial modeling.", status: "todo", priority: "Medium", assignee: "FinTech Next", dueDate: "2026-07-15", category: "design" },
  { id: "t3", title: "Cloud Native Security Audit", desc: "$120,000 || SecureCloud Tech || Perform comprehensive security audit and implement zero-trust architecture for enterprise cloud.", status: "review", priority: "High", assignee: "SecureCloud Tech", dueDate: "2026-07-09", category: "dev" }
];"""

content = re.sub(r'const homeDemoTasks: ProjectTask\[\] = \[\n.*?\];', replacement, content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)

