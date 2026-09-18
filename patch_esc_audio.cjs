const fs = require('fs');
let code = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

if (!code.includes('import { playBgm }')) {
  code = code.replace(
    "import React, { useState, useEffect } from 'react';",
    "import React, { useState, useEffect } from 'react';\\nimport { playBgm } from '../lib/audio';"
  );
}

// Ensure the import exists if the first replace failed
if (!code.includes('import { playBgm }')) {
  code = "import { playBgm } from '../lib/audio';\\n" + code;
}

code = code.replace(
  "const [showTutorial, setShowTutorial] = useState(false);",
  "const [showTutorial, setShowTutorial] = useState(false);\\n  useEffect(() => { if (scene !== 'intro') playBgm('investigation'); }, [scene]);"
);

fs.writeFileSync('components/EscapeRoom.tsx', code, 'utf8');
console.log('Patched EscapeRoom.tsx');
