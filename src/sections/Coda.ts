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
    <p style="margin:24px 0 0;font-family:var(--font-body);font-size:14px;color:var(--chalk-dim);letter-spacing:0.16em;text-transform:uppercase;">1987 — <span data-coda-year></span> · <span style="color:var(--gold-electric);">still playing</span> <span data-coda-pulse style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--gold-electric);margin-left:6px;vertical-align:1px;"></span></p>
    <p data-coda-stats style="margin:12px 0 0;font-family:var(--font-body);font-size:11px;color:var(--chalk-dim);letter-spacing:0.18em;text-transform:uppercase;opacity:0.85;"></p>
    <div class="coda-meta" style="margin-top:80px;display:flex;justify-content:space-between;align-items:center;font-family:var(--font-body);font-size:12px;letter-spacing:0.12em;color:var(--chalk-dim);text-transform:uppercase;opacity:0;flex-wrap:wrap;gap:16px;">
      <span>The Living Archive</span>
      <div style="display:flex;gap:32px;">
        <a href="https://github.com" data-cursor="hover" target="_blank" rel="noopener noreferrer" style="color:inherit;">GitHub ↗</a>
        <a href="#top" data-cursor="hover" style="color:inherit;">Back to top ↑</a>
      </div>
    </div>
  `;

  // Live dates — no hardcoding. Open em dash stays: he's still here.
  const now = new Date();
  const year = now.getFullYear();
  const birth = new Date(1987, 5, 24);
  let age = year - birth.getFullYear();
  const hadBirthday =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  if (!hadBirthday) age -= 1;
  const season = year - 2004 + 1;

  const yearEl = section.querySelector('[data-coda-year]');
  if (yearEl) yearEl.textContent = String(year);
  const statsEl = section.querySelector('[data-coda-stats]');
  if (statsEl) statsEl.textContent = `Age ${age} · Pro season ${season} · Rosario → Miami`;
  const pulse = section.querySelector('[data-coda-pulse]') as HTMLElement | null;

  if (reduced) {
    gsap.set(['.coda-title', '.coda-meta'], { opacity: 1 });
    return;
  }

  registerGSAP();
  if (pulse) {
    gsap.to(pulse, { opacity: 0.15, duration: 1.1, ease: 'sine.inOut', repeat: -1, yoyo: true });
  }
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
