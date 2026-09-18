const fs = require('fs');
const text = fs.readFileSync('components/TaskPanel.tsx', 'utf8');
const idx = text.indexOf('case \\'classify\\':');
if (idx !== -1) {
  console.log(text.substring(idx, idx + 1500));
}
