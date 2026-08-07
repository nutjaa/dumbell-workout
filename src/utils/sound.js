// Web Audio API Sound Synthesizer for Workout Audio Cues

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
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
    this.muted = muted;
  }

  isMuted() {
    return this.muted;
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1, delay = 0) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  // Audio effects
  playTick() {
    this.playTone(600, 'sine', 0.08, 0.05);
  }

  playCountdownTick() {
    this.playTone(800, 'triangle', 0.12, 0.08);
  }

  playSetComplete() {
    // Upward chime
    this.playTone(523.25, 'sine', 0.15, 0.1, 0);    // C5
    this.playTone(659.25, 'sine', 0.15, 0.1, 0.1);  // E5
    this.playTone(783.99, 'sine', 0.25, 0.12, 0.2); // G5
  }

  playRestOver() {
    // Energetic alert tone
    this.playTone(880, 'sine', 0.2, 0.15, 0);     // A5
    this.playTone(1174.66, 'sine', 0.3, 0.18, 0.15); // D6
  }

  playWorkoutComplete() {
    // Victory fanfare
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.3, 0.15, idx * 0.12);
    });
  }
}

export const sound = new SoundEngine();
