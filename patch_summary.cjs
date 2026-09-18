const fs = require('fs');
let code = fs.readFileSync('components/SummaryScreens.tsx', 'utf8');

if (!code.includes('import {playBgm')) {
  code = "import {playBgm, playSfx} from '../lib/audio';\nimport {useEffect} from 'react';\n" + code;
}

code = code.replace(
  'export function VerdictScreen(){',
  "export function VerdictScreen(){\n  useEffect(() => { playBgm('verdict'); }, []);"
);

code = code.replace(
  'export function Debrief(){',
  "export function Debrief(){\n  useEffect(() => { playSfx('chapter'); }, []);"
);

// We should also patch the finish button to play stamp
code = code.replace(
  "dispatch({type:'finish',verdict:v});",
  "playSfx('stamp'); setTimeout(() => dispatch({type:'finish',verdict:v}), 500);"
);

fs.writeFileSync('components/SummaryScreens.tsx', code, 'utf8');
console.log('Patched SummaryScreens.tsx');
