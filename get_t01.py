import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
with open('game/tasks.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Just print the first 100 lines of tasks.ts to see T01 and T02 structure
for line in text.splitlines()[:100]:
    print(line)
