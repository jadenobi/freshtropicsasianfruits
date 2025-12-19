const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.tropicalfruitbox.com';

async function scrapeAllProducts() {
  console.log('🍎 Tropical Fruit Box - Advanced Product Scraper\n');
  
  try {
    const products = [];
    
    // Try the API endpoint first (faster)
    console.log('📡 Attempting to fetch via API...\n');
    const apiProducts = await scrapeViaAPI();
    
    if (apiProducts && apiProducts.length > 0) {
      console.log(`✅ Successfully collected ${apiProducts.length} products from API\n`);
      
      // Generate TypeScript file
      const tsContent = generateTypeScriptFile(apiProducts);
      fs.writeFileSync(
        path.join(__dirname, '../src/lib/data.ts'),
        tsContent,
        'utf-8'
      );

      console.log(`📝 Updated: src/lib/data.ts`);
      console.log(`🎉 Complete! ${apiProducts.length} products with images ready.`);
      return;
    }

    // Fallback: Scrape homepage
    console.log('🔍 Scraping homepage for products...\n');
    const homepageProducts = await scrapeHomepage();
    
    if (homepageProducts.length > 0) {
      const tsContent = generateTypeScriptFile(homepageProducts);
      fs.writeFileSync(
        path.join(__dirname, '../src/lib/data.ts'),
        tsContent,
        'utf-8'
      );

      console.log(`\n✅ Successfully scraped ${homepageProducts.length} products`);
      console.log(`📝 Updated: src/lib/data.ts`);
      console.log(`🎉 Complete!`);
    } else {
      console.log('\n⚠️ No products found.');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function scrapeViaAPI() {
  try {
    // Try Shopify API endpoint
    const { data } = await axios.get(`${BASE_URL}/products.json?limit=250`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 15000
    });

    if (data.products && Array.isArray(data.products)) {
      return data.products.map(product => ({
        id: product.id.toString(),
        name: product.title,
        category: determineCategoryFromName(product.title),
        price: product.variants[0]?.price ? parseFloat(product.variants[0].price) : 49.99,
        originalPrice: product.variants[0]?.price ? parseFloat(product.variants[0].price) : 49.99,
        image: product.featured_image?.src || product.images[0]?.src || '/products/placeholder.jpg',
        description: product.body_html 
          ? product.body_html.replace(/<[^>]*>/g, '').substring(0, 200)
          : product.title,
        rating: 4.5 + (Math.random() * 0.5),
        reviews: Math.floor(Math.random() * 300) + 50,
        inStock: true
      }));
    }
  } catch (err) {
    console.log(`⚠️ API failed: ${err.message}`);
  }
  return [];
}

async function scrapeHomepage() {
  try {
    const { data } = await axios.get(BASE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 15000
    });

    const $ = cheerio.load(data);
    const products = [];

    // Try multiple selectors
    const productSelectors = [
      '.product',
      '[data-product]',
      '.product-card',
      '.product-item',
      '[class*="product"]'
    ];

    for (const selector of productSelectors) {
      const elements = $(selector);
      console.log(`Found ${elements.length} elements with selector: ${selector}`);
      
      if (elements.length > 0) {
        elements.each((index, element) => {
          const $el = $(element);
          
          const name = $el.find('[data-product-title], .product-name, h2, h3, a').first().text().trim();
          if (!name || name.length < 3) return;

          const priceText = $el.find('[data-price], .price, .product-price').first().text().trim();
          const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 49.99;

          const image = $el.find('img').first().attr('src') || 
                       $el.find('img').attr('data-src') ||
                       '/products/placeholder.jpg';

          const product = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            category: determineCategoryFromName(name),
            price,
            originalPrice: price,
            image: cleanImageUrl(image),
            description: name,
            rating: 4.5 + (Math.random() * 0.5),
            reviews: Math.floor(Math.random() * 300),
            inStock: true
          };

          if (!products.find(p => p.name === product.name)) {
            products.push(product);
          }
        });

        if (products.length > 0) break;
      }
    }

    return products;
  } catch (error) {
    console.log(`⚠️ Homepage scrape failed: ${error.message}`);
    return [];
  }
}

function cleanImageUrl(url) {
  if (!url) return '/products/placeholder.jpg';
  
  if (url.startsWith('//')) {
    return 'https:' + url;
  } else if (!url.startsWith('http')) {
    return BASE_URL + (url.startsWith('/') ? url : '/' + url);
  }
  return url;
}

function determineCategoryFromName(name) {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('berry') || nameLower.includes('blueberry')) return 'berries';
  if (nameLower.includes('mango')) return 'tropical';
  if (nameLower.includes('pineapple')) return 'tropical';
  if (nameLower.includes('dragon') || nameLower.includes('passion')) return 'exotic';
  if (nameLower.includes('rambutan') || nameLower.includes('lychee')) return 'exotic';
  if (nameLower.includes('citrus') || nameLower.includes('orange')) return 'citrus';
  if (nameLower.includes('apple')) return 'apples';
  if (nameLower.includes('premium') || nameLower.includes('gift')) return 'exotic';
  
  return 'exotic';
}

function generateTypeScriptFile(products) {
  const imports = `import { Fruit } from '@/types';\n\n`;
  
  const fruitsArray = products.map(p => `  {
    id: '${p.id}',
    name: '${escapeString(p.name)}',
    category: '${p.category}',
    price: ${p.price},
    originalPrice: ${p.originalPrice},
    image: '${escapeString(p.image)}',
    description: '${escapeString(p.description.substring(0, 150))}',
    rating: ${parseFloat(p.rating.toFixed(1))},
    reviews: ${p.reviews},
    inStock: ${p.inStock}
  }`).join(',\n');

  return `${imports}export const FRUITS: Fruit[] = [\n${fruitsArray}\n];\n`;
}

function escapeString(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/"/g, '\\"');
}

// Run the scraper
scrapeAllProducts();
