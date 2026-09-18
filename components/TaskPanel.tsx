import {playSfx} from '../lib/audio';
'use client';
import {useState} from 'react';
import {ArrowRight,Check,ChevronLeft,ChevronRight,Lightbulb,Link2,NotebookPen,Send,CheckCircle2,AlertCircle,Target,FileText} from 'lucide-react';
import {chainOptions,relationOptions,reportOptions,recoveryActions} from '../game/tasks';
import {answerComplete,caseCredibility,chapterComplete,chapterReadiness,emptyAnswer,evaluateChallenge} from '../game/engine';
import type {Answer,Task,Evidence} from '../game/types';
import {useGame} from './GameProvider';
import {Chips,Choice,EvidencePicker,Sorter} from './ui';
import Simulations from './Simulations';
import {EvidenceContent} from './EvidenceReader';
function TaskForm({task,answer:a,change}:{task:Task;answer:Answer;change:(a:Answer)=>void}){
 const {state,dispatch,config:{tasks,counterpoints}}=useGame();
 const credibility=caseCredibility(state);
 const meter=<div className="case-credibility" aria-label={`Độ tin cậy hồ sơ: ${credibility.score}/100, ${credibility.label}`} style={{border:'1px solid var(--line, rgba(93,66,34,.32))',padding:'10px 12px',margin:'12px 0 18px',borderRadius:'8px'}}><div style={{display:'flex',justifyContent:'space-between',gap:'12px',fontSize:'12px'}}><span>ĐỘ TIN CẬY HỒ SƠ</span><strong>{credibility.score}/100 · {credibility.label}</strong></div><div style={{height:'5px',background:'rgba(41,31,19,.14)',margin:'8px 0',borderRadius:'999px',overflow:'hidden'}}><i style={{display:'block',height:'100%',width:`${credibility.score}%`,background:'var(--accent, #7c5a2c)',borderRadius:'inherit'}}/></div><small>Được tính theo lập luận hiện tại và các dữ kiện bạn đã mở; sửa đáp án có thể làm chỉ số thay đổi.</small></div>;
 const submitted=state.answers[task.id],counterpoint=counterpoints[task.id];
 const reaction=submitted&&counterpoint&&evaluateChallenge(task.id,submitted).score<task.criteria.length?<aside className="note counterpoint" role="status"><AlertCircle size={20}/><p><span className="eyebrow">PHẢN BIỆN MỚI · {counterpoint.role}</span><b>{counterpoint.speaker}:</b> {counterpoint.message}<br/><button className="text-button" onClick={()=>dispatch({type:'evidence',id:counterpoint.evidence})}>Đối chiếu {counterpoint.evidence} <ArrowRight size={14}/></button></p></aside>:null;
 const readiness=chapterReadiness(state,state.chapter);
 const gate=readiness.complete&&!readiness.ready?<aside className="note chapter-gate" role="status"><AlertCircle size={20}/><p><span className="eyebrow">HỒ SƠ CÒN MÂU THUẪN</span>Trước khi giải mã chương này, hãy xem lại các lập luận nền tảng:<br/>{readiness.unresolved.map(({taskId,minimum})=><button className="text-button" key={taskId} onClick={()=>dispatch({type:'task',id:taskId})}>{tasks.find(t=>t.id===taskId)?.title} · cần ít nhất {minimum}/{tasks.find(t=>t.id===taskId)?.criteria.length} <ArrowRight size={14}/></button>)}</p></aside>:null;
 let form;
 switch(a.kind){
 case 'easyOrder':form=<><Sorter label={task.id==='N5'?'Hành động và thứ tự':'Chuỗi tác động'} options={task.orderOptions!} value={a.order} max={3} onChange={order=>change({...a,order})}/>{task.id==='N5'&&<Simulations id={task.id} actions={a.order}/>}<Choice label={task.questions![0].label} options={task.questions![0].options} value={a.conclusion} onChange={conclusion=>change({...a,conclusion})}/></>;break;
 case 'choices':form=<>{['T05','T08','T10'].includes(task.id)&&<Simulations id={task.id}/ >}{task.questions!.map(q=><Choice key={q.id} label={q.label} value={a.values[q.id]??''} options={q.options} onChange={v=>change({...a,values:{...a.values,[q.id]:v}})}/>)}</>;break;
 case 'classify':form=<>{[['s1','Demo không còn trong danh sách lúc 19:50.'],['s2','Mã nguồn đã bị xóa.'],['s3','Nam cố ý phá hoại vì bất mãn.'],['s4','Việc rút demo liên quan đến tình trạng chưa kiểm thử đạt.']].map(([id,label],i)=><label className="classify-item" key={id}><span><b>{i+1}.</b> {label}</span><select aria-label={label} value={a.categories[id]??''} onChange={e=>change({...a,categories:{...a.categories,[id]:e.target.value}})}><option value="">Chọn mức độ có căn cứ…</option><option value="fact">Dữ kiện được xác nhận</option><option value="supported">Nhận định có cơ sở, cần giới hạn</option><option value="unproven">Chưa được chứng minh</option></select></label>)}<EvidencePicker ids={task.evidence} value={a.evidence} onChange={evidence=>change({...a,evidence})}/></>;break;
 case 'chain':form=<><Sorter label="Chuỗi tác động" options={chainOptions} value={a.order} max={4} onChange={order=>change({...a,order})}/><EvidencePicker ids={task.evidence} value={a.evidence} onChange={evidence=>change({...a,evidence})}/><Choice label="Lỗi và việc rút demo có quan hệ gì?" value={a.relation} options={[{id:'same',label:'Là cùng một sự kiện kỹ thuật.'},{id:'decision',label:'Lỗi chưa khắc phục là căn cứ cho quyết định rút demo tiếp theo.'}]} onChange={relation=>change({...a,relation})}/></>;break;
 case 'relations':form=<><Chips label="Hai quan hệ ưu tiên" options={relationOptions} value={a.priority} max={2} onChange={priority=>change({...a,priority})}/><Chips label="Hai quan hệ theo dõi" options={relationOptions} value={a.monitor} max={2} onChange={monitor=>change({...a,monitor})}/><Choice label="Nguyên tắc ưu tiên giải quyết sự cố lúc này là gì?" value={a.reason} options={[{id:'expand',label:'Càng thêm nhiều tính năng càng chắc chắn thành công.'},{id:'core',label:'Sát giờ trình diễn: khôi phục luồng cốt lõi và xác nhận điều kiện.'}]} onChange={reason=>change({...a,reason})}/></>;break;
 case 'report':form=<><Sorter label="Bố cục giải thích sự cố" options={reportOptions} value={a.order} max={6} onChange={order=>change({...a,order})}/><Choice label="Vì sao tổ chức lại thông tin?" value={a.reason} options={[{id:'structure',label:'Bố cục và liên kết giữa các phần giúp làm rõ nội dung.'},{id:'color',label:'Hình thức chỉ là chọn màu và phông chữ.'}]} onChange={reason=>change({...a,reason})}/></>;break;
 case 'recovery':form=<><Choice label="Nhóm đang có gì?" value={a.reality} options={[{id:'available',label:'Mã, bản lưu, dữ liệu thử và thành viên đã có. Demo còn cần thực hiện.'},{id:'nothing',label:'Mọi thứ đã mất, cần bắt đầu lại từ số không.'}]} onChange={reality=>change({...a,reality})}/><Sorter label="Hành động và thứ tự" options={recoveryActions.map(x=>({id:x.id,label:`${x.id} · ${x.label} (${x.minutes}′)`}))} value={a.order} max={7} onChange={order=>change({...a,order})}/><Simulations id={task.id} actions={a.order}/><Choice label="Sau mô phỏng thành công, kết luận gì?" value={a.conclusion} options={[{id:'production',label:'Sản phẩm đã chắc chắn sẵn sàng phục vụ người dùng thật.'},{id:'limited',label:'Demo giới hạn được thực hiện trong điều kiện mô phỏng; cần kiểm tra thêm để khai thác thật.'}]} onChange={conclusion=>change({...a,conclusion})}/></>;break;
 }
 return <>{meter}{form}{reaction}{gate}</>;
}
export default function TaskPanel(){
  const {state,dispatch,config:{tasks,evidence,counterpoints},trackedMission,setTrackedMission}=useGame();
  const task=tasks.find(t=>t.id===state.activeTask)!;
  const [error,setError]=useState('');
  const [viewingEvidence, setViewingEvidence] = useState<Evidence | null>(null);
  const a=state.drafts[task.id]??state.answers[task.id]??emptyAnswer(task.id);
  const submitted=state.answers[task.id];
  const evaluation=submitted?evaluateChallenge(task.id,submitted):null;
  const changed=!!submitted&&JSON.stringify(a)!==JSON.stringify(submitted);
  const chapterTasks=tasks.filter(t=>t.chapter===state.chapter),index=chapterTasks.findIndex(t=>t.id===task.id),hints=state.hints[task.id]??0;
  const isTracking = trackedMission?.taskId === task.id;
  const collectedIds = isTracking ? (trackedMission?.foundEvidenceIds ?? []) : [];
  const collectedEvidence = evidence.filter(e => collectedIds.includes(e.id));

  const toggleTrackMission = () => {
    if (isTracking) {
      setTrackedMission(null);
    } else {
      setTrackedMission({
        taskId: task.id,
        taskTitle: task.title,
        evidenceIds: task.evidence,
        foundEvidenceIds: [],
      });
    }
  };
  const select=(id:string)=>{setError('');dispatch({type:'task',id});};
  const submit=()=>{if(!answerComplete(task.id,a)){setError('Hãy hoàn tất các lựa chọn, đủ số thẻ và chứng cứ trước khi ghi nhận.');return;}dispatch({type:'submit',id:task.id,answer:a,at:new Date().toISOString()});setError('');};
  return <aside className="task-panel" aria-label="Nhiệm vụ điều tra"><div className="task-panel-left" style={{display:'flex',flexDirection:'column',gap:'8px',overflow:'hidden'}}>
<div className="task-panel-head"><span><NotebookPen size={17}/> Sổ điều tra</span><span>{index+1} / {chapterTasks.length}</span></div><div className="task-pagination">{chapterTasks.map((t,i)=><button aria-label={`Nhiệm vụ ${t.id}`} key={t.id} className={t.id===task.id?'active':state.answers[t.id]?'done':''} onClick={()=>select(t.id)}>{t.id===task.id?<Check size={14}/>:String(i+1).padStart(2,'0')}</button>)}</div>

  {collectedEvidence.length > 0 ? (
    <div className="notebook-collected-evidence-section">
      <div className="collected-section-header">
        <FileText size={15}/>
        <span>CHỨNG CỨ ĐÃ THU THẬP ({collectedEvidence.length}/{task.evidence.length})</span>
      </div>
      <div className="collected-polaroids-list custom-scroll">
        {collectedEvidence.map((ev, i) => {
          const rotationAngle = i % 2 === 0 ? -2.5 : 2;
          const tapeAngle = i % 2 === 0 ? 3 : -2.5;
          const bgImg = ev.app === 'chat' || ev.app === 'files' ? '/scene_desk.jpg' : ev.app === 'terminal' ? '/scene_wall.jpg' : '/bg_room.jpg';
          return (
            <div
              key={ev.id}
              className="collected-evidence-card taped-polaroid-item"
              style={{ transform: `rotate(${rotationAngle}deg)` }}
              onClick={() => {
                setViewingEvidence(ev);
                dispatch({ type: 'evidence', id: ev.id });
              }}
              role="button"
              tabIndex={0}
              title={`Bấm để xem chi tiết: ${ev.id} · ${ev.title}`}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setViewingEvidence(ev);
                  dispatch({ type: 'evidence', id: ev.id });
                }
              }}
            >
              {/* Adhesive masking tape */}
              <div
                className="polaroid-tape"
                style={{ transform: `translateX(-50%) rotate(${tapeAngle}deg)` }}
              />

              {/* Photo Frame */}
              <div className="polaroid-photo-frame">
                <div
                  className="polaroid-photo-img"
                  style={{ backgroundImage: `url(${bgImg})` }}
                >
                  <span className="card-badge polaroid-stamp">{ev.id}</span>
                  <span className="polaroid-app-tag">
                    {ev.app === 'chat' ? 'Tin nhắn' : ev.app === 'terminal' ? 'Nhật ký' : ev.app === 'mail' ? 'Hộp thư' : 'Tài liệu'}
                  </span>
                </div>
              </div>

              {/* Polaroid Bottom Caption with handwritten ink */}
              <div className="polaroid-caption">
                <strong className="card-title polaroid-title">{ev.title}</strong>
                <span className="card-action polaroid-hint">
                  <CheckCircle2 size={13} style={{ stroke: '#15803d', display: 'inline', verticalAlign: '-2px', marginRight: '4px' }}/>
                  Bấm để xem chi tiết
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="polaroid-decor" style={{marginTop: '20px', padding: '0 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.85, transform: 'rotate(-2deg)'}}>
      <div style={{background: '#f8f8f8', padding: '6px 6px 24px 6px', boxShadow: '2px 4px 12px rgba(0,0,0,0.4)', width: '180px', position: 'relative'}}>
        <div style={{position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%) rotate(3deg)', width: '50px', height: '16px', background: 'rgba(230, 220, 200, 0.7)', border: '1px solid rgba(0,0,0,0.1)'}}></div>
        <div style={{width: '100%', height: '120px', background: 'url(/bg_room.jpg) center/cover no-repeat', filter: 'grayscale(100%) contrast(1.1) brightness(0.9)'}}></div>
      </div>
      <div style={{marginTop: '20px', fontFamily: '"Patrick Hand", cursive', fontSize: '16px', textAlign: 'center', color: '#1a140f', transform: 'rotate(1deg)'}}>
        "Mỗi vấn đề,<br/>đều có một hướng giải."
      </div>
    </div>
  )}

</div><div className="task-content" key={task.id}><span className="eyebrow">LẬP LUẬN {task.id.slice(1)}</span><h2>{task.title}</h2><p className="task-prompt">{task.prompt}</p><div className="related-evidence"><span><Link2 size={13}/> Đối chiếu</span>{task.evidence.map(id=>{const isFound=isTracking?(trackedMission?.foundEvidenceIds.includes(id)??false):state.opened.includes(id);return <button key={id} type="button" disabled={!isFound} onClick={()=>{if(isFound){const ev=evidence.find(item=>item.id===id);if(ev)setViewingEvidence(ev);dispatch({type:'evidence',id});}}} title={isFound?`Xem chi tiết chứng cứ ${id}`:`Chứng cứ ${id} chưa được thu thập (Hãy tìm kiếm trong phòng)`} className={isFound?'unlocked':'locked'} style={!isFound?{opacity:0.45,cursor:'not-allowed'}:undefined}>{id}</button>;})}{task.evidence?.length>0&&<button type="button" className={`collect-mission-btn ${isTracking?'active':''}`} onClick={toggleTrackMission} title={isTracking?'Bỏ theo dõi nhiệm vụ này':'Thu thập nhiệm vụ tìm kiếm các chứng cứ này'} data-sfx="pin">{isTracking?<Check size={13}/>:<Target size={13}/>}<span>{isTracking?'Đã thu thập':'Thu thập nhiệm vụ'}</span></button>}</div><TaskForm task={task} answer={a} change={answer=>dispatch({type:'draft',id:task.id,answer})}/><div className="hint-area">{hints<2&&<button className="text-button" onClick={()=>dispatch({type:'hint',id:task.id})}><Lightbulb size={16}/> {hints?'Gợi ý tiếp theo':'Cần một gợi ý?'} <small>{hints}/2</small></button>}{task.hints.slice(0,hints).map((h,i)=><p className="hint" key={i}>{h}</p>)}</div><details className="notes"><summary>Ghi chú riêng <small>không chấm điểm</small></summary><textarea aria-label="Ghi chú riêng" maxLength={500} value={state.notes[task.id]??''} onChange={e=>dispatch({type:'note',id:task.id,note:e.target.value})} placeholder="Căn cứ nào khiến bạn giữ hoặc đổi nhận định?"/></details>{error&&<p className="form-error" role="alert">{error}</p>}<button className="primary submit-button" onClick={submit} disabled={!!submitted&&!changed}><Send size={16}/>{submitted&&!changed?'Đã ghi nhận lập luận':submitted?'Cập nhật lập luận':'Ghi nhận lập luận'}</button>{evaluation&&<div className="evaluation" role="status"><div className="evaluation-title"><CheckCircle2 size={18}/><strong>{evaluation.score}/{task.criteria.length} tiêu chí có căn cứ</strong></div>{changed&&<small>Phản hồi của lần nộp trước; ghi nhận để đánh giá bản sửa.</small>}{task.criteria.map((c,i)=><details key={c}><summary>{evaluation.met[i]?<Check size={14}/>:<AlertCircle size={14}/>}<span>{c}</span></summary><p>{task.feedback[i]}</p></details>)}</div>}<div className="task-next">{index>0&&<button className="text-button" onClick={()=>select(chapterTasks[index-1].id)}><ChevronLeft size={16}/> Trước</button>}{index<chapterTasks.length-1&&<button className="text-button" onClick={()=>select(chapterTasks[index+1].id)}>Nhiệm vụ tiếp <ChevronRight size={16}/></button>}</div>{chapterComplete(state,state.chapter)&&<button className="chapter-finish" onClick={()=>dispatch({type:'debrief'})}>Giải mã chương {state.chapter}<ArrowRight size={18}/></button>}</div>
  {viewingEvidence && (
    <div
      className="notebook-evidence-modal-overlay"
      onClick={() => setViewingEvidence(null)}
    >
      <div
        className="notebook-evidence-modal"
        onClick={e => e.stopPropagation()}
      >
        <div className="notebook-evidence-modal-head">
          <div className="modal-title">
            <span className="modal-badge">{viewingEvidence.id}</span>
            <strong>{viewingEvidence.title}</strong>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setViewingEvidence(null)}
            aria-label="Đóng chi tiết chứng cứ"
          >
            ✕
          </button>
        </div>
        <div className="notebook-evidence-modal-body custom-scroll">
          <EvidenceContent item={viewingEvidence} />
          <div className="evidence-caption">
            <span className="case-tag">{viewingEvidence.id}</span>
            <p>{viewingEvidence.summary}</p>
          </div>
        </div>
      </div>
    </div>
  )}
</aside>;
}
