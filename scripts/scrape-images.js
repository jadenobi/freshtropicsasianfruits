const fs = require('fs');
const https = require('https');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'src', 'lib', 'products.ts');

const treeUrls = {
  'fgt_1001': 'tikal-pink-guava-tree',
  'fgt_1002': 'honeycrisp-apple-tree',
  'fgt_1003': 'meyer-lemon-tree',
  'fgt_1004': 'cold-hardy-avocado-tree',
  'fgt_1005': 'chicago-hardy-fig-tree',
  'fgt_1006': 'bingcherry',
  'fgt_1007': 'elberta-peach-tree',
  'fgt_1008': 'sweetheart-blueberry',
  'fgt_1009': 'arbequinaolivetree',
  'fgt_1010': 'burbank-plum-tree',
  'fgt_1011': 'bartlettpeartree',
  'fgt_1012': 'papershellpecan',
  'fgt_1013': 'fuyupersimmontree',
  'fgt_1014': 'rosemary-plant',
  'fgt_1015': 'moorpark-apricot-tree',
  'fgt_1016': 'redgold-nectarine-tree',
  'fgt_1017': 'fruit-cocktail-tree'
};

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
  
  const twMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["'](.*?)["']/i);
  if (twMatch && twMatch[1]) return twMatch[1];
  
  const imgMatch = html.match(/<img[^>]+src=["'](https:\/\/cdn\.shopify\.com\/s\/files\/[^"']+)["'][^>]*>/i);
  if (imgMatch && imgMatch[1]) return imgMatch[1];
  
  return null;
}

async function updateImages() {
  console.log("Reading products.ts...");
  let content = fs.readFileSync(productsFilePath, 'utf8');
  
  for (const [id, slug] of Object.entries(treeUrls)) {
    const url = `https://www.fast-growing-trees.com/products/${slug}`;
    try {
      console.log(`Fetching ${url}...`);
      const html = await fetchHtml(url);
      let img = extractImage(html);
      
      if (img) {
        if (img.startsWith('//')) {
          img = 'https:' + img;
        }
        
        console.log(`Found image for ${id}: ${img}`);
        
        const productRegex = new RegExp(`(id:\\s*['"]${id}['"][^]*?image:\\s*['"])(.*?)(['"])`, 'i');
        const match = content.match(productRegex);
        
        if (match) {
          content = content.replace(productRegex, `$1${img}$3`);
        } else {
          console.log(`Could not locate image field for id ${id} in products.ts`);
        }
      } else {
        console.log(`No image found for ${id}`);
      }
    } catch (e) {
      console.error(`Failed to fetch ${id}:`, e.message);
    }
  }

  fs.writeFileSync(productsFilePath, content, 'utf8');
  console.log("Finished updating products.ts with real images!");
}

updateImages();
