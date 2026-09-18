import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
with open('game/tasks.ts', 'r', encoding='utf-8') as f:
    text = f.read()

idx1 = text.find('export const chainOptions')
if idx1 != -1:
    print(text[idx1:idx1+300])

idx2 = text.find('export const relationOptions')
if idx2 != -1:
    print(text[idx2:idx2+500])
