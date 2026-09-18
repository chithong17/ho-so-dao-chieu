const fs = require('fs');
const tasksCode = fs.readFileSync('game/tasks.ts', 'utf8');

let out = '# 🕵️ HƯỚNG DẪN CHƠI QUA MÀN - HỒ SƠ ĐẢO CHIỀU\n\n';
out += '## 🗺️ 1. Giới thiệu các địa điểm (Nơi nào chứa gì?)\n';
out += '- **Bàn làm việc (Desk):** Nơi chứa Laptop (chứa chat, email, code log, terminal) và Điện thoại (tin nhắn, thông báo). Tại đây bạn thu thập các manh mối ban đầu.\n';
out += '- **Bảng trắng (Board):** Nơi bạn ghim các bằng chứng (Evidence) thu thập được từ Laptop và Điện thoại. Kéo thả các mảnh ghi chú để xâu chuỗi chúng lại với nhau.\n';
out += '- **Hồ sơ (Dossier):** Nơi chứa danh sách các chương và Nhiệm vụ (Task). Bạn cần hoàn thành tất cả nhiệm vụ trong một chương để mở khóa chương tiếp theo.\n\n';

out += '## 🎮 2. Cách thức qua chương\n';
out += 'Để hoàn thành một chương, bạn cần mở **Hồ sơ**, chọn các nhiệm vụ đang mở. Mỗi nhiệm vụ sẽ đưa ra một số câu hỏi hoặc yêu cầu.\n';
out += 'Bạn phải **chọn bằng chứng** (bấm nút hình cái kẹp giấy) phù hợp để làm căn cứ trả lời các câu hỏi đó.\n';
out += 'Ví dụ: Nếu câu hỏi hỏi về "nhật ký thay đổi", bạn phải kẹp bằng chứng là file log (E08). Nếu chọn sai bằng chứng, hệ thống sẽ nhắc nhở (Hint hoặc Counterpoint) yêu cầu bạn tìm bằng chứng khác.\n\n';

out += '## 🧩 3. Cốt truyện và Triết học\n';
out += 'Game mượn hình ảnh quá trình code lỗi của một nhóm sinh viên IT để giải thích các khái niệm triết học:\n';
out += '- **Chương 1 (Hiểu lầm):** Đi tìm nguyên nhân thật sự (Cái chung - Cái riêng).\n';
out += '- **Chương 2 (Truy vết):** Mối liên hệ nhân quả, Lượng đổi - Chất đổi.\n';
out += '- **Chương 3 (Giải quyết):** Phủ định của phủ định (Viết lại code trên nền tảng cũ nhưng xịn hơn).\n\n';

out += '## 🔑 4. Đáp án chi tiết các Nhiệm vụ Trắc nghiệm (Spoilers!)\n\n';

const tasksRegex = /id:\s*['"](T\d+)['"].*?title:\s*['"](.*?)['"].*?questions:\s*\[(.*?)\]\s*(?=\}|,?\s*\{id:)/gs;
let match;
while ((match = tasksRegex.exec(tasksCode)) !== null) {
  out += '### Nhiệm vụ ' + match[1] + ': ' + match[2] + '\n';
  const questionsRaw = match[3];
  
  const qRegex = /q\(['"][^'"]+['"]\s*,\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*\[(.*?)\]\)/g;
  let qMatch;
  while ((qMatch = qRegex.exec(questionsRaw)) !== null) {
    const qText = qMatch[1];
    const correctAnsCode = qMatch[2];
    const optionsRaw = qMatch[3];
    
    // find correct text
    const optRegex = /\[['"]([^'"]+)['"]\s*,\s*['"](.*?)['"]/g;
    let optMatch;
    let correctText = '';
    while ((optMatch = optRegex.exec(optionsRaw)) !== null) {
      if (optMatch[1] === correctAnsCode) {
        correctText = optMatch[2];
      }
    }
    
    out += '- **Hỏi:** ' + qText + '\n';
    out += '  - **Đáp án:** ' + correctText + '\n';
  }
  out += '\n';
}

fs.writeFileSync('C:/Users/ACER/.gemini/antigravity/brain/c5f897bf-9e88-4a53-8222-fa0d6132ae1c/HUONG_DAN_CHOI.md', out, 'utf8');
