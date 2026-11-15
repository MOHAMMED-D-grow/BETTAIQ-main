import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ArrowUpDown,
  X,
  ArrowRight,
  Fish,
  Filter,
  RotateCcw,
  Info,
  Globe2,
  Sparkles,
  Layers,
  SlidersHorizontal,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Compass,
  Tag
} from 'lucide-react';
import {
  BettaEncyclopediaEntry,
  resolveBettaImage,
  BETTA_ENCYCLOPEDIA,
  WILD_BETTA_SPECIES,
  ORNAMENTAL_BETTA_VARIETIES,
  SPECIES_COMPLEXES,
  SpeciesComplexInfo,
  CatalogueSection,
  OrnamentalCategory,
  BreedingMode,
  IUCNStatus,
} from '../data/varieties.ts';
import { EncyclopediaDetail } from './EncyclopediaDetail.tsx';

export type ExploreTabSection = 'wild' | 'complexes' | 'ornamental';

interface EncyclopediaViewProps {
  initialVarietyId?: string;
  initialSection?: ExploreTabSection;
  onClearInitial?: () => void;
}

export const EncyclopediaView: React.FC<EncyclopediaViewProps> = ({
  initialVarietyId,
  initialSection = 'wild',
  onClearInitial
}) => {
  const [selectedEntry, setSelectedEntry] = useState<BettaEncyclopediaEntry | null>(() => {
    if (initialVarietyId) {
      return BETTA_ENCYCLOPEDIA.find(v => v.id === initialVarietyId) || null;
    }
    return null;
  });

  // Primary 3 Explore Sections
  const [activeSection, setActiveSection] = useState<ExploreTabSection>(initialSection);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComplex, setSelectedComplex] = useState<string>('all');
  const [selectedOrnamentalCat, setSelectedOrnamentalCat] = useState<string>('all');
  const [breedingFilter, setBreedingFilter] = useState<string>('all');
  const [iucnFilter, setIucnFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'taxonomic' | 'name-asc' | 'name-desc' | 'difficulty' | 'tank-size'>('taxonomic');

  // Selected complex for detail view modal
  const [selectedComplexModal, setSelectedComplexModal] = useState<SpeciesComplexInfo | null>(null);

  useEffect(() => {
    if (initialVarietyId) {
      const match = BETTA_ENCYCLOPEDIA.find(v => v.id === initialVarietyId);
      if (match) {
        setSelectedEntry(match);
        setActiveSection(match.catalogueSection === 'wild' ? 'wild' : 'ornamental');
      }
    }
  }, [initialVarietyId]);

  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  // Filtered and Sorted entries for Wild and Ornamental sections
  const processedEntries = useMemo(() => {
    if (activeSection === 'complexes') return [];

    let result = BETTA_ENCYCLOPEDIA.filter((entry) => {
      // 1. Primary catalogue partition
      if (activeSection === 'wild' && entry.catalogueSection !== 'wild') return false;
      if (activeSection === 'ornamental' && entry.catalogueSection !== 'ornamental') return false;

      // 2. Wild Complex filter
      if (activeSection === 'wild' && selectedComplex !== 'all') {
        const complexMatch = entry.speciesGroup.toLowerCase().includes(selectedComplex.toLowerCase());
        if (!complexMatch) return false;
      }

      // 3. Ornamental Category filter
      if (activeSection === 'ornamental' && selectedOrnamentalCat !== 'all') {
        if (entry.ornamentalCategory !== selectedOrnamentalCat) return false;
      }

      // 4. Breeding mode filter
      if (breedingFilter !== 'all' && entry.breedingMode.toLowerCase() !== breedingFilter.toLowerCase()) {
        return false;
      }

      // 5. IUCN status filter
      if (iucnFilter !== 'all') {
        if (!entry.iucnStatus.toLowerCase().includes(iucnFilter.toLowerCase())) {
          return false;
        }
      }

      // 6. Difficulty filter
      if (difficultyFilter !== 'all' && !entry.careDifficulty.toLowerCase().includes(difficultyFilter.toLowerCase())) {
        return false;
      }

      // 7. Full-text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = entry.name.toLowerCase().includes(q);
        const matchesScientific = entry.scientificName.toLowerCase().includes(q);
        const matchesGroup = entry.speciesGroup.toLowerCase().includes(q);
        const matchesFin = entry.finShape.toLowerCase().includes(q);
        const matchesNative = entry.nativeRange.toLowerCase().includes(q);
        const matchesCharacteristics = entry.characteristics.toLowerCase().includes(q);
        return matchesName || matchesScientific || matchesGroup || matchesFin || matchesNative || matchesCharacteristics;
      }

      return true;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'difficulty') {
        const order: Record<string, number> = { 'Beginner': 1, 'Beginner to Intermediate': 2, 'Intermediate': 3, 'Intermediate to Advanced': 4, 'Advanced': 5 };
        return (order[a.careDifficulty] || 9) - (order[b.careDifficulty] || 9);
      }
      if (sortBy === 'tank-size') {
        return parseInt(a.minimumTank) - parseInt(b.minimumTank);
      }
      return 0; // Default order
    });

    return result;
  }, [activeSection, selectedComplex, selectedOrnamentalCat, breedingFilter, iucnFilter, difficultyFilter, searchQuery, sortBy]);

  // Filtered Complexes
  const filteredComplexes = useMemo(() => {
    return SPECIES_COMPLEXES.filter((c) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.typeSpecies.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.diagnosticTraits.toLowerCase().includes(q) ||
        c.geographicCore.toLowerCase().includes(q) ||
        c.memberSpecies.some(m => m.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedComplex('all');
    setSelectedOrnamentalCat('all');
    setBreedingFilter('all');
    setIucnFilter('all');
    setDifficultyFilter('all');
    setSortBy('taxonomic');
  };

  return (
    <div className="relative min-h-screen text-[#dcd7cc] isolate">
      {/* Fixed Deep Bright Ocean Background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(2, 8, 22, 0.28) 0%,
              rgba(2, 9, 24, 0.45) 45%,
              rgba(1, 6, 16, 0.78) 100%
            ),
            url('${import.meta.env.BASE_URL}assets/explore/deep_bright_ocean.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {selectedEntry ? (
        <EncyclopediaDetail
          entry={selectedEntry}
          onBackToCatalogue={() => {
            setSelectedEntry(null);
            if (onClearInitial) onClearInitial();
          }}
          onSelectEntry={(entry) => setSelectedEntry(entry)}
        />
      ) : (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-12 pb-32">
          {/* 1. Header & Scientific Context */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-200 bg-cyan-950/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-400/30 shadow-md">
              <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
              <span>Scientific Encyclopedia &amp; Taxonomic Index</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              Explore the Genus <em>Betta</em>
            </h1>
            <p className="text-base text-[#f1ede6] leading-relaxed font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
              An organized ichthyological repository separating verified wild taxa, the 13 International Betta Congress (IBC) species complexes, and selectively bred ornamental show varieties.
            </p>
          </div>

          {/* 2. Three Distinct Functional Sections (Tabs) - Glassmorphic */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-2 rounded-2xl bg-black/25 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {/* Section 1: Wild Species */}
            <button
              onClick={() => {
                setActiveSection('wild');
                resetAllFilters();
              }}
              className={`p-5 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeSection === 'wild'
                  ? 'bg-emerald-950/35 border border-emerald-400/50 text-white backdrop-blur-md shadow-[0_0_25px_rgba(16,185,129,0.2)]'
                  : 'bg-black/20 hover:bg-white/[0.08] backdrop-blur-md border border-white/10 text-white/80 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-emerald-300">
                  1. Wild Species
                </span>
                <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${
                  activeSection === 'wild' ? 'bg-emerald-500/25 text-emerald-200 border-emerald-400/40' : 'bg-white/[0.06] text-white/90 border-white/10'
                }`}>
                  {WILD_BETTA_SPECIES.length} Taxa
                </span>
              </div>
              <div className="mt-2 space-y-0.5">
                <div className="font-serif text-lg text-white font-medium drop-shadow-sm">Biological Species</div>
                <p className="text-xs text-[#e0e8ef] font-normal drop-shadow-sm">Natural wild populations across Sundaland</p>
              </div>
            </button>

            {/* Section 2: Species Complexes (IBC) */}
            <button
              onClick={() => {
                setActiveSection('complexes');
                resetAllFilters();
              }}
              className={`p-5 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeSection === 'complexes'
                  ? 'bg-cyan-950/35 border border-cyan-400/50 text-white backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                  : 'bg-black/20 hover:bg-white/[0.08] backdrop-blur-md border border-white/10 text-white/80 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-cyan-300">
                  2. Species Complexes
                </span>
                <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${
                  activeSection === 'complexes' ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400/40' : 'bg-white/[0.06] text-white/90 border-white/10'
                }`}>
                  13 IBC Groups
                </span>
              </div>
              <div className="mt-2 space-y-0.5">
                <div className="font-serif text-lg text-white font-medium drop-shadow-sm">Taxonomic Groupings</div>
                <p className="text-xs text-[#e0e8ef] font-normal drop-shadow-sm">Phylogenetic clusters &amp; reproductive modes</p>
              </div>
            </button>

            {/* Section 3: Domestic Varieties */}
            <button
              onClick={() => {
                setActiveSection('ornamental');
                resetAllFilters();
              }}
              className={`p-5 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeSection === 'ornamental'
                  ? 'bg-indigo-950/35 border border-indigo-400/50 text-white backdrop-blur-md shadow-[0_0_25px_rgba(99,102,241,0.2)]'
                  : 'bg-black/20 hover:bg-white/[0.08] backdrop-blur-md border border-white/10 text-white/80 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-indigo-300">
                  3. Domestic Varieties
                </span>
                <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${
                  activeSection === 'ornamental' ? 'bg-indigo-500/25 text-indigo-200 border-indigo-400/40' : 'bg-white/[0.06] text-white/90 border-white/10'
                }`}>
                  {ORNAMENTAL_BETTA_VARIETIES.length} Show Morphs
                </span>
              </div>
              <div className="mt-2 space-y-0.5">
                <div className="font-serif text-lg text-white font-medium drop-shadow-sm">Fin Forms &amp; Patterns</div>
                <p className="text-xs text-[#e0e8ef] font-normal drop-shadow-sm">Artificial selection of <em>Betta splendens</em></p>
              </div>
            </button>
          </div>

          {/* 3. Section Explanatory Banner & Scientific Distinction - Glassmorphic */}
          {activeSection === 'wild' && (
            <div className="p-5 rounded-xl bg-black/30 backdrop-blur-xl border border-emerald-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#f1ede6] font-normal shadow-lg">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
                <span>
                  <strong className="text-white font-semibold">Taxonomic Distinction:</strong> Every entry here is a distinct, reproductive biological species with binomial nomenclature verified via FishBase, CAS Catalog of Fishes, and Tan &amp; Ng (2005).
                </span>
              </div>
              <span className="text-[11px] font-mono uppercase text-emerald-300 font-semibold shrink-0 bg-emerald-950/50 px-2.5 py-1 rounded border border-emerald-400/30">
                {processedEntries.length} of {WILD_BETTA_SPECIES.length} species displayed
              </span>
            </div>
          )}

          {activeSection === 'complexes' && (
            <div className="p-5 rounded-xl bg-black/30 backdrop-blur-xl border border-cyan-400/30 space-y-2 text-xs text-[#f1ede6] font-normal shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Attribution: International Betta Congress (IBC) Species Complex Management</span>
                </span>
                <span className="text-[11px] font-mono uppercase text-cyan-300 font-semibold bg-cyan-950/50 px-2.5 py-1 rounded border border-cyan-400/30">
                  13 Recognized Phylogenetic Lineages
                </span>
              </div>
              <p className="text-[#f1ede6] leading-relaxed drop-shadow-sm">
                The International Betta Congress (IBC) Species Maintenance Programme (SMP) arranges the genus <em>Betta</em> into 13 morphological and reproductive complexes. These complexes group together closely related species sharing common ancestral traits, spawning strategies (bubble nester vs. paternal mouthbrooder), and biogeographical ranges.
              </p>
            </div>
          )}

          {activeSection === 'ornamental' && (
            <div className="p-5 rounded-xl bg-black/30 backdrop-blur-xl border border-indigo-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#f1ede6] font-normal shadow-lg">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-indigo-300 shrink-0" />
                <span>
                  <strong className="text-white font-semibold">Crucial Distinction:</strong> Crowntail, Halfmoon, Plakat, and Koi are selective domestic mutations of <em>Betta splendens</em>, NOT separate biological species. They share identical taxonomy.
                </span>
              </div>
              <span className="text-[11px] font-mono uppercase text-indigo-300 font-semibold shrink-0 bg-indigo-950/50 px-2.5 py-1 rounded border border-indigo-400/30">
                {processedEntries.length} ornamental varieties
              </span>
            </div>
          )}

      {/* 4. Filter Toolbar for Wild and Ornamental - Glassmorphic */}
      {activeSection !== 'complexes' && (
        <div className="p-5 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/20 space-y-4 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-cyan-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeSection === 'wild'
                    ? "Search wild species (e.g. macrostoma, imbellis, channoides, Borneo)..."
                    : "Search ornamental morphs (e.g. halfmoon, crowntail, koi, dragon scale)..."
                }
                className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/20 rounded-lg text-sm text-white placeholder-cyan-100/60 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-200 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filter Selectors */}
            <div className="flex flex-wrap items-center gap-3">
              {activeSection === 'wild' && (
                <select
                  value={selectedComplex}
                  onChange={(e) => setSelectedComplex(e.target.value)}
                  className="px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-xs font-mono text-cyan-100 focus:outline-none focus:border-cyan-400 backdrop-blur-md cursor-pointer font-medium hover:border-cyan-400/50"
                >
                  <option value="all" className="bg-[#05111e] text-white">All Complexes (13)</option>
                  {SPECIES_COMPLEXES.map(c => (
                    <option key={c.id} value={c.id} className="bg-[#05111e] text-white">{c.name}</option>
                  ))}
                </select>
              )}

              {activeSection === 'ornamental' && (
                <select
                  value={selectedOrnamentalCat}
                  onChange={(e) => setSelectedOrnamentalCat(e.target.value)}
                  className="px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-xs font-mono text-cyan-100 focus:outline-none focus:border-cyan-400 backdrop-blur-md cursor-pointer font-medium hover:border-cyan-400/50"
                >
                  <option value="all" className="bg-[#05111e] text-white">All Ornamental Types</option>
                  <option value="fin-form" className="bg-[#05111e] text-white">Fin Forms (HM, CT, VT, DT)</option>
                  <option value="color-scale" className="bg-[#05111e] text-white">Colors &amp; Scales (Dragon, Orchid)</option>
                  <option value="pattern-morph" className="bg-[#05111e] text-white">Pattern Morphs (Koi, Marble, Butterfly)</option>
                </select>
              )}

              <select
                value={breedingFilter}
                onChange={(e) => setBreedingFilter(e.target.value)}
                className="px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-xs font-mono text-cyan-100 focus:outline-none focus:border-cyan-400 backdrop-blur-md cursor-pointer font-medium hover:border-cyan-400/50"
              >
                <option value="all" className="bg-[#05111e] text-white">All Reproduction</option>
                <option value="Bubble Nester" className="bg-[#05111e] text-white">Bubble Nester</option>
                <option value="Paternal Mouthbrooder" className="bg-[#05111e] text-white">Paternal Mouthbrooder</option>
              </select>

              {activeSection === 'wild' && (
                <select
                  value={iucnFilter}
                  onChange={(e) => setIucnFilter(e.target.value)}
                  className="px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-xs font-mono text-cyan-100 focus:outline-none focus:border-cyan-400 backdrop-blur-md cursor-pointer font-medium hover:border-cyan-400/50"
                >
                  <option value="all" className="bg-[#05111e] text-white">All IUCN Red List</option>
                  <option value="Critically Endangered" className="bg-[#05111e] text-white">Critically Endangered (CR)</option>
                  <option value="Endangered" className="bg-[#05111e] text-white">Endangered (EN)</option>
                  <option value="Vulnerable" className="bg-[#05111e] text-white">Vulnerable (VU)</option>
                  <option value="Least Concern" className="bg-[#05111e] text-white">Least Concern (LC)</option>
                </select>
              )}

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-xs font-mono text-cyan-100 focus:outline-none focus:border-cyan-400 backdrop-blur-md cursor-pointer font-medium hover:border-cyan-400/50"
              >
                <option value="taxonomic" className="bg-[#05111e] text-white">Sort: Taxonomic Order</option>
                <option value="name-asc" className="bg-[#05111e] text-white">Sort: Name (A–Z)</option>
                <option value="name-desc" className="bg-[#05111e] text-white">Sort: Name (Z–A)</option>
                <option value="difficulty" className="bg-[#05111e] text-white">Sort: Difficulty</option>
                <option value="tank-size" className="bg-[#05111e] text-white">Sort: Minimum Tank</option>
              </select>

              {(searchQuery || selectedComplex !== 'all' || selectedOrnamentalCat !== 'all' || breedingFilter !== 'all' || iucnFilter !== 'all' || sortBy !== 'taxonomic') && (
                <button
                  onClick={resetAllFilters}
                  className="px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-cyan-200 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-400/40 rounded-lg flex items-center gap-1.5 cursor-pointer backdrop-blur-md font-semibold transition-colors"
                >
                  <RotateCcw className="w-3 h-3 text-cyan-300" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5A. VIEW CONTENT: SPECIES COMPLEXES (13 IBC GROUPS) */}
      {activeSection === 'complexes' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComplexes.map((complex) => (
              <div
                key={complex.id}
                onClick={() => setSelectedComplexModal(complex)}
                className="p-6 rounded-2xl bg-black/30 hover:bg-black/45 backdrop-blur-xl border border-white/15 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
                      IBC Complex
                    </span>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${
                      complex.breedingMode === 'Bubble Nester'
                        ? 'bg-emerald-950/60 text-emerald-200 border-emerald-400/40'
                        : 'bg-cyan-950/60 text-cyan-200 border-cyan-400/40'
                    }`}>
                      {complex.breedingMode}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-white group-hover:text-cyan-200 transition-colors drop-shadow-sm font-medium">
                      {complex.name}
                    </h3>
                    <p className="text-xs font-mono text-cyan-200/90 italic mt-0.5 font-medium">
                      Type: {complex.typeSpecies}
                    </p>
                  </div>

                  <p className="text-xs text-[#f1ede6] font-normal leading-relaxed drop-shadow-sm">
                    {complex.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <span className="text-[11px] font-mono uppercase text-cyan-300 font-semibold block">Diagnostic Traits:</span>
                    <p className="text-xs text-white font-light drop-shadow-sm">{complex.diagnosticTraits}</p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <span className="text-[11px] font-mono uppercase text-cyan-300 font-semibold block">Member Species ({complex.memberSpecies.length}):</span>
                    <div className="flex flex-wrap gap-1.5">
                      {complex.memberSpecies.map((member, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono text-cyan-100 bg-white/[0.08] backdrop-blur-sm px-2.5 py-0.5 rounded-md border border-white/15 font-medium"
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-cyan-200 group-hover:text-white transition-colors font-semibold">
                  <span>Geographic Core: {complex.geographicCore.split(',')[0]}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5B. VIEW CONTENT: WILD SPECIES & DOMESTIC VARIETIES ENTRY CARDS */}
      {activeSection !== 'complexes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processedEntries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className="group rounded-2xl overflow-hidden bg-black/30 hover:bg-black/45 backdrop-blur-xl border border-white/15 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Photo container */}
                  <div className="aspect-[4/3] overflow-hidden bg-black/40 relative">
                    <img
                      src={resolveBettaImage(entry.image) || resolveBettaImage('/src/assets/images/hero_betta_halfmoon_1793164844961.jpg')}
                      alt={entry.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-75" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border font-semibold backdrop-blur-md shadow-md ${
                        entry.catalogueSection === 'wild'
                          ? 'bg-emerald-950/80 text-emerald-200 border-emerald-400/40'
                          : 'bg-indigo-950/80 text-indigo-200 border-indigo-400/40'
                      }`}>
                        {entry.catalogueSection === 'wild' ? 'Wild Species' : 'Domestic Morph'}
                      </span>

                      {entry.catalogueSection === 'wild' && (
                        <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full bg-black/80 text-white border border-white/20 font-semibold backdrop-blur-md shadow-md">
                          {entry.iucnStatus.split(' ')[0]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="space-y-1">
                      <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold block">
                        {entry.speciesGroup}
                      </span>
                      <h3 className="font-serif text-2xl text-white group-hover:text-cyan-200 transition-colors leading-snug drop-shadow-sm font-medium">
                        {entry.name}
                      </h3>
                      <p className="text-xs font-mono italic text-cyan-100/90 font-medium">
                        {entry.scientificName}
                      </p>
                    </div>

                    <p className="text-xs text-[#f1ede6] line-clamp-2 font-normal leading-relaxed drop-shadow-sm">
                      {entry.characteristics}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs font-mono">
                      <div>
                        <span className="text-cyan-300 block text-[10px] uppercase font-semibold">Breeding:</span>
                        <span className="text-white font-medium drop-shadow-sm">{entry.breedingMode}</span>
                      </div>
                      <div>
                        <span className="text-cyan-300 block text-[10px] uppercase font-semibold">Adult Size:</span>
                        <span className="text-white font-medium drop-shadow-sm">{entry.adultSize}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-3.5 border-t border-white/10 bg-black/25 backdrop-blur-md flex items-center justify-between text-xs font-mono uppercase tracking-wider text-cyan-200 group-hover:text-white transition-colors font-semibold">
                  <span>View Scientific Dossier</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {processedEntries.length === 0 && (
            <div className="text-center py-16 space-y-4 text-white bg-black/30 backdrop-blur-xl rounded-2xl border border-white/15 p-8">
              <p className="text-sm font-medium">No entries match your current search or filter criteria.</p>
              <button
                onClick={resetAllFilters}
                className="text-xs uppercase tracking-wider text-cyan-300 hover:text-white font-semibold underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}
        </div>
      )}

      {/* Complex Detail Modal */}
      {selectedComplexModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-black/55 backdrop-blur-2xl border border-cyan-400/40 rounded-2xl p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedComplexModal(null)}
              className="absolute top-5 right-5 p-2 rounded text-cyan-200 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
                IBC Species Complex · {selectedComplexModal.breedingMode}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium drop-shadow-sm">
                {selectedComplexModal.name}
              </h2>
              <p className="text-xs font-mono text-cyan-200 italic font-medium">
                Designated Type Species: {selectedComplexModal.typeSpecies}
              </p>
            </div>

            <div className="space-y-4 text-sm text-[#f1ede6] font-normal leading-relaxed">
              <p className="drop-shadow-sm">{selectedComplexModal.description}</p>

              <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 space-y-1">
                <span className="text-xs font-mono uppercase text-cyan-300 font-bold block">
                  Diagnostic Morphology
                </span>
                <p className="text-xs text-white leading-relaxed">{selectedComplexModal.diagnosticTraits}</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 space-y-1">
                <span className="text-xs font-mono uppercase text-cyan-300 font-bold block">
                  Geographic Range &amp; Biotope Core
                </span>
                <p className="text-xs text-white leading-relaxed">{selectedComplexModal.geographicCore}</p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono uppercase text-cyan-300 font-semibold block">
                  Member Species Included ({selectedComplexModal.memberSpecies.length}):
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedComplexModal.memberSpecies.map((speciesName, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedComplexModal(null);
                        setActiveSection('wild');
                        setSearchQuery(speciesName.replace('Betta ', ''));
                      }}
                      className="px-3 py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-800/60 border border-cyan-400/40 text-xs font-mono text-cyan-100 hover:text-white cursor-pointer transition-colors font-medium backdrop-blur-sm"
                    >
                      {speciesName}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-xs font-mono text-cyan-200 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>Reference: International Betta Congress (IBC) Species Maintenance Programme</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedComplexModal(null)}
                className="px-5 py-2.5 bg-white/[0.1] hover:bg-white/[0.2] border border-white/20 text-white text-xs font-mono uppercase tracking-wider rounded-lg transition-colors cursor-pointer font-semibold backdrop-blur-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
