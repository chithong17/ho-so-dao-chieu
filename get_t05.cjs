const fs = require('fs');
const text = fs.readFileSync('components/TaskPanel.tsx', 'utf8');
const idx = text.indexOf('T05');
if (idx !== -1) {
  console.log(text.substring(Math.max(0, idx - 200), idx + 800));
}
