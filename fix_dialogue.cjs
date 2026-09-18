const fs = require('fs');
let text = fs.readFileSync('game/evidence.ts', 'utf8');

text = text.replace(
  '"N?u yêu c?u c? thay d?i mà không báo cho ph?n giao di?n thì mình không th? ti?p t?c làm nhu cu."',
  '"N?u yêu c?u c? thay d?i mà không báo th? này, tôi không làm ti?p n?a."'
);

fs.writeFileSync('game/evidence.ts', text, 'utf8');
console.log('Fixed dialogue');
