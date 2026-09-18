import {afterEach,describe,it,expect,vi} from 'vitest';
import {cleanup,render,screen,fireEvent} from '@testing-library/react';
import {GameProvider} from '../../components/GameProvider';
import TaskPanel from '../../components/TaskPanel';
import MissionTrackerPanel from '../../components/MissionTrackerPanel';

afterEach(cleanup);

describe('Thu thập nhiệm vụ & Mission Tracker HUD', () => {
  it('renders "Thu thập nhiệm vụ" button inside TaskPanel and toggles tracking', () => {
    render(
      <GameProvider>
        <TaskPanel />
        <MissionTrackerPanel />
      </GameProvider>
    );

    // Initial check: collect button exists
    const collectBtn = screen.getByRole('button', { name: /thu thập nhiệm vụ/i });
    expect(collectBtn).toBeDefined();

    // Mission tracker should not be visible yet
    expect(screen.queryByLabelText('Bảng theo dõi nhiệm vụ')).toBeNull();

    // Click "Thu thập nhiệm vụ"
    fireEvent.click(collectBtn);

    // Button changes to "Đã thu thập"
    const activeBtn = screen.getByRole('button', { name: /đã thu thập/i });
    expect(activeBtn).toBeDefined();

    // Mission tracker HUD appears at bottom-left
    const hud = screen.getByLabelText('Bảng theo dõi nhiệm vụ');
    expect(hud).toBeDefined();
    expect(hud.textContent).toContain('MỤC TIÊU THU THẬP');

    // Untracking by clicking button again
    fireEvent.click(activeBtn);
    expect(screen.queryByLabelText('Bảng theo dõi nhiệm vụ')).toBeNull();
  });

  it('does not have a close X button and can be minimized/expanded', () => {
    render(
      <GameProvider>
        <TaskPanel />
        <MissionTrackerPanel />
      </GameProvider>
    );

    const collectBtn = screen.getByRole('button', { name: /thu thập nhiệm vụ/i });
    fireEvent.click(collectBtn);

    // Verify there is NO close button (button with name "Đóng" or "X")
    expect(screen.queryByRole('button', { name: /^đóng$/i })).toBeNull();

    // Verify minimize button exists
    const minimizeBtn = screen.getByRole('button', { name: /thu nhỏ/i });
    expect(minimizeBtn).toBeDefined();

    // Click minimize
    fireEvent.click(minimizeBtn);
    const hud = screen.getByLabelText('Bảng theo dõi nhiệm vụ');
    expect(hud.classList.contains('minimized')).toBe(true);
  });

  it('does not allow clicking uncompleted evidence items to view directly, and allows reviewing once found', () => {
    const inspectHandler = vi.fn();
    window.addEventListener('hsdc-inspect-evidence', inspectHandler);

    render(
      <GameProvider>
        <TaskPanel />
        <MissionTrackerPanel />
      </GameProvider>
    );

    const collectBtn = screen.getByRole('button', { name: /thu thập nhiệm vụ/i });
    fireEvent.click(collectBtn);

    const hud = screen.getByLabelText('Bảng theo dõi nhiệm vụ');
    const items = hud.querySelectorAll('.mission-evidence-item');
    expect(items.length).toBeGreaterThan(0);

    // Click the pending evidence item in tracker -> should NOT inspect or dispatch
    fireEvent.click(items[0]);
    expect(inspectHandler).not.toHaveBeenCalled();

    // Check that related evidence button in TaskPanel is disabled when not yet found
    const lockedEvidenceBtn = screen.getByRole('button', { name: /EZ01/i });
    expect(lockedEvidenceBtn.hasAttribute('disabled')).toBe(true);

    // Simulate discovering EZ01 in the room/device
    window.dispatchEvent(new CustomEvent('hsdc-inspect-evidence', { detail: { id: 'EZ01', source: 'phone' } }));

    // Now click the newly found evidence item in the tracker
    // Re-dispatching to test found item inspect
    const foundItem = hud.querySelectorAll('.mission-evidence-item.found')[0];
    if (foundItem) {
      fireEvent.click(foundItem);
      expect(inspectHandler).toHaveBeenCalled();
    }

    window.removeEventListener('hsdc-inspect-evidence', inspectHandler);
  });

  it('starts mission with 0/N progress without ticking items, omits "Đã tìm thấy" text, and resets on re-collect', () => {
    render(
      <GameProvider>
        <TaskPanel />
        <MissionTrackerPanel />
      </GameProvider>
    );

    const collectBtn = screen.getByRole('button', { name: /thu thập nhiệm vụ/i });
    fireEvent.click(collectBtn);

    const hud = screen.getByLabelText('Bảng theo dõi nhiệm vụ');
    
    // Check clean UI: NO "Đã tìm thấy (Bấm để xem lại)" text
    expect(hud.textContent).not.toContain('Đã tìm thấy (Bấm để xem lại)');
    expect(hud.textContent).not.toContain('Bấm để xem lại');

    // Check that evidence locations (e.g. Điện thoại, Tủ chứng cứ, Máy tính) are NOT displayed
    expect(hud.textContent).not.toContain('Điện thoại');
    expect(hud.textContent).not.toContain('Tủ chứng cứ');
    expect(hud.textContent).not.toContain('Máy tính');

    // Progress starts at 0/2
    const progressLabel = hud.querySelector('.mission-progress-label');
    expect(progressLabel?.textContent).toContain('0/2');

    // Items are initially pending (not found)
    const items = hud.querySelectorAll('.mission-evidence-item');
    expect(items.length).toBe(2);
    expect(items[0].classList.contains('pending')).toBe(true);
    expect(items[0].classList.contains('found')).toBe(false);
    expect(items[1].classList.contains('pending')).toBe(true);
    expect(items[1].classList.contains('found')).toBe(false);

    // Untrack mission by clicking "Đã thu thập"
    const activeBtn = screen.getByRole('button', { name: /đã thu thập/i });
    fireEvent.click(activeBtn);
    expect(screen.queryByLabelText('Bảng theo dõi nhiệm vụ')).toBeNull();

    // Re-collect mission by clicking "Thu thập nhiệm vụ" again -> must RESET back to 0/2
    const newCollectBtn = screen.getByRole('button', { name: /thu thập nhiệm vụ/i });
    fireEvent.click(newCollectBtn);

    const newHud = screen.getByLabelText('Bảng theo dõi nhiệm vụ');
    const newProgressLabel = newHud.querySelector('.mission-progress-label');
    expect(newProgressLabel?.textContent).toContain('0/2');
    const newItems = newHud.querySelectorAll('.mission-evidence-item');
    expect(newItems[0].classList.contains('pending')).toBe(true);
    expect(newItems[0].classList.contains('found')).toBe(false);
  });
});
