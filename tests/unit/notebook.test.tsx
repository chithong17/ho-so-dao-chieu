import {afterEach,describe,it,expect,vi} from 'vitest';
import {cleanup,render,screen,fireEvent} from '@testing-library/react';
import CaseNotebook from '../../components/CaseNotebook';

afterEach(cleanup);

describe('CaseNotebook HUD Item', () => {
  it('renders persistent notebook image with correct attributes', () => {
    render(<CaseNotebook />);
    const button = screen.getByRole('button', { name: /sổ điều tra/i });
    expect(button).toBeDefined();
    expect(button.classList.contains('case-notebook-hud')).toBe(true);
    expect(button.getAttribute('data-sfx')).toBe('page_turn');

    const img = screen.getByAltText('Sổ điều tra') as HTMLImageElement;
    expect(img).toBeDefined();
    expect(img.getAttribute('src')).toBe('/notebook.png');
    expect(img.classList.contains('case-notebook-img')).toBe(true);
  });

  it('triggers onClick callback and dispatches hsdc-open-notebook event when clicked', () => {
    const handleClick = vi.fn();
    const eventHandler = vi.fn();
    window.addEventListener('hsdc-open-notebook', eventHandler);

    render(<CaseNotebook onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /sổ điều tra/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(eventHandler).toHaveBeenCalledTimes(1);

    window.removeEventListener('hsdc-open-notebook', eventHandler);
  });

  it('does not render/appear in cinematic scenes', () => {
    // Set cinematic mode active on document.body
    document.body.dataset.cinematic = 'true';

    const { rerender } = render(<CaseNotebook />);
    expect(screen.queryByRole('button', { name: /sổ điều tra/i })).toBeNull();

    // End cinematic mode
    delete document.body.dataset.cinematic;
    window.dispatchEvent(new CustomEvent('hsdc-cinematic', { detail: false }));

    rerender(<CaseNotebook />);
    expect(screen.getByRole('button', { name: /sổ điều tra/i })).toBeDefined();
  });
});
