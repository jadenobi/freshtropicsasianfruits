const fs = require('fs');

async function scrapeEverything() {
  const filepath = 'c:/Users/OBI AKOM/OneDrive/Documents/fruit-selling-website/src/lib/products.ts';
  let content = fs.readFileSync(filepath, 'utf8');

  let allProducts = [];
  let page = 1;
  let hasMore = true;

  console.log('Fetching products from FGT API...');
  while (hasMore) {
    try {
      const res = await fetch(`https://www.fast-growing-trees.com/products.json?limit=250&page=${page}`);
      if (!res.ok) {
        console.log(`Failed at page ${page}`);
        break;
      }
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        data.products.forEach(p => {
          if (!p.title) return;
          // Map to known categories based on title/type
          let cat = 'trees';
          const t = p.title.toLowerCase();
          const pt = p.product_type.toLowerCase();
          
          if (t.includes('evergreen') || pt.includes('evergreen')) cat = 'evergreen';
          else if (t.includes('shrub') || pt.includes('shrub')) cat = 'shrubs';
          else if (t.includes('flower') || pt.includes('flower') || pt.includes('rose')) cat = 'flowering';
          else if (t.includes('shade') || pt.includes('shade')) cat = 'shade';
          else if (t.includes('tropical') || pt.includes('palm')) cat = 'tropical';
          else if (t.includes('perennial') || pt.includes('perennial')) cat = 'perennials';
          else if (t.includes('indoor') || pt.includes('house plant')) cat = 'indoor';
          else if (t.includes('supplies') || pt.includes('fertilizer') || pt.includes('pot') || pt.includes('soil') || pt.includes('hard good')) cat = 'supplies';
          
          let price = (p.variants && p.variants[0] && p.variants[0].price) ? parseFloat(p.variants[0].price) : 59.95;
          let image = (p.images && p.images[0] && p.images[0].src) ? p.images[0].src : '/products/tree1.jpeg';
          
          allProducts.push({
            name: p.title,
            category: cat,
            price: price,
            image: image,
          });
        });
        console.log(`Fetched page ${page}, total so far: ${allProducts.length}`);
        page++;
      } else {
        hasMore = false;
      }
    } catch (e) {
      console.log('Error fetching:', e.message);
      break;
    }
  }

  console.log(`Total collected: ${allProducts.length}`);

  let newFruitsStr = '';
  let idCounter = 2000;
  let addedCount = 0;

  for (let product of allProducts) {
    // Basic deduplication check
    // We replace single and double quotes to avoid syntax errors inside the template literal
    let safeName = product.name.replace(/'/g, "\\'").replace(/"/g, '\\"');
    
    // Check if name already in file
    let testName1 = `name: '${safeName}'`;
    let testName2 = `name: "${safeName}"`;
    let testName3 = `name: '${product.name}'`;
    
    if (!content.includes(testName1) && !content.includes(testName2) && !content.includes(testName3)) {
      newFruitsStr += `,
  {
    id: 'fgt_bulk_${idCounter++}',
    name: '${safeName}',
    category: '${product.category}',
    price: ${product.price},
    originalPrice: ${product.price},
    image: '${product.image}',
    images: ['${product.image}'],
    description: 'Beautiful addition to any garden or home. Enjoy this premium ${safeName} with our expert support.',
    rating: Number((Math.random() * (5.0 - 4.2) + 4.2).toFixed(1)),
    reviews: Math.floor(Math.random() * 250) + 1,
    inStock: true,
    sizes: [
      { id: 'sz_def', name: 'Standard Size', weight: '0', price: ${product.price} }
    ]
  }`;
      addedCount++;
    }
  }

  if (addedCount > 0) {
    const closingRegex = /\];?\s*$/;
    if (closingRegex.test(content)) {
      content = content.replace(closingRegex, newFruitsStr + '\\n];');
      fs.writeFileSync(filepath, content);
      console.log(`Successfully appended ${addedCount} products.`);
    } else {
      console.log('Failed to find closing bracket ];');
    }
  } else {
    console.log('No new products to add.');
  }
}

scrapeEverything();
