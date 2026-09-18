const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const enforceWidths = `
/* MASSIVE WIDTH ENFORCEMENT FOR NOTEBOOK */
.modal-overlay.point-and-click dialog.ui-notebook .inner-content {
  display: flex !important;
  width: 62% !important;
  left: 20% !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-panel {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 8% !important;
  width: 100% !important;
  min-width: 100% !important;
  flex: 1 !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-panel > * {
  min-width: 0 !important; /* Prevent grid blowout */
}

.modal-overlay.point-and-click dialog.ui-notebook .task-content {
  width: 100% !important;
  min-width: 100% !important;
  max-width: none !important;
}

/* Force all inner elements to expand */
.modal-overlay.point-and-click dialog.ui-notebook .task-content > * {
  max-width: none !important;
  width: 100% !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-panel-head {
  width: 100% !important;
  min-width: 100% !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-pagination {
  width: 100% !important;
  min-width: 100% !important;
}
`;

code += enforceWidths;
fs.writeFileSync('app/globals.css', code);
console.log('Enforced grid widths!');
