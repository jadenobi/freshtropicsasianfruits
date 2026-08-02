const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');
      // Regex for emojis
      const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
      const matches = content.match(emojiRegex);
      if (matches) {
        // filter out true text/common vectors if any, but let's just collect all
        const strictEmojis = matches.filter(e => e !== '©' && e !== '®' && e !== '™');
        if (strictEmojis.length > 0) {
          results.push({ file: filePath, emojis: [...new Set(strictEmojis)] });
        }
      }
    }
  });
  return results;
}

const res = walkDir('src');
console.log(JSON.stringify(res, null, 2));
