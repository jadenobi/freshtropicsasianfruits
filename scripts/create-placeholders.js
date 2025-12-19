const fs = require('fs');
const path = require('path');

const PRODUCTS_DIR = path.join(__dirname, '../public/products');

// Get list of product IDs from data.ts
const dataFile = fs.readFileSync(path.join(__dirname, '../src/lib/data.ts'), 'utf8');
const idMatches = dataFile.match(/id: '(\d+)'/g) || [];
const productIds = idMatches.map(m => m.match(/\d+/)[0]);

console.log(`Found ${productIds.length} products in data.ts`);

// Get existing images
const existingImages = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.jpg'));
console.log(`Found ${existingImages.length} existing images`);

// For missing images, use the first available image as template
if (existingImages.length > 0) {
  const templateFile = path.join(PRODUCTS_DIR, existingImages[0]);
  const templateData = fs.readFileSync(templateFile);

  let created = 0;
  for (const id of productIds) {
    const filename = `product-${id}.jpg`;
    const filePath = path.join(PRODUCTS_DIR, filename);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, templateData);
      created++;
    }
  }

  console.log(`✓ Created ${created} placeholder images`);
  console.log(`✓ Total images: ${fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.jpg')).length}`);
  console.log('✅ All products now have images!');
} else {
  console.error('❌ No images to use as template');
  process.exit(1);
}
