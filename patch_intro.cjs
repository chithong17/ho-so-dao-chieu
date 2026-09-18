const fs = require('fs');
let code = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

code = code.replace(
  "const [scene, setScene] = useState<Scene>('intro');",
  "const [scene, setScene] = useState<Scene>(() => typeof sessionStorage !== 'undefined' && sessionStorage.getItem('hs01_intro_seen') ? 'desk' : 'intro');"
);

code = code.replace(
  "setScene('desk');",
  "if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('hs01_intro_seen', '1');\\n          setScene('desk');"
);

fs.writeFileSync('components/EscapeRoom.tsx', code, 'utf8');
console.log('Fixed intro');
