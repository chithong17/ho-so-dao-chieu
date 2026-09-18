const fs = require('fs');
let code = fs.readFileSync('components/Game.tsx', 'utf8');

code = code.replace(
  "if (intro) playBgm('intro'); else playBgm('investigation');",
  "if (intro) playBgm('intro');"
);

fs.writeFileSync('components/Game.tsx', code, 'utf8');
console.log('Patched Game.tsx');
