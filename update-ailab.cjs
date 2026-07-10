const fs = require('fs');
let code = fs.readFileSync('src/components/AILabSection.tsx', 'utf8');

if (!code.includes('import { AILabClientSection }')) {
  code = code.replace(
    'import { UserProfile } from "../types";',
    'import { UserProfile } from "../types";\nimport { AILabClientSection } from "./AILabClientSection";'
  );
}

const functionStart = 'export const AILabSection: React.FC<AILabSectionProps> = ({ userProfile }) => {';
const newFunctionStart = `export const AILabSection: React.FC<AILabSectionProps> = ({ userProfile }) => {
  if (userProfile?.accountType === "jobOwner") {
    return <AILabClientSection userProfile={userProfile} />;
  }
`;

code = code.replace(functionStart, newFunctionStart);
fs.writeFileSync('src/components/AILabSection.tsx', code);
