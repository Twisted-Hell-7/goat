import { gsap, registerGSAP } from '../lib/gsap';
import { stats } from '../lib/data';

// Monumental hero + ledger rows: one giant figure up top,
// the rest as full-width editorial rows. Gold World Cup lands last.
const ROW_SUBS: Record<string, string | undefined> = {
  'World Cup': 'Qatar 2022 · Lusail',
};

export function mountNumbers(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#numbers')!;
  const reduced = ctx.reduced;

  section.classList.add('section', 'section--full', 'bg-hatch');

  // ── atmosphere layers (all decorative, behind content) ──
  const bg = document.createElement('div');
  bg.className = 'num-bg';
  bg.setAttribute('aria-hidden', 'true');
  bg.innerHTML = `
    <div class="num-vignette"></div>
    <div class="num-pitch">
      <div class="num-pitch-circle"></div>
      <div class="num-pitch-dot"></div>
    </div>
    <div class="num-ghost">10</div>
    <div class="num-goldwash"></div>
    <div class="num-spotlight"></div>
    <div class="num-grain"></div>
  `;
  section.append(bg);

  const wrap = document.createElement('div');
  wrap.className = 'num-wrap';

  const rule = document.createElement('div');
  rule.className = 'num-rule';
  rule.setAttribute('aria-hidden', 'true');

  const head = document.createElement('div');
  head.className = 'num-head';
  const eyebrow = document.createElement('span');
  eyebrow.className = 'num-eyebrow';
  eyebrow.innerHTML = '01 <span>— The Reckoning</span>';
  const note = document.createElement('span');
  note.className = 'num-note';
  note.textContent = 'Club + country · 2004 —';
  head.append(eyebrow, note);

  // ── monument: the 843 ──
  const heroStat = stats[0];
  const monument = document.createElement('div');
  monument.className = 'num-monument';
  monument.setAttribute('role', 'listitem');
  monument.setAttribute('aria-label', `${heroStat.label}: ${heroStat.value}`);
  monument.innerHTML = `
    <span class="num-index" aria-hidden="true">01 / 07</span>
    <span class="num-monument-value tabular" aria-hidden="true">0</span>
    <span class="num-monument-label">${heroStat.label}</span>
    <span class="num-sub">Club + country · 2004 —</span>
  `;
  const heroValue = monument.querySelector<HTMLElement>('.num-monument-value')!;
  const heroLabel = monument.querySelector<HTMLElement>('.num-monument-label')!;

  // ── ledger rows: everything else, gold last ──
  const ledger = document.createElement('div');
  ledger.className = 'num-ledger';
  ledger.setAttribute('role', 'list');
  ledger.setAttribute('aria-label', 'Lionel Messi career statistics');

  type Row = { row: HTMLElement; value: HTMLElement; label: HTMLElement; target: number; gold: boolean };
  const rows: Row[] = [];

  const rest = [...stats.slice(1).filter((s) => !s.emphasis), ...stats.slice(1).filter((s) => s.emphasis)];
  rest.forEach((s, k) => {
    const gold = !!s.emphasis;
    const row = document.createElement('div');
    row.className = `num-row${gold ? ' num-row--gold' : ''}`;
    row.setAttribute('role', 'listitem');
    row.setAttribute('aria-label', `${s.label}: ${s.value}`);

    const left = document.createElement('div');
    left.className = 'num-row-left';
    const index = document.createElement('span');
    index.className = 'num-index';
    index.setAttribute('aria-hidden', 'true');
    index.textContent = `${String(k + 2).padStart(2, '0')} / 07`;
    const label = document.createElement('span');
    label.className = 'num-label';
    label.textContent = s.label;
    left.append(index, label);
    const subText = ROW_SUBS[s.label];
    if (subText) {
      const sub = document.createElement('span');
      sub.className = 'num-sub';
      sub.textContent = subText;
      left.append(sub);
    }

    const value = document.createElement('span');
    value.className = `num-row-value tabular${gold ? ' num-row-value--gold' : ''}`;
    value.setAttribute('aria-hidden', 'true');
    value.textContent = '0';

    row.append(left, value);
    ledger.append(row);
    rows.push({ row, value, label, target: s.value, gold });
  });

  wrap.append(rule, head, monument, ledger);
  section.append(wrap);

  const setFinalHero = () => {
    heroValue.textContent = String(heroStat.value);
    heroLabel.style.opacity = '1';
  };
  const setFinal = (r: Row) => {
    r.value.textContent = String(r.target);
    r.label.style.opacity = '1';
  };

  if (reduced) {
    setFinalHero();
    rows.forEach(setFinal);
    return;
  }

  registerGSAP();

  const spotlight = bg.querySelector<HTMLElement>('.num-spotlight')!;
  const ghost = bg.querySelector<HTMLElement>('.num-ghost')!;
  const pitch = bg.querySelector<HTMLElement>('.num-pitch')!;

  // Spotlight follows the cursor — chalk light, never gold.
  // Touch devices get a slow ambient drift instead so the section never reads flat.
  const canHover = window.matchMedia('(hover: hover)').matches;
  if (canHover) {
    const sx = gsap.quickTo(spotlight, 'x', { duration: 0.6, ease: 'power3.out' });
    const sy = gsap.quickTo(spotlight, 'y', { duration: 0.6, ease: 'power3.out' });
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      sx(e.clientX - r.left);
      sy(e.clientY - r.top);
    };
    section.addEventListener('pointermove', onMove);
  } else {
    gsap.set(spotlight, { left: '50%', top: '38%' });
    gsap.to(spotlight, {
      x: 60,
      y: 40,
      duration: 5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }

  gsap.set(spotlight, { xPercent: -50, yPercent: -50, opacity: 0 });
  gsap.set(head, { opacity: 0, y: 16 });
  gsap.set([heroValue, heroLabel], { opacity: 0 });
  gsap.set(heroValue, { y: 60, filter: 'blur(12px)' });
  gsap.set(heroLabel, { y: 12 });
  gsap.set(
    rows.map((r) => r.row),
    { opacity: 0, y: 24 }
  );
  gsap.set(
    rows.map((r) => r.value),
    { filter: 'blur(8px)' }
  );
  gsap.set(
    rows.map((r) => r.label),
    { opacity: 0, y: 10 }
  );

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 70%' },
  });

  tl.to(rule, { scaleX: 1, duration: 0.9, ease: 'expo.out' }, 0);
  tl.to(head, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 0.1);
  tl.to(spotlight, { opacity: 1, duration: 1.2, ease: 'power3.out' }, 0.2);

  // Monument counts first, big and slow.
  const heroObj = { v: 0 };
  tl.to(heroValue, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out' }, 0.2);
  tl.to(
    heroObj,
    {
      v: heroStat.value,
      duration: 2.2,
      ease: 'expo.out',
      onUpdate: () => (heroValue.textContent = String(Math.round(heroObj.v))),
      onComplete: () => (heroValue.textContent = String(heroStat.value)),
    },
    0.2
  );
  tl.to(heroLabel, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.4);

  // Rows ripple in after the monument; gold lands last, in silence.
  const seq = rows.filter((r) => !r.gold);
  const gold = rows.find((r) => r.gold)!;
  seq.forEach((r, k) => {
    const at = 0.9 + k * 0.14;
    const obj = { v: 0 };
    tl.to(r.row, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, at);
    tl.to(r.value, { filter: 'blur(0px)', duration: 0.6, ease: 'expo.out' }, at);
    tl.to(
      obj,
      {
        v: r.target,
        duration: 1.2,
        ease: 'expo.out',
        onUpdate: () => (r.value.textContent = String(Math.round(obj.v))),
        onComplete: () => (r.value.textContent = String(r.target)),
      },
      at
    );
    tl.to(r.label, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, at + 0.35);
  });

  const goldAt = 0.9 + seq.length * 0.14 + 0.8;
  const g = { v: 0 };
  tl.to(gold.row, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, goldAt);
  tl.to(gold.value, { filter: 'blur(0px)', duration: 0.8, ease: 'expo.out' }, goldAt);
  tl.to(
    g,
    {
      v: gold.target,
      duration: 1.6,
      ease: 'expo.out',
      onUpdate: () => (gold.value.textContent = String(Math.round(g.v))),
      onComplete: () => (gold.value.textContent = String(gold.target)),
    },
    goldAt
  );
  tl.to(gold.label, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, goldAt + 1.1);

  // Monument keeps drifting on scroll so the section never sits dead.
  gsap.to(monument, {
    yPercent: -6,
    ease: 'none',
    scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
  });
  gsap.to(ledger, {
    yPercent: 3,
    ease: 'none',
    scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
  });
  // Ambient parallax: ghost numeral drifts, pitch ring breathes — scrubbed.
  gsap.to(ghost, {
    yPercent: 22,
    ease: 'none',
    scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
  });
  gsap.fromTo(
    pitch,
    { scale: 1, opacity: 0.85 },
    {
      scale: 1.12,
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
    }
  );

  // Row illumination follows the cursor — full-row chalk wash.
  rows.forEach((r) => {
    r.row.addEventListener('pointerenter', () => {
      gsap.to(r.value, { x: 8, duration: 0.45, ease: 'expo.out' });
      gsap.to(r.label, { color: '#EBEBEB', duration: 0.35 });
    });
    r.row.addEventListener('pointerleave', () => {
      gsap.to(r.value, { x: 0, duration: 0.6, ease: 'expo.out' });
      gsap.to(r.label, { color: '#6B6B6B', duration: 0.4 });
    });
  });
}
