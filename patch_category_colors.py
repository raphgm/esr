import re

with open('src/components/ProjectsSection.tsx', 'r') as f:
    content = f.read()

replacement = """                      const categoryColors: Record<string, string> = {
                        infrastructure: "bg-pink-50 text-pink-600 border-pink-200",
                        security: "bg-cyan-50 text-cyan-600 border-cyan-200",
                        ai_ml: "bg-fuchsia-50 text-fuchsia-500 border-fuchsia-200",
                      };"""

content = re.sub(r'const categoryColors: Record<string, string> = \{\n\s*marketing: "bg-pink-50 text-pink-600 border-pink-200",\n\s*dev: "bg-cyan-50 text-cyan-600 border-cyan-200",\n\s*design: "bg-fuchsia-50 text-fuchsia-500 border-fuchsia-200",\n\s*\};', replacement, content, flags=re.DOTALL)

with open('src/components/ProjectsSection.tsx', 'w') as f:
    f.write(content)
