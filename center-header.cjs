const fs = require('fs');
let code = fs.readFileSync('src/components/ServicesCarousel.tsx', 'utf8');

code = code.replace(
  /<div className="flex justify-between items-end mb-8 px-2">\s*<div>\s*<span className="text-\[10px\] font-mono font-bold text-purple-600 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full uppercase tracking-widest inline-block mb-2">\s*✨ Interactive Workspace modules\s*<\/span>\s*<h3 className="text-2xl font-bold uppercase tracking-tight text-slate-900">\s*Explore Ecosystem\s*<\/h3>\s*<\/div>\s*<div className="flex gap-2">/g,
  `<div className="flex items-end mb-8 px-2 relative w-full">
          <div className="flex-1 flex flex-col items-center text-center">
            <span className="text-[10px] font-mono font-bold text-purple-600 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full uppercase tracking-widest inline-block mb-2">
              ✨ Interactive Workspace modules
            </span>
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-slate-900">
              Explore Ecosystem
            </h3>
          </div>
          <div className="absolute right-2 bottom-0 flex gap-2">`
);

fs.writeFileSync('src/components/ServicesCarousel.tsx', code);
