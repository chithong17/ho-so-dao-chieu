const fs = require('fs');
const text = fs.readFileSync('components/Game.tsx', 'utf8');
const match = text.match(/.{0,100}Gi?i mã.{0,100}/g);
if (match) {
  match.forEach(m => console.log(m));
} else {
  console.log('Not found in Game.tsx');
}
