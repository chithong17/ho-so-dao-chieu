const fs = require('fs');
let text = fs.readFileSync('game/evidence.ts', 'utf8');

text = text.replace(
  /N.u y.u c.u c. thay d.i m. không báo cho ph.n giao di.n th. mình không th. ti.p t.c làm nh. cu.*?/g,
  'N?u yêu c?u c? thay d?i mà không báo th? này, tôi không làm ti?p n?a.'
);

// wait I can just replace the whole body array for E01
text = text.replace(
  /body:\s*\[\s*['"](.*?)['"]\s*\]/g,
  (match, p1) => {
    if (p1.includes('N?u yêu c?u')) {
      return \ody: ['"N?u yêu c?u c? thay d?i mà không báo th? này, tôi không làm ti?p n?a..."']\;
    }
    return match;
  }
);

fs.writeFileSync('game/evidence.ts', text, 'utf8');
console.log('Fixed dialogue 2');
