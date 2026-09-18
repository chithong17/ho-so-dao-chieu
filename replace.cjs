const fs = require('fs');
const file = 'components/EscapeRoom.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `        {scene === 'desk' && (
          <>
            <img 
              src="/scene_desk.jpg" 
              alt="Desk View" 
              className="room-bg" 
              draggable="false" 
              style={{ filter: 'sepia(0.3) saturate(1.2) brightness(1.1) hue-rotate(-5deg)' }}
            />
            
            <Interactable
              x="45%" y="40%" width="14%" height="20%"
              label="Máy tính - nhật ký kỹ thuật"
              icon={<Laptop size={24} />}
              onClick={() => onInteract('laptop')} sfx="laptop"
            />
            
            <Interactable
              x="33%" y="58%" width="12%" height="10%"
              label="Hồ sơ vụ án (Sổ điều tra)"
              icon={<Book size={24} />}
              onClick={() => onInteract('notebook')} sfx="page_turn"
            />
            
            <Interactable
              x="52%" y="62%" width="7%" height="6%"
              label="Điện thoại - liên lạc nhóm"
              icon={<Smartphone size={24} />}
              onClick={() => onInteract('phone')} sfx="phone"
            />
          </>`

content = content.replace(/\{scene === 'desk' && \([\s\S]*?onClick=\{\(\) => onInteract\('phone'\)\} sfx="phone"\s*\/>\s*<\/>/m, replacement);
fs.writeFileSync(file, content, 'utf8');
