let isMuted = false;

// BGM
let bgms: Record<string, HTMLAudioElement> = {};
let currentBgmType: "landing" | "intro" | "investigation" | "verdict" | "none" = "none";

// SFX cache
let sfxs: Record<string, HTMLAudioElement> = {};

const sfxFiles: Record<string, string> = {
  'chapter': '/audio/sfx_chapter.mp3',
  'click': '/audio/sfx_click.mp3',
  'alert': '/audio/sfx_error.mp3',
  'error': '/audio/sfx_error.mp3',
  'folder': '/audio/sfx_folder.mp3',
  'laptop': '/audio/sfx_laptop.mp3',
  'page_turn': '/audio/sfx_page.mp3',
  'phone': '/audio/sfx_phone.mp3',
  'sim_running': '/audio/sfx_sim_running.mp3',
  'stamp': '/audio/sfx_stamp.mp3',
  'success': '/audio/sfx_success.mp3'
};

export function ensureBgmPlaying() {
  if (typeof window === 'undefined') return;
  if (!bgms['intro']) initAudio();
  if (isMuted || currentBgmType === 'none') return;
  const effectiveType = currentBgmType === 'landing' ? 'intro' : currentBgmType;
  const bgm = bgms[effectiveType];
  if (bgm && bgm.paused) {
    bgm.play().catch(()=>{});
  }
}

export function initAudio() {
  if (typeof window === 'undefined') return;
  
  if (!bgms['intro']) {
    bgms['intro'] = new Audio('/audio/bgm_intro.mp3');
    bgms['intro'].loop = true;
    bgms['intro'].volume = 0.4;
  }
  if (!bgms['investigation']) {
    bgms['investigation'] = new Audio('/audio/bgm_investigation.mp3');
    bgms['investigation'].loop = true;
    bgms['investigation'].volume = 0.3;
  }
  if (!bgms['verdict']) {
    bgms['verdict'] = new Audio('/audio/bgm_verdict.mp3');
    bgms['verdict'].loop = true;
    bgms['verdict'].volume = 0.5;
  }
  
  // Preload SFX
  for (const [key, path] of Object.entries(sfxFiles)) {
    if (!sfxs[key]) {
      const a = new Audio(path);
      a.volume = 0.5;
      sfxs[key] = a;
    }
  }

  if (currentBgmType !== 'none' && !isMuted) {
    const effectiveType = currentBgmType === 'landing' ? 'intro' : currentBgmType;
    if (bgms[effectiveType] && bgms[effectiveType].paused) {
      bgms[effectiveType].play().catch(()=>{});
    }
  }
}

export function setMute(muted: boolean) {
  isMuted = muted;
  Object.values(bgms).forEach(a => a.muted = muted);
  Object.values(sfxs).forEach(a => a.muted = muted);
  if (!muted) {
    ensureBgmPlaying();
  }
}

export function getMute() {
  return isMuted;
}

export function playBgm(type: 'landing' | 'intro' | 'investigation' | 'verdict' | 'none') {
  if (typeof window !== 'undefined' && !bgms['intro']) {
    initAudio();
  }
  currentBgmType = type;
  if (isMuted) return;
  
  Object.entries(bgms).forEach(([key, audio]) => {
    // Treat landing as intro since user didn't upload landing
    const effectiveType = type === 'landing' ? 'intro' : type;
    if (key === effectiveType) {
      const p = audio.play();
      if (p && typeof p.catch === 'function') {
        p.catch(e => console.warn('BGM play prevented', e));
      }
    } else {
      audio.pause();
    }
  });
}

// Global synth fallback for missing SFX
let audioCtx: AudioContext | null = null;
function playSynthSfx(type: string) {
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  
  if (type === 'hover') {
      osc.type = 'triangle'; osc.frequency.setValueAtTime(400, t);
      gain.gain.setValueAtTime(0.01, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
      osc.start(t); osc.stop(t + 0.02);
  } else if (type === 'pin') {
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.05);
      gain.gain.setValueAtTime(0.2, t); gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
      osc.start(t); osc.stop(t + 0.05);
  }
}

export function playSfx(type: string) {
  if (typeof window !== 'undefined' && Object.keys(sfxs).length === 0) {
    initAudio();
  }
  if (isMuted) return;
  
  if (sfxs[type]) {
    sfxs[type].currentTime = 0;
    const p = sfxs[type].play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {});
    }
  } else {
    playSynthSfx(type);
  }
}
