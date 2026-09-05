export type Chapter = {
  index: string;
  era: string;
  years: string;
  quote: string;
  image: string;
  stat: string;
  accent: string;
  redCard?: boolean;
};

export type Frame = {
  src: string;
  caption: string;
  alt: string;
};

export type Stat = {
  value: number;
  label: string;
  emphasis?: boolean;
};

const base = '/goat';

export const chapters: Chapter[] = [
  {
    index: '01 / 05',
    era: 'ROSARIO',
    years: '1987 – 2004',
    quote: 'Where it began. A boy, a hormone condition, and a promise from Barcelona.',
    image: `${base}/assest/timeline/rosario.jpg`,
    stat: "Newell's Old Boys · 500 goals by age 11",
    accent: '#EBEBEB',
  },
  {
    index: '02 / 05',
    era: 'BARCELONA',
    years: '2004 – 2021',
    quote:
      'Seventeen years. Four Champions Leagues. Ten La Ligas. The greatest club career the sport has ever produced.',
    image: `${base}/assest/timeline/barcelona.jpg`,
    stat: '672 Goals & Assists in 778 appearances',
    accent: '#A8C5D8',
    redCard: true,
  },
  {
    index: '03 / 05',
    era: 'PARIS',
    years: '2021 – 2023',
    quote:
      'A bridge, not a destination. The detour that made the destination sweeter.',
    image: `${base}/assest/timeline/paris.jpg`,
    stat: 'World Cup Winner, Qatar 2022',
    accent: '#E8C547',
  },
  {
    index: '04 / 05',
    era: 'MIAMI',
    years: '2023 – Present',
    quote:
      "He didn't retire from football. He brought football somewhere it had never truly been.",
    image: `${base}/assest/timeline/miami.webp`,
    stat: 'MLS · Leagues Cup Winner · 2024',
    accent: '#F4B8CB',
  },
  {
    index: '05 / 05',
    era: 'ARGENTINA',
    years: '2005 – Present',
    quote:
      'Copa América. Copa América. Copa América. Finalissima. World Cup. He won everything. Then he won it all again.',
    image: `${base}/assest/timeline/argentina.jpg`,
    stat: 'Copa América ×3 · World Cup 2022',
    accent: '#A8C5D8',
  },
];

export const frames: Frame[] = [
  {
    src: `${base}/assest/gallery/messi-portrait.jpg`,
    caption: 'The Genius, at rest',
    alt: 'Lionel Messi in a contemplative portrait pose',
  },
  {
    src: `${base}/assest/gallery/messi-barcelona-dribbling.jpg`,
    caption: 'Camp Nou, 2011. Three defenders. Zero chance.',
    alt: 'Messi dribbling past three Barcelona defenders',
  },
  {
    src: `${base}/assest/gallery/messi-barcelona-free-kick.jpg`,
    caption: 'The left foot that rewrote the physics of the ball.',
    alt: 'Messi striking a free kick in Barcelona colors',
  },
  {
    src: `${base}/assest/gallery/messi-barcelona-celebration.jpg`,
    caption: 'Barcelona. Home.',
    alt: 'Messi celebrating a goal at Camp Nou',
  },
  {
    src: `${base}/assest/gallery/messi-goat-barcelona-poster.jpg`,
    caption: 'The verdict, before it was officially rendered.',
    alt: 'A poster declaring Messi the greatest of all time',
  },
  {
    src: `${base}/assest/gallery/messi-argentina-world-cup-kiss.jpg`,
    caption: 'Qatar, December 18, 2022. The kiss.',
    alt: 'Messi kissing the FIFA World Cup trophy',
  },
  {
    src: `${base}/assest/gallery/messi-argentina-celebration-pointing.jpg`,
    caption:
      'For Argentina. For every version of himself that did not win it yet.',
    alt: 'Messi pointing to the sky in Argentina celebration',
  },
  {
    src: `${base}/assest/gallery/messi-kissing-world-cup.jpg`,
    caption: 'Finally.',
    alt: 'A close portrait of Messi kissing the World Cup trophy',
  },
  {
    src: `${base}/assest/gallery/messi-inter-miami-back.jpg`,
    caption: 'Miami. A new chapter on his own terms.',
    alt: 'Messi from behind in Inter Miami training kit',
  },
  {
    src: `${base}/assest/gallery/messi-inter-miami-training.jpg`,
    caption: 'Still working. Always.',
    alt: 'Messi training with Inter Miami',
  },
  {
    src: `${base}/assest/gallery/messi-boots-close-up.jpg`,
    caption: 'The instrument. Not the musician.',
    alt: 'Close-up of golden Messi match boots',
  },
];

export const stats: Stat[] = [
  { value: 843, label: 'Goals' },
  { value: 8, label: 'Ballon d\'Or' },
  { value: 4, label: 'UCL' },
  { value: 1, label: 'World Cup', emphasis: true },
  { value: 672, label: 'Assists' },
  { value: 10, label: 'La Liga' },
  { value: 3, label: 'Copa América' },
];

export const argumentQuote =
  'He is not the best of his generation. He is the best there has ever been.';

export const argumentAttribution = 'Pep Guardiola';

export const trophies: Array<{ name: string; count: string; years: string }> = [
  { name: 'Copa América', count: '× 3', years: '2021 · 2024 · 2024' },
  { name: 'FIFA World Cup', count: '× 1', years: 'Qatar 2022' },
  { name: 'UEFA Champions League', count: '× 4', years: '2006 · 2009 · 2011 · 2015' },
];

export const navLinks = [
  { label: 'Numbers', href: '#numbers' },
  { label: 'Chapters', href: '#chapters' },
  { label: 'Frames', href: '#frames' },
  { label: 'Legacy', href: '#argument' },
];