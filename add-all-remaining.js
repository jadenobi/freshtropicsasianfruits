const fs = require('fs');

const dataFile = './src/lib/data.ts';
let content = fs.readFileSync(dataFile, 'utf-8');

// All available images
const images = [
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_111657.jpg?v=1762459671',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_083124.jpg?v=1762459623',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/2ct_Wildflower_3.jpg?v=1759439256',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/1ctWildflower3.jpg?v=1762459185',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Easter_TasteoftheTropics_v3.jpg?v=1762459636',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Taste_of_the_tropics_w-Kumquat_Dad_3.jpg?v=1759439266',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Taste-of-the-Exotics_10lbs_v74_3.jpg?v=1757164847',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/TasteoftheTropics_v69_10lbs_v1.jpg?v=1759179866',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Group_7509_3.png?v=1762459540',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Plantain-salted-Chips_4ct_V1.jpg?v=1762459538',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Plantain-Garlic_Chips_4ct_V1.jpg?v=1762459538',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Plantain-Sweet_Chips_4ct_V1.jpg?v=1762459539',
];

// Add images array after each image property that doesn't have one
let updated = content.replace(
  /image: '([^']+)',(\s+)(description:)/g,
  (match, imageUrl, spacing, descKey, offset) => {
    // Check if images array already exists nearby
    const before = content.substring(Math.max(0, offset - 200), offset);
    if (before.includes('images:')) {
      return match; // Already has images
    }
    
    // Get 3 random images
    const idx = Math.floor(Math.random() * (images.length - 2));
    const gallery = [images[idx], images[idx + 1], images[(idx + 2) % images.length]];
    
    return `image: '${imageUrl}',${spacing}images: [\n      '${gallery[0]}',\n      '${gallery[1]}',\n      '${gallery[2]}'\n    ],${spacing}${descKey}`;
  }
);

fs.writeFileSync(dataFile, updated, 'utf-8');

// Count results
const beforeCount = (content.match(/images: \[/g) || []).length;
const afterCount = (updated.match(/images: \[/g) || []).length;

console.log(`✓ Gallery arrays: ${beforeCount} → ${afterCount}`);
console.log(`✓ Added to ${afterCount - beforeCount} products`);
