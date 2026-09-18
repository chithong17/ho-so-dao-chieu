const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

// Replace the bounds in the MOCKUP FIX block
css = css.replace(/top:\s*[\d\.]+% !important;\s*left:\s*[\d\.]+% !important;\s*right:\s*[\d\.]+% !important;\s*bottom:\s*[\d\.]+% !important;/g, 
  "top: 10.5% !important;\n  left: 35.5% !important;\n  right: 35% !important;\n  bottom: 21% !important;");

// Hide the soft keys text globally
css += `\n/* Hide old phone soft keys text */\n.modal-overlay.point-and-click dialog.ui-phone .inner-content::after { display: none !important; }\n`;

fs.writeFileSync('app/globals.css', css);
console.log('Fixed CSS bounds and hidden soft keys!');
