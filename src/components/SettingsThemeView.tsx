import type {
  AppSettings,
  ReaderFontId,
  ReaderTintId,
  StudioThemeId,
  WoodToneId,
} from '../types/bookish';

interface SettingsThemeViewProps {
  settings: AppSettings;
  onUpdateSettings: (partial: Partial<AppSettings>) => void;
  onResetDemo: () => void;
  onExportFolio: () => void;
  onNotify: (msg: string) => void;
}

export function SettingsThemeView({
  settings,
  onUpdateSettings,
  onResetDemo,
  onExportFolio,
  onNotify,
}: SettingsThemeViewProps) {
  const studioThemes: { id: StudioThemeId; label: string; dot: string; desc: string }[] = [
    {
      id: 'theme-strawberry',
      label: 'Stroberi Manis',
      dot: 'bg-secondary',
      desc: 'Gelembung obrolan mawar lembut & kertas merah muda hangat.',
    },
    {
      id: 'theme-vintage',
      label: 'Espreso Antik',
      dot: 'bg-primary-container',
      desc: 'Nuansa karamel panggang & perkamen perpustakaan klasik.',
    },
    {
      id: 'theme-lavender',
      label: 'Kabut Lavender',
      dot: 'bg-[#9575cd]',
      desc: 'Aksen ungu senja yang tenang untuk menulis larut malam.',
    },
    {
      id: 'theme-matcha',
      label: 'Matcha Latte',
      dot: 'bg-[#66bb6a]',
      desc: 'Krem hijau daun segar bernuansa kafe botani.',
    },
  ];

  const woodOptions: { id: WoodToneId; label: string; swatch: string }[] = [
    { id: 'oak', label: 'Rak Kayu Ek & Perkamen', swatch: 'from-[#D7BCA3] to-[#C9A98C]' },
    { id: 'walnut', label: 'Rak Beludru Kenari', swatch: 'from-[#6F4E37] to-[#553722]' },
    { id: 'birch', label: 'Perpustakaan Kayu Birch', swatch: 'from-[#EFE3D3] to-[#DECCA8]' },
  ];

  const tintOptions: { id: ReaderTintId; label: string; hex: string }[] = [
    { id: 'parchment', label: 'Nuansa Krem Kertas', hex: '#fdf9f3' },
    { id: 'rose', label: 'Nuansa Kelopak Mawar', hex: '#fff0f3' },
    { id: 'midnight', label: 'Nuansa Beludru Gelap', hex: '#272320' },
  ];

  const fontOptions: { id: ReaderFontId; label: string }[] = [
    { id: 'serif', label: 'Serif Sastra (Merriweather)' },
    { id: 'sans', label: 'Sans Modern (Plus Jakarta Sans)' },
    { id: 'mono', label: 'Monospace Mesin Tik' },
  ];

  return (
    <div className="px-4 sm:px-8 py-8 max-w-[1360px] mx-auto w-full flex flex-col gap-8">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/60 text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider w-fit">
            <span className="material-symbols-outlined text-[15px]">tune</span>
            PREFERENSI STUDIO &amp; TEMA
          </span>
          <h1 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">
            Pengaturan &amp; Tema BookishAU
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Sesuaikan suasana rak kayu 3D, nada warna Studio Buat AU, serta kenyamanan membaca
            halaman naskahmu.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExportFolio}
            className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Ekspor Arsip JSON</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Theme & Wood Finish Controls */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">palette</span>
              <h2 className="font-headline-sm text-headline-sm text-primary">
                Nada Warna Bawaan Studio Buat AU
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {studioThemes.map((t) => {
                const active = settings.defaultStudioTheme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      onUpdateSettings({ defaultStudioTheme: t.id });
                      onNotify(`Tema Studio "${t.label}" diterapkan.`);
                    }}
                    className={`p-4 rounded-2xl text-left transition-all flex flex-col gap-2 cursor-pointer ${
                      active
                        ? 'bg-secondary-fixed/50 ring-2 ring-secondary shadow-sm'
                        : 'bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 font-label-md text-label-md text-primary font-bold">
                        <span className={`w-3 h-3 rounded-full ${t.dot}`} />
                        {t.label}
                      </span>
                      {active && (
                        <span className="material-symbols-outlined text-secondary text-[18px]">
                          check_circle
                        </span>
                      )}
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{t.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[22px]">shelves</span>
              <h2 className="font-headline-sm text-headline-sm text-primary">
                Lapisan Kayu Rak Perpustakaan 3D
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {woodOptions.map((w) => {
                const active = settings.defaultWoodTone === w.id;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => {
                      onUpdateSettings({ defaultWoodTone: w.id });
                      onNotify(`Tampilan rak diubah ke "${w.label}".`);
                    }}
                    className={`p-4 rounded-2xl flex flex-col gap-3 text-left transition-all cursor-pointer ${
                      active
                        ? 'bg-primary-fixed/50 ring-2 ring-primary shadow-sm'
                        : 'bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className={`w-full h-8 rounded-xl bg-gradient-to-r ${w.swatch}`} />
                    <span className="font-label-sm text-label-sm text-primary font-bold">
                      {w.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Reader Preferences & Pen Name */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">
                menu_book
              </span>
              <h2 className="font-headline-sm text-headline-sm text-primary">
                Preferensi Ruang Baca
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Nuansa Kertas Default
              </span>
              <div className="flex flex-col gap-2">
                {tintOptions.map((tint) => {
                  const active = settings.defaultReaderTint === tint.id;
                  return (
                    <button
                      key={tint.id}
                      type="button"
                      onClick={() => onUpdateSettings({ defaultReaderTint: tint.id })}
                      className={`px-4 py-3 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                        active
                          ? 'bg-secondary-container/60 text-on-secondary-container font-bold'
                          : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <span className="flex items-center gap-3 font-label-sm text-label-sm">
                        <span
                          className="w-5 h-5 rounded-full border border-outline-variant"
                          style={{ backgroundColor: tint.hex }}
                        />
                        {tint.label}
                      </span>
                      {active && (
                        <span className="material-symbols-outlined text-[18px]">check</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Jenis Huruf Naskah
              </span>
              <div className="flex flex-wrap gap-2">
                {fontOptions.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onUpdateSettings({ defaultReaderFont: f.id })}
                    className={`px-3.5 py-2 rounded-full font-label-sm text-label-sm transition-all cursor-pointer ${
                      settings.defaultReaderFont === f.id
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">badge</span>
              <h2 className="font-headline-sm text-headline-sm text-primary">
                Identitas Kreator &amp; Data Lokal
              </h2>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-label-sm text-on-surface-variant">
                Nama Pena Penulis
              </label>
              <input
                type="text"
                value={settings.penName}
                onChange={(e) => onUpdateSettings({ penName: e.target.value })}
                className="px-4 py-2.5 rounded-2xl bg-surface-container text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
              />
            </div>
            <div className="pt-2 flex items-center justify-between gap-3">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Kembalikan seluruh contoh cerita &amp; komentar bawaan
              </span>
              <button
                type="button"
                onClick={onResetDemo}
                className="px-4 py-2 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm hover:brightness-95 cursor-pointer shrink-0 whitespace-nowrap"
              >
                Reset Data Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
