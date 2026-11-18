export type NavRoute =
  | 'bookshelf'
  | 'create-au-studio'
  | 'plot-tracker'
  | 'reading-lounge'
  | 'settings-and-theme';

export type ShelfCategory = 'all' | 'coffee' | 'academia' | 'floral' | 'radio' | string;

export type WoodToneId = 'oak' | 'walnut' | 'birch';

export type StudioThemeId =
  | 'theme-strawberry'
  | 'theme-vintage'
  | 'theme-lavender'
  | 'theme-matcha';

export type ReaderTintId = 'parchment' | 'rose' | 'midnight';
export type ReaderFontId = 'serif' | 'sans' | 'mono';

export interface BookChapterSummary {
  number: number;
  title: string;
  formatLabel: string;
  wordCount: number;
  status: 'Diterbitkan' | 'Menulis';
  icon: string;
}

export interface BookItem {
  id: string;
  title: string;
  shortTitle: string;
  shelfTier: 'upper' | 'lower';
  category: string;
  categoryBadge: string;
  statusBadge: string;
  authorLine: string;
  sub: string;
  detailBadge: string;
  readersCount: string;
  chapterLabel: string;
  coverUrl: string;
  fallbackCoverUrl: string;
  coverAlt: string;
  gradientClass: string;
  textColorClass: string;
  subTextColorClass: string;
  ribbonColorClass: string;
  badgeClass: string;
  footerClass: string;
  tropes: string[];
  synopsis: string;
  paletteColors: { hex: string; name: string }[];
  chapters: BookChapterSummary[];
  progressPercent: number;
  darkCover?: boolean;
}

export interface ChatBubbleItem {
  id: string;
  senderName: string;
  isRight: boolean;
  text: string;
  timestamp: string;
  kind: 'text' | 'voice';
  voiceDuration?: string;
}

export interface StoryPollOption {
  id: string;
  label: string;
  votes: number;
  isAccent?: boolean;
}

export interface TwitterBlock {
  id: string;
  type: 'twitter';
  order: number;
  authorName: string;
  handle: string;
  bioLine: string;
  verified: boolean;
  avatarUrl: string;
  fallbackAvatarUrl: string;
  content: string;
  mediaUrl?: string;
  fallbackMediaUrl?: string;
  mediaCaption?: string;
  timestamp: string;
  deviceLabel: string;
  replies: number;
  retweets: string;
  likes: number;
  bookmarks: string;
  threadNotes: string[];
  showThreadCount: boolean;
  showMetrics: boolean;
}

export interface ChatBlock {
  id: string;
  type: 'chat';
  order: number;
  partnerName: string;
  partnerAvatar: string;
  fallbackPartnerAvatar: string;
  partnerStatus: string;
  dateDivider: string;
  activeSenderRight: string;
  messages: ChatBubbleItem[];
}

export interface StoryBlock {
  id: string;
  type: 'story';
  order: number;
  handle: string;
  timeAgo: string;
  avatarUrl: string;
  fallbackAvatarUrl: string;
  backgroundUrl: string;
  fallbackBackgroundUrl: string;
  musicTrack: string;
  pollQuestion: string;
  pollOptions: StoryPollOption[];
  votedOptionId?: string;
  caption: string;
  viewsLabel: string;
}

export interface ProseBlock {
  id: string;
  type: 'prose';
  order: number;
  paragraphs: string[];
  quotedLine: string;
  useDropCap: boolean;
  authorMarginNote: string;
}

export type AuBlock = TwitterBlock | ChatBlock | StoryBlock | ProseBlock;

export interface CharacterDossierItem {
  id: string;
  name: string;
  roleBadge: string;
  roleBadgeClass: string;
  bio: string;
  avatarUrl: string;
  fallbackAvatarUrl: string;
  traits: string[];
}

export interface MoodboardPin {
  id: string;
  label: string;
  imageUrl: string;
  fallbackImageUrl: string;
  alt: string;
}

export interface PlotBranchOption {
  id: string;
  routeLabel: string;
  routeTone: 'secondary' | 'tertiary';
  icon: string;
  title: string;
  description: string;
  noteDetail: string;
}

export interface PlotNode {
  id: string;
  numberLabel: string;
  actBadge: string;
  chapterRange: string;
  status: 'Selesai' | 'Fokus Menulis Aktif' | 'Garis Besar Draf' | 'Pilihan Bercabang' | 'Akhir Bahagia Kanon';
  title: string;
  description: string;
  povLabel?: string;
  wordProgress?: string;
  wordPercent?: string;
  formatLabel?: string;
  moodLabel?: string;
  targetWords?: string;
  branches?: PlotBranchOption[];
  selectedBranchId?: string;
  insertedBeats?: string[];
}

export interface AiSuggestion {
  id: string;
  toneBadge: string;
  toneStyle: 'secondary' | 'tertiary' | 'neutral';
  icon: string;
  text: string;
}

export interface PostcardComment {
  id: string;
  author: string;
  avatarUrl: string;
  fallbackAvatarUrl: string;
  badge?: string;
  meta: string;
  body: string;
  likes: number;
  liked?: boolean;
  authorReply?: {
    author: string;
    timeAgo: string;
    body: string;
  };
}

export interface ReaderHighlightNote {
  id: string;
  handle: string;
  paragraphLabel: string;
  quote: string;
  agrees: number;
  agreed?: boolean;
  highlight?: boolean;
}

export interface AppSettings {
  defaultStudioTheme: StudioThemeId;
  defaultWoodTone: WoodToneId;
  defaultReaderTint: ReaderTintId;
  defaultReaderFont: ReaderFontId;
  defaultReaderScale: number;
  autosaveMinutes: number;
  penName: string;
  levelLabel: string;
}
