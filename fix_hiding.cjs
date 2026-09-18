const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css += `
/* Fix the disappearing reader bug: override old rules that hide the library */
.modal-overlay.point-and-click dialog.ui-phone .mobile-read .evidence-library {
  display: flex !important;
}
.modal-overlay.point-and-click dialog.ui-phone .mobile-files .evidence-library {
  display: flex !important;
}
.modal-overlay.point-and-click dialog.ui-phone .mobile-files .reader-column {
  display: flex !important; 
  /* It won't actually render because React unmounts it, but we unset the CSS hiding anyway */
}
`;

fs.writeFileSync('app/globals.css', css);
console.log('Fixed CSS hiding bugs!');
