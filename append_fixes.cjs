const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css += `

/* Absolute perfect bounds from DevTools */
.modal-overlay.point-and-click dialog.ui-phone .inner-content {
  top: 10.5% !important;
  left: 35.5% !important;
  right: 35% !important;
  bottom: 21% !important;
}

/* Hide old phone soft keys text */
.modal-overlay.point-and-click dialog.ui-phone .inner-content::after { 
  display: none !important; 
}

/* Fix the disappearing reader bug: override old rules that hide the library */
.modal-overlay.point-and-click dialog.ui-phone .mobile-read .evidence-library {
  display: flex !important;
}
.modal-overlay.point-and-click dialog.ui-phone .mobile-files .evidence-library {
  display: flex !important;
}
.modal-overlay.point-and-click dialog.ui-phone .mobile-files .reader-column {
  display: flex !important; 
}

`;

fs.writeFileSync('app/globals.css', css);
console.log('Appended fixes back safely!');
