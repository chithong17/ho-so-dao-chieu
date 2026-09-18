const fs = require('fs');

const css = `
/* Ultra-specific rule to force all text inside the board note detail to be brown */
.modal-overlay.point-and-click dialog.ui-board .board-note-detail,
.modal-overlay.point-and-click dialog.ui-board .board-note-detail * {
  color: #3b2818 !important; /* Deep vintage brown */
}

/* Also ensure SVG icons take the brown color */
.modal-overlay.point-and-click dialog.ui-board .board-note-detail svg {
  color: #3b2818 !important;
}

/* Fix any close buttons to look like brown ink */
.modal-overlay.point-and-click dialog.ui-board .board-note-detail button {
  color: #c0392b !important; /* Keep the close button X red for visibility, or make it brown? We'll leave the red X if it has a specific inline style, but since we used *, it might become brown. Let's force red for close button */
}
.modal-overlay.point-and-click dialog.ui-board .board-note-detail > button {
  color: #a93226 !important;
}
`;

fs.appendFileSync('app/globals.css', css);
