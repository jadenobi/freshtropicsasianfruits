const fs = require('fs');
const filepath = 'c:/Users/OBI AKOM/OneDrive/Documents/fruit-selling-website/src/lib/products.ts';
let content = fs.readFileSync(filepath, 'utf8');

content = content.replace(
  'description: "Grow your very own Persian \'Bearss\' Lime Tree! This premium tropical fruit plant is guaranteed to thrive with our expert care instructions.\',',
  'description: "Grow your very own Persian \'Bearss\' Lime Tree! This premium tropical fruit plant is guaranteed to thrive with our expert care instructions.",'
);

content = content.replace(
  'description: "Grow your very own Soursop \'Guanabana\' Tree! This premium tropical fruit plant is guaranteed to thrive with our expert care instructions.\',',
  'description: "Grow your very own Soursop \'Guanabana\' Tree! This premium tropical fruit plant is guaranteed to thrive with our expert care instructions.",'
);

fs.writeFileSync(filepath, content);
console.log('Fixed description quotes in products.ts');
