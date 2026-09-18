const fs = require('fs');
const text = fs.readFileSync('game/evidence.ts', 'utf8');

let idx = text.indexOf('E12');
if (idx !== -1) console.log(text.substring(Math.max(0, idx - 100), idx + 200));

console.log('---');

idx = text.indexOf('E11');
if (idx !== -1) console.log(text.substring(Math.max(0, idx - 100), idx + 200));
