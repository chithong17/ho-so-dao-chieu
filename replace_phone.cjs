const fs = require('fs');
const file = 'components/EscapeRoom.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `            <Interactable
              x="48%" y="64%" width="9%" height="8%"
              label="Điện thoại - liên lạc nhóm"
              icon={<Smartphone size={24} />}
              onClick={() => onInteract('phone')} sfx="phone"
            />
          </>`

content = content.replace(/<Interactable\s+x="43%" y="58%" width="7%" height="7%"\s+label="Điện thoại - liên lạc nhóm"[\s\S]*?sfx="phone"\s*\/>\s*<\/>/m, replacement);
fs.writeFileSync(file, content, 'utf8');
