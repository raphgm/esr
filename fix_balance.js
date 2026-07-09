import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("firebase-applet-config.json", "utf8"));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", "raphdafemomoh@gmail.com"));
  const snapshot = await getDocs(q);
  for (const docSnap of snapshot.docs) {
    console.log("Updating", docSnap.id);
    await updateDoc(doc(db, "users", docSnap.id), {
      walletBalance: 0,
      history: []
    });
  }
  console.log("Done");
  process.exit(0);
}

run().catch(console.error);
