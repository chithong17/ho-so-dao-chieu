const fs = require('fs');
let text = fs.readFileSync('game/evidence.ts', 'utf8');

const oldStr = '\"Nếu yêu cầu cứ thay đổi mà không báo cho phần giao diện thì mình không thể tiếp tục làm như cũ.\"';
const newStr = '\"Nếu yêu cầu cứ thay đổi mà không báo thế này, tôi không làm tiếp nữa...\"';

text = text.replace(oldStr, newStr);

fs.writeFileSync('game/evidence.ts', text, 'utf8');
console.log('Replaced via simple string');
