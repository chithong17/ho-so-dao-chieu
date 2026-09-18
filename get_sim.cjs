const fs = require('fs');
const text = fs.readFileSync('game/engine.ts', 'utf8');
const idx = text.indexOf('export function simulateRecovery');
if (idx !== -1) {
  console.log(text.substring(idx, idx + 1000));
}
