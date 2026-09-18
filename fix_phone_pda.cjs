const fs = require('fs');
const css = `
/* -----------------------------------------------------
   PHONE PDA TERMINAL OVERRIDES
----------------------------------------------------- */

/* Precise bounds for the PDA screen */
.modal-overlay.point-and-click dialog.ui-phone .inner-content {
  top: 15% !important; 
  left: 32% !important; 
  right: 32% !important; 
  bottom: 15% !important;
  background: transparent !important;
  padding: 10px !important;
  overflow: hidden !important;
}

/* Force EVERY element inside the PDA to be transparent with retro green text */
.modal-overlay.point-and-click dialog.ui-phone .inner-content,
.modal-overlay.point-and-click dialog.ui-phone .inner-content * {
  background-color: transparent !important;
  color: #32cd32 !important; /* Slightly different green for PDA */
  text-shadow: 0 0 3px rgba(50, 205, 50, 0.5) !important;
  border-color: rgba(50, 205, 50, 0.4) !important;
  box-shadow: none !important;
  font-family: 'Courier Prime', 'Courier New', Courier, monospace !important;
}

/* Specific component overrides to remove modern UI boxes */
.modal-overlay.point-and-click dialog.ui-phone .chat-app,
.modal-overlay.point-and-click dialog.ui-phone .evidence-reader,
.modal-overlay.point-and-click dialog.ui-phone .evidence-library,
.modal-overlay.point-and-click dialog.ui-phone .reader-column {
  background: transparent !important;
  border: none !important;
}

/* Add some structure back */
.modal-overlay.point-and-click dialog.ui-phone .evidence-library {
  border-bottom: 2px dashed rgba(50, 205, 50, 0.4) !important;
  padding-bottom: 10px !important;
  margin-bottom: 10px !important;
}
.modal-overlay.point-and-click dialog.ui-phone .chat-header {
  border-bottom: 1px solid rgba(50, 205, 50, 0.5) !important;
  padding-bottom: 10px !important;
  margin-bottom: 10px !important;
}

/* Chat bubbles retro style */
.modal-overlay.point-and-click dialog.ui-phone .chat-message .bubble {
  border: 1px dashed rgba(50, 205, 50, 0.5) !important;
  border-radius: 4px !important;
  padding: 8px !important;
  margin-top: 5px !important;
}

/* Hover effects for buttons/evidence list */
.modal-overlay.point-and-click dialog.ui-phone button.evidence-item:hover,
.modal-overlay.point-and-click dialog.ui-phone button.evidence-item.active {
  background: rgba(50, 205, 50, 0.1) !important;
  border-left: 3px solid #32cd32 !important;
}

/* Tint avatars/images to green */
.modal-overlay.point-and-click dialog.ui-phone .avatar {
  filter: sepia(1) hue-rotate(70deg) saturate(3) brightness(0.8) !important;
  border-radius: 0 !important;
  border: 1px solid #32cd32 !important;
}
`;
fs.appendFileSync('app/globals.css', css);
