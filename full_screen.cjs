const fs = require('fs');
const css = `
/* Full-screen overrides */
.chapter-strip { display: none !important; }
.room-container { 
  height: calc(100vh - 56px) !important; 
  width: 100vw;
}
.game-root.presenter .room-container { height: calc(100vh - 56px) !important; }
`;
fs.appendFileSync('app/globals.css', css);
