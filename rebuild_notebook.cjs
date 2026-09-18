const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const notebookCSS = `

/* ===========================================
   NOTEBOOK 2-PAGE LAYOUT (CLEAN, NO CONFLICTS)
=========================================== */

/* 1. Make dialog fill 16:9 with notebook background */
.modal-overlay.point-and-click dialog.ui-notebook {
  width: 100vw !important;
  height: 56.25vw !important;
  max-width: 177.78vh !important;
  max-height: 100vh !important;
  padding: 0 !important;
  margin: auto !important;
  background: url('/ui_notebook.jpg?v=notebook2') center center no-repeat !important;
  background-size: 100% 100% !important;
  border: none !important;
  position: relative !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

/* 2. Position inner-content precisely over the two paper pages */
.modal-overlay.point-and-click dialog.ui-notebook .inner-content {
  position: absolute !important;
  top: 19% !important;
  left: 20% !important;
  width: 60% !important;
  height: 66% !important;
  padding: 0 !important;
  background: transparent !important;
  overflow: hidden !important;
  display: block !important;
}

/* 3. .task-panel fills the inner-content as a 2-column grid */
.modal-overlay.point-and-click dialog.ui-notebook .task-panel {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 7% !important;
  width: 100% !important;
  height: 100% !important;
  background: transparent !important;
  border: none !important;
  max-height: none !important;
  overflow: hidden !important;
  max-width: none !important;
}

/* 4. Left column (task-panel-left) */
.modal-overlay.point-and-click dialog.ui-notebook .task-panel-left {
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
  min-width: 0 !important;
}

/* 5. Right column (task-content) */
.modal-overlay.point-and-click dialog.ui-notebook .task-content {
  overflow-y: auto !important;
  min-width: 0 !important;
  max-width: none !important;
  padding: 0 10px 20px 5px !important;
}
.modal-overlay.point-and-click dialog.ui-notebook .task-content::-webkit-scrollbar {
  width: 4px !important;
}
.modal-overlay.point-and-click dialog.ui-notebook .task-content::-webkit-scrollbar-thumb {
  background: rgba(26, 20, 15, 0.3) !important;
  border-radius: 2px !important;
}

/* 6. Fonts and ink style */
.modal-overlay.point-and-click dialog.ui-notebook * {
  color: #1a140f !important;
  font-family: 'Patrick Hand', cursive !important;
  text-shadow: none !important;
}

.modal-overlay.point-and-click dialog.ui-notebook h2 {
  font-size: 22px !important;
  line-height: 1.2 !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-prompt {
  font-size: 14px !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-panel-head {
  font-size: 20px !important;
  background: transparent !important;
  border-bottom: 1px dashed rgba(26, 20, 15, 0.3) !important;
  padding: 0 0 8px 0 !important;
  margin-bottom: 8px !important;
  max-width: none !important;
}

.modal-overlay.point-and-click dialog.ui-notebook .task-pagination {
  padding: 0 !important;
  margin-bottom: 10px !important;
  max-width: none !important;
}

/* 7. Transparent choices/chips */
.modal-overlay.point-and-click dialog.ui-notebook .choice {
  background: transparent !important;
  border: 1px dashed rgba(26, 20, 15, 0.4) !important;
}
.modal-overlay.point-and-click dialog.ui-notebook .choice.selected {
  background: rgba(26, 20, 15, 0.08) !important;
  border-color: rgba(26, 20, 15, 0.7) !important;
}
.modal-overlay.point-and-click dialog.ui-notebook .chip {
  background: transparent !important;
  border: 1px dashed rgba(26, 20, 15, 0.4) !important;
}
.modal-overlay.point-and-click dialog.ui-notebook .chip.selected {
  background: rgba(26, 20, 15, 0.08) !important;
}

/* 8. Evaluation box transparent */
.modal-overlay.point-and-click dialog.ui-notebook .evaluation {
  background: transparent !important;
  border: 1px dashed rgba(26, 20, 15, 0.4) !important;
}
.modal-overlay.point-and-click dialog.ui-notebook .evaluation-title {
  color: #1a140f !important;
}

/* 9. Force no max-width on inner elements */
.modal-overlay.point-and-click dialog.ui-notebook .task-panel-head,
.modal-overlay.point-and-click dialog.ui-notebook .task-pagination,
.modal-overlay.point-and-click dialog.ui-notebook .task-content,
.modal-overlay.point-and-click dialog.ui-notebook .task-content > * {
  max-width: none !important;
}

/* 10. Submit button */
.modal-overlay.point-and-click dialog.ui-notebook .submit-button {
  background: rgba(26, 20, 15, 0.12) !important;
  border: 1px solid rgba(26, 20, 15, 0.5) !important;
  color: #1a140f !important;
}
`;

css += notebookCSS;
fs.writeFileSync('app/globals.css', css);
console.log('Added clean notebook 2-page CSS!');
