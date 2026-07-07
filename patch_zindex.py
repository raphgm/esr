import re

with open("src/App.tsx", "r") as f:
    content = f.read()

content = content.replace(
    '<div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">',
    '<div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 relative z-10">'
)

with open("src/App.tsx", "w") as f:
    f.write(content)
