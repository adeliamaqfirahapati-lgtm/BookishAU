import type {
  AiSuggestion,
  AppSettings,
  AuBlock,
  BookItem,
  CharacterDossierItem,
  MoodboardPin,
  PlotNode,
  PostcardComment,
  ReaderHighlightNote,
} from '../types/bookish';

export const BOOKISH_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/ALJJyrA5xmeD4dPGWjMn9P8TXdw5KV0qDkXFnTTYL1oyTgd5mNEDq7ndv5nYz_9erfvteKCne3_ObxFYrFIN2aUL6V4FApvNun6PxMtStoVnQFjEfJcS0a9g2CkPirX-gLNWIFy_3m5Jj4xXmAbtDIp27ghpRXCQRU0fahWdf5gt2upN8WrMpWjUEY5t3iotsvEAWhnmL_Gqe_fi4_2vxhVr2P9VkO9NdLSaeBFWo58beGh8',
  elenaAvatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDnldSE2u8Nt_J_ALrCQj6PWK4TeMSx9DzbrKCKXJ3_hVJkyxJrzsTNmS7F0pp4bi8B4-HoJD4GMc9aGvQeJgQkgkZXt75AhBjLuThnJuB_3iKJ_FOSc7SsWojTvkqA1b6X1QXVP9rl03dzs7_-jTuqnvkYTBeoymVeL3NcZJLDEkwp7-hTRYBa-TxwxS2BLNnfqCzuWkiWSiHcpWNl6jx_vEReXzw4V2rxRKX_lx4',
  elenaFallback: '/src/assets/images/portrait_clara_1795021212579.jpg',
  minhoAvatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDdPG0JJn8EUEEyWh0rxlFp5VscfrcglXW4W_Okn-hwHkX1z5Xy8XslMFgM9ceUF7248WcEML4XgaAb-h4RGYvZPlQktMc6dYI1B2yDIYWiRYTBIMGSx4lsPYaMDAL-rDE510eNOXYMAl5doBbpJZwBVyqUU_F0NxKKM20yN1zrzVrN_DL7qd8LsKceKdfmbDdl9lm7poZ5ENHLjPGOnH85axKn2vX7dVin8BPD9wc',
  minhoPortrait:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBDMFt9JCji6EK0Zu-FACRoarbwVQa1i_Q2ZsiOTzSyWVV6Woizq3C44_TrIn6m9-Gq2UUs1Ehw0M2SROQy_RXUw1VfssSmPZabES23ETe1SMOFj-GCgSpq2QrTvOJxO7HgyY-nv-NsyK0ReJ5GJ7I-USeRTnhfbAj3lJIp6MVDtDTThSbn4IGVk8zPDQdhhiA9F71zRX1hH6a12Nv5GMl5qTtUfqrKqrTqhpZ52JY',
  theoAvatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC7wSQIKFO-R4YQboI3kitZMWsenz6IGhed3Iu0n5bWSFOZXMpXAZvuyD7LRGLg7XbraFIxOPkJcWQwb5qjU85-psIKWLqnJN3rgMuTwLt4DQHCffoCHnwvCc0oM-n78Q-TZ1P7JYqyLuw7D5QzT9XsJZXjnnXTcquIR5vqM-XzHglXFJFNB3kQKr-gsKLTvaw5UIKg29ZMKm08_rVPTttTO7AXwgZqjNS_4Ma0NO4',
  theoPortrait:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCnfT0QW6AMCi9U1z_v3TxgSrUmCsUCMf7pN7xYeI7S3wpo3smX0GpOemkSRVpMH3DYl-ytPHdk70f_vfpfZUIrGloMCi6aVaqp4FuCClAXqBJCzpydWhKLSDbDNdFFtAHBpNeP6jSuAcxOiX9gIuIcHJENZ-pxvHdnNS3XmzB7rXbcaAjMSwYxZFm8rvUZk0u4MS0WyUurqkmCVeFaIMczc8R_qWrF-KFN1hxf4Pg',
  espressoMachine:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCsFO7nnE_3kOx9wWD6kklFiKlVPNXDY4Qi5qouey1riOdcRGBX_n1yajMrg9_9gc9-sDavWz3CC6ewpjm7GSYCvvm2JY-hIwySzcA3uiJab424jKZNUqX-WCLlaWQ6KrfVOdbiSFy9JqV-yVuGVD0ydYRp7Dt4UeaOVlKHBuQFa8MZ3akTsKJV8Lj_VqqVDkJR9PR1aHjnp9PUXxnqq_YV-SFvuUUw0B66W6-slGg',
  storyBgRain:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCiKANIUswHV-dj2w7xKdeJ2sdwXE5RdHlfhl0Wn2TBTLNait_-KqwH-mnHSkStjQif_xuAUJG9fUlrLxZhd_9veXqOa5ry0dh5XOjC2yNDBFIvnpfWHWJ2UeZgqUjtmf4Itd6Ni5vZiSTe7FfYCFLgO_5JHwQZu5eEYDB3fLtZ1aOReBYKzA4PIB0dPP_Y_dhV0iLw7qXJ7-T_FP02ILUnC3Xal71vMTnPugEV3AM',
  minhoStoryAvatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDFv9IeW2g14jsueyTL9i4bT5NA4E8L712pC0VI7zAg9nbha1C34xXHYwyios2kKv3rOiSyg33a9_Bzo6WfKf3GU9MbN7cAsUnQjvSxrYIl3Mr0IwmD5ZIgZWRC4oMJYUclDX1pv_n3O3EXutN5yGolWi3MEi-qcHUv9yujOMbjsJFNqa0xiv_7dR-YtAysiD-MOFNY_JthONzU-KIWO0-ZMWru1ZfJQ_h7PwVAP4o',
  coverLatte:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBcFCPUrmyRPn8fcaGfdRYhbW6idkATFEg7QE-DGXatVD_v55RhZrDCnTeMSSWGnvNI4UXxVmiWJVg81FOVTcoRDCrKWDo7xNW4npXDqAkK9t3Doi_yRBUkxrPk6IbXgqWRTREcLElVi2VZ4dAkr9qvNY1zSrbqTnzJOfRdObdmJ9wfVt5ypFh0-4QDRasAtENvGbK9IFC75uXiNRTp1kthp01pUone9uhyZU5xunA',
  coverLatteDetail:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCu-5MkNK2DchB4fGtf1Vi9RAaaPo0rObOU7BWCZNJLLHBWFKy9w5angVtjxnaw0RQQP7t-4Ze21X9V8VuV7lDoyhj_QIF5kXe2dZCFG-K8CuLeXsGZbEUH_Bx7MlEC9_PZ25TeBRVQnd28j5V53zSV-RA-x4vhzOAQNP9s0TiGweF9I_VjOVVJIsZNpEneG7WqQ3SM0mzAkC9EqkVbJOn7k1kcBgq2RuwnNE63T-o',
  coverOxford:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAcYuOaWhTUSwYn27uGmhyUQ-_P3HmeVgA-Tta0j-lOh2uwVDX2JZiYn5fS0ukL-oy1RqM-nDr6VTBJCW68Eee5N18Mv0DUzAsHclCa2RH3cmXP4SpG2n-8ihMTiLCFwShg2X4SdYSA3BiYflkydBSht0dLInm6EiF5luljG4vltdFb7Qc7I6oVKXfa6mGMSzymXohingtAf_WPGFfn6HZ8p1Q8QEHjtsp60ZTcK7I',
  coverPetals:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBxHPSymQVbKYu5cpxKCGuJ24D8P-mqgqqhG0BdBLdOZyt2KAuhoBgjHF6nUJnFgkde3sDcwXE6tJJN9Pn76Xu70QZDPU5XXHbyFie74TJqho7KXGcDEEKsUrHQnQ75n8VB_PzUssR8bhytSx5SwswEmu0bLWsOQNgNV6f8BGYeqyk4_51IzBuMEqTVTnYVWde0J2xVfH-NIMs_Yk1vSEWlIwg6jRsrrSzQJK24gT0',
  coverRadio:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAvG_JU9i8k1djudaQKoDN_yahkvmInTC4li6JXledb3XP3E9sY_oPwdP9GIsksH7e0EaJKJ4Hr9NSBivAXPfz_WTPJif-WAZRJ9UwC8RITu1CJTG6Lq2aMhTU-dSwUjXV5msXerg8L-HxJVVUEXIrsoKxKoqDBbFm39MIwWPvqz1E4Z8olbLKDaRP_bA3uG8l2DlkaBQD--6U32vbqLOAecNCB5GEMWli9tFblTVU',
};

export const SEED_BOOKS: BookItem[] = [
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
    coverUrl: BOOKISH_ASSETS.coverLatte,
    fallbackCoverUrl: '/src/assets/images/cover_coffee_rain_1795021211974.jpg',
    coverAlt:
      'Ilustrasi editorial hangat secangkir mug latte art porselen mengepul di samping buku harian kulit vintage',
    gradientClass: 'bg-gradient-to-br from-[#FAF2EC] via-[#FCECEF] to-[#EBD5CB]',
    textColorClass: 'text-primary',
    subTextColorClass: 'text-secondary',
    ribbonColorClass: 'bg-secondary',
    badgeClass: 'bg-secondary-container/90 text-on-secondary-container',
    footerClass: 'bg-surface-container-lowest/70 text-primary',
    tropes: ['#KedaiKopiAU', '#KencanPalsu', '#SlowBurn', '#SalingMendamba', '#BaristaArsitek'],
    synopsis:
      'Saat seorang arsitek lepas yang kelelahan menumpahkan susu oat kayu manis di atas sketsa kompetisi barista, sebuah kesepakatan bersama pun dimulai: espresso gratis sebagai imbalan berpura-pura menjadi pasangan di pameran galeri bergengsi.',
    paletteColors: [
      { hex: '#6F4E37', name: 'Caramel Roast' },
      { hex: '#F4ACB7', name: 'Strawberry Foam' },
      { hex: '#FFE5EC', name: 'Steam Rose' },
      { hex: '#FDF9F3', name: 'Warm Parchment' },
    ],
    chapters: [
      {
        number: 1,
        title: 'Macchiato yang Tumpah',
        formatLabel: 'Obrolan AU + Prosa • 3.420 kata',
        wordCount: 3420,
        status: 'Diterbitkan',
        icon: 'forum',
      },
      {
        number: 2,
        title: 'Viral Tengah Malam',
        formatLabel: 'Kartu Twitter AU Tiruan • 2.890 kata',
        wordCount: 2890,
        status: 'Diterbitkan',
        icon: 'tag',
      },
      {
        number: 3,
        title: 'Giliran Kerja Minggu Hujan',
        formatLabel: 'Feed Cerita AU • 4.110 kata',
        wordCount: 4110,
        status: 'Diterbitkan',
        icon: 'photo_camera',
      },
      {
        number: 4,
        title: 'Sirup Lavender & Permintaan Maaf',
        formatLabel: 'Sedang Diedit • 1.840 kata',
        wordCount: 1840,
        status: 'Menulis',
        icon: 'draw',
      },
    ],
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
    detailBadge: 'Sedang Berjalan • Bab 9 Diantrekan',
    readersCount: '29,5 rb',
    chapterLabel: 'Bab 9 Diantrekan',
    coverUrl: BOOKISH_ASSETS.coverOxford,
    fallbackCoverUrl: '/src/assets/images/cover_midnight_archive_1795021212665.jpg',
    coverAlt:
      'Meja dark academia dengan pulpen tinta antik, tumpahan tinta kaligrafi merah tua di atas perkamen',
    gradientClass: 'bg-gradient-to-br from-[#2D3748] via-[#1A202C] to-[#4A2D35]',
    textColorClass: 'text-surface-bright',
    subTextColorClass: 'text-secondary-fixed',
    ribbonColorClass: 'bg-tertiary-container',
    badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    footerClass: 'bg-surface-container-highest/20 text-surface-bright',
    darkCover: true,
    tropes: ['#RivalKampus', '#MusuhJadiKekasih', '#PerpustakaanMalam', '#KomunitasRahasia', '#OxfordHujan'],
    synopsis:
      'Dua cendekiawan sastra terkemuka bersaing memperebutkan beasiswa prestisius Bodleian, berkomunikasi hanya lewat anotasi sinis yang ditulis di tepi halaman antologi puisi langka abad ke-19.',
    paletteColors: [
      { hex: '#2D3748', name: 'Oxford Slate' },
      { hex: '#4A2D35', name: 'Crimson Ink' },
      { hex: '#FFDD99', name: 'Brass Telescope' },
      { hex: '#F7F3ED', name: 'Bodleian Folio' },
    ],
    chapters: [
      {
        number: 1,
        title: 'Catatan Pinggir di Duke Humfrey',
        formatLabel: 'Prosa Surat & Catatan • 3.850 kata',
        wordCount: 3850,
        status: 'Diterbitkan',
        icon: 'menu_book',
      },
      {
        number: 2,
        title: 'Debat Seminar Tengah Malam',
        formatLabel: 'Prosa + Email Akademik • 4.220 kata',
        wordCount: 4220,
        status: 'Diterbitkan',
        icon: 'forum',
      },
      {
        number: 3,
        title: 'Kunci Ruang Arsip Terlarang',
        formatLabel: 'Sedang Diedit • 2.150 kata',
        wordCount: 2150,
        status: 'Menulis',
        icon: 'draw',
      },
    ],
    progressPercent: 64,
  },
  {
    id: 'petals',
    title: 'Kelopak di Stetoskop',
    shortTitle: 'AU Medis Hanahaki',
    shelfTier: 'lower',
    category: 'floral',
    categoryBadge: 'Hanahaki • Med AU',
    statusBadge: 'Tamat (22 Bab)',
    authorLine: 'Elena Vance • 91,0 rb Pembaca',
    sub: 'Dunia Alternatif: Hanahaki & Mahasiswa Kedokteran • 91.000 Pembaca',
    detailBadge: 'Karya Agung • Tamat',
    readersCount: '91,0 rb',
    chapterLabel: 'Peringkat #1',
    coverUrl: BOOKISH_ASSETS.coverPetals,
    fallbackCoverUrl: '/src/assets/images/cover_conservatory_letters_1795021211893.jpg',
    coverAlt: 'Karya botani romantis lembut stetoskop medis berpadu dengan ranting sakura mekar warna pastel',
    gradientClass: 'bg-gradient-to-br from-[#FFF0F3] via-[#FFE3E8] to-[#F7CAD0]',
    textColorClass: 'text-on-secondary-container',
    subTextColorClass: 'text-secondary',
    ribbonColorClass: 'bg-primary',
    badgeClass: 'bg-secondary text-on-secondary',
    footerClass: 'bg-surface-container-lowest/80 text-secondary',
    tropes: ['#HanahakiAU', '#MahasiswaMedisAU', '#CintaBerbalas', '#AirMataDanTendonitis', '#SentuhanBotani'],
    synopsis:
      'Seorang dokter residen bedah mulai batuk mengeluarkan kelopak bunga sakura selama jadwal rotasi gawat darurat pukul 4 pagi, menyadari bahwa rasa cinta yang lama dipendamnya terhadap rival utama bedahnya tidak dapat disembuhkan lagi.',
    paletteColors: [
      { hex: '#FFB6C1', name: 'Sakura Petal' },
      { hex: '#874E58', name: 'Rosewood' },
      { hex: '#FFF0F3', name: 'Blush Cream' },
      { hex: '#553722', name: 'Espresso Ink' },
    ],
    chapters: [
      {
        number: 1,
        title: 'Rotasi UGD Pukul Empat Pagi',
        formatLabel: 'Prosa Medis • 4.600 kata',
        wordCount: 4600,
        status: 'Diterbitkan',
        icon: 'auto_stories',
      },
      {
        number: 2,
        title: 'Kelopak Putih di Loker Bedah',
        formatLabel: 'Obrolan Rumah Sakit • 3.900 kata',
        wordCount: 3900,
        status: 'Diterbitkan',
        icon: 'forum',
      },
      {
        number: 3,
        title: 'Epilog Rumah Kaca Musim Semi',
        formatLabel: 'Tamat • 5.100 kata',
        wordCount: 5100,
        status: 'Diterbitkan',
        icon: 'local_florist',
      },
    ],
    progressPercent: 100,
  },
  {
    id: 'radio',
    title: 'Frekuensi 107.4 FM',
    shortTitle: 'AU Frekuensi Radio',
    shelfTier: 'lower',
    category: 'coffee',
    categoryBadge: 'AU Radio Tengah Malam',
    statusBadge: '5 Bab',
    authorLine: 'Elena Vance • 14,1 rb Pembaca',
    sub: 'Dunia Alternatif: Radio Kampus Tengah Malam • 14.100 Pembaca',
    detailBadge: 'Sedang Berjalan • Episode 6',
    readersCount: '14,1 rb',
    chapterLabel: 'Menulis Ep. 6',
    coverUrl: BOOKISH_ASSETS.coverRadio,
    fallbackCoverUrl: '/src/assets/images/hero_botanical_desk_1795021210675.jpg',
    coverAlt: 'Bilik siaran radio retro 1990-an dengan mikrofon vintage, pemutar piringan hitam dan lampu kuning temaram',
    gradientClass: 'bg-gradient-to-br from-[#E8DDD5] via-[#DFCCC0] to-[#BFA090]',
    textColorClass: 'text-primary',
    subTextColorClass: 'text-tertiary',
    ribbonColorClass: 'bg-tertiary',
    badgeClass: 'bg-tertiary-container text-on-tertiary-container',
    footerClass: 'bg-surface-container-lowest/70 text-primary',
    tropes: ['#RadioTengahMalam', '#PeneleponAnonim', '#SuasanaSlowBurn', '#KolektorPiringanHitam', '#LampuKota'],
    synopsis:
      'Penyiar program musik dini hari di kampus menerima panggilan telepon eksentrik rutin pukul 2 pagi dari mahasiswa arsitektur anonim yang sedang belajar di bawah temaram lampu neon di seberang lapangan kampus.',
    paletteColors: [
      { hex: '#6B5031', name: 'Vintage Vinyl' },
      { hex: '#BFA090', name: 'Warm Tape' },
      { hex: '#FFDDBB', name: 'Neon Broadcast' },
      { hex: '#FDF9F3', name: 'Linen Script' },
    ],
    chapters: [
      {
        number: 1,
        title: 'Siaran Uji Coba 02.00 Pagi',
        formatLabel: 'Transkrip Audio + Prosa • 2.750 kata',
        wordCount: 2750,
        status: 'Diterbitkan',
        icon: 'podcasts',
      },
      {
        number: 2,
        title: 'Permintaan Lagu Piringan Hitam',
        formatLabel: 'Pesan Suara + DM • 3.120 kata',
        wordCount: 3120,
        status: 'Diterbitkan',
        icon: 'forum',
      },
      {
        number: 3,
        title: 'Siaran Hujan di Studio B',
        formatLabel: 'Sedang Diedit • 1.480 kata',
        wordCount: 1480,
        status: 'Menulis',
        icon: 'draw',
      },
    ],
    progressPercent: 45,
  },
];

export const SEED_STUDIO_BLOCKS: AuBlock[] = [
  {
    id: 'block-twitter-1',
    type: 'twitter',
    order: 1,
    authorName: 'Minho ☕',
    handle: '@min_latte',
    bioLine: 'Barista & Inspirasi Terpaksa • Shift Tengah Malam',
    verified: true,
    avatarUrl: BOOKISH_ASSETS.minhoAvatar,
    fallbackAvatarUrl: '/src/assets/images/portrait_clara_1795021212579.jpg',
    content:
      'kalau cowok berjas hujan hijau itu pesan iced americano dengan 6 shot espresso lagi jam 21:55, aku bakal kunci pintu kafenya sendiri.',
    mediaUrl: BOOKISH_ASSETS.espressoMachine,
    fallbackMediaUrl: '/src/assets/images/cover_coffee_rain_1795021211974.jpg',
    mediaCaption: 'Kukusan portafilter jam 21:58',
    timestamp: '23:42',
    deviceLabel: 'Twitter untuk iPhone',
    replies: 312,
    retweets: '1,4 rb',
    likes: 8900,
    bookmarks: '1.024',
    threadNotes: [],
    showThreadCount: true,
    showMetrics: true,
  },
  {
    id: 'block-chat-2',
    type: 'chat',
    order: 2,
    partnerName: 'Theo (Jas Hujan Judes)',
    partnerAvatar: BOOKISH_ASSETS.theoAvatar,
    fallbackPartnerAvatar: '/src/assets/images/portrait_julian_1795021213910.jpg',
    partnerStatus: 'Online • Mengetik...',
    dateDivider: 'Hari Ini, 23:45',
    activeSenderRight: 'Minho',
    messages: [
      {
        id: 'm1',
        senderName: 'Theo',
        isRight: false,
        text: 'Aku dengar itu barusan. Dan kamu juga bikin pakai susu oat hari ini. Terima kasih.',
        timestamp: '23:45',
        kind: 'text',
      },
      {
        id: 'm2',
        senderName: 'Minho',
        isRight: true,
        text: 'Harusnya kamu nggak baca tweet itu???',
        timestamp: '23:46',
        kind: 'text',
      },
      {
        id: 'm3',
        senderName: 'Minho',
        isRight: true,
        text: '"Berhenti mengintai akun baristaku!"',
        timestamp: '23:46',
        kind: 'voice',
        voiceDuration: '0:14',
      },
      {
        id: 'm4',
        senderName: 'Theo',
        isRight: false,
        text: 'Aku menanggapi kopiku dengan sangat serius, barista-nim. Sampai jumpa besok jam 09:54.',
        timestamp: '23:47',
        kind: 'text',
      },
    ],
  },
  {
    id: 'block-story-3',
    type: 'story',
    order: 3,
    handle: 'min_latte',
    timeAgo: '47 mnt',
    avatarUrl: BOOKISH_ASSETS.minhoStoryAvatar,
    fallbackAvatarUrl: '/src/assets/images/portrait_clara_1795021212579.jpg',
    backgroundUrl: BOOKISH_ASSETS.storyBgRain,
    fallbackBackgroundUrl: '/src/assets/images/cover_coffee_rain_1795021211974.jpg',
    musicTrack: 'Laufey — From The Start ♫',
    pollQuestion: 'Besok dia harus dikasih decaf nggak?',
    pollOptions: [
      { id: 'poll-1', label: 'Iya, biarkan dia tidur 😴', votes: 166, isAccent: true },
      { id: 'poll-2', label: 'Nggak, tambahin kekacauan ☕', votes: 272 },
    ],
    caption: 'shift tengah malam rasanya beda saat si pelanggan langganan nggak mau pulang 🌧️',
    viewsLabel: '1.280 tayangan',
  },
  {
    id: 'block-prose-4',
    type: 'prose',
    order: 4,
    paragraphs: [
      'Lonceng kuningan di atas pintu masuk tidak lagi berdenting riang—bunyinya berderak pelan, lelah dihantam hembusan angin musim gugur selama dua puluh tahun dan para mahasiswa yang memperlakukan kedai kopi ini bagai tempat perlindungan tanpa jeda. Minho tak perlu repot-repot mengangkat pandangan dari pipa uap mesin kopi untuk mengenali derap sepatu bot yang menorehkan jejak basah hujan di atas ubin heksagonal.',
      'Tidak ada orang lain yang beraroma seperti wol basah, serutan pensil kayu cedar, dan sisa samar aroma seduhan sangrai gelap yang pekat. Theo mengibaskan payungnya di luar ambang pintu, rintik air menetes bak sandi Morse tak beraturan di atas kaca jendela yang berembun dingin.',
    ],
    quotedLine:
      '“Kamu lupa taburan kayu manisnya lagi,” gumam Theo lirih, menyodorkan buku sketsanya ke samping mesin penggiling biji kopi tanpa mendongak.',
    useDropCap: true,
    authorMarginNote:
      'Catatan untuk diri sendiri: Di bab 4, singgung cetak biru tabung arsitektur Theo yang tertinggal di bawah stan sudut. Bangun ketegangan romansa perlahan!',
  },
];

export const SEED_STUDIO_CHARACTERS: CharacterDossierItem[] = [
  {
    id: 'char-minho',
    name: 'Minho',
    roleBadge: 'POV Barista',
    roleBadgeClass: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    bio: 'Manajer kedai kopi, diam-diam menulis puisi',
    avatarUrl: BOOKISH_ASSETS.minhoPortrait,
    fallbackAvatarUrl: '/src/assets/images/portrait_clara_1795021212579.jpg',
    traits: ['Manis / Sarkastik', 'Penyayang Kucing'],
  },
  {
    id: 'char-theo',
    name: 'Theo',
    roleBadge: 'Pelanggan Langganan',
    roleBadgeClass: 'bg-primary-fixed text-on-primary-fixed',
    bio: 'Mahasiswa arsitektur semester akhir, tidur 3 jam semalam, penggemar susu oat',
    avatarUrl: BOOKISH_ASSETS.theoPortrait,
    fallbackAvatarUrl: '/src/assets/images/portrait_julian_1795021213910.jpg',
    traits: ['Jas Hujan Andalan', 'Berhati Lembut Rahasia'],
  },
];

export const SEED_MOODBOARD_PINS: MoodboardPin[] = [
  {
    id: 'pin-1',
    label: 'Seni Latte',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9pDU3roQS_4f7923BA8OOWQVS-BUdidyt0Oldt9JYJ2XDAoLxTQX2_1W-ydAisSRBEmOUQTrvC3ZfN-Q37hR48P8sTuPxCiG6ppPb3Ndnd5iObyps2aATm5d_Bl82Pj4YKcoSFa8YTvJJVbSBjrMjQ3A9Pl787h6lqvdsdOpL_jGk30MzD2pjCqWP1LB5dz0GZf-0fcM-cuVlXggXknxJZztmHqDL0WGcz4EImyo',
    fallbackImageUrl: '/src/assets/images/cover_coffee_rain_1795021211974.jpg',
    alt: 'Cangkir latte keramik dengan seni daun pakis di atas meja kayu ek',
  },
  {
    id: 'pin-2',
    label: 'Cetak Biru',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCbn3augWJw5aHzozZpliJvDqVit4DJoEIzw6i9hMyKVBGlsRlDe8Uha8D1m27nSfVPZJj79AjmJN0YGUq9ODR-SVx1nP__-oRMUluT8UoQivCH5E6YMXSIRmTdOlWWOFVJ8ysF7hdiKeS-7b0ARL-5oeUxV3N7KeR6snpWfqu9i-sYrRgn6-mIaWb8atM14O0ITaL9qhABDVVLe-OiYBq7Pr3rUxVcbiQlzWRWqA',
    fallbackImageUrl: '/src/assets/images/hero_botanical_desk_1795021210675.jpg',
    alt: 'Buku sketsa arsitektur dengan pensil mekanik dan noda kopi',
  },
  {
    id: 'pin-3',
    label: 'Seoul Hujan',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAA7vzjG3G9gMd9YEoy2-7ZOzGLaHlMY44qN-G8Pbw-WHy02Ww2Qlrst7Kfr3GjPNa1nf9axnltoceyOGKsn9D9Q_c6oVSztX1ZM9tUxxndPW8_8Qfa5gTCbTEilmM-zEsIXZ02GhBMvHewhiRbKCgzT2_Neo6pvqOQZKEMkti5xPHlslUVSbNY1TtVTGjv_HQvbQqvTKsd2gvs3RrCKC99d63tnYkwbbaX6-Fv3AQ',
    fallbackImageUrl: '/src/assets/images/cover_coffee_rain_1795021211974.jpg',
    alt: 'Sudut jalan hujan dilihat lewat jendela kafe hangat',
  },
  {
    id: 'pin-4',
    label: 'Piringan Hitam Laufey',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUDZbD2ZoOP2SFRl3OABhRmkwQx1S4YW4TtXyGFUhIM03UKkjhL5tGYqlaFPy11O6nlkmdkMyUM_13pDfz7vZ7TpcW3QvNKiuzJY8E7m2PBGHatrSDgUrSP1A-gOLC4W8NhD5ZfItSkGkJpNPh51hm98KnFgqjWCvB2oRBQDDmJPKawHmpvEHTD6V6os4Gtl4abPA0rhXIwKnx2rdSnD9ymLP1PKDggZmovU8Q5nw',
    fallbackImageUrl: '/src/assets/images/cover_midnight_archive_1795021212665.jpg',
    alt: 'Pemutar piringan hitam antik dan kaset di kamar belajar hangat',
  },
];

export const SEED_PLOT_NODES: PlotNode[] = [
  {
    id: 'node-1',
    numberLabel: '01',
    actBadge: 'Babak I: Peristiwa Pemicu',
    chapterRange: 'Bab 1–3',
    status: 'Selesai',
    title: 'Macchiato yang Tumpah',
    description:
      'Minho secara tidak sengaja bertukar pesanan kopi dengan Theo saat jam sibuk pagi. Theo menemukan coretan cetak biru arsitektur yang rumit pada selongsong cangkir kertas; Minho menemukan panduan belajar kalkulus penuh kode rahasia.',
    povLabel: 'SUDUT PANDANG: Minho',
    wordProgress: '4.820 kata',
    formatLabel: '30% Obrolan / 70% Prosa',
  },
  {
    id: 'node-2',
    numberLabel: '02',
    actBadge: 'Babak I: Interaksi Pertama',
    chapterRange: 'Bab 4–6',
    status: 'Selesai',
    title: 'Utas Viral Twitter AU',
    description:
      'Seorang pelanggan kampus diam-diam memotret Theo yang sedang mengamati croissant stroberi mungil dengan raut wajah masam. Akun alternatif kafe Minho mengutip twit itu dengan tulisan “padahal dia bilang benci makanan manis.” Jagat internet pun heboh.',
    povLabel: 'SUDUT PANDANG: Layar Ganda',
    wordProgress: '6.100 kata',
    formatLabel: '85% AU Obrolan Palsu',
  },
  {
    id: 'node-3',
    numberLabel: '03 *',
    actBadge: 'Babak II: Konflik Meningkat',
    chapterRange: 'Bab 7–10',
    status: 'Fokus Menulis Aktif',
    title: 'Kencan Palsu di Gala Fakultas',
    description:
      'Theo membutuhkan pasangan sederhana demi menangkal gosip jabatan dan tuntutan keluarga; Minho setuju dengan imbalan bimbingan les struktur bangunan sebelum ujian tengah semester. Ketegangan memuncak saat sesi pasang gaun dan setelan.',
    povLabel: 'Theo (Monolog Batin Mendalam)',
    wordProgress: '5.400 / 8.000',
    wordPercent: '(67%)',
    formatLabel: '20% Obrolan / 80% Prosa',
    insertedBeats: [],
  },
  {
    id: 'node-4',
    numberLabel: '04',
    actBadge: 'Babak II: Titik Balik Tengah',
    chapterRange: 'Bab 11–13',
    status: 'Garis Besar Draf',
    title: 'Mati Lampu Larut Malam',
    description:
      'Terjebak bersama di gudang bawah tanah kafe saat badai petir bulan Agustus. Uap hangat teh matcha, temaram lilin darurat yang berkedip, dan pengakuan jujur yang tak sengaja terucap tentang rencana meninggalkan kota setelah wisuda.',
    moodLabel: 'Suasana: Melankolis Hangat',
    targetWords: 'Target: 5.500 kata',
  },
  {
    id: 'node-5',
    numberLabel: '05',
    actBadge: 'Babak III: Puncak Konflik',
    chapterRange: 'Bab 14–16',
    status: 'Pilihan Bercabang',
    title: 'Mantan Kembali / Panggilan Terdengar',
    description:
      'Pesan suara yang disalahpahami terkait tawaran pekerjaan di Zurich mengancam memisahkan mereka sebelum perasaan tulus sempat terucap.',
    selectedBranchId: 'route-a',
    branches: [
      {
        id: 'route-a',
        routeLabel: 'Rute A (Dramatis)',
        routeTone: 'secondary',
        icon: 'flight_takeoff',
        title: 'Kejaran Bandara & Gerimis Dingin',
        description:
          'Minho meminjam Vespa teman di tengah hujan lebat untuk menyusul Theo sebelum gerbang keberangkatan ditutup. Trope komedi romantis klasik.',
        noteDetail:
          'Catatan Rute A: Pastikan adegan helm kebesaran dan pesan suara tertunda diputar ulang di terminal 3.',
      },
      {
        id: 'route-b',
        routeLabel: 'Rute B (Intim)',
        routeTone: 'tertiary',
        icon: 'menu_book',
        title: 'Pengakuan di Depan Publik',
        description:
          'Theo menghadiri instalasi karya tugas akhir Minho, membaca halaman dedikasi tepat di hadapan seluruh jajaran dosen fakultas.',
        noteDetail:
          'Catatan Rute B: Fokus pada sunyi ruangan pameran saat Theo memegang katalog cetakan pertama.',
      },
    ],
  },
  {
    id: 'node-6',
    numberLabel: '06',
    actBadge: 'Penyelesaian & Epilog',
    chapterRange: 'Epilog',
    status: 'Akhir Bahagia Kanon',
    title: 'Matahari Pagi di Atas Espreso',
    description:
      'Satu tahun kemudian: tinggal bersama di apartemen dengan cangkir keramik yang tak serasi dan meja gambar arsitektur yang memenuhi separuh ruang tamu mungil.',
  },
];

export const SEED_AI_SUGGESTIONS: AiSuggestion[] = [
  {
    id: 'ai-1',
    toneBadge: 'Nuansa Musuh Jadi Kekasih',
    toneStyle: 'secondary',
    icon: 'magic_button',
    text: '“Theo dengan tenang membeberkan asal usul biji kopi dan profil pemanggangan secara presisi akademis, membungkam dosen senior pengkritik tanpa perlu menaikkan nada bicaranya sedikit pun.”',
  },
  {
    id: 'ai-2',
    toneBadge: 'Mendamba Lembut & Penuh Harap',
    toneStyle: 'tertiary',
    icon: 'sentiment_satisfied',
    text: '“Theo sengaja membeli tiga cangkir lagi tepat di depan ketua departemen yang sombong itu, lalu meninggalkan tip yang luar biasa besar dengan catatan lipat rahasia di atas serbet.”',
  },
  {
    id: 'ai-3',
    toneBadge: 'Beat AU Media Sosial',
    toneStyle: 'neutral',
    icon: 'smartphone',
    text: '“Seorang pengunjung diam-diam merekam konfrontasi santun dan elegan itu; rekaman suaranya viral semalam di TikTok kampus dengan tagar #CafeKnight, membongkar rahasia kencan palsu mereka.”',
  },
];

export const PLOT_SENSORY_IMAGES = [
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkH5KVj7233DJ9T35cS5ExuxacFIhMIRyYKiwHu4ZUvFKlzXVRWw8PxrcGhPHy_13nTBXePmVwvD9Gsk22J68nReG8K2RSpMWf5Ro1TBam8Q9Kce6a3UU2TZRttX4wO6_kxVhyX1zaLpPLAGWxBQ2WkQn4l9ysxDcZLpti7i2xoL59iNWu6BIwRvEBWU1uyOgivWYYfDTMlH4t-Mn8_8Ec8oqNOypyQWc1Nb8kdBs',
    fallback: '/src/assets/images/cover_coffee_rain_1795021211974.jpg',
    alt: 'Foto makro susu berbusa menciptakan seni latte bermotif bunga',
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDnuEZo2mc_van67-TjtA7CeFCC9Cj9i7FgP4C-kUT9wD1NNR9cOPP7bKwjoA41LyQIfBbXGO6Lds7XM38wZkKl8ouuJwwc3KKQPqWACDQErlirtCnrnCAZ9AvCP8ubFlyDLTpxCMS8Fy1yQGvV0uf5qu4kUKxgwCKp-ggUyyyCep1r1QB-XdIKLzVsVTgfY3s96_IGzPqxl9gNVGBSBYX3Io1_Zh9r5Xi8_MrxHo',
    fallback: '/src/assets/images/hero_botanical_desk_1795021210675.jpg',
    alt: 'Buku catatan arsitektur dengan jangka kuningan dan kopi mengepul',
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFS_b2_4YyAcneFKBcvmlZ_3y-Cgy6ov6ZIEVnFJCLSmYPPTGLjzjRzoNK6Q_NaVXWliEKGH1j1uFBojU3G9vng3vWw-UkOWATlz7v2mr04Ju0KpeHxWN5MXDyWLXfM2hLZdR_cPQ8UGGFjby9COUL7Jt3yKu-Dc4hoXC1ZLXpv77m1KtyBQ10LJkLNxumaKEUEpDngr1dM5oBTVtahtOkY4ObnJRWfNXGFelhOms',
    fallback: '/src/assets/images/cover_coffee_rain_1795021211974.jpg',
    alt: 'Rintik air hujan membasahi kaca jendela kafe kota di waktu senja',
  },
];

export const SEED_PLOT_CHARACTER_AVATARS = {
  minho:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAkWg3yf1hZQ-NZFMo3vEbBc_ZK1t7Z0IF-msBOM1br5alozLdLCaQTeABwNff7u3Z1HlVXyuK8ks0Y4slDA7oGbOq6SBylZejrLT4nqGMJ_81igLvOvXaIxV5yDpqSIIfmqwNo1R4okSFbk8PRSNCBfRbVCQcf9PO8ovqsDLolqE1W9CmKr5iAsXve5CkZNK920UJvMDqsClBNnp-pH5rwQxjJ8PrYYvT2_pXQ6jc',
  theo:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC_5kKfUHvhG9syZuyts50ML7zJVQzPEYcE9lSofUfBreLWUe0YZR0sfmfkoqvkry6-czpEONn_XgU3icHDAjhwwZ6-t7YUm87f5x8uGJG9QfuVPOD_wCAL-0vnPr_UV2aG7lrbaQM-fN0EXgU36FZz_EmBuMuGQGUUJbEGTH0IAQC8p7aDfii1HN3GnYCX_aHQe155uB5iJ9QSe0bMRaX7LE4n3wK2-qIOSGFgPOo',
};

export const SEED_POSTCARDS: PostcardComment[] = [
  {
    id: 'pc-1',
    author: 'Claire_Reads_At_Midnight',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxsgVGXoVDdA7sGiO0a0W9O6sst4rr_5hbdV439qCza6HQEk5EBM9nVYYqVK6-G4JBEZHJque-x3qgAafmaqjxsfSh6Fn00sQaoc9au1WuT2tvDItMiEEYdH4WCj9oIA0xRo165rsYjo_WKsJ1Bsy2n9cjBBUM0igJN4t6xObP-B67MWGF9BUMuJ-vNUPpDfT23G7flD8JA3O759oQpqRIqPxRSkaTNJP5HjoVPoE',
    fallbackAvatarUrl: '/src/assets/images/portrait_clara_1795021212579.jpg',
    badge: 'Komentator Teratas',
    meta: 'Ditulis pada Paragraf 3 • 2 jam lalu',
    body: '"Simpan kembaliannya, pertahankan keheningannya." Aku benar-benar ingin menggigit dinding saking gemasnya! Julian Chen yang hafal luar kepala seluruh jadwal kafe Arthur sementara tetap berpura-pura bersikap dingin tak acuh adalah puncak puisi benci-jadi-cinta termanis yang pernah ada! ☕😭',
    likes: 184,
    authorReply: {
      author: 'Elena Vance',
      timeAgo: '1 jam lalu',
      body: 'Tunggu sampai kalian melihat apa yang ditulis Julian di balik serbet di Bab 5. Siapkan hati kalian! ✨',
    },
  },
  {
    id: 'pc-2',
    author: 'MiloWritesAU',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJSzOGaaIAebLeyqWoDvDPJWoHEfntL8ny5mT1YxUs7yoh1GfRYl40Xk-YC4ZzZV1b83Ni1lkaCXNl9YB3HapPedGVMeeM4fRQjyLlajhWSCNZB3zglc6nnyM3D57DVETLZC4eskfbJ-rEhy5j_aStrz_UQEbnUXAqSgKonWLJX-UjCUOmcBkUY_2f13elb44HqZ76UOnhiawMTib_hmlyH6mokJ8NkdEM4i3gOjI',
    fallbackAvatarUrl: '/src/assets/images/portrait_julian_1795021213910.jpg',
    meta: '4 jam lalu • Memilih "YA, tulis Pangeran Judes" di Polling Cerita',
    body: 'Integrasi multimedianya indah sekali! Waveform audio WhatsApp tadi benar-benar bikin deg-degan waktu gelembung mengetik Julian mendadak muncul. Elena, isi kepalamu luar biasa jenius!!',
    likes: 76,
  },
];

export const SEED_READER_NOTES: ReaderHighlightNote[] = [
  {
    id: 'note-1',
    handle: '@harper_sky',
    paragraphLabel: 'Paragraf 1',
    quote: '"aku berteriak membaca chat ini. DIA MEMANGGILNYA PROFESOR CHEN."',
    agrees: 89,
    highlight: true,
  },
  {
    id: 'note-2',
    handle: '@archival_tea',
    paragraphLabel: 'Paragraf 3',
    quote: '"Panjang rekaman audionya 14 detik... 14 bait dalam soneta? ELENA JELASKAN INI."',
    agrees: 142,
  },
];

export const READER_ASSETS = {
  authorHeadshot:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAhG-I5knAegb3UnLLtlMe662o1MJP6jlnDJimo4maROB9X4RlPpcLDZib9pTn8Tmnj02eKY6W06Eu_WkmwodoNPAUMBdMlolYPhZKY6Oy42x2zHNYBAchZGv1hiAakJdcemT-_zRCw6VcoUrEaUrNZXb74EpOXWycFpumbIr--6LX77JiJGn2fNmNyF4aYbWKDcHZUaNxv3BYPaZXl8MqjzmVjfOBk8WS7NDPqkZQ',
  julianAvatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCHiRPwBszJ9bJ31csFDdIWEFzd0mLsK0u2VLKO2jxVNIVXY6FY0_4cfd9myjzTkm5BScj8FyRp6yFTakrljnh-GrGv2ShanKbzmVtN-SseUIRkzQs9hi7hD7qzAuJvRMiBew4pqmj6g8frPMlEHQ3i8aIGPH9pMr_oPbfQ0bfZSWiSuGYYj35NSV1Q18lp3pTgS1hiWK8h9Lo6Dtr7VtpNEKdzNy9JrozKSgnwnW4',
  cafeAvatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAEVFHSGLC8Oe5hUoFDfE5TjV2A5XYpfsmuJ-dLgAVXjNZKFFms-1u4k9xWnyt9vlVFgan3KkS5BtkYUxKZeehMOPag_OaeCq_6EQJ7WvPL4osvEgvWooN_419oV9nnE9ZIElNY3cj8BimP2Bp7eA4TM5uGkNKstshjdsz0ikUGueGL4SEndEZ3EpLsw0lh6vTtHZU8m8eOKNjxzpQxqIsEZpEAsldcdPTq6fSTx4k',
  storyCafeArt:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCmzsPqMsnjzHr1HLYBMvUn3Vbf2QAL1FZSfh2C7D7vTRbCqE2RBJ3w2AEfyfMpg105-AxKWSth9-QAA7DgXrcRDEh2rOKOMhhQG-OJU_Fx9JhsfrB0xQMQAR1RO0A2P6u5bIb8LU1r1hiida3UKKmDidz5BYKeCaqeC5hH4Q57MjzOF_F1PZTp4rKkCB1Msy0Soz8SXcL56Bt_TzQOaPon5G7hhUwJAndgUd1AhZY',
  readerAvatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAunuO-Rh2DnKwnufwocfyak-V3Gw-3gFClRJPf6_MD4OeQ8PUxPlKt4FBf6vW9K8i1tTlbDx6n9Zf0ILhJb2mPzjScjEUdXfqB0pLxudr5KHAROE99FIVHwDcA7PHLn07uNtHhWlLy8Qa8xv1oiNcUFcQDhI6PGLYMfEQFB6nu7Gu9lisPO_a_CRYs73190RmEeXtd5WHMe4kRlq58QdsbMno1LIA2ChoQohrDUq0',
  arthurDossier:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDlr7zMrr0NUD9s7VDtIx6oHZyUxNgE8Un7KeXJ4tZ3B0G7CirsItT5HFELRt_8PaTC_-6PRTrqIl7k7L7Mb9C3vUnijyCXyzofed2k1TRz6A3c2s8dcWQq6DwQzqEDtHDRgJR8rfuydgrw6DBvEzOZdBHKM4I6Z2FdC6xh3Fbrwq1Hw509XE3ga5TyfPr-civXFE-48vfwtEbKEswwcTZG78gQKCoJq2Xl2HRgOWQ',
  julianDossier:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAUjCGw37xwPHHDfGPcfvUnUFQKUluavv6i29WScGB3bG8h6fCz8bvMRiRaYQWMhDPaEcsp6HH5BIs_oeaj9dRw_pBEHntz5UrFSc394F4eEAh_t6F1ZdWfURtB-k7bAZHtPdwodf0QBDJmlL-bhMUkZN_4EC16r7uryVzwJfPRQXsHJ4S1XITWDqsKCsPJnj_WYd999ntWZI8ZVj25PaTmj1gXOhhAMIIfutFsmqw',
};

export const DEFAULT_SETTINGS: AppSettings = {
  defaultStudioTheme: 'theme-strawberry',
  defaultWoodTone: 'oak',
  defaultReaderTint: 'parchment',
  defaultReaderFont: 'serif',
  defaultReaderScale: 100,
  autosaveMinutes: 2,
  penName: 'Elena Vance',
  levelLabel: 'Kreator AU • Level 4',
};
