const fs = require('fs');
const https = require('https');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'src', 'lib', 'fgt-products.json');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = 'https://www.fast-growing-trees.com' + loc;
        return fetchJson(loc).then(resolve).catch(reject);
      }
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          // Sometimes huge responses need full buffer to parse correctly.
          resolve(JSON.parse(data));
        } catch(e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 120) + '...';
}

async function scrapeAll() {
  let allMappedProducts = [];
  let page = 1;
  let hasMore = true;

  console.log("Starting FGT catalog extraction...");

  while (hasMore) {
    const url = `https://www.fast-growing-trees.com/products.json?limit=250&page=${page}`;
    console.log(`Fetching page ${page}...`);
    
    try {
      const data = await fetchJson(url);
      const products = data.products || [];
      
      if (products.length === 0) {
        hasMore = false;
        break;
      }

      for (const p of products) {
        const productType = p.product_type ? p.product_type.toLowerCase() : 'tree';
        
        // Extract basic data according to our schema
        const mapped = {
          id: `fgt_mass_${p.id}`,
          name: p.title,
          category: productType,
          price: p.variants && p.variants[0] ? parseFloat(p.variants[0].price) || 0 : 0,
          originalPrice: p.variants && p.variants[0] ? parseFloat(p.variants[0].compare_at_price) || parseFloat(p.variants[0].price) || 0 : 0,
          image: p.images && p.images.length > 0 ? p.images[0].src.replace(/^\/\//, 'https://') : '',
          description: stripHtml(p.body_html),
          rating: 4.8,
          reviews: Math.floor(Math.random() * 50) + 5,
          inStock: true,
          sizes: p.variants ? p.variants.map(v => ({
            id: `sz_${v.id}`,
            name: v.title,
            weight: '0',
            price: parseFloat(v.price) || 0,
            originalPrice: parseFloat(v.compare_at_price) || parseFloat(v.price) || 0
          })) : []
        };
        allMappedProducts.push(mapped);
      }
      
      console.log(`Page ${page} finished. Total extracted so far: ${allMappedProducts.length}`);
      page++;
      
      if (page > 30) {
        console.log("Reached page limit 30. Ending extraction.");
        hasMore = false;
      }
    } catch (e) {
      console.error(`Failed on page ${page}:`, e.message);
      hasMore = false;
    }
  }

  console.log(`Extraction complete. Saving ${allMappedProducts.length} products to ${outputPath}`);
  fs.writeFileSync(outputPath, JSON.stringify(allMappedProducts, null, 2), 'utf8');
}

scrapeAll();
