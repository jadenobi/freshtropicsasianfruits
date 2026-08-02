const fs = require('fs');

async function scrapeAll() {
  let allProducts = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    console.log(`Fetching page ${page}...`);
    try {
      const res = await fetch(`https://www.fast-growing-trees.com/collections/tropical-fruit-plants/products.json?limit=250&page=${page}`);
      if (!res.ok) {
        console.log(`Failed to fetch page ${page}: ${res.statusText}`);
        break;
      }
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        allProducts.push(...data.products);
        console.log(`Found ${data.products.length} products on page ${page}`);
        page++;
      } else {
        hasMore = false;
      }
    } catch (e) {
      console.log('Error fetching:', e.message);
      break;
    }
  }

  console.log(`Total products fetched: ${allProducts.length}`);
  fs.writeFileSync('c:/Users/OBI AKOM/OneDrive/Documents/fruit-selling-website/tmp-fgt-products.json', JSON.stringify(allProducts, null, 2));
}

scrapeAll();
