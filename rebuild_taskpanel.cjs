const fs = require('fs');
let tsx = fs.readFileSync('components/TaskPanel.tsx', 'utf8');

// Find where aside begins and where task-content begins
const taskPanelHead = tsx.indexOf('<div className="task-panel-head">');
const taskContent = tsx.indexOf('<div className="task-content"');

if (taskPanelHead === -1 || taskContent === -1) {
  console.log('Markers not found. Current structure:');
  console.log(tsx.substring(tsx.indexOf('<aside'), tsx.indexOf('<aside') + 300));
  process.exit(1);
}

const leftBlock = tsx.substring(taskPanelHead, taskContent);
const polaroid = `
  <div className="polaroid-decor" style={{marginTop: '20px', padding: '0 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.85, transform: 'rotate(-2deg)'}}>
    <div style={{background: '#f8f8f8', padding: '6px 6px 24px 6px', boxShadow: '2px 4px 12px rgba(0,0,0,0.4)', width: '180px', position: 'relative'}}>
      <div style={{position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%) rotate(3deg)', width: '50px', height: '16px', background: 'rgba(230, 220, 200, 0.7)', border: '1px solid rgba(0,0,0,0.1)'}}></div>
      <div style={{width: '100%', height: '120px', background: 'url(/bg_room.jpg) center/cover no-repeat', filter: 'grayscale(100%) contrast(1.1) brightness(0.9)'}}></div>
    </div>
    <div style={{marginTop: '20px', fontFamily: '"Patrick Hand", cursive', fontSize: '16px', textAlign: 'center', color: '#1a140f', transform: 'rotate(1deg)'}}>
      "Mỗi vấn đề,<br/>đều có một hướng giải."
    </div>
  </div>
`;

// Wrap head+pagination+polaroid in task-panel-left
const newLeft = `<div className="task-panel-left" style={{display:'flex',flexDirection:'column',gap:'8px',overflow:'hidden'}}>
${leftBlock}
${polaroid}
</div>`;

tsx = tsx.substring(0, taskPanelHead) + newLeft + tsx.substring(taskContent);
fs.writeFileSync('components/TaskPanel.tsx', tsx);
console.log('Rebuilt TaskPanel with polaroid and task-panel-left wrapper!');
