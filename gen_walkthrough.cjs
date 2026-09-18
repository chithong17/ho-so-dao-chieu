const fs = require('fs');

const tasksCode = fs.readFileSync('game/tasks.ts', 'utf8');
const evidenceCode = fs.readFileSync('game/evidence.ts', 'utf8');

let out = '# 🕵️ HƯỚNG DẪN CHƠI QUA MÀN - HỒ SƠ ĐẢO CHIỀU\n\n';
out += '## 🗺️ 1. Giới thiệu các địa điểm (Nơi nào chứa gì?)\n';
out += '- **Bàn làm việc (Desk):** Nơi chứa Laptop (chứa chat, email, code log, terminal) và Điện thoại (tin nhắn, thông báo).\n';
out += '- **Bảng trắng (Board):** Nơi bạn ghim các bằng chứng (Evidence) thu thập được từ Laptop và Điện thoại.\n';
out += '- **Hồ sơ (Dossier):** Nơi chứa danh sách các chương và Nhiệm vụ (Task). Bạn cần hoàn thành tất cả nhiệm vụ trong một chương để mở khóa chương tiếp theo.\n\n';

out += '## 🎮 2. Cách thức qua chương\n';
out += 'Để hoàn thành một chương, bạn cần mở **Hồ sơ**, chọn các nhiệm vụ đang mở. Mỗi nhiệm vụ sẽ đưa ra một số câu hỏi hoặc yêu cầu.\n';
out += 'Bạn phải **đối chiếu** các manh mối/bằng chứng (bấm nút "Chọn bằng chứng" có hình cái kẹp giấy) để trả lời các câu hỏi đó.\n';
out += 'Lưu ý: Bằng chứng phải đúng với câu hỏi thì mới qua được, nếu chọn sai hoặc trả lời sai, bạn sẽ nhận được gợi ý (hint) hoặc phản biện (counterpoint) để thử lại.\n\n';

out += '## 🧩 3. Đáp án chi tiết các Nhiệm vụ (Spoilers!)\n\n';

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

fs.writeFileSync('WALKTHROUGH.md', out, 'utf8');
console.log('Walkthrough generated.');
