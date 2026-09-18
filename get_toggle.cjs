const fs = require('fs');
const text = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');
const idx = text.indexOf('toggleScene');
if (idx !== -1) {
  console.log(text.substring(idx, idx + 1000));
}
