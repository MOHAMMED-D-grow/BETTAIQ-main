// High-fidelity Procedural Biotope Soundscape Synthesizer via Web Audio API
// Generates natural Southeast Asian aquatic soundscapes without external audio files

export type SoundscapeType = 'stream' | 'rain' | 'night' | 'underwater';

class BiotopeAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private activeNodes: { stop?: () => void; disconnect: () => void }[] = [];
  private currentPreset: SoundscapeType = 'stream';
  private currentVolume = 0.45;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Create a continuous noise buffer
  private createNoiseBuffer(duration = 5): AudioBuffer {
    if (!this.ctx) throw new Error('AudioContext uninitialized');
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    // Pink / Brown noise synthesis
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }
    return buffer;
  }

  // Preset 1: Gentle Peat Swamp Stream
  private startStream() {
    if (!this.ctx || !this.masterGain) return;
    const noiseBuffer = this.createNoiseBuffer(6);

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    // Dual resonant bandpass filter simulating babbling water
    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.setValueAtTime(420, this.ctx.currentTime);
    filter1.Q.setValueAtTime(1.8, this.ctx.currentTime);

    const filter2 = this.ctx.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(800, this.ctx.currentTime);

    // LFO for water ripple dynamics
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.25, this.ctx.currentTime);
    lfoGain.gain.setValueAtTime(160, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter1.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.65, this.ctx.currentTime);

    noise.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    lfo.start();

    this.activeNodes.push(
      { stop: () => { try { noise.stop(); } catch {} }, disconnect: () => noise.disconnect() },
      { stop: () => { try { lfo.stop(); } catch {} }, disconnect: () => lfo.disconnect() },
      { disconnect: () => filter1.disconnect() },
      { disconnect: () => filter2.disconnect() },
      { disconnect: () => gain.disconnect() }
    );
  }

  // Preset 2: Rainforest Canopy Rain
  private startRain() {
    if (!this.ctx || !this.masterGain) return;
    const noiseBuffer = this.createNoiseBuffer(5);

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    // Highpass to remove heavy mud rumble, keeping leaf splashes
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(200, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.7, this.ctx.currentTime);

    // Distant rumble oscillator
    const rumble = this.ctx.createOscillator();
    rumble.type = 'sine';
    rumble.frequency.setValueAtTime(45, this.ctx.currentTime);
    const rumbleGain = this.ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    noise.connect(hp);
    hp.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    rumble.connect(rumbleGain);
    rumbleGain.connect(this.masterGain);

    noise.start();
    rumble.start();

    this.activeNodes.push(
      { stop: () => { try { noise.stop(); } catch {} }, disconnect: () => noise.disconnect() },
      { stop: () => { try { rumble.stop(); } catch {} }, disconnect: () => rumble.disconnect() },
      { disconnect: () => hp.disconnect() },
      { disconnect: () => filter.disconnect() },
      { disconnect: () => gain.disconnect() },
      { disconnect: () => rumbleGain.disconnect() }
    );
  }

  // Preset 3: Nocturnal Mangrove Marsh (Night crickets and gentle breeze)
  private startNight() {
    if (!this.ctx || !this.masterGain) return;
    const noiseBuffer = this.createNoiseBuffer(6);

    // Wind noise
    const wind = this.ctx.createBufferSource();
    wind.buffer = noiseBuffer;
    wind.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(280, this.ctx.currentTime);
    windFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

    wind.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.masterGain);
    wind.start();

    // High-frequency cricket rhythm
    const cricketOsc = this.ctx.createOscillator();
    cricketOsc.type = 'sine';
    cricketOsc.frequency.setValueAtTime(4600, this.ctx.currentTime);

    const modOsc = this.ctx.createOscillator();
    modOsc.type = 'triangle';
    modOsc.frequency.setValueAtTime(14, this.ctx.currentTime);

    const cricketGain = this.ctx.createGain();
    cricketGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

    const modGain = this.ctx.createGain();
    modGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    modOsc.connect(modGain);
    modGain.connect(cricketGain.gain);

    cricketOsc.connect(cricketGain);
    cricketGain.connect(this.masterGain);

    cricketOsc.start();
    modOsc.start();

    this.activeNodes.push(
      { stop: () => { try { wind.stop(); } catch {} }, disconnect: () => wind.disconnect() },
      { stop: () => { try { cricketOsc.stop(); } catch {} }, disconnect: () => cricketOsc.disconnect() },
      { stop: () => { try { modOsc.stop(); } catch {} }, disconnect: () => modOsc.disconnect() },
      { disconnect: () => windFilter.disconnect() },
      { disconnect: () => windGain.disconnect() },
      { disconnect: () => cricketGain.disconnect() }
    );
  }

  // Preset 4: Deep Submerged Blackwater (Muffled underwater pulse)
  private startUnderwater() {
    if (!this.ctx || !this.masterGain) return;
    const noiseBuffer = this.createNoiseBuffer(6);

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(140, this.ctx.currentTime);

    // Slow rhythmic underwater wave LFO
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(45, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(lowpass.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.85, this.ctx.currentTime);

    noise.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    lfo.start();

    this.activeNodes.push(
      { stop: () => { try { noise.stop(); } catch {} }, disconnect: () => noise.disconnect() },
      { stop: () => { try { lfo.stop(); } catch {} }, disconnect: () => lfo.disconnect() },
      { disconnect: () => lowpass.disconnect() },
      { disconnect: () => gain.disconnect() }
    );
  }

  public play(preset?: SoundscapeType) {
    this.initContext();
    this.stop();

    if (preset) {
      this.currentPreset = preset;
    }

    if (this.currentPreset === 'stream') this.startStream();
    else if (this.currentPreset === 'rain') this.startRain();
    else if (this.currentPreset === 'night') this.startNight();
    else if (this.currentPreset === 'underwater') this.startUnderwater();

    this.isPlaying = true;
  }

  public stop() {
    for (const node of this.activeNodes) {
      if (node.stop) {
        try { node.stop(); } catch {}
      }
      try { node.disconnect(); } catch {}
    }
    this.activeNodes = [];
    this.isPlaying = false;
  }

  public setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.currentVolume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getPreset(): SoundscapeType {
    return this.currentPreset;
  }
}

export const biotopeAudio = new BiotopeAudioEngine();
