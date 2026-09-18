const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

// Strip out ALL grid-area related lines from globals.css just to be safe
const lines = code.split('\n');
const newLines = lines.filter(line => !line.includes('grid-area'));
code = newLines.join('\n');

fs.writeFileSync('app/globals.css', code);
console.log('Cleaned grid areas!');
