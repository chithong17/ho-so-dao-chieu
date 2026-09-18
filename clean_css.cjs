const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

// Strip out everything between "FINAL OVERRIDE FOR PHONE UI" or "MOCKUP UI FIX" to the end.
let newCss = css.substring(0, css.indexOf('/* ===========================================\n   FINAL OVERRIDE FOR PHONE UI'));

// If I couldn't find it, try the other header
if (css.indexOf('/* ===========================================\n   FINAL OVERRIDE FOR PHONE UI') === -1) {
  newCss = css.substring(0, css.indexOf('/* ===========================================\n   MOCKUP UI FIX FOR NEW BACKGROUND'));
}

if (newCss.length === 0 || newCss === css) {
   // Fallback, just append the bounds at the end with higher specificity!
} else {
   css = newCss;
}

const bounds = `

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

/* Custom scrollbar for phone */
.modal-overlay.point-and-click dialog.ui-phone .custom-scroll::-webkit-scrollbar {
  width: 4px !important;
}
.modal-overlay.point-and-click dialog.ui-phone .custom-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(85, 255, 85, 0.4) !important;
  border-radius: 2px !important;
}

`;

css += bounds;
fs.writeFileSync('app/globals.css', css);
console.log('Cleaned up globals.css!');
