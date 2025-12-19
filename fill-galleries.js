const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'lib', 'data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

// Extract all images
const imageRegex = /'(https:\/\/cdn\.shopify\.com\/s\/files\/[^']+)'/g;
const images = [];
let match;
const seen = new Set();
while ((match = imageRegex.exec(content)) !== null) {
  if (!seen.has(match[1])) {
    images.push(match[1]);
    seen.add(match[1]);
  }
}
console.log(`Total unique images: ${images.length}`);

// For each product without images, add a gallery
const productPattern = /(\{\s*id:\s*'(\d+)',\s*name:\s*'([^']+)',\s*category:\s*'[^']*',\s*price:\s*[^,]+,\s*originalPrice:\s*[^,]+,\s*image:\s*'([^']+)',)\s*(description:)/g;

let added = 0;
content = content.replace(productPattern, (match, prefix, id, name, imageUrl, descKeyword) => {
  // Check if already has images array
  if (match.includes('images:')) {
    return match;
  }

  // Generate gallery
  const gallery = [imageUrl];
  const used = new Set([imageUrl]);
  
  // Match by keywords
  const keywords = name.toLowerCase().replace(/[^a-z0-9]/g, ' ').split(/\s+/).filter(w => w.length > 2);
  
  for (const keyword of keywords) {
    if (gallery.length >= 4) break;
    for (const img of images) {
      if (used.has(img)) continue;
      if (img.toLowerCase().includes(keyword)) {
        gallery.push(img);
        used.add(img);
        if (gallery.length >= 4) break;
      }
    }
  }

  // Add lifestyle images if needed
  while (gallery.length < 3) {
    for (const img of images) {
      if (used.has(img)) continue;
      if (img.includes('photoroom') || img.includes('lifestyle')) {
        gallery.push(img);
        used.add(img);
        break;
      }
    }
    break;
  }

  if (gallery.length >= 2) {
    const imagesArray = `,\n    images: [\n      ${gallery.map(u => `'${u}'`).join(',\n      ')}\n    ]`;
    added++;
    return prefix + imagesArray + ',\n    ' + descKeyword;
  }
  
  return match;
});

fs.writeFileSync(dataPath, content, 'utf-8');
console.log(`✓ Added galleries to ${added} products`);
