const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const fitFixes = `
/* -------------------------------------------
   CRT LAPTOP FONT & SIZING FIT FIXES
------------------------------------------- */
/* Reduce font size inside the laptop so wide text fits */
.modal-overlay.point-and-click dialog.ui-laptop .inner-content * {
  font-size: 11px !important;
  line-height: 1.4 !important;
}

/* Give the left column a bit more space */
.modal-overlay.point-and-click dialog.ui-laptop .evidence-library {
  flex: 1.4 !important;
  padding-right: 10px !important;
}

/* Let the right column take the rest */
.modal-overlay.point-and-click dialog.ui-laptop .reader-column {
  flex: 2 !important;
}

/* Remove max-width that causes ellipsis on names */
.modal-overlay.point-and-click dialog.ui-laptop .evidence-item small span {
  max-width: none !important;
  white-space: normal !important;
}

/* Make search box smaller so placeholder fits */
.modal-overlay.point-and-click dialog.ui-laptop .search-box {
  padding: 4px 8px !important;
  gap: 5px !important;
}

/* Adjust padding in evidence items so they don't look cramped */
.modal-overlay.point-and-click dialog.ui-laptop .evidence-item {
  padding: 10px !important;
}

/* Adjust header sizes so they don't wrap weirdly */
.modal-overlay.point-and-click dialog.ui-laptop .inner-content h2,
.modal-overlay.point-and-click dialog.ui-laptop .inner-content strong {
  font-size: 13px !important;
}
`;

code += fitFixes;
fs.writeFileSync('app/globals.css', code);
console.log('Appended fit fixes');
