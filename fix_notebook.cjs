const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const notebookFixes = `

/* -------------------------------------------
   PERFECT UI NOTEBOOK FIX
------------------------------------------- */
.modal-overlay.point-and-click dialog.ui-notebook {
  width: 100vw !important;
  height: 56.25vw !important; /* 16:9 aspect ratio */
  max-width: 177.78vh !important;
  max-height: 100vh !important;
  padding: 0 !important;
  margin: auto !important;
  background: url('/ui_notebook.jpg') center center no-repeat !important;
  background-size: 100% 100% !important; 
  border: none !important;
  position: relative !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .inner-content {
  position: absolute !important;
  top: 13% !important;
  left: 15% !important;
  width: 71% !important;
  height: 75% !important;
  background: transparent !important;
  padding: 0 !important;
  border: none !important;
  box-shadow: none !important;
  overflow: visible !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-panel {
  display: block !important;
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* Left Page */
.modal-overlay.point-and-click dialog.ui-notebook .task-panel-head,
.modal-overlay.point-and-click dialog.ui-notebook .task-pagination {
  position: absolute !important;
  left: 0 !important;
  width: 44% !important; 
  box-sizing: border-box !important;
  background: transparent !important;
  border: none !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-panel-head {
  top: 0 !important;
  height: auto !important;
  padding: 0 10px !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-pagination {
  top: 40px !important;
  height: calc(100% - 40px) !important;
  align-content: flex-start !important;
  overflow-y: auto !important;
  padding: 0 10px !important;
}

/* Right Page */
.modal-overlay.point-and-click dialog.ui-notebook .task-content {
  position: absolute !important;
  right: 0 !important;
  top: 0 !important;
  width: 46% !important; 
  height: 100% !important;
  box-sizing: border-box !important;
  overflow-y: auto !important;
  padding: 0 20px 20px 10px !important;
  background: transparent !important;
  border: none !important;
}

/* Notebook styling overrides */
.modal-overlay.point-and-click dialog.ui-notebook * {
  color: #2b2620 !important; /* Dark brown ink */
  font-family: 'Patrick Hand', cursive, 'Comic Sans MS', sans-serif !important;
  text-shadow: none !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .choice,
.modal-overlay.point-and-click dialog.ui-notebook .chip,
.modal-overlay.point-and-click dialog.ui-notebook input,
.modal-overlay.point-and-click dialog.ui-notebook select,
.modal-overlay.point-and-click dialog.ui-notebook button,
.modal-overlay.point-and-click dialog.ui-notebook textarea,
.modal-overlay.point-and-click dialog.ui-notebook .classify-item {
  background: rgba(0,0,0,0.03) !important;
  border: 1px solid rgba(43, 38, 32, 0.3) !important;
  box-shadow: none !important;
  white-space: normal !important;
  height: auto !important;
  text-align: left !important;
}

.modal-overlay.point-and-click dialog.ui-notebook button.active {
  background: rgba(43, 38, 32, 0.15) !important;
  border: 2px solid rgba(43, 38, 32, 0.6) !important;
  font-weight: bold !important;
}

.modal-overlay.point-and-click dialog.ui-notebook button.primary {
  background: rgba(43, 38, 32, 0.8) !important;
  color: #fdf6e3 !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .evaluation {
  background: transparent !important;
  border: 1px dashed rgba(43, 38, 32, 0.3) !important;
}

/* Hide scrollbars or make them look natural */
.modal-overlay.point-and-click dialog.ui-notebook *::-webkit-scrollbar {
  width: 4px !important;
}
.modal-overlay.point-and-click dialog.ui-notebook *::-webkit-scrollbar-track {
  background: transparent !important;
}
.modal-overlay.point-and-click dialog.ui-notebook *::-webkit-scrollbar-thumb {
  background: rgba(43, 38, 32, 0.2) !important;
  border-radius: 2px !important;
}
`;

code += notebookFixes;
fs.writeFileSync('app/globals.css', code);
console.log('Applied PERFECT NOTEBOOK styling!');
