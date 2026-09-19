'use client';
import { useState } from 'react';
import { Target, CheckCircle2, Circle, Minus, ChevronUp, Check } from 'lucide-react';
import { useGame } from './GameProvider';
import type { EvidenceSource } from '../game/config';

export default function MissionTrackerPanel() {
  const { state,config, dispatch, trackedMission } = useGame();
  const [minimized, setMinimized] = useState(false);

  if (!trackedMission) return null;

  const { taskId, taskTitle, evidenceIds } = trackedMission;
  const foundEvidenceIds=state.missionProgress?.[taskId]??[];
  const foundCount = evidenceIds.filter(id => foundEvidenceIds.includes(id)).length;
  const totalCount = evidenceIds.length;
  const allFound = totalCount > 0 && foundCount === totalCount;

  const handleInspectEvidence = (evId: string) => {
    const source = config.sources[evId] as EvidenceSource | undefined;
    dispatch({ type: 'evidence', id: evId });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('hsdc-inspect-evidence', {
          detail: { id: evId, source: source ?? 'phone' },
        })
      );
    }
  };

  return (
    <aside
      className={`mission-tracker-hud ${minimized ? 'minimized' : ''}`}
      aria-label="Bảng theo dõi nhiệm vụ"
    >
      <div className="mission-tracker-header">
        <div className="mission-tracker-title" onClick={() => setMinimized(prev => !prev)}>
          <span className="mission-icon">
            <Target size={16} />
          </span>
          <div className="mission-title-text">
            <strong>MỤC TIÊU THU THẬP</strong>
            <small title={`${taskId} · ${taskTitle}`}>{taskId} · {taskTitle}</small>
          </div>
        </div>
        <div className="mission-tracker-actions">
          <button
            type="button"
            className="mission-btn-icon"
            onClick={() => setMinimized(prev => !prev)}
            title={minimized ? 'Mở rộng bảng nhiệm vụ' : 'Thu nhỏ bảng nhiệm vụ'}
            aria-label={minimized ? 'Mở rộng' : 'Thu nhỏ'}
          >
            {minimized ? <ChevronUp size={14} /> : <Minus size={14} />}
          </button>
        </div>
      </div>

      {!minimized && (
        <div className="mission-tracker-body">
          <div className="mission-progress-bar">
            <div className="mission-progress-label">
              <span>Tiến độ chứng cứ</span>
              <strong className={allFound ? 'all-found' : ''}>
                {foundCount}/{totalCount}
              </strong>
            </div>
            <div className="mission-progress-track">
              <div
                className={`mission-progress-fill ${allFound ? 'complete' : ''}`}
                style={{ width: `${totalCount > 0 ? (foundCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>

          <ul className="mission-evidence-list">
            {evidenceIds.map(evId => {
              const ev = config.evidence.find(e => e.id === evId);
              const isFound = foundEvidenceIds.includes(evId);

              return (
                <li
                  key={evId}
                  className={`mission-evidence-item ${isFound ? 'found' : 'pending locked'}`}
                  onClick={isFound ? () => handleInspectEvidence(evId) : undefined}
                  title={
                    isFound
                      ? `Xem lại ${evId}: ${ev?.title ?? evId}`
                      : `${evId}: ${ev?.title ?? `Chứng cứ ${evId}`} (Chưa thu thập)`
                  }
                  role={isFound ? 'button' : undefined}
                  tabIndex={isFound ? 0 : undefined}
                  onKeyDown={
                    isFound
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleInspectEvidence(evId);
                          }
                        }
                      : undefined
                  }
                >
                  <span className="mission-item-checkbox">
                    {isFound ? (
                      <CheckCircle2 size={16} className="tick-icon found" />
                    ) : (
                      <Circle size={16} className="tick-icon pending" />
                    )}
                  </span>
                  <div className="mission-item-content">
                    <div className="mission-item-meta">
                      <span className="mission-item-badge">{evId}</span>
                    </div>
                    <span className="mission-item-name">
                      {ev ? ev.title : `Chứng cứ ${evId}`}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          {allFound && (
            <div className="mission-complete-notice">
              <Check size={14} />
              <span>Đã thu thập đủ chứng cứ! Mở sổ để ghi nhận lập luận.</span>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
