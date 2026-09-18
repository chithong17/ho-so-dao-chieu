const fs = require('fs');
const text = fs.readFileSync('components/Game.tsx', 'utf8');
const match = text.match(/<div className="pinned-grid">\{evidence\.filter.*?<\/div>/s);
if (match) console.log(match[0]);
