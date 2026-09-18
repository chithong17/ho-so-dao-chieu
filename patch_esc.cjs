const fs = require('fs');
let code = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

code = code.replace(
  'export default function EscapeRoom({ onInteract, onExit }: EscapeRoomProps) {',
  'export default function EscapeRoom({ onInteract, onExit, forceIntro }: EscapeRoomProps & { forceIntro?: boolean }) {'
);

code = code.replace(
  "const [scene, setScene] = useState<Scene>(() => typeof sessionStorage !== 'undefined' && sessionStorage.getItem('hs01_intro_seen') ? 'desk' : 'intro');",
  "const [scene, setScene] = useState<Scene>(forceIntro ? 'intro' : (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('hs01_intro_seen') ? 'desk' : 'intro'));"
);

fs.writeFileSync('components/EscapeRoom.tsx', code, 'utf8');
console.log('Patched EscapeRoom.tsx');
