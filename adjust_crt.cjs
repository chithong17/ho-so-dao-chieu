const fs = require('fs');

const css = `
/* -----------------------------------------------------
   REFINED CRT & PDA SCREENS
----------------------------------------------------- */

/* Better CRT Bounds & Dimming overlay */
.modal-overlay.point-and-click dialog.ui-laptop .inner-content {
  top: 15% !important; 
  left: 12% !important; 
  right: 12% !important; 
  bottom: 22% !important;
  background: rgba(5, 25, 5, 0.6) !important; /* Dim the bright screen background */
  padding: 25px !important;
  border-radius: 60px 60px 40px 40px / 40px !important; /* Match the rounded CRT glass */
  box-shadow: inset 0 0 30px rgba(0,0,0,1) !important; /* Inner shadow for depth */
}

/* Fix text size and contrast for laptop */
.modal-overlay.point-and-click dialog.ui-laptop .inner-content,
.modal-overlay.point-and-click dialog.ui-laptop .inner-content * {
  color: #55ff55 !important;
  text-shadow: 2px 2px 0px #002200, 0 0 6px rgba(85, 255, 85, 0.8) !important;
  font-size: 0.95rem !important;
  line-height: 1.5 !important;
}

/* Ensure headings are proportionally larger but not huge */
.modal-overlay.point-and-click dialog.ui-laptop h1,
.modal-overlay.point-and-click dialog.ui-laptop h2,
.modal-overlay.point-and-click dialog.ui-laptop h3 {
  font-size: 1.2rem !important;
}
.modal-overlay.point-and-click dialog.ui-laptop .mail-body p {
  font-size: 1rem !important;
  margin-bottom: 12px !important;
}

/* -----------------------------------------------------
   PDA (Phone) adjustments 
----------------------------------------------------- */
.modal-overlay.point-and-click dialog.ui-phone .inner-content {
  background: rgba(5, 25, 5, 0.7) !important;
  border-radius: 10px !important;
  box-shadow: inset 0 0 15px rgba(0,0,0,0.8) !important;
}
.modal-overlay.point-and-click dialog.ui-phone .inner-content,
.modal-overlay.point-and-click dialog.ui-phone .inner-content * {
  color: #55ff55 !important;
  text-shadow: 2px 2px 0px #002200, 0 0 5px rgba(85, 255, 85, 0.8) !important;
  font-size: 0.9rem !important;
}
`;
fs.appendFileSync('app/globals.css', css);
