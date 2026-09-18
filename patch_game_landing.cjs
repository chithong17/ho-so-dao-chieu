const fs = require('fs');
let text = fs.readFileSync('components/Game.tsx', 'utf8');

text = text.replace(
  "if (intro) playBgm('intro');",
  "if (intro) playBgm('landing');"
);

fs.writeFileSync('components/Game.tsx', text, 'utf8');
console.log('Patched Game.tsx');
