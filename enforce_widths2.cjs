const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const enforceWidths2 = `
.modal-overlay.point-and-click dialog.ui-notebook .inner-content {
  padding: 0 10px !important;
}
`;

code += enforceWidths2;
fs.writeFileSync('app/globals.css', code);
console.log('Added padding');
