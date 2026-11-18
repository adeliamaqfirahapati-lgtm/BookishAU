import { useState } from 'react';
import {
  PLOT_SENSORY_IMAGES,
  SEED_PLOT_CHARACTER_AVATARS,
} from '../data/bookishSeed';
import {
  createPlotNode,
  generateAiSuggestions,
  insertAiBeatIntoNode,
} from '../utils/bookishLogic';
import type { AiSuggestion, PlotNode } from '../types/bookish';
import { SafeArtwork } from './SafeArtwork';

interface PlotTrackerViewProps {
  storyTitle: string;
  nodes: PlotNode[];
  onChangeNodes: (nodes: PlotNode[]) => void;
  aiSuggestions: AiSuggestion[];
  onChangeAiSuggestions: (suggestions: AiSuggestion[]) => void;
  onOpenStudio: () => void;
  onOpenReader: () => void;
  onNotify: (msg: string) => void;
}

type PlotTab = 'timeline' | 'matrix' | 'radar';

export function PlotTrackerView({
  storyTitle,
  nodes,
  onChangeNodes,
  aiSuggestions,
  onChangeAiSuggestions,
  onOpenStudio,
  onOpenReader,
  onNotify,
}: PlotTrackerViewProps) {
  const [activeTab, setActiveTab] = useState<PlotTab>('timeline');
  const [zoomPercent, setZoomPercent] = useState<number>(100);
  const [promptText, setPromptText] = useState<string>(
    'Aku buntu di adegan malam gala. Bagaimana reaksi Theo saat seseorang meremehkan seni kopi Minho?'
  );
  const [newNodeOpen, setNewNodeOpen] = useState(false);
  const [newNodeTitle, setNewNodeTitle] = useState('');
  const [newNodeAct, setNewNodeAct] = useState('Babak II: Titik Cerita Baru');
  const [newNodeDesc, setNewNodeDesc] = useState('');
  const [branchNoteOpenId, setBranchNoteOpenId] = useState<string | null>(null);

  const handleSparkIdeas = (kind?: 'next' | 'twist' | 'pacing' | 'fluff') => {
    const updated = generateAiSuggestions(promptText, kind);
    onChangeAiSuggestions(updated);
    onNotify('3 variasi alur baru siap dimasukkan ke Beat 03.');
  };

  const handleInsertIntoBeat03 = (text: string) => {
    const activeNode = nodes.find((n) => n.id === 'node-3') ?? nodes[0];
    if (!activeNode) return;
    onChangeNodes(insertAiBeatIntoNode(nodes, activeNode.id, text));
    onNotify(`Saran AI disisipkan ke Beat ${activeNode.numberLabel}.`);
  };

  const handleAddNodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeTitle.trim()) return;
    onChangeNodes(createPlotNode(nodes, newNodeTitle, newNodeAct, newNodeDesc));
    setNewNodeTitle('');
    setNewNodeDesc('');
    setNewNodeOpen(false);
    onNotify('Titik cerita baru ditambahkan ke kanvas alur.');
  };

  return (
    <div className="px-4 sm:px-8 py-8 flex flex-col gap-8 max-w-[1720px] mx-auto w-full">
      {/* Top Narrative Banner / Context Header */}
      <div className="relative overflow-hidden rounded-3xl bg-surface-container-low p-6 sm:p-8 shadow-sm">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary-container/30 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-64 h-64 rounded-full bg-tertiary-fixed/30 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex flex-col gap-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Babak II: Menuju Puncak Aksi (65% terencana)
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[15px] text-tertiary">
                  fork_right
                </span>
                3 Akhir Kanon Direncanakan
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[15px] text-tertiary">
                  schedule
                </span>
                Estimasi 42.000 Kata
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary tracking-tight">
              {storyTitle}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant italic">
              “Ketika seorang arsitek muda berbakat yang kelelahan menukar cold brew dengan barista
              perajin yang buku sketsanya menyimpan cetak biru kota rahasia.”
            </p>
          </div>

          {/* View Switcher & Action Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="p-1.5 rounded-2xl sm:rounded-full bg-surface-container flex items-center shadow-inner flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('timeline')}
                className={`px-4 sm:px-5 py-2 rounded-full font-label-md text-label-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'timeline'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">account_tree</span>
                <span>Garis Waktu Alur</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('matrix')}
                className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'matrix'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">hub</span>
                <span>Matriks Hubungan</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('radar')}
                className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'radar'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">radar</span>
                <span>Radar Trope</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setNewNodeOpen(true)}
              className="h-11 px-5 rounded-full bg-secondary text-on-secondary hover:bg-on-secondary-container transition-all shadow-sm font-label-md text-label-md flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>+ Titik Cerita Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout: 8 cols Storyline Canvas + 4 cols Interactive Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* LEFT / MAIN (Col 8) */}
        <section className="xl:col-span-8 flex flex-col gap-6">
          {activeTab === 'timeline' && (
            <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-7 shadow-sm flex flex-col gap-6 relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[22px]">alt_route</span>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-headline-sm text-headline-sm text-primary">
                      Kanvas Alur Cerita Interaktif
                    </h2>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Seret, percabangkan, atau tautkan titik penentu tempo narasi
                    </span>
                  </div>
                </div>

                {/* Canvas Controls */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-full bg-surface-container-low px-2 py-1 gap-1">
                    <button
                      type="button"
                      onClick={() => setZoomPercent((z) => Math.min(115, z + 5))}
                      title="Perbesar"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">zoom_in</span>
                    </button>
                    <span className="font-label-sm text-label-sm text-on-surface-variant px-1">
                      {zoomPercent}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setZoomPercent((z) => Math.max(85, z - 5))}
                      title="Perkecil"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">zoom_out</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setZoomPercent(100)}
                    title="Sesuaikan dengan layar"
                    className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">fit_screen</span>
                  </button>
                </div>
              </div>

              {/* Flowchart Visual Stage */}
              <div
                className="relative flex flex-col gap-7 py-2 transition-transform origin-top"
                style={{ fontSize: `${zoomPercent}%` }}
              >
                <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-surface-container-highest pointer-events-none hidden md:block" />

                {nodes.map((node) => {
                  const isActive = node.status === 'Fokus Menulis Aktif';
                  const isCompleted = node.status === 'Selesai';
                  const isBranch = node.status === 'Pilihan Bercabang';
                  const isEnding = node.status === 'Akhir Bahagia Kanon';

                  return (
                    <div
                      key={node.id}
                      className="relative flex flex-col md:flex-row items-start gap-6 group"
                    >
                      {/* Node Bead Anchor */}
                      <div className="z-10 flex-shrink-0 w-16 flex flex-col items-center">
                        {isActive ? (
                          <div className="relative w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-md">
                            <span className="material-symbols-outlined text-[22px]">edit</span>
                            <div className="absolute -inset-1.5 rounded-full bg-secondary-container/60 -z-10 animate-ping" />
                          </div>
                        ) : isBranch ? (
                          <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">call_split</span>
                          </div>
                        ) : isEnding ? (
                          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant shadow-sm">
                            <span className="material-symbols-outlined text-[20px] text-secondary">
                              favorite
                            </span>
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shadow-sm group-hover:scale-105 transition-transform">
                            <span
                              className={`material-symbols-outlined text-[20px] ${
                                isCompleted ? 'text-secondary' : 'text-on-surface-variant'
                              }`}
                            >
                              {isCompleted ? 'check' : 'pending'}
                            </span>
                          </div>
                        )}
                        <span
                          className={`font-label-sm text-label-sm mt-2 font-mono ${
                            isActive ? 'text-secondary font-bold' : 'text-on-surface-variant'
                          }`}
                        >
                          {node.numberLabel}
                        </span>
                      </div>

                      {/* Node Card */}
                      {isActive ? (
                        <div className="flex-1 w-full rounded-3xl bg-surface-bright p-6 shadow-md ring-2 ring-secondary/30 relative">
                          <div className="sm:absolute sm:top-4 sm:right-4 mb-2 sm:mb-0 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                            {node.status}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="px-3 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
                              {node.actBadge}
                            </span>
                            <span className="font-label-sm text-label-sm text-secondary font-semibold">
                              {node.chapterRange}
                            </span>
                          </div>
                          <h3 className="font-headline-md text-headline-md text-primary mb-2">
                            {node.title}
                          </h3>
                          <p className="font-body-md text-body-md text-on-surface mb-5">
                            {node.description}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                            <div className="p-3 rounded-2xl bg-surface-container-low flex flex-col">
                              <span className="font-label-sm text-label-sm text-on-surface-variant">
                                Fokus Sudut Pandang
                              </span>
                              <span className="font-label-md text-label-md text-primary mt-1">
                                {node.povLabel}
                              </span>
                            </div>
                            <div className="p-3 rounded-2xl bg-surface-container-low flex flex-col">
                              <span className="font-label-sm text-label-sm text-on-surface-variant">
                                Target Jumlah Kata
                              </span>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-label-md text-label-md text-primary">
                                  {node.wordProgress}
                                </span>
                                <span className="text-secondary font-label-sm text-label-sm">
                                  {node.wordPercent}
                                </span>
                              </div>
                            </div>
                            <div className="p-3 rounded-2xl bg-surface-container-low flex flex-col">
                              <span className="font-label-sm text-label-sm text-on-surface-variant">
                                Format Narasi
                              </span>
                              <span className="font-label-md text-label-md text-primary mt-1">
                                {node.formatLabel}
                              </span>
                            </div>
                          </div>

                          {/* Inserted AI Beats Display */}
                          {node.insertedBeats && node.insertedBeats.length > 0 && (
                            <div className="mb-4 flex flex-col gap-2">
                              {node.insertedBeats.map((beat, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 rounded-2xl bg-secondary-fixed/40 text-on-secondary-fixed font-body-sm text-body-sm flex items-start gap-2"
                                >
                                  <span className="material-symbols-outlined text-[16px] text-secondary shrink-0 mt-0.5">
                                    auto_awesome
                                  </span>
                                  <span>
                                    <strong>Beat AI Tersemat:</strong> {beat}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 bg-surface-container-low/70 rounded-2xl px-4 py-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <button
                                type="button"
                                onClick={onOpenStudio}
                                className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  edit_note
                                </span>
                                <span>Buka di Studio</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSparkIdeas('next')}
                                className="px-3.5 py-2 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px] text-secondary">
                                  psychology
                                </span>
                                <span>Jalankan Asisten Beat AI</span>
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => setNewNodeOpen(true)}
                              className="px-3 py-1.5 rounded-full text-secondary hover:bg-secondary-fixed/50 font-label-sm text-label-sm flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                add_circle
                              </span>
                              <span>+ Tambah Cabang Adegan</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 w-full rounded-2xl bg-surface-container-low p-5 hover:bg-surface-container transition-all shadow-sm">
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm ${
                                  isBranch
                                    ? 'bg-secondary-fixed text-on-secondary-fixed'
                                    : 'bg-surface-container-highest text-on-surface-variant'
                                }`}
                              >
                                {node.actBadge}
                              </span>
                              {!isEnding && (
                                <span className="font-label-sm text-label-sm text-secondary">
                                  {node.chapterRange}
                                </span>
                              )}
                            </div>
                            <span
                              className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm ${
                                isCompleted || isEnding
                                  ? 'bg-secondary-fixed text-on-secondary-fixed'
                                  : isBranch
                                    ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                                    : 'bg-surface-container-highest text-on-surface-variant'
                              }`}
                            >
                              {node.status}
                            </span>
                          </div>

                          <h3 className="font-headline-sm text-headline-sm text-primary mb-1">
                            {node.title}
                          </h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                            {node.description}
                          </p>

                          {/* Branch Options for Node 05 */}
                          {node.branches && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {node.branches.map((branch) => {
                                const isChosen = node.selectedBranchId === branch.id;
                                return (
                                  <div
                                    key={branch.id}
                                    onClick={() =>
                                      onChangeNodes(
                                        nodes.map((n) =>
                                          n.id === node.id
                                            ? { ...n, selectedBranchId: branch.id }
                                            : n
                                        )
                                      )
                                    }
                                    className={`p-4 rounded-2xl bg-surface-bright flex flex-col gap-2 shadow-sm hover:scale-[1.01] transition-all cursor-pointer ${
                                      isChosen ? 'ring-2 ring-secondary' : ''
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span
                                        className={`font-label-sm text-label-sm font-bold uppercase tracking-wider ${
                                          branch.routeTone === 'secondary'
                                            ? 'text-secondary'
                                            : 'text-tertiary'
                                        }`}
                                      >
                                        {branch.routeLabel}
                                      </span>
                                      <span
                                        className={`material-symbols-outlined text-[16px] ${
                                          branch.routeTone === 'secondary'
                                            ? 'text-secondary'
                                            : 'text-tertiary'
                                        }`}
                                      >
                                        {branch.icon}
                                      </span>
                                    </div>
                                    <h4 className="font-headline-sm text-body-lg text-primary">
                                      {branch.title}
                                    </h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                      {branch.description}
                                    </p>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setBranchNoteOpenId((prev) =>
                                          prev === branch.id ? null : branch.id
                                        );
                                      }}
                                      className="mt-2 text-left font-label-sm text-label-sm text-primary underline underline-offset-4 cursor-pointer"
                                    >
                                      {branchNoteOpenId === branch.id
                                        ? 'Tutup Catatan Rute'
                                        : `Jelajahi Catatan ${branch.routeLabel.split(' ')[0]} ${branch.routeLabel.split(' ')[1]}`}
                                    </button>
                                    {branchNoteOpenId === branch.id && (
                                      <p className="p-2.5 rounded-xl bg-surface-container text-body-sm font-body-sm text-on-surface-variant mt-1">
                                        {branch.noteDetail}
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Standard Footer Row */}
                          {!node.branches && !isEnding && (
                            <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest/60 rounded-xl px-4 py-2.5">
                              <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-label-sm text-label-sm">
                                {node.povLabel && (
                                  <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[16px] text-secondary">
                                      face
                                    </span>
                                    {node.povLabel}
                                  </span>
                                )}
                                {node.wordProgress && (
                                  <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[16px] text-tertiary">
                                      notes
                                    </span>
                                    {node.wordProgress}
                                  </span>
                                )}
                                {node.formatLabel && (
                                  <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[16px] text-primary">
                                      chat_bubble
                                    </span>
                                    {node.formatLabel}
                                  </span>
                                )}
                                {node.moodLabel && (
                                  <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[16px] text-secondary">
                                      bedtime
                                    </span>
                                    {node.moodLabel}
                                  </span>
                                )}
                                {node.targetWords && (
                                  <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[16px] text-tertiary">
                                      target
                                    </span>
                                    {node.targetWords}
                                  </span>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={isCompleted ? onOpenReader : onOpenStudio}
                                className="text-secondary hover:text-primary font-label-sm text-label-sm flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  {isCompleted ? 'visibility' : 'edit'}
                                </span>
                                <span>{isCompleted ? 'Baca Draf' : 'Garis Besar Beat'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Add Node Dock */}
              <div className="flex items-center justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setNewNodeOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>+ Tambah Beat atau Cabang Alternatif</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'matrix' && (
            <div className="rounded-3xl bg-surface-container-lowest p-7 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-primary">
                    Matriks Hubungan Tokoh AU
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Pemetaan relasi emosional dan dinamika antar karakter di setiap babak
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    pair: 'Minho ↔ Theo',
                    dynamic: 'Barista & Mahasiswa Arsitektur',
                    trust: '82%',
                    tension: '94%',
                    note: 'Berawal dari pertukaran gelas macchiato, berlanjut ke kencan palsu gala.',
                  },
                  {
                    pair: 'Arthur ↔ Dr. Julian Chen',
                    dynamic: 'Rival Akademik & Pelanggan Pagi',
                    trust: '68%',
                    tension: '84%',
                    note: 'Saling memantau jadwal seminar sambil mengirim pesan suara 14 detik.',
                  },
                  {
                    pair: 'Minho ↔ Sahabat Kafe',
                    dynamic: 'Rekan Shift & Saksi Utas Viral',
                    trust: '96%',
                    tension: '12%',
                    note: 'Selalu menyiapkan kamera ponsel setiap kali jas hujan hijau melewati pintu.',
                  },
                  {
                    pair: 'Theo ↔ Ketua Senat',
                    dynamic: 'Tekanan Akademik & Ekspektasi Keluarga',
                    trust: '35%',
                    tension: '79%',
                    note: 'Pemicu utama kesepakatan kencan palsu pada Babak II.',
                  },
                ].map((rel) => (
                  <div
                    key={rel.pair}
                    className="p-5 rounded-2xl bg-surface-container-low flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-headline-sm text-primary">
                        {rel.pair}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                        Ketegangan {rel.tension}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold">
                      {rel.dynamic}
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{rel.note}</p>
                    <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full"
                        style={{ width: rel.trust }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'radar' && (
            <div className="rounded-3xl bg-surface-container-lowest p-7 shadow-sm flex flex-col gap-6">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-primary">
                  Radar Trope &amp; Keseimbangan Naskah
                </h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Distribusi elemen romansa, komedi, media sosial, dan ketegangan dramatis
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: '#KedaiKopiAU & Atmosfer Hujan', score: 95, color: 'bg-primary' },
                  { label: '#KencanPalsu & Situasi Gala', score: 86, color: 'bg-secondary' },
                  { label: '#ObrolanTwitter & WhatsApp', score: 78, color: 'bg-tertiary' },
                  { label: '#SlowBurn & Pengakuan Akhir', score: 62, color: 'bg-secondary-container' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-5 rounded-2xl bg-surface-container-low flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between font-label-md text-label-md">
                      <span className="text-primary">{item.label}</span>
                      <span className="text-secondary font-bold">{item.score}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-surface-container-highest overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* RIGHT: AI Story Assistant & Trope Character Widget (Col 4) */}
        <aside className="xl:col-span-4 flex flex-col gap-6">
          {/* AI Writer's Block Assistant Card */}
          <div className="rounded-3xl bg-surface-container-lowest p-6 shadow-md flex flex-col gap-5 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-secondary-container/20 blur-xl pointer-events-none" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-tertiary-container text-on-tertiary flex items-center justify-center shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-headline-sm text-headline-sm text-primary leading-snug">
                    Inspirasi Penulis AI
                  </h3>
                  <span className="font-label-sm text-label-sm text-secondary">
                    Lanjutkan Cerita / Buat Alur
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm shrink-0 whitespace-nowrap">
                GPT-AU 4.5
              </span>
            </div>

            {/* Active Prompt Input Shell */}
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-between">
                <span>Fokus Blok Adegan</span>
                <button
                  type="button"
                  onClick={() => setPromptText('')}
                  className="text-secondary cursor-pointer hover:underline"
                >
                  Bersihkan
                </button>
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="w-full p-3.5 pb-12 rounded-2xl bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm resize-none focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => handleSparkIdeas()}
                  className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-primary text-on-primary hover:bg-primary-container transition-all font-label-sm text-label-sm flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">send</span>
                  <span>Nyalakan Ide</span>
                </button>
              </div>
            </div>

            {/* AI Generated Alternatives Deck */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                  Trajektori Disarankan
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {aiSuggestions.length} variasi siap
                </span>
              </div>

              {aiSuggestions.map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col gap-2 shadow-sm group"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm ${
                        s.toneStyle === 'secondary'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : s.toneStyle === 'tertiary'
                            ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                            : 'bg-surface-container-highest text-on-surface-variant'
                      }`}
                    >
                      {s.toneBadge}
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {s.icon}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface">{s.text}</p>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleInsertIntoBeat03(s.text)}
                      className="px-3 py-1 rounded-full bg-surface-bright hover:bg-secondary-container hover:text-on-secondary-container text-primary font-label-sm text-label-sm transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">content_paste</span>
                      <span>+ Masukkan ke Beat 03</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompt Sparkers */}
            <div className="flex flex-col gap-2 pt-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Generator Narasi Cepat
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleSparkIdeas('next')}
                  className="px-3 py-1 rounded-full bg-surface-container text-on-surface hover:bg-secondary-fixed transition-all font-label-sm text-label-sm flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  <span>Adegan AU Berikutnya</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSparkIdeas('twist')}
                  className="px-3 py-1 rounded-full bg-surface-container text-on-surface hover:bg-secondary-fixed transition-all font-label-sm text-label-sm flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">shuffle</span>
                  <span>Pelintiran Konflik</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSparkIdeas('pacing')}
                  className="px-3 py-1 rounded-full bg-surface-container text-on-surface hover:bg-secondary-fixed transition-all font-label-sm text-label-sm flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">speed</span>
                  <span>Perbaiki Pacing Lambat</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSparkIdeas('fluff')}
                  className="px-3 py-1 rounded-full bg-surface-container text-on-surface hover:bg-secondary-fixed transition-all font-label-sm text-label-sm flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">favorite</span>
                  <span>Tambahkan Dialog Manis (Fluff)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Trope Health & Character Arc Tracker Widget */}
          <div className="rounded-3xl bg-surface-container-lowest p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  analytics
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  Kesehatan Trope &amp; Busur Cerita
                </h3>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Tempo Langsung
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="flex items-center gap-1 text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      bakery_dining
                    </span>
                    <span>Kehangatan Manis &amp; Domestik</span>
                  </span>
                  <span className="font-bold text-secondary">88% (Optimal)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full rounded-full bg-secondary" style={{ width: '88%' }} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="flex items-center gap-1 text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      heart_broken
                    </span>
                    <span>Ketegangan Mendamba yang Tak Terucap</span>
                  </span>
                  <span className="font-bold text-primary">94% (Mendekati Puncak)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary-container"
                    style={{ width: '94%' }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="flex items-center gap-1 text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">
                      local_fire_department
                    </span>
                    <span>Progres Romansa Lambat (Slow Burn)</span>
                  </span>
                  <span className="font-bold text-tertiary">62% (Sesuai Babak II)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full rounded-full bg-tertiary" style={{ width: '62%' }} />
                </div>
              </div>
            </div>

            {/* Character Dynamics Diagram */}
            <div className="p-5 rounded-2xl bg-surface-container-low flex flex-col gap-4">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Hubungan Dinamis Aktif
              </span>
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col items-center text-center">
                  <SafeArtwork
                    src={SEED_PLOT_CHARACTER_AVATARS.minho}
                    fallbackSrc="/src/assets/images/portrait_clara_1795021212579.jpg"
                    alt="Minho"
                    className="w-14 h-14 rounded-full object-cover shadow-sm mb-1.5 ring-2 ring-surface"
                  />
                  <span className="font-label-md text-label-md text-primary font-bold">Minho</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Penyair Barista
                  </span>
                </div>

                <div className="flex-1 flex flex-col items-center px-2">
                  <div className="w-full flex items-center justify-center relative">
                    <div className="w-full h-0.5 bg-secondary-fixed-dim" />
                    <span className="absolute material-symbols-outlined text-secondary text-[18px] bg-surface-container-low px-1">
                      sync_alt
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 mt-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm text-center">
                      Saling Mendamba
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm text-center">
                      Akademisi vs Anak Seni
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center">
                  <SafeArtwork
                    src={SEED_PLOT_CHARACTER_AVATARS.theo}
                    fallbackSrc="/src/assets/images/portrait_julian_1795021213910.jpg"
                    alt="Theo"
                    className="w-14 h-14 rounded-full object-cover shadow-sm mb-1.5 ring-2 ring-surface"
                  />
                  <span className="font-label-md text-label-md text-primary font-bold">Theo</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Mahasiswa Pekerja Keras
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container text-on-surface-variant font-body-sm text-body-sm italic text-center">
                “Tak satu pun mau mengakui bahwa mereka sengaja memesan minuman yang butuh waktu
                lama untuk disiapkan oleh tangan masing-masing.”
              </div>
            </div>

            {/* Bottom Visual Moodboard Strip */}
            <div className="flex flex-col gap-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Palet Suasana Sensorik
              </span>
              <div className="grid grid-cols-3 gap-2">
                {PLOT_SENSORY_IMAGES.map((img, i) => (
                  <SafeArtwork
                    key={i}
                    src={img.url}
                    fallbackSrc={img.fallback}
                    alt={img.alt}
                    className="w-full h-20 rounded-xl object-cover shadow-xs"
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Modal: + Titik Cerita Baru */}
      {newNodeOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddNodeSubmit}
            className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-primary">
                + Titik Cerita Baru
              </h3>
              <button
                type="button"
                onClick={() => setNewNodeOpen(false)}
                className="text-outline hover:text-primary"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant">
                Judul Adegan / Beat
              </label>
              <input
                type="text"
                required
                value={newNodeTitle}
                onChange={(e) => setNewNodeTitle(e.target.value)}
                placeholder="Mis. Pengakuan di Bawah Payung Berdua"
                className="px-4 py-2.5 rounded-2xl bg-surface-container text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant">
                Label Babak
              </label>
              <input
                type="text"
                value={newNodeAct}
                onChange={(e) => setNewNodeAct(e.target.value)}
                className="px-4 py-2.5 rounded-2xl bg-surface-container text-body-sm font-body-sm focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant">
                Ringkasan Adegan
              </label>
              <textarea
                rows={3}
                value={newNodeDesc}
                onChange={(e) => setNewNodeDesc(e.target.value)}
                placeholder="Jelaskan peristiwa utama pada titik cerita ini..."
                className="px-4 py-2.5 rounded-2xl bg-surface-container text-body-sm font-body-sm focus:outline-none resize-none"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setNewNodeOpen(false)}
                className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm cursor-pointer"
              >
                Tambahkan ke Alur
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
