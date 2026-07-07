const fs = require('fs');
let code = fs.readFileSync('src/components/ServicesCarousel.tsx', 'utf-8');

const replacements = {
  'label: "EstrR Connect"': 'label: "Connect"',
  'label: "EstrR Academy"': 'label: "Academy"',
  'label: "EstrR Marketplace"': 'label: "Marketplace"',
  'label: "EstrR Escrow Hub"': 'label: "Escrow Hub"',
  'label: "EstrR Gigs"': 'label: "Gigs"',
  'label: "EstrR Payments"': 'label: "Payments"',
  'label: "EstrR Events"': 'label: "Events"',
  'label: "EstrR Analytics & Media Kit"': 'label: "Analytics & Media Kit"',
  'label: "EstrR Community"': 'label: "Community"',
  'label: "EstrR Companion App"': 'label: "Companion App"'
};

for (const [key, value] of Object.entries(replacements)) {
  code = code.replace(key, value);
}

// Since the label is no longer "EstrR ...", replace("EstrR ", "") does nothing.
code = code.replace(
  '{service.label.replace("EstrR ", "")}',
  '{service.label}'
);

fs.writeFileSync('src/components/ServicesCarousel.tsx', code);
console.log('SUCCESS');
