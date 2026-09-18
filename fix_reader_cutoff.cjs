const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css += `

/* ===========================================
   FIX READER CUTOFF BUG
=========================================== */

/* Override the old absolute positioning and hidden overflow */
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .reader-column {
  position: static !important;
  top: auto !important;
  bottom: auto !important;
  left: auto !important;
  right: auto !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  flex: 1 !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
}

.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .evidence-reader {
  overflow: visible !important; 
  flex: 1 !important;
  height: auto !important;
}

/* Ensure mail body etc don't have hidden overflow */
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .mail-app,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .chat-app,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .document-app,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .terminal-app {
  overflow: visible !important;
}
`;

fs.writeFileSync('app/globals.css', css);
console.log('Fixed reader cutoff bug!');
