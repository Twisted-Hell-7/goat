// Content extracted from MESSI_CONTENT_BIBLE.md — rendered after the Legacy (#argument) section.
export const vitals: { label: string; value: string }[] = [
  { label: 'Full name', value: 'Lionel Andrés Messi Cuccitini' },
  { label: 'Born', value: '24 June 1987 · Rosario, Santa Fe, Argentina' },
  { label: 'Height', value: '1.70 m (5 ft 7 in)' },
  { label: 'Position', value: 'Forward / Attacking Midfielder' },
  { label: 'Foot', value: 'Left' },
  { label: 'Nickname', value: 'La Pulga (The Flea), Leo' },
  { label: 'Shirts', value: '10 (Barça, Argentina) · 30 (PSG) · 10 (Miami)' },
  { label: 'Club', value: 'Inter Miami CF' },
  { label: 'Country', value: 'Argentina — captain' },
];

export const masterTable: { label: string; value: string }[] = [
  { label: 'Career appearances', value: '1,150+' },
  { label: 'Career goals', value: '900+' },
  { label: 'Career assists', value: '400+' },
  { label: 'Goals + assists', value: '1,300+' },
  { label: 'Major trophies', value: '48' },
  { label: 'Minutes per contribution', value: '~71 min' },
  { label: 'Hat-tricks', value: '57' },
  { label: 'Guinness World Records', value: '50+' },
];

export const clubTable: { club: string; years: string; apps: string; goals: string; assists: string }[] = [
  { club: "Newell's Old Boys (youth)", years: '1993–2000', apps: '—', goals: '~500 (youth)', assists: '—' },
  { club: 'Barcelona', years: '2004–2021', apps: '778', goals: '672', assists: '303+' },
  { club: 'Paris Saint-Germain', years: '2021–2023', apps: '75', goals: '32', assists: '35' },
  { club: 'Inter Miami CF', years: '2023–present', apps: '80+', goals: '70+', assists: '40+' },
];

export const argentinaTable: { comp: string; apps: string; goals: string; assists: string }[] = [
  { comp: 'Total caps', apps: '207', goals: '125', assists: '65' },
  { comp: 'World Cup (total)', apps: '34', goals: '21', assists: '12' },
  { comp: 'Copa América', apps: '39', goals: '14', assists: '18' },
  { comp: 'World Cup Qualifying', apps: '72', goals: '36', assists: '12' },
  { comp: 'Olympics', apps: '5', goals: '2', assists: '3' },
  { comp: 'U-20 World Cup', apps: '7', goals: '6', assists: '2' },
];

export const trophyGroups: { team: string; items: string[] }[] = [
  {
    team: 'Barcelona',
    items: [
      'La Liga ×10 — 2004–05, 2005–06, 2008–09, 2009–10, 2010–11, 2012–13, 2014–15, 2015–16, 2017–18, 2018–19',
      'Champions League ×4 — 2005–06, 2008–09, 2010–11, 2014–15',
      'Copa del Rey ×7 — 2008–09, 2011–12, 2014–15, 2015–16, 2016–17, 2017–18, 2020–21',
      'UEFA Super Cup ×3 — 2009, 2011, 2015',
      'Club World Cup ×3 — 2009, 2011, 2015',
      'Supercopa ×8',
    ],
  },
  {
    team: 'Paris Saint-Germain',
    items: ['Ligue 1 ×2 — 2021–22, 2022–23', 'Trophée des Champions ×1 — 2022'],
  },
  {
    team: 'Inter Miami',
    items: ['Leagues Cup ×1 — 2023', 'MLS Cup ×1'],
  },
  {
    team: 'Argentina',
    items: [
      'FIFA World Cup ×1 — Qatar 2022',
      'Copa América ×3 — 2021, 2024 ×2',
      'U-20 World Cup ×1 — 2005',
      'Olympic Gold ×1 — Beijing 2008',
      'Finalissima ×1 — 2022',
    ],
  },
];

export const awards: { name: string; detail: string }[] = [
  { name: "Ballon d'Or ×8", detail: '2009 · 2010 · 2011 · 2012 · 2015 · 2019 · 2021 · 2023 — all-time record' },
  { name: 'FIFA Best ×3', detail: '2019 · 2022 · 2023' },
  { name: 'World Cup Golden Ball ×2', detail: '2014 + 2022 — only player ever. Golden Boot 2022, Silver Boot 2014' },
  { name: 'European Golden Shoe ×6', detail: '2009–10 · 2011–12 · 2012–13 · 2013–14 · 2016–17 · 2018–19 — record' },
  { name: 'LaLiga Best Player ×9', detail: 'Top scorer + Best Forward, multiple seasons' },
  { name: 'UCL top scorer ×6', detail: 'UEFA Best Player in Europe 2011' },
  { name: 'MLS MVP ×2', detail: '2024, 2025 · MLS Best XI ×2' },
  { name: 'Copa América Best ×2', detail: '2021, 2024 · South American Footballer of the Year ×13' },
  { name: 'FIFPRO World XI ×17', detail: 'Record · UEFA Team of the Year ×11' },
  { name: 'Laureus ×2', detail: 'World Sportsman of the Year 2020, 2023' },
];

export const guinness: { title: string; items: string[] }[] = [
  {
    title: 'Scoring',
    items: [
      '91 goals in a calendar year (2012) — most ever',
      '73 goals in a club season (2011–12) — record',
      '474 La Liga goals — all-time top scorer',
      '672 goals for one club — all-time record',
      '36 La Liga hat-tricks · 57 career hat-tricks',
      'Scored in 21 straight La Liga matches (33 goals, 2012–13)',
    ],
  },
  {
    title: 'World Cup',
    items: [
      '18 goals — all-time record · 28 matches — record',
      '18 wins · 2,489 minutes — records',
      '11 Man of the Match awards — record',
      'Only player to score at 6 World Cups, assist at 5',
      '19 appearances as captain — record',
    ],
  },
  {
    title: "Ballon d'Or / Assists / Other",
    items: [
      "8 Ballon d'Or — record, across three decades",
      '384 documented assists — most in history · 192 in La Liga — record',
      '50+ Guinness records held by one footballer',
      '75M+ likes — most-liked Instagram post in history',
    ],
  },
];

export const goalsByYear: { year: number; total: number }[] = [
  { year: 2005, total: 3 }, { year: 2006, total: 12 }, { year: 2007, total: 31 },
  { year: 2008, total: 22 }, { year: 2009, total: 41 }, { year: 2010, total: 60 },
  { year: 2011, total: 59 }, { year: 2012, total: 91 }, { year: 2013, total: 45 },
  { year: 2014, total: 58 }, { year: 2015, total: 52 }, { year: 2016, total: 59 },
  { year: 2017, total: 54 }, { year: 2018, total: 55 }, { year: 2019, total: 49 },
  { year: 2020, total: 33 }, { year: 2021, total: 40 }, { year: 2022, total: 36 },
  { year: 2023, total: 37 }, { year: 2024, total: 55 }, { year: 2025, total: 56 },
];

export const singleNumbers: { value: string; label: string; note: string }[] = [
  { value: '91', label: 'Goals in 2012', note: 'One year.' },
  { value: '8', label: "Ballon d'Or", note: 'No one else has 5.' },
  { value: '672', label: 'Goals for one club', note: 'One club.' },
  { value: '18', label: 'World Cup goals', note: 'The record. Forever.' },
];

export const iconicMoments: { date: string; title: string; body: string }[] = [
  { date: 'Dec 14, 2000', title: 'The Napkin Contract', body: 'Age 13, on trial. Carles Rexach writes the offer on a paper napkin at the Pompeia tennis club rather than let him leave. Sold at auction in 2024 for £762,400.' },
  { date: 'May 1, 2005', title: 'First senior goal', body: 'Vs Albacete — a Ronaldinho lob, a 16-yard chip at 17. He runs to embrace Ronaldinho: boy to heir.' },
  { date: 'Mar 10, 2007', title: 'First Clásico hat-trick', body: 'Age 19. Three goals in a 3–3 draw at the Bernabéu. A household name worldwide overnight.' },
  { date: 'Apr 18, 2007', title: 'The Getafe goal', body: 'Own half, five defenders, round the keeper, 60 yards. Voted Barcelona’s greatest goal ever — Maradona ’86, reborn.' },
  { date: 'May 27, 2009', title: 'Rome header', body: 'Rises above Ferdinand to head Xavi’s cross vs Manchester United. Pep’s first crown. Messi’s first European title.' },
  { date: 'Mar 7, 2012', title: 'Five vs Leverkusen', body: 'Five goals in 91 minutes, 7–1. The night football ran out of adjectives.' },
  { date: 'Dec 22, 2012', title: '91 in a year', body: 'Final goal at Valladolid breaks Gerd Müller’s 40-year record (85, 1972). 91 in 69 games for club and country.' },
  { date: 'May 1, 2019', title: 'Free kick vs Liverpool', body: '30 yards, top corner. Alisson doesn’t move. 3–0 at Camp Nou.' },
  { date: 'Dec 18, 2022', title: 'The World Cup final', body: 'Two goals, extra-time strike, converted penalty vs France. Lifts the trophy. 75M+ Instagram likes — most in history. Second Golden Ball — only player ever.' },
  { date: '2026', title: 'The 6th World Cup', body: 'Age 38–39. Most goals (18), matches (28), wins (18), minutes (2,489). Six tournaments, one standard.' },
];

export const argentinaArc: { year: string; event: string; state: string; won: boolean }[] = [
  { year: '2006', event: 'World Cup — QF exit', state: 'Age 18, bit-part', won: false },
  { year: '2007', event: 'Copa América — final loss vs Brazil', state: 'Devastated', won: false },
  { year: '2010', event: 'World Cup — QF vs Germany', state: 'Carried team alone', won: false },
  { year: '2014', event: 'World Cup — final loss (AET)', state: 'Golden Ball, silver heartbreak', won: false },
  { year: '2015', event: 'Copa América — final loss (pens)', state: 'Wept on pitch', won: false },
  { year: '2016', event: 'Copa América — final loss (pens)', state: 'Retired at 29, back in 23 days', won: false },
  { year: '2021', event: 'Copa América — WIN vs Brazil', state: 'First title. Age 34. Cried.', won: true },
  { year: '2022', event: 'Finalissima — WIN 3–0 vs Italy', state: '', won: true },
  { year: '2022', event: 'World Cup — WIN vs France', state: 'Greatest moment in football history', won: true },
  { year: '2024', event: 'Copa América — WIN again', state: '', won: true },
];

export const humanStories: { title: string; body: string }[] = [
  { title: 'The Needle', body: 'Age 11 to 14 he injected growth hormone into his own legs. Every night. Seven days a week. Three years. $1,000 a month a working-class Rosario family could not afford — until Barcelona paid it all.' },
  { title: 'The Napkin', body: 'A cold December night in 2000. Without Rexach’s scribble Messi might have gone to Madrid, stayed home, vanished. 24 years later that napkin sells for nearly $1 million.' },
  { title: 'The Homesickness', body: 'Mother and siblings back in Rosario; a 14-year-old alone with his father in Barcelona. He cried, called home nightly, poured everything into football because there was nothing else.' },
  { title: 'The 2016 Retirement', body: 'Three lost finals (2014 WC, 2015 + 2016 Copa). Retired at 29. The country begged. 23 days later he returned — then won everything, twice.' },
  { title: "The Machine of '87", body: 'His Newell’s youth side won 12 tournaments in a row, lost once in six years. Messi scored ~500 youth goals before one diagnosis nearly ended it.' },
  { title: 'Ronaldinho’s Gift', body: 'The superstar befriended the kid instantly: “he’ll be better than me.” First senior goal? A Ronaldinho assist.' },
  { title: 'The Sweetheart', body: 'Antonela Roccuzzo — same Rosario street, known since age 5. Reconnected at 20, married 2017. Thiago (2012), Mateo (2015), Ciro (2018).' },
  { title: 'The Heartbreak', body: '2007–2021: ten finals or semis, zero wins. Wept, retired, unretired. Then 2021 Copa, 2022 Finalissima, 2022 World Cup, 2024 Copa. The greatest comeback in football.' },
];

export const messiQuotes: string[] = [
  'My ambition is always to get better and better.',
  'Just give me a ball and some space to play.',
  'You have to fight to reach your dream. You have to sacrifice and work hard for it.',
  'It took me 17 years and 114 days to become an overnight success.',
  'WORLD CHAMPIONS!!!!!!!! I dreamed of this so many times. I still haven’t fallen, I can’t believe it.',
];

export const voicesQuotes: { text: string; by: string }[] = [
  { text: 'He is not the best of his generation. He is the best there has ever been.', by: 'Pep Guardiola' },
  { text: 'Messi is the best player in history. He makes me cry.', by: 'Diego Maradona' },
  { text: 'I have seen the player who will inherit my place and his name is Lionel Messi.', by: 'Ronaldo (R9)' },
  { text: 'Leo is like a PlayStation. You can’t stop him.', by: 'Xavi Hernández' },
  { text: 'Without doubt, the best player I have ever seen.', by: 'Sir Alex Ferguson' },
  { text: 'He is a genius. You can’t defend him. You just admire him.', by: 'Sergio Busquets' },
  { text: 'Leo is the most complete player in history.', by: 'Johan Cruyff' },
];

export const personalFacts: string[] = [
  'Favourite food: Milanesa · Drink: Mate',
  'Speaks Spanish, fluent Catalan, basic English',
  'Points to the sky — Roman Catholic, for his grandmother Celia',
  'Right foot first onto the pitch, every time',
  'Sleeve tattoo: Thiago’s eyes, Jesus, rosary, clasped hands',
  'Wedding: June 30, 2017, Rosario — Neymar, Suárez, Piqué, Shakira',
  'Music: cumbia, Argentine folk, some reggaeton',
  'Idols: Ronaldo R9 + Maradona — became the fusion of both',
  'Family in Miami · Thiago in the Inter Miami academy',
];

export const foundation: string[] = [
  'Founded 2007 — healthcare + education for underprivileged children',
  'Operates in Argentina and Spain — schools, hospitals, treatment access',
  'Antonela actively involved · Partners: UNICEF, Josep Carreras Foundation',
  'One of the largest athlete foundations in sport',
];

export const dates: { date: string; event: string }[] = [
  { date: 'Jun 24, 1987', event: 'Born, Rosario' },
  { date: '1993', event: 'Joins Newell’s youth' },
  { date: '1997', event: 'Diagnosed: growth hormone deficiency' },
  { date: 'Dec 14, 2000', event: 'Napkin contract, Barcelona trial' },
  { date: 'May 1, 2005', event: 'First senior goal vs Albacete' },
  { date: 'Apr 18, 2007', event: 'The Getafe goal' },
  { date: 'Nov 2009', event: 'First Ballon d’Or' },
  { date: 'Dec 22, 2012', event: '91st goal — world record' },
  { date: 'Jun 2016', event: 'Retires, returns 23 days later' },
  { date: 'Jun 30, 2017', event: 'Marries Antonela in Rosario' },
  { date: 'Jul 2021', event: 'Forced Barça exit · Wins Copa América' },
  { date: 'Dec 18, 2022', event: 'Wins World Cup, Qatar' },
  { date: 'Oct 2023', event: '8th Ballon d’Or' },
  { date: 'Jul 2023', event: 'Joins Inter Miami' },
  { date: '2026', event: '6th World Cup — all records broken' },
];
