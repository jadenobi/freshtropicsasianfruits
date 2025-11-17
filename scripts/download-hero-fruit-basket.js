#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Chosen royalty-free image from Unsplash (fruit basket)
const imageUrl = 'https://images.unsplash.com/photo-1439396087961-98bc12c21176?auto=format&fit=crop&w=1200&q=80';

const outDir = path.join(__dirname, '..', 'public', 'hero');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'fruit-basket.jpg');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const protocol = u.protocol === 'https:' ? https : require('http');
    const req = protocol.get(url, { timeout: 15000, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(new Error('Timeout')); });
  });
}

(async () => {
  try {
    console.log('Downloading hero image...');
    await download(imageUrl, outPath);
    console.log('Saved:', outPath);
    console.log('\nNext: restart dev server (npm run dev) to see the image on the homepage.');
  } catch (err) {
    console.error('Failed to download image:', err.message);
    process.exit(1);
  }
})();
