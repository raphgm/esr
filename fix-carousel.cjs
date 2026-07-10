const fs = require('fs');
let code = fs.readFileSync('src/components/ServicesCarousel.tsx', 'utf8');

// The goal is to move the scroll container out of the max-w-7xl div.
// First, find the end of the header div (which contains the arrows).
// And close the max-w-7xl div there.
// Then update the scroll container's classes.

code = code.replace(
  /<\/div>\s*<\/div>\s*<div\s*ref=\{scrollRef\}\s*className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-8 pt-2 px-2 hide-scrollbar"/,
  `</div>\n      </div>\n      </div>\n      <div\n        ref={scrollRef}\n        className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-8 pt-2 hide-scrollbar px-4 md:px-8 xl:px-[calc((100vw-80rem)/2+2rem)]"`
);

// Then remove one closing </div> right before <style> because we closed the max-w-7xl earlier.
code = code.replace(/<\/div>\s*<\/div>\s*<style>\{`/, '</div>\n      <style>{`');

fs.writeFileSync('src/components/ServicesCarousel.tsx', code);
