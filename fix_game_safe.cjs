const fs = require('fs');
let game = fs.readFileSync('components/Game.tsx', 'utf8');

const lines = game.split('\\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("{(activeObj==='phone')&&<>{library}")) {
    lines[i] = "  {(activeObj==='phone')&&<>{phoneLibrary}</>}";
  }
}

fs.writeFileSync('components/Game.tsx', lines.join('\\n'));
console.log('Replaced exact string safely!');
