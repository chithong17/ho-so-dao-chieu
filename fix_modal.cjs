const fs = require('fs');
const css = `
/* Modal fix */
body { overflow: hidden; } /* Prevent scrolling the whole page */
.modal-overlay.point-and-click { 
  position: fixed !important; 
  top: 0; left: 0; right: 0; bottom: 0; 
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.85); 
  z-index: 1000; 
}
.modal-overlay.point-and-click dialog { 
  position: relative !important; 
  margin: 0 !important;
  width: 90vw; height: 90vh; max-height: 90vh; 
  display: flex; flex-direction: column; 
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
}
`;
fs.appendFileSync('app/globals.css', css);
