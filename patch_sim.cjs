const fs = require('fs');
let code = fs.readFileSync('components/Simulations.tsx', 'utf8');
code = code.replace(
  /<div style={{ position: 'fixed'/g,
  '<div className="sim-overlay" style={{ position: "fixed"'
);
fs.writeFileSync('components/Simulations.tsx', code, 'utf8');
console.log('Patched Simulations.tsx');
