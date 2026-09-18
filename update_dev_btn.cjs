const fs = require('fs');
let code = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

const oldDevCode = `const s = { ...state, unlocked: 3, chapter: 3, debriefs: [1,2], screen: 'investigation' };
          dispatch({ type: 'load', state: s as any });
          alert('Đã mở khóa Chương 3! Hãy click vào quyển sổ Hồ Sơ Vụ Án trên bàn để chơi.');`;

const newDevCode = `const s = { ...state, unlocked: 3, chapter: 3, debriefs: [1,2], screen: 'investigation', activeTask: 'T11' };
          dispatch({ type: 'load', state: s as any });
          onInteract('notebook');`;

code = code.replace(oldDevCode, newDevCode);
fs.writeFileSync('components/EscapeRoom.tsx', code, 'utf8');
console.log('Updated DEV button');
