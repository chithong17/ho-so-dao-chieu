const fs = require('fs');
let code = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

// Import useGame if not imported
if (!code.includes('import { useGame }')) {
  code = code.replace("import { Terminal, FolderClosed, Pin, ChevronLeft, ChevronRight, Laptop, Smartphone, Book } from 'lucide-react';", "import { Terminal, FolderClosed, Pin, ChevronLeft, ChevronRight, Laptop, Smartphone, Book } from 'lucide-react';\nimport { useGame } from './GameProvider';");
}

// Add the dev button inside the room-container
const buttonCode = `
      <button 
        style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: '#c0392b', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        onClick={() => {
          const s = { ...state, unlocked: 3, chapter: 3, debriefs: [1,2], screen: 'investigation' };
          dispatch({ type: 'load', state: s as any });
          alert('Đã mở khóa Chương 3! Hãy click vào quyển sổ Hồ Sơ Vụ Án trên bàn để chơi.');
        }}
      >
        [DEV] Bỏ qua đến Màn 60 Phút
      </button>
`;

// Inject into function EscapeRoom
if (!code.includes('const { state, dispatch } = useGame();')) {
  code = code.replace("const [scene, setScene] = useState<Scene>('intro');", "const [scene, setScene] = useState<Scene>('intro');\n  const { state, dispatch } = useGame();");
}

if (!code.includes('[DEV] Bỏ qua đến Màn 60 Phút')) {
  code = code.replace('<div className="room-container">', '<div className="room-container">' + buttonCode);
}

fs.writeFileSync('components/EscapeRoom.tsx', code, 'utf8');
console.log('Added Dev Button!');
