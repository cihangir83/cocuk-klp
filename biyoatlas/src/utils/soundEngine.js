// Programatik ses motoru — Web Audio API
// Harici ses dosyasına gerek yok, tüm sesler kod ile üretilir

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(frequency, duration, type = 'sine', volume = 0.15, decay = true) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);

    if (decay) {
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Silently fail if audio is not available
  }
}

function playNoise(duration, volume = 0.05) {
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {}
}

export const SoundEngine = {
  // UI sounds
  uiHover() {
    playTone(2000, 0.05, 'sine', 0.03);
  },

  uiClick() {
    playTone(800, 0.1, 'sine', 0.1);
    setTimeout(() => playTone(1200, 0.08, 'sine', 0.08), 30);
  },

  // Card sounds
  cardFlip() {
    playNoise(0.15, 0.08);
    playTone(400, 0.15, 'sine', 0.05);
  },

  // Discovery
  discovery() {
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((note, i) => {
      setTimeout(() => playTone(note, 0.4, 'sine', 0.12), i * 120);
    });
  },

  // Correct analogy
  correct() {
    playTone(523, 0.15, 'sine', 0.15);
    setTimeout(() => playTone(659, 0.15, 'sine', 0.15), 100);
    setTimeout(() => playTone(784, 0.3, 'sine', 0.15), 200);
  },

  // Wrong analogy
  wrong() {
    playTone(200, 0.15, 'sawtooth', 0.08);
    setTimeout(() => playTone(180, 0.2, 'sawtooth', 0.06), 100);
  },

  // Rare drop
  rareDrop() {
    const notes = [392, 494, 587, 659, 784]; // G4, B4, D5, E5, G5
    notes.forEach((note, i) => {
      setTimeout(() => playTone(note, 0.5, 'sine', 0.15), i * 150);
    });
    setTimeout(() => playTone(1047, 0.8, 'triangle', 0.1), 800);
  },

  // Ultra rare drop
  ultraDrop() {
    const notes = [262, 330, 392, 523, 659, 784, 1047];
    notes.forEach((note, i) => {
      setTimeout(() => {
        playTone(note, 0.6, 'sine', 0.12);
        playTone(note * 1.5, 0.4, 'triangle', 0.06);
      }, i * 120);
    });
    setTimeout(() => {
      playTone(1047, 1.0, 'sine', 0.15);
      playTone(1568, 0.8, 'triangle', 0.08);
    }, 900);
  },

  // Streak up
  streakUp() {
    playTone(600, 0.1, 'square', 0.06);
    setTimeout(() => playTone(800, 0.1, 'square', 0.06), 80);
    setTimeout(() => playTone(1000, 0.15, 'square', 0.08), 160);
  },

  // Streak break
  streakBreak() {
    playTone(400, 0.3, 'sawtooth', 0.06);
    setTimeout(() => playTone(300, 0.4, 'sawtooth', 0.04), 150);
  },

  // Badge earn
  badgeEarn() {
    const notes = [523, 659, 784, 1047, 1319];
    notes.forEach((note, i) => {
      setTimeout(() => playTone(note, 0.3, 'sine', 0.12), i * 100);
    });
  },

  // Page turn
  pageTurn() {
    playNoise(0.2, 0.06);
  },

  // Drag start
  dragStart() {
    playTone(300, 0.08, 'sine', 0.06);
  },

  // Drop
  drop() {
    playTone(150, 0.12, 'triangle', 0.1);
    playNoise(0.08, 0.04);
  }
};

export default SoundEngine;
