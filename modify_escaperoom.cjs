const fs = require('fs');
let content = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

content = content.replace(
  /onClick=\{\(\) => onInteract\('laptop'\)\}/,
  'onClick={() => onInteract(\'laptop\')} sfx="laptop"'
);
content = content.replace(
  /onClick=\{\(\) => onInteract\('phone'\)\}/,
  'onClick={() => onInteract(\'phone\')} sfx="phone"'
);
content = content.replace(
  /onClick=\{\(\) => onInteract\('files'\)\}/,
  'onClick={() => onInteract(\'files\')} sfx="folder"'
);
content = content.replace(
  /onClick=\{\(\) => onInteract\('notebook'\)\}/,
  'onClick={() => onInteract(\'notebook\')} sfx="page_turn"'
);
content = content.replace(
  /onClick=\{\(\) => onInteract\('board'\)\}/,
  'onClick={() => onInteract(\'board\')} sfx="page_turn"'
);

fs.writeFileSync('components/EscapeRoom.tsx', content);
console.log('Modified EscapeRoom.tsx successfully!');
