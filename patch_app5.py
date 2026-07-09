import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacement = """          if (fetchedTasks.length === 0) {
            setTasks(homeDemoTasks);
          } else {
            setTasks(fetchedTasks);
          }"""

content = re.sub(r'          if \(userEmail === "chinedu@estarrapp\.com"\) \{\n            setTasks\(homeDemoTasks\);\n          \} else \{\n            const userSpecificTasks = homeDemoTasks\.filter\(t => t\.userId === user\.uid\);\n            setTasks\(userSpecificTasks\);\n          \}', replacement, content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)
