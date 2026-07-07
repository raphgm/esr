import os
import re

sections = [
    ("PaymentsSection.tsx", "LOUD Payments", "DIGITAL WALLETS & TRANSFERS", "Secure digital wallets for managing gig income and peer-to-peer transfers.", "Wallet"),
    ("EventsSection.tsx", "LOUD Events", "LIVE STREAMS & TICKETING", "Host masterclasses, participate in community events, and manage ticketing.", "Calendar"),
    ("GovernanceSection.tsx", "LOUD Governance", "DAO VOTES & PROPOSALS", "Participate in decentralized governance and steer the future of the platform.", "Vote"),
]

for section, title, subtitle, desc, icon in sections:
    path = f"src/components/{section}"
    if not os.path.exists(path):
        continue
        
    with open(path, "r") as f:
        content = f.read()

    # Find where return ( \n <div className="flex flex-col gap-6 animate-fade-in">
    # Then there's <div className="flex justify-between items-end border-b-2 border-slate-200 pb-4">
    # ... up to </div>\n      </div>
    
    pattern = r'(<div className="flex justify-between items-end border-b-2 border-slate-200 pb-4">.*?</div>\s*</div>)'
    
    match = re.search(pattern, content, re.DOTALL)
    if match:
        new_header = f"""<PageBanner
        title="{title}"
        subtitle="{subtitle}"
        description="{desc}"
        icon={{{icon}}}
      />"""
        content = content[:match.start()] + new_header + content[match.end():]
        
        # ensure PageBanner is imported
        if 'import { PageBanner }' not in content:
            content = content.replace('import React', 'import { PageBanner } from "./PageBanner";\nimport React', 1)
        
        with open(path, "w") as f:
            f.write(content)
            
        print(f"Updated {section}")
    else:
        print(f"Could not match pattern for {section}")

