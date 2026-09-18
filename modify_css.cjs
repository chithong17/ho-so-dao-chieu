const fs = require('fs');
let content = fs.readFileSync('app/globals.css', 'utf8');
content = content.replace(
  'background:url(\\'/scene_wall.jpg\\') center / cover no-repeat !important;',
  'background:url(\\'/drawer_bg.jpg\\') center / cover no-repeat !important;'
);
fs.writeFileSync('app/globals.css', content);
console.log('Fixed ui-files background image!');
