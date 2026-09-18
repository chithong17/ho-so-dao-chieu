const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const patch = \
.game-root {
  height: 100vh;
  height: 100dvh;
  overflow-y: auto;
  overflow-x: hidden;
}
\;

css += '\\n' + patch;

fs.writeFileSync('app/globals.css', css, 'utf8');
