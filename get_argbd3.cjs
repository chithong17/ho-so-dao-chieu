const fs = require('fs');
const text = fs.readFileSync('components/Game.tsx', 'utf8');
const match = text.match(/<h3>Tu li?u tái d?ng.*?<\/section>/s);
if (match) console.log(match[0]);
