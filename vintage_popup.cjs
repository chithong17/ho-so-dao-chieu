const fs = require('fs');

const css = `
/* Highly specific overrides for the board popup to ensure vintage look */
.board-note-detail {
  background: #e3d5b8 !important; /* Vintage paper */
  border: 1px solid #a39578 !important;
  box-shadow: inset 0 0 30px rgba(100,80,50,0.2), 0 10px 30px rgba(0,0,0,0.8) !important;
  font-family: 'Patrick Hand', cursive !important;
}

.board-note-detail .evidence-reader *,
.board-note-detail .mail-app *,
.board-note-detail .chat-app *,
.board-note-detail .terminal-app *,
.board-note-detail .document-app * {
  color: #2b2620 !important; /* Dark ink */
  background-color: transparent !important;
  border-color: rgba(43, 38, 32, 0.2) !important;
  box-shadow: none !important;
  text-shadow: none !important;
}

/* Button overrides inside the popup */
.board-note-detail .evidence-reader .pin-button {
  background: rgba(0,0,0,0.05) !important;
  border: 1px solid #5a4b3c !important;
  border-radius: 4px !important;
}
.board-note-detail .evidence-reader .pin-button.active {
  background: rgba(43, 38, 32, 0.1) !important;
}
.board-note-detail .evidence-reader .pin-button:hover {
  background: rgba(0,0,0,0.1) !important;
}

/* Ensure no inner boxes block the vintage paper texture */
.board-note-detail .chat-message .bubble,
.board-note-detail .terminal-lines,
.board-note-detail .paper-sheet,
.board-note-detail .mail-body {
  background: transparent !important;
  border: none !important;
}

/* Make chat bubbles look like ink outlines or subtle boxes */
.board-note-detail .chat-message .bubble {
  border: 1px dashed rgba(43, 38, 32, 0.4) !important;
  border-radius: 8px !important;
}
`;

fs.appendFileSync('app/globals.css', css);
