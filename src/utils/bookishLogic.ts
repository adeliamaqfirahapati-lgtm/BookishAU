import type {
  AiSuggestion,
  AuBlock,
  BookItem,
  PlotNode,
  PostcardComment,
  StoryPollOption,
} from '../types/bookish.ts';

export function filterBooks(
  books: BookItem[],
  shelfCategory: string,
  searchQuery: string
): BookItem[] {
  const q = searchQuery.trim().toLowerCase();
  return books.filter((book) => {
    const matchesShelf =
      shelfCategory === 'all' || book.category.toLowerCase() === shelfCategory.toLowerCase();
    if (!matchesShelf) return false;
    if (!q) return true;
    const haystack = [
      book.title,
      book.sub,
      book.categoryBadge,
      book.synopsis,
      ...book.tropes,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function countWordsInBlocks(blocks: AuBlock[]): number {
  let words = 0;
  for (const block of blocks) {
    if (block.type === 'twitter') {
      words += block.content.trim().split(/\s+/).filter(Boolean).length;
      for (const note of block.threadNotes) {
        words += note.trim().split(/\s+/).filter(Boolean).length;
      }
    } else if (block.type === 'chat') {
      for (const msg of block.messages) {
        words += msg.text.trim().split(/\s+/).filter(Boolean).length;
      }
    } else if (block.type === 'story') {
      words += block.pollQuestion.trim().split(/\s+/).filter(Boolean).length;
      words += block.caption.trim().split(/\s+/).filter(Boolean).length;
    } else if (block.type === 'prose') {
      for (const p of block.paragraphs) {
        words += p.trim().split(/\s+/).filter(Boolean).length;
      }
      words += block.quotedLine.trim().split(/\s+/).filter(Boolean).length;
    }
  }
  // Baseline editorial manuscript offset plus dynamic block word count
  return Math.max(words, 2400 + words);
}

export function createAuBlock(
  type: AuBlock['type'],
  order: number,
  storyTitle = 'Seni Latte & Tenggat Larut Malam'
): AuBlock {
  const id = `block-${type}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  if (type === 'twitter') {
    return {
      id,
      type: 'twitter',
      order,
      authorName: 'Minho ☕',
      handle: '@min_latte',
      bioLine: `Utas baru untuk ${storyTitle}`,
      verified: true,
      avatarUrl: '/src/assets/images/portrait_clara_1795021212579.jpg',
      fallbackAvatarUrl: '/src/assets/images/portrait_clara_1795021212579.jpg',
      content:
        'catatan shift malam: pelanggan jas hujan baru saja menukar sketsa arsitekturnya dengan kue stroberi hangat di meja kasir.',
      timestamp: '23:51',
      deviceLabel: 'Twitter untuk iPhone',
      replies: 42,
      retweets: '218',
      likes: 1240,
      bookmarks: '190',
      threadNotes: [],
      showThreadCount: true,
      showMetrics: true,
    };
  }
  if (type === 'chat') {
    return {
      id,
      type: 'chat',
      order,
      partnerName: 'Theo (Jas Hujan Judes)',
      partnerAvatar: '/src/assets/images/portrait_julian_1795021213910.jpg',
      fallbackPartnerAvatar: '/src/assets/images/portrait_julian_1795021213910.jpg',
      partnerStatus: 'Online • Baru saja membaca',
      dateDivider: 'Malam Ini, 23:54',
      activeSenderRight: 'Minho',
      messages: [
        {
          id: `msg-${Date.now()}-1`,
          senderName: 'Theo',
          isRight: false,
          text: 'Apakah kopi susumu selalu disertai catatan kecil di bawah tatakan?',
          timestamp: '23:54',
          kind: 'text',
        },
        {
          id: `msg-${Date.now()}-2`,
          senderName: 'Minho',
          isRight: true,
          text: 'Hanya untuk arsitek yang lupa mengambil payungnya dua kali berturut-turut.',
          timestamp: '23:55',
          kind: 'text',
        },
      ],
    };
  }
  if (type === 'story') {
    return {
      id,
      type: 'story',
      order,
      handle: 'min_latte',
      timeAgo: 'Baru saja',
      avatarUrl: '/src/assets/images/portrait_clara_1795021212579.jpg',
      fallbackAvatarUrl: '/src/assets/images/portrait_clara_1795021212579.jpg',
      backgroundUrl: '/src/assets/images/cover_coffee_rain_1795021211974.jpg',
      fallbackBackgroundUrl: '/src/assets/images/cover_coffee_rain_1795021211974.jpg',
      musicTrack: 'Laufey — Promise ♫',
      pollQuestion: 'Haruskah Minho mengembalikan payung Theo malam ini?',
      pollOptions: [
        { id: 'opt-a', label: 'Antarkan langsung ke studionya ☔', votes: 72, isAccent: true },
        { id: 'opt-b', label: 'Tunggu sampai pagi esok ☕', votes: 28 },
      ],
      caption: 'hujan di jendela kaca dan dua cangkir porselen yang tersisa.',
      viewsLabel: '412 tayangan',
    };
  }
  return {
    id,
    type: 'prose',
    order,
    paragraphs: [
      'Di balik konter kayu mahogani yang masih hangat oleh uap mesin espreso, cahaya lampu gantung bergetar lembut memantulkan garis hujan di kaca etalase.',
    ],
    quotedLine: '“Kalau kau butuh tempat berteduh sebentar lagi, pintunya belum kukunci.”',
    useDropCap: true,
    authorMarginNote: 'Tambahkan detail aroma kayu cedar dan bunyi lonceng kuningan.',
  };
}

export function duplicateAuBlock(blocks: AuBlock[], blockId: string): AuBlock[] {
  const index = blocks.findIndex((b) => b.id === blockId);
  if (index === -1) return blocks;
  const source = blocks[index];
  const copy = structuredClone(source);
  copy.id = `${source.id}-copy-${Date.now()}`;
  const updated = [...blocks.slice(0, index + 1), copy, ...blocks.slice(index + 1)];
  return updated.map((b, idx) => ({ ...b, order: idx + 1 }));
}

export function deleteAuBlock(blocks: AuBlock[], blockId: string): AuBlock[] {
  if (blocks.length <= 1) return blocks;
  return blocks
    .filter((b) => b.id !== blockId)
    .map((b, idx) => ({ ...b, order: idx + 1 }));
}

export function appendChatMessage(
  blocks: AuBlock[],
  blockId: string,
  senderName: string,
  isRight: boolean,
  text: string,
  kind: 'text' | 'voice' = 'text'
): AuBlock[] {
  const clean = text.trim();
  if (!clean) return blocks;
  return blocks.map((b) => {
    if (b.id !== blockId || b.type !== 'chat') return b;
    return {
      ...b,
      messages: [
        ...b.messages,
        {
          id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          senderName,
          isRight,
          text: clean,
          timestamp: '23:58',
          kind,
          voiceDuration: kind === 'voice' ? '0:09' : undefined,
        },
      ],
    };
  });
}

export function voteStoryPoll(
  options: StoryPollOption[],
  optionId: string
): StoryPollOption[] {
  const bumped = options.map((opt) =>
    opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
  );
  const total = bumped.reduce((sum, opt) => sum + opt.votes, 0);
  if (total <= 0) return bumped;
  return bumped;
}

export function createPlotNode(
  nodes: PlotNode[],
  title: string,
  actBadge: string,
  description: string
): PlotNode[] {
  const cleanTitle = title.trim();
  if (!cleanTitle) return nodes;
  const nextNum = String(nodes.length + 1).padStart(2, '0');
  const newNode: PlotNode = {
    id: `node-${Date.now()}`,
    numberLabel: nextNum,
    actBadge: actBadge.trim() || 'Babak Baru: Adegan Tambahan',
    chapterRange: `Bab ${nodes.length * 2 + 1}–${nodes.length * 2 + 2}`,
    status: 'Garis Besar Draf',
    title: cleanTitle,
    description:
      description.trim() ||
      'Titik cerita baru yang menautkan ketegangan emosional dan dialog antarkarakter.',
    moodLabel: 'Romansa Hangat',
    targetWords: '3.800 kata',
  };
  return [...nodes, newNode];
}

export function insertAiBeatIntoNode(
  nodes: PlotNode[],
  nodeId: string,
  beatText: string
): PlotNode[] {
  const clean = beatText.trim();
  if (!clean) return nodes;
  return nodes.map((node) => {
    if (node.id !== nodeId) return node;
    const existing = node.insertedBeats ?? [];
    if (existing.includes(clean)) return node;
    return {
      ...node,
      insertedBeats: [...existing, clean],
    };
  });
}

export function generateAiSuggestions(
  promptText: string,
  sparkerKind?: 'next' | 'twist' | 'pacing' | 'fluff'
): AiSuggestion[] {
  const snippet = promptText.trim().slice(0, 64) || 'adegan malam gala';
  if (sparkerKind === 'twist') {
    return [
      {
        id: `ai-${Date.now()}-1`,
        toneBadge: 'Pelintiran Konflik Tak Terduga',
        toneStyle: 'secondary',
        icon: 'shuffle',
        text: '“Ketua dewan juri ternyata menyimpan kartu nama kafe Minho di dalam portofolio proyek lama Theo—membuktikan mereka pernah bertemu tiga musim dingin lalu.”',
      },
      {
        id: `ai-${Date.now()}-2`,
        toneBadge: 'Ketegangan Emosional',
        toneStyle: 'tertiary',
        icon: 'heart_broken',
        text: '“Saat lampu sorot aula padam sebentar, Theo refleks menggenggam pergelangan tangan Minho alih-alih menyelamatkan gulungan cetak birunya.”',
      },
      {
        id: `ai-${Date.now()}-3`,
        toneBadge: 'Beat AU Media Sosial',
        toneStyle: 'neutral',
        icon: 'smartphone',
        text: '“Akun anonim kampus mengetwit foto dua cangkir espreso kembar di meja VIP gala—memicu gelombang teori penggemar dalam lima menit.”',
      },
    ];
  }
  if (sparkerKind === 'fluff') {
    return [
      {
        id: `ai-${Date.now()}-1`,
        toneBadge: 'Dialog Manis (Fluff)',
        toneStyle: 'secondary',
        icon: 'favorite',
        text: '“‘Jasmu bau hujan,’ keluh Minho pelan sambil merapikan kerah Theo—namun tangannya tak kunjung turun bahkan setelah kancingnya rapi.”',
      },
      {
        id: `ai-${Date.now()}-2`,
        toneBadge: 'Kehangatan Domestik',
        toneStyle: 'tertiary',
        icon: 'local_cafe',
        text: '“Theo menyodorkan kantong penghangat tangan yang sejak awal ia simpan di saku mantel khusus untuk jemari Minho yang kedinginan.”',
      },
      {
        id: `ai-${Date.now()}-3`,
        toneBadge: 'DM Tengah Malam',
        toneStyle: 'neutral',
        icon: 'chat',
        text: '“Pesan masuk pukul 01:12 dari Theo: ‘Lain kali, pasangan palsuku tidak perlu berpura-pura menyukai sampanye pahit. Aku sudah siapkan cokelat panas.’”',
      },
    ];
  }
  if (sparkerKind === 'pacing') {
    return [
      {
        id: `ai-${Date.now()}-1`,
        toneBadge: 'Akselerasi Tempo Narasi',
        toneStyle: 'secondary',
        icon: 'speed',
        text: '“Pangkas dialog basa-basi pembuka gala; langsung mulai dari momen ketika sendok porselen terjatuh dan keheningan ruang aula memecah topeng sopan santun mereka.”',
      },
      {
        id: `ai-${Date.now()}-2`,
        toneBadge: 'Transisi Obrolan Cepat',
        toneStyle: 'tertiary',
        icon: 'bolt',
        text: '“Sisipkan tiga gelembung WhatsApp singkat berdurasi 30 detik tepat sebelum mereka masuk pintu ballroom untuk menaikkan ketegangan.”',
      },
      {
        id: `ai-${Date.now()}-3`,
        toneBadge: 'Hook Akhir Bab',
        toneStyle: 'neutral',
        icon: 'auto_stories',
        text: '“Tutup adegan tepat saat Theo membisikkan syarat rahasia kedua di dekat telinga Minho sebelum tirai pameran dibuka.”',
      },
    ];
  }

  return [
    {
      id: `ai-${Date.now()}-1`,
      toneBadge: 'Nuansa Musuh Jadi Kekasih',
      toneStyle: 'secondary',
      icon: 'magic_button',
      text: `“Berdasarkan fokus '${snippet}': Theo membela kualitas seduhan tangan Minho di hadapan para tamu kehormatan dengan ketenangan tajam yang membuat seluruh meja terdiam.”`,
    },
    {
      id: `ai-${Date.now()}-2`,
      toneBadge: 'Mendamba Lembut & Penuh Harap',
      toneStyle: 'tertiary',
      icon: 'sentiment_satisfied',
      text: '“Theo menulis koreksi sketsa arsitekturnya di balik serbet kafe, lalu melipatnya rapi bersama tiga lembar kupon kopi gratis milik Minho.”',
    },
    {
      id: `ai-${Date.now()}-3`,
      toneBadge: 'Beat AU Media Sosial',
      toneStyle: 'neutral',
      icon: 'smartphone',
      text: '“Rekaman singkat pengakuan tak sengaja di balkon gala tersebar di Story Instagram @thegildedquill_london dengan polling 3.000 suara dalam semalam.”',
    },
  ];
}

export function clampReaderScale(currentScale: number, delta: number): number {
  const next = currentScale + delta;
  if (next < 80) return 80;
  if (next > 130) return 130;
  return next;
}

export function createPostcardComment(
  author: string,
  body: string
): PostcardComment | null {
  const cleanBody = body.trim();
  if (!cleanBody) return null;
  return {
    id: `postcard-${Date.now()}`,
    author: author.trim() || 'Pembaca BookishAU',
    avatarUrl: '/src/assets/images/portrait_clara_1795021212579.jpg',
    fallbackAvatarUrl: '/src/assets/images/portrait_clara_1795021212579.jpg',
    badge: 'Kartu Pos Baru',
    meta: 'Ditulis di Bab 3 • Baru saja',
    body: cleanBody,
    likes: 1,
    liked: true,
  };
}
