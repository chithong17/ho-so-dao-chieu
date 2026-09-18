const fs = require('fs');
const css = `
/* Diegetic UI Overrides */
dialog.ui-phone, dialog.ui-laptop, dialog.ui-notebook {
  width: 100% !important;
  height: 100% !important;
  max-width: 95vw !important;
  max-height: 95vh !important;
  aspect-ratio: 16 / 9 !important;
  border: none !important; 
  box-shadow: none !important;
  background-color: transparent !important;
  margin: auto !important; 
}

dialog.ui-phone { background: url('/ui_phone.jpg') center/cover no-repeat !important; }
dialog.ui-laptop { background: url('/ui_laptop.jpg') center/cover no-repeat !important; }
dialog.ui-notebook { background: url('/ui_notebook.jpg') center/cover no-repeat !important; }

/* Inner content positioning */
dialog.ui-phone .inner-content {
  position: absolute !important;
  top: 15% !important; left: 35% !important; right: 35% !important; bottom: 25% !important;
  background: rgba(10,20,10,0.9) !important; 
  color: #aaffaa !important;
  border-radius: 5px !important;
  padding: 10px !important;
  overflow: auto;
}
dialog.ui-phone .evidence-item { color: #aaffaa !important; border-bottom: 1px solid #0f0 !important; }
dialog.ui-phone .evidence-library { background: transparent !important; border-right: 1px solid #0f0 !important; }

dialog.ui-laptop .inner-content {
  position: absolute !important;
  top: 15% !important; left: 25% !important; right: 25% !important; bottom: 25% !important;
  background: rgba(0, 30, 0, 0.85) !important;
  color: #00ff00 !important;
  border-radius: 10% / 10% !important; 
  padding: 20px !important;
  font-family: 'Courier Prime', monospace !important;
  overflow: auto;
}
dialog.ui-laptop button, dialog.ui-laptop input, dialog.ui-laptop p, dialog.ui-laptop h1, dialog.ui-laptop h2, dialog.ui-laptop h3 {
  font-family: inherit !important;
  color: inherit !important;
}
dialog.ui-laptop .evidence-item { border-bottom: 1px dashed #0f0 !important; }
dialog.ui-laptop .evidence-library { background: transparent !important; border-right: 2px solid #0f0 !important; }

dialog.ui-notebook .inner-content {
  position: absolute !important;
  top: 10% !important; left: 15% !important; right: 15% !important; bottom: 10% !important;
  padding: 30px !important;
  background: transparent !important;
  overflow: auto;
}

dialog.ui-files .inner-content {
  padding: 20px !important;
}

/* Modal head close button should float */
.modal-head button {
  font-family: Arial, sans-serif !important;
  font-weight: bold !important;
  color: #333 !important;
  border: 2px solid #333 !important;
  font-size: 16px !important;
  background: rgba(255,255,255,0.8) !important;
  cursor: pointer;
}
`;
fs.appendFileSync('app/globals.css', css);
