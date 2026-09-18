const fs = require('fs');
const css = `
/* Adjust bounds to avoid the wooden frame */
.modal-overlay.point-and-click dialog.ui-board .inner-content {
  top: 18% !important; 
  left: 18% !important; 
  right: 18% !important; 
  bottom: 18% !important;
  padding: 30px !important;
}

/* Adjust typography for the board */
.modal-overlay.point-and-click dialog.ui-board span.eyebrow {
  font-size: 1.2rem !important;
  letter-spacing: 2px !important;
  color: #ffde8a !important; /* Slightly more yellow/orange for contrast */
}

.modal-overlay.point-and-click dialog.ui-board h2 {
  font-size: 2.5rem !important;
  margin-top: 5px !important;
  margin-bottom: 30px !important;
  color: #ffffff !important;
}

.modal-overlay.point-and-click dialog.ui-board h3 {
  font-size: 1.6rem !important;
  color: #fdfbf7 !important;
  margin-bottom: 10px !important;
  border-bottom: 2px dashed rgba(255,255,255,0.3);
  padding-bottom: 5px;
  display: inline-block;
}

.modal-overlay.point-and-click dialog.ui-board p,
.modal-overlay.point-and-click dialog.ui-board span {
  font-size: 1.1rem !important;
  line-height: 1.5 !important;
}

/* Make the grid look a bit more spaced out on the big board */
.modal-overlay.point-and-click dialog.ui-board .pinned-grid {
  gap: 20px !important;
  margin-bottom: 40px !important;
}

/* Increase font size inside the pinned cards */
.modal-overlay.point-and-click dialog.ui-board .claim-card strong,
.modal-overlay.point-and-click dialog.ui-board .pinned-grid button strong {
  font-size: 1.2rem !important;
}
.modal-overlay.point-and-click dialog.ui-board .claim-card span,
.modal-overlay.point-and-click dialog.ui-board .pinned-grid button span {
  font-size: 1rem !important;
}
`;
fs.appendFileSync('app/globals.css', css);
