import React, { useState } from 'react';
import { AlertTriangle, Check, X, ShieldAlert } from 'lucide-react';
import { TREATMENT_LIBRARY, TreatmentGuide } from '../data/treatments.ts';

export const TreatmentLibraryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGuide, setSelectedGuide] = useState<TreatmentGuide | null>(null);

  // Salt Selector Assistant state
  const [saltSymptomChoice, setSaltSymptomChoice] = useState<string>('bloating');

  // Hospital tank checklist
  const [hospitalChecklist, setHospitalChecklist] = useState<Record<string, boolean>>({
    'bare-tank': false,
    'preset-heater': false,
    'sponge-filter': false,
    'shallow-water': false,
    'surface-leaf': false,
    'prime-conditioner': false,
  });

  const toggleChecklist = (id: string) => {
    setHospitalChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredGuides = TREATMENT_LIBRARY.filter(g =>
    selectedCategory === 'all' || g.category.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-16 pb-32">
      {/* Editorial Header */}
      <div className="space-y-4 max-w-2xl border-b border-white/[0.08] pb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-[#8c8577]">
          Therapeutics & Pharmacology
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#f5f3ee] tracking-tight">
          Treatment Library
        </h1>
        <p className="text-base text-[#b8b2a5] leading-relaxed font-light">
          Evidence-based pharmacological protocols, osmotic salt chemistry, botanical extracts, and critical medication contraindications.
        </p>
      </div>

      {/* Interactive Tool: Salt Assistant */}
      <section className="p-8 sm:p-10 rounded-lg bg-[#0a0e13] border border-white/[0.08] space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8c8577]">Osmotic Decision Support</span>
          <h2 className="font-serif text-3xl text-[#f5f3ee]">
            Aquarium Salt vs. Epsom Salt
          </h2>
          <p className="text-sm text-[#a29c91] font-light max-w-2xl leading-relaxed">
            Using the wrong salt is a common cause of fatal renal failure in freshwater fish. Select the primary clinical observation to identify the correct compound:
          </p>
        </div>

        {/* Condition choices */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'bloating', label: 'Severe Bloating / Constipation' },
            { id: 'dropsy', label: 'Dropsy / Fluid Retention (Ascites)' },
            { id: 'ich-parasite', label: 'External Parasite / Ich' },
            { id: 'fin-abrasion', label: 'Minor Fin Tear / Slime Coat' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setSaltSymptomChoice(opt.id)}
              className={`p-3.5 rounded text-xs font-medium text-left transition-all cursor-pointer ${
                saltSymptomChoice === opt.id
                  ? 'bg-[#15261f] text-[#d6ede2] border border-[#2d5a47]'
                  : 'bg-[#0f141a] text-[#8c8577] hover:text-[#f5f3ee] border border-white/[0.04]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Dynamic recommendation */}
        <div className="p-6 rounded bg-[#0f141a] space-y-3">
          {saltSymptomChoice === 'bloating' || saltSymptomChoice === 'dropsy' ? (
            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/[0.06] pb-2">
                <span className="font-serif text-xl text-[#95c5ae]">
                  Indicated: 100% Pure Epsom Salt (Magnesium Sulfate — MgSO₄)
                </span>
                <span className="text-xs font-mono text-rose-400">
                  Contraindicated: Aquarium Salt (Sodium Chloride)
                </span>
              </div>
              <p className="text-xs text-[#b8b2a5] leading-relaxed font-light">
                {saltSymptomChoice === 'dropsy'
                  ? 'Dropsy is an end-stage clinical symptom of kidney failure resulting in internal fluid accumulation. Magnesium sulfate creates an external hypertonic gradient, drawing trapped interstitial fluid across cell walls. Regular sodium chloride causes systemic fluid retention and hastens organ collapse.'
                  : 'Magnesium sulfate relaxes internal intestinal smooth muscle and draws water into the colon, relieving impaction without requiring plant fiber that bettas cannot digest.'}
              </p>
              <div className="text-xs font-mono text-[#dcd7cc] pt-1">
                Standard Dose: 1 tablespoon USP Epsom Salt per 1 gallon for a 15-minute supervised dip, or 1 tsp/gal in a bare-bottom hospital tank with daily 50% water changes.
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/[0.06] pb-2">
                <span className="font-serif text-xl text-[#95c5ae]">
                  Indicated: Aquarium Salt (Sodium Chloride — NaCl)
                </span>
                <span className="text-xs font-mono text-amber-400">
                  Epsom Salt is ineffective against protozoan ectoparasites
                </span>
              </div>
              <p className="text-xs text-[#b8b2a5] leading-relaxed font-light">
                Sodium chloride stimulates epidermal goblet cells to secrete a thick protective mucus layer, protecting gill lamellae and open lesions while disrupting the osmoregulation of single-celled protozoa like Ich.
              </p>
              <div className="text-xs font-mono text-[#dcd7cc] pt-1">
                Standard Dose: 1 tablespoon per 3–5 gallons in a hospital tank for up to 7–10 days. Pre-dissolve in water first. Never dose directly into planted tanks.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Critical Medical Warning */}
      <div className="p-8 rounded-lg bg-[#140b0e] border border-[#3b171e] space-y-3">
        <div className="flex items-center gap-2 text-rose-300 font-serif text-lg">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>Toxicology Warning: Melaleuca / Essential Oils in Anabantoid Care</span>
        </div>
        <p className="text-xs sm:text-sm text-[#c7a4a9] leading-relaxed font-light">
          Remedies marketed with the suffix &ldquo;-fix&rdquo; (such as Bettafix or Melafix) contain diluted tea tree oils (*Melaleuca cajeputi*). As Bettas surface to inhale atmospheric air via their labyrinth organ, hydrophobic oils coat the vascularized respiratory lamellae, causing respiratory distress and potential suffocation. Rely strictly on clean water changes, Indian Almond Leaves, or veterinary-prescribed antibiotics.
        </p>
      </div>

      {/* Treatment Guides Category Filter */}
      <div className="flex flex-wrap items-center gap-6 border-b border-white/[0.08] pb-4 text-xs text-[#8c8577]">
        {['all', 'therapeutic salt', 'botanical', 'hospital protocol', 'medication safety'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`capitalize transition-colors cursor-pointer ${
              selectedCategory === cat ? 'text-[#f5f3ee] font-semibold underline underline-offset-4' : 'hover:text-[#f5f3ee]'
            }`}
          >
            {cat === 'all' ? 'All Guides' : cat}
          </button>
        ))}
      </div>

      {/* Treatment Guides List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredGuides.map(guide => (
          <div
            key={guide.id}
            className="p-8 rounded-lg bg-[#0a0e13] border border-white/[0.06] space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#8c8577]">
                <span>{guide.category}</span>
                <span>{guide.safetyRating}</span>
              </div>

              <h3 className="font-serif text-2xl text-[#f5f3ee]">{guide.title}</h3>
              <p className="text-xs sm:text-sm text-[#b8b2a5] leading-relaxed font-light">{guide.summary}</p>

              <div className="p-4 rounded bg-[#0f141a] space-y-1 text-xs text-[#9c9689]">
                <strong className="text-[#f5f3ee] block">Mechanism:</strong>
                {guide.mechanismOfAction}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs">
              <span className="font-mono text-[#787267]">{guide.citations.length} References</span>
              <button
                onClick={() => setSelectedGuide(guide)}
                className="font-semibold text-[#d6ede2] hover:text-white uppercase tracking-wider text-[11px] cursor-pointer"
              >
                View Protocol →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hospital Tank Checklist */}
      <section className="p-8 sm:p-10 rounded-lg bg-[#0a0e13] border border-white/[0.08] space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8c8577]">Quarantine Protocol</span>
          <h2 className="font-serif text-3xl text-[#f5f3ee]">
            Hospital Tank Setup Checklist
          </h2>
          <p className="text-xs text-[#a29c91] font-light max-w-2xl leading-relaxed">
            Essential configuration for isolating weakened or recovering fish without introducing pathogens into main aquariums:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {[
            { id: 'bare-tank', title: 'Bare-Bottom Vessel (2.5–5 gal)', desc: 'Zero substrate; medications bind to porous gravel and detritus.' },
            { id: 'preset-heater', title: 'Heater with Plastic Guard', desc: 'Maintains 78°F–80°F; guard prevents fin burns on lethargic fish.' },
            { id: 'sponge-filter', title: 'Gentle Air-Driven Sponge', desc: 'Never run activated carbon (it removes medications from water).' },
            { id: 'shallow-water', title: 'Shallow Water (4–6 inches)', desc: 'Allows weak fish to breathe atmospheric air with minimal effort.' },
            { id: 'surface-leaf', title: 'Surface Resting Perch', desc: 'Smooth silk plant or Anubias leaf positioned 1 inch below the waterline.' },
            { id: 'prime-conditioner', title: 'Quality Dechlorinator (Prime)', desc: 'Detoxifies heavy metals in daily 50% matched water changes.' },
          ].map(item => {
            const isChecked = hospitalChecklist[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className={`p-5 rounded border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isChecked
                    ? 'bg-[#12261e] border-[#274f3d]'
                    : 'bg-[#0f141a] border-white/[0.04] hover:border-white/[0.1]'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                  isChecked ? 'bg-[#95c5ae] text-[#06090c]' : 'border border-[#555]'
                }`}>
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <div className="space-y-0.5">
                  <div className={`text-xs font-semibold ${isChecked ? 'text-[#d6ede2]' : 'text-[#f5f3ee]'}`}>
                    {item.title}
                  </div>
                  <div className="text-[11px] text-[#8c8577] leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-3xl bg-[#090d12] border border-white/[0.1] rounded-lg shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="p-6 sm:p-8 border-b border-white/[0.08] flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8c8577]">
                  {selectedGuide.category} · {selectedGuide.safetyRating}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f3ee]">{selectedGuide.title}</h2>
              </div>
              <button
                onClick={() => setSelectedGuide(null)}
                className="p-1 text-[#8c8577] hover:text-[#f5f3ee] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-[#b8b2a5]">
              <div className="space-y-1">
                <h3 className="font-mono uppercase tracking-widest text-[#8c8577]">Clinical Summary</h3>
                <p className="text-sm text-[#cdc7bb] leading-relaxed font-light">{selectedGuide.summary}</p>
              </div>

              <div className="p-4 rounded bg-[#0f141a] space-y-1">
                <h4 className="font-mono uppercase tracking-wider text-[#f5f3ee]">Mechanism of Action</h4>
                <p className="leading-relaxed">{selectedGuide.mechanismOfAction}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-mono uppercase tracking-wider text-[#95c5ae] mb-2">Appropriate Uses</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    {selectedGuide.recommendedUseCases.map((u, i) => (
                      <li key={i}>{u}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono uppercase tracking-wider text-rose-400 mb-2">Contraindications</h4>
                  <ul className="space-y-1 list-disc list-inside text-rose-200">
                    {selectedGuide.contraindications.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono uppercase tracking-widest text-[#8c8577]">Standard Step Protocol</h4>
                <div className="space-y-2 p-4 rounded bg-[#0f141a] text-[#cdc7bb]">
                  {selectedGuide.stepByStepProtocol.map((s, i) => (
                    <div key={i}>{s}</div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] text-[#787267]">
                <strong className="block text-[#8c8577]">Citations & References:</strong>
                <ul className="list-disc list-inside italic space-y-0.5 mt-1">
                  {selectedGuide.citations.map((cite, i) => (
                    <li key={i}>{cite}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={() => setSelectedGuide(null)}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#f5f3ee] bg-[#162029] hover:bg-[#1e2c38] rounded cursor-pointer transition-colors"
              >
                Close Protocol
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
