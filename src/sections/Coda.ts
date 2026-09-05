import { gsap, registerGSAP } from '../lib/gsap';

export function mountCoda(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#coda')!;
  const reduced = ctx.reduced;

  section.classList.add('section');
  Object.assign(section.style, {
    padding: 'clamp(80px, 14vh, 180px) clamp(20px, 4vw, 56px) 80px',
    background: 'var(--void)',
    borderTop: '1px solid rgba(235,235,235,0.08)',
    textAlign: 'center',
  } as CSSStyleDeclaration);

  section.innerHTML = `
    <h2 class="coda-title t-display" style="font-size:clamp(72px, 12vw, 180px);margin:0;opacity:0;">M E S S I</h2>
    <p style="margin:24px 0 0;font-family:var(--font-body);font-size:14px;color:var(--chalk-dim);letter-spacing:0.16em;text-transform:uppercase;">1987 — <span style="color:var(--gold-electric);">still playing</span></p>
    <div class="coda-meta" style="margin-top:80px;display:flex;justify-content:space-between;align-items:center;font-family:var(--font-body);font-size:12px;letter-spacing:0.12em;color:var(--chalk-dim);text-transform:uppercase;opacity:0;flex-wrap:wrap;gap:16px;">
      <span>The Living Archive</span>
      <div style="display:flex;gap:32px;">
        <a href="https://github.com" data-cursor="hover" target="_blank" rel="noopener noreferrer" style="color:inherit;">GitHub ↗</a>
        <a href="#top" data-cursor="hover" style="color:inherit;">Back to top ↑</a>
      </div>
    </div>
  `;

  if (reduced) {
    gsap.set(['.coda-title', '.coda-meta'], { opacity: 1 });
    return;
  }

  registerGSAP();
  gsap.fromTo(
    '.coda-title',
    { opacity: 0, y: 20, letterSpacing: '0.4em' },
    { opacity: 1, y: 0, letterSpacing: '0.08em', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: section, start: 'top 70%' } }
  );
  gsap.fromTo(
    '.coda-meta',
    { opacity: 0 },
    { opacity: 1, duration: 1.0, delay: 0.4, scrollTrigger: { trigger: section, start: 'top 70%' } }
  );
}
