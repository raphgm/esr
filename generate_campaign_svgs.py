import urllib.parse
import re

def svg_to_data_uri(svg_string):
    encoded = urllib.parse.quote(svg_string)
    return f"data:image/svg+xml,{encoded}"

svg_1 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <linearGradient id="phoneGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  
  <rect width="800" height="500" fill="url(#bg1)"/>
  
  <!-- Glowing background elements -->
  <circle cx="200" cy="100" r="150" fill="#22d3ee" opacity="0.1" filter="blur(40px)"/>
  <circle cx="600" cy="400" r="200" fill="#ec4899" opacity="0.1" filter="blur(50px)"/>
  
  <!-- Smartphone Frame -->
  <rect x="250" y="50" width="300" height="450" rx="36" fill="#0f172a" stroke="url(#phoneGlow)" stroke-width="4"/>
  
  <!-- Screen content -->
  <rect x="260" y="60" width="280" height="430" rx="30" fill="#1e293b"/>
  <rect x="260" y="60" width="280" height="430" rx="30" fill="url(#phoneGlow)" opacity="0.2"/>
  
  <!-- Notch -->
  <rect x="350" y="70" width="100" height="20" rx="10" fill="#020617"/>
  
  <!-- Video content placeholder -->
  <circle cx="400" cy="200" r="60" fill="#ffffff" opacity="0.1"/>
  <path d="M 390 180 L 420 200 L 390 220 Z" fill="#ffffff" opacity="0.8"/>
  
  <!-- UI Overlays (like TikTok) -->
  <circle cx="510" cy="250" r="16" fill="#ffffff" opacity="0.2"/>
  <circle cx="510" cy="300" r="16" fill="#ffffff" opacity="0.2"/>
  <circle cx="510" cy="350" r="16" fill="#ffffff" opacity="0.2"/>
  
  <!-- Footer overlay -->
  <rect x="270" y="380" width="200" height="12" rx="6" fill="#ffffff" opacity="0.3"/>
  <rect x="270" y="405" width="140" height="8" rx="4" fill="#ffffff" opacity="0.2"/>
  
  <!-- Floating elements -->
  <rect x="150" y="250" width="80" height="80" rx="20" fill="#0f172a" stroke="#22d3ee" stroke-width="2" transform="rotate(-15 150 250)"/>
  <text x="175" y="295" font-family="sans-serif" font-weight="bold" font-size="32" fill="#22d3ee" transform="rotate(-15 150 250)">#</text>
  
  <rect x="580" y="150" width="90" height="90" rx="24" fill="#0f172a" stroke="#ec4899" stroke-width="2" transform="rotate(10 580 150)"/>
  <text x="610" y="200" font-family="sans-serif" font-weight="bold" font-size="28" fill="#ec4899" transform="rotate(10 580 150)">$</text>

  <!-- Typography -->
  <text x="70" y="100" font-family="sans-serif" font-weight="bold" font-size="24" fill="#ffffff">Meme Marketing</text>
  <text x="70" y="130" font-family="sans-serif" font-size="16" fill="#94a3b8">Short-form Video Campaign</text>
</svg>"""

svg_2 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#7f1d1d"/>
    </linearGradient>
    <filter id="shadow2" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="15" stdDeviation="20" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <rect width="800" height="500" fill="url(#bg2)"/>
  
  <!-- Abstract wavy shapes -->
  <path d="M 0 200 Q 200 100 400 300 T 800 200 L 800 500 L 0 500 Z" fill="#ffffff" opacity="0.05"/>
  <path d="M 0 350 Q 200 250 400 400 T 800 250 L 800 500 L 0 500 Z" fill="#ffffff" opacity="0.1"/>

  <!-- Camera / Polaroid Frame 1 -->
  <g transform="translate(150, 80) rotate(-5)" filter="url(#shadow2)">
    <rect x="0" y="0" width="220" height="260" rx="12" fill="#ffffff"/>
    <rect x="10" y="10" width="200" height="180" rx="8" fill="#f1f5f9"/>
    <!-- Abstract landscape in photo -->
    <circle cx="100" cy="90" r="50" fill="#fca5a5" opacity="0.5"/>
    <path d="M 10 150 Q 60 100 110 160 T 210 140 L 210 190 L 10 190 Z" fill="#f87171" opacity="0.6"/>
  </g>

  <!-- Camera / Polaroid Frame 2 -->
  <g transform="translate(400, 120) rotate(8)" filter="url(#shadow2)">
    <rect x="0" y="0" width="240" height="280" rx="12" fill="#ffffff"/>
    <rect x="12" y="12" width="216" height="200" rx="8" fill="#f8fafc"/>
    <circle cx="120" cy="110" r="60" fill="#ef4444" opacity="0.2"/>
    <circle cx="120" cy="110" r="30" fill="#ef4444" opacity="0.4"/>
  </g>

  <!-- Sparkles -->
  <path d="M 100 80 Q 110 80 110 70 Q 110 80 120 80 Q 110 80 110 90 Q 110 80 100 80" fill="#ffffff"/>
  <path d="M 700 150 Q 715 150 715 135 Q 715 150 730 150 Q 715 150 715 165 Q 715 150 700 150" fill="#ffffff"/>

  <!-- Typography -->
  <rect x="50" y="380" width="700" height="80" rx="24" fill="#ffffff" opacity="0.1" filter="url(#shadow2)"/>
  <text x="80" y="430" font-family="sans-serif" font-weight="bold" font-size="28" fill="#ffffff">UGC Aesthetic Unboxing</text>
  <text x="600" y="425" font-family="sans-serif" font-size="14" fill="#fca5a5">Exclusive Campaign</text>
</svg>"""

svg_3 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="accent3" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#0ea5e9"/>
    </linearGradient>
    <filter id="glow3" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  
  <rect width="800" height="500" fill="url(#bg3)"/>
  
  <!-- Code brackets crossed out (No-code) -->
  <g transform="translate(100, 150)" opacity="0.1">
    <text x="0" y="0" font-family="monospace" font-weight="bold" font-size="180" fill="#ffffff">&lt;/&gt;</text>
    <path d="M -20 -150 L 320 20" stroke="#ef4444" stroke-width="24" stroke-linecap="round"/>
  </g>

  <!-- Video Player / Dashboard Window -->
  <rect x="220" y="100" width="500" height="320" rx="16" fill="#020617" stroke="#334155" stroke-width="2"/>
  
  <!-- Window Header -->
  <rect x="220" y="100" width="500" height="40" rx="16" fill="#1e293b"/>
  <circle cx="240" cy="120" r="6" fill="#ef4444"/>
  <circle cx="260" cy="120" r="6" fill="#f59e0b"/>
  <circle cx="280" cy="120" r="6" fill="#10b981"/>
  
  <!-- Video Player Area -->
  <rect x="240" y="160" width="460" height="200" rx="12" fill="#0f172a"/>
  
  <!-- Play button -->
  <circle cx="470" cy="260" r="32" fill="url(#accent3)" filter="url(#glow3)"/>
  <path d="M 460 245 L 485 260 L 460 275 Z" fill="#ffffff"/>
  
  <!-- Scrubber -->
  <rect x="240" y="380" width="460" height="6" rx="3" fill="#334155"/>
  <rect x="240" y="380" width="180" height="6" rx="3" fill="url(#accent3)"/>
  <circle cx="420" cy="383" r="8" fill="#ffffff"/>

  <!-- Typography -->
  <rect x="40" y="40" width="300" height="60" rx="30" fill="url(#accent3)" opacity="0.15"/>
  <text x="70" y="78" font-family="sans-serif" font-weight="bold" font-size="20" fill="#7dd3fc">No-Code Platform</text>
</svg>"""

with open('src/mockData.ts', 'r') as f:
    content = f.read()

content = content.replace('"PLACEHOLDER"', f'"{svg_to_data_uri(svg_1)}"', 1)
content = content.replace('"PLACEHOLDER"', f'"{svg_to_data_uri(svg_2)}"', 1)
content = content.replace('"PLACEHOLDER"', f'"{svg_to_data_uri(svg_3)}"', 1)

with open('src/mockData.ts', 'w') as f:
    f.write(content)
