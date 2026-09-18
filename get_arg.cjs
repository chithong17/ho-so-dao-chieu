const fs = require('fs');
const text = fs.readFileSync('components/Game.tsx', 'utf8');
const lines = text.split('\\n');
lines.forEach((line, i) => {
  if (line.includes('argument')) console.log('Line ' + i + ': ' + line);
});
