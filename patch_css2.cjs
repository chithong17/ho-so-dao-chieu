const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css += "\\n/* FIX E-NUMBER OVERLAP BUG */\\n";
css += ".modal-overlay.point-and-click dialog.ui-board .pinned-grid button span {\\n";
css += "  position: absolute !important;\\n";
css += "  top: -10px !important;\\n";
css += "  left: -10px !important;\\n";
css += "  font-size: 1rem !important;\\n";
css += "  font-weight: bold !important;\\n";
css += "  color: white !important;\\n";
css += "  background: #c0392b !important;\\n";
css += "  padding: 2px 6px !important;\\n";
css += "  border-radius: 4px !important;\\n";
css += "  font-family: monospace !important;\\n";
css += "  z-index: 10 !important;\\n";
css += "  box-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;\\n";
css += "  display: inline-block !important;\\n";
css += "}\\n";

css += ".modal-overlay.point-and-click dialog.ui-board .pinned-grid button svg {\\n";
css += "  display: none !important;\\n";
css += "}\\n";

fs.writeFileSync('app/globals.css', css, 'utf8');
console.log('Appended CSS');
