import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacement = """          // Cleanup old tasks
          const validTasks = fetchedTasks.filter(t => !(t.title.includes("TikTok Meme Ad") || t.title.includes("Instagram Reels") || t.title.includes("UGC Styling")));
          
          fetchedTasks.forEach(async (t) => {
            if (t.title.includes("TikTok Meme Ad") || t.title.includes("Instagram Reels") || t.title.includes("UGC Styling")) {
              try { await deleteCollectionItem("tasks", t.id); } catch(e) {}
            }
          });
          homeDemoTasks.forEach(async (t) => {
             await saveCollectionItem("tasks", t);
          });
          
          if (validTasks.length === 0) {
            setTasks(homeDemoTasks);
          } else {
            setTasks(validTasks);
          }"""

content = re.sub(r'          // Cleanup old tasks\n          fetchedTasks\.forEach\(async \(t\) => \{\n            if \(t\.title\.includes\("TikTok Meme Ad"\) \|\| t\.title\.includes\("Instagram Reels"\) \|\| t\.title\.includes\("UGC Styling"\)\) \{\n              try \{ await deleteCollectionItem\("tasks", t\.id\); \} catch\(e\) \{\}\n            \}\n          \}\);\n          homeDemoTasks\.forEach\(async \(t\) => \{\n             await saveCollectionItem\("tasks", t\);\n          \}\);\n          \n          if \(fetchedTasks\.length === 0\) \{\n            setTasks\(homeDemoTasks\);\n          \} else \{\n            setTasks\(fetchedTasks\);\n          \}', replacement, content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)
