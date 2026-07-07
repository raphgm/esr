import re

with open("src/App.tsx", "r") as f:
    content = f.read()

star_doodle = """                  <div className="absolute -right-12 -top-12 text-slate-100/60 pointer-events-none -rotate-12">
                    <svg width="250" height="250" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>"""

image_doodle = """                  <div className="absolute left-10 top-1/3 text-slate-100 pointer-events-none rotate-12">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </div>"""

content = content.replace(star_doodle + "\n", "")
content = content.replace(image_doodle + "\n", "")

content = content.replace('<div className="mt-2">', '<div className="mt-2 relative z-10">')

with open("src/App.tsx", "w") as f:
    f.write(content)

