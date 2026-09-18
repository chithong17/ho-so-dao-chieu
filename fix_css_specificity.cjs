const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css = css.replace(
  'dialog.ui-phone, dialog.ui-laptop, dialog.ui-notebook {',
  '.modal-overlay.point-and-click dialog.ui-phone, .modal-overlay.point-and-click dialog.ui-laptop, .modal-overlay.point-and-click dialog.ui-notebook {'
);
css = css.replace(
  'dialog.ui-phone { background: url(\'/ui_phone.jpg\') center/cover no-repeat !important; }',
  '.modal-overlay.point-and-click dialog.ui-phone { background: url(\'/ui_phone.jpg\') center/cover no-repeat !important; }'
);
css = css.replace(
  'dialog.ui-laptop { background: url(\'/ui_laptop.jpg\') center/cover no-repeat !important; }',
  '.modal-overlay.point-and-click dialog.ui-laptop { background: url(\'/ui_laptop.jpg\') center/cover no-repeat !important; }'
);
css = css.replace(
  'dialog.ui-notebook { background: url(\'/ui_notebook.jpg\') center/cover no-repeat !important; }',
  '.modal-overlay.point-and-click dialog.ui-notebook { background: url(\'/ui_notebook.jpg\') center/cover no-repeat !important; }'
);

fs.writeFileSync('app/globals.css', css);
