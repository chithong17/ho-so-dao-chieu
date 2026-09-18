const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

// Remove the buggy debug blocks if they somehow got in
code = code.replace(/\/\* DEBUG FIX \*\/[\s\S]*?background: blue !important;\n\}/g, '');

const solidFix = `
/* SOLID FIX FOR NOTEBOOK LEFT PAGE */
.modal-overlay.point-and-click dialog.ui-notebook .inner-content {
  display: block !important; 
}

.modal-overlay.point-and-click dialog.ui-notebook .task-panel {
  display: block !important;
  position: absolute !important;
  top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
  width: 100% !important; height: 100% !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-panel-head {
  display: flex !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 44% !important; 
  height: 60px !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-pagination {
  display: flex !important;
  position: absolute !important;
  top: 60px !important;
  left: 0 !important;
  width: 44% !important; 
  height: calc(100% - 60px) !important;
  visibility: visible !important;
  opacity: 1 !important;
}
`;

code += solidFix;
fs.writeFileSync('app/globals.css', code);
console.log('Cleaned debug and applied solid fix');
