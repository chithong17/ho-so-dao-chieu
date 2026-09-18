const fs = require('fs');

// 1. Update Game.tsx
let gameCode = fs.readFileSync('components/Game.tsx', 'utf8');
const oldPhoneRender = `{(activeObj==='phone')&&<>{library}<main className="reader-column" style={{flex:2}}><EvidenceReader item={selected}/></main></>}`;
const newPhoneRender = `{(activeObj==='phone')&&<div style={{display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden'}}><div className="phone-tabs" style={{display: 'flex', gap: '5px', marginBottom: '10px', flexShrink: 0}}><button onClick={() => setMobileTab('library')} style={{flex: 1, padding: '5px', background: mobileTab==='library' ? '#33ff33' : 'transparent', color: mobileTab==='library' ? '#000' : '#33ff33', border: '1px solid #33ff33', fontFamily: 'monospace'}}>DANH SÁCH</button><button onClick={() => setMobileTab('read')} style={{flex: 1, padding: '5px', background: mobileTab==='read' ? '#33ff33' : 'transparent', color: mobileTab==='read' ? '#000' : '#33ff33', border: '1px solid #33ff33', fontFamily: 'monospace'}}>ĐỌC</button></div><div style={{flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column'}}>{mobileTab === 'library' && library}{mobileTab === 'read' && <main className="reader-column" style={{flex:1, overflowY: 'auto', display: 'block'}}><EvidenceReader item={selected}/></main>}</div></div>}`;

gameCode = gameCode.replace(oldPhoneRender, newPhoneRender);
fs.writeFileSync('components/Game.tsx', gameCode);
console.log('Updated Game.tsx phone rendering logic');

// 2. Update globals.css
let css = fs.readFileSync('app/globals.css', 'utf8');
const phoneCSSFix = `
/* Phone Tabs Fix */
.modal-overlay.point-and-click dialog.ui-phone .evidence-library {
  max-height: 100% !important;
  border-bottom: none !important;
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
  flex: 1 !important;
  overflow-y: auto !important;
}

.modal-overlay.point-and-click dialog.ui-phone .phone-tabs button {
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 2px !important;
  font-weight: bold !important;
  text-transform: uppercase !important;
}

.modal-overlay.point-and-click dialog.ui-phone .phone-tabs button:hover {
  background: rgba(51, 255, 51, 0.2) !important;
}

/* Ensure Evidence List inside Library scrolls */
.modal-overlay.point-and-click dialog.ui-phone .evidence-list {
  overflow-y: auto !important;
  flex: 1 !important;
}
`;

css += phoneCSSFix;
fs.writeFileSync('app/globals.css', css);
console.log('Added phone tab CSS fixes');
