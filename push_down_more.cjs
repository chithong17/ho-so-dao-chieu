const fs = require('fs');

let css = fs.readFileSync('app/globals.css', 'utf8');
css = css.replace(/top: 18% !important;/g, 'top: 21% !important;');
css = css.replace(/height: 69% !important;/g, 'height: 66% !important;');
fs.writeFileSync('app/globals.css', css);
console.log('Pushed content down further!');
