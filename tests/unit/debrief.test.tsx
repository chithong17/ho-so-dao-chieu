import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { GameProvider } from '../../components/GameProvider';
import { Debrief } from '../../components/SummaryScreens';
import { evidence } from '../../game/evidence';

afterEach(cleanup);

describe('Debrief Screen Redesign', () => {
  it('renders Section 1 with chapter evidence items and their solutions visible without clicking', () => {
    render(
      <GameProvider>
        <Debrief />
      </GameProvider>
    );

    // Section 1 header
    expect(screen.getByText(/Chứng cứ đã thu thập/i)).toBeDefined();

    // Check evidence title displayed as handwritten polaroid title
    expect(screen.getByText(/Tin nhắn khiến mọi người nghi ngờ/i)).toBeDefined();
    expect(screen.getAllByText(/Bấm để xem chi tiết/i).length).toBeGreaterThan(0);

    // CRITICAL: Solution is NOT rendered inline directly on the cards (mimics notebook)
    expect(screen.queryByText(/LỜI GIẢI & Ý NGHĨA CHỨNG MINH/i)).toBeNull();
  });

  it('renders Section 2 with the real chapter truth matching section 1.3', () => {
    render(
      <GameProvider>
        <Debrief />
      </GameProvider>
    );

    // Section 2 header
    expect(screen.getByText(/Giải mã chân tướng — Bản chất sự kiện/i)).toBeDefined();
    expect(screen.getByText(/CHÂN TƯỚNG CHƯƠNG 01/i)).toBeDefined();
    expect(screen.getByText(/Hiện tượng vắng tên & Bản chất chuỗi lỗi dữ liệu/i)).toBeDefined();

    // The 4 core truth points
    expect(screen.getByText(/Lỗi dữ liệu nội bộ \(Nguyên nhân cốt lõi\)/i)).toBeDefined();
    expect(screen.getByText(/Vai trò của sự cố mạng/i)).toBeDefined();
    expect(screen.getByText(/Sự thật về tin nhắn của Nam & Quyết định của nhóm/i)).toBeDefined();
    expect(screen.getByText(/Điểm mù quy trình: Thiếu kiểm thử tích hợp toàn luồng/i)).toBeDefined();
  });

  it('renders Section 3 with methodological takeaway and Marxist-Leninist philosophical concepts', () => {
    render(
      <GameProvider>
        <Debrief />
      </GameProvider>
    );

    // Section 3 header
    expect(screen.getByText(/Liên hệ kiến thức & Phương pháp luận Triết học/i)).toBeDefined();
    expect(screen.getByText(/BÀI HỌC PHƯƠNG PHÁP LUẬN CẦN GHI NHỚ/i)).toBeDefined();

    // Concept category / laws
    expect(screen.getByText(/CÁC CẶP PHẠM TRÙ & QUY LUẬT BIỆN CHỨNG TRỌNG TÂM/i)).toBeDefined();
  });

  it('allows clicking an evidence card to open full raw document detail in modal', () => {
    render(
      <GameProvider>
        <Debrief />
      </GameProvider>
    );

    // Find first evidence card button
    const firstCard = screen.getByTitle(/Bấm để xem chi tiết: E.*01/i);
    fireEvent.click(firstCard);

    // Modal should be rendered with raw content and full solution
    expect(screen.getByRole('dialog', { name: /Hồ sơ HS-01 \/ Chứng cứ E.*01/i })).toBeDefined();
    expect(screen.getByText(/LỜI GIẢI VỤ ÁN & Ý NGHĨA CHỨNG MINH THỰC TẾ/i)).toBeDefined();
  });
});
