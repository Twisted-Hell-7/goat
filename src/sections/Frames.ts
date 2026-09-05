import { gsap, registerGSAP } from '../lib/gsap';
import { frames } from '../lib/data';

export function mountFrames(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#frames')!;
  const reduced = ctx.reduced;

  section.classList.add('section');
  Object.assign(section.style, {
    padding: 'clamp(80px, 12vh, 160px) clamp(20px, 4vw, 56px)',
    background: 'var(--obsidian)',
  } as CSSStyleDeclaration);

  section.innerHTML = `
    <header style="max-width:1280px;margin:0 auto 48px;display:flex;justify-content:space-between;align-items:flex-end;border-bottom:1px solid rgba(235,235,235,0.12);padding-bottom:16px;">
      <h2 class="t-display" style="font-size:clamp(48px, 7vw, 96px);margin:0;">Frames</h2>
      <span class="t-meta">11 / Moments</span>
    </header>
    <div class="frames-grid" style="max-width:1280px;margin:0 auto;"></div>
    <style>
      .frames-grid { column-count: 3; column-gap: 6px; }
      .frame { break-inside: avoid; display:block; margin-bottom: 6px; width:100%; padding:0; position:relative; overflow:hidden; background:var(--void); }
      .frame-inner { position:relative; overflow:hidden; transition: transform 600ms cubic-bezier(0.25, 0, 0, 1); }
      .frame-inner img { width:100%; height:auto; display:block; transition: transform 800ms cubic-bezier(0.25, 0, 0, 1); }
      .frame-caption { position:absolute; left:0; right:0; bottom:0; padding:14px 16px; font-family:var(--font-body); font-size:13px; color:var(--chalk); transform:translateY(100%); transition: transform 400ms cubic-bezier(0.25, 0, 0, 1); }
      .frame:hover .frame-inner { transform: scale(1.04); }
      .frame:hover .frame-caption { transform: translateY(0); }
      @media (max-width: 900px) { .frames-grid { column-count: 2; } }
      @media (max-width: 560px) { .frames-grid { column-count: 1; } }
    </style>
  `;

  const grid = section.querySelector<HTMLElement>('.frames-grid')!;
  frames.forEach((f, i) => {
    const btn = document.createElement('button');
    btn.className = 'frame';
    btn.dataset.cursor = 'view';
    btn.setAttribute('aria-label', `Open: ${f.caption}`);
    btn.innerHTML = `
      <div class="frame-inner">
        <img src="${f.src}" alt="${f.alt}" loading="lazy" />
        <div aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(to top, rgba(3,3,3,0.7) 0%, transparent 30%);"></div>
        <div class="frame-caption">${f.caption}</div>
      </div>
    `;
    btn.addEventListener('click', () => openLightbox(i));
    grid.append(btn);
  });

  // ── lightbox state (single instance) ────────────────────
  let current: HTMLDivElement | null = null;
  let currentIdx = 0;

  const close = () => {
    if (!current) return;
    current.remove();
    current = null;
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

  if (reduced) {
    gsap.set('.frame', { clipPath: 'inset(0% 0 0 0)' });
    return;
  }

  registerGSAP();
  gsap.fromTo(
    '.frame',
    { clipPath: 'inset(100% 0 0 0)' },
    {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.0,
      ease: 'expo.inOut',
      stagger: { amount: 1.4, from: 'center' },
      scrollTrigger: { trigger: grid, start: 'top 75%' },
    }
  );
}

function buildLightbox(
  index: number,
  onClose: () => void,
  onNext: () => void,
  onPrev: () => void
): HTMLDivElement {
  const f = frames[index];
  const overlay = document.createElement('div');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', f.caption);
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '90',
    background: 'rgba(3,3,3,0.96)',
    display: 'grid',
    placeItems: 'center',
  } as CSSStyleDeclaration);

  overlay.innerHTML = `
    <button aria-label="Close" data-cursor="hover" class="lb-close" style="position:absolute;top:24px;right:24px;font-family:var(--font-body);font-size:12px;letter-spacing:0.2em;color:var(--chalk-dim);text-transform:uppercase;">Close ×</button>
    <span style="position:absolute;top:24px;right:96px;font-family:var(--font-body);font-size:12px;letter-spacing:0.2em;color:var(--chalk-dim);">[${index + 1} / ${frames.length}]</span>
    <button aria-label="Previous" data-cursor="hover" class="lb-prev" style="position:absolute;left:24px;top:50%;transform:translateY(-50%);font-family:var(--font-display);font-size:32px;color:var(--chalk);">←</button>
    <button aria-label="Next" data-cursor="hover" class="lb-next" style="position:absolute;right:24px;top:50%;transform:translateY(-50%);font-family:var(--font-display);font-size:32px;color:var(--chalk);">→</button>
    <figure style="margin:0;max-width:min(90vw, 1200px);max-height:85vh;display:flex;flex-direction:column;gap:16px;">
      <img class="lb-img" src="${f.src}" alt="${f.alt}" style="max-width:100%;max-height:80vh;object-fit:contain;" />
      <figcaption style="font-family:var(--font-body);font-size:14px;color:var(--chalk);text-align:center;">${f.caption}</figcaption>
    </figure>
  `;

  overlay.addEventListener('click', (e) => { if (e.target === overlay) onClose(); });
  overlay.querySelector('.lb-close')!.addEventListener('click', (e) => { e.stopPropagation(); onClose(); });
  overlay.querySelector('.lb-prev')!.addEventListener('click', (e) => { e.stopPropagation(); onPrev(); });
  overlay.querySelector('.lb-next')!.addEventListener('click', (e) => { e.stopPropagation(); onNext(); });

  requestAnimationFrame(() => {
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power3.out' });
    const img = overlay.querySelector('.lb-img') as HTMLElement;
    gsap.fromTo(img, { scale: 0.96 }, { scale: 1, duration: 0.5, ease: 'power3.out' });
  });

  return overlay;
}
