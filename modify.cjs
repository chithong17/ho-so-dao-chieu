const fs = require('fs');
let content = fs.readFileSync('components/Game.tsx', 'utf8');

// Update global click listener to handle data-sfx
content = content.replace(
  'export default function Game(){ useEffect(() => { const handleGlobalClick = (e: any) => { const target = e.target; if (target.closest("button") || target.closest("a")) { playSfx("click"); } }; window.addEventListener("click", handleGlobalClick); return () => window.removeEventListener("click", handleGlobalClick); }, []); return <GameProvider><ChapterEvents/><Shell/></GameProvider>; }',
  'export default function Game(){ useEffect(() => { const handleGlobalClick = (e: any) => { const target = e.target; const sfxTarget = target.closest("[data-sfx]"); if (sfxTarget) { playSfx(sfxTarget.getAttribute("data-sfx")); } else if (target.closest("button") || target.closest("a")) { playSfx("click"); } }; window.addEventListener("click", handleGlobalClick); return () => window.removeEventListener("click", handleGlobalClick); }, []); return <GameProvider><ChapterEvents/><Shell/></GameProvider>; }'
);

fs.writeFileSync('components/Game.tsx', content);
console.log('Modified Game.tsx global listener successfully!');
