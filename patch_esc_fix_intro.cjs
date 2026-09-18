const fs = require('fs');
let code = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

code = code.replace(
  "React.useEffect(() => { if (scene !== 'intro') playBgm('investigation'); }, [scene]);",
  "React.useEffect(() => { if (scene === 'intro') playBgm('intro'); else playBgm('investigation'); }, [scene]);"
);

fs.writeFileSync('components/EscapeRoom.tsx', code, 'utf8');
console.log('Fixed EscapeRoom.tsx again');
