const fs = require('fs');
let code = fs.readFileSync('components/Game.tsx', 'utf8');
code = code.replace("else if (objId === 'laptop') setFilter('mail');", "else if (objId === 'laptop') setFilter('mail');\n    else if (objId === 'board') setView('board');");
fs.writeFileSync('components/Game.tsx', code);
console.log('Fixed Game.tsx');
