import re

with open('src/mockData.ts', 'r') as f:
    content = f.read()

replacement = """  {
    id: "post-text-1",
    author: "Fatima Bello",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    role: "Culinary Artist",
    content: "Just graduated from the 'Zero to Cook' signature program on the Academy! 🍳 Today I secured my first small catering gig for an office launch in Ikeja. Moving from learning to earning is real!\\n\\nall because the platform is not focused on only IT skills",
    likes: 120,
    comments: [
      { author: "Platform Admin", content: "Congratulations Fatima! We love seeing our talent thrive. Next stop: Global Enterprise catering contracts!", time: "4h ago" }
    ],
    time: "5h ago"
  },"""

content = re.sub(r'  \{\n    id: "post-text-1",\n    author: "Fatima Bello",.*?time: "5h ago"\n  \},', replacement, content, flags=re.DOTALL)

with open('src/mockData.ts', 'w') as f:
    f.write(content)
