const fs = require('fs');
let code = fs.readFileSync('components/GameProvider.tsx', 'utf8');

code = code.replace(
  "if(fresh){try{const raw=JSON.stringify(next);localStorage.setItem(key(m),raw);lastRaw.current=raw;setSaveStatus('ау b?t d?u lu?t m?i');}",
  "if(fresh){if(typeof sessionStorage!=='undefined')sessionStorage.removeItem('hs01_intro_seen');try{const raw=JSON.stringify(next);localStorage.setItem(key(m),raw);lastRaw.current=raw;setSaveStatus('ау b?t d?u lu?t m?i');}"
);

fs.writeFileSync('components/GameProvider.tsx', code, 'utf8');
console.log('Patched GameProvider.tsx');
