const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css += `

/* ===========================================
   FIX READER SIZING & READABILITY
=========================================== */

/* Ensure the reader column takes full height */
.modal-overlay.point-and-click dialog.ui-phone .reader-column {
  display: flex !important;
  flex-direction: column !important;
  flex: 1 !important;
  height: 100% !important;
}

.modal-overlay.point-and-click dialog.ui-phone .evidence-reader {
  display: flex !important;
  flex-direction: column !important;
  flex: 1 !important;
  height: 100% !important;
}

/* Ensure the app inside takes full height */
.modal-overlay.point-and-click dialog.ui-phone .evidence-reader > div {
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
}

.modal-overlay.point-and-click dialog.ui-phone .chat-app,
.modal-overlay.point-and-click dialog.ui-phone .mail-app,
.modal-overlay.point-and-click dialog.ui-phone .document-app,
.modal-overlay.point-and-click dialog.ui-phone .terminal-app {
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
}

.modal-overlay.point-and-click dialog.ui-phone .mail-body,
.modal-overlay.point-and-click dialog.ui-phone .chat-messages,
.modal-overlay.point-and-click dialog.ui-phone .paper-sheet,
.modal-overlay.point-and-click dialog.ui-phone .terminal-lines {
  flex: 1 !important;
  overflow-y: auto !important;
}


/* Make text readable instead of 9px! */
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .mail-subject h2,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .paper-sheet h2 {
  font-size: 14px !important;
  line-height: 1.4 !important;
  margin-bottom: 8px !important;
}

.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .mail-body,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .mail-body *,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .bubble p,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .paper-sheet p,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .terminal-lines code,
.modal-overlay.point-and-click dialog.ui-phone .evidence-reader p {
  font-size: 12px !important;
  line-height: 1.5 !important;
}

.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .mail-sender strong,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .chat-header strong,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .message-author {
  font-size: 12px !important;
}

.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .mail-sender time,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .chat-message time {
  font-size: 10px !important;
}

/* Adjust padding so it doesn't look squished */
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .mail-toolbar,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .document-toolbar {
  padding: 8px !important;
}

.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .mail-path,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .mail-subject,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .mail-sender,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .mail-body,
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .paper-sheet {
  padding: 10px !important;
}

/* Tweak bubbles */
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .bubble {
  padding: 8px 10px !important;
}
.modal-overlay.point-and-click dialog.ui-phone .inner-content.mobile-read .chat-message {
  margin-bottom: 12px !important;
}
`;

fs.writeFileSync('app/globals.css', css);
console.log('Appended fix for reader sizes!');
