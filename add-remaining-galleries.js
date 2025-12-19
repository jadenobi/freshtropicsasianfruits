const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'src', 'lib', 'data.ts');
let data = fs.readFileSync(dataFile, 'utf-8');

// All available unique images from Shopify
const availableImages = [
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
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Yuca_Chips_4ct_V1.jpg?v=1759439264',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Plantain-mix_Chips_4ct_V1.jpg?v=1762459539',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PlumSugar_3lbs-V3.png?v=1762459575',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Jaboticaba_3lbs_v1.png?v=1762459552',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Malanga-Lime-Chips_4ct_V1.jpg?v=1762459536',
  'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/MountainPapaya3.jpg?v=1762459216',
];

// Products without galleries
const productsNeedingGalleries = [
  '8074377330873', '8054638575801', '8050143559865', '8046217265337',
  '8046231093433', '8046234271929', '8046234435769', '7755634573497',
  '7755638669497', '7685964464313', '7685964365513', '7685963976873'
];

let addedCount = 0;

// For each product needing galleries
productsNeedingGalleries.forEach((productId, idx) => {
  // Find the product in data
  const productRegex = new RegExp(`id: '${productId}',\\s*name: '[^']*',\\s*category: '[^']*',\\s*price: [^,]*,\\s*originalPrice: [^,]*,\\s*image: '([^']+)',`, 's');
  const match = data.match(productRegex);
  
  if (match && !data.includes(`id: '${productId}',`) || !data.match(new RegExp(`id: '${productId}',[\\s\\S]*?images:\\s*\\[`))) {
    // Get the main image
    const mainImage = match ? match[1] : availableImages[idx % availableImages.length];
    
    // Select 3 diverse images for gallery
    const galleryImages = [
      mainImage,
      availableImages[(idx * 2) % availableImages.length],
      availableImages[(idx * 3 + 1) % availableImages.length]
    ];
    
    // Find where to insert the images array (right after the image property)
    const insertPattern = new RegExp(
      `(id: '${productId}',\\s*name: '[^']*',\\s*category: '[^']*',\\s*price: [^,]*,\\s*originalPrice: [^,]*,\\s*image: '[^']+',)`,
      's'
    );
    
    const replacement = (fullMatch) => {
      return fullMatch + `\n    images: [\n      '${galleryImages[0]}',\n      '${galleryImages[1]}',\n      '${galleryImages[2]}'\n    ],`;
    };
    
    if (data.match(insertPattern)) {
      data = data.replace(insertPattern, replacement);
      addedCount++;
    }
  }
});

// Write back
fs.writeFileSync(dataFile, data, 'utf-8');
console.log(`✓ Added galleries to ${addedCount} products`);
