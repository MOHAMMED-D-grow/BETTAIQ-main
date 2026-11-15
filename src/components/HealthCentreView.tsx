import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  X,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Stethoscope,
  BookOpen,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { HEALTH_CONDITIONS, HealthCondition } from '../data/health.ts';
import { resolveBettaImage } from '../data/varieties.ts';

interface HealthCentreViewProps {
  initialConditionId?: string;
  onOpenSymptomChecker: () => void;
}

export const HealthCentreView: React.FC<HealthCentreViewProps> = ({ initialConditionId, onOpenSymptomChecker }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<HealthCondition | null>(() => {
    if (initialConditionId) {
      return HEALTH_CONDITIONS.find(c => c.id === initialConditionId) || null;
    }
    return null;
  });

  const [showDifferentialTool, setShowDifferentialTool] = useState(false);

  const filteredConditions = useMemo(() => {
    return HEALTH_CONDITIONS.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.detailedOverview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.primarySymptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        c.possibleCauses.some(cause => cause.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        categoryFilter === 'all' || c.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const severityBadgeColor = (severity: HealthCondition['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-950/80 text-red-200 border-red-500/60 shadow-sm';
      case 'High':
        return 'bg-amber-950/80 text-amber-200 border-amber-500/60 shadow-sm';
      case 'Moderate':
        return 'bg-cyan-950/80 text-cyan-200 border-cyan-400/60 shadow-sm';
      default:
        return 'bg-emerald-950/80 text-emerald-200 border-emerald-400/60 shadow-sm';
    }
  };

  return (
    <div className="relative isolate min-h-screen text-[#cdc7bb]">
  {/* Fixed Ocean Background */}
  <div
    aria-hidden="true"
    className="fixed inset-0 pointer-events-none"
    style={{
      zIndex: -1,
      backgroundImage: `
        linear-gradient(
          to bottom,
          rgba(2, 6, 16, 0.18),
          rgba(2, 6, 16, 0.38)
        ),
        url('${import.meta.env.BASE_URL}assets/aistudio/image_c7a2dc1e.png')
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-12 pb-32">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-200 bg-cyan-950/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-400/30 inline-flex items-center gap-2 shadow-md">
              <Stethoscope className="w-3.5 h-3.5 text-cyan-300" />
              <span>Aquatic Pathology &amp; Clinical Triage</span>
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              Health &amp; Diseases
            </h1>
            <p className="text-base text-[#f1ede6] leading-relaxed font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
              An image-led clinical library grounded in peer-reviewed veterinary pathology standards (AAFV, Dr. Ruth Francis-Floyd, and Merck Veterinary Manual). Over 80% of early health complications resolve with pristine water quality and thermal stability.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={() => setShowDifferentialTool(!showDifferentialTool)}
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-cyan-200 border border-white/20 bg-black/40 hover:bg-black/60 rounded-xl backdrop-blur-md cursor-pointer transition-all shadow-md"
            >
              {showDifferentialTool ? 'Close Differential' : 'Compare Ich vs. Velvet'}
            </button>
            <button
              onClick={onOpenSymptomChecker}
              className="px-5 py-2.5 bg-emerald-600/30 hover:bg-emerald-600/45 text-emerald-100 border border-emerald-400/40 backdrop-blur-md text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-emerald-950/30"
            >
              <span>Interactive Symptom Explorer</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Diagnostic Differential Tool: Ich vs Velvet */}
        {showDifferentialTool && (
          <div className="p-8 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/20 space-y-6 animate-in fade-in duration-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-300 font-bold">Clinical Differential Diagnosis</span>
                <h2 className="font-serif text-2xl text-white drop-shadow-sm">
                  Ichthyophthirius (Ich) vs. Piscinoodinium (Velvet)
                </h2>
              </div>
              <button
                onClick={() => setShowDifferentialTool(false)}
                className="text-xs uppercase tracking-wider text-white/80 hover:text-white cursor-pointer px-3.5 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/10 transition-colors"
              >
                Dismiss
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#f1ede6]">
              <div className="space-y-3 p-5 rounded-xl bg-black/30 backdrop-blur-md border border-cyan-400/25">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-white font-semibold">Ich / White Spot</span>
                  <span className="text-[11px] font-mono text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-400/30">Ciliated Protozoan</span>
                </div>
                <ul className="space-y-2 text-xs font-normal leading-relaxed text-[#ded9cf]">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span><strong className="text-white">Visual:</strong> Discrete, salt-grain nodules (0.5–1.0 mm) raised visibly above the skin.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span><strong className="text-white">Distribution:</strong> Randomly scattered across caudal, dorsal fins, and flanks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span><strong className="text-white">Light Interaction:</strong> Clearly visible under ambient tank lighting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span><strong className="text-white">Thermal Strategy:</strong> Raising temp to 82°F–84°F speeds life cycle to target theronts.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 p-5 rounded-xl bg-black/30 backdrop-blur-md border border-amber-400/25">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-white font-semibold">Velvet / Gold Dust</span>
                  <span className="text-[11px] font-mono text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-950/50 border border-amber-400/30">Armored Dinoflagellate</span>
                </div>
                <ul className="space-y-2 text-xs font-normal leading-relaxed text-[#ded9cf]">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong className="text-white">Visual:</strong> Microscopic (0.01 mm) golden-amber or rust-colored powder dusting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong className="text-white">Distribution:</strong> Concentrated heavily on head, operculum (gills), and dorsal ridge.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong className="text-white">Light Interaction:</strong> Requires a focused beam of flashlight in complete darkness to see sheen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong className="text-white">Key Strategy:</strong> Total blackout: dinospores possess chloroplasts and photosynthesize!</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Search and Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 shadow-lg">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-cyan-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search symptoms, pathogens, remedies..."
              className="w-full pl-10 pr-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl text-sm text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {['all', 'bacterial', 'parasitic', 'fungal', 'digestive', 'systemic'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-black/30 text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-md border border-white/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Image-Led Disease Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredConditions.map((condition) => (
            <div
              key={condition.id}
              onClick={() => setSelectedCondition(condition)}
              className="group rounded-2xl overflow-hidden bg-black/35 backdrop-blur-xl border border-white/15 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Reference Photograph */}
                <div className="aspect-[16/10] overflow-hidden bg-black/60 relative">
                  <img
                    src={resolveBettaImage(condition.image)}
                    alt={condition.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md border font-semibold backdrop-blur-md ${severityBadgeColor(condition.severity)}`}>
                      {condition.severity} Severity
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md bg-black/75 backdrop-blur-md text-white border border-white/20 font-medium">
                      {condition.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-2xl text-white group-hover:text-cyan-300 transition-colors leading-snug drop-shadow-sm font-medium">
                    {condition.name}
                  </h3>
                  <p className="text-xs text-[#e5e0d4] line-clamp-3 font-normal leading-relaxed">
                    {condition.detailedOverview}
                  </p>

                  {/* Top Symptoms Snippet */}
                  <div className="space-y-1.5 pt-3 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-200/90 font-bold">Key Signs</span>
                    <div className="text-xs text-white/95 space-y-1">
                      {condition.primarySymptoms.slice(0, 2).map((s, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 line-clamp-1">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 border-t border-white/10 bg-black/30 backdrop-blur-sm flex items-center justify-between text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold group-hover:text-white transition-colors">
                <span>View Clinical Protocol</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {filteredConditions.length === 0 && (
          <div className="text-center py-16 space-y-4 text-white/70 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/15 p-8">
            <p className="text-base font-medium text-white">No health conditions match your search query.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
              }}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-cyan-300 hover:text-white bg-black/40 border border-cyan-400/40 rounded-xl backdrop-blur-md transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Comprehensive Clinical Detail Modal */}
        {selectedCondition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl overflow-y-auto">
            <div className="relative w-full max-w-4xl bg-[#060b13]/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
              {/* Modal Top Bar */}
              <div className="relative aspect-[21/9] sm:aspect-[24/8] overflow-hidden shrink-0 bg-black/60">
                <img
                  src={resolveBettaImage(selectedCondition.image)}
                  alt={selectedCondition.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060b13] via-[#060b13]/50 to-black/30 pointer-events-none" />
                
                <button
                  onClick={() => setSelectedCondition(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white cursor-pointer transition-colors border border-white/20 backdrop-blur-md"
                  aria-label="Close detail modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider rounded border font-semibold backdrop-blur-md ${severityBadgeColor(selectedCondition.severity)}`}>
                      {selectedCondition.severity} Severity
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider rounded bg-black/75 backdrop-blur-md text-white border border-white/20 font-medium">
                      {selectedCondition.category} Condition
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-white drop-shadow-md">
                    {selectedCondition.name}
                  </h2>
                </div>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 sm:p-10 space-y-8 overflow-y-auto text-sm text-[#f1ede6] font-normal leading-relaxed">
                {/* Detailed Overview */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">Clinical Overview</h3>
                  <p className="text-base text-white/95 leading-relaxed">{selectedCondition.detailedOverview}</p>
                </div>

                {/* Symptoms & Causes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-black/35 backdrop-blur-md border border-cyan-400/20 space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                      Primary Symptoms
                    </h4>
                    <ul className="space-y-2 text-xs text-[#ded9cf]">
                      {selectedCondition.primarySymptoms.map((sym, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold mt-0.5">•</span>
                          <span>{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-black/35 backdrop-blur-md border border-amber-400/20 space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                      Possible Causes &amp; Triggers
                    </h4>
                    <ul className="space-y-2 text-xs text-[#ded9cf]">
                      {selectedCondition.possibleCauses.map((cause, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold mt-0.5">•</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Differential Diagnosis / Similar Conditions */}
                {selectedCondition.similarConditions && selectedCondition.similarConditions.length > 0 && (
                  <div className="p-6 rounded-xl bg-cyan-950/30 backdrop-blur-md border border-cyan-400/30 space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-200 font-bold flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Differential Diagnosis (Similar Conditions to Distinguish)</span>
                    </h4>
                    <div className="space-y-3 pt-1">
                      {selectedCondition.similarConditions.map((sim, idx) => (
                        <div key={idx} className="space-y-1 text-xs">
                          <span className="font-semibold text-white">{sim.name}:</span>
                          <p className="text-[#cde5f4]">{sim.distinction}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Safe Immediate Steps (Triage) */}
                <div className="p-6 rounded-xl bg-emerald-950/35 backdrop-blur-md border border-emerald-400/35 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Safe Immediate Triage Steps</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#d6ede2]">
                    {selectedCondition.safeImmediateSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Evidence-Based Treatment Guidance */}
                <div className="p-6 rounded-xl bg-blue-950/30 backdrop-blur-md border border-blue-400/30 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-blue-200 font-bold flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-blue-300" />
                    <span>Evidence-Based Treatment Guidance</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#d8e6f4]">
                    {selectedCondition.evidenceTreatmentGuidance.map((guidance, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>{guidance}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What NOT to Do */}
                <div className="p-6 rounded-xl bg-red-950/35 backdrop-blur-md border border-red-500/40 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-red-200 font-bold flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span>Dangerous Folk Practices (What NOT to Do)</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#f4d4d4]">
                    {selectedCondition.whatNOTToDo.map((avoid, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">✗</span>
                        <span>{avoid}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Veterinary Consultation Triggers */}
                <div className="p-6 rounded-xl bg-amber-950/35 backdrop-blur-md border border-amber-400/40 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-200 font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Critical Veterinary Consultation Triggers</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#f5e6cb]">
                    {selectedCondition.vetConsultationTriggers.map((trig, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">⚠</span>
                        <span>{trig}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Credible Citations & Review Date */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-white/70">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                    <span>References: {selectedCondition.evidenceSource}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reviewed: {selectedCondition.reviewDate}</span>
                  </div>
                </div>
              </div>

              {/* Modal Bottom Action */}
              <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between">
                <button
                  onClick={() => setSelectedCondition(null)}
                  className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedCondition(null);
                    onOpenSymptomChecker();
                  }}
                  className="px-6 py-2.5 bg-emerald-600/35 hover:bg-emerald-600/50 text-emerald-100 border border-emerald-400/40 text-xs font-semibold uppercase tracking-wider rounded-xl backdrop-blur-md transition-colors cursor-pointer shadow-lg shadow-emerald-950/30"
                >
                  Launch Symptom Checker for this Fish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
