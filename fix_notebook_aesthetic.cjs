const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const replacement = `/* REALISTIC INK & PAPER AESTHETIC */
.modal-overlay.point-and-click dialog.ui-notebook * {
  color: #1a140f !important;
  font-family: 'Patrick Hand', cursive, 'Comic Sans MS', sans-serif !important;
  text-shadow: none !important;
}

.modal-overlay.point-and-click dialog.ui-notebook h2, 
.modal-overlay.point-and-click dialog.ui-notebook strong {
  font-weight: 800 !important;
  letter-spacing: 0.5px !important;
}

/* Fix Left Column Header */
.modal-overlay.point-and-click dialog.ui-notebook .task-panel-head {
  justify-content: space-between !important;
  font-size: 18px !important;
  font-weight: bold !important;
  border-bottom: 2px dashed #1a140f !important;
  margin: 10px 20px !important;
  padding-bottom: 10px !important;
}

/* Fix Stretched Pagination Buttons */
.modal-overlay.point-and-click dialog.ui-notebook .task-pagination {
  flex-wrap: wrap !important;
  align-items: flex-start !important;
  align-content: flex-start !important;
  gap: 15px !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-pagination button {
  width: 40px !important;
  height: 40px !important;
  border-radius: 50% !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 0 !important;
  font-size: 16px !important;
  background: transparent !important;
  border: 1px solid #1a140f !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-pagination button.active {
  background: #1a140f !important;
  color: #fdf6e3 !important;
  border-width: 2px !important;
}

/* Make content elements look like writing on paper, not UI blocks */
.modal-overlay.point-and-click dialog.ui-notebook .choice,
.modal-overlay.point-and-click dialog.ui-notebook .chip,
.modal-overlay.point-and-click dialog.ui-notebook input,
.modal-overlay.point-and-click dialog.ui-notebook select,
.modal-overlay.point-and-click dialog.ui-notebook textarea,
.modal-overlay.point-and-click dialog.ui-notebook .classify-item,
.modal-overlay.point-and-click dialog.ui-notebook .task-content button {
  background: transparent !important;
  border: 1px dashed rgba(26, 20, 15, 0.5) !important;
  box-shadow: none !important;
  white-space: normal !important;
  height: auto !important;
  text-align: left !important;
  padding: 6px 10px !important;
  margin-bottom: 5px !important;
  border-radius: 0 !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-content button:hover {
  background: rgba(0,0,0,0.03) !important;
  border: 1px solid #1a140f !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-content button.active {
  background: rgba(0,0,0,0.05) !important;
  border: 2px solid #1a140f !important;
  font-weight: bold !important;
}

.modal-overlay.point-and-click dialog.ui-notebook button.primary {
  background: transparent !important;
  color: #1a140f !important;
  border: 2px solid #1a140f !important;
  border-radius: 8px !important;
  padding: 10px !important;
  font-size: 18px !important;
  font-weight: bold !important;
  text-transform: uppercase !important;
}

.modal-overlay.point-and-click dialog.ui-notebook button.primary:hover {
  background: #1a140f !important;
  color: #fdf6e3 !important;
}
`;

code = code.replace(/\/\* REALISTIC INK & PAPER AESTHETIC \*\/[\s\S]*/, replacement);
fs.writeFileSync('app/globals.css', code);
console.log('Fixed pagination stretching and updated aesthetic to natural ink!');
