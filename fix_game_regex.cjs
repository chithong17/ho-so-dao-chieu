const fs = require('fs');

let game = fs.readFileSync('components/Game.tsx', 'utf8');
const regex = /\{\(activeObj==='phone'\)[^]*?\}\<\/main\>\<\/\>\}/;
game = game.replace(regex, "{(activeObj==='phone')&&<>{phoneLibrary}</>}");

fs.writeFileSync('components/Game.tsx', game);
console.log('Fixed regex replace!');
