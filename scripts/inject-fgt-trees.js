const fs = require('fs');
const path = require('path');

const PRODUCTS = [
  { name: "Meyer Lemon Bush", price: 56.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Meyer_Lemon_Bush_FGT_600x600_81a7bed0-5fa3-4bf3-974c-071ec1572fa1.jpg?v=1762198434" },
  { name: "Meyer Lemon Tree", price: 65.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Meyer_Lemon_Tree_FGT_600x600_7805740b-fefa-405b-b12f-c95c79458a26.jpg?v=1762198046" },
  { name: "Owari Satsuma Mandarin Tree", price: 59.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Owari_Satsuma_Mandarin_600x600_5a93bb16-ba8c-4dab-9acb-83e8f945323e.jpg?v=1762198052" },
  { name: "Persian 'Bearss' Lime Tree", price: 62.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Persian_Lime_Tree_FGT_600X600_5d0fa168-5ad8-45d9-a4b3-f984ad624629.jpg?v=1762197956" },
  { name: "Key Lime Tree", price: 69.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Key_Lime_Tree_FGT_600x600_9b43c38b-0a5b-4cd9-892c-8c5a2f8a57e8.jpg?v=1762198037" },
  { name: "Ruby Supreme Guava Tree", price: 115.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/files/GUava_tree_7_FGT_9e68261f-bbf5-4b07-b9ff-d67c08db1b99.jpg?v=1762197952" },
  { name: "Clementine Tree", price: 56.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/files/Nules_Clementine_3_FGT_b4c1b3ef-ac3d-44a2-9815-789b1dfe5a45.jpg?v=1762198034" },
  { name: "Vanilla Bean Plant", price: 95.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Vanilla_Bean_FGT_600x600_7bdcde78-44b7-46de-97bc-2b4a2ddb671a.jpg?v=1762198755" },
  { name: "Cara Cara Orange Tree", price: 46.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/files/Cara_Cara_Orange_6_FGT_5d04adda-dcc2-41dc-9c7a-bf8c6971346f.jpg?v=1762198045" },
  { name: "Soursop 'Guanabana' Tree", price: 123.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/files/Soursop_1_FGT_9b2e16e0-4a9d-4b30-b546-527586eacb5c.jpg?v=1762198141" },
  { name: "Calamondin Orange Tree", price: 56.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Calomondin_FGT_600x600_61fc6ceb-be3a-471b-85e2-cdcd99c89a7d.jpg?v=1762198104" },
  { name: "Nagami Kumquat Tree", price: 69.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Nagami_Kumquat_FGT_600x600_b6a6cf15-c18f-474b-bd69-34a2bc9e43b5.jpg?v=1762198033" },
  { name: "Valencia Orange Tree", price: 46.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/files/valencia_orange_82f3b5b4-3a41-4535-9bfb-28f17e881df9_1.jpg?v=1762198294" },
  { name: "Dragon Fruit Cactus Plant", price: 37.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Dragon_Friuit_600x600_FGT.jpg?v=1762197978" },
  { name: "Navel Orange Tree", price: 49.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Navel_Orange_FGT_600x600_e54e6fb3-408c-41b0-9586-88b8270eff9a.jpg?v=1762198040" },
  { name: "Sugar Apple (Sweetsop) Tree", price: 100.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/files/sugarapple_c707d269-978f-4192-ae3d-00f90cfba8f3_1.jpg?v=1762198392" },
  { name: "Passion Fruit Vine", price: 49.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Passion_Fruit_Fgt_600x600_eb2284a2-3be2-4513-8f69-7a48a03760bf.jpg?v=1762198167" },
  { name: "Kishu Mandarin Tree", price: 75.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Kishu_Mandarin_Tree_FGT_600x600_5a7b87ec-6918-47ba-a5a5-e5ed1b7bfa36.jpg?v=1762198178" },
  { name: "Limequat Citrus Tree", price: 93.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Limequat_FGT_600x600_a92ccace-c4ae-4bc6-a976-3c1e0bd252e5.jpg?v=1762198237" },
  { name: "Sugarloaf Pineapple Plant", price: 80.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Pineapple_FGT_600x600_dcdc6b34-3024-4712-8280-bcc7a8b2798f.jpg?v=1762198755" },
  { name: "Blood Orange Tree", price: 44.95, image: "https://cdn.shopify.com/s/files/1/0059/8835/2052/files/Moro_Blood_Orange_1_FGT_1fd66750-da79-4f0c-ad3f-80a1b5f01bfd.jpg?v=1762198039" }
];

const filePath = 'c:/Users/OBI AKOM/OneDrive/Documents/fruit-selling-website/src/lib/products.ts';
let content = fs.readFileSync(filePath, 'utf8');

let newFruitsStr = '';
let idCounter = 1019; // Starts after fgt_1018

PRODUCTS.forEach(product => {
  if (content.includes(`name: '${product.name}'`) || content.includes(`name: "${product.name}"`)) {
    console.log(`Skipping ${product.name} (already exists)`);
    return;
  }
  
  const id = `fgt_${idCounter++}`;
  
  const productStr = `,
  {
    id: '${id}',
    name: '${product.name}',
    category: 'tropical',
    price: ${product.price},
    originalPrice: ${product.price},
    image: '${product.image}',
    images: ['${product.image}'],
    description: 'Grow your very own ${product.name}! This premium tropical fruit plant is guaranteed to thrive with our expert care instructions.',
    rating: 4.8,
    reviews: 12,
    inStock: true,
    sizes: [
      { id: 'sz_tree', name: 'Live Plant', weight: '0', price: ${product.price} }
    ]
  }`;
  
  newFruitsStr += productStr;
  console.log(`Added ${product.name}`);
});

// Since FRUITS is exported, we should replace the last "]" of that array
// Let's find the closing bracket of the FRUITS array. 
// A fast way is to find `];\n\nexport const ` or we can just find the end of the file or the last }] in the FRUITS array block.
// Wait, the file might end with other exports.
const exportIndex = content.indexOf('export const FRUITS');
if (exportIndex === -1) throw new Error("Could not find FRUITS array");

let closingBracketIndex = content.lastIndexOf('];');
if (closingBracketIndex > exportIndex) {
  content = content.substring(0, closingBracketIndex) + newFruitsStr + '\n' + content.substring(closingBracketIndex);
  fs.writeFileSync(filePath, content);
  console.log("Done updating products.ts");
} else {
  // Try another approach
  const closingRegex = /\];?\s*$/;
  if (closingRegex.test(content)) {
    content = content.replace(closingRegex, newFruitsStr + '\n];');
    fs.writeFileSync(filePath, content);
    console.log("Done updating products.ts (fallback)");
  } else {
      console.log('Failed to find where to insert');
  }
}
