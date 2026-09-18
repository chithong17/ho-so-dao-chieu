const fs = require('fs');
let content = fs.readFileSync('components/Game.tsx', 'utf8');

if (!content.includes("import PhysicalFiles from './PhysicalFiles';")) {
  content = content.replace(
    'import EscapeRoom from \'./EscapeRoom\';',
    'import EscapeRoom from \'./EscapeRoom\';\nimport PhysicalFiles from \'./PhysicalFiles\';'
  );
}

content = content.replace(
  /\{\(activeObj==='files'\)&&<>\S*?cabinetLibrary\S*?<main className="reader-column" style=\{\{flex:2\}\}><EvidenceReader item=\{selected\}\/><\/main><\/>\}/,
  '{(activeObj===\'files\')&&<PhysicalFiles query={query} setQuery={setQuery} choose={choose} />}'
);

fs.writeFileSync('components/Game.tsx', content);
console.log('Restored PhysicalFiles in Game.tsx!');
