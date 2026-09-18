const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const fixMoreTerminalBlackSpots = `

/* ===========================================
   FIX TERMINAL BLACK SPOTS IN FILES UI
=========================================== */

/* Terminal tabs (Header) */
.modal-overlay.point-and-click dialog.ui-files .terminal-tabs {
  background: #e6dfd3 !important; /* Manila folder header color */
  color: #333 !important;
  border-bottom: 1px solid #ccc !important;
}
.modal-overlay.point-and-click dialog.ui-files .terminal-tabs * {
  color: #333 !important;
}

/* Terminal meta (Subheader) */
.modal-overlay.point-and-click dialog.ui-files .terminal-meta {
  background: #fdfaf5 !important;
  color: #444 !important;
  border-bottom: 1px dashed #ddd !important;
}
.modal-overlay.point-and-click dialog.ui-files .terminal-meta * {
  color: #444 !important;
}

/* Terminal lines (Body) */
.modal-overlay.point-and-click dialog.ui-files .terminal-lines {
  background: transparent !important;
}

/* Terminal summary (Info box) */
.modal-overlay.point-and-click dialog.ui-files .terminal-summary {
  background: #f0ebe1 !important;
  border: 1px dashed #b5a687 !important;
  color: #444 !important;
  margin: 10px !important;
  border-radius: 4px !important;
  box-shadow: none !important;
}
.modal-overlay.point-and-click dialog.ui-files .terminal-summary * {
  color: #444 !important;
}

/* Terminal prompt (Bottom) */
.modal-overlay.point-and-click dialog.ui-files .terminal-prompt {
  background: transparent !important;
  color: #555 !important;
  border-top: 1px solid #eee !important;
}
.modal-overlay.point-and-click dialog.ui-files .terminal-prompt * {
  color: #555 !important;
}
.modal-overlay.point-and-click dialog.ui-files .cursor-block {
  background: #888 !important;
}

/* Document app toolbar */
.modal-overlay.point-and-click dialog.ui-files .document-toolbar {
  background: #e6dfd3 !important;
  color: #333 !important;
  border-bottom: 1px solid #ccc !important;
}
.modal-overlay.point-and-click dialog.ui-files .document-toolbar * {
  color: #333 !important;
}

`;

css += fixMoreTerminalBlackSpots;
fs.writeFileSync('app/globals.css', css);
console.log('Fixed more black spots!');
