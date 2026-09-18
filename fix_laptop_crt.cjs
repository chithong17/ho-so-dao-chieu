const fs = require('fs');
const css = `
/* -----------------------------------------------------
   LAPTOP CRT TERMINAL OVERRIDES
----------------------------------------------------- */

/* Precise bounds for the CRT screen glass */
.modal-overlay.point-and-click dialog.ui-laptop .inner-content {
  top: 18% !important; 
  left: 26% !important; 
  right: 26% !important; 
  bottom: 28% !important;
  background: transparent !important;
  padding: 10px !important;
  overflow: hidden !important; /* let inner containers scroll */
}

/* Force EVERY element inside the laptop to be transparent with green phosphor text */
.modal-overlay.point-and-click dialog.ui-laptop .inner-content,
.modal-overlay.point-and-click dialog.ui-laptop .inner-content * {
  background-color: transparent !important;
  color: #4ade80 !important; /* Retro phosphor green */
  text-shadow: 0 0 4px rgba(74, 222, 128, 0.6) !important;
  border-color: rgba(74, 222, 128, 0.4) !important;
  box-shadow: none !important;
  font-family: 'Courier Prime', 'Courier New', Courier, monospace !important;
}

/* Specific component overrides to remove modern UI boxes */
.modal-overlay.point-and-click dialog.ui-laptop .mail-app,
.modal-overlay.point-and-click dialog.ui-laptop .evidence-reader,
.modal-overlay.point-and-click dialog.ui-laptop .evidence-library,
.modal-overlay.point-and-click dialog.ui-laptop .reader-column {
  background: transparent !important;
  border: none !important;
}

/* Add some structure back using retro dashed/solid green lines */
.modal-overlay.point-and-click dialog.ui-laptop .evidence-library {
  border-right: 2px dashed rgba(74, 222, 128, 0.3) !important;
  padding-right: 10px !important;
}
.modal-overlay.point-and-click dialog.ui-laptop .mail-subject {
  border-bottom: 2px solid rgba(74, 222, 128, 0.5) !important;
  padding-bottom: 10px !important;
  margin-bottom: 10px !important;
}
.modal-overlay.point-and-click dialog.ui-laptop .mail-sender {
  border-bottom: 1px dashed rgba(74, 222, 128, 0.3) !important;
  padding-bottom: 10px !important;
  margin-bottom: 15px !important;
}

/* Hover effects for buttons/evidence list */
.modal-overlay.point-and-click dialog.ui-laptop button.evidence-item:hover,
.modal-overlay.point-and-click dialog.ui-laptop button.evidence-item.active {
  background: rgba(74, 222, 128, 0.1) !important;
  border-left: 3px solid #4ade80 !important;
}

/* Tint avatars/images to green to fit the CRT screen */
.modal-overlay.point-and-click dialog.ui-laptop .avatar {
  filter: sepia(1) hue-rotate(70deg) saturate(3) brightness(0.8) !important;
  border-radius: 0 !important; /* Blocky retro look */
  border: 1px solid #4ade80 !important;
}

/* Disable any white/grey backgrounds in mail body specifically */
.modal-overlay.point-and-click dialog.ui-laptop .mail-body * {
  background: transparent !important;
}
`;
fs.appendFileSync('app/globals.css', css);
