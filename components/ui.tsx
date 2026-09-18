'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { X, ArrowUp, ArrowDown, Plus, Trash2, Check, Paperclip, Lock, Info } from 'lucide-react';
import type { Option } from '../game/types';
import { useGame } from './GameProvider';

export function InfoTooltip({
  text,
  content,
  title,
  label,
  align = 'left',
  width,
}: {
  text?: ReactNode;
  content?: ReactNode;
  title?: string;
  label?: string;
  align?: 'left' | 'center' | 'right';
  width?: number | string;
}) {
  const [active, setActive] = useState(false);
  const [bubbleStyle, setBubbleStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLSpanElement>(null);
  const body = content ?? text;

  const calculatePosition = () => {
    if (!triggerRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const container = triggerRef.current.closest('.task-content') || triggerRef.current.closest('dialog') || document.body;
    const containerRect = container.getBoundingClientRect();

    const maxAvailWidth = Math.max(220, containerRect.width - 20);
    const targetWidth = Math.min(typeof width === 'number' ? width : 290, maxAvailWidth);

    const triggerLeftInContainer = triggerRect.left - containerRect.left;
    const triggerCenterInContainer = triggerLeftInContainer + (triggerRect.width / 2);

    let tooltipLeftInContainer = triggerLeftInContainer - 12;
    if (tooltipLeftInContainer + targetWidth > containerRect.width - 10) {
      tooltipLeftInContainer = containerRect.width - 10 - targetWidth;
    }
    if (tooltipLeftInContainer < 10) {
      tooltipLeftInContainer = 10;
    }

    const relativeLeft = tooltipLeftInContainer - triggerLeftInContainer;
    const arrowLeft = Math.max(14, Math.min(targetWidth - 14, triggerCenterInContainer - tooltipLeftInContainer));

    setBubbleStyle({
      left: `${relativeLeft}px`,
      right: 'auto',
      width: `${targetWidth}px`,
      maxWidth: `${targetWidth}px`,
      minWidth: 'auto',
      transform: 'translateY(0)',
      ['--arrow-left' as any]: `${arrowLeft}px`,
    });
  };

  const handleOpen = () => {
    calculatePosition();
    setActive(true);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!active) {
      calculatePosition();
      setActive(true);
    } else {
      setActive(false);
    }
  };

  return (
    <span
      ref={triggerRef}
      className={`info-tooltip-wrap align-${align} ${active ? 'active' : ''}`}
      onMouseEnter={handleOpen}
      onMouseLeave={() => setActive(false)}
      onFocus={handleOpen}
      onBlur={() => setActive(false)}
      onClick={handleToggle}
      tabIndex={0}
      aria-label={label || 'Xem giải thích'}
      title={typeof text === 'string' ? text : label}
    >
      <span className="info-tooltip-trigger" aria-hidden="true">
        <Info size={11} strokeWidth={2.5} />
      </span>
      <span
        className={`info-tooltip-bubble align-${align}`}
        role="tooltip"
        style={active && Object.keys(bubbleStyle).length > 0 ? bubbleStyle : (width ? { width, maxWidth: typeof width === 'number' ? `${width}px` : width, minWidth: 'auto' } : undefined)}
      >
        {title && <div className="tooltip-rich-title">{title}</div>}
        {body}
      </span>
    </span>
  );
}

export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) { const ref = useRef<HTMLDialogElement>(null); useEffect(() => { const old = document.activeElement as HTMLElement | null; ref.current?.showModal(); return () => old?.focus(); }, []); return <dialog ref={ref} onCancel={onClose} aria-label={title}><div className="modal-head"><h2>{title}</h2><button className="icon-button" aria-label="Đóng" onClick={onClose}><X size={20} /></button></div>{children}</dialog>; }
export function Choice({ label, value, options, onChange }: { label: ReactNode; value: string; options: Option[]; onChange: (v: string) => void }) { return <fieldset className="choice-field"><legend>{label}</legend><div className="choice-list">{options.map(o => <label className={`choice ${value === o.id ? 'selected' : ''}`} key={o.id}><input type="radio" name={typeof label === 'string' ? label : 'choice'} checked={value === o.id} onChange={() => onChange(o.id)} /><span>{o.label}</span>{value === o.id && <Check size={15} />}</label>)}</div></fieldset>; }
export function Chips({ label, options, value, max, onChange }: { label: ReactNode; options: Option[]; value: string[]; max: number; onChange: (v: string[]) => void }) { return <fieldset className="choice-field"><legend>{label} <small>{value.length}/{max}</small></legend><div className="chip-list">{options.map(o => <button type="button" className={`chip ${value.includes(o.id) ? 'selected' : ''}`} aria-pressed={value.includes(o.id)} key={o.id} disabled={!value.includes(o.id) && value.length >= max} onClick={() => onChange(value.includes(o.id) ? value.filter(x => x !== o.id) : [...value, o.id])}>{value.includes(o.id) ? <Check size={14} /> : <Plus size={14} />} {o.label}</button>)}</div></fieldset>; }
export function EvidencePicker({ value, max = 2, ids, onChange }: { value: string[]; max?: number; ids: string[]; onChange: (v: string[]) => void }) {
  const { state, config: { evidence }, trackedMission } = useGame();
  const isCollected = (id: string) => state.opened.includes(id) || (trackedMission?.foundEvidenceIds?.includes(id) ?? false);
  const options = evidence.filter(e => ids.includes(e.id)).map(e => ({
    id: e.id,
    label: `${e.id} · ${e.title}`,
    collected: isCollected(e.id),
  }));
  const handleToggle = (id: string) => {
    if (!isCollected(id)) return;
    if (value.includes(id)) {
      onChange(value.filter(x => x !== id));
    } else if (value.length < max) {
      onChange([...value, id]);
    }
  };
  return <fieldset className="choice-field evidence-picker-field">
    <legend style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <span>Gắn chứng cứ</span>
      <InfoTooltip text="Chọn 2 chứng cứ đã thu thập để bảo vệ kết luận của bạn. Chứng cứ chưa tìm thấy sẽ bị khóa." />
      <small style={{ marginLeft: '6px' }}>{value.length}/{max}</small>
    </legend>
    <div className="chip-list">
      {options.map(o => {
        const isSelected = value.includes(o.id);
        const isDisabled = !o.collected || (!isSelected && value.length >= max);
        return <button
          type="button"
          className={`chip ${isSelected ? 'selected' : ''} ${!o.collected ? 'locked' : ''}`}
          aria-pressed={isSelected}
          key={o.id}
          disabled={isDisabled}
          onClick={() => handleToggle(o.id)}
          title={!o.collected ? `Chứng cứ ${o.id} chưa được thu thập (Hãy tìm kiếm trong phòng)` : undefined}
          style={!o.collected ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
        >
          {isSelected ? <Check size={14} /> : !o.collected ? <Lock size={13} style={{ opacity: 0.75 }} /> : <Plus size={14} />}
          <span>{o.label} {!o.collected && <small style={{ opacity: 0.75, marginLeft: '4px', fontStyle: 'italic' }}>(Chưa thu thập)</small>}</span>
        </button>;
      })}
    </div>
  </fieldset>;
}
export function Sorter({ label, value, options, max, onChange }: { label: ReactNode; value: string[]; options: Option[]; max: number; onChange: (v: string[]) => void }) { const move = (i: number, dir: number) => { const n = [...value];[n[i], n[i + dir]] = [n[i + dir], n[i]]; onChange(n); }; return <fieldset className="choice-field sorter"><legend>{label} <small>{value.length}/{max}</small></legend><div className="sort-bank">{options.filter(o => !value.includes(o.id)).map(o => <button disabled={value.length >= max} type="button" key={o.id} onClick={() => onChange([...value, o.id])}><Plus size={15} /><span>{o.label}</span></button>)}</div><ol className="sort-stack">{value.map((v, i) => <li key={v}><b>{String(i + 1).padStart(2, '0')}</b><span>{options.find(o => o.id === v)?.label}</span><div className="sort-controls"><button type="button" title="Lên" aria-label={`Đưa ${v} lên`} disabled={i === 0} onClick={() => move(i, -1)}><ArrowUp size={14} /></button><button type="button" title="Xuống" aria-label={`Đưa ${v} xuống`} disabled={i === value.length - 1} onClick={() => move(i, 1)}><ArrowDown size={14} /></button><button type="button" title="Bỏ" aria-label={`Bỏ ${v}`} onClick={() => onChange(value.filter(x => x !== v))}><Trash2 size={14} /></button></div></li>)}</ol>{!value.length && <p className="empty-slot"><Paperclip size={16} /> Chọn thẻ ở trên để bắt đầu sắp xếp.</p>}</fieldset>; }
export function Avatar({ name, size = '' }: { name: string; size?: string }) { return <span className={`avatar avatar-${name === 'Nam' ? 'blue' : name === 'Mai' ? 'purple' : name === 'Linh' ? 'rose' : 'green'} ${size}`}>{name.slice(0, 1)}</span>; }

