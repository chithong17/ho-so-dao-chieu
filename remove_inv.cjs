const fs = require('fs');
let code = fs.readFileSync('components/Game.tsx', 'utf8');

code = code.replace(/const inventory = \(\n\s*<div className="inventory-bar">[\s\S]*?<\/div>\n\s*\);\n/, "");
code = code.replace("<EscapeRoom onInteract={setActiveObj}/>{inventory}", "<EscapeRoom onInteract={setActiveObj}/>");

fs.writeFileSync('components/Game.tsx', code);
