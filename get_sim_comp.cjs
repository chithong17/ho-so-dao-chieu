const fs = require('fs');
const text = fs.readFileSync('components/Simulations.tsx', 'utf8');
console.log(text.substring(0, 1500));
