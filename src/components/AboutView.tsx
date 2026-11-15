import React from 'react';
import {
  ShieldCheck,
  BookOpen,
  Award,
  Globe2,
  ExternalLink,
  HeartHandshake,
  CheckCircle2,
  AlertOctagon,
  ArrowRight
} from 'lucide-react';
import { NavTab } from './Navbar.tsx';

interface AboutViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="relative isolate min-h-screen text-[#dcd7cc]">
      {/* Fixed Peat Swamp Biotope Background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(3, 10, 8, 0.42) 0%,
              rgba(2, 8, 12, 0.58) 40%,
              rgba(2, 6, 14, 0.76) 100%
            ),
            url('${import.meta.env.BASE_URL}assets/about/about_biotope_bg.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-16 pb-32">
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-white/15 pb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-300 bg-emerald-950/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/40 shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Ethics, Methodology &amp; Taxonomy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            About bettaIQ
          </h1>
          <p className="font-serif italic text-2xl text-emerald-100/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
            “Know Better. Care Smarter.”
          </p>
          <p className="text-base text-slate-100/95 leading-relaxed font-normal pt-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
            bettaIQ is an independent, non-commercial educational and aquatic health-care platform dedicated exclusively to the genus <em>Betta</em>. We exist to replace pervasive pet-store folklore and commercial neglect with peer-reviewed ichthyology and veterinary pathology.
          </p>
        </div>

        {/* The Three Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-black/40 hover:bg-black/55 backdrop-blur-xl border border-white/15 hover:border-emerald-400/50 space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/70 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shadow-inner">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl text-white drop-shadow-sm font-medium">Strict Non-Commercial Oath</h2>
            <p className="text-xs text-slate-100 font-light leading-relaxed drop-shadow-sm">
              No marketplace, no buying or selling, and no sponsored brand endorsements. We never profit from selling fish or promoting novelty plastic bowls. Every recommendation is driven solely by animal welfare and scientific consensus.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-black/40 hover:bg-black/55 backdrop-blur-xl border border-white/15 hover:border-cyan-400/50 space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/70 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl text-white drop-shadow-sm font-medium">Taxonomic Rigor</h2>
            <p className="text-xs text-slate-100 font-light leading-relaxed drop-shadow-sm">
              We clearly separate biological wild species from domestic ornamental fin forms (Crowntail, Halfmoon). We do not falsely inflate species counts or mislabel artificial color patterns as distinct species.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-black/40 hover:bg-black/55 backdrop-blur-xl border border-white/15 hover:border-purple-400/50 space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-purple-950/70 border border-purple-400/50 flex items-center justify-center text-purple-300 shadow-inner">
              <Globe2 className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl text-white drop-shadow-sm font-medium">Peat Swamp Conservation</h2>
            <p className="text-xs text-slate-100 font-light leading-relaxed drop-shadow-sm">
              Over 50% of wild Betta species in Borneo and Sumatra face critical endangerment due to agricultural peatland drainage. We highlight IUCN Red List statuses and biotope preservation imperatives.
            </p>
          </div>
        </div>

        {/* Grounded Reference Citations */}
        <div className="p-8 sm:p-12 rounded-3xl bg-black/45 backdrop-blur-2xl border border-white/15 space-y-8 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-semibold">
              Taxonomic &amp; Veterinary Foundations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white drop-shadow-sm font-medium">
              Primary Reference Authorities
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed max-w-3xl drop-shadow-sm">
              Our encyclopedia and clinical protocols are compiled in reference to leading institutional databases, peer-reviewed taxonomic monographs, and veterinary pathology manuals:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-[#cdc7bb]">
            <div className="p-5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 hover:border-cyan-400/40 space-y-2.5 transition-all duration-200 shadow-md">
              <span className="font-mono text-cyan-300 font-semibold block text-sm">International Betta Congress (IBC)</span>
              <p className="text-slate-200 font-light leading-relaxed">
                Species Maintenance Programme (SMP) for the 13 species complexes and official show standard fin morph guidelines.
              </p>
              <a
                href="https://www.ibcbettas.org/about-betta-splendens/smp/species-complex-management/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300 hover:text-emerald-200 hover:underline pt-1 font-medium"
              >
                <span>ibcbettas.org</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 hover:border-cyan-400/40 space-y-2.5 transition-all duration-200 shadow-md">
              <span className="font-mono text-cyan-300 font-semibold block text-sm">FishBase &amp; CAS Catalog of Fishes</span>
              <p className="text-slate-200 font-light leading-relaxed">
                Eschmeyer’s Catalog of Fishes (California Academy of Sciences) and FishBase for valid binomials, type localities, and synonyms.
              </p>
              <a
                href="https://www.fishbase.se/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300 hover:text-emerald-200 hover:underline pt-1 font-medium"
              >
                <span>fishbase.se</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 hover:border-cyan-400/40 space-y-2.5 transition-all duration-200 shadow-md">
              <span className="font-mono text-cyan-300 font-semibold block text-sm">IUCN Red List of Threatened Species</span>
              <p className="text-slate-200 font-light leading-relaxed">
                Conservation status assessments, wild population trend trajectories, and protected habitat zones across Southeast Asia.
              </p>
              <a
                href="https://www.iucnredlist.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300 hover:text-emerald-200 hover:underline pt-1 font-medium"
              >
                <span>iucnredlist.org</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 hover:border-emerald-400/40 space-y-2.5 transition-all duration-200 shadow-md">
              <span className="font-mono text-emerald-300 font-semibold block text-sm">Merck Veterinary Manual</span>
              <p className="text-slate-200 font-light leading-relaxed">
                Exotic Animal and Aquatic Medicine sections for safe teleost pharmacology, quarantine protocol, and parasite lifecycles.
              </p>
              <a
                href="https://www.merckvetmanual.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300 hover:text-emerald-200 hover:underline pt-1 font-medium"
              >
                <span>merckvetmanual.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 hover:border-emerald-400/40 space-y-2.5 transition-all duration-200 shadow-md">
              <span className="font-mono text-emerald-300 font-semibold block text-sm">AAFV Clinical Standards</span>
              <p className="text-slate-200 font-light leading-relaxed">
                American Association of Fish Veterinarians diagnostic triage protocols and aquatic animal welfare guidelines.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 hover:border-emerald-400/40 space-y-2.5 transition-all duration-200 shadow-md">
              <span className="font-mono text-emerald-300 font-semibold block text-sm">Tan &amp; Ng (2005) &amp; Kottelat (2013)</span>
              <p className="text-slate-200 font-light leading-relaxed">
                Seminal ichthyological monographs on the labyrinth fishes of the Malay Peninsula, Sumatra, and Borneo.
              </p>
            </div>
          </div>
        </div>

        {/* The 4 Core Humane Standards */}
        <div className="space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-white drop-shadow-sm font-medium">
            The Non-Negotiable Standards of Humane Betta Keeping
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#cdc7bb] font-light">
            <div className="p-6 rounded-2xl bg-black/40 hover:bg-black/55 backdrop-blur-xl border border-white/15 flex items-start gap-4 hover:border-emerald-400/40 transition-all duration-300 shadow-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white drop-shadow-sm text-base">5-Gallon Cycled Aquarium Minimum</h3>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  Bettas require sufficient water volume to dilute metabolic waste and provide swimming enrichment. Bowls and cups lead to rapid ammonia toxicity.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 hover:bg-black/55 backdrop-blur-xl border border-white/15 flex items-start gap-4 hover:border-emerald-400/40 transition-all duration-300 shadow-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white drop-shadow-sm text-base">Controlled Heating (78°F – 80°F)</h3>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  Bettas are ectotherms from equatorial tropical waters. Sub-76°F temperatures suppress immune antibody production and freeze gastrointestinal digestion.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 hover:bg-black/55 backdrop-blur-xl border border-white/15 flex items-start gap-4 hover:border-emerald-400/40 transition-all duration-300 shadow-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white drop-shadow-sm text-base">Gentle Filtration with Surface Air Gap</h3>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  Biological filtration converts deadly ammonia into nitrate. Flow must be gentle, and a tight-fitting lid must trap warm, humid air for the labyrinth organ.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 hover:bg-black/55 backdrop-blur-xl border border-white/15 flex items-start gap-4 hover:border-emerald-400/40 transition-all duration-300 shadow-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white drop-shadow-sm text-base">Banning Caustic Essential Oils</h3>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  Products containing Melaleuca (tea tree oil) coat the water surface and the vascular folds of the labyrinth organ, causing severe respiratory distress.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-950/70 to-teal-950/70 backdrop-blur-2xl border border-emerald-400/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-white drop-shadow-sm font-medium">
              Ready to Explore the Platform?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl font-light leading-relaxed">
              Browse our scientific encyclopedia of wild species, complexes, and show morphs, or access our evidence-based care guides and clinical symptom triage.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('explore')}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Explore Encyclopedia
            </button>
            <button
              onClick={() => onNavigate('care-guide')}
              className="px-6 py-3 bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-400/40 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 backdrop-blur-md"
            >
              Care Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
