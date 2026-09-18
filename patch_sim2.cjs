const fs = require('fs');
let code = fs.readFileSync('components/Simulations.tsx', 'utf8');

code = code.replace(
  /<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba\\(0,0,0,0\\.9\\)'/g,
  '<div className="sim-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.9)"'
);

fs.writeFileSync('components/Simulations.tsx', code, 'utf8');
console.log('Patched Simulations.tsx');
