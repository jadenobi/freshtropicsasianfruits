const fs = require('fs');
const filepath = 'c:/Users/OBI AKOM/OneDrive/Documents/fruit-selling-website/src/lib/products.ts';
let content = fs.readFileSync(filepath, 'utf8');

content = content.replace(/name: 'Persian 'Bearss' Lime Tree'/g, 'name: "Persian \'Bearss\' Lime Tree"');
content = content.replace(/description: 'Grow your very own Persian 'Bearss' Lime Tree!/g, 'description: "Grow your very own Persian \'Bearss\' Lime Tree!');

content = content.replace(/name: 'Soursop 'Guanabana' Tree'/g, 'name: "Soursop \'Guanabana\' Tree"');
content = content.replace(/description: 'Grow your very own Soursop 'Guanabana' Tree!/g, 'description: "Grow your very own Soursop \'Guanabana\' Tree!');

fs.writeFileSync(filepath, content);
console.log('Fixed quotes in products.ts');
