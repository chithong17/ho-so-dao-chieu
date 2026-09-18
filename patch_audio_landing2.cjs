const fs = require('fs');
let text = fs.readFileSync('lib/audio.ts', 'utf8');

text = text.replace(
  'let bgmIntro: HTMLAudioElement | null = null;',
  'let bgmIntro: HTMLAudioElement | null = null;\nlet bgmLanding: HTMLAudioElement | null = null;'
);

text = text.replace(
  'let currentBgmType: "intro" | "investigation" | "none" = "none";',
  'let currentBgmType: "landing" | "intro" | "investigation" | "none" = "none";'
);

text = text.replace(
  'if (currentBgmType === "intro" && bgmIntro && bgmIntro.paused) bgmIntro.play().catch(()=>{});',
  'if (currentBgmType === "intro" && bgmIntro && bgmIntro.paused) bgmIntro.play().catch(()=>{});\n  if (currentBgmType === "landing" && bgmLanding && bgmLanding.paused) bgmLanding.play().catch(()=>{});'
);

const init_idx = text.indexOf('if (!bgmIntro) {');
text = text.slice(0, init_idx) + "if (!bgmLanding) {\n    bgmLanding = new Audio('/audio/bgm_landing.mp3');\n    bgmLanding.loop = true;\n    bgmLanding.volume = 0.4;\n  }\n  " + text.slice(init_idx);

text = text.replace(
  'if (bgmIntro) bgmIntro.muted = muted;',
  'if (bgmIntro) bgmIntro.muted = muted;\n  if (bgmLanding) bgmLanding.muted = muted;'
);

text = text.replace(
  "export function playBgm(type: 'intro' | 'investigation' | 'none') {",
  "export function playBgm(type: 'landing' | 'intro' | 'investigation' | 'none') {"
);

text = text.replace(
  'if (isMuted || !bgmIntro || !bgmInvestigate) return;',
  'if (isMuted || !bgmIntro || !bgmInvestigate || !bgmLanding) return;'
);

text = text.replace(
  "if (type === 'intro') {",
  "if (type === 'landing') {\n    bgmIntro.pause();\n    bgmInvestigate.pause();\n    bgmLanding.play().catch(e => console.warn('BGM play prevented', e));\n  } else if (type === 'intro') {\n    bgmLanding.pause();"
);

text = text.replace(
  "} else if (type === 'investigation') {",
  "} else if (type === 'investigation') {\n    bgmLanding.pause();"
);

text = text.replace(
  "} else {\n    bgmIntro.pause();\n    bgmInvestigate.pause();\n  }",
  "} else {\n    bgmIntro.pause();\n    bgmInvestigate.pause();\n    bgmLanding.pause();\n  }"
);

fs.writeFileSync('lib/audio.ts', text, 'utf8');
console.log('Patched lib/audio.ts');
