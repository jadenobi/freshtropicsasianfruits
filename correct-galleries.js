const fs = require('fs');
const path = require('path');

// Correct image mappings - each product with its own images only
const correctGalleries = {
  '8070291620025': {
    name: 'BEE MINE Mango Habanero Honey',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HoneyKiss12lbs3.jpg?v=1759439190',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Francismangos_2_3lbs_V1.jpg?v=1759439243',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_111657.jpg?v=1762459671'
    ]
  },
  '8083148144825': {
    name: 'Sending You Sunshine Pinkglow',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_100512.jpg?v=1762459650',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/SunshineBox_PG.jpg?v=1762459185',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123'
    ]
  },
  '8083147980985': {
    name: 'Congratulations Pinkglow',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_102400.jpg?v=1762459649',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/CongratsPG.jpg?v=1762459185',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123'
    ]
  }
};

// Read the data file
const dataPath = path.join(__dirname, 'src', 'lib', 'data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

// Fix each product's gallery
for (const [productId, mapping] of Object.entries(correctGalleries)) {
  const imagesString = JSON.stringify(mapping.images, null, 4);
  
  // Find the product and replace its images array
  const regex = new RegExp(
    `(id: '${productId}',[^}]*?images: )\\[[^\\]]*?\\]`,
    's'
  );
  
  content = content.replace(regex, `$1${imagesString}`);
  console.log(`✓ Fixed gallery for product ${productId} - ${mapping.name}`);
}

// Write back
fs.writeFileSync(dataPath, content);
console.log('✓ All galleries corrected');
