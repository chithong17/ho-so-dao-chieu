const fs = require('fs');
const text = fs.readFileSync('components/TaskPanel.tsx', 'utf8');
const match = text.match(/const submit=\(\)=>{[\s\S]*?\}/);
if (match) console.log(match[0]);
