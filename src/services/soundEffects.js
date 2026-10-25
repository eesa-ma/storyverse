// Web Audio API Sound Synthesizer for "The Bottle That Waited"

class SoundEffectsService {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
  }

  playPop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  playPageFlip() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const oscillator = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(420, now);
    oscillator.frequency.exponentialRampToValueAtTime(180, now + 0.12);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    oscillator.connect(gain);
    gain.connect(this.ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.13);
  }

  playSparkle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const freqs = [1046.5, 1318.5, 1567.98, 2093.0]; // C6, E6, G6, C7
    const now = this.ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  }

  playRocketWhoosh() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.6);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.7);

    setTimeout(() => this.playSparkle(), 400);
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

  playFootsteps() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const steps = [0, 0.35, 0.7];

    steps.forEach((offset) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now + offset);
      osc.frequency.exponentialRampToValueAtTime(60, now + offset + 0.08);

      gain.gain.setValueAtTime(0.3, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.1);
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

      osc.start(now + offset);
      osc.stop(now + offset + 0.1);
    });
  }

  playDoorClack() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

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

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.45);
    });
  }

  // Cartoon spring boing sound effect
  playBoing() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.25);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.4);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
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
