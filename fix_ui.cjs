const fs = require('fs');

// 1. Fix Game.tsx laptop sidebar text overlap
let gameContent = fs.readFileSync('components/Game.tsx', 'utf8');
gameContent = gameContent.replace(
  '<span><small>{e.id} <span>{e.author}</span></small><strong>{e.title}</strong><em>{e.summary}</em></span>',
  '<span><small>{e.id}</small><strong>{e.title}</strong></span>'
);
fs.writeFileSync('components/Game.tsx', gameContent);
console.log('Fixed Game.tsx sidebar overlap');

// 2. Fix PhysicalFiles.tsx font size on the right side
let physicalFilesContent = fs.readFileSync('components/PhysicalFiles.tsx', 'utf8');
physicalFilesContent = physicalFilesContent.replace(
  'fontSize:\\'clamp(18px, 2.5vw, 26px)\\'',
  'fontSize:\\'clamp(16px, 2.1vw, 22px)\\''
);
physicalFilesContent = physicalFilesContent.replace(
  'fontSize:\\'clamp(14px, 1.8vw, 18px)\\'',
  'fontSize:\\'clamp(13px, 1.6vw, 16px)\\''
);
physicalFilesContent = physicalFilesContent.replace(
  'fontSize:\\'clamp(13px, 1.7vw, 16px)\\'',
  'fontSize:\\'clamp(12px, 1.5vw, 15px)\\''
);
fs.writeFileSync('components/PhysicalFiles.tsx', physicalFilesContent);
console.log('Fixed PhysicalFiles.tsx font sizes');

