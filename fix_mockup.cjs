const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const mockupFix = `

/* ===========================================
   MOCKUP UI FIX FOR NEW BACKGROUND
=========================================== */

/* Absolute perfect bounds for the NEW background */
.modal-overlay.point-and-click dialog.ui-phone .inner-content {
  top: 13.5% !important;
  left: 36.5% !important;
  right: 35% !important;
  bottom: 21% !important;
  width: auto !important;
  height: auto !important;
  padding: 0 !important;
  background: #0d1a10 !important; /* solid background to cover baked-in UI */
  border-radius: 4px !important;
  box-shadow: inset 0 0 10px #000 !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: visible !important;
}

/* Status Bar using ::before */
.modal-overlay.point-and-click dialog.ui-phone .inner-content::before {
  content: ".ıIl             Chứng cứ             🔋 22:14" !important;
  display: block !important;
  text-align: center !important;
  font-size: 9px !important;
  color: #6a9c62 !important;
  padding: 6px !important;
  border-bottom: 1px solid rgba(85, 255, 85, 0.2) !important;
  letter-spacing: 1px !important;
  white-space: pre !important;
  background: #0d1a10 !important;
}

/* Hide original library head text and turn it into TABS */
.modal-overlay.point-and-click dialog.ui-phone .library-head {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 0 !important;
  margin: 0 !important;
  border-bottom: 1px solid rgba(85, 255, 85, 0.2) !important;
  background: #112211 !important;
  position: relative !important;
  height: 20px !important;
}

.modal-overlay.point-and-click dialog.ui-phone .library-head * {
  display: none !important;
}

/* Inject Tab Text */
.modal-overlay.point-and-click dialog.ui-phone .library-head::before {
  content: "DANH SÁCH" !important;
  flex: 1 !important;
  text-align: center !important;
  font-size: 8px !important;
  padding: 5px 0 !important;
  background: rgba(85, 255, 85, 0.2) !important;
  color: #55ff55 !important;
}
.modal-overlay.point-and-click dialog.ui-phone .library-head::after {
  content: "ĐỌC" !important;
  flex: 1 !important;
  text-align: center !important;
  font-size: 8px !important;
  padding: 5px 0 !important;
  color: #55ff55 !important;
}

/* Display Search Box */
.modal-overlay.point-and-click dialog.ui-phone .search-box {
  display: flex !important;
  margin: 5px !important;
  border: 1px solid rgba(85, 255, 85, 0.4) !important;
  border-radius: 8px !important;
  padding: 3px 5px !important;
  align-items: center !important;
}
.modal-overlay.point-and-click dialog.ui-phone .search-box input {
  font-size: 9px !important;
  padding: 2px !important;
  background: transparent !important;
}
.modal-overlay.point-and-click dialog.ui-phone .search-box::after {
  content: "9 / 17" !important;
  font-size: 8px !important;
  margin-left: auto !important;
  color: rgba(85, 255, 85, 0.7) !important;
}

/* Evidence List Container */
.modal-overlay.point-and-click dialog.ui-phone .evidence-list {
  flex: 1 !important;
  overflow-y: auto !important;
  padding: 0 5px !important;
  max-height: none !important;
}

/* Evidence Items */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item {
  padding: 5px 4px !important;
  min-height: 0 !important;
  height: auto !important;
  margin-bottom: 0 !important;
  border-bottom: 1px solid rgba(85, 255, 85, 0.1) !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item.active {
  border: 1px solid rgba(85, 255, 85, 0.8) !important;
  background: rgba(85, 255, 85, 0.1) !important;
  border-radius: 4px !important;
}

/* Content wrapper */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item > span:nth-child(2) {
  display: flex !important;
  flex-direction: row !important;
  align-items: flex-start !important;
  gap: 8px !important;
  width: 100% !important;
  white-space: normal !important;
  overflow: visible !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item small {
  font-size: 9px !important;
  flex-shrink: 0 !important;
  margin-top: 1px !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item strong {
  font-size: 9.5px !important;
  line-height: 1.3 !important;
  white-space: normal !important;
  overflow: visible !important;
  text-align: left !important;
  color: #9ecc8f !important;
  font-weight: normal !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item.active strong {
  color: #55ff55 !important;
}

/* Right arrow */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item::after {
  content: ">" !important;
  font-size: 10px !important;
  color: rgba(85, 255, 85, 0.5) !important;
  margin-left: 5px !important;
}
.modal-overlay.point-and-click dialog.ui-phone .evidence-item .item-state {
  display: none !important;
}

/* Soft keys - hide them because the new UI doesn't have them? 
   Wait, the new mockup HAS "MENU", "OK", "ESC" buttons physically!
   But no "TÙY CHỌN OK QUAY LẠI" text on the screen!
*/
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-files::after,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read::after {
  display: none !important;
}

`;

css += mockupFix;
fs.writeFileSync('app/globals.css', css);
console.log('Applied mockup layout fix!');
