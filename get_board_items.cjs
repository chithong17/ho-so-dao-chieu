const fs = require('fs');
const text = fs.readFileSync('components/Game.tsx', 'utf8');
const idx = text.indexOf('Tu li?u');
if (idx !== -1) {
  console.log(text.substring(Math.max(0, idx - 20), idx + 1000));
}
