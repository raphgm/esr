import re

with open('src/lib/firebase.ts', 'r') as f:
    content = f.read()

fixed = """/**
 * Saves or updates user profile in Firestore
 */
export async function saveUserProfile(uid: string, profile: Partial<UserProfile>) {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const fullProfile = {
        ...userSnap.data(),
        ...profile,
      };
      await updateDoc(userRef, fullProfile);
    } else {
      const fullProfile = {
        ...defaultProfile,
        ...profile,
      };
      await setDoc(userRef, fullProfile);
    }
  } catch (error) {
    console.error("Error saving user profile to Firestore:", error);
    handleFirestoreError(error, OperationType.WRITE, `users/${uid}`);
  }
}

/**
 * Gets user profile from Firestore or creates it if not exists (fallback)
 */
export async function getUserProfile(uid: string, fallbackEmail?: string, fallbackName?: string): Promise<UserProfile> {
  const isAdminEmail = (email?: string) => {
    if (!email) return false;
    const normalized = email.trim().toLowerCase();
    return normalized === "rdgabmomoh@gmail.com" || normalized === "raphdafemomoh@gmail.com";
  };

  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
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
    } else {
      const email = fallbackEmail || "";
      const isAdmin = isAdminEmail(email);
      // Create a default profile for the new user
      const initialUser: UserProfile = {
        ...defaultProfile,
        email: email,
        name: fallbackName || fallbackEmail?.split("@")[0] || "New User",
        role: isAdmin ? "Administrator" : defaultProfile.role,
        walletBalance: 0,
        instructorEarnings: 0,
        unlockedCourseIds: [],
        points: 0,
        history: []
      };
      await setDoc(userRef, initialUser);
      return initialUser;
    }
  } catch (error) {
    console.error("Error getting user profile from Firestore:", error);
    handleFirestoreError(error, OperationType.GET, `users/${uid}`);
  }
}
"""

content = re.sub(r'/\*\*\n \* Saves or updates user profile in Firestore\n \*/\nexport async function saveUserProfile\(uid: string, profile: Partial<UserProfile>\) \{.*?console\.error\("Error getting user profile from Firestore:", error\);\n    handleFirestoreError\(error, OperationType\.GET, `users/\$\{uid\}`\);\n  \}\n\}', fixed, content, flags=re.DOTALL)

with open('src/lib/firebase.ts', 'w') as f:
    f.write(content)
