const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'src', 'lib', 'products.ts');

let content = fs.readFileSync(productsFilePath, 'utf8');

const newProducts = `
  {
    id: 'fgt_1001',
    name: 'Tikal Pink Guava Tree',
    category: 'tropical',
    price: 34.95,
    originalPrice: 44.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_100512.jpg?v=1762459650',
    description: 'Grow your own delicious and highly aromatic Tikal Pink Guava. This robust tree yields plenty of delicious, bright pink-fleshed fruit that is perfect for juices, jams, or eating fresh right off the tree.',
    rating: 4.8,
    reviews: 112,
    inStock: true,
    sizes: [
      { id: 'sz_1', name: '1 lb Box', weight: '1 lb', price: 9.95 },
      { id: 'sz_2', name: '2 lbs Box', weight: '2 lbs', price: 18.95 },
      { id: 'sz_tree', name: 'Live Tree', weight: '0', price: 34.95, originalPrice: 44.95 }
    ]
  },
  {
    id: 'fgt_1002',
    name: 'Honeycrisp™ Apple Tree',
    category: 'apples',
    price: 69.95,
    originalPrice: 89.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PlumSugar_3lbs-V3.png?v=1762459575',
    description: 'The Honeycrisp Apple Tree produces famously sweet, crisp, and juicy apples that store exceptionally well. Enjoy farm-fresh apples right from your own backyard.',
    rating: 4.9,
    reviews: 487,
    inStock: true,
    sizes: [
      { id: 'sz_1', name: '1 lb Box', weight: '1 lb', price: 8.95 },
      { id: 'sz_tree', name: 'Live Tree (Bare Root)', weight: '0', price: 69.95, originalPrice: 89.95 }
    ]
  },
  {
    id: 'fgt_1003',
    name: 'Meyer Lemon Tree',
    category: 'citrus',
    price: 65.95,
    originalPrice: 85.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/products/champagne-mango-box-tropical-fruit-box-15422507384920-sw.jpg?v=1762457603',
    description: 'The Meyer Lemon Tree is famous for its sweeter, less acidic lemons. Its compact size makes it perfect for patios and indoor growing, yielding fruit year-round.',
    rating: 4.8,
    reviews: 1848,
    inStock: true,
    sizes: [
      { id: 'sz_1', name: '1 lb Box', weight: '1 lb', price: 5.95 },
      { id: 'sz_2', name: '2 lbs Box', weight: '2 lbs', price: 10.95 },
      { id: 'sz_tree', name: 'Live Tree (Potted)', weight: '0', price: 65.95, originalPrice: 85.95 }
    ]
  },
  {
    id: 'fgt_1004',
    name: 'Cold Hardy Avocado Tree',
    category: 'exotic',
    price: 119.95,
    originalPrice: 149.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/products/mountain-soursop-box-tropical-fruit-box-15072024297560.jpg?v=1762457582',
    description: 'Grow your own avocados even in cooler climates! This Cold Hardy Avocado Tree can tolerate temperatures dropping below freezing, delivering rich, buttery avocados.',
    rating: 4.6,
    reviews: 930,
    inStock: true,
    sizes: [
      { id: 'sz_1', name: '1 lb Box', weight: '1 lb', price: 15.95 },
      { id: 'sz_tree', name: 'Live Tree', weight: '0', price: 119.95, originalPrice: 149.95 }
    ]
  },
  {
    id: 'fgt_1005',
    name: 'Chicago Hardy Fig Tree',
    category: 'exotic',
    price: 43.95,
    originalPrice: 55.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Jaboticaba_3lbs_v1.png?v=1762459552',
    description: 'The Chicago Hardy Fig is one of the most cold-tolerant fig trees available. It bounces back from freezing winters to produce dozens of incredibly sweet, jammy figs each summer.',
    rating: 4.8,
    reviews: 804,
    inStock: true,
    sizes: [
      { id: 'sz_1', name: '1 lb Box', weight: '1 lb', price: 12.95 },
      { id: 'sz_tree', name: 'Live Tree', weight: '0', price: 43.95, originalPrice: 55.95 }
    ]
  },
  {
    id: 'fgt_1006',
    name: 'Bing Cherry Tree',
    category: 'berries',
    price: 59.95,
    originalPrice: 79.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Sttawberries_chocoandpinkglowLove2.jpg?v=1762459124',
    description: 'The Bing Cherry Tree produces America\\'s favorite sweet cherry. Enjoy large, dark red, meaty cherries that are perfect for snacking and baking.',
    rating: 4.7,
    reviews: 419,
    inStock: true,
    sizes: [
      { id: 'sz_tree', name: 'Live Tree', weight: '0', price: 59.95, originalPrice: 79.95 }
    ]
  },
  {
    id: 'fgt_1007',
    name: 'Elberta Peach Tree',
    category: 'tropical',
    price: 59.95,
    originalPrice: 69.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Taste_of_the_tropics_w-Kumquat_Dad_3.jpg?v=1759439266',
    description: 'The Elberta Peach is known as the world\\'s most famous peach! This tree produces massive, juicy, sweet freestone peaches with a beautiful red blush.',
    rating: 4.9,
    reviews: 398,
    inStock: true,
    sizes: [
      { id: 'sz_1', name: '1 lb Box', weight: '1 lb', price: 7.95 },
      { id: 'sz_tree', name: 'Live Tree', weight: '0', price: 59.95, originalPrice: 69.95 }
    ]
  },
  {
    id: 'fgt_1008',
    name: 'Sweetheart Blueberry Bush',
    category: 'berries',
    price: 25.95,
    originalPrice: 35.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/RedStrawberries_Pinkglow2Love.jpg?v=1762459124',
    description: 'Why settle for one harvest when you can have two? The Sweetheart Blueberry Bush produces a heavy, early summer crop, and then blossoms again for a late summer harvest!',
    rating: 4.8,
    reviews: 271,
    inStock: true,
    sizes: [
      { id: 'sz_1', name: '1 lb Box', weight: '1 lb', price: 14.95 },
      { id: 'sz_bush', name: 'Live Bush', weight: '0', price: 25.95, originalPrice: 35.95 }
    ]
  },
  {
    id: 'fgt_1009',
    name: 'Arbequina Olive Tree',
    category: 'exotic',
    price: 51.95,
    originalPrice: 79.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Jaboticaba_3lbs_v1.png?v=1762459552',
    description: 'Enjoy delicious, home-grown olives anywhere in the country with the Arbequina Olive Tree. Popular for its high oil content and early fruiting habit.',
    rating: 4.7,
    reviews: 627,
    inStock: true,
    sizes: [
      { id: 'sz_tree', name: 'Live Tree', weight: '0', price: 51.95, originalPrice: 79.95 }
    ]
  },
  {
    id: 'fgt_1010',
    name: 'Burbank Plum Tree',
    category: 'tropical',
    price: 64.95,
    originalPrice: 74.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PlumSugar_3lbs-V3.png?v=1762459575',
    description: 'Producing large, purplish-red plums with amber flesh, the Burbank Plum Tree is a fantastic Japanese variety perfect for fresh eating or canning.',
    rating: 4.6,
    reviews: 145,
    inStock: true,
    sizes: [
      { id: 'sz_1', name: '1 lb Box', weight: '1 lb', price: 9.95 },
      { id: 'sz_tree', name: 'Live Tree', weight: '0', price: 64.95, originalPrice: 74.95 }
    ]
  },
  {
    id: 'fgt_1011',
    name: 'Bartlett Pear Tree',
    category: 'tropical',
    price: 69.95,
    originalPrice: 89.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/MountainPapaya3.jpg?v=1762459216',
    description: 'The Bartlett Pear is America\\'s favorite pear, known for its smooth, buttery texture and sweet, juicy flavor. A vigorous and reliable producer.',
    rating: 4.8,
    reviews: 322,
    inStock: true,
    sizes: [
      { id: 'sz_tree', name: 'Live Tree', weight: '0', price: 69.95, originalPrice: 89.95 }
    ]
  },
  {
    id: 'fgt_1012',
    name: 'Paper Shell Pecan Tree',
    category: 'exotic',
    price: 79.95,
    originalPrice: 99.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/products/create-your-own-tropical-roots-box-tropical-fruit-box-23351775559865.jpg?v=1762457513',
    description: 'Harvest large, sweet pecans that crack effortlessly! The Paper Shell Pecan Tree is a magnificent shade tree that also yields a bountiful harvest of buttery nuts.',
    rating: 4.9,
    reviews: 512,
    inStock: true,
    sizes: [
      { id: 'sz_1', name: '1 lb Bag', weight: '1 lb', price: 16.95 },
      { id: 'sz_tree', name: 'Live Tree', weight: '0', price: 79.95, originalPrice: 99.95 }
    ]
  },
  {
    id: 'fgt_1013',
    name: 'Fuyu Persimmon Tree',
    category: 'exotic',
    price: 89.95,
    originalPrice: 109.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Star_apple_3lbs_1_970468ac-4a0b-4e76-9551-4a780e6ddcd8.jpg?v=1759439074',
    description: 'The Fuyu Persimmon is non-astringent, meaning you can eat it firm like an apple! It features gorgeous fall foliage and delicious, sweet fruit.',
    rating: 4.8,
    reviews: 215,
    inStock: true,
    sizes: [
      { id: 'sz_1', name: '1 lb Box', weight: '1 lb', price: 11.95 },
      { id: 'sz_tree', name: 'Live Tree', weight: '0', price: 89.95, originalPrice: 109.95 }
    ]
  },
  {
    id: 'fgt_1014',
    name: 'Potted Rosemary Herb Plant',
    category: 'fresh',
    price: 19.95,
    originalPrice: 24.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/logo_988318eb-5f2b-4d0c-807b-239eac78d408.png?v=1762459216',
    description: 'Enjoy fresh, aromatic Rosemary right from your kitchen counter or garden. Extremely hardy, drought-tolerant, and versatile for cooking.',
    rating: 4.7,
    reviews: 188,
    inStock: true,
    sizes: [
      { id: 'sz_1', name: 'Potted Plant', weight: '0', price: 19.95, originalPrice: 24.95 }
    ]
  },
  {
    id: 'fgt_1015',
    name: 'Moorpark Apricot Tree',
    category: 'tropical',
    price: 69.95,
    originalPrice: 89.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/products/champagne-mango-box-tropical-fruit-box-15422507384920-sw.jpg?v=1762457603',
    description: 'The Moorpark Apricot is a true legendary fruit. Boasting extra-large, sweet, and juicy apricots that are perfect for fresh eating or drying.',
    rating: 4.6,
    reviews: 134,
    inStock: true,
    sizes: [
      { id: 'sz_tree', name: 'Live Tree', weight: '0', price: 69.95, originalPrice: 89.95 }
    ]
  },
  {
    id: 'fgt_1016',
    name: 'Redgold Nectarine Tree',
    category: 'tropical',
    price: 74.95,
    originalPrice: 94.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Taste_of_the_tropics_w-Kumquat_Dad_3.jpg?v=1759439266',
    description: 'The standard by which all nectarines are judged! The Redgold produces massive, sweet freestone fruit with glossy, red-blushed skin.',
    rating: 4.9,
    reviews: 201,
    inStock: true,
    sizes: [
      { id: 'sz_tree', name: 'Live Tree', weight: '0', price: 74.95, originalPrice: 94.95 }
    ]
  },
  {
    id: 'fgt_1017',
    name: 'Fruit Cocktail Tree',
    category: 'exotic',
    price: 189.95,
    originalPrice: 219.95,
    image: 'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/BirthdayBox3.jpg?v=1759439259',
    description: 'Can’t decide which fruit to grow? Grow up to 4 different fruits on one single tree! Normally featuring a combination of peaches, plums, apricots, and nectarines.',
    rating: 4.4,
    reviews: 326,
    inStock: true,
    sizes: [
      { id: 'sz_tree', name: 'Live Tree (Grafted)', weight: '0', price: 189.95, originalPrice: 219.95 }
    ]
  }
`;

const index = content.indexOf('export const FRUITS: Fruit[] = [');
if (index !== -1) {
  const insertIndex = index + 'export const FRUITS: Fruit[] = ['.length;
  // insert products after [
  const updatedContent = content.slice(0, insertIndex) + newProducts + ',' + content.slice(insertIndex);
  fs.writeFileSync(productsFilePath, updatedContent, 'utf8');
  console.log('Successfully added new fruit trees.');
} else {
  console.log('Could not find export const FRUITS array in products.ts');
}
