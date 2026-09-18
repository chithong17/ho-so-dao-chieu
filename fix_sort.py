with open('app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

with open('css_patch.txt', 'r', encoding='utf-8') as f:
    patch = f.read()

css = css.replace('/* 10. Submit button */', patch + '\n  /* 10. Submit button */')

with open('app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Fixed global.css')
