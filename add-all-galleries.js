const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'lib', 'data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

// Extract all image URLs that exist in the data
const imageRegex = /'(https:\/\/cdn\.shopify\.com\/s\/files\/[^']+)'/g;
const allImageUrls = new Set();
let match;
while ((match = imageRegex.exec(content)) !== null) {
  allImageUrls.add(match[1]);
}

// Create a smart lookup by filename
const imagesByKeyword = {};
allImageUrls.forEach(url => {
  const parts = url.toLowerCase().split('/files/')[1].split('?')[0];
  const keywords = parts.split('_').concat(parts.split('-'));
  keywords.forEach(kw => {
    if (kw.length > 2) {
      if (!imagesByKeyword[kw]) imagesByKeyword[kw] = [];
      if (!imagesByKeyword[kw].includes(url)) imagesByKeyword[kw].push(url);
    }
  });
});

function findGalleryImages(productName, mainImageUrl) {
  const gallery = [mainImageUrl];
  const used = new Set([mainImageUrl]);
  
  // Extract search keywords from product name
  const keywords = productName
    .toLowerCase()
    .replace(/[®™]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(k => k.length > 2);

  // Try to find matching images by keyword
  for (const keyword of keywords) {
    if (gallery.length >= 4) break;
    if (imagesByKeyword[keyword]) {
      for (const img of imagesByKeyword[keyword]) {
        if (!used.has(img)) {
          gallery.push(img);
          used.add(img);
          if (gallery.length >= 4) break;
        }
      }
    }
  }

  // If still need images, add some lifestyle/photoroom images
  if (gallery.length < 3) {
    for (const [kw, urls] of Object.entries(imagesByKeyword)) {
      if (gallery.length >= 4) break;
      if (kw.includes('photoroom') || kw.includes('lifestyle')) {
        for (const img of urls) {
          if (!used.has(img)) {
            gallery.push(img);
            used.add(img);
            if (gallery.length >= 4) break;
          }
        }
      }
    }
  }

  return gallery.slice(0, 4);
}

// Process all products
let updated = 0;
let skipped = 0;

const productPattern = /(\{\s*id:\s*'(\d+)',\s*name:\s*'([^']+)',\s*category:\s*'[^']+',\s*price:\s*[^,]+,\s*originalPrice:\s*[^,]+,\s*image:\s*')([^']+)(')/g;

content = content.replace(productPattern, (match, prefix, id, name, imageUrl, suffix) => {
  // Check if already has images array
  const afterMatch = content.substring(content.indexOf(match) + match.length, content.indexOf(match) + match.length + 300);
  if (afterMatch.includes('images:')) {
    skipped++;
    return match;
  }

  const gallery = findGalleryImages(name, imageUrl);
  if (gallery.length >= 2) {
    const imagesArray = `,\n    images: [\n      ${gallery.map(u => `'${u}'`).join(',\n      ')}\n    ]`;
    updated++;
    return prefix + imageUrl + suffix + imagesArray;
  }
  return match;
});

fs.writeFileSync(dataPath, content, 'utf-8');
console.log(`✓ Added galleries to ${updated} products`);
console.log(`✓ Skipped ${skipped} products that already have galleries`);
