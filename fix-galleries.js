const fs = require('fs');
const path = require('path');

// Correct gallery mappings - ONLY for products that should have galleries
const correctMappings = {
  '8100732698809': {
    name: 'Unbeelieveably Thankful Honey Box',
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
  '8070291620025': {
    name: 'BEE MINE Mango Habanero Honey',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_083124.jpg?v=1762459623',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HoneyKiss12lbs3.jpg?v=1759439190',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Francismangos_2_3lbs_V1.jpg?v=1759439243'
    ]
  },
  '8083148669113': {
    name: 'Happy Birthday Pinkglow',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyBirthday_PG2.jpg?v=1762459650',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_100512.jpg?v=1762459650',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_105459.jpg?v=1762457858'
    ]
  },
  '8083148144825': {
    name: 'Sending You Sunshine Pinkglow',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_100512.jpg?v=1762459650',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyBirthday_PG2.jpg?v=1762459650',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_105459.jpg?v=1762457858'
    ]
  },
  '8083147980985': {
    name: 'Congratulations Pinkglow',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_102400.jpg?v=1762459649',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyBirthday_PG2.jpg?v=1762459650',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123'
    ]
  },
  '8083147358393': {
    name: 'Happy Anniversary Pinkglow',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_101240.jpg?v=1762459649',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_100512.jpg?v=1762459650',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyBirthday_PG2.jpg?v=1762459650'
    ]
  },
  '8083146080441': {
    name: 'Happy Mothers Day Pinkglow',
    images: [
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/MothersDay_PG1.jpg?v=1762459648',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_100512.jpg?v=1762459650',
      'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123'
    ]
  }
};

const dataFilePath = path.join(__dirname, 'src', 'lib', 'data.ts');
let content = fs.readFileSync(dataFilePath, 'utf8');

// For each product, replace its images array with the correct one
Object.keys(correctMappings).forEach(productId => {
  const mapping = correctMappings[productId];
  const images = mapping.images;
  
  // Create the images string
  const imagesStr = `images: [\n      '${images.join("',\n      '")}'\n    ],`;
  
  // Pattern to find the product and its images array
  const productRegex = new RegExp(
    `(id: '${productId.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}',\\n[\\s\\S]*?image: '[^']*',)\\n\\s*images: \\[[^\\]]*\\]`,
    'm'
  );
  
  if (productRegex.test(content)) {
    content = content.replace(productRegex, `$1\n    ${imagesStr}`);
    console.log(`✓ Fixed gallery for product ${productId} - ${mapping.name}`);
  }
});

fs.writeFileSync(dataFilePath, content, 'utf8');
console.log('\n✓ Successfully corrected all product image galleries');
