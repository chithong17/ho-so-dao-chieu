const fs = require('fs');
const text = fs.readFileSync('game/evidence.ts', 'utf8');
const lines = text.split('\\n');
lines.forEach(line => {
  if (line.includes('E12')) console.log(line);
  if (line.includes('E11')) console.log(line);
});
