// Optimized Fast Web SpeechSynthesis Service with Chrome Garbage-Collection Fix & Fallback Safety

class NarratorService {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    this.isEnabled = true;
    this.speaking = false;
    this.activeUtterance = null;
    this.fallbackTimeout = null;

    if (this.synth) {
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  getBestVoice(speaker) {
    if (!this.voices || this.voices.length === 0) return null;

    let preferred = this.voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Karen'))
    );
    return preferred || this.voices[0];
  }

  speak(text, speaker = 'NARRATOR', onEndCallback = null) {
    this.cancel();

    if (!this.synth || !this.isEnabled || !text) {
      if (onEndCallback) onEndCallback();
      return;
    }

    // Clean text by stripping technical prefixes (SFX:, NARRATOR:, AARAV:, BOTTLE:, etc.) and brackets
    const cleanText = text
      .replace(/^SFX:\s*/gi, '')
      .replace(/^NARRATOR:\s*/gi, '')
      .replace(/^AARAV:\s*/gi, '')
      .replace(/^BOTTLE:\s*/gi, '')
      .replace(/^HAPPY MEMORY:\s*/gi, '')
      .replace(/\[[^]*?\]/g, '')
      .trim();

    if (!cleanText) {
      if (onEndCallback) onEndCallback();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.activeUtterance = utterance; // Prevent Garbage Collection in Chrome/Edge!
    this.speaking = true;

    const voice = this.getBestVoice(speaker);
    if (voice) utterance.voice = voice;

    if (speaker === 'BOTTLE') {
      utterance.pitch = 1.3;
      utterance.rate = 1.2;
    } else if (speaker === 'AARAV') {
      utterance.pitch = 1.15;
      utterance.rate = 1.15;
    } else {
      utterance.pitch = 1.05;
      utterance.rate = 1.1;
    }

    let hasEnded = false;
    const handleEnd = () => {
      if (hasEnded) return;
      hasEnded = true;
      this.speaking = false;
      if (this.fallbackTimeout) clearTimeout(this.fallbackTimeout);
      if (onEndCallback) onEndCallback();
    };

    utterance.onend = handleEnd;
    utterance.onerror = handleEnd;

    // Safety Fallback Timeout: Guarantee advancement even if browser SpeechSynthesis fails/freezes
    const estimatedDurationMs = Math.max(2500, (cleanText.length * 85) + 1000);
    this.fallbackTimeout = setTimeout(() => {
      handleEnd();
    }, estimatedDurationMs);

    setTimeout(() => {
      if (this.synth && this.isEnabled) {
        try {
          this.synth.speak(utterance);
        } catch (e) {
          handleEnd();
        }
      } else {
        handleEnd();
      }
    }, 15);
  }

  speakSentence(sentenceObj, onEndCallback = null) {
    if (!sentenceObj) {
      if (onEndCallback) onEndCallback();
      return;
    }
    if (sentenceObj.speaker === 'SFX') {
      if (onEndCallback) {
        setTimeout(onEndCallback, 900);
      }
      return;
    }
    this.speak(sentenceObj.text, sentenceObj.speaker || 'NARRATOR', onEndCallback);
  }

  cancel() {
    if (this.fallbackTimeout) {
      clearTimeout(this.fallbackTimeout);
      this.fallbackTimeout = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
      this.speaking = false;
    }
    this.activeUtterance = null;
  }

  toggleEnabled() {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled) this.cancel();
    return this.isEnabled;
  }
}

export const narrator = new NarratorService();
