const fs = require('fs');
let code = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

code = "import { playBgm } from '../lib/audio';\n" + code;

code = code.replace(
  'export default function EscapeRoom({ onInteract, onExit }: EscapeRoomProps) {',
  'export default function EscapeRoom({ onInteract, onExit, forceIntro }: EscapeRoomProps & { forceIntro?: boolean }) {'
);

code = code.replace(
  "const [scene, setScene] = useState<Scene>(() => typeof sessionStorage !== 'undefined' && sessionStorage.getItem('hs01_intro_seen') ? 'desk' : 'intro');",
  "const [scene, setScene] = useState<Scene>(forceIntro ? 'intro' : (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('hs01_intro_seen') ? 'desk' : 'intro'));"
);

code = code.replace(
  "const [showTutorial, setShowTutorial] = useState(false);",
  "const [showTutorial, setShowTutorial] = useState(false);\n  useEffect(() => { if (scene !== 'intro') playBgm('investigation'); }, [scene]);"
);

fs.writeFileSync('components/EscapeRoom.tsx', code, 'utf8');
console.log('Patched EscapeRoom.tsx');
