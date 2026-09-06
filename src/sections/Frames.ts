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
    overflow: 'hidden',
  } as CSSStyleDeclaration);
  if (reduced) section.setAttribute('data-mode', 'scroll');

  const total = String(frames.length).padStart(2, '0');

  section.innerHTML = `
    <div class="strip-pin">
      <header class="strip-head">
        <div class="strip-head-left">
          <span class="strip-tag label-tag">CHAPTER 04 · ARCHIVE</span>
          <h2 class="t-display strip-title">Frames<span class="strip-title-mark">.</span></h2>
        </div>
        <div class="strip-head-right">
          <span class="strip-count tabular"><span class="strip-count-cur">01</span> / ${total}</span>
          <span class="strip-chapter">Rosario · 1987</span>
        </div>
      </header>

      <div class="strip-track" role="list" aria-label="Messi frames archive, ${frames.length} photographs">
        ${frames
          .map((f, i) => {
            const num = String(i + 1).padStart(2, '0');
            return `
              <button class="strip-panel" data-i="${i}" data-cursor="view" role="listitem" aria-label="Open frame ${num}: ${f.caption}">
                <span class="strip-fig">
                  <img src="${f.src}" alt="${f.alt}" ${i > 2 ? 'loading="lazy"' : ''} />
                  <span class="strip-fig-veil" aria-hidden="true"></span>
                  <span class="strip-num tabular" aria-hidden="true">${num}</span>
                </span>
                <span class="strip-cap">
                  <span class="strip-cap-row">
                    <span class="strip-idx tabular">${num}</span>
                    <span class="strip-ch">${chapterFor(i)}</span>
                  </span>
                  <span class="strip-cap-text">${f.caption}</span>
                </span>
              </button>
            `;
          })
          .join('')}
        <div class="strip-end" aria-hidden="true">
          <span class="t-display strip-end-word">Fin<span class="strip-title-mark">.</span></span>
          <span class="strip-end-sub">1987 — still playing</span>
        </div>
      </div>

      <div class="strip-rail" aria-hidden="true">
        <div class="strip-rail-fill"></div>
      </div>
      <span class="strip-hint">Scroll to travel →</span>
    </div>

    <style>
      .strip-pin {
        position: relative;
        height: 100vh;
        min-height: 640px;
        display: flex;
        align-items: center;
        overflow: hidden;
        background:
          radial-gradient(80% 60% at 50% 110%, rgba(168, 197, 216, 0.07), transparent 60%),
          var(--void);
      }
      .strip-head {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 5;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 24px;
        padding: clamp(20px, 4vh, 44px) clamp(20px, 6vw, 88px) 0;
        pointer-events: none;
      }
      .strip-head-left { display: grid; gap: 10px; }
      .strip-tag { color: var(--chalk-dim); }
      .strip-title {
        margin: 0;
        font-weight: 700;
        letter-spacing: -0.04em;
        line-height: 0.85;
        font-size: clamp(52px, 8vw, 132px);
        color: var(--chalk);
        text-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
      }
      .strip-title-mark { color: var(--gold-electric); }
      .strip-head-right {
        display: grid;
        gap: 8px;
        justify-items: end;
        padding-top: 8px;
      }
      .strip-count {
        font-family: var(--font-mono);
        font-size: clamp(14px, 1.4vw, 18px);
        letter-spacing: 0.18em;
        color: var(--chalk);
      }
      .strip-count-cur { color: var(--gold-electric); }
      .strip-chapter {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--chalk-dim);
      }
      .strip-track {
        display: flex;
        align-items: center;
        gap: clamp(28px, 4vw, 72px);
        padding-inline: clamp(20px, 6vw, 88px);
        will-change: transform;
      }
      .strip-panel {
        flex: 0 0 auto;
        width: clamp(300px, 58vw, 820px);
        padding: 0;
        text-align: left;
        cursor: pointer;
        background: none;
      }
      .strip-panel:focus-visible { outline: none; }
      .strip-panel:focus-visible .strip-fig { outline: 2px solid var(--gold-electric); outline-offset: 6px; }
      .strip-fig {
        position: relative;
        display: block;
        height: min(58vh, 600px);
        min-height: 340px;
        overflow: hidden;
        background: var(--obsidian);
      }
      .strip-fig img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transform: scale(1.18);
        filter: grayscale(0.12) contrast(1.05) brightness(0.94);
        transition: filter 700ms var(--ease-expo);
        will-change: transform;
      }
      .strip-panel:hover .strip-fig img,
      .strip-panel:focus-visible .strip-fig img {
        filter: grayscale(0) contrast(1.06) brightness(1);
      }
      .strip-fig-veil {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(to top, rgba(3,3,3,0.45) 0%, transparent 30%),
          linear-gradient(to bottom, rgba(3,3,3,0.25) 0%, transparent 22%);
      }
      .strip-num {
        position: absolute;
        right: 14px;
        bottom: 8px;
        font-family: var(--font-display);
        font-weight: 700;
        font-size: clamp(56px, 6vw, 96px);
        line-height: 1;
        color: transparent;
        -webkit-text-stroke: 1px rgba(235, 235, 235, 0.4);
        pointer-events: none;
      }
      .strip-cap { display: grid; gap: 10px; margin-top: 18px; }
      .strip-cap-row {
        display: flex;
        align-items: center;
        gap: 14px;
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
      }
      .strip-idx { color: var(--gold-electric); }
      .strip-ch { color: var(--chalk-dim); }
      .strip-cap-text {
        font-family: var(--font-display);
        font-weight: 300;
        font-size: clamp(17px, 1.6vw, 23px);
        line-height: 1.3;
        letter-spacing: -0.01em;
        color: var(--chalk);
        max-width: 40ch;
      }
      .strip-end {
        flex: 0 0 auto;
        display: grid;
        gap: 12px;
        justify-items: start;
        padding-right: clamp(20px, 6vw, 88px);
      }
      .strip-end-word {
        margin: 0;
        font-weight: 700;
        letter-spacing: -0.04em;
        line-height: 0.85;
        font-size: clamp(64px, 10vw, 170px);
        color: var(--chalk);
      }
      .strip-end-sub {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--chalk-dim);
      }
      .strip-rail {
        position: absolute;
        left: clamp(20px, 6vw, 88px);
        right: clamp(20px, 6vw, 88px);
        bottom: clamp(24px, 5vh, 48px);
        height: 1px;
        background: var(--border-hairline);
        z-index: 5;
      }
      .strip-rail-fill {
        height: 100%;
        background: var(--gold-electric);
        transform: scaleX(0);
        transform-origin: left center;
      }
      .strip-hint {
        position: absolute;
        bottom: clamp(40px, 8vh, 72px);
        left: 50%;
        transform: translateX(-50%);
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--chalk-dim);
        opacity: 0.7;
        z-index: 5;
        pointer-events: none;
      }

      /* Reduced-motion fallback: native horizontal scroll, no pin */
      #frames[data-mode="scroll"] .strip-pin {
        height: auto;
        min-height: 0;
        display: block;
        overflow: visible;
        padding: clamp(80px, 10vh, 140px) 0 60px;
      }
      #frames[data-mode="scroll"] .strip-head { position: static; padding-bottom: 32px; pointer-events: auto; }
      #frames[data-mode="scroll"] .strip-track {
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding-bottom: 24px;
        will-change: auto;
      }
      #frames[data-mode="scroll"] .strip-panel { scroll-snap-align: center; }
      #frames[data-mode="scroll"] .strip-rail,
      #frames[data-mode="scroll"] .strip-hint { display: none; }

      @media (max-width: 640px) {
        .strip-panel { width: 78vw; }
        .strip-fig { height: 44vh; min-height: 280px; }
        .strip-head-right { display: none; }
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

  const track = section.querySelector<HTMLElement>('.strip-track')!;
  const countCur = section.querySelector<HTMLElement>('.strip-count-cur')!;
  const chapterEl = section.querySelector<HTMLElement>('.strip-chapter')!;
  const railFill = section.querySelector<HTMLElement>('.strip-rail-fill')!;
  const hint = section.querySelector<HTMLElement>('.strip-hint')!;

  track.querySelectorAll<HTMLButtonElement>('.strip-panel').forEach((btn) => {
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

  const travel = () => Math.max(0, track.scrollWidth - window.innerWidth);

  // Head entrance
  gsap.fromTo(
    section.querySelector('.strip-head'),
    { opacity: 0, y: -18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'expo.out',
      scrollTrigger: { trigger: section, start: 'top 80%' },
    }
  );

  // The strip: vertical scroll becomes horizontal travel (pinned).
  const horiz = gsap.to(track, {
    x: () => -travel(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => '+=' + travel(),
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const idx = Math.min(frames.length - 1, Math.round(self.progress * (frames.length - 1)));
        countCur.textContent = String(idx + 1).padStart(2, '0');
        chapterEl.textContent = chapterFor(idx);
        railFill.style.transform = `scaleX(${self.progress})`;
        hint.style.opacity = String(0.7 * (1 - self.progress * 2));
      },
    },
  });

  // Per-frame parallax inside the travelling track.
  track.querySelectorAll<HTMLElement>('.strip-panel').forEach((panel) => {
    const img = panel.querySelector('img');
    if (!img) return;
    gsap.fromTo(
      img,
      { xPercent: -5 },
      {
        xPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: panel,
          containerAnimation: horiz,
          start: 'left right',
          end: 'right left',
          scrub: true,
        },
      }
    );
  });

  // Re-measure once photography settles (cached vs network).
  let refreshed = false;
  const refreshOnce = () => {
    if (refreshed) return;
    refreshed = true;
    ScrollTrigger.refresh();
  };
  const imgs = track.querySelectorAll('img');
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
