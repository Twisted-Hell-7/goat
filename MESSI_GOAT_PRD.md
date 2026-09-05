# PRD — LIONEL MESSI: A Living Archive of the Impossible
**Version:** 2.0 | **Status:** Ready for Development

---

## 1. Vision

This is not a fan website.

It is a **digital monument** — the kind of immersive web experience that gets featured on Awwwards, shared by designers on X, and screenshotted by people who don't even watch football. The kind where someone opens a link on their phone, 40 seconds later they're sitting down because they weren't expecting it to feel like *that*.

The premise: imagine a studio like Locomotive, Active Theory, or DEPT® was commissioned by an unnamed patron to build the definitive digital record of the greatest athlete who ever lived. No budget constraints. No brand guidelines. Just: make the world feel the weight of this man's existence.

**Aesthetic:** Brutalist editorial meets cinematic dark luxury. Not gold-on-black sports cliché. Something stranger, more precise — the visual language of a football almanac printed in obsidian, lit from within.

**Primary experience:** You scroll once. The video pulls you in. By the time you reach the bottom you've lived through 37 years of the most decorated career in football history. You don't read it. You *feel* it.

---

## 2. Naming & Identity

**Site title:** `MESSI` — nothing else. One word. No tagline.  
**URL slug:** `messi` (repo name → GitHub Pages: `username.github.io/messi`)  
**Tab title:** `MESSI — The Living Archive`  
**Favicon:** Minimal gold `10` in Bebas Neue on black (his Barcelona shirt number)

No "fan site." No "tribute." No disclaimers on the page surface. The work speaks.

---

## 3. Tech Stack

### Core
| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 14** (App Router) | Static export, file-based routing |
| Styling | **Tailwind CSS v3** + CSS custom properties | Utility-first + design token control |
| Animation | **GSAP 3** + **ScrollTrigger** + **SplitText** | Timeline control, scrub, text split |
| Smooth Scroll | **Lenis v1** | Inertia scroll, GSAP ticker sync |
| 3D | **Three.js** via `@react-three/fiber` | Particle field, geometry in hero |
| Post-processing | **@react-three/postprocessing** | Bloom on particles for glow |
| Fonts | **Druk Wide** (display) + **Editorial New** italic (pull quotes) + **Inter** (body) | Bold condensed sports editorial meets editorial elegance |
| Cursor | Custom magnetic cursor | Replaces default, reacts to links/images |
| Video | Native HTML5 `<video>` | No dep, autoplay muted loop |
| Deploy | **GitHub Pages** via `gh-pages` | Static export push |

> **Font fallback note:** Druk Wide requires license. If unavailable: use **Bebas Neue** as display + **Playfair Display Italic** for pull quotes. Same intent, no license cost.

### Dev Tooling
- TypeScript strict mode
- `eslint` + `prettier` + `husky` pre-commit
- `@gsap/react` for context-safe GSAP in React 18
- `next.config.js`: `output: 'export'`, `basePath: '/messi'`, `images.unoptimized: true`

---

## 4. Design System

### 4.1 Color Palette — "Pitch Dark"

```
--void:          #030303   ← absolute base. Not #111. Not #0B0B0B. #030303.
--obsidian:      #0D0D0D   ← section alternates, cards
--chalk:         #EBEBEB   ← primary text — slightly warm white, not pure
--chalk-dim:     #6B6B6B   ← secondary text, captions
--gold-electric: #E8C547   ← accent — not FFD700. Slightly cooler, less cliché
--gold-ghost:    rgba(232,197,71,0.08)  ← section bg tints
--gold-glow:     rgba(232,197,71,0.35) ← particle bloom color
--scar-red:      #C0392B   ← used ONCE — the 2006 World Cup red card moment
--ice-blue:      #A8C5D8   ← Argentina kit reference, used sparingly
```

**Rule:** Gold is used surgically. Max 3 elements per screen can be gold simultaneously. Everything else is chalk on void.

### 4.2 Typography

```
Display / Hero:    Druk Wide Bold — "MESSI", section titles
                   Character: condensed, brutal, sports-editorial
                   Size: clamp(72px, 14vw, 220px)

Pull Quotes:       Editorial New Italic — chapter quotes, legacy text
                   Size: clamp(28px, 3.5vw, 56px) / line-height: 1.1

Data / Numbers:    Druk Wide — stat counters, year labels
                   Tabular nums: font-variant-numeric: tabular-nums

Body:              Inter 400 — captions, descriptions
                   Size: 15px / line-height: 1.7 / color: chalk-dim
                   Max-width: 52ch

Nav:               Inter 500, 12px, letter-spacing: 0.12em
```

**Typographic rule:** Zero all-caps on body text. Zero bold italic combos. Zero gradient text on display. The type is confident enough without tricks.

### 4.3 Motion Principles

```
Philosophy: Motion is consequence, not decoration.
            Something moved because the user did something.
            Or because time passed. Never "just because."

Core rules:
  - One orchestrated climax per section. Everything else supports it.
  - Scrub-tied animations feel like physics, not choreography.
  - No bounce ease. No spring on text. Expo.out, power3.out, none.
  - Lenis lerp: 0.075 — noticeable inertia, not sluggish.
  - All GSAP wrapped in matchMedia for reduced-motion.

Signature moves (use max once each across the page):
  1. Text clip-path reveal: clip from bottom, letters emerge from ground
  2. Image parallax: image moves at 0.6× scroll speed inside fixed container
  3. Horizontal scrub panel: vertical scroll = horizontal travel
  4. Number morph: stat counts up with mechanical precision
  5. Word opacity scrub: quote illuminates word by word as user scrolls
  6. Particle scatter: particles explode outward on section transition
```

### 4.4 Cursor

Custom cursor replaces system default across desktop:
- Default: 12px chalk circle, no fill, 1px border
- On link/button hover: expands to 48px, fills with `gold-ghost`, shows label
- On image hover: morphs into `[ VIEW ]` text cursor
- On video: shows `[ PLAYING ]` static label
- Implemented via `position: fixed`, `pointer-events: none`, GSAP lerp follow

---

## 5. Site Architecture

```
/
├── Hero             ← video + particles + title emergence
├── Numbers          ← stat counter grid
├── Chapters         ← horizontal scroll timeline (pinned)
├── Frames           ← gallery (masonry, lightbox)
├── The Argument     ← editorial legacy section
├── The Moment       ← single full-bleed World Cup focus
└── Coda             ← footer / closing
```

All single-page. No client routing. Lenis scroll anchors.

---

## 6. Section Specifications

---

### 6.1 HERO

**Assets:** `messi-hero-video.mp4`, `goat-poster.jpg`

#### The Experience
Page loads → black screen → 600ms hold → video cross-fades in from black (not a hard cut) → particles emerge from video surface → title crashes in from below → ambient gold glow pulses once → freezes into resting state → scroll cue appears.

The video plays behind everything. The user can't interact with it. It's scenery. The real action is the title.

#### Visual Stack (bottom → top)
```
z:0   video — full viewport, object-fit: cover, 40% opacity reduced by overlay
z:10  overlay — radial gradient: transparent center → #030303 edges + bottom 50% solid to void
z:20  Three.js canvas — particles emerge FROM the video surface (appear to float off it)
z:30  title block — centered, bottom-third of viewport
z:40  nav — fixed, transparent
```

#### Title Layout
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│                                                             │
│   M  E  S  S  I                                             │
│   ─────────────────────── 100vw, justify: space-between     │
│                                                             │
│         LIONEL ANDRÉS MESSI · ROSARIO, 1987                 │
│         ← 13px, Inter, chalk-dim, tracked ──────────────→   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- "MESSI" — Druk Wide, `100vw` width, letters spaced to fill exact viewport width
- Each letter is a `<span>`. GSAP stagger: `y: 160 → 0`, `clipPath: inset(100% 0 0 0) → inset(0%)`, `duration: 1.4`, `ease: expo.out`, `stagger: 0.06`
- Text color: chalk. No gold on the title itself. Gold is reserved for what's earned.
- Subtitle line: `opacity: 0 → 1` after title completes, `duration: 0.8`

#### Three.js Particle System — "Ember Field"
- 1,200 particles. Point geometry, `#E8C547` with bloom (`@react-three/postprocessing` Bloom, luminanceThreshold: 0.4)
- Particles spawn at video midplane, drift upward and slightly toward camera
- Mouse: raycaster shifts particle cluster subtly — felt not seen
- On scroll past hero: `gsap.to(particles.position, { y: -8, opacity: 0, stagger: ... })` — they fall away downward, not scatter up

#### Scroll Cue
- Not a chevron. A single thin vertical line, 48px tall, gold, `scaleY: 1 → 0` pulse animation, 2s loop
- Disappears permanently after first scroll (ScrollTrigger `once: true`)

---

### 6.2 NUMBERS

*Not a stats section. A moment of reckoning.*

#### Layout
```
┌───────────────────────────────────────────────────────┐
│                                                       │
│   843        8×           4           1               │
│   Goals    Ballon d'Or   UCL     World Cup            │
│                                                       │
│        672        10           3                      │
│       Assists   La Liga    Copa América               │
│                                                       │
└───────────────────────────────────────────────────────┘
```

Staggered grid — not uniform. Numbers at different sizes. `843` is biggest. `1` (World Cup) is gold. Everything else: chalk.

#### Animation
- Section enters: grid is invisible
- Each number counts up from 0 with `gsap snap: { textContent: 1 }`
- Numbers don't all start simultaneously — stagger offset: 0.15s each
- When a number finishes counting: its label fades in below it
- The `1` (World Cup) finishes last, 0.8s after all others. Lands in silence. No fanfare — that's the fanfare.

#### Background
- Very faint repeating diagonal hatching pattern (`background-image: repeating-linear-gradient`) at 3% opacity — like graph paper. Barely visible. Gives texture without decoration.

---

### 6.3 CHAPTERS — Horizontal Scroll Timeline

**Assets:** `rosario.jpg`, `barcelona.jpg`, `paris.jpg`, `miami.webp`, `argentina.jpg`

#### Mechanism
```
Section is pinned via ScrollTrigger.
User scrolls DOWN → timeline track moves LEFT → 5 era panels scroll into view.
Total horizontal travel = track.scrollWidth - window.innerWidth.
scrub: 1.5 — slight lag for cinematic weight.
```

#### Chapter Panel Layout (each panel = 100vw × 100vh)
```
┌───────────────────────────────────────────────────────────┐
│  [image — fills right 60% of panel, parallax 0.7×]       │
│                                                           │
│  [left 40% — content]                                     │
│  ┌────────────────────────┐                               │
│  │ 01 / 05                │ ← chapter index, chalk-dim   │
│  │                        │                               │
│  │ ROSARIO                │ ← Druk Wide, 96px, chalk     │
│  │                        │                               │
│  │ 1987 – 2004            │ ← gold-electric, 14px        │
│  │                        │                               │
│  │ "Where it began.       │ ← Editorial New italic       │
│  │  A boy, a hormone      │   28px, chalk                │
│  │  condition, a promise."│                               │
│  │                        │                               │
│  │ [————] KEY STAT [————] │ ← gold hairline + stat pill  │
│  └────────────────────────┘                               │
└───────────────────────────────────────────────────────────┘
```

Image parallax: image container is `overflow: hidden`, image inside moves at `0.7×` the panel travel speed → depth effect without 3D.

#### Chapter Data
```ts
const chapters = [
  {
    index: "01 / 05",
    era:   "ROSARIO",
    years: "1987 – 2004",
    quote: "Where it began. A boy, a hormone condition, and a promise from Barcelona.",
    image: "/assest/timeline/rosario.jpg",
    stat:  "Newell's Old Boys · 500 goals by age 11",
    accent: "#EBEBEB",
  },
  {
    index: "02 / 05",
    era:   "BARCELONA",
    years: "2004 – 2021",
    quote: "Seventeen years. Four Champions Leagues. Ten La Ligas. The greatest club career the sport has ever produced.",
    image: "/assest/timeline/barcelona.jpg",
    stat:  "672 Goals & Assists in 778 appearances",
    accent: "#A8C5D8",  // barca-adjacent, not their exact blue
  },
  {
    index: "03 / 05",
    era:   "PARIS",
    years: "2021 – 2023",
    quote: "A bridge, not a destination. The detour that made the destination sweeter.",
    image: "/assest/timeline/paris.jpg",
    stat:  "World Cup Winner, Qatar 2022",
    accent: "#E8C547",
  },
  {
    index: "04 / 05",
    era:   "MIAMI",
    years: "2023 – Present",
    quote: "He didn't retire from football. He brought football somewhere it had never truly been.",
    image: "/assest/timeline/miami.webp",
    stat:  "MLS · Leagues Cup Winner · 2024",
    accent: "#F4B8CB",
  },
  {
    index: "05 / 05",
    era:   "ARGENTINA",
    years: "2005 – Present",
    quote: "Copa América. Copa América. Copa América. Finalissima. World Cup. He won everything. Then he won it all again.",
    image: "/assest/timeline/argentina.jpg",
    stat:  "Copa América ×3 · World Cup 2022",
    accent: "#A8C5D8",
  },
];
```

#### Progress Rail
- 2px horizontal line at very bottom of viewport, full width
- `scaleX: 0 → 1` synced to horizontal scroll progress (scrub)
- Color: gold-electric
- No labels. The line is enough.

---

### 6.4 FRAMES — Gallery

**Assets:** 11 images in `gallery/`

#### Layout: Editorial Masonry
Not a grid. Not a carousel. A curated wall — like a photo editor laid these out for a magazine spread.

```
Desktop (3 col):
┌────────┬──────────────┬────────┐
│        │              │        │
│  tall  │  landscape   │  tall  │
│        │              │        │
│        ├──────┬───────┤        │
│        │      │       │        │
└────────┴──────┴───────┴────────┘
```
CSS `columns: 3`, `gap: 6px`. No JS masonry needed. Images sized naturally.

#### On-scroll Reveal
```js
// Each image: clip-path inset(100% 0 0 0) → inset(0% 0 0 0)
// Stagger from center outward
gsap.fromTo(".frame",
  { clipPath: "inset(100% 0 0 0)" },
  {
    clipPath: "inset(0% 0 0 0)",
    duration: 1.0,
    ease: "expo.inOut",
    stagger: { amount: 1.4, from: "center" },
    scrollTrigger: { trigger: ".frames-grid", start: "top 75%" }
  }
);
```
Clip-path reveal (emerging from bottom) instead of fade/blur — feels like photos developing.

#### Hover State
```css
.frame-inner { transform: scale(1); transition: transform 600ms cubic-bezier(0.25, 0, 0, 1); }
.frame:hover .frame-inner { transform: scale(1.04); }
.frame-caption { transform: translateY(100%); transition: 400ms ease; }
.frame:hover .frame-caption { transform: translateY(0); }
```
Caption: moment description, white text, backdrop: `rgba(3,3,3,0.7)`, slides up from bottom edge.

#### Lightbox
Custom. No library.
- Open: `gsap.fromTo(overlay, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.5, ease: power3.out })`
- Close: reverse. ESC key.
- Navigation: arrow keys + click zones + swipe (touch)
- Shows: full image + caption + `[3 / 11]` counter top-right
- Background: `#030303` at 96% — not full black, slight depth
- Focus trapped inside. `aria-modal="true"`.

#### Image Map
```ts
const frames = [
  { src: "messi-portrait.jpg",                      caption: "The Genius, at rest" },
  { src: "messi-barcelona-dribbling.jpg",           caption: "Camp Nou, 2011. Three defenders. Zero chance." },
  { src: "messi-barcelona-free-kick.jpg",           caption: "The left foot that rewrote the physics of the ball." },
  { src: "messi-barcelona-celebration.jpg",         caption: "Barcelona. Home." },
  { src: "messi-goat-barcelona-poster.jpg",         caption: "The verdict, before it was officially rendered." },
  { src: "messi-argentina-world-cup-kiss.jpg",      caption: "Qatar, December 18, 2022. The kiss." },
  { src: "messi-argentina-celebration-pointing.jpg",caption: "For Argentina. For every version of himself that didn't win it yet." },
  { src: "messi-kissing-world-cup.jpg",             caption: "Finally." },
  { src: "messi-inter-miami-back.jpg",              caption: "Miami. A new chapter on his own terms." },
  { src: "messi-inter-miami-training.jpg",          caption: "Still working. Always." },
  { src: "messi-boots-close-up.jpg",               caption: "The instrument. Not the musician." },
];
```

---

### 6.5 THE ARGUMENT

*The GOAT debate, closed.*

#### Layout: Full editorial spread
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   "He is not the best                                    │
│    of his generation.                                    │
│                                                          │
│    He is the best                                        │
│    there has ever been."                                 │
│                                                          │
│                         — Pep Guardiola                  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Font:** Editorial New Italic, `clamp(32px, 4vw, 64px)`, chalk, line-height: 1.08

#### Animation: Word-scrub illumination
```js
// SplitText splits quote into word spans
// Default: opacity 0.12 (barely visible)
// Scrub: as user scrolls through section, words illuminate sequentially
gsap.to(".word", {
  opacity: 1,
  stagger: 0.04,
  scrollTrigger: {
    trigger: ".argument-quote",
    start: "top 60%",
    end: "bottom 40%",
    scrub: 1.5,
  }
});
```
The quote reveals itself as if the user is reading it into existence.

#### Below the quote: Achievement record
Three lines. No pills, no cards. Plain tabular data. Like a trophy room inventory.
```
Copa América            × 3         2021 · 2024 · 2024
FIFA World Cup          × 1         Qatar 2022
UEFA Champions League   × 4         2006 · 2009 · 2011 · 2015
```
Each line: `opacity: 0 → 1` sequential, after quote completes.

---

### 6.6 THE MOMENT

*Dedicated section for a single image: `messi-kissing-world-cup.jpg`*

This section is the emotional peak. One image. Full bleed. Nothing else.

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   [full viewport image — object-fit: cover]              │
│   [gradient: top 20% → transparent, bottom 40% → void]  │
│                                                          │
│                                                          │
│                                                          │
│         DECEMBER 18, 2022          ← chalk-dim, 13px    │
│         LUSAIL STADIUM, QATAR                            │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

Animation: image enters with `clipPath: inset(0 0 100% 0) → inset(0 0 0% 0)` — wipes in from top. Text fades after image is fully revealed. No movement after that. Let it breathe for `100vh` of scroll before the next section.

---

### 6.7 CODA — Footer

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│              M E S S I                                   │
│              ─────────── small, chalk-dim, tracked       │
│              1987 —                                      │
│                                                          │
│   The Living Archive         GitHub ↗   Back to top ↑   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

"1987 —" with an em dash and no closing year. He's still playing.

---

### 6.8 NAVIGATION

```
┌── [MESSI] ──────────────────── [Numbers · Chapters · Frames · Legacy] ──┐
```

- Logo: `MESSI` in Druk Wide, 16px, chalk
- Links: Inter 500, 12px, letter-spacing: 0.1em, chalk-dim → chalk on hover
- Desktop: transparent always. No blur on scroll. Nav shouldn't compete with content.
- Mobile: hamburger → full-screen takeover, dark overlay, links at 48px Druk Wide, staggered entrance

---

## 7. Interaction Moments — Special Details

### 7.1 Magnetic Cursor (desktop only)
```ts
// Custom cursor component
// Tracks mouse with GSAP lerp (ease: 0.15)
// On .magnetic element hover:
//   cursor jumps to element center
//   element itself shifts toward cursor (max 8px)
// Magnetic elements: nav links, chapter titles, gallery frames
```

### 7.2 Page Loader
- 0.8s black screen with gold progress line at bottom (`scaleX: 0 → 1`)
- No logo, no spinner. Line hits 100% → instant page reveal
- Prevents FOUC on fonts/video

### 7.3 Section Transitions
Between major sections: very subtle gold horizontal rule (`1px`, `scaleX: 0 → 1`, 400ms) instead of padding gaps. Visual chapter breaks.

### 7.4 The One Red Moment
In the Chapters section, the Barcelona era panel has a small detail: beneath the main stat, a single line in `scar-red`: `2006 World Cup · Red card vs Germany`. Color `scar-red` (`#C0392B`) appears nowhere else on the entire page. That one use makes it hit.

---

## 8. File & Folder Structure

```
messi/                              ← repo name
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── public/
│   ├── messi-hero-video.mp4
│   └── assest/
│       ├── goat-poster.jpg
│       ├── gallery/
│       └── timeline/
└── src/
    ├── app/
    │   ├── layout.tsx              # fonts, metadata, Lenis mount
    │   ├── page.tsx                # section composition
    │   └── globals.css             # CSS vars, base reset, custom scrollbar
    ├── components/
    │   ├── Cursor.tsx              # magnetic cursor, desktop only
    │   ├── Loader.tsx              # page loader
    │   ├── Nav.tsx
    │   └── sections/
    │       ├── Hero.tsx
    │       ├── Numbers.tsx
    │       ├── Chapters.tsx        # horizontal scroll
    │       ├── Frames.tsx          # gallery
    │       ├── Argument.tsx        # legacy/quote
    │       ├── TheMoment.tsx       # world cup image section
    │       └── Coda.tsx            # footer
    ├── components/ui/
    │   ├── Lightbox.tsx
    │   ├── StatCounter.tsx
    │   └── ChapterCard.tsx
    ├── components/three/
    │   └── EmberField.tsx          # particle system, dynamic import
    ├── hooks/
    │   ├── useLenis.ts
    │   ├── useGSAP.ts
    │   └── useReducedMotion.ts
    └── lib/
        ├── data.ts                 # chapters[], frames[], stats[]
        └── gsap.ts                 # plugin registration
```

---

## 9. Config Files

### 9.1 next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/messi',
  assetPrefix: '/messi/',
  images: { unoptimized: true },
  trailingSlash: true,
};
module.exports = nextConfig;
```

### 9.2 Lenis + GSAP Sync
```ts
// hooks/useLenis.ts
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      syncTouch: false,   // native on mobile
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);
}
```

### 9.3 Deploy Script
```json
{
  "scripts": {
    "dev":    "next dev",
    "build":  "next build",
    "deploy": "next build && touch out/.nojekyll && gh-pages -d out --dotfiles"
  }
}
```

### 9.4 GitHub Pages Steps
1. `npm run deploy`
2. Repo → Settings → Pages → Source: `gh-pages` branch, root `/`
3. Wait ~60s → live at `username.github.io/messi`
4. Optional: add `CNAME` file in `public/` for custom domain

---

## 10. Performance Targets

| Metric | Target | Strategy |
|---|---|---|
| LCP | < 2.5s | Video `preload="auto"`, poster image served first |
| FID / INP | < 100ms | GSAP on compositor thread only (transform/opacity) |
| CLS | < 0.05 | All image dimensions set at build time |
| JS bundle | < 380KB gz | Three.js `dynamic()`, GSAP tree-shaken |
| Video | Playing < 1.5s | `preload="auto"` + compress < 12MB (HandBrake H.264 CRF 26) |
| Images | All WebP < 200KB each | Convert before committing |

---

## 11. Accessibility

- `prefers-reduced-motion`: all GSAP timelines `duration: 0`, all transitions disabled. Page still readable, usable, beautiful in layout.
- Video: `aria-hidden="true"` (decorative), `muted`, `playsInline`
- All images: descriptive `alt` text (not "photo of Messi" — actual descriptions)
- Lightbox: `role="dialog"`, `aria-modal="true"`, focus trap, ESC close
- Color contrast: chalk on void = 16:1. Gold on void = 9.4:1. Both exceed WCAG AA.
- Custom cursor: hidden on touch devices, falls back to system default
- Keyboard: all interactive elements reachable, visible focus ring (gold outline, 2px)

---

## 12. Development Phases

### Phase 1 — Foundation (Day 1)
- [ ] Next.js init + TypeScript + Tailwind + CSS vars
- [ ] Font loading (`next/font/google`)
- [ ] GSAP + ScrollTrigger registration
- [ ] Lenis hook wired + verified
- [ ] Page loader component
- [ ] Nav (static, unstyled)
- [ ] All 7 section shells (empty, correct heights)

### Phase 2 — Hero (Day 2)
- [ ] Video autoplay, poster, fallback
- [ ] Overlay stack (vignette gradients)
- [ ] Three.js EmberField (dynamic import, bloom)
- [ ] Title clip-path animation
- [ ] Scroll cue pulse
- [ ] Magnetic cursor (desktop)

### Phase 3 — Numbers + Chapters (Day 3)
- [ ] Stat counter grid + GSAP number morph
- [ ] Horizontal scroll pin setup (ScrollTrigger)
- [ ] 5 chapter panels + parallax image layer
- [ ] Progress rail scrub
- [ ] Red card detail (scar-red)

### Phase 4 — Frames + Lightbox (Day 4)
- [ ] CSS masonry grid
- [ ] Clip-path reveal animation (stagger from center)
- [ ] Hover: scale + caption slide
- [ ] Lightbox: open/close GSAP, keyboard nav, touch swipe
- [ ] Caption content for all 11 images

### Phase 5 — Argument + The Moment + Coda (Day 5)
- [ ] SplitText word-scrub on Guardiola quote
- [ ] Trophy record table reveal
- [ ] Full-bleed World Cup image section
- [ ] Footer / Coda

### Phase 6 — Polish + Deploy (Day 6)
- [ ] Mobile pass: all sections responsive, cursor hidden on touch
- [ ] `prefers-reduced-motion` audit — every animation covered
- [ ] Lighthouse audit: Performance, A11y, Best Practices
- [ ] Video compressed, images converted to WebP
- [ ] `npm run deploy` → GitHub Pages live
- [ ] Cross-browser: Chrome, Firefox, Safari, iOS Safari, Android Chrome

---

## 13. Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "gsap": "^3.12.5",
    "@gsap/react": "^2.1.1",
    "lenis": "^1.1.9",
    "three": "^0.165.0",
    "@react-three/fiber": "^8.16.8",
    "@react-three/drei": "^9.105.0",
    "@react-three/postprocessing": "^2.16.2",
    "lucide-react": "^0.395.0"
  },
  "devDependencies": {
    "typescript": "^5.4.5",
    "tailwindcss": "^3.4.4",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "gh-pages": "^6.1.1",
    "@types/three": "^0.165.0",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18"
  }
}
```

---

## 14. Constraints & Mitigations

| Constraint | Mitigation |
|---|---|
| GitHub Pages = static only | `output: 'export'` — no API routes, no ISR |
| Three.js SSR crash | `dynamic(() => import('./EmberField'), { ssr: false })` |
| Druk Wide requires license | Fallback: Bebas Neue (free, same condensed energy) |
| GSAP SplitText = Club plugin | Use `gsap.utils.toArray` + manual span wrapping as free alternative |
| Lenis + ScrollTrigger conflict | Sync: `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.lagSmoothing(0)` |
| `basePath` breaks hardcoded image paths | Prefix all: `const base = process.env.NEXT_PUBLIC_BASE_PATH \|\| ''` |
| Video autoplay blocked on some browsers | `muted` + `playsInline` — required attributes, already spec'd |
| Large `.mp4` file size on GitHub | Compress: HandBrake, H.264, CRF 26, target < 12MB |
| Horizontal scroll + Lenis | Disable Lenis on horizontal section; re-enable after. Use `lenis.stop()` / `lenis.start()` |

---

## 15. What Makes This Different

Most sports tribute sites: stats on white, some gradients, a carousel, a timeline. This is none of that.

What this site does that the others don't:
- The video doesn't just "play in the background" — it's the foundation the entire experience is built on
- The cursor is alive — it responds, it reacts, it becomes part of the UI
- Gold is withheld, then spent on the moments that deserve it
- The typography is the design — not decoration around content, but the structure itself
- The World Cup section is silent — one image, one location, one date — because that moment doesn't need explaining
- The red card detail (one use of `scar-red`) shows the full human — not just the legend
- "1987 —" in the footer, with an open em dash — because he's still here

This is built like someone cared. That's the difference.

---

*PRD v2.0 complete. Build it.*
