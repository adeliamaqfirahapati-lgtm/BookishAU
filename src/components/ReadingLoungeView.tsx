import { useState } from 'react';
import { READER_ASSETS } from '../data/bookishSeed';
import { clampReaderScale, createPostcardComment } from '../utils/bookishLogic';
import type {
  PostcardComment,
  ReaderFontId,
  ReaderHighlightNote,
  ReaderTintId,
} from '../types/bookish';
import { SafeArtwork } from './SafeArtwork';

interface ReadingLoungeViewProps {
  storyTitle: string;
  postcards: PostcardComment[];
  onAddPostcard: (card: PostcardComment) => void;
  onTogglePostcardLike: (id: string) => void;
  readerNotes: ReaderHighlightNote[];
  onAddReaderNote: (note: ReaderHighlightNote) => void;
  readerTint: ReaderTintId;
  onChangeTint: (tint: ReaderTintId) => void;
  readerFont: ReaderFontId;
  onChangeFont: (font: ReaderFontId) => void;
  readerScale: number;
  onChangeScale: (scale: number) => void;
  onNotify: (msg: string) => void;
}

const LOUNGE_CHAPTERS = [
  { id: 1, label: '1. Tumpahan Kayu Manis', state: 'done' },
  { id: 2, label: '2. Catatan di Serbet', state: 'done' },
  { id: 3, label: '3. Bisikan di Antara Uap & DM', state: 'active' },
  { id: 4, label: '4. Gala Fakultas', state: 'locked' },
  { id: 5, label: '5. Tatapan Trem Hujan', state: 'locked' },
];

export function ReadingLoungeView({
  storyTitle,
  postcards,
  onAddPostcard,
  onTogglePostcardLike,
  readerNotes,
  onAddReaderNote,
  readerTint,
  onChangeTint,
  readerFont,
  onChangeFont,
  readerScale,
  onChangeScale,
  onNotify,
}: ReadingLoungeViewProps) {
  const [activeChapter, setActiveChapter] = useState(3);
  const [bookmarked, setBookmarked] = useState(true);
  const [followingAuthor, setFollowingAuthor] = useState(false);
  const [lofiPlaying, setLofiPlaying] = useState(true);
  const [lofiTrackIndex, setLofiTrackIndex] = useState(0);
  const [tweetLiked, setTweetLiked] = useState(false);
  const [tweetLikes, setTweetLikes] = useState(892);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [pollVotes, setPollVotes] = useState({ yes: 2450, no: 692 });
  const [selectedPoll, setSelectedPoll] = useState<'yes' | 'no' | null>(null);
  const [kudosCount, setKudosCount] = useState(1420);
  const [paraReaction, setParaReaction] = useState<string | null>(null);
  const [postcardText, setPostcardText] = useState('');
  const [newMarginOpen, setNewMarginOpen] = useState(false);
  const [marginQuoteText, setMarginQuoteText] = useState('');

  const lofiTracks = [
    'Jendela Kafe Hujan & Espreso',
    'Vinyl Tengah Malam Bloomsbury',
    'Rintik Kaca & Porselen Hangat',
  ];

  const totalPollVotes = pollVotes.yes + pollVotes.no;
  const yesPct = Math.round((pollVotes.yes / totalPollVotes) * 100);
  const noPct = 100 - yesPct;

  const canvasBgClass =
    readerTint === 'rose'
      ? 'bg-[#fff0f3]'
      : readerTint === 'midnight'
        ? 'bg-[#272320] reader-midnight text-[#f3ece3]'
        : 'bg-[#fdf9f3]';

  const articleFontClass =
    readerFont === 'sans'
      ? 'font-sans'
      : readerFont === 'mono'
        ? 'font-mono'
        : 'font-body-lg';

  const handleVote = (choice: 'yes' | 'no') => {
    setSelectedPoll(choice);
    setPollVotes((prev) => ({
      ...prev,
      [choice]: prev[choice] + 1,
    }));
  };

  const handlePostcardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = createPostcardComment('Pembaca_BookishAU', postcardText);
    if (!created) return;
    onAddPostcard(created);
    setPostcardText('');
    onNotify('Kartu pos pembacamu berhasil disematkan ke Diskusi Salon!');
  };

  const handleMarginNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!marginQuoteText.trim()) return;
    onAddReaderNote({
      id: `note-${Date.now()}`,
      handle: '@elena_reader',
      paragraphLabel: `Bab ${activeChapter}`,
      quote: `"${marginQuoteText.trim()}"`,
      agrees: 1,
      highlight: true,
    });
    setMarginQuoteText('');
    setNewMarginOpen(false);
    onNotify('Catatan tempel disematkan di margin kanan.');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Reading Environment Dock */}
      <div className="sticky top-16 z-30 w-full bg-surface-bright/95 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left: Story Context */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">local_cafe</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm text-primary truncate max-w-xs md:max-w-md">
                  {storyTitle}
                </span>
                <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed shrink-0">
                  Bab {activeChapter}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  Waktu baca tersisa 14 mnt
                </span>
                <span className="w-1 h-1 rounded-full bg-outline-variant hidden sm:inline-block" />
                <span className="hidden sm:inline font-label-sm text-label-sm text-secondary font-medium">
                  Elena Vance (@elenaVance)
                </span>
              </div>
            </div>
          </div>

          {/* Center: Tint & Typography Controls */}
          <div className="flex items-center gap-3 sm:gap-5 bg-surface-container-low px-4 py-1.5 rounded-full shadow-sm flex-wrap">
            {/* Paper Tint Palette */}
            <div className="flex items-center gap-1.5 pr-1">
              <button
                type="button"
                title="Nuansa Krem Kertas"
                onClick={() => onChangeTint('parchment')}
                className={`w-6 h-6 rounded-full bg-[#fdf9f3] shadow-sm transition-transform cursor-pointer ${
                  readerTint === 'parchment'
                    ? 'ring-2 ring-primary/60 scale-110'
                    : 'ring-1 ring-outline-variant/40'
                }`}
              />
              <button
                type="button"
                title="Nuansa Kelopak Mawar"
                onClick={() => onChangeTint('rose')}
                className={`w-6 h-6 rounded-full bg-[#fff0f3] shadow-sm transition-transform cursor-pointer ${
                  readerTint === 'rose'
                    ? 'ring-2 ring-primary/60 scale-110'
                    : 'ring-1 ring-outline-variant/40'
                }`}
              />
              <button
                type="button"
                title="Nuansa Beludru Gelap"
                onClick={() => onChangeTint('midnight')}
                className={`w-6 h-6 rounded-full bg-[#272320] shadow-sm transition-transform cursor-pointer ${
                  readerTint === 'midnight'
                    ? 'ring-2 ring-secondary scale-110'
                    : 'ring-1 ring-outline-variant/40'
                }`}
              />
            </div>

            <span className="w-px h-4 bg-outline-variant" />

            {/* Font Face Toggle */}
            <div className="flex items-center gap-1">
              {(
                [
                  { id: 'serif', label: 'Serif', extra: 'font-headline-sm text-[12px]' },
                  { id: 'sans', label: 'Sans', extra: 'font-label-sm text-[11px]' },
                  { id: 'mono', label: 'Mono', extra: 'font-mono text-[11px]' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onChangeFont(f.id)}
                  className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${f.extra} ${
                    readerFont === f.id
                      ? 'bg-surface-container-highest text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="w-px h-4 bg-outline-variant" />

            {/* Font Size Scale */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                title="Perkecil teks"
                onClick={() => onChangeScale(clampReaderScale(readerScale, -10))}
                className="w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-md text-label-md cursor-pointer"
              >
                A-
              </button>
              <span className="font-label-sm text-label-sm text-on-surface-variant w-10 text-center">
                {readerScale}%
              </span>
              <button
                type="button"
                title="Perbesar teks"
                onClick={() => onChangeScale(clampReaderScale(readerScale, 10))}
                className="w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-md text-label-md cursor-pointer"
              >
                A+
              </button>
            </div>
          </div>

          {/* Right: Reading Progress & Bookmark */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col items-end gap-1 w-32">
              <div className="flex items-center justify-between w-full font-label-sm text-label-sm text-on-surface-variant">
                <span>Membaca</span>
                <span className="text-secondary font-bold">78%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setBookmarked((b) => !b);
                onNotify(bookmarked ? 'Penanda halaman dilepas.' : 'Halaman 18 ditandai!');
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm shadow-sm cursor-pointer"
            >
              <span
                className="material-symbols-outlined text-[18px] text-secondary"
                style={{ fontVariationSettings: bookmarked ? "'FILL' 1" : "'FILL' 0" }}
              >
                bookmark
              </span>
              <span className="hidden sm:inline">Halaman 18</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reader Body Container with Adaptive Color Scheme */}
      <div className={`w-full ${canvasBgClass} px-4 sm:px-8 lg:px-14 py-12 transition-colors duration-500`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT MARGIN: Table of Contents & Ambient Music Player (3 cols) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 sticky top-36">
            <div className="reader-surface bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
                  Indeks &amp; Bab
                </span>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
                  Babak II
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {LOUNGE_CHAPTERS.map((ch) => {
                  const isCurrent = ch.id === activeChapter;
                  const isLocked = ch.state === 'locked';
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      disabled={isLocked}
                      onClick={() => setActiveChapter(ch.id)}
                      className={`flex items-center justify-between p-2.5 rounded-2xl text-left transition-colors ${
                        isCurrent
                          ? 'bg-secondary-fixed/40 reader-ink-primary text-on-secondary-fixed font-bold'
                          : isLocked
                            ? 'reader-ink-muted text-on-surface-variant opacity-70 cursor-not-allowed'
                            : 'reader-ink-muted text-on-surface-variant hover:bg-surface-container-low cursor-pointer'
                      }`}
                    >
                      <span className="font-label-md text-label-md truncate pr-2">{ch.label}</span>
                      <span
                        className={`material-symbols-outlined text-[16px] shrink-0 ${
                          isCurrent ? 'reader-ink-accent text-secondary' : 'text-outline-variant'
                        }`}
                      >
                        {isCurrent ? 'menu_book' : isLocked ? 'lock' : 'check_circle'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ambient Cafe Lofi Card */}
            <div className="reader-surface bg-surface-container-lowest p-5 rounded-3xl shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm reader-ink-primary text-primary flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    headphones
                  </span>
                  Lofi Suasana Kafe
                </span>
                {lofiPlaying && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px] text-primary">rainy</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md reader-ink-primary text-primary truncate">
                    {lofiTracks[lofiTrackIndex]}
                  </span>
                  <span className="font-label-sm text-label-sm reader-ink-muted text-on-surface-variant">
                    Daftar Putar AU Binaural
                  </span>
                </div>
              </div>
              <div className="w-full py-1">
                <svg
                  className={`w-full h-6 text-secondary/70 ${lofiPlaying ? 'animate-pulse' : ''}`}
                  fill="none"
                  viewBox="0 0 160 24"
                >
                  <path
                    d="M0 12 Q 10 2, 20 12 T 40 12 T 60 4 T 80 18 T 100 12 T 120 20 T 140 8 T 160 12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant pt-1">
                <button
                  type="button"
                  onClick={() =>
                    setLofiTrackIndex((i) => (i - 1 + lofiTracks.length) % lofiTracks.length)
                  }
                  title="Sebelumnya"
                  className="hover:text-primary cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">skip_previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLofiPlaying((p) => !p)}
                  title={lofiPlaying ? 'Jeda' : 'Putar'}
                  className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {lofiPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setLofiTrackIndex((i) => (i + 1) % lofiTracks.length)}
                  title="Berikutnya"
                  className="hover:text-primary cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">skip_next</span>
                </button>
                <span className="material-symbols-outlined text-[18px]">volume_up</span>
              </div>
            </div>

            {/* Active Tropes */}
            <div className="reader-surface-alt bg-surface-container p-5 rounded-3xl flex flex-col gap-3">
              <span className="font-label-sm text-label-sm reader-ink-muted text-on-surface-variant uppercase tracking-wider font-bold">
                Trope AU Aktif
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                  #KedaiKopiAU
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm">
                  #RivalAkademik
                </span>
                <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                  #IdentitasRahasia
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm">
                  #SlowBurn
                </span>
              </div>
            </div>
          </div>

          {/* MAIN READER COLUMN (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-8 relative">
            {/* Ribbon Bookmark */}
            <div className="absolute -top-12 right-6 z-20 pointer-events-none flex flex-col items-center">
              <div className="w-7 h-16 bg-secondary rounded-b-md shadow-md flex items-center justify-center pt-2">
                <span className="material-symbols-outlined text-surface-bright text-[16px]">
                  menu_book
                </span>
              </div>
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[8px] border-t-secondary -mt-0.5" />
            </div>

            {/* Chapter Frontispiece Header */}
            <header className="reader-surface bg-surface-container-lowest p-7 md:p-10 rounded-3xl shadow-sm relative overflow-hidden flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                    Divergensi Kanon AU
                  </span>
                  <span className="font-label-sm text-label-sm reader-ink-muted text-on-surface-variant">
                    • 4.820 kata
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    favorite
                  </span>
                  <span className="font-label-sm text-label-sm font-semibold reader-ink-accent text-secondary">
                    2.391
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-label-sm text-label-sm reader-ink-accent text-secondary uppercase tracking-widest font-bold">
                  Babak Dua • Bab {activeChapter}
                </span>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg reader-ink-primary text-primary tracking-tight leading-tight">
                  Bisikan di Antara Uap &amp; DM
                </h1>
                <p className="font-body-md text-body-md reader-ink-muted text-on-surface-variant italic">
                  "Jangan pernah percaya musuh bebuyutan yang hafal persis rasio susu oatmu."
                </p>
              </div>

              {/* Author Bar */}
              <div className="reader-surface-alt flex items-center justify-between pt-4 bg-surface-container-low px-4 py-3 rounded-2xl gap-2">
                <div className="flex items-center gap-3">
                  <SafeArtwork
                    src={READER_ASSETS.authorHeadshot}
                    fallbackSrc="/src/assets/images/portrait_clara_1795021212579.jpg"
                    alt="Elena Vance"
                    className="w-10 h-10 rounded-full object-cover shrink-0 shadow-sm"
                  />
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md reader-ink-primary text-primary font-bold">
                      Elena Vance
                    </span>
                    <span className="font-label-sm text-label-sm reader-ink-accent text-secondary">
                      Penulis · Diperbarui 3 jam lalu
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFollowingAuthor((f) => !f)}
                  className={`px-4 py-1.5 rounded-full transition-colors font-label-sm text-label-sm shadow-sm cursor-pointer ${
                    followingAuthor
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-primary text-on-primary hover:bg-primary-container'
                  }`}
                >
                  {followingAuthor ? '✓ Mengikuti' : '+ Ikuti Penulis'}
                </button>
              </div>
            </header>

            {/* Prose Content Area */}
            <article
              style={{ fontSize: `${(readerScale / 100) * 1.125}rem` }}
              className={`reader-surface bg-surface-container-lowest p-7 md:p-12 rounded-3xl shadow-sm flex flex-col gap-8 text-on-surface ${articleFontClass} leading-relaxed relative`}
            >
              {/* Paragraph 1 with Drop Cap & Inline Reaction */}
              <p className="relative group">
                <span className="font-headline-lg text-display-lg float-left mr-3.5 leading-none reader-ink-primary text-primary font-bold">
                  M
                </span>
                esin espreso itu berdesis tertahan, melepaskan kepulan uap beraroma vanila yang
                memburamkan pantulan jendela berhias tetes hujan yang menghadap langsung ke
                Bloomsbury Street. Selama tiga tahun berdiri di balik meja kayu mahogani mengilap
                milik <em className="reader-ink-primary text-primary font-serif">The Gilded Quill</em>
                , Arthur telah menyempurnakan keahlian membaca kemelut batin seseorang hanya dari
                pesanan kafein mereka.
                <button
                  type="button"
                  onClick={() =>
                    setParaReaction((prev) => (prev === '☕' ? null : '☕'))
                  }
                  className="mt-2 sm:mt-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity sm:absolute sm:-right-4 sm:top-1 px-2.5 py-1 rounded-full bg-surface-container-high text-primary hover:bg-secondary-container hover:text-on-secondary-container shadow-sm inline-flex items-center gap-1 font-label-sm text-[11px] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">add_reaction</span>
                  <span>{paraReaction ? `${paraReaction} Disukai` : 'Bereaksi'}</span>
                </button>
              </p>

              {/* Paragraph 2 */}
              <p>
                Dr. Julian Chen baru saja melangkah melewati pintu depan tepat pukul 07.42 pagi.
                Mantel paritnya basah kuyup, tas selempang kulitnya meneteskan air ke atas karpet
                selamat datang antik, dan sebelah alisnya terangkat dengan ketenangan angkuh yang
                menjengkelkan—raut wajah yang kerap meneror Arthur dalam setiap perdebatan dewan
                senat fakultas sejak semester musim gugur. Arthur sengaja menyeka portafilter
                dengan gerakan yang luar biasa lambat dan penuh perhitungan. Julian memesan flat
                white andalannya tanpa sepatah kata pun terbuang sia-sia.
              </p>

              {/* EMBEDDED AU ELEMENT 1: Twitter AU Card */}
              <div className="reader-surface-alt my-2 p-5 rounded-2xl bg-surface-container-low shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <SafeArtwork
                      src={READER_ASSETS.julianAvatar}
                      fallbackSrc="/src/assets/images/portrait_julian_1795021213910.jpg"
                      alt="Julian Chen"
                      className="w-10 h-10 rounded-full object-cover shadow-sm"
                    />
                    <div className="flex flex-col leading-tight">
                      <div className="flex items-center gap-1">
                        <span className="font-label-md text-label-md reader-ink-primary text-primary font-bold">
                          Julian Chen
                        </span>
                        <span
                          className="material-symbols-outlined text-[15px] text-secondary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm reader-ink-muted text-on-surface-variant">
                        @chen_archival · 42m
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[20px] reader-ink-muted text-on-surface-variant">
                    more_horiz
                  </span>
                </div>
                <p className="font-body-sm text-body-sm leading-normal">
                  Kepada siapa pun yang berjaga di bar pagi seberang Senate House: flat white
                  buatanmu barusan memulihkan tekadku untuk memperdebatkan watermark folio abad
                  ketujuh belas dengan ketua dewan jurusan yang keras kepala. Simpan kembaliannya,
                  pertahankan keheningannya. ☕🌧️
                </p>
                <div className="flex items-center justify-between reader-ink-muted text-on-surface-variant pt-2 font-label-sm text-label-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">
                      chat_bubble_outline
                    </span>
                    <span>38</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">repeat</span>
                    <span>124</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setTweetLiked((l) => !l);
                      setTweetLikes((c) => (tweetLiked ? c - 1 : c + 1));
                    }}
                    className="flex items-center gap-1.5 text-secondary transition-colors cursor-pointer"
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      favorite
                    </span>
                    <span>{tweetLikes}</span>
                  </button>
                  <span className="material-symbols-outlined text-[18px]">share</span>
                </div>
              </div>

              {/* Paragraph 3 */}
              <p>
                Arthur menatap layar di bawah meja bar, ibu jarinya terdiam ragu di atas kaca gawai.
                Julian telah memberinya tip sepuluh pound tunai tanpa sekalipun menatap matanya.
                Namun, di sanalah tulisan itu bertengger: dicuitkan ke jagat maya bahkan sebelum
                payungnya sempat kering sempurna di rak koridor lantai atas. Ponsel Arthur seketika
                bergetar tanpa ampun.
              </p>

              {/* EMBEDDED AU ELEMENT 2: WhatsApp Chat Simulator */}
              <div className="my-2 p-5 rounded-2xl bg-[#efe9df] text-[#1c1c18] shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-label-md">
                        JC
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#3ba55d] ring-2 ring-[#efe9df]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-primary font-bold">
                        Julian (Rival Jurusan)
                      </span>
                      <span className="font-label-sm text-[10px] text-secondary font-medium">
                        online
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">videocam</span>
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 pt-2">
                  <div className="flex flex-col items-start max-w-[85%]">
                    <div className="p-3.5 rounded-2xl rounded-tl-sm bg-white shadow-sm text-[#1c1c18] font-body-sm text-body-sm">
                      Apakah kau ada di ruang arsip hari ini? Aku butuh faksimili tahun 1623 itu
                      sebelum seminar jam 10 pagi.
                    </div>
                    <span className="font-label-sm text-[9px] text-on-surface-variant mt-0.5 ml-1">
                      07:44
                    </span>
                  </div>

                  <div className="flex flex-col items-end max-w-[85%] self-end">
                    <div className="p-3.5 rounded-2xl rounded-tr-sm bg-secondary-fixed text-on-secondary-fixed shadow-sm font-body-sm text-body-sm">
                      Saat ini aku sedang sibuk menjaga separuh departemen humaniora tetap melek,
                      Profesor Chen. Periksa kotak posmu.
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 mr-1">
                      <span className="font-label-sm text-[9px] text-on-surface-variant">
                        07:46
                      </span>
                      <span className="material-symbols-outlined text-[13px] text-secondary">
                        done_all
                      </span>
                    </div>
                  </div>

                  {/* Audio Voice Note */}
                  <div className="flex flex-col items-start max-w-[90%]">
                    <div className="p-3 rounded-2xl rounded-tl-sm bg-white shadow-sm flex items-center gap-3 w-72 text-[#1c1c18]">
                      <button
                        type="button"
                        onClick={() => setVoicePlaying((v) => !v)}
                        title="Putar Catatan Suara"
                        className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm hover:scale-105 transition-transform cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {voicePlaying ? 'pause' : 'play_arrow'}
                        </span>
                      </button>
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          {[4, 6, 3, 7, 5, 2, 6, 4, 8, 3].map((h, idx) => (
                            <div
                              key={idx}
                              className={`w-1 rounded-full ${
                                voicePlaying || idx % 2 === 0
                                  ? 'bg-secondary'
                                  : 'bg-outline-variant'
                              } ${voicePlaying ? 'animate-pulse' : ''}`}
                              style={{ height: `${h * 3.5}px` }}
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-label-sm text-on-surface-variant mt-1">
                          <span>0:14</span>
                          <span>Julian_pesansuara_0748.aac</span>
                        </div>
                      </div>
                    </div>
                    <span className="font-label-sm text-[9px] text-on-surface-variant mt-0.5 ml-1">
                      07:48
                    </span>
                  </div>

                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white w-fit text-secondary mt-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                    <span className="font-label-sm text-[10px] ml-1 text-on-surface-variant">
                      Julian sedang mengetik...
                    </span>
                  </div>
                </div>
              </div>

              {/* Paragraph 4 */}
              <p>
                Arthur menekan jeda pada rekaman suara itu. Suara bariton Julian yang serak khas
                bangun tidur, terdengar lewat pelantang ponsel murah, sungguh merupakan ancaman yang
                tidak adil bagi pagi hari di hari Selasa yang basah. Terlebih ketika disusul oleh
                denting khas cangkir keramik yang membentur cawan tatakannya di latar belakang.
                Cangkir yang sama persis dengan yang diserahkan Arthur lima menit lalu.
              </p>

              {/* EMBEDDED AU ELEMENT 3: Instagram Story Card with Reader Interactive Poll */}
              <div className="my-2 p-5 rounded-3xl bg-gradient-to-b from-surface-container to-surface-container-high text-[#1c1c18] shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full p-0.5 ring-2 ring-secondary bg-white">
                      <SafeArtwork
                        src={READER_ASSETS.cafeAvatar}
                        fallbackSrc="/src/assets/images/cover_coffee_rain_1795021211974.jpg"
                        alt="The Gilded Quill"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="font-label-md text-label-md text-primary font-bold">
                      @thegildedquill_london
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      • 1 jam lalu
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-semibold">
                    Polling Cerita
                  </span>
                </div>

                <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-inner">
                  <SafeArtwork
                    src={READER_ASSETS.storyCafeArt}
                    fallbackSrc="/src/assets/images/cover_coffee_rain_1795021211974.jpg"
                    alt="Konter kafe artisan dengan cangkir keramik"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/25 backdrop-blur-[1px]" />
                  <div className="absolute inset-0 p-4 flex flex-col justify-between text-on-primary">
                    <span className="font-label-sm text-label-sm bg-primary/80 backdrop-blur-md px-3 py-1 rounded-full w-fit">
                      Langsung dari balik meja barista
                    </span>
                    <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl text-[#1c1c18] shadow-lg flex flex-col gap-2">
                      <span className="font-label-md text-label-md font-bold text-primary text-center">
                        "Haruskah barista memanggil musuh bebuyutannya dengan nama samaran di
                        cangkir?"
                      </span>
                      <div className="flex flex-col gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleVote('yes')}
                          className={`flex items-center justify-between px-3.5 py-2 rounded-xl bg-secondary-fixed/60 hover:bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md transition-all cursor-pointer ${
                            selectedPoll === 'yes' ? 'ring-2 ring-secondary font-bold' : ''
                          }`}
                        >
                          <span>YA, tulis &apos;Pangeran Judes&apos;</span>
                          <span className="font-bold">{yesPct}%</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleVote('no')}
                          className={`flex items-center justify-between px-3.5 py-2 rounded-xl bg-surface-container-highest/90 hover:bg-surface-container text-[#1c1c18] font-label-md text-label-md transition-all cursor-pointer ${
                            selectedPoll === 'no' ? 'ring-2 ring-secondary font-bold' : ''
                          }`}
                        >
                          <span>TIDAK, biarkan dia menderita dalam ketegangan sopan</span>
                          <span className="font-bold">{noPct}%</span>
                        </button>
                      </div>
                      <span className="font-label-sm text-[10px] text-center text-on-surface-variant">
                        {totalPollVotes.toLocaleString('id-ID')} pembaca memberikan suara dalam
                        polling bab ini
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Closing Prose */}
              <p>
                Arthur tersenyum tipis penuh arti, mengambil spidol permanen dari tatakan penggiling
                espreso, lalu memutar selongsong karton cangkir Julian untuk isi ulang sore nanti.
                Masih ada satu babak penuh yang harus diselesaikan sebelum lonceng tengah malam
                berdentang di Senate House.
              </p>

              {/* Chapter End Divider */}
              <div className="flex items-center justify-center gap-3 py-4 text-secondary">
                <span className="w-12 h-px bg-outline-variant" />
                <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                <span className="w-12 h-px bg-outline-variant" />
              </div>
            </article>

            {/* Chapter Reader Action Bar (Kudos & Navigation) */}
            <div className="reader-surface bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setKudosCount((c) => c + 1)}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-on-primary hover:bg-primary-container transition-all transform active:scale-95 shadow-md group cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px] group-hover:rotate-12 transition-transform">
                    coffee
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="font-label-md text-label-md leading-none">
                      Traktir Kopi Penulis
                    </span>
                    <span className="font-label-sm text-[10px] opacity-85">
                      {kudosCount.toLocaleString('id-ID')} cangkir dituangkan ✨
                    </span>
                  </div>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onNotify('Kutipan kartu cerita BookTok berhasil disalin ke papan klip.')
                    }
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">
                      share
                    </span>
                    <span>Bagikan ke BookTok</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookmarked((b) => !b)}
                    title="Tandai bab ini"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">bookmark_add</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveChapter((c) => Math.max(1, c - 1))}
                  className="flex items-center gap-2 font-label-md text-label-md reader-ink-muted text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Bab 2: Catatan di Serbet</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onNotify('Bab 4 — Gala Fakultas sedang dalam tahap penyuntingan di Studio.')
                  }
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold hover:bg-secondary-fixed-dim transition-all shadow-sm cursor-pointer"
                >
                  <span>Lanjut: Bab 4 — Gala Fakultas</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* READER COMMENTS SECTION: Postcards */}
            <section className="flex flex-col gap-6 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm reader-ink-primary text-primary">
                    Diskusi Salon &amp; Catatan Margin
                  </span>
                  <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                    {146 + postcards.length} Catatan
                  </span>
                </div>
              </div>

              {/* New Comment Input Box */}
              <form
                onSubmit={handlePostcardSubmit}
                className="reader-surface bg-surface-container-lowest p-5 rounded-3xl shadow-sm flex flex-col gap-3"
              >
                <div className="flex items-start gap-3">
                  <SafeArtwork
                    src={READER_ASSETS.readerAvatar}
                    fallbackSrc="/src/assets/images/portrait_clara_1795021212579.jpg"
                    alt="Pembaca"
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 flex flex-col gap-2">
                    <textarea
                      rows={2}
                      value={postcardText}
                      onChange={(e) => setPostcardText(e.target.value)}
                      placeholder="Tinggalkan kartu pos atau sorotan pada bab ini..."
                      className="w-full bg-surface-container-low p-3 rounded-2xl text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 resize-none transition-all"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <button
                          type="button"
                          onClick={() => setPostcardText((t) => `${t} “”`)}
                          title="Format kutipan"
                          className="hover:text-primary cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            format_quote
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPostcardText((t) => `${t} ☕`)}
                          title="Emotikon"
                          className="hover:text-primary cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            sentiment_satisfied
                          </span>
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-sm text-label-sm transition-colors shadow-sm cursor-pointer"
                      >
                        Kirim Kartu Pos
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Existing & Submitted Postcards */}
              {postcards.map((card) => (
                <div
                  key={card.id}
                  className="reader-surface bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col gap-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-14 h-14 bg-surface-container-high rounded-bl-3xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px] text-secondary">
                      history_edu
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pr-12">
                    <SafeArtwork
                      src={card.avatarUrl}
                      fallbackSrc={card.fallbackAvatarUrl}
                      alt={card.author}
                      className="w-9 h-9 rounded-full object-cover shadow-sm"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-label-md text-label-md reader-ink-primary text-primary font-bold">
                          {card.author}
                        </span>
                        {card.badge && (
                          <span className="font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-medium">
                            {card.badge}
                          </span>
                        )}
                      </div>
                      <span className="font-label-sm text-[11px] reader-ink-muted text-on-surface-variant">
                        {card.meta}
                      </span>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md">{card.body}</p>
                  <div className="flex items-center gap-4 reader-ink-muted text-on-surface-variant font-label-sm text-label-sm">
                    <button
                      type="button"
                      onClick={() => onTogglePostcardLike(card.id)}
                      className={`flex items-center gap-1 cursor-pointer ${
                        card.liked ? 'text-secondary font-bold' : 'hover:text-secondary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">favorite</span>
                      {card.likes}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPostcardText(`@${card.author} `)}
                      className="hover:text-primary cursor-pointer"
                    >
                      Balas
                    </button>
                  </div>

                  {card.authorReply && (
                    <div className="mt-1 p-4 rounded-2xl reader-surface-alt bg-secondary-fixed/30 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md font-bold reader-ink-primary text-on-secondary-fixed">
                            {card.authorReply.author}
                          </span>
                          <span className="font-label-sm text-[10px] px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-bold">
                            PENULIS
                          </span>
                        </div>
                        <span className="font-label-sm text-[11px] reader-ink-muted text-on-surface-variant">
                          {card.authorReply.timeAgo}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm reader-ink-primary text-on-secondary-fixed">
                        {card.authorReply.body}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </section>
          </div>

          {/* RIGHT MARGIN: Live Reader Annotations & Character Dossier (3 cols) */}
          <aside className="hidden lg:flex lg:col-span-3 flex-col gap-6 sticky top-36">
            <div className="reader-surface bg-surface-container-lowest p-5 rounded-3xl shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm reader-ink-accent text-secondary uppercase tracking-wider font-bold">
                  Catatan Pembaca Langsung
                </span>
                <span className="font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
                  Halaman 18
                </span>
              </div>

              {readerNotes.map((note) => (
                <div
                  key={note.id}
                  className={`p-3.5 rounded-2xl flex flex-col gap-2 transition-transform hover:-translate-x-1 reader-surface-alt ${
                    note.highlight
                      ? 'bg-secondary-fixed/35 ring-1 ring-secondary/35'
                      : 'bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm reader-ink-accent text-secondary font-bold">
                      {note.handle}
                    </span>
                    <span className="font-label-sm text-[10px] reader-ink-muted text-on-surface-variant">
                      {note.paragraphLabel}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm reader-ink-primary text-primary italic">
                    {note.quote}
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-label-sm reader-ink-muted text-on-surface-variant pt-1">
                    <span>{note.agrees} setuju</span>
                    <span className="material-symbols-outlined text-[14px] reader-ink-accent text-secondary">
                      favorite
                    </span>
                  </div>
                </div>
              ))}

              {newMarginOpen ? (
                <form onSubmit={handleMarginNoteSubmit} className="flex flex-col gap-2">
                  <textarea
                    rows={2}
                    value={marginQuoteText}
                    onChange={(e) => setMarginQuoteText(e.target.value)}
                    placeholder="Tulis catatan margin..."
                    className="p-2.5 rounded-xl bg-surface-container text-on-surface text-body-sm font-body-sm focus:outline-none resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setNewMarginOpen(false)}
                      className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-label-sm"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 rounded-full bg-primary text-on-primary text-label-sm font-label-sm cursor-pointer"
                    >
                      Sematkan
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setNewMarginOpen(true)}
                  className="w-full py-2.5 rounded-2xl bg-surface-container text-primary hover:bg-surface-container-high transition-colors font-label-sm text-label-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">edit_note</span>
                  <span>+ Sematkan Catatan Tempel di Margin</span>
                </button>
              )}
            </div>

            {/* Dynamic Character Relationship Dossier */}
            <div className="reader-surface bg-surface-container-lowest p-5 rounded-3xl shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm reader-ink-primary text-primary uppercase tracking-wider font-bold">
                  Dossier: Dinamika Saat Ini
                </span>
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  sync_alt
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col items-center gap-1 text-center w-24">
                  <div className="w-12 h-12 rounded-full p-0.5 bg-primary/20">
                    <SafeArtwork
                      src={READER_ASSETS.arthurDossier}
                      fallbackSrc="/src/assets/images/portrait_clara_1795021212579.jpg"
                      alt="Arthur Pendelton"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="font-label-sm text-label-sm font-bold reader-ink-primary text-primary">
                    Arthur Pendelton
                  </span>
                  <span className="font-label-sm text-[10px] reader-ink-muted text-on-surface-variant">
                    Barista / S3
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-[20px] text-secondary">
                    local_fire_department
                  </span>
                  <span className="font-label-sm text-[10px] font-bold reader-ink-accent text-secondary">
                    Ketegangan: 84%
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1 text-center w-24">
                  <div className="w-12 h-12 rounded-full p-0.5 bg-secondary/20">
                    <SafeArtwork
                      src={READER_ASSETS.julianDossier}
                      fallbackSrc="/src/assets/images/portrait_julian_1795021213910.jpg"
                      alt="Dr. Julian Chen"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="font-label-sm text-label-sm font-bold reader-ink-primary text-primary">
                    Dr. Julian Chen
                  </span>
                  <span className="font-label-sm text-[10px] reader-ink-muted text-on-surface-variant">
                    Cendekiawan Rival
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex items-center justify-between font-label-sm text-[11px] reader-ink-muted text-on-surface-variant">
                  <span>Kesopanan Dingin</span>
                  <span className="reader-ink-accent text-secondary font-bold">
                    Saling Merindu Diam-diam
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden flex">
                  <div className="h-full bg-outline-variant w-[30%]" />
                  <div className="h-full bg-secondary w-[70%]" />
                </div>
              </div>

              <p className="font-label-sm text-label-sm reader-ink-muted text-on-surface-variant italic">
                "Keduanya mengetahui jadwal akademik satu sama lain dari luar kepala; keduanya
                berdalih hal itu murni demi efisiensi administrasi."
              </p>
            </div>

            {/* Reader's Ambient Book Club */}
            <div className="reader-surface-alt bg-surface-container p-5 rounded-3xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-secondary">group</span>
                <span className="font-label-md text-label-md reader-ink-primary text-primary font-bold">
                  Kehadiran di Lounge
                </span>
              </div>
              <p className="font-label-sm text-label-sm reader-ink-muted text-on-surface-variant">
                324 anggota BookishAU sedang membuka Babak II saat ini.
              </p>
              <div className="flex items-center -space-x-2 pt-1">
                <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-[10px] ring-2 ring-surface">
                  EM
                </div>
                <div className="w-7 h-7 rounded-full bg-tertiary-fixed text-primary flex items-center justify-center font-bold text-[10px] ring-2 ring-surface">
                  JW
                </div>
                <div className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-[10px] ring-2 ring-surface">
                  KS
                </div>
                <div className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-[10px] ring-2 ring-surface">
                  +321
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
