const fs = require('fs');
let code = fs.readFileSync('src/components/ServicesCarousel.tsx', 'utf8');
code = code.replace(/(\s*)<\/div>\s*<style>\{`/g, '$1</div>$1</div>$1<style>{`');
fs.writeFileSync('src/components/ServicesCarousel.tsx', code);
