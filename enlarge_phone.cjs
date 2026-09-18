const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const enlargePhoneList = `

/* ===========================================
   ENLARGE PHONE UI LIST FOR READABILITY
=========================================== */

/* Make items larger and more readable */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item {
  padding: 8px 6px !important;
  margin-bottom: 5px !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item small {
  font-size: 11px !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item strong {
  font-size: 12px !important;
  line-height: 1.3 !important;
}

/* Make search box larger */
.modal-overlay.point-and-click dialog.ui-phone .search-box {
  margin-bottom: 8px !important;
}
.modal-overlay.point-and-click dialog.ui-phone .search-box input {
  font-size: 11px !important;
  padding: 5px !important;
}

/* Make tabs larger */
.modal-overlay.point-and-click dialog.ui-phone .phone-tabs button {
  font-size: 11px !important;
  padding: 6px !important;
}

/* Ensure the library content can scroll properly */
.modal-overlay.point-and-click dialog.ui-phone .evidence-list {
  overflow-y: auto !important;
  max-height: calc(100% - 60px) !important;
}
`;

css += enlargePhoneList;
fs.writeFileSync('app/globals.css', css);
console.log('Enlarged phone UI list!');
