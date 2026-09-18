const fs = require('fs');
let code = fs.readFileSync('components/Game.tsx', 'utf8');

// Fix the disabled button issue
code = code.replace(/disabled=\{e\.fiction\}/g, '');

// Fix the modal visibility issue
code = code.replace(/activeObj==='board' && view==='evidence'/g, "activeObj==='argument' && view==='evidence'");

fs.writeFileSync('components/Game.tsx', code, 'utf8');
console.log('Fixed Game.tsx');
