const fs = require('fs');
const content = fs.readFileSync('game/evidence.ts', 'utf8');
const regex = /id:\s*['"](E\d+)['"].*?app:\s*['"](.*?)['"]/gs;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(match[1] + ' | app: ' + match[2]);
}
