const fs = require('fs');
const text = fs.readFileSync('components/TaskPanel.tsx', 'utf8');
const idx = text.indexOf("case 'recovery':");
if (idx !== -1) {
  console.log(text.substring(idx, idx + 800));
}
