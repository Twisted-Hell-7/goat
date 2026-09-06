import { gsap, registerGSAP } from '../lib/gsap';
import { chapters } from '../lib/data';

export function mountChapters(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#chapters')!;
  const reduced = ctx.reduced;

  section.classList.add('section');
  Object.assign(section.style, {
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
    background: 'var(--void)',
    display: 'grid',
    placeItems: 'center',
  });

  // ── stage ──────────────────────────────────────────────────────
  const stage = document.createElement('div');
  stage.className = 'chapter-stage';
  Object.assign(stage.style, {
    position: 'relative',
    width: '100%',
    maxWidth: '1280px',
    height: 'min(82vh, 720px)',
    perspective: '2400px',
    margin: '0 auto',
    perspectiveOrigin: '50% 50%',
  });
  section.append(stage);

  // ── responsive layout (desktop: 40/60 book · mobile: image top, content below) ──
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .chapter-page { display: grid; grid-template-columns: 40% 60%; }
    .chapter-page .ch-left {
      padding: clamp(32px, 6vh, 80px) clamp(20px, 4vw, 60px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 18px;
      background: linear-gradient(135deg, var(--void) 0%, var(--obsidian) 100%);
      position: relative;
      z-index: 2;
      min-height: 0;
    }
    .chapter-page .ch-era {
      font-size: clamp(48px, 7vw, 96px);
      margin: 0;
      color: var(--chalk);
      font-weight: 700;
      letter-spacing: -0.03em;
    }
    .chapter-page .ch-quote {
      margin: 14px 0 0;
      font-size: clamp(18px, 2vw, 26px);
      line-height: 1.3;
      color: var(--chalk);
      max-width: 40ch;
      font-style: italic;
    }
    @media (max-width: 720px) {
      .chapter-stage { width: calc(100% - 24px) !important; height: min(86vh, 660px) !important; }
      .chapter-page { grid-template-columns: 1fr; grid-template-rows: minmax(0, 32vh) minmax(0, 1fr); }
      .chapter-page .ch-right { order: -1; }
      .chapter-page .ch-left {
        padding: 22px 20px 28px;
        gap: 10px;
        justify-content: flex-start;
        overflow-y: auto;
      }
      .chapter-page .ch-era { font-size: clamp(40px, 13vw, 58px); }
      .chapter-page .ch-quote { font-size: 15px; margin-top: 8px; }
      .chapter-page .ch-stat { margin-top: 12px !important; flex-wrap: wrap; }
    }
  `;
  section.append(styleEl);

  // ── page factory ───────────────────────────────────────────────
  const make = (i: number) => {
    const c = chapters[i];
    const page = document.createElement('article');
    page.className = 'chapter-page';
    page.dataset.idx = String(i);
    Object.assign(page.style, {
      position: 'absolute',
      inset: '0',
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
      opacity: '0',
      pointerEvents: 'none',
    });

    page.innerHTML = `
      <div class="ch-left" style="background:linear-gradient(135deg, var(--void) 0%, var(--obsidian) 100%);position:relative;z-index:2;">
        <span class="t-meta ch-meta">${c.index}</span>
        <h2 class="t-display ch-era">${c.era}</h2>
        <span class="ch-years" style="font-family:var(--font-body);font-size:13px;color:${c.accent};letter-spacing:0.08em;">${c.years}</span>
        <blockquote class="t-editorial ch-quote">&ldquo;${c.quote}&rdquo;</blockquote>
        <div class="ch-stat" style="margin-top:20px;padding-top:14px;border-top:1px solid var(--gold-electric);display:inline-flex;align-items:center;gap:10px;width:fit-content;">
          <span style="font-family:var(--font-body);font-size:10px;letter-spacing:0.2em;color:var(--gold-electric);text-transform:uppercase;">Key Stat</span>
          <span style="font-family:var(--font-body);font-size:13px;color:var(--chalk);">${c.stat}</span>
        </div>
        ${c.redCard ? `<p class="ch-red" style="margin:18px 0 0;font-family:var(--font-body);font-size:11px;color:var(--scar-red);letter-spacing:0.08em;">2006 World Cup · Red card vs Germany</p>` : ''}
      </div>
      <div class="ch-right" style="position:relative;overflow:hidden;background:var(--void);">
        <img class="ch-img" src="${c.image}" alt="${c.era}, ${c.years}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.9;" />
        <div aria-hidden="true" style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(3,3,3,0.55) 80%);"></div>
        <div class="ch-spine" aria-hidden="true" style="position:absolute;top:0;bottom:0;width:40px;background:linear-gradient(to right, rgba(0,0,0,0.5), transparent);"></div>
      </div>
      <div aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(to right, transparent 0%, transparent 60%, rgba(0,0,0,0.25) 100%);mix-blend-mode:multiply;pointer-events:none;"></div>
    `;
    return page;
  };

  const pages = chapters.map((_, i) => make(i));
  pages.forEach((p) => stage.append(p));

  // (edge arrows removed — auto-rotate only)

  // ── chapter dots + progress bar ───────────────────────────────
  const dots = document.createElement('div');
  Object.assign(dots.style, {
    position: 'absolute',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
zIndex: '10',
    alignItems: 'center',
  });

  const dotEls: HTMLButtonElement[] = [];
  chapters.forEach((c, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Go to ${c.era}`);
    b.dataset.cursor = 'hover';
    Object.assign(b.style, {
      width: '24px',
      height: '2px',
      background: 'rgba(235,235,235,0.25)',
      transition: 'background 400ms ease, width 400ms ease',
      padding: '0',
    });
    b.addEventListener('click', () => {
      // dots are read-only indicators — auto-rotate is in charge
    });
    dots.append(b);
    dotEls.push(b);
  });

  // Progress bar background under dots
  const progressWrap = document.createElement('div');
  Object.assign(progressWrap.style, {
    position: 'absolute',
    bottom: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '200px',
    height: '1px',
    background: 'rgba(235,235,235,0.15)',
    zIndex: '5',
  });
  const progressBar = document.createElement('div');
  Object.assign(progressBar.style, {
    width: '0%',
    height: '100%',
    background: 'var(--gold-electric)',
  });
  progressWrap.append(progressBar);

  section.append(dots);
  section.append(progressWrap);

  // ── state + animation ─────────────────────────────────────────
  let current = 0;
  let timer: number | null = null;
  let progressRAF: number | null = null;
  let progressStart = 0;
  const ROTATE_MS = 5000;
  const FLIP_S = 1.2;

  const easeFlip = 'power3.inOut';

  const startTimer = () => {
    if (timer != null) window.clearTimeout(timer);
    progressStart = performance.now();
    if (progressRAF != null) cancelAnimationFrame(progressRAF);
    const tick = () => {
      const elapsed = performance.now() - progressStart;
      const pct = Math.min(100, (elapsed / ROTATE_MS) * 100);
      progressBar.style.width = pct + '%';
      if (elapsed < ROTATE_MS && !paused) {
        progressRAF = requestAnimationFrame(tick);
      }
    };
    progressRAF = requestAnimationFrame(tick);
    timer = window.setTimeout(() => {
      go((current + 1) % chapters.length);
    }, ROTATE_MS);
  };

  const stopTimer = () => {
    if (timer != null) {
      window.clearTimeout(timer);
      timer = null;
    }
    if (progressRAF != null) {
      cancelAnimationFrame(progressRAF);
      progressRAF = null;
    }
    progressBar.style.width = '0%';
  };

  const updateDots = () => {
    dotEls.forEach((d, i) => {
      if (i === current) {
        d.style.background = 'var(--gold-electric)';
        d.style.width = '40px';
      } else {
        d.style.background = 'rgba(235,235,235,0.25)';
        d.style.width = '24px';
      }
    });
  };

  const resetContentState = (page: HTMLElement) => {
    gsap.set(page.querySelector('.ch-meta'), { opacity: 0, y: 12 });
    gsap.set(page.querySelector('.ch-era'), { opacity: 0, y: 24 });
    gsap.set(page.querySelector('.ch-years'), { opacity: 0, y: 12 });
    gsap.set(page.querySelector('.ch-quote'), { opacity: 0, y: 18 });
    gsap.set(page.querySelector('.ch-stat'), { opacity: 0, y: 10 });
    const red = page.querySelector('.ch-red');
    if (red) gsap.set(red, { opacity: 0, y: 10 });
    const img = page.querySelector('.ch-img');
    if (img) gsap.set(img, { scale: 1.08 });
  };

  const animateContentIn = (page: HTMLElement, startAt: number) => {
    const tl = gsap.timeline();
    tl.to(page.querySelector('.ch-meta'),  { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, startAt);
    tl.to(page.querySelector('.ch-era'),   { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, startAt + 0.05);
    tl.to(page.querySelector('.ch-years'), { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, startAt + 0.15);
    tl.to(page.querySelector('.ch-quote'), { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, startAt + 0.25);
    tl.to(page.querySelector('.ch-stat'),  { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, startAt + 0.4);
    const red = page.querySelector('.ch-red');
    if (red) tl.to(red, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, startAt + 0.5);
    const img = page.querySelector('.ch-img');
    if (img) tl.to(img, { scale: 1, duration: 1.6, ease: 'expo.out' }, startAt);
    return tl;
  };

  const go = (nextRaw: number) => {
    const next = ((nextRaw % chapters.length) + chapters.length) % chapters.length;
    if (next === current) {
      startTimer();
      return;
    }
    if (timer != null) {
      window.clearTimeout(timer);
      timer = null;
    }
    if (progressRAF != null) {
      cancelAnimationFrame(progressRAF);
      progressRAF = null;
    }
    progressBar.style.width = '0%';

    const from = pages[current];
    const to = pages[next];
    const dir = next > current ? 1 : -1;
    const origin = dir > 0 ? 'left center' : 'right center';

    if (reduced) {
      gsap.set(from, { opacity: 0 });
      gsap.set(to, { opacity: 1, x: 0, rotateY: 0, scale: 1 });
      gsap.fromTo(
        to.querySelectorAll('.ch-meta, .ch-era, .ch-years, .ch-quote, .ch-stat, .ch-red'),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 }
      );
      current = next;
      updateDots();
      startTimer();
      return;
    }

    registerGSAP();
    resetContentState(to);

    // Position the incoming page off-screen on the right (or left if going back),
    // tilted away from camera as if its leading edge is just starting to come around.
    gsap.set(to, {
      opacity: 1,
      xPercent: dir * 12,
      rotateY: dir * -90,
      transformOrigin: origin,
      zIndex: dir > 0 ? 3 : 1,
    });
    const fromZ = gsap.getProperty(from, 'zIndex') as string;
    gsap.set(from, { zIndex: dir > 0 ? 2 : 4 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(from, { opacity: 0, x: 0, rotateY: 0, zIndex: fromZ });
        gsap.set(to, { zIndex: dir > 0 ? 4 : 2 });
        current = next;
        updateDots();
        startTimer();
      },
    });

    // The peel: outgoing page rotates from 0 to +90 (or -90 if going back).
    // Slight z-push on the spine adds depth. The shadow on the page comes
    // from a CSS gradient overlay on .ch-right — we modulate it via opacity.
    tl.to(
      from,
      {
        rotateY: dir * 90,
        xPercent: dir * 4,
        duration: FLIP_S,
        ease: easeFlip,
      },
      0
    );
    tl.to(
      from,
      { opacity: 0, duration: 0.25, ease: 'power2.in' },
      FLIP_S - 0.3
    );

    // Incoming page rotates in from -90 (or +90) to 0.
    tl.to(
      to,
      {
        rotateY: 0,
        xPercent: 0,
        duration: FLIP_S,
        ease: easeFlip,
      },
      0
    );

    // Content stagger on the incoming page starts as it crosses the midpoint.
    const contentStart = FLIP_S * 0.45;
    animateContentIn(to, contentStart);
  };

  // ── controls ──────────────────────────────────────────────────
  // Auto-rotate only — no manual overrides (swipe on touch).

  // swipe to flip on touch devices
  let touchX: number | null = null;
  stage.addEventListener(
    'touchstart',
    (e) => {
      touchX = e.touches[0].clientX;
    },
    { passive: true }
  );
  stage.addEventListener(
    'touchend',
    (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) < 42) return;
      go(current + (dx < 0 ? 1 : -1));
    },
    { passive: true }
  );

  // pause on hover, resume on leave
  let paused = false;
  stage.addEventListener('mouseenter', () => {
    paused = true;
    if (timer != null) {
      window.clearTimeout(timer);
      timer = null;
    }
    if (progressRAF != null) {
      cancelAnimationFrame(progressRAF);
      progressRAF = null;
    }
  });
  stage.addEventListener('mouseleave', () => {
    if (paused) {
      paused = false;
      startTimer();
    }
  });

  // Also pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (timer != null) {
        window.clearTimeout(timer);
        timer = null;
      }
    } else if (!paused) {
      startTimer();
    }
  });

  // ── start ─────────────────────────────────────────────────────
  registerGSAP();
  gsap.set(pages[0], { opacity: 1, x: 0, rotateY: 0, zIndex: 4 });
  resetContentState(pages[0]);
  animateContentIn(pages[0], 0);
  updateDots();
  if (!reduced) startTimer();
}