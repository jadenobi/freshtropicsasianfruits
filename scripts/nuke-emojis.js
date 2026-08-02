const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Specifically target emoji presentation and extended pictographics
      const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
      
      // We will remove all emojis completely EXCEPT standard text punctuation that might be flagged
      const stripped = content.replace(emojiRegex, (match) => {
         if(match === '©' || match === '®' || match === '™' || match === '★') return match;
         return '';
      });
      
      // Additionally remove some combined emojis that regex might leave trailing bytes for, like variation selectors
      const deepStripped = stripped.replace(/[\uFE0F]/g, '');

      if (content !== deepStripped) {
         console.warn("Stripped emojis from: " + filePath);
         fs.writeFileSync(filePath, deepStripped, 'utf8');
      }
    }
  });
}

walkDir('src');
console.log("Global emoji purge completed.");
