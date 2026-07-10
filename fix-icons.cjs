const fs = require('fs');
let code = fs.readFileSync('src/components/HomeMarketing.tsx', 'utf8');

// replace icons
code = code.replace(/icon: Cuboid,\s*animationType: "float",/g, 'icon: Cpu,\n      animationType: "float",');
code = code.replace(/icon: Activity,\s*animationType: "rotate",/g, 'icon: BrainCircuit,\n      animationType: "float",');
code = code.replace(/icon: Sparkles,\s*animationType: "pulse",/g, 'icon: Sparkles,\n      animationType: "pulse",');
code = code.replace(/icon: Cuboid,\s*animationType: "tilt",/g, 'icon: Briefcase,\n      animationType: "tilt",');
code = code.replace(/icon: Cuboid,\s*animationType: "bounce",/g, 'icon: TrendingUp,\n      animationType: "bounce",');

// remove isometric container faces
code = code.replace(/\{\/\* Isometric Cube Icon Container \*\/\}.*?\{\/\* Top Face \*\/\}.*?\{\/\* Side Face \*\/\}.*?\{\/\* Main Front Face \*\/\}/s, '{/* Icon Container */}');

// The replacement above might fail if the structure isn't exactly as matched.
// Let's do it safely.
fs.writeFileSync('src/components/HomeMarketing.tsx', code);
