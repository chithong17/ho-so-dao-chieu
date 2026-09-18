const fs = require('fs');
let game = fs.readFileSync('components/Game.tsx', 'utf8');

// Replace width:'100%' with width:'100%', boxSizing:'border-box'
game = game.replace(/width:'100%', padding:'6px 4px'/g, "width:'100%', boxSizing:'border-box', padding:'6px 4px'");

fs.writeFileSync('components/Game.tsx', game);
console.log('Added border-box to evidence-item!');
