// Web Audio API Realistic Foley Studio & Sound Synthesizer
// Physical acoustic modeling: metallic resonance, aerodynamic turbulence,
// human vocal tract acoustics, Helmholtz cavitation, and room ambience.

class SoundEffectsService {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.noiseBuffer = null;
    this.reverbNode = null;
    this.reverbGain = null;
    this.lastSoundTimes = {};
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initReverb();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initReverb() {
    if (this.reverbNode || !this.ctx) return;
    try {
      const rate = this.ctx.sampleRate;
      const length = Math.floor(rate * 0.40); // 400ms cozy room response
      const impulse = this.ctx.createBuffer(2, length, rate);
      const left = impulse.getChannelData(0);
      const right = impulse.getChannelData(1);
      const decay = 2.6;
      for (let i = 0; i < length; i++) {
        const t = i / length;
        const env = Math.exp(-t * decay);
        left[i] = (Math.random() * 2 - 1) * env;
        right[i] = (Math.random() * 2 - 1) * env;
      }
      this.reverbNode = this.ctx.createConvolver();
      this.reverbNode.buffer = impulse;
      this.reverbGain = this.ctx.createGain();
      this.reverbGain.gain.value = 0.16; // subtle spatial room depth
      this.reverbNode.connect(this.reverbGain);
      this.reverbGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Reverb init warning", e);
    }
  }

  getNoiseBuffer(seconds = 0.8) {
    if (!this.ctx) return null;
    if (this.noiseBuffer && this.noiseBuffer.duration >= seconds) {
      return this.noiseBuffer;
    }
    const rate = this.ctx.sampleRate;
    const length = Math.floor(rate * Math.max(1.0, seconds));
    const buffer = this.ctx.createBuffer(1, length, rate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      // Organic pink/brown noise approximation
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2 + white * 0.5362) * 0.18;
    }
    this.noiseBuffer = buffer;
    return buffer;
  }

  shouldDebounce(key, intervalMs = 280) {
    const now = Date.now();
    const last = this.lastSoundTimes[key] || 0;
    if (now - last < intervalMs) return true;
    this.lastSoundTimes[key] = now;
    return false;
  }

  setMuted(muted) {
    this.isMuted = muted;
  }

  // Realistic Helmholtz cavitation pop (cork / soap bubble / water drop)
  playPop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    if (this.shouldDebounce('pop', 180)) return;

    const now = this.ctx.currentTime;

    // 1. Initial membrane rupture transient (1.5ms burst)
    const noiseBuf = this.getNoiseBuffer(0.1);
    if (noiseBuf) {
      const snap = this.ctx.createBufferSource();
      snap.buffer = noiseBuf;
      const sFilter = this.ctx.createBiquadFilter();
      sFilter.type = 'highpass';
      sFilter.frequency.setValueAtTime(3200, now);
      const sGain = this.ctx.createGain();
      sGain.gain.setValueAtTime(0.24, now);
      sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
      snap.connect(sFilter);
      sFilter.connect(sGain);
      sGain.connect(this.ctx.destination);
      snap.start(now);
      snap.stop(now + 0.015);
    }

    // 2. Cavitation Helmholtz downward frequency dive (940Hz -> 175Hz in 42ms)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(940, now);
    osc.frequency.exponentialRampToValueAtTime(175, now + 0.042);

    gain.gain.setValueAtTime(0.40, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.052);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    if (this.reverbNode) gain.connect(this.reverbNode);
    osc.start(now);
    osc.stop(now + 0.055);

    // 3. Hollow wooden/bubble cavity body resonance (130Hz decay)
    const body = this.ctx.createOscillator();
    const bGain = this.ctx.createGain();
    body.type = 'triangle';
    body.frequency.setValueAtTime(135, now);
    body.frequency.exponentialRampToValueAtTime(85, now + 0.07);
    bGain.gain.setValueAtTime(0.25, now);
    bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
    body.connect(bGain);
    bGain.connect(this.ctx.destination);
    body.start(now);
    body.stop(now + 0.08);
  }

  // Realistic storybook paper page flip rustle
  playPageFlip() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    if (this.shouldDebounce('pageflip', 220)) return;

    const now = this.ctx.currentTime;
    const noiseBuf = this.getNoiseBuffer(0.2);
    if (!noiseBuf) return;

    // Filtered paper friction sweep
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuf;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(2600, now + 0.06);
    filter.frequency.exponentialRampToValueAtTime(800, now + 0.14);
    filter.Q.value = 1.4;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.24, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    if (this.reverbNode) gain.connect(this.reverbNode);

    noise.start(now);
    noise.stop(now + 0.16);
  }

  // Shimmering celestial magic sparkle
  playSparkle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    if (this.shouldDebounce('sparkle', 250)) return;

    const freqs = [1046.5, 1318.5, 1567.98, 2093.0]; // C6, E6, G6, C7
    const now = this.ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.22, now + idx * 0.07 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.32);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      if (this.reverbNode) gain.connect(this.reverbNode);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.35);
    });
  }

  playRocketWhoosh() {
    this.playWhoosh();
    setTimeout(() => this.playSparkle(), 380);
  }

  // Realistic Golden Key Clink / Metal Strike
  // Euler-Bernoulli physical bar modes + metal impact transient + micro-bounce jingle
  playClink() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    if (this.shouldDebounce('clink', 280)) return;

    const now = this.ctx.currentTime;

    // 1. Metal contact impact transient (3ms high-passed friction burst)
    const noiseBuf = this.getNoiseBuffer(0.1);
    if (noiseBuf) {
      const noiseSrc = this.ctx.createBufferSource();
      noiseSrc.buffer = noiseBuf;
      const nFilter = this.ctx.createBiquadFilter();
      nFilter.type = 'highpass';
      nFilter.frequency.setValueAtTime(4500, now);
      const nGain = this.ctx.createGain();
      nGain.gain.setValueAtTime(0.26, now);
      nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.024);
      noiseSrc.connect(nFilter);
      nFilter.connect(nGain);
      nGain.connect(this.ctx.destination);
      if (this.reverbNode) nGain.connect(this.reverbNode);
      noiseSrc.start(now);
      noiseSrc.stop(now + 0.028);
    }

    // 2. Physical Euler-Bernoulli brass bar vibrational modes (1860Hz fundamental)
    const f0 = 1860;
    const modes = [
      { freq: f0, gain: 0.36, dur: 0.55 },        // Golden fundamental chime
      { freq: f0 * 1.58, gain: 0.26, dur: 0.38 }, // Inharmonic bar mode 2
      { freq: f0 * 2.41, gain: 0.18, dur: 0.24 }, // Inharmonic bar mode 3
      { freq: f0 * 3.28, gain: 0.11, dur: 0.14 }  // High shimmer mode 4
    ];

    modes.forEach(({ freq, gain, dur }) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(gain, now + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc.connect(g);
      g.connect(this.ctx.destination);
      if (this.reverbNode) g.connect(this.reverbNode);

      osc.start(now);
      osc.stop(now + dur + 0.05);
    });

    // 3. Secondary micro-bounce jingle (28ms later, 35% amplitude)
    const t2 = now + 0.032;
    [f0 * 1.08, f0 * 1.72].forEach((freq, idx) => {
      const osc2 = this.ctx.createOscillator();
      const g2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq, t2);

      g2.gain.setValueAtTime(0, t2);
      g2.gain.linearRampToValueAtTime(idx === 0 ? 0.15 : 0.08, t2 + 0.002);
      g2.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.30);

      osc2.connect(g2);
      g2.connect(this.ctx.destination);
      if (this.reverbNode) g2.connect(this.reverbNode);

      osc2.start(t2);
      osc2.stop(t2 + 0.32);
    });
  }

  // Realistic Organic Character Sneeze ("ACHOO!")
  // Breathy inhale + dramatic glottal stop + vocal tract formant sneeze + explosive nasal air blast
  playAchoo() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    if (this.shouldDebounce('achoo', 350)) return;

    const now = this.ctx.currentTime;
    const noiseBuf = this.getNoiseBuffer(0.8);

    // Phase 1: Inhale "Ahhh..." (0.00s to 0.14s)
    if (noiseBuf) {
      const inhaleNoise = this.ctx.createBufferSource();
      inhaleNoise.buffer = noiseBuf;
      const inFilter = this.ctx.createBiquadFilter();
      inFilter.type = 'bandpass';
      inFilter.frequency.setValueAtTime(360, now);
      inFilter.frequency.exponentialRampToValueAtTime(760, now + 0.14);
      inFilter.Q.value = 2.0;

      const inGain = this.ctx.createGain();
      inGain.gain.setValueAtTime(0.01, now);
      inGain.gain.linearRampToValueAtTime(0.18, now + 0.12);
      inGain.gain.linearRampToValueAtTime(0.001, now + 0.14);

      inhaleNoise.connect(inFilter);
      inFilter.connect(inGain);
      inGain.connect(this.ctx.destination);
      inhaleNoise.start(now);
      inhaleNoise.stop(now + 0.15);
    }

    // Inhale vocal cord tone
    const oscIn = this.ctx.createOscillator();
    const gainIn = this.ctx.createGain();
    oscIn.type = 'triangle';
    oscIn.frequency.setValueAtTime(330, now);
    oscIn.frequency.exponentialRampToValueAtTime(530, now + 0.13);
    gainIn.gain.setValueAtTime(0.02, now);
    gainIn.gain.linearRampToValueAtTime(0.15, now + 0.11);
    gainIn.gain.linearRampToValueAtTime(0.001, now + 0.14);
    oscIn.connect(gainIn);
    gainIn.connect(this.ctx.destination);
    oscIn.start(now);
    oscIn.stop(now + 0.15);

    // Phase 2: 50ms dramatic breath-catch silence (0.14s to 0.19s)

    // Phase 3: Explosive Release "-CHOO!" (0.19s to 0.45s)
    const tSneeze = now + 0.19;

    // 3a. Chest compression glottal pop (160Hz thump)
    const oscPop = this.ctx.createOscillator();
    const gainPop = this.ctx.createGain();
    oscPop.type = 'sine';
    oscPop.frequency.setValueAtTime(220, tSneeze);
    oscPop.frequency.exponentialRampToValueAtTime(80, tSneeze + 0.08);
    gainPop.gain.setValueAtTime(0.34, tSneeze);
    gainPop.gain.exponentialRampToValueAtTime(0.001, tSneeze + 0.09);
    oscPop.connect(gainPop);
    gainPop.connect(this.ctx.destination);
    oscPop.start(tSneeze);
    oscPop.stop(tSneeze + 0.10);

    // 3b. Vocal tract formant sneeze burst (F1: 720Hz, F2: 1350Hz, F3: 2850Hz)
    const formants = [
      { freq: 720, q: 3.5, gain: 0.32, dur: 0.22 },
      { freq: 1350, q: 4.0, gain: 0.28, dur: 0.20 },
      { freq: 2850, q: 5.0, gain: 0.18, dur: 0.16 }
    ];
    formants.forEach(({ freq, q, gain, dur }) => {
      const oscFormant = this.ctx.createOscillator();
      const bp = this.ctx.createBiquadFilter();
      const gFormant = this.ctx.createGain();

      oscFormant.type = 'sawtooth';
      oscFormant.frequency.setValueAtTime(440, tSneeze);
      oscFormant.frequency.exponentialRampToValueAtTime(180, tSneeze + dur);

      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(freq, tSneeze);
      bp.Q.value = q;

      gFormant.gain.setValueAtTime(0, tSneeze);
      gFormant.gain.linearRampToValueAtTime(gain, tSneeze + 0.006);
      gFormant.gain.exponentialRampToValueAtTime(0.001, tSneeze + dur);

      oscFormant.connect(bp);
      bp.connect(gFormant);
      gFormant.connect(this.ctx.destination);
      if (this.reverbNode) gFormant.connect(this.reverbNode);

      oscFormant.start(tSneeze);
      oscFormant.stop(tSneeze + dur + 0.02);
    });

    // 3c. Explosive nasal air blast (high-passed noise)
    if (noiseBuf) {
      const blastNoise = this.ctx.createBufferSource();
      blastNoise.buffer = noiseBuf;
      const blastFilter = this.ctx.createBiquadFilter();
      blastFilter.type = 'highpass';
      blastFilter.frequency.setValueAtTime(1900, tSneeze);
      const blastGain = this.ctx.createGain();
      blastGain.gain.setValueAtTime(0.36, tSneeze);
      blastGain.gain.exponentialRampToValueAtTime(0.001, tSneeze + 0.18);

      blastNoise.connect(blastFilter);
      blastFilter.connect(blastGain);
      blastGain.connect(this.ctx.destination);
      if (this.reverbNode) blastGain.connect(this.reverbNode);

      blastNoise.start(tSneeze);
      blastNoise.stop(tSneeze + 0.20);
    }
  }

  // Realistic Aerodynamic Air Rush ("WHOOSH!" / Dash / Rocket)
  // Turbulent pink noise Doppler sweep + air mass displacement sub-bass thump
  playWhoosh() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    if (this.shouldDebounce('whoosh', 280)) return;

    const now = this.ctx.currentTime;
    const dur = 0.44;

    // 1. Aerodynamic turbulent pink noise Doppler sweep
    const noiseBuf = this.getNoiseBuffer(0.8);
    if (noiseBuf) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuf;

      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(220, now);
      bp.frequency.exponentialRampToValueAtTime(2100, now + 0.15); // closest approach
      bp.frequency.exponentialRampToValueAtTime(260, now + dur);   // Doppler tail
      bp.Q.value = 2.4;

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.01, now);
      g.gain.linearRampToValueAtTime(0.38, now + 0.14);
      g.gain.exponentialRampToValueAtTime(0.001, now + dur);

      noise.connect(bp);
      bp.connect(g);
      g.connect(this.ctx.destination);
      if (this.reverbNode) g.connect(this.reverbNode);

      noise.start(now);
      noise.stop(now + dur + 0.02);
    }

    // 2. Physical air mass displacement sub-bass thump (85Hz -> 38Hz)
    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(85, now + 0.04);
    sub.frequency.exponentialRampToValueAtTime(38, now + 0.22);

    subGain.gain.setValueAtTime(0.01, now);
    subGain.gain.linearRampToValueAtTime(0.32, now + 0.12);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

    sub.connect(subGain);
    subGain.connect(this.ctx.destination);
    sub.start(now + 0.04);
    sub.stop(now + 0.28);
  }

  // Realistic Antique Lock / Latch Click
  // Key tumbler friction scrape + spring pin pings + heavy bolt drop thump
  playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    if (this.shouldDebounce('click', 250)) return;

    const now = this.ctx.currentTime;

    // 1. Key blade friction scrape (0ms to 16ms)
    const noiseBuf = this.getNoiseBuffer(0.1);
    if (noiseBuf) {
      const scrape = this.ctx.createBufferSource();
      scrape.buffer = noiseBuf;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(3200, now);
      bp.Q.value = 2.5;
      const sGain = this.ctx.createGain();
      sGain.gain.setValueAtTime(0.22, now);
      sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);
      scrape.connect(bp);
      bp.connect(sGain);
      sGain.connect(this.ctx.destination);
      scrape.start(now);
      scrape.stop(now + 0.02);
    }

    // 2. Spring tumbler pin release ping (16ms to 45ms)
    const tPin = now + 0.016;
    [2640, 3960].forEach((freq, idx) => {
      const pin = this.ctx.createOscillator();
      const pGain = this.ctx.createGain();
      pin.type = 'sine';
      pin.frequency.setValueAtTime(freq, tPin);
      pGain.gain.setValueAtTime(idx === 0 ? 0.30 : 0.18, tPin);
      pGain.gain.exponentialRampToValueAtTime(0.001, tPin + 0.028);
      pin.connect(pGain);
      pGain.connect(this.ctx.destination);
      if (this.reverbNode) pGain.connect(this.reverbNode);
      pin.start(tPin);
      pin.stop(tPin + 0.032);
    });

    // 3. Heavy iron/brass bolt drop latch thump (36ms to 95ms)
    const tBolt = now + 0.036;
    const bolt = this.ctx.createOscillator();
    const bGain = this.ctx.createGain();
    bolt.type = 'triangle';
    bolt.frequency.setValueAtTime(155, tBolt);
    bolt.frequency.exponentialRampToValueAtTime(60, tBolt + 0.05);
    bGain.gain.setValueAtTime(0.38, tBolt);
    bGain.gain.exponentialRampToValueAtTime(0.001, tBolt + 0.06);
    bolt.connect(bGain);
    bGain.connect(this.ctx.destination);
    if (this.reverbNode) bGain.connect(this.reverbNode);
    bolt.start(tBolt);
    bolt.stop(tBolt + 0.065);
  }

  // Realistic Crystalline Revelation Chime ("DING!")
  playDing() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    if (this.shouldDebounce('ding', 350)) return;

    const now = this.ctx.currentTime;
    const freqs = [
      { f: 1567.98, g: 0.28, d: 0.75 }, // G6
      { f: 2093.00, g: 0.22, d: 0.85 }, // C7
      { f: 3135.96, g: 0.12, d: 0.40 }  // G7 shimmer
    ];
    freqs.forEach(({ f, g, d }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(g, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      if (this.reverbNode) gain.connect(this.reverbNode);
      osc.start(now);
      osc.stop(now + d + 0.05);
    });
  }

  // Centralized cartoon/anime sound dispatcher with debounce protection
  playCartoonSound(soundType) {
    if (this.isMuted || !soundType) return;
    const s = soundType.toLowerCase();

    if (s.includes('clink')) {
      this.playClink();
    } else if (s.includes('achoo') || s.includes('sneeze')) {
      this.playAchoo();
    } else if (s.includes('whoosh') || s.includes('blast off') || s.includes('swoosh')) {
      this.playWhoosh();
    } else if (s.includes('pop')) {
      this.playPop();
    } else if (s.includes('click')) {
      this.playClick();
    } else if (s.includes('boing')) {
      this.playBoing();
    } else if (s.includes('ding')) {
      this.playDing();
    } else if (s.includes('bell') || s.includes('rrrring')) {
      this.playSchoolBell();
    } else if (s.includes('clack')) {
      this.playDoorClack();
    } else if (s.includes('sparkle') || s.includes('magic')) {
      this.playSparkle();
    }
  }

  // Realistic Electric Brass School Bell Ringing Synthesizer (Rrrrring-ding-ding-ding!)
  playSchoolBell() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const duration = 2.2;

    // LFO for rapid electric clapper strike tremolo (22 Hz strike rate)
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(22, now);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.45, now);
    lfo.connect(lfoGain);

    // Master bell output gain
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.5, now);
    masterGain.gain.setValueAtTime(0.5, now + duration - 0.4);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    lfoGain.connect(masterGain.gain);

    // Metallic overtone partials of a real school brass bell
    const frequencies = [1050, 2180, 3350, 4700, 5900];
    const gains = [0.4, 0.25, 0.15, 0.1, 0.05];

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const partGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      partGain.gain.setValueAtTime(gains[idx], now);
      partGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(partGain);
      partGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    });

    masterGain.connect(this.ctx.destination);
    lfo.start(now);
    lfo.stop(now + duration + 0.1);
  }

  playBell() {
    this.playSchoolBell();
  }

  // Realistic gentle footsteps (shoes / paws on floor)
  playFootsteps() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    if (this.shouldDebounce('footsteps', 750)) return;

    const now = this.ctx.currentTime;
    const steps = [0, 0.32, 0.64];
    const noiseBuf = this.getNoiseBuffer(0.15);

    steps.forEach((offset, idx) => {
      const tStep = now + offset;
      const isLeft = idx % 2 === 0;

      // Soft sole friction tap
      if (noiseBuf) {
        const tap = this.ctx.createBufferSource();
        tap.buffer = noiseBuf;
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.setValueAtTime(isLeft ? 1050 : 1180, tStep);
        bp.Q.value = 2.0;
        const tGain = this.ctx.createGain();
        tGain.gain.setValueAtTime(0.20, tStep);
        tGain.gain.exponentialRampToValueAtTime(0.001, tStep + 0.04);
        tap.connect(bp);
        bp.connect(tGain);
        tGain.connect(this.ctx.destination);
        tap.start(tStep);
        tap.stop(tStep + 0.045);
      }

      // Floor body thump
      const thump = this.ctx.createOscillator();
      const thumpGain = this.ctx.createGain();
      thump.type = 'sine';
      const fThump = isLeft ? 90 : 82;
      thump.frequency.setValueAtTime(fThump, tStep);
      thump.frequency.exponentialRampToValueAtTime(45, tStep + 0.06);
      thumpGain.gain.setValueAtTime(0.28, tStep);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, tStep + 0.07);
      thump.connect(thumpGain);
      thumpGain.connect(this.ctx.destination);
      if (this.reverbNode) thumpGain.connect(this.reverbNode);
      thump.start(tStep);
      thump.stop(tStep + 0.075);
    });
  }

  playWaterGlug() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const glugs = [0, 0.12, 0.24, 0.36, 0.48];

    glugs.forEach((offset, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const startPitch = 220 + idx * 40;
      osc.frequency.setValueAtTime(startPitch, now + offset);
      osc.frequency.exponentialRampToValueAtTime(startPitch + 120, now + offset + 0.08);

      gain.gain.setValueAtTime(0.3, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      if (this.reverbNode) gain.connect(this.reverbNode);

      osc.start(now + offset);
      osc.stop(now + offset + 0.1);
    });
  }

  // Realistic wooden door / latch clack
  playDoorClack() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    if (this.shouldDebounce('doorclack', 280)) return;

    const now = this.ctx.currentTime;

    // Wood friction scrape
    const noiseBuf = this.getNoiseBuffer(0.1);
    if (noiseBuf) {
      const scrape = this.ctx.createBufferSource();
      scrape.buffer = noiseBuf;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(1400, now);
      bp.Q.value = 1.8;
      const sGain = this.ctx.createGain();
      sGain.gain.setValueAtTime(0.24, now);
      sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      scrape.connect(bp);
      bp.connect(sGain);
      sGain.connect(this.ctx.destination);
      scrape.start(now);
      scrape.stop(now + 0.035);
    }

    // Heavy wooden door frame thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.11);

    gain.gain.setValueAtTime(0.42, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    if (this.reverbNode) gain.connect(this.reverbNode);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  playStoryChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 880, 1046.5];
    const now = this.ctx.currentTime;
    const note = notes[Math.floor(Math.random() * notes.length)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    if (this.reverbNode) gain.connect(this.reverbNode);

    osc.start(now);
    osc.stop(now + 1.25);
  }

  playSuccessFanfare() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);

      gain.gain.setValueAtTime(0.3, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      if (this.reverbNode) gain.connect(this.reverbNode);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.45);
    });
  }

  // Realistic mechanical spiral spring ("BOING!") with 16Hz vibrato flutter
  playBoing() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    if (this.shouldDebounce('boing', 350)) return;

    const now = this.ctx.currentTime;
    const dur = 0.46;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // LFO for physical spiral vibration
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(16, now);
    lfoGain.gain.setValueAtTime(35, now);
    lfo.connect(osc.frequency);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.22);
    osc.frequency.exponentialRampToValueAtTime(420, now + dur);

    gain.gain.setValueAtTime(0.36, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    if (this.reverbNode) gain.connect(this.reverbNode);

    lfo.start(now);
    osc.start(now);
    lfo.stop(now + dur + 0.02);
    osc.stop(now + dur + 0.02);
  }

  // Celestial magic chime chord
  playMagicChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const freqs = [587.33, 739.99, 880.0, 1174.66, 1479.98]; // D5, F#5, A5, D6, F#6
    const now = this.ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.2, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.85);
    });
  }

  // Ambient soothing rain generator with volume control
  startAmbientRain(volume = 0.08) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    if (this.rainNode) {
      this.setAmbientRainVolume(volume);
      return;
    }

    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 650;

      const gain = this.ctx.createGain();
      gain.gain.value = volume;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      this.rainNode = { noise, gain };
    } catch (e) {
      console.warn("Rain loop error", e);
    }
  }

  setAmbientRainVolume(volume) {
    if (this.rainNode && this.rainNode.gain) {
      this.rainNode.gain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx?.currentTime || 0);
    }
  }

  stopAmbientRain() {
    if (this.rainNode) {
      try {
        this.rainNode.noise.stop();
        this.rainNode.noise.disconnect();
      } catch (e) { }
      this.rainNode = null;
    }
  }

  // Forest Breeze & Procedural Birds
  startForestBreeze(volume = 0.08) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    if (this.forestNode) {
      this.setForestVolume(volume);
      return;
    }

    try {
      // Wind generator: bandpass filtered noise with LFO modulation
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02; // Pink noise
        lastOut = data[i];
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 400;
      filter.Q.value = 1.2;

      const gain = this.ctx.createGain();
      gain.gain.value = volume;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();

      // Procedural bird chirp scheduler
      const birdTimer = setInterval(() => {
        if (this.isMuted || !this.forestNode) return;
        this.playSingleBirdChirp();
      }, 3500 + Math.random() * 3000);

      this.forestNode = { noise, gain, birdTimer };
    } catch (e) {
      console.warn("Forest loop error", e);
    }
  }

  playSingleBirdChirp() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startFreq = 2200 + Math.random() * 1000;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq + 600, now + 0.05);
    osc.frequency.exponentialRampToValueAtTime(startFreq - 300, now + 0.12);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  setForestVolume(volume) {
    if (this.forestNode && this.forestNode.gain) {
      this.forestNode.gain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx?.currentTime || 0);
    }
  }

  stopForestBreeze() {
    if (this.forestNode) {
      try {
        if (this.forestNode.birdTimer) clearInterval(this.forestNode.birdTimer);
        this.forestNode.noise.stop();
        this.forestNode.noise.disconnect();
      } catch (e) { }
      this.forestNode = null;
    }
  }

  // Cosmic Starlight Pad (Peaceful deep space chord)
  startCosmicStarlight(volume = 0.08) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    if (this.cosmicNode) {
      this.setCosmicVolume(volume);
      return;
    }

    try {
      const chordFreqs = [220, 277.18, 329.63, 440, 554.37]; // A major 9
      const oscs = [];
      const masterGain = this.ctx.createGain();
      masterGain.gain.value = volume;

      chordFreqs.forEach(freq => {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const pGain = this.ctx.createGain();
        pGain.gain.value = 0.15;

        osc.connect(pGain);
        pGain.connect(masterGain);
        osc.start();
        oscs.push(osc);
      });

      masterGain.connect(this.ctx.destination);
      this.cosmicNode = { oscs, masterGain };
    } catch (e) {
      console.warn("Cosmic pad error", e);
    }
  }

  setCosmicVolume(volume) {
    if (this.cosmicNode && this.cosmicNode.masterGain) {
      this.cosmicNode.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx?.currentTime || 0);
    }
  }

  stopCosmicStarlight() {
    if (this.cosmicNode) {
      try {
        this.cosmicNode.oscs.forEach(o => {
          o.stop();
          o.disconnect();
        });
        this.cosmicNode.masterGain.disconnect();
      } catch (e) { }
      this.cosmicNode = null;
    }
  }

  // Music Box Lullaby (Gentle procedural music box melody)
  startMusicBox(volume = 0.08) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    if (this.musicBoxTimer) {
      return;
    }

    const melody = [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 587.33, 659.25, 783.99, 880.0];
    let step = 0;

    const playNote = () => {
      if (this.isMuted || !this.musicBoxTimer) return;
      const now = this.ctx.currentTime;
      const freq = melody[step % melody.length];
      step++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(volume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    };

    playNote();
    this.musicBoxTimer = setInterval(playNote, 950);
  }

  stopMusicBox() {
    if (this.musicBoxTimer) {
      clearInterval(this.musicBoxTimer);
      this.musicBoxTimer = null;
    }
  }

  stopAllSoundscapes() {
    this.stopAmbientRain();
    this.stopForestBreeze();
    this.stopCosmicStarlight();
    this.stopMusicBox();
  }
}

export const soundFX = new SoundEffectsService();
