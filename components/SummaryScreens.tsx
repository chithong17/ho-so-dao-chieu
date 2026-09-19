'use client';
import { useEffect, useState } from 'react';
import { playBgm, playSfx } from '../lib/audio';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ExternalLink, Eye, FileCheck2, FileSearch, FolderOpen, Layers, Lightbulb, Printer, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import { useGame } from './GameProvider';
import { taskConcepts } from '../game/config';
import { easyLessons } from '../game/easy';
import { chapterTruths } from '../game/truths';
import { EvidenceContent } from './EvidenceReader';
import { Modal } from './ui';

import { evaluateChallenge, simulateRecovery, simulateEasyRecovery } from '../game/engine';
import type { ConceptId, Evidence, Verdict } from '../game/types';
import { Choice, EvidencePicker } from './ui';

export function ConceptCards({ ids }: { ids: ConceptId[] }) {
  const { config: { concepts } } = useGame();
  return <div className="concept-grid">{[...new Set(ids)].map(id => { const c = concepts.find(c => c.id === id)!; return <article className="concept-card" key={id}><span className="concept-id">{id.startsWith('NL') ? 'NGUYÊN LÝ' : id.startsWith('QL') ? 'QUY LUẬT' : 'CẶP PHẠM TRÙ'} · {id}</span><h3>{c.title}</h3><p>{c.explanation}</p><details><summary>Liên hệ hồ sơ & giới hạn</summary><p><b>Trong hồ sơ:</b> {c.application}</p><p className="concept-limit"><Lightbulb size={16} />{c.limit}</p></details><footer><BookOpen size={13} /><span>phepduyvatbienchung.pdf · tr. {c.pages[0]}–{c.pages[1]}<br />Trang in {c.pages[0] + 83}–{c.pages[1] + 83} · {c.slide}</span></footer></article>; })}{!ids.length && <p className="note">Hoàn thành một chương để mở phần giải mã kiến thức tương ứng.</p>}</div>;
}

const chapterLessons = {
  1: { title: 'Bài học chương 1: Đừng kết luận từ một dấu hiệu.', text: 'Tin nhắn bị cắt và dự án biến mất là những hiện tượng cần kiểm tra. Chỉ khi đối chiếu hội thoại đầy đủ, nhật ký trạng thái và kết quả test, người chơi mới có cơ sở phân biệt hành vi thực tế với suy đoán.', takeaway: 'Khi một kết quả xuất hiện, hãy tìm chuỗi tác động tạo ra nó; việc xảy ra trước hoặc gây ấn tượng mạnh chưa tự nó là nguyên nhân.' },
  2: { title: 'Bài học chương 2: Nhìn hệ thống, nhưng không khái quát vội.', text: 'Sự cố của Mạch Nối không chỉ nằm ở một trường dữ liệu. Nó bộc lộ mối liên hệ giữa yêu cầu, bàn giao, test và tổ chức công việc. Tuy vậy, mỗi dự án vẫn có hoàn cảnh và lỗi cụ thể riêng.', takeaway: 'Xem xét toàn diện không có nghĩa coi mọi yếu tố ngang nhau. Hãy tìm quan hệ chủ yếu, phân biệt điều kiện bên ngoài với nguyên nhân trực tiếp và tổ chức thông tin theo đúng mục đích.' },
  3: { title: 'Bài học chương 3: Khả năng cần điều kiện để thành hiện thực.', text: 'Nhóm có mã nguồn, bản sao lưu và thời gian: đó mới là tiền đề. Bản demo chỉ có thể trở lại khi các bước phụ thuộc được thực hiện đúng, có test và kế thừa những điểm còn phù hợp của quy trình cũ.', takeaway: 'Đổi mới không phải xóa sạch. Cần tích lũy đúng yếu tố, giải quyết mâu thuẫn trong tổ chức và kiểm chứng kết quả trong điều kiện cụ thể.' }
} as const;

export function Debrief() {
  useEffect(() => { playSfx('chapter'); }, []);
  const { state, dispatch, config: baseConfig } = useGame();
  const config = { ...baseConfig, lastChapter: state.chapterLimit ?? baseConfig.lastChapter };
  const { tasks, evidence } = config;
  const chapterTasks = tasks.filter(t => t.chapter === state.chapter);
  const chapterEvidence = evidence.filter(e => e.chapter === state.chapter);
  const lesson = state.difficulty === 'easy' ? easyLessons[state.chapter as 1 | 2] : chapterLessons[state.chapter];
  const truth = chapterTruths[state.chapter];

  const [viewingEvidence, setViewingEvidence] = useState<Evidence | null>(null);

  return (
    <main className="summary-page debrief-page">
      {/* Page Header */}
      <div className="summary-heading">
        <span className="eyebrow">GIẢI MÃ CHƯƠNG 0{state.chapter}</span>
        <h1>{lesson.title}</h1>
        <p>{lesson.text}</p>
      </div>

      {/* SECTION 1: Danh sách chứng cứ đã thu thập (dạng băng dính) + lời giải hiển thị trực tiếp */}
      <section className="debrief-section debrief-evidence-section">
        <div className="debrief-section-header">
          <div className="section-title-wrap">
            <span className="section-badge"><FolderOpen size={16} /> MỤC 01</span>
            <h2>Danh mục chứng cứ thu thập & Lời giải vụ án</h2>
          </div>
          <p className="section-subtitle">
            Tất cả các tài liệu và vết tích đã được thu thập trong Chương 0{state.chapter}. Lời giải pháp lý và ý nghĩa chứng minh thực tế được trình bày trực tiếp dưới mỗi chứng cứ. Bấm vào bất kỳ chứng cứ nào để mở rộng tài liệu gốc.
          </p>
        </div>

        <div className="debrief-evidence-grid">
          {chapterEvidence.map((ev, idx) => {
            const bgImg = ev.app === 'chat' || ev.app === 'files' 
              ? '/scene_desk.jpg' 
              : ev.app === 'terminal' 
                ? '/scene_wall.jpg' 
                : '/bg_room.jpg';
            const tapeAngle = idx % 2 === 0 ? -1.8 : 1.8;
            const cardAngle = idx % 3 === 0 ? -0.8 : idx % 3 === 1 ? 0.8 : -0.3;

            return (
              <div
                key={ev.id}
                className="debrief-polaroid-card taped-polaroid-item"
                style={{ transform: `rotate(${cardAngle}deg)` }}
                onClick={() => setViewingEvidence(ev)}
                role="button"
                tabIndex={0}
                title={`Bấm để xem tài liệu gốc: ${ev.id} · ${ev.title}`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setViewingEvidence(ev);
                  }
                }}
              >
                {/* Adhesive Tape */}
                <div
                  className="polaroid-tape"
                  style={{ transform: `translateX(-50%) rotate(${tapeAngle}deg)` }}
                />

                {/* Photo Frame with scene thumbnail */}
                <div className="polaroid-photo-frame">
                  <div
                    className="polaroid-photo-img"
                    style={{ backgroundImage: `url(${bgImg})` }}
                  >
                    <span className="card-badge polaroid-stamp">{ev.id}</span>
                    <span className="polaroid-app-tag">
                      {ev.app === 'chat' ? 'Tin nhắn' : ev.app === 'terminal' ? 'Nhật ký' : ev.app === 'mail' ? 'Hộp thư' : ev.app === 'lab' ? 'Mô phỏng' : 'Tài liệu'}
                    </span>
                    <span className="polaroid-view-overlay">
                      <Eye size={15} /> Xem tài liệu gốc
                    </span>
                  </div>
                </div>

                {/* Polaroid Metadata */}
                <div className="polaroid-caption">
                  <strong className="polaroid-title">{ev.title}</strong>
                  <span className="polaroid-author-time">{ev.author} · {ev.time}</span>
                </div>

                {/* SECTION 1 CORE REQUIREMENT: Solution displayed directly on the card */}
                <div className="debrief-evidence-solution">
                  <div className="solution-badge">
                    <CheckCircle2 size={13} />
                    <span>LỜI GIẢI & Ý NGHĨA CHỨNG MINH</span>
                  </div>
                  <p className="solution-text">{ev.summary}</p>
                </div>

                {/* Quick inspect trigger */}
                <div className="polaroid-card-footer">
                  <button
                    type="button"
                    className="polaroid-inspect-btn"
                    onClick={e => {
                      e.stopPropagation();
                      setViewingEvidence(ev);
                    }}
                  >
                    <ExternalLink size={13} /> Xem toàn bộ văn bản gốc
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: Giải thích chân tướng của chương (tương tự 1.3 trong COT_TRUYEN_VA_DAP_AN.md) */}
      {truth && (
        <section className="debrief-section debrief-truth-section">
          <div className="debrief-section-header">
            <div className="section-title-wrap">
              <span className="section-badge gold"><FileSearch size={16} /> MỤC 02</span>
              <h2>Giải mã chân tướng — Bản chất sự kiện</h2>
            </div>
            <p className="section-subtitle">
              Đối chiếu dữ kiện thực tế và phân tích bản chất khách quan, tháo gỡ toàn bộ những hiểu lầm và suy đoán cảm tính trong hồ sơ vụ án.
            </p>
          </div>

          <div className="truth-hero-banner">
            <div className="truth-hero-header">
              <span className="truth-tag">{truth.tag}</span>
              <h3>{truth.headline}</h3>
            </div>
            <p className="truth-summary-lead">{truth.summary}</p>
          </div>

          <div className="truth-cards-grid">
            {truth.points.map(pt => (
              <article key={pt.number} className="truth-point-card">
                <div className="truth-card-header">
                  <span className="truth-card-num">{pt.number}</span>
                  <div className="truth-card-heading">
                    <h4>{pt.title}</h4>
                    <span className="truth-highlight-pill">{pt.highlight}</span>
                  </div>
                </div>
                <p className="truth-card-desc">{pt.description}</p>
                {pt.badges && pt.badges.length > 0 && (
                  <div className="truth-card-badges">
                    <span className="badge-label">Chứng cứ chứng minh:</span>
                    {pt.badges.map(b => (
                      <span key={b} className="truth-evidence-badge">{b}</span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: Liên hệ kiến thức triết học Mác – Lênin */}
      <section className="debrief-section debrief-knowledge-section">
        <div className="debrief-section-header">
          <div className="section-title-wrap">
            <span className="section-badge blue"><Layers size={16} /> MỤC 03</span>
            <h2>Liên hệ kiến thức & Phương pháp luận Triết học</h2>
          </div>
          <p className="section-subtitle">
            Soi chiếu các hiện tượng trong vụ án bằng 2 Nguyên lý, 3 Quy luật và 6 Cặp phạm trù của Phép biện chứng duy vật để rút ra bài học phương pháp luận.
          </p>
        </div>

        {/* Methodological Takeaway Banner */}
        <div className="debrief-takeaway-banner">
          <div className="takeaway-icon-box">
            <ShieldCheck size={28} />
          </div>
          <div className="takeaway-content">
            <span className="takeaway-kicker">BÀI HỌC PHƯƠNG PHÁP LUẬN CẦN GHI NHỚ</span>
            <blockquote className="takeaway-quote">{lesson.takeaway}</blockquote>
          </div>
        </div>

        {/* Task performance recap */}
        <div className="debrief-tasks-summary">
          <span className="eyebrow">KẾT QUẢ ĐỐI CHIẾU LẬP LUẬN CỦA BẠN QUA CÁC NHIỆM VỤ</span>
          <div className="debrief-recap">
            {chapterTasks.map(t => {
              const a = state.answers[t.id];
              const e = a ? evaluateChallenge(t.id, a) : { score: 0, met: t.criteria.map(() => false) };
              return (
                <div key={t.id}>
                  <span className="score-circle">
                    {e.score}<small>/{t.criteria.length}</small>
                  </span>
                  <div>
                    <strong>{t.title}</strong>
                    <p>{t.feedback[e.met.findIndex(m => !m) < 0 ? 0 : e.met.findIndex(m => !m)]}</p>
                  </div>
                  <button
                    aria-label={`Sửa ${t.id}`}
                    className="icon-button"
                    onClick={() => dispatch({ type: 'task', id: t.id })}
                    title={`Làm lại nhiệm vụ ${t.id}`}
                  >
                    <RotateCcw size={17} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Concept Cards */}
        <div className="debrief-concepts-wrap">
          <span className="eyebrow" style={{ marginBottom: '14px', display: 'block' }}>
            CÁC CẶP PHẠM TRÙ & QUY LUẬT BIỆN CHỨNG TRỌNG TÂM
          </span>
          <ConceptCards ids={chapterTasks.flatMap(taskConcepts)} />
        </div>
      </section>

      {/* Action Buttons */}
      <div className="summary-actions">
        <button
          className="secondary"
          onClick={() => dispatch({ type: 'chapter', chapter: state.chapter })}
        >
          <ArrowLeft size={17} /> Xem lại lập luận chương
        </button>
        <button
          className="primary"
          onClick={() => dispatch({ type: 'next' })}
        >
          {state.chapter === config.lastChapter ? 'Viết kết luận chung cuộc' : 'Mở chương tiếp theo'}
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Modal for viewing raw evidence details */}
      {viewingEvidence && (
        <Modal
          title={`Hồ sơ HS-01 / Chứng cứ ${viewingEvidence.id}: ${viewingEvidence.title}`}
          onClose={() => setViewingEvidence(null)}
        >
          <div className="debrief-evidence-modal-body">
            <EvidenceContent item={viewingEvidence} />
            <div className="modal-evidence-solution-box">
              <div className="solution-badge">
                <CheckCircle2 size={16} />
                <strong>LỜI GIẢI VỤ ÁN & Ý NGHĨA CHỨNG MINH THỰC TẾ</strong>
              </div>
              <p>{viewingEvidence.summary}</p>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}

export function VerdictScreen() {
  useEffect(() => { playBgm('verdict'); }, []);
  const { state, dispatch, config: baseConfig } = useGame();
  const chapterLimit = state.chapterLimit ?? baseConfig.lastChapter;
  const config = { ...baseConfig, lastChapter: chapterLimit, verdictEvidence: baseConfig.verdictEvidence.filter(id => baseConfig.evidence.find(e => e.id === id)!.chapter <= chapterLimit), verdictEvidenceCount: Math.min(baseConfig.verdictEvidenceCount, chapterLimit) };
  const { initialOptions, verdictOptions } = config;
  const [v, setV] = useState<Verdict>(state.verdict ?? { conclusion: 'V4', evidence: [], note: '' }), [error, setError] = useState('');
  const a = state.answers[config.recoveryTask], recovery = state.difficulty === 'easy' ? { ...simulateEasyRecovery(a?.kind === 'easyOrder' ? a.order : []), totalTime: 0 } : simulateRecovery(a?.kind === 'recovery' ? a.order : []);
  const update = (next: Verdict) => { setV(next); dispatch({ type: 'verdictDraft', verdict: next }); };
  return <main className="summary-page verdict-page"><div className="summary-heading"><span className="eyebrow">HỒ SƠ HS-01 / KẾT LUẬN ĐIỀU TRA</span><h1>Điều gì đã thực sự xảy ra?</h1><p>Hãy chọn nhận định và dùng chứng cứ để giải thích, thay vì chỉ lặp lại dấu hiệu ban đầu.</p></div><div className="verdict-layout"><section className="verdict-form"><Choice label="Kết luận của bạn" options={verdictOptions} value={v.conclusion} onChange={conclusion => update({ ...v, conclusion: conclusion as Verdict['conclusion'] })} /><EvidencePicker ids={config.verdictEvidence} value={v.evidence} max={config.verdictEvidenceCount} onChange={ev => update({ ...v, evidence: ev })} /><label className="final-notes">Ghi chú lập luận <small>không chấm tự động · {v.note.length}/500</small><textarea value={v.note} maxLength={500} onChange={e => update({ ...v, note: e.target.value })} placeholder="Hãy nêu chuỗi dữ kiện khiến bạn đi đến kết luận này…" /></label>{error && <p role="alert" className="form-error">{error}</p>}<button className="primary" onClick={() => { if (v.evidence.length === 0) { setError('Hãy gắn ít nhất một chứng cứ trước khi lưu kết luận.'); return; } playSfx('stamp'); setTimeout(() => dispatch({ type: 'finish', verdict: v }), 500); }}><FileCheck2 size={18} /> Lưu kết luận <ArrowRight size={18} /></button></section><aside className="verdict-aside"><span className="eyebrow">NHÌN LẠI</span><h3>Nhận định ban đầu</h3><blockquote>{initialOptions.find(o => o.id === state.initial?.conclusion)?.label}</blockquote><p className="muted">Mức độ tin tưởng ban đầu: {state.initial?.confidence}</p><div className="paper-rule" /><h3>Phương án khôi phục</h3><span className={`budget-pill ${recovery.success ? 'good' : 'bad'}`}>{state.difficulty === 'easy' ? `${a?.kind === 'easyOrder' ? a.order.length : 0} / 3 công việc` : `${recovery.totalTime} / 60 phút`}</span><p>{recovery.message}</p><button className="text-button" onClick={() => dispatch({ type: 'task', id: config.recoveryTask })}>Xem lại phương án <ArrowRight size={15} /></button><div className="note"><ShieldCheck size={20} /><p>Bạn có thể đổi kết luận khi chứng cứ mới cho thấy nhận định ban đầu chưa đủ căn cứ.</p></div></aside></div><button className="text-button" onClick={() => dispatch({ type: 'chapter', chapter: config.lastChapter })}><ArrowLeft size={16} /> Quay lại chương {config.lastChapter}</button></main>;
}

const endings = [
  { title: 'Kết luận còn vội', text: 'Bạn đã dựa quá nhiều vào một dấu hiệu hoặc bỏ qua những dữ kiện đối chiếu. Hãy trở lại hồ sơ, phân biệt điều đã được xác nhận với điều chỉ mới là suy đoán.', tag: 'CẦN KIỂM CHỨNG THÊM' },
  { title: 'Đã thấy sự cố, chưa thấy toàn bộ cơ chế', text: 'Bạn đã nhận diện được một phần vấn đề, nhưng chuỗi nguyên nhân, điều kiện và cách các phần tác động lẫn nhau vẫn chưa được nối thành lập luận đầy đủ.', tag: 'CẦN PHÂN TÍCH TOÀN DIỆN' },
  { title: 'Đã tìm được gốc rễ, cần hoàn thiện phương án', text: 'Bạn đã thấy lỗi không chỉ nằm ở một cá nhân mà trong quan hệ dữ liệu và quy trình. Bước tiếp theo là xây phương án có kế thừa, điều kiện rõ ràng và test.', tag: 'NHẬN DIỆN ĐÚNG VẤN ĐỀ' },
  { title: 'Khép lại hồ sơ bằng một lập luận có căn cứ', text: 'Bạn đã đối chiếu hiện tượng với dữ kiện, tìm được cơ chế của sự cố và đề xuất phương án khôi phục trong giới hạn thực tế. Đây là cách vận dụng tư duy biện chứng vào một tình huống cụ thể.', tag: 'LẬP LUẬN CÓ CĂN CỨ' }
];

export function ResultScreen() {
  const { state, dispatch, setHome, config: baseConfig } = useGame();
  const chapterLimit = state.chapterLimit ?? baseConfig.lastChapter, visibleTasks = baseConfig.tasks.filter(t => t.chapter <= chapterLimit);
  const config = { ...baseConfig, tasks: visibleTasks, maxScore: visibleTasks.reduce((sum, t) => sum + t.criteria.length, 0) };
  const { tasks, initialOptions, verdictOptions } = config;
  const r = state.result!, ending = endings[r.ending - 1], v = state.verdict!;
  return <main className="summary-page result-page"><div className="result-hero"><span className="result-seal"><FileCheck2 size={35} /></span><span className="eyebrow">KẾT THÚC 0{r.ending} / 04 · {ending.tag}</span><h1>{ending.title}</h1><p>{ending.text}</p><div className="result-score"><strong>{Math.round(r.score / config.maxScore * 100)}<small>/100</small></strong><span>Mức độ hoàn chỉnh của lập luận<small>{r.score}/{config.maxScore} tiêu chí · đánh giá việc đối chiếu dữ kiện</small></span></div></div><div className="before-after"><article><span>NHẬN ĐỊNH BAN ĐẦU</span><h3>{initialOptions.find(o => o.id === state.initial?.conclusion)?.label}</h3><small>Mức độ tin tưởng: {state.initial?.confidence}</small></article><ArrowRight size={23} /><article><span>SAU KHI ĐỐI CHIẾU</span><h3>{verdictOptions.find(o => o.id === v.conclusion)?.label}</h3><small>{v.evidence.join(' · ')}</small></article></div>{r.ending === 1 && <p className="note">{state.difficulty === 'easy' ? 'Hãy đối chiếu lại kết luận với cuộc trao đổi đầy đủ và các mốc chạy thử.' : v.conclusion === 'V1' ? 'E07 và E08 cho thấy Nam không xóa mã nguồn; Mai chỉ đổi trạng thái hiển thị của dự án.' : 'E05 ghi nhận lỗi dữ liệu lúc 19:20, còn E06 cho thấy sự cố mạng chỉ xuất hiện từ 19:35. Hai sự kiện cần được phân biệt.'}</p>}{r.ending === 2 && v.conclusion === 'V3' && <p className="note">{state.difficulty === 'easy' ? 'Hãy kiểm tra lại chứng cứ hỗ trợ kết luận và các lập luận về sự cố trước khi khép hồ sơ.' : 'Để lập luận vững hơn, hãy nối E03–E05 thành cơ chế lỗi, dùng E07–E08 để kiểm tra quyết định ẩn demo và hoàn thiện các nhiệm vụ cốt lõi T01, T02, T05.'}</p>}{v.note && <blockquote className="personal-conclusion">{v.note}</blockquote>}<h2>Hồ sơ lập luận của bạn</h2><div className="result-task-list">{tasks.map(t => { const ev = r.evaluations[t.id]; return <details key={t.id}><summary><span>{t.id}</span><strong>{t.title}</strong><b>{ev.score}/{t.criteria.length}</b></summary><ul>{t.criteria.map((c, i) => <li key={c}><span>{ev.met[i] ? '✓' : '○'} {c}</span><p>{t.feedback[i]}</p></li>)}</ul><small>Lần đầu: {state.attempts[t.id]?.[0].evaluation.score ?? 0}/{t.criteria.length} · hiện tại: {ev.score}/{t.criteria.length} · Nộp lại {state.attempts[t.id]?.length ?? 0} lần</small></details>; })}</div><h2>Bản đồ vận dụng phép biện chứng duy vật</h2><p className="muted">Tình huống trong hồ sơ là hư cấu, dùng để thực hành cách phân tích có căn cứ. Nguồn trang PDF tính từ 1; số trang in tính từ 84.</p><ConceptCards ids={tasks.flatMap(taskConcepts)} /><div className="summary-actions no-print"><button className="secondary" onClick={() => dispatch({ type: 'reopen' })}><RotateCcw size={17} /> Hoàn thiện lập luận</button><button className="secondary" onClick={() => window.print()}><Printer size={17} /> In kết quả</button><button className="primary" onClick={() => setHome(true)}>Về trang chủ <ArrowRight size={17} /></button></div><footer className="result-foot">Hồ sơ HS-01 · Tình huống học tập hư cấu.<br />Tài liệu tham chiếu: phepduyvatbienchung.pdf và các slide Tiết 16–21.</footer></main>;
}
