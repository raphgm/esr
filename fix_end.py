import sys

filename = sys.argv[1]
with open(filename, "r") as f:
    content = f.read()

content = content.replace("  );\n}", "    </div>\n  );\n}")

with open(filename, "w") as f:
    f.write(content)

