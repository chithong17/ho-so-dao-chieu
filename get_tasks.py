import re
with open('game/tasks.ts', 'r', encoding='utf-8') as f:
    text = f.read()
tasks = re.findall(r"id:\s*['\"](T\d+)['\"].*?chapter:\s*(\d+).*?title:\s*['\"](.*?)['\"].*?evidence:\s*\[(.*?)\]", text, re.DOTALL | re.IGNORECASE)
for t in tasks:
    evidences = [e.strip(' \'\"') for e in t[3].split(',')]
    print(f"{t[0]} (Ch {t[1]}) - {t[2]} -> Evidence: {evidences}")
