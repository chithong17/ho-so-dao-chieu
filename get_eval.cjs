const fs = require('fs');
const text = fs.readFileSync('game/engine.ts', 'utf8');
const idx = text.indexOf("case 'T11':");
if (idx !== -1) {
  console.log(text.substring(idx, idx + 800));
}
