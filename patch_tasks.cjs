const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  '{ id: "t1", title: "Instagram Reels Campaign Video", desc: "₦250,000 || Coca-Cola Nigeria || Shoot 1x aesthetic morning routine Reel featuring Coke Zero Sugar and tag @cocacolanigeria.", status: "inprogress", priority: "High", assignee: "Coca-Cola Nigeria", dueDate: "2026-07-12" }',
  '{ id: "t1", title: "Instagram Reels Campaign Video", desc: "₦250,000 || Coca-Cola Nigeria || Shoot 1x aesthetic morning routine Reel featuring Coke Zero Sugar and tag @cocacolanigeria.", status: "inprogress", priority: "High", assignee: "Coca-Cola Nigeria", dueDate: "2026-07-12", category: "marketing" }'
);
code = code.replace(
  '{ id: "t2", title: "TikTok Meme Ad Integration", desc: "₦180,000 || PiggyVest Fintech || Produce 1x high-retention funny meme TikTok video showcasing the automated savings features of PiggyVest.", status: "todo", priority: "Medium", assignee: "PiggyVest Fintech", dueDate: "2026-07-15" }',
  '{ id: "t2", title: "TikTok Meme Ad Integration", desc: "₦180,000 || PiggyVest Fintech || Produce 1x high-retention funny meme TikTok video showcasing the automated savings features of PiggyVest.", status: "todo", priority: "Medium", assignee: "PiggyVest Fintech", dueDate: "2026-07-15", category: "design" }'
);
code = code.replace(
  '{ id: "t3", title: "UGC Styling Video Reel", desc: "₦120,000 || Kala Bespoke Fashion || Deliver 1x aesthetic unboxing and styling walkthrough of the latest summer linen jackets.", status: "review", priority: "High", assignee: "Kala Bespoke Fashion", dueDate: "2026-07-09" }',
  '{ id: "t3", title: "UGC Styling Video Reel", desc: "₦120,000 || Kala Bespoke Fashion || Deliver 1x aesthetic unboxing and styling walkthrough of the latest summer linen jackets.", status: "review", priority: "High", assignee: "Kala Bespoke Fashion", dueDate: "2026-07-09", category: "dev" }'
);

fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
