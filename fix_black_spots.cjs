const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const fixBlackSpots = `

/* ===========================================
   FIX BLACK/DARK SPOTS IN FILES UI
=========================================== */

/* Fix search box background */
.modal-overlay.point-and-click dialog.ui-files .search-box {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.modal-overlay.point-and-click dialog.ui-files .search-box input {
  background: #fdfaf5 !important;
  border: 1px solid #b5a687 !important;
  color: #333 !important;
  border-radius: 4px !important;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05) !important;
  padding: 8px 12px !important;
}

/* Fix terminal app header */
.modal-overlay.point-and-click dialog.ui-files .terminal-app {
  background: #fcfcfc !important; /* light grey/white paper */
  border: 1px solid #ccc !important;
}

.modal-overlay.point-and-click dialog.ui-files .terminal-app > div:first-child { /* Assuming terminal header is first child */
  background: #e6dfd3 !important; /* Match mail toolbar / chat header */
  color: #333 !important;
  border-bottom: 1px solid #ccc !important;
}

.modal-overlay.point-and-click dialog.ui-files .terminal-app > div:first-child * {
  color: #333 !important;
}

/* Fix evidence caption (the big dark box at the bottom) */
.modal-overlay.point-and-click dialog.ui-files .evidence-caption {
  background: #f0ebe1 !important; /* light manila/grey */
  border: 1px dashed #b5a687 !important;
  color: #444 !important;
  border-radius: 4px !important;
  margin-top: 20px !important;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.02) !important;
}

.modal-overlay.point-and-click dialog.ui-files .evidence-caption * {
  color: #444 !important;
  text-shadow: none !important;
}

/* Fix lock / fictional data footer (reader-footer) */
.modal-overlay.point-and-click dialog.ui-files .reader-footer {
  background: transparent !important;
  color: #666 !important;
  border-top: 1px solid #d4c3a3 !important; /* faint border */
}

.modal-overlay.point-and-click dialog.ui-files .reader-footer * {
  color: #666 !important;
}

/* Ensure the pin button looks like a paper clip or stamp */
.modal-overlay.point-and-click dialog.ui-files .reader-path button {
  background: #fff !important;
  color: #5a4b36 !important;
  border: 1px solid #c9bca0 !important;
  box-shadow: 1px 2px 4px rgba(0,0,0,0.05) !important;
}

.modal-overlay.point-and-click dialog.ui-files .reader-path button:hover {
  background: #fdfaf5 !important;
}

/* Fix text in terminal body to be readable */
.modal-overlay.point-and-click dialog.ui-files .terminal-lines {
  background: transparent !important;
}
.modal-overlay.point-and-click dialog.ui-files .terminal-lines * {
  color: #222 !important;
  font-family: 'Courier New', Courier, monospace !important;
}

`;

css += fixBlackSpots;
fs.writeFileSync('app/globals.css', css);
console.log('Fixed black spots!');
