with open("src/components/ConnectSection.tsx", "r") as f:
    content = f.read()

content = content.replace("    </div>\n  );\n              })}", "            );\n              })}")

with open("src/components/ConnectSection.tsx", "w") as f:
    f.write(content)

