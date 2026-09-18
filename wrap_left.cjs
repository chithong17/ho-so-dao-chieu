const fs = require('fs');
let code = fs.readFileSync('components/TaskPanel.tsx', 'utf8');

const startHead = code.indexOf('<div className="task-panel-head">');
const endDecor = code.indexOf('<div className="task-content"');

if (startHead !== -1 && endDecor !== -1) {
  const leftContent = code.substring(startHead, endDecor);
  code = code.substring(0, startHead) + 
         '<div className="task-panel-left" style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", height: "100%" }}>' + 
         leftContent + 
         '</div>' + 
         code.substring(endDecor);
  fs.writeFileSync('components/TaskPanel.tsx', code);
  console.log('Wrapped left column successfully!');
} else {
  console.log('Could not find boundaries');
}
