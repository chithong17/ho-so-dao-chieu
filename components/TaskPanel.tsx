import { playSfx } from '../lib/audio';
'use client';
import { useState, useEffect } from 'react';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Lightbulb, Link2, NotebookPen, Send, CheckCircle2, AlertCircle, Target, FileText } from 'lucide-react';
import { chainOptions, relationOptions, reportOptions, recoveryActions } from '../game/tasks';
import { answerComplete, caseCredibility, chapterComplete, chapterReadiness, emptyAnswer, evaluateChallenge, missionEvidence } from '../game/engine';
import type { Answer, Task, Evidence } from '../game/types';
import { useGame } from './GameProvider';
import { Chips, Choice, EvidencePicker, Sorter, InfoTooltip } from './ui';
import Simulations from './Simulations';
import { EvidenceCaption, EvidenceContent } from './EvidenceReader';
function TaskForm({ task, answer: a, change, onViewEvidence }: { task: Task; answer: Answer; change: (a: Answer) => void; onViewEvidence?: (id: string) => void }) {
  const { state, dispatch, config: { tasks, counterpoints } } = useGame();
  const credibility = caseCredibility(state);
  const meter = <div className="case-credibility" aria-label={`Độ tin cậy hồ sơ: ${credibility.score}/100, ${credibility.label}`} style={{ border: '1px solid var(--line, rgba(93,66,34,.32))', padding: '10px 12px', margin: '12px 0 18px', borderRadius: '8px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        ĐỘ TIN CẬY HỒ SƠ
        <InfoTooltip title="Cách tính độ tin cậy" text="Đánh giá mức độ chính xác và căn cứ của các lập luận. Sửa nộp lại hoặc xem gợi ý sẽ trừ điểm (-2 điểm/lần)." />
      </span>
      <strong>{credibility.score}/100 · {credibility.label}</strong>
    </div>
    <div style={{ height: '5px', background: 'rgba(41,31,19,.14)', margin: '8px 0', borderRadius: '999px', overflow: 'hidden' }}>
      <i style={{ display: 'block', height: '100%', width: `${credibility.score}%`, background: 'var(--accent, #7c5a2c)', borderRadius: 'inherit' }} />
    </div>
    <small>Được tính theo lập luận hiện tại và các dữ kiện bạn đã mở; sửa đáp án có thể làm chỉ số thay đổi.</small>
  </div>;
  const submitted = state.answers[task.id], counterpoint = counterpoints[task.id];
  const handleOpenEvidence = (evId: string) => {
    dispatch({ type: 'evidence', id: evId });
    if (onViewEvidence) {
      onViewEvidence(evId);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('hsdc-inspect-evidence', { detail: { id: evId } })
      );
    }
  };
  const reaction = submitted && counterpoint && evaluateChallenge(task.id, submitted).score < task.criteria.length ? <aside className="note counterpoint" role="status"><AlertCircle size={20} /><p><span className="eyebrow">PHẢN BIỆN MỚI · {counterpoint.role}</span><b>{counterpoint.speaker}:</b> {counterpoint.message}<br /><button type="button" className="text-button" onClick={() => handleOpenEvidence(counterpoint.evidence)} title={`Xem chi tiết chứng cứ ${counterpoint.evidence}`}>Đối chiếu {counterpoint.evidence} <ArrowRight size={14} /></button></p></aside> : null;
  const readiness = chapterReadiness(state, state.chapter);
  const gate = readiness.complete && !readiness.ready ? <aside className="note chapter-gate" role="status"><AlertCircle size={20} /><p><span className="eyebrow">HỒ SƠ CÒN MÂU THUẪN</span>Trước khi giải mã chương này, hãy xem lại các lập luận nền tảng:<br />{readiness.unresolved.map(({ taskId, minimum }) => <button className="text-button" key={taskId} onClick={() => dispatch({ type: 'task', id: taskId })}>{tasks.find(t => t.id === taskId)?.title} · cần ít nhất {minimum}/{tasks.find(t => t.id === taskId)?.criteria.length} <ArrowRight size={14} /></button>)}</p></aside> : null;
  let form;
  switch (a.kind) {
    case 'easyOrder': form = <><Sorter label={task.id === 'N5' ? <>Hành động và thứ tự <InfoTooltip text="Sắp xếp các bước thực hiện theo điều kiện trước - sau: bước sau chỉ làm được khi bước trước đã xong." /></> : <>Chuỗi tác động <InfoTooltip text="Chuỗi các mắt xích nhân - quả trực tiếp: nguyên nhân này thực sự tác động và sinh ra kết quả tiếp theo, không chỉ xếp theo thời gian." /></>} options={task.orderOptions!} value={a.order} max={3} onChange={order => change({ ...a, order })} />{task.id === 'N5' && <Simulations id={task.id} actions={a.order} />}<Choice label={task.questions![0].label} options={task.questions![0].options} value={a.conclusion} onChange={conclusion => change({ ...a, conclusion })} /></>; break;
    case 'choices': form = <>{['T05', 'T08', 'T10'].includes(task.id) && <Simulations id={task.id} />}{task.questions!.map(q => <Choice key={q.id} label={q.label} value={a.values[q.id] ?? ''} options={q.options} onChange={v => change({ ...a, values: { ...a.values, [q.id]: v } })} />)}</>; break;
    case 'classify': form = <><div className="classify-info-banner"><span><b>Giải thích mức độ có căn cứ:</b></span><InfoTooltip align="left" width={280} title="3 Mức độ đánh giá nhận định" content={<div className="tooltip-rich-list"><div className="tooltip-rich-row"><span className="tooltip-pill pill-fact">Dữ kiện được xác nhận</span><p>Sự thật khách quan đã được ghi nhận trực tiếp trên thông báo hoặc nhật ký hệ thống.</p></div><div className="tooltip-rich-row"><span className="tooltip-pill pill-supported">Nhận định có cơ sở, cần giới hạn</span><p>Có dữ liệu chứng cứ ủng hộ trong phạm vi nhất định; <strong>không được suy diễn phóng đại</strong>.</p></div><div className="tooltip-rich-row"><span className="tooltip-pill pill-unproven">Chưa được chứng minh</span><p>Giả thuyết, quy chụp cảm tính hoặc thông tin chưa hề có chứng cứ đối chứng.</p></div></div>} /></div>{[['s1', 'Demo không còn trong danh sách lúc 19:50.'], ['s2', 'Mã nguồn đã bị xóa.'], ['s3', 'Nam cố ý phá hoại vì bất mãn.'], ['s4', 'Việc rút demo liên quan đến tình trạng chưa test đạt.']].map(([id, label], i) => <label className="classify-item" key={id}><span><b>{i + 1}.</b> {label}</span><select aria-label={label} value={a.categories[id] ?? ''} onChange={e => change({ ...a, categories: { ...a.categories, [id]: e.target.value } })}><option value="">Chọn mức độ có căn cứ…</option><option value="fact">Dữ kiện được xác nhận (Đã có chứng cứ khách quan)</option><option value="supported">Nhận định có cơ sở, cần giới hạn (Có chứng cứ, không suy diễn)</option><option value="unproven">Chưa được chứng minh (Suy đoán, thiếu chứng cứ)</option></select></label>)}<EvidencePicker ids={task.evidence} value={a.evidence} onChange={evidence => change({ ...a, evidence })} /></>; break;
    case 'chain': form = <><Sorter label={<>Chuỗi tác động <InfoTooltip text="Chuỗi các mắt xích nhân - quả trực tiếp tạo ra lỗi đăng ký: nguyên nhân này thực sự tác động và sinh ra kết quả tiếp theo, không chỉ xếp theo mốc thời gian." /></>} options={chainOptions} value={a.order} max={4} onChange={order => change({ ...a, order })} /><Choice label={<>Lỗi và việc rút demo có quan hệ gì? <InfoTooltip text="Phân biệt lỗi kỹ thuật bên trong hệ thống với quyết định tiếp theo của con người." /></>} value={a.relation} options={[{ id: 'same', label: 'Là cùng một sự kiện kỹ thuật.' }, { id: 'decision', label: 'Lỗi chưa khắc phục là căn cứ cho quyết định rút demo tiếp theo.' }]} onChange={relation => change({ ...a, relation })} /></>; break;
    case 'relations': form = <><Chips label={<>Hai quan hệ ưu tiên <InfoTooltip text="Các mối liên kết then chốt cần giải quyết trước để luồng cốt lõi hoạt động trở lại." /></>} options={relationOptions} value={a.priority} max={2} onChange={priority => change({ ...a, priority })} /><Chips label={<>Hai quan hệ theo dõi <InfoTooltip text="Các yếu tố cần quan sát và chuẩn bị phương án dự phòng, nhưng không thay thế việc sửa lỗi chính." /></>} options={relationOptions} value={a.monitor} max={2} onChange={monitor => change({ ...a, monitor })} /><Choice label="Nguyên tắc ưu tiên giải quyết sự cố lúc này là gì?" value={a.reason} options={[{ id: 'expand', label: 'Càng thêm nhiều tính năng càng chắc chắn thành công.' }, { id: 'core', label: 'Sát giờ trình diễn: khôi phục luồng cốt lõi và xác nhận điều kiện.' }]} onChange={reason => change({ ...a, reason })} /></>; break;
    case 'report': form = <><Sorter label={<>Bố cục giải thích sự cố <InfoTooltip text="Sắp xếp thông tin theo trật tự logic: Nguyên nhân → Hậu quả → Biện pháp → Test lại." /></>} options={reportOptions} value={a.order} max={6} onChange={order => change({ ...a, order })} /><Choice label="Vì sao tổ chức lại thông tin?" value={a.reason} options={[{ id: 'structure', label: 'Bố cục và liên kết giữa các phần giúp làm rõ nội dung.' }, { id: 'color', label: 'Hình thức chỉ là chọn màu và phông chữ.' }]} onChange={reason => change({ ...a, reason })} /></>; break;
    case 'recovery': form = <><Choice label="Nhóm đang có gì?" value={a.reality} options={[{ id: 'available', label: 'Mã, bản lưu, dữ liệu thử và thành viên đã có. Demo còn cần thực hiện.' }, { id: 'nothing', label: 'Mọi thứ đã mất, cần bắt đầu lại từ số không.' }]} onChange={reality => change({ ...a, reality })} /><Sorter label={<>Hành động và thứ tự <InfoTooltip text="Sắp xếp các bước khôi phục demo theo quan hệ phụ thuộc trước - sau (bước sau cần điều kiện của bước trước)." /></>} options={recoveryActions.map(x => ({ id: x.id, label: `${x.id} · ${x.label} (${x.minutes}′)` }))} value={a.order} max={7} onChange={order => change({ ...a, order })} /><Simulations id={task.id} actions={a.order} /><Choice label="Sau mô phỏng thành công, kết luận gì?" value={a.conclusion} options={[{ id: 'production', label: 'Sản phẩm đã chắc chắn sẵn sàng phục vụ người dùng thật.' }, { id: 'limited', label: 'Demo giới hạn được thực hiện trong điều kiện mô phỏng; cần kiểm tra thêm để khai thác thật.' }]} onChange={conclusion => change({ ...a, conclusion })} /></>; break;
  }
  return <>{meter}{form}{reaction}{gate}</>;
}
export default function TaskPanel() {
  const { state: gameState, dispatch, config: { tasks, evidence, counterpoints }, trackedMission: activeMission, setTrackedMission } = useGame();
  const task = tasks.find(t => t.id === gameState.activeTask)!;
  const collectedIds = missionEvidence(gameState, task.id), state = { ...gameState, opened: collectedIds };
  const trackedMission = activeMission ? { ...activeMission, foundEvidenceIds: missionEvidence(gameState, activeMission.taskId) } : null;
  const [error, setError] = useState('');
  const [viewingEvidence, setViewingEvidence] = useState<Evidence | null>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setViewingEvidence(null);
      }
    };
    if (viewingEvidence) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [viewingEvidence]);
  const a = state.drafts[task.id] ?? state.answers[task.id] ?? emptyAnswer(task.id);
  const submitted = state.answers[task.id];
  const evaluation = submitted ? evaluateChallenge(task.id, submitted) : null;
  const isCompleted = !!evaluation && evaluation.score === task.criteria.length;
  const changed = !!submitted && JSON.stringify(a) !== JSON.stringify(submitted);
  const chapterTasks = tasks.filter(t => t.chapter === state.chapter), index = chapterTasks.findIndex(t => t.id === task.id), hints = state.hints[task.id] ?? 0;
  const isTracking = trackedMission?.taskId === task.id;
  const collectedEvidence = evidence.filter(e => collectedIds.includes(e.id));

  const handleOpenEvidenceDetail = (id: string) => {
    const ev = evidence.find(item => item.id === id);
    if (ev) setViewingEvidence(ev);
    dispatch({ type: 'evidence', id });
  };

  const toggleTrackMission = () => {
    if (isTracking) {
      setTrackedMission(null);
    } else {
      if (!Object.prototype.hasOwnProperty.call(state.missionProgress ?? {}, task.id)) dispatch({ type: 'acceptMission', id: task.id });
      setTrackedMission({
        taskId: task.id,
        taskTitle: task.title,
        evidenceIds: task.evidence,
      });
    }
  };
  const select = (id: string) => { setError(''); dispatch({ type: 'task', id }); };
  const submit = () => {
    if (!answerComplete(task.id, a)) {
      setError('Hãy hoàn tất các lựa chọn, đủ số thẻ và chứng cứ trước khi ghi nhận.');
      return;
    }
    const evalResult = evaluateChallenge(task.id, a);
    if (evalResult.score === task.criteria.length) {
      playSfx('stamp');
    } else {
      playSfx('click');
    }
    dispatch({ type: 'submit', id: task.id, answer: a, at: new Date().toISOString() });
    setError('');
  };
  return <aside className="task-panel" aria-label="Nhiệm vụ điều tra"><div className="task-panel-left" style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden', position: 'relative' }}>
    {isCompleted && (
      <div className="red-stamp-completed" aria-label="Nhiệm vụ đã hoàn thành">
        <div className="stamp-inner-border">
          <span className="stamp-sub">HỒ SƠ HS–01 · {task.id}</span>
          <strong className="stamp-main">ĐÃ HOÀN THÀNH</strong>
          <span className="stamp-detail">✓ LẬP LUẬN CHUẨN XÁC</span>
        </div>
      </div>
    )}
    <div className="task-panel-head"><span><NotebookPen size={17} /> Sổ điều tra</span><span>{index + 1} / {chapterTasks.length}</span></div><div className="task-pagination">{chapterTasks.map((t, i) => {
      const isTaskDone = !!state.answers[t.id] && evaluateChallenge(t.id, state.answers[t.id]).score === t.criteria.length;
      return <button aria-label={`Nhiệm vụ ${t.id}`} key={t.id} className={t.id === task.id ? 'active' : isTaskDone ? 'done completed' : state.answers[t.id] ? 'done' : ''} onClick={() => select(t.id)}>{t.id === task.id || isTaskDone ? <Check size={14} /> : String(i + 1).padStart(2, '0')}</button>;
    })}</div>

    {collectedEvidence.length > 0 ? (
      <div className="notebook-collected-evidence-section">
        <div className="collected-section-header">
          <FileText size={15} />
          <span>CHỨNG CỨ ĐÃ THU THẬP ({collectedEvidence.length}/{task.evidence.length})</span>
        </div>
        <div className={`collected-polaroids-list ${collectedEvidence.length === 1 ? 'single-item' : 'two-columns'} custom-scroll`}>
          {collectedEvidence.map((ev, i) => {
            const rotationAngle = i % 2 === 0 ? -2.5 : 2;
            const tapeAngle = i % 2 === 0 ? 3 : -2.5;
            const bgImg = ev.app === 'chat' || ev.app === 'files' ? '/scene_desk.png' : ev.app === 'terminal' ? '/scene_wall.jpg' : '/bg_room.jpg';
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
                    <CheckCircle2 size={13} style={{ stroke: '#15803d', display: 'inline', verticalAlign: '-2px', marginRight: '4px' }} />
                    Bấm để xem chi tiết
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <div className="polaroid-decor" style={{ marginTop: '20px', padding: '0 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.85, transform: 'rotate(-2deg)' }}>
        <div style={{ background: '#f8f8f8', padding: '6px 6px 24px 6px', boxShadow: '2px 4px 12px rgba(0,0,0,0.4)', width: '180px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%) rotate(3deg)', width: '50px', height: '16px', background: 'rgba(230, 220, 200, 0.7)', border: '1px solid rgba(0,0,0,0.1)' }}></div>
          <div style={{ width: '100%', height: '120px', background: 'url(/bg_room.jpg) center/cover no-repeat', filter: 'grayscale(100%) contrast(1.1) brightness(0.9)' }}></div>
        </div>
        <div style={{ marginTop: '20px', fontFamily: '"Patrick Hand", cursive', fontSize: '16px', textAlign: 'center', color: '#1a140f', transform: 'rotate(1deg)' }}>
          "Mỗi vấn đề,<br />đều có một hướng giải."
        </div>
      </div>
    )}

  </div><div className="task-content" key={task.id} style={{ position: 'relative' }}>
      <span className="eyebrow">LẬP LUẬN {task.id.slice(1)}</span><h2>{task.title}</h2><p className="task-prompt">{task.prompt}</p><div className="related-evidence"><span style={{ display: 'inline-flex', alignItems: 'center' }}><Link2 size={13} /> Đối chiếu <InfoTooltip title="Đối chiếu chứng cứ" text="Bấm vào các chứng cứ (E01, E02, ...) để mở xem chi tiết tài liệu đã thu thập nhằm tìm dữ kiện kiểm chứng." /></span>{task.evidence.map(id => { const isFound = (trackedMission?.foundEvidenceIds?.includes(id) ?? false) || state.opened.includes(id); return <button key={id} type="button" disabled={!isFound} onClick={() => { if (isFound) { const ev = evidence.find(item => item.id === id); if (ev) setViewingEvidence(ev); dispatch({ type: 'evidence', id }); } }} title={isFound ? `Xem chi tiết chứng cứ ${id}` : `Chứng cứ ${id} chưa được thu thập (Hãy tìm kiếm trong phòng)`} className={isFound ? 'unlocked' : 'locked'} style={!isFound ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}>{id}</button>; })}{task.evidence?.length > 0 && <button type="button" className={`collect-mission-btn ${isCompleted ? 'completed' : isTracking ? 'active' : ''}`} onClick={toggleTrackMission} title={isCompleted ? 'Nhiệm vụ này đã hoàn thành' : isTracking ? 'Bỏ theo dõi nhiệm vụ này' : 'Nhận nhiệm vụ điều tra này'} aria-label={isCompleted ? 'Đã hoàn thành' : isTracking ? 'Đã thu thập (Đã nhận nhiệm vụ)' : 'Thu thập nhiệm vụ (Nhận nhiệm vụ)'} data-sfx="pin">{isCompleted ? <CheckCircle2 size={13} style={{ color: '#16a34a' }} /> : isTracking ? <Check size={13} /> : <Target size={13} />}<span>{isCompleted ? 'Đã hoàn thành' : isTracking ? 'Đã nhận nhiệm vụ' : 'Nhận nhiệm vụ'}</span></button>}</div><TaskForm task={task} answer={a} change={answer => dispatch({ type: 'draft', id: task.id, answer })} onViewEvidence={handleOpenEvidenceDetail} /><div className="hint-area">{hints < 2 && <button className="text-button" onClick={() => dispatch({ type: 'hint', id: task.id })}><Lightbulb size={16} /> {hints ? 'Gợi ý tiếp theo' : 'Cần một gợi ý?'} <small>{hints}/2</small></button>}{task.hints.slice(0, hints).map((h, i) => <p className="hint" key={i}>{h}</p>)}</div><details className="notes"><summary style={{ display: 'inline-flex', alignItems: 'center' }}>Ghi chú riêng <small>không chấm điểm</small> <InfoTooltip title="Ghi chú cá nhân" text="Ghi chép tự do suy nghĩ hoặc phân tích của bạn, không ảnh hưởng đến điểm số đánh giá." /></summary><textarea aria-label="Ghi chú riêng" maxLength={500} value={state.notes[task.id] ?? ''} onChange={e => dispatch({ type: 'note', id: task.id, note: e.target.value })} placeholder="Căn cứ nào khiến bạn giữ hoặc đổi nhận định?" /></details>{error && <p className="form-error" role="alert">{error}</p>}{submitted && changed && <div className="resubmit-penalty-warning"><span>Sửa và nộp lại sẽ -2 điểm độ tin cậy của hồ sơ.</span></div>}<button className="primary submit-button" onClick={submit} disabled={!!submitted && !changed}><Send size={16} />{isCompleted && !changed ? '✓ Lập luận đã chuẩn xác (Đã hoàn thành)' : submitted && !changed ? 'Đã ghi nhận lập luận' : submitted ? 'Cập nhật lập luận (-2 điểm nộp lại)' : 'Ghi nhận lập luận'}</button>{evaluation && <div className="evaluation" role="status"><div className="evaluation-title"><CheckCircle2 size={18} /><strong>{evaluation.score}/{task.criteria.length} tiêu chí có căn cứ</strong></div>{changed && <small>Phản hồi của lần nộp trước; ghi nhận để đánh giá bản sửa.</small>}{task.criteria.map((c, i) => <details key={c}><summary>{evaluation.met[i] ? <Check size={14} /> : <AlertCircle size={14} />}<span>{c}</span></summary><p>{task.feedback[i]}</p></details>)}</div>}<div className="task-next">{index > 0 && <button className="text-button" onClick={() => select(chapterTasks[index - 1].id)}><ChevronLeft size={16} /> Trước</button>}{index < chapterTasks.length - 1 && <button className="text-button" onClick={() => select(chapterTasks[index + 1].id)}>Nhiệm vụ tiếp <ChevronRight size={16} /></button>}</div>{chapterComplete(state, state.chapter) && <button className="chapter-finish" onClick={() => dispatch({ type: 'debrief' })}>Giải mã chương {state.chapter}<ArrowRight size={18} /></button>}</div>
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
              <span className="modal-dossier-label" style={{ color: '#f6c86e' }}>HỒ SƠ CHỨNG CỨ</span>
              <span className="modal-badge" style={{ color: '#ffffff', background: '#dc2626' }}>{viewingEvidence.id}</span>
              <strong title={viewingEvidence.title} style={{ color: '#ffffff' }}>{viewingEvidence.title}</strong>
            </div>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setViewingEvidence(null)}
              aria-label="Đóng chi tiết chứng cứ"
              style={{ color: '#ffffff' }}
            >
              ✕
            </button>
          </div>
          <div className="notebook-evidence-modal-body custom-scroll">
            <EvidenceContent item={viewingEvidence} />
            <EvidenceCaption item={viewingEvidence} />
          </div>
        </div>
      </div>
    )}
  </aside>;
}
