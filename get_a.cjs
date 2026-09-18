const fs = require('fs');
const text = fs.readFileSync('game/evidence.ts', 'utf8');
const lines = text.split('\\n');
lines.forEach(l => {
  if (l.includes('E11') || l.includes('E15')) console.log(l);
});
