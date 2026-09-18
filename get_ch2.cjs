const fs = require('fs');
const text = fs.readFileSync('game/tasks.ts', 'utf8');

const regex = /\{id:\s*['"]T0[4567]['"].*?\]\}/gs;
let match;
while ((match = regex.exec(text)) !== null) {
  console.log(match[0]);
  console.log('---');
}
