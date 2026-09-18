const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const fixPhoneBounds = `

/* ===========================================
   FIX PHONE BOUNDS
=========================================== */

/* Perfect Bounds matching the exact LCD screen on the phone */
.modal-overlay.point-and-click dialog.ui-phone .inner-content {
  top: 16.5% !important;
  left: 38.5% !important;
  right: 36.5% !important;
  bottom: 25.5% !important;
  width: auto !important;
  height: auto !important;
}

`;

css += fixPhoneBounds;
fs.writeFileSync('app/globals.css', css);
console.log('Fixed phone bounds!');
