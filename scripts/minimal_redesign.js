const fs = require('fs');

let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// Container Styles
content = content.replace(/bg-gradient-to-br from-\w+-50 to-\w+-100/g, 'bg-white');
content = content.replace(/bg-\w+-50 p-6/g, 'bg-white p-6');
content = content.replace(/border-(blue|green|purple|orange)-200/g, 'border-gray-200');
content = content.replace(/text-(blue|green|purple|orange)-900/g, 'text-gray-500 uppercase text-xs tracking-wider');
content = content.replace(/text-(blue|green|purple|orange)-600/g, 'text-black');

// Primary Accent Colors
content = content.replace(/bg-\[\#007AFF\]/g, 'bg-black');
content = content.replace(/hover:bg-\[\#005bb5\]/g, 'hover:bg-gray-800 hover:shadow-lg');
content = content.replace(/border-\[\#007AFF\]/g, 'border-black');
content = content.replace(/text-\[\#007AFF\]/g, 'text-black');

// Border Radii and Shadows
content = content.replace(/rounded-3xl/g, 'rounded-xl');
content = content.replace(/rounded-2xl/g, 'rounded-xl');
content = content.replace(/shadow-\[0_8px_30px_rgb\(0,0,0,0.08\)\]/g, 'shadow-sm');

// Form outlines
content = content.replace(/bg-blue-50 border-2 border-blue-200/g, 'bg-gray-50 border border-gray-200');
content = content.replace(/border-blue-300/g, 'border-gray-300');
content = content.replace(/focus:ring-blue-500/g, 'focus:ring-black');
content = content.replace(/placeholder-blue-300/g, 'placeholder-gray-400');

fs.writeFileSync('src/app/admin/page.tsx', content);

console.log("Completed monochrome Vercel styling migration.");
