import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, VolumeX, Sun, Moon, Radio, Play, Pause, Maximize2 } from 'lucide-react';
import { biotopeAudio, SoundscapeType } from '../utils/biotopeAudio.ts';

interface BiotopeQuickBarProps {
  onOpenStudio: () => void;
  lightingMode: 'sunlight' | 'midnight';
  onToggleLighting: (mode: 'sunlight' | 'midnight') => void;
}

export const BiotopeQuickBar: React.FC<BiotopeQuickBarProps> = ({
  onOpenStudio,
  lightingMode,
  onToggleLighting,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [preset, setPreset] = useState<SoundscapeType>('stream');

  useEffect(() => {
    setIsPlaying(biotopeAudio.getIsPlaying());
    setVolume(biotopeAudio.getVolume());
    setPreset(biotopeAudio.getPreset());
  }, []);

  const toggleSound = () => {
    if (isPlaying) {
      biotopeAudio.stop();
      setIsPlaying(false);
    } else {
      biotopeAudio.play(preset);
      setIsPlaying(true);
    }
  };

  const getPresetLabel = (p: SoundscapeType) => {
    switch (p) {
      case 'stream': return 'Peat Swamp Stream';
      case 'rain': return 'Canopy Rain';
      case 'night': return 'Nocturnal Marsh';
      case 'underwater': return 'Deep Submerged';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#060b10]/90 backdrop-blur-xl border border-cyan-800/40 rounded-full px-3.5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.8)] transition-all group">
      {/* Soundscape Play / Pause Button */}
      <button
        onClick={toggleSound}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          isPlaying
            ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
            : 'bg-white/10 text-[#a09a8f] hover:text-white hover:bg-white/20'
        }`}
        title={isPlaying ? 'Pause Soundscape' : 'Play Southeast Asian Biotope Soundscape'}
        aria-label="Toggle biotope soundscape"
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 fill-black" />
        ) : (
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        )}
      </button>

      {/* Track Label */}
      <div
        onClick={onOpenStudio}
        className="hidden sm:flex flex-col cursor-pointer pr-1 text-left"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 flex items-center gap-1.5">
          {isPlaying && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
          <span>Biotope Acoustics</span>
        </span>
        <span className="text-xs font-serif text-white truncate max-w-[130px]">
          {getPresetLabel(preset)}
        </span>
      </div>

      <div className="h-4 w-px bg-white/10 hidden sm:block" />

      {/* Day / Night Quick Toggle */}
      <button
        onClick={() => onToggleLighting(lightingMode === 'sunlight' ? 'midnight' : 'sunlight')}
        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 text-amber-300 hover:text-white transition-all cursor-pointer"
        title={`Switch to ${lightingMode === 'sunlight' ? 'Midnight Lunar Mode' : 'Sunlight Biotope Mode'}`}
        aria-label="Toggle lighting mode"
      >
        {lightingMode === 'sunlight' ? (
          <Sun className="w-4 h-4 text-amber-300" />
        ) : (
          <Moon className="w-4 h-4 text-cyan-300" />
        )}
      </button>

      {/* Open Studio Button */}
      <button
        onClick={onOpenStudio}
        className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono uppercase tracking-wider text-cyan-200 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-700/50 rounded-full transition-all cursor-pointer"
      >
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span className="hidden md:inline">Studio</span>
      </button>
    </div>
  );
};
