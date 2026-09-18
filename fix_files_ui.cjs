const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const fixFilesCSS = `

/* ===========================================
   FILES / EVIDENCE CABINET (TỦ CHỨNG CỨ) UI FIX
=========================================== */

/* Make the dialog look like a physical manila folder */
.modal-overlay.point-and-click dialog.ui-files {
  background: #d4c3a3 !important; /* Manila folder color */
  border: 1px solid #a69168 !important;
  box-shadow: 0 20px 40px rgba(0,0,0,0.7), inset 0 0 100px rgba(139, 115, 85, 0.2) !important;
  border-radius: 4px !important;
  width: 90% !important;
  max-width: 1100px !important;
  height: 85vh !important;
  padding: 0 !important;
  background-image: 
    linear-gradient(90deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 90%, rgba(0,0,0,0.03) 100%),
    linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px) !important;
  background-size: 100% 100%, 100% 4px !important;
}

/* Inner content uses flex row */
.modal-overlay.point-and-click dialog.ui-files .inner-content {
  display: flex !important;
  flex-direction: row !important;
  height: 100% !important;
  padding: 20px !important;
  gap: 30px !important;
}

/* Close button style */
.modal-overlay.point-and-click dialog.ui-files .modal-head button {
  background: #4a3f35 !important;
  color: #fff !important;
  border: 2px solid #fff !important;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3) !important;
  top: -15px !important;
  right: -15px !important;
}

/* ================= Left Column (Library) ================= */
.modal-overlay.point-and-click dialog.ui-files .evidence-library {
  flex: 1 !important;
  max-width: 350px !important;
  background: rgba(255, 255, 255, 0.4) !important;
  border: 1px solid rgba(166, 145, 104, 0.5) !important;
  border-radius: 2px !important;
  padding: 15px !important;
  display: flex !important;
  flex-direction: column !important;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.05) !important;
}

.modal-overlay.point-and-click dialog.ui-files .library-head strong {
  color: #3e3222 !important;
  font-size: 18px !important;
  font-family: Georgia, serif !important;
}

.modal-overlay.point-and-click dialog.ui-files .library-head span {
  color: #6e5c43 !important;
}

.modal-overlay.point-and-click dialog.ui-files .search-box input {
  background: #fff !important;
  border: 1px solid #b5a687 !important;
  color: #333 !important;
  border-radius: 2px !important;
}

/* Evidence items look like index cards or labels */
.modal-overlay.point-and-click dialog.ui-files .evidence-item {
  background: #fff !important;
  border: 1px solid #c9bca0 !important;
  border-left: 4px solid #8c7a56 !important;
  margin-bottom: 8px !important;
  padding: 12px !important;
  box-shadow: 1px 2px 4px rgba(0,0,0,0.05) !important;
  border-radius: 2px !important;
  transition: all 0.2s !important;
}

.modal-overlay.point-and-click dialog.ui-files .evidence-item.active {
  background: #fdfaf5 !important;
  border-left-color: #d32f2f !important;
  box-shadow: 2px 4px 8px rgba(0,0,0,0.1) !important;
  transform: translateX(4px) !important;
}

.modal-overlay.point-and-click dialog.ui-files .evidence-item strong {
  color: #2c2416 !important;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
}

.modal-overlay.point-and-click dialog.ui-files .evidence-item small,
.modal-overlay.point-and-click dialog.ui-files .evidence-item em {
  color: #5a4b36 !important;
}

/* ================= Right Column (Reader) ================= */
.modal-overlay.point-and-click dialog.ui-files .reader-column {
  flex: 2 !important;
  background: transparent !important; /* Remove dark blue */
  border: none !important;
  padding: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  overflow-y: auto !important;
}

/* Reset all text inside the reader column to be dark */
.modal-overlay.point-and-click dialog.ui-files .reader-column * {
  color: #222 !important;
  text-shadow: none !important;
}

/* App wrappers (mail-app, chat-app, etc.) should look like physical paper */
.modal-overlay.point-and-click dialog.ui-files .mail-app,
.modal-overlay.point-and-click dialog.ui-files .chat-app,
.modal-overlay.point-and-click dialog.ui-files .document-app,
.modal-overlay.point-and-click dialog.ui-files .terminal-app {
  background: #fdfbf7 !important;
  border: 1px solid #ccc !important;
  box-shadow: 2px 4px 12px rgba(0,0,0,0.15) !important;
  border-radius: 2px !important;
  margin: 0 auto 20px auto !important;
  width: 100% !important;
  max-width: 800px !important;
}

/* Mail header */
.modal-overlay.point-and-click dialog.ui-files .mail-toolbar {
  background: #f0ebe1 !important;
  border-bottom: 1px solid #ccc !important;
  color: #444 !important;
}

.modal-overlay.point-and-click dialog.ui-files .mail-toolbar * {
  color: #444 !important;
}

.modal-overlay.point-and-click dialog.ui-files .mail-subject {
  border-bottom: 1px dashed #ccc !important;
}

/* Chat wrapper */
.modal-overlay.point-and-click dialog.ui-files .chat-header {
  background: #e6dfd3 !important;
  color: #333 !important;
  border-bottom: 1px solid #ccc !important;
}

.modal-overlay.point-and-click dialog.ui-files .chat-header * {
  color: #333 !important;
}

.modal-overlay.point-and-click dialog.ui-files .bubble.me > div {
  background: #d8e6d3 !important;
  border: 1px solid #b8c9b2 !important;
}
.modal-overlay.point-and-click dialog.ui-files .bubble.them > div {
  background: #fff !important;
  border: 1px solid #ddd !important;
}

/* Scrollbars for files UI */
.modal-overlay.point-and-click dialog.ui-files *::-webkit-scrollbar {
  width: 8px !important;
}
.modal-overlay.point-and-click dialog.ui-files *::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.05) !important;
  border-radius: 4px !important;
}
.modal-overlay.point-and-click dialog.ui-files *::-webkit-scrollbar-thumb {
  background: rgba(166, 145, 104, 0.5) !important;
  border-radius: 4px !important;
}
`;

css += fixFilesCSS;
fs.writeFileSync('app/globals.css', css);
console.log('Applied Evidence Cabinet UI styles!');
