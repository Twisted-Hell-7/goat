import { gsap, registerGSAP } from '../lib/gsap';
import { iconicMoments, argentinaArc, dates } from '../lib/bible';

export function mountMoments(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#moments')!;
  const reduced = ctx.reduced;
  section.classList.add('section');
  Object.assign(section.style, { background: 'var(--void)', padding: 'clamp(80px,14vh,180px) clamp(20px,4vw,56px)' } as CSSStyleDeclaration);

  section.innerHTML = `
    <div class="bib-wrap">
      <div class="bib-head">
        <span class="t-meta">06 — The Weight of the Wait</span>
        <h2 class="t-display bib-title">LOST EVERYTHING.<br/>THEN WON IT ALL.</h2>
        <p class="bib-sub">10 near-misses across 15 years → 3 trophies in 3 years. The greatest comeback in football history.</p>
      </div>
      <div class="bib-arc">
        ${argentinaArc.map((a) => `<div class="bib-arcrow${a.won ? ' is-won' : ''}"><span class="tabular bib-arcy">${a.year}</span><span>${a.event}</span><span class="bib-dim">${a.state}</span><span class="bib-dot" aria-hidden="true"></span></div>`).join('')}
      </div>
      <div class="bib-head" style="margin-top:72px;">
        <span class="t-meta">Iconic moments — story cards</span>
        <h2 class="t-display bib-title">GOAL ANATOMY<br/>OF A MYTH.</h2>
      </div>
      <div class="bib-grid bib-grid--2">
        ${iconicMoments.map((m, i) => `<article class="bib-card bib-moment"><span class="t-meta">${String(i + 1).padStart(2, '0')} · ${m.date}</span><h3 class="t-display bib-mtitle">${m.title}</h3><p class="bib-item">${m.body}</p></article>`).join('')}
      </div>
      <div class="bib-card" style="margin-top:40px;">
        <span class="t-meta">Dates to remember — timeline markers</span>
        <div class="bib-dates">
          ${dates.map((d) => `<div class="bib-daterow"><span class="tabular bib-date">${d.date}</span><span>${d.event}</span></div>`).join('')}
        </div>
      </div>
    </div>`;

  if (reduced) return;
  registerGSAP();
  gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.bib-arcrow')).forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' }, delay: (i % 4) * 0.04 });
  });
  gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.bib-moment, .bib-head')).forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 86%' } });
  });
}
