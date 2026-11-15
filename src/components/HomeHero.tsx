import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  BookOpen,
  ChevronDown,
  Layers,
  Heart,
  Droplets,
  Wind,
  Compass,
  Calendar,
  Sparkles,
  Award,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { NavTab } from './Navbar.tsx';
import { AquaticParticles } from './AquaticParticles.tsx';
import {
  WILD_BETTA_SPECIES,
  ORNAMENTAL_BETTA_VARIETIES,
  SPECIES_COMPLEXES
} from '../data/varieties.ts';
import { HEALTH_CONDITIONS } from '../data/health.ts';
import { WATER_PARAMETERS } from '../data/careGuides.ts';
import { KNOWLEDGE_ARTICLES } from '../data/articles.ts';

interface HomeHeroProps {
  onNavigate: (tab: NavTab, targetId?: string, subSection?: 'wild' | 'complexes' | 'ornamental') => void;
  onOpenSearch: () => void;
  onOpenStudio?: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onNavigate, onOpenSearch, onOpenStudio }) => {
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0);

  const TIMELINE_EVENTS = [
    {
      year: 'Ancient',
      era: 'Evolutionary Origins in Sundaland',
      title: 'Peat Swamp Specialization',
      description: 'The ancestral lineage of the genus Betta diverges in ancient Sundaland river systems. Adapting to stagnant, low-oxygen peat marshes and seasonal monsoon droughts, ancestral bettas evolve the labyrinth organ, enabling obligate atmospheric respiration.',
      highlight: 'Emergence of the labyrinth organ & split into bubble nesters and paternal mouthbrooders.'
    },
    {
      year: '1800s',
      era: 'Kingdom of Siam (Thailand)',
      title: 'Traditional Keeping & "Pla Kat"',
      description: 'Rural children and villagers capture short-finned ancestral wild bettas (Betta splendens) from flooded rice paddies for territorial display matches. Known in Thai as Pla Kat ("biting fish"), the pastime captures royal attention under King Rama III (1787–1851), who establishes licensed display venues and gifts specimens to Western zoologists.',
      highlight: 'First systematic selective breeding for territorial vigor and stamina.'
    },
    {
      year: '1892',
      era: 'Western Ichthyology',
      title: 'Scientific Classification & Export',
      description: 'Dr. Theodore Cantor originally describes the species in 1849 as Macropodus pugnax. In 1910, British ichthyologist Charles Tate Regan formally reclassifies the species as Betta splendens. German and French aquarists successfully spawn the fish in Europe.',
      highlight: 'Formal binomial Betta splendens Regan, 1910 established in London.'
    },
    {
      year: '1927',
      era: 'Europe & North America',
      title: 'The Veiltail (VT) Mutation',
      description: 'In 1927, Frank Locke of San Francisco imports an extraordinary specimen with elongated, drooping caudal finnage bred in Germany, initially thought to be a new species ("Betta cambodia"). This establishes the classic Veiltail mutation and sparks the global hobby.',
      highlight: 'First long-finned domestic show mutation in modern fishkeeping.'
    },
    {
      year: '1960s',
      era: 'Standardization Era',
      title: 'Double Tail & Founding of the IBC',
      description: 'In 1960, the Double Tail (DT) mutation arises in Germany, featuring a duplicated caudal fin and widened dorsal. In 1967, Warren Young and dedicated American breeders establish the International Betta Congress (IBC) to codify formal show standards and conservation genetics.',
      highlight: 'IBC established: formal judging standards & Species Maintenance Programme (SMP).'
    },
    {
      year: '1980s',
      era: 'French Show Circuit',
      title: 'The Halfmoon (HM) Breakthrough',
      description: 'French breeder Guy Delaval and German aquarists Rajiv Masillamoni and Laurent Chenot cross selected show specimens over generations, achieving the Holy Grail of betta finnage: a full 180-degree spread caudal fin resembling a pristine half moon.',
      highlight: '180-degree straight caudal margin achieved, redefining international show standards.'
    },
    {
      year: '1997',
      era: 'Jakarta, Indonesia',
      title: 'Ahmad Yusuf Breeds the Crowntail (CT)',
      description: 'Indonesian breeder Ahmad Yusuf develops a striking mutation where the fin webbing is reduced by 33% to 50%, leaving long, spiky ray extensions resembling an inverted royal crown. The Crowntail becomes a worldwide sensation.',
      highlight: 'Ray extension genetics revolutionized ornamental fin aesthetics.'
    },
    {
      year: 'Modern Era',
      era: '21st Century Genetics & Conservation',
      title: 'Color Morphs & Wild Habitat Protection',
      description: 'The discovery of the "jumping" transposon gene sparks Koi Galaxy, Marble, and metallic Dragon Scale varieties. Concurrently, the alarming destruction of Southeast Asian peat swamps elevates bettaIQ’s mission: protecting wild taxa and ending commercial cup neglect.',
      highlight: 'Dual focus: advanced pigmentation genetics and wild species conservation.'
    }
  ];

  return (
    <div className="relative isolate space-y-28 sm:space-y-36 pb-32">

      {/* Fixed Midnight Blackwater Ambient Background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(3, 6, 10, 0.45) 0%,
              rgba(3, 6, 10, 0.65) 45%,
              rgba(2, 5, 8, 0.92) 100%
            ),
            url('${import.meta.env.BASE_URL}assets/home/hero_black_crowntail.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-transparent">

        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={`${import.meta.env.BASE_URL}assets/home/hero_black_crowntail.jpg`}
            alt="Majestic Black Crowntail Betta fish with comb rays swimming right behind bettaIQ"
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.12]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#06090c] via-transparent to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06090c]/70 via-transparent to-[#06090c]/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#06090c]/20 to-[#06090c]/85" />
        </div>

        <AquaticParticles density={40} className="z-[2] opacity-65" />

        {/* Top Status Bar */}
        <div className="relative z-10 pt-16 sm:pt-20 px-6 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#a8a296]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            <span className="text-[#e5e0d4] font-medium tracking-wider">
              {WILD_BETTA_SPECIES.length} Wild Species · 13 IBC Complexes · {ORNAMENTAL_BETTA_VARIETIES.length} Show Morphs
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[#8a8477] text-[11px]">
            <span>IBC SMP Standards</span>
            <span>·</span>
            <span>Merck Vet Manual Grounded</span>
            <span>·</span>
            <span>Non-Commercial Archive</span>
          </div>
        </div>

        {/* Hero Typography */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-8 my-auto py-12">

          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-cyan-300 border border-cyan-800/40 bg-[#090e13]/70 backdrop-blur-md rounded">
            <span>Natural History · Veterinary Science · Taxonomy</span>
          </div>

          <div className="space-y-3">
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-9xl font-light tracking-tight text-[#f7f5f0] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] [text-shadow:_0_2px_24px_rgba(0,0,0,0.95),_0_0_60px_rgba(6,182,212,0.18)]">
              betta<span className="italic font-normal text-cyan-400">IQ</span>
            </h1>

            <p className="font-serif italic text-2xl sm:text-3xl text-[#d4cfc5] tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              “Know Better. Care Smarter.”
            </p>
          </div>

          <p className="font-sans text-base sm:text-lg text-[#cdc7bb] max-w-2xl mx-auto leading-relaxed font-light">
            The definitive ichthyological knowledge base and veterinary triage sanctuary dedicated exclusively to the genus <em>Betta</em>.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-2">
            <div
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-5 py-3.5 bg-[#070b10]/85 hover:bg-[#0c1219]/95 backdrop-blur-md border border-cyan-900/40 hover:border-cyan-600/60 rounded-xl cursor-pointer transition-all shadow-2xl group"
            >
              <div className="flex items-center gap-3 text-[#989286] text-sm font-sans">
                <Search className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
                <span className="group-hover:text-[#f5f3ee] transition-colors">
                  Search wild species, complexes, symptoms, treatments...
                </span>
              </div>

              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                ⌘K
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">

            <button
              onClick={() => onNavigate('explore')}
              className="px-8 py-3.5 bg-[#f5f3ee] hover:bg-white text-[#06090c] text-xs font-semibold uppercase tracking-widest rounded transition-all cursor-pointer shadow-lg hover:shadow-cyan-500/20"
            >
              Explore Scientific Encyclopedia
            </button>

            <button
              onClick={() => onNavigate('health')}
              className="px-8 py-3.5 bg-[#102228]/90 hover:bg-[#152e37] text-cyan-200 border border-cyan-800/50 text-xs font-semibold uppercase tracking-widest rounded transition-all cursor-pointer backdrop-blur-sm"
            >
              Health & Diseases
            </button>

            <button
              onClick={() => onNavigate('symptom-checker')}
              className="px-8 py-3.5 bg-[#12261e]/90 hover:bg-[#1a352a] text-[#d6ede2] border border-[#274f3d] text-xs font-semibold uppercase tracking-widest rounded transition-all cursor-pointer backdrop-blur-sm"
            >
              Symptom Explorer
            </button>

            {onOpenStudio && (
              <button
                onClick={onOpenStudio}
                className="px-8 py-3.5 bg-cyan-950/90 hover:bg-cyan-900 text-cyan-200 border border-cyan-500/60 text-xs font-semibold uppercase tracking-widest rounded transition-all cursor-pointer backdrop-blur-sm flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M8.5 10.2C9.8 6.5 12.2 5.2 14.5 5.4L13.3 8.2L16.2 6.4L13.5 10.6Z" fill="#fb7185" />
                  <path d="M13 10.8L20.5 5.8L16.5 10.2L22 9.2L17 11.6L22.5 12L17 12.6L22 14.8L16.5 13.8L20.5 18.2L13 13.2Z" fill="#f43f5e" />
                  <path d="M8.8 13.8C10 17.5 12.8 19 16 18L14.2 15.2L16.8 16.4L13.2 13Z" fill="#fb7185" />
                  <path d="M2.5 12C4.6 9.8 9.2 9.4 13.4 10.9V13.1C9.2 14.6 4.6 14.2 2.5 12Z" fill="#38bdf8" />
                  <circle cx="5.4" cy="11.6" r="0.7" fill="#06121a" />
                </svg>

                <span>Biotope Studio</span>
              </button>
            )}
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="relative z-10 pb-8 text-center">
          <div className="inline-flex flex-col items-center gap-1.5 text-[#8c8577] hover:text-[#f5f3ee] transition-colors cursor-pointer text-xs font-mono uppercase tracking-widest">
            <span>Scroll to Discover Biology & Origins</span>
            <ChevronDown className="w-4 h-4 text-cyan-400 opacity-75" />
          </div>
        </div>
      </section>

      {/* 2. BIOLOGICAL CHARACTERISTICS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400">
            <Wind className="w-3.5 h-3.5" />
            <span>Evolutionary Physiology & Ecology</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#f5f3ee] tracking-tight leading-tight">
            Unique Biological Characteristics of the Genus <em>Betta</em>
          </h2>

          <p className="text-base text-[#b8b2a5] leading-relaxed font-light">
            Evolved across the warm, dense tropical wetlands of Southeast Asia, bettas possess anatomical marvels found in few other vertebrates. Understanding their physiology is the key to preventing captivity neglect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="p-7 rounded-xl bg-[#090e13] border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 space-y-4 shadow-lg group">
            <div className="w-10 h-10 rounded-lg bg-[#0e1d27] border border-[#1e3b50] flex items-center justify-center text-cyan-300">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#f5f3ee] group-hover:text-cyan-300 transition-colors">
              The Labyrinth Organ
            </h3>
            <p className="text-xs text-[#b8b2a5] font-light leading-relaxed">
              Derived from the first epibranchial bone, this vascularized suprabranchial organ allows bettas to breathe atmospheric air directly from the water surface. Adult bettas are obligate air breathers: they will drown if deprived of warm surface air.
            </p>
          </div>

          <div className="p-7 rounded-xl bg-[#090e13] border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 space-y-4 shadow-lg group">
            <div className="w-10 h-10 rounded-lg bg-[#11241a] border border-[#214734] flex items-center justify-center text-emerald-300">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#f5f3ee] group-hover:text-emerald-300 transition-colors">
              Dual Spawning Modes
            </h3>
            <p className="text-xs text-[#b8b2a5] font-light leading-relaxed">
              While domestic <em>Betta splendens</em> build surface bubble nests, over 70% of wild Betta species are paternal mouthbrooders (e.g. <em>Betta macrostoma</em>), brooding eggs in the male’s buccal cavity to survive swift flowing forest streams.
            </p>
          </div>

          <div className="p-7 rounded-xl bg-[#090e13] border border-white/[0.08] hover:border-purple-500/40 transition-all duration-300 space-y-4 shadow-lg group">
            <div className="w-10 h-10 rounded-lg bg-[#191322] border border-[#39294f] flex items-center justify-center text-purple-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#f5f3ee] group-hover:text-purple-300 transition-colors">
              Multi-Layered Pigmentation
            </h3>
            <p className="text-xs text-[#b8b2a5] font-light leading-relaxed">
              Betta skin consists of 4 distinct color layers: top iridescent layer (guanine crystals in iridophores), black melanin layer, red erythrophore layer, and yellow xanthophore base. Mutations in these layers yield metallic, marble, and dragon scales.
            </p>
          </div>

          <div className="p-7 rounded-xl bg-[#090e13] border border-white/[0.08] hover:border-amber-500/40 transition-all duration-300 space-y-4 shadow-lg group">
            <div className="w-10 h-10 rounded-lg bg-[#22180e] border border-[#48331d] flex items-center justify-center text-amber-300">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#f5f3ee] group-hover:text-amber-300 transition-colors">
              Peat Swamp Adaptation
            </h3>
            <p className="text-xs text-[#b8b2a5] font-light leading-relaxed">
              Native to Sundaland floodplains, wild bettas inhabit ultra-soft, acidic blackwater stained dark brown by decaying leaf litter. Humic acids and tannins protect their mucosal barrier and suppress bacterial pathogens naturally.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HISTORICAL TIMELINE */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>Chronicles of Domestication & Genetics</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#f5f3ee] tracking-tight leading-tight">
            The Historical Timeline of the Betta Fish
          </h2>

          <p className="text-base text-[#b8b2a5] leading-relaxed font-light">
            Follow the journey of <em>Betta splendens</em> from its ancestral habitat in Southeast Asian floodplains, through royal Thai sporting culture, to modern show breeding and urgent 21st-century conservation.
          </p>
        </div>

        <div className="space-y-8">

          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-white/[0.08]">
            {TIMELINE_EVENTS.map((evt, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTimelineIdx(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                  activeTimelineIdx === idx
                    ? 'bg-cyan-950/80 text-cyan-200 border border-cyan-700/60 shadow-lg'
                    : 'bg-[#090d12] text-[#8c8577] hover:text-[#d4cfc5] border border-white/[0.04]'
                }`}
              >
                <span>{evt.year}</span>
                <span className="hidden sm:inline text-[11px] opacity-70 ml-2">· {evt.era.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="p-8 sm:p-12 rounded-2xl bg-[#090d12] border border-cyan-900/30 shadow-2xl relative overflow-hidden">
            <div className="space-y-4 max-w-3xl relative z-10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-cyan-950/60 border border-cyan-800/50 text-xs font-mono uppercase text-cyan-300 font-semibold">
                  {TIMELINE_EVENTS[activeTimelineIdx].year} · {TIMELINE_EVENTS[activeTimelineIdx].era}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#f5f3ee]">
                {TIMELINE_EVENTS[activeTimelineIdx].title}
              </h3>

              <p className="text-sm sm:text-base text-[#cdc7bb] font-light leading-relaxed">
                {TIMELINE_EVENTS[activeTimelineIdx].description}
              </p>

              <div className="p-4 rounded-lg bg-[#060a0e] border border-cyan-950/80 text-xs text-cyan-200 font-mono">
                <span className="text-[#8c8577] block text-[10px] uppercase">Historical Impact:</span>
                {TIMELINE_EVENTS[activeTimelineIdx].highlight}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/[0.06] mt-8 text-xs font-mono uppercase tracking-wider text-[#8c8577]">
              <span>Milestone {activeTimelineIdx + 1} of {TIMELINE_EVENTS.length}</span>

              <div className="flex items-center gap-3">
                <button
                  disabled={activeTimelineIdx === 0}
                  onClick={() => setActiveTimelineIdx(prev => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.1] disabled:opacity-30 cursor-pointer"
                >
                  Previous
                </button>

                <button
                  disabled={activeTimelineIdx === TIMELINE_EVENTS.length - 1}
                  onClick={() => setActiveTimelineIdx(prev => Math.min(TIMELINE_EVENTS.length - 1, prev + 1))}
                  className="px-3 py-1.5 rounded bg-cyan-950/60 text-cyan-200 hover:bg-cyan-900/80 disabled:opacity-30 cursor-pointer border border-cyan-800/40"
                >
                  Next Era
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPLORE SECTIONS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9dc4b1]">
              Taxonomic Catalogue Architecture
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#f5f3ee]">
              Explore the Scientific Encyclopedia
            </h2>
          </div>

          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-semibold uppercase tracking-widest text-cyan-300 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>Open Complete Repository</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1: Wild Species */}
          <div
            onClick={() => onNavigate('explore', undefined, 'wild')}
            className="group rounded-2xl overflow-hidden bg-[#090d12] border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-[#05070a] relative">
                <img
                  src={new URL('../assets/images/wild_betta_macrostoma_1793166763135.jpg', import.meta.url).href}
                  alt="Betta macrostoma Spotfin Betta"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />

                <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-emerald-950/80 border border-emerald-800/50 rounded text-[10px] font-mono uppercase text-emerald-300">
                  {WILD_BETTA_SPECIES.length} Recognized Taxa
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif text-2xl text-[#f5f3ee] group-hover:text-emerald-300 transition-colors">
                  1. Wild Betta Species
                </h3>

                <p className="text-xs text-[#b8b2a5] font-light leading-relaxed">
                  Scientifically classified wild taxa with binomial authorities, native Southeast Asian ranges, IUCN Red List assessments, and peat swamp ecology.
                </p>

                <div className="text-[11px] font-mono text-[#8c8577] pt-2 border-t border-white/[0.06]">
                  Examples: <em>B. macrostoma, B. imbellis, B. channoides</em>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-white/[0.06] bg-[#070b0e] flex items-center justify-between text-xs font-mono uppercase tracking-wider text-emerald-300 group-hover:text-white transition-colors">
              <span>Explore Wild Taxa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Species Complexes */}
          <div
            onClick={() => onNavigate('explore', undefined, 'complexes')}
            className="group rounded-2xl overflow-hidden bg-[#090d12] border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-[#05070a] relative">
                <img
                  src={new URL('../assets/images/wild_betta_imbellis_1793166762071.jpg', import.meta.url).href}
                  alt="Wild Betta imbellis Crescent Betta"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />

                <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-cyan-950/80 border border-cyan-800/50 rounded text-[10px] font-mono uppercase text-cyan-300">
                  13 IBC Groups
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif text-2xl text-[#f5f3ee] group-hover:text-cyan-300 transition-colors">
                  2. Species Complexes
                </h3>

                <p className="text-xs text-[#b8b2a5] font-light leading-relaxed">
                  The 13 phylogenetic lineages recognized by the International Betta Congress (IBC), covering morphology, breeding strategies, and biogeographical cores.
                </p>

                <div className="text-[11px] font-mono text-[#8c8577] pt-2 border-t border-white/[0.06]">
                  Groups: <em>splendens, coccina, unimaculata, pugnax...</em>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-white/[0.06] bg-[#070b0e] flex items-center justify-between text-xs font-mono uppercase tracking-wider text-cyan-300 group-hover:text-white transition-colors">
              <span>View 13 Complexes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Domestic Varieties */}
          <div
            onClick={() => onNavigate('explore', undefined, 'ornamental')}
            className="group rounded-2xl overflow-hidden bg-[#090d12] border border-white/[0.08] hover:border-indigo-500/40 transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-[#05070a] relative">
                <img
                  src={new URL('../assets/images/hero_betta_halfmoon_1793164844961.jpg', import.meta.url).href}
                  alt="Halfmoon Betta splendens"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />

                <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-indigo-950/80 border border-indigo-800/50 rounded text-[10px] font-mono uppercase text-indigo-300">
                  {ORNAMENTAL_BETTA_VARIETIES.length} Show Morphs
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif text-2xl text-[#f5f3ee] group-hover:text-indigo-300 transition-colors">
                  3. Domestic Varieties
                </h3>

                <p className="text-xs text-[#b8b2a5] font-light leading-relaxed">
                  Ornamental fin forms (Halfmoon, Crowntail, Plakat, Veiltail) and color/pattern genetics (Koi, Marble, Dragon Scale) of <em>Betta splendens</em>.
                </p>

                <div className="text-[11px] font-mono text-[#8c8577] pt-2 border-t border-white/[0.06]">
                  Morphs: <em>Halfmoon, Crowntail, Koi Galaxy, Dragon Scale</em>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-white/[0.06] bg-[#070b0e] flex items-center justify-between text-xs font-mono uppercase tracking-wider text-indigo-300 group-hover:text-white transition-colors">
              <span>Explore Show Morphs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. HEALTH & DISEASES PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Veterinary Pathology & Triage</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#f5f3ee]">
              Health, Diseases & Clinical Care
            </h2>
          </div>

          <button
            onClick={() => onNavigate('health')}
            className="text-xs font-semibold uppercase tracking-widest text-cyan-300 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>View All Conditions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HEALTH_CONDITIONS.slice(0, 4).map((cond) => (
            <div
              key={cond.id}
              onClick={() => onNavigate('health', cond.id)}
              className="p-6 rounded-xl bg-[#090d12] border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 cursor-pointer shadow-lg space-y-4 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-black/40">
                  <img
                    src={cond.image}
                    alt={cond.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-cyan-300 uppercase">{cond.category}</span>
                  <span className="text-red-300">{cond.severity}</span>
                </div>

                <h4 className="font-serif text-xl text-[#f5f3ee] group-hover:text-cyan-300 transition-colors">
                  {cond.name.split('(')[0]}
                </h4>

                <p className="text-xs text-[#a09a8f] line-clamp-2 font-light">
                  {cond.detailedOverview}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono uppercase text-cyan-300 group-hover:text-white transition-colors">
                <span>View Protocol</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CARE GUIDE & KNOWLEDGE PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="p-8 sm:p-14 rounded-2xl bg-gradient-to-br from-[#080d14] to-[#0a111a] border border-cyan-900/30 space-y-12 shadow-2xl">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9dc4b1]">
                Husbandry Science
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f3ee]">
                Essential Care Guidelines & Knowledge
              </h2>

              <p className="text-xs text-[#a09a8f] font-light leading-relaxed">
                Grounding your aquarium in biological reality: minimum 5 gallons, stable 78°F–80°F heat, cycled nitrifying bacteria, and zero caustic essential oils.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('care-guide')}
                className="px-5 py-2.5 bg-white text-[#06090c] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Care Guide
              </button>

              <button
                onClick={() => onNavigate('knowledge')}
                className="px-5 py-2.5 bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-200 border border-cyan-800/40 text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Knowledge Hub
              </button>
            </div>
          </div>

          {/* Water Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#06090c] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono text-[#8c8577] uppercase">Temperature</span>
              <div className="text-lg font-serif text-white">78°F – 80°F</div>
              <p className="text-[11px] text-[#a09a8f]">Enzyme & immune health</p>
            </div>

            <div className="p-4 rounded-xl bg-[#06090c] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono text-[#8c8577] uppercase">Ammonia (NH3)</span>
              <div className="text-lg font-serif text-emerald-400">0.00 ppm</div>
              <p className="text-[11px] text-[#a09a8f]">Strict zero tolerance</p>
            </div>

            <div className="p-4 rounded-xl bg-[#06090c] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono text-[#8c8577] uppercase">Tank Volume</span>
              <div className="text-lg font-serif text-white">5+ Gallons</div>
              <p className="text-[11px] text-[#a09a8f]">Non-negotiable minimum</p>
            </div>

            <div className="p-4 rounded-xl bg-[#06090c] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono text-[#8c8577] uppercase">pH Target</span>
              <div className="text-lg font-serif text-white">6.5 – 7.5</div>
              <p className="text-[11px] text-[#a09a8f]">Stable with tannins</p>
            </div>
          </div>

          {/* Featured Article */}
          {KNOWLEDGE_ARTICLES.length > 0 && (
            <div className="p-6 rounded-xl bg-[#06090c]/90 border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-300">
                  <span>Featured Scientific Article</span>
                  <span>·</span>
                  <span>{KNOWLEDGE_ARTICLES[0].readTime}</span>
                </div>

                <h3 className="font-serif text-2xl text-[#f5f3ee]">
                  {KNOWLEDGE_ARTICLES[0].title}
                </h3>

                <p className="text-xs text-[#a09a8f] font-light line-clamp-2">
                  {KNOWLEDGE_ARTICLES[0].summary}
                </p>
              </div>

              <button
                onClick={() => onNavigate('knowledge')}
                className="px-6 py-3 bg-white/[0.06] hover:bg-white/[0.12] text-[#f5f3ee] text-xs font-mono uppercase tracking-wider rounded transition-colors cursor-pointer shrink-0"
              >
                Read Article
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 7. BOTTOM EXPLORE CALLOUT */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-4">
        <div className="border-t border-white/[0.08] pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">
              The Complete Ichthyological Reference
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#f5f3ee] tracking-tight">
              Ready to Explore bettaIQ?
            </h2>

            <p className="text-xs text-[#b8b2a5] leading-relaxed font-light">
              Dive into our dual catalogue. Browse scientifically verified wild species across 13 IBC complexes, plus show morphs with water chemistry parameters and Red List ratings.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                onNavigate('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-[#f5f3ee] hover:bg-white text-[#06090c] font-sans text-xs font-bold uppercase tracking-widest rounded shadow-xl flex items-center gap-3 transition-all cursor-pointer group"
            >
              <span>EXPLORE NOW</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
