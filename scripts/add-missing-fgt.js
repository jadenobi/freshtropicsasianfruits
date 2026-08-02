const fs = require('fs');
const filepath = 'c:/Users/OBI AKOM/OneDrive/Documents/fruit-selling-website/src/lib/products.ts';
let content = fs.readFileSync(filepath, 'utf8');

const missingProducts = [
  { name: 'Emperor Lychee Tree', price: 95.95, image: 'https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Emperor_Lychee_Tree_FGT.jpg?v=1612444158' },
  { name: 'Pink Variegated Eureka Lemon Tree', price: 65.95, image: 'https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Pink_Lemon_Tree_FGT.jpg?v=1612444458' }
];

let idCounter = 1040; // High enough to avoid collision with recently added items
let newFruitsStr = '';

missingProducts.forEach(product => {
  if (!content.includes(product.name)) {
    newFruitsStr += `,
  {
    id: 'fgt_${idCounter++}',
    name: '${product.name}',
    category: 'tropical',
    price: ${product.price},
    originalPrice: ${product.price},
    image: '${product.image}',
    images: ['${product.image}'],
    description: "Grow your very own ${product.name}! This premium tropical fruit plant is guaranteed to thrive with our expert care instructions.",
    rating: 4.8,
    reviews: 12,
    inStock: true,
    sizes: [
      { id: 'sz_tree', name: 'Live Plant', weight: '0', price: ${product.price} }
    ]
  }`;
  }
});

const closingRegex = /\];?\s*$/;
if (closingRegex.test(content) && newFruitsStr !== '') {
  content = content.replace(closingRegex, newFruitsStr + '\n];');
  fs.writeFileSync(filepath, content);
  console.log('Added missing products');
} else {
  console.log('Nothing added.');
}
