const fs = require('fs');
const text = fs.readFileSync('components/Game.tsx', 'utf8');
const idx = text.indexOf('allBoardRecords.map');
if (idx !== -1) {
  console.log(text.substring(Math.max(0, idx - 50), idx + 800));
}
