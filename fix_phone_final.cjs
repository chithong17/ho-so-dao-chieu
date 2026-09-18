const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const fixPhoneFinal = `

/* ===========================================
   5. PERFECT COMPACT PHONE UI
=========================================== */

/* Absolute perfect bounds */
.modal-overlay.point-and-click dialog.ui-phone .inner-content {
  top: 15% !important;
  left: 32% !important;
  right: 38% !important;
  bottom: 15% !important;
  width: auto !important;
  height: auto !important;
  padding: 5px !important;
}

/* Compact Search & Tabs */
.modal-overlay.point-and-click dialog.ui-phone .phone-tabs {
  margin-bottom: 3px !important;
}
.modal-overlay.point-and-click dialog.ui-phone .phone-tabs button {
  padding: 2px !important;
  font-size: 8px !important;
}
.modal-overlay.point-and-click dialog.ui-phone .search-box {
  margin-bottom: 3px !important;
  padding: 2px 4px !important;
}
.modal-overlay.point-and-click dialog.ui-phone .search-box input {
  font-size: 8px !important;
}

/* Compact Evidence List */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item {
  padding: 3px 5px !important;
  min-height: 0 !important;
  height: auto !important;
  margin-bottom: 2px !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 5px !important;
}

/* Hide the long summary text to reduce clutter */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item em {
  display: none !important;
}

/* Flatten the Author/Title into a single line */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item > div {
  display: flex !important;
  flex-direction: row !important;
  align-items: baseline !important;
  gap: 4px !important;
  overflow: hidden !important;
  white-space: nowrap !important;
  flex: 1 !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item small {
  margin-bottom: 0 !important;
  font-size: 7px !important;
  white-space: nowrap !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item small span {
  display: none !important; /* Hide author name to save more space, just show ID! */
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item strong {
  font-size: 8.5px !important;
  line-height: 1 !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

/* Position soft-keys text exactly over the buttons */
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-files::after,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read::after {
  content: "TÙY CHỌN            OK            QUAY LẠI" !important;
  position: absolute !important;
  bottom: -15px !important;
  left: 0 !important;
  width: 100% !important;
  text-align: center !important;
  font-size: 8px !important;
  white-space: pre !important;
  letter-spacing: 1px !important;
  color: rgba(51, 255, 51, 0.6) !important;
}

/* Hide header in Read view to save space */
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .reader-path {
  display: none !important;
}

`;

css += fixPhoneFinal;
fs.writeFileSync('app/globals.css', css);
console.log('Applied final phone UI layout!');
