import React, { useState } from 'react';
import { Search, Menu, X, Stethoscope } from 'lucide-react';

export type NavTab = 'home' | 'explore' | 'health' | 'care-guide' | 'knowledge' | 'about' | 'symptom-checker';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenSearch: () => void;
  onOpenStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenSearch, onOpenStudio }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: 'health', label: 'Health & Diseases' },
    { id: 'care-guide', label: 'Care Guide' },
    { id: 'knowledge', label: 'Knowledge' },
    { id: 'about', label: 'About' },
  ];

  const handleNav = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#05080c]/85 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
        
        {/* Brand Wordmark */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-baseline gap-2.5 text-left cursor-pointer whitespace-nowrap shrink-0 group"
        >
          <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#f5f3ee] group-hover:text-cyan-300 transition-colors">
            betta<span className="font-sans font-light tracking-widest uppercase text-xs text-cyan-400 ml-1">IQ</span>
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-wide text-[#b8b3a8]">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer font-medium ${
                  isActive
                    ? 'text-[#f5f3ee] border-b-2 border-cyan-400'
                    : 'hover:text-[#f5f3ee]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Search & Symptom Checker Quick Action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs text-[#a09a8f] hover:text-[#f5f3ee] bg-[#0c1219] hover:bg-[#121b24] border border-white/[0.08] rounded-md transition-colors cursor-pointer"
            aria-label="Search collection"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline font-sans text-xs">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] text-[#787267] font-mono">⌘K</kbd>
          </button>

          {onOpenStudio && (
            <button
              onClick={onOpenStudio}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-cyan-200 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/60 rounded-md transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.2)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-cyan-300 shrink-0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Aquatic Water Drop */}
                <path
                  d="M12 3.2C12 3.2 7.2 8.8 7.2 12.3C7.2 15 9.35 17.1 12 17.1C14.65 17.1 16.8 15 16.8 12.3C16.8 8.8 12 3.2 12 3.2Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                  fill="currentColor"
                  fillOpacity="0.18"
                />
                {/* Biotope Surface Ripples */}
                <path
                  d="M4.5 18.8C6.6 17.6 9.1 17.6 12 18.8C14.9 20 17.4 20 19.5 18.8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M6.8 21.3C8.4 20.5 10.2 20.5 12 21.3C13.8 22.1 15.6 22.1 17.2 21.3"
                  stroke="#67e8f9"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeOpacity="0.8"
                />
              </svg>
              <span>Biotope Studio</span>
            </button>
          )}

          <button
            onClick={() => handleNav('symptom-checker')}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'symptom-checker'
                ? 'bg-cyan-950 text-cyan-200 border border-cyan-700'
                : 'bg-[#102228] hover:bg-[#152e37] text-cyan-200 border border-cyan-800/60'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Symptom Checker</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#b8b3a8] hover:text-[#f5f3ee] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080d12] border-b border-white/[0.08] px-6 py-6 space-y-4 animate-in fade-in duration-150">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`block w-full text-left py-2 text-sm cursor-pointer ${
                currentTab === item.id ? 'text-cyan-400 font-semibold' : 'text-[#b8b3a8]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-white/[0.08]">
            <button
              onClick={() => handleNav('symptom-checker')}
              className="w-full py-2.5 bg-cyan-950 text-cyan-200 border border-cyan-800/60 rounded text-xs font-mono uppercase tracking-wider"
            >
              Interactive Symptom Checker
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
