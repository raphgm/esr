with open("src/components/ConnectSection.tsx", "r") as f:
    lines = f.readlines()
    
# Keep everything before line 485
new_lines = lines[:484]
new_lines.extend([
    "      </div>\n",
    "    </div>\n",
    "  );\n",
    "}\n"
])

with open("src/components/ConnectSection.tsx", "w") as f:
    f.writelines(new_lines)
