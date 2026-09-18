const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css += `

/* ===========================================
   NUKE OLD BLOATED CSS RULES FOR MOCKUP
=========================================== */

/* Override any old dashed borders or weird padding on list items */
.modal-overlay.point-and-click dialog.ui-phone .evidence-list button.evidence-item {
  border: none !important;
  border-bottom: 1px solid rgba(85,255,85,0.1) !important;
  border-radius: 0 !important;
  background: transparent !important;
  margin: 0 !important;
  padding: 6px 4px !important;
  min-height: 0 !important;
  height: auto !important;
}

/* Active item */
.modal-overlay.point-and-click dialog.ui-phone .evidence-list button.evidence-item.active {
  border: 1px solid rgba(85,255,85,0.8) !important;
  background: rgba(85,255,85,0.1) !important;
  border-radius: 4px !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-list button.evidence-item strong {
  display: inline !important;
  white-space: normal !important;
  overflow: visible !important;
  line-height: 1.3 !important;
  font-size: 9.5px !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-list button.evidence-item small {
  display: inline !important;
  font-size: 9px !important;
  margin: 0 !important;
}
`;

fs.writeFileSync('app/globals.css', css);
console.log('Nuked old CSS safely!');
