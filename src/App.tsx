import { useEffect, useState } from 'react';
import { BookshelfView } from './components/BookshelfView';
import { CreateAuStudioView } from './components/CreateAuStudioView';
import { PlotTrackerView } from './components/PlotTrackerView';
import { ReadingLoungeView } from './components/ReadingLoungeView';
import { SettingsThemeView } from './components/SettingsThemeView';
import { SidebarNav } from './components/SidebarNav';
import { TopHeader } from './components/TopHeader';
import {
  BOOKISH_ASSETS,
  DEFAULT_SETTINGS,
  SEED_AI_SUGGESTIONS,
  SEED_BOOKS,
  SEED_MOODBOARD_PINS,
  SEED_PLOT_NODES,
  SEED_POSTCARDS,
  SEED_READER_NOTES,
  SEED_STUDIO_BLOCKS,
  SEED_STUDIO_CHARACTERS,
} from './data/bookishSeed';
import type {
  AiSuggestion,
  AppSettings,
  AuBlock,
  BookItem,
  CharacterDossierItem,
  NavRoute,
  PlotNode,
  PostcardComment,
  ReaderFontId,
  ReaderHighlightNote,
  ReaderTintId,
  StudioThemeId,
  WoodToneId,
} from './types/bookish';

const STORAGE_KEY = 'bookish_au_state_v2';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<NavRoute>('bookshelf');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [books, setBooks] = useState<BookItem[]>(SEED_BOOKS);
  const [selectedBookId, setSelectedBookId] = useState<string>('latte');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [woodTone, setWoodTone] = useState<WoodToneId>(DEFAULT_SETTINGS.defaultWoodTone);
  const [studioTheme, setStudioTheme] = useState<StudioThemeId>(
    DEFAULT_SETTINGS.defaultStudioTheme
  );
  const [readerTint, setReaderTint] = useState<ReaderTintId>(DEFAULT_SETTINGS.defaultReaderTint);
  const [readerFont, setReaderFont] = useState<ReaderFontId>(DEFAULT_SETTINGS.defaultReaderFont);
  const [readerScale, setReaderScale] = useState<number>(DEFAULT_SETTINGS.defaultReaderScale);

  const [studioStoryTitle, setStudioStoryTitle] = useState<string>(
    'Latte Art & Tenggat Larut Malam'
  );
  const [studioChapterTitle, setStudioChapterTitle] = useState<string>(
    'Bisikan di Antara Uap & DM'
  );
  const [studioBlocks, setStudioBlocks] = useState<AuBlock[]>(SEED_STUDIO_BLOCKS);
  const [characters, setCharacters] = useState<CharacterDossierItem[]>(SEED_STUDIO_CHARACTERS);
  const [tropes, setTropes] = useState<string[]>([
    '#KedaiKopiAU',
    '#PemarahxPenyayang',
    '#SlowBurn (50k)',
    '#SalingMendamba',
    '#PesanLarutMalam',
    '#ArsitekDanBarista',
  ]);

  const [plotNodes, setPlotNodes] = useState<PlotNode[]>(SEED_PLOT_NODES);
  const [aiSuggestions, setAiSuggestions] = useState<AiSuggestion[]>(SEED_AI_SUGGESTIONS);

  const [postcards, setPostcards] = useState<PostcardComment[]>(SEED_POSTCARDS);
  const [readerNotes, setReaderNotes] = useState<ReaderHighlightNote[]>(SEED_READER_NOTES);

  // Hydrate persisted state once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.books) && parsed.books.length > 0) setBooks(parsed.books);
      if (typeof parsed.selectedBookId === 'string') setSelectedBookId(parsed.selectedBookId);
      if (parsed.settings) setSettings(parsed.settings);
      if (parsed.woodTone) setWoodTone(parsed.woodTone);
      if (parsed.studioTheme) setStudioTheme(parsed.studioTheme);
      if (parsed.readerTint) setReaderTint(parsed.readerTint);
      if (parsed.readerFont) setReaderFont(parsed.readerFont);
      if (typeof parsed.readerScale === 'number') setReaderScale(parsed.readerScale);
      if (Array.isArray(parsed.studioBlocks) && parsed.studioBlocks.length > 0) {
        setStudioBlocks(parsed.studioBlocks);
      }
      if (Array.isArray(parsed.plotNodes) && parsed.plotNodes.length > 0) {
        setPlotNodes(parsed.plotNodes);
      }
      if (Array.isArray(parsed.postcards)) setPostcards(parsed.postcards);
      if (Array.isArray(parsed.readerNotes)) setReaderNotes(parsed.readerNotes);
    } catch {
      // Ignore malformed cache
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          books,
          selectedBookId,
          settings,
          woodTone,
          studioTheme,
          readerTint,
          readerFont,
          readerScale,
          studioBlocks,
          plotNodes,
          postcards,
          readerNotes,
        })
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [
    books,
    selectedBookId,
    settings,
    woodTone,
    studioTheme,
    readerTint,
    readerFont,
    readerScale,
    studioBlocks,
    plotNodes,
    postcards,
    readerNotes,
  ]);

  const notify = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const activeBook = books.find((b) => b.id === selectedBookId) ?? books[0];

  const handleCycleWoodTone = () => {
    const order: WoodToneId[] = ['oak', 'walnut', 'birch'];
    const next = order[(order.indexOf(woodTone) + 1) % order.length];
    setWoodTone(next);
  };

  const handleCreateNewBook = (title: string, categoryBadge: string, synopsis: string) => {
    const category = categoryBadge.includes('Rival')
      ? 'academia'
      : categoryBadge.includes('Bunga') || categoryBadge.includes('Hanahaki')
        ? 'floral'
        : 'coffee';
    const newBook: BookItem = {
      id: `book-${Date.now()}`,
      title,
      shortTitle: title.slice(0, 18),
      shelfTier: 'upper',
      category,
      categoryBadge,
      statusBadge: 'Draf Baru',
      authorLine: `${settings.penName} • 1 Bab`,
      sub: `Dunia Alternatif: ${categoryBadge} • Pembaca Awal`,
      detailBadge: 'Baru Dibuat • Mode Draf',
      readersCount: 'Baru',
      chapterLabel: 'Bab 1',
      coverUrl: BOOKISH_ASSETS.coverLatte,
      fallbackCoverUrl: '/src/assets/images/cover_coffee_rain_1795021211974.jpg',
      coverAlt: `Sampul buku ${title}`,
      gradientClass: 'bg-gradient-to-br from-[#FAF2EC] via-[#FCECEF] to-[#EBD5CB]',
      textColorClass: 'text-primary',
      subTextColorClass: 'text-secondary',
      ribbonColorClass: 'bg-secondary',
      badgeClass: 'bg-secondary-container/90 text-on-secondary-container',
      footerClass: 'bg-surface-container-lowest/70 text-primary',
      tropes: ['#SemestaAlternatif', '#SlowBurn'],
      synopsis:
        synopsis ||
        'Naskah AU baru di rak pribadimu, siap dirangkai dengan prosa sastra dan simulasi obrolan.',
      paletteColors: [
        { hex: '#6F4E37', name: 'Espresso' },
        { hex: '#F4ACB7', name: 'Mawar' },
        { hex: '#FFE5EC', name: 'Krim' },
        { hex: '#FDF9F3', name: 'Perkamen' },
      ],
      chapters: [
        {
          number: 1,
          title: 'Bab Pembuka',
          formatLabel: 'Obrolan AU + Prosa • 840 kata',
          wordCount: 840,
          status: 'Menulis',
          icon: 'draw',
        },
      ],
      progressPercent: 18,
    };
    setBooks((prev) => [newBook, ...prev]);
    setSelectedBookId(newBook.id);
    setStudioStoryTitle(newBook.title);
    notify(`Buku AU "${newBook.title}" berhasil ditambahkan ke rak!`);
  };

  const handleOpenStudioForBook = (bookId: string) => {
    const found = books.find((b) => b.id === bookId);
    if (found) {
      setSelectedBookId(found.id);
      setStudioStoryTitle(found.title);
    }
    setActiveRoute('create-au-studio');
  };

  const handleOpenReaderForBook = (bookId: string) => {
    setSelectedBookId(bookId);
    setActiveRoute('reading-lounge');
  };

  const handleUpdateSettings = (partial: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
    if (partial.defaultStudioTheme) setStudioTheme(partial.defaultStudioTheme);
    if (partial.defaultWoodTone) setWoodTone(partial.defaultWoodTone);
    if (partial.defaultReaderTint) setReaderTint(partial.defaultReaderTint);
    if (partial.defaultReaderFont) setReaderFont(partial.defaultReaderFont);
    if (typeof partial.defaultReaderScale === 'number') {
      setReaderScale(partial.defaultReaderScale);
    }
  };

  const handleResetDemo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setBooks(SEED_BOOKS);
    setSelectedBookId('latte');
    setSettings(DEFAULT_SETTINGS);
    setWoodTone(DEFAULT_SETTINGS.defaultWoodTone);
    setStudioTheme(DEFAULT_SETTINGS.defaultStudioTheme);
    setReaderTint(DEFAULT_SETTINGS.defaultReaderTint);
    setReaderFont(DEFAULT_SETTINGS.defaultReaderFont);
    setReaderScale(DEFAULT_SETTINGS.defaultReaderScale);
    setStudioBlocks(SEED_STUDIO_BLOCKS);
    setCharacters(SEED_STUDIO_CHARACTERS);
    setPlotNodes(SEED_PLOT_NODES);
    setAiSuggestions(SEED_AI_SUGGESTIONS);
    setPostcards(SEED_POSTCARDS);
    setReaderNotes(SEED_READER_NOTES);
    notify('Seluruh data contoh BookishAU telah dipulihkan.');
  };

  const handleExportFolio = () => {
    const payload = JSON.stringify(
      {
        books,
        studioStoryTitle,
        studioChapterTitle,
        studioBlocks,
        plotNodes,
        postcards,
      },
      null,
      2
    );
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bookishau-arsip.json';
    link.click();
    URL.revokeObjectURL(url);
    notify('Arsip BookishAU diunduh sebagai bookishau-arsip.json');
  };

  const headerBreadcrumbTitle =
    activeRoute === 'reading-lounge'
      ? 'Kedai Bunga Tengah Malam'
      : activeRoute === 'bookshelf'
        ? activeBook?.title ?? 'Moonlight Florist AU'
        : 'AU Florist Cahaya Bulan';

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <SidebarNav
        activeRoute={activeRoute}
        onNavigate={setActiveRoute}
        settings={settings}
        onCoffeeTip={() =>
          notify('Terima kasih! Tip secangkir espreso dikirim ke meja tulis Elena ☕')
        }
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="lg:pl-72">
        <TopHeader
          activeBookTitle={headerBreadcrumbTitle}
          activeChapterSubtitle="Babak II: Kopi & Rahasia"
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (activeRoute !== 'bookshelf' && q.trim().length > 0) {
              setActiveRoute('bookshelf');
            }
          }}
          onDraftNewChapter={() => setActiveRoute('create-au-studio')}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onNavigate={setActiveRoute}
        />

        <main className="relative pt-16 bg-surface w-full min-h-screen">
          {activeRoute === 'bookshelf' && (
            <BookshelfView
              books={books}
              selectedBookId={selectedBookId}
              onSelectBook={setSelectedBookId}
              woodTone={woodTone}
              onCycleWoodTone={handleCycleWoodTone}
              searchQuery={searchQuery}
              onOpenStudioForBook={handleOpenStudioForBook}
              onOpenReaderForBook={handleOpenReaderForBook}
              onCreateNewBook={handleCreateNewBook}
              onNavigate={setActiveRoute}
              onNotify={notify}
            />
          )}

          {activeRoute === 'create-au-studio' && (
            <CreateAuStudioView
              storyTitle={studioStoryTitle}
              chapterTitle={studioChapterTitle}
              onUpdateStoryTitle={setStudioStoryTitle}
              onUpdateChapterTitle={setStudioChapterTitle}
              studioTheme={studioTheme}
              onChangeTheme={setStudioTheme}
              blocks={studioBlocks}
              onChangeBlocks={setStudioBlocks}
              characters={characters}
              onAddCharacter={(char) => setCharacters((prev) => [...prev, char])}
              moodboard={SEED_MOODBOARD_PINS}
              tropes={tropes}
              onAddTrope={(t) => setTropes((prev) => [...prev, t])}
              onPreviewReader={() => setActiveRoute('reading-lounge')}
              onPublishChapter={() => {
                notify(`"${studioChapterTitle}" diterbitkan ke Ruang Baca!`);
                setActiveRoute('reading-lounge');
              }}
              onNotify={notify}
            />
          )}

          {activeRoute === 'plot-tracker' && (
            <PlotTrackerView
              storyTitle={activeBook?.title ?? 'Seni Latte & Tenggat Larut Malam'}
              nodes={plotNodes}
              onChangeNodes={setPlotNodes}
              aiSuggestions={aiSuggestions}
              onChangeAiSuggestions={setAiSuggestions}
              onOpenStudio={() => setActiveRoute('create-au-studio')}
              onOpenReader={() => setActiveRoute('reading-lounge')}
              onNotify={notify}
            />
          )}

          {activeRoute === 'reading-lounge' && (
            <ReadingLoungeView
              storyTitle={activeBook?.title ?? 'Seni Latte & Tenggat Larut Malam'}
              postcards={postcards}
              onAddPostcard={(c) => setPostcards((prev) => [c, ...prev])}
              onTogglePostcardLike={(id) =>
                setPostcards((prev) =>
                  prev.map((p) =>
                    p.id === id
                      ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
                      : p
                  )
                )
              }
              readerNotes={readerNotes}
              onAddReaderNote={(n) => setReaderNotes((prev) => [n, ...prev])}
              readerTint={readerTint}
              onChangeTint={setReaderTint}
              readerFont={readerFont}
              onChangeFont={setReaderFont}
              readerScale={readerScale}
              onChangeScale={setReaderScale}
              onNotify={notify}
            />
          )}

          {activeRoute === 'settings-and-theme' && (
            <SettingsThemeView
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onResetDemo={handleResetDemo}
              onExportFolio={handleExportFolio}
              onNotify={notify}
            />
          )}
        </main>
      </div>

      {/* Floating Stationery Toast */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full bg-primary text-on-primary shadow-xl font-label-md text-label-md flex items-center gap-2.5 animate-fade-in"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
            local_cafe
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
