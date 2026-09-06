import { gsap, registerGSAP } from '../lib/gsap';
import { masterTable, clubTable, argentinaTable, trophyGroups, awards, guinness, goalsByYear, singleNumbers } from '../lib/bible';

function blockTitle(kicker: string, title: string, sub?: string) {
  return `
    <div class="bib-head">
      <div class="bib-rule" aria-hidden="true"></div>
      <span class="t-meta">${kicker}</span>
      <h2 class="t-display bib-title">${title}</h2>
      ${sub ? `<p class="bib-sub">${sub}</p>` : ''}
    </div>`;
}

export function mountRecords(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#records')!;
  const reduced = ctx.reduced;
  section.classList.add('section');
  Object.assign(section.style, { background: 'var(--obsidian)', padding: 'clamp(80px,14vh,180px) clamp(20px,4vw,56px)', position: 'relative', overflow: 'clip' } as CSSStyleDeclaration);

  const max = Math.max(...goalsByYear.map((g) => g.total));
  const bars = goalsByYear.map((g) => {
    const h = Math.round((g.total / max) * 100);
    const gold = g.year === 2012;
    return `<div class="bars-col" title="${g.year}: ${g.total} goals">
      <span class="bars-val tabular">${g.total}</span>
      <div class="bars-track"><div class="bars-fill${gold ? ' is-gold' : ''}" style="height:${h}%"></div></div>
      <span class="bars-year">${String(g.year).slice(2)}</span>
    </div>`;
  }).join('');

  section.innerHTML = `
    <div class="bib-atmo" aria-hidden="true">
      <div class="bib-vignette"></div>
      <div class="bib-ghost" data-ghost>91</div>
      <div class="bib-grain"></div>
    </div>
    <div class="bib-wrap">
      ${blockTitle('05 — The Record Room', 'EVERY RECORD,<br/>ONE ROOM.', 'Master table · trophies · awards · Guinness · goals by year. From the Content Bible, nothing spared.')}
      <div class="bib-grid bib-grid--2">
        <div class="bib-card bib-reveal">
          <span class="t-meta">Master table — mid-2026</span>
          ${masterTable.map((r) => `<div class="bib-row"><span>${r.label}</span><span class="tabular bib-num">${r.value}</span></div>`).join('')}
        </div>
        <div class="bib-card bib-reveal">
          <span class="t-meta">By club</span>
          ${clubTable.map((r) => `<div class="bib-row bib-row--4"><span><strong>${r.club}</strong><br/><span class="bib-dim">${r.years}</span></span><span class="tabular">${r.apps}</span><span class="tabular">${r.goals}</span><span class="tabular bib-dim">${r.assists}</span></div>`).join('')}
          <div class="bib-legend"><span>Apps</span><span>Goals</span><span>Assists</span></div>
        </div>
      </div>
      <div class="bib-card bib-reveal">
        <span class="t-meta">Argentina — 207 caps · 125 goals · 65 assists</span>
        <div class="bib-grid bib-grid--3">
          ${argentinaTable.map((r) => `<div class="bib-mini"><span class="bib-dim">${r.comp}</span><span class="tabular bib-num">${r.apps} / ${r.goals} / ${r.assists}</span><span class="bib-dim">apps · goals · assists</span></div>`).join('')}
        </div>
      </div>
      <div class="bib-grid bib-grid--2">
        <div class="bib-card bib-reveal">
          <span class="t-meta">Trophies — 48 majors</span>
          ${trophyGroups.map((g) => `<div class="bib-group"><span class="bib-team">${g.team}</span>${g.items.map((i) => `<p class="bib-item">${i}</p>`).join('')}</div>`).join('')}
        </div>
        <div class="bib-card bib-reveal">
          <span class="t-meta">Individual awards</span>
          ${awards.map((a, k) => `<div class="bib-row"><span><strong>${a.name}</strong><br/><span class="bib-dim">${a.detail}</span></span><span class="bib-idx">${String(k + 1).padStart(2, '0')}</span></div>`).join('')}
        </div>
      </div>
      <div class="bib-grid bib-grid--3">
        ${guinness.map((g) => `<div class="bib-card bib-reveal"><span class="t-meta">Guinness — ${g.title}</span>${g.items.map((i) => `<p class="bib-item">— ${i}</p>`).join('')}</div>`).join('')}
      </div>
      <div class="bib-card bib-reveal">
        <span class="t-meta">Goals by year — club + country</span>
        <div class="bars">${bars}</div>
        <p class="bib-dim">Peak: 91 in 2012 (gold). Breaks Gerd Müller’s 85 (1972).</p>
      </div>
      <div class="bib-grid bib-grid--4">
        ${singleNumbers.map((n, k) => `<div class="bib-card bib-reveal bib-numcard${n.value === '91' ? ' is-gold' : ''}"><span class="bib-idx">${String(k + 1).padStart(2, '0')} / 04</span><span class="tabular bib-bignum">${n.value}</span><span class="bib-team">${n.label}</span><span class="bib-dim">${n.note}</span></div>`).join('')}
      </div>
    </div>`;

  if (reduced) return;
  registerGSAP();
  // gold rule draws in per header
  gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.bib-head')).forEach((head) => {
    const rule = head.querySelector('.bib-rule');
    gsap.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: head, start: 'top 82%' } });
    gsap.fromTo(head.querySelectorAll('.bib-title'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: head, start: 'top 82%' } });
  });
  // cards emerge from below with a clip wipe + de-blur
  gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.bib-reveal')).forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 36, clipPath: 'inset(12% 0 12% 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0 0% 0)', duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  // bars grow with stagger
  gsap.fromTo(section.querySelectorAll('.bars-fill'), { scaleY: 0 }, { scaleY: 1, transformOrigin: 'bottom', duration: 1.1, ease: 'expo.out', stagger: 0.03, scrollTrigger: { trigger: section.querySelector('.bars'), start: 'top 82%' } });
  gsap.fromTo(section.querySelectorAll('.bars-val'), { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.03, scrollTrigger: { trigger: section.querySelector('.bars'), start: 'top 82%' } });
  // ghost numeral drifts on scrub
  const ghost = section.querySelector<HTMLElement>('[data-ghost]');
  if (ghost) {
    gsap.to(ghost, { yPercent: 30, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  }
}
