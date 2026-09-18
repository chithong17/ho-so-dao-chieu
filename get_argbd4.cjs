const fs = require('fs');
const text = fs.readFileSync('components/Game.tsx', 'utf8');
const idx = text.indexOf('Tu li?u');
console.log(text.substring(idx - 20, idx + 500));
