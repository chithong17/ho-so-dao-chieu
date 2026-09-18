const fs = require('fs');

let game = fs.readFileSync('components/Game.tsx', 'utf8');

const phoneLibraryStr = `
const phoneLibrary = (
  <aside className="evidence-library phone-library-mockup" style={{flex:1, borderRight:'none', maxWidth:'100%', display:'flex', flexDirection:'column', height:'100%', padding:0}}>
    <div className="phone-status-bar" style={{display:'flex', justifyContent:'space-between', padding:'4px 8px', fontSize:'9px', color:'#6a9c62', borderBottom:'1px solid rgba(85,255,85,0.2)'}}>
      <span className="signal">.ıIl</span>
      <span className="title" style={{letterSpacing:'1px', textTransform:'uppercase'}}>Chứng cứ</span>
      <span className="battery">🔋 22:14</span>
    </div>
    <div className="phone-tabs" style={{display:'flex', borderBottom:'1px solid rgba(85,255,85,0.2)'}}>
      <button style={{flex:1, padding:'6px 0', fontSize:'8px', background: mobileTab==='files'?'rgba(85,255,85,0.2)':'transparent', color:'#55ff55', border:'none', outline:'none'}} onClick={() => setMobileTab('files')}>DANH SÁCH</button>
      <button style={{flex:1, padding:'6px 0', fontSize:'8px', background: mobileTab==='read'?'rgba(85,255,85,0.2)':'transparent', color:'#55ff55', border:'none', outline:'none'}} onClick={() => { if(selected) setMobileTab('read') }}>ĐỌC</button>
    </div>
    {mobileTab === 'files' ? (
      <>
        <div className="phone-search-row" style={{display:'flex', alignItems:'center', padding:'6px'}}>
          <label className="search-box" style={{flex:1, display:'flex', alignItems:'center', border:'1px solid rgba(85,255,85,0.4)', borderRadius:'8px', padding:'3px 6px', margin:0}}>
            <Search size={12} color="rgba(85,255,85,0.7)"/>
            <input aria-label="Tìm chứng cứ" placeholder="Tìm trong hồ sơ..." value={query} onChange={e=>setQuery(e.target.value)} style={{background:'transparent', border:'none', color:'#55ff55', fontSize:'9px', marginLeft:'6px', width:'100%', outline:'none'}}/>
          </label>
          <span className="count" style={{fontSize:'8px', color:'rgba(85,255,85,0.7)', marginLeft:'8px', whiteSpace:'nowrap'}}>{visible.length} / 17</span>
        </div>
        <div className="evidence-list custom-scroll" style={{flex:1, overflowY:'auto', padding:'0 6px', margin:0}}>
          {list.map(e => {
            const Icon = icons[e.app];
            const isActive = state.selectedEvidence === e.id && view === 'evidence';
            return (
              <button className={\`evidence-item \${isActive ? 'active' : ''}\`} key={e.id} onClick={() => { choose(e.id); setMobileTab('read'); }} style={{display:'flex', alignItems:'center', width:'100%', padding:'6px 4px', background:isActive?'rgba(85,255,85,0.1)':'transparent', border:isActive?'1px solid rgba(85,255,85,0.8)':'none', borderBottom:isActive?'none':'1px solid rgba(85,255,85,0.1)', borderRadius:isActive?'4px':'0', textAlign:'left', gap:'8px', cursor:'pointer'}}>
                <span className="item-left" style={{color:isActive?'#55ff55':'#9ecc8f'}}><Icon size={16}/></span>
                <span className="item-text" style={{flex:1, display:'flex', alignItems:'flex-start', gap:'6px'}}>
                  <small style={{fontSize:'9px', color:isActive?'#55ff55':'#9ecc8f', marginTop:'2px', flexShrink:0}}>{e.id}</small>
                  <strong style={{fontSize:'9.5px', color:isActive?'#55ff55':'#9ecc8f', fontWeight:'normal', lineHeight:1.3, wordBreak:'break-word', whiteSpace:'normal'}}>{e.title}</strong>
                </span>
                <span className="item-right" style={{color:'rgba(85,255,85,0.5)', fontSize:'10px'}}>&gt;</span>
              </button>
            );
          })}
          {!list.length && <p className="empty-list" style={{fontSize:'9px', textAlign:'center', marginTop:'10px', color:'rgba(85,255,85,0.5)'}}>Không có chứng cứ.</p>}
        </div>
      </>
    ) : (
      <main className="reader-column custom-scroll" style={{flex:1, overflowY:'auto', padding:'10px'}}>
        <EvidenceReader item={selected}/>
      </main>
    )}
  </aside>
);

return <><EscapeRoom`;

game = game.replace('return <><EscapeRoom', phoneLibraryStr);

// Use a regex to precisely replace JUST the phone conditional rendering part.
const regex = /\{\(activeObj==='phone'\).*?\}\<\/main\>\<\/\>\}/;
game = game.replace(regex, "{(activeObj==='phone')&&<>{phoneLibrary}</>}");

fs.writeFileSync('components/Game.tsx', game);
console.log('Fixed Game.tsx with exact regex match!');
