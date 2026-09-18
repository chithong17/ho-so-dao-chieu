const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

// Find where my previous notebook CSS started and cut it out
const marker = '/* ===========================================\n   2. PERFECT UI NOTEBOOK GRID FIX';
const index = code.indexOf(marker);
if (index !== -1) {
    code = code.substring(0, index);
}

const notepadCSS = `
/* ===========================================
   3. SINGLE-PAGE NOTEPAD AESTHETIC FIX
=========================================== */
.modal-overlay.point-and-click dialog.ui-notebook {
  width: 100vw !important;
  height: 56.25vw !important; /* 16:9 */
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
  display: block !important;
  position: absolute !important;
  /* Paper bounds based on the new top-bound spiral image */
  top: 18% !important;
  left: 20% !important;
  width: 60% !important;
  height: 72% !important;
  padding: 0 !important;
  background: transparent !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-panel {
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  height: 100% !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-panel-head {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 0 10px 10px 10px !important;
  margin-bottom: 10px !important;
  border-bottom: 2px solid rgba(26, 20, 15, 0.2) !important;
  width: 100% !important;
  font-size: 18px !important;
  font-weight: bold !important;
  flex-shrink: 0 !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-pagination {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 15px !important;
  padding: 0 10px 15px 10px !important;
  width: 100% !important;
  flex-shrink: 0 !important;
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

.modal-overlay.point-and-click dialog.ui-notebook .task-content {
  display: block !important;
  overflow-y: auto !important;
  padding: 0 10px !important;
  width: 100% !important;
  flex: 1 !important;
}

/* REALISTIC INK & PAPER AESTHETIC */
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

.modal-overlay.point-and-click dialog.ui-notebook .choice,
.modal-overlay.point-and-click dialog.ui-notebook .chip,
.modal-overlay.point-and-click dialog.ui-notebook input,
.modal-overlay.point-and-click dialog.ui-notebook select,
.modal-overlay.point-and-click dialog.ui-notebook textarea,
.modal-overlay.point-and-click dialog.ui-notebook .classify-item,
.modal-overlay.point-and-click dialog.ui-notebook .task-content button {
  background: transparent !important;
  border: 1px dashed rgba(26, 20, 15, 0.4) !important;
  box-shadow: none !important;
  white-space: normal !important;
  height: auto !important;
  text-align: left !important;
  padding: 6px 10px !important;
  margin-bottom: 5px !important;
  border-radius: 0 !important;
  width: 100% !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-content button:hover {
  background: rgba(0,0,0,0.02) !important;
  border: 1px solid #1a140f !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-content button.active {
  background: rgba(0,0,0,0.04) !important;
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
  width: auto !important;
  display: inline-block !important;
}

.modal-overlay.point-and-click dialog.ui-notebook button.primary:hover {
  background: #1a140f !important;
  color: #fdf6e3 !important;
}

.modal-overlay.point-and-click dialog.ui-notebook *::-webkit-scrollbar {
  width: 4px !important;
}
.modal-overlay.point-and-click dialog.ui-notebook *::-webkit-scrollbar-track {
  background: transparent !important;
}
.modal-overlay.point-and-click dialog.ui-notebook *::-webkit-scrollbar-thumb {
  background: rgba(26, 20, 15, 0.3) !important;
  border-radius: 2px !important;
}
`;

fs.writeFileSync('app/globals.css', code + '\n' + notepadCSS);
console.log('Applied single-page notepad CSS!');
