'use client';
import React, { useState, useEffect } from 'react';

interface CaseNotebookProps {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable persistent case-file notebook game item overlay.
 * Appears in the bottom-right corner of game scenes, but does not appear in cinematic scenes.
 */
export default function CaseNotebook({ onClick, className = '', style }: CaseNotebookProps) {
  const [inCinematic, setInCinematic] = useState(false);

  useEffect(() => {
    const updateCinematicStatus = () => {
      const isCinematic = typeof document !== 'undefined' && (
        document.body.dataset.cinematic === 'true' ||
        !!document.querySelector('.cinematic-overlay')
      );
      setInCinematic(isCinematic);
    };

    updateCinematicStatus();

    const handleCinematic = (e: Event) => {
      const isCinematic = !!(e as CustomEvent<boolean>).detail;
      setInCinematic(isCinematic);
    };

    window.addEventListener('hsdc-cinematic', handleCinematic);

    let observer: MutationObserver | null = null;
    if (typeof document !== 'undefined') {
      observer = new MutationObserver(updateCinematicStatus);
      observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    }

    return () => {
      window.removeEventListener('hsdc-cinematic', handleCinematic);
      if (observer) observer.disconnect();
    };
  }, []);

  if (inCinematic) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick();
    }
    // Prepare for opening the case notebook / dossier panel
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('hsdc-open-notebook'));
    }
  };

  return (
    <button
      type="button"
      className={`case-notebook-hud ${className}`.trim()}
      onClick={handleClick}
      aria-label="Sổ điều tra (Hồ sơ vụ án)"
      title="Sổ điều tra (Hồ sơ vụ án)"
      data-sfx="page_turn"
      style={style}
    >
      <img
        src="/notebook.png"
        alt="Sổ điều tra"
        className="case-notebook-img"
        draggable={false}
      />
    </button>
  );
}
