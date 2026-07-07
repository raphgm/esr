const fs = require('fs');

function replaceInFile(file, replacements) {
  let code = fs.readFileSync(file, 'utf-8');
  for (const [key, value] of Object.entries(replacements)) {
    code = code.split(key).join(value);
  }
  fs.writeFileSync(file, code);
}

replaceInFile('src/App.tsx', {
  'EstrR Connect Platform': 'Connect Platform',
  'including EstrR Connect.': 'including Connect.',
  'EstrR Job market': 'Jobs Board'
});

replaceInFile('src/components/ProjectsSection.tsx', {
  'title="EstrR Escrow & Paid Milestones Hub"': 'title="Escrow Hub & Paid Milestones"',
  'EstrR Escrow': 'Escrow'
});

replaceInFile('src/components/MarketplaceSection.tsx', {
  'title="EstrR Escrow Marketplace"': 'title="Escrow Marketplace"',
  'Sell on EstrR Marketplace': 'Sell on the Marketplace'
});

replaceInFile('src/components/AnalyticsSection.tsx', {
  'title="EstrR Verified Analytics & Media Kit"': 'title="Verified Analytics & Media Kit"'
});

replaceInFile('src/components/AcademySection.tsx', {
  'title="EstrR Academy Ecosystem"': 'title="Academy Ecosystem"',
  'EstrR Academy:': 'Academy:'
});

replaceInFile('src/components/ConnectSection.tsx', {
  'EstrR Academy:': 'Academy:'
});

console.log('SUCCESS');
