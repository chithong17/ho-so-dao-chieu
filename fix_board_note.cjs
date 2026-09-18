const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

// Replace the old board styling
const oldBoardStyle = `/* UI Board Styling */
.ui-board .reader-column {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  border-radius: 8px;
  box-shadow: inset 0 0 50px rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.5);
  font-family: 'Patrick Hand', cursive, sans-serif;
}
.ui-board .workspace-page h2 {
  color: #2c3e50;
  border-bottom: 2px dashed #ccc;
  padding-bottom: 10px;
}
.ui-board .workspace-page h3 {
  color: #34495e;
}
.ui-board .eyebrow {
  color: #e74c3c;
}
.ui-board .pinned-grid button {
  background: #f1c40f;
  color: #333;
  transform: rotate(-2deg);
  box-shadow: 2px 5px 10px rgba(0,0,0,0.2);
  transition: transform 0.2s;
}
.ui-board .pinned-grid button:hover {
  transform: rotate(0deg) scale(1.05);
}
.ui-board .claim-card {
  background: #fff;
  border: 1px solid #ccc;
  border-left: 5px solid #3498db;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
  color: #333;
}
.ui-board .claim-card button span {
  color: #2980b9;
}
.ui-board .claim-card p {
  color: #555;
}
.ui-board .claim-card blockquote {
  border-left-color: #3498db;
  color: #666;
}`;

const newBoardStyle = `/* UI Board Styling */
.ui-board .reader-column {
  background: transparent;
  color: #f5f5f5;
  font-family: 'Patrick Hand', cursive, sans-serif;
}
.ui-board .workspace-page h2 {
  color: #fff;
  border-bottom: 2px dashed rgba(255,255,255,0.3);
  padding-bottom: 10px;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
}
.ui-board .workspace-page h3 {
  color: #e0e0e0;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
}
.ui-board .eyebrow {
  color: #f1c40f;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
}
.ui-board .pinned-grid button {
  background: #fdf6e3;
  color: #333;
  transform: rotate(-2deg);
  box-shadow: 2px 5px 10px rgba(0,0,0,0.5);
  transition: transform 0.2s;
  padding: 15px;
  border: none;
  position: relative;
  text-align: left;
}
.ui-board .pinned-grid button::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 14px;
  background: #3498db;
  border-radius: 50%;
  box-shadow: -2px 2px 2px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(0,0,0,0.2);
}
.ui-board .pinned-grid button:hover {
  transform: rotate(0deg) scale(1.05);
}
.ui-board .claim-card {
  background: #fff9c4;
  border: none;
  box-shadow: 2px 4px 10px rgba(0,0,0,0.5);
  color: #333;
  padding: 25px 20px 20px;
  position: relative;
  transform: rotate(1.5deg);
  margin-bottom: 20px;
  border-radius: 2px;
}
.ui-board .claim-card::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 14px;
  background: #e74c3c;
  border-radius: 50%;
  box-shadow: -2px 2px 2px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(0,0,0,0.2);
}
.ui-board .claim-card button {
  background: transparent;
  border: none;
  text-align: left;
  padding: 0;
  width: 100%;
}
.ui-board .claim-card button span {
  display: block;
  font-size: 0.9em;
  color: #d35400;
  margin-bottom: 5px;
  font-weight: bold;
}
.ui-board .claim-card button strong {
  display: block;
  font-size: 1.2em;
  color: #2c3e50;
}
.ui-board .claim-card p {
  color: #555;
  margin-top: 10px;
  font-size: 0.95em;
}
.ui-board .claim-card blockquote {
  border-left: 4px solid #f39c12;
  color: #666;
  margin: 10px 0 0;
  padding-left: 10px;
  font-style: italic;
}`;

if (code.includes('/* UI Board Styling */')) {
    code = code.replace(oldBoardStyle, newBoardStyle);
    fs.writeFileSync('app/globals.css', code);
    console.log('Successfully updated board note styling!');
} else {
    console.log('Could not find old board styling.');
}
