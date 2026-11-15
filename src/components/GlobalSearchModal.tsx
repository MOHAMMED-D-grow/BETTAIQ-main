import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { BETTA_ENCYCLOPEDIA, SPECIES_COMPLEXES } from '../data/varieties.ts';
import { HEALTH_CONDITIONS } from '../data/health.ts';
import { TREATMENT_LIBRARY } from '../data/treatments.ts';
import { KNOWLEDGE_ARTICLES } from '../data/articles.ts';
import { NavTab } from './Navbar.tsx';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Wild Betta Species' | 'Species Complex' | 'Ornamental Variety' | 'Health Issue' | 'Treatment' | 'Knowledge Article';
  targetTab: NavTab;
  targetId?: string;
  subSection?: 'wild' | 'complexes' | 'ornamental';
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab, targetId?: string, subSection?: 'wild' | 'complexes' | 'ornamental') => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const allSearchables: SearchResultItem[] = useMemo(() => {
    const results: SearchResultItem[] = [];

    // 1. Wild Species & Ornamental
    BETTA_ENCYCLOPEDIA.forEach((v) => {
      results.push({
        id: `variety-${v.id}`,
        title: v.name,
        subtitle: `${v.scientificName} · ${v.speciesGroup} · ${v.characteristics.slice(0, 80)}...`,
        category: v.catalogueSection === 'wild' ? 'Wild Betta Species' : 'Ornamental Variety',
        targetTab: 'explore',
        targetId: v.id,
        subSection: v.catalogueSection === 'wild' ? 'wild' : 'ornamental'
      });
    });

    // 2. The 13 IBC Species Complexes
    SPECIES_COMPLEXES.forEach((c) => {
      results.push({
        id: `complex-${c.id}`,
        title: c.name,
        subtitle: `IBC Complex · Type: ${c.typeSpecies} · ${c.breedingMode} · ${c.memberSpecies.join(', ')}`,
        category: 'Species Complex',
        targetTab: 'explore',
        subSection: 'complexes'
      });
    });

    // 3. Health Conditions
    HEALTH_CONDITIONS.forEach((h) => {
      results.push({
        id: `health-${h.id}`,
        title: h.name,
        subtitle: `Signs: ${h.primarySymptoms.slice(0, 2).join(', ')}`,
        category: 'Health Issue',
        targetTab: 'health',
        targetId: h.id,
      });
    });

    // 4. Treatments
    TREATMENT_LIBRARY.forEach((t) => {
      results.push({
        id: `treatment-${t.id}`,
        title: t.title,
        subtitle: `${t.category} · Safety: ${t.safetyRating} · ${t.summary.slice(0, 80)}...`,
        category: 'Treatment',
        targetTab: 'health',
      });
    });

    // 5. Articles
    KNOWLEDGE_ARTICLES.forEach((a) => {
      results.push({
        id: `article-${a.id}`,
        title: a.title,
        subtitle: `${a.summary.slice(0, 90)}...`,
        category: 'Knowledge Article',
        targetTab: 'knowledge',
        targetId: a.id,
      });
    });

    return results;
  }, []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allSearchables
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      })
      .slice(0, 10);
  }, [allSearchables, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#090e13] border border-cyan-900/40 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Box */}
        <div className="relative flex items-center border-b border-white/[0.08] px-4 py-3.5">
          <Search className="w-5 h-5 text-cyan-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search wild taxa, 13 complexes, show morphs, diseases, care..."
            className="w-full bg-transparent text-[#f5f3ee] text-base placeholder-[#6e685f] focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#8c8577] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-3 px-2 py-1 text-xs font-mono uppercase tracking-wider text-[#8c8577] hover:text-white bg-white/[0.04] rounded"
          >
            ESC
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {searchResults.length > 0 ? (
            <div className="space-y-1">
              {searchResults.map((res) => (
                <div
                  key={res.id}
                  onClick={() => {
                    onNavigate(res.targetTab, res.targetId, res.subSection);
                    onClose();
                  }}
                  className="p-3.5 rounded-lg hover:bg-[#101b24] transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                        {res.category}
                      </span>
                      <span className="text-sm font-medium text-[#f5f3ee] group-hover:text-cyan-300 transition-colors">
                        {res.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#a09a8f] line-clamp-1 font-light">
                      {res.subtitle}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8c8577] group-hover:text-cyan-300 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="py-12 text-center text-sm text-[#8c8577] space-y-2">
              <p>No results found for &ldquo;{query}&rdquo;.</p>
              <p className="text-xs">Try searching for &ldquo;macrostoma&rdquo;, &ldquo;coccina&rdquo;, &ldquo;fin rot&rdquo;, or &ldquo;halfmoon&rdquo;.</p>
            </div>
          ) : (
            <div className="p-6 text-xs text-[#8c8577] space-y-3">
              <span className="uppercase font-mono text-[10px] tracking-wider text-[#a09a8f] block">
                Quick Suggested Searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Betta macrostoma', 'splendens complex', 'Crowntail', 'Fin Rot', 'Velvet', 'Labyrinth Organ', '5 Gallon Minimum'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 bg-white/[0.04] hover:bg-white/[0.08] text-[#cdc7bb] rounded font-mono text-xs cursor-pointer transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
