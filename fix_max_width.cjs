const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const fixMaxWidth = `
/* Fix Max-Width cutting off the right side */
.modal-overlay.point-and-click dialog.ui-notebook .inner-content,
.modal-overlay.point-and-click dialog.ui-notebook .task-panel,
.modal-overlay.point-and-click dialog.ui-notebook .task-panel-head,
.modal-overlay.point-and-click dialog.ui-notebook .task-pagination,
.modal-overlay.point-and-click dialog.ui-notebook .task-content {
  max-width: none !important;
}
`;

code += fixMaxWidth;
fs.writeFileSync('app/globals.css', code);
console.log('Fixed max-width on notebook elements!');
