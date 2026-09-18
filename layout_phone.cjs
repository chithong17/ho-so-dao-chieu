const fs = require('fs');

const css = `
/* -----------------------------------------------------
   PHONE PDA LAYOUT FIXES
----------------------------------------------------- */

/* Fix phone bounds to perfectly fit the screen glass */
.modal-overlay.point-and-click dialog.ui-phone .inner-content {
  top: 17% !important; 
  left: 36.5% !important; 
  right: 36.5% !important; 
  bottom: 23% !important;
  background: rgba(5, 25, 5, 0.8) !important;
  padding: 10px !important;
  border-radius: 4px !important;
  
  /* Use column layout so list is on top, reader is on bottom */
  display: flex !important;
  flex-direction: column !important;
  gap: 15px !important;
  overflow: hidden !important;
}

/* Evidence Library takes the top half */
.modal-overlay.point-and-click dialog.ui-phone .evidence-library {
  flex: 0 0 40% !important;
  max-width: 100% !important;
  border-right: none !important;
  border-bottom: 1px dashed rgba(50, 205, 50, 0.4) !important;
  padding-bottom: 10px !important;
  display: flex !important;
  flex-direction: column !important;
}

.modal-overlay.point-and-click dialog.ui-phone .library-head {
  display: flex !important;
  justify-content: space-between !important;
  font-weight: bold !important;
  margin-bottom: 10px !important;
  font-size: 0.9rem !important;
}

.modal-overlay.point-and-click dialog.ui-phone .search-box {
  border: 1px dashed rgba(50, 205, 50, 0.5) !important;
  padding: 4px 8px !important;
  margin-bottom: 10px !important;
  display: flex !important;
  align-items: center !important;
}
.modal-overlay.point-and-click dialog.ui-phone .search-box input {
  background: transparent !important;
  border: none !important;
  color: #32cd32 !important;
  outline: none !important;
  width: 100% !important;
  font-family: inherit !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-list {
  overflow-y: auto !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 8px !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-item {
  border: 1px dashed rgba(50, 205, 50, 0.3) !important;
  padding: 8px !important;
  border-radius: 4px !important;
  text-align: left !important;
  display: flex !important;
  flex-direction: column !important;
}
.modal-overlay.point-and-click dialog.ui-phone .evidence-item.active {
  border: 1px solid #32cd32 !important;
  background: rgba(50, 205, 50, 0.1) !important;
}

/* Evidence Reader takes the bottom half */
.modal-overlay.point-and-click dialog.ui-phone .reader-column {
  flex: 1 !important;
  max-width: 100% !important;
  overflow-y: auto !important;
  display: flex !important;
  flex-direction: column !important;
}

.modal-overlay.point-and-click dialog.ui-phone .reader-path {
  font-size: 0.8rem !important;
  border-bottom: 1px solid #32cd32 !important;
  padding-bottom: 8px !important;
  margin-bottom: 10px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
}

.modal-overlay.point-and-click dialog.ui-phone .pin-button {
  border: 1px solid #32cd32 !important;
  background: transparent !important;
  color: #32cd32 !important;
  padding: 2px 6px !important;
  font-size: 0.75rem !important;
  cursor: pointer !important;
}

/* Scale down font size for the tiny phone screen */
.modal-overlay.point-and-click dialog.ui-phone .inner-content,
.modal-overlay.point-and-click dialog.ui-phone .inner-content * {
  font-size: 0.8rem !important;
}
.modal-overlay.point-and-click dialog.ui-phone h1,
.modal-overlay.point-and-click dialog.ui-phone h2 {
  font-size: 0.95rem !important;
  margin-bottom: 5px !important;
}
`;

fs.appendFileSync('app/globals.css', css);
