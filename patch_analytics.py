import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Remove import
content = re.sub(r'import AnalyticsSection from "\./components/AnalyticsSection";\n', '', content)

# Remove from activeTab types
content = content.replace('| "payments" | "events" | "analytics" | "admin" | "portfolio"', '| "payments" | "events" | "admin" | "portfolio"')

# Remove menu item
content = re.sub(r'\s*\{\s*id: "analytics", label: "IT & Creator Analytics".*?\},', '', content)

# Remove render block
content = re.sub(r'\s*\{\s*activeTab === "analytics" && \(\s*<AnalyticsSection.*?\/>\s*\)\s*\}', '', content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
