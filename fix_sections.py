import os
import re

sections = [
    "AcademySection.tsx",
    "MarketplaceSection.tsx",
    "ProcurementSection.tsx",
    "JobsSection.tsx",
    "ProjectsSection.tsx",
    "BusinessSection.tsx",
    "PaymentsSection.tsx",
    "ConnectSection.tsx",
    "EventsSection.tsx",
    "GovernanceSection.tsx",
    "CommunitySection.tsx"
]

def replace_banner(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # We want to import PageBanner and CategoryTabs
    import_statement = 'import { PageBanner } from "./PageBanner";\nimport { CategoryTabs } from "./CategoryTabs";\n'
    if 'import { PageBanner }' not in content:
        # Find first line after imports or just put it after React
        content = content.replace('import React', import_statement + 'import React', 1)

    with open(filepath, 'w') as f:
        f.write(content)

for s in sections:
    path = f"src/components/{s}"
    if os.path.exists(path):
        replace_banner(path)

