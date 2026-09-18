const fs = require('fs');
let content = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

content = content.replace(
  /onClick=\{onExit\}>\s*X\s*<\/button>/,
  'onClick={onExit}>\n          X\n        </button>\n        <button \n          className="exit-room-btn" \n          style={{ left: \'auto\', right: \'20px\', display: \'flex\', justifyContent: \'center\', alignItems: \'center\' }} \n          onClick={toggleMute}\n          title={muted ? \'B?t âm thanh\' : \'T?t âm thanh\'}\n        >\n          {muted ? <VolumeX size={20}/> : <Volume2 size={20}/>}\n        </button>'
);

fs.writeFileSync('components/EscapeRoom.tsx', content);
console.log('Modified EscapeRoom.tsx mute button successfully!');
