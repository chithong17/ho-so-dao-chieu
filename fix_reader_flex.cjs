const fs = require('fs');
let game = fs.readFileSync('components/Game.tsx', 'utf8');

game = game.replace(
  `className="reader-column custom-scroll" style={{flex:1, overflowY:'auto', padding:'10px'}}`,
  `className="reader-column custom-scroll" style={{flex:1, display:'flex', flexDirection:'column', overflowY:'auto', padding:'10px'}}`
);

fs.writeFileSync('components/Game.tsx', game);
console.log('Added flex to reader-column inline style!');
