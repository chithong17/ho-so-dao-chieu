const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const fixMoreBlackSpots = `

/* ===========================================
   FIX DOC AND CHAT BLACK SPOTS IN FILES UI
=========================================== */

/* Document / Paper Sheet */
.modal-overlay.point-and-click dialog.ui-files .paper-sheet {
  background: #fdfbf7 !important; /* paper color */
  border-top: none !important;
}
.modal-overlay.point-and-click dialog.ui-files .paper-sheet * {
  color: #333 !important;
}
.modal-overlay.point-and-click dialog.ui-files .paper-rule {
  border-top: 1px dashed #ccc !important;
}
.modal-overlay.point-and-click dialog.ui-files .paper-stamp {
  border: 2px solid #b71c1c !important;
  color: #b71c1c !important;
}
.modal-overlay.point-and-click dialog.ui-files .paper-stamp * {
  color: #b71c1c !important;
}

/* Chat Compose (Bottom bar with lock) */
.modal-overlay.point-and-click dialog.ui-files .chat-compose {
  background: #f0ebe1 !important; /* manila footer */
  color: #555 !important;
  border-top: 1px solid #ccc !important;
}
.modal-overlay.point-and-click dialog.ui-files .chat-compose * {
  color: #555 !important;
}

/* Chat Bubbles */
.modal-overlay.point-and-click dialog.ui-files .chat-message .bubble {
  background: #fff !important;
  border: 1px solid #e0e0e0 !important;
  border-radius: 8px !important;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important;
}
.modal-overlay.point-and-click dialog.ui-files .chat-message .bubble * {
  color: #222 !important;
}

.modal-overlay.point-and-click dialog.ui-files .chat-message.outgoing .bubble {
  background: #dcf8c6 !important; /* Whatsapp green */
  border: 1px solid #c0e0a5 !important;
}

/* Checkmarks in chat */
.modal-overlay.point-and-click dialog.ui-files .chat-message .bubble small svg {
  color: #5fb05f !important;
}

/* Crop notice (E01) */
.modal-overlay.point-and-click dialog.ui-files .crop-notice * {
  color: #999 !important;
}
.modal-overlay.point-and-click dialog.ui-files .cut-line {
  border-top: 1px dashed #ccc !important;
}

/* Table inside document */
.modal-overlay.point-and-click dialog.ui-files .paper-sheet table {
  border-collapse: collapse !important;
}
.modal-overlay.point-and-click dialog.ui-files .paper-sheet th,
.modal-overlay.point-and-click dialog.ui-files .paper-sheet td {
  border: 1px solid #ccc !important;
  background: transparent !important;
}

/* Make sure the main right-pane wrapper for chat is white */
.modal-overlay.point-and-click dialog.ui-files .chat-messages {
  background: #fdfbf7 !important;
}

`;

css += fixMoreBlackSpots;
fs.writeFileSync('app/globals.css', css);
console.log('Fixed doc and chat spots!');
