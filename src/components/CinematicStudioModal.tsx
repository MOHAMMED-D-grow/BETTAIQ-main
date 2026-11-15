import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  ShieldAlert,
  Layers,
  Activity,
  Heart,
  Eye,
  Info,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Radio,
  Waves,
  CloudRain,
  Trees,
  Music
} from 'lucide-react';
import { biotopeAudio, SoundscapeType } from '../utils/biotopeAudio.ts';
import { BettaFish3D } from './BettaFish3D.tsx';
import xraySkeletonImg from '../assets/images/betta_xray_skeleton_1794541677101.jpg';
import labyrinthImg from '../assets/images/betta_labyrinth_organ_1794541678149.jpg';
import swimBladderImg from '../assets/images/betta_swim_bladder_1794541677844.jpg';
import heartGillsImg from '../assets/images/betta_heart_gills_1794541678929.jpg';
import digestiveImg from '../assets/images/betta_digestive_tract_1794541680011.jpg';

const SPECIMEN_BETTA_IMAGE = `${import.meta.env.BASE_URL}assets/aistudio/image_a36a6ae0.png`;

const ANATOMY_PLATES: Record<
  string,
  { label: string; tag: string; image: string; alt: string }
> = {
  labyrinth: {
    label: 'Suprabranchial Labyrinth',
    tag: 'Atmospheric Air Exchange',
    image: labyrinthImg,
    alt: 'Crowntail Betta suprabranchial labyrinth organ anatomical cutaway',
  },
  'swim-bladder': {
    label: 'Swim Bladder',
    tag: 'Hydrostatic Buoyancy',
    image: swimBladderImg,
    alt: 'Crowntail Betta dual-chamber swim bladder X-ray diagram',
  },
  heart: {
    label: 'Heart Core',
    tag: 'Two-Chambered Circulation',
    image: heartGillsImg,
    alt: 'Crowntail Betta cardiovascular heart and gill arches anatomy',
  },
  stomach: {
    label: 'Digestive Tract',
    tag: 'Obligate Carnivore',
    image: digestiveImg,
    alt: 'Crowntail Betta stomach and intestinal tract anatomical cutaway',
  },
  gills: {
    label: 'Gills & Beard',
    tag: 'Opercular & Branchial Arches',
    image: heartGillsImg,
    alt: 'Crowntail Betta opercular gill plates and branchial arches anatomy',
  },
  skeleton: {
    label: 'Skeleton & Spine',
    tag: 'Cranium & 28 Vertebrae',
    image: xraySkeletonImg,
    alt: 'Crowntail Betta full skeletal X-ray radiograph',
  },
};

interface CinematicStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  lightingMode: 'sunlight' | 'midnight';
  onToggleLighting?: (mode: 'sunlight' | 'midnight') => void;
}

export const CinematicStudioModal: React.FC<CinematicStudioModalProps> = ({
  isOpen,
  onClose,
  lightingMode,
}) => {
  const [activeTab, setActiveTab] = useState<'soundscape' | 'anatomy' | 'flaring'>('soundscape');

  // Soundscape States
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [soundPreset, setSoundPreset] = useState<SoundscapeType>('stream');
  const [volume, setVolume] = useState(0.45);

  // Anatomy Slider State (0: Scales, 1: Fins & Muscles, 2: Internal Organs, 3: Skeletal Frame)
  const [anatomyLayer, setAnatomyLayer] = useState(0);
  const [selectedPin, setSelectedPin] = useState<string | null>('labyrinth');

  // Flaring Workout States
  const [flaringState, setFlaringState] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle');
  const [interactiveFlaring, setInteractiveFlaring] = useState(false);
  const [flaringSecondsLeft, setFlaringSecondsLeft] = useState(180); // 3 minutes total
  const [flaringPhase, setFlaringPhase] = useState<'Lateral Display' | 'Full Opercular Flare' | 'Cool Down'>('Lateral Display');
  const [mirrorBrightness, setMirrorBrightness] = useState<number>(1);

  // Sync audio state on mount
  useEffect(() => {
    setIsPlayingAudio(biotopeAudio.getIsPlaying());
    setSoundPreset(biotopeAudio.getPreset());
    setVolume(biotopeAudio.getVolume());
  }, [isOpen]);

  // Handle flaring timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (flaringState === 'running' && flaringSecondsLeft > 0) {
      interval = setInterval(() => {
        setFlaringSecondsLeft((prev) => {
          const next = prev - 1;
          // Determine phase
          if (next > 120) {
            setFlaringPhase('Lateral Display');
          } else if (next > 30) {
            setFlaringPhase('Full Opercular Flare');
          } else if (next > 0) {
            setFlaringPhase('Cool Down');
          } else {
            setFlaringState('completed');
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [flaringState, flaringSecondsLeft]);

  if (!isOpen) return null;

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      biotopeAudio.stop();
      setIsPlayingAudio(false);
    } else {
      biotopeAudio.play(soundPreset);
      setIsPlayingAudio(true);
    }
  };

  const handleSelectPreset = (preset: SoundscapeType) => {
    if (soundPreset === preset && isPlayingAudio) {
      biotopeAudio.stop();
      setIsPlayingAudio(false);
    } else {
      setSoundPreset(preset);
      biotopeAudio.play(preset);
      setIsPlayingAudio(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    biotopeAudio.setVolume(newVol);
  };

  const handleStartFlaring = () => {
    setFlaringState('running');
  };

  const handlePauseFlaring = () => {
    setFlaringState('paused');
  };

  const handleResetFlaring = () => {
    setFlaringState('idle');
    setFlaringSecondsLeft(180);
    setFlaringPhase('Lateral Display');
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#070b10] border border-cyan-900/40 rounded-2xl shadow-[0_16px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Studio Top Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-950/90 via-[#081520] to-rose-950/60 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_16px_rgba(6,182,212,0.28)] shrink-0">
              <svg
                viewBox="0 0 32 32"
                className="w-6 h-6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="bettaFinGrad" x1="12" y1="8" x2="29" y2="24" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="48%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="bettaBodyGrad" x1="5" y1="16" x2="17" y2="16" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="60%" stopColor="#1e3a8a" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                {/* Dorsal Crowntail Crest */}
                <path
                  d="M10.8 13.8C12 9.4 14.5 7.4 17 7.2L15.8 10.6L19.4 7.8L17.4 11.4L21.2 9.4L16.4 14.5Z"
                  fill="url(#bettaFinGrad)"
                  fillOpacity="0.92"
                />
                {/* Caudal Crowntail Spikes */}
                <path
                  d="M16.2 14.6L25.4 8.2L20.5 13.6L28.2 11.6L21.5 15.2L29.2 16L21.5 16.8L28.2 20.4L20.5 18.4L25.4 23.8L16.2 17.4Z"
                  fill="url(#bettaFinGrad)"
                  stroke="#fb7185"
                  strokeWidth="0.6"
                  strokeLinejoin="round"
                />
                {/* Anal Fin Curtain & Pelvic Saber */}
                <path
                  d="M11 18.2C12.5 22.8 15.8 24.8 19.8 23.6L17.8 20.4L21.2 21.8L16.4 17.4Z"
                  fill="url(#bettaFinGrad)"
                  fillOpacity="0.9"
                />
                <path
                  d="M9.8 18.2L11.8 23.8"
                  stroke="#f43f5e"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                {/* Sculpted Betta Body */}
                <path
                  d="M4.6 15.8C6.6 13.2 11.8 12.6 16.6 14.6L16.6 17.4C11.8 19.4 6.8 19 4.6 15.8Z"
                  fill="url(#bettaBodyGrad)"
                  stroke="#67e8f9"
                  strokeWidth="0.7"
                />
                {/* Eye Glint */}
                <circle cx="7.8" cy="15.4" r="0.85" fill="#020617" />
                <circle cx="7.55" cy="15.15" r="0.32" fill="#a5f3fc" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl text-white font-normal">
                  Cinematic Biotope Studio
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50 uppercase tracking-widest">
                  Live Experience
                </span>
              </div>
              <p className="text-xs text-[#9c9588] font-light">
                Immersion soundscapes, 4-tier anatomical layer scrub, and supervised IBC fin flaring
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#a8a296] hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-white/10 bg-black/20 text-xs font-mono uppercase tracking-wider overflow-x-auto">
          <button
            onClick={() => setActiveTab('soundscape')}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'soundscape'
                ? 'bg-cyan-950/90 text-cyan-200 border border-cyan-600/60 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                : 'text-[#9c9588] hover:text-white hover:bg-white/5'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>1. Biotope Soundscape</span>
          </button>

          <button
            onClick={() => setActiveTab('anatomy')}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'anatomy'
                ? 'bg-cyan-950/90 text-cyan-200 border border-cyan-600/60 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                : 'text-[#9c9588] hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Anatomical X-Ray Layer</span>
          </button>

          <button
            onClick={() => setActiveTab('flaring')}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'flaring'
                ? 'bg-cyan-950/90 text-cyan-200 border border-cyan-600/60 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                : 'text-[#9c9588] hover:text-white hover:bg-white/5'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>3. Supervised Flaring Mirror</span>
          </button>
        </div>

        {/* Studio Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* =========================================================================
              TAB 1: BIOTOPE SOUNDSCAPE
             ========================================================================= */}
          {activeTab === 'soundscape' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Audio Synthesizer Banner */}
              <div className="p-6 sm:p-8 rounded-2xl bg-black/50 border border-white/10 relative overflow-hidden backdrop-blur-md space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5" />
                      <span>Procedural Audio Engine (Web Audio API)</span>
                    </span>
                    <h3 className="font-serif text-2xl text-white">
                      Southeast Asian Peat Swamp Acoustics
                    </h3>
                    <p className="text-xs text-[#cdc7bb] font-light max-w-xl">
                      Real-time synthesized aquatic soundscapes. Zero external buffering, seamless infinite loops, calibrated to relax both the aquarium keeper and reduce territorial stress.
                    </p>
                  </div>

                  {/* Master Play/Stop Button */}
                  <button
                    onClick={handleToggleAudio}
                    className={`px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
                      isPlayingAudio
                        ? 'bg-rose-950/80 text-rose-200 border border-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                        : 'bg-cyan-500 text-black font-semibold hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Mute Soundscape</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-black" />
                        <span>Play Soundscape</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Preset Soundscape Options */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#a09a8f] border-b border-white/5 pb-2">
                    <span className="uppercase tracking-wider flex items-center gap-1.5 text-cyan-300">
                      <Music className="w-3.5 h-3.5" />
                      <span>Select Native Biotope Habitat (Click Card to Listen)</span>
                    </span>
                    <span className="hidden sm:inline text-[#787267]">
                      Web Audio Procedural Synthesis · 0 kB Download
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        id: 'stream' as SoundscapeType,
                        title: 'Peat Swamp Stream',
                        desc: 'Babbling blackwater flow & gentle current ripples',
                        tag: 'Kapuas Basin, Borneo',
                        icon: Waves,
                        accent: 'cyan'
                      },
                      {
                        id: 'rain' as SoundscapeType,
                        title: 'Canopy Monsoon Rain',
                        desc: 'Subtle jungle droplet splash with soft bass resonance',
                        tag: 'Sundaland Rainforest',
                        icon: CloudRain,
                        accent: 'emerald'
                      },
                      {
                        id: 'night' as SoundscapeType,
                        title: 'Nocturnal Mangrove',
                        desc: 'Evening breeze with high-frequency cicadas & frogs',
                        tag: 'Sumatra Coastal Marsh',
                        icon: Trees,
                        accent: 'amber'
                      },
                      {
                        id: 'underwater' as SoundscapeType,
                        title: 'Submerged Ambient',
                        desc: 'Muffled low-pass aquatic pressure & slow wave pulse',
                        tag: 'Blackwater Depth (2.5m)',
                        icon: Compass,
                        accent: 'blue'
                      },
                    ].map((preset) => {
                      const IconComp = preset.icon;
                      const isActive = soundPreset === preset.id;
                      const isCurrentlyPlaying = isActive && isPlayingAudio;

                      return (
                        <button
                          key={preset.id}
                          onClick={() => handleSelectPreset(preset.id)}
                          className={`p-4 rounded-xl text-left transition-all cursor-pointer backdrop-blur-md relative overflow-hidden group ${
                            isActive
                              ? 'bg-cyan-950/85 border-2 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/40'
                              : 'bg-black/40 border border-white/10 text-[#a09a8f] hover:text-white hover:border-white/30 hover:bg-black/60'
                          }`}
                        >
                          {/* Active Playing Equalizer Glow */}
                          {isCurrentlyPlaying && (
                            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
                          )}

                          <div className="flex items-center justify-between">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              isActive ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'bg-white/5 text-[#8c8577] group-hover:text-cyan-300'
                            }`}>
                              <IconComp className="w-4 h-4" />
                            </div>

                            {/* Equalizer animation when playing */}
                            {isCurrentlyPlaying ? (
                              <div className="flex items-center gap-1 bg-cyan-950/90 px-2 py-1 rounded border border-cyan-400/60">
                                <span className="w-1 h-3 bg-cyan-400 animate-pulse rounded-full" />
                                <span className="w-1 h-4 bg-cyan-300 animate-bounce rounded-full" />
                                <span className="w-1 h-2 bg-cyan-400 animate-pulse rounded-full" />
                                <span className="text-[10px] font-mono text-cyan-200 ml-1 font-semibold uppercase">Playing</span>
                              </div>
                            ) : (
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-[#8c8577] group-hover:text-cyan-300 group-hover:bg-cyan-950/50 transition-colors">
                                {isActive ? 'Paused' : 'Play'}
                              </span>
                            )}
                          </div>

                          <div className="font-serif text-base text-white mt-3 group-hover:text-cyan-200 transition-colors">
                            {preset.title}
                          </div>
                          
                          <div className="text-[10px] font-mono text-cyan-300/90 mt-0.5 font-medium">
                            {preset.tag}
                          </div>

                          <div className="text-[11px] text-[#b0aba0] mt-1.5 line-clamp-2 leading-relaxed font-light">
                            {preset.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                  <button
                    onClick={() => handleVolumeChange(volume === 0 ? 0.45 : 0)}
                    className="text-[#a09a8f] hover:text-white transition-colors"
                  >
                    {volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-full max-w-xs accent-cyan-400 cursor-pointer"
                  />
                  <span className="font-mono text-xs text-[#a09a8f]">
                    {Math.round(volume * 100)}% Master Volume
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 2: INTERACTIVE ANATOMICAL X-RAY & LAYER SCRUB
             ========================================================================= */}
          {activeTab === 'anatomy' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="p-6 sm:p-8 rounded-2xl bg-black/50 border border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Ichthyological Morphology Visualizer</span>
                    </span>
                    <h3 className="font-serif text-2xl text-white">
                      Anatomical Cross-Section &amp; Vulnerability Pins
                    </h3>
                    <p className="text-xs text-[#cdc7bb] font-light max-w-xl">
                      Drag the depth slider to peel away biological strata: from external guanine crystal iridophores down into the labyrinth breathing organ and osteological skeleton.
                    </p>
                  </div>

                  {/* Active Layer Label */}
                  <div className="px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-700/50 text-right">
                    <span className="text-[10px] font-mono uppercase text-[#a09a8f] block">Current Strata</span>
                    <span className="text-sm font-medium text-cyan-200">
                      {anatomyLayer === 0 && 'Layer 1: Epidermis & Iridophore Scales'}
                      {anatomyLayer === 1 && 'Layer 2: Fin Ray Architecture & Muscles'}
                      {anatomyLayer === 2 && 'Layer 3: Visceral Organs & Labyrinth'}
                      {anatomyLayer === 3 && 'Layer 4: Osteology & Cranial Skeleton'}
                    </span>
                  </div>
                </div>

                {/* 4-Step Scrub Slider */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-xs font-mono text-[#a09a8f]">
                    <span className={anatomyLayer === 0 ? 'text-cyan-300 font-bold' : ''}>01. Scales</span>
                    <span className={anatomyLayer === 1 ? 'text-cyan-300 font-bold' : ''}>02. Fin Rays</span>
                    <span className={anatomyLayer === 2 ? 'text-cyan-300 font-bold' : ''}>03. Labyrinth/Viscera</span>
                    <span className={anatomyLayer === 3 ? 'text-cyan-300 font-bold' : ''}>04. Skeleton</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="1"
                    value={anatomyLayer}
                    onChange={(e) => {
                      const layer = Number(e.target.value);
                      setAnatomyLayer(layer);
                      if (layer === 3) {
                        setSelectedPin('skeleton');
                      } else if (layer === 2 && (!selectedPin || selectedPin === 'skeleton')) {
                        setSelectedPin('labyrinth');
                      }
                    }}
                    className="w-full accent-cyan-400 cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                </div>

                {/* High-Resolution Specimen & Per-Part Anatomical X-Ray Image Inspector */}
                <div className="space-y-3">
                  <div className="relative w-full h-[420px] sm:h-[480px] rounded-2xl bg-[#03060a] border border-cyan-900/40 overflow-hidden shadow-2xl flex items-center justify-center">
                    {/* Diagnostic Grid Backdrop */}
                    <div
                      className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    />

                    {/* Active Anatomical Plate Image */}
                    {anatomyLayer <= 1 ? (
                      <div className="relative w-full h-full flex items-center justify-center bg-[#020407]">
                        <img
                          src={SPECIMEN_BETTA_IMAGE}
                          alt="Red and Black Crowntail Betta external morphology specimen"
                          referrerPolicy="no-referrer"
                          className={`max-h-full max-w-full object-contain transition-all duration-500 ${
                            anatomyLayer === 1 ? 'scale-105 contrast-125 saturate-125' : ''
                          }`}
                        />

                        {/* Interactive External Specimen Hotspots */}
                        <button
                          onClick={() => {
                            setAnatomyLayer(2);
                            setSelectedPin('labyrinth');
                          }}
                          title="Inspect Suprabranchial Labyrinth"
                          className="absolute top-[42%] left-[31%] px-2.5 py-1 rounded-md bg-black/80 border border-rose-500/60 text-[10px] font-mono text-rose-200 hover:bg-rose-950/90 cursor-pointer transition-colors"
                        >
                          Labyrinth Cavity
                        </button>
                        <button
                          onClick={() => {
                            setAnatomyLayer(2);
                            setSelectedPin('gills');
                          }}
                          title="Inspect Flared Operculum & Branchial Arches"
                          className="absolute top-[60%] left-[21%] px-2.5 py-1 rounded-md bg-black/80 border border-cyan-500/60 text-[10px] font-mono text-cyan-200 hover:bg-cyan-950/90 cursor-pointer transition-colors"
                        >
                          Opercular Gill Beard
                        </button>
                        <button
                          onClick={() => {
                            setAnatomyLayer(3);
                            setSelectedPin('skeleton');
                          }}
                          title="Inspect Crowntail Ray Osteology"
                          className="absolute top-[36%] right-[18%] px-2.5 py-1 rounded-md bg-black/80 border border-rose-400/60 text-[10px] font-mono text-rose-200 hover:bg-rose-950/90 cursor-pointer transition-colors"
                        >
                          Crowntail Fin Rays → X-Ray
                        </button>
                      </div>
                    ) : (
                      (() => {
                        const activeKey =
                          anatomyLayer === 3
                            ? 'skeleton'
                            : selectedPin && ANATOMY_PLATES[selectedPin]
                              ? selectedPin
                              : 'labyrinth';
                        const plate = ANATOMY_PLATES[activeKey] || ANATOMY_PLATES.labyrinth;
                        return (
                          <div className="relative w-full h-full flex items-center justify-center bg-[#03060a]">
                            <img
                              key={plate.image}
                              src={plate.image}
                              alt={plate.alt}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain animate-in fade-in duration-300"
                            />
                            <div className="absolute top-4 left-4 bg-black/85 border border-cyan-700/50 rounded-xl px-3.5 py-2 space-y-0.5">
                              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                                {plate.tag}
                              </div>
                              <div className="font-serif text-base text-white">{plate.label}</div>
                            </div>
                          </div>
                        );
                      })()
                    )}

                    {/* Top Right Specimen / Mode Indicator */}
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-lg bg-black/80 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-cyan-200">
                      {anatomyLayer === 0 && 'External Epidermis · Red & Black Crowntail'}
                      {anatomyLayer === 1 && 'Dorsal & Caudal Fin Ray Morphology'}
                      {anatomyLayer === 2 && 'Visceral Cutaway Plate'}
                      {anatomyLayer === 3 && 'Radiographic Skeletal X-Ray'}
                    </div>
                  </div>

                  {/* Visual Thumbnail Strip for All Anatomical X-Ray Parts */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {Object.entries(ANATOMY_PLATES).map(([key, plate]) => {
                      const isActive =
                        (anatomyLayer === 3 && key === 'skeleton') ||
                        (anatomyLayer >= 2 && selectedPin === key);
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedPin(key);
                            setAnatomyLayer(key === 'skeleton' ? 3 : 2);
                          }}
                          className={`group relative rounded-xl overflow-hidden border text-left transition-all cursor-pointer bg-[#04080d] ${
                            isActive
                              ? 'border-cyan-400 ring-1 ring-cyan-400/60'
                              : 'border-white/10 hover:border-cyan-600/60 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <div className="aspect-video w-full overflow-hidden bg-black">
                            <img
                              src={plate.image}
                              alt={plate.label}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="px-2 py-1.5 text-[10px] font-mono truncate text-[#cdc7bb] group-hover:text-white">
                            {plate.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Anatomical Detail Pin Card */}
                <div className="p-5 rounded-xl bg-black/45 border border-cyan-800/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-serif text-lg text-white font-medium flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      {selectedPin === 'labyrinth' && 'The Suprabranchial Labyrinth Organ'}
                      {selectedPin === 'swim-bladder' && 'Hydrostatic Swim Bladder Chamber'}
                      {selectedPin === 'heart' && 'Two-Chambered Cardiovascular Core'}
                      {selectedPin === 'stomach' && 'Obligate Carnivore Gastrointestinal Tract'}
                      {selectedPin === 'gills' && 'Opercular Plates & Branchial Gill Arches'}
                      {selectedPin === 'skeleton' && 'Osteology: Cranium & 28-Vertebrae Column'}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                      Veterinary Pathology
                    </span>
                  </div>

                  {selectedPin === 'labyrinth' && (
                    <div className="space-y-2 text-xs text-[#cdc7bb] font-light leading-relaxed">
                      <p>
                        A specialized folded bone plate (epibranchial) covered in highly vascularized mucosal tissue. Allows bettas to absorb atmospheric oxygen directly from the surface, adapting them to stagnant, low-oxygen peat marshes.
                      </p>
                      <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-200 text-[11px] font-mono flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                        <span><strong>Clinical Risk:</strong> Bettas deprived of access to warm humid surface air will drown. Never seal tanks airtight or allow cold drafts across the water surface.</span>
                      </div>
                    </div>
                  )}

                  {selectedPin === 'swim-bladder' && (
                    <div className="space-y-2 text-xs text-[#cdc7bb] font-light leading-relaxed">
                      <p>
                        A thin-walled dorsal gas bladder regulating neutral buoyancy. Extending along the spinal column, it allows the fish to maintain swimming depth effortlessly.
                      </p>
                      <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-200 text-[11px] font-mono flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                        <span><strong>Clinical Risk:</strong> Dry food expansion causes gastrointestinal impaction pressing against this chamber, leading to Swim Bladder Disorder (floating sideways or sinking).</span>
                      </div>
                    </div>
                  )}

                  {selectedPin === 'heart' && (
                    <div className="space-y-2 text-xs text-[#cdc7bb] font-light leading-relaxed">
                      <p>
                        Pumps single-loop venous blood directly through the gill arches and labyrinth organ for reoxygenation. Highly sensitive to cold water below 75°F.
                      </p>
                    </div>
                  )}

                  {selectedPin === 'stomach' && (
                    <div className="space-y-2 text-xs text-[#cdc7bb] font-light leading-relaxed">
                      <p>
                        Strict carnivore intestine optimized exclusively for insect chitin, mosquito larvae, and crustaceans. Completely lacks enzymes to break down terrestrial plant matter or corn fillers.
                      </p>
                    </div>
                  )}

                  {selectedPin === 'gills' && (
                    <div className="space-y-2 text-xs text-[#cdc7bb] font-light leading-relaxed">
                      <p>
                        Bilateral branchial gill arches sheltered by protective opercular bone plates. Beneath the lower edge lies the branchiostegal membrane (the "beard"), which swings forward during flaring to increase visual body profile.
                      </p>
                    </div>
                  )}

                  {selectedPin === 'skeleton' && (
                    <div className="space-y-2 text-xs text-[#cdc7bb] font-light leading-relaxed">
                      <p>
                        Consists of an articulated neurocranium, superior-hinged jaws, and a 26-to-28 vertebra spinal axis terminating in the fan-like hypural plate that anchors the Crowntail caudal ray spines.
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        setSelectedPin('labyrinth');
                        setAnatomyLayer(2);
                      }}
                      className={`px-3 py-1 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                        selectedPin === 'labyrinth' && anatomyLayer >= 2 ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-500/50' : 'bg-white/5 text-[#a09a8f] hover:text-white'
                      }`}
                    >
                      Labyrinth
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPin('swim-bladder');
                        setAnatomyLayer(2);
                      }}
                      className={`px-3 py-1 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                        selectedPin === 'swim-bladder' && anatomyLayer >= 2 ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-500/50' : 'bg-white/5 text-[#a09a8f] hover:text-white'
                      }`}
                    >
                      Swim Bladder
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPin('heart');
                        setAnatomyLayer(2);
                      }}
                      className={`px-3 py-1 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                        selectedPin === 'heart' && anatomyLayer >= 2 ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-500/50' : 'bg-white/5 text-[#a09a8f] hover:text-white'
                      }`}
                    >
                      Heart
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPin('stomach');
                        setAnatomyLayer(2);
                      }}
                      className={`px-3 py-1 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                        selectedPin === 'stomach' && anatomyLayer >= 2 ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-500/50' : 'bg-white/5 text-[#a09a8f] hover:text-white'
                      }`}
                    >
                      Digestive Tract
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPin('gills');
                        setAnatomyLayer(2);
                      }}
                      className={`px-3 py-1 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                        selectedPin === 'gills' && anatomyLayer >= 2 ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-500/50' : 'bg-white/5 text-[#a09a8f] hover:text-white'
                      }`}
                    >
                      Gills & Beard
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPin('skeleton');
                        setAnatomyLayer(3);
                      }}
                      className={`px-3 py-1 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                        selectedPin === 'skeleton' && anatomyLayer >= 2 ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-500/50' : 'bg-white/5 text-[#a09a8f] hover:text-white'
                      }`}
                    >
                      Skeleton & Spine
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 3: SUPERVISED FLARING WORKOUT & MIRROR TOOL
             ========================================================================= */}
          {activeTab === 'flaring' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="p-6 sm:p-8 rounded-2xl bg-black/50 border border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-cyan-400" />
                      <span>IBC Supervised Exercise Protocol</span>
                    </span>
                    <h3 className="font-serif text-2xl text-white">
                      Territorial Mirror Workout Studio
                    </h3>
                    <p className="text-xs text-[#cdc7bb] font-light max-w-xl">
                      Hold this screen against your aquarium glass. The pulsing rival silhouette stimulates healthy fin unfurling, opercular expansion, and prevents ray stiffness.
                    </p>
                  </div>

                  {/* Timer Display */}
                  <div className="flex items-center gap-3">
                    <div className="text-center px-5 py-3 rounded-xl bg-black/60 border border-cyan-800/50 shadow-inner">
                      <div className="text-[10px] font-mono text-[#a09a8f] uppercase">Session Timer</div>
                      <div className="font-mono text-3xl font-bold text-cyan-300">
                        {formatTimer(flaringSecondsLeft)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated 3D Mirror Workout Arena */}
                <div
                  className="relative w-full h-[420px] sm:h-[480px] rounded-2xl border border-cyan-700/40 overflow-hidden shadow-2xl transition-all duration-300"
                  style={{
                    backgroundColor: `rgba(2, 6, 12, ${mirrorBrightness})`,
                  }}
                >
                  {/* Flaring Phase Indicator */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-200 bg-[#061822]/90 px-3 py-1 rounded border border-cyan-700/50">
                      Phase: {flaringPhase}
                    </span>
                  </div>

                  {/* Controls Overlay: Flaring Trigger & Reflection Contrast */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    <button
                      onClick={() => setInteractiveFlaring((prev) => !prev)}
                      className={`text-[11px] font-mono px-3 py-1 rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
                        interactiveFlaring || flaringState === 'running'
                          ? 'bg-rose-950/95 text-rose-200 border-rose-500/70 shadow-lg shadow-rose-900/40'
                          : 'bg-[#060a10]/90 text-cyan-300 border-cyan-700/50 hover:bg-black'
                      }`}
                    >
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      <span>{interactiveFlaring || flaringState === 'running' ? 'Flaring Active' : 'Toggle Flare Stance'}</span>
                    </button>

                    <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#a09a8f] bg-[#060a10]/90 px-3 py-1 rounded border border-white/10">
                      <span>Mirror:</span>
                      <button
                        onClick={() => setMirrorBrightness(prev => (prev === 1 ? 0.75 : 1))}
                        className="text-cyan-300 hover:text-white cursor-pointer underline"
                      >
                        {mirrorBrightness === 1 ? 'High' : 'Subtle'}
                      </button>
                    </div>
                  </div>

                  {/* Hyper-Realistic 3D Animated Red & Black Crowntail Betta */}
                  <BettaFish3D
                    flaring={flaringState === 'running' || interactiveFlaring}
                    lightingMode={lightingMode}
                  />

                  {/* Bottom Status Caption */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 pointer-events-none">
                    <div className="bg-[#060a10]/90 px-3.5 py-1.5 rounded-lg border border-white/10 text-xs text-[#cdc7bb] font-mono">
                      {flaringState === 'running' || interactiveFlaring
                        ? 'Opercular gills flared (+38°) · Black beard expanded · Crimson Crowntail 200° halo'
                        : 'Cruising posture · Tap "Toggle Flare Stance" or start 3-Min workout to flare'}
                    </div>
                    <div className="text-[10px] font-mono text-cyan-300 bg-[#051822]/90 px-2.5 py-1 rounded border border-cyan-800/40">
                      Drag to orbit 360° · Scroll to zoom
                    </div>
                  </div>
                </div>

                {/* Workout Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    {flaringState !== 'running' ? (
                      <button
                        onClick={handleStartFlaring}
                        className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                      >
                        <Play className="w-4 h-4 fill-black" />
                        <span>{flaringState === 'paused' ? 'Resume Workout' : 'Start 3-Min Flaring'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={handlePauseFlaring}
                        className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                      >
                        <Pause className="w-4 h-4" />
                        <span>Pause Session</span>
                      </button>
                    )}

                    <button
                      onClick={handleResetFlaring}
                      className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#cdc7bb] font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer border border-white/10 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>

                  {/* Strict Veterinary Timing Warning */}
                  <div className="flex items-center gap-2 text-[11px] font-mono text-rose-300 bg-rose-950/50 px-3.5 py-2 rounded-xl border border-rose-500/40">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>IBC Standard: Maximum 3–5 min daily. Never leave mirror unattended.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Studio Footer Bar */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#8c8577]">
          <div className="flex items-center gap-4">
            <span>Audio: Web Audio API Active</span>
            <span>·</span>
            <span>Lighting: {lightingMode === 'sunlight' ? 'Canopy Golden Hour' : 'Midnight Lunar'}</span>
            <span>·</span>
            <span>IBC SMP Standards</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close Studio
          </button>
        </div>
      </div>
    </div>
  );
};
