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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-estrrplatformcom-7790c801-2fcb-460f-a9ad-b14134dd87a6");

// Verify Firebase configuration internally
async function testConnection() {
  try {
    if (firebaseConfig.apiKey && firebaseConfig.projectId) {
      await getDocFromServer(doc(db, 'test', 'connection'));
      console.log("Firebase connection validated successfully.");
    }
  } catch (error: any) {
    if(error?.code === 'unavailable' || (error instanceof Error && (error.message.includes('the client is offline') || error.message.includes('network-request-failed')))) {
      console.warn("Firebase client is currently offline or warming up. It will reconnect automatically.");
    } else {
      console.error("Firebase connection check failed:", error?.message || error);
    }
  }
}
// testConnection();

// Error handling types
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

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): void {
  console.error(`Firestore Error [${operationType}] at ${path}:`, JSON.stringify(error));
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
  console.error('Detailed Firestore Error Info: ', JSON.stringify(errInfo));
  // DO NOT THROW. Throwing here causes unhandled promise rejections that crash the app when fetching data!
}

const defaultProfile: UserProfile = {
  name: "Chinedu Okafor",
  email: "chinedu@estarrapp.com",
  profession: "Principal AI Engineer & Cloud Architect",
  bio: "Helping African startups build scalable infrastructure.",
  location: "Lagos, Nigeria",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  skills: ["System Architecture", "Cloud Computing"],
  interests: ["Fintech"],
  goals: ["Architect platforms"],
  certifications: ["GCP Data Engineer"],
  recommends: 48,
  birthdate: "1998-07-06",
  walletBalance: 0,
  instructorEarnings: 312000,
  unlockedCourseIds: ["c1", "c3"],
  role: "Apprentice Guide",
  level: "Silver Creator",
  points: 1250,
  history: [],
  portfolio: [],
  sidebarTheme: "ivory"
};

export async function saveUserProfile(uid: string, profile: Partial<UserProfile>) {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      await updateDoc(userRef, { ...userSnap.data(), ...profile });
    } else {
      await setDoc(userRef, { ...defaultProfile, ...profile });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${uid}`);
  }
}

export async function getUserProfile(uid: string, fallbackEmail?: string, fallbackName?: string): Promise<UserProfile> {
  const isAdminEmail = (email?: string) => {
    if (!email) return false;
    const norm = email.trim().toLowerCase();
    return norm === "rdgabmomoh@gmail.com" || norm === "raphdafemomoh@gmail.com";
  };
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      const email = data?.email || fallbackEmail || "";
      return {
        ...defaultProfile,
        ...data,
        email: email,
        role: isAdminEmail(email) ? "Administrator" : (data?.role || defaultProfile.role),
      } as UserProfile;
    } else {
      const email = fallbackEmail || "";
      const isAdmin = isAdminEmail(email);
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
    handleFirestoreError(error, OperationType.GET, `users/${uid}`);
    return {
      ...defaultProfile,
      email: fallbackEmail || "",
      name: fallbackName || "New User"
    };
  }
}

export async function getCollectionData<T extends { id: string }>(
  collectionName: string,
  initialSeed: T[]
): Promise<T[]> {
  try {
    const colRef = collection(db, collectionName);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items: T[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() } as T));
      return items;
    } else {
      for (const item of initialSeed) {
        await setDoc(doc(db, collectionName, item.id), item);
      }
      return initialSeed;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, collectionName);
    return initialSeed;
  }
}

export async function saveCollectionItem<T extends { id: string }>(
  collectionName: string,
  item: T
) {
  try {
    const cleanedItem = removeUndefined(item);
    await setDoc(doc(db, collectionName, item.id), cleanedItem);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${collectionName}/${item.id}`);
  }
}

function removeUndefined(obj: any): any {
  if (obj === undefined) return undefined;
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(removeUndefined);
  }
  const newObj: any = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      newObj[key] = removeUndefined(obj[key]);
    }
  }
  return newObj;
}

export async function deleteCollectionItem(collectionName: string, itemId: string) {
  try {
    await deleteDoc(doc(db, collectionName, itemId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${itemId}`);
  }
}

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
    handleFirestoreError(error, OperationType.GET, collectionName);
  });
}

export { where, orderBy, limit };
