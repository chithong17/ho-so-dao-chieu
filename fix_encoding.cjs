const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css = css.replace(/content: "[^"]*OK[^"]*" !important;/g, 'content: "TÙY CHỌN           OK           QUAY LẠI" !important;');

fs.writeFileSync('app/globals.css', css);
