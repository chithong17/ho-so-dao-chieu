const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const tweakCSS = `
.modal-overlay.point-and-click dialog.ui-notebook .inner-content {
  top: 19% !important;
  height: 68% !important;
}

/* Increase font sizes */
.modal-overlay.point-and-click dialog.ui-notebook .task-panel-head {
  font-size: 24px !important;
}

.modal-overlay.point-and-click dialog.ui-notebook h2 {
  font-size: 26px !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-prompt {
  font-size: 16px !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .choice,
.modal-overlay.point-and-click dialog.ui-notebook .chip,
.modal-overlay.point-and-click dialog.ui-notebook input,
.modal-overlay.point-and-click dialog.ui-notebook select,
.modal-overlay.point-and-click dialog.ui-notebook textarea,
.modal-overlay.point-and-click dialog.ui-notebook .classify-item,
.modal-overlay.point-and-click dialog.ui-notebook .task-content button {
  font-size: 15px !important;
}
`;

code += tweakCSS;
fs.writeFileSync('app/globals.css', code);
console.log('Tweaked layout and fonts!');
