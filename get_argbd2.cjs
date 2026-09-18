const fs = require('fs');
const text = fs.readFileSync('components/Game.tsx', 'utf8');
const idx = text.indexOf('const argumentBoard=');
if (idx !== -1) {
  const substr = text.substring(idx, idx + 2000);
  const start = substr.indexOf('<h3>Tu li?u');
  console.log(substr.substring(start, start + 1000));
}
