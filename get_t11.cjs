const fs = require('fs');
const text = fs.readFileSync('game/tasks.ts', 'utf8');
const match = text.match(/\{id:'T1(0|1)'.*?\}/gs);
if (match) {
  match.forEach(m => console.log(m));
}
