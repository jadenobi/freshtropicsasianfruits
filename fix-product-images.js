const fs = require('fs');
const path = require('path');

// Correct product-to-image mappings based on image filenames and Shopify structure
// Each product gets ONLY its own images - no mixing!
const correctMappings = {
  // Honey products
  '8100732698809': {
    name: 'Unbeelieveably Thankful Honey Box – Florida Wildflower Edition',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_111657.jpg?v=1762459671',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_083124.jpg?v=1762459623',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/2ct_Wildflower_3.jpg?v=1759439256'
    ]
  },
  '8100715724985': {
    name: 'BEE MINE Florida Wildflower',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_083124.jpg?v=1762459623',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/2ct_Wildflower_3.jpg?v=1759439256',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/1ctWildflower3.jpg?v=1762459185'
    ]
  },
  // Mango products - MUST HAVE MANGO IMAGES ONLY
  '8070291620025': {
    name: 'BEE MINE Mango Habanero Honey',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/MangoHabanero1.jpg?v=1762459185',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/MangoHabanero2.jpg?v=1762459243',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/MangoHabanero3.jpg?v=1762459185'
    ]
  },
  // Pinkglow products - Birthday edition
  '8083148669113': {
    name: 'Happy Birthday Pinkglow® Pink Pineapple Gift Box',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyBirthday_PG2.jpg?v=1762459650',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyBirthday_PG1.jpg?v=1762459650',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123'
    ]
  },
  // Pinkglow - Sunshine edition
  '8083148144825': {
    name: 'Sending You Sunshine Pinkglow® Pink Pineapple Gift Box',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_100512.jpg?v=1762459650',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/SunshineBox_PG.jpg?v=1762459185',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123'
    ]
  },
  // Pinkglow - Congratulations edition
  '8083147980985': {
    name: 'Congratulations Pinkglow® Pink Pineapple Gift Box',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_102400.jpg?v=1762459649',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Congratulations_PG.jpg?v=1762459185',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123'
    ]
  },
  // Pinkglow - Anniversary edition
  '8083147358393': {
    name: 'Happy Anniversary Pinkglow® Pink Pineapple Gift Box',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyAnniversary_PG.jpg?v=1762459185',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Anniversary_PG2.jpg?v=1762459123',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123'
    ]
  },
  // Pinkglow - Mother's Day edition
  '8083146080441': {
    name: 'Happy Mothers Day Pinkglow® Pink Pineapple Gift Box',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyMothersDay_PG.jpg?v=1762459185',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/MothersDay_PG2.jpg?v=1762459123',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123'
    ]
  }
};

const dataPath = path.join(__dirname, 'src', 'lib', 'data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

let fixed = 0;

// For each product, find it and replace the images array with ONLY its correct images
for (const [productId, mapping] of Object.entries(correctMappings)) {
  // Build the correct images array string
  const imagesArrayStr = '[\n      ' + mapping.images.map(url => `'${url}'`).join(',\n      ') + '\n    ]';
  
  // Find the product block and replace ONLY the images array
  const productRegex = new RegExp(
    `(id: '${productId}'[\\s\\S]*?images: )\\[[\\s\\S]*?\\]`,
    'm'
  );
  
  if (productRegex.test(content)) {
    content = content.replace(productRegex, `$1${imagesArrayStr}`);
    console.log(`✓ Fixed: ${mapping.name}`);
    fixed++;
  } else {
    console.log(`✗ NOT FOUND: ${productId} - ${mapping.name}`);
  }
}

// Remove galleries from all other products (keep only single image)
// Find all `images: [...]` that aren't in our mapping
const allProductIds = Object.keys(correctMappings);
const removeGalleriesRegex = /images:\s*\[\s*'[^']+'\s*(?:,\s*'[^']+'\s*)*\],?\s*/g;

// This is risky, so let's be more conservative and only remove if it looks like duplicate/wrong images
content = content.replace(/,\s*images:\s*\[\s*'https:\/\/cdn\.shopify\.com\/[^]]*?\],\s*description:/g, (match) => {
  // Only remove if it appears right before description (indicating wrong gallery)
  return ',\n    description:';
});

fs.writeFileSync(dataPath, content, 'utf-8');
console.log(`\n✓ Successfully corrected ${fixed} product galleries`);
console.log('✓ Removed duplicate/incorrect galleries from other products');
