import { gsap, registerGSAP } from '../lib/gsap';
import { vitals, humanStories, messiQuotes, voicesQuotes, personalFacts, foundation } from '../lib/bible';

const INJECTION = 'From age 11 to 14, Messi injected growth hormone into his own legs. Every night. Seven days a week. For three years. So his body could grow enough to play the sport he loved.';

export function mountHuman(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#human')!;
  const reduced = ctx.reduced;
  section.classList.add('section');
  Object.assign(section.style, { background: 'var(--obsidian)', padding: 'clamp(80px,14vh,180px) clamp(20px,4vw,56px)', position: 'relative', overflow: 'clip' } as CSSStyleDeclaration);

  const injectWords = INJECTION.split(' ').map((w) => `<span class="inject-word">${w}</span>`).join(' ');

  section.innerHTML = `
    <div class="bib-atmo" aria-hidden="true">
      <div class="bib-vignette is-gold"></div>
      <div class="bib-ghost" data-ghost>LEO</div>
      <div class="bib-grain"></div>
    </div>
    <div class="bib-wrap">
      <div class="bib-head">
        <div class="bib-rule" aria-hidden="true"></div>
        <span class="t-meta">07 — The Human</span>
        <h2 class="t-display bib-title">THE NEEDLE.<br/>THE NAPKIN.<br/>THE BOY.</h2>
        <p class="bib-sub">Vitals, stories, voices, facts and the foundation. Text does the work — motion carries it.</p>
      </div>
      <div class="bib-grid bib-grid--2">
        <div class="bib-card bib-reveal">
          <span class="t-meta">Identity & vitals</span>
          ${vitals.map((v) => `<div class="bib-row"><span class="bib-dim">${v.label}</span><span class="bib-vital">${v.value}</span></div>`).join('')}
        </div>
        <div class="bib-card bib-reveal">
          <span class="t-meta">Leo Messi Foundation — est. 2007</span>
          <ul class="bib-list">${foundation.map((f) => `<li class="bib-listitem">${f}</li>`).join('')}</ul>
          <span class="t-meta" style="margin-top:28px;display:block;">In his words</span>
          ${messiQuotes.map((q) => `<p class="bib-quote">“${q}”</p>`).join('')}
        </div>
      </div>
      <div class="bib-injection bib-reveal">
        <span class="t-meta">The Injection — his words would be too small</span>
        <p class="t-editorial bib-injectext" data-inject>${injectWords}</p>
      </div>
      <div class="bib-marquee" aria-hidden="true"><div class="bib-marqueeinner" data-marquee><span>La Pulga · 1987 — · Rosario → Barcelona → Paris → Miami ·&nbsp;</span><span>La Pulga · 1987 — · Rosario → Barcelona → Paris → Miami ·&nbsp;</span></div></div>
      <div class="bib-grid bib-grid--2">
        ${humanStories.map((s, k) => `<article class="bib-card bib-reveal bib-story"><span class="bib-idx">${String(k + 1).padStart(2, '0')} / 08</span><span class="t-meta" style="margin-top:12px;">${s.title}</span><p class="bib-item">${s.body}</p></article>`).join('')}
      </div>
      <div class="bib-card bib-reveal bib-voices">
        <span class="t-meta">What they said — voices</span>
        <blockquote class="t-editorial bib-voicetext" data-voice-text></blockquote>
        <p class="bib-dim" data-voice-by></p>
        <div class="bib-voicenav">
          <button data-voice-prev aria-label="Previous quote">←</button>
          <span class="tabular" data-voice-count></span>
          <button data-voice-next aria-label="Next quote">→</button>
        </div>
      </div>
      <div class="bib-card bib-reveal">
        <span class="t-meta">Personal facts — human details</span>
        <div class="bib-facts">${personalFacts.map((f) => `<span class="bib-pill">${f}</span>`).join('')}</div>
      </div>
    </div>`;

  // Voices carousel
  const text = section.querySelector<HTMLElement>('[data-voice-text]')!;
  const by = section.querySelector<HTMLElement>('[data-voice-by]')!;
  const count = section.querySelector<HTMLElement>('[data-voice-count]')!;
  let i = 0;
  const render = () => {
    text.textContent = `“${voicesQuotes[i].text}”`;
    by.textContent = `— ${voicesQuotes[i].by}`;
    count.textContent = `${i + 1} / ${voicesQuotes.length}`;
  };
  const crossfade = () => {
    if (reduced) { render(); return; }
    gsap.to(text, { opacity: 0, y: 8, duration: 0.25, ease: 'power2.in', onComplete: () => {
      render();
      gsap.to(text, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
    }});
  };
  render();
  section.querySelector('[data-voice-prev]')!.addEventListener('click', () => { i = (i - 1 + voicesQuotes.length) % voicesQuotes.length; crossfade(); });
  section.querySelector('[data-voice-next]')!.addEventListener('click', () => { i = (i + 1) % voicesQuotes.length; crossfade(); });

  if (reduced) return;
  registerGSAP();
  gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.bib-head')).forEach((head) => {
    gsap.fromTo(head.querySelector('.bib-rule'), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: head, start: 'top 82%' } });
    gsap.fromTo(head.querySelector('.bib-title'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: head, start: 'top 82%' } });
  });
  gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.bib-reveal')).forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 36, clipPath: 'inset(12% 0 12% 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0 0% 0)', duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  // injection illuminates word by word on scrub
  const words = section.querySelectorAll<HTMLElement>('.inject-word');
  gsap.set(words, { opacity: 0.13 });
  gsap.to(words, {
    opacity: 1, stagger: 0.06, ease: 'none',
    scrollTrigger: { trigger: section.querySelector('[data-inject]'), start: 'top 78%', end: 'bottom 45%', scrub: 1 },
  });
  // marquee drifts forever
  const marquee = section.querySelector<HTMLElement>('[data-marquee]');
  if (marquee) {
    gsap.to(marquee, { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });
  }
  const ghost = section.querySelector<HTMLElement>('[data-ghost]');
  if (ghost) {
    gsap.to(ghost, { yPercent: 26, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  }
  const timer = window.setInterval(() => {
    if (!document.body.contains(section)) { window.clearInterval(timer); return; }
    i = (i + 1) % voicesQuotes.length;
    crossfade();
  }, 6000);
}
