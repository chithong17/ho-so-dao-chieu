const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const layoutFixes = `

/* -------------------------------------------
   CRT LAPTOP SCROLL & LAYOUT FIXES
------------------------------------------- */
/* Fix the right column overflowing the screen */
.modal-overlay.point-and-click dialog.ui-laptop .reader-column {
  max-height: 100% !important;
  height: 100% !important;
  overflow-y: auto !important;
  padding-bottom: 20px !important;
}

/* Fix the left column overflowing the screen */
.modal-overlay.point-and-click dialog.ui-laptop .evidence-library {
  max-height: 100% !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-list {
  flex: 1 !important;
  overflow-y: auto !important;
  max-height: none !important;
  padding-bottom: 20px !important;
}

/* Fix search box being cut off horizontally */
.modal-overlay.point-and-click dialog.ui-laptop .search-box {
  width: 100% !important;
  box-sizing: border-box !important;
  display: flex !important;
  margin-bottom: 10px !important;
}
.modal-overlay.point-and-click dialog.ui-laptop .search-box input {
  width: 100% !important;
  min-width: 0 !important;
  box-sizing: border-box !important;
}

/* Fix the 'Hồ sơ HS-01 / E04' path being squished */
.modal-overlay.point-and-click dialog.ui-laptop .reader-path {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 10px !important;
  align-items: center !important;
  margin-bottom: 15px !important;
}

/* Custom retro scrollbar so it looks cool */
.modal-overlay.point-and-click dialog.ui-laptop *::-webkit-scrollbar {
  width: 6px !important;
  height: 6px !important;
}
.modal-overlay.point-and-click dialog.ui-laptop *::-webkit-scrollbar-track {
  background: transparent !important;
}
.modal-overlay.point-and-click dialog.ui-laptop *::-webkit-scrollbar-thumb {
  background: rgba(51, 255, 51, 0.5) !important;
  border-radius: 3px !important;
}

/* Reduce some padding inside the paper sheet so text fits better */
.modal-overlay.point-and-click dialog.ui-laptop .paper-sheet {
  padding: 10px !important;
}
`;

code += layoutFixes;
fs.writeFileSync('app/globals.css', code);
console.log('Appended layout fixes');
