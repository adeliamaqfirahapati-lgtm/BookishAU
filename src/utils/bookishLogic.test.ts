import test from 'node:test';
import assert from 'node:assert/strict';
import {
  appendChatMessage,
  clampReaderScale,
  countWordsInBlocks,
  createAuBlock,
  createPlotNode,
  createPostcardComment,
  deleteAuBlock,
  duplicateAuBlock,
  filterBooks,
  generateAiSuggestions,
  insertAiBeatIntoNode,
  voteStoryPoll,
} from './bookishLogic.ts';
import type { BookItem, PlotNode, StoryPollOption } from '../types/bookish.ts';

const SAMPLE_BOOKS: BookItem[] = [
  {
    id: 'latte',
    title: 'Seni Latte & Tenggat Larut Malam',
    shortTitle: 'AU Seni Latte',
    shelfTier: 'upper',
    category: 'coffee',
    categoryBadge: 'AU Kedai Kopi',
    statusBadge: 'Diperbarui Kemarin',
    authorLine: 'Elena Vance • 14 Bab',
    sub: 'Dunia Alternatif: Kedai Kopi Nyaman London • 48.200 Pembaca',
    detailBadge: 'Fokus Aktif • Mode Draf',
    readersCount: '48,2 rb',
    chapterLabel: 'Draf Babak II',
    coverUrl: '',
    fallbackCoverUrl: '',
    coverAlt: '',
    gradientClass: '',
    textColorClass: '',
    subTextColorClass: '',
    ribbonColorClass: '',
    badgeClass: '',
    footerClass: '',
    tropes: ['#KedaiKopiAU', '#KencanPalsu'],
    synopsis: 'Barista dan arsitek.',
    paletteColors: [],
    chapters: [],
    progressPercent: 78,
  },
  {
    id: 'oxford',
    title: 'Tinta Merah Tua & Biru Oxford',
    shortTitle: 'AU Biru Oxford',
    shelfTier: 'upper',
    category: 'academia',
    categoryBadge: 'Rival Kampus',
    statusBadge: 'Sedang Berjalan',
    authorLine: 'Elena Vance • 8 Bab',
    sub: 'Dunia Alternatif: Rival Dark Academia • 29.500 Pembaca',
    detailBadge: 'Sedang Berjalan • Bab 9',
    readersCount: '29,5 rb',
    chapterLabel: 'Bab 9 Diantrekan',
    coverUrl: '',
    fallbackCoverUrl: '',
    coverAlt: '',
    gradientClass: '',
    textColorClass: '',
    subTextColorClass: '',
    ribbonColorClass: '',
    badgeClass: '',
    footerClass: '',
    tropes: ['#RivalKampus', '#MusuhJadiKekasih'],
    synopsis: 'Persaingan beasiswa Bodleian.',
    paletteColors: [],
    chapters: [],
    progressPercent: 52,
  },
];

test('filterBooks filters accurately by shelf category and search query', () => {
  assert.equal(filterBooks(SAMPLE_BOOKS, 'all', '').length, 2);
  assert.equal(filterBooks(SAMPLE_BOOKS, 'coffee', '').length, 1);
  assert.equal(filterBooks(SAMPLE_BOOKS, 'all', 'bodleian')[0]?.id, 'oxford');
  assert.equal(filterBooks(SAMPLE_BOOKS, 'floral', '').length, 0);
});

test('createAuBlock, duplicateAuBlock, deleteAuBlock and appendChatMessage work cleanly', () => {
  const b1 = createAuBlock('chat', 1, 'Seni Latte');
  const b2 = createAuBlock('prose', 2, 'Seni Latte');
  const blocks = [b1, b2];

  const dup = duplicateAuBlock(blocks, b1.id);
  assert.equal(dup.length, 3);
  assert.equal(dup[1].order, 2);
  assert.equal(dup[2].order, 3);

  const chatted = appendChatMessage(dup, b1.id, 'Minho', true, 'Jangan lupa payungnya!');
  const targetChat = chatted[0];
  assert.equal(targetChat.type, 'chat');
  if (targetChat.type === 'chat') {
    assert.equal(targetChat.messages.at(-1)?.text, 'Jangan lupa payungnya!');
  }

  const removed = deleteAuBlock(chatted, b2.id);
  assert.equal(removed.length, 2);
  assert.ok(countWordsInBlocks(removed) >= 2400);
});

test('plot node creation, AI suggestions, and beat insertion behave deterministically', () => {
  const initialNodes: PlotNode[] = [
    {
      id: 'node-3',
      numberLabel: '03 *',
      actBadge: 'Babak II',
      chapterRange: 'Bab 7–10',
      status: 'Fokus Menulis Aktif',
      title: 'Kencan Palsu di Gala Fakultas',
      description: 'Adegan gala.',
    },
  ];

  const added = createPlotNode(initialNodes, 'Kejutan Tengah Malam', 'Babak III', 'Hujan deras di balkon.');
  assert.equal(added.length, 2);
  assert.equal(added[1].numberLabel, '02');

  const suggestions = generateAiSuggestions('gala fakultas', 'twist');
  assert.equal(suggestions.length, 3);

  const updated = insertAiBeatIntoNode(added, 'node-3', suggestions[0].text);
  assert.equal(updated[0].insertedBeats?.length, 1);
});

test('poll voting, reader font scale clamping, and postcard comments work', () => {
  const poll: StoryPollOption[] = [
    { id: 'a', label: 'Ya', votes: 78 },
    { id: 'b', label: 'Tidak', votes: 22 },
  ];
  const voted = voteStoryPoll(poll, 'a');
  assert.equal(voted[0].votes, 79);

  assert.equal(clampReaderScale(100, 10), 110);
  assert.equal(clampReaderScale(130, 10), 130);
  assert.equal(clampReaderScale(80, -10), 80);

  assert.equal(createPostcardComment('Rina', '   '), null);
  const card = createPostcardComment('Rina', 'Bab ini bikin senyum-senyum sendiri!');
  assert.equal(card?.author, 'Rina');
});
