const fs = require('fs');

const dataFile = './src/lib/data.ts';
let content = fs.readFileSync(dataFile, 'utf-8');

// Products that need fixing (have mismatched gallery images)
const productsToFix = [
  '7685963841721', // Belt Bag
  '7685966168249', // Fanny Pack
  '8060351316153', // Hat
  // Add more as needed
];

// For each problematic product, replace its gallery with just the main image repeated
// (This is a safe fallback - just shows the main product image multiple times)
productsToFix.forEach(productId => {
  // Find the product and extract its main image URL
  const productPattern = new RegExp(
    `(id: '${productId}',\\s*name: '[^']*',\\s*category: '[^']*',\\s*price: [^,]*,\\s*originalPrice: [^,]*,\\s*image: '([^']+)',\\s*)images: \\[[^\\]]*\\]`,
    's'
  );
  
  const match = content.match(productPattern);
  if (match) {
    const mainImage = match[2];
    const replacement = match[1] + `images: [\n      '${mainImage}',\n      '${mainImage}',\n      '${mainImage}'\n    ]`;
    content = content.replace(productPattern, replacement);
    console.log(`✓ Fixed gallery for product ${productId}`);
  }
});

// Write back
fs.writeFileSync(dataFile, content, 'utf-8');
console.log('Done!');
