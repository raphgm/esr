const fs = require('fs');
let code = fs.readFileSync('src/components/ServicesCarousel.tsx', 'utf8');
code = code.replace(/<\/div>\s*<style>\{`/g, '</div>\n      </div>\n      <style>{`');
fs.writeFileSync('src/components/ServicesCarousel.tsx', code);
