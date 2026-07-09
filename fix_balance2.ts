import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("firebase-applet-config.json", "utf8"));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    if (data.walletBalance === 842500) {
      console.log("Updating", docSnap.id);
      await updateDoc(doc(db, "users", docSnap.id), {
        walletBalance: 0,
        history: []
      });
    }
  }
  console.log("Done");
  process.exit(0);
}

run().catch(console.error);
