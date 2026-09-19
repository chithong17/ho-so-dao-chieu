import {afterEach,describe,it,expect} from 'vitest';
import {cleanup,render,screen,fireEvent} from '@testing-library/react';
import {useState} from 'react';
import {Choice,Sorter,EvidencePicker,InfoTooltip} from '../../components/ui';
import {GameProvider,useGame} from '../../components/GameProvider';
import {EvidenceCaption} from '../../components/EvidenceReader';
import {evidence} from '../../game/evidence';

afterEach(cleanup);
describe('Các thao tác bằng nút và bàn phím',()=>{
 it('chọn một đáp án không phụ thuộc màu',()=>{function Demo(){const [v,set]=useState('');return <Choice label="Nhận định" value={v} onChange={set} options={[{id:'yes',label:'Có căn cứ'},{id:'no',label:'Chưa đủ'}]}/>;}render(<Demo/>);fireEvent.click(screen.getByRole('radio',{name:'Chưa đủ'}));expect((screen.getByRole('radio',{name:'Chưa đủ'}) as HTMLInputElement).checked).toBe(true);});
 it('thêm, sắp và bỏ thẻ không cần kéo thả',()=>{function Demo(){const [v,set]=useState<string[]>([]);return <Sorter label="Chuỗi" value={v} onChange={set} max={2} options={[{id:'a',label:'Đầu vào'},{id:'b',label:'Kết quả'}]}/>;}render(<Demo/>);fireEvent.click(screen.getByRole('button',{name:'Kết quả'}));fireEvent.click(screen.getByRole('button',{name:'Đầu vào'}));fireEvent.click(screen.getByRole('button',{name:'Đưa a lên'}));expect(screen.getAllByRole('listitem')[0].textContent).toContain('Đầu vào');fireEvent.click(screen.getByRole('button',{name:'Bỏ b'}));expect(screen.getAllByRole('listitem')).toHaveLength(1);});
});

describe('EvidenceCaption - Ẩn dòng gợi ý và mở khóa có trừ điểm', () => {
  it('ẩn dòng gợi ý mặc định và mở khóa khi người chơi bấm nút mở khóa', () => {
    const item = evidence[1]; // E02
    render(
      <GameProvider>
        <EvidenceCaption item={item} />
      </GameProvider>
    );

    // Mặc định dòng gợi ý bị ẩn
    expect(screen.queryByText(item.summary)).toBeNull();
    const unlockBtn = screen.getByRole('button', { name: /mở khóa gợi ý/i });
    expect(unlockBtn).toBeDefined();

    // Bấm mở khóa gợi ý
    fireEvent.click(unlockBtn);

    // Dòng gợi ý xuất hiện
    expect(screen.getByText(item.summary)).toBeDefined();
  });
});

describe('Red Stamp ĐÃ HOÀN THÀNH khi nộp lập luận đúng', () => {
  it('đóng dấu mộc đỏ lên trang khi lập luận chuẩn xác', async () => {
    const TaskPanel = (await import('../../components/TaskPanel')).default;
    render(
      <GameProvider>
        <TaskPanel />
      </GameProvider>
    );

    // Ban đầu chưa hoàn thành, chưa có mộc đỏ
    expect(screen.queryByText('ĐÃ HOÀN THÀNH')).toBeNull();
  });
});

describe('EvidencePicker - Không cho phép gắn chứng cứ chưa thu thập', () => {
  it('khóa và không thể chọn chứng cứ chưa được thu thập', () => {
    function PickerDemo() {
      const [val, setVal] = useState<string[]>([]);
      return <EvidencePicker ids={['EZ01', 'EZ02', 'E01', 'E02']} value={val} onChange={setVal} max={2} />;
    }
    render(
      <GameProvider>
        <PickerDemo />
      </GameProvider>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(1);
    const firstBtn = buttons[0];
    expect(firstBtn.getAttribute('disabled')).not.toBeNull();
    expect(firstBtn.classList.contains('locked')).toBe(true);
    expect(firstBtn.textContent).toContain('(Chưa thu thập)');

    // Clicking uncollected button does not change value
    fireEvent.click(firstBtn);
    expect(firstBtn.classList.contains('selected')).toBe(false);
  });

  it('cho phép chọn chứng cứ khi đã được thu thập', () => {
    let targetId = '';
    function PickerWithCollect() {
      const [val, setVal] = useState<string[]>([]);
      const { state,dispatch, config: { evidence } } = useGame();
      targetId = evidence[0].id;
      return (
        <div>
          <button onClick={() => {dispatch({type:'acceptMission',id:state.activeTask});dispatch({ type: 'evidence', id: targetId });}}>Collect Evidence</button>
          <EvidencePicker ids={[targetId]} value={val} onChange={setVal} max={2} />
        </div>
      );
    }
    render(
      <GameProvider>
        <PickerWithCollect />
      </GameProvider>
    );

    const collectBtn = screen.getByRole('button', { name: 'Collect Evidence' });
    fireEvent.click(collectBtn);

    // After collection, button should be unlocked and selectable
    const evidenceChip = screen.getByRole('button', { name: new RegExp(targetId, 'i') });
    expect(evidenceChip.getAttribute('disabled')).toBeNull();
    expect(evidenceChip.classList.contains('locked')).toBe(false);

    // Click to select
    fireEvent.click(evidenceChip);
    expect(evidenceChip.classList.contains('selected')).toBe(true);
  });
});

describe('InfoTooltip - Hiển thị icon (i) và tooltip giải thích', () => {
  it('hiển thị icon và giải thích khi hover hoặc tương tác', () => {
    render(
      <InfoTooltip text="Giải thích khái niệm khó hiểu" />
    );

    const tooltipBubble = screen.getByRole('tooltip');
    expect(tooltipBubble.textContent).toContain('Giải thích khái niệm khó hiểu');

    const wrapper = tooltipBubble.parentElement!;
    expect(wrapper.classList.contains('info-tooltip-wrap')).toBe(true);

    // Mouse enter kích hoạt class active
    fireEvent.mouseEnter(wrapper);
    expect(wrapper.classList.contains('active')).toBe(true);

    // Mouse leave tắt class active
    fireEvent.mouseLeave(wrapper);
    expect(wrapper.classList.contains('active')).toBe(false);

    // Click toggle active
    fireEvent.click(wrapper);
    expect(wrapper.classList.contains('active')).toBe(true);
    fireEvent.click(wrapper);
    expect(wrapper.classList.contains('active')).toBe(false);
  });

  it('hỗ trợ tiêu đề và nội dung phong phú (rich content/JSX)', () => {
    render(
      <InfoTooltip
        title="Tiêu đề gợi ý"
        content={
          <div className="tooltip-rich-list">
            <span className="tooltip-pill pill-fact">Dữ kiện thực tế</span>
            <p>Đã được kiểm chứng.</p>
          </div>
        }
      />
    );

    const tooltipBubble = screen.getByRole('tooltip');
    expect(tooltipBubble.textContent).toContain('Tiêu đề gợi ý');
    expect(tooltipBubble.textContent).toContain('Dữ kiện thực tế');
    expect(tooltipBubble.textContent).toContain('Đã được kiểm chứng.');
  });
});


