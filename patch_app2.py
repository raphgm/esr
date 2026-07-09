import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

target = """          const fetchedCourses = await getCollectionData<Course>("courses", initialCourses);
          setCourses(initialCourses);
          
          // Cleanup old courses not in initialCourses
          fetchedCourses.forEach(async (c) => {
            if (!initialCourses.find(ic => ic.id === c.id)) {
              try {
                await deleteCollectionItem("courses", c.id);
              } catch(e) {}
            }
          });
          initialCourses.forEach(async (c) => {
            await saveCollectionItem("courses", c);
          });"""

replacement = """          const fetchedCourses = await getCollectionData<Course>("courses", initialCourses);
          setCourses(fetchedCourses);"""

content = content.replace(target, replacement)

with open('src/App.tsx', 'w') as f:
    f.write(content)
