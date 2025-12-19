const fs = require('fs');
const path = require('path');

// Gallery image mappings for products
const galleryMappings = {
  '8100732698809': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_111657.jpg?v=1762459671',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_083124.jpg?v=1762459623',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/2ct_Wildflower_3.jpg?v=1759439256'
  ],
  '8100715724985': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_083124.jpg?v=1762459623',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/2ct_Wildflower_3.jpg?v=1759439256',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/1ctWildflower3.jpg?v=1762459185'
  ],
  '8070291620025': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_083124.jpg?v=1762459623',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_105459.jpg?v=1762457858',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HoneyKiss12lbs3.jpg?v=1759439190'
  ],
  '8083148669113': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyBirthday_PG2.jpg?v=1762459650',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_100512.jpg?v=1762459650',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_105459.jpg?v=1762457858'
  ],
  '8083148144825': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_100512.jpg?v=1762459650',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyBirthday_PG2.jpg?v=1762459650',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_105459.jpg?v=1762457858'
  ],
  '8083147980985': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_102400.jpg?v=1762459649',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyBirthday_PG2.jpg?v=1762459650',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123'
  ],
  '8083147358393': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_101240.jpg?v=1762459649',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_100512.jpg?v=1762459650',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyBirthday_PG2.jpg?v=1762459650'
  ],
  '8083146080441': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/MothersDay_PG1.jpg?v=1762459648',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_100512.jpg?v=1762459650',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123'
  ],
  '8079734603961': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_083145.jpg?v=1762459642',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_100512.jpg?v=1762459650',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyBirthday_PG2.jpg?v=1762459650'
  ],
  '8079731196089': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_092359.jpg?v=1762459641',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_105459.jpg?v=1762457858'
  ],
  '8079729950905': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Taste_of_the_tropics_w-Kumquat_Dad_3.jpg?v=1759439266',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Rainbow_Mangos_8lbs_3.jpg?v=1762458371',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Francismangos_2_3lbs_V1.jpg?v=1759439243'
  ],
  '8078750613689': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/TropiSpringMOM3_07f3091b-bd05-4382-bf46-a082086bcd63.jpg?v=1759439265',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/MixedGuava8lbs2.jpg?v=1762458153',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_105459.jpg?v=1762457858'
  ],
  '8074377330873': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Easter_TasteoftheTropics_v3.jpg?v=1762459636',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Rainbow_Mangos_8lbs_3.jpg?v=1762458371',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Francismangos_2_3lbs_V1.jpg?v=1759439243'
  ],
  '8046233977017': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Group_7509_3.png?v=1762459540',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Malanga-Lime-Chips_4ct_V1.jpg?v=1762459536',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Malanga-Lila_Chips_4ct_V1.jpg?v=1762459536'
  ],
  '8060351316153': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/EasterPine3.jpg?v=1762459601',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyBirthday_PG2.jpg?v=1762459650',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_105459.jpg?v=1762457858'
  ],
  '8054638575801': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PlumSugar_3lbs-V3.png?v=1762459575',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Manzanos8lbs3.jpg?v=1762458065',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/products/Temdadfaplate.jpg?v=1762457627'
  ],
  '8050143559865': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Jaboticaba_3lbs_v1.png?v=1762459552',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Red_Dragon_3lbs_3.jpg?v=1759439126',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/YellowDragon5lbs2.jpg?v=1762457592'
  ],
  '8046184923321': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Malanga-Lime-Chips_4ct_V1.jpg?v=1762459536',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Group_7509_3.png?v=1762459540',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Malanga-Lila_Chips_4ct_V1.jpg?v=1762459536'
  ],
  '8046188167353': [
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Malanga-Lila_Chips_4ct_V1.jpg?v=1762459536',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Malanga-Lime-Chips_4ct_V1.jpg?v=1762459536',
    'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Group_7509_3.png?v=1762459540'
  ]
};

const dataFilePath = path.join(__dirname, 'src', 'lib', 'data.ts');
let content = fs.readFileSync(dataFilePath, 'utf8');

let updatedCount = 0;

// Process each product ID in the mapping
Object.keys(galleryMappings).forEach(productId => {
  const images = galleryMappings[productId];
  
  // Create the images string
  const imagesStr = `images: [\n      '${images.join("',\n      '")}'\n    ],`;
  
  // Find the product in the content and add images array if it doesn't exist
  const productRegex = new RegExp(
    `(id: '${productId.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}',\\n[\\s\\S]*?image: '[^']*',)(?!\\n\\s*images:)`,
    'm'
  );
  
  if (productRegex.test(content)) {
    content = content.replace(productRegex, `$1\n    ${imagesStr}`);
    updatedCount++;
    console.log(`✓ Added gallery to product ${productId}`);
  }
});

fs.writeFileSync(dataFilePath, content, 'utf8');
console.log(`\n✓ Successfully updated ${updatedCount} products with gallery images`);
