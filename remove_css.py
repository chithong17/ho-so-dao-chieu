import re

with open('app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove the section starting from '/* T? ch?ng c?: ...' down to the start of '/* B?ng l?p lu?n'
# It's better to just use string splitting if it's exact.
start_marker = "/* T? ch?ng c?: m?t không gian riêng, tách kh?i di?n tho?i và máy tính. */"
end_marker = "/* B?ng l?p lu?n: phi?u di?u tra ghim lên n?n cork, không ph?i th? web n?n tr?ng. */"

if start_marker in css and end_marker in css:
    start_idx = css.find(start_marker)
    end_idx = css.find(end_marker)
    
    new_css = css[:start_idx] + css[end_idx:]
    with open('app/globals.css', 'w', encoding='utf-8') as f:
        f.write(new_css)
    print('Removed ui-files from globals.css!')
else:
    print('Markers not found!')
