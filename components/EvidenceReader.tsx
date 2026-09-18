'use client';
import { Archive, CheckCheck, ChevronDown, FileText, Folder, Info, LockKeyhole, Mail, MoreHorizontal, Paperclip, Pin, ShieldCheck, Terminal, Users, Wifi } from 'lucide-react';
import type { Evidence } from '../game/types';
import { Avatar } from './ui';
import { useGame } from './GameProvider';
export const appNames = { chat: 'Mạch Nối Chat', mail: 'Hộp thư', files: 'Tài liệu nhóm', terminal: 'Nhật ký hệ thống', lab: 'Phòng tái dựng' };
function Table({ rows }: { rows: string[][] }) { return <div className="table-scroll"><table><thead><tr>{rows[0].map((v, i) => <th key={i}>{v}</th>)}</tr></thead><tbody>{rows.slice(1).map((r, i) => <tr key={i}>{r.map((v, j) => <td key={j}>{v}</td>)}</tr>)}</tbody></table></div>; }
export function EvidenceContent({ item, compact = false }: { item: Evidence; compact?: boolean }) {
  if (item.app === 'chat') return <div className={`chat-app ${compact ? 'compact' : ''}`}><div className="chat-header"><span className="group-avatar"><Users size={20} /></span><div><strong>Mạch Nối</strong><small>Nhóm dự án · 4 thành viên</small></div><span className="archive-badge"><LockKeyhole size={12} /> Bản lưu</span></div><div className="chat-date">NGÀY D · TRƯỚC TRIỂN LÃM</div><div className="chat-messages">{item.body.map((line, i) => { const pieces = line.split('|'), name = pieces.length === 3 ? pieces[0] : 'Nam', time = pieces.length === 3 ? pieces[1] : '19:42', message = pieces.length === 3 ? pieces[2] : line; return <div className={`chat-message ${name === 'Mai' ? 'outgoing' : ''}`} key={i}><Avatar name={name} /><div><div className="message-author">{name}<span>{name === 'Nam' ? 'Tích hợp' : name === 'Mai' ? 'Điều phối' : 'Trải nghiệm'}</span></div><div className={`bubble ${item.id === 'E01' ? 'cropped' : ''}`}><p>{message}</p><small>{time} <CheckCheck size={13} /></small></div></div></div>; })}{item.id === 'E01' && <div className="crop-notice"><span className="cut-line" /><span><Info size={14} /> Ảnh bị cắt · thiếu phần tiếp theo</span><span className="cut-line" /></div>}</div><div className="chat-compose"><LockKeyhole size={16} /><span>Hội thoại lưu trữ · chỉ đọc</span><Paperclip size={17} /></div></div>;
  if (item.app === 'mail') return <div className="mail-app"><div className="mail-toolbar"><span><Mail size={18} /> Mạch Nối Mail</span><span><Archive size={17} /><MoreHorizontal size={19} /></span></div><div className="mail-path"><span>Hộp thư đến</span><span>/</span><span>Hồ sơ triển lãm</span></div><div className="mail-subject"><h2>{item.title}</h2><span className="mail-tag">Hộp thư đến</span></div><div className="mail-sender"><Avatar name={item.author} /><div><strong>{item.author}</strong><small>&lt;{item.author === 'Quân' ? 'quan' : item.author === 'Mai' ? 'mai' : 'trienlam'}@machnoi.example&gt;</small><span>đến: nhóm Mạch Nối <ChevronDown size={12} /></span></div><time>{item.time}</time></div><div className="mail-body">{item.body.map((p, i) => <p key={i}>{p}</p>)}{item.table && <Table rows={item.table} />}</div><div className="mail-footer"><ShieldCheck size={15} /> Bản sao trong hồ sơ · không gửi hoặc nhận thư thật</div></div>;
  if (item.app === 'terminal') return <div className="terminal-app"><div className="terminal-tabs"><span><Terminal size={15} /> {item.id === 'E05' ? 'registration.log' : item.id === 'E06' ? 'network.log' : 'audit.log'}</span><small>READ ONLY</small></div><div className="terminal-meta"><span><span className="status-dot" /> môi trường {item.id === 'E05' ? 'local' : 'lưu trữ'}</span><span>{item.time}</span></div><div className="terminal-lines">{item.body.map((line, i) => <div className={/ERROR|ABORT/.test(line) ? 'log-error' : /WARN|SKIP/.test(line) ? 'log-warn' : /OK|CHECK/.test(line) ? 'log-ok' : ''} key={i}><span className="line-number">{String(i + 1).padStart(2, '0')}</span><code>{line}</code></div>)}</div><div className="terminal-prompt"><span>hồ-sơ / {item.id.toLowerCase()}</span> <span className="cursor-block" /></div></div>;
  return <div className={`document-app ${item.app === 'lab' ? 'lab-document' : ''}`}><div className="document-toolbar"><span>{item.app === 'lab' ? <Wifi size={16} /> : <FileText size={16} />} {item.app === 'lab' ? 'Bàn mô phỏng' : 'Tài liệu'} / {item.id}</span><small>CHỈ ĐỌC</small></div><article className="paper-sheet"><div className="paper-kicker">MẠCH NỐI / {item.app === 'lab' ? 'ĐỀ XUẤT & TÁI DỰNG' : 'HỒ SƠ NỘI BỘ'}</div><h2>{item.title}</h2><div className="paper-byline">{item.author} <span>·</span> {item.time}</div><div className="paper-rule" />{item.id === 'E09' ? <><div className="handover-progress"><span>Hoàn thành các phần riêng</span><b>3 / 3</b><div><i /></div></div>{item.table && <Table rows={item.table} />}</> : null}{item.body.map((line, i) => <p key={i}>{line}</p>)}{item.table && item.id !== 'E09' && <Table rows={item.table} />}<div className="paper-stamp">{item.app === 'lab' ? 'MÔ PHỎNG' : 'BẢN LƯU'}<small>HS–01 / {item.id}</small></div></article></div>;
}
export function EvidenceCaption({ item }: { item: Evidence }) {
  const { state, dispatch } = useGame();
  const isUnlocked = state.unlockedEvidenceHints?.includes(item.id) ?? false;
  return (
    <div className="evidence-caption">
      <span className="case-tag">{item.id}</span>
      {isUnlocked ? (
        <div className="evidence-hint-wrapper">
          <p className="evidence-hint-text">{item.summary}</p>
        </div>
      ) : (
        <div className="evidence-hint-wrapper locked">
          <p className="evidence-hint-placeholder">
            Gợi ý phân tích ý nghĩa chứng cứ đã được ẩn để tăng tính thử thách.
          </p>
          <button
            type="button"
            className="unlock-hint-btn"
            onClick={() => dispatch({ type: 'unlockEvidenceHint', id: item.id })}
          >
            Mở khóa gợi ý (-2 điểm)
          </button>
        </div>
      )}
    </div>
  );
}
export default function EvidenceReader({ item }: { item: Evidence }) { const { state, dispatch } = useGame(); const pinned = state.pinned.includes(item.id); return <section className="evidence-reader" aria-label="Nội dung chứng cứ"><div className="reader-path"><span><Folder size={15} /> Hồ sơ HS–01 <span>/</span> {item.id}</span><button className={`pin-button ${pinned ? 'active' : ''}`} data-sfx="pin" onClick={() => dispatch({ type: 'pin', id: item.id })}><Pin size={15} />{pinned ? 'Đã ghim' : 'Ghim chứng cứ'}</button></div><EvidenceContent item={item} /><EvidenceCaption item={item} /><div className="reader-footer"><LockKeyhole size={12} /> Dữ kiện hư cấu {item.chapter === 3 ? '· Mô phỏng theo điều kiện đã nêu' : '· Không sửa nội dung bản lưu'}</div></section>; }
