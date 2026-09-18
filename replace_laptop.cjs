const fs = require('fs');

// Copy the new wide laptop image over the old one
fs.copyFileSync('C:\\Users\\84702\\.gemini\\antigravity-ide\\brain\\104fb304-7b3d-4a0c-8025-956de30756fe\\ui_laptop_wide_1789551275959.jpg', 'public/ui_laptop.jpg');

// Update the CSS to match the new bounds
const css = `
/* -----------------------------------------------------
   NEW WIDE CRT LAPTOP BOUNDS
----------------------------------------------------- */
.modal-overlay.point-and-click dialog.ui-laptop .inner-content {
  top: 10% !important; 
  left: 12% !important; 
  right: 12% !important; 
  bottom: 14% !important;
  background: rgba(5, 25, 5, 0.6) !important;
  padding: 30px !important;
  border-radius: 40px !important;
}

/* Ensure the background image forces a refresh by adding a timestamp query string if needed, 
   but Next.js dev server usually picks up overwritten files in public/ eventually, 
   or we can just append a specific background rule for ui-laptop to break cache */
.modal-overlay.point-and-click dialog.ui-laptop {
  background: url('/ui_laptop.jpg?v=wide') center/cover no-repeat !important;
}
`;
fs.appendFileSync('app/globals.css', css);
