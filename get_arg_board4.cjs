const fs = require('fs');
const text = fs.readFileSync('components/Game.tsx', 'utf8');
const idx = text.indexOf('claim-list');
if (idx !== -1) {
  console.log(text.substring(idx - 100, idx + 1000));
}
