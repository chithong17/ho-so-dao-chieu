const fs = require('fs');
let code = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

code = code.replace(
  "useEffect(() => { if (scene !== 'intro') playBgm('investigation'); }, [scene]);",
  "React.useEffect(() => { if (scene !== 'intro') playBgm('investigation'); }, [scene]);"
);

fs.writeFileSync('components/EscapeRoom.tsx', code, 'utf8');
console.log('Fixed EscapeRoom.tsx');
