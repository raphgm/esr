import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacement = """          if (userEmail === "chinedu@estarrapp.com") {
            setTasks(homeDemoTasks);
          } else {
            const userSpecificTasks = homeDemoTasks.filter(t => t.userId === user.uid);
            setTasks(userSpecificTasks);
          }"""

content = re.sub(r'          if \(userEmail === "chinedu@estarrapp\.com"\) \{\n            setTasks\(fetchedTasks\);\n          \} else \{\n            const userSpecificTasks = fetchedTasks\.filter\(t => t\.userId === user\.uid\);\n            setTasks\(userSpecificTasks\);\n          \}', replacement, content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)
