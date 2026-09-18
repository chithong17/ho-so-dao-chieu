const fs = require('fs');
const css = `
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Patrick+Hand&display=swap');

/* Vintage Full-Screen Overrides */
.game-root:has(.room-container) .game-header {
  display: none !important;
}

.room-container { 
  position: fixed !important; 
  inset: 0 !important; 
  height: 100vh !important; 
  width: 100vw !important; 
  z-index: 50 !important; 
}

.exit-room-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0,0,0,0.5);
  color: white;
  border: 2px solid white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-family: 'Patrick Hand', cursive;
  font-size: 20px;
  cursor: pointer;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
}
.exit-room-btn:hover {
  background: white;
  color: black;
}

/* Modal UI Redesign - Paper & Vintage */
.modal-overlay.point-and-click dialog {
  background: #e5d9c5 !important; /* Vintage paper color */
  color: #2b2620 !important; /* Dark brown ink */
  border: 4px solid #3e3222 !important;
  border-radius: 2px !important;
  box-shadow: 12px 12px 0px rgba(0,0,0,0.85) !important; /* Hard 2D shadow */
  font-family: 'Patrick Hand', cursive !important;
  font-size: 18px !important;
}

/* Typewriter font for Laptop */
.investigation:has(.app-dock[aria-label="Laptop"]) {
  font-family: 'Courier Prime', monospace !important;
}
.investigation:has(.app-dock[aria-label="Laptop"]) button,
.investigation:has(.app-dock[aria-label="Laptop"]) input {
  font-family: 'Courier Prime', monospace !important;
}

/* General Typography overrides inside modal */
.modal-overlay.point-and-click h1, 
.modal-overlay.point-and-click h2, 
.modal-overlay.point-and-click h3,
.modal-overlay.point-and-click strong {
  font-family: inherit;
  color: #1a1612 !important;
}

.modal-overlay.point-and-click button {
  color: #2b2620 !important;
  border-color: #3e3222 !important;
  font-family: inherit;
}
.modal-overlay.point-and-click button:hover {
  background: rgba(62, 50, 34, 0.1) !important;
}
.modal-overlay.point-and-click button.active {
  background: #3e3222 !important;
  color: #e5d9c5 !important;
}

.modal-overlay.point-and-click input {
  background: transparent !important;
  border: none !important;
  border-bottom: 2px dashed #3e3222 !important;
  color: #2b2620 !important;
  font-family: inherit;
  outline: none;
}
.modal-overlay.point-and-click input::placeholder {
  color: rgba(43, 38, 32, 0.5);
}

/* Specific component tweaks */
.evidence-library {
  border-right: 2px dashed #3e3222 !important;
  background: rgba(255,255,255,0.2) !important;
}
.evidence-item {
  border-bottom: 1px solid rgba(62, 50, 34, 0.2) !important;
}
.app-dock {
  border-right: 2px solid #3e3222 !important;
  background: rgba(0,0,0,0.05) !important;
}

/* Notebook / Board tweaks */
.workspace-page {
  background: transparent !important;
}
.claim-card {
  background: rgba(255,255,255,0.5) !important;
  border: 2px solid #3e3222 !important;
  box-shadow: 4px 4px 0 rgba(62, 50, 34, 0.8) !important;
  border-radius: 0 !important;
}
.pinned-grid button {
  background: #fdfbf7 !important;
  border: 2px solid #3e3222 !important;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.3) !important;
  transform: rotate(-2deg);
  border-radius: 0 !important;
}
.pinned-grid button:nth-child(even) {
  transform: rotate(1.5deg);
}

.modal-head {
  border-bottom: 3px double #3e3222 !important;
  margin-bottom: 10px !important;
  padding-bottom: 10px !important;
  background: rgba(0,0,0,0.05);
}

/* Hide original background color */
.investigation {
  background: transparent !important;
}
`;
fs.appendFileSync('app/globals.css', css);
