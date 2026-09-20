'use client';
import {useState} from 'react';
import {Volume2,VolumeX,ArrowRight,ArrowUpRight,BookOpen,Check,Clock,FileSearch,FileText,Fingerprint,FlaskConical,FolderClosed,HelpCircle,LayoutGrid,LockKeyhole,Mail,Maximize2,MessageSquare,Pause,Pin,Play,Search,Settings2,ShieldCheck,Terminal,Users} from 'lucide-react';
import { initAudio, playBgm, playSfx, getMute, setMute, ensureBgmPlaying } from '../lib/audio';
import {GameProvider,useGame,type CompetitionBridge} from './GameProvider';
import {Modal,Choice,Avatar} from './ui';
import {taskConcepts,type EvidenceSource} from '../game/config';

import {caseCredibility,chapterReadiness,evaluateChallenge} from '../game/engine';
import type {Evidence,Mode,Difficulty} from '../game/types';
import EvidenceReader,{EvidenceContent} from './EvidenceReader';
import TaskPanel from './TaskPanel';
import {Debrief,ResultScreen,VerdictScreen,ConceptCards} from './SummaryScreens';
import EscapeRoom from './EscapeRoom';
import PhysicalFiles from './PhysicalFiles';
import TutorialOverlay from './TutorialOverlay';
import LandingExperience from './LandingExperience';
import { Smartphone, Laptop, Book } from 'lucide-react';
const icons={chat:MessageSquare,mail:Mail,files:FolderClosed,terminal:Terminal,lab:FlaskConical};
function Brand(){return <span className="brand"><span className="brand-symbol"><Fingerprint size={27}/></span><span>HỒ SƠ<span>ĐẢO CHIỀU</span></span></span>;}
function HomeScreen(){const {state,config,enter,dispatch,setHome}=useGame();const {evidence,initialOptions}=config;const [assessment,setAssessment]=useState(false),[guide,setGuide]=useState(false),[conclusion,setConclusion]=useState(''),[confidence,setConfidence]=useState(''),[mode,setMode]=useState<Mode>(state.mode),[restart,setRestart]=useState(false);
 const start=(m:Mode,fresh=false)=>{initAudio();setMode(m);enter(m,fresh);setAssessment(true);};
 const hasSave=!!state.initial;
 return (
    <>
      <LandingExperience 
        onStart={() => hasSave ? setHome(false) : start('individual')} 
        onReset={() => start('individual', true)}
        hasSave={hasSave} 
      />
      
      {guide && (
        <Modal title="Cách mở một hồ sơ" onClose={() => setGuide(false)}>
          <div className="guide">
            <p><b>1. Quan sát.</b> Đọc chứng cứ trong các ứng dụng. Ghim tài liệu bạn muốn đối chiếu.</p>
            <p><b>2. Kiểm chứng.</b> Trả lời trong sổ điều tra. Bạn có thể dùng gợi ý, sửa đáp án và đi tiếp dù chưa đúng.</p>
            <p><b>3. Giải mã.</b> Sau mỗi chương, liên hệ lựa chọn với kiến thức và nguồn học thuật.</p>
            <p><b>4. Chốt hồ sơ.</b> Gắn chứng cứ cho kết luận, kiểm tra phương án và xem kết thúc.</p>
            <div className="note">Không có phạt thời gian. Sửa và nộp lại lập luận hoặc mở khóa gợi ý chứng cứ sẽ trừ điểm độ tin cậy hồ sơ (-2 điểm/lần). Tiến trình lưu riêng trên trình duyệt. Chế độ trình chiếu dùng một máy để cả lớp thảo luận.</div>
          </div>
        </Modal>
      )}
      
      {restart && (
        <Modal title="Bắt đầu lượt mới?" onClose={() => setRestart(false)}>
          <p>Lượt mới thay tiến trình {state.mode === 'presenter' ? 'trình chiếu' : 'cá nhân'} trên thiết bị này.</p>
          <div className="button-row">
            <button className="secondary" onClick={() => setRestart(false)}>Giữ lượt hiện tại</button>
            <button className="primary" onClick={() => { setRestart(false); start(state.mode, true); }}>Bắt đầu lượt mới</button>
          </div>
        </Modal>
      )}
      
      {assessment && state.screen === 'intro' && (
        <Modal title="Trước khi mở toàn bộ hồ sơ" onClose={() => setAssessment(false)}>
          <div className="assessment-grid">
            <div>
              <EvidenceContent item={evidence[0]} compact />
              <div className="initial-notice">
                <Mail size={20} />
                <div>
                  <strong>Thông báo triển lãm // 19:50</strong>
                  <p>{state.difficulty==='easy'?'Bản trình bày của Mạch Nối không còn trong danh sách.':evidence[1].summary}</p>
                </div>
              </div>
            </div>
            <div className="assessment-form">
              <span className="eyebrow">{mode === 'presenter' ? 'CẢ LỚP CÙNG NHẬN ĐỊNH' : 'NHẬN ĐỊNH BAN ĐẦU'}</span>
              <Choice label="Điều gì có thể đã xảy ra?" options={initialOptions} value={conclusion} onChange={setConclusion} />
              <Choice label="Bản tin nhận định này ở mức nào?" options={['Thấp', 'Vừa', 'Cao'].map(id => ({ id, label: id }))} value={confidence} onChange={setConfidence} />
              <p className="muted">Không tính điểm. Cuối hồ sơ, bạn sẽ đối chiếu lại nhận định này.</p>
              <button className="primary" disabled={!conclusion || !confidence} onClick={() => { dispatch({ type: 'begin', conclusion, confidence }); setAssessment(false); }}>
                Bắt đầu điều tra <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
function Investigation(){const {state,config,dispatch,setHome,competitive,openCompetitionLeaderboard}=useGame();const {evidence,tasks,counterpoints,sources:evidenceSources}=config;const [filter,setFilter]=useState<'all'|Evidence['app']>('all'),[query,setQuery]=useState(''),[view,setView]=useState<'evidence'|'timeline'|'board'>('evidence'),[mobileTab,setMobileTab]=useState('read');
 const [activeObj,setActiveObj]=useState<string|null>(null);
 useEffect(()=>{let lastToggle=0;const handleOpenNotebook=()=>{const now=Date.now();if(now-lastToggle<250)return;lastToggle=now;setActiveObj(prev=>prev==='notebook'?null:'notebook');};window.addEventListener('hsdc-open-notebook',handleOpenNotebook);return()=>window.removeEventListener('hsdc-open-notebook',handleOpenNotebook);},[]);
 useEffect(()=>{const handleInspect=(e:Event)=>{const detail=(e as CustomEvent<{id:string;source?:EvidenceSource}>).detail;if(!detail?.id)return;dispatch({type:'evidence',id:detail.id});const source=detail.source??evidenceSources[detail.id]??'phone';setFilter('all');setQuery('');setView(source==='board'?'board':'evidence');setMobileTab('read');setActiveObj(source==='board'?'argument':source);};window.addEventListener('hsdc-inspect-evidence',handleInspect);return()=>window.removeEventListener('hsdc-inspect-evidence',handleInspect);},[dispatch,evidenceSources]);
 const visible=evidence.filter(e=>e.chapter<=state.unlocked);
 const allBoardRecords=evidence.filter(e=>evidenceSources[e.id]==='board');
 const sourceRecords=(source:EvidenceSource)=>visible.filter(e=>evidenceSources[e.id]===source);
 const findRecords=(source:EvidenceSource)=>sourceRecords(source).filter(e=>(filter==='all'||e.app===filter)&&(e.title+' '+e.id+' '+e.author).toLocaleLowerCase('vi').includes(query.toLocaleLowerCase('vi')));
 const selected=evidence.find(e=>e.id===state.selectedEvidence)!;
 const credibility=caseCredibility(state),readiness=chapterReadiness(state,state.chapter);
 const choose=(id:string)=>{dispatch({type:'evidence',id});setView('evidence');setMobileTab('read');};
 const openTask=(id:string)=>{dispatch({type:'task',id});setActiveObj('notebook');};
 
  const handleInteract = (objId: string) => {
    if (objId === 'notebook') {setActiveObj('notebook');return;}
    if (objId === 'leaderboard' && competitive && openCompetitionLeaderboard) {openCompetitionLeaderboard();return;}
    const sources={phone:'phone',laptop:'laptop',files:'files',board:'board'} as const;
    const source=sources[objId as keyof typeof sources];
    if(!source)return;
    setFilter('all');setQuery('');setView(objId==='board'?'board':'evidence');
    setMobileTab('files');setActiveObj(objId==='board'?'argument':objId);
  };

 const sourceLibrary=(source:EvidenceSource,title:string,description:string)=><aside className="evidence-library" style={{flex:1,borderRight:'none',maxWidth:'330px'}}>
   <div className="library-head"><strong>{title}</strong><span>{sourceRecords(source).length}<small> / {evidence.filter(e=>evidenceSources[e.id]===source).length}</small></span></div>
   <label className="search-box"><Search size={15}/><input aria-label={`Tìm trong ${title}`} placeholder="Tìm trong hồ sơ…" value={query} onChange={e=>setQuery(e.target.value)}/></label>
   <p className="muted" style={{fontSize:'12px',margin:'0 14px 10px'}}>{description}</p>
   <div className="evidence-list">{findRecords(source).map(e=>{const Icon=icons[e.app];return <button className={`evidence-item ${state.selectedEvidence===e.id?'active':''}`} key={e.id} onClick={()=>choose(e.id)}><span className="evidence-item-icon"><Icon size={17}/></span><span><small>{e.id}</small><strong>{e.title}</strong></span><span className="item-state">{state.pinned.includes(e.id)?<Pin size={12}/>:!state.opened.includes(e.id)?<i/>:<Check size={12}/>}</span></button>;})}{!findRecords(source).length&&<p className="empty-list">Chưa có hồ sơ phù hợp.</p>}</div>
 </aside>;
 const laptopLibrary=sourceLibrary('laptop','Máy tính điều tra','Nhật ký kỹ thuật và đối chiếu hệ thống.');
 const cabinetLibrary=sourceLibrary('files','Tủ chứng cứ','Hồ sơ chính thức, biên bản và tài liệu đối chiếu.');

 const argumentBoard=<main className="reader-column" style={{flex:1}}><section className="workspace-page"><span className="eyebrow">BẢNG LẬP LUẬN · HS–01</span><h2>Nhận định, đối chiếu và mô hình</h2><p className="muted">Bảng không lưu bản sao chứng cứ. Nó giữ các liên kết bạn dùng để kiểm tra lập luận và các tư liệu tái dựng của hồ sơ.</p><div className="note" style={{margin:'0 0 20px'}}><p><b>Độ tin cậy:</b> {credibility.score}/100 · {credibility.label}</p><div style={{height:'4px',background:'rgba(41,31,19,.16)',borderRadius:'99px',overflow:'hidden'}}><i style={{display:'block',height:'100%',width:`${credibility.score}%`,background:'#7c5a2c'}}/></div></div>{readiness.complete&&!readiness.ready&&<div className="note"><p><b>Mâu thuẫn chưa giải quyết</b><br/>{readiness.unresolved.map(r=>tasks.find(t=>t.id===r.taskId)?.title).join(' · ')}</p></div>}<div style={{display:'grid',gridTemplateColumns:'minmax(210px,.8fr) minmax(280px,1.2fr)',gap:'28px',alignItems:'start'}}><section><h3>Tư liệu tái dựng</h3><div className="pinned-grid">{allBoardRecords.map(e=>{const unlocked=e.chapter<=state.unlocked;return <button key={e.id} disabled={!unlocked} onClick={()=>choose(e.id)}><span>{e.id}<FileText size={14}/></span><strong>{e.title}</strong><p>{unlocked?e.summary:`Mở sau khi hoàn thành Chương ${e.chapter-1}.`}</p></button>;})}</div><h3 style={{marginTop:'24px'}}>Chứng cứ đã ghim</h3><div className="pinned-grid">{state.pinned.map(id=>{const e=evidence.find(item=>item.id===id)!;return <button key={id} onClick={()=>choose(id)}><span>{id}<Pin size={14}/></span><strong>{e.title}</strong><p>{e.summary}</p></button>;})}{!state.pinned.length&&<p className="muted">Ghim chứng cứ ở điện thoại, máy tính hoặc tủ để đánh dấu chúng tại đây.</p>}</div></section><section><h3>Lập luận của bạn</h3><div className="claim-list" style={{display:'flex',flexDirection:'column',gap:'12px'}}>{tasks.filter(t=>t.chapter<=state.unlocked).map(t=>{const answer=state.answers[t.id];const score=answer?evaluateChallenge(t.id,answer).score:0;const reply=counterpoints[t.id];const linked=(answer&&answer.kind==='classify')?answer.evidence:t.evidence;return <article className="claim-card" key={t.id}><button onClick={()=>openTask(t.id)}><span>{t.id} · {!answer?'Chưa ghi nhận':score===t.criteria.length?'Có căn cứ':'Cần đối chiếu'}</span><strong>{t.title}</strong><ArrowRight size={17}/></button>{answer?<p>{score}/{t.criteria.length} tiêu chí · {state.attempts[t.id]?.length??0} lần lập luận</p>:<p>Chưa có nhận định để kiểm tra.</p>}<div style={{display:'flex',alignItems:'center',flexWrap:'wrap',gap:'5px'}}><small style={{width:'100%'}}>Chứng cứ {answer?'đang đối chiếu':'gợi ý'}:</small>{linked.map(id=>{const item=evidence.find(e=>e.id===id);return <button className="text-button" key={id} onClick={()=>choose(id)} title={item?.title}>{id}</button>})}</div>{answer&&score<t.criteria.length&&reply&&<button className="text-button" onClick={()=>choose(reply.evidence)}>Phản biện: {reply.evidence} <ArrowRight size={13}/></button>}</article>;})}</div></section></div></section></main>;
 
 
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
           <span className="count" style={{fontSize:'8px', color:'rgba(85,255,85,0.7)', marginLeft:'8px', whiteSpace:'nowrap'}}>{sourceRecords('phone').length} / {evidence.filter(e=>evidenceSources[e.id]==='phone').length}</span>
        </div>
        <div className="evidence-list custom-scroll" style={{flex:1, overflowY:'auto', padding:'0 6px', margin:0}}>
           {findRecords('phone').map(e => {
            const Icon = icons[e.app];
            const isActive = state.selectedEvidence === e.id && view === 'evidence';
            return (
              <button className={`evidence-item ${isActive ? 'active' : ''}`} key={e.id} onClick={() => { choose(e.id); setMobileTab('read'); }} style={{display:'flex', alignItems:'center', width:'100%', boxSizing:'border-box', padding:'6px 4px', background:isActive?'rgba(85,255,85,0.1)':'transparent', border:isActive?'1px solid rgba(85,255,85,0.8)':'none', borderBottom:isActive?'none':'1px solid rgba(85,255,85,0.1)', borderRadius:isActive?'4px':'0', textAlign:'left', gap:'8px', cursor:'pointer'}}>
                <span className="item-left" style={{color:isActive?'#55ff55':'#9ecc8f'}}><Icon size={16}/></span>
                <span className="item-text" style={{flex:1, display:'flex', alignItems:'flex-start', gap:'6px'}}>
                  <small style={{fontSize:'9px', color:isActive?'#55ff55':'#9ecc8f', marginTop:'2px', flexShrink:0}}>{e.id}</small>
                  <strong style={{fontSize:'9.5px', color:isActive?'#55ff55':'#9ecc8f', fontWeight:'normal', lineHeight:1.3, wordBreak:'break-word', whiteSpace:'normal'}}>{e.title}</strong>
                </span>
                <span className="item-right" style={{color:'rgba(85,255,85,0.5)', fontSize:'10px'}}>&gt;</span>
              </button>
            );
          })}
           {!findRecords('phone').length && <p className="empty-list" style={{fontSize:'9px', textAlign:'center', marginTop:'10px', color:'rgba(85,255,85,0.5)'}}>Không có chứng cứ.</p>}
        </div>
      </>
    ) : (
      <main className="reader-column custom-scroll" style={{flex:1, display:'flex', flexDirection:'column', overflowY:'auto', padding:'10px'}}>
        <EvidenceReader item={selected}/>
      </main>
    )}
  </aside>
);

return <><EscapeRoom onInteract={handleInteract} onExit={()=>setHome(true)} forceIntro={state.elapsed < 5} competitionBoard={competitive}/>{activeObj&&<div className="modal-overlay point-and-click" onClick={(e)=>{if(e.target===e.currentTarget)setActiveObj(null)}}><dialog open className={activeObj==='argument'?'ui-board':`ui-${activeObj}`}><div className="modal-head" style={{marginBottom:0,paddingBottom:0,borderBottom:'none',position:'absolute',top:'10px',right:'20px',zIndex:100}}><button className="icon-button" onClick={()=>setActiveObj(null)} style={{background:'rgba(255,255,255,0.8)',borderRadius:'50%',width:'40px',height:'40px',display:'flex',justifyContent:'center',alignItems:'center'}}>X</button></div><div className={`investigation mobile-${mobileTab} inner-content`} style={{flex:1,minHeight:0,display:'flex',flexDirection:activeObj==='phone'?'column':'row',gap:'10px'}}>
 {(activeObj==='phone')&&<>{phoneLibrary}</>}
 {(activeObj==='laptop')&&<>{laptopLibrary}<main className="reader-column" style={{flex:2}}><EvidenceReader item={selected}/></main></>}
 {(activeObj==='files')&&<PhysicalFiles query={query} setQuery={setQuery} choose={choose} />}
 {activeObj==='notebook'&&<><TaskPanel/></>}
 {activeObj==='argument'&&argumentBoard}
 {activeObj==='board'&&<main className="reader-column" style={{flex:1}}><section className="workspace-page"><span className="eyebrow">NHẬN ĐỊNH & CĂN CỨ</span><h2>Bảng lập luận / Dòng thời gian</h2><div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'start'}}><div><h3>Chứng cứ đã ghim</h3><div className="pinned-grid">{state.pinned.map(id=>{const e=evidence.find(e=>e.id===id)!;return <button key={id} onClick={()=>choose(id)}><span>{id}<Pin size={14}/></span><strong>{e.title}</strong><p>{e.summary}</p></button>;})}{!state.pinned.length&&<p className="muted">Mở chứng cứ rồi chọn “Ghim chứng cứ” để đặt lên bảng.</p>}</div></div><div><h3>Lịch sử lập luận</h3><div className="claim-list" style={{display:'flex', flexDirection:'column', gap:'15px'}}>{tasks.filter(t=>state.answers[t.id]).map(t=>{const score=evaluateChallenge(t.id,state.answers[t.id]).score;return <div className="claim-card" key={t.id}><button onClick={()=>dispatch({type:'task',id:t.id})}><span>{t.id} · {score===t.criteria.length?'Có căn cứ':'Cần bổ sung'}</span><strong>{t.title}</strong><ArrowRight size={17}/></button><p>{state.attempts[t.id]?.length??0} lần ghi nhận · lần đầu {state.attempts[t.id]?.[0].evaluation.score??0}/{t.criteria.length} → hiện tại {score}/{t.criteria.length}</p>{state.notes[t.id]&&<blockquote>{state.notes[t.id]}</blockquote>}</div>;})}{!Object.keys(state.answers).length&&<p className="muted">Các lập luận xuất hiện ở đây sau khi được ghi nhận.</p>}</div></div></div></section></main>}
  {activeObj==='argument' && view==='evidence' && state.selectedEvidence && (
    <div className="board-note-overlay" style={{position:'absolute', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', zIndex:200, display:'flex', justifyContent:'center', alignItems:'center'}} onClick={(e)=>{if(e.target===e.currentTarget)setView('board');}}>
      <div className="board-note-detail" style={{background:'#fdf2cc', padding:'40px', borderRadius:'4px', maxWidth:'600px', width:'90%', maxHeight:'90%', overflow:'auto', position:'relative', boxShadow:'0 10px 30px rgba(0,0,0,0.8)'}}>
        <button onClick={()=>setView('board')} style={{position:'absolute', top:'15px', right:'15px', background:'transparent', border:'none', fontSize:'24px', cursor:'pointer', color:'#c0392b', fontWeight:'bold'}}>X</button>
        <EvidenceReader item={evidence.find(e=>e.id===state.selectedEvidence)!} />
      </div>
    </div>
  )}
</div></dialog></div>}<TutorialOverlay/></>;
}
function Shell(){const {state,config,ready,home,setHome,paused,setPaused,reduced,setReduced,saveStatus,conflict,resolveConflict,enter,competitive}=useGame();const [settings,setSettings]=useState(false),[atlas,setAtlas]=useState(false),[reset,setReset]=useState(false),[fullscreenError,setFullscreenError]=useState(''); const [muted, setMutedState] = useState(false); const {chapters:allChapters,tasks:allTasks}=config,chapterLimit=state.chapterLimit??config.lastChapter,chapters=allChapters.filter(c=>c.id<=chapterLimit),tasks=allTasks.filter(t=>t.chapter<=chapterLimit); const intro=state.screen==='intro'||(!competitive&&home); useEffect(() => { if (!ready) return; initAudio(); if (competitive) { if (state.screen === 'investigation') playBgm('investigation'); else if (state.screen === 'result' || state.screen === 'verdict') playBgm('verdict'); } else if (intro) playBgm('landing'); }, [intro, ready, competitive, state.screen]); const toggleMute = () => { const next = !getMute(); setMute(next); setMutedState(next); }; if(!ready)return <div className="boot-screen"><Fingerprint size={48}/><p>�ang m? h? so�</p></div>;
 return <div className={state.mode==='presenter'?'game-root presenter':'game-root'}>{intro?<HomeScreen/>:<><header className="game-header"><button className="brand-button" aria-label="Về trang hồ sơ" onClick={()=>setHome(true)}><Brand/></button><nav className="chapter-nav" aria-label="Các chương">{chapters.map(c=><button className={state.chapter===c.id?'active':''} key={c.id} disabled={c.id>state.unlocked} onClick={()=>{if(state.screen==='result'){setAtlas(true);return;}window.dispatchEvent(new CustomEvent('hsdc-chapter',{detail:c.id}));}}><span>{state.debriefs.includes(c.id)?<Check size={12}/>:String(c.id).padStart(2,'0')}</span>{c.short}</button>)}</nav><div className="header-tools"><button className="icon-button" title={muted ? "Bat am thanh" : "Tat am thanh"} onClick={toggleMute}>{muted ? <VolumeX size={19}/> : <Volume2 size={19}/>}</button><span className="save-indicator" title={saveStatus}><span className="status-dot"/> {saveStatus}</span><button className="icon-button" title="Tra cứu kiến thức đã mở" aria-label="Tra cứu kiến thức" onClick={()=>setAtlas(true)}><BookOpen size={19}/></button><button className="icon-button" title="Tùy chọn" aria-label="Tùy chọn" onClick={()=>setSettings(true)}><Settings2 size={19}/></button></div></header>{state.mode==='presenter'&&<div className="presenter-toolbar"><span><Users size={17}/> Chế độ trình chiếu · một máy, cả lớp thảo luận</span><div><button onClick={()=>setPaused(!paused)}>{paused?<Play size={15}/>:<Pause size={15}/>} {paused?'Tiếp tục':'Dừng để thảo luận'}</button><button onClick={async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else setFullscreenError('Trình duyệt này không hỗ trợ toàn màn hình.');}catch{setFullscreenError('Không mở được toàn màn hình; bạn vẫn có thể trình chiếu ở cửa sổ hiện tại.');}}}><Maximize2 size={15}/> Toàn màn hình</button></div>{fullscreenError&&<small role="status">{fullscreenError}</small>}</div>}{state.screen==='investigation'?<Investigation/>:state.screen==='debrief'?<Debrief/>:state.screen==='verdict'?<VerdictScreen/>:<ResultScreen/>}</>}{conflict&&<div className="storage-banner" role="alert"><ShieldCheck size={18}/><span>{saveStatus} Để tránh ghi đè, lưu đang tạm dừng.</span><button onClick={resolveConflict}>Tải bản mới nhất</button><button onClick={()=>setReset(true)}>Bắt đầu lượt mới</button></div>}{settings&&<Modal title="Tùy chọn hồ sơ" onClose={()=>setSettings(false)}><div className="settings-content"><p>{saveStatus}</p><label className="setting-toggle"><input type="checkbox" checked={reduced} onChange={e=>setReduced(e.target.checked)}/> Giảm chuyển động</label><p className="muted">Thời gian hoạt động: {Math.floor(state.elapsed/60)} phút {state.elapsed%60} giây. Không ảnh hưởng điểm.</p><button className="secondary" onClick={()=>{setSettings(false);enter(state.mode==='individual'?'presenter':'individual');}}>Chuyển sang {state.mode==='individual'?'trình chiếu':'cá nhân'}</button><button className="text-button" onClick={()=>{setSettings(false);setReset(true);}}>Bắt đầu lại chế độ hiện tại</button></div></Modal>}{reset&&<Modal title="Thay tiến trình bằng lượt mới?" onClose={()=>setReset(false)}><p>Lượt hiện tại của chế độ này sẽ được thay thế trên thiết bị. Chế độ còn lại giữ tiến trình riêng.</p><div className="button-row"><button className="secondary" onClick={()=>setReset(false)}>Giữ tiến trình</button><button className="primary" onClick={()=>{enter(state.mode,true);setReset(false);}}>Bắt đầu lượt mới</button></div></Modal>}{atlas&&<Modal title="Bản đồ kiến thức 2–3–6" onClose={()=>setAtlas(false)}><p className="muted">Kiến thức được mở sau phần giải mã từng chương.</p><ConceptCards ids={tasks.filter(t=>state.debriefs.includes(t.chapter)||state.screen==='result').flatMap(taskConcepts)}/></Modal>}</div>;
}
function ChapterEvents(){const {dispatch}=useGame();useChapterEvents(dispatch);return null;}
import {useEffect,type Dispatch} from 'react';
import type {Action,Chapter} from '../game/types';
function useChapterEvents(dispatch:Dispatch<Action>){useEffect(()=>{const handler=(e:Event)=>dispatch({type:'chapter',chapter:(e as CustomEvent<Chapter>).detail});window.addEventListener('hsdc-chapter',handler);return()=>window.removeEventListener('hsdc-chapter',handler);},[dispatch]);}
export default function Game({competition,onLeaderboard}:{competition?:CompetitionBridge;onLeaderboard?:()=>void}={}){ useEffect(() => { initAudio(); const handleGlobalClick = (e: any) => { const target = e.target; const sfxTarget = target.closest("[data-sfx]"); if (sfxTarget) { ensureBgmPlaying();
          playSfx(sfxTarget.getAttribute("data-sfx")); } else if (target.closest("button") || target.closest("a")) { ensureBgmPlaying();
          playSfx("click"); } }; window.addEventListener("click", handleGlobalClick, true); return () => window.removeEventListener("click", handleGlobalClick, true); }, []); return <GameProvider competition={competition} openCompetitionLeaderboard={onLeaderboard}><ChapterEvents/><Shell/></GameProvider>; }
