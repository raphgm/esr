with open("src/App.tsx", "r") as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if "Diaspora property { id:" in line:
        new_lines.append('            { id: "real-estate", label: "LOUD Real Estate", desc: "Diaspora property & construction", icon: Building },\n')
    else:
        new_lines.append(line)

with open("src/App.tsx", "w") as f:
    f.writelines(new_lines)
