const fs = require('fs');
const text = fs.readFileSync('components/Game.tsx', 'utf8');
const idx = text.indexOf('disabled={e.fiction}');
if (idx !== -1) {
  console.log(text.substring(Math.max(0, idx - 100), idx + 200));
}
