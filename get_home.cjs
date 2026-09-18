const fs = require('fs');
const text = fs.readFileSync('components/Game.tsx', 'utf8');
const match = text.match(/function HomeScreen[\s\S]*?return[\s\S]*?(?=function )/);
if (match) console.log(match[0]);
