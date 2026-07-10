const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(
  /type: "single" \| "multiple" \| "text"/g,
  'type: "single" | "multiple" | "text" | "code"'
);

code = code.replace(
  /questions: \{ id: string; question: string; options\?: string\[\]; type: "single" \| "multiple" \| "text" \| "code" \}\[\];/g,
  'questions: { id: string; question: string; options?: string[]; type: "single" | "multiple" | "text" | "code"; language?: string; codeSnippet?: string }[];'
);

code = code.replace(
  /type: "survey" \| "poll"/g,
  'type: "survey" | "poll" | "code_task"'
);

fs.writeFileSync('src/types.ts', code);
