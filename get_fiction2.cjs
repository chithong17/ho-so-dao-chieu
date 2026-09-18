const fs = require('fs');
const text = fs.readFileSync('components/Game.tsx', 'utf8');
const lines = text.split('\\n');
lines.forEach(line => {
  if (line.includes('fiction')) console.log(line);
});
