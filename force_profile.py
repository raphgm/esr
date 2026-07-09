import re

with open('src/lib/firebase.ts', 'r') as f:
    content = f.read()

# Make getUserProfile always overwrite the existing data with defaultProfile (except email and name)
replacement = """    if (userSnap.exists()) {
      const data = userSnap.data();
      const email = data?.email || fallbackEmail || "";
      const updatedProfile = {
        ...data,
        ...defaultProfile, // FORCE defaultProfile OVERWRITE
        name: data.name,
        email: email,
        role: isAdminEmail(email) ? "Administrator" : (data?.role || defaultProfile.role),
        history: data.history || defaultProfile.history
      };
      await setDoc(userRef, updatedProfile); // update DB
      return updatedProfile as UserProfile;
    }"""

content = re.sub(r'    if \(userSnap\.exists\(\)\) \{.*?\} as UserProfile;\n    \}', replacement, content, flags=re.DOTALL)

with open('src/lib/firebase.ts', 'w') as f:
    f.write(content)

