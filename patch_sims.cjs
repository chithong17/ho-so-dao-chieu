const fs = require('fs');
let text = fs.readFileSync('components/Simulations.tsx', 'utf8');

if (!text.includes('import {playSfx')) {
  text = "import {playSfx} from '../lib/audio';\n" + text;
}

text = text.replace(
  "const record=(value:string)=>{setRun(value);dispatch({type:'experiment',id,run:value});};",
  "const record=(value:string, isSuccess?: boolean)=>{setRun(value);dispatch({type:'experiment',id,run:value}); if(isSuccess!==undefined) playSfx(isSuccess?'success':'error');};"
);

text = text.replace(
  "onClick={()=>record(current)}",
  "onClick={()=>{playSfx('sim_running'); setTimeout(() => record(current, result.localSuccess), 500);}}"
);

text = text.replace(
  "onClick={()=>{setLink('CA');record('CA');}}",
  "onClick={()=>{setLink('CA'); playSfx('sim_running'); setTimeout(()=>record('CA', true), 500);}}" // wait simulateLinks is local
);

text = text.replace(
  "onClick={()=>{setLink('BC');record('BC');}}",
  "onClick={()=>{setLink('BC'); playSfx('sim_running'); setTimeout(()=>record('BC', false), 500);}}" // simulateLinks depends on link
);

text = text.replace(
  "onClick={()=>record(version)}",
  "onClick={()=>{playSfx('sim_running'); setTimeout(() => record(version, version==='V3'), 500);}}"
);

text = text.replace(
  "setLogs(['> [SYSTEM] Kh?i ch?y mô ph?ng khôi ph?c kh?n c?p...']);",
  "playSfx('sim_running');\n      setLogs(['> [SYSTEM] Kh?i ch?y mô ph?ng khôi ph?c kh?n c?p...']);"
);

text = text.replace(
  "record(current);",
  "record(current, result.success);"
);

fs.writeFileSync('components/Simulations.tsx', text, 'utf8');
console.log('Patched Simulations.tsx');
