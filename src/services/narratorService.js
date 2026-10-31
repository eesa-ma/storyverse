// Magical Children's Storytelling Speech & Cinematic Foley Service
// Designed specifically for kids:
// 1. Plays realistic acoustic Foley sound effects (Golden Key Clink, Aerodynamic Whoosh,
//    Organic Character Achoo Sneeze, Cavitation Pop, Antique Latch Click, Spring Boing)
//    instead of having the voice pronounce sound words!
// 2. Warm, gentle, rhythmic human storytelling cadence (~0.90x tempo).
// 3. Distinct expressive character personalities (Lily, Rocky, Benny, Buddy Bottle, Narrator).
// 4. Zero spoken emoji names and zero spelled-out acronyms.

import { soundFX } from './soundEffects';

const CARTOON_SFX_RULES = [
  { regex: /['"“]?\b(CLINK(?:ING)?)\b!*['"”]?/gi, sound: 'clink' },
  { regex: /['"“]?\b(WHOO+SH|BLAST OFF|SWOOSH)\b!*['"”]?/gi, sound: 'whoosh' },
  { regex: /['"“]?\b(A+CHOO+|SNEEZE)\b!*['"”]?/gi, sound: 'achoo' },
  { regex: /['"“]?\b(PO+P)\b!*['"”]?/gi, sound: 'pop' },
  { regex: /['"“]?\b(CLI+CK)\b!*['"”]?/gi, sound: 'click' },
  { regex: /['"“]?\b(BOI+NG|GRRRR*)\b!*['"”]?/gi, sound: 'boing' },
  { regex: /['"“]?\b(DI+NG[- ]*DI+NG|DI+NG[- ]*DO+NG|DI+NG)\b!*['"”]?/gi, sound: 'ding' },
  { regex: /['"“]?\b(RRRR*[- ]*I+NG(?:[- ]*DI+NG)*)\b!*['"”]?/gi, sound: 'bell' },
  { regex: /['"“]?\b(CLA+CK)\b!*['"”]?/gi, sound: 'clack' }
];

export function extractCartoonSounds(text) {
  if (!text) return { sounds: [], cleanSpokenText: '' };

  const foundSounds = [];

  // Detect which cartoon sound effects are present in the sentence
  CARTOON_SFX_RULES.forEach(({ regex, sound }) => {
    if (regex.test(text)) {
      foundSounds.push(sound);
    }
  });

  // Strip the sound effect words from the narrator's spoken text so the voice doesn't pronounce them as words
  let spoken = text;
  CARTOON_SFX_RULES.forEach(({ regex }) => {
    spoken = spoken.replace(regex, '');
  });

  spoken = spoken
    // Strip technical speaker prefixes (SFX:, NARRATOR:, AARAV:, BOTTLE:, etc.)
    .replace(/^(SFX|NARRATOR|AARAV|BOTTLE|HAPPY MEMORY|LILY|RABBIT|GIRL|ROCKY|BENNY|MILO|TOBY|STAR|COMET):\s*/gi, '')
    // Strip bracketed stage cues like [laughs], [whispering], etc.
    .replace(/\[[^]*?\]/g, '')
    // Strip emojis from the audio track so TTS never reads out emoji names
    .replace(/(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji_Modifier}|\p{Regional_Indicator})[\uFE00-\uFE0F\u200D\u{1F3FB}-\u{1F3FF}]*/gu, '')
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{FE00}-\u{FE0F}\u{200D}]/gu, '')
    .replace(/:[a-zA-Z0-9_+-]+:/g, '')
    // Clean empty quotes left behind from stripped sound words
    .replace(/['"“]([\s,.-]*?)['"”]/g, '')
    // Clean orphaned opening quotes or closing quotes
    .replace(/^['"“\s]+/, '')
    .replace(/['"”\s]+$/, '')
    // Convert any remaining all-caps words (2+ letters) to natural spoken capitalization
    .replace(/\b[A-Z]{2,}\b/g, (word) => {
      if (word === 'ID' || word === 'OK' || word === 'TV') return word;
      return word.charAt(0) + word.slice(1).toLowerCase();
    })
    // Give ellipses and dashes natural breathing pauses for bedtime / storybook suspense
    .replace(/…/g, '... ')
    .replace(/—/g, ', ')
    // Fix whitespace before punctuation marks
    .replace(/\s+([.,!?;:])/g, '$1')
    // Clean leading punctuation left after removing prefix sound words
    .replace(/^[,\s.!?-]+/, '')
    // Normalize multiple spaces
    .replace(/\s{2,}/g, ' ')
    .trim();

  return { sounds: foundSounds, cleanSpokenText: spoken };
}

export function prepareStorytellingText(text) {
  return extractCartoonSounds(text).cleanSpokenText;
}

// Backward-compatible alias
export const stripEmojis = prepareStorytellingText;

class NarratorService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis || null : null;
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
    const v = this.synth.getVoices();
    if (v && v.length > 0) {
      this.voices = v;
    }
  }

  getBestVoice(speaker) {
    if (!this.synth) return null;
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }
    if (!this.voices || this.voices.length === 0) return null;

    const englishVoices = this.voices.filter(v => v.lang && v.lang.startsWith('en'));
    const candidates = englishVoices.length > 0 ? englishVoices : this.voices;

    const target = (speaker || 'NARRATOR').toUpperCase();

    const scoreVoice = (voice) => {
      const name = voice.name.toLowerCase();
      let score = 0;

      // Heavy bonus for state-of-the-art neural natural voices (Microsoft Edge & Chrome)
      if (name.includes('natural')) score += 1000;
      if (name.includes('online')) score += 800;
      if (name.includes('neural')) score += 800;
      if (name.includes('google')) score += 700;
      if (name.includes('premium')) score += 600;
      if (name.includes('enhanced')) score += 500;

      // Disqualify old monotone robotic desktop voices
      if (name.includes('david')) score -= 2000;
      if (name.includes('mark')) score -= 2000;
      if (name.includes('desktop')) score -= 1500;
      if (name.includes('espeak')) score -= 2000;
      if (name.includes('mumble')) score -= 2000;
      if (name.includes('monotone')) score -= 2000;

      // Character-specific casting for children's stories:
      if (target === 'LILY' || target === 'GIRL') {
        if (name.includes('ana')) score += 350; // Ana is Microsoft's warm young girl voice
        if (name.includes('jenny')) score += 200;
        if (name.includes('aria')) score += 180;
        if (name.includes('google uk english female')) score += 160;
        if (name.includes('samantha')) score += 140;
        if (name.includes('female')) score += 80;
      } else if (target === 'ROCKY' || target === 'AARAV') {
        if (name.includes('guy')) score += 300;
        if (name.includes('christopher')) score += 250;
        if (name.includes('ana')) score += 200;
        if (name.includes('google us english')) score += 150;
      } else if (target === 'BENNY') {
        if (name.includes('guy')) score += 300;
        if (name.includes('christopher')) score += 250;
        if (name.includes('natural')) score += 180;
      } else {
        // Storybook Narrator - soothing, rich, inviting bedtime storyteller voice
        if (name.includes('jenny')) score += 350;
        if (name.includes('aria')) score += 300;
        if (name.includes('sonia')) score += 260;
        if (name.includes('google uk english female')) score += 250;
        if (name.includes('google us english')) score += 200;
        if (name.includes('samantha')) score += 180;
        if (name.includes('female')) score += 60;
      }

      return score;
    };

    const sorted = [...candidates].sort((a, b) => scoreVoice(b) - scoreVoice(a));
    return sorted[0] || candidates[0];
  }

  getCharacterSettings(speaker) {
    const s = (speaker || 'NARRATOR').toUpperCase();
    switch (s) {
      case 'LILY':
      case 'GIRL':
        return { pitch: 1.14, rate: 0.90 };
      case 'ROCKY':
      case 'AARAV':
        return { pitch: 1.06, rate: 0.92 };
      case 'BENNY':
        return { pitch: 0.92, rate: 0.88 };
      case 'BOTTLE':
        return { pitch: 1.18, rate: 0.91 };
      case 'MILO':
        return { pitch: 1.08, rate: 0.91 };
      case 'TOBY':
      case 'RABBIT':
        return { pitch: 1.16, rate: 0.89 };
      case 'STAR':
      case 'COMET':
        return { pitch: 1.20, rate: 0.89 };
      case 'NARRATOR':
      default:
        return { pitch: 1.02, rate: 0.90 };
    }
  }

  speak(text, speaker = 'NARRATOR', onEndCallback = null) {
    this.cancel();

    if (!text) {
      if (onEndCallback) onEndCallback();
      return;
    }

    // Extract cartoon sounds and prepare clean spoken storytelling text
    const { sounds, cleanSpokenText } = extractCartoonSounds(text);

    // Play realistic Foley sound effects
    if (sounds.length > 0) {
      sounds.forEach((snd, idx) => {
        setTimeout(() => {
          soundFX.playCartoonSound(snd);
        }, idx * 240);
      });
    }

    // If there is no remaining spoken text (pure sound-effect sentence)
    if (!cleanSpokenText) {
      const waitTime = Math.max(900, sounds.length * 450);
      this.fallbackTimeout = setTimeout(() => {
        this.speaking = false;
        if (onEndCallback) onEndCallback();
      }, waitTime);
      return;
    }

    if (!this.synth || !this.isEnabled) {
      if (onEndCallback) onEndCallback();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanSpokenText);
    this.activeUtterance = utterance; // Prevent garbage collection in Chrome/Edge
    this.speaking = true;

    // Pick highest-quality, warmest natural storyteller voice
    const voice = this.getBestVoice(speaker);
    if (voice) utterance.voice = voice;

    // Apply gentle, kid-friendly tempo & character pitch
    const settings = this.getCharacterSettings(speaker);
    utterance.pitch = settings.pitch;
    utterance.rate = settings.rate;

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

    // Gentle pacing duration estimate
    const estimatedDurationMs = Math.max(3000, (cleanSpokenText.length * 110) + 1500);
    this.fallbackTimeout = setTimeout(() => {
      handleEnd();
    }, estimatedDurationMs);

    // If a realistic Foley effect is playing, give it a natural 240ms lead before the voice smoothly enters
    const startDelay = sounds.length > 0 ? 240 : 20;

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
    }, startDelay);
  }

  speakSentence(sentenceObj, onEndCallback = null) {
    if (!sentenceObj) {
      if (onEndCallback) onEndCallback();
      return;
    }
    const speaker = sentenceObj.speaker === 'SFX' ? 'NARRATOR' : (sentenceObj.speaker || 'NARRATOR');
    this.speak(sentenceObj.text, speaker, onEndCallback);
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
