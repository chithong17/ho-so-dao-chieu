const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const newLaptopStyles = `

/* -------------------------------------------
   PERFECT CRT LAPTOP SCREEN FIX
------------------------------------------- */
.modal-overlay.point-and-click dialog.ui-laptop {
  width: 100vw !important;
  height: 56.25vw !important; /* 16:9 */
  max-width: 177.78vh !important;
  max-height: 100vh !important;
  padding: 0 !important;
  margin: auto !important;
  background: url('/ui_laptop.jpg') center center no-repeat !important;
  background-size: 100% 100% !important; 
  border: none !important;
  position: relative !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .inner-content {
  position: absolute !important;
  top: 15.5% !important;
  left: 27.5% !important;
  width: 44.5% !important;
  height: 60.5% !important;
  box-sizing: border-box !important;
  
  background: #001100 !important;
  border: 2px solid #22aa22 !important;
  border-radius: 4% !important; 
  box-shadow: inset 0 0 40px rgba(0, 255, 0, 0.4), 0 0 30px rgba(0, 255, 0, 0.5) !important;
  padding: 2% !important;
  overflow: hidden !important;
  
  display: flex !important;
  gap: 15px !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .inner-content::after {
  content: ' ';
  display: block !important;
  position: absolute !important;
  top: 0 !important; left: 0 !important; bottom: 0 !important; right: 0 !important;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)) !important;
  z-index: 9999 !important;
  background-size: 100% 3px, 3px 100% !important;
  pointer-events: none !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .inner-content * {
  background: transparent !important;
  color: #33ff33 !important; 
  font-family: 'Courier New', Courier, monospace !important;
  border-color: #33ff33 !important;
  box-shadow: none !important;
  text-shadow: 0 0 3px rgba(51, 255, 51, 0.8) !important; 
  font-weight: bold !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-reader,
.modal-overlay.point-and-click dialog.ui-laptop .reader-column,
.modal-overlay.point-and-click dialog.ui-laptop .document-app,
.modal-overlay.point-and-click dialog.ui-laptop .paper-sheet,
.modal-overlay.point-and-click dialog.ui-laptop .mail-app,
.modal-overlay.point-and-click dialog.ui-laptop .chat-app,
.modal-overlay.point-and-click dialog.ui-laptop .terminal-app {
  border: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-content {
  border: 1px dashed rgba(51, 255, 51, 0.5) !important;
  padding: 10px !important;
  margin: 10px 0 !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-library {
  border-right: 2px solid rgba(51, 255, 51, 0.5) !important;
  padding-right: 15px !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .paper-sheet {
  padding: 15px !important;
}
`;

code += newLaptopStyles;
fs.writeFileSync('app/globals.css', code);
console.log('Applied PERFECT CRT LAPTOP styling!');
