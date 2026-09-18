with open('components/PhysicalFiles.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

mapping = '''
  const evidenceSources: Record<string, string> = {
    E01:'phone',E02:'files',E03:'laptop',E04:'laptop',E05:'laptop',E06:'laptop',E07:'phone',E08:'files',E09:'files',E10:'files',
    E11:'board',E12:'board',E13:'phone',E14:'board',E15:'board',E16:'board',E17:'phone'
  };
'''

content = content.replace(
    "const fileEvidence = evidence.filter(e => e.app === 'files' && e.chapter <= state.unlocked);",
    mapping + "\n  const fileEvidence = evidence.filter(e => evidenceSources[e.id] === 'files' && e.chapter <= state.unlocked);"
)

with open('components/PhysicalFiles.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed')
