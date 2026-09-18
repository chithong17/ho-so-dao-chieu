const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const fixPhoneCSS = `

/* ===========================================
   ULTIMATE PHONE ALIGNMENT & TEXT OVERFLOW FIX
=========================================== */

/* 1. Perfect Bounds matching the exact LCD screen on the phone */
.modal-overlay.point-and-click dialog.ui-phone .inner-content {
  top: 15.35% !important;
  left: 38.75% !important;
  right: 38.75% !important;
  bottom: 35.15% !important;
  width: auto !important;
  height: auto !important;
  padding: 8px !important;
  display: flex !important;
  flex-direction: column !important;
  background: #0d1a0d !important;
  border: 1px solid #1a331a !important;
  border-radius: 4px !important;
  box-shadow: inset 0 0 15px rgba(0, 255, 0, 0.1) !important;
  overflow: hidden !important;
}

/* 2. Fix the Evidence List container */
.modal-overlay.point-and-click dialog.ui-phone .evidence-list {
  display: flex !important;
  flex-direction: column !important;
  gap: 8px !important;
  flex: 1 !important;
  overflow-y: auto !important;
  padding-right: 4px !important;
  height: auto !important;
  min-height: 0 !important;
}

/* 3. Fix the Evidence Item so it doesn't overlap! */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item {
  display: flex !important;
  flex-direction: row !important;
  align-items: flex-start !important;
  gap: 8px !important;
  padding: 6px !important;
  min-height: 45px !important;
  height: auto !important;
  background: transparent !important;
  border: 1px dashed rgba(51, 255, 51, 0.4) !important;
  border-radius: 0 !important;
  position: relative !important;
  box-sizing: border-box !important;
}

/* Remove fake checkboxes if they were absolutely positioned */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item::before,
.modal-overlay.point-and-click dialog.ui-phone .evidence-item::after {
  display: none !important;
}

/* Show the actual icon again */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item-icon {
  display: block !important;
  flex-shrink: 0 !important;
  margin-top: 2px !important;
}

/* Text container inside item */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item > span:nth-child(2) {
  display: flex !important;
  flex-direction: column !important;
  flex: 1 !important;
  overflow: hidden !important;
}

/* Limit summary text to 1 line */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item em {
  display: -webkit-box !important;
  -webkit-line-clamp: 1 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: normal !important;
  font-size: 8px !important;
  line-height: 1.2 !important;
  margin-top: 2px !important;
  color: rgba(51, 255, 51, 0.7) !important;
}

/* Style Title */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item strong {
  font-size: 10px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: block !important;
  color: #33ff33 !important;
}

/* Style small text (ID and Author) */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item small {
  font-size: 8px !important;
  color: rgba(51, 255, 51, 0.8) !important;
  margin-bottom: 2px !important;
}

/* Search Box Spacing */
.modal-overlay.point-and-click dialog.ui-phone .search-box {
  margin-bottom: 8px !important;
  padding: 4px 6px !important;
  display: flex !important;
  gap: 5px !important;
  border: 1px solid rgba(51, 255, 51, 0.4) !important;
  align-items: center !important;
}

/* Fix tabs */
.modal-overlay.point-and-click dialog.ui-phone .phone-tabs {
  margin-bottom: 8px !important;
}
.modal-overlay.point-and-click dialog.ui-phone .phone-tabs button {
  padding: 4px !important;
  font-size: 9px !important;
}
`;

css += fixPhoneCSS;
fs.writeFileSync('app/globals.css', css);
console.log('Applied ultimate phone alignment fix!');
