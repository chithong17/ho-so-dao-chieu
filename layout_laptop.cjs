const fs = require('fs');

const css = `
/* -----------------------------------------------------
   LAPTOP FILE EXPLORER MOCKUP LAYOUT
----------------------------------------------------- */

/* 1. Layout containers */
.modal-overlay.point-and-click dialog.ui-laptop .inner-content {
  display: flex !important;
  gap: 25px !important;
  background: rgba(5, 25, 5, 0.7) !important;
}

/* 2. Left Sidebar (EvidenceLibrary) */
.modal-overlay.point-and-click dialog.ui-laptop .evidence-library {
  flex: 0 0 35% !important;
  max-width: 35% !important;
  border-right: 1px dashed rgba(85, 255, 85, 0.3) !important;
  padding-right: 20px !important;
  display: flex !important;
  flex-direction: column !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .library-head {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  margin-bottom: 15px !important;
  font-weight: bold !important;
  color: #55ff55 !important;
  font-size: 1.1rem !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .search-box {
  border: 1px dashed rgba(85, 255, 85, 0.5) !important;
  border-radius: 6px !important;
  padding: 8px 12px !important;
  margin-bottom: 20px !important;
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .search-box input {
  background: transparent !important;
  border: none !important;
  color: #55ff55 !important;
  outline: none !important;
  width: 100% !important;
  font-family: inherit !important;
}
.modal-overlay.point-and-click dialog.ui-laptop .search-box input::placeholder {
  color: rgba(85, 255, 85, 0.4) !important;
}

/* 3. List Items */
.modal-overlay.point-and-click dialog.ui-laptop .evidence-list {
  display: flex !important;
  flex-direction: column !important;
  gap: 10px !important;
  overflow-y: auto !important;
  padding-right: 5px !important; /* space for scrollbar */
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-list::-webkit-scrollbar {
  width: 4px;
}
.modal-overlay.point-and-click dialog.ui-laptop .evidence-list::-webkit-scrollbar-thumb {
  background: rgba(85, 255, 85, 0.3);
  border-radius: 4px;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-item {
  display: flex !important;
  align-items: flex-start !important;
  gap: 12px !important;
  padding: 12px !important;
  border: 1px dashed rgba(85, 255, 85, 0.2) !important;
  border-radius: 8px !important;
  text-align: left !important;
  background: transparent !important;
  cursor: pointer !important;
  position: relative !important;
  transition: all 0.2s ease;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-item:hover {
  border-color: rgba(85, 255, 85, 0.5) !important;
  background: rgba(85, 255, 85, 0.05) !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-item.active {
  border: 1px solid #55ff55 !important;
  box-shadow: inset 0 0 15px rgba(85, 255, 85, 0.15), 0 0 15px rgba(85, 255, 85, 0.2) !important;
  background: rgba(85, 255, 85, 0.1) !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-item-icon {
  margin-top: 2px !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-item span:nth-child(2) {
  display: flex !important;
  flex-direction: column !important;
  gap: 4px !important;
  flex: 1 !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-item strong {
  font-size: 0.95rem !important;
  color: #55ff55 !important;
  font-weight: bold !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-item small {
  font-size: 0.8rem !important;
  color: rgba(85, 255, 85, 0.7) !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-item em {
  font-size: 0.75rem !important;
  color: rgba(85, 255, 85, 0.5) !important;
  font-style: normal !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  margin-top: 4px !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .item-state {
  position: absolute !important;
  top: 12px !important;
  right: 12px !important;
}

/* 4. Right Panel (EvidenceReader) */
.modal-overlay.point-and-click dialog.ui-laptop .reader-column {
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  border: none !important;
  overflow: hidden !important;
}

.modal-overlay.point-and-click dialog.ui-laptop .evidence-reader {
  display: flex !important;
  flex-direction: column !important;
  gap: 20px !important;
  height: 100% !important;
}

/* The top header box */
.modal-overlay.point-and-click dialog.ui-laptop .reader-path {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 15px 20px !important;
  border: 1px solid #55ff55 !important;
  border-radius: 8px !important;
  background: rgba(85, 255, 85, 0.05) !important;
  box-shadow: inset 0 0 10px rgba(85, 255, 85, 0.1) !important;
}

/* Pin button */
.modal-overlay.point-and-click dialog.ui-laptop .pin-button {
  background: transparent !important;
  border: 1px dashed #55ff55 !important;
  border-radius: 4px !important;
  padding: 6px 15px !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  cursor: pointer !important;
  font-family: inherit !important;
  color: #55ff55 !important;
  transition: all 0.2s ease;
}
.modal-overlay.point-and-click dialog.ui-laptop .pin-button:hover {
  background: rgba(85, 255, 85, 0.1) !important;
}
.modal-overlay.point-and-click dialog.ui-laptop .pin-button.active {
  background: rgba(85, 255, 85, 0.2) !important;
  border-style: solid !important;
  box-shadow: 0 0 10px rgba(85, 255, 85, 0.2) !important;
}

/* Remove default backgrounds in inner components */
.modal-overlay.point-and-click dialog.ui-laptop .mail-app,
.modal-overlay.point-and-click dialog.ui-laptop .chat-app,
.modal-overlay.point-and-click dialog.ui-laptop .terminal-app,
.modal-overlay.point-and-click dialog.ui-laptop .document-app {
  border: none !important;
}
`;
fs.appendFileSync('app/globals.css', css);
