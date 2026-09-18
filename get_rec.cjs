const fs = require('fs');
const text = fs.readFileSync('game/tasks.ts', 'utf8');
const match = text.match(/export const recoveryActions.*?\]\);/s);
if (match) console.log(match[0]);
