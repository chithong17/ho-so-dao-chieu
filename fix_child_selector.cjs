const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css += `

/* Fix the generic child selector */
.modal-overlay.point-and-click dialog.ui-phone .evidence-reader > .reader-path,
.modal-overlay.point-and-click dialog.ui-phone .evidence-reader > .evidence-caption,
.modal-overlay.point-and-click dialog.ui-phone .evidence-reader > .reader-footer {
  display: none !important; 
}

.modal-overlay.point-and-click dialog.ui-phone .chat-app,
.modal-overlay.point-and-click dialog.ui-phone .mail-app,
.modal-overlay.point-and-click dialog.ui-phone .document-app,
.modal-overlay.point-and-click dialog.ui-phone .terminal-app {
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
}
`;

fs.writeFileSync('app/globals.css', css);
console.log('Fixed child selector issue!');
