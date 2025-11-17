const https = require('https');
const fs = require('fs');
const path = require('path');

const PRODUCTS_DIR = path.join(__dirname, '../public/products');
const DATA_FILE = path.join(__dirname, '../src/lib/data.ts');

if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

// Fetch Shopify JSON API
function fetchShopifyJSON(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.tropicalfruitbox.com',
      path: endpoint,
      method: 'GET',
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    };

    https
      .get(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Invalid JSON'));
          }
        });
      })
      .on('error', reject)
      .on('timeout', () => reject(new Error('Timeout')));
  });
}

// Download image
function downloadImage(imageUrl, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(PRODUCTS_DIR, filename);
    if (fs.existsSync(filePath)) {
      resolve(filename);
      return;
    }

    try {
      const url = new URL(imageUrl);
      const protocol = url.protocol === 'https:' ? https : require('http');
      const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'GET',
        timeout: 15000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      };

      protocol
        .get(options, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            downloadImage(res.headers.location, filename).then(resolve).catch(reject);
            return;
          }

          const fileStream = fs.createWriteStream(filePath);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolve(filename);
          });
          fileStream.on('error', (err) => {
            fs.unlink(filePath, () => {});
            reject(err);
          });
        })
        .on('error', reject)
        .on('timeout', () => {
          fs.unlink(filePath, () => {});
          reject(new Error('Download timeout'));
        });
    } catch (err) {
      reject(err);
    }
  });
}

// Main scraper
async function scrapeAllProducts() {
  console.log('🍎 Tropical Fruit Box - Complete Catalog Scraper\n');
  console.log('Fetching all products from Shopify API...\n');

  let allProducts = [];
  let limit = 250;
  let offset = 0;

  while (true) {
    try {
      console.log(`Fetching batch: offset ${offset}...`);
      const data = await fetchShopifyJSON(`/products.json?limit=${limit}&offset=${offset}`);

      if (!data.products || data.products.length === 0) break;

      allProducts = allProducts.concat(data.products);
      console.log(`✓ Got ${data.products.length} products\n`);

      if (data.products.length < limit) break;
      offset += limit;

      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.log(`⚠️  Error: ${error.message}\n`);
      break;
    }
  }

  console.log(`📦 Total products: ${allProducts.length}\n`);

  if (allProducts.length === 0) {
    console.error('❌ No products found');
    process.exit(1);
  }

  // Process products
  console.log('Processing products...\n');

  const fruits = [];
  let productId = 1;
  let succeeded = 0;

  for (let i = 0; i < allProducts.length; i++) {
    const shopProduct = allProducts[i];
    const name = (shopProduct.title || 'Product').substring(0, 35).padEnd(35);

    process.stdout.write(`[${String(i + 1).padStart(3)}/${allProducts.length}] ${name} `);

    try {
      const variant = shopProduct.variants && shopProduct.variants[0];
      if (!variant) throw new Error('No variant');

      const price = parseFloat(variant.price) || Math.random() * 150 + 50;
      const description = (shopProduct.body_html || `Premium ${shopProduct.title}`)
        .replace(/<[^>]*>/g, '')
        .substring(0, 150);

      let imagePath = `/products/product-${productId}.jpg`;
      if (shopProduct.image && shopProduct.image.src) {
        try {
          const filename = `product-${productId}.jpg`;
          await downloadImage(shopProduct.image.src, filename);
          process.stdout.write('📷 ');
        } catch (err) {
          process.stdout.write('✗ ');
        }
      }

      const fruit = {
        id: String(productId),
        name: shopProduct.title,
        category: 'exotic',
        price: Math.round(price * 100) / 100,
        originalPrice: price,
        image: imagePath,
        description: description,
        rating: 4.6 + Math.random() * 0.4,
        reviews: Math.floor(Math.random() * 250) + 50,
        inStock: true,
      };

      fruits.push(fruit);
      productId++;
      succeeded++;
      console.log('✓');

      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      console.log(`✗ ${error.message}`);
    }
  }

  console.log(`\n✅ Processed: ${succeeded} products\n`);

  if (fruits.length === 0) {
    console.error('❌ No products processed');
    process.exit(1);
  }

  // Generate data.ts with proper escaping
  console.log('Generating data.ts...\n');

  const escapeString = (str) => {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
  };

  const tsCode = `import { Fruit } from '@/types';

export const FRUITS: Fruit[] = [
${fruits
  .map(
    (f) => `  {
    id: '${f.id}',
    name: '${escapeString(f.name)}',
    category: '${f.category}',
    price: ${f.price},
    originalPrice: ${f.originalPrice},
    image: '${f.image}',
    description: '${escapeString(f.description)}',
    rating: ${f.rating.toFixed(1)},
    reviews: ${f.reviews},
    inStock: ${f.inStock},
  }`
  )
  .join(',\n')}
];
`;

  fs.writeFileSync(DATA_FILE, tsCode);

  console.log('📊 SUMMARY');
  console.log('==========');
  console.log(`✓ Products: ${fruits.length}`);
  console.log(
    `✓ Prices: $${Math.min(...fruits.map((f) => f.price)).toFixed(2)} - $${Math.max(...fruits.map((f) => f.price)).toFixed(2)}`
  );
  console.log(`✓ Images: ${PRODUCTS_DIR}`);
  console.log(`✓ Data: ${DATA_FILE}`);
  console.log('\n🎉 All done!\n');
}

scrapeAllProducts().catch((error) => {
  console.error('\n❌ Error:', error);
  process.exit(1);
});
