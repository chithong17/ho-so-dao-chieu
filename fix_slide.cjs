const fs = require('fs');
let code = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

const regex = /\{ img: '\/cinematic_22\.jpg'.*?\\n    \{ img: '\/cinematic_2\.jpg'/;
const replacement = `{ img: '/cinematic_22.jpg', text: 'aaaaa\\nKhông khí ngột ngạt bên những màn hình dang dở.' },
    { img: '/cinematic_2.jpg'`;

code = code.replace(regex, replacement);
fs.writeFileSync('components/EscapeRoom.tsx', code);
console.log('Fixed slides!');
