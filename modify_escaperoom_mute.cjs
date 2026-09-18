const fs = require('fs');
let content = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

content = content.replace(
  'import { Terminal, FolderClosed, Pin, ChevronLeft, ChevronRight, Laptop, Smartphone, Book } from \'lucide-react\';',
  'import { Terminal, FolderClosed, Pin, ChevronLeft, ChevronRight, Laptop, Smartphone, Book, Volume2, VolumeX } from \'lucide-react\';\nimport { getMute, setMute } from \'../lib/audio\';'
);

content = content.replace(
  'export default function EscapeRoom({ onInteract, onExit }: EscapeRoomProps) {',
  'export default function EscapeRoom({ onInteract, onExit }: EscapeRoomProps) {\n  const [muted, setMutedState] = React.useState(getMute());\n  const toggleMute = (e) => {\n    e.stopPropagation();\n    const next = !getMute();\n    setMute(next);\n    setMutedState(next);\n  };'
);

content = content.replace(
  '<button className="exit-room-btn" onClick={onExit}>\n            X\n          </button>',
  '<button className="exit-room-btn" onClick={onExit}>\n            X\n          </button>\n          <button \n            className="exit-room-btn" \n            style={{ left: \'auto\', right: \'20px\', display: \'flex\', justifyContent: \'center\', alignItems: \'center\' }} \n            onClick={toggleMute}\n            title={muted ? \'B?t âm thanh\' : \'T?t âm thanh\'}\n          >\n            {muted ? <VolumeX size={20}/> : <Volume2 size={20}/>}\n          </button>'
);

fs.writeFileSync('components/EscapeRoom.tsx', content);
console.log('Modified EscapeRoom.tsx mute button successfully!');
