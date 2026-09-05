import { gsap, registerGSAP, ScrollTrigger } from '../lib/gsap';
import { stats } from '../lib/data';

export function mountNumbers(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#numbers')!;
  const reduced = ctx.reduced;

  section.classList.add('section', 'section--full', 'bg-hatch');
  Object.assign(section.style, {
    position: 'relative',
    padding: 'clamp(80px, 12vh, 160px) clamp(20px, 4vw, 56px)',
    display: 'grid',
    placeItems: 'center',
    background: 'var(--void)',
  } as CSSStyleDeclaration);

  const grid = document.createElement('div');
  Object.assign(grid.style, {
    width: '100%',
    maxWidth: '1280px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 'clamp(24px, 5vw, 80px)',
  } as CSSStyleDeclaration);
  section.append(grid);

  const items: HTMLElement[] = [];
  stats.forEach((s, i) => {
    const isHero = i === 0;
    const isEmph = !!s.emphasis;
    const size = isHero ? 'clamp(72px, 10vw, 140px)' : 'clamp(56px, 7vw, 96px)';

    const item = document.createElement('div');
    item.className = 'stat';
    item.dataset.value = String(s.value);
    item.dataset.emphasis = String(!!s.emphasis);
    Object.assign(item.style, {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      alignItems: isEmph ? 'flex-end' : 'flex-start',
      gridColumn: isHero ? 'span 2' : 'span 1',
      textAlign: isEmph ? 'right' : 'left',
    } as CSSStyleDeclaration);

    const value = document.createElement('span');
    value.className = 'stat-value tabular';
    Object.assign(value.style, {
      fontFamily: 'var(--font-display)',
      fontSize: size,
      lineHeight: '0.9',
      color: isEmph ? 'var(--gold-electric)' : 'var(--chalk)',
      letterSpacing: '0.02em',
    } as CSSStyleDeclaration);
    value.textContent = '0';

    const label = document.createElement('span');
    label.className = 'stat-label';
    Object.assign(label.style, {
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      letterSpacing: '0.16em',
      color: 'var(--chalk-dim)',
      textTransform: 'uppercase',
      opacity: '0',
    } as CSSStyleDeclaration);
    label.textContent = s.label;

    item.append(value, label);
    grid.append(item);
    items.push(item);
  });

  if (reduced) {
    items.forEach((it) => {
      (it.querySelector('.stat-value') as HTMLElement).textContent = it.dataset.value!;
      (it.querySelector('.stat-label') as HTMLElement).style.opacity = '1';
    });
    return;
  }

  registerGSAP();
  const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 75%' } });

  items.forEach((it, i) => {
    const target = Number(it.dataset.value);
    const isEmph = it.dataset.emphasis === 'true';
    const obj = { v: 0 };
    const valueEl = it.querySelector('.stat-value') as HTMLElement;
    const labelEl = it.querySelector('.stat-label') as HTMLElement;

    tl.to(
      obj,
      {
        v: target,
        duration: isEmph ? 1.6 : 1.2,
        ease: 'expo.out',
        onUpdate: () => (valueEl.textContent = String(Math.round(obj.v))),
      },
      i * 0.15
    );
    tl.to(
      labelEl,
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      i * 0.15 + 1.0
    );
    if (i === items.length - 1) tl.to({}, { duration: 0.8 });
  });
}
