const fs = require('fs');
const css = fs.readFileSync('app/globals.css', 'utf8');

const newCSS = `

/* OVERRIDE SIMULATION STYLES FOR NOTEBOOK */
.simulation {
  background: rgba(0, 0, 0, 0.05) !important;
  border: 1px dashed rgba(0, 0, 0, 0.3) !important;
  color: #384247 !important;
}

.sim-title {
  color: #5a4a35 !important;
  font-weight: bold;
}

.sim-code {
  background: rgba(255, 255, 255, 0.5) !important;
  color: #d32f2f !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
}

.sim-buttons button {
  background: rgba(255, 255, 255, 0.5) !important;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
  color: #384247 !important;
}

.sim-buttons .selected {
  background: #384247 !important;
  color: #fff !important;
  border-color: #384247 !important;
}

.sim-result.good {
  background: rgba(76, 175, 80, 0.1) !important;
  border-color: rgba(76, 175, 80, 0.5) !important;
  color: #2e7d32 !important;
}

.sim-result.bad {
  background: rgba(244, 67, 54, 0.1) !important;
  border-color: rgba(244, 67, 54, 0.5) !important;
  color: #c62828 !important;
}

.sim-note {
  color: #6a756e !important;
}

.flow-node {
  background: rgba(0, 0, 0, 0.05) !important;
  border-color: rgba(0, 0, 0, 0.2) !important;
}

.flow-node b {
  color: #384247 !important;
}

.flow-node small {
  color: #6a756e !important;
}

.flow-diagram > span {
  color: #6a756e !important;
}

.time-budget strong {
  color: #384247 !important;
}

.time-budget strong span {
  color: #6a756e !important;
}

.time-budget > div {
  background: rgba(0, 0, 0, 0.1) !important;
}
`;

fs.writeFileSync('app/globals.css', css + newCSS, 'utf8');
console.log('Fixed simulation CSS');
