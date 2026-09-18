const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

// Find the end of the minified block (line 16 is empty, line 17 is '/* 2D Game Styles */')
// Actually, it's safer to just regex replace everything after a certain known marker, 
// or just find all my custom /* ... */ blocks and remove them.

// Let's just find the first occurrence of my custom fixes and truncate the file there,
// since all my fixes were appended to the end.
const marker1 = '/* OVERRIDE EVERYTHING FOR LAPTOP */';
const marker2 = '/* PERFECT CRT LAPTOP SCREEN FIX */';
const marker3 = '/* -------------------------------------------\n   PERFECT CRT LAPTOP SCREEN FIX';

let truncateIndex = code.indexOf(marker3);
if (truncateIndex === -1) truncateIndex = code.indexOf(marker1);
if (truncateIndex === -1) truncateIndex = code.indexOf('/* -------------------------------------------\n   CRT LAPTOP SCROLL');

if (truncateIndex !== -1) {
    code = code.substring(0, truncateIndex);
}

// Now append both the perfect Laptop and perfect Notebook CSS cleanly
const freshCSS = `
/* ===========================================
   1. PERFECT CRT LAPTOP SCREEN FIX
=========================================== */
.modal-overlay.point-and-click dialog.ui-laptop {
  width: 100vw !important;
  height: 56.25vw !important; /* 16:9 */
  max-width: 177.78vh !important;
  max-height: 100vh !important;
  padding: 0 !important;
  margin: auto !important;
  background: url('/ui_laptop.jpg') center center no-repeat !important;
  background-size: 100% 100% !important; 
  border: none !important;
  position: relative !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .inner-content {
  position: absolute !important;
  top: 18% !important;
  left: 31% !important;
  width: 38% !important;
  height: 52% !important;
  box-sizing: border-box !important;
  background: #001100 !important;
  border: 2px solid #22aa22 !important;
  border-radius: 2% !important; 
  box-shadow: inset 0 0 40px rgba(0, 255, 0, 0.4), 0 0 30px rgba(0, 255, 0, 0.5) !important;
  padding: 2% !important;
  overflow: hidden !important;
  display: flex !important;
  gap: 15px !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .inner-content::after {
  content: ' ';
  display: block !important;
  position: absolute !important;
  top: 0 !important; left: 0 !important; bottom: 0 !important; right: 0 !important;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)) !important;
  z-index: 9999 !important;
  background-size: 100% 3px, 3px 100% !important;
  pointer-events: none !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .inner-content * {
  background: transparent !important;
  color: #33ff33 !important; 
  font-family: 'Courier New', Courier, monospace !important;
  border-color: #33ff33 !important;
  box-shadow: none !important;
  text-shadow: 0 0 3px rgba(51, 255, 51, 0.8) !important; 
  font-weight: bold !important;
  font-size: 11px !important;
  line-height: 1.4 !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .inner-content h2,
.modal-overlay.point-and-click dialog.ui-laptop .inner-content strong {
  font-size: 13px !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-reader,
.modal-overlay.point-and-click dialog.ui-laptop .document-app,
.modal-overlay.point-and-click dialog.ui-laptop .paper-sheet,
.modal-overlay.point-and-click dialog.ui-laptop .mail-app,
.modal-overlay.point-and-click dialog.ui-laptop .chat-app,
.modal-overlay.point-and-click dialog.ui-laptop .terminal-app {
  border: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .reader-column {
  max-height: 100% !important;
  height: 100% !important;
  overflow-y: auto !important;
  padding-bottom: 20px !important;
  flex: 2 !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-library {
  max-height: 100% !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  border-right: 2px solid rgba(51, 255, 51, 0.5) !important;
  padding-right: 10px !important;
  flex: 1.4 !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-list {
  flex: 1 !important;
  overflow-y: auto !important;
  max-height: none !important;
  padding-bottom: 20px !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .search-box {
  width: 100% !important;
  box-sizing: border-box !important;
  display: flex !important;
  margin-bottom: 10px !important;
  padding: 4px 8px !important;
  gap: 5px !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .search-box input {
  width: 100% !important;
  min-width: 0 !important;
  box-sizing: border-box !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-item {
  height: auto !important;
  min-height: 100px !important;
  margin-bottom: 10px !important;
  padding: 10px !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-item small span {
  max-width: none !important;
  white-space: normal !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .reader-path {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 10px !important;
  align-items: center !important;
  margin-bottom: 15px !important;
}

.modal-overlay.point-and-click dialog.ui-laptop *::-webkit-scrollbar {
  width: 6px !important;
  height: 6px !important;
}
.modal-overlay.point-and-click dialog.ui-laptop *::-webkit-scrollbar-track {
  background: transparent !important;
}
.modal-overlay.point-and-click dialog.ui-laptop *::-webkit-scrollbar-thumb {
  background: rgba(51, 255, 51, 0.5) !important;
  border-radius: 3px !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-content {
  border: 1px dashed rgba(51, 255, 51, 0.5) !important;
  padding: 10px !important;
  margin: 10px 0 !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .paper-sheet {
  padding: 10px !important;
}

/* ===========================================
   2. PERFECT UI NOTEBOOK GRID FIX
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
  top: 15% !important;
  left: 20% !important;
  width: 61% !important;
  height: 70% !important;
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

.modal-overlay.point-and-click dialog.ui-notebook .task-panel-head {
  grid-area: head !important;
  position: static !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 0 10px 10px 10px !important;
  margin-bottom: 10px !important;
  border-bottom: 2px dashed #1a140f !important;
  visibility: visible !important;
  opacity: 1 !important;
  width: 100% !important;
  font-size: 18px !important;
  font-weight: bold !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-pagination {
  grid-area: pagination !important;
  position: static !important;
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: flex-start !important;
  align-content: flex-start !important;
  gap: 15px !important;
  overflow-y: auto !important;
  padding: 10px !important;
  visibility: visible !important;
  opacity: 1 !important;
  width: 100% !important;
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
  grid-area: content !important;
  position: static !important;
  display: block !important;
  overflow-y: auto !important;
  padding: 0 10px !important;
  width: 100% !important;
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
  border: 1px dashed rgba(26, 20, 15, 0.5) !important;
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

fs.writeFileSync('app/globals.css', code + '\n' + freshCSS);
console.log('Cleaned old blocks and wrote clean CSS!');
