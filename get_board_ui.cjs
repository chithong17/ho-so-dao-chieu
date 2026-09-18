const fs = require('fs');
const text = fs.readFileSync('components/Game.tsx', 'utf8');
const idx = text.indexOf('<h3>Tu li?u tái d?ng');
if (idx !== -1) {
  console.log(text.substring(idx, idx + 500));
}
