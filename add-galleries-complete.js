const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'lib', 'data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

// Extract all unique image URLs
const imageRegex = /'(https:\/\/cdn\.shopify\.com\/s\/files\/[^']+)'/g;
const imageSet = new Set();
let match;
while ((match = imageRegex.exec(content)) !== null) {
  imageSet.add(match[1]);
}
const allImages = Array.from(imageSet);
console.log(`Found ${allImages.length} unique images`);

// Create lookup by keywords
const imagesByWord = {};
allImages.forEach(url => {
  const filename = url.split('/files/')[1].split('?')[0].toLowerCase();
  const words = filename.replace(/[_-]/g, ' ').split(/[\s.]/);
  words.forEach(word => {
    if (word.length > 2) {
      if (!imagesByWord[word]) imagesByWord[word] = new Set();
      imagesByWord[word].add(url);
    }
  });
});

function findImagesForProduct(productName, mainImageUrl) {
  const gallery = [mainImageUrl];
  const used = new Set([mainImageUrl]);
  
  // Extract keywords
  const keywords = productName
    .toLowerCase()
    .replace(/[®™\-]/g, ' ')
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2);

  // Try to find related images
  for (const keyword of keywords) {
    if (gallery.length >= 4) break;
    if (imagesByWord[keyword]) {
      for (const img of imagesByWord[keyword]) {
        if (!used.has(img)) {
          gallery.push(img);
          used.add(img);
          if (gallery.length >= 4) break;
        }
      }
    }
  }

  // Fill with any other images if needed
  if (gallery.length < 3) {
    for (const img of allImages) {
      if (gallery.length >= 4) break;
      if (!used.has(img) && (img.includes('photoroom') || img.includes('lifestyle'))) {
        gallery.push(img);
        used.add(img);
      }
    }
  }

  return gallery.slice(0, 4);
}

// Find all products and add galleries to those missing them
let productsFixed = 0;

// Match each product block more carefully
const lines = content.split('\n');
let i = 0;
while (i < lines.length) {
  const line = lines[i];
  
  // Check if this is a product start
  if (line.includes('id:') && line.includes("'") && i + 8 < lines.length) {
    const idMatch = line.match(/id:\s*'(\d+)'/);
    const nameMatch = lines[i+1]?.match(/name:\s*'([^']+)'/);
    const imageMatch = lines[i+4]?.match(/image:\s*'([^']+)'/);
    
    if (idMatch && nameMatch && imageMatch) {
      const productId = idMatch[1];
      const productName = nameMatch[1];
      const mainImage = imageMatch[1];
      
      // Check if this product already has images array
      let hasGallery = false;
      for (let j = i; j < Math.min(i + 20, lines.length); j++) {
        if (lines[j].includes('images:') && lines[j].includes('[')) {
          hasGallery = true;
          break;
        }
        if (lines[j].includes('description:')) break;
      }
      
      if (!hasGallery) {
        const gallery = findImagesForProduct(productName, mainImage);
        if (gallery.length >= 2) {
          // Find where to insert - right after image line
          for (let j = i; j < Math.min(i + 10, lines.length); j++) {
            if (lines[j].includes("image:") && lines[j].includes(",")) {
              // Insert images array after image line
              const imageArrayLines = [
                `    images: [`,
                ...gallery.map(img => `      '${img}',`),
                `    ],`
              ];
              // Remove trailing comma from last image
              imageArrayLines[imageArrayLines.length - 2] = imageArrayLines[imageArrayLines.length - 2].slice(0, -1);
              
              lines.splice(j + 1, 0, ...imageArrayLines);
              productsFixed++;
              i = j + imageArrayLines.length;
              break;
            }
          }
        }
      }
    }
  }
  
  i++;
}

fs.writeFileSync(dataPath, lines.join('\n'), 'utf-8');
console.log(`✓ Added galleries to ${productsFixed} products`);
