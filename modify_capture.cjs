const fs = require('fs');
let content = fs.readFileSync('components/Game.tsx', 'utf8');

content = content.replace(
  /window\.addEventListener\("click", handleGlobalClick\);/g,
  'window.addEventListener("click", handleGlobalClick, true);'
);
content = content.replace(
  /window\.removeEventListener\("click", handleGlobalClick\);/g,
  'window.removeEventListener("click", handleGlobalClick, true);'
);

fs.writeFileSync('components/Game.tsx', content);
console.log('Modified Game.tsx successfully to use capture phase!');
