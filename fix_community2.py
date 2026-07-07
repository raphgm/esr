with open("src/components/CommunitySection.tsx", "r") as f:
    lines = f.readlines()

new_lines = lines[:218]
new_lines.extend([
    "    </div>\n",
    "  );\n",
    "}\n"
])

with open("src/components/CommunitySection.tsx", "w") as f:
    f.writelines(new_lines)
