const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const absoluteFix = `

/* ===========================================
   FINAL OVERRIDE FOR PHONE UI
=========================================== */

/* We know exactly what the bounds are now! */
.modal-overlay.point-and-click dialog.ui-phone .inner-content {
  top: 18.5% !important;
  left: 38.5% !important;
  right: 37% !important;
  bottom: 27% !important;
  width: auto !important;
  height: auto !important;
  padding: 5px !important;
  background: rgba(10, 25, 10, 0.9) !important;
  border-radius: 4px !important;
  box-shadow: inset 0 0 10px #000 !important;
}

/* Fix DOM structure for text so it doesn't overlap vertically */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item {
  padding: 4px 6px !important;
  min-height: 0 !important;
  height: auto !important;
  margin-bottom: 3px !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item > span:nth-child(2) {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 6px !important;
  width: 100% !important;
  overflow: hidden !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item small {
  margin-bottom: 0 !important;
  font-size: 8px !important;
  white-space: nowrap !important;
  flex-shrink: 0 !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item small span {
  display: none !important; /* Hide author */
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item strong {
  font-size: 9px !important;
  line-height: 1.2 !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  flex-grow: 1 !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item em {
  display: none !important; /* Hide summary */
}

.modal-overlay.point-and-click dialog.ui-phone .search-box {
  margin-bottom: 4px !important;
}
.modal-overlay.point-and-click dialog.ui-phone .search-box input {
  font-size: 9px !important;
  padding: 3px !important;
}

.modal-overlay.point-and-click dialog.ui-phone .phone-tabs button {
  font-size: 8.5px !important;
  padding: 3px !important;
}

/* Align soft keys to exactly where the green box ends */
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-files::after,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read::after {
  content: "TÙY CHỌN           OK           QUAY LẠI" !important;
  position: absolute !important;
  bottom: -20px !important;
  left: 0 !important;
  width: 100% !important;
  text-align: center !important;
  font-size: 9px !important;
  color: rgba(51, 255, 51, 0.7) !important;
  letter-spacing: 0 !important;
}

`;

css += absoluteFix;
fs.writeFileSync('app/globals.css', css);
console.log('Applied absolute final phone fix!');
