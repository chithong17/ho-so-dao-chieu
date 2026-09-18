const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const phoneCSS = `
/* ===========================================
   4. PERFECT PHONE UI FIX
=========================================== */
.modal-overlay.point-and-click dialog.ui-phone {
  width: 100vw !important;
  height: 56.25vw !important; /* 16:9 */
  max-width: 177.78vh !important;
  max-height: 100vh !important;
  padding: 0 !important;
  margin: auto !important;
  background: url('/ui_phone.jpg') center center no-repeat !important;
  background-size: 100% 100% !important; 
  border: none !important;
  position: relative !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

/* Position the Inner Content precisely over the phone screen */
.modal-overlay.point-and-click dialog.ui-phone .inner-content {
  display: flex !important;
  flex-direction: column !important;
  position: absolute !important;
  top: 20% !important;
  left: 38% !important;
  width: 23% !important;
  height: 52% !important;
  padding: 10px !important;
  box-sizing: border-box !important;
  
  /* Old school LCD screen style */
  background: #0d1a0d !important;
  border: 1px solid #1a331a !important;
  border-radius: 4px !important;
  box-shadow: inset 0 0 15px rgba(0, 255, 0, 0.1) !important;
  overflow: hidden !important;
}

/* LCD Pixel lines */
.modal-overlay.point-and-click dialog.ui-phone .inner-content::before {
  content: " ";
  display: block;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%) !important;
  background-size: 100% 4px !important;
  z-index: 100;
  pointer-events: none;
}

/* Phone Text & Interactions */
.modal-overlay.point-and-click dialog.ui-phone * {
  color: #33ff33 !important;
  font-family: 'Courier New', Courier, monospace !important;
  text-shadow: 0 0 2px rgba(51, 255, 51, 0.5) !important;
  background: transparent !important;
  border-color: #33ff33 !important;
}

/* Smaller font for the tiny screen */
.modal-overlay.point-and-click dialog.ui-phone .inner-content * {
  font-size: 10px !important;
  line-height: 1.3 !important;
}

.modal-overlay.point-and-click dialog.ui-phone h2,
.modal-overlay.point-and-click dialog.ui-phone strong {
  font-size: 12px !important;
  font-weight: bold !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-library,
.modal-overlay.point-and-click dialog.ui-phone .reader-column {
  max-width: 100% !important;
  width: 100% !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-library {
  flex: 1 !important; /* Take half or whatever is available */
  max-height: 50% !important;
  border-bottom: 1px dashed rgba(51, 255, 51, 0.5) !important;
  padding-bottom: 5px !important;
  margin-bottom: 5px !important;
}

.modal-overlay.point-and-click dialog.ui-phone .reader-column {
  flex: 1 !important;
  overflow-y: auto !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item {
  padding: 5px !important;
  margin-bottom: 5px !important;
  border: 1px dashed rgba(51, 255, 51, 0.3) !important;
  height: auto !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item small span {
  max-width: none !important;
  white-space: normal !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-content {
  border: 1px solid rgba(51, 255, 51, 0.3) !important;
  padding: 5px !important;
}

/* Fix overlapping search box */
.modal-overlay.point-and-click dialog.ui-phone .search-box {
  display: flex !important;
  flex-direction: column !important;
  gap: 5px !important;
  margin-bottom: 5px !important;
}
.modal-overlay.point-and-click dialog.ui-phone .search-box input {
  width: 100% !important;
  padding: 2px 5px !important;
  border: 1px solid #33ff33 !important;
}

/* Scrollbars */
.modal-overlay.point-and-click dialog.ui-phone *::-webkit-scrollbar {
  width: 4px !important;
}
.modal-overlay.point-and-click dialog.ui-phone *::-webkit-scrollbar-track {
  background: transparent !important;
}
.modal-overlay.point-and-click dialog.ui-phone *::-webkit-scrollbar-thumb {
  background: rgba(51, 255, 51, 0.4) !important;
  border-radius: 2px !important;
}
`;

code += phoneCSS;
fs.writeFileSync('app/globals.css', code);
console.log('Fixed Phone UI!');
