const fs = require('fs');
const text = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');
const lines = text.split('\\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('toggleScene')) {
    console.log('Line ' + i + ':', lines[i]);
  }
}
