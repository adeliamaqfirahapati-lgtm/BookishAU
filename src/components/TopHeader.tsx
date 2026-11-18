import { useState } from 'react';
import { BOOKISH_ASSETS } from '../data/bookishSeed';
import type { NavRoute } from '../types/bookish';
import { SafeArtwork } from './SafeArtwork';

interface TopHeaderProps {
  activeBookTitle: string;
  activeChapterSubtitle: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onDraftNewChapter: () => void;
  onOpenMobileMenu: () => void;
  onNavigate: (route: NavRoute) => void;
}

export function TopHeader({
  activeBookTitle,
  activeChapterSubtitle,
  searchQuery,
  onSearchChange,
  onDraftNewChapter,
  onOpenMobileMenu,
  onNavigate,
}: TopHeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 sm:px-8 gap-3">
      {/* Left: Mobile Drawer Toggle + Folder Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high"
          aria-label="Buka menu navigasi"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-4 text-on-surface-variant font-label-md text-label-md min-w-0">
          <span className="flex items-center gap-1.5 text-on-surface truncate">
            <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">
              folder_open
            </span>
            <span className="truncate max-w-[140px] sm:max-w-xs">{activeBookTitle}</span>
          </span>
          <span className="hidden md:inline text-outline-variant">/</span>
          <span className="hidden md:inline text-on-surface-variant truncate">
            {activeChapterSubtitle}
          </span>
        </div>
      </div>

      {/* Center: Pill Search Input */}
      <div className="hidden sm:block flex-1 max-w-md mx-4">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-[18px] text-outline pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari trope AU, tag kedai kopi, musuh-jadi-kekasih..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-surface-container text-on-surface placeholder:text-outline text-label-sm font-label-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
          />
        </div>
      </div>

      {/* Right: CTA + Notifications + Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 relative">
        <button
          type="button"
          onClick={onDraftNewChapter}
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-primary text-on-primary rounded-full hover:bg-primary-container transition-colors font-label-sm text-label-sm shadow-[0_1px_8px_rgba(0,0,0,0.04)] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">draw</span>
          <span className="hidden sm:inline">Draf Bab Baru</span>
        </button>

        <button
          type="button"
          onClick={() => setNotifOpen((prev) => !prev)}
          title="Notifikasi"
          className="relative w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('settings-and-theme')}
          title="Pengaturan Profil"
          className="rounded-full ml-1 cursor-pointer"
        >
          <SafeArtwork
            src={BOOKISH_ASSETS.elenaAvatar}
            fallbackSrc={BOOKISH_ASSETS.elenaFallback}
            alt="Profil Elena"
            className="w-8 h-8 rounded-full object-cover"
          />
        </button>

        {notifOpen && (
          <div className="absolute right-0 top-12 w-80 bg-surface-container-lowest rounded-3xl p-4 shadow-xl border border-outline-variant/30 z-50 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-primary">
                Kabar Salon &amp; Pembaca
              </span>
              <button
                type="button"
                onClick={() => setNotifOpen(false)}
                className="text-outline hover:text-primary"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="p-3 rounded-2xl bg-surface-container-low text-body-sm font-body-sm text-on-surface">
              <strong className="text-secondary">Claire_Reads_At_Midnight</strong> menyematkan kartu
              pos baru di <em>Bisikan di Antara Uap &amp; DM</em>.
            </div>
            <div className="p-3 rounded-2xl bg-surface-container-low text-body-sm font-body-sm text-on-surface">
              <strong className="text-primary">438 pembaca</strong> telah memilih di polling Instagram
              Cerita Bab 3.
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
