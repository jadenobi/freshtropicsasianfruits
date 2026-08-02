const fs = require('fs');

async function checkScrape() {
  const res = await fetch('https://www.fast-growing-trees.com/collections/tropical-fruit-plants');
  const text = await res.text();
  
  // Try to find JSON in script tags
  const matches = text.match(/<script[^>]*>([\s\S]*?)<\/script>/g);
  let foundProducts = new Set();
  
  if (matches) {
    matches.forEach(m => {
      // Look for products array or name/price patterns
      const names = m.match(/"name":\s*"([^"]+)"/g);
      if (names) {
        names.forEach(n => {
          let name = n.replace('"name":"', '').replace('"', '').replace(/name":\s*/, '').replace(/"/g, '');
          if (name.includes('Tree') || name.includes('Plant') || name.includes('Bush')) {
             foundProducts.add(name);
          }
        });
      }
    });
  }
  
  console.log(`Found ${foundProducts.size} unique product names via basic Regex.`);
  fs.writeFileSync('c:/Users/OBI AKOM/OneDrive/Documents/fruit-selling-website/tmp-fgt-html.json', JSON.stringify(Array.from(foundProducts), null, 2));
}

checkScrape();
