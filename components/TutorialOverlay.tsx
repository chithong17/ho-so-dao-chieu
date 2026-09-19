'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function TutorialOverlay() {
  const [completed, setCompleted] = useState<boolean>(true);
  const [step, setStep] = useState<1 | 2>(1);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [inCinematic, setInCinematic] = useState<boolean>(false);

  // Check if tutorial is already completed
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isDone = localStorage.getItem('hs01_tutorial_completed') === 'true';
    if (!isDone) {
      // Don't show in competition mode
      const isCompetition = document.documentElement.dataset.competition === 'true';
      if (!isCompetition) {
        setCompleted(false);
      }
    }
  }, []);

  // Listen for cinematic mode changes or reset events
  useEffect(() => {
    if (completed) return;
    const checkCinematic = () => {
      const isCinematic = typeof document !== 'undefined' && (
        document.body.dataset.cinematic === 'true' ||
        !!document.querySelector('.cinematic-overlay')
      );
      setInCinematic(isCinematic);
    };
    checkCinematic();

    const handleCinematicEvent = (e: Event) => {
      const isCinematic = !!(e as CustomEvent<boolean>).detail;
      setInCinematic(isCinematic);
    };

    const handleReset = () => {
      setCompleted(false);
      setIsFadingOut(false);
      setStep(1);
    };

    window.addEventListener('hsdc-cinematic', handleCinematicEvent);
    window.addEventListener('hsdc-reset-tutorial', handleReset);
    return () => {
      window.removeEventListener('hsdc-cinematic', handleCinematicEvent);
      window.removeEventListener('hsdc-reset-tutorial', handleReset);
    };
  }, [completed]);

  // Main animation frame loop to detect target element, measure bounds, and manage highlight classes
  useEffect(() => {
    if (completed || inCinematic) return;

    let animId: number;

    const isVisible = (el: HTMLElement | null): boolean => {
      if (!el) return false;
      if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') return false;
      }
      return true;
    };

    const updateTutorialState = () => {
      // Check if "Nhận nhiệm vụ" button is in the DOM and visible (Step 2)
      const collectBtn = document.querySelector('.collect-mission-btn') as HTMLElement | null;
      const notebookHud = document.querySelector('.case-notebook-hud') as HTMLElement | null;

      if (isVisible(collectBtn)) {
        // Step 2: Highlight "Nhận nhiệm vụ" button
        setStep(2);
        const rect = collectBtn!.getBoundingClientRect();
        setTargetRect(rect);

        if (notebookHud?.classList.contains('tutorial-highlight')) {
          notebookHud.classList.remove('tutorial-highlight');
        }
        if (!collectBtn!.classList.contains('tutorial-highlight')) {
          collectBtn!.classList.add('tutorial-highlight');
        }
      } else if (isVisible(notebookHud)) {
        // Step 1: Highlight notebook HUD
        setStep(1);
        const rect = notebookHud!.getBoundingClientRect();
        setTargetRect(rect);

        if (!notebookHud!.classList.contains('tutorial-highlight')) {
          notebookHud!.classList.add('tutorial-highlight');
        }
        if (collectBtn?.classList.contains('tutorial-highlight')) {
          collectBtn.classList.remove('tutorial-highlight');
        }
      } else {
        setTargetRect(null);
      }

      animId = requestAnimationFrame(updateTutorialState);
    };

    updateTutorialState();

    return () => {
      cancelAnimationFrame(animId);
      const collectBtn = document.querySelector('.collect-mission-btn');
      const notebookHud = document.querySelector('.case-notebook-hud');
      collectBtn?.classList.remove('tutorial-highlight');
      notebookHud?.classList.remove('tutorial-highlight');
    };
  }, [completed, inCinematic]);

  // Complete tutorial when player clicks "Nhận nhiệm vụ" button
  const handleFinish = useCallback(() => {
    if (isFadingOut || completed) return;
    setIsFadingOut(true);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('hs01_tutorial_completed', 'true');
    }
    setTimeout(() => {
      const collectBtn = document.querySelector('.collect-mission-btn');
      const notebookHud = document.querySelector('.case-notebook-hud');
      collectBtn?.classList.remove('tutorial-highlight');
      notebookHud?.classList.remove('tutorial-highlight');
      setCompleted(true);
    }, 400);
  }, [isFadingOut, completed]);

  // Listen for clicks on the target button to complete step 2
  useEffect(() => {
    if (completed || step !== 2) return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('.collect-mission-btn')) {
        handleFinish();
      }
    };

    window.addEventListener('click', handleGlobalClick, true);
    return () => window.removeEventListener('click', handleGlobalClick, true);
  }, [completed, step, handleFinish]);

  if (completed || inCinematic || !targetRect) {
    return null;
  }

  // Exact arrow dimensions and tip offsets (arrow.png: 1536x1024, tip at 1458, 853)
  const arrowWidth = 76;
  const tipOffsetX = 72; // 76 * (1458 / 1536)
  const tipOffsetY = 42; // 50.7 * (853 / 1024)

  let arrowLeft = 0;
  let arrowTop = 0;
  let msgLeft = 0;
  let msgTop = 0;

  if (step === 1) {
    // Step 1: Point at notebook HUD in bottom-right corner
    const tipTargetX = targetRect.left + 15;
    const tipTargetY = targetRect.top + 25;
    arrowLeft = tipTargetX - tipOffsetX;
    arrowTop = tipTargetY - tipOffsetY;

    msgLeft = targetRect.left - 230;
    msgTop = arrowTop - 46;
  } else {
    // Step 2: Point directly at "Nhận nhiệm vụ" button inside notebook
    const tipTargetX = targetRect.left - 2;
    const tipTargetY = targetRect.top + targetRect.height / 2;
    arrowLeft = tipTargetX - tipOffsetX;
    arrowTop = tipTargetY - tipOffsetY;

    msgLeft = targetRect.left - 210;
    msgTop = targetRect.top - 46;
  }

  const maxMsgLeft = typeof window !== 'undefined' ? Math.max(16, window.innerWidth - 320) : 1000;
  msgLeft = Math.min(Math.max(16, msgLeft), maxMsgLeft);
  msgTop = Math.max(16, msgTop);

  return (
    <div className={`tutorial-container ${isFadingOut ? 'tutorial-fading-out' : ''}`}>
      {/* Translucent frosted message card */}
      <div
        className="tutorial-message-card"
        style={{
          left: `${msgLeft}px`,
          top: `${msgTop}px`,
        }}
      >
        <span className="tutorial-badge-dot" />
        <span>{step === 1 ? 'Mở sổ hồ sơ vụ án.' : 'Nhấn ‘Nhận nhiệm vụ’ để bắt đầu điều tra.'}</span>
      </div>

      {/* Tutorial animated arrow with radiant warm light */}
      <img
        src="/arrow.png"
        alt="Mũi tên hướng dẫn"
        className="tutorial-arrow-img"
        draggable={false}
        style={{
          left: `${arrowLeft}px`,
          top: `${arrowTop}px`,
        }}
      />
    </div>
  );
}
