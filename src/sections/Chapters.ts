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
  } as CSSStyleDeclaration);

  const stage = document.createElement('div');
  Object.assign(stage.style, {
    position: 'relative',
    width: '100%',
    maxWidth: '1280px',
    height: 'min(82vh, 720px)',
    perspective: '2200px',
    margin: '0 auto',
  } as CSSStyleDeclaration);
  section.append(stage);

  // two "pages": the one showing and the one flipping in
  const make = (i: number) => {
    const c = chapters[i];
    const page = document.createElement('article');
    page.className = 'chapter-page';
    page.dataset.idx = String(i);
    Object.assign(page.style, {
      position: 'absolute',
      inset: '0',
      display: 'grid',
      gridTemplateColumns: '40% 60%',
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
      opacity: '0',
      pointerEvents: 'none',
    } as CSSStyleDeclaration);
    page.innerHTML = `
      <div style="padding:clamp(32px, 6vh, 80px) clamp(20px, 4vw, 60px);display:flex;flex-direction:column;justify-content:center;gap:18px;background:linear-gradient(135deg, var(--void) 0%, var(--obsidian) 100%);position:relative;z-index:2;">
        <span class="t-meta">${c.index}</span>
        <h2 class="t-display" style="font-size:clamp(48px, 7vw, 96px);margin:0;color:var(--chalk);">${c.era}</h2>
        <span style="font-family:var(--font-body);font-size:13px;color:${c.accent};letter-spacing:0.08em;">${c.years}</span>
        <blockquote class="t-editorial" style="margin:14px 0 0;font-size:clamp(18px, 2vw, 26px);line-height:1.3;color:var(--chalk);max-width:40ch;">&ldquo;${c.quote}&rdquo;</blockquote>
        <div style="margin-top:20px;padding-top:14px;border-top:1px solid var(--gold-electric);display:inline-flex;align-items:center;gap:10px;width:fit-content;">
          <span style="font-family:var(--font-body);font-size:10px;letter-spacing:0.2em;color:var(--gold-electric);text-transform:uppercase;">Key Stat</span>
          <span style="font-family:var(--font-body);font-size:13px;color:var(--chalk);">${c.stat}</span>
        </div>
        ${c.redCard ? `<p style="margin:18px 0 0;font-family:var(--font-body);font-size:11px;color:var(--scar-red);letter-spacing:0.08em;">2006 World Cup · Red card vs Germany</p>` : ''}
      </div>
      <div style="position:relative;overflow:hidden;background:var(--void);">
        <img src="${c.image}" alt="${c.era}, ${c.years}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.9;" />
        <div aria-hidden="true" style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(3,3,3,0.55) 80%);"></div>
      </div>
      <div aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(to right, transparent 0%, transparent 60%, rgba(0,0,0,0.25) 100%);mix-blend-mode:multiply;pointer-events:none;"></div>
    `;
    return page;
  };

  const pages = chapters.map((_, i) => make(i));
  pages.forEach((p) => stage.append(p));

  // ── chapter dots ──────────────────────────────────────────────
  const dots = document.createElement('div');
  Object.assign(dots.style, {
    position: 'absolute',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
    zIndex: '10',
  } as CSSStyleDeclaration);
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
    } as CSSStyleDeclaration);
    b.addEventListener('click', () => {
      manualOverride = true;
      go(i);
    });
    dots.append(b);
    dotEls.push(b);
  });
  section.append(dots);

  // ── state + animation ─────────────────────────────────────────
  let current = 0;
  let manualOverride = false;
  let timer: number | null = null;

  const startTimer = () => {
    if (timer != null) window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      go((current + 1) % chapters.length);
    }, 5000);
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

  const go = (next: number) => {
    if (next === current) {
      // still restart timer
      if (!manualOverride) startTimer();
      return;
    }
    if (timer != null) {
      window.clearTimeout(timer);
      timer = null;
    }

    const from = pages[current];
    const to = pages[next];
    const dir = next > current ? 1 : -1;

    if (reduced) {
      gsap.set(from, { opacity: 0 });
      gsap.set(to, { opacity: 1, x: 0, rotateY: 0 });
      current = next;
      updateDots();
      if (!manualOverride) startTimer();
      return;
    }

    registerGSAP();

    // place incoming page on the right (or left if going back), rotated -90deg
    gsap.set(to, {
      opacity: 1,
      xPercent: dir * 8,
      rotateY: dir * -60,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
    });

    // page-flip timeline
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(from, { opacity: 0, x: 0, rotateY: 0 });
        current = next;
        updateDots();
        if (!manualOverride) startTimer();
      },
    });

    tl.to(
      from,
      {
        rotateY: dir * 60,
        xPercent: -dir * 4,
        duration: 1.1,
        ease: 'power2.in',
      },
      0
    );
    tl.to(
      to,
      {
        rotateY: 0,
        xPercent: 0,
        duration: 1.1,
        ease: 'power2.out',
      },
      0
    );
    tl.to(
      from,
      { opacity: 0, duration: 0.4, ease: 'power2.in' },
      0.4
    );
  };

  // ── controls ──────────────────────────────────────────────────
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      manualOverride = true;
      go((current + 1) % chapters.length);
    } else if (e.key === 'ArrowLeft') {
      manualOverride = true;
      go((current - 1 + chapters.length) % chapters.length);
    }
  };
  window.addEventListener('keydown', onKey);

  // pause on hover, resume on leave
  let paused = false;
  stage.addEventListener('mouseenter', () => {
    paused = true;
    if (timer != null) {
      window.clearTimeout(timer);
      timer = null;
    }
  });
  stage.addEventListener('mouseleave', () => {
    if (paused) {
      paused = false;
      if (!manualOverride) startTimer();
    }
  });

  // ── start ─────────────────────────────────────────────────────
  registerGSAP();
  gsap.set(pages[0], { opacity: 1, x: 0, rotateY: 0 });
  updateDots();
  if (!reduced) startTimer();
}
