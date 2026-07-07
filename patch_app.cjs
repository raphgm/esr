const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace('12 APPS', '12 MODULES');
code = code.replace('Ecosystem Apps', 'Ecosystem Modules');

const replacements = {
  'label: "EstrR Home"': 'label: "Home"',
  'label: "EstrR Academy"': 'label: "Academy"',
  'label: "EstrR Creator Analytics"': 'label: "Creator Analytics"',
  'label: "EstrR Escrow Hub"': 'label: "Escrow Hub"',
  'label: "EstrR Jobs Board"': 'label: "Jobs Board"',
  'label: "EstrR Gigs"': 'label: "Gigs"',
  'label: "EstrR Marketplace"': 'label: "Marketplace"',
  'label: "EstrR Real Estate"': 'label: "Real Estate"',
  'label: "EstrR Connect"': 'label: "Connect"',
  'label: "EstrR Community"': 'label: "Community"',
  'label: "EstrR Events"': 'label: "Events"',
  'label: "EstrR Payments"': 'label: "Payments"',
  'label: "EstrR Companion App"': 'label: "Companion App"'
};

for (const [key, value] of Object.entries(replacements)) {
  code = code.replace(key, value);
}

fs.writeFileSync('src/App.tsx', code);
console.log('SUCCESS');
