import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

const homeDemoTasks = [
  { id: "t1", title: "Distributed System Migration", desc: "$250,000 || Enterprise Corp || Architect and deploy a scalable microservices infrastructure with high availability.", status: "inprogress", priority: "High", assignee: "Enterprise Corp", dueDate: "2026-07-12", category: "infrastructure" },
  { id: "t2", title: "AI Agent Orchestration Pipeline", desc: "$180,000 || FinTech Next || Develop and integrate a fleet of autonomous agents for predictive financial modeling.", status: "todo", priority: "Medium", assignee: "FinTech Next", dueDate: "2026-07-15", category: "ai_ml" },
  { id: "t3", title: "Cloud Native Security Audit", desc: "$120,000 || SecureCloud Tech || Perform comprehensive security audit and implement zero-trust architecture for enterprise cloud.", status: "review", priority: "High", assignee: "SecureCloud Tech", dueDate: "2026-07-09", category: "security" }
];

async function run() {
  const tasksRef = collection(db, 'tasks');
  const snap = await getDocs(tasksRef);
  
  for (const d of snap.docs) {
    if (d.data().title.includes("TikTok Meme Ad") || d.data().title.includes("Instagram Reels") || d.data().title.includes("UGC Styling")) {
        await deleteDoc(d.ref);
    }
  }

  for (const t of homeDemoTasks) {
    await setDoc(doc(db, 'tasks', t.id), t);
  }
  console.log("Tasks updated!");
}

run();
