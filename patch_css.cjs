const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

// Replace the buggy span rule
css = css.replace(
  /\.modal-overlay\.point-and-click dialog\.ui-board \.pinned-grid button span\s*\{\s*position:\s*absolute\s*!important;\s*top:\s*10px\s*!important;\s*left:\s*10px\s*!important;\s*font-size:\s*0\.9rem\s*!important;\s*color:\s*rgba\(0,0,0,0\.5\)\s*!important;\s*font-family:\s*monospace\s*!important;\s*\}/,
  \\.modal-overlay.point-and-click dialog.ui-board .pinned-grid button span {
  position: absolute !important;
  top: -10px !important;
  left: -10px !important;
  font-size: 1rem !important;
  font-weight: bold !important;
  color: white !important;
  background: #c0392b !important;
  padding: 2px 6px !important;
  border-radius: 4px !important;
  font-family: monospace !important;
  z-index: 10 !important;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
  display: inline-block !important;
}\
);

// Replace the buggy SVG rule
css = css.replace(
  /\.modal-overlay\.point-and-click dialog\.ui-board \.pinned-grid button svg\s*\{\s*position:\s*absolute\s*!important;\s*top:\s*-12px\s*!important;\s*left:\s*50%\s*!important;\s*transform:\s*translateX\(-50%\)\s*!important;\s*color:\s*#c0392b\s*!important;\s*\/\*\s*Red\s*\*\/\s*width:\s*28px\s*!important;\s*height:\s*28px\s*!important;\s*filter:\s*drop-shadow\(2px 4px 2px rgba\(0,0,0,0\.5\)\)\s*!important;\s*\}/,
  \\.modal-overlay.point-and-click dialog.ui-board .pinned-grid button svg {
  display: none !important;
}\
);

fs.writeFileSync('app/globals.css', css, 'utf8');
console.log('Fixed CSS');
