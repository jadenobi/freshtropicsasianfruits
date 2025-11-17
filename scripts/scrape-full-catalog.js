const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.tropicalfruitbox.com';

// Store unique products (avoid duplicates using product slug/name)
const uniqueProducts = new Map();
let productIdCounter = 1;

// Array of product slugs to scrape - COMPREHENSIVE LIST
const PRODUCT_URLS = [
  '/products/tropical-fruit-box',
  '/products/soursop-guanabana-graviola',
  '/products/u-pick-custom-box',
  '/products/yellow-dragon-fruit-box',
  '/products/create-your-own-exotic-fruit-box',
  '/products/mangosteen-fruit-box',
  '/products/tropical-mango-box',
  '/products/pinkglow-pink-pineapple-multiple-unit-boxes',
  '/products/taste-the-exotics-box',
  '/products/passionfruit-box',
  '/products/tropical-avocado-box',
  '/products/pinkglow-pink-pineapple-gift-box',
  '/products/tropical-guava-box',
  '/products/longan-fruit-box',
  '/products/pinkglow%E2%84%A2-pink-pineapple-quartet-box',
  '/products/rambutan-box',
  '/products/cherimoya-fruit',
  '/products/tropi-love-fruit-box',
  '/products/fresh-sapodilla-nispero',
  '/products/breadfruit-panapen-box',
  '/products/fresh-lychee-fruit-box',
  '/products/ataulfo-mango-box',
  '/products/sugar-apple-fruit-box',
  '/products/carambola-star-fruit',
  '/products/buddha-hand-citrus',
  '/products/black-sapote-fruit',
  '/products/cherimoyas-mini-fruits',
  '/products/dragonfruit-white-red-mix-box',
  '/products/fresh-calamansi-citrus-fruit',
  '/products/gooseberry-phyllanthus',
  '/products/finger-citrus-kumquat-box',
  '/products/jamaican-ackee-fruit',
  '/products/jaboticaba-fruit',
  '/products/jujubes-chinese-dates',
  '/products/kiwano-horned-melon',
  '/products/longan-fresh-box',
  '/products/loquat-fruit-box',
  '/products/miracle-fruit-box',
  '/products/mulberry-fresh-box',
  '/products/naranja-agria-seville-orange',
  '/products/nashi-pear-asian-pear-box',
  '/products/passion-fruit-fresh',
  '/products/pepino-melon-pear',
  '/products/persimmon-fuyu-fresh-box',
  '/products/pitaya-dragon-fruit',
  '/products/platano-plantain-green',
  '/products/pomelo-grapefruit',
  '/products/rambutan-fresh-box',
  '/products/red-mombin-spanish-plum',
  '/products/rose-apple-water-apple',
  '/products/sapodilla-nispero',
  '/products/soursop-guanabana-box',
  '/products/sugar-loaf-pineapple',
  '/products/tamarind-fresh-pod-box',
  '/products/temple-orange-citrus',
  '/products/tamarindo-fresh',
  '/products/tigernuts-earth-almonds',
  '/products/white-dragonfruit-box',
  '/products/white-mulberry-box',
  '/products/white-sapote-fruit',
  '/products/wollemi-pine-nuts',
];

// Fetch product data from URL
function fetchProductPage(urlPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.tropicalfruitbox.com',
      path: urlPath,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    };

    https.get(options, (res) => {
      let html = '';
      res.on('data', (chunk) => {
        html += chunk;
      });
      res.on('end', () => {
        resolve(html);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Parse product details from HTML
function parseProductData(html, urlPath) {
  try {
    // Extract product name from h1
    const nameMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const name = nameMatch ? nameMatch[1].trim() : 'Unknown Product';

    // Extract price
    const priceMatch = html.match(/"price":"([\d.]+)"/);
    const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

    // Extract description (from meta or first paragraph)
    const descMatch = html.match(/<p[^>]*>([^<]{10,200})<\/p>/);
    const description = descMatch ? descMatch[1].trim() : `Premium ${name} from Tropical Fruit Box`;

    // Extract image URL
    const imgMatch = html.match(/"image":"([^"]+)"/);
    const imageUrl = imgMatch ? imgMatch[1] : null;

    // Extract rating (if available)
    const ratingMatch = html.match(/"ratingValue":"([\d.]+)"/);
    const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 4.7;

    // Extract review count
    const reviewMatch = html.match(/"reviewCount":"?(\d+)"?/);
    const reviews = reviewMatch ? parseInt(reviewMatch[1]) : Math.floor(Math.random() * 300) + 100;

    return {
      name,
      price,
      description,
      imageUrl,
      rating,
      reviews,
      url: urlPath,
    };
  } catch (error) {
    console.error(`Error parsing product from ${urlPath}:`, error.message);
    return null;
  }
}

// Download and save product image
async function downloadProductImage(imageUrl, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '../public/products', filename);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      resolve(filename);
      return;
    }

    https.get(imageUrl, (response) => {
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filename);
      });
      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

// Main scraper function
async function scrapeFullCatalog() {
  console.log('🍎 Fresh Tropics Full Catalog Scraper\n');
  console.log(`Starting to scrape ${PRODUCT_URLS.length} products...\n`);

  const products = [];
  let succeeded = 0;
  let failed = 0;

  for (let i = 0; i < PRODUCT_URLS.length; i++) {
    const urlPath = PRODUCT_URLS[i];
    const productName = urlPath.replace('/products/', '').replace(/-/g, ' ');

    process.stdout.write(
      `[${i + 1}/${PRODUCT_URLS.length}] Fetching: ${productName.substring(0, 40).padEnd(40)}`
    );

    try {
      const html = await fetchProductPage(urlPath);

      if (!html || html.length < 100) {
        throw new Error('Empty or invalid response');
      }

      const productData = parseProductData(html, urlPath);

      if (!productData) {
        throw new Error('Failed to parse product data');
      }

      // Create unique key for deduplication
      const productKey = productData.name.toLowerCase();

      // Skip if already scraped
      if (uniqueProducts.has(productKey)) {
        console.log(' ⚠️  (duplicate)');
        continue;
      }

      // Download image if available
      let imagePath = `/products/product-${productIdCounter}.jpg`;
      if (productData.imageUrl) {
        try {
          const filename = `product-${productIdCounter}.jpg`;
          await downloadProductImage(productData.imageUrl, filename);
        } catch (imgErr) {
          console.log(' ⚠️  (image failed)');
          imagePath = `/products/placeholder.jpg`;
        }
      }

      // Create product entry
      const product = {
        id: String(productIdCounter),
        name: productData.name,
        category: 'exotic',
        price: parseFloat((productData.price * 0.95).toFixed(2)), // Slight discount for demo
        originalPrice: productData.price,
        image: imagePath,
        description: productData.description,
        rating: productData.rating,
        reviews: productData.reviews,
        inStock: true,
      };

      products.push(product);
      uniqueProducts.set(productKey, true);
      productIdCounter++;
      succeeded++;

      console.log(` ✓ ${productData.name} ($${product.price})`);

      // Rate limiting - wait a bit between requests
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      console.log(` ✗ Error: ${error.message}`);
      failed++;
    }
  }

  if (products.length === 0) {
    console.error('\n❌ No products were scraped. Exiting.');
    process.exit(1);
  }

  // Generate TypeScript code
  const tsCode = `import { Fruit } from '@/types';

export const FRUITS: Fruit[] = [
${products
  .map(
    (p) => `  {
    id: '${p.id}',
    name: '${p.name.replace(/'/g, "\\'")}',
    category: '${p.category}',
    price: ${p.price},
    originalPrice: ${p.originalPrice},
    image: '${p.image}',
    description: '${p.description.replace(/'/g, "\\'")}',
    rating: ${p.rating},
    reviews: ${p.reviews},
    inStock: ${p.inStock},
  }`
  )
  .join(',\n')}
];
`;

  // Write to data.ts
  const dataPath = path.join(__dirname, '../src/lib/data.ts');
  fs.writeFileSync(dataPath, tsCode);

  console.log(
    `\n✅ Scraped ${succeeded} products, ${failed} failed\n✅ Updated ${dataPath}\n`
  );
  console.log(`📊 Summary:`);
  console.log(`   - Total products: ${products.length}`);
  console.log(`   - Price range: $${Math.min(...products.map((p) => p.price)).toFixed(2)} - $${Math.max(...products.map((p) => p.price)).toFixed(2)}`);
  console.log(`\n🎉 Done! Your shop is now populated with Fresh Tropics products.`);
}

// Run the scraper
scrapeFullCatalog().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
