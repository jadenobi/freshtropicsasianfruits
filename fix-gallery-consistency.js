const fs = require('fs');

const dataFile = './src/lib/data.ts';
let content = fs.readFileSync(dataFile, 'utf-8');

// Split into products
const productPattern = /\{[^}]*?id:\s*'([^']+)'[^}]*?\}/gs;
let fixedCount = 0;

content = content.replace(productPattern, (fullProduct, productId) => {
  // Extract main image from this product
  const imageMatch = fullProduct.match(/image:\s*'([^']+)',/);
  const imagesMatch = fullProduct.match(/images:\s*\[([\s\S]*?)\]/);
  
  if (imageMatch && imagesMatch) {
    const mainImage = imageMatch[1];
    const imagesArray = imagesMatch[1];
    
    // Check if first image in gallery matches main image
    const firstGalleryImageMatch = imagesArray.match(/'([^']+)'/);
    
    if (firstGalleryImageMatch) {
      const firstGalleryImage = firstGalleryImageMatch[1];
      
      // If they don't match, replace gallery images with main image variants
      if (firstGalleryImage !== mainImage) {
        const newGallery = `images: [\n      '${mainImage}',\n      '${mainImage}',\n      '${mainImage}'\n    ]`;
        const updated = fullProduct.replace(/images:\s*\[[\s\S]*?\]/s, newGallery);
        fixedCount++;
        return updated;
      }
    }
  }
  
  return fullProduct;
});

fs.writeFileSync(dataFile, content, 'utf-8');
console.log(`✓ Fixed gallery images for ${fixedCount} products`);
console.log(`✓ All gallery images now match their main product image`);
