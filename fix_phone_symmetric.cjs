const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const fixPhoneBoundsSymmetric = `

/* ===========================================
   FIX PHONE UI - SYMMETRIC PERFECT BOUNDS
=========================================== */

.modal-overlay.point-and-click dialog.ui-phone .inner-content {
  /* The glass is perfectly centered! 
     100% - 38.2% - 38.2% = 23.6% width.
     100% - 19.5% - 28% = 52.5% height.
  */
  top: 19.5% !important;
  left: 38.2% !important;
  right: 38.2% !important;
  bottom: 28% !important;
}

`;

css += fixPhoneBoundsSymmetric;
fs.writeFileSync('app/globals.css', css);
console.log('Fixed phone UI bounds perfectly!');
