import re

with open('src/mockData.ts', 'r') as f:
    content = f.read()

replacement = """export const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: "Turnkey FinTech Dashboard Template",
    category: "Digital IP",
    price: 4500,
    seller: "BlockForge Studios",
    sellerRating: 4.9,
    verified: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    description: "Fully responsive React & Tailwind dashboard template with integrated charting and data visualization for FinTech applications. Includes dark mode and trading data components.",
    reviews: [
      { author: "FinTech Next", rating: 5, comment: "Saved us months of frontend development. Highly recommended." },
      { author: "DeFi Startup", rating: 4.8, comment: "Clean code and great design." }
    ]
  },
  {
    id: "prod-2",
    name: "3-Month Enterprise SEO Retainer",
    category: "Agency Retainers",
    price: 12000,
    seller: "Apex Growth Marketing",
    sellerRating: 4.7,
    verified: true,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    description: "Comprehensive 90-day technical SEO audit, backlink acquisition campaign, and content strategy for enterprise SaaS companies.",
    reviews: [
      { author: "CloudCorp", rating: 5, comment: "Traffic increased by 150% in the first two months." }
    ]
  },
  {
    id: "prod-3",
    name: "Audited Escrow Smart Contract Template",
    category: "Smart Contracts",
    price: 850,
    seller: "ChainAudit Labs",
    sellerRating: 4.8,
    verified: true,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    description: "Production-ready Solidity smart contract for milestone-based multi-sig escrow. Fully audited by independent security researchers.",
    reviews: []
  }
];"""

content = re.sub(r'export const initialProducts: Product\[\] = \[.*?\];', replacement, content, flags=re.DOTALL)

with open('src/mockData.ts', 'w') as f:
    f.write(content)
