const fs = require('fs');
let code = fs.readFileSync('components/Simulations.tsx', 'utf8');

code = code.replace(
  /<div className="sim-overlay" style={{ position: "fixed"/g,
  '<style>{\\\n.sim-overlay * {\\n  color: #0f0 !important;\\n  font-family: monospace !important;\\n  text-shadow: 0 0 5px rgba(0,255,0,0.5) !important;\\n}\\n.sim-overlay hr {\\n  border-color: #0f0 !important;\\n}\\n\}</style><div className="sim-overlay" style={{ position: "fixed"'
);

fs.writeFileSync('components/Simulations.tsx', code, 'utf8');
console.log('Injected inline style');
