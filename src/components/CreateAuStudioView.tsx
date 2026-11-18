import { useState } from 'react';
import {
  appendChatMessage,
  countWordsInBlocks,
  createAuBlock,
  deleteAuBlock,
  duplicateAuBlock,
  voteStoryPoll,
} from '../utils/bookishLogic';
import type {
  AuBlock,
  CharacterDossierItem,
  MoodboardPin,
  StudioThemeId,
} from '../types/bookish';
import { SafeArtwork } from './SafeArtwork';

interface CreateAuStudioViewProps {
  storyTitle: string;
  chapterTitle: string;
  onUpdateStoryTitle: (title: string) => void;
  onUpdateChapterTitle: (title: string) => void;
  studioTheme: StudioThemeId;
  onChangeTheme: (theme: StudioThemeId) => void;
  blocks: AuBlock[];
  onChangeBlocks: (blocks: AuBlock[]) => void;
  characters: CharacterDossierItem[];
  onAddCharacter: (char: CharacterDossierItem) => void;
  moodboard: MoodboardPin[];
  tropes: string[];
  onAddTrope: (trope: string) => void;
  onPreviewReader: () => void;
  onPublishChapter: () => void;
  onNotify: (msg: string) => void;
}

const THEME_OPTIONS: { id: StudioThemeId; label: string; dotClass: string }[] = [
  { id: 'theme-strawberry', label: 'Stroberi Manis', dotClass: 'bg-secondary' },
  { id: 'theme-vintage', label: 'Espreso Antik', dotClass: 'bg-primary-container' },
  { id: 'theme-lavender', label: 'Kabut Lavender', dotClass: 'bg-[#9575cd]' },
  { id: 'theme-matcha', label: 'Matcha Latte', dotClass: 'bg-[#66bb6a]' },
];

const QUICK_STICKERS = [
  { emoji: '☕', label: 'Kopi' },
  { emoji: '🌧️', label: 'Hujan' },
  { emoji: '📐', label: 'Draf' },
  { emoji: '💖', label: 'Hati' },
  { emoji: '🎙️', label: 'Audio' },
  { emoji: '🐾', label: 'Kucing' },
  { emoji: '✨', label: 'Kilau' },
  { emoji: '🎵', label: 'Musik' },
];

export function CreateAuStudioView({
  storyTitle,
  chapterTitle,
  onUpdateStoryTitle,
  onUpdateChapterTitle,
  studioTheme,
  onChangeTheme,
  blocks,
  onChangeBlocks,
  characters,
  onAddCharacter,
  moodboard,
  tropes,
  onAddTrope,
  onPreviewReader,
  onPublishChapter,
  onNotify,
}: CreateAuStudioViewProps) {
  const [chatInputs, setChatInputs] = useState<Record<string, string>>({});
  const [threadInputs, setThreadInputs] = useState<Record<string, string>>({});
  const [openThreadId, setOpenThreadId] = useState<string | null>(null);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [editingProseId, setEditingProseId] = useState<string | null>(null);
  const [newTropeOpen, setNewTropeOpen] = useState(false);
  const [newTropeText, setNewTropeText] = useState('');
  const [newCharOpen, setNewCharOpen] = useState(false);
  const [charName, setCharName] = useState('');
  const [charRole, setCharRole] = useState('');
  const [charBio, setCharBio] = useState('');

  const wordCount = countWordsInBlocks(blocks);

  const handleInsertBlock = (type: AuBlock['type']) => {
    const newBlock = createAuBlock(type, blocks.length + 1, storyTitle);
    onChangeBlocks([...blocks, newBlock]);
    onNotify(`Blok ${type.toUpperCase()} baru ditambahkan ke urutan #${blocks.length + 1}.`);
  };

  const handleSendChat = (blockId: string, activeSender: string, kind: 'text' | 'voice' = 'text') => {
    const raw =
      kind === 'voice'
        ? '"Sebentar, biar kubuatkan dulu espreso hangatnya!"'
        : chatInputs[blockId] ?? '';
    if (!raw.trim()) return;
    const isRight = activeSender === 'Minho';
    onChangeBlocks(appendChatMessage(blocks, blockId, activeSender, isRight, raw, kind));
    if (kind === 'text') {
      setChatInputs((prev) => ({ ...prev, [blockId]: '' }));
    }
  };

  const handleSwapChatSender = (blockId: string) => {
    onChangeBlocks(
      blocks.map((b) => {
        if (b.id !== blockId || b.type !== 'chat') return b;
        return {
          ...b,
          activeSenderRight: b.activeSenderRight === 'Minho' ? 'Theo' : 'Minho',
        };
      })
    );
  };

  const handleVotePoll = (blockId: string, optionId: string) => {
    onChangeBlocks(
      blocks.map((b) => {
        if (b.id !== blockId || b.type !== 'story') return b;
        return {
          ...b,
          pollOptions: voteStoryPoll(b.pollOptions, optionId),
          votedOptionId: optionId,
        };
      })
    );
  };

  const handleInsertSticker = (emoji: string) => {
    const firstChat = blocks.find((b) => b.type === 'chat');
    if (firstChat && firstChat.type === 'chat') {
      setChatInputs((prev) => ({
        ...prev,
        [firstChat.id]: `${prev[firstChat.id] ?? ''}${emoji}`,
      }));
      onNotify(`Stiker ${emoji} disisipkan ke input simulator obrolan.`);
    }
  };

  const handleAddTropeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = newTropeText.trim();
    if (!cleaned) return;
    const formatted = cleaned.startsWith('#') ? cleaned : `#${cleaned.replace(/\s+/g, '')}`;
    onAddTrope(formatted);
    setNewTropeText('');
    setNewTropeOpen(false);
  };

  const handleAddCharSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!charName.trim()) return;
    onAddCharacter({
      id: `char-${Date.now()}`,
      name: charName.trim(),
      roleBadge: charRole.trim() || 'Tokoh Pendukung',
      roleBadgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
      bio: charBio.trim() || 'Karakter baru di semesta alternatif ini.',
      avatarUrl: '/src/assets/images/portrait_clara_1795021212579.jpg',
      fallbackAvatarUrl: '/src/assets/images/portrait_clara_1795021212579.jpg',
      traits: ['Baru Ditambahkan'],
    });
    setCharName('');
    setCharRole('');
    setCharBio('');
    setNewCharOpen(false);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Sticky Studio Action & Metadata Ribbon */}
      <div className="w-full bg-surface-container-lowest/90 backdrop-blur-md px-4 sm:px-8 py-4 shadow-sm z-30 flex flex-wrap items-center justify-between gap-4">
        {/* Story & Chapter Editable Title */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="material-symbols-outlined text-secondary text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_stories
            </span>
            <input
              type="text"
              value={storyTitle}
              onChange={(e) => onUpdateStoryTitle(e.target.value)}
              className="font-headline-md text-headline-md text-primary bg-transparent focus:outline-none focus:ring-1 focus:ring-secondary-container rounded px-1 transition-all w-64 sm:w-96 truncate"
            />
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm uppercase tracking-wider">
              Babak I • Penulisan Draf
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-on-surface-variant font-label-sm text-label-sm pl-8 flex-wrap">
            <span className="text-secondary font-medium">Bab 03:</span>
            <input
              type="text"
              value={chapterTitle}
              onChange={(e) => onUpdateChapterTitle(e.target.value)}
              className="bg-transparent hover:text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary-container rounded px-1 text-on-surface w-56 sm:w-64 truncate"
            />
            <span className="text-outline-variant">•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-tertiary">history</span>
              Tersimpan otomatis 2 mnt lalu
            </span>
          </div>
        </div>

        {/* Theme Pills Customizer */}
        <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full shadow-inner flex-wrap">
          <span className="font-label-sm text-label-sm text-on-surface-variant mr-1.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-secondary">palette</span>
            Nada Warna:
          </span>
          {THEME_OPTIONS.map((t) => {
            const active = studioTheme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onChangeTheme(t.id)}
                className={`px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                  active
                    ? 'bg-secondary-container text-on-secondary-container shadow-sm'
                    : 'hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${t.dotClass}`} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Actions & Stats Counter */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-4 px-4 py-1.5 bg-surface-container rounded-full text-on-surface font-label-sm text-label-sm">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">edit_note</span>
              <strong>{wordCount.toLocaleString('id-ID')}</strong> kata
            </span>
            <span className="text-outline-variant">|</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                view_agenda
              </span>
              <strong>{blocks.length}</strong> blok AU
            </span>
          </div>
          <button
            type="button"
            onClick={onPreviewReader}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md text-label-md transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
            <span>Pratinjau Pembaca</span>
          </button>
          <button
            type="button"
            onClick={onPublishChapter}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">publish</span>
            <span>Terbitkan Bab</span>
          </button>
        </div>
      </div>

      {/* Main Multi-Format Workstation */}
      <div
        className={`${studioTheme} grid grid-cols-12 gap-8 px-4 sm:px-8 py-8 w-full max-w-[1720px] mx-auto transition-colors duration-300`}
      >
        {/* LEFT & CENTER: Feed Canvas & Block Sequencer (8 cols) */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">
          {/* Multi-Format Block Selector Dock */}
          <div className="w-full bg-surface-container-lowest rounded-3xl p-3 shadow-[0_4px_20px_-2px_rgba(111,78,55,0.06)] flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider px-3 mr-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  add_circle
                </span>
                Tambah Blok:
              </span>
              <button
                type="button"
                onClick={() => handleInsertBlock('twitter')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm hover:brightness-95 transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">alternate_email</span>
                <span>+ Kartu Twitter / X</span>
              </button>
              <button
                type="button"
                onClick={() => handleInsertBlock('chat')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high hover:bg-secondary-fixed text-on-surface font-label-sm text-label-sm transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>+ WhatsApp / DM</span>
              </button>
              <button
                type="button"
                onClick={() => handleInsertBlock('story')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high hover:bg-secondary-fixed text-on-surface font-label-sm text-label-sm transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  photo_camera_front
                </span>
                <span>+ Cerita Insta (9:16)</span>
              </button>
              <button
                type="button"
                onClick={() => handleInsertBlock('prose')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high hover:bg-secondary-fixed text-on-surface font-label-sm text-label-sm transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">history_edu</span>
                <span>+ Lembar Prosa Antik</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => onNotify('Urutan blok tersusun otomatis sesuai nomor segmen.')}
              title="Pengaturan Alur Blok AU"
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>

          {/* Stream of AU Blocks */}
          <div className="flex flex-col gap-8">
            {blocks.map((block, index) => {
              const orderNum = index + 1;

              if (block.type === 'twitter') {
                return (
                  <div
                    key={block.id}
                    className="relative bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(111,78,55,0.06),0_2px_6px_-1px_rgba(111,78,55,0.04)] group transition-all hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="cursor-grab material-symbols-outlined text-outline-variant text-[20px] hover:text-primary">
                          drag_indicator
                        </span>
                        <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]">
                            brand_awareness
                          </span>
                          Kartu Twitter AU • Urutan #{orderNum}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenThreadId((prev) => (prev === block.id ? null : block.id))
                          }
                          className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            add_comment
                          </span>
                          Tambah Balasan Utas
                        </button>
                        <button
                          type="button"
                          onClick={() => onChangeBlocks(duplicateAuBlock(blocks, block.id))}
                          title="Duplikat Blok"
                          className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            content_copy
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onChangeBlocks(deleteAuBlock(blocks, block.id))}
                          title="Hapus Blok"
                          className="p-1.5 rounded-full hover:bg-error-container text-error cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Social Frame */}
                    <div className="max-w-[620px] mx-auto bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/20">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <SafeArtwork
                            src={block.avatarUrl}
                            fallbackSrc={block.fallbackAvatarUrl}
                            alt={block.authorName}
                            className="w-12 h-12 rounded-full object-cover shadow-inner flex-shrink-0"
                          />
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span className="font-label-md text-label-md text-on-surface font-bold">
                                {block.authorName}
                              </span>
                              {block.verified && (
                                <span
                                  className="material-symbols-outlined text-[#1d9bf0] text-[18px]"
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  verified
                                </span>
                              )}
                              <span className="text-on-surface-variant font-label-sm text-label-sm">
                                {block.handle}
                              </span>
                            </div>
                            <span className="text-outline font-label-sm text-label-sm">
                              {block.bioLine}
                            </span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-outline text-[20px]">
                          more_horiz
                        </span>
                      </div>

                      <div className="mt-4">
                        <textarea
                          rows={2}
                          value={block.content}
                          onChange={(e) =>
                            onChangeBlocks(
                              blocks.map((b) =>
                                b.id === block.id && b.type === 'twitter'
                                  ? { ...b, content: e.target.value }
                                  : b
                              )
                            )
                          }
                          className="w-full font-body-md text-body-md text-on-surface leading-relaxed bg-transparent resize-none focus:outline-none focus:bg-surface-container-low rounded-xl p-1"
                        />
                      </div>

                      {block.mediaUrl && (
                        <div className="mt-3 relative rounded-2xl overflow-hidden shadow-sm max-h-72">
                          <SafeArtwork
                            src={block.mediaUrl}
                            fallbackSrc={
                              block.fallbackMediaUrl ??
                              '/src/assets/images/cover_coffee_rain_1795021211974.jpg'
                            }
                            alt={block.mediaCaption ?? 'Foto lampiran tweet'}
                            className="w-full h-64 object-cover object-center"
                          />
                          {block.mediaCaption && (
                            <div className="absolute bottom-3 left-3 bg-inverse-surface/80 backdrop-blur-md px-3 py-1 rounded-full text-inverse-on-surface font-label-sm text-label-sm flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[14px]">
                                local_cafe
                              </span>
                              <span>{block.mediaCaption}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-4 pt-3 flex items-center gap-2 text-outline font-label-sm text-label-sm">
                        <span>{block.timestamp}</span>
                        <span>·</span>
                        <span>14 Okt 2024</span>
                        <span>·</span>
                        <span className="text-secondary font-medium">{block.deviceLabel}</span>
                      </div>

                      {block.showMetrics && (
                        <div className="mt-3 py-3.5 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm px-2">
                          <div className="flex items-center gap-6">
                            <span className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[18px]">
                                chat_bubble
                              </span>
                              <strong className="font-semibold text-on-surface">
                                {block.replies + block.threadNotes.length}
                              </strong>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[18px]">repeat</span>
                              <strong className="font-semibold text-on-surface">
                                {block.retweets}
                              </strong>
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onChangeBlocks(
                                  blocks.map((b) =>
                                    b.id === block.id && b.type === 'twitter'
                                      ? { ...b, likes: b.likes + 1 }
                                      : b
                                  )
                                )
                              }
                              className="flex items-center gap-1.5 text-secondary cursor-pointer"
                            >
                              <span
                                className="material-symbols-outlined text-[18px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                favorite
                              </span>
                              <strong className="font-semibold text-on-surface">
                                {block.likes.toLocaleString('id-ID')}
                              </strong>
                            </button>
                            <span className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[18px]">
                                bookmark
                              </span>
                              <strong className="font-semibold text-on-surface">
                                {block.bookmarks}
                              </strong>
                            </span>
                          </div>
                          <span className="material-symbols-outlined text-outline text-[18px]">
                            share
                          </span>
                        </div>
                      )}

                      {block.threadNotes.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-outline-variant/30 flex flex-col gap-2">
                          {block.threadNotes.map((note, nIdx) => (
                            <div
                              key={nIdx}
                              className="p-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface flex items-start gap-2"
                            >
                              <span className="font-label-sm text-label-sm text-secondary shrink-0">
                                Balasan #{nIdx + 1}:
                              </span>
                              <span>{note}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {openThreadId === block.id && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const reply = (threadInputs[block.id] ?? '').trim();
                            if (!reply) return;
                            onChangeBlocks(
                              blocks.map((b) =>
                                b.id === block.id && b.type === 'twitter'
                                  ? { ...b, threadNotes: [...b.threadNotes, reply] }
                                  : b
                              )
                            );
                            setThreadInputs((prev) => ({ ...prev, [block.id]: '' }));
                            setOpenThreadId(null);
                          }}
                          className="mt-3 flex items-center gap-2"
                        >
                          <input
                            type="text"
                            value={threadInputs[block.id] ?? ''}
                            onChange={(e) =>
                              setThreadInputs((prev) => ({
                                ...prev,
                                [block.id]: e.target.value,
                              }))
                            }
                            placeholder="Tulis balasan utas lanjutan..."
                            className="flex-1 px-3 py-2 rounded-full bg-surface-container text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm cursor-pointer"
                          >
                            Tambahkan
                          </button>
                        </form>
                      )}
                    </div>

                    {/* Quick Micro-Tooling Bar */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-on-surface-variant font-label-sm text-label-sm px-2">
                      <span className="flex items-center gap-1 text-outline">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        Tampilan Pembaca AU: Garis Waktu Publik
                      </span>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={block.showThreadCount}
                            onChange={(e) =>
                              onChangeBlocks(
                                blocks.map((b) =>
                                  b.id === block.id && b.type === 'twitter'
                                    ? { ...b, showThreadCount: e.target.checked }
                                    : b
                                )
                              )
                            }
                            className="accent-primary rounded"
                          />
                          <span>Tampilkan Penghitung Utas</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={block.showMetrics}
                            onChange={(e) =>
                              onChangeBlocks(
                                blocks.map((b) =>
                                  b.id === block.id && b.type === 'twitter'
                                    ? { ...b, showMetrics: e.target.checked }
                                    : b
                                )
                              )
                            }
                            className="accent-primary rounded"
                          />
                          <span>Tampilkan Metrik Interaksi</span>
                        </label>
                      </div>
                    </div>
                  </div>
                );
              }

              if (block.type === 'chat') {
                return (
                  <div
                    key={block.id}
                    className="relative bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(111,78,55,0.06),0_2px_6px_-1px_rgba(111,78,55,0.04)] group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="cursor-grab material-symbols-outlined text-outline-variant text-[20px] hover:text-primary">
                          drag_indicator
                        </span>
                        <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]">forum</span>
                          Simulator Pesan AU • Urutan #{orderNum}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleSwapChatSender(block.id)}
                          className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px]">swap_horiz</span>
                          Ganti Pengirim ({block.activeSenderRight})
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSendChat(block.id, block.activeSenderRight, 'voice')}
                          className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px]">mic</span>
                          Pesan Suara
                        </button>
                        <button
                          type="button"
                          onClick={() => onChangeBlocks(deleteAuBlock(blocks, block.id))}
                          title="Hapus Blok"
                          className="p-1.5 rounded-full hover:bg-error-container text-error cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Chat Frame */}
                    <div className="max-w-[560px] mx-auto rounded-3xl overflow-hidden shadow-sm bg-surface-container-low transition-colors duration-300">
                      <div className="bg-surface-container-high px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <SafeArtwork
                              src={block.partnerAvatar}
                              fallbackSrc={block.fallbackPartnerAvatar}
                              alt={block.partnerName}
                              className="w-10 h-10 rounded-full object-cover shadow-sm"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 ring-2 ring-surface" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                              {block.partnerName}
                              <span className="material-symbols-outlined text-[16px] text-secondary">
                                lock
                              </span>
                            </span>
                            <span className="font-label-sm text-label-sm text-secondary">
                              {block.partnerStatus}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[20px]">videocam</span>
                          <span className="material-symbols-outlined text-[20px]">call</span>
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </div>
                      </div>

                      <div
                        className="p-6 flex flex-col gap-4 font-body-sm text-body-sm"
                        style={{ backgroundColor: 'var(--paper-tint, #fff9fa)' }}
                      >
                        <div className="flex justify-center">
                          <span className="bg-surface-container px-3 py-1 rounded-full text-on-surface-variant font-label-sm text-label-sm shadow-xs">
                            {block.dateDivider}
                          </span>
                        </div>

                        {block.messages.map((msg) => {
                          if (msg.kind === 'voice') {
                            const isPlaying = playingVoiceId === msg.id;
                            return (
                              <div
                                key={msg.id}
                                className={`flex items-end gap-2 max-w-[85%] ${
                                  msg.isRight ? 'justify-end self-end' : ''
                                }`}
                              >
                                <div
                                  className="p-3.5 rounded-2xl rounded-br-xs shadow-xs w-72"
                                  style={{
                                    backgroundColor: msg.isRight
                                      ? 'var(--chat-sender, #ffe5ec)'
                                      : 'var(--chat-receiver, #ffffff)',
                                    color: msg.isRight
                                      ? 'var(--chat-sender-text, #6b3741)'
                                      : 'var(--chat-receiver-text, #1c1c18)',
                                  }}
                                >
                                  <div className="flex items-center gap-3">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setPlayingVoiceId((prev) =>
                                          prev === msg.id ? null : msg.id
                                        )
                                      }
                                      className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm flex-shrink-0 cursor-pointer"
                                    >
                                      <span className="material-symbols-outlined text-[20px]">
                                        {isPlaying ? 'pause' : 'play_arrow'}
                                      </span>
                                    </button>
                                    <div className="flex-1 flex items-center gap-0.5 h-6">
                                      {[3, 5, 6, 4, 5, 2, 6, 3, 2, 4].map((h, i) => (
                                        <span
                                          key={i}
                                          className={`w-1 rounded-full bg-primary ${
                                            isPlaying ? 'animate-pulse opacity-100' : 'opacity-60'
                                          }`}
                                          style={{ height: `${h * 4}px` }}
                                        />
                                      ))}
                                    </div>
                                    <span className="font-label-sm text-label-sm text-secondary font-mono">
                                      {msg.voiceDuration ?? '0:14'}
                                    </span>
                                  </div>
                                  <p className="font-label-sm text-label-sm mt-1.5 opacity-90 italic">
                                    {msg.text}
                                  </p>
                                  <div className="flex items-center justify-end gap-1 mt-1 font-label-sm text-[10px] text-secondary">
                                    <span>{msg.timestamp}</span>
                                    <span className="material-symbols-outlined text-[14px]">
                                      done_all
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={msg.id}
                              className={`flex items-end gap-2 max-w-[82%] ${
                                msg.isRight ? 'justify-end self-end' : ''
                              }`}
                            >
                              <div
                                className={`p-3.5 rounded-2xl shadow-xs ${
                                  msg.isRight ? 'rounded-br-xs' : 'rounded-bl-xs'
                                }`}
                                style={{
                                  backgroundColor: msg.isRight
                                    ? 'var(--chat-sender, #ffe5ec)'
                                    : 'var(--chat-receiver, #ffffff)',
                                  color: msg.isRight
                                    ? 'var(--chat-sender-text, #6b3741)'
                                    : 'var(--chat-receiver-text, #1c1c18)',
                                }}
                              >
                                <p>{msg.text}</p>
                                <div className="flex items-center justify-end gap-1 mt-1 font-label-sm text-[10px] text-secondary">
                                  <span>{msg.timestamp}</span>
                                  <span className="material-symbols-outlined text-[14px]">
                                    done_all
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Chat Input Composer */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSendChat(block.id, block.activeSenderRight, 'text');
                        }}
                        className="p-3 bg-surface-container-high flex items-center gap-2"
                      >
                        <button
                          type="button"
                          onClick={() => handleSwapChatSender(block.id)}
                          title="Ganti sisi pengirim"
                          className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[20px]">add</span>
                        </button>
                        <input
                          type="text"
                          value={chatInputs[block.id] ?? ''}
                          onChange={(e) =>
                            setChatInputs((prev) => ({
                              ...prev,
                              [block.id]: e.target.value,
                            }))
                          }
                          placeholder={`Ketik gelembung obrolan sebagai ${block.activeSenderRight}...`}
                          className="flex-1 bg-surface-container-lowest rounded-full px-4 py-2 font-label-sm text-label-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                        <button
                          type="submit"
                          aria-label="Kirim gelembung obrolan"
                          className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center hover:opacity-90 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">send</span>
                        </button>
                      </form>
                    </div>
                  </div>
                );
              }

              if (block.type === 'story') {
                const totalVotes = block.pollOptions.reduce((sum, opt) => sum + opt.votes, 0);
                return (
                  <div
                    key={block.id}
                    className="relative bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(111,78,55,0.06),0_2px_6px_-1px_rgba(111,78,55,0.04)] group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="cursor-grab material-symbols-outlined text-outline-variant text-[20px] hover:text-primary">
                          drag_indicator
                        </span>
                        <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]">smartphone</span>
                          Mockup Cerita Instagram (9:16) • Urutan #{orderNum}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Polling aktif ({totalVotes} suara)
                        </span>
                        <button
                          type="button"
                          onClick={() => onChangeBlocks(deleteAuBlock(blocks, block.id))}
                          title="Hapus Blok"
                          className="p-1.5 rounded-full hover:bg-error-container text-error cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-80 h-[520px] rounded-3xl overflow-hidden relative shadow-xl flex flex-col justify-between p-5 text-on-primary bg-inverse-surface">
                        <SafeArtwork
                          src={block.backgroundUrl}
                          fallbackSrc={block.fallbackBackgroundUrl}
                          alt="Latar cerita instagram"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

                        {/* Top Story Progress & Header */}
                        <div className="relative z-10 flex flex-col gap-2.5">
                          <div className="w-full flex gap-1.5">
                            <div className="h-1 flex-1 bg-white/40 rounded-full overflow-hidden">
                              <div className="h-full bg-white w-full" />
                            </div>
                            <div className="h-1 flex-1 bg-white/40 rounded-full overflow-hidden">
                              <div className="h-full bg-white w-2/3" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <SafeArtwork
                                src={block.avatarUrl}
                                fallbackSrc={block.fallbackAvatarUrl}
                                alt={block.handle}
                                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                              />
                              <span className="font-label-md text-label-md font-bold text-white drop-shadow">
                                {block.handle}
                              </span>
                              <span className="text-white/80 font-label-sm text-label-sm">
                                {block.timeAgo}
                              </span>
                            </div>
                            <span className="material-symbols-outlined text-white text-[20px]">
                              close
                            </span>
                          </div>
                        </div>

                        {/* Center Stickers */}
                        <div className="relative z-10 flex flex-col gap-3 my-auto items-center">
                          <div className="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 text-white shadow-lg">
                            <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                              music_note
                            </span>
                            <span className="font-label-sm text-label-sm font-medium tracking-wide">
                              {block.musicTrack}
                            </span>
                          </div>

                          <div className="w-64 bg-white/95 backdrop-blur-lg rounded-2xl p-3.5 text-on-surface shadow-2xl flex flex-col gap-2.5 text-center">
                            <span className="font-headline-sm text-headline-sm text-primary leading-tight font-semibold">
                              {block.pollQuestion}
                            </span>
                            <div className="flex flex-col gap-1.5">
                              {block.pollOptions.map((opt) => {
                                const pct =
                                  totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 50;
                                const isVoted = block.votedOptionId === opt.id;
                                return (
                                  <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => handleVotePoll(block.id, opt.id)}
                                    className={`w-full py-2 px-3 rounded-xl font-label-sm text-label-sm flex items-center justify-between font-bold transition-all cursor-pointer ${
                                      opt.isAccent
                                        ? 'bg-secondary-fixed/70 hover:bg-secondary-fixed text-on-secondary-fixed-variant'
                                        : 'bg-primary-fixed/60 hover:bg-primary-fixed text-on-primary-fixed'
                                    } ${isVoted ? 'ring-2 ring-secondary' : ''}`}
                                  >
                                    <span className="text-left">{opt.label}</span>
                                    <span>{pct}%</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Bottom Story Caption */}
                        <div className="relative z-10 flex flex-col gap-2">
                          <div className="bg-black/45 backdrop-blur-sm px-3.5 py-2 rounded-2xl text-white font-body-sm text-body-sm text-center">
                            {block.caption}
                          </div>
                          <div className="flex items-center justify-between px-2 pt-1 text-white/90">
                            <span className="font-label-sm text-label-sm flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">
                                visibility
                              </span>
                              {block.viewsLabel}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[20px]">favorite</span>
                              <span className="material-symbols-outlined text-[20px]">send</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // PROSE BLOCK
              return (
                <div
                  key={block.id}
                  className="relative bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(111,78,55,0.06),0_2px_6px_-1px_rgba(111,78,55,0.04)] group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="cursor-grab material-symbols-outlined text-outline-variant text-[20px] hover:text-primary">
                        drag_indicator
                      </span>
                      <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                        Blok Prosa Naratif • Urutan #{orderNum}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-full shadow-inner">
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProseId((prev) => (prev === block.id ? null : block.id))
                        }
                        className="px-2.5 py-1 rounded-full hover:bg-surface-container-high text-primary font-label-sm text-label-sm cursor-pointer"
                      >
                        {editingProseId === block.id ? 'Selesai Edit' : 'Sunting Teks'}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onChangeBlocks(
                            blocks.map((b) =>
                              b.id === block.id && b.type === 'prose'
                                ? { ...b, useDropCap: !b.useDropCap }
                                : b
                            )
                          )
                        }
                        title="Alihkan Drop Cap"
                        className={`p-1 rounded-full font-serif font-bold text-xs w-6 h-6 flex items-center justify-center cursor-pointer ${
                          block.useDropCap
                            ? 'bg-secondary-fixed text-on-secondary-fixed'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        D
                      </button>
                      <button
                        type="button"
                        onClick={() => onChangeBlocks(deleteAuBlock(blocks, block.id))}
                        title="Hapus Blok"
                        className="p-1 rounded-full hover:bg-error-container text-error cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Editorial Ruled Paper Ground */}
                  <div
                    className="max-w-[68ch] mx-auto p-6 sm:p-10 rounded-2xl shadow-sm ruled-paper"
                    style={{ backgroundColor: 'var(--paper-tint, #fdfbf7)' }}
                  >
                    {editingProseId === block.id ? (
                      <div className="flex flex-col gap-4">
                        <textarea
                          rows={6}
                          value={block.paragraphs.join('\n\n')}
                          onChange={(e) =>
                            onChangeBlocks(
                              blocks.map((b) =>
                                b.id === block.id && b.type === 'prose'
                                  ? {
                                      ...b,
                                      paragraphs: e.target.value
                                        .split(/\n{2,}/)
                                        .filter((p) => p.trim().length > 0),
                                    }
                                  : b
                              )
                            )
                          }
                          className="w-full p-4 rounded-2xl bg-surface-container-lowest/90 font-body-lg text-body-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40"
                        />
                        <input
                          type="text"
                          value={block.authorMarginNote}
                          onChange={(e) =>
                            onChangeBlocks(
                              blocks.map((b) =>
                                b.id === block.id && b.type === 'prose'
                                  ? { ...b, authorMarginNote: e.target.value }
                                  : b
                              )
                            )
                          }
                          className="w-full px-3 py-2 rounded-xl bg-secondary-fixed/40 font-body-sm text-body-sm text-on-secondary-fixed"
                        />
                      </div>
                    ) : (
                      <div className="font-body-lg text-body-lg text-on-surface leading-loose">
                        {block.paragraphs.map((para, pIdx) => {
                          if (pIdx === 0 && block.useDropCap && para.length > 1) {
                            return (
                              <p key={pIdx} className="mb-6">
                                <span className="float-left text-[4.5rem] leading-[3.8rem] font-headline-lg font-bold text-primary mr-3.5 mt-1 select-none font-serif">
                                  {para.charAt(0)}
                                </span>
                                {para.slice(1)}
                              </p>
                            );
                          }
                          return (
                            <p key={pIdx} className="mb-6">
                              {para}
                            </p>
                          );
                        })}

                        {block.quotedLine && (
                          <p
                            className="italic text-on-surface-variant border-l-2 pl-4 py-1 mb-6"
                            style={{ borderLeftColor: 'var(--accent-pill, #ffb6c1)' }}
                          >
                            {block.quotedLine}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Author's Marginalia Note */}
                    <div className="mt-8 p-4 rounded-xl bg-secondary-fixed/30 flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        sticky_note_2
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm font-bold text-secondary uppercase tracking-wider">
                          Catatan Penulis Draf Margin
                        </span>
                        <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant italic">
                          {block.authorMarginNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add New Custom AU Block Banner */}
          <button
            type="button"
            onClick={() => handleInsertBlock('prose')}
            className="w-full py-8 rounded-3xl bg-surface-container-low flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-surface-container transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container-highest group-hover:bg-secondary-fixed flex items-center justify-center text-primary transition-all">
              <span className="material-symbols-outlined text-[24px]">add</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-headline-sm text-headline-sm text-primary">
                + Tambahkan Segmen Cerita Berikutnya
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Satukan tweet, memo audio, obrolan, atau prosa sastra secara mulus
              </span>
            </div>
          </button>
        </div>

        {/* RIGHT: AU CHARACTER CAST, MOODBOARD & ASSETS (4 cols) */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
          {/* Character Dossier Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(111,78,55,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">badge</span>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  Dossier Karakter AU
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setNewCharOpen((prev) => !prev)}
                className="text-secondary font-label-sm text-label-sm hover:underline cursor-pointer"
              >
                + Tokoh Baru
              </button>
            </div>

            {newCharOpen && (
              <form
                onSubmit={handleAddCharSubmit}
                className="p-3.5 rounded-2xl bg-surface-container mb-3 flex flex-col gap-2"
              >
                <input
                  type="text"
                  required
                  value={charName}
                  onChange={(e) => setCharName(e.target.value)}
                  placeholder="Nama tokoh"
                  className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-body-sm font-body-sm focus:outline-none"
                />
                <input
                  type="text"
                  value={charRole}
                  onChange={(e) => setCharRole(e.target.value)}
                  placeholder="Peran (mis. Sahabat Barista)"
                  className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-body-sm font-body-sm focus:outline-none"
                />
                <input
                  type="text"
                  value={charBio}
                  onChange={(e) => setCharBio(e.target.value)}
                  placeholder="Deskripsi singkat tokoh"
                  className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-body-sm font-body-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm cursor-pointer"
                >
                  Simpan Tokoh
                </button>
              </form>
            )}

            <div className="flex flex-col gap-3">
              {characters.map((char) => (
                <div
                  key={char.id}
                  className="p-3.5 rounded-2xl bg-surface-container-low flex items-start gap-3 hover:bg-surface-container transition-colors"
                >
                  <SafeArtwork
                    src={char.avatarUrl}
                    fallbackSrc={char.fallbackAvatarUrl}
                    alt={char.name}
                    className="w-12 h-12 rounded-2xl object-cover shadow-sm flex-shrink-0"
                  />
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-label-md text-label-md font-bold text-on-surface">
                        {char.name}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-label-sm ${char.roleBadgeClass}`}
                      >
                        {char.roleBadge}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                      {char.bio}
                    </span>
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      {char.traits.map((trait) => (
                        <span
                          key={trait}
                          className="px-2 py-0.5 rounded-md bg-surface-container-highest text-on-surface font-label-sm text-[10px]"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AU Moodboard Visual Pinboard */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(111,78,55,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  palette
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  Papan Suasana Estetika
                </h3>
              </div>
              <span className="text-outline font-label-sm text-label-sm">
                {moodboard.length} pin
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {moodboard.map((pin) => (
                <div key={pin.id} className="relative rounded-2xl overflow-hidden group shadow-sm">
                  <SafeArtwork
                    src={pin.imageUrl}
                    fallbackSrc={pin.fallbackImageUrl}
                    alt={pin.alt}
                    className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-label-sm">
                    {pin.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tropes & Tag Taxonomy Box */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(111,78,55,0.06)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">sell</span>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  Palet Trope &amp; Tag
                </h3>
              </div>
              <span className="material-symbols-outlined text-outline text-[18px]">settings</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {tropes.map((tag, idx) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${
                    idx === 0
                      ? 'bg-secondary-fixed text-on-secondary-fixed'
                      : idx === 1
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                        : idx === 4
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-high text-on-surface'
                  }`}
                >
                  {tag}
                </span>
              ))}
              {newTropeOpen ? (
                <form onSubmit={handleAddTropeSubmit} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={newTropeText}
                    onChange={(e) => setNewTropeText(e.target.value)}
                    placeholder="#TropeBaru"
                    className="px-3 py-1 rounded-full bg-surface-container text-label-sm font-label-sm w-32 focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 rounded-full bg-primary text-on-primary text-label-sm font-label-sm cursor-pointer"
                  >
                    Simpan
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setNewTropeOpen(true)}
                  className="px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm cursor-pointer"
                >
                  + Tambah Trope
                </button>
              )}
            </div>
          </div>

          {/* Quick Sticker Insertion Deck */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(111,78,55,0.06)]">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <span className="material-symbols-outlined text-[16px] text-secondary">sticker</span>
              STIKER INSERT CEPAT
            </span>
            <div className="grid grid-cols-4 gap-2 text-center text-2xl p-2 bg-surface-container-low rounded-2xl">
              {QUICK_STICKERS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  title={s.label}
                  onClick={() => handleInsertSticker(s.emoji)}
                  className="p-2 rounded-xl hover:bg-surface-container transition-transform hover:scale-110 cursor-pointer"
                >
                  {s.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
