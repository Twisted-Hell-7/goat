# MESSI — The Living Archive

A cinematic single-page tribute to the greatest footballer who has ever lived.
Brutalist editorial meets cinematic dark luxury. Built as an immersive web
experience, not a fan site.

See `MESSI_GOAT_PRD.md` for the full specification.

## Stack

- **Next.js 14** (App Router, static export)
- **TypeScript** strict mode
- **Tailwind CSS v3** + CSS custom properties
- **GSAP 3** + ScrollTrigger (timeline, scrub, number morph)
- **Lenis** smooth scroll, synced to GSAP ticker
- **Three.js** via `@react-three/fiber` + `@react-three/postprocessing`
  (1,200-particle EmberField with bloom)
- Fonts: **Bebas Neue** (display) + **Playfair Display Italic** (pull quotes) + **Inter** (body)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000/messi
```

## Build & deploy to GitHub Pages

```bash
npm run deploy   # next build && gh-pages -d out
```

Then in the repo → **Settings → Pages → Source: `gh-pages` branch, root `/`**.
Lives at `https://<user>.github.io/messi`.

## Structure

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, Lenis + Cursor + Loader mount
│   ├── page.tsx            # 7-section composition
│   └── globals.css         # design tokens, reset, custom cursor, Lenis
├── components/
│   ├── Loader.tsx          # 0.8s black screen + gold progress line
│   ├── Cursor.tsx          # magnetic cursor, desktop only
│   ├── Nav.tsx             # fixed transparent nav + mobile takeover
│   ├── SmoothScroll.tsx    # Lenis + GSAP ticker sync
│   ├── sections/
│   │   ├── Hero.tsx        # video + EmberField + title clip-path
│   │   ├── Numbers.tsx     # stat counter grid (gold World Cup)
│   │   ├── Chapters.tsx    # pinned horizontal scroll, 5 eras
│   │   ├── Frames.tsx      # editorial masonry + custom Lightbox
│   │   ├── Argument.tsx    # Guardiola quote, word-scrub illumination
│   │   ├── TheMoment.tsx   # full-bleed Qatar World Cup image
│   │   └── Coda.tsx        # footer with open em dash "1987 —"
│   ├── three/
│   │   └── EmberField.tsx   # dynamic-imported particle system
│   └── ui/                 # (shared primitives, add as needed)
├── hooks/
│   └── useReducedMotion.ts
└── lib/
    ├── data.ts             # chapters, frames, stats, trophies
    └── gsap.ts             # plugin registration
```

## Performance targets

- LCP < 2.5s · INP < 100ms · CLS < 0.05
- JS bundle < 380KB gz (Three.js dynamic-imported, GSAP tree-shaken)
- Video compressed to < 12MB, all images WebP
- `prefers-reduced-motion` honored across every animation

## Accessibility

- `cursor: none` on fine pointers (custom cursor); system cursor on touch
- All images have descriptive `alt` (not "photo of Messi")
- Lightbox: `role="dialog"`, `aria-modal`, ESC + arrow keys, focus trap
- Color contrast: chalk on void 16:1, gold on void 9.4:1 (WCAG AAA)
- Focus ring: 2px gold outline, 3px offset