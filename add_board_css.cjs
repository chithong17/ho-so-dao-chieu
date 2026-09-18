const fs = require('fs');

const css = `
/* UI Board overrides */
.modal-overlay.point-and-click dialog.ui-board {
  width: 100% !important;
  height: 100% !important;
  max-width: 95vw !important;
  max-height: 95vh !important;
  aspect-ratio: 16 / 9 !important;
  border: none !important; 
  box-shadow: none !important;
  background-color: transparent !important;
  margin: auto !important; 
  background: url('/ui_board.jpg') center/cover no-repeat !important;
}

.modal-overlay.point-and-click dialog.ui-board .inner-content {
  position: absolute !important;
  top: 15% !important; left: 15% !important; right: 15% !important; bottom: 15% !important;
  background: transparent !important;
  padding: 20px !important;
  overflow: auto;
}

.modal-overlay.point-and-click dialog.ui-board h2,
.modal-overlay.point-and-click dialog.ui-board h3 {
  color: #fdfbf7 !important;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
  font-family: 'Patrick Hand', cursive !important;
}

.modal-overlay.point-and-click dialog.ui-board p {
  color: #fdfbf7 !important;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
}

.modal-overlay.point-and-click dialog.ui-board .claim-card {
  background: #fdfbf7 !important;
  color: #2b2620 !important;
  border: 1px solid #3e3222 !important;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.5) !important;
}
.modal-overlay.point-and-click dialog.ui-board .claim-card strong {
  color: #2b2620 !important;
}
.modal-overlay.point-and-click dialog.ui-board .claim-card p {
  color: rgba(43, 38, 32, 0.8) !important;
  text-shadow: none !important;
}

.modal-overlay.point-and-click dialog.ui-board .workspace-page {
  background: transparent !important;
  box-shadow: none !important;
}

.modal-overlay.point-and-click dialog.ui-board .pinned-grid button {
  background: #fdfbf7 !important;
  border: 1px solid #3e3222 !important;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.3) !important;
  transform: rotate(-1.5deg);
  border-radius: 0 !important;
}
.modal-overlay.point-and-click dialog.ui-board .pinned-grid button:nth-child(even) {
  transform: rotate(1.5deg);
}
.modal-overlay.point-and-click dialog.ui-board .pinned-grid button strong {
  color: #2b2620 !important;
}
.modal-overlay.point-and-click dialog.ui-board .pinned-grid button p {
  color: rgba(43, 38, 32, 0.8) !important;
  text-shadow: none !important;
}
`;
fs.appendFileSync('app/globals.css', css);
