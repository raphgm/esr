import urllib.parse
import re

def svg_to_data_uri(svg_string):
    encoded = urllib.parse.quote(svg_string)
    return f"data:image/svg+xml,{encoded}"

fintech_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="chartGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.0"/>
    </linearGradient>
    <linearGradient id="chartGlow2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.0"/>
    </linearGradient>
  </defs>
  
  <rect width="800" height="500" fill="url(#bg)"/>
  <rect x="0" y="0" width="800" height="500" fill="#0f172a" opacity="0.4"/>
  
  <!-- Side Navigation -->
  <rect x="30" y="30" width="60" height="440" rx="16" fill="#1e293b" opacity="0.6"/>
  <circle cx="60" cy="70" r="12" fill="#3b82f6"/>
  <rect x="50" y="120" width="20" height="20" rx="4" fill="#475569"/>
  <rect x="50" y="160" width="20" height="20" rx="4" fill="#334155"/>
  <rect x="50" y="200" width="20" height="20" rx="4" fill="#334155"/>
  <rect x="50" y="240" width="20" height="20" rx="4" fill="#334155"/>
  
  <!-- Header elements -->
  <text x="120" y="70" font-family="sans-serif" font-weight="bold" font-size="24" fill="#f8fafc">Portfolio Overview</text>
  <rect x="620" y="45" width="150" height="36" rx="18" fill="#1e293b"/>
  <text x="640" y="68" font-family="sans-serif" font-size="14" fill="#94a3b8">Search assets...</text>
  
  <!-- Stat Cards -->
  <rect x="120" y="100" width="200" height="100" rx="16" fill="#1e293b" opacity="0.8"/>
  <text x="140" y="130" font-family="sans-serif" font-size="14" fill="#94a3b8">Total Balance</text>
  <text x="140" y="170" font-family="sans-serif" font-weight="bold" font-size="32" fill="#f8fafc">$124,563.00</text>
  <text x="270" y="130" font-family="sans-serif" font-size="14" fill="#10b981">+2.4%</text>

  <rect x="340" y="100" width="200" height="100" rx="16" fill="#1e293b" opacity="0.8"/>
  <text x="360" y="130" font-family="sans-serif" font-size="14" fill="#94a3b8">Monthly Yield</text>
  <text x="360" y="170" font-family="sans-serif" font-weight="bold" font-size="32" fill="#f8fafc">$4,231.50</text>
  <text x="490" y="130" font-family="sans-serif" font-size="14" fill="#10b981">+1.1%</text>

  <rect x="560" y="100" width="210" height="100" rx="16" fill="#1e293b" opacity="0.8"/>
  <text x="580" y="130" font-family="sans-serif" font-size="14" fill="#94a3b8">Active Trades</text>
  <text x="580" y="170" font-family="sans-serif" font-weight="bold" font-size="32" fill="#f8fafc">14</text>
  <circle cx="730" cy="160" r="16" fill="#f59e0b" opacity="0.2"/>
  <circle cx="730" cy="160" r="8" fill="#f59e0b"/>

  <!-- Main Chart Area -->
  <rect x="120" y="220" width="420" height="250" rx="16" fill="#1e293b" opacity="0.6"/>
  <text x="140" y="260" font-family="sans-serif" font-weight="bold" font-size="16" fill="#f8fafc">Revenue Analytics</text>
  
  <path d="M 120 440 L 120 380 Q 200 350 250 310 T 350 280 T 450 320 T 540 250 L 540 440 Z" fill="url(#chartGlow)"/>
  <path d="M 120 380 Q 200 350 250 310 T 350 280 T 450 320 T 540 250" fill="none" stroke="#06b6d4" stroke-width="4" stroke-linecap="round"/>
  
  <path d="M 120 440 L 120 400 Q 200 420 250 380 T 350 350 T 450 390 T 540 310 L 540 440 Z" fill="url(#chartGlow2)"/>
  <path d="M 120 400 Q 200 420 250 380 T 350 350 T 450 390 T 540 310" fill="none" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round"/>
  
  <!-- Right Column / Recent Activity -->
  <rect x="560" y="220" width="210" height="250" rx="16" fill="#1e293b" opacity="0.6"/>
  <text x="580" y="260" font-family="sans-serif" font-weight="bold" font-size="16" fill="#f8fafc">Recent Activity</text>
  
  <rect x="580" y="280" width="32" height="32" rx="8" fill="#3b82f6" opacity="0.2"/>
  <text x="625" y="295" font-family="sans-serif" font-size="12" fill="#f8fafc">ETH Deposit</text>
  <text x="625" y="310" font-family="sans-serif" font-size="10" fill="#94a3b8">Completed</text>
  <text x="730" y="300" font-family="sans-serif" font-weight="bold" font-size="12" fill="#10b981">+$240</text>
  
  <rect x="580" y="330" width="32" height="32" rx="8" fill="#8b5cf6" opacity="0.2"/>
  <text x="625" y="345" font-family="sans-serif" font-size="12" fill="#f8fafc">BTC Swap</text>
  <text x="625" y="360" font-family="sans-serif" font-size="10" fill="#94a3b8">Pending</text>
  <text x="730" y="350" font-family="sans-serif" font-weight="bold" font-size="12" fill="#f59e0b">-$150</text>
  
  <rect x="580" y="380" width="32" height="32" rx="8" fill="#ec4899" opacity="0.2"/>
  <text x="625" y="395" font-family="sans-serif" font-size="12" fill="#f8fafc">NFT Purchase</text>
  <text x="625" y="410" font-family="sans-serif" font-size="10" fill="#94a3b8">Completed</text>
  <text x="730" y="400" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ef4444">-$890</text>

</svg>"""

seo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <linearGradient id="barGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#4f46e5"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000000" flood-opacity="0.05"/>
    </filter>
  </defs>
  <rect width="800" height="500" fill="url(#bg)"/>
  
  <!-- Decorative Background elements -->
  <circle cx="100" cy="400" r="200" fill="#f1f5f9" opacity="0.5"/>
  <circle cx="700" cy="100" r="150" fill="#e0e7ff" opacity="0.4"/>
  
  <!-- Main Window -->
  <rect x="80" y="50" width="640" height="400" rx="16" fill="#ffffff" filter="url(#shadow)"/>
  
  <!-- Window Header -->
  <path d="M 80 66 A 16 16 0 0 1 96 50 L 704 50 A 16 16 0 0 1 720 66 L 720 100 L 80 100 Z" fill="#f8fafc" />
  <path d="M 80 100 L 720 100" fill="none" stroke="#e2e8f0" stroke-width="1"/>
  <circle cx="110" cy="75" r="6" fill="#ef4444"/>
  <circle cx="130" cy="75" r="6" fill="#f59e0b"/>
  <circle cx="150" cy="75" r="6" fill="#10b981"/>
  <rect x="250" y="60" width="300" height="30" rx="15" fill="#f1f5f9"/>
  <text x="320" y="80" font-family="sans-serif" font-size="12" fill="#94a3b8">https://client-domain.com/seo-report</text>
  
  <!-- Dashboard Content -->
  <text x="120" y="140" font-family="sans-serif" font-weight="bold" font-size="24" fill="#0f172a">Organic Traffic Growth</text>
  <text x="120" y="160" font-family="sans-serif" font-size="14" fill="#64748b">Q3 Performance Report</text>
  
  <!-- Stats row -->
  <rect x="120" y="190" width="150" height="80" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="140" y="220" font-family="sans-serif" font-size="12" fill="#64748b">Organic Visitors</text>
  <text x="140" y="250" font-family="sans-serif" font-weight="bold" font-size="24" fill="#0f172a">142,593</text>
  <text x="230" y="220" font-family="sans-serif" font-size="12" fill="#10b981">+45%</text>

  <rect x="290" y="190" width="150" height="80" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="310" y="220" font-family="sans-serif" font-size="12" fill="#64748b">Avg. Position</text>
  <text x="310" y="250" font-family="sans-serif" font-weight="bold" font-size="24" fill="#0f172a">3.2</text>
  <text x="400" y="220" font-family="sans-serif" font-size="12" fill="#10b981">+1.8</text>

  <rect x="460" y="190" width="220" height="80" rx="12" fill="#e0e7ff"/>
  <text x="480" y="220" font-family="sans-serif" font-size="12" fill="#4338ca">Domain Authority</text>
  <text x="480" y="250" font-family="sans-serif" font-weight="bold" font-size="24" fill="#3730a3">74 / 100</text>
  <circle cx="640" cy="230" r="20" fill="#ffffff" opacity="0.5"/>
  <path d="M 630 230 L 640 220 L 650 230" fill="none" stroke="#4338ca" stroke-width="3" stroke-linecap="round"/>
  <path d="M 640 220 L 640 240" fill="none" stroke="#4338ca" stroke-width="3" stroke-linecap="round"/>

  <!-- Bar Chart Area -->
  <rect x="140" y="380" width="30" height="40" rx="6" fill="#cbd5e1"/>
  <rect x="190" y="350" width="30" height="70" rx="6" fill="#cbd5e1"/>
  <rect x="240" y="310" width="30" height="110" rx="6" fill="#94a3b8"/>
  <rect x="290" y="330" width="30" height="90" rx="6" fill="#94a3b8"/>
  <rect x="340" y="280" width="30" height="140" rx="6" fill="#6366f1"/>
  <rect x="390" y="220" width="30" height="200" rx="6" fill="url(#barGrad)"/>
  <rect x="440" y="180" width="30" height="240" rx="6" fill="url(#barGrad)"/>
  
  <path d="M 155 360 L 205 320 L 255 280 L 305 300 L 355 240 L 405 180 L 455 140" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
  <circle cx="455" cy="140" r="6" fill="#f59e0b"/>
  
  <!-- Search query block -->
  <rect x="520" y="300" width="160" height="110" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="540" y="325" font-family="sans-serif" font-weight="bold" font-size="12" fill="#0f172a">Top Keywords</text>
  <rect x="540" y="340" width="100" height="8" rx="4" fill="#6366f1"/>
  <text x="650" y="348" font-family="sans-serif" font-size="10" fill="#10b981">#1</text>
  <rect x="540" y="365" width="80" height="8" rx="4" fill="#94a3b8"/>
  <text x="650" y="373" font-family="sans-serif" font-size="10" fill="#10b981">#2</text>
  <rect x="540" y="390" width="60" height="8" rx="4" fill="#cbd5e1"/>
  <text x="650" y="398" font-family="sans-serif" font-size="10" fill="#10b981">#3</text>
</svg>"""

contract_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#171717"/>
    </linearGradient>
    <linearGradient id="glow2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#262626" stroke-width="1"/>
    </pattern>
  </defs>
  
  <rect width="800" height="500" fill="url(#bg2)"/>
  <rect width="800" height="500" fill="url(#grid)"/>

  <!-- Glowing background blobs -->
  <circle cx="200" cy="150" r="100" fill="#a855f7" opacity="0.1" filter="blur(40px)"/>
  <circle cx="600" cy="350" r="150" fill="#3b82f6" opacity="0.1" filter="blur(50px)"/>

  <!-- Code Editor Window -->
  <rect x="100" y="80" width="600" height="340" rx="12" fill="#0f172a" stroke="#334155" stroke-width="2"/>
  
  <!-- Editor Header -->
  <rect x="100" y="80" width="600" height="48" rx="12" fill="#1e293b"/>
  <path d="M 100 128 L 700 128" fill="none" stroke="#334155" stroke-width="2"/>
  <circle cx="130" cy="104" r="6" fill="#ef4444"/>
  <circle cx="150" cy="104" r="6" fill="#f59e0b"/>
  <circle cx="170" cy="104" r="6" fill="#10b981"/>
  <rect x="200" y="94" width="120" height="24" rx="4" fill="#0f172a"/>
  <text x="215" y="110" font-family="monospace" font-size="12" fill="#94a3b8">Escrow.sol</text>

  <!-- Line numbers -->
  <rect x="100" y="128" width="40" height="292" fill="#0f172a" opacity="0.5"/>
  <text x="120" y="160" font-family="monospace" font-size="12" fill="#475569" text-anchor="end">1</text>
  <text x="120" y="185" font-family="monospace" font-size="12" fill="#475569" text-anchor="end">2</text>
  <text x="120" y="210" font-family="monospace" font-size="12" fill="#475569" text-anchor="end">3</text>
  <text x="120" y="235" font-family="monospace" font-size="12" fill="#475569" text-anchor="end">4</text>
  <text x="120" y="260" font-family="monospace" font-size="12" fill="#475569" text-anchor="end">5</text>
  <text x="120" y="285" font-family="monospace" font-size="12" fill="#475569" text-anchor="end">6</text>
  <text x="120" y="310" font-family="monospace" font-size="12" fill="#475569" text-anchor="end">7</text>
  <text x="120" y="335" font-family="monospace" font-size="12" fill="#475569" text-anchor="end">8</text>

  <!-- Syntax highlighted code lines -->
  <text x="160" y="160" font-family="monospace" font-size="14" fill="#c4b5fd">pragma</text>
  <text x="220" y="160" font-family="monospace" font-size="14" fill="#93c5fd">solidity</text>
  <text x="290" y="160" font-family="monospace" font-size="14" fill="#fde047">^0.8.19;</text>

  <text x="160" y="185" font-family="monospace" font-size="14" fill="#64748b">// Secured, multi-sig escrow contract</text>

  <text x="160" y="210" font-family="monospace" font-size="14" fill="#c4b5fd">contract</text>
  <text x="235" y="210" font-family="monospace" font-size="14" fill="#6ee7b7">MilestoneEscrow</text>
  <text x="365" y="210" font-family="monospace" font-size="14" fill="#f8fafc">{</text>
  
  <text x="180" y="235" font-family="monospace" font-size="14" fill="#93c5fd">address</text>
  <text x="245" y="235" font-family="monospace" font-size="14" fill="#c4b5fd">public</text>
  <text x="305" y="235" font-family="monospace" font-size="14" fill="#f8fafc">buyer;</text>
  
  <text x="180" y="260" font-family="monospace" font-size="14" fill="#93c5fd">address</text>
  <text x="245" y="260" font-family="monospace" font-size="14" fill="#c4b5fd">public</text>
  <text x="305" y="260" font-family="monospace" font-size="14" fill="#f8fafc">seller;</text>
  
  <text x="180" y="285" font-family="monospace" font-size="14" fill="#93c5fd">uint256</text>
  <text x="245" y="285" font-family="monospace" font-size="14" fill="#c4b5fd">public</text>
  <text x="305" y="285" font-family="monospace" font-size="14" fill="#f8fafc">totalAmount;</text>

  <text x="180" y="310" font-family="monospace" font-size="14" fill="#c4b5fd">mapping</text>
  <text x="240" y="310" font-family="monospace" font-size="14" fill="#f8fafc">(uint => Milestone) </text>
  <text x="400" y="310" font-family="monospace" font-size="14" fill="#c4b5fd">public</text>
  <text x="460" y="310" font-family="monospace" font-size="14" fill="#f8fafc">milestones;</text>

  <text x="160" y="335" font-family="monospace" font-size="14" fill="#f8fafc">}</text>

  <!-- Glowing badge / security seal -->
  <rect x="520" y="310" width="160" height="90" rx="12" fill="url(#glow2)" opacity="0.15"/>
  <rect x="520" y="310" width="160" height="90" rx="12" fill="none" stroke="url(#glow2)" stroke-width="2"/>
  <circle cx="600" cy="340" r="16" fill="url(#glow2)"/>
  <path d="M 592 340 L 598 346 L 608 334" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="600" y="375" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ffffff" text-anchor="middle" letter-spacing="1">100% AUDITED</text>
  
</svg>"""

with open('src/mockData.ts', 'r') as f:
    content = f.read()

# Replace images
# Find where the images are assigned in the product array
content = re.sub(r'image: "data:image/svg\+xml.*?"', 'image: "PLACEHOLDER"', content)
# Now replace PLACEHOLDERs in order
content = content.replace('"PLACEHOLDER"', f'"{svg_to_data_uri(fintech_svg)}"', 1)
content = content.replace('"PLACEHOLDER"', f'"{svg_to_data_uri(seo_svg)}"', 1)
content = content.replace('"PLACEHOLDER"', f'"{svg_to_data_uri(contract_svg)}"', 1)

with open('src/mockData.ts', 'w') as f:
    f.write(content)
