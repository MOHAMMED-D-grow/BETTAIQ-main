import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  BookOpen,
  ExternalLink,
  Globe,
  Droplet,
  Thermometer,
  Wind,
  AlertTriangle,
  CheckCircle2,
  Fish,
  MapPin,
  Sparkles,
  Info,
  X
} from 'lucide-react';
import { BettaEncyclopediaEntry, BETTA_ENCYCLOPEDIA, resolveBettaImage } from '../data/varieties.ts';

interface EncyclopediaDetailProps {
  entry: BettaEncyclopediaEntry;
  onBackToCatalogue: () => void;
  onSelectEntry: (entry: BettaEncyclopediaEntry) => void;
}

export const EncyclopediaDetail: React.FC<EncyclopediaDetailProps> = ({
  entry,
  onBackToCatalogue,
  onSelectEntry,
}) => {
  const [showTaxonomyModal, setShowTaxonomyModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [entry.id]);

  // Find previous and next entries in current dataset
  const currentIndex = BETTA_ENCYCLOPEDIA.findIndex(e => e.id === entry.id);
  const prevEntry = currentIndex > 0 ? BETTA_ENCYCLOPEDIA[currentIndex - 1] : null;
  const nextEntry = currentIndex < BETTA_ENCYCLOPEDIA.length - 1 ? BETTA_ENCYCLOPEDIA[currentIndex + 1] : null;

  // Find related entries (same complex or ornamental category)
  const relatedEntries = BETTA_ENCYCLOPEDIA.filter(
    e => e.id !== entry.id && (
      e.speciesGroup === entry.speciesGroup ||
      (entry.ornamentalCategory && e.ornamentalCategory === entry.ornamentalCategory)
    )
  ).slice(0, 3);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getClassificationLabel = (e: BettaEncyclopediaEntry) => {
    if (e.catalogueSection === 'wild') {
      return 'Taxonomic Wild Species (Genus Betta)';
    }
    if (e.ornamentalCategory === 'fin-form') {
      return 'Ornamental Fin Form (Betta splendens)';
    }
    if (e.ornamentalCategory === 'color-scale') {
      return 'Genetic Color & Scale Morph (Betta splendens)';
    }
    return 'Pattern Morph & Gene Variation (Betta splendens)';
  };

  const getIucnBadge = (status: BettaEncyclopediaEntry['iucnStatus']) => {
    if (status.includes('Critically')) {
      return <span className="text-red-400 font-mono text-xs font-semibold">{status}</span>;
    }
    if (status.includes('Endangered')) {
      return <span className="text-rose-400 font-mono text-xs font-semibold">{status}</span>;
    }
    if (status.includes('Vulnerable')) {
      return <span className="text-amber-400 font-mono text-xs font-semibold">{status}</span>;
    }
    if (status.includes('Least Concern')) {
      return <span className="text-emerald-400 font-mono text-xs font-semibold">{status}</span>;
    }
    return <span className="text-slate-400 font-mono text-xs">{status}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 space-y-12 pb-32">
      {/* 1. Breadcrumbs & Top Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#8c8577] flex-wrap">
          <button
            onClick={onBackToCatalogue}
            className="hover:text-[#f5f3ee] transition-colors cursor-pointer"
          >
            Encyclopedia
          </button>
          <span>/</span>
          <span className="text-cyan-400">
            {entry.catalogueSection === 'wild' ? 'Wild Species' : 'Ornamental Varieties'}
          </span>
          <span>/</span>
          <span className="text-slate-400 truncate max-w-[150px]">{entry.speciesGroup}</span>
          <span>/</span>
          <span className="text-[#f5f3ee] font-semibold truncate max-w-[200px]">{entry.name}</span>
        </nav>

        {/* Previous / Next Entry Navigation */}
        <div className="flex items-center gap-4 text-xs font-mono text-[#8c8577]">
          {prevEntry ? (
            <button
              onClick={() => onSelectEntry(prevEntry)}
              className="flex items-center gap-1 hover:text-[#f5f3ee] transition-colors cursor-pointer"
              title={`Previous: ${prevEntry.name}`}
            >
              <ChevronLeft className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline truncate max-w-[130px]">{prevEntry.name}</span>
            </button>
          ) : (
            <span className="opacity-30 flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Start</span>
          )}

          <span>|</span>

          {nextEntry ? (
            <button
              onClick={() => onSelectEntry(nextEntry)}
              className="flex items-center gap-1 hover:text-[#f5f3ee] transition-colors cursor-pointer"
              title={`Next: ${nextEntry.name}`}
            >
              <span className="hidden sm:inline truncate max-w-[130px]">{nextEntry.name}</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </button>
          ) : (
            <span className="opacity-30 flex items-center gap-1">End <ChevronRight className="w-4 h-4" /></span>
          )}
        </div>
      </div>

      {/* Return Button */}
      <div>
        <button
          onClick={onBackToCatalogue}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to {entry.catalogueSection === 'wild' ? 'Wild Species Catalogue' : 'Ornamental Catalogue'}</span>
        </button>
      </div>

      {/* 2. Hero Header Showcase: Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Photographic Centerpiece with smooth zoom */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl relative group">
            {entry.image ? (
  <img
    src={resolveBettaImage(entry.image)}
    alt={entry.name}
    onError={(e) => {
      e.currentTarget.style.display = 'none';
    }}
    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104 brightness-100"
  />
) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 p-8 text-center">
                <Fish className="w-14 h-14 opacity-50 mb-3 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-200">
                  Documented Specimen: {entry.scientificName}
                </span>
                <span className="text-[11px] text-white/70 mt-1">
                  Taxonomic archival description registered
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white font-mono drop-shadow-md">
              <span className="text-cyan-200 font-semibold">{getClassificationLabel(entry)}</span>
              <span className="text-white/80">{entry.speciesGroup}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Taxonomy & High-Level Identity */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold block">
              {entry.catalogueSection === 'wild' ? 'Genus Betta (Wild Taxon)' : 'IBC Show Standard (Domestic)'}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-white tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {entry.name}
            </h1>

            {/* Clickable Scientific Name for authority popup */}
            <div
              onClick={() => setShowTaxonomyModal(true)}
              className="inline-flex items-center gap-2 font-serif italic text-lg sm:text-xl text-cyan-200 hover:text-white cursor-pointer group transition-colors"
            >
              <span className="drop-shadow-sm">{entry.scientificName}</span>
              {entry.taxonomicAuthority && (
                <span className="font-sans text-xs font-light text-cyan-100/80 group-hover:text-white border-b border-cyan-400/40">
                  {entry.taxonomicAuthority}
                </span>
              )}
              <Info className="w-3.5 h-3.5 text-cyan-300 opacity-90 group-hover:opacity-100 shrink-0" />
            </div>
          </div>

          <p className="text-sm text-[#f1ede6] leading-relaxed font-normal drop-shadow-sm">
            {entry.description}
          </p>

          {/* Quick Facts Strip */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/15 text-xs">
            <div>
              <span className="font-mono text-[11px] text-cyan-300 uppercase font-semibold block">Adult Size</span>
              <span className="text-white font-medium mt-0.5 block">{entry.adultSize}</span>
            </div>
            <div>
              <span className="font-mono text-[11px] text-cyan-300 uppercase font-semibold block">Typical Lifespan</span>
              <span className="text-white font-medium mt-0.5 block">{entry.lifespan}</span>
            </div>
            <div>
              <span className="font-mono text-[11px] text-cyan-300 uppercase font-semibold block">Reproduction Mode</span>
              <span className="text-cyan-200 font-medium mt-0.5 block">{entry.breedingMode}</span>
            </div>
            <div>
              <span className="font-mono text-[11px] text-cyan-300 uppercase font-semibold block">Conservation Status</span>
              <div className="mt-0.5">{getIucnBadge(entry.iucnStatus)}</div>
            </div>
          </div>

          {/* Classification Distinction Alert */}
          {entry.catalogueSection === 'ornamental' ? (
            <div className="p-4 rounded-2xl bg-black/30 backdrop-blur-xl border border-indigo-400/40 text-xs text-white leading-relaxed space-y-1 shadow-lg">
              <strong className="text-indigo-300 block font-mono uppercase text-[11px] font-bold">Taxonomic Distinction:</strong>
              This entry represents a selectively bred artificial domestic morph of <em>Betta splendens</em>, not an independent biological species.
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-black/30 backdrop-blur-xl border border-emerald-400/40 text-xs text-white leading-relaxed space-y-1 shadow-lg">
              <strong className="text-emerald-300 block font-mono uppercase text-[11px] font-bold">Biological Wild Species:</strong>
              True taxonomic species described under the International Code of Zoological Nomenclature (ICZN).
            </div>
          )}
        </div>
      </div>

      {/* 3. Sticky In-Page Section Navigator - Glassmorphic */}
      <div className="sticky top-20 z-30 bg-black/40 backdrop-blur-xl border-y border-white/15 py-3 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 flex items-center gap-6 text-xs font-mono uppercase tracking-wider overflow-x-auto text-cyan-200">
        <span className="text-white font-bold shrink-0">Sections:</span>
        <button
          onClick={() => scrollTo('sec-overview')}
          className="hover:text-white transition-colors cursor-pointer shrink-0 font-medium"
        >
          Overview &amp; Traits
        </button>
        <button
          onClick={() => scrollTo('sec-habitat')}
          className="hover:text-white transition-colors cursor-pointer shrink-0 font-medium"
        >
          Habitat &amp; Parameters
        </button>
        <button
          onClick={() => scrollTo('sec-care')}
          className="hover:text-white transition-colors cursor-pointer shrink-0 font-medium"
        >
          Husbandry &amp; Watchouts
        </button>
        <button
          onClick={() => scrollTo('sec-reproduction')}
          className="hover:text-white transition-colors cursor-pointer shrink-0 font-medium"
        >
          Reproduction &amp; Ecology
        </button>
        <button
          onClick={() => scrollTo('sec-references')}
          className="hover:text-white transition-colors cursor-pointer shrink-0 font-medium"
        >
          Literature &amp; Citations
        </button>
      </div>

      {/* 4. Structured Information Groups - Glassmorphic Boxes */}
      <div className="space-y-16 pt-4">
        {/* Section 01: Overview & Physical Traits */}
        <section id="sec-overview" className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">Section 01</span>
            <h2 className="font-serif text-3xl text-white font-medium drop-shadow-sm">Morphology &amp; Characteristics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#f1ede6] leading-relaxed">
            <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 space-y-2 shadow-xl">
              <h3 className="font-serif text-xl text-white font-medium">Fin Structure &amp; Ray Branching</h3>
              <p className="font-normal text-white/90 drop-shadow-sm">{entry.finShape}</p>
            </div>

            <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 space-y-2 shadow-xl">
              <h3 className="font-serif text-xl text-white font-medium">Distinctive Anatomical Traits</h3>
              <p className="font-normal text-white/90 drop-shadow-sm">{entry.characteristics}</p>
            </div>
          </div>

          {/* Coloration */}
          <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 space-y-2 text-xs shadow-xl">
            <span className="font-mono uppercase tracking-wider text-cyan-300 font-bold block">Primary Colors &amp; Pigment Genetics</span>
            <div className="flex flex-wrap gap-2 pt-1">
              {entry.primaryColors.map((color, i) => (
                <span key={i} className="px-3 py-1 bg-white/[0.08] backdrop-blur-sm rounded-lg border border-white/20 text-white font-mono text-[11px] font-medium">
                  {color}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Section 02: Native Habitat & Water Chemistry */}
        <section id="sec-habitat" className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">Section 02</span>
            <h2 className="font-serif text-3xl text-white font-medium drop-shadow-sm">Native Distribution &amp; Biotope Parameters</h2>
          </div>

          <div className="p-8 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-cyan-200 font-medium">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-300" />
                <span>Geographic Range: {entry.nativeRange}</span>
              </div>
              {entry.typeLocality && (
                <div className="flex items-center gap-1.5 text-white/90">
                  <MapPin className="w-3.5 h-3.5 text-rose-300" />
                  <span>Type Locality: {entry.typeLocality}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-[#f1ede6] leading-relaxed font-normal drop-shadow-sm">
              {entry.naturalHabitat}
            </p>
          </div>

          {/* Chemistry Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 space-y-1 shadow-lg">
              <span className="text-[11px] font-mono uppercase text-cyan-300 font-semibold block">Water Temperature</span>
              <span className="text-white text-base font-medium block">{entry.waterParams.temp}</span>
            </div>
            <div className="p-5 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 space-y-1 shadow-lg">
              <span className="text-[11px] font-mono uppercase text-cyan-300 font-semibold block">Acidity / pH Range</span>
              <span className="text-white text-base font-medium block">{entry.waterParams.pH}</span>
            </div>
            <div className="p-5 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 space-y-1 shadow-lg">
              <span className="text-[11px] font-mono uppercase text-cyan-300 font-semibold block">General Hardness</span>
              <span className="text-white text-base font-medium block">{entry.waterParams.hardness}</span>
            </div>
            <div className="p-5 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 space-y-1 shadow-lg">
              <span className="text-[11px] font-mono uppercase text-cyan-300 font-semibold block">Current / Flow Resistance</span>
              <span className="text-white text-base font-medium block">{entry.waterParams.flow}</span>
            </div>
          </div>
        </section>

        {/* Section 03: Husbandry & Care */}
        <section id="sec-care" className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">Section 03</span>
            <h2 className="font-serif text-3xl text-white font-medium drop-shadow-sm">Aquarium Husbandry &amp; Fin Care</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#f1ede6]">
            <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 space-y-2 shadow-xl">
              <span className="font-mono uppercase text-cyan-300 font-bold block">Minimum Tank Requirement</span>
              <p className="text-white text-base font-semibold">{entry.minimumTank}</p>
              <p className="text-white/80 pt-1 font-normal">Horizontal swimming footprint is preferred over tall narrow vases.</p>
            </div>

            <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 space-y-2 shadow-xl">
              <span className="font-mono uppercase text-cyan-300 font-bold block">Keeper Difficulty</span>
              <p className="text-cyan-200 text-base font-semibold">{entry.careDifficulty}</p>
              <p className="text-white/80 pt-1 font-normal">Based on environmental sensitivity, diet complexity, and flow requirements.</p>
            </div>

            <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 space-y-2 shadow-xl">
              <span className="font-mono uppercase text-cyan-300 font-bold block">Carnivorous Diet</span>
              <p className="text-white/90 font-normal leading-relaxed">{entry.diet}</p>
            </div>
          </div>

          {/* Fin Care Watchouts */}
          <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-xl border border-amber-400/40 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Specific Husbandry &amp; Health Watchouts</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#f1ede6] list-disc list-inside">
              {entry.finCareWatchouts.map((w, idx) => (
                <li key={idx} className="leading-relaxed drop-shadow-sm">{w}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 04: Reproduction & Behavioral Ecology */}
        <section id="sec-reproduction" className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">Section 04</span>
            <h2 className="font-serif text-3xl text-white font-medium drop-shadow-sm">Behavior &amp; Reproductive Strategy</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#f1ede6]">
            <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 space-y-2 shadow-xl">
              <h3 className="font-serif text-xl text-white font-medium">Temperament &amp; Social Structure</h3>
              <p className="leading-relaxed font-normal text-white/90 drop-shadow-sm">{entry.temperament}</p>
            </div>

            <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 space-y-2 shadow-xl">
              <h3 className="font-serif text-xl text-white font-medium">Reproductive Biology ({entry.breedingMode})</h3>
              <p className="leading-relaxed font-normal text-white/90 drop-shadow-sm">{entry.reproductionNotes}</p>
            </div>
          </div>
        </section>

        {/* Section 05: Scientific References & Taxonomy */}
        <section id="sec-references" className="border-t border-white/15 pt-10 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">Literature &amp; Curation</span>
            <h2 className="font-serif text-2xl text-white font-medium drop-shadow-sm">Verified Scientific References</h2>
          </div>

          <p className="text-xs text-[#f1ede6] leading-relaxed font-normal drop-shadow-sm">
            {entry.verifiedTaxonomyNotes}
          </p>

          <ul className="list-disc list-inside space-y-1 text-xs text-cyan-100 italic pt-2">
            {entry.references.map((ref, idx) => (
              <li key={idx}>{ref}</li>
            ))}
          </ul>

          <div className="pt-2 text-[11px] font-mono text-cyan-200">
            Last reviewed by bettaIQ Aquatic Biology team: {entry.reviewDate}
          </div>
        </section>

        {/* Related Entries */}
        {relatedEntries.length > 0 && (
          <section className="border-t border-white/15 pt-12 space-y-6">
            <h3 className="font-serif text-2xl text-white font-medium drop-shadow-sm">
              Related Specimens in {entry.speciesGroup}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedEntries.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectEntry(rel)}
                  className="p-4 rounded-2xl bg-black/30 hover:bg-black/45 backdrop-blur-xl border border-white/15 hover:border-cyan-400/50 transition-all cursor-pointer group space-y-3 shadow-xl"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-black/40">
                    {rel.image ? (
                      <img
                        src={resolveBettaImage(rel.image)}
                        alt={rel.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Fish className="w-8 h-8 opacity-50" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-white group-hover:text-cyan-200 transition-colors font-medium">
                      {rel.name}
                    </h4>
                    <span className="text-xs text-cyan-100/90 italic font-medium">{rel.scientificName}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Taxonomy Detail Modal - Glassmorphic */}
      {showTaxonomyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-black/60 backdrop-blur-2xl border border-cyan-400/40 rounded-2xl p-6 sm:p-8 space-y-5 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <button
              onClick={() => setShowTaxonomyModal(false)}
              className="absolute top-4 right-4 p-2 text-cyan-200 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-cyan-300 font-bold">Taxonomic Authority</span>
              <h3 className="font-serif text-2xl text-white font-medium">{entry.scientificName}</h3>
              {entry.taxonomicAuthority && (
                <p className="font-mono text-xs text-cyan-100 font-medium">Described by: {entry.taxonomicAuthority}</p>
              )}
            </div>

            <div className="space-y-3 text-xs text-[#f1ede6] leading-relaxed">
              <div className="p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 space-y-1">
                <span className="font-mono uppercase text-[11px] text-cyan-300 font-bold block">Systematic Group</span>
                <p className="text-white">{entry.speciesGroup}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 space-y-1">
                <span className="font-mono uppercase text-[11px] text-cyan-300 font-bold block">Taxonomic Curation Notes</span>
                <p className="text-white">{entry.verifiedTaxonomyNotes}</p>
              </div>

              {entry.typeLocality && (
                <div className="p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 space-y-1">
                  <span className="font-mono uppercase text-[11px] text-rose-300 font-bold block">Type Locality</span>
                  <p className="text-white">{entry.typeLocality}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowTaxonomyModal(false)}
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono uppercase tracking-wider rounded-lg font-bold shadow-lg cursor-pointer"
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
