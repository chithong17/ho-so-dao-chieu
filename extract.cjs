const fs = require('fs');
const content = fs.readFileSync('game/evidence.ts', 'utf8');

const regex = /id:\s*['"](E\d+)['"].*?title:\s*['"](.*?)['"].*?app:\s*['"](.*?)['"]/gs;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(match[1] + ' | ' + match[3] + ' | ' + match[2]);
}
