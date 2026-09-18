const fs = require('fs');

// Copy the original laptop image back
fs.copyFileSync('C:\\Users\\84702\\.gemini\\antigravity-ide\\brain\\104fb304-7b3d-4a0c-8025-956de30756fe\\ui_laptop_1789543964202.jpg', 'public/ui_laptop.jpg');

const css = `
/* -----------------------------------------------------
   ROLLBACK TO ORIGINAL CRT BOUNDS
----------------------------------------------------- */
.modal-overlay.point-and-click dialog.ui-laptop {
  background: url('/ui_laptop.jpg?v=rollback') center/cover no-repeat !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .inner-content {
  top: 20% !important; 
  left: 28% !important; 
  right: 27% !important; 
  bottom: 28% !important;
  background: rgba(5, 25, 5, 0.6) !important;
  padding: 15px !important;
  border-radius: 20px !important;
  box-shadow: inset 0 0 20px rgba(0,0,0,1) !important;
}

/* Adjust text sizes to fit the smaller screen */
.modal-overlay.point-and-click dialog.ui-laptop .inner-content,
.modal-overlay.point-and-click dialog.ui-laptop .inner-content * {
  font-size: 0.85rem !important;
  line-height: 1.4 !important;
}
.modal-overlay.point-and-click dialog.ui-laptop h1,
.modal-overlay.point-and-click dialog.ui-laptop h2,
.modal-overlay.point-and-click dialog.ui-laptop h3 {
  font-size: 1.05rem !important;
}
`;
fs.appendFileSync('app/globals.css', css);
