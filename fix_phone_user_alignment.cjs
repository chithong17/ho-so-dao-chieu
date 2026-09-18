const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const fixPhoneCSS = `

/* ===========================================
   PHONE ALIGNMENT & TEXT OVERFLOW FIX
=========================================== */

/* Fix the bounds to match the user's perfect alignment */
.modal-overlay.point-and-click dialog.ui-phone .inner-content {
  top: 15.35% !important;
  left: 38.75% !important;
  right: 38.75% !important;
  bottom: 35.15% !important;
  width: auto !important;
  height: auto !important;
}

/* Fix text overflow in evidence items */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item em {
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important; /* Limit to 2 lines */
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: normal !important;
  margin-top: 2px !important;
  font-size: 8.5px !important; /* Make summary text a bit smaller */
  line-height: 1.2 !important;
}

/* Make evidence item padding smaller so more items fit */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item {
  padding: 4px 6px !important;
  min-height: 0 !important;
  gap: 6px !important;
}

/* Smaller title */
.modal-overlay.point-and-click dialog.ui-phone .evidence-item strong {
  font-size: 10px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: block !important;
  width: 100% !important;
}

/* Reduce spacing in search box */
.modal-overlay.point-and-click dialog.ui-phone .search-box {
  margin-bottom: 5px !important;
  padding: 4px 6px !important;
}

/* Fix layout for the tabs at the top */
.modal-overlay.point-and-click dialog.ui-phone .phone-tabs {
  margin-bottom: 5px !important;
}
.modal-overlay.point-and-click dialog.ui-phone .phone-tabs button {
  padding: 3px !important;
  font-size: 9px !important;
}
`;

css += fixPhoneCSS;
fs.writeFileSync('app/globals.css', css);
console.log('Fixed phone alignment and text overflow!');
