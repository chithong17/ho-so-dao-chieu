'use client';
import {useEffect,useState} from 'react';
import {playBgm, playSfx} from '../lib/audio';
import {ArrowLeft,ArrowRight,BookOpen,FileCheck2,Lightbulb,Printer,RotateCcw,ShieldCheck} from 'lucide-react';
import {useGame} from './GameProvider';
import {taskConcepts} from '../game/config';
import {easyLessons} from '../game/easy';


import {evaluateChallenge,simulateRecovery,simulateEasyRecovery} from '../game/engine';
import type {ConceptId,Verdict} from '../game/types';
import {Choice,EvidencePicker} from './ui';

export function ConceptCards({ids}:{ids:ConceptId[]}){
  const {config:{concepts}}=useGame();
  return <div className="concept-grid">{[...new Set(ids)].map(id=>{const c=concepts.find(c=>c.id===id)!;return <article className="concept-card" key={id}><span className="concept-id">{id.startsWith('NL')?'NGUYÊN LÝ':id.startsWith('QL')?'QUY LUẬT':'CẶP PHẠM TRÙ'} · {id}</span><h3>{c.title}</h3><p>{c.explanation}</p><details><summary>Liên hệ hồ sơ & giới hạn</summary><p><b>Trong hồ sơ:</b> {c.application}</p><p className="concept-limit"><Lightbulb size={16}/>{c.limit}</p></details><footer><BookOpen size={13}/><span>phepduyvatbienchung.pdf · tr. {c.pages[0]}–{c.pages[1]}<br/>Trang in {c.pages[0]+83}–{c.pages[1]+83} · {c.slide}</span></footer></article>;})}{!ids.length&&<p className="note">Hoàn thành một chương để mở phần giải mã kiến thức tương ứng.</p>}</div>;
}

const chapterLessons={
  1:{title:'Bài học chương 1: Đừng kết luận từ một dấu hiệu.',text:'Tin nhắn bị cắt và dự án biến mất là những hiện tượng cần kiểm tra. Chỉ khi đối chiếu hội thoại đầy đủ, nhật ký trạng thái và kết quả kiểm thử, người chơi mới có cơ sở phân biệt hành vi thực tế với suy đoán.',takeaway:'Khi một kết quả xuất hiện, hãy tìm chuỗi tác động tạo ra nó; việc xảy ra trước hoặc gây ấn tượng mạnh chưa tự nó là nguyên nhân.'},
  2:{title:'Bài học chương 2: Nhìn hệ thống, nhưng không khái quát vội.',text:'Sự cố của Mạch Nối không chỉ nằm ở một trường dữ liệu. Nó bộc lộ mối liên hệ giữa yêu cầu, bàn giao, kiểm thử và tổ chức công việc. Tuy vậy, mỗi dự án vẫn có hoàn cảnh và lỗi cụ thể riêng.',takeaway:'Xem xét toàn diện không có nghĩa coi mọi yếu tố ngang nhau. Hãy tìm quan hệ chủ yếu, phân biệt điều kiện bên ngoài với nguyên nhân trực tiếp và tổ chức thông tin theo đúng mục đích.'},
  3:{title:'Bài học chương 3: Khả năng cần điều kiện để thành hiện thực.',text:'Nhóm có mã nguồn, bản sao lưu và thời gian: đó mới là tiền đề. Bản demo chỉ có thể trở lại khi các bước phụ thuộc được thực hiện đúng, có kiểm thử và kế thừa những điểm còn phù hợp của quy trình cũ.',takeaway:'Đổi mới không phải xóa sạch. Cần tích lũy đúng yếu tố, giải quyết mâu thuẫn trong tổ chức và kiểm chứng kết quả trong điều kiện cụ thể.'}
} as const;

export function Debrief(){
  useEffect(() => { playSfx('chapter'); }, []);
  const {state,dispatch,config:baseConfig}=useGame();
  const config={...baseConfig,lastChapter:state.chapterLimit??baseConfig.lastChapter};
  const {tasks}=config;
  const chapterTasks=tasks.filter(t=>t.chapter===state.chapter);
  const lesson=state.difficulty==='easy'?easyLessons[state.chapter as 1|2]:chapterLessons[state.chapter];
  return <main className="summary-page"><div className="summary-heading"><span className="eyebrow">GIẢI MÃ CHƯƠNG 0{state.chapter}</span><h1>{lesson.title}</h1><p>{lesson.text}</p></div><div className="note"><ShieldCheck size={20}/><p><b>Điểm cần nhớ:</b> {lesson.takeaway}</p></div><div className="debrief-recap">{chapterTasks.map(t=>{const a=state.answers[t.id],e=evaluateChallenge(t.id,a);return <div key={t.id}><span className="score-circle">{e.score}<small>/{t.criteria.length}</small></span><div><strong>{t.title}</strong><p>{t.feedback[e.met.findIndex(m=>!m)<0?0:e.met.findIndex(m=>!m)]}</p></div><button aria-label={`Sửa ${t.id}`} className="icon-button" onClick={()=>dispatch({type:'task',id:t.id})}><RotateCcw size={17}/></button></div>;})}</div><ConceptCards ids={chapterTasks.flatMap(taskConcepts)}/><div className="summary-actions"><button className="secondary" onClick={()=>dispatch({type:'chapter',chapter:state.chapter})}><ArrowLeft size={17}/> Xem lại lập luận</button><button className="primary" onClick={()=>dispatch({type:'next'})}>{state.chapter===config.lastChapter?'Viết kết luận cuối':'Mở chương tiếp theo'}<ArrowRight size={18}/></button></div></main>;
}

export function VerdictScreen(){
  useEffect(() => { playBgm('verdict'); }, []);
  const {state,dispatch,config:baseConfig}=useGame();
  const chapterLimit=state.chapterLimit??baseConfig.lastChapter;
  const config={...baseConfig,lastChapter:chapterLimit,verdictEvidence:baseConfig.verdictEvidence.filter(id=>baseConfig.evidence.find(e=>e.id===id)!.chapter<=chapterLimit),verdictEvidenceCount:Math.min(baseConfig.verdictEvidenceCount,chapterLimit)};
  const {initialOptions,verdictOptions}=config;
  const [v,setV]=useState<Verdict>(state.verdict??{conclusion:'V4',evidence:[],note:''}),[error,setError]=useState('');
  const a=state.answers[config.recoveryTask],recovery=state.difficulty==='easy'?{...simulateEasyRecovery(a?.kind==='easyOrder'?a.order:[]),totalTime:0}:simulateRecovery(a?.kind==='recovery'?a.order:[]);
  const update=(next:Verdict)=>{setV(next);dispatch({type:'verdictDraft',verdict:next});};
  return <main className="summary-page verdict-page"><div className="summary-heading"><span className="eyebrow">HỒ SƠ HS-01 / KẾT LUẬN ĐIỀU TRA</span><h1>Điều gì đã thực sự xảy ra?</h1><p>Hãy chọn nhận định và dùng chứng cứ để giải thích, thay vì chỉ lặp lại dấu hiệu ban đầu.</p></div><div className="verdict-layout"><section className="verdict-form"><Choice label="Kết luận của bạn" options={verdictOptions} value={v.conclusion} onChange={conclusion=>update({...v,conclusion:conclusion as Verdict['conclusion']})}/><EvidencePicker ids={config.verdictEvidence} value={v.evidence} max={config.verdictEvidenceCount} onChange={ev=>update({...v,evidence:ev})}/><label className="final-notes">Ghi chú lập luận <small>không chấm tự động · {v.note.length}/500</small><textarea value={v.note} maxLength={500} onChange={e=>update({...v,note:e.target.value})} placeholder="Hãy nêu chuỗi dữ kiện khiến bạn đi đến kết luận này…"/></label>{error&&<p role="alert" className="form-error">{error}</p>}<button className="primary" onClick={()=>{if(v.evidence.length===0){setError('Hãy gắn ít nhất một chứng cứ trước khi lưu kết luận.');return;}playSfx('stamp'); setTimeout(() => dispatch({type:'finish',verdict:v}), 500);}}><FileCheck2 size={18}/> Lưu kết luận <ArrowRight size={18}/></button></section><aside className="verdict-aside"><span className="eyebrow">NHÌN LẠI</span><h3>Nhận định ban đầu</h3><blockquote>{initialOptions.find(o=>o.id===state.initial?.conclusion)?.label}</blockquote><p className="muted">Mức độ tin tưởng ban đầu: {state.initial?.confidence}</p><div className="paper-rule"/><h3>Phương án khôi phục</h3><span className={`budget-pill ${recovery.success?'good':'bad'}`}>{state.difficulty==='easy'?`${a?.kind==='easyOrder'?a.order.length:0} / 3 công việc`:`${recovery.totalTime} / 60 phút`}</span><p>{recovery.message}</p><button className="text-button" onClick={()=>dispatch({type:'task',id:config.recoveryTask})}>Xem lại phương án <ArrowRight size={15}/></button><div className="note"><ShieldCheck size={20}/><p>Bạn có thể đổi kết luận khi chứng cứ mới cho thấy nhận định ban đầu chưa đủ căn cứ.</p></div></aside></div><button className="text-button" onClick={()=>dispatch({type:'chapter',chapter:config.lastChapter})}><ArrowLeft size={16}/> Quay lại chương {config.lastChapter}</button></main>;
}

const endings=[
  {title:'Kết luận còn vội',text:'Bạn đã dựa quá nhiều vào một dấu hiệu hoặc bỏ qua những dữ kiện đối chiếu. Hãy trở lại hồ sơ, phân biệt điều đã được xác nhận với điều chỉ mới là suy đoán.',tag:'CẦN KIỂM CHỨNG THÊM'},
  {title:'Đã thấy sự cố, chưa thấy toàn bộ cơ chế',text:'Bạn đã nhận diện được một phần vấn đề, nhưng chuỗi nguyên nhân, điều kiện và cách các phần tác động lẫn nhau vẫn chưa được nối thành lập luận đầy đủ.',tag:'CẦN PHÂN TÍCH TOÀN DIỆN'},
  {title:'Đã tìm được gốc rễ, cần hoàn thiện phương án',text:'Bạn đã thấy lỗi không chỉ nằm ở một cá nhân mà trong quan hệ dữ liệu và quy trình. Bước tiếp theo là xây phương án có kế thừa, điều kiện rõ ràng và kiểm thử.',tag:'NHẬN DIỆN ĐÚNG VẤN ĐỀ'},
  {title:'Khép lại hồ sơ bằng một lập luận có căn cứ',text:'Bạn đã đối chiếu hiện tượng với dữ kiện, tìm được cơ chế của sự cố và đề xuất phương án khôi phục trong giới hạn thực tế. Đây là cách vận dụng tư duy biện chứng vào một tình huống cụ thể.',tag:'LẬP LUẬN CÓ CĂN CỨ'}
];

export function ResultScreen(){
  const {state,dispatch,setHome,config:baseConfig}=useGame();
  const chapterLimit=state.chapterLimit??baseConfig.lastChapter,visibleTasks=baseConfig.tasks.filter(t=>t.chapter<=chapterLimit);
  const config={...baseConfig,tasks:visibleTasks,maxScore:visibleTasks.reduce((sum,t)=>sum+t.criteria.length,0)};
  const {tasks,initialOptions,verdictOptions}=config;
  const r=state.result!,ending=endings[r.ending-1],v=state.verdict!;
  return <main className="summary-page result-page"><div className="result-hero"><span className="result-seal"><FileCheck2 size={35}/></span><span className="eyebrow">KẾT THÚC 0{r.ending} / 04 · {ending.tag}</span><h1>{ending.title}</h1><p>{ending.text}</p><div className="result-score"><strong>{Math.round(r.score/config.maxScore*100)}<small>/100</small></strong><span>Mức độ hoàn chỉnh của lập luận<small>{r.score}/{config.maxScore} tiêu chí · đánh giá việc đối chiếu dữ kiện</small></span></div></div><div className="before-after"><article><span>NHẬN ĐỊNH BAN ĐẦU</span><h3>{initialOptions.find(o=>o.id===state.initial?.conclusion)?.label}</h3><small>Mức độ tin tưởng: {state.initial?.confidence}</small></article><ArrowRight size={23}/><article><span>SAU KHI ĐỐI CHIẾU</span><h3>{verdictOptions.find(o=>o.id===v.conclusion)?.label}</h3><small>{v.evidence.join(' · ')}</small></article></div>{r.ending===1&&<p className="note">{state.difficulty==='easy'?'Hãy đối chiếu lại kết luận với cuộc trao đổi đầy đủ và các mốc chạy thử.':v.conclusion==='V1'?'E07 và E08 cho thấy Nam không xóa mã nguồn; Mai chỉ đổi trạng thái hiển thị của dự án.':'E05 ghi nhận lỗi dữ liệu lúc 19:20, còn E06 cho thấy sự cố mạng chỉ xuất hiện từ 19:35. Hai sự kiện cần được phân biệt.'}</p>}{r.ending===2&&v.conclusion==='V3'&&<p className="note">{state.difficulty==='easy'?'Hãy kiểm tra lại chứng cứ hỗ trợ kết luận và các lập luận về sự cố trước khi khép hồ sơ.':'Để lập luận vững hơn, hãy nối E03–E05 thành cơ chế lỗi, dùng E07–E08 để kiểm tra quyết định ẩn demo và hoàn thiện các nhiệm vụ cốt lõi T01, T02, T05.'}</p>}{v.note&&<blockquote className="personal-conclusion">{v.note}</blockquote>}<h2>Hồ sơ lập luận của bạn</h2><div className="result-task-list">{tasks.map(t=>{const ev=r.evaluations[t.id];return <details key={t.id}><summary><span>{t.id}</span><strong>{t.title}</strong><b>{ev.score}/{t.criteria.length}</b></summary><ul>{t.criteria.map((c,i)=><li key={c}><span>{ev.met[i]?'✓':'○'} {c}</span><p>{t.feedback[i]}</p></li>)}</ul><small>Lần đầu: {state.attempts[t.id]?.[0].evaluation.score??0}/{t.criteria.length} · hiện tại: {ev.score}/{t.criteria.length} · Nộp lại {state.attempts[t.id]?.length??0} lần</small></details>;})}</div><h2>Bản đồ vận dụng phép biện chứng duy vật</h2><p className="muted">Tình huống trong hồ sơ là hư cấu, dùng để thực hành cách phân tích có căn cứ. Nguồn trang PDF tính từ 1; số trang in tính từ 84.</p><ConceptCards ids={tasks.flatMap(taskConcepts)}/><div className="summary-actions no-print"><button className="secondary" onClick={()=>dispatch({type:'reopen'})}><RotateCcw size={17}/> Hoàn thiện lập luận</button><button className="secondary" onClick={()=>window.print()}><Printer size={17}/> In kết quả</button><button className="primary" onClick={()=>setHome(true)}>Về trang chủ <ArrowRight size={17}/></button></div><footer className="result-foot">Hồ sơ HS-01 · Tình huống học tập hư cấu.<br/>Tài liệu tham chiếu: phepduyvatbienchung.pdf và các slide Tiết 16–21.</footer></main>;
}
