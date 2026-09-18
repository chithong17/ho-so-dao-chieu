const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const heightFix = `
/* -------------------------------------------
   CRT LAPTOP CARD OVERFLOW FIX
------------------------------------------- */
.modal-overlay.point-and-click dialog.ui-laptop .evidence-item {
  height: auto !important;
  min-height: 100px !important;
  margin-bottom: 10px !important;
}
`;

code += heightFix;
fs.writeFileSync('app/globals.css', code);
console.log('Fixed card overflow');
