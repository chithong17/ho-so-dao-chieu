const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css += \
/* FIX DIM MAIL/PAPER BODY TEXT */
.modal-overlay.point-and-click dialog.ui-laptop .mail-body,
.modal-overlay.point-and-click dialog.ui-laptop .mail-body p,
.modal-overlay.point-and-click dialog.ui-laptop .mail-body *,
.modal-overlay.point-and-click dialog.ui-laptop .paper-sheet,
.modal-overlay.point-and-click dialog.ui-laptop .paper-sheet p,
.modal-overlay.point-and-click dialog.ui-laptop .paper-sheet *,
.modal-overlay.point-and-click dialog.ui-laptop .terminal-lines code {
  color: #9cff9c !important;
  opacity: 1 !important;
  text-shadow: 0 0 6px rgba(85, 255, 85, 0.6) !important;
  font-weight: 500 !important;
}
\;

fs.writeFileSync('app/globals.css', css, 'utf8');
console.log('Patched globals.css');
