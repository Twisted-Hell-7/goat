import { gsap } from 'gsap';

export function mountCursor(_ctx: { reduced: boolean }) {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.createElement('div');
  Object.assign(dot.style, {
    position: 'fixed',
    top: '-2px',
    left: '-2px',
    width: '4px',
    height: '4px',
    borderRadius: '9999px',
    background: 'var(--chalk)',
    pointerEvents: 'none',
    zIndex: '9998',
  } as CSSStyleDeclaration);
  dot.setAttribute('aria-hidden', 'true');
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  Object.assign(ring.style, {
    position: 'fixed',
    top: '-16px',
    left: '-16px',
    width: '32px',
    height: '32px',
    borderRadius: '9999px',
    border: '1px solid var(--chalk)',
    display: 'grid',
    placeItems: 'center',
    pointerEvents: 'none',
    zIndex: '9997',
    willChange: 'transform, width, height',
  } as CSSStyleDeclaration);
  ring.setAttribute('aria-hidden', 'true');

  const label = document.createElement('span');
  Object.assign(label.style, {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    letterSpacing: '0.12em',
    color: 'var(--chalk)',
    opacity: '0',
    whiteSpace: 'nowrap',
  } as CSSStyleDeclaration);
  ring.appendChild(label);
  document.body.appendChild(ring);

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const target = { x: pos.x, y: pos.y };

  const onMove = (e: MouseEvent) => {
    target.x = e.clientX;
    target.y = e.clientY;
    gsap.set(dot, { x: target.x, y: target.y });
  };
  window.addEventListener('mousemove', onMove);

  const tick = () => {
    pos.x += (target.x - pos.x) * 0.15;
    pos.y += (target.y - pos.y) * 0.15;
    gsap.set(ring, { x: pos.x, y: pos.y });
  };
  gsap.ticker.add(tick);

  const onOver = (e: MouseEvent) => {
    const t = (e.target as HTMLElement | null)?.closest('[data-cursor]') as HTMLElement | null;
    if (!t) {
      gsap.to(ring, { width: 32, height: 32, backgroundColor: 'transparent', borderColor: 'var(--chalk)', duration: 0.3 });
      gsap.to(label, { opacity: 0, duration: 0.2 });
      return;
    }
    const mode = t.dataset.cursor!;
    if (mode === 'hover') {
      gsap.to(ring, { width: 48, height: 48, backgroundColor: 'rgba(232,197,71,0.08)', borderColor: 'rgba(232,197,71,0.6)', duration: 0.3, ease: 'power3.out' });
      label.textContent = t.dataset.cursorLabel || '';
      gsap.to(label, { opacity: 1, duration: 0.3 });
    } else if (mode === 'view') {
      gsap.to(ring, { width: 64, height: 64, backgroundColor: 'rgba(232,197,71,0.06)', borderColor: 'rgba(232,197,71,0.5)', duration: 0.3 });
      label.textContent = '[ VIEW ]';
      gsap.to(label, { opacity: 1, duration: 0.3 });
    } else if (mode === 'playing') {
      gsap.to(ring, { width: 56, height: 56, backgroundColor: 'transparent', borderColor: 'rgba(232,197,71,0.5)', duration: 0.3 });
      label.textContent = '[ PLAYING ]';
      gsap.to(label, { opacity: 1, duration: 0.3 });
    }
  };
  window.addEventListener('mouseover', onOver);
}
