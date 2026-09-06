import { gsap, registerGSAP, ScrollTrigger } from '../lib/gsap';
import { frames } from '../lib/data';

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
    padding: '0',
    background: 'var(--void)',
    position: 'relative',
  } as CSSStyleDeclaration);
  if (reduced) section.setAttribute('data-mode', 'plain');

  const total = String(frames.length).padStart(2, '0');

  section.innerHTML = `
    <header class="stack-head">
      <span class="stack-tag label-tag">CHAPTER 04 · ARCHIVE</span>
      <h2 class="t-display stack-title">Frames<span class="stack-title-mark">.</span></h2>
      <p class="stack-lede">Eleven stills. Two decades. Scroll — each frame settles beneath the next.</p>
      <div class="stack-meta">
        <span class="tabular">${total} / ${total}</span>
        <span class="stack-meta-sep">·</span>
        <span>Archive 1987 — ${new Date().getFullYear()}</span>
      </div>
    </header>

    <div class="stack-wrap" role="list" aria-label="Messi frames archive, ${frames.length} photographs">
      ${frames
        .map((f, i) => {
          const num = String(i + 1).padStart(2, '0');
          return `
            <article class="stack-card" role="listitem" aria-label="Frame ${num}: ${f.caption}">
              <button class="stack-hit" data-i="${i}" data-cursor="view" aria-label="Open frame ${num}: ${f.caption}">
                <span class="stack-fig">
                  <img src="${f.src}" alt="${f.alt}" ${i > 1 ? 'loading="lazy"' : ''} decoding="async" />
                  <span class="stack-veil" aria-hidden="true"></span>
                </span>
                <span class="stack-top">
                  <span class="stack-top-left">
                    <span class="stack-idx tabular">${num}</span>
                    <span class="stack-ch">${chapterFor(i)}</span>
                  </span>
                  <span class="stack-count tabular">${num} / ${total}</span>
                </span>
                <span class="stack-cap">
                  <span class="stack-cap-text">${f.caption}</span>
                  <span class="stack-view">View <span aria-hidden="true">↗</span></span>
                </span>
              </button>
            </article>
          `;
        })
        .join('')}
    </div>

    <footer class="stack-foot" aria-hidden="true">
      <span class="t-display stack-foot-word">Fin<span class="stack-title-mark">.</span></span>
      <span class="stack-foot-sub">1987 — still playing</span>
    </footer>

    <style>
      .stack-head {
        max-width: 1280px;
        margin: 0 auto;
        padding: clamp(96px, 14vh, 180px) clamp(20px, 4vw, 56px) clamp(48px, 8vh, 110px);
        display: grid;
        gap: 24px;
      }
      .stack-tag { color: var(--chalk-dim); }
      .stack-title {
        font-size: clamp(64px, 12vw, 200px);
        margin: 0;
        font-weight: 700;
        letter-spacing: -0.04em;
        line-height: 0.85;
        color: var(--chalk);
      }
      .stack-title-mark { color: var(--gold-electric); }
      .stack-lede {
        max-width: 56ch;
        font-family: var(--font-display);
        font-weight: 300;
        font-size: clamp(15px, 1.4vw, 19px);
        line-height: 1.45;
        color: var(--chalk);
        opacity: 0.78;
        margin: 0;
      }
      .stack-meta {
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
      .stack-meta-sep { opacity: 0.5; }

      .stack-wrap { position: relative; }
      .stack-card {
        position: sticky;
        top: 0;
        height: 100vh;
        min-height: 560px;
        overflow: hidden;
        background: var(--void);
        box-shadow: 0 -32px 70px rgba(0, 0, 0, 0.55);
        will-change: transform;
      }
      .stack-hit {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        padding: 0;
        cursor: pointer;
        text-align: left;
        background: none;
      }
      .stack-hit:focus-visible { outline: none; }
      .stack-hit:focus-visible .stack-fig { outline: 2px solid var(--gold-electric); outline-offset: -2px; }
      .stack-fig { position: absolute; inset: 0; display: block; overflow: hidden; }
      .stack-fig img {
        width: 100%;
        height: 112%;
        object-fit: cover;
        display: block;
        filter: grayscale(0.12) contrast(1.05) brightness(0.92);
        transition: filter 700ms var(--ease-expo);
        will-change: transform;
      }
      .stack-hit:hover .stack-fig img,
      .stack-hit:focus-visible .stack-fig img {
        filter: grayscale(0) contrast(1.06) brightness(1);
      }
      .stack-veil {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(to top, rgba(3,3,3,0.88) 0%, rgba(3,3,3,0.4) 28%, transparent 55%),
          linear-gradient(to bottom, rgba(3,3,3,0.45) 0%, transparent 26%);
      }
      .stack-top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        padding: clamp(20px, 4vh, 40px) clamp(20px, 4vw, 56px);
      }
      .stack-top-left { display: flex; align-items: center; gap: 16px; }
      .stack-idx {
        font-family: var(--font-mono);
        font-size: 12px;
        letter-spacing: 0.2em;
        color: var(--gold-electric);
      }
      .stack-ch {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--chalk);
        opacity: 0.75;
      }
      .stack-count {
        font-family: var(--font-mono);
        font-size: 12px;
        letter-spacing: 0.2em;
        color: var(--chalk);
        opacity: 0.75;
      }
      .stack-cap {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 24px;
        padding: clamp(24px, 5vh, 56px) clamp(20px, 4vw, 56px);
      }
      .stack-cap-text {
        font-family: var(--font-display);
        font-weight: 300;
        font-size: clamp(26px, 4.4vw, 58px);
        line-height: 1.08;
        letter-spacing: -0.02em;
        color: var(--chalk);
        max-width: 22ch;
        text-shadow: 0 12px 50px rgba(0, 0, 0, 0.6);
      }
      .stack-view {
        flex: 0 0 auto;
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--chalk);
        opacity: 0.7;
        padding-bottom: 10px;
      }
      .stack-foot {
        display: grid;
        gap: 12px;
        justify-items: center;
        text-align: center;
        padding: clamp(96px, 16vh, 200px) 20px;
        background: var(--void);
      }
      .stack-foot-word {
        margin: 0;
        font-weight: 700;
        letter-spacing: -0.04em;
        line-height: 0.85;
        font-size: clamp(64px, 10vw, 170px);
        color: var(--chalk);
      }
      .stack-foot-sub {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--chalk-dim);
      }

      /* Reduced-motion fallback: plain vertical list, no sticky */
      #frames[data-mode="plain"] .stack-card {
        position: static;
        height: 72vh;
        min-height: 420px;
        margin: 0 clamp(20px, 4vw, 56px) 24px;
      }

      @media (max-width: 640px) {
        .stack-card { min-height: 480px; }
        .stack-cap { flex-direction: column; align-items: flex-start; gap: 14px; }
        .stack-view { padding-bottom: 0; }
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

  const cards = [...section.querySelectorAll<HTMLElement>('.stack-card')];
  cards.forEach((card) => {
    const btn = card.querySelector<HTMLButtonElement>('.stack-hit')!;
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

  // Header entrance
  gsap.fromTo(
    section.querySelector('.stack-head'),
    { opacity: 0, y: 32 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: section.querySelector('.stack-head'), start: 'top 80%' },
    }
  );

  // Deck effect: each covered card settles back — scales down + dims.
  cards.forEach((card, i) => {
    if (i === cards.length - 1) return;
    const next = cards[i + 1];
    gsap.to(card, {
      scale: 0.92,
      filter: 'brightness(0.45)',
      transformOrigin: 'center top',
      ease: 'none',
      scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top+=120', scrub: true },
    });
    const cap = card.querySelector('.stack-cap');
    if (cap) {
      gsap.to(cap, {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top+=240', scrub: true },
      });
    }
  });

  // Gentle parallax inside every frame.
  cards.forEach((card) => {
    const img = card.querySelector('img');
    if (!img) return;
    gsap.fromTo(
      img,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
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
