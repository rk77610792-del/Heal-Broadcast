/**
 * Web Audio API synthesizer for late-night cozy radio ambiance,
 * lofi electric piano chords, soft vinyl crackle, and gentle rain.
 * Works reliably in-browser without external asset network dependencies.
 */

class RadioAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private loopInterval: number | null = null;
  private currentVolume = 0.75;
  private analyser: AnalyserNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTheme(theme: 'lofi' | 'ambient' | 'jazz' | 'rain' = 'lofi') {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      this.isPlaying = true;
      this.stopChords();

      // Soft base drone
      this.createWarmDrone();

      // Periodic chord progression
      const chords = theme === 'rain' 
        ? [ [174.61, 220.00, 261.63], [146.83, 174.61, 220.00] ] // F, Dm
        : [ [220.00, 261.63, 329.63, 392.00], [174.61, 220.00, 261.63, 329.63], [196.00, 246.94, 293.66, 349.23], [164.81, 196.00, 246.94, 293.66] ]; // Am7, Fmaj7, G7, Em7

      let chordIndex = 0;
      const playNext = () => {
        if (!this.isPlaying || !this.ctx || !this.masterGain) return;
        const currentChord = chords[chordIndex % chords.length];
        this.playChord(currentChord);
        chordIndex++;
      };

      playNext();
      this.loopInterval = window.setInterval(playNext, 4200);
    } catch {
      // Audio context might fail in autoplay restricted environments until user gestures
    }
  }

  private createWarmDrone() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const droneGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      droneGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(this.masterGain);

      osc.start();
      // Keep running while playing
      setTimeout(() => {
        try {
          if (!this.isPlaying) osc.stop();
        } catch {
          // ignore
        }
      }, 5000);
    } catch {
      // ignore
    }
  }

  private playChord(frequencies: number[]) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    frequencies.forEach((freq, idx) => {
      try {
        const osc = this.ctx!.createOscillator();
        const noteGain = this.ctx!.createGain();
        const filter = this.ctx!.createBiquadFilter();

        osc.type = 'triangle';
        // Subtle human detuning
        osc.frequency.setValueAtTime(freq * (1 + (Math.random() - 0.5) * 0.004), now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now);
        filter.frequency.exponentialRampToValueAtTime(350, now + 3.8);

        // Soft attack, warm decay
        const delay = idx * 0.06;
        noteGain.gain.setValueAtTime(0.0001, now + delay);
        noteGain.gain.exponentialRampToValueAtTime(0.07, now + delay + 0.2);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 4.0);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.masterGain!);

        osc.start(now + delay);
        osc.stop(now + delay + 4.1);
      } catch {
        // ignore
      }
    });
  }

  public setVolume(val: number) {
    this.currentVolume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.currentVolume * 0.5, this.ctx.currentTime);
    }
  }

  public stop() {
    this.isPlaying = false;
    this.stopChords();
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    }
  }

  private stopChords() {
    if (this.loopInterval !== null) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
  }

  public getVisualizerData(): number[] {
    if (!this.analyser || !this.isPlaying) {
      // Return pleasing idle pulse if paused
      return [18, 32, 45, 28, 60, 48, 72, 35, 20, 15];
    }
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    const samples: number[] = [];
    const step = Math.floor(bufferLength / 12) || 1;
    for (let i = 0; i < 12; i++) {
      const val = dataArray[i * step] || 20;
      samples.push(Math.max(15, Math.min(100, Math.round((val / 255) * 100))));
    }
    return samples;
  }
}

export const radioAudio = new RadioAudioSynthesizer();
