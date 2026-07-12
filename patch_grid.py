with open('src/components/AILabSection.tsx', 'r') as f:
    code = f.read()

code = code.replace(
    'className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"',
    'className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"'
)

with open('src/components/AILabSection.tsx', 'w') as f:
    f.write(code)

print("Patched grid")
