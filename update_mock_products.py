import re

with open('src/mockData.ts', 'r') as f:
    content = f.read()

new_products = """export const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: "Global Tech Summit Lead Sponsorship",
    category: "Tech & SaaS",
    price: 45000,
    seller: "TechCrunch Events",
    sellerRating: 4.9,
    verified: true,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300",
    description: "Premium headline sponsorship. Includes logo placement on all main stage screens, a dedicated 30-minute keynote slot, and access to VIP attendee lists. Payments secured via Escrow Pipeline.",
    reviews: [
      { author: "Microsoft", rating: 5, comment: "Incredible lead generation and brand visibility." },
      { author: "Stripe", rating: 4.8, comment: "Well-organized and excellent ROI." }
    ]
  },
  {
    id: "prod-2",
    name: "Summer Collection Influencer Campaign",
    category: "Fashion & Beauty",
    price: 12000,
    seller: "Vogue House",
    sellerRating: 4.7,
    verified: true,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=300",
    description: "Seeking top-tier fashion creators to showcase our upcoming Summer Linen Collection. Deliverables include 2x IG Reels and 1x TikTok. Creator payout guaranteed via milestone escrow.",
    reviews: [
      { author: "Creative Agency X", rating: 5, comment: "Smooth approval process and timely payouts." }
    ]
  },
  {
    id: "prod-3",
    name: "Crypto Wallet Launch Integration",
    category: "Web3 & Crypto",
    price: 28500,
    seller: "CoinBase Marketing",
    sellerRating: 4.8,
    verified: false,
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=300",
    description: "Sponsorship for decentralized finance (DeFi) tutorial channels. We provide the testnet API; you create a 10-minute walkthrough. Payouts released upon video publication.",
    reviews: []
  },
  {
    id: "prod-4",
    name: "NeoBank Campus Ambassador Tour",
    category: "Finance & Fintech",
    price: 32000,
    seller: "Kuda Bank",
    sellerRating: 5.0,
    verified: true,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=300",
    description: "Exclusive sponsorship for campus event organizers. Bring the NeoBank experience to 5 major universities. Budget covers branded merch, logistics, and organizer fees.",
    reviews: [
      { author: "Campus Connect", rating: 5, comment: "Great partnership. Escrow made it risk-free to book venues." }
    ]
  }
];"""

content = re.sub(r'export const initialProducts: Product\[\] = \[.*?\];', new_products, content, flags=re.DOTALL)

with open('src/mockData.ts', 'w') as f:
    f.write(content)
