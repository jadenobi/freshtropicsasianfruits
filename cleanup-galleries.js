const fs = require('fs');
const path = require('path');

// Only these 8 products have been carefully verified with correct image mappings
const verifiedProductIds = [
  '8100732698809', // Honey Box
  '8100715724985', // BEE MINE Wildflower
  '8070291620025', // Mango Habanero
  '8083148669113', // Happy Birthday
  '8083148144825', // Sunshine
  '8083147980985', // Congratulations
  '8083147358393', // Anniversary
  '8083146080441'  // Mother's Day
];

const dataPath = path.join(__dirname, 'src', 'lib', 'data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

// Find all product blocks and remove images arrays from products NOT in the verified list
const productRegex = /\{\s*id:\s*'(\d+)'[^}]*?images:\s*\[[^\]]*?\][^}]*?\}/gs;

let fixed = 0;

content = content.replace(productRegex, (match, productId) => {
  if (!verifiedProductIds.includes(productId)) {
    // Remove the images array for unverified products
    const withoutImages = match.replace(/,\s*images:\s*\[[^\]]*?\]/s, '');
    fixed++;
    return withoutImages;
  }
  return match;
});

fs.writeFileSync(dataPath, content, 'utf-8');
console.log(`✓ Removed galleries from ${fixed} unverified products`);
console.log(`✓ Kept galleries for ${verifiedProductIds.length} verified products`);
