const fs = require('fs');
let code = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

const newSlides = `  const slides = [
    { img: '/cinematic_1.jpg', text: '19:40. Đêm triển lãm sinh viên.\\nKhông khí ngột ngạt bên những màn hình dang dở.' },
    { img: '/cinematic_2.jpg', text: '19:50. Lỗi 404.\\nBản Demo của nhóm Mạch Nối đột ngột biến mất khỏi hệ thống...' },
    { img: '/cinematic_23.jpg', text: 'Một tin nhắn gửi đến từ Nam:\\n"Tôi không làm tiếp nữa..."' },
    { img: '/cinematic_3.jpg', text: 'Sự nghi ngờ bao trùm. Niềm tin sụp đổ.\\nMọi tội lỗi đổ dồn về một người.' },
    { img: '/cinematic_4.jpg', text: 'Nhưng sự thật không nằm ở những lời đổ lỗi.\\nNó đang nằm trên bàn làm việc của bạn...' }
  ];`;

code = code.replace(/const slides = \[[\s\S]*?\];/, newSlides);

fs.writeFileSync('components/EscapeRoom.tsx', code, 'utf8');
console.log('Slides updated!');
