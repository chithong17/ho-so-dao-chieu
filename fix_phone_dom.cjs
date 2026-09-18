const fs = require('fs');

// We have public/ui_phone.jpg
// We don't have jimp, but we can write a tiny HTML file to load it and we can just guess.
// Wait, I can just use base64 and print it.
// Actually, I'll just write a script that generates a very specific CSS fix for the phone text
// and uses top: 16%, left: 35%, width: 30%, height: 60%. Wait.

let css = fs.readFileSync('app/globals.css', 'utf8');

const fixPhoneDOM = `

/* ===========================================
   6. PHONE UI DOM FIX
=========================================== */

/* We will use explicit width and height to avoid right/bottom percentage confusion */
.modal-overlay.point-and-click dialog.ui-phone .inner-content {
  top: 15% !important;
  left: 33.5% !important;
  width: 33% !important;
  height: 58% !important;
  padding: 5px !important;
  background: rgba(10,25,10,0.85) !important;
  box-shadow: inset 0 0 10px rgba(0,0,0,1) !important;
}

/* Compact Evidence List */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item {
  padding: 4px !important;
  min-height: 0 !important;
  height: auto !important;
  margin-bottom: 2px !important;
}

/* Hide the long summary text to reduce clutter */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item em {
  display: none !important;
}

/* Flatten the Author/Title into a single line */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item > span:nth-child(2) {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 5px !important;
  overflow: hidden !important;
  white-space: nowrap !important;
  width: 100% !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item small {
  margin-bottom: 0 !important;
  font-size: 8px !important;
  white-space: nowrap !important;
  flex-shrink: 0 !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item small span {
  display: none !important; /* Hide author name */
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item strong {
  font-size: 9px !important;
  line-height: 1 !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  flex-grow: 1 !important;
}

.modal-overlay.point-and-click dialog.ui-phone .search-box input {
  font-size: 9px !important;
}

/* Soft keys */
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-files::after,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read::after {
  content: "TÙY CHỌN         OK         QUAY LẠI" !important;
  position: absolute !important;
  bottom: -22px !important;
  left: 0 !important;
  width: 100% !important;
  text-align: center !important;
  font-size: 9px !important;
  color: rgba(51, 255, 51, 0.6) !important;
}
`;

css += fixPhoneDOM;
fs.writeFileSync('app/globals.css', css);
console.log('Fixed phone DOM structure!');
