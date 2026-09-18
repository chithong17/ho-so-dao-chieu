import React from 'react';
import { useGame } from './GameProvider';

import { Search, FileText } from 'lucide-react';

export default function PhysicalFiles({ query, setQuery, choose }: { query: string, setQuery: (q:string)=>void, choose: (id:string)=>void }) {
  const { state, config } = useGame();
  const {evidence,sources:evidenceSources}=config;
  
  
  const fileEvidence = evidence.filter(e => evidenceSources[e.id] === 'files' && e.chapter <= state.unlocked);
  const found = fileEvidence.filter(e => (e.title+' '+e.id).toLowerCase().includes(query.toLowerCase()));
  const selected = evidence.find(e => e.id === state.selectedEvidence) || fileEvidence[0];

  return (
    <div className="physical-mockup-wrapper" style={{display:'flex', width:'100%', height:'100%', position: 'relative', paddingTop: '8%', paddingBottom: '8%'}}>
      <style>{`
        /* Override global modal styles for the dossier */
        .modal-overlay.point-and-click dialog.ui-files {
          aspect-ratio: 3 / 2 !important;
          background: url('/dossier_wide.jpg') center / 100% 100% no-repeat !important;
        }
        .modal-overlay.point-and-click dialog.ui-files .inner-content {
          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          left: 0 !important;
          border: none !important;
          box-shadow: none !important;
          background: transparent !important;
          overflow: visible !important;
        }

        .modal-overlay.point-and-click dialog.ui-files .physical-binder-left * { text-shadow: none; }
        .modal-overlay.point-and-click dialog.ui-files .physical-paper-right * { text-shadow: none !important; }
        .modal-overlay.point-and-click dialog.ui-files .physical-paper-right .paper-text { color: #1a1a1a !important; }
        .modal-overlay.point-and-click dialog.ui-files .content-badge { color: #dfcfa4 !important; }
        .modal-overlay.point-and-click dialog.ui-files .physical-binder-left input::placeholder { color: rgba(248, 241, 228, 0.6) !important; }
        
        /* Note Paper Styles (HIGH SPECIFICITY to beat globals.css) */
        .modal-overlay.point-and-click dialog.ui-files button.btn-item { 
          color: #2a2015 !important;
          background: url('https://www.transparenttextures.com/patterns/cream-paper.png') #d1c1a9 !important;
          position: relative;
          transform: rotate(1deg);
          box-shadow: 2px 3px 5px rgba(0,0,0,0.5), inset 0 0 10px rgba(0,0,0,0.1) !important;
        }
        
        .modal-overlay.point-and-click dialog.ui-files button.btn-item:nth-child(odd) { 
          transform: rotate(-1.5deg); 
        }
        
        .modal-overlay.point-and-click dialog.ui-files button.btn-item strong { 
          color: #2a2015 !important; 
        }
        
        .modal-overlay.point-and-click dialog.ui-files button.btn-item:hover {
          background: url('https://www.transparenttextures.com/patterns/cream-paper.png') #e0d0b8 !important;
          transform: scale(1.02) rotate(0deg) !important; 
          z-index: 10;
        }

        .modal-overlay.point-and-click dialog.ui-files button.btn-item.active { 
          background: url('https://www.transparenttextures.com/patterns/cream-paper.png') #ebd7b2 !important;
          color: #111 !important; 
          transform: scale(1.02) rotate(0deg) !important; 
          box-shadow: 3px 5px 10px rgba(0,0,0,0.6), inset 0 0 15px rgba(0,0,0,0.05) !important;
          z-index: 10;
        }
        
        .modal-overlay.point-and-click dialog.ui-files button.btn-item.active strong { 
          color: #111 !important; 
        }
        
        .modal-overlay.point-and-click dialog.ui-files .binder-label { color: #2a2015 !important; }
        
        /* Pushpin effect for active item */
        .modal-overlay.point-and-click dialog.ui-files button.btn-item.active::after {
          content: '';
          position: absolute;
          top: 6px;
          left: 6px;
          width: 8px;
          height: 8px;
          background: #8c2a2a;
          border-radius: 50%;
          box-shadow: inset -2px -2px 4px rgba(0,0,0,0.5), 1px 2px 2px rgba(0,0,0,0.6);
        }
      `}</style>
      
      {/* LEFT BINDER - Dark Leather */}
      <aside className="physical-binder-left" style={{
        flex: '0 0 35%', 
        marginLeft: '13%',
        background: 'transparent', 
        padding: '2% 3% 2% 2%',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{marginBottom: '15px'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
            <div className="binder-label" style={{
              background: '#dfcfa4', 
              padding: '6px 12px', 
              transform: 'rotate(-2deg)', 
              boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
              fontFamily: '"Courier New", Courier, monospace', 
              fontWeight: 'bold',
              fontSize: 'clamp(14px, 2vw, 20px)'
            }}>HỒ SƠ VỤ VIỆC</div>
            <span className="binder-counter" style={{color:'#f8f1e4 !important', fontSize:'clamp(10px, 1.5vw, 14px)', fontFamily:'"Courier New", Courier, monospace'}}>{found.length} / {fileEvidence.length}</span>
          </div>

          <label style={{
            display:'flex', alignItems:'center', background:'rgba(163, 140, 108, 0.2)', 
            border:'1px dashed rgba(223, 207, 164, 0.4)', borderRadius:'2px', 
            padding:'8px 12px', marginTop:'15px'
          }}>
            <Search size={16} color="#dfcfa4"/>
            <input 
              placeholder="Tìm hồ sơ..." 
              value={query} onChange={e=>setQuery(e.target.value)}
              style={{background:'transparent', border:'none', marginLeft:'10px', width:'100%', outline:'none', fontFamily:'"Courier New", Courier, monospace', fontSize:'14px', color: '#f8f1e4'}}
            />
          </label>
        </div>

        <div className="custom-scroll" style={{flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:'12px', paddingRight: '5px', paddingLeft: '5px'}}>
          {found.map(e => {
            const isActive = e.id === selected?.id;
            return (
              <button key={e.id} onClick={() => choose(e.id)} className={`btn-item ${isActive ? 'active' : ''}`} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 14px',
                border: '1px solid rgba(0,0,0,0.2)',
                borderRadius: '1px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.1s'
              }}>
                <div style={{color: isActive ? '#332 !important' : '#2a2015 !important', opacity: isActive ? 1 : 0.8}}>
                  <FileText size={20}/>
                </div>
                <div style={{flex:1}}>
                  <strong style={{display:'block', fontSize:'clamp(12px, 1.5vw, 16px)', fontFamily:'"Courier New", Courier, monospace', color: isActive ? '#111 !important' : '#2a2015 !important'}}>{e.id} - {e.title}</strong>
                </div>
              </button>
            )
          })}
        </div>
      </aside>

      {/* RIGHT PAPER AREA - Yellow Paper */}
      <main className="physical-paper-right" style={{
        flex: '0 0 33%',
        marginLeft: '4%', // Increased to shift content right
        background: 'transparent',
        padding: '2% 2% 2% 4%', // Increased left padding
        display: 'flex',
        flexDirection: 'column',
      }}>
        {selected ? (
          <div className="custom-scroll paper-text" style={{fontFamily:'Georgia, serif', flex: 1, overflowY:'auto', paddingRight:'12px'}}>
            <div style={{display:'flex', justifyContent:'space-between', borderBottom:'2px dashed #7a6a5b', paddingBottom:'12px', marginBottom:'20px'}}>
              <div>
                <div style={{fontSize:'clamp(12px, 1.5vw, 16px)', fontWeight:'bold', fontFamily:'"Courier New", Courier, monospace'}}>HỒ SƠ SỐ: 114</div>
                <div style={{fontSize:'clamp(12px, 1.5vw, 16px)', fontFamily:'"Courier New", Courier, monospace'}}>DỰ ÁN: BÁO CÁO CUỐI KỲ</div>
              </div>
              <div style={{color:'#b71c1c !important', fontWeight:'bold', fontSize:'clamp(14px, 2vw, 20px)', letterSpacing:'2px', fontFamily:'"Courier New", Courier, monospace', transform: 'rotate(-2deg)'}}>
                [ TÀI LIỆU ]
              </div>
            </div>

            <h1 style={{fontSize:'clamp(16px, 2.1vw, 22px)', fontWeight:'bold', marginBottom:'20px', lineHeight:1.3}}>
              {selected.id} - {selected.title}
            </h1>

            <table style={{width:'100%', fontSize:'clamp(12px, 1.5vw, 15px)', marginBottom:'20px', borderSpacing:'0 8px', borderCollapse:'separate', fontFamily:'"Courier New", Courier, monospace'}}>
              <tbody>
                <tr><td style={{width:'100px', fontWeight:'bold'}}>Loại:</td><td>{selected.app === 'mail' ? 'Thông báo' : selected.app === 'chat' ? 'Tin nhắn' : 'Hồ sơ'}</td></tr>
                <tr><td style={{fontWeight:'bold'}}>Ngày:</td><td>15/09/2026</td></tr>
                <tr><td style={{fontWeight:'bold'}}>Nguồn:</td><td>{selected.author}</td></tr>
              </tbody>
            </table>

            <div className="content-badge" style={{background:'#3e3124', display:'inline-block', padding:'4px 12px', marginBottom:'20px', fontWeight:'bold', fontSize:'clamp(12px, 1.6vw, 16px)', fontFamily:'"Courier New", Courier, monospace', transform:'rotate(-1deg)'}}>
              NỘI DUNG
            </div>

            <div className="physical-content" style={{fontSize:'clamp(13px, 1.6vw, 16px)', lineHeight:'1.7'}}>
              {selected.body.map((p,i) => <p key={i} style={{marginBottom:'15px'}}>{p}</p>)}
              {selected.table && (
                 <table style={{width:'100%', borderCollapse:'collapse', marginTop:'15px', fontSize:'clamp(12px, 1.6vw, 16px)'}}>
                   <thead>
                     <tr>{selected.table[0].map((h,i)=><th key={i} style={{border:'1px solid #777', padding:'8px', textAlign:'left', background:'rgba(0,0,0,0.05)'}}>{h}</th>)}</tr>
                   </thead>
                   <tbody>
                     {selected.table.slice(1).map((r,i)=><tr key={i}>{r.map((d,j)=><td key={j} style={{border:'1px solid #777', padding:'8px'}}>{d}</td>)}</tr>)}
                   </tbody>
                 </table>
              )}
            </div>
            
            <div style={{marginTop:'40px', borderTop:'1px dashed #7a6a5b', paddingTop:'20px', textAlign:'center'}}>
               <p style={{fontStyle:'italic', fontSize:'clamp(12px, 1.6vw, 16px)'}}>"Những gì biến mất... thường vẫn còn ở đâu đó."</p>
               <div style={{marginTop:'20px', color:'rgba(183,28,28,0.4) !important', fontSize:'20px', fontWeight:'bold', fontFamily:'"Courier New", Courier, monospace', transform:'rotate(-5deg)', display:'inline-block', border:'3px solid rgba(183,28,28,0.4)', padding:'10px'}}>CASE 114<br/><small style={{fontSize:'12px'}}>FPT UNIVERSITY</small></div>
            </div>
          </div>
        ) : (
          <div style={{textAlign:'center', marginTop:'30%', fontFamily:'"Courier New", Courier, monospace', fontSize:'18px'}}>
            Chọn hồ sơ từ danh sách bên trái.
          </div>
        )}
      </main>
    </div>
  )
}
