import os
import re

sections = [
    ("BusinessSection.tsx", "LOUD Business Suite", "SME TRACKERS & CRM", "Manage your SME operations, track inventory, and connect with clients.", "FileText"),
    ("PaymentsSection.tsx", "LOUD Payments", "DIGITAL WALLETS & TRANSFERS", "Secure digital wallets for managing gig income and peer-to-peer transfers.", "CreditCard"),
    ("EventsSection.tsx", "LOUD Events", "LIVE STREAMS & TICKETING", "Host masterclasses, participate in community events, and manage ticketing.", "Calendar"),
    ("GovernanceSection.tsx", "LOUD Governance", "DAO VOTES & PROPOSALS", "Participate in decentralized governance and steer the future of the platform.", "Vote"),
    ("CommunitySection.tsx", "LOUD Community", "COHORTS & DISCUSSIONS", "Join cohorts, engage in discussions, and share insights with peers.", "Heart"),
]

for section, title, subtitle, desc, icon in sections:
    path = f"src/components/{section}"
    if not os.path.exists(path):
        continue
        
    with open(path, "r") as f:
        content = f.read()

    pattern = r'(return\s*\(\s*<div id="[a-zA-Z0-9\-_]+" className=")grid grid-cols-1 lg:grid-cols-12 gap-8(">\n)'
    
    match = re.search(pattern, content)
    if match:
        new_header = f"""flex flex-col gap-6{match.group(2)}
      <PageBanner
        title="{title}"
        subtitle="{subtitle}"
        description="{desc}"
        icon={{{icon}}}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
"""
        content = content[:match.start()] + match.group(1) + new_header + content[match.end():]
        
        # Add closing div before the end
        content = re.sub(r'(\s*</div>\s*\)\s*;\s*\})', r'\n    </div>\1', content)
        
        with open(path, "w") as f:
            f.write(content)
            
        print(f"Updated {section}")
    else:
        print(f"Could not match pattern for {section}")

