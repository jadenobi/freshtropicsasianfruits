#!/usr/bin/env node

/**
 * Script to add size information to all products
 * Adds Small (5 lbs), Regular (8 lbs), and Large (10 lbs) options to all fruit products
 */

const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'src/lib/products.ts');

// Read the current products file
let fileContent = fs.readFileSync(productsFilePath, 'utf-8');

// Extract the products array from the file
const arrayStartIndex = fileContent.indexOf('[');
const arrayEndIndex = fileContent.lastIndexOf(']');
const productsArrayStr = fileContent.substring(arrayStartIndex, arrayEndIndex + 1);

// Parse products array using eval (be careful with this in production)
let fruits = [];
eval(`fruits = ${productsArrayStr}`);

console.log(`Found ${fruits.length} products`);

// Function to calculate size prices based on base price
function getSizesForProduct(basePrice) {
  const smallPrice = Math.round(basePrice * 0.65 * 100) / 100; // 65% for 5 lbs
  const regularPrice = basePrice; // 100% for 8 lbs (reference weight)
  const largePrice = Math.round(basePrice * 1.3 * 100) / 100; // 130% for 10 lbs

  return [
    {
      id: 'size-small',
      name: 'Small',
      weight: '5 lbs',
      price: smallPrice,
      originalPrice: Math.round(basePrice * 0.75 * 100) / 100
    },
    {
      id: 'size-regular',
      name: 'Regular',
      weight: '8 lbs',
      price: regularPrice,
      originalPrice: basePrice
    },
    {
      id: 'size-large',
      name: 'Large',
      weight: '10 lbs',
      price: largePrice,
      originalPrice: Math.round(basePrice * 1.5 * 100) / 100
    }
  ];
}

// Add sizes to each product
fruits = fruits.map(fruit => ({
  ...fruit,
  sizes: getSizesForProduct(fruit.price)
}));

console.log('Sizes added to all products');
console.log(`Example: ${fruits[0].name}`);
console.log(JSON.stringify(fruits[0].sizes, null, 2));

// Generate the new file content
const importsSection = fileContent.substring(0, arrayStartIndex);
const newFruitsArray = `${JSON.stringify(fruits, null, 2)}`;

const newFileContent = `${importsSection}${newFruitsArray};`;

// Write the updated file
fs.writeFileSync(productsFilePath, newFileContent, 'utf-8');

console.log(`\n✅ Successfully updated ${productsFilePath}`);
console.log(`Added sizes to all ${fruits.length} products`);
