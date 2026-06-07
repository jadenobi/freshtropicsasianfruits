const fs = require('fs');
const https = require('https');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'src', 'lib', 'products.ts');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = 'https://www.fast-growing-trees.com' + loc;
        return fetchHtml(loc).then(resolve).catch(reject);
      }
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractImage(html) {
  const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);
  if (ogMatch && ogMatch[1]) return ogMatch[1];
  
  const imgMatch = html.match(/<img[^>]+src=["'](https:\/\/cdn\.shopify\.com\/s\/files\/[^"']+)["'][^>]*>/i);
  if (imgMatch && imgMatch[1]) return imgMatch[1];
  return null;
}

async function addLychee() {
  console.log("Reading products.ts...");
  let content = fs.readFileSync(productsFilePath, 'utf8');
  
  const url = `https://www.fast-growing-trees.com/products/sweetheart-lychee`;
  try {
    console.log(`Fetching ${url}...`);
    const html = await fetchHtml(url);
    let img = extractImage(html);
    
    if (img) {
      if (img.startsWith('//')) img = 'https:' + img;
      console.log(`Found image for lychee: ${img}`);
      
      const newProduct = `
  {
    id: 'fgt_1018',
    name: 'Sweetheart Lychee Tree',
    category: 'exotic',
    price: 153.95,
    originalPrice: 226.95,
    image: '${img}',
    description: 'Grow the sweetest Lychee variety right at home! The Sweetheart Lychee produces abundant heart-shaped fruit with huge chunks of sweet, juicy flesh.',
    rating: 4.9,
    reviews: 10,
    inStock: true,
    sizes: [
      { id: 'sz_1', name: '1 lb Box', weight: '1 lb', price: 18.95 },
      { id: 'sz_tree', name: 'Live Tree', weight: '0', price: 153.95, originalPrice: 226.95 }
    ]
  },`;

      const insertIndex = content.indexOf('export const FRUITS: Fruit[] = [') + 'export const FRUITS: Fruit[] = ['.length;
      content = content.slice(0, insertIndex) + newProduct + content.slice(insertIndex);
      
      fs.writeFileSync(productsFilePath, content, 'utf8');
      console.log("Finished adding Lychee Tree!");
    } else {
      console.log("Could not extract lychee image.");
    }
  } catch (e) {
    console.error("Error fetching lychee:", e);
  }
}

addLychee();
