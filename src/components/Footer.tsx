import React from 'react';
import { NavTab } from './Navbar.tsx';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-white/10 bg-transparent text-[#b5afa3] text-xs font-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-12 bg-transparent">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <span className="font-serif text-2xl text-white block font-normal drop-shadow-sm">
              betta<span className="font-sans font-light tracking-widest uppercase text-xs text-cyan-400 ml-1">IQ</span>
            </span>
            <p className="text-xs text-[#cdc7bb] leading-relaxed drop-shadow-sm">
              Know Better. Care Smarter. Dedicated exclusively to the welfare, biology, taxonomy, and scientific healthcare of the genus <em>Betta</em>.
            </p>
            <div className="text-[11px] font-mono text-[#a8a295]">
              Strictly non-commercial educational archive. Zero livestock trading.
            </div>
          </div>

          {/* Module Links */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#dcd7cc]">
              Platform Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('explore')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Scientific Encyclopedia
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('health')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Health & Disease Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('care-guide')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Husbandry & Nitrogen Cycle
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('knowledge')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Knowledge Hub & Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  About & Ethical Oath
                </button>
              </li>
            </ul>
          </div>

          {/* Scientific Reference Authorities */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#dcd7cc]">
              Reference Authorities
            </div>
            <ul className="space-y-2 text-[11px] font-mono text-[#a09a8f]">
              <li>
                <a
                  href="https://www.ibcbettas.org/about-betta-splendens/smp/species-complex-management/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>IBC Complexes & SMP</span>
                  <ExternalLink className="w-3 h-3 text-[#6e685f]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.fishbase.se/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>FishBase Taxonomy</span>
                  <ExternalLink className="w-3 h-3 text-[#6e685f]" />
                </a>
              </li>
              <li>
                <a
                  href="https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatmain.asp"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>CAS Catalog of Fishes</span>
                  <ExternalLink className="w-3 h-3 text-[#6e685f]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.iucnredlist.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>IUCN Red List of Species</span>
                  <ExternalLink className="w-3 h-3 text-[#6e685f]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.merckvetmanual.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Merck Veterinary Manual</span>
                  <ExternalLink className="w-3 h-3 text-[#6e685f]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Discreet Veterinary Notice */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#dcd7cc]">
              Veterinary Notice
            </div>
            <p className="text-[11px] text-[#787267] leading-relaxed">
              bettaIQ provides educational resources and triage guidelines grounded in published literature. It does not replace in-person diagnosis by a licensed aquatic veterinarian. Never administer unverified chemical dosages or toxic essential oils.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#6e685f]">
          <div>
            &copy; {new Date().getFullYear()} bettaIQ. &ldquo;Know Better. Care Smarter.&rdquo;
          </div>
          <div className="flex items-center gap-4">
            <span>No Marketplace</span>
            <span>·</span>
            <span>Zero Commercial Sales</span>
            <span>·</span>
            <span>Peer-Reviewed Ichthyology</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
