const fs = require('fs');
let tasksCode = fs.readFileSync('game/tasks.ts', 'utf8');

const tasksRegex = /id:\s*['"](T\d+)['"].*?kind:\s*['"](.*?)['"].*?title:\s*['"](.*?)['"]/g;
let match;
while ((match = tasksRegex.exec(tasksCode)) !== null) {
  console.log(match[1] + ' | ' + match[2] + ' | ' + match[3]);
}
