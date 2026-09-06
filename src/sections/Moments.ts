import { gsap, registerGSAP } from '../lib/gsap';
import { iconicMoments, argentinaArc, dates } from '../lib/bible';

export function mountMoments(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#moments')!;
  const reduced = ctx.reduced;
  section.classList.add('section');
  Object.assign(section.style, { background: 'var(--void)', padding: 'clamp(80px,14vh,180px) clamp(20px,4vw,56px)', position: 'relative', overflow: 'clip' } as CSSStyleDeclaration);

  section.innerHTML = `
    <div class="bib-atmo" aria-hidden="true">
      <div class="bib-vignette is-blue"></div>
      <div class="bib-ghost" data-ghost>10</div>
      <div class="bib-grain"></div>
    </div>
    <div class="bib-wrap">
      <div class="bib-head">
        <div class="bib-rule" aria-hidden="true"></div>
        <span class="t-meta">06 — The Weight of the Wait</span>
        <h2 class="t-display bib-title">LOST EVERYTHING.<br/>THEN WON IT ALL.</h2>
        <p class="bib-sub">10 near-misses across 15 years → 3 trophies in 3 years. The greatest comeback in football history.</p>
      </div>
      <div class="bib-arcwrap">
        <div class="bib-spine" aria-hidden="true"><div class="bib-spinefill" data-spine></div></div>
        <div class="bib-arc">
          ${argentinaArc.map((a) => `<div class="bib-arcrow${a.won ? ' is-won' : ''}"><span class="tabular bib-arcy">${a.year}</span><span class="bib-arcevent">${a.event}</span><span class="bib-dim">${a.state}</span><span class="bib-dot" aria-hidden="true"></span></div>`).join('')}
        </div>
      </div>
      <div class="bib-head" style="margin-top:88px;">
        <div class="bib-rule" aria-hidden="true"></div>
        <span class="t-meta">Iconic moments — story cards</span>
        <h2 class="t-display bib-title">ANATOMY<br/>OF A MYTH.</h2>
      </div>
      <div class="bib-moments">
        ${iconicMoments.map((m, i) => `
          <article class="bib-moment bib-reveal">
            <span class="bib-mindex tabular" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
            <div class="bib-momentbody">
              <span class="t-meta">${m.date}</span>
              <h3 class="t-display bib-mtitle">${m.title}</h3>
              <p class="bib-item">${m.body}</p>
            </div>
          </article>`).join('')}
      </div>
      <div class="bib-card bib-reveal" style="margin-top:40px;">
        <span class="t-meta">Dates to remember — timeline markers</span>
        <div class="bib-dates">
          ${dates.map((d) => `<div class="bib-daterow"><span class="tabular bib-date">${d.date}</span><span>${d.event}</span></div>`).join('')}
        </div>
      </div>
    </div>`;

  if (reduced) return;
  registerGSAP();
  gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.bib-head')).forEach((head) => {
    gsap.fromTo(head.querySelector('.bib-rule'), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: head, start: 'top 82%' } });
    gsap.fromTo(head.querySelector('.bib-title'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: head, start: 'top 82%' } });
  });
  // spine fills as the arc scrolls through
  gsap.fromTo(section.querySelector('[data-spine]'), { scaleY: 0 }, {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: section.querySelector('.bib-arc'), start: 'top 75%', end: 'bottom 55%', scrub: 1 },
  });
  // rows illuminate one by one; won rows glow gold
  gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.bib-arcrow')).forEach((el) => {
    gsap.fromTo(el, { opacity: 0.15, x: -28 }, {
      opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
    });
  });
  // moment cards: ghost index parallax + body wipe
  gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.bib-moment')).forEach((el) => {
    gsap.fromTo(el.querySelector('.bib-momentbody'), { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    gsap.fromTo(el.querySelector('.bib-mindex'), { opacity: 0.25 }, {
      opacity: 1, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 40%', scrub: 1 },
    });
  });
  const ghost = section.querySelector<HTMLElement>('[data-ghost]');
  if (ghost) {
    gsap.to(ghost, { yPercent: 26, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  }
}
