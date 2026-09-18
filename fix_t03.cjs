const fs = require('fs');
let text = fs.readFileSync('components/TaskPanel.tsx', 'utf8');
text = text.replace(
  'label="VA sao ch?n tr?ng tAm y?"',
  'label="Nguyên tắc ưu tiên giải quyết sự cố lúc này là gì?"'
);
text = text.replace(
  'label="Vì sao chọn trọng tâm ấy?"',
  'label="Nguyên tắc ưu tiên giải quyết sự cố lúc này là gì?"'
);
fs.writeFileSync('components/TaskPanel.tsx', text, 'utf8');
