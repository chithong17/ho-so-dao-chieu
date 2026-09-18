const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css += `

/* ===========================================
   NUKE ABSOLUTE POSITIONING ON EVIDENCE LIBRARY
=========================================== */

/* Force evidence-library to be a normal flex child that takes up 100% space */
.modal-overlay.point-and-click dialog.ui-phone .inner-content .evidence-library,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-files .evidence-library,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .evidence-library {
  position: static !important;
  top: auto !important;
  bottom: auto !important;
  left: auto !important;
  right: auto !important;
  height: 100% !important;
  max-height: none !important;
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important; /* Outer container hides everything outside, inner handles scrolling */
}
`;

fs.writeFileSync('app/globals.css', css);
console.log('Fixed evidence-library positioning and height!');
