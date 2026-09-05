# MESSI — Agent Notes

## What this is
A single-page cinematic tribute to Lionel Messi. See `MESSI_GOAT_PRD.md` for the full design spec. Built with Next.js 14 (App Router, static export), GSAP, Lenis, Three.js, and Tailwind.

## Key conventions
- **basePath** is `/messi`. All image/video src paths are prefixed with `/messi/...` (set in `src/lib/data.ts` and hardcoded for video/poster).
- **Fonts:** Bebas Neue (display) → `var(--font-display)`, Playfair Display Italic (pull quotes) → `var(--font-editorial)`, Inter (body) → `var(--font-body)`. All loaded via `next/font/google` in `src/app/layout.tsx`.
- **Design tokens** are CSS variables in `src/app/globals.css` (`--void`, `--obsidian`, `--chalk`, `--chalk-dim`, `--gold-electric`, `--scar-red`, `--ice-blue`). Tailwind colors mirror these.
- **Gold (`--gold-electric`)** is rationed. Max ~3 elements per screen. The `1` in "1 World Cup" stat and the Guardiola trophy counts are the only built-in gold uses in body content.
- **Red (`--scar-red`)** is used ONCE on the entire page — the 2006 World Cup red card line under the Barcelona chapter panel.

## Animation patterns
- Every GSAP timeline is wrapped with `useReducedMotion()` and returns early if `prefers-reduced-motion: reduce`.
- `registerGSAP()` in `src/lib/gsap.ts` is idempotent and called from any component that uses GSAP.
- Lenis runs in `SmoothScroll.tsx` and syncs to `gsap.ticker`. Don't add a second Lenis instance.
- ScrollTrigger pin animations use `invalidateOnRefresh: true` for the Chapters horizontal track (resizes correctly on viewport change).
- Three.js (`EmberField`) is dynamically imported with `ssr: false` — required, otherwise Next build crashes.

## Section map (in render order)
1. **Hero** — video + particles + clipped title (bottom-third)
2. **Numbers** — stat counter grid (the `1` World Cup is gold, last to land)
3. **Chapters** — pinned horizontal scroll, 5 panels (Rosario → Argentina)
4. **Frames** — CSS columns masonry, clip-path reveal from center, custom Lightbox
5. **Argument** — Guardiola quote with per-word scrub illumination, trophy lines below
6. **TheMoment** — sticky full-bleed Qatar World Cup image (200vh section, 100vh pinned)
7. **Coda** — footer, "1987 — still playing"

## Deploy
`npm run deploy` → builds to `out/` → publishes `gh-pages` branch. Live at `username.github.io/messi`.

## Don't
- Don't add new uses of `--gold-electric` or `--scar-red` without explicit PRD reason. The rationing is intentional.
- Don't switch to system fonts. Druk Wide → Bebas Neue is the chosen substitute.
- Don't use `next/image` for chapter/gallery/moment images — they require parallax transforms that conflict with the image component, and `images.unoptimized: true` is on for GitHub Pages anyway.
- Don't add a second Lenis instance.
- Don't wrap client interactivity with unnecessary `useEffect` deps — components already gate on reduced-motion.