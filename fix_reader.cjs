const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css += `

/* Fix the disappearing reader bug properly with high specificity */
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .evidence-library {
  display: flex !important;
}

/* Also ensure reader column shows */
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .reader-column {
  display: flex !important;
}
`;

fs.writeFileSync('app/globals.css', css);
console.log('Appended stronger fix for reader visibility!');
