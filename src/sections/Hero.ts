import { gsap, registerGSAP } from '../lib/gsap';

const base = import.meta.env.BASE_URL;

export async function mountHero(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#hero')!;
  const isReduced = ctx.reduced;

  section.classList.add('section', 'section--full');
  Object.assign(section.style, {
    position: 'relative',
    overflow: 'hidden',
    minHeight: '100vh',
  } as CSSStyleDeclaration);

  // z:0 — video
  const video = document.createElement('video');
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.poster = `${base}assest/goat-poster.jpg`;
  video.setAttribute('aria-hidden', 'true');
  Object.assign(video.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: '0',
    opacity: '0.6',
  } as CSSStyleDeclaration);
  const source = document.createElement('source');
  source.src = `${base}messi-hero-video.webm`;
  source.type = 'video/webm';
  video.append(source);
  // try to play (mobile/Chrome may need this even with muted)
  video.addEventListener('canplay', () => video.play().catch(() => {}));
  section.append(video);

  // z:10 — overlay
  const overlay = document.createElement('div');
  overlay.setAttribute('aria-hidden', 'true');
  Object.assign(overlay.style, {
    position: 'absolute',
    inset: '0',
    zIndex: '10',
    background:
      'radial-gradient(ellipse at center, transparent 0%, rgba(3,3,3,0.55) 60%, #030303 100%), linear-gradient(to bottom, transparent 50%, #030303 100%)',
  } as CSSStyleDeclaration);
  section.append(overlay);

  // z:20 — particles
  const particleHost = document.createElement('div');
  particleHost.setAttribute('aria-hidden', 'true');
  Object.assign(particleHost.style, {
    position: 'absolute',
    inset: '0',
    zIndex: '20',
    pointerEvents: 'none',
  } as CSSStyleDeclaration);
  section.append(particleHost);
  if (!isReduced) {
    const { mountEmberField } = await import('../three/EmberField');
    mountEmberField(particleHost);
  }

  // z:30 — title block
  const titleBlock = document.createElement('div');
  Object.assign(titleBlock.style, {
    position: 'absolute',
    left: '0',
    right: '0',
    bottom: '18vh',
    zIndex: '30',
    padding: '0 clamp(20px, 4vw, 56px)',
  } as CSSStyleDeclaration);

  const titleOverflow = document.createElement('div');
  titleOverflow.style.overflow = 'hidden';

  const h1 = document.createElement('h1');
  h1.setAttribute('aria-label', 'MESSI');
  Object.assign(h1.style, {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: '0',
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(72px, 14vw, 220px)',
    lineHeight: '0.9',
    letterSpacing: '-0.04em',
    color: 'var(--chalk)',
    fontWeight: '700',
  } as CSSStyleDeclaration);
  'MESSI'.split('').forEach((ch) => {
    const span = document.createElement('span');
    span.className = 'letter';
    Object.assign(span.style, { display: 'inline-block', willChange: 'transform' } as CSSStyleDeclaration);
    span.textContent = ch;
    h1.append(span);
  });
  titleOverflow.append(h1);
  titleBlock.append(titleOverflow);

  const sub = document.createElement('div');
  Object.assign(sub.style, {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    letterSpacing: '0.12em',
    color: 'var(--chalk-dim)',
    textTransform: 'uppercase',
    opacity: '0',
  } as CSSStyleDeclaration);
  const subL = document.createElement('span');
  subL.textContent = 'LIONEL ANDRÉS MESSI · ROSARIO, 1987';
  const subR = document.createElement('span');
  subR.style.color = 'var(--gold-electric)';
  subR.textContent = '10';
  sub.append(subL, subR);
  titleBlock.append(sub);
  section.append(titleBlock);

  // z:40 — scroll cue
  const cue = document.createElement('div');
  cue.setAttribute('aria-hidden', 'true');
  Object.assign(cue.style, {
    position: 'absolute',
    bottom: '4vh',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '40',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    opacity: '0',
  } as CSSStyleDeclaration);
  const cueLine = document.createElement('div');
  cueLine.className = 'cue-line';
  Object.assign(cueLine.style, { width: '1px', height: '48px', background: 'var(--gold-electric)', transformOrigin: 'top center' } as CSSStyleDeclaration);
  const cueText = document.createElement('span');
  Object.assign(cueText.style, { fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.2em', color: 'var(--chalk-dim)', textTransform: 'uppercase' } as CSSStyleDeclaration);
  cueText.textContent = 'scroll';
  cue.append(cueLine, cueText);
  section.append(cue);

  if (isReduced) {
    gsap.set([h1, sub, cue], { opacity: 1, y: 0 });
    return;
  }

  registerGSAP();
  const tl = gsap.timeline({ delay: 0.4 });
  tl.fromTo(
    h1.querySelectorAll<HTMLElement>('.letter'),
    { y: 160, clipPath: 'inset(100% 0 0 0)' },
    { y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'expo.out', stagger: 0.06 },
    0
  );
  tl.to(sub, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.0);
  tl.to(cue, { opacity: 1, duration: 0.6 }, 1.4);

  // pulse + auto-dismiss on first scroll
  const pulse = gsap.to(cueLine, { scaleY: 0, duration: 1.0, ease: 'power2.inOut', yoyo: true, repeat: -1, transformOrigin: 'top center', delay: 1.8 });
  const onScroll = () => {
    if (window.scrollY > 80) {
      gsap.to(cue, { opacity: 0, duration: 0.4, onComplete: () => pulse.kill() });
      window.removeEventListener('scroll', onScroll);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}
