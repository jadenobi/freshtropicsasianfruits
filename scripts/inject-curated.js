const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'src', 'lib', 'fgt-products.json');
const tsPath = path.join(__dirname, '..', 'src', 'lib', 'products.ts');

function injectCurated() {
  console.log("Reading products...");
  const rawJson = fs.readFileSync(jsonPath, 'utf8');
  let products = JSON.parse(rawJson);
  
  // Filter for high quality
  let valid = products.filter(p => p.image && p.image.length > 5 && p.price > 0 && p.name && !p.name.includes('Gift Card'));
  
  // Shuffle valid
  for (let i = valid.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [valid[i], valid[j]] = [valid[j], valid[i]];
  }
  
  // Take top 30
  const selected = valid.slice(0, 30);
  console.log(`Selected ${selected.length} products.`);
  
  let tsContent = fs.readFileSync(tsPath, 'utf8');
  
  // Create object strings manually to ensure no syntax issues
  const newItemsStr = selected.map(p => {
    return `  {
    id: ${JSON.stringify(p.id)},
    name: ${JSON.stringify(p.name)},
    category: 'exotic',
    price: ${p.price},
    originalPrice: ${p.originalPrice},
    image: ${JSON.stringify(p.image)},
    description: ${JSON.stringify(p.description)},
    rating: ${p.rating},
    reviews: ${p.reviews},
    inStock: true,
    sizes: [
      { id: 'sz_tree1', name: 'Live Plant / Tree', weight: '0', price: ${p.price}, originalPrice: ${p.originalPrice} }
    ]
  }`;
  }).join(',\n');

  // Insert before the closing bracket of FRUITS array
  // Assuming the file ends roughly with `];` matching FRUITS end
  const arrayEndIndex = tsContent.lastIndexOf(']');
  if (arrayEndIndex !== -1) {
    const before = tsContent.substring(0, arrayEndIndex);
    const after = tsContent.substring(arrayEndIndex);
    
    // Check if the character before ']' is already a comma or whitespace
    let injected = before;
    if (!before.trim().endsWith(',')) {
      injected += ',\n';
    }
    injected += newItemsStr + '\n' + after;
    
    fs.writeFileSync(tsPath, injected, 'utf8');
    console.log("Successfully injected 30 products into products.ts");
  } else {
    console.error("Could not locate the end of the FRUITS array in products.ts");
  }
}

injectCurated();
