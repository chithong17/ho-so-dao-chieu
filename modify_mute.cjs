const fs = require('fs');
let content = fs.readFileSync('components/Game.tsx', 'utf8');

// Replace the start of the header-tools block
content = content.replace(
  /<div className="header-tools"><span className="save-indicator"/,
  '<div className="header-tools"><button className="icon-button" title={muted ? "Bat am thanh" : "Tat am thanh"} onClick={toggleMute}>{muted ? <VolumeX size={19}/> : <Volume2 size={19}/>}</button><span className="save-indicator"'
);

fs.writeFileSync('components/Game.tsx', content);
console.log('Modified Game.tsx mute button successfully!');
