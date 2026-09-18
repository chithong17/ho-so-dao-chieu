const fs = require('fs');
const text = fs.readFileSync('components/GameProvider.tsx', 'utf8');
const match = text.match(/const enter[\s\S]*?\}[\s\S]*?\}/);
if (match) console.log(match[0]);
