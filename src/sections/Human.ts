import { gsap, registerGSAP } from '../lib/gsap';
import { vitals, humanStories, messiQuotes, voicesQuotes, personalFacts, foundation } from '../lib/bible';

export function mountHuman(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#human')!;
  const reduced = ctx.reduced;
  section.classList.add('section');
  Object.assign(section.style, { background: 'var(--obsidian)', padding: 'clamp(80px,14vh,180px) clamp(20px,4vw,56px)' } as CSSStyleDeclaration);

  section.innerHTML = `
    <div class="bib-wrap">
      <div class="bib-head">
        <span class="t-meta">07 — The Human</span>
        <h2 class="t-display bib-title">THE NEEDLE.<br/>THE NAPKIN.<br/>THE BOY.</h2>
        <p class="bib-sub">Text only. No image. Let the writing do the work — plus vitals, voices, facts and the foundation.</p>
      </div>
      <div class="bib-grid bib-grid--2">
        <div class="bib-card">
          <span class="t-meta">Identity & vitals</span>
          ${vitals.map((v) => `<div class="bib-row"><span class="bib-dim">${v.label}</span><span>${v.value}</span></div>`).join('')}
        </div>
        <div class="bib-card">
          <span class="t-meta">Leo Messi Foundation — est. 2007</span>
          ${foundation.map((f) => `<p class="bib-item">— ${f}</p>`).join('')}
          <span class="t-meta" style="margin-top:20px;display:block;">In his words</span>
          ${messiQuotes.map((q) => `<p class="bib-quote">“${q}”</p>`).join('')}
        </div>
      </div>
      <div class="bib-injection">
        <span class="t-meta">The Injection — story section</span>
        <p class="t-editorial bib-injectext">From age 11 to 14, Messi injected growth hormone into his own legs. Every night. Seven days a week. For three years. So his body could grow enough to play the sport he loved.</p>
      </div>
      <div class="bib-grid bib-grid--2">
        ${humanStories.map((s) => `<article class="bib-card"><span class="t-meta">${s.title}</span><p class="bib-item">${s.body}</p></article>`).join('')}
      </div>
      <div class="bib-card bib-voices">
        <span class="t-meta">What they said — voices</span>
        <blockquote class="t-editorial bib-voicetext" data-voice-text></blockquote>
        <p class="bib-dim" data-voice-by></p>
        <div class="bib-voicenav">
          <button data-voice-prev aria-label="Previous quote">←</button>
          <span class="tabular" data-voice-count></span>
          <button data-voice-next aria-label="Next quote">→</button>
        </div>
      </div>
      <div class="bib-card">
        <span class="t-meta">Personal facts — human details</span>
        <div class="bib-facts">${personalFacts.map((f) => `<span class="bib-pill">${f}</span>`).join('')}</div>
      </div>
    </div>`;

  // Voices carousel (no lib, buttons + auto-advance, pauses on reduced motion)
  const text = section.querySelector<HTMLElement>('[data-voice-text]')!;
  const by = section.querySelector<HTMLElement>('[data-voice-by]')!;
  const count = section.querySelector<HTMLElement>('[data-voice-count]')!;
  let i = 0;
  const render = () => {
    text.textContent = `“${voicesQuotes[i].text}”`;
    by.textContent = `— ${voicesQuotes[i].by}`;
    count.textContent = `${i + 1} / ${voicesQuotes.length}`;
  };
  render();
  section.querySelector('[data-voice-prev]')!.addEventListener('click', () => { i = (i - 1 + voicesQuotes.length) % voicesQuotes.length; render(); });
  section.querySelector('[data-voice-next]')!.addEventListener('click', () => { i = (i + 1) % voicesQuotes.length; render(); });

  if (reduced) return;
  registerGSAP();
  gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.bib-card, .bib-head, .bib-injection')).forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 86%' } });
  });
  if (!reduced) {
    const timer = window.setInterval(() => {
      if (!document.body.contains(section)) { window.clearInterval(timer); return; }
      i = (i + 1) % voicesQuotes.length;
      gsap.fromTo(text, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      render();
    }, 6000);
  }
}
