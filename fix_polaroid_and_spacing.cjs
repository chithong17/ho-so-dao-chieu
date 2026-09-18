const fs = require('fs');

// 1. Fix CSS for inner-content top margin
let css = fs.readFileSync('app/globals.css', 'utf8');
css = css.replace(/top: 15% !important;/, 'top: 18% !important;');
css = css.replace(/height: 72% !important;/, 'height: 69% !important;');
fs.writeFileSync('app/globals.css', css);
console.log('Pushed content down in CSS!');

// 2. Fix TaskPanel.tsx polaroid image
let tsx = fs.readFileSync('components/TaskPanel.tsx', 'utf8');
// Find the broken background style
const brokenBackground = "background: 'url(/scene_desk.jpg) center/cover grayscale(100%) contrast(1.1) brightness(1.2)'";
const fixedStyle = "background: 'url(/bg_room.jpg) center/cover no-repeat', filter: 'grayscale(100%) contrast(1.1) brightness(1.2)'";
tsx = tsx.replace(brokenBackground, fixedStyle);
fs.writeFileSync('components/TaskPanel.tsx', tsx);
console.log('Fixed polaroid image to show bg_room.jpg with proper filter!');
