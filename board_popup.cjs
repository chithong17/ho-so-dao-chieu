const fs = require('fs');

// 1. Modify Game.tsx to add the popup overlay
let code = fs.readFileSync('components/Game.tsx', 'utf8');

const original = `</section></main>}</div></dialog></div>}</>;`;
const replacement = `</section></main>}
  {activeObj==='board' && view==='evidence' && state.selectedEvidence && (
    <div className="board-note-overlay" style={{position:'absolute', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', zIndex:200, display:'flex', justifyContent:'center', alignItems:'center'}} onClick={(e)=>{if(e.target===e.currentTarget)setView('board');}}>
      <div className="board-note-detail" style={{background:'#fdf2cc', padding:'40px', borderRadius:'4px', maxWidth:'600px', width:'90%', maxHeight:'90%', overflow:'auto', position:'relative', boxShadow:'0 10px 30px rgba(0,0,0,0.8)'}}>
        <button onClick={()=>setView('board')} style={{position:'absolute', top:'15px', right:'15px', background:'transparent', border:'none', fontSize:'24px', cursor:'pointer', color:'#c0392b', fontWeight:'bold'}}>X</button>
        <EvidenceReader item={evidence.find(e=>e.id===state.selectedEvidence)!} />
      </div>
    </div>
  )}
</div></dialog></div>}</>;`;

code = code.replace(original, replacement);
fs.writeFileSync('components/Game.tsx', code);

// 2. Modify CSS to truncate note text
const css = `
/* Truncate text on the board notes */
.modal-overlay.point-and-click dialog.ui-board .pinned-grid button p {
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

/* Style the popup note detail */
.board-note-detail {
  font-family: 'Patrick Hand', cursive !important;
  color: #1a1a1a !important;
}
.board-note-detail * {
  color: #1a1a1a !important;
  text-shadow: none !important;
}
.board-note-detail .evidence-meta {
  border-bottom: 2px dashed rgba(0,0,0,0.2) !important;
  padding-bottom: 10px !important;
  margin-bottom: 15px !important;
}
.board-note-detail .evidence-content {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
}
`;
fs.appendFileSync('app/globals.css', css);
