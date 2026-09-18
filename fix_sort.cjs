const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const fix = \
  .modal-overlay.point-and-click dialog.ui-notebook .sort-stack li {
    background: transparent !important;
    border: 1px dashed rgba(26, 20, 15, 0.4) !important;
    color: #1a140f !important;
  }
  .modal-overlay.point-and-click dialog.ui-notebook .sort-controls button {
    background: rgba(246, 225, 178, 0.4) !important;
    color: #1a140f !important;
  }
  .modal-overlay.point-and-click dialog.ui-notebook .sort-controls button:disabled {
    opacity: 0.3 !important;
  }
\;

css = css.replace(
  '/* 10. Submit button */',
  fix + '\\n  /* 10. Submit button */'
);

fs.writeFileSync('app/globals.css', css);
console.log('Fixed globals.css');
