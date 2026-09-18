const fs = require('fs');
let code = fs.readFileSync('components/Simulations.tsx', 'utf8');

const t11Replacement = `
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
        setLogs(prev => [...prev, \`> Đang chạy: \${actions[step-1]}...\`]);
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
          record(current);
        }, 3000);
      }
    }, 800);
  };

  return (
    <div className="simulation">
      <div className="sim-title">KẾ HOẠCH KHÔI PHỤC</div>
      <div className={\`time-budget \${result.totalTime > 60 ? 'over' : ''}\`}>
        <strong>{result.totalTime}<span> / 60 phút</span></strong>
        <div><i style={{ width: \`\${Math.min(100, result.totalTime / 60 * 100)}%\` }} /></div>
      </div>
      <button className="secondary small" disabled={!actions.length || running} onClick={startSimulation}>
        <Play size={14} /> Mô phỏng phương án
      </button>
      
      {running && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', flexDirection: 'column', padding: '40px', fontFamily: 'monospace', color: '#0f0', fontSize: '18px' }}>
          <h2>HỆ THỐNG MÔ PHỎNG V.1</h2>
          <hr style={{ borderColor: '#0f0', marginBottom: '20px' }}/>
          {logs.map((l, i) => <div key={i} style={{ marginBottom: '10px' }}>{l}</div>)}
          <span className="blink-cursor">_</span>
        </div>
      )}
      
      {done && (
        <div role="status" className={\`sim-result \${result.success ? 'good' : 'bad'}\`}>
          <ArrowRight size={18} />{result.message}
        </div>
      )}
      <small className="sim-note">Chi phí giả định của trò chơi, không phải định mức ngoài đời.</small>
    </div>
  );
}

// And replace the if(id==='T11') block with this:
`;

code = code.replace(/if\(id==='T11'\)\{[\s\S]*?return null;/m, `if(id==='T11') return <T11Simulation id={id} actions={actions} record={record} runs={runs} />;\n return null;\n}\n${t11Replacement}`);

fs.writeFileSync('components/Simulations.tsx', code, 'utf8');
console.log('T11 Cinematic Simulation added!');
