const fs = require('fs');
let code = fs.readFileSync('components/TaskPanel.tsx', 'utf8');

// Find the <div className="task-pagination">...</div>
const paginationRegex = /(<div className="task-pagination">.*?<\/div>)/;
const match = code.match(paginationRegex);
if (match) {
  const insert = `
  <div className="polaroid-decor" style={{marginTop: '40px', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.85, transform: 'rotate(-2deg)'}}>
    <div style={{background: '#f8f8f8', padding: '8px 8px 30px 8px', boxShadow: '2px 4px 12px rgba(0,0,0,0.4)', width: '240px', position: 'relative'}}>
      {/* Tape */}
      <div style={{position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%) rotate(3deg)', width: '60px', height: '20px', background: 'rgba(230, 220, 200, 0.7)', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 1px 2px rgba(0,0,0,0.1)'}}></div>
      {/* Photo */}
      <div style={{width: '100%', height: '160px', background: 'url(/scene_desk.jpg) center/cover grayscale(100%) contrast(1.1) brightness(1.2)'}}></div>
    </div>
    <div style={{marginTop: '25px', fontFamily: '"Patrick Hand", cursive', fontSize: '20px', textAlign: 'center', color: '#1a140f', transform: 'rotate(1deg)', fontWeight: 'bold'}}>
      "Mỗi vấn đề,<br/>đều có một hướng giải."
    </div>
  </div>`;
  code = code.replace(match[1], match[1] + insert);
  fs.writeFileSync('components/TaskPanel.tsx', code);
  console.log('Injected polaroid decor');
} else {
  console.log('Could not find pagination block');
}
