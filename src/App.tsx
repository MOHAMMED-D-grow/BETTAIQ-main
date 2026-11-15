/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar.tsx';
import { HomeHero } from './components/HomeHero.tsx';
import { EncyclopediaView, ExploreTabSection } from './components/EncyclopediaView.tsx';
import { HealthCentreView } from './components/HealthCentreView.tsx';
import { SymptomCheckerView } from './components/SymptomCheckerView.tsx';
import { CareGuideView } from './components/CareGuideView.tsx';
import { KnowledgeHubView } from './components/KnowledgeHubView.tsx';
import { AboutView } from './components/AboutView.tsx';
import { GlobalSearchModal } from './components/GlobalSearchModal.tsx';
import { Footer } from './components/Footer.tsx';
import { CinematicStudioModal } from './components/CinematicStudioModal.tsx';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedTargetId, setSelectedTargetId] = useState<string | undefined>(undefined);
  const [selectedExploreSection, setSelectedExploreSection] = useState<ExploreTabSection>('wild');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [lightingMode, setLightingMode] = useState<'sunlight' | 'midnight'>('midnight');

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (
    tab: NavTab,
    targetId?: string,
    subSection?: 'wild' | 'complexes' | 'ornamental'
  ) => {
    setCurrentTab(tab);
    setSelectedTargetId(targetId);
    if (subSection) {
      setSelectedExploreSection(subSection);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col text-[#dcd7cc] selection:bg-cyan-950/60 selection:text-cyan-200 ${
  currentTab === 'explore' || currentTab === 'care-guide' || currentTab === 'health' || currentTab === 'knowledge' || currentTab === 'home' ? 'bg-transparent' : 'bg-[#05080c]'
}`}>
      {/* Sunlight Biotope Ambient Atmosphere Overlay */}
      {lightingMode === 'sunlight' && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-700 bg-gradient-to-b from-amber-400/[0.08] via-transparent to-emerald-950/[0.12] mix-blend-screen"
        />
      )}

      {/* Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => handleNavigate(tab)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenStudio={() => setIsStudioOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeHero
            onNavigate={handleNavigate}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenStudio={() => setIsStudioOpen(true)}
          />
        )}

        {currentTab === 'explore' && (
          <EncyclopediaView
            initialVarietyId={selectedTargetId}
            initialSection={selectedExploreSection}
            onClearInitial={() => setSelectedTargetId(undefined)}
          />
        )}

        {currentTab === 'health' && (
          <HealthCentreView
            initialConditionId={selectedTargetId}
            onOpenSymptomChecker={() => handleNavigate('symptom-checker')}
          />
        )}

        {currentTab === 'symptom-checker' && (
          <SymptomCheckerView
            onNavigateToTab={handleNavigate}
          />
        )}

        {currentTab === 'care-guide' && (
          <CareGuideView />
        )}

        {currentTab === 'knowledge' && (
          <KnowledgeHubView />
        )}

        {currentTab === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Cinematic Biotope Studio Modal */}
      <CinematicStudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        lightingMode={lightingMode}
        onToggleLighting={setLightingMode}
      />

      {/* Footer */}
      <div className="relative z-10 mt-auto w-full">
        <Footer onSelectTab={(tab) => handleNavigate(tab)} />
      </div>
    </div>
  );
}
