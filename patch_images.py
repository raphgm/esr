import re

with open("src/components/RealEstateSection.tsx", "r") as f:
    content = f.read()

content = content.replace('https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=200', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=200')
content = content.replace('<img src=', '<img referrerPolicy="no-referrer" src=')

with open("src/components/RealEstateSection.tsx", "w") as f:
    f.write(content)
