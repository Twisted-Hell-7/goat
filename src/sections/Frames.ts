import { gsap, registerGSAP, ScrollTrigger } from '../lib/gsap';
import { frames } from '../lib/data';

const chapterFor = (i: number): string => {
  if (i <= 0) return 'Rosario · 1987';
  if (i <= 4) return 'Barcelona · 2004–2021';
  if (i === 5 || i === 6 || i === 7) return 'Argentina · 2022';
  if (i <= 9) return 'Inter Miami · 2023–';
  return 'Anthem · Always';
};

// Masonry wall: WC kiss as full-width hero banner,
// the other ten as a 3-column masonry with natural aspects.
const HERO = 5;
const REST = frames.map((_, i) => i).filter((i) => i !== HERO);

export function mountFrames(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#frames')!;
  const reduced = ctx.reduced;

  section.classList.add('section', 'bg-hatch');
  Object.assign(section.style, {
    padding: 'clamp(96px, 14vh, 180px) clamp(20px, 4vw, 56px) clamp(80px, 12vh, 160px)',
    background: 'var(--obsidian)',
    position: 'relative',
  } as CSSStyleDeclaration);

  const total = String(frames.length).padStart(2, '0');
  const heroNum = String(HERO + 1).padStart(2, '0');

  section.innerHTML = `
    <header class="m-head">
      <span class="m-tag label-tag">CHAPTER 04 · ARCHIVE</span>
      <h2 class="t-display m-title">Frames<span class="m-title-mark">.</span></h2>
      <p class="m-lede">Eleven stills. Two decades. The dossier of a player who redefined what a footballer could be.</p>
      <div class="m-meta">
        <span class="tabular">${total} / ${total}</span>
        <span class="m-meta-sep">·</span>
        <span>Archive 1987 — ${new Date().getFullYear()}</span>
      </div>
    </header>

    <button class="m-hero" data-i="${HERO}" data-cursor="view" aria-label="Open frame ${heroNum}: ${frames[HERO].caption}">
      <span class="m-hero-fig">
        <img src="${frames[HERO].src}" alt="${frames[HERO].alt}" decoding="async" />
        <span class="m-hero-veil" aria-hidden="true"></span>
        <span class="m-hero-badge">Feature</span>
      </span>
      <span class="m-hero-cap">
        <span class="m-hero-cap-row">
          <span class="m-idx tabular">${heroNum}</span>
          <span class="m-ch">${chapterFor(HERO)}</span>
        </span>
        <span class="m-hero-cap-text">${frames[HERO].caption}</span>
      </span>
    </button>

    <div class="masonry" role="list" aria-label="Messi frames archive, remaining photographs">
      ${REST.map((i) => {
        const f = frames[i];
        const num = String(i + 1).padStart(2, '0');
        return `
          <button class="m-item" data-i="${i}" data-cursor="view" role="listitem" aria-label="Open frame ${num}: ${f.caption}">
            <span class="m-item-fig">
              <img src="${f.src}" alt="${f.alt}" loading="lazy" decoding="async" />
              <span class="m-item-veil" aria-hidden="true"></span>
            </span>
            <span class="m-item-cap">
              <span class="m-item-cap-row">
                <span class="m-idx tabular">${num}</span>
                <span class="m-ch">${chapterFor(i)}</span>
              </span>
              <span class="m-item-cap-text">${f.caption}</span>
            </span>
          </button>
        `;
      }).join('')}
    </div>

    <style>
      .m-head {
        max-width: 1280px;
        margin: 0 auto clamp(48px, 8vh, 104px);
        display: grid;
        gap: 24px;
      }
      .m-tag { color: var(--chalk-dim); }
      .m-title {
        font-size: clamp(64px, 12vw, 200px);
        margin: 0;
        font-weight: 700;
        letter-spacing: -0.04em;
        line-height: 0.85;
        color: var(--chalk);
      }
      .m-title-mark { color: var(--gold-electric); }
      .m-lede {
        max-width: 56ch;
        font-family: var(--font-display);
        font-weight: 300;
        font-size: clamp(15px, 1.4vw, 19px);
        line-height: 1.45;
        color: var(--chalk);
        opacity: 0.78;
        margin: 0;
      }
      .m-meta {
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
      .m-meta-sep { opacity: 0.5; }

      /* ── hero banner ── */
      .m-hero {
        position: relative;
        display: block;
        width: 100%;
        max-width: 1280px;
        margin: 0 auto clamp(20px, 3vh, 32px);
        padding: 0;
        cursor: pointer;
        text-align: left;
        background: var(--void);
        overflow: hidden;
      }
      .m-hero:focus-visible { outline: 2px solid var(--gold-electric); outline-offset: 4px; }
      .m-hero-fig { position: relative; display: block; height: min(68vh, 620px); min-height: 380px; overflow: hidden; }
      .m-hero-fig img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        filter: grayscale(0.1) contrast(1.05) brightness(0.92);
        transform: scale(1.04);
        transition: transform 1200ms var(--ease-expo), filter 900ms var(--ease-expo);
        will-change: transform;
      }
      .m-hero:hover .m-hero-fig img,
      .m-hero:focus-visible .m-hero-fig img { transform: scale(1.0); filter: grayscale(0) contrast(1.06) brightness(1); }
      .m-hero-veil {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(to top, rgba(3,3,3,0.88) 0%, rgba(3,3,3,0.35) 32%, transparent 60%);
      }
      .m-hero-badge {
        position: absolute;
        top: 20px;
        left: 20px;
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--gold-electric);
        padding: 7px 12px;
        border: 1px solid var(--gold-electric);
        background: rgba(3,3,3,0.45);
      }
      .m-hero-cap {
        position: absolute;
        left: clamp(20px, 3vw, 44px);
        right: clamp(20px, 3vw, 44px);
        bottom: clamp(20px, 4vh, 40px);
        display: grid;
        gap: 12px;
      }
      .m-hero-cap-row { display: flex; align-items: center; gap: 16px; }
      .m-idx {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.2em;
        color: var(--gold-electric);
      }
      .m-ch {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--chalk-dim);
      }
      .m-hero-cap-text {
        font-family: var(--font-display);
        font-weight: 300;
        font-size: clamp(24px, 3.4vw, 46px);
        line-height: 1.1;
        letter-spacing: -0.02em;
        color: var(--chalk);
        max-width: 24ch;
        text-shadow: 0 12px 50px rgba(0, 0, 0, 0.6);
      }

      /* ── masonry ── */
      .masonry {
        max-width: 1280px;
        margin: 0 auto;
        columns: 3;
        column-gap: 14px;
      }
      .m-item {
        position: relative;
        display: block;
        width: 100%;
        padding: 0;
        margin: 0 0 14px;
        break-inside: avoid;
        cursor: pointer;
        text-align: left;
        background: var(--void);
        overflow: hidden;
      }
      .m-item:focus-visible { outline: 2px solid var(--gold-electric); outline-offset: 4px; }
      .m-item-fig { position: relative; display: block; overflow: hidden; }
      .m-item-fig img {
        width: 100%;
        height: auto;
        display: block;
        filter: grayscale(0.15) contrast(1.04) brightness(0.92);
        transform: scale(1.0);
        transition: transform 1100ms var(--ease-expo), filter 800ms var(--ease-expo);
        will-change: transform;
      }
      .m-item:hover .m-item-fig img,
      .m-item:focus-visible .m-item-fig img { transform: scale(1.06); filter: grayscale(0) contrast(1.06) brightness(1); }
      .m-item-veil {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(to top, rgba(3,3,3,0.85) 0%, rgba(3,3,3,0.3) 30%, transparent 55%);
        opacity: 0.9;
        transition: opacity 600ms var(--ease-expo);
      }
      .m-item:hover .m-item-veil { opacity: 0.6; }
      .m-item-cap {
        position: absolute;
        left: 16px;
        right: 16px;
        bottom: 14px;
        display: grid;
        gap: 8px;
      }
      .m-item-cap-row { display: flex; align-items: center; gap: 12px; }
      .m-item-cap-text {
        font-family: var(--font-display);
        font-weight: 300;
        font-size: clamp(15px, 1.3vw, 19px);
        line-height: 1.28;
        letter-spacing: -0.01em;
        color: var(--chalk);
      }

      @media (max-width: 1024px) {
        .masonry { columns: 2; }
      }
      @media (max-width: 640px) {
        .masonry { columns: 2; column-gap: 8px; }
        .m-item { margin-bottom: 8px; }
        .m-item-cap { left: 10px; right: 10px; bottom: 10px; }
        .m-item-cap-text { font-size: 13px; }
        .m-hero-fig { height: 52vh; min-height: 300px; }
      }

      /* ── Lightbox (unchanged) ───────────────────────────── */
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

  section.querySelectorAll<HTMLButtonElement>('[data-i]').forEach((btn) => {
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

  // Header + hero reveal
  gsap.fromTo(
    section.querySelector('.m-head'),
    { opacity: 0, y: 32 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: section.querySelector('.m-head'), start: 'top 82%' },
    }
  );
  gsap.fromTo(
    section.querySelector('.m-hero'),
    { opacity: 0, clipPath: 'inset(12% 4% 12% 4%)' },
    {
      opacity: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.2,
      ease: 'expo.inOut',
      scrollTrigger: { trigger: section.querySelector('.m-hero'), start: 'top 85%' },
    }
  );

  // Masonry reveal — develops from the center outward.
  const items = [...section.querySelectorAll<HTMLElement>('.m-item')];
  const mid = (items.length - 1) / 2;
  items.forEach((el, k) => {
    const dist = Math.abs(k - mid);
    gsap.fromTo(
      el,
      { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      {
        opacity: 1,
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.0,
        delay: dist * 0.08,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: el, start: 'top 92%' },
      }
    );
  });

  // Re-measure once photography settles.
  let refreshed = false;
  const refreshOnce = () => {
    if (refreshed) return;
    refreshed = true;
    ScrollTrigger.refresh();
  };
  const imgs = section.querySelectorAll('img');
  let loaded = 0;
  imgs.forEach((img) => {
    if ((img as HTMLImageElement).complete) {
      loaded += 1;
    } else {
      img.addEventListener('load', () => {
        loaded += 1;
        if (loaded === imgs.length) refreshOnce();
      });
    }
  });
  if (loaded === imgs.length) refreshOnce();
  setTimeout(refreshOnce, 2500);

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
