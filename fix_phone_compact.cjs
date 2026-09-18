const fs = require('fs');

// We will write a small HTML page that helps us visualize the bounds if needed,
// but actually we can just output the fix CSS directly.

let css = fs.readFileSync('app/globals.css', 'utf8');

const fixPhoneAgain = `

/* ===========================================
   FIX PHONE UI - COMPACT & PERFECT BOUNDS
=========================================== */

/* Perfect Bounds for phone screen */
.modal-overlay.point-and-click dialog.ui-phone .inner-content {
  /* Left edge is good at 38.5%. 
     Right edge had a huge gap at 36.5%, let's try 30%.
     Top was a bit too high at 16.5%, let's try 17.5%.
     Bottom was way too high at 25.5%, let's try 32%.
  */
  top: 17.5% !important;
  left: 38.5% !important;
  right: 32% !important;
  bottom: 31% !important;
  padding: 5px !important; /* Less padding to save space */
}

/* Make items much more compact */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item {
  padding: 4px !important;
  min-height: 0 !important;
  gap: 5px !important;
  margin-bottom: 3px !important;
}

/* Hide the summary entirely on the phone list to save maximum space! 
   The user said "quá nhiều chữ" (too much text).
   Since the screen is tiny, they don't need the summary in the list view.
*/
.modal-overlay.point-and-click dialog.ui-phone .evidence-item em {
  display: none !important;
}

/* Make the title smaller and perfectly single line */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item strong {
  font-size: 8.5px !important;
  line-height: 1.1 !important;
}

/* Smaller author/id */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item small {
  font-size: 7.5px !important;
  margin-bottom: 1px !important;
}

/* Smaller search box */
.modal-overlay.point-and-click dialog.ui-phone .search-box {
  margin-bottom: 5px !important;
  padding: 2px 4px !important;
}
.modal-overlay.point-and-click dialog.ui-phone .search-box input {
  font-size: 9px !important;
}

/* Smaller tabs */
.modal-overlay.point-and-click dialog.ui-phone .phone-tabs {
  margin-bottom: 5px !important;
}
.modal-overlay.point-and-click dialog.ui-phone .phone-tabs button {
  padding: 2px !important;
  font-size: 8px !important;
}

/* Ensure the absolute bottom buttons "TÙY CHỌN OK QUAY LẠI" are perfectly placed */
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-files::after,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read::after {
  bottom: -20px !important;
  font-size: 8px !important;
  left: 0 !important;
  width: 100% !important;
  text-align: center !important;
  letter-spacing: 2px !important;
}
`;

css += fixPhoneAgain;
fs.writeFileSync('app/globals.css', css);
console.log('Fixed phone UI to be super compact and better bounds!');
