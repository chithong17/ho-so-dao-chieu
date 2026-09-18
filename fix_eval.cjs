const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const fixEval = `
/* Fix Evaluation Box and Layout Adjustments */
.modal-overlay.point-and-click dialog.ui-notebook .evaluation {
  background: transparent !important;
  border: 2px dashed rgba(26, 20, 15, 0.4) !important;
  color: #1a140f !important;
  border-radius: 4px !important;
  padding: 15px !important;
  margin-top: 20px !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .evaluation summary {
  color: #1a140f !important;
  font-weight: bold !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .evaluation svg {
  color: #1a140f !important;
}

/* Adjust the inner content bounds slightly more to fix 'Sổ điều tra' touching the left edge */
.modal-overlay.point-and-click dialog.ui-notebook .inner-content {
  left: 21% !important;
  width: 59% !important;
  padding: 0 10px !important;
}

/* Make Task Content padding smaller to avoid overlapping rings */
.modal-overlay.point-and-click dialog.ui-notebook .task-content {
  padding: 10px 10px 20px 20px !important;
}
`;

code += fixEval;
fs.writeFileSync('app/globals.css', code);
console.log('Fixed evaluation box and layout padding!');
