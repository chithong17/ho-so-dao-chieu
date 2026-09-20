import { playSfx } from '../lib/audio';
'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Play, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Wifi, WifiOff } from 'lucide-react';
import { simulateNetwork, simulateLinks, simulateRecovery, simulateEasyRecovery } from '../game/engine';
import { useGame } from './GameProvider';
export default function Simulations({ id, actions = [] }: { id: string; actions?: string[] }) {
  const { state, dispatch } = useGame();
  const [online, setOnline] = useState(true), [converted, setConverted] = useState(false), [link, setLink] = useState<'BC' | 'CA' | null>(null), [version, setVersion] = useState('V1'), [run, setRun] = useState<string | null>(null);
  const record = (value: string, isSuccess?: boolean) => { setRun(value); dispatch({ type: 'experiment', id, run: value }); if (isSuccess !== undefined) playSfx(isSuccess ? 'success' : 'error'); };
  const runs = state.experiments[id] ?? [];
  if (id === 'N5') { const result = simulateEasyRecovery(actions), current = actions.join(','); return <div className="simulation"><div className="sim-title">KẾ HOẠCH KHÔI PHỤC</div><button className="secondary small" disabled={actions.length !== 3} onClick={() => record(current, result.success)}><Play size={14} /> Mô phỏng phương án</button>{run === current && <div role="status" className={`sim-result ${result.success ? 'good' : 'bad'}`}><ArrowRight size={18} />{result.message}</div>}<small className="sim-note">Mô hình theo điều kiện của hồ sơ.</small></div>; }
  if (id === 'T05') { const result = simulateNetwork(online, converted), current = `${online}-${converted}`; return <div className="simulation"><div className="sim-title"><span className="status-dot" /> PHÒNG THỬ · ĐIỀU KIỆN DỮ LIỆU</div><div className="sim-toggles"><label><input type="checkbox" checked={online} onChange={e => setOnline(e.target.checked)} />{online ? <Wifi size={16} /> : <WifiOff size={16} />} Có mạng</label><label><input type="checkbox" checked={converted} onChange={e => setConverted(e.target.checked)} /> Đã chuyển đổi dữ liệu</label></div><code className="sim-code">{converted ? '{ fullName: "Người dùng thử" }' : '{ name: "Người dùng thử" }'}</code><button className="secondary small" onClick={() => { playSfx('sim_running'); setTimeout(() => record(current, result.localSuccess), 500); }}><Play size={14} /> Chạy lại mô hình</button>{run === current && <div role="status" className={`sim-result ${result.localSuccess ? 'good' : 'bad'}`}><strong>{result.localSuccess ? 'Local: hoàn tất' : 'Local: từ chối'}</strong><p>{result.message}</p><small>{result.shareAvailable ? 'Có thể chia sẻ qua mạng.' : 'Chia sẻ online đang gián đoạn.'}</small></div>}<small className="sim-note">Đã thử {runs.length}/4 điều kiện. Kết quả theo mô hình xác định.</small></div>; }
  if (id === 'T08') { const result = simulateLinks(link); return <div className="simulation"><div className="sim-title">BÀN TÁI DỰNG · {result.count} LIÊN KẾT</div><div className="flow-diagram"><div className="flow-node"><b>A</b><small>Nhận</small></div><span>⇄</span><div className="flow-node"><b>B</b><small>Kiểm tra</small></div><span className={link === 'BC' ? 'flow-connected' : 'flow-broken'}>{link === 'BC' ? '→' : '⋯'}</span><div className="flow-node"><b>C</b><small>Lưu</small></div><span>→</span><div className="flow-node"><b>D</b><small>Tạo phiếu</small></div></div>{link === 'CA' && <p className="flow-extra">C → A đã thêm · vẫn thiếu đường từ B đến C</p>}<div className="sim-buttons"><button className={link === 'CA' ? 'selected' : ''} onClick={() => { setLink('CA'); playSfx('sim_running'); setTimeout(() => record('CA', true), 500); }}>Thử C → A</button><button className={link === 'BC' ? 'selected' : ''} onClick={() => { setLink('BC'); playSfx('sim_running'); setTimeout(() => record('BC', false), 500); }}>Thử B → C</button><button aria-label="Xóa liên kết bổ sung" onClick={() => { setLink(null); setRun(null); }}><RotateCcw size={15} /></button></div>{run && link && <div role="status" className={`sim-result ${result.success ? 'good' : 'bad'}`}><strong>{result.path}</strong><p>{result.success ? 'Lượt 1: đã tạo phiếu. Lượt 2: đã tạo phiếu.' : 'Chưa hình thành luồng hoàn chỉnh.'}</p></div>}<small className="sim-note">Đã thử {runs.filter(r => ['CA', 'BC'].includes(r)).length}/2 cách nối. Số bốn không là điểm nút chung cho các dự án.</small></div>; }
  if (id === 'T10') return <div className="simulation"><div className="sim-title">ĐỐI CHIẾU NĂNG LỰC</div><div className="sim-buttons">{['V1', 'V2', 'V3'].map(v => <button key={v} className={version === v ? 'selected' : ''} onClick={() => setVersion(v)}>{v}</button>)}</div><p>{version === 'V1' ? 'Màu sắc, biểu tượng, hoạt ảnh mới.' : version === 'V2' ? 'Thêm trang giới thiệu và trường nhập.' : 'Giữ phần phù hợp, chuyển đổi đúng, thử toàn luồng.'}</p><button className="secondary small" onClick={() => { playSfx('sim_running'); setTimeout(() => record(version, version === 'V3'), 500); }}><Play size={14} /> Chạy bản {version}</button>{run === version && <div role="status" className={`sim-result ${version === 'V3' ? 'good' : 'bad'}`}>{version === 'V3' ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}<span>{version === 'V3' ? 'Đạt các tình huống test đã nêu.' : 'Vẫn từ chối dữ liệu. Chưa hoàn tất đăng ký.'}</span></div>}<small className="sim-note">Đã thử {runs.length}/3 phiên bản · không bảo đảm mọi điều kiện thực tế.</small></div>;
  if (id === 'T11') return <T11Simulation id={id} actions={actions} record={record} runs={runs} />;
  return null;
}

function T11Simulation({ id, actions, record, runs }: any) {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const result = simulateRecovery(actions);
  const current = actions.join(',');

  const startSimulation = () => {
    setRunning(true);
    setDone(false);
    setLogs(['> [SYSTEM] Khởi chạy mô phỏng khôi phục khẩn cấp...']);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step <= actions.length) {
        setLogs(prev => [...prev, `> Đang chạy: ${actions[step - 1]}...`]);
      } else if (step === actions.length + 1) {
        setLogs(prev => [...prev, '> Đang tổng hợp kết quả...']);
      } else {
        clearInterval(interval);
        if (result.success) {
          setLogs(prev => [...prev, '> [SUCCESS] ' + result.message]);
        } else {
          setLogs(prev => [...prev, '> [CRITICAL FAILURE] ' + result.message]);
        }
        setTimeout(() => {
          setRunning(false);
          setDone(true);
          record(current, result.success);
        }, 3000);
      }
    }, 800);
  };

  return (
    <div className="simulation">
      <div className="sim-title">KẾ HOẠCH KHÔI PHỤC</div>
      <div className={`time-budget ${result.totalTime > 60 ? 'over' : ''}`}>
        <strong>{result.totalTime}<span> / 60 phút</span></strong>
        <div><i style={{ width: `${Math.min(100, result.totalTime / 60 * 100)}%` }} /></div>
      </div>
      <button className="secondary small" disabled={!actions.length || running} onClick={startSimulation}>
        <Play size={14} /> Mô phỏng phương án
      </button>

      {running && typeof document !== 'undefined' && createPortal(
        <div className="sim-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', flexDirection: 'column', padding: '40px', fontFamily: 'monospace', color: '#0f0', fontSize: '18px', textShadow: '0 0 5px #0f0' }}>
          <h2>HỆ THỐNG MÔ PHỎNG V.1</h2>
          <hr style={{ borderColor: '#0f0', marginBottom: '20px' }} />
          {logs.map((l, i) => <div key={i} style={{ marginBottom: '10px' }}>{l}</div>)}
          <span className="blink-cursor">_</span>
        </div>,
        document.body
      )}

      {done && (
        <div role="status" className={`sim-result ${result.success ? 'good' : 'bad'}`}>
          <ArrowRight size={18} />{result.message}
        </div>
      )}
      <small className="sim-note">Chi phí giả định của trò chơi, không phải định mức ngoài đời.</small>
    </div>
  );
}

// And replace the if(id==='T11') block with this:


