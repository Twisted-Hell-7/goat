import { gsap, registerGSAP, ScrollTrigger } from '../lib/gsap';
import { frames } from '../lib/data';

type Layout = 'hero' | 'tall' | 'wide' | 'square' | 'tall-sm';

const layoutFor = (i: number): Layout => {
  if (i === 5) return 'hero'; // World Cup kiss — the headline frame
  if (i === 1 || i === 7) return 'tall';
  if (i === 2 || i === 8) return 'wide';
  if (i === 4 || i === 10) return 'square';
  return 'tall-sm';
};

const chapterFor = (i: number): string => {
  if (i <= 0) return 'Rosario · 1987';
  if (i <= 4) return 'Barcelona · 2004–2021';
  if (i === 5 || i === 6 || i === 7) return 'Argentina · 2022';
  if (i <= 9) return 'Inter Miami · 2023–';
  return 'Anthem · Always';
};

export function mountFrames(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#frames')!;
  const reduced = ctx.reduced;

  section.classList.add('section', 'bg-hatch');
  Object.assign(section.style, {
    padding: 'clamp(120px, 16vh, 200px) clamp(20px, 4vw, 56px)',
    background: 'var(--obsidian)',
    position: 'relative',
  } as CSSStyleDeclaration);

  section.innerHTML = `
    <header class="frames-head">
        <span class="frames-tag label-tag">CHAPTER 04 · ARCHIVE</span>
        <h2 class="t-display frames-title">Frames<span class="frames-title-mark">.</span></h2>
        <p class="frames-lede">Eleven stills. Two decades. The dossier of a player who redefined what a footballer could be.</p>
        <div class="frames-meta">
          <span class="tabular">${String(frames.length).padStart(2, '0')} / ${String(frames.length).padStart(2, '0')}</span>
          <span class="frames-meta-sep">·</span>
          <span>Archive 1987 — ${new Date().getFullYear()}</span>
        </div>
    </header>

    <div class="frames-grid" role="list">
      ${frames
        .map((f, i) => {
          const layout = layoutFor(i);
          const num = String(i + 1).padStart(2, '0');
          const chapter = chapterFor(i);
          return `
            <button class="frame frame--${layout}" data-i="${i}" data-cursor="view" role="listitem" aria-label="Open frame ${num}: ${f.caption}">
              <span class="frame-corner frame-corner--tl" aria-hidden="true"></span>
              <span class="frame-corner frame-corner--tr" aria-hidden="true"></span>
              <span class="frame-corner frame-corner--bl" aria-hidden="true"></span>
              <span class="frame-corner frame-corner--br" aria-hidden="true"></span>

              <div class="frame-inner">
                <img src="${f.src}" alt="${f.alt}" loading="lazy" />
                <div class="frame-veil" aria-hidden="true"></div>
                <div class="frame-cross" aria-hidden="true">
                  <span class="frame-cross-h"></span>
                  <span class="frame-cross-v"></span>
                </div>
              </div>

              <div class="frame-caption">
                <div class="frame-caption-row">
                  <span class="frame-idx tabular">${num}</span>
                  <span class="frame-chapter">${chapter}</span>
                </div>
                <div class="frame-cap-text">${f.caption}</div>
                <div class="frame-caption-row frame-caption-row--end">
                  <span class="frame-view">View</span>
                  <span class="frame-arrow" aria-hidden="true">↗</span>
                </div>
              </div>
            </button>
          `;
        })
        .join('')}
    </div>

    <style>
      .frames-head {
        max-width: 1280px;
        margin: 0 auto clamp(56px, 9vh, 120px);
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
        position: relative;
      }
      .frames-tag {
        color: var(--chalk-dim);
      }
      .frames-title {
        font-size: clamp(64px, 12vw, 200px);
        margin: 0;
        font-weight: 700;
        letter-spacing: -0.04em;
        line-height: 0.85;
        color: var(--chalk);
        position: relative;
        display: inline-block;
      }
      .frames-title-mark {
        color: var(--gold-electric);
        display: inline-block;
        transform: translateY(-0.08em);
        margin-left: -0.05em;
      }
      .frames-lede {
        max-width: 56ch;
        font-family: var(--font-display);
        font-weight: 300;
        font-size: clamp(15px, 1.4vw, 19px);
        line-height: 1.45;
        color: var(--chalk);
        opacity: 0.78;
        margin: 0;
      }
      .frames-meta {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--chalk-dim);
        display: flex;
        gap: 14px;
        align-items: center;
        border-top: 1px solid var(--border-hairline);
        padding-top: 18px;
        max-width: 360px;
      }
      .frames-meta-sep { opacity: 0.5; }

      .frames-grid {
        max-width: 1280px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-auto-rows: 120px;
        gap: 14px;
      }

      .frame {
        position: relative;
        overflow: hidden;
        background: var(--void);
        padding: 0;
        cursor: pointer;
        isolation: isolate;
      }
      .frame:focus-visible { outline: none; }
      .frame:focus-visible .frame-inner { outline: 2px solid var(--gold-electric); outline-offset: 4px; }

      .frame-inner {
        position: absolute;
        inset: 0;
        overflow: hidden;
      }
      .frame-inner img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        filter: grayscale(0.15) contrast(1.04) brightness(0.9);
        transform: scale(1.06);
        transition:
          transform 1200ms var(--ease-expo),
          filter 1200ms var(--ease-expo);
        will-change: transform, filter;
      }

      .frame-veil {
        position: absolute;
        inset: 0;
        background:
          linear-gradient(to top, rgba(3,3,3,0.85) 0%, rgba(3,3,3,0.35) 25%, rgba(3,3,3,0) 55%),
          linear-gradient(120deg, rgba(232,197,71,0.0) 0%, rgba(232,197,71,0.06) 50%, rgba(232,197,71,0.0) 100%);
        mix-blend-mode: normal;
        opacity: 1;
        transition: opacity 700ms var(--ease-expo);
        pointer-events: none;
      }

      .frame-cross {
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0;
        transition: opacity 600ms var(--ease-expo);
      }
      .frame-cross-h, .frame-cross-v {
        position: absolute;
        background: var(--chalk);
      }
      .frame-cross-h { left: 50%; top: 50%; width: 22px; height: 1px; transform: translate(-50%, -50%); }
      .frame-cross-v { left: 50%; top: 50%; width: 1px; height: 22px; transform: translate(-50%, -50%); }

      .frame-corner {
        position: absolute;
        width: 12px;
        height: 12px;
        z-index: 4;
        opacity: 0;
        transition: opacity 500ms var(--ease-expo), transform 500ms var(--ease-expo);
      }
      .frame-corner::before, .frame-corner::after {
        content: '';
        position: absolute;
        background: var(--chalk);
      }
      .frame-corner--tl { top: 8px; left: 8px; }
      .frame-corner--tl::before { top: 0; left: 0; width: 12px; height: 1px; }
      .frame-corner--tl::after  { top: 0; left: 0; width: 1px; height: 12px; }
      .frame-corner--tr { top: 8px; right: 8px; }
      .frame-corner--tr::before { top: 0; right: 0; width: 12px; height: 1px; }
      .frame-corner--tr::after  { top: 0; right: 0; width: 1px; height: 12px; }
      .frame-corner--bl { bottom: 8px; left: 8px; }
      .frame-corner--bl::before { bottom: 0; left: 0; width: 12px; height: 1px; }
      .frame-corner--bl::after  { bottom: 0; left: 0; width: 1px; height: 12px; }
      .frame-corner--br { bottom: 8px; right: 8px; }
      .frame-corner--br::before { bottom: 0; right: 0; width: 12px; height: 1px; }
      .frame-corner--br::after  { bottom: 0; right: 0; width: 1px; height: 12px; }

      .frame-caption {
        position: absolute;
        left: 18px;
        right: 18px;
        bottom: 18px;
        display: grid;
        gap: 10px;
        font-family: var(--font-mono);
        color: var(--chalk);
        z-index: 3;
        opacity: 0;
        transform: translateY(14px);
        transition: opacity 600ms var(--ease-expo), transform 600ms var(--ease-expo);
      }
      .frame-caption-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--chalk-dim);
      }
      .frame-caption-row--end { color: var(--chalk); }
      .frame-idx { color: var(--gold-electric); }
      .frame-cap-text {
        font-family: var(--font-display);
        font-weight: 300;
        font-size: clamp(15px, 1.4vw, 19px);
        line-height: 1.25;
        letter-spacing: -0.01em;
        color: var(--chalk);
        max-width: 38ch;
      }
      .frame-arrow { display: inline-block; transition: transform 400ms var(--ease-expo); }

      /* ── Layout variants ────────────────────────────── */
      .frame--hero   { grid-column: span 8; grid-row: span 5; }
      .frame--tall   { grid-column: span 4; grid-row: span 5; }
      .frame--wide   { grid-column: span 6; grid-row: span 3; }
      .frame--square { grid-column: span 4; grid-row: span 3; }
      .frame--tall-sm{ grid-column: span 4; grid-row: span 3; }

      /* Specific placements to keep the layout rhythmic */
      .frame[data-i="0"] { grid-column: span 4; grid-row: span 3; }
      .frame[data-i="1"] { grid-column: span 4; grid-row: span 5; }
      .frame[data-i="2"] { grid-column: span 8; grid-row: span 3; }
      .frame[data-i="3"] { grid-column: span 4; grid-row: span 3; }
      .frame[data-i="4"] { grid-column: span 4; grid-row: span 3; }
      .frame[data-i="5"] { grid-column: span 8; grid-row: span 5; } /* hero */
      .frame[data-i="6"] { grid-column: span 4; grid-row: span 3; }
      .frame[data-i="7"] { grid-column: span 4; grid-row: span 5; }
      .frame[data-i="8"] { grid-column: span 8; grid-row: span 3; }
      .frame[data-i="9"] { grid-column: span 6; grid-row: span 3; }
      .frame[data-i="10"]{ grid-column: span 6; grid-row: span 3; }

      /* ── Hover state ────────────────────────────────── */
      .frame:hover .frame-inner img,
      .frame:focus-visible .frame-inner img {
        transform: scale(1.0);
        filter: grayscale(0) contrast(1.06) brightness(1);
      }
      .frame:hover .frame-veil,
      .frame:focus-visible .frame-veil { opacity: 0.45; }
      .frame:hover .frame-caption,
      .frame:focus-visible .frame-caption {
        opacity: 1;
        transform: translateY(0);
      }
      .frame:hover .frame-cross,
      .frame:focus-visible .frame-cross { opacity: 0.85; }
      .frame:hover .frame-corner,
      .frame:focus-visible .frame-corner {
        opacity: 1;
        transform: scale(1.0);
      }
      .frame:hover .frame-arrow,
      .frame:focus-visible .frame-arrow { transform: translate(3px, -3px); }

      /* Subtle gold accent on hero */
      .frame--hero .frame-idx { color: var(--gold-electric); }
      .frame--hero::after {
        content: 'FEATURE';
        position: absolute;
        top: 18px;
        left: 18px;
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.22em;
        color: var(--gold-electric);
        z-index: 3;
        padding: 6px 10px;
        border: 1px solid var(--gold-electric);
        background: rgba(3,3,3,0.45);
        backdrop-filter: blur(2px);
      }

      @media (max-width: 1100px) {
        .frames-grid {
          grid-template-columns: repeat(6, 1fr);
          grid-auto-rows: 110px;
          gap: 10px;
        }
        .frame[data-i="0"]  { grid-column: span 3; grid-row: span 3; }
        .frame[data-i="1"]  { grid-column: span 3; grid-row: span 4; }
        .frame[data-i="2"]  { grid-column: span 6; grid-row: span 3; }
        .frame[data-i="3"]  { grid-column: span 3; grid-row: span 3; }
        .frame[data-i="4"]  { grid-column: span 3; grid-row: span 3; }
        .frame[data-i="5"]  { grid-column: span 6; grid-row: span 5; }
        .frame[data-i="6"]  { grid-column: span 3; grid-row: span 3; }
        .frame[data-i="7"]  { grid-column: span 3; grid-row: span 4; }
        .frame[data-i="8"]  { grid-column: span 6; grid-row: span 3; }
        .frame[data-i="9"]  { grid-column: span 3; grid-row: span 3; }
        .frame[data-i="10"] { grid-column: span 3; grid-row: span 3; }
      }

      @media (max-width: 640px) {
        .frames-grid {
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 160px;
          gap: 8px;
        }
        .frame[data-i] { grid-column: span 1 !important; grid-row: span 3 !important; }
        .frame[data-i="2"],
        .frame[data-i="5"],
        .frame[data-i="8"] { grid-column: span 2 !important; grid-row: span 4 !important; }
        .frames-title { font-size: clamp(56px, 18vw, 96px); }
      }

      /* ── Lightbox ───────────────────────────────────── */
      .lb {
        position: fixed;
        inset: 0;
        z-index: 90;
        background: rgba(3,3,3,0.96);
        display: grid;
        place-items: center;
        opacity: 0;
        backdrop-filter: blur(8px);
      }
      .lb-stage {
        position: relative;
        max-width: min(88vw, 1280px);
        max-height: 84vh;
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .lb-img {
        max-width: 100%;
        max-height: 78vh;
        object-fit: contain;
        display: block;
        margin: 0 auto;
        transform: scale(0.96);
        opacity: 0;
        box-shadow: 0 30px 80px -20px rgba(0,0,0,0.6);
      }
      .lb-meta {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 24px;
        align-items: center;
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--chalk-dim);
        padding-top: 18px;
        border-top: 1px solid var(--border-hairline);
      }
      .lb-meta-idx { color: var(--gold-electric); }
      .lb-meta-cap {
        font-family: var(--font-display);
        font-weight: 300;
        font-size: 18px;
        letter-spacing: -0.01em;
        text-transform: none;
        color: var(--chalk);
        max-width: 60ch;
      }
      .lb-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 56px;
        height: 56px;
        border: 1px solid var(--border-hairline);
        border-radius: 50%;
        display: grid;
        place-items: center;
        font-family: var(--font-display);
        font-size: 22px;
        color: var(--chalk);
        background: rgba(3,3,3,0.4);
        transition: background 300ms var(--ease-expo), border-color 300ms var(--ease-expo);
      }
      .lb-btn:hover { background: var(--chalk); color: var(--void); border-color: var(--chalk); }
      .lb-prev { left: 32px; }
      .lb-next { right: 32px; }
      .lb-close {
        position: absolute;
        top: 32px;
        right: 32px;
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--chalk-dim);
        padding: 10px 16px;
        border: 1px solid var(--border-hairline);
        transition: color 300ms, border-color 300ms;
      }
      .lb-close:hover { color: var(--chalk); border-color: var(--chalk); }
      .lb-counter {
        position: absolute;
        top: 32px;
        left: 32px;
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--chalk-dim);
      }
      .lb-hint {
        position: absolute;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%);
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--chalk-dim);
        opacity: 0.6;
      }
      @media (max-width: 640px) {
        .lb-btn { width: 44px; height: 44px; font-size: 18px; }
        .lb-prev { left: 12px; } .lb-next { right: 12px; }
        .lb-close { top: 16px; right: 16px; }
        .lb-counter { top: 16px; left: 16px; }
      }
    </style>
  `;

  const grid = section.querySelector<HTMLElement>('.frames-grid')!;
  grid.querySelectorAll<HTMLButtonElement>('.frame').forEach((btn) => {
    btn.addEventListener('click', () => openLightbox(Number(btn.dataset.i)));
  });

  // ── lightbox state (single instance) ────────────────────
  let current: HTMLDivElement | null = null;
  let currentIdx = 0;

  const close = () => {
    if (!current) return;
    gsap.to(current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        current?.remove();
        current = null;
      },
    });
    document.documentElement.style.overflow = '';
    window.removeEventListener('keydown', onKey);
  };

  const show = (i: number) => {
    if (current) current.remove();
    currentIdx = ((i % frames.length) + frames.length) % frames.length;
    const lb = buildLightbox(currentIdx, close, () => show(currentIdx + 1), () => show(currentIdx - 1));
    document.body.append(lb);
    current = lb;
  };

  const openLightbox = (i: number) => {
    document.documentElement.style.overflow = 'hidden';
    show(i);
    window.addEventListener('keydown', onKey);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(currentIdx + 1);
    else if (e.key === 'ArrowLeft') show(currentIdx - 1);
  };

  if (reduced) return;

  registerGSAP();

  // Header reveal
  gsap.fromTo(
    section.querySelector('.frames-tag'),
    { opacity: 0, y: 12 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 80%' },
    }
  );
  gsap.fromTo(
    section.querySelector('.frames-title'),
    { opacity: 0, y: 40, letterSpacing: '-0.06em' },
    {
      opacity: 1,
      y: 0,
      letterSpacing: '-0.04em',
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: section, start: 'top 80%' },
    }
  );
  gsap.fromTo(
    section.querySelector('.frames-lede'),
    { opacity: 0, y: 16 },
    {
      opacity: 0.78,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 70%' },
    }
  );
  gsap.fromTo(
    section.querySelector('.frames-meta'),
    { opacity: 0, y: 10 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 70%' },
    }
  );

  // Grid reveal — staggered, scrolling-based
  const framesEls = grid.querySelectorAll<HTMLElement>('.frame');
  framesEls.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      {
        opacity: 1,
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.1,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: grid, start: 'top 85%' },
      }
    );
  });

  // Parallax drift on images while scrolling the section
  framesEls.forEach((el, i) => {
    const img = el.querySelector('img') as HTMLElement | null;
    if (!img) return;
    const speed = 0.06 + (i % 3) * 0.02;
    gsap.fromTo(
      img,
      { yPercent: -4 * speed * 10 },
      {
        yPercent: 4 * speed * 10,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });

  // Refresh ScrollTrigger after layout
  ScrollTrigger.refresh();
}

function buildLightbox(
  index: number,
  onClose: () => void,
  onNext: () => void,
  onPrev: () => void
): HTMLDivElement {
  const f = frames[index];
  const num = String(index + 1).padStart(2, '0');
  const total = String(frames.length).padStart(2, '0');
  const overlay = document.createElement('div');
  overlay.className = 'lb';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', f.caption);

  overlay.innerHTML = `
    <button class="lb-close" data-cursor="hover" aria-label="Close">Close ×</button>
    <span class="lb-counter"><span class="lb-meta-idx">${num}</span> / ${total}</span>
    <button class="lb-btn lb-prev" data-cursor="hover" aria-label="Previous">←</button>
    <button class="lb-btn lb-next" data-cursor="hover" aria-label="Next">→</button>
    <div class="lb-stage">
      <img class="lb-img" src="${f.src}" alt="${f.alt}" />
      <div class="lb-meta">
        <span class="lb-meta-idx tabular">${num}</span>
        <span class="lb-meta-cap">${f.caption}</span>
        <span>Frame ${num}</span>
      </div>
    </div>
    <span class="lb-hint">← / → &nbsp;·&nbsp; Esc</span>
  `;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) onClose();
  });
  overlay.querySelector('.lb-close')!.addEventListener('click', (e) => {
    e.stopPropagation();
    onClose();
  });
  overlay.querySelector('.lb-prev')!.addEventListener('click', (e) => {
    e.stopPropagation();
    onPrev();
  });
  overlay.querySelector('.lb-next')!.addEventListener('click', (e) => {
    e.stopPropagation();
    onNext();
  });

  requestAnimationFrame(() => {
    const img = overlay.querySelector('.lb-img') as HTMLElement;
    const meta = overlay.querySelector('.lb-meta') as HTMLElement;
    const tl = gsap.timeline();
    tl.to(overlay, { opacity: 1, duration: 0.4, ease: 'power3.out' });
    tl.to(img, { scale: 1, opacity: 1, duration: 0.6, ease: 'expo.out' }, 0.05);
    tl.fromTo(meta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.2);
  });

  return overlay;
}