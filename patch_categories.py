import re

with open('src/components/MarketplaceSection.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '  const categories = [\n    "All",\n    "Tech & SaaS",\n    "Fashion & Beauty",\n    "Finance & Fintech",\n    "Web3 & Crypto",\n    "FMCG",\n  ];',
    '  const categories = [\n    "All",\n    "Digital IP",\n    "Agency Retainers",\n    "Smart Contracts",\n    "Tech & SaaS",\n  ];'
)

# also fix the <option> in the modal
content = content.replace(
'''                      <option value="Tech & SaaS">Tech & SaaS</option>
                      <option value="Fashion & Beauty">Fashion & Beauty</option>
                      <option value="Finance & Fintech">Finance & Fintech</option>
                      <option value="Web3 & Crypto">Web3 & Crypto</option>
                      <option value="FMCG">FMCG</option>''',
'''                      <option value="Digital IP">Digital IP</option>
                      <option value="Agency Retainers">Agency Retainers</option>
                      <option value="Smart Contracts">Smart Contracts</option>
                      <option value="Tech & SaaS">Tech & SaaS</option>'''
)

with open('src/components/MarketplaceSection.tsx', 'w') as f:
    f.write(content)
