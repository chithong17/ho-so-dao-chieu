const fs = require('fs');
let code = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

code = code.replace(
  "if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('hs01_intro_seen', '1');\\\\n          setScene('desk');",
  "if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('hs01_intro_seen', '1');\\nsetScene('desk');"
);

fs.writeFileSync('components/EscapeRoom.tsx', code, 'utf8');
console.log('Fixed intro');
