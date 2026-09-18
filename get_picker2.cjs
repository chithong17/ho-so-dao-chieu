const fs = require('fs');
const text = fs.readFileSync('components/TaskPanel.tsx', 'utf8');
const idx = text.indexOf('EvidencePicker');
if (idx !== -1) {
  console.log(text.substring(idx - 100, idx + 800));
}
