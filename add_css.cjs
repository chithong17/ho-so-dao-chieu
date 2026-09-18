const fs = require('fs');
const css = `
/* 2D Game Styles */
.room-container { width: 100%; height: calc(100vh - 80px); display: flex; justify-content: center; align-items: center; background: #050505; overflow: hidden; position: relative; }
.room-scene { width: 960px; height: 540px; position: relative; box-shadow: 0 0 50px rgba(0,0,0,1); cursor: crosshair; flex-shrink: 0; }
.room-bg { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
.character-sprite { position: absolute; bottom: 30px; margin-left: -60px; width: 120px; height: auto; pointer-events: none; transition: transform 1s cubic-bezier(0.25, 0.1, 0.25, 1); transform-origin: bottom center; z-index: 10; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.5)); }
.character-sprite img { width: 100%; display: block; }
.interactable-obj { position: absolute; background: transparent; border: 1px dashed rgba(255,255,255,0); cursor: pointer; z-index: 5; transition: all 0.2s; }
.interactable-obj:hover { border: 1px dashed rgba(217, 164, 65, 0.4); background: rgba(217, 164, 65, 0.05); }
.interactable-hint { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 5px; color: var(--gold); opacity: 0; transition: opacity 0.2s; pointer-events: none; font-size: 11px; font-family: Consolas, monospace; text-align: center; text-shadow: 0 2px 4px #000; }
.interactable-obj:hover .interactable-hint { opacity: 1; }
.game-root.presenter .room-container { height: calc(100vh - 60px); }
/* Modal overrides for 2D mode */
.modal-overlay.point-and-click { background: rgba(0,0,0,0.8); z-index: 100; }
.modal-overlay.point-and-click dialog { width: 90vw; height: 90vh; max-height: 90vh; display: flex; flex-direction: column; }
`;
fs.appendFileSync('app/globals.css', css);
