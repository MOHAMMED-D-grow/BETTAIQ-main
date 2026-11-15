import React, { useState } from 'react';
import { Droplet, Sparkles, Activity, ShieldCheck, Heart } from 'lucide-react';
import { NITROGEN_CYCLE_STAGES, TANK_MATES } from '../data/careGuides.ts';

export const CareGuideView: React.FC = () => {
  const [activeCycleStage, setActiveCycleStage] = useState(3);
  const [tankMateFilter, setTankMateFilter] = useState<'All' | 'Safe' | 'Conditional / Tank Size Dependent' | 'Strictly Incompatible'>('All');

  // Water parameter calculator
  const [userTemp, setUserTemp] = useState<number>(79);
  const [userAmmonia, setUserAmmonia] = useState<number>(0);
  const [userNitrite, setUserNitrite] = useState<number>(0);
  const [userNitrate, setUserNitrate] = useState<number>(10);
  const [userPH, setUserPH] = useState<number>(7.2);

  const isTempSafe = userTemp >= 78 && userTemp <= 80;
  const isAmmoniaSafe = userAmmonia === 0;
  const isNitriteSafe = userNitrite === 0;
  const isNitrateSafe = userNitrate <= 20;

  const filteredTankMates = TANK_MATES.filter(m =>
    tankMateFilter === 'All' || m.category === tankMateFilter
  );

  return (
    <div className="relative isolate min-h-screen text-[#cdc7bb]">
      {/* Fixed Freshwater Planted Biotope Aquarium Background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(3, 12, 10, 0.36) 0%,
              rgba(2, 9, 14, 0.52) 40%,
              rgba(2, 6, 16, 0.76) 100%
            ),
            url('${import.meta.env.BASE_URL}assets/care/care_biotope_bg.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-16 pb-32">
        {/* Editorial Header */}
        <div className="space-y-4 max-w-3xl border-b border-white/15 pb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-200 bg-cyan-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-400/40 inline-flex items-center gap-2 shadow-md">
            <Droplet className="w-3.5 h-3.5 text-cyan-300" />
            <span>Aquatic Husbandry Standards</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] [text-shadow:_0_3px_14px_rgba(0,0,0,0.85)]">
            Complete Care Guide
          </h1>
          <p className="text-base text-white/95 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-2xl">
            Biological filtration principles, thermal regulation, obligate carnivore nutrition, and compatible aquatic biotope communities.
          </p>
        </div>

        {/* 1. Nitrogen Cycle Visualizer */}
        <section className="p-8 sm:p-10 rounded-2xl bg-black/55 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.55)] space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Biological Chemistry</span>
            </span>
            <h2 className="font-serif text-3xl text-white drop-shadow-sm">
              The Nitrogen Cycle Visualizer
            </h2>
            <p className="text-sm text-[#e0dad0] font-normal max-w-2xl leading-relaxed">
              Nitrifying bacteria form the foundational biological buffer that keeps water non-toxic. Select each stage to examine colonization dynamics:
            </p>
          </div>

          {/* Stage Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {NITROGEN_CYCLE_STAGES.map((s, idx) => (
              <button
                key={s.stage}
                onClick={() => setActiveCycleStage(idx)}
                className={`p-4 rounded-xl text-left transition-all cursor-pointer backdrop-blur-md ${
                  activeCycleStage === idx
                    ? 'bg-emerald-950/70 text-white border border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                    : 'bg-black/30 text-[#a8a295] hover:text-white border border-white/10 hover:border-white/25'
                }`}
              >
                <div className="text-[11px] font-mono text-emerald-400/90 font-medium">Stage 0{s.stage}</div>
                <div className="text-xs font-medium text-white truncate mt-0.5">{s.title}</div>
                <div className="text-[10px] text-[#b0aba0] mt-1">{s.subtext}</div>
              </button>
            ))}
          </div>

          {/* Active Stage Panel */}
          {(() => {
            const currentStage = NITROGEN_CYCLE_STAGES[activeCycleStage];
            return (
              <div className="p-6 sm:p-8 rounded-xl bg-black/45 backdrop-blur-md border border-white/10 space-y-4 shadow-inner">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-3">
                  <h3 className="font-serif text-2xl text-white">{currentStage.title}</h3>
                  <span className="text-xs font-mono text-emerald-300 bg-emerald-950/50 px-2.5 py-1 rounded-md border border-emerald-500/30">
                    Target: {currentStage.targetReading}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#f1ede6] leading-relaxed font-normal">
                  {currentStage.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs">
                  <div>
                    <span className="font-mono uppercase tracking-wider text-cyan-300/90 block">Active Microbial Strain</span>
                    <p className="text-white mt-1 font-medium">{currentStage.keyPlayer}</p>
                  </div>
                  <div>
                    <span className="font-mono uppercase tracking-wider text-cyan-300/90 block">Keeper Responsibility</span>
                    <p className="text-[#ddd7cc] mt-1 font-normal leading-relaxed">
                      {activeCycleStage === 3
                        ? 'Conduct weekly 20% water changes using a gravel siphon to export accumulated nitrate.'
                        : 'Never introduce fish into uncycled water. Seed tank with bottled bacteria or filter squeeze.'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* 2. Water Chemistry Calculator */}
        <section className="p-8 sm:p-10 rounded-2xl bg-black/55 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.55)] space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 inline-flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>Water Quality Verification</span>
            </span>
            <h2 className="font-serif text-3xl text-white drop-shadow-sm">
              Aquarium Parameter Checker
            </h2>
            <p className="text-sm text-white/90 font-normal max-w-2xl leading-relaxed">
              Adjust the sliders to match your liquid test kit readings:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="p-5 rounded-xl bg-black/45 backdrop-blur-md border border-white/10 space-y-2 hover:border-cyan-400/40 transition-all">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#cdc7bb]">Temperature</span>
                <span className="text-white font-semibold">{userTemp}°F</span>
              </div>
              <input
                type="range"
                min="70"
                max="86"
                value={userTemp}
                onChange={(e) => setUserTemp(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className={`text-[11px] font-mono font-medium ${isTempSafe ? 'text-emerald-300' : 'text-amber-400'}`}>
                {isTempSafe ? '78°–80°F Optimal' : 'Sub-optimal'}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-black/45 backdrop-blur-md border border-white/10 space-y-2 hover:border-cyan-400/40 transition-all">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#cdc7bb]">Ammonia</span>
                <span className="text-white font-semibold">{userAmmonia} ppm</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                step="0.25"
                value={userAmmonia}
                onChange={(e) => setUserAmmonia(Number(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer"
              />
              <div className={`text-[11px] font-mono font-medium ${isAmmoniaSafe ? 'text-emerald-300' : 'text-rose-400'}`}>
                {isAmmoniaSafe ? '0.00 ppm Ideal' : 'TOXIC'}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-black/45 backdrop-blur-md border border-white/10 space-y-2 hover:border-cyan-400/40 transition-all">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#cdc7bb]">Nitrite</span>
                <span className="text-white font-semibold">{userNitrite} ppm</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                step="0.25"
                value={userNitrite}
                onChange={(e) => setUserNitrite(Number(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer"
              />
              <div className={`text-[11px] font-mono font-medium ${isNitriteSafe ? 'text-emerald-300' : 'text-rose-400'}`}>
                {isNitriteSafe ? '0.00 ppm Ideal' : 'TOXIC'}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-black/45 backdrop-blur-md border border-white/10 space-y-2 hover:border-cyan-400/40 transition-all">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#cdc7bb]">Nitrate</span>
                <span className="text-white font-semibold">{userNitrate} ppm</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={userNitrate}
                onChange={(e) => setUserNitrate(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className={`text-[11px] font-mono font-medium ${isNitrateSafe ? 'text-emerald-300' : 'text-amber-400'}`}>
                {isNitrateSafe ? '<20 ppm Safe' : 'Elevated'}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-black/45 backdrop-blur-md border border-white/10 space-y-2 hover:border-cyan-400/40 transition-all">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#cdc7bb]">pH Value</span>
                <span className="text-white font-semibold">{userPH.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="6.0"
                max="8.5"
                step="0.1"
                value={userPH}
                onChange={(e) => setUserPH(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="text-[11px] font-mono text-emerald-300 font-medium">
                6.8–7.5 Standard
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-black/55 backdrop-blur-md border border-white/15 text-xs text-[#e5e0d8] flex items-center gap-3 shadow-inner">
            {(!isAmmoniaSafe || !isNitriteSafe) ? (
              <span className="text-rose-300 font-medium">
                Ammonia or nitrite present. Perform an immediate 50% water change with dechlorinator (Seachem Prime) to prevent respiratory burns.
              </span>
            ) : !isTempSafe ? (
              <span className="text-amber-300 font-medium">
                Temperature outside the ideal 78°–80°F range. Calibrate heater gradually to prevent metabolic stress.
              </span>
            ) : (
              <span className="text-emerald-300 font-medium">
                All tested parameters are within optimal biological ranges for Betta splendens. Maintain regular weekly maintenance.
              </span>
            )}
          </div>
        </section>

        {/* 3. Nutrition Science */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 inline-flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" />
              <span>Carnivore Physiology</span>
            </span>
            <h2 className="font-serif text-3xl text-white drop-shadow-sm">
              Feeding &amp; Digestive Nutrition
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 rounded-2xl bg-black/55 backdrop-blur-xl border border-white/15 space-y-3 hover:border-cyan-400/40 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <h3 className="font-serif text-xl text-white font-medium">The Eyeball Principle</h3>
              <p className="text-xs text-white/90 leading-relaxed font-normal">
                A Betta’s stomach is approximately the size of its eye. Feeding more than 2 to 4 small pellets per meal causes gastrointestinal impaction and presses against the swim bladder chamber.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/55 backdrop-blur-xl border border-white/15 space-y-3 hover:border-cyan-400/40 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <h3 className="font-serif text-xl text-white font-medium">Pre-Soaking Pellets</h3>
              <p className="text-xs text-white/90 leading-relaxed font-normal">
                Always hydrate dry pellets in a spoonful of tank water for 2 minutes before offering. Dry extruded foods expand significantly upon absorbing stomach fluids, inducing severe bloat.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/55 backdrop-blur-xl border border-white/15 space-y-3 hover:border-cyan-400/40 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <h3 className="font-serif text-xl text-white font-medium">Weekly Fasting Day</h3>
              <p className="text-xs text-white/90 leading-relaxed font-normal">
                Designate one day each week for fasting. A 24-hour digestive rest allows the short carnivorous intestine to completely clear residual matter and prevents constipation.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Tank Mates Matrix */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/15 pb-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Co-Housing Standards</span>
              </span>
              <h2 className="font-serif text-3xl text-white drop-shadow-sm">
                Compatible Tank Mates
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {(['All', 'Safe', 'Conditional / Tank Size Dependent', 'Strictly Incompatible'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setTankMateFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer backdrop-blur-md ${
                    tankMateFilter === tab
                      ? 'bg-cyan-950/80 text-cyan-200 border border-cyan-400/60 shadow-sm font-semibold'
                      : 'bg-black/50 text-[#cdc7bb] hover:text-white border border-white/15 hover:border-white/30'
                  }`}
                >
                  {tab === 'All' ? 'All' : tab.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTankMates.map((mate, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-black/55 backdrop-blur-xl border border-white/15 space-y-3 hover:border-cyan-400/40 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-serif text-xl text-white font-medium">{mate.species}</h3>
                  <span className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md border font-semibold ${
                    mate.category === 'Safe'
                      ? 'bg-emerald-950/70 text-emerald-200 border-emerald-400/50'
                      : mate.category === 'Strictly Incompatible'
                      ? 'bg-rose-950/70 text-rose-200 border-rose-400/50'
                      : 'bg-amber-950/70 text-amber-200 border-amber-400/50'
                  }`}>
                    {mate.category.split('/')[0]}
                  </span>
                </div>
                <div className="text-xs text-[#cdc7bb] font-mono">
                  {mate.temperament} · Min Tank: {mate.recommendedTankSize}
                </div>
                <p className="text-xs text-white/90 leading-relaxed font-normal pt-1">
                  {mate.notes}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
