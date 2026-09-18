const fs = require('fs');
let code = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

// Just remove all literal \n strings if they got inserted!
code = code.replace(/\\n\s*setScene/g, ' setScene');
code = code.replace(/\\\\n\s*setScene/g, ' setScene');
code = code.replace(/\\n/g, ' '); // Clean up any lingering literal \n

fs.writeFileSync('components/EscapeRoom.tsx', code, 'utf8');
console.log('Fixed intro');
