import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, Copy, Check, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { QUESTIONNAIRE_STEPS, evaluateSymptoms, TriageResult } from '../data/symptomQuestions.ts';
import { NavTab } from './Navbar.tsx';

interface SymptomCheckerViewProps {
  onNavigateToTab: (tab: NavTab, targetId?: string) => void;
}

export const SymptomCheckerView: React.FC<SymptomCheckerViewProps> = ({ onNavigateToTab }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);

  const currentStep = QUESTIONNAIRE_STEPS[currentStepIndex];
  const triageResult: TriageResult = evaluateSymptoms(selectedOptions);

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) => {
      if (id === 'normal-swimming') {
        const step2Ids = QUESTIONNAIRE_STEPS[1].options.map(o => o.id);
        return [...prev.filter(item => !step2Ids.includes(item)), id];
      }
      if (id === 'normal-appetite') {
        const step3Ids = QUESTIONNAIRE_STEPS[2].options.map(o => o.id);
        return [...prev.filter(item => !step3Ids.includes(item)), id];
      }
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleNext = () => {
    if (currentStepIndex < QUESTIONNAIRE_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo({ top: 140, behavior: 'smooth' });
    } else {
      setIsCompleted(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo({ top: 140, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setSelectedOptions([]);
    setCurrentStepIndex(0);
    setIsCompleted(false);
    setCopiedReport(false);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const copyTriageSummary = () => {
    const textReport = `bettaIQ Triage Assessment Report
Date: ${new Date().toLocaleDateString()}
Urgency: ${triageResult.urgency}
Summary: ${triageResult.urgencyDescription}

Selected Observations:
${selectedOptions.map(id => `• ${id}`).join('\n')}

Differential Match Probabilities:
${triageResult.matchedConditions.map(c => `• ${c.conditionName} (${c.confidenceScore}% confidence)`).join('\n')}

Immediate Triage Steps:
${triageResult.immediateActions.map(a => `1. ${a}`).join('\n')}

Disclaimer: Educational decision support only. Does not replace professional veterinary consultation.`;

    navigator.clipboard.writeText(textReport);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  return (
    <div className="relative min-h-screen text-[#cdc7bb]">
      {/* Permanent Fixed Full-Page Background */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(2, 6, 16, 0.42),
              rgba(2, 6, 16, 0.68)
            ),
            url('${import.meta.env.BASE_URL}assets/aistudio/image_c7a2dc1e.png')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-12 pb-32">
        {/* Editorial Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto border-b border-white/10 pb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-200 bg-cyan-950/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-400/30 inline-flex items-center gap-2 shadow-md">
            Clinical Decision Support
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            Smart Symptom Checker
          </h1>
          <p className="text-base text-[#f1ede6] leading-relaxed font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
            An interactive questionnaire evaluating physical lesions, swimming locomotion, appetite response, and tank chemistry to deliver calm, safe triage steps.
          </p>
        </div>

        {!isCompleted ? (
          /* Multi-Step Flow */
          <div className="space-y-8">
            {/* Progress Tracker */}
            <div className="flex items-center justify-between text-xs font-mono text-cyan-200 border-b border-white/10 pb-3">
              <span>Question {currentStep.stepNumber} of {QUESTIONNAIRE_STEPS.length}</span>
              <span className="font-semibold text-white">{currentStep.title}</span>
            </div>

            {/* Current Step Card */}
            <div className="space-y-6">
              <div className="space-y-1.5">
                <h2 className="font-serif text-2xl sm:text-3xl text-white drop-shadow-sm">
                  {currentStep.prompt}
                </h2>
                <p className="text-xs text-[#ded9cf]">{currentStep.helpText}</p>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentStep.options.map((option) => {
                  const isSelected = selectedOptions.includes(option.id);
                  return (
                    <div
                      key={option.id}
                      onClick={() => toggleOption(option.id)}
                      className={`p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 backdrop-blur-xl ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                          : 'bg-black/35 border-white/15 hover:border-white/30 hover:bg-black/50'
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'bg-emerald-400 text-black' : 'border border-white/40'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      <div className="space-y-1">
                        <div className={`text-sm font-medium ${isSelected ? 'text-emerald-200' : 'text-white'}`}>
                          {option.label}
                        </div>
                        <p className="text-xs text-[#ded9cf] leading-relaxed font-normal">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  onClick={handlePrev}
                  disabled={currentStepIndex === 0}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer bg-black/30 backdrop-blur-md rounded-xl border border-white/15"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <div className="text-xs font-mono text-cyan-200">
                  {selectedOptions.length} symptom{selectedOptions.length === 1 ? '' : 's'} noted
                </div>

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-white hover:bg-slate-100 text-black text-xs font-semibold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-cyan-400/20"
                >
                  <span>{currentStepIndex === QUESTIONNAIRE_STEPS.length - 1 ? 'Evaluate Symptoms' : 'Continue'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Urgency Summary */}
            <div className="p-8 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/20 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-cyan-200 font-bold">
                  Triage Evaluation
                </span>
                <span className={`text-xs font-mono tracking-wider uppercase font-bold px-3 py-1 rounded-full border backdrop-blur-md ${
                  triageResult.urgency === 'Critical Emergency' ? 'text-rose-200 bg-rose-950/60 border-rose-500/50' : triageResult.urgency === 'High Urgency' ? 'text-amber-200 bg-amber-950/60 border-amber-500/50' : 'text-emerald-200 bg-emerald-950/60 border-emerald-500/50'
                }`}>
                  {triageResult.urgency}
                </span>
              </div>

              <p className="font-serif text-xl sm:text-2xl text-white leading-snug drop-shadow-sm">
                {triageResult.urgencyDescription}
              </p>
            </div>

            {/* Differential Conditions */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-white drop-shadow-sm">
                Matched Pathological Conditions
              </h3>

              {triageResult.matchedConditions.length === 0 ? (
                <div className="p-6 rounded-2xl bg-black/35 backdrop-blur-xl border border-white/15 text-sm text-[#ded9cf]">
                  No severe infectious pathogens matched. Focus on maintaining pristine water parameters.
                </div>
              ) : (
                <div className="space-y-3">
                  {triageResult.matchedConditions.map((match) => (
                    <div key={match.conditionId} className="p-5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/15 space-y-2 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-serif text-lg text-white font-medium">{match.conditionName}</h4>
                          <span className="text-[11px] font-mono text-cyan-300">{match.category}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-emerald-300 font-bold px-2.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-400/30">{match.confidenceScore}% Correlation</span>
                          <button
                            onClick={() => onNavigateToTab('health', match.conditionId)}
                            className="text-xs font-semibold uppercase tracking-wider text-cyan-200 hover:text-white cursor-pointer flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                          >
                            <span>Review</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-[#ded9cf]">
                        Observed factors: {match.keyMatchReasons.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Immediate Safe Action Steps */}
            <div className="p-8 rounded-2xl bg-emerald-950/35 backdrop-blur-xl border border-emerald-400/35 space-y-4 shadow-xl">
              <h3 className="font-serif text-2xl text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Immediate Safe Triage Steps</span>
              </h3>
              <ol className="space-y-2 text-xs sm:text-sm text-[#d6ede2] list-decimal list-inside leading-relaxed font-normal">
                {triageResult.immediateActions.map((action, idx) => (
                  <li key={idx} className="pl-1">{action}</li>
                ))}
              </ol>
            </div>

            {/* Contraindications */}
            <div className="p-8 rounded-2xl bg-rose-950/35 backdrop-blur-xl border border-rose-500/40 space-y-4 shadow-xl">
              <h3 className="font-serif text-2xl text-rose-200 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span>What NOT to Do</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#f5d0d0] leading-relaxed font-normal">
                {triageResult.criticalWarnings.map((warn, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>{warn}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <button
                onClick={handleReset}
                className="text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white flex items-center gap-2 cursor-pointer bg-black/35 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Over</span>
              </button>

              <button
                onClick={copyTriageSummary}
                className="px-6 py-2.5 bg-emerald-600/35 hover:bg-emerald-600/50 text-emerald-100 border border-emerald-400/40 text-xs font-semibold uppercase tracking-wider rounded-xl backdrop-blur-md transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/30"
              >
                {copiedReport ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedReport ? 'Copied to Clipboard' : 'Copy Summary for Veterinarian'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
