import re
with open('game/evidence.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(
    r'body:\s*\[\s*[\''\"].*?Nếu yêu cầu.*?[\''\"]\s*\]',
    'body: [\'"Nếu yêu cầu cứ thay đổi mà không báo thế này, tôi không làm tiếp nữa..."\']',
    text
)

with open('game/evidence.ts', 'w', encoding='utf-8') as f:
    f.write(text)
print('Done!')
