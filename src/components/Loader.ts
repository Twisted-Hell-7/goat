import { gsap } from 'gsap';

export function mountLoader(_ctx: { reduced: boolean }) {
  const overlay = document.createElement('div');
  overlay.setAttribute('aria-hidden', 'true');
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '100',
    background: 'var(--void)',
    display: 'flex',
    alignItems: 'flex-end',
  } as CSSStyleDeclaration);

  const fill = document.createElement('div');
  Object.assign(fill.style, {
    position: 'absolute',
    left: '0',
    bottom: '0',
    height: '1px',
    width: '100%',
    background: 'var(--gold-electric)',
    transformOrigin: 'left center',
  } as CSSStyleDeclaration);
  overlay.appendChild(fill);
  document.body.appendChild(overlay);

  const exit = () => {
    gsap.to(overlay, {
      yPercent: -100,
      duration: 0.8,
      ease: 'expo.inOut',
      onComplete: () => overlay.remove(),
    });
  };

  const tl = gsap.timeline({
    onComplete: () => setTimeout(exit, 250),
  });
  tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'expo.inOut' });

  // Bail-out: when app signals ready, also exit (in case timeline already done)
  const onReady = () => {
    tl.kill();
    exit();
  };
  window.addEventListener('messi:ready', onReady, { once: true });

  // Hard bail: never block more than 2.5s
  setTimeout(onReady, 2500);
}
