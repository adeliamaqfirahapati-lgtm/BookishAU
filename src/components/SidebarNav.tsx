import { BOOKISH_ASSETS } from '../data/bookishSeed';
import type { AppSettings, NavRoute } from '../types/bookish';
import { SafeArtwork } from './SafeArtwork';

interface SidebarNavProps {
  activeRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
  settings: AppSettings;
  onCoffeeTip: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const NAV_ITEMS: { id: NavRoute; icon: string; label: string }[] = [
  { id: 'bookshelf', icon: 'auto_stories', label: 'Rak Buku & Perpustakaan 3D' },
  { id: 'create-au-studio', icon: 'edit_note', label: 'Studio Buat AU' },
  { id: 'plot-tracker', icon: 'account_tree', label: 'Pelacak Alur & AI' },
  { id: 'reading-lounge', icon: 'local_cafe', label: 'Ruang Baca & Statistik' },
  { id: 'settings-and-theme', icon: 'tune', label: 'Pengaturan & Tema' },
];

export function SidebarNav({
  activeRoute,
  onNavigate,
  settings,
  onCoffeeTip,
  mobileOpen,
  onCloseMobile,
}: SidebarNavProps) {
  const subtitleText =
    activeRoute === 'create-au-studio'
      ? 'Rak Cerita & Studio AU'
      : activeRoute === 'reading-lounge'
        ? 'Rak Buku & Studio AU'
        : 'Rak Cerita & Studio AU';

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full py-6 px-4 bg-surface-container-low">
      <div className="flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-3">
            <SafeArtwork
              src={BOOKISH_ASSETS.logo}
              fallbackSrc="/src/assets/images/hero_botanical_desk_1795021210675.jpg"
              alt="Logo BookishAU"
              className="h-8 w-8 rounded-lg object-contain"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
                BookishAU
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
                {subtitleText}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
            aria-label="Tutup menu"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Main Navigation Pills */}
        <nav aria-label="Navigasi Utama BookishAU" className="flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-full transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container font-label-md text-label-md shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-md text-label-md'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Widget */}
      <div className="p-3 rounded-2xl bg-surface-container flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3 min-w-0">
          <SafeArtwork
            src={BOOKISH_ASSETS.elenaAvatar}
            fallbackSrc={BOOKISH_ASSETS.elenaFallback}
            alt="Profil Elena Vance"
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-primary truncate">
              {settings.penName}
            </span>
            <span className="font-label-sm text-label-sm text-secondary truncate">
              {settings.levelLabel}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onCoffeeTip}
            title="Kirim Tip Kopi"
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">redeem</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Fixed Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <aside className="relative w-72 max-w-[85vw] h-full bg-surface-container-low shadow-2xl z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
