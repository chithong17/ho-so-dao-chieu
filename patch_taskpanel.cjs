const fs = require('fs');
let code = fs.readFileSync('components/TaskPanel.tsx', 'utf8');

if (!code.includes('import {playSfx')) {
  code = "import {playSfx} from '../lib/audio';\n" + code;
}

code = code.replace(
  "const submit=()=>{if(!answerComplete(task.id,a)){setError('Hãy hoàn t?t các l?a ch?n, d? s? th? và ch?ng c? tru?c khi ghi nh?n.');return;}dispatch({type:'submit',id:task.id,answer:a,at:new Date().toISOString()});setError('');};",
  "const submit=()=>{if(!answerComplete(task.id,a)){playSfx('error');setError('Hãy hoàn t?t các l?a ch?n, d? s? th? và ch?ng c? tru?c khi ghi nh?n.');return;} const res = evaluateChallenge(task.id, a); if (res.score >= 3) playSfx('success'); else playSfx('error'); dispatch({type:'submit',id:task.id,answer:a,at:new Date().toISOString()});setError('');};"
);

fs.writeFileSync('components/TaskPanel.tsx', code, 'utf8');
console.log('Patched TaskPanel.tsx');
