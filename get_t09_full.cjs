const fs = require('fs');
const text = fs.readFileSync('game/tasks.ts', 'utf8');
const match = text.match(/\{id:'T09'.*?\}/s);
if (match) console.log(match[0]);
