const fs = require('fs');
const text = fs.readFileSync('game/tasks.ts', 'utf8');
const idx = text.indexOf('export const relationOptions');
if (idx !== -1) {
  console.log(text.substring(idx, idx + 500));
}
