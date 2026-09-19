import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { cleanup, render, screen, act, fireEvent } from '@testing-library/react';
import TutorialOverlay from '../../components/TutorialOverlay';

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.body.innerHTML = '';
  delete document.body.dataset.cinematic;
});

describe('2-Step First-Time Tutorial', () => {
  beforeEach(() => {
    localStorage.clear();
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
      left: 800,
      top: 500,
      width: 130,
      height: 150,
      right: 930,
      bottom: 650,
      x: 800,
      y: 500,
    });
  });

  it('does not render if already completed', () => {
    localStorage.setItem('hs01_tutorial_completed', 'true');
    const { container } = render(<TutorialOverlay />);
    expect(container.querySelector('.tutorial-container')).toBeNull();
  });

  it('renders Step 1 when notebook HUD is present', () => {
    // Create notebook HUD in DOM
    const notebook = document.createElement('button');
    notebook.className = 'case-notebook-hud';
    Object.defineProperty(notebook, 'offsetParent', { value: document.body, configurable: true });
    document.body.appendChild(notebook);

    render(<TutorialOverlay />);

    // Step 1 message
    expect(screen.getByText('Mở sổ hồ sơ vụ án.')).toBeDefined();
    const arrow = screen.getByAltText('Mũi tên hướng dẫn') as HTMLImageElement;
    expect(arrow.getAttribute('src')).toBe('/arrow.png');
    expect(notebook.classList.contains('tutorial-highlight')).toBe(true);
  });

  it('transitions to Step 2 when "Nhận nhiệm vụ" button is opened', () => {
    const notebook = document.createElement('button');
    notebook.className = 'case-notebook-hud';
    Object.defineProperty(notebook, 'offsetParent', { value: document.body, configurable: true });
    document.body.appendChild(notebook);

    const collectBtn = document.createElement('button');
    collectBtn.className = 'collect-mission-btn';
    Object.defineProperty(collectBtn, 'offsetParent', { value: document.body, configurable: true });
    document.body.appendChild(collectBtn);

    render(<TutorialOverlay />);

    // Step 2 message
    expect(screen.getByText('Nhấn ‘Nhận nhiệm vụ’ để bắt đầu điều tra.')).toBeDefined();
    expect(collectBtn.classList.contains('tutorial-highlight')).toBe(true);
    expect(notebook.classList.contains('tutorial-highlight')).toBe(false);
  });

  it('completes tutorial when "Nhận nhiệm vụ" button is clicked and stores in localStorage', async () => {
    const collectBtn = document.createElement('button');
    collectBtn.className = 'collect-mission-btn';
    collectBtn.textContent = 'Nhận nhiệm vụ';
    Object.defineProperty(collectBtn, 'offsetParent', { value: document.body, configurable: true });
    document.body.appendChild(collectBtn);

    render(<TutorialOverlay />);

    expect(screen.getByText('Nhấn ‘Nhận nhiệm vụ’ để bắt đầu điều tra.')).toBeDefined();

    // Click the button
    fireEvent.click(collectBtn);

    expect(localStorage.getItem('hs01_tutorial_completed')).toBe('true');
  });
});
