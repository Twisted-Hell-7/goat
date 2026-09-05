import { gsap, registerGSAP } from '../lib/gsap';
import { chapters } from '../lib/data';
import type Lenis from 'lenis';

export function mountChapters(ctx: { root: HTMLElement; reduced: boolean }, lenis: Lenis | null) {
  const section = ctx.root.querySelector<HTMLElement>('#chapters')!;
  const reduced = ctx.reduced;

  section.classList.add('section');
  Object.assign(section.style, {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    background: 'var(--void)',
  } as CSSStyleDeclaration);

  const track = document.createElement('div');
  Object.assign(track.style, {
    display: 'flex',
    height: '100%',
    width: `${chapters.length * 100}vw`,
    willChange: 'transform',
  } as CSSStyleDeclaration);
  section.append(track);

  chapters.forEach((c) => {
    const panel = document.createElement('article');
    panel.className = 'chapter-panel';
    Object.assign(panel.style, {
      width: '100vw',
      height: '100vh',
      flexShrink: '0',
      display: 'grid',
      gridTemplateColumns: '40% 60%',
      alignItems: 'stretch',
      position: 'relative',
    } as CSSStyleDeclaration);

    // content
    const content = document.createElement('div');
    Object.assign(content.style, {
      padding: 'clamp(40px, 8vh, 120px) clamp(24px, 4vw, 80px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '20px',
      position: 'relative',
      zIndex: '2',
    } as CSSStyleDeclaration);
    content.innerHTML = `
      <span class="t-meta">${c.index}</span>
      <h2 class="t-display" style="font-size:clamp(56px, 8vw, 120px);margin:0;">${c.era}</h2>
      <span style="font-family:var(--font-body);font-size:14px;color:${c.accent};letter-spacing:0.08em;">${c.years}</span>
      <blockquote class="t-editorial" style="margin:16px 0 0;font-size:clamp(20px, 2.4vw, 32px);line-height:1.25;color:var(--chalk);max-width:40ch;">&ldquo;${c.quote}&rdquo;</blockquote>
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--gold-electric);display:inline-flex;align-items:center;gap:12px;width:fit-content;">
        <span style="font-family:var(--font-body);font-size:10px;letter-spacing:0.2em;color:var(--gold-electric);text-transform:uppercase;">Key Stat</span>
        <span style="font-family:var(--font-body);font-size:13px;color:var(--chalk);">${c.stat}</span>
      </div>
      ${c.redCard ? `<p style="margin:24px 0 0;font-family:var(--font-body);font-size:12px;color:var(--scar-red);letter-spacing:0.08em;">2006 World Cup · Red card vs Germany</p>` : ''}
    `;
    panel.append(content);

    // image
    const imgWrap = document.createElement('div');
    Object.assign(imgWrap.style, { position: 'relative', overflow: 'hidden' } as CSSStyleDeclaration);
    const img = document.createElement('img');
    img.className = 'chapter-image';
    img.src = c.image;
    img.alt = `${c.era}, ${c.years}`;
    img.loading = 'lazy';
    Object.assign(img.style, {
      position: 'absolute',
      inset: '0',
      width: '120%',
      height: '100%',
      objectFit: 'cover',
      willChange: 'transform',
    } as CSSStyleDeclaration);
    imgWrap.append(img);

    const gradient = document.createElement('div');
    gradient.setAttribute('aria-hidden', 'true');
    Object.assign(gradient.style, {
      position: 'absolute',
      inset: '0',
      background: 'linear-gradient(to right, var(--void) 0%, transparent 12%, transparent 88%, var(--void) 100%)',
    } as CSSStyleDeclaration);
    imgWrap.append(gradient);

    panel.append(imgWrap);
    track.append(panel);
  });

  // progress rail
  const rail = document.createElement('div');
  rail.setAttribute('aria-hidden', 'true');
  Object.assign(rail.style, {
    position: 'absolute',
    left: '0',
    right: '0',
    bottom: '0',
    height: '2px',
    background: 'rgba(235,235,235,0.08)',
  } as CSSStyleDeclaration);
  const railFill = document.createElement('div');
  Object.assign(railFill.style, {
    height: '100%',
    width: '100%',
    background: 'var(--gold-electric)',
    transformOrigin: 'left center',
    transform: 'scaleX(0)',
  } as CSSStyleDeclaration);
  rail.append(railFill);
  section.append(rail);

  if (reduced) {
    track.style.transform = 'none';
    railFill.style.transform = 'scaleX(1)';
    return;
  }

  // pin + horizontal scrub
  registerGSAP();
  const getDistance = () => track.scrollWidth - window.innerWidth;
  const tween = gsap.to(track, {
    x: () => -getDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${getDistance()}`,
      pin: true,
      scrub: 1.5,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  gsap.to(railFill, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${getDistance()}`, scrub: true },
  });

  // per-panel image parallax
  track.querySelectorAll<HTMLElement>('.chapter-panel').forEach((panel) => {
    const img = panel.querySelector<HTMLImageElement>('.chapter-image');
    if (!img) return;
    gsap.fromTo(
      img,
      { xPercent: 10 },
      {
        xPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
      }
    );
  });
}
