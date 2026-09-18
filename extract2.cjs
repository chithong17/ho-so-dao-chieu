const fs = require('fs');
let tasksCode = fs.readFileSync('game/tasks.ts', 'utf8');

const tasksRegex = /id:\s*['"](T\d+)['"].*?title:\s*['"](.*?)['"].*?questions:\s*\[(.*?)\]\s*(?=\}|,?\s*\{id:)/gs;
let match;
while ((match = tasksRegex.exec(tasksCode)) !== null) {
  const id = match[1];
  const title = match[2];
  const questionsRaw = match[3];
  
  console.log('--- ' + id + ': ' + title + ' ---');
  
  const qRegex = /q\(['"][^'"]+['"]\s*,\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]/g;
  let qMatch;
  while ((qMatch = qRegex.exec(questionsRaw)) !== null) {
    console.log('Q: ' + qMatch[1]);
    console.log('A: ' + qMatch[2]);
  }
}
