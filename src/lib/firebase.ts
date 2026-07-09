import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
  getDocFromServer,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint
} from "firebase/firestore";
import { UserProfile } from "../types";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase using the correct configuration from firebase-applet-config.json
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Validate Connection to Firestore on boot
async function testConnection() {
  try {
    // Only attempt if we have a valid config
    if (firebaseConfig.apiKey && firebaseConfig.projectId) {
      await getDocFromServer(doc(db, 'test', 'connection'));
      console.log("Firebase connection validated successfully.");
    }
  } catch (error) {
    if(error instanceof Error && (error.message.includes('the client is offline') || error.message.includes('network-request-failed'))) {
      console.error("Firebase connection failed. Please check your network or Firebase configuration in the console. Error:", error.message);
    } else {
      // Ignore other errors during initial test as 'test/connection' doc likely doesn't exist
    }
  }
}
testConnection();

// Error handling types and utility as required by firebase-integration skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Default initial profile structure to merge with
const defaultProfile: UserProfile = {
  name: "Chinedu Okafor",
  email: "chinedu@estarrapp.com",
  profession: "Principal AI Engineer & Cloud Architect",
  bio: "Helping African startups build scalable infrastructure. Specializes in distributed systems, AI agent development, and enterprise cloud migrations.",
  location: "Lagos, Nigeria",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  formalSkills: ["System Architecture", "Cloud Computing", "API Development", "CI/CD Pipelines"],
  creatorSkills: ["Kubernetes", "Docker", "AWS", "Terraform"],
  skills: ["System Architecture", "Cloud Computing", "API Development", "CI/CD Pipelines"],
  interests: ["Fintech", "Direct Response Marketing", "Streetwear Styling", "SaaS Growth"],
  goals: ["Architect 5 high-scale cloud-native platforms", "Mentor 100 aspiring African AI engineers", "Contribute to core open-source MLOps tools"],
  certifications: ["AWS Certified Solutions Architect (2025)", "Google Cloud Professional Data Engineer (2025)", "skill-sch.com: Certified Software Architect (2026)"],
  recommends: 48,
  birthdate: "1998-07-06",
  walletBalance: 842500,
  instructorEarnings: 312000,
  unlockedCourseIds: ["c1", "c3"],
  role: "Apprentice Guide",
  level: "Silver Creator",
  points: 1250,
  history: [
    { type: "payout", amount: 250000, date: "2026-07-01", desc: "Coca-Cola Reels Milestone Payment" },
    { type: "payout", amount: 180000, date: "2026-06-28", desc: "PiggyVest Integration Commission" },
    { type: "academy", amount: -45000, date: "2026-06-15", desc: "Unlocked Premium Trade Skills Academy Module" }
  ],
  portfolio: [
    { id: "p-1", title: "Distributed Kubernetes Cluster Migration", url: "https://github.com/chinedu/k8s-cluster-migration", category: "Cloud Architecture", views: 45000, likes: 3200 },
    { id: "p-2", title: "Enterprise AI Agent Deployment", url: "https://github.com/chinedu/ai-agent-deployment", category: "AI Engineering", views: 125000, likes: 9800 },
  ]
};

/**
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
        history: data.history || defaultProfile.history,
        portfolio: defaultProfile.portfolio
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


/**
 * Loads a collection from Firestore, seeding it with initial data if it is empty.
 */
export async function getCollectionData<T extends { id: string }>(
  collectionName: string,
  initialSeed: T[]
): Promise<T[]> {
  try {
    const colRef = collection(db, collectionName);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items: T[] = [];
      snap.forEach((d) => {
        items.push({ id: d.id, ...d.data() } as T);
      });
      return items;
    } else {
      console.log(`Seeding collection ${collectionName} with initial mock data...`);
      for (const item of initialSeed) {
        await setDoc(doc(db, collectionName, item.id), item);
      }
      return initialSeed;
    }
  } catch (error) {
    console.error(`Error loading or seeding collection ${collectionName}:`, error);
    handleFirestoreError(error, OperationType.GET, collectionName);
  }
}

/**
 * Saves or updates a single item in a collection in Firestore.
 */
export async function saveCollectionItem<T extends { id: string }>(
  collectionName: string,
  item: T
) {
  try {
    await setDoc(doc(db, collectionName, item.id), item);
  } catch (error) {
    console.error(`Error saving item ${item.id} to collection ${collectionName}:`, error);
    handleFirestoreError(error, OperationType.WRITE, `${collectionName}/${item.id}`);
  }
}

/**
 * Deletes a single item from a collection in Firestore.
 */
export async function deleteCollectionItem(collectionName: string, itemId: string) {
  try {
    await deleteDoc(doc(db, collectionName, itemId));
  } catch (error) {
    console.error(`Error deleting item ${itemId} from collection ${collectionName}:`, error);
    handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${itemId}`);
  }
}

/**
 * Subscribes to real-time updates for a Firestore collection with optional constraints.
 */
export function subscribeToCollection<T extends { id: string }>(
  collectionName: string,
  callback: (items: T[]) => void,
  ...constraints: QueryConstraint[]
) {
  const q = query(collection(db, collectionName), ...constraints);
  return onSnapshot(q, (snapshot) => {
    const items: T[] = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as T);
    });
    callback(items);
  }, (error) => {
    console.error(`Error subscribing to collection ${collectionName}:`, error);
    handleFirestoreError(error, OperationType.GET, collectionName);
  });
}

export { where, orderBy, limit };
