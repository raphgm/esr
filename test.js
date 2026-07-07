const dueDate = "2026-07-08";
const due = new Date(dueDate).getTime();
const now = new Date().getTime();
const hours24 = 24 * 60 * 60 * 1000;
console.log(due - now <= hours24);
