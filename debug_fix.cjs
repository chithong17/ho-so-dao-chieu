const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const debugFix = `
/* DEBUG FIX */
.modal-overlay.point-and-click dialog.ui-notebook .task-panel-head,
.modal-overlay.point-and-click dialog.ui-notebook .task-pagination {
  display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
  z-index: 9999 !important;
  color: red !important;
  background: blue !important;
}
`;

code += debugFix;
fs.writeFileSync('app/globals.css', code);
console.log('Appended debug fix');
