with open('components/TaskPanel.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    'label="Vì sao ch?n tr?ng tâm ?y?"',
    'label="Nguyên t?c uu tiên gi?i quy?t s? c? lúc này là gì?"'
)

with open('components/TaskPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
print('Fixed T03 question text')
