const fs = require('fs');
const text = fs.readFileSync('components/ui.tsx', 'utf8');
const idx = text.indexOf('function Sorter');
if (idx !== -1) {
  console.log(text.substring(idx, idx + 1000));
}
