import { gsap, registerGSAP } from '../lib/gsap';
import { argumentQuote, argumentAttribution, trophies } from '../lib/data';

export function mountArgument(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#argument')!;
  const reduced = ctx.reduced;

  section.classList.add('section', 'section--full');
  Object.assign(section.style, {
    position: 'relative',
    padding: 'clamp(80px, 14vh, 180px) clamp(20px, 4vw, 56px)',
    display: 'grid',
    gridTemplateRows: '1fr auto',
    background: 'var(--void)',
  } as CSSStyleDeclaration);

  const quote = argumentQuote.split(' ');
  const wordsHtml = quote.map((w) => `<span class="argument-word" style="display:inline-block;margin-right:0.28em;">${w}</span>`).join('');

  section.innerHTML = `
    <div class="argument-quote" style="max-width:1100px;margin:0 auto;width:100%;display:flex;flex-direction:column;justify-content:center;">
      <span class="t-meta" style="margin-bottom:24px;">The Argument</span>
      <blockquote class="t-editorial" style="margin:0;font-size:clamp(32px, 4vw, 64px);line-height:1.08;color:var(--chalk);">${wordsHtml}</blockquote>
      <p style="margin-top:32px;font-family:var(--font-body);font-size:14px;color:var(--chalk-dim);letter-spacing:0.08em;">— ${argumentAttribution}</p>
    </div>
    <div class="trophies" style="max-width:900px;margin:0 auto;width:100%;padding-top:48px;border-top:1px solid rgba(235,235,235,0.12);">
      ${trophies.map((t) => `
        <div class="trophy-line" style="display:grid;grid-template-columns:1.6fr 0.6fr 1.6fr;padding:14px 0;border-bottom:1px solid rgba(235,235,235,0.08);font-family:var(--font-body);font-size:14px;color:var(--chalk);letter-spacing:0.04em;opacity:0;">
          <span>${t.name}</span>
          <span style="color:var(--gold-electric);font-weight:600;">${t.count}</span>
          <span style="color:var(--chalk-dim);">${t.years}</span>
        </div>
      `).join('')}
    </div>
  `;

  if (reduced) {
    gsap.set('.argument-word', { opacity: 1 });
    gsap.set('.trophy-line', { opacity: 1 });
    return;
  }

  registerGSAP();
  const words = section.querySelectorAll<HTMLElement>('.argument-word');
  gsap.set(words, { opacity: 0.12 });
  gsap.to(words, {
    opacity: 1,
    stagger: 0.04,
    scrollTrigger: { trigger: section.querySelector('.argument-quote'), start: 'top 60%', end: 'bottom 40%', scrub: 1.5 },
  });

  gsap.fromTo(
    '.trophy-line',
    { opacity: 0, y: 12 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: { trigger: section.querySelector('.trophies'), start: 'top 75%' },
    }
  );
}
