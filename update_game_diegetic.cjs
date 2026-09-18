const fs = require('fs');
let code = fs.readFileSync('components/Game.tsx', 'utf8');

const newInvestigation = `function Investigation(){const {state,dispatch,setHome}=useGame();const [filter,setFilter]=useState<'all'|Evidence['app']>('all'),[query,setQuery]=useState(''),[view,setView]=useState<'evidence'|'timeline'|'board'>('evidence'),[mobileTab,setMobileTab]=useState('read');
 const [activeObj,setActiveObj]=useState<string|null>(null);
 const visible=evidence.filter(e=>e.chapter<=state.unlocked),list=visible.filter(e=>(filter==='all'||e.app===filter)&&(e.title+' '+e.id+' '+e.author).toLocaleLowerCase('vi').includes(query.toLocaleLowerCase('vi')));
 const selected=evidence.find(e=>e.id===state.selectedEvidence)!;
 const choose=(id:string)=>{dispatch({type:'evidence',id});setView('evidence');setMobileTab('read');};
 
 const handleInteract = (objId: string) => {
   setActiveObj(objId);
   if (objId === 'phone') setFilter('chat');
   else if (objId === 'laptop') setFilter('mail');
   else if (objId === 'files') setFilter('all');
 };

 const library = (
   <aside className="evidence-library" style={{flex:1,borderRight:'none',maxWidth:'300px'}}><div className="library-head"><strong>Chứng cứ</strong><span>{visible.length}<small> / 17</small></span></div><label className="search-box"><Search size={15}/><input aria-label="Tìm chứng cứ" placeholder="Tìm trong hồ sơ…" value={query} onChange={e=>setQuery(e.target.value)}/></label><div className="evidence-list">{list.map(e=>{const Icon=icons[e.app];return <button className={\`evidence-item \${state.selectedEvidence===e.id&&view==='evidence'?'active':''}\`} key={e.id} onClick={()=>choose(e.id)}><span className="evidence-item-icon"><Icon size={17}/></span><span><small>{e.id} <span>{e.author}</span></small><strong>{e.title}</strong><em>{e.summary}</em></span><span className="item-state">{state.pinned.includes(e.id)?<Pin size={12}/>:!state.opened.includes(e.id)?<i/>:<Check size={12}/>}</span></button>;})}{!list.length&&<p className="empty-list">Không có chứng cứ phù hợp.</p>}</div></aside>
 );
 
 return <><EscapeRoom onInteract={handleInteract} onExit={()=>setHome(true)}/>{activeObj&&<div className="modal-overlay point-and-click" onClick={(e)=>{if(e.target===e.currentTarget)setActiveObj(null)}}><dialog open className={\`ui-\${activeObj}\`}><div className="modal-head" style={{marginBottom:0,paddingBottom:0,borderBottom:'none',position:'absolute',top:'10px',right:'20px',zIndex:100}}><button className="icon-button" onClick={()=>setActiveObj(null)} style={{background:'rgba(255,255,255,0.8)',borderRadius:'50%',width:'40px',height:'40px',display:'flex',justifyContent:'center',alignItems:'center'}}>X</button></div><div className={\`investigation mobile-\${mobileTab} inner-content\`} style={{flex:1,minHeight:0,display:'flex',gap:'10px'}}>
 {(activeObj==='phone')&&<>{library}<main className="reader-column" style={{flex:2}}><EvidenceReader item={selected}/></main></>}
 {(activeObj==='laptop')&&<>{library}<main className="reader-column" style={{flex:2}}><EvidenceReader item={selected}/></main></>}
 {(activeObj==='files')&&<>{library}<main className="reader-column" style={{flex:2}}><EvidenceReader item={selected}/></main></>}
 {activeObj==='notebook'&&<><TaskPanel/></>}
 {activeObj==='board'&&<main className="reader-column" style={{flex:1}}><section className="workspace-page"><span className="eyebrow">NHẬN ĐỊNH & CĂN CỨ</span><h2>Bảng lập luận / Dòng thời gian</h2><h3>Chứng cứ đã ghim</h3><div className="pinned-grid">{state.pinned.map(id=>{const e=evidence.find(e=>e.id===id)!;return <button key={id} onClick={()=>choose(id)}><span>{id}<Pin size={14}/></span><strong>{e.title}</strong><p>{e.summary}</p></button>;})}{!state.pinned.length&&<p className="muted">Mở chứng cứ rồi chọn “Ghim chứng cứ” để đặt lên bảng.</p>}</div><h3>Lịch sử lập luận</h3>{tasks.filter(t=>state.answers[t.id]).map(t=>{const score=evaluateChallenge(t.id,state.answers[t.id]).score;return <div className="claim-card" key={t.id}><button onClick={()=>dispatch({type:'task',id:t.id})}><span>{t.id} · {score===4?'Có căn cứ':'Cần bổ sung'}</span><strong>{t.title}</strong><ArrowRight size={17}/></button><p>{state.attempts[t.id]?.length??0} lần ghi nhận · lần đầu {state.attempts[t.id]?.[0].evaluation.score??0}/4 → hiện tại {score}/4</p>{state.notes[t.id]&&<blockquote>{state.notes[t.id]}</blockquote>}</div>;})}{!Object.keys(state.answers).length&&<p className="muted">Các lập luận xuất hiện ở đây sau khi được ghi nhận.</p>}</section></main>}</div></dialog></div>}</>;
}`;

code = code.replace(/function Investigation\(\)\{[\s\S]*?<\/dialog><\/div>\}\<\/>;\n\}/, newInvestigation);
fs.writeFileSync('components/Game.tsx', code);
