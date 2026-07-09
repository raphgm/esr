import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacement = """          const fetchedTasks = await getCollectionData<ProjectTask>("tasks", initialTasks);
          
          // Cleanup old tasks
          fetchedTasks.forEach(async (t) => {
            if (t.title.includes("TikTok Meme Ad") || t.title.includes("Instagram Reels") || t.title.includes("UGC Styling")) {
              try { await deleteCollectionItem("tasks", t.id); } catch(e) {}
            }
          });
          homeDemoTasks.forEach(async (t) => {
             await saveCollectionItem("tasks", t);
          });
          """

content = content.replace('          const fetchedTasks = await getCollectionData<ProjectTask>("tasks", initialTasks);', replacement)

with open('src/App.tsx', 'w') as f:
    f.write(content)
