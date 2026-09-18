const fs = require('fs');
let code = fs.readFileSync('components/Game.tsx', 'utf8');

code = code.replace(
  /<EscapeRoom onInteract={handleInteract} onExit={\(\)=>setHome\(true\)}\/>/g,
  '<EscapeRoom onInteract={handleInteract} onExit={()=>setHome(true)} forceIntro={state.elapsed < 5}/>'
);

fs.writeFileSync('components/Game.tsx', code, 'utf8');
console.log('Patched Game.tsx');
