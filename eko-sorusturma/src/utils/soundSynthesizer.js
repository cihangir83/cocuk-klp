// Web Audio API ile sentetik ses efektleri
class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API desteklenmiyor:', e);
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Kağıt hışırtısı
  paperRustle() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      data[i] = (Math.random() * 2 - 1) * 0.15 * Math.sin(t * Math.PI) * (1 - t * 0.5);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    filter.Q.value = 0.5;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
  }

  // Daktilo tuş sesi
  typewriterKey() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = 800 + Math.random() * 400;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);

    // Click noise
    const bufferSize = ctx.sampleRate * 0.02;
    const clickBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const clickData = clickBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      clickData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
    }
    const clickSource = ctx.createBufferSource();
    clickSource.buffer = clickBuffer;
    const clickGain = ctx.createGain();
    clickGain.gain.value = 0.15;
    clickSource.connect(clickGain).connect(ctx.destination);
    clickSource.start();
  }

  // İp gerilme sesi
  stringPull() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.4);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }

  // Doğru bağlantı — snap
  stringSnap() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);

    // Metallic ring
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 1200;
    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.1, ctx.currentTime + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc2.connect(gain2).connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.05);
    osc2.stop(ctx.currentTime + 0.3);
  }

  // Yanlış bağlantı — kırılma
  stringBreak() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      data[i] = (Math.random() * 2 - 1) * 0.3 * Math.exp(-t * 5);
      if (t > 0.1 && t < 0.15) data[i] *= 3;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1500;
    const gain = ctx.createGain();
    gain.gain.value = 0.25;
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
  }

  // Damga baskı sesi
  stampInk() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      data[i] = (Math.random() * 2 - 1) * 0.5 * Math.exp(-t * 15);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = 0.3;
    source.connect(gain).connect(ctx.destination);
    source.start();

    // Thud
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
    const thudGain = ctx.createGain();
    thudGain.gain.setValueAtTime(0.3, ctx.currentTime);
    thudGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(thudGain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }

  // Dosya kapanma sesi
  fileClose() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.paperRustle();
    setTimeout(() => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 200;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }, 200);
  }

  // Rozet kazanma
  badgeEarn() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  // Kök neden tespiti — crescendo
  crescendo() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(100, ctx.currentTime);
    osc1.frequency.linearRampToValueAtTime(400, ctx.currentTime + 2);
    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0.01, ctx.currentTime);
    gain1.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1.5);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
    osc1.connect(gain1).connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 2.5);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(50, ctx.currentTime);
    osc2.frequency.linearRampToValueAtTime(200, ctx.currentTime + 2);
    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.01, ctx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    osc2.connect(filter).connect(gain2).connect(ctx.destination);
    osc2.start();
    osc2.stop(ctx.currentTime + 2.5);
  }

  // Kağıt buruşturma
  paperCrumple() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      const crinkle = Math.sin(t * 200) * Math.random();
      data[i] = crinkle * 0.2 * (1 - t);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2500;
    filter.Q.value = 1;
    const gain = ctx.createGain();
    gain.gain.value = 0.25;
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
  }

  // Ambient rüzgar
  startAmbientWind(duration = 999) {
    const ctx = this.ensureContext();
    if (!ctx) return null;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      data[i] = (Math.random() * 2 - 1) * 0.05 * (1 + 0.3 * Math.sin(t * Math.PI * 4));
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    const gain = ctx.createGain();
    gain.gain.value = 0.15;
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
    return { source, gain };
  }
}

const soundSynth = new SoundSynthesizer();
export default soundSynth;
