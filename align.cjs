const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');
code = code.replace(
`.room-scene {
  width: 100%;
  height: 100%;
  position: relative;
}`,
`.room-scene {
  width: 100vw;
  height: 56.25vw;
  max-width: 177.78vh;
  max-height: 100vh;
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
}`);
fs.writeFileSync('app/globals.css', code);
console.log('Fixed aspect ratio');
