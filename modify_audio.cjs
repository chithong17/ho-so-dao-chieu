const fs = require('fs');
let content = fs.readFileSync('lib/audio.ts', 'utf8');

content = content.replace(
  'let bgmInvestigate: HTMLAudioElement | null = null;',
  'let bgmInvestigate: HTMLAudioElement | null = null;\nlet currentBgmType: "intro" | "investigation" | "none" = "none";\n\nexport function ensureBgmPlaying() {\n  if (isMuted) return;\n  if (currentBgmType === "intro" && bgmIntro && bgmIntro.paused) bgmIntro.play().catch(()=>{});\n  if (currentBgmType === "investigation" && bgmInvestigate && bgmInvestigate.paused) bgmInvestigate.play().catch(()=>{});\n}'
);

content = content.replace(
  'export function playBgm(type: \'intro\' | \'investigation\' | \'none\') {',
  'export function playBgm(type: \'intro\' | \'investigation\' | \'none\') {\n  currentBgmType = type;'
);

fs.writeFileSync('lib/audio.ts', content);
console.log('Modified lib/audio.ts successfully!');

let gameContent = fs.readFileSync('components/Game.tsx', 'utf8');
gameContent = gameContent.replace(
  'import { initAudio, playBgm, playSfx, getMute, setMute }',
  'import { initAudio, playBgm, playSfx, getMute, setMute, ensureBgmPlaying }'
);
gameContent = gameContent.replace(
  'playSfx(sfxTarget.getAttribute("data-sfx"));',
  'ensureBgmPlaying();\n          playSfx(sfxTarget.getAttribute("data-sfx"));'
);
gameContent = gameContent.replace(
  'playSfx("click");',
  'ensureBgmPlaying();\n          playSfx("click");'
);

fs.writeFileSync('components/Game.tsx', gameContent);
console.log('Modified Game.tsx successfully to ensure BGM!');
