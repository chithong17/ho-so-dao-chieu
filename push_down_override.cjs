const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const pushDown = `
.modal-overlay.point-and-click dialog.ui-notebook .inner-content {
  top: 22% !important;
  height: 65% !important;
}
`;

code += pushDown;
fs.writeFileSync('app/globals.css', code);
console.log('Appended top override!');
