const fs = require('fs');
let game = fs.readFileSync('components/Game.tsx', 'utf8');

const targetStr = `{(activeObj==='phone')&&<>{library}<main className="reader-column" style={{flex:2}}><button type="button" className="phone-back-button" onClick={()=>setMobileTab('files')}>← Danh sách</button><EvidenceReader item={selected}/></main></>}`;

game = game.replace(targetStr, "{(activeObj==='phone')&&<>{phoneLibrary}</>}");

fs.writeFileSync('components/Game.tsx', game);
console.log('Replaced exact matched string!');
