const fs = require('fs');
const text = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');
const match = text.match(/function CinematicIntro[\s\S]*?(?=function )/);
if (match) console.log(match[0]);
