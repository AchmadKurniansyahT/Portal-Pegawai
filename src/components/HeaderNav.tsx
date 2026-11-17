import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { ScreenId } from '../types/kompetensi';
import { KomdigiEmblem } from './KomdigiEmblem';

interface HeaderNavProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  idpCount: number;
}

const NAV_ITEMS: { id: ScreenId; label: string }[] = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'profil', label: 'Profil Saya' },
  { id: 'katalog', label: 'Katalog Pelatihan' },
  { id: 'rekomendasi', label: 'Rekomendasi' },
  { id: 'idp', label: 'Draf IDP' },
];

export function HeaderNav({
  activeScreen,
  onNavigate,
  idpCount,
}: HeaderNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectNav = (id: ScreenId) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleSelectNav('beranda')}
          className="flex items-center gap-2.5 sm:gap-3 text-left whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007CC3] rounded-lg"
        >
          <KomdigiEmblem className="w-7 h-7 md:w-8 md:h-8 shrink-0" />
          <span className="text-sm md:text-base font-semibold tracking-tight text-[#0A244D]">
            Portal Kompetensi
          </span>
        </button>

        {/* Desktop & Tablet Top Menu (5 Halaman) */}
        <nav
          aria-label="Menu utama"
          className="hidden md:flex items-center gap-1 lg:gap-2"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectNav(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`min-h-[40px] px-2.5 lg:px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007CC3] ${
                  isActive
                    ? 'bg-[#0A244D] text-white font-semibold'
                    : 'text-slate-600 hover:text-[#0A244D] hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'idp' && (
                  <span
                    className={`ml-1.5 tabular-nums ${
                      isActive ? 'text-sky-200' : 'text-[#004B93] font-semibold'
                    }`}
                  >
                    ({idpCount})
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button (Menu Garis Tiga) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#0A244D] hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007CC3]"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Menu utama seluler"
          className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectNav(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl text-left text-sm font-medium flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007CC3] ${
                  isActive
                    ? 'bg-[#0A244D] text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-[#0A244D]'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'idp' && (
                  <span
                    className={`tabular-nums text-xs font-semibold ${
                      isActive ? 'text-sky-200' : 'text-[#004B93]'
                    }`}
                  >
                    {idpCount} pelatihan
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
