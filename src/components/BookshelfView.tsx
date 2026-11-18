import { useState } from 'react';
import { filterBooks } from '../utils/bookishLogic';
import type { BookItem, NavRoute, WoodToneId } from '../types/bookish';
import { SafeArtwork } from './SafeArtwork';

interface BookshelfViewProps {
  books: BookItem[];
  selectedBookId: string;
  onSelectBook: (id: string) => void;
  woodTone: WoodToneId;
  onCycleWoodTone: () => void;
  searchQuery: string;
  onOpenStudioForBook: (bookId: string) => void;
  onOpenReaderForBook: (bookId: string) => void;
  onCreateNewBook: (title: string, categoryBadge: string, synopsis: string) => void;
  onNavigate: (route: NavRoute) => void;
  onNotify: (msg: string) => void;
}

const WOOD_TONES: Record<WoodToneId, { label: string; gradient: string }> = {
  oak: {
    label: 'Rak Kayu Ek & Perkamen',
    gradient: 'from-[#D7BCA3] via-[#EBDAC7] to-[#C9A98C]',
  },
  walnut: {
    label: 'Rak Beludru Kenari',
    gradient: 'from-[#6F4E37] via-[#855B3E] to-[#553722]',
  },
  birch: {
    label: 'Perpustakaan Kayu Birch',
    gradient: 'from-[#EFE3D3] via-[#FAF4EC] to-[#DECCA8]',
  },
};

export function BookshelfView({
  books,
  selectedBookId,
  onSelectBook,
  woodTone,
  onCycleWoodTone,
  searchQuery,
  onOpenStudioForBook,
  onOpenReaderForBook,
  onCreateNewBook,
  onNavigate,
  onNotify,
}: BookshelfViewProps) {
  const [shelfFilter, setShelfFilter] = useState<string>('all');
  const [customShelves, setCustomShelves] = useState<{ id: string; label: string }[]>([]);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isAddShelfOpen, setIsAddShelfOpen] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('AU Kedai Kopi');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [newShelfLabel, setNewShelfLabel] = useState('');

  const filteredBooks = filterBooks(books, shelfFilter, searchQuery);
  const upperBooks = filteredBooks.filter((b) => b.shelfTier === 'upper');
  const lowerBooks = filteredBooks.filter((b) => b.shelfTier === 'lower');

  const selectedBook =
    books.find((b) => b.id === selectedBookId) ?? filteredBooks[0] ?? books[0];

  const woodInfo = WOOD_TONES[woodTone];
  const isWalnut = woodTone === 'walnut';

  const countByCategory = (cat: string) =>
    books.filter((b) => b.category.toLowerCase() === cat).length;

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onCreateNewBook(newTitle.trim(), newCategory, newSynopsis.trim());
    setNewTitle('');
    setNewSynopsis('');
    setIsAddBookOpen(false);
  };

  const handleShelfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShelfLabel.trim()) return;
    const id = `custom-${Date.now()}`;
    setCustomShelves((prev) => [...prev, { id, label: newShelfLabel.trim() }]);
    setNewShelfLabel('');
    setIsAddShelfOpen(false);
    onNotify(`Rak "${newShelfLabel.trim()}" berhasil ditambahkan.`);
  };

  const renderBookCard = (book: BookItem) => {
    const isSelected = selectedBook?.id === book.id;
    return (
      <div
        key={book.id}
        onClick={() => onSelectBook(book.id)}
        className="group relative flex flex-col cursor-pointer transition-all duration-300 transform hover:-translate-y-2 scroll-mt-24"
      >
        <div
          className={`relative w-full h-[360px] rounded-2xl overflow-hidden shadow-xl transition-all duration-500 group-hover:shadow-2xl flex flex-col justify-between p-5 ${book.gradientClass} ${book.darkCover ? 'text-on-primary' : 'text-on-surface'} ${
            isSelected ? 'ring-2 ring-secondary ring-offset-2 ring-offset-surface' : ''
          }`}
        >
          {/* Gold Foil Spine Accent */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-3 ${
              book.darkCover
                ? 'bg-gradient-to-r from-yellow-500/30 via-tertiary-fixed/40 to-transparent'
                : 'bg-gradient-to-r from-primary/30 via-tertiary-container/40 to-transparent'
            }`}
          />
          <div
            className={`absolute left-3 top-0 bottom-0 w-px ${
              book.darkCover ? 'bg-tertiary-fixed/30' : 'bg-tertiary-fixed-dim/60'
            } shadow-[1px_0_2px_rgba(0,0,0,0.1)]`}
          />

          {/* Velvet Ribbon Marker */}
          <div
            className={`absolute -top-1 right-5 w-3.5 h-14 ${book.ribbonColorClass} shadow-md flex flex-col items-center justify-end pb-1 rounded-b-sm z-10`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
          </div>

          {/* Book Header Badges */}
          <div className="flex items-start justify-between z-10 pl-2 pr-7 gap-2">
            <span
              className={`px-2.5 py-1 rounded-full ${book.badgeClass} text-label-sm font-label-sm uppercase tracking-wide whitespace-nowrap`}
            >
              {book.categoryBadge}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md text-label-sm font-label-sm whitespace-nowrap ${
                book.darkCover
                  ? 'bg-surface-container-highest/20 text-inverse-on-surface'
                  : book.id === 'petals'
                    ? 'bg-secondary-container text-on-secondary-container font-bold'
                    : 'bg-surface-container-lowest/80 text-outline'
              }`}
            >
              {book.statusBadge}
            </span>
          </div>

          {/* Cover Visual Graphic */}
          <div className="relative my-auto flex flex-col items-center text-center z-10 py-3">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden shadow-inner mb-3">
              <SafeArtwork
                src={book.coverUrl}
                fallbackSrc={book.fallbackCoverUrl}
                alt={book.coverAlt}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  book.darkCover ? 'from-black/40' : 'from-primary/20'
                } to-transparent`}
              />
            </div>
            <h3
              className={`font-headline-sm text-headline-sm ${book.textColorClass} tracking-tight px-2 leading-tight`}
            >
              {book.title}
            </h3>
            <p className={`font-label-sm text-label-sm ${book.subTextColorClass} mt-1`}>
              {book.authorLine}
            </p>
          </div>

          {/* Book Footer Stats */}
          <div
            className={`z-10 pl-2 pt-2 flex items-center justify-between ${book.footerClass} backdrop-blur-sm rounded-xl px-3 py-2`}
          >
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                {book.id === 'petals'
                  ? 'star'
                  : book.id === 'radio'
                    ? 'podcasts'
                    : 'visibility'}
              </span>
              <span className="font-label-sm text-label-sm font-bold">
                {book.id === 'petals'
                  ? 'Peringkat #1'
                  : book.id === 'radio'
                    ? 'AU Trek Audio'
                    : book.readersCount}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {book.id !== 'petals' && book.id !== 'radio' && (
                <span className="material-symbols-outlined text-[16px]">
                  {book.darkCover ? 'draw' : 'menu_book'}
                </span>
              )}
              <span className="font-label-sm text-label-sm">{book.chapterLabel}</span>
            </div>
            {book.id !== 'petals' && book.id !== 'radio' && (
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  book.darkCover ? 'bg-tertiary-container' : 'bg-secondary-fixed'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[12px] ${
                    book.darkCover ? 'text-tertiary-fixed' : 'text-secondary'
                  }`}
                >
                  {book.darkCover ? 'school' : 'check'}
                </span>
              </div>
            )}
          </div>

          {/* Hover Quick Action Overlay */}
          <div className="absolute inset-0 bg-primary/85 backdrop-blur-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3 p-6 z-20">
            <span className="font-headline-sm text-headline-sm text-on-primary text-center">
              {book.shortTitle}
            </span>
            <div className="flex flex-col gap-2 w-full max-w-[190px] pointer-events-none group-hover:pointer-events-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBook(book.id);
                  onOpenStudioForBook(book.id);
                }}
                className="w-full py-2 px-3 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                <span>Buka Studio AU</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBook(book.id);
                  onOpenReaderForBook(book.id);
                }}
                className="w-full py-2 px-3 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">local_library</span>
                <span>{book.id === 'petals' ? 'Baca Lagi' : 'Baca di Lounge'}</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBook(book.id);
                  onNotify(`Indeks bab & palet "${book.title}" disorot di panel kanan.`);
                }}
                className="w-full py-2 px-3 rounded-full bg-surface-container-lowest/85 text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center gap-1.5 hover:bg-surface-container-lowest cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">palette</span>
                <span>Palet Sampul</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-3 rounded-full bg-primary/10 blur-[4px] mt-1" />
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-8 py-8 flex flex-col gap-10 max-w-[1560px] mx-auto w-full">
      {/* STUDY GREETING & METRICS BAR */}
      <div className="relative overflow-hidden bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-60 h-60 rounded-full bg-primary-fixed/20 blur-2xl pointer-events-none" />
        <div className="flex flex-col gap-2 z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed text-label-sm font-label-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]">local_cafe</span>
              PERPUSTAKAAN PRIBADI ELENA
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-outline text-label-sm font-label-sm">
              Semester Musim Gugur • 2024
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary tracking-tight">
            Selamat datang kembali di Ruang Belajarmu, Elena ☕📖
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant font-light">
            Kamu memiliki{' '}
            <strong className="text-primary font-medium">{books.length} naskah AU aktif</strong> dan{' '}
            <strong className="text-secondary font-medium">12.480 pembaca</strong> yang menikmati
            dunia alternatifmu pekan ini.
          </p>
        </div>

        {/* Quick Shelf Stats Bento */}
        <div className="flex items-center gap-3 z-10 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-surface-container-low shadow-[0_2px_10px_rgba(111,78,55,0.04)]">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">auto_stories</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary leading-tight">49</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Bab Ditulis</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-surface-container-low shadow-[0_2px_10px_rgba(111,78,55,0.04)]">
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary leading-tight">
                182,8 rb
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Pembaca Perpustakaan
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-surface-container-low shadow-[0_2px_10px_rgba(111,78,55,0.04)]">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">loyalty</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary leading-tight">
                99,4%
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Rasio Kudos</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER RIBBON & SHELF ACTIONS */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setShelfFilter('all')}
            className={`px-3.5 py-2 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              shelfFilter === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span>Semua Cerita ({books.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setShelfFilter('coffee')}
            className={`px-3.5 py-2 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              shelfFilter === 'coffee'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span>AU Kedai Kopi ({countByCategory('coffee')})</span>
          </button>
          <button
            type="button"
            onClick={() => setShelfFilter('academia')}
            className={`px-3.5 py-2 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              shelfFilter === 'academia'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-tertiary" />
            <span>Rival Kampus ({countByCategory('academia')})</span>
          </button>
          <button
            type="button"
            onClick={() => setShelfFilter('floral')}
            className={`px-3.5 py-2 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              shelfFilter === 'floral'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-secondary-container" />
            <span>AU Bunga Belahan Jiwa ({countByCategory('floral')})</span>
          </button>

          {customShelves.map((shelf) => (
            <button
              key={shelf.id}
              type="button"
              onClick={() => setShelfFilter(shelf.id)}
              className={`px-3.5 py-2 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                shelfFilter === shelf.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span>{shelf.label}</span>
            </button>
          ))}

          <button
            type="button"
            onClick={() => setIsAddShelfOpen(true)}
            className="px-3 py-2 rounded-full bg-surface-container-low hover:bg-surface-container text-secondary text-label-md font-label-md transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Rak</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto justify-start sm:justify-end shrink-0">
          <button
            type="button"
            onClick={onCycleWoodTone}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all shadow-sm whitespace-nowrap cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary">palette</span>
            <span>{woodInfo.label}</span>
            <span className="material-symbols-outlined text-[16px] text-outline">tune</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAddBookOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm transition-all shadow-md group whitespace-nowrap cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:rotate-90">
              add_circle
            </span>
            <span>+ Buat Buku AU Baru</span>
          </button>
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE: 3D SHELF (LEFT) & DOSSIER PANEL (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: TIERED 3D WOOD BOOKSHELF (7 COLUMNS) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          {filteredBooks.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-3xl p-10 text-center shadow-sm flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-[36px] text-secondary">
                auto_stories
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary">
                Belum ada judul pada rak atau pencarian ini
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Tampilkan semua cerita atau buat buku AU baru untuk mengisinya.
              </p>
              <button
                type="button"
                onClick={() => setShelfFilter('all')}
                className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm cursor-pointer"
              >
                Tampilkan Semua Cerita
              </button>
            </div>
          ) : (
            <>
              {/* SHELF LEVEL 1 */}
              {upperBooks.length > 0 && (
                <div className="relative bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between pb-4 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-secondary">
                        bookmark_heart
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-primary">
                        Rak Atas: Serialisasi Berjalan
                      </h2>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                        PERSPEKTIF: PUNGGUNG BUKU 3D ISOMETRIK
                      </span>
                      <span className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-outline">
                        <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 pb-2 perspective-[1200px]">
                    {upperBooks.map(renderBookCard)}
                  </div>

                  {/* WOOD PLANK LEDGE 1 */}
                  <div
                    className={`relative w-full h-8 mt-2 rounded-xl bg-gradient-to-r ${woodInfo.gradient} shadow-[0_12px_24px_rgba(74,59,50,0.18)] flex items-center justify-between px-6`}
                  >
                    <div className="h-1.5 w-full absolute top-0 left-0 right-0 bg-[#FFF5EB]/50 rounded-t-xl" />
                    <div className="flex items-center gap-4 z-10">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isWalnut ? 'bg-primary-fixed/60' : 'bg-primary/30'
                        }`}
                      />
                      <span
                        className={`font-label-sm text-label-sm tracking-widest uppercase font-bold ${
                          isWalnut ? 'text-primary-fixed' : 'text-primary/70'
                        }`}
                      >
                        RAK I • ROMANSA &amp; RIVAL
                      </span>
                    </div>
                    <div className="flex items-center gap-3 z-10">
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isWalnut ? 'text-primary-fixed/80' : 'text-primary/60'
                        }`}
                        title="Penahan Buku Kuningan"
                      >
                        architecture
                      </span>
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isWalnut ? 'text-secondary-container' : 'text-secondary'
                        }`}
                        title="Mawar Kering"
                      >
                        local_florist
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SHELF LEVEL 2 */}
              {lowerBooks.length > 0 && (
                <div className="relative bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-tertiary">
                        shelves
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-primary">
                        Rak Bawah: Cerita Lepas &amp; Siaran
                      </h2>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline">
                      Diarsipkan • {lowerBooks.length} Judul
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 pb-2 perspective-[1200px]">
                    {lowerBooks.map(renderBookCard)}
                  </div>

                  {/* WOOD PLANK LEDGE 2 */}
                  <div
                    className={`relative w-full h-8 mt-2 rounded-xl bg-gradient-to-r ${woodInfo.gradient} shadow-[0_12px_24px_rgba(74,59,50,0.18)] flex items-center justify-between px-6`}
                  >
                    <div className="h-1.5 w-full absolute top-0 left-0 right-0 bg-[#FFF5EB]/50 rounded-t-xl" />
                    <div className="flex items-center gap-4 z-10">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isWalnut ? 'bg-tertiary-fixed/60' : 'bg-tertiary/40'
                        }`}
                      />
                      <span
                        className={`font-label-sm text-label-sm tracking-widest uppercase font-bold ${
                          isWalnut ? 'text-primary-fixed' : 'text-primary/70'
                        }`}
                      >
                        RAK II • RADIO &amp; BOTANIKAL
                      </span>
                    </div>
                    <div className="flex items-center gap-3 z-10">
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isWalnut ? 'text-tertiary-fixed' : 'text-tertiary'
                        }`}
                        title="Radio Antik"
                      >
                        radio
                      </span>
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isWalnut ? 'text-primary-fixed/80' : 'text-primary/60'
                        }`}
                        title="Cangkir Kopi"
                      >
                        coffee
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* RIGHT: SELECTED BOOK DETAIL DOSSIER & CHAPTER INDEX (5 COLUMNS) */}
        {selectedBook && (
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-20">
            <div className="bg-surface-container-lowest rounded-3xl p-7 shadow-sm flex flex-col gap-6 relative overflow-hidden">
              {/* Decorative Top Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-secondary-fixed/40 rotate-1 backdrop-blur-xs rounded-sm shadow-xs pointer-events-none" />

              {/* Selected Book Header */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-28 rounded-xl overflow-hidden shadow-md flex-shrink-0 relative">
                  <SafeArtwork
                    src={selectedBook.coverUrl}
                    fallbackSrc={selectedBook.fallbackCoverUrl}
                    alt={selectedBook.coverAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/10" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                      {selectedBook.detailBadge}
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate('settings-and-theme')}
                      title="Pengaturan Penanda Buku"
                      className="text-outline hover:text-secondary transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                    </button>
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-primary tracking-tight mt-1 line-clamp-2">
                    {selectedBook.title}
                  </h2>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {selectedBook.sub}
                  </span>
                </div>
              </div>

              {/* Tropes Chip Rack */}
              <div className="flex flex-col gap-2">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Trope &amp; Tag AU
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedBook.tropes.map((trope, index) => (
                    <span
                      key={trope}
                      className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${
                        index === 0
                          ? 'bg-secondary-fixed/40 text-on-secondary-fixed'
                          : index === 3
                            ? 'bg-secondary-container/50 text-on-secondary-container'
                            : index === 4
                              ? 'bg-tertiary-fixed/40 text-on-tertiary-fixed'
                              : 'bg-surface-container text-on-surface'
                      }`}
                    >
                      {trope}
                    </span>
                  ))}
                </div>
              </div>

              {/* Synopsis Block */}
              <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      stylus_note
                    </span>
                    LOGLINE &amp; PREMIS
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">Babak II • Adegan 4</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant font-light leading-relaxed">
                  {selectedBook.synopsis}
                </p>
              </div>

              {/* Theme Color Palette Preview */}
              <div className="flex items-center justify-between px-2">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Palet Visual Cerita
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center -space-x-1.5">
                    {selectedBook.paletteColors.map((swatch) => (
                      <span
                        key={swatch.name}
                        className="w-6 h-6 rounded-full shadow-xs border border-outline-variant/40"
                        style={{ backgroundColor: swatch.hex }}
                        title={swatch.name}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenStudioForBook(selectedBook.id)}
                    className="text-secondary text-label-sm font-label-sm hover:underline cursor-pointer"
                  >
                    Ubah Warna
                  </button>
                </div>
              </div>

              {/* Chapter Index List */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-primary">Indeks Bab</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                      Total {selectedBook.chapters.length}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">
                    Format: Narasi + Obrolan
                  </span>
                </div>

                <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
                  {selectedBook.chapters.map((ch) => (
                    <button
                      key={ch.number}
                      type="button"
                      onClick={() => onOpenReaderForBook(selectedBook.id)}
                      className={`p-3 rounded-2xl flex items-center justify-between transition-colors group cursor-pointer text-left ${
                        ch.status === 'Menulis'
                          ? 'bg-surface-container-low hover:bg-surface-container'
                          : 'bg-surface-container hover:bg-surface-container-high'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-headline-sm text-headline-sm shrink-0 ${
                            ch.status === 'Menulis'
                              ? 'bg-surface-container-high text-primary'
                              : 'bg-secondary-container text-on-secondary-container'
                          }`}
                        >
                          {ch.number}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors truncate">
                            {ch.title}
                          </span>
                          <span className="font-label-sm text-label-sm text-outline flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px] text-secondary">
                              {ch.icon}
                            </span>
                            {ch.formatLabel}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`font-label-sm text-label-sm shrink-0 ml-2 ${
                          ch.status === 'Menulis'
                            ? 'px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed'
                            : 'text-secondary font-semibold'
                        }`}
                      >
                        {ch.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Bar & CTA */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Kemajuan Busur Serialisasi</span>
                  <span className="text-primary font-bold">
                    {selectedBook.progressPercent}% Selesai
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-500"
                    style={{ width: `${selectedBook.progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenStudioForBook(selectedBook.id)}
                    className="flex-1 py-3 px-5 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">history_edu</span>
                    <span>
                      Lanjutkan Menulis Bab {selectedBook.chapters.at(-1)?.number ?? 4}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenReaderForBook(selectedBook.id)}
                    title="Baca di Ruang Baca"
                    className="p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container text-secondary transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onNotify(`Paket arsip "${selectedBook.title}" siap disalin atau dibagikan.`)
                    }
                    title="Ekspor Paket AU"
                    className="p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container text-tertiary transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* COZY STUDY DESK EPHEMERA: AUTHOR MEMO */}
            <div className="relative bg-surface-container-low rounded-3xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container/60 text-secondary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[24px]">coffee_maker</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-primary">
                    Catatan Menulis AU Elena
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    push_pin
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant font-light">
                  “Jangan lupa menyisipkan cuplikan tangkapan layar pesan teks tepat setelah
                  pengakuan giliran kerja Minggu hujan di Bab 4! Motif buih kopi berbentuk hati
                  dimunculkan kembali.”
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <span className="font-label-sm text-label-sm text-outline">
                    • Target 4.200 kata hari ini
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-medium">
                    • Daftar Putar: Hujan di Kaca Jendela
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Buat Buku AU Baru */}
      {isAddBookOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleBookSubmit}
            className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-primary">
                Buat Buku AU Baru
              </h3>
              <button
                type="button"
                onClick={() => setIsAddBookOpen(false)}
                className="text-outline hover:text-primary"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant">
                Judul Cerita AU
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Mis. Surat Hujan di Stasiun Barat"
                className="px-4 py-2.5 rounded-2xl bg-surface-container text-on-surface text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant">
                Rak Kategori
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-4 py-2.5 rounded-2xl bg-surface-container text-on-surface text-body-sm font-body-sm focus:outline-none"
              >
                <option value="AU Kedai Kopi">AU Kedai Kopi</option>
                <option value="Rival Kampus">Rival Kampus</option>
                <option value="Hanahaki • Med AU">AU Bunga Belahan Jiwa</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant">
                Logline &amp; Premis Singkat
              </label>
              <textarea
                rows={3}
                value={newSynopsis}
                onChange={(e) => setNewSynopsis(e.target.value)}
                placeholder="Ceritakan premis singkat atau dinamika tokoh utamanya..."
                className="px-4 py-2.5 rounded-2xl bg-surface-container text-on-surface text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 resize-none"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddBookOpen(false)}
                className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm cursor-pointer"
              >
                Tambahkan ke Rak
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Tambah Rak */}
      {isAddShelfOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleShelfSubmit}
            className="w-full max-w-sm bg-surface-container-lowest rounded-3xl p-6 shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-primary">Tambah Rak Baru</h3>
              <button
                type="button"
                onClick={() => setIsAddShelfOpen(false)}
                className="text-outline hover:text-primary"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <input
              type="text"
              required
              value={newShelfLabel}
              onChange={(e) => setNewShelfLabel(e.target.value)}
              placeholder="Nama rak (mis. AU Toko Bunga)"
              className="px-4 py-2.5 rounded-2xl bg-surface-container text-on-surface text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddShelfOpen(false)}
                className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm cursor-pointer"
              >
                Simpan Rak
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
