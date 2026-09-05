import { navLinks } from '../lib/data';

export function mountNav(_ctx: { reduced: boolean }) {
  const header = document.createElement('header');
  Object.assign(header.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '50',
    padding: '24px clamp(20px, 4vw, 56px)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as CSSStyleDeclaration);

  const logo = document.createElement('a');
  logo.href = '#top';
  logo.dataset.cursor = 'hover';
  logo.dataset.cursorLabel = '[ TOP ]';
  Object.assign(logo.style, {
    fontFamily: 'var(--font-display)',
    fontSize: '16px',
    letterSpacing: '0.08em',
    color: 'var(--chalk)',
  } as CSSStyleDeclaration);
  logo.textContent = 'MESSI';

  const navDesktop = document.createElement('nav');
  navDesktop.setAttribute('aria-label', 'Primary');
  navDesktop.className = 'nav-desktop';
  Object.assign(navDesktop.style, { display: 'none' } as CSSStyleDeclaration);

  const ul = document.createElement('ul');
  Object.assign(ul.style, {
    display: 'flex',
    gap: '36px',
    listStyle: 'none',
    margin: '0',
    padding: '0',
  } as CSSStyleDeclaration);
  for (const l of navLinks) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = l.href;
    a.dataset.cursor = 'hover';
    a.textContent = l.label;
    Object.assign(a.style, {
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      letterSpacing: '0.12em',
      color: 'var(--chalk-dim)',
      transition: 'color 200ms ease',
    } as CSSStyleDeclaration);
    a.addEventListener('mouseenter', () => (a.style.color = 'var(--chalk)'));
    a.addEventListener('mouseleave', () => (a.style.color = 'var(--chalk-dim)'));
    li.append(a);
    ul.append(li);
  }
  navDesktop.append(ul);

  const toggle = document.createElement('button');
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.dataset.cursor = 'hover';
  Object.assign(toggle.style, {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: '6px',
    padding: '8px',
  } as CSSStyleDeclaration);
  toggle.className = 'nav-toggle';
  const top = document.createElement('span');
  Object.assign(top.style, { width: '22px', height: '1px', background: 'var(--chalk)', transition: 'transform 300ms var(--ease-expo)' } as CSSStyleDeclaration);
  const bot = document.createElement('span');
  Object.assign(bot.style, { width: '22px', height: '1px', background: 'var(--chalk)', transition: 'transform 300ms var(--ease-expo)' } as CSSStyleDeclaration);
  toggle.append(top, bot);

  let open = false;
  let overlay: HTMLDivElement | null = null;
  toggle.addEventListener('click', () => {
    open = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    top.style.transform = open ? 'translateY(3.5px) rotate(45deg)' : 'none';
    bot.style.transform = open ? 'translateY(-3.5px) rotate(-45deg)' : 'none';
    if (open) {
      overlay = document.createElement('div');
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      Object.assign(overlay.style, {
        position: 'fixed',
        inset: '0',
        background: 'var(--void)',
        display: 'grid',
        placeItems: 'center',
        zIndex: '60',
      } as CSSStyleDeclaration);
      const ul2 = document.createElement('ul');
      Object.assign(ul2.style, { listStyle: 'none', margin: '0', padding: '0', display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'center' } as CSSStyleDeclaration);
      navLinks.forEach((l, i) => {
        const li = document.createElement('li');
        Object.assign(li.style, { animation: `navIn 400ms ${i * 60}ms var(--ease-expo) both` } as CSSStyleDeclaration);
        const a = document.createElement('a');
        a.href = l.href;
        a.textContent = l.label;
        Object.assign(a.style, { fontFamily: 'var(--font-display)', fontSize: '48px', color: 'var(--chalk)', letterSpacing: '0.02em' } as CSSStyleDeclaration);
        a.addEventListener('click', () => {
          open = false;
          overlay?.remove();
          overlay = null;
        });
        li.append(a);
        ul2.append(li);
      });
      overlay.append(ul2);
      document.body.append(overlay);
    } else {
      overlay?.remove();
      overlay = null;
    }
  });

  header.append(logo, navDesktop, toggle);
  document.body.append(header);

  // responsive via CSS-in-JS (no separate stylesheet)
  const style = document.createElement('style');
  style.textContent = `
    @media (min-width: 768px) {
      .nav-desktop { display: block !important; }
      .nav-toggle { display: none !important; }
    }
    @keyframes navIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}
