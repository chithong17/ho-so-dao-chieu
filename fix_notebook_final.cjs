const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

// First, remove the old SOLID FIX block so we don't have duplicates
code = code.replace(/\/\* SOLID FIX FOR NOTEBOOK LEFT PAGE \*\/[\s\S]*?opacity: 1 !important;\n\}/g, '');

const finalFix = `
/* ===========================================
   FINAL NOTEBOOK GRID LAYOUT & INK STYLES
=========================================== */
.modal-overlay.point-and-click dialog.ui-notebook .inner-content {
  display: block !important;
  position: absolute !important;
  top: 13% !important;
  left: 15% !important;
  width: 70% !important;
  height: 75% !important;
  padding: 0 !important;
  background: transparent !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-panel {
  display: grid !important;
  grid-template-columns: 46% 46% !important;
  grid-template-rows: auto 1fr !important;
  grid-template-areas: 
    "head content"
    "pagination content" !important;
  justify-content: space-between !important;
  width: 100% !important;
  height: 100% !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* Position Grid Areas */
.modal-overlay.point-and-click dialog.ui-notebook .task-panel-head {
  grid-area: head !important;
  position: static !important;
  display: flex !important;
  align-items: center !important;
  padding: 10px 20px !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-pagination {
  grid-area: pagination !important;
  position: static !important;
  display: flex !important;
  align-content: flex-start !important;
  overflow-y: auto !important;
  padding: 10px 20px !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-content {
  grid-area: content !important;
  position: static !important;
  display: block !important;
  overflow-y: auto !important;
  padding: 10px 20px !important;
}

/* REALISTIC INK & PAPER AESTHETIC */
.modal-overlay.point-and-click dialog.ui-notebook * {
  color: #1a140f !important; /* Extremely dark brown ink */
  font-family: 'Patrick Hand', cursive, 'Comic Sans MS', sans-serif !important;
  text-shadow: none !important;
}

.modal-overlay.point-and-click dialog.ui-notebook h2, 
.modal-overlay.point-and-click dialog.ui-notebook strong {
  font-weight: 800 !important;
  letter-spacing: 0.5px !important;
}

/* Buttons and Inputs: Make them look like drawn boxes or paper clippings */
.modal-overlay.point-and-click dialog.ui-notebook .choice,
.modal-overlay.point-and-click dialog.ui-notebook .chip,
.modal-overlay.point-and-click dialog.ui-notebook input,
.modal-overlay.point-and-click dialog.ui-notebook select,
.modal-overlay.point-and-click dialog.ui-notebook button,
.modal-overlay.point-and-click dialog.ui-notebook textarea,
.modal-overlay.point-and-click dialog.ui-notebook .classify-item {
  background: rgba(240, 230, 205, 0.7) !important; /* Slightly darker parchment color */
  border: 2px solid #2b2620 !important; /* Thick ink border */
  border-radius: 3px !important; /* Slightly rough edges */
  box-shadow: 2px 2px 0 rgba(0,0,0,0.1) !important; /* Subtle drop shadow for depth */
  white-space: normal !important;
  height: auto !important;
  text-align: left !important;
  padding: 8px 12px !important;
  margin-bottom: 5px !important;
}

/* Hover effect */
.modal-overlay.point-and-click dialog.ui-notebook button:hover {
  background: rgba(220, 200, 160, 0.9) !important;
}

/* Active/Selected Buttons: Fill with dark ink */
.modal-overlay.point-and-click dialog.ui-notebook button.active,
.modal-overlay.point-and-click dialog.ui-notebook .task-pagination .active {
  background: #2b2620 !important;
  color: #fdf6e3 !important; /* Light text on dark ink */
  border: 2px solid #1a140f !important;
}

.modal-overlay.point-and-click dialog.ui-notebook button.primary {
  background: #2b2620 !important;
  color: #fdf6e3 !important;
  border-radius: 8px !important; /* Marker-like rounded borders */
  padding: 12px !important;
  font-size: 16px !important;
}
`;

code += finalFix;
fs.writeFileSync('app/globals.css', code);
console.log('Applied final Grid and Ink styles!');
