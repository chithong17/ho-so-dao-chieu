const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css += \

/* FIX E-NUMBER OVERLAP BUG */
.modal-overlay.point-and-click dialog.ui-board .pinned-grid button span {
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
}

.modal-overlay.point-and-click dialog.ui-board .pinned-grid button svg {
  display: none !important;
}
\;

fs.writeFileSync('app/globals.css', css, 'utf8');
console.log('Fixed CSS');
