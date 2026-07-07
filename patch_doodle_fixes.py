import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Change z-0 to -z-10
content = content.replace('className="fixed inset-0 pointer-events-none z-0 overflow-hidden"', 'className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"')

# Remove dollar sign doodle
dollar_doodle = """        <div className="absolute left-[5%] top-[15%] text-orange-500/20 rotate-12">
          <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>"""
content = content.replace(dollar_doodle + "\n", "")

# Remove star doodle
star_doodle = """        <div className="absolute right-[5%] top-[20%] text-blue-500/15 -rotate-12">
          <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>"""
content = content.replace(star_doodle + "\n", "")

with open("src/App.tsx", "w") as f:
    f.write(content)
